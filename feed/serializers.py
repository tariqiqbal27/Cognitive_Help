from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Post,Comment


class PostSerializer(ModelSerializer):
    posted_by_id = SerializerMethodField(read_only=True)
    posted_by = SerializerMethodField(read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'posted_by', 'content', 'date_posted','posted_by_id']

    @classmethod
    def get_posted_by(cls, obj):
        return str(obj.user.first_name + ' ' + obj.user.last_name)

    @classmethod
    def get_posted_by_id(cls, obj):
        return obj.user.id


class CommentSerializer(ModelSerializer):
    posted_by = SerializerMethodField(read_only=True)
    posted_by_id = SerializerMethodField(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'posted_by','posted_by_id', 'content', 'date_posted']

    @classmethod
    def get_posted_by(cls, obj):
        return str(obj.user.first_name + ' ' + obj.user.last_name)

    @classmethod
    def get_posted_by_id(cls, obj):
        return obj.user.id