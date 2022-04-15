from django.db import models
from core.models import UserAccount


class Post(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    content = models.CharField(max_length=200)
    date_posted = models.DateTimeField(auto_now_add=True)
    hidden = models.BooleanField(default=False)
    date_hidden = models.DateTimeField(blank=True, null=True)
    hidden_by = models.ForeignKey(UserAccount, on_delete=models.CASCADE,
                                  related_name='post_hidden_by', blank=True, null=True)

    def __str__(self):
        return self.content


class Report(models.Model):
    reported_by = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)


class Comment(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    content = models.CharField(max_length=200)
    date_posted = models.DateTimeField(auto_now_add=True)
    hidden = models.BooleanField(default=False)
    date_hidden = models.DateTimeField(blank=True, null=True)
    hidden_by = models.ForeignKey(UserAccount, on_delete=models.CASCADE,
                                  related_name='comment_hidden_by', blank=True, null=True)

    def __str__(self):
        return self.content


class ReportComment(models.Model):
    reported_by = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
