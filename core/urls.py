from django.urls import path,include
from .views import register_user,UserTokenObtainPairView,get_user_details

urlpatterns = [
    path('login/', UserTokenObtainPairView.as_view(), name='login'),
    path('register/',register_user,name='register'),
    path('user/',get_user_details,name='user-details'),
]