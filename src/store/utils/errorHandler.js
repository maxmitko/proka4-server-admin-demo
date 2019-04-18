export const errorHandler = res => {
    switch (res.message) {
        case 'Ошибка валидации данных':
            let message = ''
            res.errors.map(item => message += Object.values(item.constraints).join(', '))
            return withMessage.validationFailed(message)
        default:
            console.log('error', res)
            return withMessage.requestFailed(res.message)
    }
}


export const withMessage = {
    updateSuccess: (message = '') => ({
        type: "success",
        text: "Операция выполнена успешно " + message,
        autoClose: 1500,
        hiddenButton: true,
    }),
    requestFailed: (message = '') => ({
        type: "danger",
        text: "Ошибка запроса к серверу: " + message,
    }),
    validationFailed: (message = '') => ({
        type: "warning",
        text: "Вы ввели неверный поля: " + message,
    })
}