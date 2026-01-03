from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from .models import User

# SECURITY & FEATURE IMPORTS
from .security import (
    generate_passkey,
    hash_passkey,
    encrypt_payload,
    generate_ml_hmac,
)
from .features import derive_features

import json
import requests


# ============================
# SIGNUP
# ============================
@csrf_exempt
def signup_user(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST only"}, status=400)

    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return JsonResponse({"error": "Missing fields"}, status=400)

    if User.objects.filter(username=username).exists():
        return JsonResponse({"error": "Username already exists"}, status=400)

    user = User.objects.create_user(
        username=username,
        password=password,
        role="user"
    )

    passkey = generate_passkey(username, password)
    user.passkey_hash = hash_passkey(passkey)
    user.save()

    return JsonResponse({
        "message": "User created",
        "passkey_demo": passkey  # DEMO ONLY
    })


# ============================
# LOGIN
# ============================
@csrf_exempt
def login_user(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST only"}, status=400)

    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    user = authenticate(
        username=data.get("username"),
        password=data.get("password")
    )

    if user is None:
        return JsonResponse({"error": "Invalid credentials"}, status=401)

    login(request, user)

    return JsonResponse({
        "message": "Login successful",
        "role": user.role
    })


# ============================
# SECURE PREDICTION
# ============================
@csrf_exempt
def predict_view(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST only"}, status=400)

    raw = json.loads(request.body)

    # STEP 1: Data minimization
    features = raw.copy()

    # add derived features
    features["bmi"] = raw["weight"] / ((raw["height"] / 100) ** 2)
    features["waist_hip_ratio"] = raw["waist"] / raw["hip"]

    # STEP 2: Encrypt
    encrypted = encrypt_payload(features)

    # STEP 3: Integrity protection
    hmac_value = generate_ml_hmac(encrypted)

    # STEP 4: Send to FastAPI
    response = requests.post(
        "http://127.0.0.1:8001/infer",
        json={
            "data": encrypted.decode(),
            "hmac": hmac_value
        }
    )

    if response.status_code != 200:
        return JsonResponse({"error": "ML service error"}, status=500)

    return JsonResponse({
        "probability": response.json()["probability"]
    })

from django.contrib.auth.decorators import login_required
from .models import User

@login_required
def list_doctors(request):
    doctors = User.objects.filter(role="doctor").values(
        "id", "username"
    )
    return JsonResponse(list(doctors), safe=False)

from .models import Appointment
from .security import verify_passkey

@csrf_exempt
@login_required
def request_consultation(request):
    data = json.loads(request.body)

    doctor_id = data["doctor_id"]
    passkey = data["passkey"]

    if not verify_passkey(passkey, request.user.passkey_hash):
        return JsonResponse({"error": "Invalid user passkey"}, status=403)

    doctor = User.objects.get(id=doctor_id, role="doctor")

    appointment = Appointment.objects.create(
        user=request.user,
        doctor=doctor,
        status="REQUESTED",
        digital_stamp="PENDING"
    )

    return JsonResponse({"message": "Request sent"})

@csrf_exempt
@login_required
def confirm_consultation(request, appointment_id):
    data = json.loads(request.body)
    passkey = data["passkey"]

    if not verify_passkey(passkey, request.user.passkey_hash):
        return JsonResponse({"error": "Invalid doctor passkey"}, status=403)

    appointment = Appointment.objects.get(
        id=appointment_id,
        doctor=request.user
    )

    stamp = generate_digital_stamp(
        appointment.user,
        appointment.doctor
    )

    appointment.status = "CONFIRMED"
    appointment.digital_stamp = stamp
    appointment.save()

    # Audit log
    AuditLog.objects.create(
        action="CONSULTATION_CONFIRMED",
        actor=request.user,
        audit_hash=stamp
    )

    return JsonResponse({"message": "Consultation confirmed"})
