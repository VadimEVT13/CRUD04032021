import ruLocale             from 'date-fns/locale/ru';

const localization={
    body: {
        emptyDataSourceMessage: "Нет данных",
        addTooltip: 'Добавить',
        deleteTooltip: 'Удалить',
        editTooltip: 'Изменить',
        editRow: {
            deleteText: "Удалить сотрудника?",
            cancelTooltip: 'Отменить',
            saveTooltip: 'Сохранить'
        },
        dateTimePickerLocalization: ruLocale
    },
    pagination: {                        
        firstTooltip: 'Первая страница',
        previousTooltip: 'Предыдущая страница',
        nextTooltip: 'Следующая страница',
        labelDisplayedRows: '{from}-{to} из {count}',
        lastTooltip: 'Последняя страница',
        labelRowsSelect: 'строк'
    },
    header: {
        actions: 'Действия'
    },
    toolbar: {
        searchTooltip: 'Поиск',
        searchPlaceholder: 'Поиск'
    }
}

export { localization };