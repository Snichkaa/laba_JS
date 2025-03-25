const plants = [
    {
        "name": "Ютан Полуо",
        "type": "Цветок",
        "distribution": "Китай",
        "lifespan": 34,
        "height": 2
    },
    {
        "name": "Белый лотос",
        "type": "Цветок",
        "distribution": "Индия",
        "lifespan": 50,
        "height": 1.5
    },
    {
        "name": "Сноудонская ястребинка",
        "type": "Цветок",
        "distribution": "Великобритания",
        "lifespan": 100,
        "height": 1
    },
    {
        "name": "Орхидея Шэньчжэнь-Нонгке",
        "type": "Цветок",
        "distribution": "Китай",
        "lifespan": 5,
        "height": 2
    },
    {
        "name": "Баррингтония азиатская",
        "type": "Дерево",
        "distribution": "Индонезия",
        "lifespan": 30,
        "height": 30
    },
    {
        "name": "Непентес Аттенборо",
        "type": "Растение-хищник",
        "distribution": "Филиппины",
        "lifespan": 100,
        "height": 1.5
    },
    {
        "name": "Раффлезия Арнольда",
        "type": "Цветок",
        "distribution": "Индонезия",
        "lifespan": 50,
        "height": 1
    },
    {
        "name": "Ночной цветущий эхиноцереус",
        "type": "Кактус",
        "distribution": "Мексика",
        "lifespan": 200,
        "height": 1
    },
    {
        "name": "Миддлемист красный",
        "type": "Цветок",
        "distribution": "Китай",
        "lifespan": 200,
        "height": 2
    },
    {
        "name": "Эустома",
        "type": "Цветок",
        "distribution": "Мексика",
        "lifespan": 1,
        "height": 1
    },
    {
        "name": "Орхидея Венерин башмачок",
        "type": "Цветок",
        "distribution": "США",
        "lifespan": 50,
        "height": 1
    },
    {
        "name": "Кокия Кука",
        "type": "Дерево",
        "distribution": "Гавайи",
        "lifespan": 50,
        "height": 10
    },
    {
        "name": "Кадупул",
        "type": "Цветок",
        "distribution": "Шри-Ланка",
        "lifespan": 6,
        "height": 3
    },
    {
        "name": "Стронгилодон крупнокистевой",
        "type": "Лиана",
        "distribution": "Филиппины",
        "lifespan": 100,
        "height": 30
    },
    {
        "name": "Гортензия",
        "type": "Кустарник",
        "distribution": "США",
        "lifespan": 100,
        "height": 3
    },
    {
        "name": "Лотус «Клюв золотого попугая»",
        "type": "Цветок",
        "distribution": "Австралия",
        "lifespan": 100,
        "height": 4
    },
    {
        "name": "Орхидея «Золото Кинабалу»",
        "type": "Цветок",
        "distribution": "Малайзия",
        "lifespan": 200,
        "height": 6
    },
    {
        "name": "Каикомако",
        "type": "Дерево",
        "distribution": "Новая Зеландия",
        "lifespan": 1000,
        "height": 25
    },
    {
        "name": "Камедь обыкновенная",
        "type": "Дерево",
        "distribution": "Австралия",
        "lifespan": 500,
        "height": 30
    },
    {
        "name": "Сосна Цяоцзя",
        "type": "Дерево",
        "distribution": "Китай",
        "lifespan": 1000,
        "height": 45
    },
    {
        "name": "Баобаб Перье",
        "type": "Дерево",
        "distribution": "Мадагаскар",
        "lifespan": 1000,
        "height": 30
    },
    {
        "name": "Кедр Кланвильяма",
        "type": "Дерево",
        "distribution": "Ливан",
        "lifespan": 1000,
        "height": 40
    },
    {
        "name": "Притчардия из хребта Ваианаэ",
        "type": "Пальма",
        "distribution": "Гавайи",
        "lifespan": 100,
        "height": 15
    },
    {
        "name": "Ала'Алахуа/Махо",
        "type": "Дерево",
        "distribution": "Гавайи",
        "lifespan": 100,
        "height": 20
    },
    {
        "name": "Флоридский тис",
        "type": "Дерево",
        "distribution": "США",
        "lifespan": 1000,
        "height": 20
    },
    {
        "name": "Флоридская торрея",
        "type": "Дерево",
        "distribution": "США",
        "lifespan": 1000,
        "height": 20
    },
    {
        "name": "Гондурасский палисандр",
        "type": "Дерево",
        "distribution": "Гондурас",
        "lifespan": 200,
        "height": 30
    },
    {
        "name": "Драцена окаймлённая",
        "type": "Дерево",
        "distribution": "Кения",
        "lifespan": 100,
        "height": 15
    },
    {
        "name": "Головоломка «Обезьянка»",
        "type": "Кустарник",
        "distribution": "Китай",
        "lifespan": 50,
        "height": 2
    },
    {
        "name": "Африканское черное дерево",
        "type": "Дерево",
        "distribution": "Кения",
        "lifespan": 1000,
        "height": 30
    },
    {
        "name": "Кленолистный дуб",
        "type": "Дерево",
        "distribution": "Франция",
        "lifespan": 500,
        "height": 30
    },
    {
        "name": "Секвойя вечнозелёная",
        "type": "Дерево",
        "distribution": "США",
        "lifespan": 2000,
        "height": 115
    },
    {
        "name": "Гигантская секвойя",
        "type": "Дерево",
        "distribution": "США",
        "lifespan": 3000,
        "height": 95
    },
    {
        "name": "Сосна длиннолистная",
        "type": "Дерево",
        "distribution": "США",
        "lifespan": 1000,
        "height": 80
    },
    {
        "name": "Пихта Фрейзера",
        "type": "Дерево",
        "distribution": "США",
        "lifespan": 150,
        "height": 25
    },
    {
        "name": "Аморфа кустарниковая",
        "type": "Кустарник",
        "distribution": "Канада",
        "lifespan": 100,
        "height": 3
    },
    {
        "name": "Земляничное дерево",
        "type": "Дерево",
        "distribution": "Испания",
        "lifespan": 200,
        "height": 10
    },
    {
        "name": "Буссенгольция сердцелистная",
        "type": "Кустарник",
        "distribution": "Италия",
        "lifespan": 200,
        "height": 5
    },
    {
        "name": "Синейлезис",
        "type": "Многолетнее травянистое растение",
        "distribution": "Канада",
        "lifespan": 5,
        "height": 2
    },
    {
        "name": "Красивоплодник Бодинье",
        "type": "Кустарник",
        "distribution": "Китай",
        "lifespan": 100,
        "height": 3
    },
    {
        "name": "Кампсис Фламенко",
        "type": "Лиана",
        "distribution": "США",
        "lifespan": 50,
        "height": 10
    },
    {
        "name": "Кампсис Радиканс",
        "type": "Лиана",
        "distribution": "Канада",
        "lifespan": 50,
        "height": 10
    },
    {
        "name": "Каштан съедобный",
        "type": "Дерево",
        "distribution": "Канада",
        "lifespan": 200,
        "height": 30
    },
    {
        "name": "Цефалантус западный",
        "type": "Дерево",
        "distribution": "США",
        "lifespan": 100,
        "height": 12
    },
    {
        "name": "Кладрастис желтый",
        "type": "Дерево",
        "distribution": "США",
        "lifespan": 200,
        "height": 20
    },
    {
        "name": "Лох узколистный",
        "type": "Дерево",
        "distribution": "Казахстан",
        "lifespan": 100,
        "height": 10
    },
    {
        "name": "Экзохорда Королькова",
        "type": "Кустарник",
        "distribution": "Казахстан",
        "lifespan": 50,
        "height": 3
    },
    {
        "name": "Фотергилла",
        "type": "Кустарник",
        "distribution": "США",
        "lifespan": 100,
        "height": 2
    },
    {
        "name": "Гимнокладус двудомный",
        "type": "Дерево",
        "distribution": "Канада",
        "lifespan": 200,
        "height": 30
    },
    {
        "name": "Керия японская Пленифлора",
        "type": "Кустарник",
        "distribution": "Япония",
        "lifespan": 50,
        "height": 2
    }
];