# -*-coding:utf-8 -*-
from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.shortcuts import render


def index(request):
    return HttpResponse("Hello, world. You're at the rec index.哈哈")


def hello(request):
    return render(request, 'hello.html')


def robot(request):
    return render(request, 'robot.html')
