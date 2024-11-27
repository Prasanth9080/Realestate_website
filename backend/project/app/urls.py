# from django.urls import path
# from . import views

# urlpatterns = [
#     path('', views.index, name="index")
# ]

from django.urls import path
from . views import *

urlpatterns = [
    path('signup/', RegisterView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),

    path('resetpassword/', ResetPasswordView.as_view(), name='reset_password'),

    path('forgotpassword/', ForgotPasswordView.as_view(), name='forgot_password'),
    path('resetpasswordconfirm/<uidb64>/<token>/', ResetPasswordConfirmView.as_view(), name='reset_password_confirm'),


] 