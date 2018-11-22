# -*-coding:utf-8 -*-
from . import testdb
from . import views
from django.urls import path
from django.conf.urls import url

urlpatterns = [
    path('', views.index, name='index'),
    url(r'^testdb$', testdb.testdb),
    url(r'^hello$', views.hello),
    url(r'^robot$', views.robot),
    url(r'^websocket/', views.websocket_test),
    url(r'^echo/', views.echo),
    url(r'^tank/', views.tank),
    url(r'^snake/', views.snake),
]