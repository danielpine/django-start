# -*-coding:utf-8 -*-
from django.shortcuts import render


def index(request):
    user = request.GET.get('user')
    request.session['u'] = user
    return render(request, 'index.html')
