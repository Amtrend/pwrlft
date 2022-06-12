from .views import *
from django.urls import path
from django.views.generic import RedirectView, TemplateView
from django.contrib.auth import views as auth_views
from .sitemap import StaticSitemap, CompetitionsSitemap
from django.contrib.sitemaps.views import sitemap


sitemaps = {
    'static': StaticSitemap,
    'competitions': CompetitionsSitemap,
}


urlpatterns = [
    path('', main_page, name='home'),
    path('standards/', standards_page, name='standards'),
    path('privacy/', privacy_page, name='privacy'),
    path('competitions/', competitions_page, name='competitions'),
    path('competitions/<slug:competition_slug>/competiion_entry/', competition_entry_page, name='competition_entry'),
    path('competitions/<slug:competition_slug>/competitors/', competitors_page, name='competition_list'),
    path('competitions/<slug:competition_slug>/competition_protocol/', competition_protocol_page, name='competition_protocol'),
    path('news/', news_page, name='news'),
    path('robots.txt', TemplateView.as_view(template_name='robots.txt', content_type='text/plain')),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),
    path('favicon.ico', RedirectView.as_view(url='collect_static/img/favicon32.ico'), name='favicon'),
    path('accounts/login/', auth_views.LoginView.as_view(template_name='admin/login.html')),
    path('competitions/<slug:competition_slug>/secretary_page/', secretary_page, name='secretary_page'),
    path('competitions/<slug:competition_slug>/scoreboard_page/', scoreboard_page, name='scoreboard_page'),
    path('competitions/<slug:competition_slug>/scoreboard_comp_page/', scoreboard_comp_page, name='scoreboard_comp_page'),
    # path('competitions/<slug:competition_slug>/protocol_excel/', create_excel_protocol, name='competition_protocol_excel'),
]
