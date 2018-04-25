export const clientTypes = [
    {
        value: 1,
        label: 'Агент'
    }, {
        value: 2,
        label: 'Собственник'
    }
];

export const clientStatuses = [
    {
        value: 1,
        label: 'В поиске'
    }, {
        value: 2,
        label: 'Не активен' // когда сделка завершена
    }, {
        value: 3,
        label: 'Думает'
    }, {
        value: 4,
        label: 'Оплата'
    }, {
        value: 5,
        label: 'Не назначен' // когда он просто висит в базе
    }
];

// export const realtyTypes = [
//     {
//         value: 1,
//         label: 'Аренда'
//     }, {
//         value: 2,
//         label: 'Продажа'
//     }
// ];

export const realtyStatuses = [
    {
        value: 1,
        label: 'Свободен'
    }, {
        value: 2,
        label: 'Показы'
    }, {
        value: 3,
        label: 'Занят'
    }, {
        value: 4,
        label: 'Продан'
    }
];