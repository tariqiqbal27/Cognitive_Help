from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from core.models import UserAccount,Profile


class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'is_active', 'date_joined')
        read_only_fields = ('id', 'date_joined')


class UserSerializerWithToken(UserAccountSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = UserAccount
        fields = ('id', 'email', 'first_name', 'last_name', 'token')

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class ValidationError(Exception):
    def __init__(self, message):
        self.message = message


class UserProfileSerializer(serializers.ModelSerializer):

    first_name = serializers.SerializerMethodField(read_only=True)
    last_name = serializers.SerializerMethodField(read_only=True)
    email = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Profile
        fields = ('email', 'first_name', 'last_name', 'birth_date','image')

    @classmethod
    def get_email(cls, obj):
        return obj.user.email

    @classmethod
    def get_first_name(cls, obj):
        return obj.user.first_name

    @classmethod
    def get_last_name(cls, obj):
        return obj.user.last_name
