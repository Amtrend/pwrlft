from django.db import models
from django.urls import reverse
from decimal import Decimal


class SportType(models.Model):

    title = models.CharField(max_length=100, verbose_name='Название спортивной дисциплины')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Вид спорта'
        verbose_name_plural = 'Виды спорта'
        ordering = ['-title']

    # def natural_key(self):
    #     return (self.title)


class CompetitorsFlow(models.Model):

    Flows = [
        ('1 поток', '1 поток'),
        ('2 поток', '2 поток'),
        ('3 поток', '3 поток'),
        ('4 поток', '4 поток'),
        ('5 поток', '5 поток'),
        ('6 поток', '6 поток'),
        ('7 поток', '7 поток'),
        ('8 поток', '8 поток'),
        ('9 поток', '9 поток'),
        ('10 поток', '10 поток'),
    ]

    comp_flow = models.CharField(max_length=8, choices=Flows, verbose_name='Текущий поток выступающих')

    def __str__(self):
        return self.comp_flow

    class Meta:
        verbose_name = 'Текущий поток выступающих'
        verbose_name_plural = 'Текущий поток выступающих'
        ordering = ['-comp_flow']


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

    def get_absolute_url_protocol_excel(self):
        return reverse('competition_protocol_excel', args=[self.competition_slug])

    def get_absolute_url_secretary(self):
        return reverse('secretary_page', args=[self.competition_slug])

    def get_absolute_url_scoreboard(self):
        return reverse('scoreboard_page', args=[self.competition_slug])

    def get_absolute_url_scoreboard_comp(self):
        return reverse('scoreboard_comp_page', args=[self.competition_slug])

    def get_absolute_url(self):
        return reverse('competition_entry', args=[self.competition_slug])

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
        return f"{self.surname_comp} {self.name_comp} {self.patronymic_comp} {self.birthday}"

    class Meta:
        verbose_name = 'Участник соревнований'
        verbose_name_plural = 'Участники соревнований'
        ordering = ['-register_date']

    def natural_key(self):
        return (self.surname_comp, self.name_comp, list(self.sports_type.values_list('title', flat=True)))
    # def natural_key(self) -> dict[str, str]:
    #     return {"competitor_name": self.name_comp,
    #             "sports_type": list(self.sports_type.values_list('title', flat=True))}
    # def natural_key(self) -> dict[str, str]:
    #     return {"competitor_name": self.name_comp, "sports_type": self.sports_type.title}


class CompetitionProtocols(models.Model):

    Offset = [
        ('0', '0'),
        ('1', '1'),
        ('2', '2'),
        ('3', '3'),
    ]

    Streams = [
        ('1 поток', '1 поток'),
        ('2 поток', '2 поток'),
        ('3 поток', '3 поток'),
        ('4 поток', '4 поток'),
        ('5 поток', '5 поток'),
        ('6 поток', '6 поток'),
        ('7 поток', '7 поток'),
        ('8 поток', '8 поток'),
        ('9 поток', '9 поток'),
        ('10 поток', '10 поток'),
    ]

    competitor = models.ForeignKey(Competitors, on_delete=models.PROTECT, related_name="Участник", verbose_name="Участники")
    competitor_stream = models.CharField(max_length=8, choices=Streams, verbose_name='Поток', blank=True, null=True)
    competitor_weight = models.DecimalField(max_digits=5, decimal_places=2, verbose_name='Вес на взвешивании')
    first_attempt_squat_res = models.DecimalField(max_digits=5, decimal_places=2, verbose_name='Первая попытка присяд результат', blank=True, null=True)
    first_attempt_squat_off = models.CharField(max_length=1, choices=Offset, verbose_name='Первая попытка присяд зачёт', blank=True, null=True)
    second_attempt_squat_res = models.DecimalField(max_digits=5, decimal_places=2, verbose_name='Вторая попытка присяд результат', blank=True, null=True)
    second_attempt_squat_off = models.CharField(max_length=1, choices=Offset, verbose_name='Вторая попытка присяд зачёт', blank=True, null=True)
    third_attempt_squat_res = models.DecimalField(max_digits=5, decimal_places=2, verbose_name='Третья попытка присяд результат', blank=True, null=True)
    third_attempt_squat_off = models.CharField(max_length=1, choices=Offset, verbose_name='Третья попытка присяд зачёт', blank=True, null=True)
    first_attempt_bpress_res = models.DecimalField(max_digits=5, decimal_places=2, verbose_name='Первая попытка жим результат', blank=True, null=True)
    first_attempt_bpress_off = models.CharField(max_length=1, choices=Offset, verbose_name='Первая попытка жим зачёт', blank=True, null=True)
    second_attempt_bpress_res = models.DecimalField(max_digits=5, decimal_places=2, verbose_name='Вторая попытка жим результат', blank=True, null=True)
    second_attempt_bpress_off = models.CharField(max_length=1, choices=Offset, verbose_name='Вторая попытка жим зачёт', blank=True, null=True)
    third_attempt_bpress_res = models.DecimalField(max_digits=5, decimal_places=2, verbose_name='Третья попытка жим результат', blank=True, null=True)
    third_attempt_bpress_off = models.CharField(max_length=1, choices=Offset, verbose_name='Третья попытка жим зачёт', blank=True, null=True)
    first_attempt_dlift_res = models.DecimalField(max_digits=5, decimal_places=2, verbose_name='Первая попытка тяга результат', blank=True, null=True)
    first_attempt_dlift_off = models.CharField(max_length=1, choices=Offset, verbose_name='Первая попытка тяга зачёт', blank=True, null=True)
    second_attempt_dlift_res = models.DecimalField(max_digits=5, decimal_places=2, verbose_name='Вторая попытка тяга результат', blank=True, null=True)
    second_attempt_dlift_off = models.CharField(max_length=1, choices=Offset, verbose_name='Вторая попытка тяга зачёт', blank=True, null=True)
    third_attempt_dlift_res = models.DecimalField(max_digits=5, decimal_places=2, verbose_name='Третья попытка тяга результат', blank=True, null=True)
    third_attempt_dlift_off = models.CharField(max_length=1, choices=Offset, verbose_name='Третья попытка тяга зачёт', blank=True, null=True)
    best_squat_res = models.DecimalField(max_digits=5, decimal_places=2, verbose_name='Итоговый присяд результат', blank=True, null=True)
    best_bpress_res = models.DecimalField(max_digits=5, decimal_places=2, verbose_name='Итоговый жим результат', blank=True, null=True)
    best_dlift_res = models.DecimalField(max_digits=5, decimal_places=2, verbose_name='Итоговая тяга результат', blank=True, null=True)
    best_sum_res = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='Итоговая сумма результат', blank=True, null=True)
    first_attempt_squat_res_ek = models.DecimalField(max_digits=5, decimal_places=2, verbose_name='Первая попытка присяд результат (экип.)', blank=True, null=True)
    first_attempt_squat_off_ek = models.CharField(max_length=1, choices=Offset, verbose_name='Первая попытка присяд зачёт (экип.)', blank=True, null=True)
    second_attempt_squat_res_ek = models.DecimalField(max_digits=5, decimal_places=2, verbose_name='Вторая попытка присяд результат (экип.)', blank=True, null=True)
    second_attempt_squat_off_ek = models.CharField(max_length=1, choices=Offset, verbose_name='Вторая попытка присяд зачёт (экип.)', blank=True, null=True)
    third_attempt_squat_res_ek = models.DecimalField(max_digits=5, decimal_places=2, verbose_name='Третья попытка присяд результат (экип.)', blank=True, null=True)
    third_attempt_squat_off_ek = models.CharField(max_length=1, choices=Offset, verbose_name='Третья попытка присяд зачёт (экип.)', blank=True, null=True)
    first_attempt_bpress_res_ek = models.DecimalField(max_digits=5, decimal_places=2, verbose_name='Первая попытка жим результат (экип.)', blank=True, null=True)
    first_attempt_bpress_off_ek = models.CharField(max_length=1, choices=Offset, verbose_name='Первая попытка жим зачёт (экип.)', blank=True, null=True)
    second_attempt_bpress_res_ek = models.DecimalField(max_digits=5, decimal_places=2, verbose_name='Вторая попытка жим результат (экип.)', blank=True, null=True)
    second_attempt_bpress_off_ek = models.CharField(max_length=1, choices=Offset, verbose_name='Вторая попытка жим зачёт (экип.)', blank=True, null=True)
    third_attempt_bpress_res_ek = models.DecimalField(max_digits=5, decimal_places=2, verbose_name='Третья попытка жим результат (экип.)', blank=True, null=True)
    third_attempt_bpress_off_ek = models.CharField(max_length=1, choices=Offset, verbose_name='Третья попытка жим зачёт (экип.)', blank=True, null=True)
    first_attempt_dlift_res_ek = models.DecimalField(max_digits=5, decimal_places=2, verbose_name='Первая попытка тяга результат (экип.)', blank=True, null=True)
    first_attempt_dlift_off_ek = models.CharField(max_length=1, choices=Offset, verbose_name='Первая попытка тяга зачёт (экип.)', blank=True, null=True)
    second_attempt_dlift_res_ek = models.DecimalField(max_digits=5, decimal_places=2, verbose_name='Вторая попытка тяга результат (экип.)', blank=True, null=True)
    second_attempt_dlift_off_ek = models.CharField(max_length=1, choices=Offset, verbose_name='Вторая попытка тяга зачёт (экип.)', blank=True, null=True)
    third_attempt_dlift_res_ek = models.DecimalField(max_digits=5, decimal_places=2, verbose_name='Третья попытка тяга результат (экип.)', blank=True, null=True)
    third_attempt_dlift_off_ek = models.CharField(max_length=1, choices=Offset, verbose_name='Третья попытка тяга зачёт (экип.)', blank=True, null=True)
    best_squat_res_ek = models.DecimalField(max_digits=5, decimal_places=2, verbose_name='Итоговый присяд результат (экип.)', blank=True, null=True)
    best_bpress_res_ek = models.DecimalField(max_digits=5, decimal_places=2, verbose_name='Итоговый жим результат (экип.)', blank=True, null=True)
    best_dlift_res_ek = models.DecimalField(max_digits=5, decimal_places=2, verbose_name='Итоговая тяга результат (экип.)', blank=True, null=True)
    best_sum_res_ek = models.DecimalField(max_digits=6, decimal_places=2, verbose_name='Итоговая сумма результат (экип.)', blank=True, null=True)
    competitor_translation = models.CharField(max_length=20, verbose_name='Текущая трансляция', blank=True, null=True)
    register_date = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Дата изменении')

    def save(self, *args, **kwargs):
        if self.first_attempt_squat_res and self.first_attempt_squat_off in ['2', '3']:
            self.best_squat_res = self.first_attempt_squat_res
        if self.second_attempt_squat_res and self.second_attempt_squat_off in ['2', '3'] and self.second_attempt_squat_res > self.first_attempt_squat_res:
            self.best_squat_res = self.second_attempt_squat_res
        if self.third_attempt_squat_res and self.third_attempt_squat_off in ['2', '3'] and self.third_attempt_squat_res > self.first_attempt_squat_res and self.third_attempt_squat_res > self.second_attempt_squat_res:
            self.best_squat_res = self.third_attempt_squat_res
        if self.first_attempt_bpress_res and self.first_attempt_bpress_off in ['2', '3']:
            self.best_bpress_res = self.first_attempt_bpress_res
        if self.second_attempt_bpress_res and self.second_attempt_bpress_off in ['2', '3'] and self.second_attempt_bpress_res > self.first_attempt_bpress_res:
            self.best_bpress_res = self.second_attempt_bpress_res
        if self.third_attempt_bpress_res and self.third_attempt_bpress_off in ['2', '3'] and self.third_attempt_bpress_res > self.first_attempt_bpress_res and self.third_attempt_bpress_res > self.second_attempt_bpress_res:
            self.best_bpress_res = self.third_attempt_bpress_res
        if self.first_attempt_dlift_res and self.first_attempt_dlift_off in ['2', '3']:
            self.best_dlift_res = self.first_attempt_dlift_res
        if self.second_attempt_dlift_res and self.second_attempt_dlift_off in ['2', '3'] and self.second_attempt_dlift_res > self.first_attempt_dlift_res:
            self.best_dlift_res = self.second_attempt_dlift_res
        if self.third_attempt_dlift_res and self.third_attempt_dlift_off in ['2', '3'] and self.third_attempt_dlift_res > self.first_attempt_dlift_res and self.third_attempt_dlift_res > self.second_attempt_dlift_res:
            self.best_dlift_res = self.third_attempt_dlift_res
        if self.best_squat_res and not self.best_bpress_res and not self.best_dlift_res:
            self.best_sum_res = self.best_squat_res
        if self.best_bpress_res and not self.best_squat_res and not self.best_dlift_res:
            self.best_sum_res = self.best_bpress_res
        if self.best_dlift_res and not self.best_squat_res and not self.best_bpress_res:
            self.best_sum_res = self.best_dlift_res
        if self.best_squat_res and self.best_bpress_res and not self.best_dlift_res:
            self.best_sum_res = Decimal(self.best_squat_res) + Decimal(self.best_bpress_res)
        if self.best_squat_res and self.best_dlift_res and not self.best_bpress_res:
            self.best_sum_res = Decimal(self.best_squat_res) + Decimal(self.best_dlift_res)
        if self.best_bpress_res and self.best_dlift_res and not self.best_squat_res:
            self.best_sum_res = Decimal(self.best_bpress_res) + Decimal(self.best_dlift_res)
        if self.best_squat_res and self.best_bpress_res and self.best_dlift_res:
            self.best_sum_res = Decimal(self.best_squat_res) + Decimal(self.best_bpress_res) + Decimal(self.best_dlift_res)
        if self.first_attempt_squat_res_ek and self.first_attempt_squat_off_ek in ['2', '3']:
            self.best_squat_res_ek = self.first_attempt_squat_res_ek
        if self.second_attempt_squat_res_ek and self.second_attempt_squat_off_ek in ['2', '3'] and self.second_attempt_squat_res_ek > self.first_attempt_squat_res_ek:
            self.best_squat_res_ek = self.second_attempt_squat_res_ek
        if self.third_attempt_squat_res_ek and self.third_attempt_squat_off_ek in ['2', '3'] and self.third_attempt_squat_res_ek > self.first_attempt_squat_res_ek and self.third_attempt_squat_res_ek > self.second_attempt_squat_res_ek:
            self.best_squat_res_ek = self.third_attempt_squat_res_ek
        if self.first_attempt_bpress_res_ek and self.first_attempt_bpress_off_ek in ['2', '3']:
            self.best_bpress_res_ek = self.first_attempt_bpress_res_ek
        if self.second_attempt_bpress_res_ek and self.second_attempt_bpress_off_ek in ['2', '3'] and self.second_attempt_bpress_res_ek > self.first_attempt_bpress_res_ek:
            self.best_bpress_res_ek = self.second_attempt_bpress_res_ek
        if self.third_attempt_bpress_res_ek and self.third_attempt_bpress_off_ek in ['2', '3'] and self.third_attempt_bpress_res_ek > self.first_attempt_bpress_res_ek and self.third_attempt_bpress_res_ek > self.second_attempt_bpress_res_ek:
            self.best_bpress_res_ek = self.third_attempt_bpress_res_ek
        if self.first_attempt_dlift_res_ek and self.first_attempt_dlift_off_ek in ['2', '3']:
            self.best_dlift_res_ek = self.first_attempt_dlift_res_ek
        if self.second_attempt_dlift_res_ek and self.second_attempt_dlift_off_ek in ['2', '3'] and self.second_attempt_dlift_res_ek > self.first_attempt_dlift_res_ek:
            self.best_dlift_res_ek = self.second_attempt_dlift_res_ek
        if self.third_attempt_dlift_res_ek and self.third_attempt_dlift_off_ek in ['2', '3'] and self.third_attempt_dlift_res_ek > self.first_attempt_dlift_res_ek and self.third_attempt_dlift_res_ek > self.second_attempt_dlift_res_ek:
            self.best_dlift_res_ek = self.third_attempt_dlift_res_ek
        if self.best_squat_res_ek and not self.best_bpress_res_ek and not self.best_dlift_res_ek:
            self.best_sum_res_ek = self.best_squat_res_ek
        if self.best_bpress_res_ek and not self.best_squat_res_ek and not self.best_dlift_res_ek:
            self.best_sum_res_ek = self.best_bpress_res_ek
        if self.best_dlift_res_ek and not self.best_squat_res_ek and not self.best_bpress_res_ek:
            self.best_sum_res_ek = self.best_dlift_res_ek
        if self.best_squat_res_ek and self.best_bpress_res_ek and not self.best_dlift_res_ek:
            self.best_sum_res_ek = Decimal(self.best_squat_res_ek) + Decimal(self.best_bpress_res_ek)
        if self.best_squat_res_ek and self.best_dlift_res_ek and not self.best_bpress_res_ek:
            self.best_sum_res_ek = Decimal(self.best_squat_res_ek) + Decimal(self.best_dlift_res_ek)
        if self.best_bpress_res_ek and self.best_dlift_res_ek and not self.best_squat_res_ek:
            self.best_sum_res_ek = Decimal(self.best_bpress_res_ek) + Decimal(self.best_dlift_res_ek)
        if self.best_squat_res_ek and self.best_bpress_res_ek and self.best_dlift_res_ek:
            self.best_sum_res_ek = Decimal(self.best_squat_res_ek) + Decimal(self.best_bpress_res_ek) + Decimal(self.best_dlift_res_ek)
        super(CompetitionProtocols, self).save(*args, **kwargs)

    def __str__(self):
        return str(self.competitor)

    class Meta:
        verbose_name = 'Результат соревнований участника'
        verbose_name_plural = 'Результаты соревнований участников'
        ordering = ['-register_date']
