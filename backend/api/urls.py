from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (ProductViewSet, RegisterView,ProfileView, EmailTokenObtainPairView,) 
from rest_framework_simplejwt.views import  TokenRefreshView

router= DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
urlpatterns = [
    path('', include(router.urls)),  

    #jwt endpoint
    path('register/', RegisterView.as_view(), name='register'),  
    path('profile/', ProfileView.as_view(), name='profile'),     
    path('token/', EmailTokenObtainPairView.as_view(), name='token_obtain_pair'), 
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),      
]
