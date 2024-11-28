# from django.urls import path
# from . import views

# urlpatterns = [
#     path('', views.index, name="index")
# ]

from django.urls import path, include
from . views import *
from rest_framework.routers import DefaultRouter
from . import views
from django.conf.urls.static import static
from django.conf import settings

router = DefaultRouter()
router.register(r'properties', RealEstatePropertyViewSet)

urlpatterns = [
    path('signup/', RegisterView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),

    path('resetpassword/', ResetPasswordView.as_view(), name='reset_password'),

    path('forgotpassword/', ForgotPasswordView.as_view(), name='forgot_password'),
    path('resetpasswordconfirm/<uidb64>/<token>/', ResetPasswordConfirmView.as_view(), name='reset_password_confirm'),


    ### Razorpay
 
    # home page

    path('/home', HomePageView.as_view(), name='home'),
    path('api/', include(router.urls)),  # Include the API routes under /api/
    path('contact/', views.contact_view, name='contact'),  # Correct path here
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

