from django.contrib.auth.hashers import make_password, check_password
import hashlib
import time

def generate_passkey(username: str, password: str) -> str:
    """
    Demo logic:
    first 4 chars of username + first 4 chars of password
    """
    raw_passkey = username[:4] + password[:4]
    return raw_passkey


def hash_passkey(passkey: str) -> str:
    """
    Uses Django PBKDF2 internally
    """
    return make_password(passkey)


def verify_passkey(passkey: str, stored_hash: str) -> bool:
    return check_password(passkey, stored_hash)


def generate_audit_hash(data: str) -> str:
    """
    Immutable audit log hash
    """
    return hashlib.sha256(
        (data + str(time.time())).encode()
    ).hexdigest()
# ================================
# ML COMMUNICATION SECURITY
# ================================

import json
import hmac
import hashlib
from cryptography.fernet import Fernet

# Demo-only keys (explain in CNS report)
FERNET_KEY = b'73wsRttEsVuE2F8rSsid5hoNhXMbU5dgzqvwtPpbju8='
fernet = Fernet(FERNET_KEY)

HMAC_SECRET = b"demo-ml-hmac-key"


def encrypt_payload(data: dict) -> bytes:
    """
    Encrypt derived ML features before sending to FastAPI.
    """
    serialized = json.dumps(data).encode()
    return fernet.encrypt(serialized)


def generate_ml_hmac(ciphertext: bytes) -> str:
    """
    HMAC to detect tampering / replay.
    """
    return hmac.new(
        HMAC_SECRET,
        ciphertext,
        hashlib.sha256
    ).hexdigest()

import hashlib
import time

def generate_digital_stamp(user, doctor) -> str:
    """
    Non-repudiation proof.
    """
    raw = f"{user.id}|{doctor.id}|{time.time()}"
    return hashlib.sha256(raw.encode()).hexdigest()
