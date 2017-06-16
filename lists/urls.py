from django.conf.urls import url
from django.contrib import admin

from app.views import loginview, contentview, registerview, views
from lists.views import listviews
from lists.views.views import UserListView


from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    url(r'^$', UserListView.as_view()),
]
