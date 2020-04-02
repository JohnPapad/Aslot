# chat/urls.py
from django.urls import path

from . import views as vs
from rest_framework_jwt.views import obtain_jwt_token


urlpatterns = [
    path('users/signup', vs.UserCreate.as_view(),name='user-signup'),
    path('users/signin', vs.UserLogin.as_view(),name='user-signin'),
    path('users/report', vs.ReportCreate.as_view(),name='user-upload'),
    path('users/comment', vs.CommentCreate.as_view(),name='user-upload'),
    path('users/report/changeState', vs.ReportState.as_view(),name='user-State'),
    path('users/report/list', vs.ReportList.as_view()),
    path('users/report/own', vs.ReportOwn.as_view()),
    path('users/report/rate', vs.ReportRate.as_view()),
]


