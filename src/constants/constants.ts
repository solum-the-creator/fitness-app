import ru_RU from 'antd/es/calendar/locale/ru_RU';

export const RU_CALENDAR_LOCALE = {
    ...ru_RU,

    lang: {
        ...ru_RU.lang,
        shortWeekDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        shortMonths: [
            'Янв',
            'Фев',
            'Мар',
            'Апр',
            'Май',
            'Июн',
            'Июл',
            'Авг',
            'Сен',
            'Окт',
            'Ноя',
            'Дек',
        ],
    },
};

export const DATE_FORMAT = 'DD.MM.YYYY';

export const DATE_FORMAT_FEEDBACK = 'dd.MM.yyyy';

export const STATUS_CODE = {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
};

export const BASE_IMAGE_URL = 'https://training-api.clevertec.ru';

type OptionPeriod = {
    label: string;
    value: number;
};

type OptionDayOfWeek = {
    label: string;
    value: number;
};

export const PERIOD_OPTIONS: OptionPeriod[] = [
    {
        label: 'Через 1 день',
        value: 1,
    },
    {
        label: 'Через 2 дня',
        value: 2,
    },
    {
        label: 'Через 3 дня',
        value: 3,
    },
    {
        label: 'Через 4 дня',
        value: 4,
    },
    {
        label: 'Через 5 дней',
        value: 5,
    },
    {
        label: 'Через 6 дней',
        value: 6,
    },
    {
        label: '1 раз в неделю',
        value: 7,
    },
];

export const DAY_OF_WEEK_OPTIONS: OptionDayOfWeek[] = [
    {
        label: 'Понедельник',
        value: 1,
    },
    {
        label: 'Вторник',
        value: 2,
    },
    {
        label: 'Среда',
        value: 3,
    },
    {
        label: 'Четверг',
        value: 4,
    },
    {
        label: 'Пятница',
        value: 5,
    },
    {
        label: 'Суббота',
        value: 6,
    },
    {
        label: 'Воскресенье',
        value: 7,
    },
];
