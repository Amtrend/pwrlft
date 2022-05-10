from django.contrib.sitemaps import Sitemap
from django.shortcuts import reverse
from .models import Competitions


class StaticSitemap(Sitemap):
    priority = 0.7
    changefreq = 'weekly'

    def items(self):
        return ['home', 'standards', 'privacy', 'news']

    def location(self, item):
        return reverse(item)


class CompetitionsSitemap(Sitemap):
    priority = 0.6
    changefreq = 'monthly'

    def items(self):
        return Competitions.objects.all()
