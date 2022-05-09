from django.shortcuts import render
from .models import *
from django.http import JsonResponse
from django.template.loader import render_to_string
from django.core.mail import send_mail
from pwrlft.settings import EMAIL_HOST_USER


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
    print(request)
    print(competition_slug)
    response_data = {

    }
    return render(request, 'pwrlftmain/competition_protocol.html', response_data)


def news_page(request):
    return render(request, 'pwrlftmain/news.html')
