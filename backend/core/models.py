from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.db.models.signals import post_save
from django.dispatch import receiver
import uuid
from django.utils.translation import ugettext_lazy as _
from django.utils.functional import cached_property
from django.utils import timezone
# Basic info for Manager and Employee (Abstract Model)


class BasicInfo(models.Model):
    firstname = models.CharField(_("first_name"), max_length=80)
    lastname = models.CharField(_("last_name"), max_length=80)
    email = models.EmailField(editable=True, unique=True, error_messages={
        "unique": "The Email you entered is already present."
    })
    address = models.TextField(_("address"))
    dob = models.DateField(_("date_of_birth"), auto_now_add=True)
    company = models.CharField(_("company name"), max_length=150)
    created_at = models.DateTimeField(
        _("created_at"),  auto_now_add=True)

    class Meta:
        abstract = True


class UserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):

        if not email:
            raise ValueError(_("The Email must be set"))

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)


# User Creation (i.e Manager Creation)
class User(AbstractBaseUser, PermissionsMixin, BasicInfo):

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email

    # @staticmethod
    @cached_property
    def get_total_users(self):
        return User.objects.filter(is_active=True).count()

    class Meta:
        db_table = "user"
        verbose_name = "user"
        verbose_name_plural = "users"


# Employee Table
class Employee(BasicInfo):
    mobile = models.CharField(_("Mobile Number"), max_length=90)
    city = models.CharField(_("city"), max_length=50)

    def __str__(self):
        return self.email

    class Meta:
        db_table = "employee"
        verbose_name = "employee"
        verbose_name_plural = "employees"
