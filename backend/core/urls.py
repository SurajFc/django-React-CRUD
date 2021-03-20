from django.urls import path
from .views import UserCreateAPIView, LoginView, EmployeeViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('employee', EmployeeViewSet)

urlpatterns = [
    path('usercreate', UserCreateAPIView.as_view()),  # usercreate
    path('login', LoginView.as_view()),  # login View

] + router.urls
