from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from feed.models import Post, Report, ReportComment, Comment
from feed.serializers import PostSerializer, CommentSerializer
from core.models import UserAccount


# Start of Post Section
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_post(request):
    data = request.data
    if data['text'] == "":
        return Response({"message": "Post cannot be empty"}, status=status.HTTP_400_BAD_REQUEST)
    post = Post.objects.create(
        user=request.user,
        content=data['text']
    )
    return Response({"message": "Post created successfully"}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_posts(request):
    posts = Post.objects.filter(
        hidden=False,
        user__is_active=True
    ).order_by('-date_posted')
    serializers = PostSerializer(posts, many=True)
    return JsonResponse(serializers.data, safe=False, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_post_and_comments(request, post_id):
    post = Post.objects.get(id=post_id)
    comments = Comment.objects.filter(
        post=post,
        user__is_active=True
    ).order_by('-date_posted')
    serializers = CommentSerializer(comments, many=True)
    return Response(serializers.data, status=status.HTTP_200_OK)


# get all posts for a user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_posts(request, user_id):
    user = UserAccount.objects.get(id=user_id)
    posts = Post.objects.filter(
        user=user,
        hidden=False
    ).order_by('-date_posted')
    serializers = PostSerializer(posts, many=True)
    return Response(serializers.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_my_posts(request):
    user = request.user
    posts = Post.objects.filter(
        user=user,
        hidden=False,
        user__is_active=True
    ).order_by('-date_posted')
    serializers = PostSerializer(posts, many=True)
    return Response(serializers.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def report_post(request,post_id):
    data = request.data
    post = Post.objects.get(id=post_id)
    Report.objects.create(
        reported_by=request.user,
        post=post
    )
    return Response({"message": "Post reported successfully"}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def delete_post(request, post_id):
    data = request.data
    post = Post.objects.get(id=post_id)
    if post.user == request.user:
        post.delete()
        return Response({"message": "Post deleted successfully"},
                        status=status.HTTP_200_OK)
    else:
        return Response({"message": "You are not authorized to delete this post"},
                        status=status.HTTP_401_UNAUTHORIZED)


# End of Post Section

# Start of post section
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_comment(request, post_id):
    data = request.data
    post = Post.objects.get(id=post_id)
    comment = Comment.objects.create(
        user=request.user,
        post=post,
        content=data['comment']
    )
    return Response({"message": "Comment created successfully"}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_comments(request):
    data = request.data
    post = Post.objects.get(id=data['post_id'])
    comments = Comment.objects.filter(
        post=post,
        user__is_active=True,
        hidden=False
    ).order_by('-date_posted')
    return Response({"comments": [comment.to_json() for comment in comments]}, status=status.HTTP_200_OK)


# delete a comment from a post by its id and if user IsAuthenticated
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def delete_comment(request):
    data = request.data
    comment = Comment.objects.get(id=data['comment_id'])
    if comment.user == request.user:
        comment.delete()
        return Response({"message": "Comment deleted successfully"},
                        status=status.HTTP_200_OK)
    else:
        return Response({"message": "You are not authorized to delete this comment"},
                        status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def report_comment(request, comment_id):
    comment = Comment.objects.get(id=comment_id)
    ReportComment.objects.create(
        reported_by=request.user,
        comment=comment
    )
    return Response({"message": "Comment reported successfully"}, status=status.HTTP_200_OK)