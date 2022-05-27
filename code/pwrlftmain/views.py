from django.shortcuts import render
from .models import *
from django.http import JsonResponse
from django.template.loader import render_to_string
from django.core.mail import send_mail
from pwrlft.settings import EMAIL_HOST_USER
from django.contrib.auth.decorators import login_required
from django.db.models import F, Q
from django.core import serializers
# from django.contrib.gis.serializers.geojson import Serializer


def main_page(request):
    return render(request, 'pwrlftmain/index.html')


def standards_page(request):
    return render(request, 'pwrlftmain/standards.html')


def privacy_page(request):
    return render(request, 'pwrlftmain/privacy.html')


def competitions_page(request):
    competitions = Competitions.objects.all()
    response_data = {
        'competitions': competitions,
    }
    return render(request, 'pwrlftmain/competitions.html', response_data)


def competition_entry_page(request, competition_slug):
    cur_competition = Competitions.objects.get(competition_slug=competition_slug)
    response_data = {
        'cur_competition': cur_competition,
    }
    if "competition_entry-form_btn" in request.POST:
        # print(request.POST)
        gender_st = request.POST.get('competition_entry-form_gender')
        surname_comp = request.POST.get('competition_entry-form_sur-input')
        name_comp = request.POST.get('competition_entry-form_name-input')
        patronymic_comp = request.POST.get('competition_entry-form_patr-input')
        birthday = request.POST.get('competition_entry-form_birthday-input')
        weight_cat_st = request.POST.getlist('competition_entry-form_wcat')
        sports_cat = request.POST.get('competition_entry-form_sp-cat')
        sports_type_st = request.POST.getlist('competition_entry-form_sp-t_chckbx')
        best_res_pwlft_ek_st = request.POST.get('competition_entry-form_pwlekip-input')
        best_res_pwlft_cl_st = request.POST.get('competition_entry-form_pwlclass-input')
        best_res_bpress_ek_st = request.POST.get('competition_entry-form_bpekip-input')
        best_res_bpress_cl_st = request.POST.get('competition_entry-form_bp-input')
        mail = request.POST.get('competition_entry-form_mail-input')
        phone = request.POST.get('competition_entry-form_phone-input')
        surname_trainer = request.POST.get('competition_entry-form_sur-trn-input')
        name_trainer = request.POST.get('competition_entry-form_name-trn-input')
        patronymic_trainer = request.POST.get('competition_entry-form_patr-trn-input')
        club = request.POST.get('competition_entry-form_club-input')
        best_res_pwlft_ek = None
        best_res_pwlft_cl = None
        best_res_bpress_ek = None
        best_res_bpress_cl = None
        if best_res_pwlft_ek_st:
            best_res_pwlft_ek = float(best_res_pwlft_ek_st)
        if best_res_pwlft_cl_st:
            best_res_pwlft_cl = float(best_res_pwlft_cl_st)
        if best_res_bpress_ek_st:
            best_res_bpress_ek = float(best_res_bpress_ek_st)
        if best_res_bpress_cl_st:
            best_res_bpress_cl = float(best_res_bpress_cl_st)
        if gender_st == "competition_entry-form_gender-male":
            gender = "Мужской"
            weight_cat = weight_cat_st[0]
        else:
            gender = "Женский"
            weight_cat = weight_cat_st[1]
        try:
            new_competitor = Competitors(gender=gender, name_comp=name_comp, surname_comp=surname_comp, patronymic_comp=patronymic_comp, name_trainer=name_trainer, surname_trainer=surname_trainer, patronymic_trainer=patronymic_trainer, club=club, birthday=birthday, sports_cat=sports_cat, best_res_pwlft_ek=best_res_pwlft_ek, best_res_pwlft_cl=best_res_pwlft_cl, best_res_bpress_ek=best_res_bpress_ek, best_res_bpress_cl=best_res_bpress_cl, weight_cat=weight_cat, phone=phone, mail=mail, comp_title_id=cur_competition.id)
            new_competitor.save()
            for st in sports_type_st:
                sport_type_id = SportType.objects.get(title=st).id
                new_competitor.sports_type.add(sport_type_id)
        except Exception as e:
            return JsonResponse({"error": e}, status=500)
        if mail:
            competitors_list_link = f"https://powerlifting-kirov.ru/competitions/{competition_slug}/competitors"
            if gender == "Мужской" and weight_cat in ['93', '105', '120', '120+']:
                text_message = f'Благодарим Вас за регистрацию на соревнованиях {cur_competition.title}.\nСоревнования по вашей весовой категории ({weight_cat} кг) будут проходить {cur_competition.end_date}\nВзвешивание - {cur_competition.end_date} с 9:00, выступления участников с 11:00.\nЖелаем Вам удачного выступления и новых достижений!'
                html_message = render_to_string('email/competition_entry_mail.html', {'comp_title': cur_competition.title, 'weight_cat': weight_cat, 'end_date': cur_competition.end_date, 'competitors_list_link': competitors_list_link})
            else:
                text_message = f'Благодарим Вас за регистрацию на соревнованиях {cur_competition.title}.\nСоревнования по вашей весовой категории ({weight_cat} кг) будут проходить {cur_competition.start_date}\nВзвешивание - {cur_competition.start_date} с 9:00, выступления участников с 11:00.\nЖелаем Вам удачного выступления и новых достижений!'
                html_message = render_to_string('email/competition_entry_mail.html',
                                                {'comp_title': cur_competition.title, 'weight_cat': weight_cat,
                                                 'end_date': cur_competition.start_date, 'competitors_list_link': competitors_list_link})
            try:
                send_mail(f'Регистирация на соревнованиях {cur_competition.title}', text_message, EMAIL_HOST_USER, [mail], fail_silently=True, html_message=html_message)
            except Exception as e:
                pass
        return JsonResponse({"np": f"{name_comp} {patronymic_comp}"}, status=200)
    return render(request, 'pwrlftmain/competition_entry.html', response_data)


def competitors_page(request, competition_slug):
    cur_competition = Competitions.objects.get(competition_slug=competition_slug)
    competitors = Competitors.objects.filter(comp_title_id=cur_competition.id)
    # print(cur_competition)
    # print(competitors)
    # print(competitors.filter(sports_type__title="Жим лёжа (без экип.)", gender="Женский"))
    competitiors_pwlclass_m = ""
    competitiors_pwlclass_f = ""
    competitiors_pwlekip_m = ""
    competitiors_pwlekip_f = ""
    competitiors_bpekip_m = ""
    competitiors_bpekip_f = ""
    competitiors_bp_m = ""
    competitiors_bp_f = ""
    for sp_type in cur_competition.sport_types.all():
        if sp_type.title == "Троеборье классическое":
            competitiors_pwlclass_m = competitors.filter(sports_type__title="Троеборье классическое", gender="Мужской")
            competitiors_pwlclass_f = competitors.filter(sports_type__title="Троеборье классическое", gender="Женский")
        if sp_type.title == "Троеборье (экип.)":
            competitiors_pwlekip_m = competitors.filter(sports_type__title="Троеборье (экип.)", gender="Мужской")
            competitiors_pwlekip_f = competitors.filter(sports_type__title="Троеборье (экип.)", gender="Женский")
        if sp_type.title == "Жим лёжа (экип.)":
            competitiors_bpekip_m = competitors.filter(sports_type__title="Жим лёжа (экип.)", gender="Мужской")
            competitiors_bpekip_f = competitors.filter(sports_type__title="Жим лёжа (экип.)", gender="Женский")
        if sp_type.title == "Жим лёжа (без экип.)":
            competitiors_bp_m = competitors.filter(sports_type__title="Жим лёжа (без экип.)", gender="Мужской")
            competitiors_bp_f = competitors.filter(sports_type__title="Жим лёжа (без экип.)", gender="Женский")
    response_data = {
        'cur_competition': cur_competition,
        # 'competitors': competitors,
        'competitiors_pwlclass_m': competitiors_pwlclass_m,
        'competitiors_pwlclass_f': competitiors_pwlclass_f,
        'competitiors_pwlekip_m': competitiors_pwlekip_m,
        'competitiors_pwlekip_f': competitiors_pwlekip_f,
        'competitiors_bpekip_m': competitiors_bpekip_m,
        'competitiors_bpekip_f': competitiors_bpekip_f,
        'competitiors_bp_m': competitiors_bp_m,
        'competitiors_bp_f': competitiors_bp_f,
    }
    return render(request, 'pwrlftmain/competitors.html', response_data)


def competition_protocol_page(request, competition_slug):
    cur_competition = Competitions.objects.get(competition_slug=competition_slug)
    competitors = CompetitionProtocols.objects.filter(competitor__comp_title_id=cur_competition.id)
    competitiors_pwlclass_m = ""
    competitiors_pwlclass_f = ""
    competitiors_pwlekip_m = ""
    competitiors_pwlekip_f = ""
    competitiors_bpekip_m = ""
    competitiors_bpekip_f = ""
    competitiors_bp_m = ""
    competitiors_bp_f = ""
    competitiors_pwlclass_m_wcat = ""
    competitiors_pwlclass_f_wcat = ""
    competitiors_pwlekip_m_wcat = ""
    competitiors_pwlekip_f_wcat = ""
    competitiors_bpekip_m_wcat = ""
    competitiors_bpekip_f_wcat = ""
    competitiors_bp_m_wcat = ""
    competitiors_bp_f_wcat = ""
    for sp_type in cur_competition.sport_types.all():
        if sp_type.title == "Троеборье классическое":
            competitiors_pwlclass_m = competitors.filter(competitor__sports_type__title="Троеборье классическое", competitor__gender="Мужской").order_by("-best_sum_res")
            competitiors_pwlclass_m_wcat_st = competitiors_pwlclass_m.values_list("competitor__weight_cat", flat=True)
            competitiors_pwlclass_m_wcat = []
            for comppclmwc in competitiors_pwlclass_m_wcat_st:
                if comppclmwc not in competitiors_pwlclass_m_wcat:
                    competitiors_pwlclass_m_wcat.append(comppclmwc)
            competitiors_pwlclass_f = competitors.filter(competitor__sports_type__title="Троеборье классическое", competitor__gender="Женский").order_by("-best_sum_res")
            competitiors_pwlclass_f_wcat_st = competitiors_pwlclass_m.values_list("competitor__weight_cat", flat=True)
            competitiors_pwlclass_f_wcat = []
            for comppclfwc in competitiors_pwlclass_f_wcat_st:
                if comppclfwc not in competitiors_pwlclass_f_wcat:
                    competitiors_pwlclass_f_wcat.append(comppclfwc)
        if sp_type.title == "Троеборье (экип.)":
            competitiors_pwlekip_m = competitors.filter(competitor__sports_type__title="Троеборье (экип.)", competitor__gender="Мужской").order_by("-best_sum_res_ek")
            competitiors_pwlekip_m_wcat_st = competitiors_pwlclass_m.values_list("competitor__weight_cat", flat=True)
            competitiors_pwlekip_m_wcat = []
            for comppekmwc in competitiors_pwlekip_m_wcat_st:
                if comppekmwc not in competitiors_pwlekip_m_wcat:
                    competitiors_pwlekip_m_wcat.append(comppekmwc)
            competitiors_pwlekip_f = competitors.filter(competitor__sports_type__title="Троеборье (экип.)", competitor__gender="Женский").order_by("-best_sum_res_ek")
            competitiors_pwlekip_f_wcat_st = competitiors_pwlclass_m.values_list("competitor__weight_cat", flat=True)
            competitiors_pwlekip_f_wcat = []
            for comppekfwc in competitiors_pwlekip_f_wcat_st:
                if comppekfwc not in competitiors_pwlekip_f_wcat:
                    competitiors_pwlekip_f_wcat.append(comppekfwc)
        if sp_type.title == "Жим лёжа (экип.)":
            competitiors_bpekip_m = competitors.filter(competitor__sports_type__title="Жим лёжа (экип.)", competitor__gender="Мужской").order_by("-best_bpress_res_ek")
            competitiors_bpekip_m_wcat_st = competitiors_pwlclass_m.values_list("competitor__weight_cat", flat=True)
            competitiors_bpekip_m_wcat = []
            for combpekmwc in competitiors_bpekip_m_wcat_st:
                if combpekmwc not in competitiors_bpekip_m_wcat:
                    competitiors_bpekip_m_wcat.append(combpekmwc)
            competitiors_bpekip_f = competitors.filter(competitor__sports_type__title="Жим лёжа (экип.)", competitor__gender="Женский").order_by("-best_bpress_res_ek")
            competitiors_bpekip_f_wcat_st = competitiors_pwlclass_m.values_list("competitor__weight_cat", flat=True)
            competitiors_bpekip_f_wcat = []
            for combpekfwc in competitiors_bpekip_f_wcat_st:
                if combpekfwc not in competitiors_bpekip_f_wcat:
                    competitiors_bpekip_f_wcat.append(combpekfwc)
        if sp_type.title == "Жим лёжа (без экип.)":
            competitiors_bp_m = competitors.filter(competitor__sports_type__title="Жим лёжа (без экип.)", competitor__gender="Мужской").order_by("-best_bpress_res")
            competitiors_bp_m_wcat_st = competitiors_pwlclass_m.values_list("competitor__weight_cat", flat=True)
            competitiors_bp_m_wcat = []
            for combpclmwc in competitiors_bp_m_wcat_st:
                if combpclmwc not in competitiors_bp_m_wcat:
                    competitiors_bp_m_wcat.append(combpclmwc)
            competitiors_bp_f = competitors.filter(competitor__sports_type__title="Жим лёжа (без экип.)", competitor__gender="Женский").order_by("-best_bpress_res")
            competitiors_bp_f_wcat_st = competitiors_pwlclass_m.values_list("competitor__weight_cat", flat=True)
            competitiors_bp_f_wcat = []
            for combpclfwc in competitiors_bp_f_wcat_st:
                if combpclfwc not in competitiors_bp_f_wcat:
                    competitiors_bp_f_wcat.append(combpclfwc)
    response_data = {
        'cur_competition': cur_competition,
        'competitiors_pwlclass_m': competitiors_pwlclass_m,
        'competitiors_pwlclass_f': competitiors_pwlclass_f,
        'competitiors_pwlekip_m': competitiors_pwlekip_m,
        'competitiors_pwlekip_f': competitiors_pwlekip_f,
        'competitiors_bpekip_m': competitiors_bpekip_m,
        'competitiors_bpekip_f': competitiors_bpekip_f,
        'competitiors_bp_m': competitiors_bp_m,
        'competitiors_bp_f': competitiors_bp_f,
        'competitiors_pwlclass_m_wcat': competitiors_pwlclass_m_wcat,
        'competitiors_pwlclass_f_wcat': competitiors_pwlclass_f_wcat,
        'competitiors_pwlekip_m_wcat': competitiors_pwlekip_m_wcat,
        'competitiors_pwlekip_f_wcat': competitiors_pwlekip_f_wcat,
        'competitiors_bpekip_m_wcat': competitiors_bpekip_m_wcat,
        'competitiors_bpekip_f_wcat': competitiors_bpekip_f_wcat,
        'competitiors_bp_m_wcat': competitiors_bp_m_wcat,
        'competitiors_bp_f_wcat': competitiors_bp_f_wcat,
    }
    return render(request, 'pwrlftmain/competition_protocol.html', response_data)


def news_page(request):
    return render(request, 'pwrlftmain/news.html')


@login_required
def secretary_page(request, competition_slug):
    cur_competition = Competitions.objects.get(competition_slug=competition_slug)
    # competitors = Competitors.objects.filter(comp_title_id=cur_competition.id)
    competitors_st = CompetitionProtocols.objects.filter(competitor__comp_title__competition_slug=competition_slug)
    # competitors = CompetitionProtocols.objects.filter(competitor__comp_title__competition_slug=competition_slug).order_by(F("first_attempt_squat_res").asc(nulls_last=True))
    # competitors_gender_st = competitors.values_list('competitor__gender', flat=True)
    competitors_stypes_st = competitors_st.values_list('competitor__sports_type__title', flat=True)
    competitors_wcats_st = competitors_st.values_list('competitor__weight_cat', flat=True)
    competitors_stypes = []
    competitor_wcats = []
    for csts in competitors_stypes_st:
        if csts not in competitors_stypes:
            competitors_stypes.append(csts)
    for csws in competitors_wcats_st:
        if csws not in competitor_wcats:
            competitor_wcats.append(csws)
    if "Троеборье классическое" in competitors_stypes:
        competitors = competitors_st.order_by(F("first_attempt_squat_res").asc(nulls_last=True))
    elif "Троеборье (экип.)" in competitors_stypes:
        competitors = competitors_st.order_by(F("first_attempt_squat_res_ek").asc(nulls_last=True))
    elif "Жим лёжа (без экип.)" in competitors_stypes:
        competitors = competitors_st.order_by(F("first_attempt_bpress_res").asc(nulls_last=True))
    else:
        competitors = competitors_st.order_by(F("first_attempt_bpress_res_ek").asc(nulls_last=True))
    competitors_streams_st = competitors.values_list('competitor_stream', flat=True).order_by()
    competitors_streams = []
    for comstr in competitors_streams_st:
        if comstr not in competitors_streams:
            competitors_streams.append(comstr)
    selected_stream = request.GET.get('form-secretary_stream-select')
    # print(None not in competitors.filter(Q(competitor__sports_type__title="Троеборье классическое") & Q(competitor__sports_type__title="Троеборье (экип.)")).values_list('third_attempt_squat_off', flat=True))

    if selected_stream and selected_stream != "все":
        competitors_str = CompetitionProtocols.objects.filter(competitor__comp_title__competition_slug=competition_slug, competitor_stream=selected_stream)
        competitors_stypes_st = competitors_str.values_list('competitor__sports_type__title', flat=True)
        competitors_wcats_st = competitors_str.values_list('competitor__weight_cat', flat=True)
        competitors_stypes = []
        competitor_wcats = []
        for csts in competitors_stypes_st:
            if csts not in competitors_stypes:
                competitors_stypes.append(csts)
        for csws in competitors_wcats_st:
            if csws not in competitor_wcats:
                competitor_wcats.append(csws)
        if "Троеборье классическое" in competitors_stypes:
            competitors = competitors_str.order_by(F("first_attempt_squat_res").asc(nulls_last=True))
            if None not in competitors.filter(Q(competitor__sports_type__title="Троеборье классическое") & Q(competitor__sports_type__title="Троеборье (экип.)")).values_list('third_attempt_squat_off', flat=True):
                competitors = competitors_str.order_by(F("first_attempt_bpress_res").asc(nulls_last=True))
                if None not in competitors.filter(Q(competitor__sports_type__title="Троеборье классическое") & Q(competitor__sports_type__title="Троеборье (экип.)")).values_list('third_attempt_bpress_off', flat=True):
                    competitors = competitors_str.order_by(F("first_attempt_dlift_res").asc(nulls_last=True))
        elif "Троеборье (экип.)" in competitors_stypes:
            competitors = competitors_str.order_by(F("first_attempt_squat_res_ek").asc(nulls_last=True))
            if None not in competitors.filter(competitor__sports_type__title="Троеборье (экип.)").values_list('third_attempt_squat_off_ek', flat=True):
                competitors = competitors_str.order_by(F("first_attempt_bpress_res_ek").asc(nulls_last=True))
                if None not in competitors.filter(competitor__sports_type__title="Троеборье (экип.)").values_list('third_attempt_bpress_off_ek', flat=True):
                    competitors = competitors_str.order_by(F("first_attempt_dlift_res_ek").asc(nulls_last=True))
        elif "Жим лёжа (без экип.)" in competitors_stypes:
            competitors = competitors_str.order_by(F("first_attempt_bpress_res").asc(nulls_last=True))
        else:
            competitors = competitors_str.order_by(F("first_attempt_bpress_res_ek").asc(nulls_last=True))
        # print(competitors.values_list('competitor__sports_type__title', flat=True))
        # print(competitors.values_list('first_attempt_squat_off', flat=True))
        # if None not in competitors.values_list('third_attempt_squat_off', flat=True):
        #     competitors = CompetitionProtocols.objects.filter(competitor__comp_title__competition_slug=competition_slug, competitor_stream=selected_stream).order_by("-first_attempt_bpress_res")
    response_data = {
        'cur_competition': cur_competition,
        'competitors': competitors,
        'competitors_streams': competitors_streams,
        'competitors_stypes': competitors_stypes,
        'competitor_wcats': competitor_wcats,
        # 'counter': counter,
    }
    if 'secr-page_form-btn-plclass' in request.POST:
        # print(request.POST)
        comp_pk = request.POST.get('secr-page_form-btn-plclass')
        first_attempt_squat_res = request.POST.get('secr-page_form-fat-squat-res')
        if first_attempt_squat_res:
            first_attempt_squat_res = Decimal(first_attempt_squat_res)
        else:
            first_attempt_squat_res = None
        first_attempt_squat_off = request.POST.get('secr-page_form-fat-squat-off')
        second_attempt_squat_res = request.POST.get('secr-page_form-sat-squat-res')
        if second_attempt_squat_res:
            second_attempt_squat_res = Decimal(second_attempt_squat_res)
        else:
            second_attempt_squat_res = None
        second_attempt_squat_off = request.POST.get('secr-page_form-sat-squat-off')
        third_attempt_squat_res = request.POST.get('secr-page_form-tat-squat-res')
        if third_attempt_squat_res:
            third_attempt_squat_res = Decimal(third_attempt_squat_res)
        else:
            third_attempt_squat_res = None
        third_attempt_squat_off = request.POST.get('secr-page_form-tat-squat-off')
        first_attempt_bpress_res = request.POST.get('secr-page_form-fat-bpress-res')
        if first_attempt_bpress_res:
            first_attempt_bpress_res = Decimal(first_attempt_bpress_res)
        else:
            first_attempt_bpress_res = None
        first_attempt_bpress_off = request.POST.get('secr-page_form-fat-bpress-off')
        second_attempt_bpress_res = request.POST.get('secr-page_form-sat-bpress-res')
        if second_attempt_bpress_res:
            second_attempt_bpress_res = Decimal(second_attempt_bpress_res)
        else:
            second_attempt_bpress_res = None
        second_attempt_bpress_off = request.POST.get('secr-page_form-sat-bpress-off')
        third_attempt_bpress_res = request.POST.get('secr-page_form-tat-bpress-res')
        if third_attempt_bpress_res:
            third_attempt_bpress_res = Decimal(third_attempt_bpress_res)
        else:
            third_attempt_bpress_res = None
        third_attempt_bpress_off = request.POST.get('secr-page_form-tat-bpress-off')
        first_attempt_dlift_res = request.POST.get('secr-page_form-fat-dlift-res')
        if first_attempt_dlift_res:
            first_attempt_dlift_res = Decimal(first_attempt_dlift_res)
        else:
            first_attempt_dlift_res = None
        first_attempt_dlift_off = request.POST.get('secr-page_form-fat-dlift-off')
        second_attempt_dlift_res = request.POST.get('secr-page_form-sat-dlift-res')
        if second_attempt_dlift_res:
            second_attempt_dlift_res = Decimal(second_attempt_dlift_res)
        else:
            second_attempt_dlift_res = None
        second_attempt_dlift_off = request.POST.get('secr-page_form-sat-dlift-off')
        third_attempt_dlift_res = request.POST.get('secr-page_form-tat-dlift-res')
        if third_attempt_dlift_res:
            third_attempt_dlift_res = Decimal(third_attempt_dlift_res)
        else:
            third_attempt_dlift_res = None
        third_attempt_dlift_off = request.POST.get('secr-page_form-tat-dlift-off')
        cur_comp = CompetitionProtocols.objects.get(pk=comp_pk)
        # best_squat_res = ''
        # best_bpress_res = ''
        # best_dlift_res = ''
        # best_sum_res = ''
        comp_transl = request.POST.get('secr-page_chckbx')

        # print(first_attempt_squat_res)
        # print(Decimal(first_attempt_squat_res))
        # if first_attempt_squat_res and first_attempt_squat_off in ['2', '3']:
        #     best_squat_res = first_attempt_squat_res
        # if second_attempt_squat_res and second_attempt_squat_off in ['2', '3'] and second_attempt_squat_res > first_attempt_squat_res:
        #     best_squat_res = second_attempt_squat_res
        # if third_attempt_squat_res and third_attempt_squat_off in ['2', '3'] and third_attempt_squat_res > first_attempt_squat_res and third_attempt_squat_res > second_attempt_squat_res:
        #     best_squat_res = third_attempt_squat_res
        # if first_attempt_bpress_res and first_attempt_bpress_off in ['2', '3']:
        #     best_bpress_res = first_attempt_bpress_res
        # if second_attempt_bpress_res and second_attempt_bpress_off in ['2', '3'] and second_attempt_bpress_res > first_attempt_bpress_res:
        #     best_bpress_res = second_attempt_bpress_res
        # if third_attempt_bpress_res and third_attempt_bpress_off in ['2', '3'] and third_attempt_bpress_res > first_attempt_bpress_res and third_attempt_bpress_res > second_attempt_bpress_res:
        #     best_bpress_res = third_attempt_bpress_res
        # if first_attempt_dlift_res and first_attempt_dlift_off in ['2', '3']:
        #     best_bpress_res = first_attempt_dlift_res
        # if second_attempt_dlift_res and second_attempt_dlift_off in ['2', '3'] and second_attempt_dlift_res > first_attempt_dlift_res:
        #     best_bpress_res = second_attempt_dlift_res
        # if third_attempt_dlift_res and third_attempt_dlift_off in ['2', '3'] and third_attempt_dlift_res > first_attempt_dlift_res and third_attempt_dlift_res > second_attempt_dlift_res:
        #     best_bpress_res = third_attempt_dlift_res
        # if best_squat_res and not best_bpress_res and not best_dlift_res:
        #     best_sum_res = best_squat_res
        # if best_bpress_res and not best_squat_res and not best_dlift_res:
        #     best_sum_res = best_bpress_res
        # if best_dlift_res and not best_squat_res and not best_bpress_res:
        #     best_sum_res = best_dlift_res
        # if best_squat_res and best_bpress_res and not best_dlift_res:
        #     best_sum_res = Decimal(best_squat_res) + Decimal(best_bpress_res)
        # if best_squat_res and best_dlift_res and not best_bpress_res:
        #     best_sum_res = Decimal(best_squat_res) + Decimal(best_dlift_res)
        # if best_bpress_res and best_dlift_res and not best_squat_res:
        #     best_sum_res = Decimal(best_bpress_res) + Decimal(best_dlift_res)
        # if best_squat_res and best_bpress_res and best_dlift_res:
        #     best_sum_res = Decimal(best_squat_res) + Decimal(best_bpress_res) + Decimal(best_dlift_res)
        cur_transl = CompetitionProtocols.objects.exclude(competitor_translation=None)
        # print(comp_transl)
        # print(cur_transl)
        if comp_transl and cur_transl:
            # print(comp_transl)
            # print(cur_transl[0].competitor_translation)
            if comp_transl != cur_transl[0].competitor_translation:
                return JsonResponse({"error": "Нельзя запускать две трансляции одновременно. Сначала закончите существующую."}, status=302)
        if cur_transl:
            cur_transl_val = cur_transl.values_list('competitor_translation', flat=True)[0]
            cur_transl_pk = cur_transl.values_list('id', flat=True)[0]
            if comp_pk == str(cur_transl_pk):
                if cur_transl_val == "Присед 1 класс" and first_attempt_squat_off:
                    # CompetitionProtocols.objects.filter(pk=cur_transl_pk).update(competitor_translation=None)
                    cur_comp.first_attempt_squat_res = first_attempt_squat_res
                    cur_comp.first_attempt_squat_off = first_attempt_squat_off
                    cur_comp.second_attempt_squat_res = second_attempt_squat_res
                    cur_comp.second_attempt_squat_off = second_attempt_squat_off
                    cur_comp.third_attempt_squat_res = third_attempt_squat_res
                    cur_comp.third_attempt_squat_off = third_attempt_squat_off
                    cur_comp.first_attempt_bpress_res = first_attempt_bpress_res
                    cur_comp.first_attempt_bpress_off = first_attempt_bpress_off
                    cur_comp.second_attempt_bpress_res = second_attempt_bpress_res
                    cur_comp.second_attempt_bpress_off = second_attempt_bpress_off
                    cur_comp.third_attempt_bpress_res = third_attempt_bpress_res
                    cur_comp.third_attempt_bpress_off = third_attempt_bpress_off
                    cur_comp.first_attempt_dlift_res = first_attempt_dlift_res
                    cur_comp.first_attempt_dlift_off = first_attempt_dlift_off
                    cur_comp.second_attempt_dlift_res = second_attempt_dlift_res
                    cur_comp.second_attempt_dlift_off = second_attempt_dlift_off
                    cur_comp.third_attempt_dlift_res = third_attempt_dlift_res
                    cur_comp.third_attempt_dlift_off = third_attempt_dlift_off
                    cur_comp.competitor_translation = comp_transl
                    cur_comp.save()
                    return JsonResponse({"first_attempt_squat_res": first_attempt_squat_res, "first_attempt_squat_off": first_attempt_squat_off,
                                         "second_attempt_squat_res": second_attempt_squat_res, "second_attempt_squat_off": second_attempt_squat_off,
                                         "third_attempt_squat_res": third_attempt_squat_res, "third_attempt_squat_off": third_attempt_squat_off,
                                         "first_attempt_bpress_res": first_attempt_bpress_res, "first_attempt_bpress_off": first_attempt_bpress_off,
                                         "second_attempt_bpress_res": second_attempt_bpress_res, "second_attempt_bpress_off": second_attempt_bpress_off,
                                         "third_attempt_bpress_res": third_attempt_bpress_res, "third_attempt_bpress_off": third_attempt_bpress_off,
                                         "first_attempt_dlift_res": first_attempt_dlift_res, "first_attempt_dlift_off": first_attempt_dlift_off,
                                         "second_attempt_dlift_res": second_attempt_dlift_res, "second_attempt_dlift_off": second_attempt_dlift_off,
                                         "third_attempt_dlift_res": third_attempt_dlift_res, "third_attempt_dlift_off": third_attempt_dlift_off, "comp_transl": comp_transl}, status=200)
                if cur_transl_val == "Присед 2 класс" and second_attempt_squat_off:
                    cur_comp.first_attempt_squat_res = first_attempt_squat_res
                    cur_comp.first_attempt_squat_off = first_attempt_squat_off
                    cur_comp.second_attempt_squat_res = second_attempt_squat_res
                    cur_comp.second_attempt_squat_off = second_attempt_squat_off
                    cur_comp.third_attempt_squat_res = third_attempt_squat_res
                    cur_comp.third_attempt_squat_off = third_attempt_squat_off
                    cur_comp.first_attempt_bpress_res = first_attempt_bpress_res
                    cur_comp.first_attempt_bpress_off = first_attempt_bpress_off
                    cur_comp.second_attempt_bpress_res = second_attempt_bpress_res
                    cur_comp.second_attempt_bpress_off = second_attempt_bpress_off
                    cur_comp.third_attempt_bpress_res = third_attempt_bpress_res
                    cur_comp.third_attempt_bpress_off = third_attempt_bpress_off
                    cur_comp.first_attempt_dlift_res = first_attempt_dlift_res
                    cur_comp.first_attempt_dlift_off = first_attempt_dlift_off
                    cur_comp.second_attempt_dlift_res = second_attempt_dlift_res
                    cur_comp.second_attempt_dlift_off = second_attempt_dlift_off
                    cur_comp.third_attempt_dlift_res = third_attempt_dlift_res
                    cur_comp.third_attempt_dlift_off = third_attempt_dlift_off
                    cur_comp.competitor_translation = comp_transl
                    cur_comp.save()
                    return JsonResponse({"first_attempt_squat_res": first_attempt_squat_res,
                                         "first_attempt_squat_off": first_attempt_squat_off,
                                         "second_attempt_squat_res": second_attempt_squat_res,
                                         "second_attempt_squat_off": second_attempt_squat_off,
                                         "third_attempt_squat_res": third_attempt_squat_res,
                                         "third_attempt_squat_off": third_attempt_squat_off,
                                         "first_attempt_bpress_res": first_attempt_bpress_res,
                                         "first_attempt_bpress_off": first_attempt_bpress_off,
                                         "second_attempt_bpress_res": second_attempt_bpress_res,
                                         "second_attempt_bpress_off": second_attempt_bpress_off,
                                         "third_attempt_bpress_res": third_attempt_bpress_res,
                                         "third_attempt_bpress_off": third_attempt_bpress_off,
                                         "first_attempt_dlift_res": first_attempt_dlift_res,
                                         "first_attempt_dlift_off": first_attempt_dlift_off,
                                         "second_attempt_dlift_res": second_attempt_dlift_res,
                                         "second_attempt_dlift_off": second_attempt_dlift_off,
                                         "third_attempt_dlift_res": third_attempt_dlift_res,
                                         "third_attempt_dlift_off": third_attempt_dlift_off,
                                         "comp_transl": comp_transl}, status=200)
                if cur_transl_val == "Присед 3 класс" and third_attempt_squat_off:
                    cur_comp.first_attempt_squat_res = first_attempt_squat_res
                    cur_comp.first_attempt_squat_off = first_attempt_squat_off
                    cur_comp.second_attempt_squat_res = second_attempt_squat_res
                    cur_comp.second_attempt_squat_off = second_attempt_squat_off
                    cur_comp.third_attempt_squat_res = third_attempt_squat_res
                    cur_comp.third_attempt_squat_off = third_attempt_squat_off
                    cur_comp.first_attempt_bpress_res = first_attempt_bpress_res
                    cur_comp.first_attempt_bpress_off = first_attempt_bpress_off
                    cur_comp.second_attempt_bpress_res = second_attempt_bpress_res
                    cur_comp.second_attempt_bpress_off = second_attempt_bpress_off
                    cur_comp.third_attempt_bpress_res = third_attempt_bpress_res
                    cur_comp.third_attempt_bpress_off = third_attempt_bpress_off
                    cur_comp.first_attempt_dlift_res = first_attempt_dlift_res
                    cur_comp.first_attempt_dlift_off = first_attempt_dlift_off
                    cur_comp.second_attempt_dlift_res = second_attempt_dlift_res
                    cur_comp.second_attempt_dlift_off = second_attempt_dlift_off
                    cur_comp.third_attempt_dlift_res = third_attempt_dlift_res
                    cur_comp.third_attempt_dlift_off = third_attempt_dlift_off
                    cur_comp.competitor_translation = comp_transl
                    cur_comp.save()
                    return JsonResponse({"first_attempt_squat_res": first_attempt_squat_res,
                                         "first_attempt_squat_off": first_attempt_squat_off,
                                         "second_attempt_squat_res": second_attempt_squat_res,
                                         "second_attempt_squat_off": second_attempt_squat_off,
                                         "third_attempt_squat_res": third_attempt_squat_res,
                                         "third_attempt_squat_off": third_attempt_squat_off,
                                         "first_attempt_bpress_res": first_attempt_bpress_res,
                                         "first_attempt_bpress_off": first_attempt_bpress_off,
                                         "second_attempt_bpress_res": second_attempt_bpress_res,
                                         "second_attempt_bpress_off": second_attempt_bpress_off,
                                         "third_attempt_bpress_res": third_attempt_bpress_res,
                                         "third_attempt_bpress_off": third_attempt_bpress_off,
                                         "first_attempt_dlift_res": first_attempt_dlift_res,
                                         "first_attempt_dlift_off": first_attempt_dlift_off,
                                         "second_attempt_dlift_res": second_attempt_dlift_res,
                                         "second_attempt_dlift_off": second_attempt_dlift_off,
                                         "third_attempt_dlift_res": third_attempt_dlift_res,
                                         "third_attempt_dlift_off": third_attempt_dlift_off,
                                         "comp_transl": comp_transl}, status=200)
                if cur_transl_val == "Жим 1 класс" and first_attempt_bpress_off:
                    cur_comp.first_attempt_squat_res = first_attempt_squat_res
                    cur_comp.first_attempt_squat_off = first_attempt_squat_off
                    cur_comp.second_attempt_squat_res = second_attempt_squat_res
                    cur_comp.second_attempt_squat_off = second_attempt_squat_off
                    cur_comp.third_attempt_squat_res = third_attempt_squat_res
                    cur_comp.third_attempt_squat_off = third_attempt_squat_off
                    cur_comp.first_attempt_bpress_res = first_attempt_bpress_res
                    cur_comp.first_attempt_bpress_off = first_attempt_bpress_off
                    cur_comp.second_attempt_bpress_res = second_attempt_bpress_res
                    cur_comp.second_attempt_bpress_off = second_attempt_bpress_off
                    cur_comp.third_attempt_bpress_res = third_attempt_bpress_res
                    cur_comp.third_attempt_bpress_off = third_attempt_bpress_off
                    cur_comp.first_attempt_dlift_res = first_attempt_dlift_res
                    cur_comp.first_attempt_dlift_off = first_attempt_dlift_off
                    cur_comp.second_attempt_dlift_res = second_attempt_dlift_res
                    cur_comp.second_attempt_dlift_off = second_attempt_dlift_off
                    cur_comp.third_attempt_dlift_res = third_attempt_dlift_res
                    cur_comp.third_attempt_dlift_off = third_attempt_dlift_off
                    cur_comp.competitor_translation = comp_transl
                    cur_comp.save()
                    return JsonResponse({"first_attempt_squat_res": first_attempt_squat_res,
                                         "first_attempt_squat_off": first_attempt_squat_off,
                                         "second_attempt_squat_res": second_attempt_squat_res,
                                         "second_attempt_squat_off": second_attempt_squat_off,
                                         "third_attempt_squat_res": third_attempt_squat_res,
                                         "third_attempt_squat_off": third_attempt_squat_off,
                                         "first_attempt_bpress_res": first_attempt_bpress_res,
                                         "first_attempt_bpress_off": first_attempt_bpress_off,
                                         "second_attempt_bpress_res": second_attempt_bpress_res,
                                         "second_attempt_bpress_off": second_attempt_bpress_off,
                                         "third_attempt_bpress_res": third_attempt_bpress_res,
                                         "third_attempt_bpress_off": third_attempt_bpress_off,
                                         "first_attempt_dlift_res": first_attempt_dlift_res,
                                         "first_attempt_dlift_off": first_attempt_dlift_off,
                                         "second_attempt_dlift_res": second_attempt_dlift_res,
                                         "second_attempt_dlift_off": second_attempt_dlift_off,
                                         "third_attempt_dlift_res": third_attempt_dlift_res,
                                         "third_attempt_dlift_off": third_attempt_dlift_off,
                                         "comp_transl": comp_transl}, status=200)
                if cur_transl_val == "Жим 2 класс" and second_attempt_bpress_off:
                    cur_comp.first_attempt_squat_res = first_attempt_squat_res
                    cur_comp.first_attempt_squat_off = first_attempt_squat_off
                    cur_comp.second_attempt_squat_res = second_attempt_squat_res
                    cur_comp.second_attempt_squat_off = second_attempt_squat_off
                    cur_comp.third_attempt_squat_res = third_attempt_squat_res
                    cur_comp.third_attempt_squat_off = third_attempt_squat_off
                    cur_comp.first_attempt_bpress_res = first_attempt_bpress_res
                    cur_comp.first_attempt_bpress_off = first_attempt_bpress_off
                    cur_comp.second_attempt_bpress_res = second_attempt_bpress_res
                    cur_comp.second_attempt_bpress_off = second_attempt_bpress_off
                    cur_comp.third_attempt_bpress_res = third_attempt_bpress_res
                    cur_comp.third_attempt_bpress_off = third_attempt_bpress_off
                    cur_comp.first_attempt_dlift_res = first_attempt_dlift_res
                    cur_comp.first_attempt_dlift_off = first_attempt_dlift_off
                    cur_comp.second_attempt_dlift_res = second_attempt_dlift_res
                    cur_comp.second_attempt_dlift_off = second_attempt_dlift_off
                    cur_comp.third_attempt_dlift_res = third_attempt_dlift_res
                    cur_comp.third_attempt_dlift_off = third_attempt_dlift_off
                    cur_comp.competitor_translation = comp_transl
                    cur_comp.save()
                    return JsonResponse({"first_attempt_squat_res": first_attempt_squat_res,
                                         "first_attempt_squat_off": first_attempt_squat_off,
                                         "second_attempt_squat_res": second_attempt_squat_res,
                                         "second_attempt_squat_off": second_attempt_squat_off,
                                         "third_attempt_squat_res": third_attempt_squat_res,
                                         "third_attempt_squat_off": third_attempt_squat_off,
                                         "first_attempt_bpress_res": first_attempt_bpress_res,
                                         "first_attempt_bpress_off": first_attempt_bpress_off,
                                         "second_attempt_bpress_res": second_attempt_bpress_res,
                                         "second_attempt_bpress_off": second_attempt_bpress_off,
                                         "third_attempt_bpress_res": third_attempt_bpress_res,
                                         "third_attempt_bpress_off": third_attempt_bpress_off,
                                         "first_attempt_dlift_res": first_attempt_dlift_res,
                                         "first_attempt_dlift_off": first_attempt_dlift_off,
                                         "second_attempt_dlift_res": second_attempt_dlift_res,
                                         "second_attempt_dlift_off": second_attempt_dlift_off,
                                         "third_attempt_dlift_res": third_attempt_dlift_res,
                                         "third_attempt_dlift_off": third_attempt_dlift_off,
                                         "comp_transl": comp_transl}, status=200)
                if cur_transl_val == "Жим 3 класс" and third_attempt_bpress_off:
                    cur_comp.first_attempt_squat_res = first_attempt_squat_res
                    cur_comp.first_attempt_squat_off = first_attempt_squat_off
                    cur_comp.second_attempt_squat_res = second_attempt_squat_res
                    cur_comp.second_attempt_squat_off = second_attempt_squat_off
                    cur_comp.third_attempt_squat_res = third_attempt_squat_res
                    cur_comp.third_attempt_squat_off = third_attempt_squat_off
                    cur_comp.first_attempt_bpress_res = first_attempt_bpress_res
                    cur_comp.first_attempt_bpress_off = first_attempt_bpress_off
                    cur_comp.second_attempt_bpress_res = second_attempt_bpress_res
                    cur_comp.second_attempt_bpress_off = second_attempt_bpress_off
                    cur_comp.third_attempt_bpress_res = third_attempt_bpress_res
                    cur_comp.third_attempt_bpress_off = third_attempt_bpress_off
                    cur_comp.first_attempt_dlift_res = first_attempt_dlift_res
                    cur_comp.first_attempt_dlift_off = first_attempt_dlift_off
                    cur_comp.second_attempt_dlift_res = second_attempt_dlift_res
                    cur_comp.second_attempt_dlift_off = second_attempt_dlift_off
                    cur_comp.third_attempt_dlift_res = third_attempt_dlift_res
                    cur_comp.third_attempt_dlift_off = third_attempt_dlift_off
                    cur_comp.competitor_translation = comp_transl
                    cur_comp.save()
                    return JsonResponse({"first_attempt_squat_res": first_attempt_squat_res,
                                         "first_attempt_squat_off": first_attempt_squat_off,
                                         "second_attempt_squat_res": second_attempt_squat_res,
                                         "second_attempt_squat_off": second_attempt_squat_off,
                                         "third_attempt_squat_res": third_attempt_squat_res,
                                         "third_attempt_squat_off": third_attempt_squat_off,
                                         "first_attempt_bpress_res": first_attempt_bpress_res,
                                         "first_attempt_bpress_off": first_attempt_bpress_off,
                                         "second_attempt_bpress_res": second_attempt_bpress_res,
                                         "second_attempt_bpress_off": second_attempt_bpress_off,
                                         "third_attempt_bpress_res": third_attempt_bpress_res,
                                         "third_attempt_bpress_off": third_attempt_bpress_off,
                                         "first_attempt_dlift_res": first_attempt_dlift_res,
                                         "first_attempt_dlift_off": first_attempt_dlift_off,
                                         "second_attempt_dlift_res": second_attempt_dlift_res,
                                         "second_attempt_dlift_off": second_attempt_dlift_off,
                                         "third_attempt_dlift_res": third_attempt_dlift_res,
                                         "third_attempt_dlift_off": third_attempt_dlift_off,
                                         "comp_transl": comp_transl}, status=200)
                if cur_transl_val == "Тяга 1 класс" and first_attempt_dlift_off:
                    cur_comp.first_attempt_squat_res = first_attempt_squat_res
                    cur_comp.first_attempt_squat_off = first_attempt_squat_off
                    cur_comp.second_attempt_squat_res = second_attempt_squat_res
                    cur_comp.second_attempt_squat_off = second_attempt_squat_off
                    cur_comp.third_attempt_squat_res = third_attempt_squat_res
                    cur_comp.third_attempt_squat_off = third_attempt_squat_off
                    cur_comp.first_attempt_bpress_res = first_attempt_bpress_res
                    cur_comp.first_attempt_bpress_off = first_attempt_bpress_off
                    cur_comp.second_attempt_bpress_res = second_attempt_bpress_res
                    cur_comp.second_attempt_bpress_off = second_attempt_bpress_off
                    cur_comp.third_attempt_bpress_res = third_attempt_bpress_res
                    cur_comp.third_attempt_bpress_off = third_attempt_bpress_off
                    cur_comp.first_attempt_dlift_res = first_attempt_dlift_res
                    cur_comp.first_attempt_dlift_off = first_attempt_dlift_off
                    cur_comp.second_attempt_dlift_res = second_attempt_dlift_res
                    cur_comp.second_attempt_dlift_off = second_attempt_dlift_off
                    cur_comp.third_attempt_dlift_res = third_attempt_dlift_res
                    cur_comp.third_attempt_dlift_off = third_attempt_dlift_off
                    cur_comp.competitor_translation = comp_transl
                    cur_comp.save()
                    return JsonResponse({"first_attempt_squat_res": first_attempt_squat_res,
                                         "first_attempt_squat_off": first_attempt_squat_off,
                                         "second_attempt_squat_res": second_attempt_squat_res,
                                         "second_attempt_squat_off": second_attempt_squat_off,
                                         "third_attempt_squat_res": third_attempt_squat_res,
                                         "third_attempt_squat_off": third_attempt_squat_off,
                                         "first_attempt_bpress_res": first_attempt_bpress_res,
                                         "first_attempt_bpress_off": first_attempt_bpress_off,
                                         "second_attempt_bpress_res": second_attempt_bpress_res,
                                         "second_attempt_bpress_off": second_attempt_bpress_off,
                                         "third_attempt_bpress_res": third_attempt_bpress_res,
                                         "third_attempt_bpress_off": third_attempt_bpress_off,
                                         "first_attempt_dlift_res": first_attempt_dlift_res,
                                         "first_attempt_dlift_off": first_attempt_dlift_off,
                                         "second_attempt_dlift_res": second_attempt_dlift_res,
                                         "second_attempt_dlift_off": second_attempt_dlift_off,
                                         "third_attempt_dlift_res": third_attempt_dlift_res,
                                         "third_attempt_dlift_off": third_attempt_dlift_off,
                                         "comp_transl": comp_transl}, status=200)
                if cur_transl_val == "Тяга 2 класс" and second_attempt_dlift_off:
                    cur_comp.first_attempt_squat_res = first_attempt_squat_res
                    cur_comp.first_attempt_squat_off = first_attempt_squat_off
                    cur_comp.second_attempt_squat_res = second_attempt_squat_res
                    cur_comp.second_attempt_squat_off = second_attempt_squat_off
                    cur_comp.third_attempt_squat_res = third_attempt_squat_res
                    cur_comp.third_attempt_squat_off = third_attempt_squat_off
                    cur_comp.first_attempt_bpress_res = first_attempt_bpress_res
                    cur_comp.first_attempt_bpress_off = first_attempt_bpress_off
                    cur_comp.second_attempt_bpress_res = second_attempt_bpress_res
                    cur_comp.second_attempt_bpress_off = second_attempt_bpress_off
                    cur_comp.third_attempt_bpress_res = third_attempt_bpress_res
                    cur_comp.third_attempt_bpress_off = third_attempt_bpress_off
                    cur_comp.first_attempt_dlift_res = first_attempt_dlift_res
                    cur_comp.first_attempt_dlift_off = first_attempt_dlift_off
                    cur_comp.second_attempt_dlift_res = second_attempt_dlift_res
                    cur_comp.second_attempt_dlift_off = second_attempt_dlift_off
                    cur_comp.third_attempt_dlift_res = third_attempt_dlift_res
                    cur_comp.third_attempt_dlift_off = third_attempt_dlift_off
                    cur_comp.competitor_translation = comp_transl
                    cur_comp.save()
                    return JsonResponse({"first_attempt_squat_res": first_attempt_squat_res,
                                         "first_attempt_squat_off": first_attempt_squat_off,
                                         "second_attempt_squat_res": second_attempt_squat_res,
                                         "second_attempt_squat_off": second_attempt_squat_off,
                                         "third_attempt_squat_res": third_attempt_squat_res,
                                         "third_attempt_squat_off": third_attempt_squat_off,
                                         "first_attempt_bpress_res": first_attempt_bpress_res,
                                         "first_attempt_bpress_off": first_attempt_bpress_off,
                                         "second_attempt_bpress_res": second_attempt_bpress_res,
                                         "second_attempt_bpress_off": second_attempt_bpress_off,
                                         "third_attempt_bpress_res": third_attempt_bpress_res,
                                         "third_attempt_bpress_off": third_attempt_bpress_off,
                                         "first_attempt_dlift_res": first_attempt_dlift_res,
                                         "first_attempt_dlift_off": first_attempt_dlift_off,
                                         "second_attempt_dlift_res": second_attempt_dlift_res,
                                         "second_attempt_dlift_off": second_attempt_dlift_off,
                                         "third_attempt_dlift_res": third_attempt_dlift_res,
                                         "third_attempt_dlift_off": third_attempt_dlift_off,
                                         "comp_transl": comp_transl}, status=200)
                if cur_transl_val == "Тяга 3 класс" and third_attempt_dlift_off:
                    cur_comp.first_attempt_squat_res = first_attempt_squat_res
                    cur_comp.first_attempt_squat_off = first_attempt_squat_off
                    cur_comp.second_attempt_squat_res = second_attempt_squat_res
                    cur_comp.second_attempt_squat_off = second_attempt_squat_off
                    cur_comp.third_attempt_squat_res = third_attempt_squat_res
                    cur_comp.third_attempt_squat_off = third_attempt_squat_off
                    cur_comp.first_attempt_bpress_res = first_attempt_bpress_res
                    cur_comp.first_attempt_bpress_off = first_attempt_bpress_off
                    cur_comp.second_attempt_bpress_res = second_attempt_bpress_res
                    cur_comp.second_attempt_bpress_off = second_attempt_bpress_off
                    cur_comp.third_attempt_bpress_res = third_attempt_bpress_res
                    cur_comp.third_attempt_bpress_off = third_attempt_bpress_off
                    cur_comp.first_attempt_dlift_res = first_attempt_dlift_res
                    cur_comp.first_attempt_dlift_off = first_attempt_dlift_off
                    cur_comp.second_attempt_dlift_res = second_attempt_dlift_res
                    cur_comp.second_attempt_dlift_off = second_attempt_dlift_off
                    cur_comp.third_attempt_dlift_res = third_attempt_dlift_res
                    cur_comp.third_attempt_dlift_off = third_attempt_dlift_off
                    cur_comp.competitor_translation = comp_transl
                    cur_comp.save()
                    return JsonResponse({"first_attempt_squat_res": first_attempt_squat_res,
                                         "first_attempt_squat_off": first_attempt_squat_off,
                                         "second_attempt_squat_res": second_attempt_squat_res,
                                         "second_attempt_squat_off": second_attempt_squat_off,
                                         "third_attempt_squat_res": third_attempt_squat_res,
                                         "third_attempt_squat_off": third_attempt_squat_off,
                                         "first_attempt_bpress_res": first_attempt_bpress_res,
                                         "first_attempt_bpress_off": first_attempt_bpress_off,
                                         "second_attempt_bpress_res": second_attempt_bpress_res,
                                         "second_attempt_bpress_off": second_attempt_bpress_off,
                                         "third_attempt_bpress_res": third_attempt_bpress_res,
                                         "third_attempt_bpress_off": third_attempt_bpress_off,
                                         "first_attempt_dlift_res": first_attempt_dlift_res,
                                         "first_attempt_dlift_off": first_attempt_dlift_off,
                                         "second_attempt_dlift_res": second_attempt_dlift_res,
                                         "second_attempt_dlift_off": second_attempt_dlift_off,
                                         "third_attempt_dlift_res": third_attempt_dlift_res,
                                         "third_attempt_dlift_off": third_attempt_dlift_off,
                                         "comp_transl": comp_transl}, status=200)
        if comp_transl:
            cur_comp.first_attempt_squat_res = first_attempt_squat_res
            cur_comp.first_attempt_squat_off = first_attempt_squat_off
            cur_comp.second_attempt_squat_res = second_attempt_squat_res
            cur_comp.second_attempt_squat_off = second_attempt_squat_off
            cur_comp.third_attempt_squat_res = third_attempt_squat_res
            cur_comp.third_attempt_squat_off = third_attempt_squat_off
            cur_comp.first_attempt_bpress_res = first_attempt_bpress_res
            cur_comp.first_attempt_bpress_off = first_attempt_bpress_off
            cur_comp.second_attempt_bpress_res = second_attempt_bpress_res
            cur_comp.second_attempt_bpress_off = second_attempt_bpress_off
            cur_comp.third_attempt_bpress_res = third_attempt_bpress_res
            cur_comp.third_attempt_bpress_off = third_attempt_bpress_off
            cur_comp.first_attempt_dlift_res = first_attempt_dlift_res
            cur_comp.first_attempt_dlift_off = first_attempt_dlift_off
            cur_comp.second_attempt_dlift_res = second_attempt_dlift_res
            cur_comp.second_attempt_dlift_off = second_attempt_dlift_off
            cur_comp.third_attempt_dlift_res = third_attempt_dlift_res
            cur_comp.third_attempt_dlift_off = third_attempt_dlift_off
            cur_comp.competitor_translation = comp_transl
            cur_comp.save()
            return JsonResponse(
                {"first_attempt_squat_res": first_attempt_squat_res, "first_attempt_squat_off": first_attempt_squat_off,
                 "second_attempt_squat_res": second_attempt_squat_res,
                 "second_attempt_squat_off": second_attempt_squat_off,
                 "third_attempt_squat_res": third_attempt_squat_res, "third_attempt_squat_off": third_attempt_squat_off,
                 "first_attempt_bpress_res": first_attempt_bpress_res,
                 "first_attempt_bpress_off": first_attempt_bpress_off,
                 "second_attempt_bpress_res": second_attempt_bpress_res,
                 "second_attempt_bpress_off": second_attempt_bpress_off,
                 "third_attempt_bpress_res": third_attempt_bpress_res,
                 "third_attempt_bpress_off": third_attempt_bpress_off,
                 "first_attempt_dlift_res": first_attempt_dlift_res, "first_attempt_dlift_off": first_attempt_dlift_off,
                 "second_attempt_dlift_res": second_attempt_dlift_res,
                 "second_attempt_dlift_off": second_attempt_dlift_off,
                 "third_attempt_dlift_res": third_attempt_dlift_res, "third_attempt_dlift_off": third_attempt_dlift_off,
                 "comp_transl": comp_transl}, status=200)
        else:
            cur_comp.first_attempt_squat_res = first_attempt_squat_res
            cur_comp.first_attempt_squat_off = first_attempt_squat_off
            cur_comp.second_attempt_squat_res = second_attempt_squat_res
            cur_comp.second_attempt_squat_off = second_attempt_squat_off
            cur_comp.third_attempt_squat_res = third_attempt_squat_res
            cur_comp.third_attempt_squat_off = third_attempt_squat_off
            cur_comp.first_attempt_bpress_res = first_attempt_bpress_res
            cur_comp.first_attempt_bpress_off = first_attempt_bpress_off
            cur_comp.second_attempt_bpress_res = second_attempt_bpress_res
            cur_comp.second_attempt_bpress_off = second_attempt_bpress_off
            cur_comp.third_attempt_bpress_res = third_attempt_bpress_res
            cur_comp.third_attempt_bpress_off = third_attempt_bpress_off
            cur_comp.first_attempt_dlift_res = first_attempt_dlift_res
            cur_comp.first_attempt_dlift_off = first_attempt_dlift_off
            cur_comp.second_attempt_dlift_res = second_attempt_dlift_res
            cur_comp.second_attempt_dlift_off = second_attempt_dlift_off
            cur_comp.third_attempt_dlift_res = third_attempt_dlift_res
            cur_comp.third_attempt_dlift_off = third_attempt_dlift_off
            cur_comp.competitor_translation = None
            cur_comp.save()
            return JsonResponse(
                {"first_attempt_squat_res": first_attempt_squat_res, "first_attempt_squat_off": first_attempt_squat_off,
                 "second_attempt_squat_res": second_attempt_squat_res,
                 "second_attempt_squat_off": second_attempt_squat_off,
                 "third_attempt_squat_res": third_attempt_squat_res, "third_attempt_squat_off": third_attempt_squat_off,
                 "first_attempt_bpress_res": first_attempt_bpress_res,
                 "first_attempt_bpress_off": first_attempt_bpress_off,
                 "second_attempt_bpress_res": second_attempt_bpress_res,
                 "second_attempt_bpress_off": second_attempt_bpress_off,
                 "third_attempt_bpress_res": third_attempt_bpress_res,
                 "third_attempt_bpress_off": third_attempt_bpress_off,
                 "first_attempt_dlift_res": first_attempt_dlift_res, "first_attempt_dlift_off": first_attempt_dlift_off,
                 "second_attempt_dlift_res": second_attempt_dlift_res,
                 "second_attempt_dlift_off": second_attempt_dlift_off,
                 "third_attempt_dlift_res": third_attempt_dlift_res, "third_attempt_dlift_off": third_attempt_dlift_off,
                 "comp_transl": comp_transl}, status=200)
        # , "testjson": serializers.serialize("json", CompetitionProtocols.objects.all().order_by(
            # F("first_attempt_squat_res").asc(nulls_last=True)), use_natural_foreign_keys=True)
    if 'secr-page_form-btn-bpclass' in request.POST:
        comp_pk = request.POST.get('secr-page_form-btn-bpclass')
        first_attempt_bpress_res = request.POST.get('secr-page_form-fat-bpress-res')
        if first_attempt_bpress_res:
            first_attempt_bpress_res = Decimal(first_attempt_bpress_res)
        else:
            first_attempt_bpress_res = None
        first_attempt_bpress_off = request.POST.get('secr-page_form-fat-bpress-off')
        second_attempt_bpress_res = request.POST.get('secr-page_form-sat-bpress-res')
        if second_attempt_bpress_res:
            second_attempt_bpress_res = Decimal(second_attempt_bpress_res)
        else:
            second_attempt_bpress_res = None
        second_attempt_bpress_off = request.POST.get('secr-page_form-sat-bpress-off')
        third_attempt_bpress_res = request.POST.get('secr-page_form-tat-bpress-res')
        if third_attempt_bpress_res:
            third_attempt_bpress_res = Decimal(third_attempt_bpress_res)
        else:
            third_attempt_bpress_res = None
        third_attempt_bpress_off = request.POST.get('secr-page_form-tat-bpress-off')
        cur_comp = CompetitionProtocols.objects.get(pk=comp_pk)
        comp_transl = request.POST.get('secr-page_chckbx')
        cur_transl = CompetitionProtocols.objects.exclude(competitor_translation=None)
        if comp_transl and cur_transl:
            if comp_transl != cur_transl[0].competitor_translation:
                return JsonResponse(
                    {"error": "Нельзя запускать две трансляции одновременно. Сначала закончите существующую."},
                    status=302)
        if cur_transl:
            cur_transl_val = cur_transl.values_list('competitor_translation', flat=True)[0]
            cur_transl_pk = cur_transl.values_list('id', flat=True)[0]
            if comp_pk == str(cur_transl_pk):
                if cur_transl_val == "Жим 1 класс" and first_attempt_bpress_off:
                    cur_comp.first_attempt_bpress_res = first_attempt_bpress_res
                    cur_comp.first_attempt_bpress_off = first_attempt_bpress_off
                    cur_comp.second_attempt_bpress_res = second_attempt_bpress_res
                    cur_comp.second_attempt_bpress_off = second_attempt_bpress_off
                    cur_comp.third_attempt_bpress_res = third_attempt_bpress_res
                    cur_comp.third_attempt_bpress_off = third_attempt_bpress_off
                    cur_comp.competitor_translation = comp_transl
                    cur_comp.save()
                    return JsonResponse({"first_attempt_bpress_res": first_attempt_bpress_res,
                                         "first_attempt_bpress_off": first_attempt_bpress_off,
                                         "second_attempt_bpress_res": second_attempt_bpress_res,
                                         "second_attempt_bpress_off": second_attempt_bpress_off,
                                         "third_attempt_bpress_res": third_attempt_bpress_res,
                                         "third_attempt_bpress_off": third_attempt_bpress_off,
                                         "comp_transl": comp_transl}, status=200)
                if cur_transl_val == "Жим 2 класс" and second_attempt_bpress_off:
                    cur_comp.first_attempt_bpress_res = first_attempt_bpress_res
                    cur_comp.first_attempt_bpress_off = first_attempt_bpress_off
                    cur_comp.second_attempt_bpress_res = second_attempt_bpress_res
                    cur_comp.second_attempt_bpress_off = second_attempt_bpress_off
                    cur_comp.third_attempt_bpress_res = third_attempt_bpress_res
                    cur_comp.third_attempt_bpress_off = third_attempt_bpress_off
                    cur_comp.competitor_translation = comp_transl
                    cur_comp.save()
                    return JsonResponse({"first_attempt_bpress_res": first_attempt_bpress_res,
                                         "first_attempt_bpress_off": first_attempt_bpress_off,
                                         "second_attempt_bpress_res": second_attempt_bpress_res,
                                         "second_attempt_bpress_off": second_attempt_bpress_off,
                                         "third_attempt_bpress_res": third_attempt_bpress_res,
                                         "third_attempt_bpress_off": third_attempt_bpress_off,
                                         "comp_transl": comp_transl}, status=200)
                if cur_transl_val == "Жим 3 класс" and third_attempt_bpress_off:
                    cur_comp.first_attempt_bpress_res = first_attempt_bpress_res
                    cur_comp.first_attempt_bpress_off = first_attempt_bpress_off
                    cur_comp.second_attempt_bpress_res = second_attempt_bpress_res
                    cur_comp.second_attempt_bpress_off = second_attempt_bpress_off
                    cur_comp.third_attempt_bpress_res = third_attempt_bpress_res
                    cur_comp.third_attempt_bpress_off = third_attempt_bpress_off
                    cur_comp.competitor_translation = comp_transl
                    cur_comp.save()
                    return JsonResponse({"first_attempt_bpress_res": first_attempt_bpress_res,
                                         "first_attempt_bpress_off": first_attempt_bpress_off,
                                         "second_attempt_bpress_res": second_attempt_bpress_res,
                                         "second_attempt_bpress_off": second_attempt_bpress_off,
                                         "third_attempt_bpress_res": third_attempt_bpress_res,
                                         "third_attempt_bpress_off": third_attempt_bpress_off,
                                         "comp_transl": comp_transl}, status=200)
        if comp_transl:
            cur_comp.first_attempt_bpress_res = first_attempt_bpress_res
            cur_comp.first_attempt_bpress_off = first_attempt_bpress_off
            cur_comp.second_attempt_bpress_res = second_attempt_bpress_res
            cur_comp.second_attempt_bpress_off = second_attempt_bpress_off
            cur_comp.third_attempt_bpress_res = third_attempt_bpress_res
            cur_comp.third_attempt_bpress_off = third_attempt_bpress_off
            cur_comp.competitor_translation = comp_transl
            cur_comp.save()
            return JsonResponse(
                {"first_attempt_bpress_res": first_attempt_bpress_res,
                 "first_attempt_bpress_off": first_attempt_bpress_off,
                 "second_attempt_bpress_res": second_attempt_bpress_res,
                 "second_attempt_bpress_off": second_attempt_bpress_off,
                 "third_attempt_bpress_res": third_attempt_bpress_res,
                 "third_attempt_bpress_off": third_attempt_bpress_off,
                 "comp_transl": comp_transl}, status=200)
        else:
            cur_comp.first_attempt_bpress_res = first_attempt_bpress_res
            cur_comp.first_attempt_bpress_off = first_attempt_bpress_off
            cur_comp.second_attempt_bpress_res = second_attempt_bpress_res
            cur_comp.second_attempt_bpress_off = second_attempt_bpress_off
            cur_comp.third_attempt_bpress_res = third_attempt_bpress_res
            cur_comp.third_attempt_bpress_off = third_attempt_bpress_off
            cur_comp.competitor_translation = None
            cur_comp.save()
            return JsonResponse(
                {"first_attempt_bpress_res": first_attempt_bpress_res,
                 "first_attempt_bpress_off": first_attempt_bpress_off,
                 "second_attempt_bpress_res": second_attempt_bpress_res,
                 "second_attempt_bpress_off": second_attempt_bpress_off,
                 "third_attempt_bpress_res": third_attempt_bpress_res,
                 "third_attempt_bpress_off": third_attempt_bpress_off,
                 "comp_transl": comp_transl}, status=200)
    if 'secr-page_form-btn-plek' in request.POST:
        comp_pk = request.POST.get('secr-page_form-btn-plek')
        first_attempt_squat_res = request.POST.get('secr-page_form-fat-squat-res')
        if first_attempt_squat_res:
            first_attempt_squat_res = Decimal(first_attempt_squat_res)
        else:
            first_attempt_squat_res = None
        first_attempt_squat_off = request.POST.get('secr-page_form-fat-squat-off')
        second_attempt_squat_res = request.POST.get('secr-page_form-sat-squat-res')
        if second_attempt_squat_res:
            second_attempt_squat_res = Decimal(second_attempt_squat_res)
        else:
            second_attempt_squat_res = None
        second_attempt_squat_off = request.POST.get('secr-page_form-sat-squat-off')
        third_attempt_squat_res = request.POST.get('secr-page_form-tat-squat-res')
        if third_attempt_squat_res:
            third_attempt_squat_res = Decimal(third_attempt_squat_res)
        else:
            third_attempt_squat_res = None
        third_attempt_squat_off = request.POST.get('secr-page_form-tat-squat-off')
        first_attempt_bpress_res = request.POST.get('secr-page_form-fat-bpress-res')
        if first_attempt_bpress_res:
            first_attempt_bpress_res = Decimal(first_attempt_bpress_res)
        else:
            first_attempt_bpress_res = None
        first_attempt_bpress_off = request.POST.get('secr-page_form-fat-bpress-off')
        second_attempt_bpress_res = request.POST.get('secr-page_form-sat-bpress-res')
        if second_attempt_bpress_res:
            second_attempt_bpress_res = Decimal(second_attempt_bpress_res)
        else:
            second_attempt_bpress_res = None
        second_attempt_bpress_off = request.POST.get('secr-page_form-sat-bpress-off')
        third_attempt_bpress_res = request.POST.get('secr-page_form-tat-bpress-res')
        if third_attempt_bpress_res:
            third_attempt_bpress_res = Decimal(third_attempt_bpress_res)
        else:
            third_attempt_bpress_res = None
        third_attempt_bpress_off = request.POST.get('secr-page_form-tat-bpress-off')
        first_attempt_dlift_res = request.POST.get('secr-page_form-fat-dlift-res')
        if first_attempt_dlift_res:
            first_attempt_dlift_res = Decimal(first_attempt_dlift_res)
        else:
            first_attempt_dlift_res = None
        first_attempt_dlift_off = request.POST.get('secr-page_form-fat-dlift-off')
        second_attempt_dlift_res = request.POST.get('secr-page_form-sat-dlift-res')
        if second_attempt_dlift_res:
            second_attempt_dlift_res = Decimal(second_attempt_dlift_res)
        else:
            second_attempt_dlift_res = None
        second_attempt_dlift_off = request.POST.get('secr-page_form-sat-dlift-off')
        third_attempt_dlift_res = request.POST.get('secr-page_form-tat-dlift-res')
        if third_attempt_dlift_res:
            third_attempt_dlift_res = Decimal(third_attempt_dlift_res)
        else:
            third_attempt_dlift_res = None
        third_attempt_dlift_off = request.POST.get('secr-page_form-tat-dlift-off')
        cur_comp = CompetitionProtocols.objects.get(pk=comp_pk)
        comp_transl = request.POST.get('secr-page_chckbx')
        cur_transl = CompetitionProtocols.objects.exclude(competitor_translation=None)
        if comp_transl and cur_transl:
            if comp_transl != cur_transl[0].competitor_translation:
                return JsonResponse(
                    {"error": "Нельзя запускать две трансляции одновременно. Сначала закончите существующую."},
                    status=302)
        if cur_transl:
            cur_transl_val = cur_transl.values_list('competitor_translation', flat=True)[0]
            cur_transl_pk = cur_transl.values_list('id', flat=True)[0]
            if comp_pk == str(cur_transl_pk):
                if cur_transl_val == "Присед 1 экип" and first_attempt_squat_off:
                    cur_comp.first_attempt_squat_res_ek = first_attempt_squat_res
                    cur_comp.first_attempt_squat_off_ek = first_attempt_squat_off
                    cur_comp.second_attempt_squat_res_ek = second_attempt_squat_res
                    cur_comp.second_attempt_squat_off_ek = second_attempt_squat_off
                    cur_comp.third_attempt_squat_res_ek = third_attempt_squat_res
                    cur_comp.third_attempt_squat_off_ek = third_attempt_squat_off
                    cur_comp.first_attempt_bpress_res_ek = first_attempt_bpress_res
                    cur_comp.first_attempt_bpress_off_ek = first_attempt_bpress_off
                    cur_comp.second_attempt_bpress_res_ek = second_attempt_bpress_res
                    cur_comp.second_attempt_bpress_off_ek = second_attempt_bpress_off
                    cur_comp.third_attempt_bpress_res_ek = third_attempt_bpress_res
                    cur_comp.third_attempt_bpress_off_ek = third_attempt_bpress_off
                    cur_comp.first_attempt_dlift_res_ek = first_attempt_dlift_res
                    cur_comp.first_attempt_dlift_off_ek = first_attempt_dlift_off
                    cur_comp.second_attempt_dlift_res_ek = second_attempt_dlift_res
                    cur_comp.second_attempt_dlift_off_ek = second_attempt_dlift_off
                    cur_comp.third_attempt_dlift_res_ek = third_attempt_dlift_res
                    cur_comp.third_attempt_dlift_off_ek = third_attempt_dlift_off
                    cur_comp.competitor_translation = comp_transl
                    cur_comp.save()
                    return JsonResponse({"first_attempt_squat_res": first_attempt_squat_res,
                                         "first_attempt_squat_off": first_attempt_squat_off,
                                         "second_attempt_squat_res": second_attempt_squat_res,
                                         "second_attempt_squat_off": second_attempt_squat_off,
                                         "third_attempt_squat_res": third_attempt_squat_res,
                                         "third_attempt_squat_off": third_attempt_squat_off,
                                         "first_attempt_bpress_res": first_attempt_bpress_res,
                                         "first_attempt_bpress_off": first_attempt_bpress_off,
                                         "second_attempt_bpress_res": second_attempt_bpress_res,
                                         "second_attempt_bpress_off": second_attempt_bpress_off,
                                         "third_attempt_bpress_res": third_attempt_bpress_res,
                                         "third_attempt_bpress_off": third_attempt_bpress_off,
                                         "first_attempt_dlift_res": first_attempt_dlift_res,
                                         "first_attempt_dlift_off": first_attempt_dlift_off,
                                         "second_attempt_dlift_res": second_attempt_dlift_res,
                                         "second_attempt_dlift_off": second_attempt_dlift_off,
                                         "third_attempt_dlift_res": third_attempt_dlift_res,
                                         "third_attempt_dlift_off": third_attempt_dlift_off,
                                         "comp_transl": comp_transl}, status=200)
                if cur_transl_val == "Присед 2 экип" and second_attempt_squat_off:
                    cur_comp.first_attempt_squat_res_ek = first_attempt_squat_res
                    cur_comp.first_attempt_squat_off_ek = first_attempt_squat_off
                    cur_comp.second_attempt_squat_res_ek = second_attempt_squat_res
                    cur_comp.second_attempt_squat_off_ek = second_attempt_squat_off
                    cur_comp.third_attempt_squat_res_ek = third_attempt_squat_res
                    cur_comp.third_attempt_squat_off_ek = third_attempt_squat_off
                    cur_comp.first_attempt_bpress_res_ek = first_attempt_bpress_res
                    cur_comp.first_attempt_bpress_off_ek = first_attempt_bpress_off
                    cur_comp.second_attempt_bpress_res_ek = second_attempt_bpress_res
                    cur_comp.second_attempt_bpress_off_ek = second_attempt_bpress_off
                    cur_comp.third_attempt_bpress_res_ek = third_attempt_bpress_res
                    cur_comp.third_attempt_bpress_off_ek = third_attempt_bpress_off
                    cur_comp.first_attempt_dlift_res_ek = first_attempt_dlift_res
                    cur_comp.first_attempt_dlift_off_ek = first_attempt_dlift_off
                    cur_comp.second_attempt_dlift_res_ek = second_attempt_dlift_res
                    cur_comp.second_attempt_dlift_off_ek = second_attempt_dlift_off
                    cur_comp.third_attempt_dlift_res_ek = third_attempt_dlift_res
                    cur_comp.third_attempt_dlift_off_ek = third_attempt_dlift_off
                    cur_comp.competitor_translation = comp_transl
                    cur_comp.save()
                    return JsonResponse({"first_attempt_squat_res": first_attempt_squat_res,
                                         "first_attempt_squat_off": first_attempt_squat_off,
                                         "second_attempt_squat_res": second_attempt_squat_res,
                                         "second_attempt_squat_off": second_attempt_squat_off,
                                         "third_attempt_squat_res": third_attempt_squat_res,
                                         "third_attempt_squat_off": third_attempt_squat_off,
                                         "first_attempt_bpress_res": first_attempt_bpress_res,
                                         "first_attempt_bpress_off": first_attempt_bpress_off,
                                         "second_attempt_bpress_res": second_attempt_bpress_res,
                                         "second_attempt_bpress_off": second_attempt_bpress_off,
                                         "third_attempt_bpress_res": third_attempt_bpress_res,
                                         "third_attempt_bpress_off": third_attempt_bpress_off,
                                         "first_attempt_dlift_res": first_attempt_dlift_res,
                                         "first_attempt_dlift_off": first_attempt_dlift_off,
                                         "second_attempt_dlift_res": second_attempt_dlift_res,
                                         "second_attempt_dlift_off": second_attempt_dlift_off,
                                         "third_attempt_dlift_res": third_attempt_dlift_res,
                                         "third_attempt_dlift_off": third_attempt_dlift_off,
                                         "comp_transl": comp_transl}, status=200)
                if cur_transl_val == "Присед 3 экип" and third_attempt_squat_off:
                    cur_comp.first_attempt_squat_res_ek = first_attempt_squat_res
                    cur_comp.first_attempt_squat_off_ek = first_attempt_squat_off
                    cur_comp.second_attempt_squat_res_ek = second_attempt_squat_res
                    cur_comp.second_attempt_squat_off_ek = second_attempt_squat_off
                    cur_comp.third_attempt_squat_res_ek = third_attempt_squat_res
                    cur_comp.third_attempt_squat_off_ek = third_attempt_squat_off
                    cur_comp.first_attempt_bpress_res_ek = first_attempt_bpress_res
                    cur_comp.first_attempt_bpress_off_ek = first_attempt_bpress_off
                    cur_comp.second_attempt_bpress_res_ek = second_attempt_bpress_res
                    cur_comp.second_attempt_bpress_off_ek = second_attempt_bpress_off
                    cur_comp.third_attempt_bpress_res_ek = third_attempt_bpress_res
                    cur_comp.third_attempt_bpress_off_ek = third_attempt_bpress_off
                    cur_comp.first_attempt_dlift_res_ek = first_attempt_dlift_res
                    cur_comp.first_attempt_dlift_off_ek = first_attempt_dlift_off
                    cur_comp.second_attempt_dlift_res_ek = second_attempt_dlift_res
                    cur_comp.second_attempt_dlift_off_ek = second_attempt_dlift_off
                    cur_comp.third_attempt_dlift_res_ek = third_attempt_dlift_res
                    cur_comp.third_attempt_dlift_off_ek = third_attempt_dlift_off
                    cur_comp.competitor_translation = comp_transl
                    cur_comp.save()
                    return JsonResponse({"first_attempt_squat_res": first_attempt_squat_res,
                                         "first_attempt_squat_off": first_attempt_squat_off,
                                         "second_attempt_squat_res": second_attempt_squat_res,
                                         "second_attempt_squat_off": second_attempt_squat_off,
                                         "third_attempt_squat_res": third_attempt_squat_res,
                                         "third_attempt_squat_off": third_attempt_squat_off,
                                         "first_attempt_bpress_res": first_attempt_bpress_res,
                                         "first_attempt_bpress_off": first_attempt_bpress_off,
                                         "second_attempt_bpress_res": second_attempt_bpress_res,
                                         "second_attempt_bpress_off": second_attempt_bpress_off,
                                         "third_attempt_bpress_res": third_attempt_bpress_res,
                                         "third_attempt_bpress_off": third_attempt_bpress_off,
                                         "first_attempt_dlift_res": first_attempt_dlift_res,
                                         "first_attempt_dlift_off": first_attempt_dlift_off,
                                         "second_attempt_dlift_res": second_attempt_dlift_res,
                                         "second_attempt_dlift_off": second_attempt_dlift_off,
                                         "third_attempt_dlift_res": third_attempt_dlift_res,
                                         "third_attempt_dlift_off": third_attempt_dlift_off,
                                         "comp_transl": comp_transl}, status=200)
                if cur_transl_val == "Жим 1 экип" and first_attempt_bpress_off:
                    cur_comp.first_attempt_squat_res_ek = first_attempt_squat_res
                    cur_comp.first_attempt_squat_off_ek = first_attempt_squat_off
                    cur_comp.second_attempt_squat_res_ek = second_attempt_squat_res
                    cur_comp.second_attempt_squat_off_ek = second_attempt_squat_off
                    cur_comp.third_attempt_squat_res_ek = third_attempt_squat_res
                    cur_comp.third_attempt_squat_off_ek = third_attempt_squat_off
                    cur_comp.first_attempt_bpress_res_ek = first_attempt_bpress_res
                    cur_comp.first_attempt_bpress_off_ek = first_attempt_bpress_off
                    cur_comp.second_attempt_bpress_res_ek = second_attempt_bpress_res
                    cur_comp.second_attempt_bpress_off_ek = second_attempt_bpress_off
                    cur_comp.third_attempt_bpress_res_ek = third_attempt_bpress_res
                    cur_comp.third_attempt_bpress_off_ek = third_attempt_bpress_off
                    cur_comp.first_attempt_dlift_res_ek = first_attempt_dlift_res
                    cur_comp.first_attempt_dlift_off_ek = first_attempt_dlift_off
                    cur_comp.second_attempt_dlift_res_ek = second_attempt_dlift_res
                    cur_comp.second_attempt_dlift_off_ek = second_attempt_dlift_off
                    cur_comp.third_attempt_dlift_res_ek = third_attempt_dlift_res
                    cur_comp.third_attempt_dlift_off_ek = third_attempt_dlift_off
                    cur_comp.competitor_translation = comp_transl
                    cur_comp.save()
                    return JsonResponse({"first_attempt_squat_res": first_attempt_squat_res,
                                         "first_attempt_squat_off": first_attempt_squat_off,
                                         "second_attempt_squat_res": second_attempt_squat_res,
                                         "second_attempt_squat_off": second_attempt_squat_off,
                                         "third_attempt_squat_res": third_attempt_squat_res,
                                         "third_attempt_squat_off": third_attempt_squat_off,
                                         "first_attempt_bpress_res": first_attempt_bpress_res,
                                         "first_attempt_bpress_off": first_attempt_bpress_off,
                                         "second_attempt_bpress_res": second_attempt_bpress_res,
                                         "second_attempt_bpress_off": second_attempt_bpress_off,
                                         "third_attempt_bpress_res": third_attempt_bpress_res,
                                         "third_attempt_bpress_off": third_attempt_bpress_off,
                                         "first_attempt_dlift_res": first_attempt_dlift_res,
                                         "first_attempt_dlift_off": first_attempt_dlift_off,
                                         "second_attempt_dlift_res": second_attempt_dlift_res,
                                         "second_attempt_dlift_off": second_attempt_dlift_off,
                                         "third_attempt_dlift_res": third_attempt_dlift_res,
                                         "third_attempt_dlift_off": third_attempt_dlift_off,
                                         "comp_transl": comp_transl}, status=200)
                if cur_transl_val == "Жим 2 экип" and second_attempt_bpress_off:
                    cur_comp.first_attempt_squat_res_ek = first_attempt_squat_res
                    cur_comp.first_attempt_squat_off_ek = first_attempt_squat_off
                    cur_comp.second_attempt_squat_res_ek = second_attempt_squat_res
                    cur_comp.second_attempt_squat_off_ek = second_attempt_squat_off
                    cur_comp.third_attempt_squat_res_ek = third_attempt_squat_res
                    cur_comp.third_attempt_squat_off_ek = third_attempt_squat_off
                    cur_comp.first_attempt_bpress_res_ek = first_attempt_bpress_res
                    cur_comp.first_attempt_bpress_off_ek = first_attempt_bpress_off
                    cur_comp.second_attempt_bpress_res_ek = second_attempt_bpress_res
                    cur_comp.second_attempt_bpress_off_ek = second_attempt_bpress_off
                    cur_comp.third_attempt_bpress_res_ek = third_attempt_bpress_res
                    cur_comp.third_attempt_bpress_off_ek = third_attempt_bpress_off
                    cur_comp.first_attempt_dlift_res_ek = first_attempt_dlift_res
                    cur_comp.first_attempt_dlift_off_ek = first_attempt_dlift_off
                    cur_comp.second_attempt_dlift_res_ek = second_attempt_dlift_res
                    cur_comp.second_attempt_dlift_off_ek = second_attempt_dlift_off
                    cur_comp.third_attempt_dlift_res_ek = third_attempt_dlift_res
                    cur_comp.third_attempt_dlift_off_ek = third_attempt_dlift_off
                    cur_comp.competitor_translation = comp_transl
                    cur_comp.save()
                    return JsonResponse({"first_attempt_squat_res": first_attempt_squat_res,
                                         "first_attempt_squat_off": first_attempt_squat_off,
                                         "second_attempt_squat_res": second_attempt_squat_res,
                                         "second_attempt_squat_off": second_attempt_squat_off,
                                         "third_attempt_squat_res": third_attempt_squat_res,
                                         "third_attempt_squat_off": third_attempt_squat_off,
                                         "first_attempt_bpress_res": first_attempt_bpress_res,
                                         "first_attempt_bpress_off": first_attempt_bpress_off,
                                         "second_attempt_bpress_res": second_attempt_bpress_res,
                                         "second_attempt_bpress_off": second_attempt_bpress_off,
                                         "third_attempt_bpress_res": third_attempt_bpress_res,
                                         "third_attempt_bpress_off": third_attempt_bpress_off,
                                         "first_attempt_dlift_res": first_attempt_dlift_res,
                                         "first_attempt_dlift_off": first_attempt_dlift_off,
                                         "second_attempt_dlift_res": second_attempt_dlift_res,
                                         "second_attempt_dlift_off": second_attempt_dlift_off,
                                         "third_attempt_dlift_res": third_attempt_dlift_res,
                                         "third_attempt_dlift_off": third_attempt_dlift_off,
                                         "comp_transl": comp_transl}, status=200)
                if cur_transl_val == "Жим 3 экип" and third_attempt_bpress_off:
                    cur_comp.first_attempt_squat_res_ek = first_attempt_squat_res
                    cur_comp.first_attempt_squat_off_ek = first_attempt_squat_off
                    cur_comp.second_attempt_squat_res_ek = second_attempt_squat_res
                    cur_comp.second_attempt_squat_off_ek = second_attempt_squat_off
                    cur_comp.third_attempt_squat_res_ek = third_attempt_squat_res
                    cur_comp.third_attempt_squat_off_ek = third_attempt_squat_off
                    cur_comp.first_attempt_bpress_res_ek = first_attempt_bpress_res
                    cur_comp.first_attempt_bpress_off_ek = first_attempt_bpress_off
                    cur_comp.second_attempt_bpress_res_ek = second_attempt_bpress_res
                    cur_comp.second_attempt_bpress_off_ek = second_attempt_bpress_off
                    cur_comp.third_attempt_bpress_res_ek = third_attempt_bpress_res
                    cur_comp.third_attempt_bpress_off_ek = third_attempt_bpress_off
                    cur_comp.first_attempt_dlift_res_ek = first_attempt_dlift_res
                    cur_comp.first_attempt_dlift_off_ek = first_attempt_dlift_off
                    cur_comp.second_attempt_dlift_res_ek = second_attempt_dlift_res
                    cur_comp.second_attempt_dlift_off_ek = second_attempt_dlift_off
                    cur_comp.third_attempt_dlift_res_ek = third_attempt_dlift_res
                    cur_comp.third_attempt_dlift_off_ek = third_attempt_dlift_off
                    cur_comp.competitor_translation = comp_transl
                    cur_comp.save()
                    return JsonResponse({"first_attempt_squat_res": first_attempt_squat_res,
                                         "first_attempt_squat_off": first_attempt_squat_off,
                                         "second_attempt_squat_res": second_attempt_squat_res,
                                         "second_attempt_squat_off": second_attempt_squat_off,
                                         "third_attempt_squat_res": third_attempt_squat_res,
                                         "third_attempt_squat_off": third_attempt_squat_off,
                                         "first_attempt_bpress_res": first_attempt_bpress_res,
                                         "first_attempt_bpress_off": first_attempt_bpress_off,
                                         "second_attempt_bpress_res": second_attempt_bpress_res,
                                         "second_attempt_bpress_off": second_attempt_bpress_off,
                                         "third_attempt_bpress_res": third_attempt_bpress_res,
                                         "third_attempt_bpress_off": third_attempt_bpress_off,
                                         "first_attempt_dlift_res": first_attempt_dlift_res,
                                         "first_attempt_dlift_off": first_attempt_dlift_off,
                                         "second_attempt_dlift_res": second_attempt_dlift_res,
                                         "second_attempt_dlift_off": second_attempt_dlift_off,
                                         "third_attempt_dlift_res": third_attempt_dlift_res,
                                         "third_attempt_dlift_off": third_attempt_dlift_off,
                                         "comp_transl": comp_transl}, status=200)
                if cur_transl_val == "Тяга 1 экип" and first_attempt_dlift_off:
                    cur_comp.first_attempt_squat_res_ek = first_attempt_squat_res
                    cur_comp.first_attempt_squat_off_ek = first_attempt_squat_off
                    cur_comp.second_attempt_squat_res_ek = second_attempt_squat_res
                    cur_comp.second_attempt_squat_off_ek = second_attempt_squat_off
                    cur_comp.third_attempt_squat_res_ek = third_attempt_squat_res
                    cur_comp.third_attempt_squat_off_ek = third_attempt_squat_off
                    cur_comp.first_attempt_bpress_res_ek = first_attempt_bpress_res
                    cur_comp.first_attempt_bpress_off_ek = first_attempt_bpress_off
                    cur_comp.second_attempt_bpress_res_ek = second_attempt_bpress_res
                    cur_comp.second_attempt_bpress_off_ek = second_attempt_bpress_off
                    cur_comp.third_attempt_bpress_res_ek = third_attempt_bpress_res
                    cur_comp.third_attempt_bpress_off_ek = third_attempt_bpress_off
                    cur_comp.first_attempt_dlift_res_ek = first_attempt_dlift_res
                    cur_comp.first_attempt_dlift_off_ek = first_attempt_dlift_off
                    cur_comp.second_attempt_dlift_res_ek = second_attempt_dlift_res
                    cur_comp.second_attempt_dlift_off_ek = second_attempt_dlift_off
                    cur_comp.third_attempt_dlift_res_ek = third_attempt_dlift_res
                    cur_comp.third_attempt_dlift_off_ek = third_attempt_dlift_off
                    cur_comp.competitor_translation = comp_transl
                    cur_comp.save()
                    return JsonResponse({"first_attempt_squat_res": first_attempt_squat_res,
                                         "first_attempt_squat_off": first_attempt_squat_off,
                                         "second_attempt_squat_res": second_attempt_squat_res,
                                         "second_attempt_squat_off": second_attempt_squat_off,
                                         "third_attempt_squat_res": third_attempt_squat_res,
                                         "third_attempt_squat_off": third_attempt_squat_off,
                                         "first_attempt_bpress_res": first_attempt_bpress_res,
                                         "first_attempt_bpress_off": first_attempt_bpress_off,
                                         "second_attempt_bpress_res": second_attempt_bpress_res,
                                         "second_attempt_bpress_off": second_attempt_bpress_off,
                                         "third_attempt_bpress_res": third_attempt_bpress_res,
                                         "third_attempt_bpress_off": third_attempt_bpress_off,
                                         "first_attempt_dlift_res": first_attempt_dlift_res,
                                         "first_attempt_dlift_off": first_attempt_dlift_off,
                                         "second_attempt_dlift_res": second_attempt_dlift_res,
                                         "second_attempt_dlift_off": second_attempt_dlift_off,
                                         "third_attempt_dlift_res": third_attempt_dlift_res,
                                         "third_attempt_dlift_off": third_attempt_dlift_off,
                                         "comp_transl": comp_transl}, status=200)
                if cur_transl_val == "Тяга 2 экип" and second_attempt_dlift_off:
                    cur_comp.first_attempt_squat_res_ek = first_attempt_squat_res
                    cur_comp.first_attempt_squat_off_ek = first_attempt_squat_off
                    cur_comp.second_attempt_squat_res_ek = second_attempt_squat_res
                    cur_comp.second_attempt_squat_off_ek = second_attempt_squat_off
                    cur_comp.third_attempt_squat_res_ek = third_attempt_squat_res
                    cur_comp.third_attempt_squat_off_ek = third_attempt_squat_off
                    cur_comp.first_attempt_bpress_res_ek = first_attempt_bpress_res
                    cur_comp.first_attempt_bpress_off_ek = first_attempt_bpress_off
                    cur_comp.second_attempt_bpress_res_ek = second_attempt_bpress_res
                    cur_comp.second_attempt_bpress_off_ek = second_attempt_bpress_off
                    cur_comp.third_attempt_bpress_res_ek = third_attempt_bpress_res
                    cur_comp.third_attempt_bpress_off_ek = third_attempt_bpress_off
                    cur_comp.first_attempt_dlift_res_ek = first_attempt_dlift_res
                    cur_comp.first_attempt_dlift_off_ek = first_attempt_dlift_off
                    cur_comp.second_attempt_dlift_res_ek = second_attempt_dlift_res
                    cur_comp.second_attempt_dlift_off_ek = second_attempt_dlift_off
                    cur_comp.third_attempt_dlift_res_ek = third_attempt_dlift_res
                    cur_comp.third_attempt_dlift_off_ek = third_attempt_dlift_off
                    cur_comp.competitor_translation = comp_transl
                    cur_comp.save()
                    return JsonResponse({"first_attempt_squat_res": first_attempt_squat_res,
                                         "first_attempt_squat_off": first_attempt_squat_off,
                                         "second_attempt_squat_res": second_attempt_squat_res,
                                         "second_attempt_squat_off": second_attempt_squat_off,
                                         "third_attempt_squat_res": third_attempt_squat_res,
                                         "third_attempt_squat_off": third_attempt_squat_off,
                                         "first_attempt_bpress_res": first_attempt_bpress_res,
                                         "first_attempt_bpress_off": first_attempt_bpress_off,
                                         "second_attempt_bpress_res": second_attempt_bpress_res,
                                         "second_attempt_bpress_off": second_attempt_bpress_off,
                                         "third_attempt_bpress_res": third_attempt_bpress_res,
                                         "third_attempt_bpress_off": third_attempt_bpress_off,
                                         "first_attempt_dlift_res": first_attempt_dlift_res,
                                         "first_attempt_dlift_off": first_attempt_dlift_off,
                                         "second_attempt_dlift_res": second_attempt_dlift_res,
                                         "second_attempt_dlift_off": second_attempt_dlift_off,
                                         "third_attempt_dlift_res": third_attempt_dlift_res,
                                         "third_attempt_dlift_off": third_attempt_dlift_off,
                                         "comp_transl": comp_transl}, status=200)
                if cur_transl_val == "Тяга 3 экип" and third_attempt_dlift_off:
                    cur_comp.first_attempt_squat_res_ek = first_attempt_squat_res
                    cur_comp.first_attempt_squat_off_ek = first_attempt_squat_off
                    cur_comp.second_attempt_squat_res_ek = second_attempt_squat_res
                    cur_comp.second_attempt_squat_off_ek = second_attempt_squat_off
                    cur_comp.third_attempt_squat_res_ek = third_attempt_squat_res
                    cur_comp.third_attempt_squat_off_ek = third_attempt_squat_off
                    cur_comp.first_attempt_bpress_res_ek = first_attempt_bpress_res
                    cur_comp.first_attempt_bpress_off_ek = first_attempt_bpress_off
                    cur_comp.second_attempt_bpress_res_ek = second_attempt_bpress_res
                    cur_comp.second_attempt_bpress_off_ek = second_attempt_bpress_off
                    cur_comp.third_attempt_bpress_res_ek = third_attempt_bpress_res
                    cur_comp.third_attempt_bpress_off_ek = third_attempt_bpress_off
                    cur_comp.first_attempt_dlift_res_ek = first_attempt_dlift_res
                    cur_comp.first_attempt_dlift_off_ek = first_attempt_dlift_off
                    cur_comp.second_attempt_dlift_res_ek = second_attempt_dlift_res
                    cur_comp.second_attempt_dlift_off_ek = second_attempt_dlift_off
                    cur_comp.third_attempt_dlift_res_ek = third_attempt_dlift_res
                    cur_comp.third_attempt_dlift_off_ek = third_attempt_dlift_off
                    cur_comp.competitor_translation = comp_transl
                    cur_comp.save()
                    return JsonResponse({"first_attempt_squat_res": first_attempt_squat_res,
                                         "first_attempt_squat_off": first_attempt_squat_off,
                                         "second_attempt_squat_res": second_attempt_squat_res,
                                         "second_attempt_squat_off": second_attempt_squat_off,
                                         "third_attempt_squat_res": third_attempt_squat_res,
                                         "third_attempt_squat_off": third_attempt_squat_off,
                                         "first_attempt_bpress_res": first_attempt_bpress_res,
                                         "first_attempt_bpress_off": first_attempt_bpress_off,
                                         "second_attempt_bpress_res": second_attempt_bpress_res,
                                         "second_attempt_bpress_off": second_attempt_bpress_off,
                                         "third_attempt_bpress_res": third_attempt_bpress_res,
                                         "third_attempt_bpress_off": third_attempt_bpress_off,
                                         "first_attempt_dlift_res": first_attempt_dlift_res,
                                         "first_attempt_dlift_off": first_attempt_dlift_off,
                                         "second_attempt_dlift_res": second_attempt_dlift_res,
                                         "second_attempt_dlift_off": second_attempt_dlift_off,
                                         "third_attempt_dlift_res": third_attempt_dlift_res,
                                         "third_attempt_dlift_off": third_attempt_dlift_off,
                                         "comp_transl": comp_transl}, status=200)
        if comp_transl:
            cur_comp.first_attempt_squat_res_ek = first_attempt_squat_res
            cur_comp.first_attempt_squat_off_ek = first_attempt_squat_off
            cur_comp.second_attempt_squat_res_ek = second_attempt_squat_res
            cur_comp.second_attempt_squat_off_ek = second_attempt_squat_off
            cur_comp.third_attempt_squat_res_ek = third_attempt_squat_res
            cur_comp.third_attempt_squat_off_ek = third_attempt_squat_off
            cur_comp.first_attempt_bpress_res_ek = first_attempt_bpress_res
            cur_comp.first_attempt_bpress_off_ek = first_attempt_bpress_off
            cur_comp.second_attempt_bpress_res_ek = second_attempt_bpress_res
            cur_comp.second_attempt_bpress_off_ek = second_attempt_bpress_off
            cur_comp.third_attempt_bpress_res_ek = third_attempt_bpress_res
            cur_comp.third_attempt_bpress_off_ek = third_attempt_bpress_off
            cur_comp.first_attempt_dlift_res_ek = first_attempt_dlift_res
            cur_comp.first_attempt_dlift_off_ek = first_attempt_dlift_off
            cur_comp.second_attempt_dlift_res_ek = second_attempt_dlift_res
            cur_comp.second_attempt_dlift_off_ek = second_attempt_dlift_off
            cur_comp.third_attempt_dlift_res_ek = third_attempt_dlift_res
            cur_comp.third_attempt_dlift_off_ek = third_attempt_dlift_off
            cur_comp.competitor_translation = comp_transl
            cur_comp.save()
            return JsonResponse(
                {"first_attempt_squat_res": first_attempt_squat_res,
                 "first_attempt_squat_off": first_attempt_squat_off,
                 "second_attempt_squat_res": second_attempt_squat_res,
                 "second_attempt_squat_off": second_attempt_squat_off,
                 "third_attempt_squat_res": third_attempt_squat_res,
                 "third_attempt_squat_off": third_attempt_squat_off,
                 "first_attempt_bpress_res": first_attempt_bpress_res,
                 "first_attempt_bpress_off": first_attempt_bpress_off,
                 "second_attempt_bpress_res": second_attempt_bpress_res,
                 "second_attempt_bpress_off": second_attempt_bpress_off,
                 "third_attempt_bpress_res": third_attempt_bpress_res,
                 "third_attempt_bpress_off": third_attempt_bpress_off,
                 "first_attempt_dlift_res": first_attempt_dlift_res,
                 "first_attempt_dlift_off": first_attempt_dlift_off,
                 "second_attempt_dlift_res": second_attempt_dlift_res,
                 "second_attempt_dlift_off": second_attempt_dlift_off,
                 "third_attempt_dlift_res": third_attempt_dlift_res,
                 "third_attempt_dlift_off": third_attempt_dlift_off,
                 "comp_transl": comp_transl}, status=200)
        else:
            cur_comp.first_attempt_squat_res_ek = first_attempt_squat_res
            cur_comp.first_attempt_squat_off_ek = first_attempt_squat_off
            cur_comp.second_attempt_squat_res_ek = second_attempt_squat_res
            cur_comp.second_attempt_squat_off_ek = second_attempt_squat_off
            cur_comp.third_attempt_squat_res_ek = third_attempt_squat_res
            cur_comp.third_attempt_squat_off_ek = third_attempt_squat_off
            cur_comp.first_attempt_bpress_res_ek = first_attempt_bpress_res
            cur_comp.first_attempt_bpress_off_ek = first_attempt_bpress_off
            cur_comp.second_attempt_bpress_res_ek = second_attempt_bpress_res
            cur_comp.second_attempt_bpress_off_ek = second_attempt_bpress_off
            cur_comp.third_attempt_bpress_res_ek = third_attempt_bpress_res
            cur_comp.third_attempt_bpress_off_ek = third_attempt_bpress_off
            cur_comp.first_attempt_dlift_res_ek = first_attempt_dlift_res
            cur_comp.first_attempt_dlift_off_ek = first_attempt_dlift_off
            cur_comp.second_attempt_dlift_res_ek = second_attempt_dlift_res
            cur_comp.second_attempt_dlift_off_ek = second_attempt_dlift_off
            cur_comp.third_attempt_dlift_res_ek = third_attempt_dlift_res
            cur_comp.third_attempt_dlift_off_ek = third_attempt_dlift_off
            cur_comp.competitor_translation = None
            cur_comp.save()
            return JsonResponse(
                {"first_attempt_squat_res": first_attempt_squat_res,
                 "first_attempt_squat_off": first_attempt_squat_off,
                 "second_attempt_squat_res": second_attempt_squat_res,
                 "second_attempt_squat_off": second_attempt_squat_off,
                 "third_attempt_squat_res": third_attempt_squat_res,
                 "third_attempt_squat_off": third_attempt_squat_off,
                 "first_attempt_bpress_res": first_attempt_bpress_res,
                 "first_attempt_bpress_off": first_attempt_bpress_off,
                 "second_attempt_bpress_res": second_attempt_bpress_res,
                 "second_attempt_bpress_off": second_attempt_bpress_off,
                 "third_attempt_bpress_res": third_attempt_bpress_res,
                 "third_attempt_bpress_off": third_attempt_bpress_off,
                 "first_attempt_dlift_res": first_attempt_dlift_res,
                 "first_attempt_dlift_off": first_attempt_dlift_off,
                 "second_attempt_dlift_res": second_attempt_dlift_res,
                 "second_attempt_dlift_off": second_attempt_dlift_off,
                 "third_attempt_dlift_res": third_attempt_dlift_res,
                 "third_attempt_dlift_off": third_attempt_dlift_off,
                 "comp_transl": comp_transl}, status=200)
    if 'secr-page_form-btn-bpek' in request.POST:
        comp_pk = request.POST.get('secr-page_form-btn-bpek')
        first_attempt_bpress_res = request.POST.get('secr-page_form-fat-bpress-res')
        if first_attempt_bpress_res:
            first_attempt_bpress_res = Decimal(first_attempt_bpress_res)
        else:
            first_attempt_bpress_res = None
        first_attempt_bpress_off = request.POST.get('secr-page_form-fat-bpress-off')
        second_attempt_bpress_res = request.POST.get('secr-page_form-sat-bpress-res')
        if second_attempt_bpress_res:
            second_attempt_bpress_res = Decimal(second_attempt_bpress_res)
        else:
            second_attempt_bpress_res = None
        second_attempt_bpress_off = request.POST.get('secr-page_form-sat-bpress-off')
        third_attempt_bpress_res = request.POST.get('secr-page_form-tat-bpress-res')
        if third_attempt_bpress_res:
            third_attempt_bpress_res = Decimal(third_attempt_bpress_res)
        else:
            third_attempt_bpress_res = None
        third_attempt_bpress_off = request.POST.get('secr-page_form-tat-bpress-off')
        cur_comp = CompetitionProtocols.objects.get(pk=comp_pk)
        comp_transl = request.POST.get('secr-page_chckbx')
        cur_transl = CompetitionProtocols.objects.exclude(competitor_translation=None)
        if comp_transl and cur_transl:
            if comp_transl != cur_transl[0].competitor_translation:
                return JsonResponse(
                    {"error": "Нельзя запускать две трансляции одновременно. Сначала закончите существующую."},
                    status=302)
        if cur_transl:
            cur_transl_val = cur_transl.values_list('competitor_translation', flat=True)[0]
            cur_transl_pk = cur_transl.values_list('id', flat=True)[0]
            if comp_pk == str(cur_transl_pk):
                if cur_transl_val == "Жим 1 экип" and first_attempt_bpress_off:
                    cur_comp.first_attempt_bpress_res_ek = first_attempt_bpress_res
                    cur_comp.first_attempt_bpress_off_ek = first_attempt_bpress_off
                    cur_comp.second_attempt_bpress_res_ek = second_attempt_bpress_res
                    cur_comp.second_attempt_bpress_off_ek = second_attempt_bpress_off
                    cur_comp.third_attempt_bpress_res_ek = third_attempt_bpress_res
                    cur_comp.third_attempt_bpress_off_ek = third_attempt_bpress_off
                    cur_comp.competitor_translation = comp_transl
                    cur_comp.save()
                    return JsonResponse({"first_attempt_bpress_res": first_attempt_bpress_res,
                                         "first_attempt_bpress_off": first_attempt_bpress_off,
                                         "second_attempt_bpress_res": second_attempt_bpress_res,
                                         "second_attempt_bpress_off": second_attempt_bpress_off,
                                         "third_attempt_bpress_res": third_attempt_bpress_res,
                                         "third_attempt_bpress_off": third_attempt_bpress_off,
                                         "comp_transl": comp_transl}, status=200)
                if cur_transl_val == "Жим 2 экип" and second_attempt_bpress_off:
                    cur_comp.first_attempt_bpress_res_ek = first_attempt_bpress_res
                    cur_comp.first_attempt_bpress_off_ek = first_attempt_bpress_off
                    cur_comp.second_attempt_bpress_res_ek = second_attempt_bpress_res
                    cur_comp.second_attempt_bpress_off_ek = second_attempt_bpress_off
                    cur_comp.third_attempt_bpress_res_ek = third_attempt_bpress_res
                    cur_comp.third_attempt_bpress_off_ek = third_attempt_bpress_off
                    cur_comp.competitor_translation = comp_transl
                    cur_comp.save()
                    return JsonResponse({"first_attempt_bpress_res": first_attempt_bpress_res,
                                         "first_attempt_bpress_off": first_attempt_bpress_off,
                                         "second_attempt_bpress_res": second_attempt_bpress_res,
                                         "second_attempt_bpress_off": second_attempt_bpress_off,
                                         "third_attempt_bpress_res": third_attempt_bpress_res,
                                         "third_attempt_bpress_off": third_attempt_bpress_off,
                                         "comp_transl": comp_transl}, status=200)
                if cur_transl_val == "Жим 3 экип" and third_attempt_bpress_off:
                    cur_comp.first_attempt_bpress_res_ek = first_attempt_bpress_res
                    cur_comp.first_attempt_bpress_off_ek = first_attempt_bpress_off
                    cur_comp.second_attempt_bpress_res_ek = second_attempt_bpress_res
                    cur_comp.second_attempt_bpress_off_ek = second_attempt_bpress_off
                    cur_comp.third_attempt_bpress_res_ek = third_attempt_bpress_res
                    cur_comp.third_attempt_bpress_off_ek = third_attempt_bpress_off
                    cur_comp.competitor_translation = comp_transl
                    cur_comp.save()
                    return JsonResponse({"first_attempt_bpress_res": first_attempt_bpress_res,
                                         "first_attempt_bpress_off": first_attempt_bpress_off,
                                         "second_attempt_bpress_res": second_attempt_bpress_res,
                                         "second_attempt_bpress_off": second_attempt_bpress_off,
                                         "third_attempt_bpress_res": third_attempt_bpress_res,
                                         "third_attempt_bpress_off": third_attempt_bpress_off,
                                         "comp_transl": comp_transl}, status=200)
        if comp_transl:
            cur_comp.first_attempt_bpress_res_ek = first_attempt_bpress_res
            cur_comp.first_attempt_bpress_off_ek = first_attempt_bpress_off
            cur_comp.second_attempt_bpress_res_ek = second_attempt_bpress_res
            cur_comp.second_attempt_bpress_off_ek = second_attempt_bpress_off
            cur_comp.third_attempt_bpress_res_ek = third_attempt_bpress_res
            cur_comp.third_attempt_bpress_off_ek = third_attempt_bpress_off
            cur_comp.competitor_translation = comp_transl
            cur_comp.save()
            return JsonResponse(
                {"first_attempt_bpress_res": first_attempt_bpress_res,
                 "first_attempt_bpress_off": first_attempt_bpress_off,
                 "second_attempt_bpress_res": second_attempt_bpress_res,
                 "second_attempt_bpress_off": second_attempt_bpress_off,
                 "third_attempt_bpress_res": third_attempt_bpress_res,
                 "third_attempt_bpress_off": third_attempt_bpress_off,
                 "comp_transl": comp_transl}, status=200)
        else:
            cur_comp.first_attempt_bpress_res_ek = first_attempt_bpress_res
            cur_comp.first_attempt_bpress_off_ek = first_attempt_bpress_off
            cur_comp.second_attempt_bpress_res_ek = second_attempt_bpress_res
            cur_comp.second_attempt_bpress_off_ek = second_attempt_bpress_off
            cur_comp.third_attempt_bpress_res_ek = third_attempt_bpress_res
            cur_comp.third_attempt_bpress_off_ek = third_attempt_bpress_off
            cur_comp.competitor_translation = None
            cur_comp.save()
            return JsonResponse(
                {"first_attempt_bpress_res": first_attempt_bpress_res,
                 "first_attempt_bpress_off": first_attempt_bpress_off,
                 "second_attempt_bpress_res": second_attempt_bpress_res,
                 "second_attempt_bpress_off": second_attempt_bpress_off,
                 "third_attempt_bpress_res": third_attempt_bpress_res,
                 "third_attempt_bpress_off": third_attempt_bpress_off,
                 "comp_transl": comp_transl}, status=200)

        # print(first_attempt_squat_res)
        # print(first_attempt_squat_off)
        # print(second_attempt_squat_res)
        # print(second_attempt_squat_off)
        # print(third_attempt_squat_res)
        # print(third_attempt_squat_off)
        # print(first_attempt_bpress_res)
        # print(first_attempt_bpress_off)
        # print(second_attempt_bpress_res)
        # print(second_attempt_bpress_off)
        # print(third_attempt_bpress_res)
        # print(third_attempt_bpress_off)
        # print(first_attempt_dlift_res)
        # print(first_attempt_dlift_off)
        # print(second_attempt_dlift_res)
        # print(second_attempt_dlift_off)
        # print(third_attempt_dlift_res)
        # print(third_attempt_dlift_off)
        # print(CompetitionProtocols.objects.get(pk=comp_pk))

        # print(CompetitionProtocols.objects.exclude(competitor_translation=None))

    return render(request, 'pwrlftmain/secretary_page.html', response_data)


@login_required
def scoreboard_page(request, competition_slug):
    cur_competition = Competitions.objects.get(competition_slug=competition_slug)
    # cur_transl = CompetitionProtocols.objects.exclude(competitor_translation=None)
    competitor_exercise = ''
    competitor_exercise_attempt = ''
    competitor_fi = ''
    competitor_weight_cat = ''
    competitor_ordered_weight = ''
    competitor_ordered_weight_offset = ''
    # cur_transl_val = ''
    cur_transl_pk = ''
    # if cur_transl:
    #     cur_transl_val = cur_transl.values_list('competitor_translation', flat=True)[0]
    #     cur_transl_pk = cur_transl.values_list('id', flat=True)[0]
    response_data = {
        # 'cur_transl_val': cur_transl_val,
        # 'cur_transl_pk': cur_transl_pk,
        'cur_competition': cur_competition,
    }
    if 'score-form_btn' in request.POST:
        cur_transl = CompetitionProtocols.objects.exclude(competitor_translation=None)
        if cur_transl:
            # print(cur_transl)
            cur_transl_val = cur_transl.values_list('competitor_translation', flat=True)[0]
            cur_transl_pk = cur_transl.values_list('id', flat=True)[0]
            # print(cur_transl_pk)
            # print(cur_transl_val)
            competitor_transl = CompetitionProtocols.objects.get(pk=cur_transl_pk)
            competitor_exercise = cur_transl_val.split(' ')[0].lower()
            competitor_exercise_attempt = f"{cur_transl_val.split(' ')[1]} подход"
            competitor_fi = f"{competitor_transl.competitor.surname_comp.capitalize()} {competitor_transl.competitor.name_comp.capitalize()}"
            competitor_weight_cat = competitor_transl.competitor.weight_cat
            # competitor_ordered_weight_offset = ""
            if cur_transl_val == "Присед 1 класс":
                competitor_ordered_weight = competitor_transl.first_attempt_squat_res
                competitor_ordered_weight_offset = competitor_transl.first_attempt_squat_off
            if cur_transl_val == "Присед 2 класс":
                competitor_ordered_weight = competitor_transl.second_attempt_squat_res
                competitor_ordered_weight_offset = competitor_transl.second_attempt_squat_off
            if cur_transl_val == "Присед 3 класс":
                competitor_ordered_weight = competitor_transl.third_attempt_squat_res
                competitor_ordered_weight_offset = competitor_transl.third_attempt_squat_off
            if cur_transl_val == "Жим 1 класс":
                competitor_ordered_weight = competitor_transl.first_attempt_bpress_res
                competitor_ordered_weight_offset = competitor_transl.first_attempt_bpress_off
            if cur_transl_val == "Жим 2 класс":
                competitor_ordered_weight = competitor_transl.second_attempt_bpress_res
                competitor_ordered_weight_offset = competitor_transl.second_attempt_bpress_off
            if cur_transl_val == "Жим 3 класс":
                competitor_ordered_weight = competitor_transl.third_attempt_bpress_res
                competitor_ordered_weight_offset = competitor_transl.third_attempt_bpress_off
            if cur_transl_val == "Тяга 1 класс":
                competitor_ordered_weight = competitor_transl.first_attempt_dlift_res
                competitor_ordered_weight_offset = competitor_transl.first_attempt_dlift_off
            if cur_transl_val == "Тяга 2 класс":
                competitor_ordered_weight = competitor_transl.second_attempt_dlift_res
                competitor_ordered_weight_offset = competitor_transl.second_attempt_dlift_off
            if cur_transl_val == "Тяга 3 класс":
                competitor_ordered_weight = competitor_transl.third_attempt_dlift_res
                competitor_ordered_weight_offset = competitor_transl.third_attempt_dlift_off
            if cur_transl_val == "Присед 1 экип":
                competitor_ordered_weight = competitor_transl.first_attempt_squat_res_ek
                competitor_ordered_weight_offset = competitor_transl.first_attempt_squat_off_ek
            if cur_transl_val == "Присед 2 экип":
                competitor_ordered_weight = competitor_transl.second_attempt_squat_res_ek
                competitor_ordered_weight_offset = competitor_transl.second_attempt_squat_off_ek
            if cur_transl_val == "Присед 3 экип":
                competitor_ordered_weight = competitor_transl.third_attempt_squat_res_ek
                competitor_ordered_weight_offset = competitor_transl.third_attempt_squat_off_ek
            if cur_transl_val == "Жим 1 экип":
                competitor_ordered_weight = competitor_transl.first_attempt_bpress_res_ek
                competitor_ordered_weight_offset = competitor_transl.first_attempt_bpress_off_ek
            if cur_transl_val == "Жим 2 экип":
                competitor_ordered_weight = competitor_transl.second_attempt_bpress_res_ek
                competitor_ordered_weight_offset = competitor_transl.second_attempt_bpress_off_ek
            if cur_transl_val == "Жим 3 экип":
                competitor_ordered_weight = competitor_transl.third_attempt_bpress_res_ek
                competitor_ordered_weight_offset = competitor_transl.third_attempt_bpress_off_ek
            if cur_transl_val == "Тяга 1 экип":
                competitor_ordered_weight = competitor_transl.first_attempt_dlift_res_ek
                competitor_ordered_weight_offset = competitor_transl.first_attempt_dlift_off_ek
            if cur_transl_val == "Тяга 2 экип":
                competitor_ordered_weight = competitor_transl.second_attempt_dlift_res_ek
                competitor_ordered_weight_offset = competitor_transl.second_attempt_dlift_off_ek
            if cur_transl_val == "Тяга 3 экип":
                competitor_ordered_weight = competitor_transl.third_attempt_dlift_res_ek
                competitor_ordered_weight_offset = competitor_transl.third_attempt_dlift_off_ek
            return JsonResponse(
                {"competitor_exercise": competitor_exercise, "competitor_exercise_attempt": competitor_exercise_attempt,
                 "competitor_fi": competitor_fi,
                 "competitor_weight_cat": competitor_weight_cat, "competitor_ordered_weight": competitor_ordered_weight,
                 "competitor_ordered_weight_offset": competitor_ordered_weight_offset, "cur_transl_pk": cur_transl_pk},
                status=200)
        else:
            cur_flow = CompetitorsFlow.objects.first().comp_flow
            cur_flow_competitors_st = CompetitionProtocols.objects.filter(competitor_stream=cur_flow)
            competitors_stypes_st = cur_flow_competitors_st.values_list('competitor__sports_type__title', flat=True)
            competitors_stypes = []
            for csts in competitors_stypes_st:
                if csts not in competitors_stypes:
                    competitors_stypes.append(csts)
            if "Троеборье классическое" in competitors_stypes:
                cur_flow_competitors = cur_flow_competitors_st.order_by(F("first_attempt_squat_res").asc(nulls_last=True))
                if None not in cur_flow_competitors.filter(Q(competitor__sports_type__title="Троеборье классическое") & Q(competitor__sports_type__title="Троеборье (экип.)")).values_list('third_attempt_squat_off', flat=True):
                    cur_flow_competitors = cur_flow_competitors_st.order_by(F("first_attempt_bpress_res").asc(nulls_last=True))
                    if None not in cur_flow_competitors.filter(Q(competitor__sports_type__title="Троеборье классическое") & Q(competitor__sports_type__title="Троеборье (экип.)")).values_list('third_attempt_bpress_off', flat=True):
                        cur_flow_competitors = cur_flow_competitors_st.order_by(F("first_attempt_dlift_res").asc(nulls_last=True))
            elif "Троеборье (экип.)" in competitors_stypes:
                cur_flow_competitors = cur_flow_competitors_st.order_by(F("first_attempt_squat_res_ek").asc(nulls_last=True))
                if None not in cur_flow_competitors.filter(competitor__sports_type__title="Троеборье (экип.)").values_list('third_attempt_squat_off_ek', flat=True):
                    cur_flow_competitors = cur_flow_competitors_st.order_by(F("first_attempt_bpress_res_ek").asc(nulls_last=True))
                    if None not in cur_flow_competitors.filter(competitor__sports_type__title="Троеборье (экип.)").values_list('third_attempt_bpress_off_ek', flat=True):
                        cur_flow_competitors = cur_flow_competitors_st.order_by(F("first_attempt_dlift_res_ek").asc(nulls_last=True))
            elif "Жим лёжа (без экип.)" in competitors_stypes:
                cur_flow_competitors = cur_flow_competitors_st.order_by(F("first_attempt_bpress_res").asc(nulls_last=True))
            else:
                cur_flow_competitors = cur_flow_competitors_st.order_by(F("first_attempt_bpress_res_ek").asc(nulls_last=True))
            # cur_flow_competitors_json = serializers.serialize("json", cur_flow_competitors, use_natural_foreign_keys=True)
            cur_flow_competitors_json = serializers.serialize("json", cur_flow_competitors, use_natural_foreign_keys=True)
            # print(cur_flow_competitors)
            # print(CompetitionProtocols.objects.all().values("id", "competitor__sports_type__title"))
            return JsonResponse({"cur_flow_competitors_json": cur_flow_competitors_json, }, status=200)
            # print(cur_transl_pk)
            # print(cur_transl_val)
            # print(competitor_exercise)
            # print(competitor_exercise_attempt)
            # print(competitor_fi)
            # print(competitor_weight_cat)
            # print(competitor_ordered_weight)
            # print(competitor_ordered_weight_offset)
            # print(competitor_type_ekip)
            # print(competitor_type_ekip.strip())
            # competitor_sports_types = [i.title for i in competitor_transl.competitor.sports_type.all()]
            # if "Троеборье классическое" in competitor_sports_types:
            #     if cur_transl_val == "Присед 1":
            #         competitor_ordered_weight = competitor_transl.first_attempt_squat_res
            #     if cur_transl_val == "Присед 2":
            #         competitor_ordered_weight = competitor_transl.second_attempt_squat_res
            #     if cur_transl_val == "Присед 3":
            #         competitor_ordered_weight = competitor_transl.third_attempt_squat_res
            #     if cur_transl_val == "Жим 1":
            #         competitor_ordered_weight = competitor_transl.first_attempt_bpress_res
            #     if cur_transl_val == "Жим 2":
            #         competitor_ordered_weight = competitor_transl.second_attempt_bpress_res
            #     if cur_transl_val == "Жим 3":
            #         competitor_ordered_weight = competitor_transl.third_attempt_bpress_res
            #     if cur_transl_val == "Тяга 1":
            #         competitor_ordered_weight = competitor_transl.first_attempt_dlift_res
            #     if cur_transl_val == "Тяга 2":
            #         competitor_ordered_weight = competitor_transl.second_attempt_dlift_res
            #     if cur_transl_val == "Тяга 3":
            #         competitor_ordered_weight = competitor_transl.third_attempt_dlift_res
            # if "Троеборье (экип.)" in competitor_sports_types:
            #     if cur_transl_val == "Присед 1":
            #         competitor_ordered_weight = competitor_transl.first_attempt_squat_res
            #     if cur_transl_val == "Присед 2":
            #         competitor_ordered_weight = competitor_transl.second_attempt_squat_res
            #     if cur_transl_val == "Присед 3":
            #         competitor_ordered_weight = competitor_transl.third_attempt_squat_res
            #     if cur_transl_val == "Жим 1":
            #         competitor_ordered_weight = competitor_transl.first_attempt_bpress_res
            #     if cur_transl_val == "Жим 2":
            #         competitor_ordered_weight = competitor_transl.second_attempt_bpress_res
            #     if cur_transl_val == "Жим 3":
            #         competitor_ordered_weight = competitor_transl.third_attempt_bpress_res
            #     if cur_transl_val == "Тяга 1":
            #         competitor_ordered_weight = competitor_transl.first_attempt_dlift_res
            #     if cur_transl_val == "Тяга 2":
            #         competitor_ordered_weight = competitor_transl.second_attempt_dlift_res
            #     if cur_transl_val == "Тяга 3":
            #         competitor_ordered_weight = competitor_transl.third_attempt_dlift_res
            # print(cur_transl_val)
            # print(cur_transl_val.split(' ')[0].lower())
            # print(cur_transl_val.split(' ')[1])
            # print(cur_transl_pk)
            # competitor_transl = CompetitionProtocols.objects.get(pk=cur_transl_pk)
            # print(f"{competitor_transl.competitor.surname_comp.capitalize()} {competitor_transl.competitor.name_comp.capitalize()}")
            # print(competitor_transl.competitor.weight_cat)
            # print(competitor_transl.competitor.sports_type.all())
            # print([i.title for i in competitor_transl.competitor.sports_type.all()])
        # print(cur_transl_val)
        # print(cur_transl_pk)
        # print(request.POST)
        # return JsonResponse({"cur_transl_val": cur_transl_val, "cur_transl_pk": cur_transl_pk}, status=200)
        # return JsonResponse({"competitor_exercise": competitor_exercise, "competitor_exercise_attempt": competitor_exercise_attempt, "competitor_fi": competitor_fi,
        #                      "competitor_weight_cat": competitor_weight_cat, "competitor_ordered_weight": competitor_ordered_weight, "competitor_ordered_weight_offset": competitor_ordered_weight_offset, "cur_transl_pk": cur_transl_pk}, status=200)
    return render(request, 'pwrlftmain/scoreboard_page.html', response_data)


@login_required
def scoreboard_comp_page(request, competition_slug):
    cur_competition = Competitions.objects.get(competition_slug=competition_slug)
    response_data = {
        'cur_competition': cur_competition,
    }
    if 'score-form_btn' in request.POST:
        cur_flow = CompetitorsFlow.objects.first().comp_flow
        cur_flow_competitors_st = CompetitionProtocols.objects.filter(competitor_stream=cur_flow)
        competitors_stypes_st = cur_flow_competitors_st.values_list('competitor__sports_type__title', flat=True)
        competitors_stypes = []
        for csts in competitors_stypes_st:
            if csts not in competitors_stypes:
                competitors_stypes.append(csts)
        if "Троеборье классическое" in competitors_stypes:
            cur_flow_competitors = cur_flow_competitors_st.order_by(F("first_attempt_squat_res").asc(nulls_last=True))
            if None not in cur_flow_competitors.filter(Q(competitor__sports_type__title="Троеборье классическое") & Q(competitor__sports_type__title="Троеборье (экип.)")).values_list('third_attempt_squat_off', flat=True):
                cur_flow_competitors = cur_flow_competitors_st.order_by(F("first_attempt_bpress_res").asc(nulls_last=True))
                if None not in cur_flow_competitors.filter(Q(competitor__sports_type__title="Троеборье классическое") & Q(competitor__sports_type__title="Троеборье (экип.)")).values_list('third_attempt_bpress_off', flat=True):
                    cur_flow_competitors = cur_flow_competitors_st.order_by(F("first_attempt_dlift_res").asc(nulls_last=True))
        elif "Троеборье (экип.)" in competitors_stypes:
            cur_flow_competitors = cur_flow_competitors_st.order_by(F("first_attempt_squat_res_ek").asc(nulls_last=True))
            if None not in cur_flow_competitors.filter(competitor__sports_type__title="Троеборье (экип.)").values_list('third_attempt_squat_off_ek', flat=True):
                cur_flow_competitors = cur_flow_competitors_st.order_by(F("first_attempt_bpress_res_ek").asc(nulls_last=True))
                if None not in cur_flow_competitors.filter(competitor__sports_type__title="Троеборье (экип.)").values_list('third_attempt_bpress_off_ek', flat=True):
                    cur_flow_competitors = cur_flow_competitors_st.order_by(F("first_attempt_dlift_res_ek").asc(nulls_last=True))
        elif "Жим лёжа (без экип.)" in competitors_stypes:
            cur_flow_competitors = cur_flow_competitors_st.order_by(F("first_attempt_bpress_res").asc(nulls_last=True))
        else:
            cur_flow_competitors = cur_flow_competitors_st.order_by(F("first_attempt_bpress_res_ek").asc(nulls_last=True))
        cur_flow_competitors_json = serializers.serialize("json", cur_flow_competitors, use_natural_foreign_keys=True)
        return JsonResponse({"cur_flow_competitors_json": cur_flow_competitors_json, }, status=200)

    return render(request, 'pwrlftmain/scoreboard_comp_page.html', response_data)