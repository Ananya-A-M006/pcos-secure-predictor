from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ROLE_CHOICES = (
        ('user', 'User'),
        ('doctor', 'Doctor'),
    )

    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user' )

    # Hashed using PBKDF2 (Django)
    passkey_hash = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"{self.username} ({self.role})"


class Prediction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    probability = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)


class AuditLog(models.Model):
    action = models.CharField(max_length=100)
    actor = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    audit_hash = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.actor.username} | {self.action}"

class Appointment(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="appointments_as_user"
    )
    doctor = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="appointments_as_doctor"
    )

    status = models.CharField(
        max_length=20,
        default="PENDING"
    )

    # Non-repudiation proof
    digital_stamp = models.CharField(max_length=255)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} → {self.doctor.username}"
