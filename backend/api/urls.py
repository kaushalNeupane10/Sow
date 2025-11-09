from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from .views import (ProductViewSet, RegisterView,ProfileView, EmailTokenObtainPairView,) 
from rest_framework_simplejwt.views import  TokenRefreshView
from django.views.generic import TemplateView

router= DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
urlpatterns = [
    path('', include(router.urls)),  

    #jwt endpoint
    path('register/', RegisterView.as_view(), name='register'),  
    path('profile/', ProfileView.as_view(), name='profile'),     
    path('token/', EmailTokenObtainPairView.as_view(), name='token_obtain_pair'), 
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),   
    re_path(r"^.*$", TemplateView.as_view(template_name="index.html")),   
]
