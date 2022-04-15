from django.db import models
from django.contrib.auth.models import AbstractUser


class UserAccount(AbstractUser):
    pass

    def __str__(self):
        return self.email


class Profile(models.Model):
    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE)
    birth_date = models.DateField(null=True, blank=True)
    image = models.ImageField(upload_to='images/', blank=True)

    def __str__(self):
        return self.user.email
