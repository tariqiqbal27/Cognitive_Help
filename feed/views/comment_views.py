import joblib
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
import json
from django.core.files import File
# load depression.pkl file from same directory using django.conf
from django.conf import settings

depression_model = joblib.load('depression.pkl')
stress_model = joblib.load('stress.pkl')


@api_view(['POST'])
def check_depression(request):
    requested_data = request.data['fields']
    data = json.loads(requested_data)
    result = depression_model.predict([data])
    return Response({"result": result[0]})


@api_view(['POST'])
def check_stress(request):
    requested_data = request.data['fields']
    data = json.loads(requested_data)
    result = stress_model.predict([data])
    return Response({"result": result[0]})
