from django.dispatch import receiver
from django.db.models.signals import post_save
from core.models import UserAccount,Profile


@receiver(post_save, sender=UserAccount)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)