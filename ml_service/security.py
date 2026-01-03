import hmac
import hashlib
from cryptography.fernet import Fernet

# DEMO KEY (in real systems: env variable)
FERNET_KEY = b'73wsRttEsVuE2F8rSsid5hoNhXMbU5dgzqvwtPpbju8='
fernet = Fernet(FERNET_KEY)

HMAC_SECRET = b"demo-ml-hmac-key"


def verify_hmac(ciphertext: bytes, received_hmac: str) -> bool:
    """
    Integrity check to detect tampering.
    """
    computed = hmac.new(
        HMAC_SECRET,
        ciphertext,
        hashlib.sha256
    ).hexdigest()

    return hmac.compare_digest(computed, received_hmac)


def decrypt_payload(ciphertext: bytes) -> dict:
    """
    Decrypt data inside ML service only.
    """
    decrypted = fernet.decrypt(ciphertext)
    return eval(decrypted.decode())  # safe here because source is trusted Django
