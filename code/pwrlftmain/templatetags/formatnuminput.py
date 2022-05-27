from django import template
from django.template.defaultfilters import stringfilter


register = template.Library()


@register.filter
@stringfilter
def formatnuminput(value):
    result = '.'.join(value.split('.'))
    return result