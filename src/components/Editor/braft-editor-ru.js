export const languageFn = (languages, context) => {
    if (context === 'braft-editor') return braftEditorRu
    if (context === 'braft-finder') return braftFinderRu

    return languages.en
}

export const braftEditorRu = {
    base: {
        remove: 'Удалить',
        cancel: 'Отменить',
        confirm: 'Ок',
        inert: 'Вставить',
        width: 'Ширина',
        height: 'Высота'
    },
    controls: {
        clear: 'Удалить всё',
        undo: 'Назад',
        redo: 'Вперед',
        fontSize: 'Размер шрифта',
        color: 'Цвет',
        textColor: 'Текст',
        tempColors: 'Temp Colors',
        backgroundColor: 'Фон',
        bold: 'Жирный',
        lineHeight: 'Между строками',
        letterSpacing: 'Между буквами',
        textIndent: 'Отступ текста',
        increaseIndent: 'Отступ +',
        decreaseIndent: 'Отступ -',
        italic: 'Наклонный',
        underline: 'Подчеркнуть',
        strikeThrough: 'Зачеркнуть',
        fontFamily: 'Шрифт',
        textAlign: 'Выравнивание текста',
        alignLeft: 'Текст в лево',
        alignCenter: 'Текст в центр',
        alignRight: 'Текст в право',
        alignJustify: 'Текст по ширине',
        floatLeft: 'В лево',
        floatRight: 'В право',
        superScript: 'Степень',
        subScript: 'Основание',
        removeStyles: 'Очистить стиль',
        headings: 'Заголовки',
        header: 'Шапка',
        normal: 'Нормальный',
        orderedList: 'Нумерованый список',
        unorderedList: 'Список',
        blockQuote: 'Цитата',
        code: 'Code',
        link: 'Ссылка',
        unlink: 'Удалить ссылку',
        hr: 'Добавить разделитель',
        media: 'Медиа',
        mediaLibirary: 'Медиа библиотека',
        emoji: 'Смайлы',
        fullscreen: 'Во весь экран',
        exitFullscreen: 'Обычный режим',

    },
    linkEditor: {
        inputPlaceHolder: 'Введите ссылку',
        inputWithEnterPlaceHolder: 'Введите ссылку',
        openInNewWindow: 'Открыть в новом окне',
        removeLink: 'Удалить ссылку'
    },
    audioPlayer: {
        title: 'Запустить аудио'
    },
    videoPlayer: {
        title: 'Запустить видео',
        embedTitle: 'Встроенное медиа'
    },
    media: {
        image: 'Картика',
        video: 'Видео',
        audio: 'Аудио',
        embed: 'Встроенное'
    }
}

export const braftFinderRu = {
    remove: 'Удалить',
    cancel: 'Отмена',
    confirm: 'Ок',
    insert: 'Ок',
    width: 'Ширина',
    height: 'Высота',
    image: 'Картинка',
    video: 'Видео',
    audio: 'Аудио',
    embed: 'Внедрить',
    caption: 'Медеиа библиотека',
    dragTip: 'Кликните или перетащите рисунок',
    dropTip: 'Перетащите для загрузки',
    selectAll: 'Выбрать всё',
    deselect: 'Отменить выделение',
    removeSelected: 'Удалить выделенное',
    externalInputPlaceHolder: 'Источник URL',
    externalInputTip: 'Совместить название и URL через "|", и нажмите Enter.',
    addLocalFile: 'Добавть локальный',
    addExternalSource: 'Добавить ссылку',
    unnamedItem: 'Без названия',
    confirmInsert: 'Вставить выделенное'
}