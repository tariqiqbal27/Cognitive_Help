from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Report


# delete a post after 10 reports
@receiver(post_save, sender=Report)
def delete_post(sender, instance, **kwargs):
    reports = len(Report.objects.filter(post=instance.post))
    print(reports)
    if reports > 9:
        instance.post.delete()
