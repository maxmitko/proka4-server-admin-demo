import { call, put, takeLatest, select } from 'redux-saga/effects'

import Api from '../api'
import { constants, actionCreator } from '../reducers/ticket'
import { pushMessage } from '../reducers/message'
import { withMessage, errorHandler } from '../utils/errorHandler'

// Sagas
export default function* watchFetch() {
    yield takeLatest([
        constants.fetchList,
        constants.createSuccess,
        constants.updateSuccess,
        constants.removeSuccess,
    ], fetchListAsync);
    yield takeLatest([constants.create], createItemAsync);
    yield takeLatest([constants.read], readItemAsync);
    yield takeLatest([constants.update], updateItemAsync);
    yield takeLatest([constants.remove], removeItemAsync);
}

const PATH = 'ticket'

// Worker Saga
function* fetchListAsync() {
    try {
        yield put(actionCreator.fetchListRequest())

        const state = yield select();
        const res = yield call(Api.find, PATH, state[PATH].options);

        if (res.status >= 400) throw yield res.json()

        const list = yield res.json()
        yield put(actionCreator.fetchListSuccess(list));

    } catch (error) {
        yield put(actionCreator.fetchListError())
        yield put(pushMessage(errorHandler(error)))
    }
}

function* createItemAsync() {
    try {

        yield put(actionCreator.createRequest())

        const state = yield select();
        const res = yield call(Api.create, PATH, state[PATH].crud.data);

        if (res.status >= 400) throw yield res.json()

        yield put(actionCreator.createSuccess())

    } catch (error) {
        yield put(actionCreator.createError())
        yield put(pushMessage(errorHandler(error)))
    }
}

function* readItemAsync() {
    try {
        yield put(actionCreator.readRequest())

        const state = yield select();
        const res = yield call(Api.findOne, PATH, state[PATH].crud.requestedId);

        if (res.status >= 400) throw yield res.json()

        const data = yield res.json()
        yield put(actionCreator.readSuccess(data))

    } catch (error) {
        yield put(actionCreator.readError())
        yield put(pushMessage(errorHandler(error)))
    }
}

function* updateItemAsync() {
    try {
        yield put(actionCreator.updateRequest())

        const state = yield select();
        const res = yield call(Api.create, PATH, state[PATH].crud.data);

        if (res.status >= 400) throw yield res.json()

        yield put(actionCreator.updateSuccess())
        const message = withMessage.updateSuccess()
        yield put(pushMessage(message))

    } catch (error) {
        yield put(actionCreator.updateError())
        yield put(pushMessage(errorHandler(error)))
    }
}

function* removeItemAsync() {
    try {
        yield put(actionCreator.removeRequest())

        const state = yield select();
        const res = yield call(Api.remove, PATH, state[PATH].crud.requestedId);

        if (res.status >= 400) throw yield res.json()

        yield put(actionCreator.removeSuccess())

    } catch (error) {
        yield put(actionCreator.removeError())
        yield put(pushMessage(errorHandler(error)))
    }
}