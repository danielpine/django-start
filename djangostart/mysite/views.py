# -*-coding:utf-8 -*-
from django.shortcuts import render

def webgl(request):
    return render(request, 'webgl.html')
