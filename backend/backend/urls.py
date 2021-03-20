from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView, TokenVerifyView
)
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(
        title="MindBowser APi's",
        default_version='v1',
        description="Test description",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@xyz.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),
    path('api/token/', TokenObtainPairView.as_view(),
         name='token_obtain_pair'),  # creating refresh and access
    path('api/token/refresh/', TokenRefreshView.as_view(),
         name='token_refresh'),  # obtainig  access from refresh token
    # path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),

]

if settings.DEBUG:
    docs_url = [
        path('swagger', schema_view.with_ui('swagger', cache_timeout=0),
             name='schema-swagger-ui'),  # Documentation
        path('redoc', schema_view.with_ui(
            'redoc', cache_timeout=0), name='schema-redoc')
    ]
    urlpatterns.extend(docs_url)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + \
        static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
