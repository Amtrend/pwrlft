from django.db import models
from django.urls import reverse


class SportType(models.Model):

    title = models.CharField(max_length=100, verbose_name='Название спортивной дисциплины')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Вид спорта'
        verbose_name_plural = 'Виды спорта'
        ordering = ['-title']


class Competitions(models.Model):

    title = models.CharField(max_length=300, verbose_name='Название соревнований')
    sport_types = models.ManyToManyField(SportType, verbose_name='Спортивные дисциплины')
    content = models.TextField(verbose_name='Описание соревнований', blank=True, null=True)
    competition_slug = models.SlugField(max_length=255, verbose_name='Url', unique=True)
    start_date = models.DateField(verbose_name='Дата начала соревнований')
    end_date = models.DateField(verbose_name='Дата конца соревнований')

    def get_absolute_url_entry(self):
        return reverse('competition_entry', args=[self.competition_slug])

    def get_absolute_url_list(self):
        return reverse('competition_list', args=[self.competition_slug])

    def get_absolute_url_protocol(self):
        return reverse('competition_protocol', args=[self.competition_slug])

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Соревнования'
        verbose_name_plural = 'Соревнования'
        ordering = ['-start_date']


class Competitors(models.Model):

    Sports_category = [
        ('Без разряда', 'Без разряда'),
        ('III юношеский', 'III юношеский'),
        ('II юношеский', 'II юношеский'),
        ('I юношеский', 'I юношеский'),
        ('III взрослый', 'III взрослый'),
        ('II взрослый', 'II взрослый'),
        ('I взрослый', 'I взрослый'),
        ('КМС', 'КМС'),
        ('МС', 'МС'),
        ('МСМК', 'МСМК'),
    ]

    Gender = [
        ('Мужской', 'Мужской'),
        ('Женский', 'Женский'),
    ]

    gender = models.CharField(max_length=7, choices=Gender, verbose_name='Пол')
    name_comp = models.CharField(max_length=100, verbose_name="Имя участника")
    surname_comp = models.CharField(max_length=100, verbose_name="Фамилия участника")
    patronymic_comp = models.CharField(max_length=100, verbose_name="Отчество участника")
    name_trainer = models.CharField(max_length=100, verbose_name='Имя тренера', blank=True, null=True)
    surname_trainer = models.CharField(max_length=100, verbose_name='Фамилия тренера', blank=True, null=True)
    patronymic_trainer = models.CharField(max_length=100, verbose_name='Отчество тренера', blank=True, null=True)
    club = models.CharField(max_length=150, verbose_name='Спортивный клуб', blank=True, null=True)
    birthday = models.DateField(verbose_name='Дата рождения')
    sports_cat = models.CharField(max_length=15, choices=Sports_category, default='Без разряда', verbose_name='Спортивный разряд')
    sports_type = models.ManyToManyField(SportType, verbose_name='Спортивные дисциплины')
    best_res_pwlft_ek = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='Лучший результат в троеборье (экип.)', blank=True, null=True)
    best_res_pwlft_cl = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='Лучший результат в троеборье классическом', blank=True, null=True)
    best_res_bpress_ek = models.DecimalField(max_digits=5, decimal_places=2, verbose_name='Лучший результат в жиме лёжа (экип.)', blank=True, null=True)
    best_res_bpress_cl = models.DecimalField(max_digits=5, decimal_places=2, verbose_name='Лучший результат в жиме лёжа (без экип.)', blank=True, null=True)
    weight_cat = models.CharField(max_length=4, verbose_name='Весовая категория')
    phone = models.CharField(max_length=15, verbose_name='Номер телефона', blank=True, null=True)
    mail = models.CharField(max_length=30, verbose_name='Адрес эл. почты', blank=True, null=True)
    comp_title = models.ForeignKey(Competitions, on_delete=models.PROTECT, related_name='Участники', verbose_name='Соревнования')
    agree_pol = models.BooleanField(default=True, verbose_name='Согласен с политикой конфиденциальности')
    register_date = models.DateTimeField(auto_now_add=True, verbose_name='Дата регистрации')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Дата изменении')

    def __str__(self):
        return self.surname_comp

    class Meta:
        verbose_name = 'Участник соревнований'
        verbose_name_plural = 'Участники соревнований'
        ordering = ['-register_date']
