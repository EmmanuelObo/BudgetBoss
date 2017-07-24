"""hello_world URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.contrib import admin
from tastypie.api import Api

from app.api.resources import ListResource, UserResource, ItemResource, CategoryResource
from app.views import loginview, contentview, registerview, views
from lists.views import listviews

bb_api = Api(api_name='v1')
bb_api.register(ListResource())
bb_api.register(UserResource())
bb_api.register(CategoryResource())
bb_api.register(ItemResource())


urlpatterns = [
    url(r'^$', views.index),
    url(r'^home/$', views.home, name='home'),
    url(r'^list/$', listviews.central, name='users_lists'),
    url(r'^list/view/(\d+)/$', listviews.view, name='view_list'),
    url(r'^list/edit/(\d+)/$',listviews.editlist, name='edit_list'),
    url(r'^list/export/(\d+)/$',listviews.export, name='export_list'),
    url(r'^editlist/', listviews.editlist),
    url(r'^editlisttemp/', listviews.editlisttemplate),
    url(r'^login/', loginview.user_login, name='login'),
    url(r'^logout/', views.user_logout, name='logout'),
    url(r'^register/', registerview.register, name='register'),
    url(r'^admin/', admin.site.urls),
    url(r'^hometemp/', contentview.hometemplate),
    url(r'^listtemp/', listviews.listtemplate),
    url(r'^api/', include(bb_api.urls), name='api'),
     ]
# urlpatterns = format_suffix_patterns(urlpatterns)

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)