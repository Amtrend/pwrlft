from .views import *
from django.urls import path
from django.views.generic import RedirectView, TemplateView


urlpatterns = [
    path('', main_page, name='home'),
    path('standards/', standards_page, name='standards'),
    path('privacy/', privacy_page, name='privacy'),
    path('competitions/', competitions_page, name='competitions'),
    path('news/', news_page, name='news'),
    path('robots.txt', TemplateView.as_view(template_name='robots.txt', content_type='text/plain')),
    path('favicon.ico', RedirectView.as_view(url='collect_static/img/favicon32.ico'), name='favicon'),
]
