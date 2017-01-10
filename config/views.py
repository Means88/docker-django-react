# coding=utf-8
from django.shortcuts import render


def index(request, *args):
    return render(request, 'index.html', locals())
