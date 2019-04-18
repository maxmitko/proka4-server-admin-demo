const HOST = process.env.REACT_APP_SERVER_URL
const CREDENTIALS = 'include'

export default {
    findAll: path => get(`${HOST}/${path}`),
    findOne: (path, id) => get(`${HOST}/${path}/${id}`),
    find: (path, options) => post(`${HOST}/${path}/find`, options),
    findCustom: (path, options) => post(`${HOST}/${path}/find.custom`, options),
    create: (path, data) => post(`${HOST}/${path}`, data),
    update: (path, data) => patch(`${HOST}/${path}`, data),
    remove: (path, id) => remove(`${HOST}/${path}/${id}`),
}

const get = route => {
    let headers = new Headers({
        'Accept': 'application/json'
    });
    
    return fetch(route, {
        method: 'GET',
        headers: headers,
        credentials: CREDENTIALS,
    })
}

const post = (route, data) => {
    let headers = new Headers({
        'Content-Type': 'application/json',
    });

    return fetch(route, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: headers,
        credentials: CREDENTIALS,
    })
};

const patch = (route, data) => {
    let headers = new Headers({
        'Content-Type': 'application/json',
    });

    return fetch(route, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: headers,
        credentials: CREDENTIALS,
    })
};

const remove = route => fetch(route, {
    method: 'DELETE',
    credentials: CREDENTIALS,
})

// const removeEmpty = (obj = {}) => {
//     Object.keys(obj).forEach(key => (obj[key] === "") && delete obj[key]);
//     return obj;
// }