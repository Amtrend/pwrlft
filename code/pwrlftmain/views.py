from django.shortcuts import render
from .models import *


def main_page(request):
    return render(request, 'pwrlftmain/index.html')


def standards_page(request):
    return render(request, 'pwrlftmain/standards.html')


def privacy_page(request):
    return render(request, 'pwrlftmain/privacy.html')


def competitions_page(request):
    return render(request, 'pwrlftmain/competitions.html')


def news_page(request):
    return render(request, 'pwrlftmain/news.html')