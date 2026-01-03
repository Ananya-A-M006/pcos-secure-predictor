from django.urls import path
from .views import signup_user, login_user, predict_view

urlpatterns = [
    path("signup/", signup_user),
    path("login/", login_user),
    path('predict/', predict_view), # Added endpoint for ML prediction
]
