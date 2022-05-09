from django.contrib import admin
from .models import *


@admin.register(SportType)
class SportTypeAdmin(admin.ModelAdmin):

    list_display = ('id', 'title')
    list_display_links = ('id', 'title')
    search_fields = ('title',)
    readonly_fields = ('id', )
    fields = ('id', 'title')
    list_per_page = 10


@admin.register(Competitions)
class CompetitionsAdmin(admin.ModelAdmin):

    prepopulated_fields = {'competition_slug': ('title',)}
    list_display = ('id', 'title', 'competition_slug', 'start_date', 'end_date')
    list_display_links = ('id', 'title')
    search_fields = ('title',)
    readonly_fields = ('id', )
    fields = ('id', 'title', 'competition_slug', 'sport_types', 'content', 'start_date', 'end_date')
    list_per_page = 10


@admin.register(Competitors)
class CompetitorsAdmin(admin.ModelAdmin):

    list_display = ('id', 'gender', 'name_comp', 'surname_comp', 'patronymic_comp', 'name_trainer', 'surname_trainer', 'patronymic_trainer', 'birthday', 'sports_cat', 'best_res_pwlft_ek', 'best_res_pwlft_cl', 'best_res_bpress_ek', 'best_res_bpress_cl', 'weight_cat', 'phone', 'mail', 'comp_title', 'agree_pol', 'register_date', 'updated_at')
    list_display_links = ('id', 'name_comp', 'surname_comp', 'patronymic_comp')
    search_fields = ('surname_comp',)
    readonly_fields = ('id', 'register_date', 'updated_at')
    fields = ('id', 'gender', 'name_comp', 'surname_comp', 'patronymic_comp', 'club', 'name_trainer', 'surname_trainer', 'patronymic_trainer', 'birthday', 'sports_type', 'sports_cat', 'best_res_pwlft_ek', 'best_res_pwlft_cl', 'best_res_bpress_ek', 'best_res_bpress_cl', 'weight_cat', 'phone', 'mail', 'comp_title', 'agree_pol', 'register_date', 'updated_at')
    list_per_page = 10
