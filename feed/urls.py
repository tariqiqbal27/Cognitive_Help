from django.urls import path
from feed.views.post_views import create_post,get_all_posts,create_comment,get_post_and_comments,\
    delete_comment,delete_post, get_user_posts,get_my_posts,report_post,report_comment
from feed.views.comment_views import check_depression,check_stress

urlpatterns = [
    # Get all posts
    path('posts/',get_all_posts,name='get_post'),
    # Create post
    path('posts/create',create_post,name='create_post'),
    # delete post
    path('posts/delete/<int:post_id>',delete_post,name='delete_post'),
    # Create comment on Post
    path('posts/<int:post_id>/comments/',create_comment,name='create_comment'),
    # Get comments on Post
    path('comments/<int:post_id>/',get_post_and_comments),
    # delete comment on Post
    path('posts/<int:post_id>/comments/delete/<int:comment_id>',delete_comment,name='delete_comment'),
    # Get all posts belong to a particular user
    path('user/<int:user_id>',get_user_posts,name='get_user_posts'),
    # Get all posts belong to you
    path('user/me',get_my_posts,name='get_user_posts'),

    # report a particular post
    path('posts/report/<int:post_id>',report_post,name='report_post'),
    # report a particular comment
    path('comments/report/<int:comment_id>',report_comment,name='report_comment'),
    path('depression/',check_depression,name='check_depression'),
    path('stress/',check_stress,name='check_stress'),

]
