from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (LocalTextViewSet, PriceItemViewSet, RegisterView,ProfileView) 
from rest_framework_simplejwt.views import ( TokenObtainPairView, TokenRefreshView, )

router= DefaultRouter()
router.register('localtexts', LocalTextViewSet)
router.register('priceitems', PriceItemViewSet)

urlpatterns = [
    path('', include(router.urls)),


    #jwt endpoint
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
