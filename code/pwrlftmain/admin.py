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


@admin.register(CompetitorsFlow)
class CompetitorsFlowAdmin(admin.ModelAdmin):

    list_display = ('id', 'comp_flow')
    list_display_links = ('id', 'comp_flow')
    search_fields = ('comp_flow',)
    readonly_fields = ('id', )
    fields = ('id', 'comp_flow')
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
    list_filter = ('weight_cat', 'comp_title__title', 'gender')
    readonly_fields = ('id', 'register_date', 'updated_at')
    fields = ('id', 'gender', 'name_comp', 'surname_comp', 'patronymic_comp', 'club', 'name_trainer', 'surname_trainer', 'patronymic_trainer', 'birthday', 'sports_type', 'sports_cat', 'best_res_pwlft_ek', 'best_res_pwlft_cl', 'best_res_bpress_ek', 'best_res_bpress_cl', 'weight_cat', 'phone', 'mail', 'comp_title', 'agree_pol', 'register_date', 'updated_at')
    list_per_page = 10


@admin.register(CompetitionProtocols)
class CompetitionProtocolsAdmin(admin.ModelAdmin):

    list_display = ('id', 'competitor', 'competitor_weight', 'competitor_stream', 'first_attempt_squat_res', 'first_attempt_squat_off', 'second_attempt_squat_res', 'second_attempt_squat_off', 'third_attempt_squat_res', 'third_attempt_squat_off', 'first_attempt_bpress_res', 'first_attempt_bpress_off', 'second_attempt_bpress_res', 'second_attempt_bpress_off', 'third_attempt_bpress_res', 'third_attempt_bpress_off', 'first_attempt_dlift_res', 'first_attempt_dlift_off', 'second_attempt_dlift_res', 'second_attempt_dlift_off', 'third_attempt_dlift_res', 'third_attempt_dlift_off', 'best_squat_res', 'best_bpress_res', 'best_dlift_res', 'best_sum_res', 'register_date', 'updated_at', 'first_attempt_squat_res_ek', 'first_attempt_squat_off_ek', 'second_attempt_squat_res_ek', 'second_attempt_squat_off_ek', 'third_attempt_squat_res_ek', 'third_attempt_squat_off_ek', 'first_attempt_bpress_res_ek', 'first_attempt_bpress_off_ek', 'second_attempt_bpress_res_ek', 'second_attempt_bpress_off_ek', 'third_attempt_bpress_res_ek', 'third_attempt_bpress_off_ek', 'first_attempt_dlift_res_ek', 'first_attempt_dlift_off_ek', 'second_attempt_dlift_res_ek', 'second_attempt_dlift_off_ek', 'third_attempt_dlift_res_ek', 'third_attempt_dlift_off_ek', 'best_squat_res_ek', 'best_bpress_res_ek', 'best_dlift_res_ek', 'best_sum_res_ek', 'competitor_translation')
    list_display_links = ('id', 'competitor')
    search_fields = ('competitor',)
    list_filter = ('competitor__weight_cat', 'competitor__comp_title__title', 'competitor__gender', 'competitor_stream')
    readonly_fields = ('id', 'register_date', 'updated_at')
    fields = ('id', 'competitor', 'competitor_weight', 'competitor_stream', 'first_attempt_squat_res', 'first_attempt_squat_off', 'second_attempt_squat_res', 'second_attempt_squat_off', 'third_attempt_squat_res', 'third_attempt_squat_off', 'first_attempt_bpress_res', 'first_attempt_bpress_off', 'second_attempt_bpress_res', 'second_attempt_bpress_off', 'third_attempt_bpress_res', 'third_attempt_bpress_off', 'first_attempt_dlift_res', 'first_attempt_dlift_off', 'second_attempt_dlift_res', 'second_attempt_dlift_off', 'third_attempt_dlift_res', 'third_attempt_dlift_off', 'best_squat_res', 'best_bpress_res', 'best_dlift_res', 'best_sum_res', 'register_date', 'updated_at', 'first_attempt_squat_res_ek', 'first_attempt_squat_off_ek', 'second_attempt_squat_res_ek', 'second_attempt_squat_off_ek', 'third_attempt_squat_res_ek', 'third_attempt_squat_off_ek', 'first_attempt_bpress_res_ek', 'first_attempt_bpress_off_ek', 'second_attempt_bpress_res_ek', 'second_attempt_bpress_off_ek', 'third_attempt_bpress_res_ek', 'third_attempt_bpress_off_ek', 'first_attempt_dlift_res_ek', 'first_attempt_dlift_off_ek', 'second_attempt_dlift_res_ek', 'second_attempt_dlift_off_ek', 'third_attempt_dlift_res_ek', 'third_attempt_dlift_off_ek', 'best_squat_res_ek', 'best_bpress_res_ek', 'best_dlift_res_ek', 'best_sum_res_ek', 'competitor_translation')
    list_per_page = 10
