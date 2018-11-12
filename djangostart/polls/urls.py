# -*-coding:utf-8 -*-
from . import testdb
from . import views
from django.urls import path
from django.conf.urls import url

urlpatterns = [
    path('', views.index, name='index'),
    url(r'^testdb$', testdb.testdb),
]