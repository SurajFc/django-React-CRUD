from rest_framework import serializers
from .models import User, Employee
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import update_last_login


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

# User creating serializer


class UserCreateSerializer(serializers.ModelSerializer):
    '''
    Creating Manager
    '''
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('email', 'firstname', 'lastname',
                  'address', 'dob', 'company', 'password')

    def create(self, validated_data):
        user = super(UserCreateSerializer, self).create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user


# Login serilizer
class LoginSerializer(serializers.Serializer):
    """
    Authenticates an existing user.
    Email and password are required.
    Returns a JSON web token.
    """
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(max_length=128, write_only=True)

    def validate(self, data):
        """
        Validates user data.
        """
        email = data.get('email', None)
        password = data.get('password', None)

        if email is None:
            raise serializers.ValidationError(
                {
                    "Error": "An email address is required to log in."
                }
            )

        if password is None:
            raise serializers.ValidationError(
                {
                    "Error": "A password is required to log in."
                }
            )

        user = authenticate(username=email, password=password)

        if user is None:
            raise serializers.ValidationError(
                {
                    "Error": 'A user with this email and password was not found.'
                }
            )

        if not user.is_active:
            raise serializers.ValidationError(
                {'Error': 'This user has been deactivated.'}
            )
        update_last_login(None, user)
        return get_tokens_for_user(user)


# Employee Serialzier


class EmployeeSerializer(serializers.ModelSerializer):
    '''
    Employee CRUD
    '''
    class Meta:
        model = Employee
        fields = '__all__'
