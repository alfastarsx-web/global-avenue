import type { L } from './site';

/* ─────────────────────────── Blog / yangiliklar ─────────────────────────── */

export type PostCategory = 'news' | 'guide' | 'mortgage';

export interface Post {
  slug: string;
  category: PostCategory;
  date: string; // ISO
  readMinutes: number;
  cover: string;
  title: L;
  excerpt: L;
  /** Har bir element — paragraf; "## " bilan boshlansa sarlavha */
  body: Record<'uz' | 'ru', string[]>;
}

export const postCategories: { key: PostCategory; label: L }[] = [
  { key: 'news', label: { uz: 'Yangiliklar', ru: 'Новости' } },
  { key: 'guide', label: { uz: 'Foydali maslahatlar', ru: 'Полезные советы' } },
  { key: 'mortgage', label: { uz: 'Ipoteka va to’lov', ru: 'Ипотека и оплата' } },
];

export const posts: Post[] = [
  {
    slug: 'twinera-karkas-yakunlandi',
    category: 'news',
    date: '2026-08-18',
    readMinutes: 3,
    cover: '/img/blog/post-1.jpg',
    title: {
      uz: 'TwinEra: ikkala minorada karkas ishlari yakunlandi',
      ru: 'TwinEra: каркасные работы завершены на обеих башнях',
    },
    excerpt: {
      uz: "TwinEra majmuasining ikkala minorasida 16-qavat quyilishi tugadi. Endi fasad va oynalash bosqichi boshlanadi.",
      ru: 'На обеих башнях TwinEra завершена заливка 16-го этажа. Начинается этап фасада и остекления.',
    },
    body: {
      uz: [
        "TwinEra turar-joy majmuasida muhim bosqich yakunlandi: ikkala minoraning ham 16-qavatigacha monolit karkas quyib bo'lindi. Ishlar shartnomada belgilangan jadvaldan bir hafta oldinda ketmoqda.",
        '## Keyingi bosqichda nima bo‘ladi',
        "Sentabr oyidan boshlab ventilyatsiyalanuvchi fasad tizimi montaj qilinadi va panoramali oyna paketlari o'rnatiladi. Bu bosqich taxminan to'rt oy davom etadi.",
        "Parallel ravishda yer osti avtoturargohda gidroizolyatsiya va ventilyatsiya tizimlari ustida ish olib borilmoqda.",
        '## Xaridorlar uchun',
        "Karkas yakunlangach, xonadonlarni joyida ko'rish imkoniyati ochiladi. Bron qilgan mijozlar menejer bilan kelishgan holda ob'ektga tashrif buyurishlari mumkin.",
        "Har haftalik foto-hisobotlarni saytimizning \"Qurilish jarayoni\" bo'limida va Instagram sahifamizda kuzatib boring.",
      ],
      ru: [
        'В жилом комплексе TwinEra завершён важный этап: монолитный каркас залит до 16-го этажа на обеих башнях. Работы идут с опережением графика на неделю.',
        '## Что дальше',
        'С сентября начинается монтаж вентилируемой фасадной системы и установка панорамных стеклопакетов. Этот этап займёт около четырёх месяцев.',
        'Параллельно ведутся работы по гидроизоляции и вентиляции подземного паркинга.',
        '## Для покупателей',
        'После завершения каркаса открывается возможность осмотра квартир на месте. Клиенты, оформившие бронь, могут посетить объект по согласованию с менеджером.',
        'Следите за еженедельными фотоотчётами в разделе «Ход строительства» и на нашей странице в Instagram.',
      ],
    },
  },
  {
    slug: 'ishonchli-quruvchini-tanlash',
    category: 'guide',
    date: '2026-08-05',
    readMinutes: 6,
    cover: '/img/blog/post-2.jpg',
    title: {
      uz: 'Ishonchli quruvchini qanday tanlash kerak: 7 ta tekshiruv',
      ru: 'Как выбрать надёжного застройщика: 7 проверок',
    },
    excerpt: {
      uz: "Shartnoma imzolashdan oldin devoloperni tekshirishning amaliy ro'yxati — hujjatlardan tortib qurilish maydonigacha.",
      ru: 'Практический чек-лист проверки застройщика перед подписанием договора — от документов до стройплощадки.',
    },
    body: {
      uz: [
        "Uy sotib olish — ko'pchilik uchun umrdagi eng katta xarid. Shuning uchun devoloperni tanlashda hissiyotga emas, tekshirilgan faktlarga tayanish kerak. Quyida shartnoma imzolashdan oldin o'tkazish lozim bo'lgan yetti tekshiruv.",
        '## 1. Litsenziya va qurilish ruxsatnomasi',
        "Kompaniyaning qurilish litsenziyasi va aynan shu ob'ekt uchun berilgan qurilish ruxsatnomasini so'rang. Ruxsatnomadagi manzil va yer uchastkasi kadastr raqami loyiha bilan mos kelishi shart.",
        '## 2. Yer uchastkasi hujjatlari',
        "Yer kimning nomida va qanday huquq asosida ekanini aniqlang. Ijaraga olingan yerda qurilayotgan bo'lsa, ijara muddati topshirish sanasidan uzoqroq bo'lishi kerak.",
        '## 3. Yakunlangan loyihalar',
        "Kompaniya avval nima qurgan? Topshirilgan uylarga borib ko'ring, u yerda yashayotgan odamlar bilan gaplashing. Bu eng ishonchli manba.",
        '## 4. Qurilish maydonini o‘z ko‘zingiz bilan ko‘ring',
        "Maydonda ish sur'ati qanday, texnika va ishchilar bormi, materiallar qanday saqlanmoqda — bularning hammasi ko'p narsani aytadi.",
        '## 5. Shartnoma matni',
        "Shartnomada aniq topshirish sanasi, kechikkan taqdirdagi javobgarlik, xonadon maydoni o'zgarganda hisob-kitob tartibi yozilgan bo'lishi kerak. Notariusda rasmiylashtirilishi muhim.",
        '## 6. To‘lov shaffofligi',
        "Barcha to'lovlar kompaniyaning rasmiy hisob raqamiga o'tkazilishi lozim. Naqd pulni shaxsiy qo'lga berish — jiddiy xavf belgisi.",
        '## 7. Ochiq muloqot',
        "Yaxshi devoloper qurilish jarayonini yashirmaydi. Muntazam foto-hisobot, ochiq telefon va javob beradigan menejer — ishonch belgisi.",
        "Global Avenue'da bu tamoyillar \"sirsiz qurilish\" konsepsiyasi ostida birlashtirilgan: har hafta ob'ektlardan hisobot e'lon qilamiz va istalgan mijoz qurilish maydoniga tashrif buyura oladi.",
      ],
      ru: [
        'Покупка жилья — крупнейшая покупка в жизни для большинства людей. Поэтому при выборе застройщика нужно опираться не на эмоции, а на проверенные факты. Ниже — семь проверок, которые стоит провести до подписания договора.',
        '## 1. Лицензия и разрешение на строительство',
        'Запросите строительную лицензию компании и разрешение на строительство именно этого объекта. Адрес и кадастровый номер участка в разрешении должны совпадать с проектом.',
        '## 2. Документы на земельный участок',
        'Выясните, на кого и на каком праве оформлена земля. Если строительство ведётся на арендованном участке, срок аренды должен превышать срок сдачи.',
        '## 3. Завершённые проекты',
        'Что компания строила раньше? Съездите в сданные дома, поговорите с жильцами. Это самый достоверный источник.',
        '## 4. Посмотрите стройплощадку своими глазами',
        'Каков темп работ, есть ли техника и рабочие, как хранятся материалы — всё это говорит о многом.',
        '## 5. Текст договора',
        'В договоре должны быть чётко указаны дата передачи, ответственность за просрочку и порядок расчёта при изменении площади квартиры. Важно нотариальное оформление.',
        '## 6. Прозрачность платежей',
        'Все платежи должны идти на официальный расчётный счёт компании. Передача наличных «в руки» — серьёзный тревожный сигнал.',
        '## 7. Открытая коммуникация',
        'Хороший застройщик не скрывает процесс стройки. Регулярные фотоотчёты, доступный телефон и отвечающий менеджер — признак надёжности.',
        'В Global Avenue эти принципы объединены в концепции «стройка без секретов»: мы публикуем отчёты с объектов каждую неделю, и любой клиент может посетить стройплощадку.',
      ],
    },
  },
  {
    slug: 'ipoteka-2026',
    category: 'mortgage',
    date: '2026-07-22',
    readMinutes: 5,
    cover: '/img/blog/post-3.jpg',
    title: {
      uz: "Ipoteka yoki muddatli to'lov: qaysi biri sizga foydali?",
      ru: 'Ипотека или рассрочка: что выгоднее именно вам?',
    },
    excerpt: {
      uz: "Ikki to'lov usulining farqi, ortiqcha to'lov hisobi va qaysi holatda qaysi biri afzalligi haqida.",
      ru: 'Чем отличаются два способа оплаты, как считается переплата и в какой ситуации что выгоднее.',
    },
    body: {
      uz: [
        "Yangi qurilayotgan uydan xonadon sotib olishda odatda ikkita asosiy yo'l bo'ladi: devoloperning muddatli to'lovi yoki bank ipotekasi. Ularning har birining o'z kuchli va zaif tomonlari bor.",
        '## Muddatli to‘lov',
        "Devoloper bilan to'g'ridan-to'g'ri tuziladi. Odatda 24–36 oy muddatga beriladi, boshlang'ich to'lov 30% dan boshlanadi va foiz olinmaydi. Bank tekshiruvi, daromad haqida ma'lumotnoma va sug'urta talab qilinmaydi.",
        "Kamchiligi — muddat qisqa, shuning uchun oylik to'lov nisbatan katta bo'ladi.",
        '## Ipoteka',
        "Bank orqali 15–20 yilgacha rasmiylashtiriladi. Oylik to'lov ancha kichik bo'ladi, lekin yillik stavka hisobiga umumiy ortiqcha to'lov sezilarli oshadi. Rasmiy daromad, sug'urta va bank qarori talab qilinadi.",
        '## Qanday tanlash kerak',
        "Agar 3 yil ichida to'lay oladigan bo'lsangiz — muddatli to'lov deyarli har doim foydali, chunki ortiqcha to'lov nolga teng.",
        "Agar oylik to'lovni kichik ushlab turish muhim bo'lsa yoki summa katta bo'lsa — ipoteka mos keladi. Yosh oilalar uchun davlat subsidiyasi dasturlari stavkani sezilarli pasaytiradi.",
        "Saytimizdagi kalkulyator orqali ikkala variantni bir necha soniyada solishtirib ko'rishingiz mumkin.",
      ],
      ru: [
        'При покупке квартиры в новостройке обычно есть два основных пути: рассрочка от застройщика или банковская ипотека. У каждого свои сильные и слабые стороны.',
        '## Рассрочка',
        'Оформляется напрямую с застройщиком. Обычно срок 24–36 месяцев, первый взнос от 30%, проценты не начисляются. Не требуются проверка банка, справка о доходах и страховка.',
        'Минус — короткий срок, поэтому ежемесячный платёж заметно выше.',
        '## Ипотека',
        'Оформляется через банк на срок до 15–20 лет. Ежемесячный платёж значительно ниже, но за счёт годовой ставки итоговая переплата существенно растёт. Требуются официальный доход, страховка и решение банка.',
        '## Как выбрать',
        'Если вы способны рассчитаться в течение 3 лет — рассрочка почти всегда выгоднее, поскольку переплата равна нулю.',
        'Если важно удерживать низкий ежемесячный платёж или сумма велика — подойдёт ипотека. Для молодых семей действуют программы господдержки, заметно снижающие ставку.',
        'С помощью калькулятора на нашем сайте вы можете сравнить оба варианта за несколько секунд.',
      ],
    },
  },
  {
    slug: 'izmir-fasad-yakuni',
    category: 'news',
    date: '2026-07-08',
    readMinutes: 2,
    cover: '/img/blog/post-4.jpg',
    title: {
      uz: 'IZMIR: fasad ishlari to‘liq yakunlandi',
      ru: 'IZMIR: фасадные работы полностью завершены',
    },
    excerpt: {
      uz: "IZMIR majmuasining to'rtala blokida fasad va terassa ishlari tugatildi, hovli obodonlashtirish boshlandi.",
      ru: 'На всех четырёх блоках IZMIR завершены фасадные и террасные работы, начато благоустройство двора.',
    },
    body: {
      uz: [
        "IZMIR premium majmuasining to'rtala blokida ham fasad tizimi va terassalar to'liq tayyor bo'ldi. Loyiha jadval bo'yicha ketmoqda.",
        '## Hozir nima qilinmoqda',
        "Hovlida obodonlashtirish ishlari boshlandi: yashil zona, fontan maydonchasi va bolalar maydonchasi shakllantirilmoqda. Parallel ravishda muhandislik tarmoqlari tortilmoqda.",
        "Penthouslar terassalari uchun maxsus gidroizolyatsiya qatlami qo'yildi — bu bosqich alohida nazorat ostida bajarildi.",
        "Sotuvda hozircha bir necha xonadon va ikkita penthouse qolgan. Aktual ro'yxat uchun menejerlarimizga murojaat qiling.",
      ],
      ru: [
        'На всех четырёх блоках премиального комплекса IZMIR полностью готовы фасадная система и террасы. Проект идёт по графику.',
        '## Что делается сейчас',
        'Во дворе начаты работы по благоустройству: формируются зелёная зона, площадка с фонтаном и детская площадка. Параллельно прокладываются инженерные сети.',
        'Для террас пентхаусов уложен специальный гидроизоляционный слой — этот этап выполнялся под отдельным контролем.',
        'В продаже осталось несколько квартир и два пентхауса. Актуальный список уточняйте у наших менеджеров.',
      ],
    },
  },
  {
    slug: 'hujjatlar-royxati',
    category: 'guide',
    date: '2026-06-14',
    readMinutes: 4,
    cover: '/img/blog/post-5.jpg',
    title: {
      uz: 'Xonadon sotib olishda kerak bo‘ladigan hujjatlar ro‘yxati',
      ru: 'Список документов, необходимых при покупке квартиры',
    },
    excerpt: {
      uz: "Shartnomadan kadastrgacha — qaysi hujjatlar kerak va ularni qanday tartibda rasmiylashtirish lozim.",
      ru: 'От договора до кадастра — какие документы нужны и в каком порядке их оформлять.',
    },
    body: {
      uz: [
        "Yangi qurilgan uydan xonadon sotib olish jarayoni bir necha hujjatli bosqichdan iborat. Ularni oldindan bilish vaqtni tejaydi.",
        '## Xaridordan talab qilinadigan hujjatlar',
        "Pasport yoki ID-karta nusxasi; STIR (INN); ipoteka rasmiylashtirilayotgan bo'lsa — daromad haqida ma'lumotnoma va bank talab qiladigan qo'shimcha hujjatlar.",
        "Nikohda bo'lgan xaridorlar uchun ba'zi hollarda turmush o'rtoqning roziligi talab qilinadi.",
        '## Devoloper taqdim etadigan hujjatlar',
        "Qurilish litsenziyasi, ob'ekt bo'yicha qurilish ruxsatnomasi, yer uchastkasi hujjatlari, loyiha deklaratsiyasi va shartnoma namunasi.",
        '## Rasmiylashtirish tartibi',
        "Avval bron shartnomasi tuziladi va boshlang'ich to'lov amalga oshiriladi. So'ngra asosiy oldi-sotdi shartnomasi notarial tasdiqlanadi. Uy topshirilgach, qabul-topshirish dalolatnomasi imzolanadi va kadastr hujjati rasmiylashtiriladi.",
        "Global Avenue mijozlariga barcha bosqichlarda hujjatlar bo'yicha yordam beradi — bu xizmat qo'shimcha to'lovsiz.",
      ],
      ru: [
        'Процесс покупки квартиры в новостройке состоит из нескольких документальных этапов. Знание их заранее экономит время.',
        '## Документы от покупателя',
        'Копия паспорта или ID-карты; ИНН; при оформлении ипотеки — справка о доходах и дополнительные документы по требованию банка.',
        'Для состоящих в браке покупателей в ряде случаев требуется согласие супруга или супруги.',
        '## Документы от застройщика',
        'Строительная лицензия, разрешение на строительство по объекту, документы на земельный участок, проектная декларация и образец договора.',
        '## Порядок оформления',
        'Сначала заключается договор бронирования и вносится первый взнос. Затем основной договор купли-продажи заверяется нотариально. После сдачи дома подписывается акт приёма-передачи и оформляется кадастровый документ.',
        'Global Avenue сопровождает клиентов по документам на всех этапах — эта услуга без дополнительной оплаты.',
      ],
    },
  },
  {
    slug: 'sirsiz-qurilish',
    category: 'news',
    date: '2026-05-30',
    readMinutes: 3,
    cover: '/img/blog/post-6.jpg',
    title: {
      uz: '«Sirsiz qurilish»: nega biz hamma narsani ko‘rsatamiz',
      ru: '«Стройка без секретов»: почему мы показываем всё',
    },
    excerpt: {
      uz: "Ochiq hisobot formati qanday paydo bo'ldi va u mijozlar bilan munosabatimizni qanday o'zgartirdi.",
      ru: 'Как появился формат открытой отчётности и как он изменил наши отношения с клиентами.',
    },
    body: {
      uz: [
        "Uch yil oldin biz oddiy qaror qabul qildik: qurilish jarayonini to'liq ochiq ko'rsatish. Har hafta ob'ektdan foto va video — tayyor bo'lgan qismini ham, muammoli joyini ham.",
        '## Nima uchun',
        "Ko'chmas mulk bozorida asosiy qo'rquv — pul to'lab, natijani ko'rmaslik. Ochiq hisobot bu qo'rquvni yo'q qiladi: mijoz o'z xonadoni qanday holatda ekanini istalgan vaqtda ko'radi.",
        '## Natija',
        "Instagram sahifamiz obunachilar soni 60 mingdan oshdi, lekin bundan muhimi — mijozlarning takroriy murojaatlari va tavsiyalari sezilarli ko'paydi.",
        "Endi bu format saytimizda ham davom etadi: \"Qurilish jarayoni\" bo'limida barcha loyihalar bo'yicha hisobotlar lenta ko'rinishida joylashtiriladi.",
      ],
      ru: [
        'Три года назад мы приняли простое решение: показывать процесс строительства полностью открыто. Каждую неделю фото и видео с объекта — и готовые участки, и проблемные места.',
        '## Зачем',
        'Главный страх на рынке недвижимости — заплатить и не увидеть результата. Открытая отчётность снимает этот страх: клиент в любой момент видит, в каком состоянии его квартира.',
        '## Результат',
        'Число подписчиков нашей страницы в Instagram превысило 60 тысяч, но важнее другое — заметно выросли повторные обращения и рекомендации клиентов.',
        'Теперь этот формат продолжается и на сайте: в разделе «Ход строительства» отчёты по всем проектам публикуются в виде ленты.',
      ],
    },
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

/* ─────────────────────────── Qurilish jarayoni ─────────────────────────── */

export interface ProgressUpdate {
  id: string;
  projectSlug: string;
  date: string;
  image: string;
  title: L;
  text: L;
  percent: number;
}

export const progressUpdates: ProgressUpdate[] = [
  {
    id: 'pr-1',
    projectSlug: 'twinera',
    date: '2026-08-25',
    image: '/img/progress/p1.jpg',
    percent: 62,
    title: { uz: 'Fasad tizimi montaji boshlandi', ru: 'Начат монтаж фасадной системы' },
    text: {
      uz: "A-blokning janubiy tomonida ventilyatsiyalanuvchi fasad panellari o'rnatilmoqda. Oyna paketlari yetkazib berildi.",
      ru: 'На южной стороне блока A монтируются панели вентфасада. Стеклопакеты доставлены на объект.',
    },
  },
  {
    id: 'pr-2',
    projectSlug: 'twinera',
    date: '2026-08-11',
    image: '/img/progress/p2.jpg',
    percent: 58,
    title: { uz: '16-qavat quyildi', ru: 'Залит 16-й этаж' },
    text: {
      uz: "Ikkala minorada ham oxirgi qavat betoni quyildi. Karkas bosqichi yakunlandi.",
      ru: 'На обеих башнях залит бетон последнего этажа. Каркасный этап завершён.',
    },
  },
  {
    id: 'pr-3',
    projectSlug: 'izmir',
    date: '2026-08-20',
    image: '/img/progress/p3.jpg',
    percent: 78,
    title: { uz: 'Hovli obodonlashtirish', ru: 'Благоустройство двора' },
    text: {
      uz: "Yashil zona uchun tuproq tayyorlandi, fontan maydonchasi asosi quyildi. Piyoda yo'laklar yotqizilmoqda.",
      ru: 'Подготовлен грунт под зелёную зону, залито основание площадки с фонтаном. Укладываются пешеходные дорожки.',
    },
  },
  {
    id: 'pr-4',
    projectSlug: 'izmir',
    date: '2026-07-06',
    image: '/img/progress/p4.jpg',
    percent: 71,
    title: { uz: 'Fasad ishlari yakunlandi', ru: 'Завершены фасадные работы' },
    text: {
      uz: "To'rtala blokda dekorativ shtukatur va terassa panjaralarining o'rnatilishi tugatildi.",
      ru: 'На всех четырёх блоках завершены декоративная штукатурка и установка террасных ограждений.',
    },
  },
  {
    id: 'pr-5',
    projectSlug: 'marocco',
    date: '2026-08-22',
    image: '/img/progress/p5.jpg',
    percent: 84,
    title: { uz: 'Ichki pardozlash bosqichi', ru: 'Этап внутренней отделки' },
    text: {
      uz: "1–6 qavatlarda devor shtukaturasi tugadi, elektr va suv tarmoqlari sinovdan o'tkazilmoqda.",
      ru: 'На 1–6 этажах завершена штукатурка стен, электрические и водопроводные сети проходят испытания.',
    },
  },
  {
    id: 'pr-6',
    projectSlug: 'marocco',
    date: '2026-07-14',
    image: '/img/progress/p6.jpg',
    percent: 79,
    title: { uz: 'Muhandislik tarmoqlari ulandi', ru: 'Подключены инженерные сети' },
    text: {
      uz: "Majmua shahar suv ta'minoti va kanalizatsiya tizimiga rasmiy ravishda ulandi.",
      ru: 'Комплекс официально подключён к городским сетям водоснабжения и канализации.',
    },
  },
  {
    id: 'pr-7',
    projectSlug: 'ashgabad',
    date: '2026-08-15',
    image: '/img/progress/p7.jpg',
    percent: 88,
    title: { uz: 'Pardozlash yakuniga yaqin', ru: 'Отделка близка к завершению' },
    text: {
      uz: "Xonadonlarda oq quti holatiga keltirish ishlari 88% bajarildi. Kirish guruhlari bezatilmoqda.",
      ru: 'Работы по доведению квартир до состояния «белой коробки» выполнены на 88%. Оформляются входные группы.',
    },
  },
  {
    id: 'pr-8',
    projectSlug: 'nrg-qorasuv',
    date: '2026-08-01',
    image: '/img/progress/p8.jpg',
    percent: 8,
    title: { uz: 'Hudud tayyorlanmoqda', ru: 'Идёт подготовка территории' },
    text: {
      uz: "Geodezik o'lchovlar o'tkazildi, hudud tozalandi. Ruxsatnoma hujjatlari rasmiylashtirilmoqda.",
      ru: 'Проведены геодезические измерения, территория расчищена. Оформляются разрешительные документы.',
    },
  },
];

/* ─────────────────────────── Mijozlar fikri ─────────────────────────── */

export interface Review {
  id: string;
  name: string;
  role: L;
  project: string;
  rating: number;
  text: L;
  hasVideo: boolean;
}

export const reviews: Review[] = [
  {
    id: 'rv-1',
    name: 'Sardor va Nilufar',
    role: { uz: 'IZMIR, 3 xonali', ru: 'IZMIR, 3-комнатная' },
    project: 'IZMIR',
    rating: 5,
    hasVideo: true,
    text: {
      uz: "Uch yil davomida uy izladik. Global Avenue'da bizni eng ko'p ishontirgan narsa — qurilishni istalgan payt borib ko'rish mumkinligi. Menejer har bir savolimizga sabr bilan javob berdi, shartnomada hech qanday yashirin band yo'q edi.",
      ru: 'Мы искали жильё три года. Больше всего в Global Avenue нас убедило то, что стройку можно посмотреть в любой момент. Менеджер терпеливо ответил на каждый вопрос, в договоре не было скрытых пунктов.',
    },
  },
  {
    id: 'rv-2',
    name: 'Jahongir A.',
    role: { uz: 'Marocco, 2 xonali', ru: 'Marocco, 2-комнатная' },
    project: 'Marocco',
    rating: 5,
    hasVideo: false,
    text: {
      uz: "Rossiyada ishlayman, uyni masofadan sotib oldim. Video orqali xonadonni ko'rsatishdi, hujjatlarni pochta orqali rasmiylashtirdik. Otpuskaga kelganimda hammasi aytilganidek bo'lib chiqdi.",
      ru: 'Работаю в России, покупал квартиру дистанционно. Показали её по видео, документы оформили по почте. Когда приехал в отпуск, всё оказалось именно так, как обещали.',
    },
  },
  {
    id: 'rv-3',
    name: 'Dilnoza X.',
    role: { uz: 'Ashgabad, 1 xonali', ru: 'Ashgabad, 1-комнатная' },
    project: 'Ashgabad',
    rating: 5,
    hasVideo: true,
    text: {
      uz: "Birinchi uyim. Muddatli to'lov shartlari juda qulay bo'ldi — 30% to'lab, qolganini uch yilga bo'lib to'ladim, foizsiz. Har oy to'lov miqdori o'zgarmadi.",
      ru: 'Моя первая квартира. Условия рассрочки оказались очень удобными — внесла 30%, остальное выплачивала три года без процентов. Сумма платежа не менялась.',
    },
  },
  {
    id: 'rv-4',
    name: 'Bekzod R.',
    role: { uz: 'IZMIR, penthouse', ru: 'IZMIR, пентхаус' },
    project: 'IZMIR',
    rating: 5,
    hasVideo: false,
    text: {
      uz: "Terassali xonadon izlardim, Samarqandda bunday variant kam. IZMIR'da topdim. Qurilish sifati va materiallar kutganimdan ham yaxshi chiqdi.",
      ru: 'Искал квартиру с террасой — в Самарканде таких вариантов немного. Нашёл в IZMIR. Качество строительства и материалы оказались даже лучше, чем я ожидал.',
    },
  },
  {
    id: 'rv-5',
    name: 'Umida va Aziz',
    role: { uz: 'Marocco, 3 xonali', ru: 'Marocco, 3-комнатная' },
    project: 'Marocco',
    rating: 4,
    hasVideo: false,
    text: {
      uz: "Umuman olganda mamnunmiz. Uy o'z vaqtida topshirildi, hovli va bolalar maydonchasi juda yaxshi. Faqat avtoturargoh o'rinlari ko'proq bo'lishini istardik.",
      ru: 'В целом мы довольны. Дом сдали вовремя, двор и детская площадка очень хорошие. Хотелось бы только больше парковочных мест.',
    },
  },
  {
    id: 'rv-6',
    name: 'Shohrux T.',
    role: { uz: 'TwinEra, 2 xonali', ru: 'TwinEra, 2-комнатная' },
    project: 'TwinEra',
    rating: 5,
    hasVideo: true,
    text: {
      uz: "Investitsiya uchun oldim. Har hafta Instagram'da hisobot chiqadi — pulim qayerga ketayotganini ko'rib turaman. Bu bozorda kamdan-kam uchraydigan yondashuv.",
      ru: 'Покупал для инвестиций. Каждую неделю в Instagram выходит отчёт — я вижу, куда идут мои деньги. На этом рынке такой подход встречается редко.',
    },
  },
];

export const averageRating =
  Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10;

/* ─────────────────────────── Jamoa ─────────────────────────── */

export interface TeamMember {
  name: string;
  role: L;
  initials: string;
}

export const team: TeamMember[] = [
  { name: 'Otabek Nazarov', role: { uz: 'Bosh direktor', ru: 'Генеральный директор' }, initials: 'ON' },
  { name: 'Kamola Ergasheva', role: { uz: 'Sotuv bo’limi boshlig’i', ru: 'Руководитель отдела продаж' }, initials: 'KE' },
  { name: 'Rustam Yo’ldoshev', role: { uz: 'Bosh muhandis', ru: 'Главный инженер' }, initials: 'RY' },
  { name: 'Nodira Qosimova', role: { uz: 'Bosh arxitektor', ru: 'Главный архитектор' }, initials: 'NQ' },
  { name: 'Alisher Toirov', role: { uz: 'Qurilish nazorati', ru: 'Технический надзор' }, initials: 'AT' },
  { name: 'Malika Sobirova', role: { uz: 'Mijozlar bilan ishlash', ru: 'Работа с клиентами' }, initials: 'MS' },
];

/* ─────────────────────────── Vakansiyalar ─────────────────────────── */

export interface Vacancy {
  id: string;
  title: L;
  location: L;
  type: L;
  requirements: L[];
}

export const vacancies: Vacancy[] = [
  {
    id: 'v-1',
    title: { uz: 'Sotuv menejeri', ru: 'Менеджер по продажам' },
    location: { uz: 'Samarqand, sotuv ofisi', ru: 'Самарканд, офис продаж' },
    type: { uz: "To'liq stavka", ru: 'Полная занятость' },
    requirements: [
      { uz: "Sotuvda 1 yildan ortiq tajriba", ru: 'Опыт в продажах от 1 года' },
      { uz: "O'zbek va rus tillarini bilish", ru: 'Знание узбекского и русского языков' },
      { uz: "CRM tizimlari bilan ishlash ko'nikmasi", ru: 'Навык работы с CRM-системами' },
    ],
  },
  {
    id: 'v-2',
    title: { uz: 'Qurilish muhandisi (PTO)', ru: 'Инженер ПТО' },
    location: { uz: "Samarqand, ob'ektlar", ru: 'Самарканд, объекты' },
    type: { uz: "To'liq stavka", ru: 'Полная занятость' },
    requirements: [
      { uz: 'Oliy texnik ma’lumot', ru: 'Высшее техническое образование' },
      { uz: 'AutoCAD, smeta dasturlari', ru: 'AutoCAD, сметные программы' },
      { uz: "Ko'p qavatli qurilishda 2+ yil tajriba", ru: 'Опыт в многоэтажном строительстве от 2 лет' },
    ],
  },
  {
    id: 'v-3',
    title: { uz: 'SMM va kontent menejeri', ru: 'SMM и контент-менеджер' },
    location: { uz: 'Samarqand, ofis', ru: 'Самарканд, офис' },
    type: { uz: "To'liq stavka", ru: 'Полная занятость' },
    requirements: [
      { uz: 'Instagram va Telegram bilan ishlash tajribasi', ru: 'Опыт работы с Instagram и Telegram' },
      { uz: 'Video montaj asoslari', ru: 'Основы видеомонтажа' },
      { uz: 'Ikki tilda matn yozish', ru: 'Написание текстов на двух языках' },
    ],
  },
];
