from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ValidationError
from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from django.http import JsonResponse

from .models import UserAccount, Profile
from .serializers import UserSerializerWithToken, UserProfileSerializer
import joblib
import json


@api_view(['POST'])
def register_user(request):
    data = request.POST
    first_name = data['first_name']
    last_name = data['last_name']
    email = data['email']
    password = data['password']
    # check if first_name, email, password is empty
    if not first_name or not last_name or not email or not password:
        return Response({'message': 'Please fill all the fields'}, status=status.HTTP_400_BAD_REQUEST)
    # check if email already exists
    if UserAccount.objects.filter(email=email).exists():
        return Response({'message': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        user = UserAccount.objects.create_user(
            username=email,
            first_name=first_name.title(),
            last_name=last_name.title(),
            email=email,
            password=password)
        return Response({'message': 'User created successfully'})
    except ValidationError as e:
        return Response({'error': e.message}, status=400)


class UserTokenObtainPairSerializer(TokenObtainPairSerializer):
    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        pass

    def validate(self, attrs):
        user = UserAccount.objects.filter(email=attrs['username']).first()

        # if not user.check_password(attrs['password']):
        #     return ValidationError({"error": 'A user with this email /password is not found.'})
        #
        # if not user.is_active:
        #     raise ValidationError(
        #         'This user has been deactivated.'
        #     )
        data = super().validate(attrs)
        serializers = UserSerializerWithToken(self.user).data
        data.pop('access')
        data.pop('refresh')
        for k, v in serializers.items():
            data[k] = v
        return data


class UserTokenObtainPairView(TokenObtainPairView):
    serializer_class = UserTokenObtainPairSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_details(request):
    user = request.user
    profile = Profile.objects.filter(user=user).first()
    serializers = UserProfileSerializer(profile, many=False).data
    return Response(serializers)


@api_view(['POST'])
def upload_image(request):
    data = request.POST
    image = data['image']
    user = UserAccount.objects.filter(email=request.user.email).first()
    profile = Profile.objects.filter(user=user).first()
    profile.image = image
    profile.save()
    return Response({'message': 'Image uploaded successfully'})
