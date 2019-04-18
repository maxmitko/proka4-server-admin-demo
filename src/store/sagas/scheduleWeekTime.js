import { call, put, select, takeLatest } from 'redux-saga/effects'

import Api from '../api'
import { pushMessage } from '../reducers/message'
import {
    constants,
    actionCreator,
    SCHEDULE_TIME_TOGGLE_ACTIVE_REQUEST,
    SCHEDULE_TIME_TOGGLE_ACTIVE_SUCCESS,
    SCHEDULE_TIME_TOGGLE_ACTIVE_FAILURE,
} from '../reducers/scheduleWeekTime'
import { errorHandler, withMessage } from '../utils/errorHandler'
import { constants as constantsScheduleWeek } from '../reducers/scheduleList'

// Sagas
export default function* watchFetch() {
    yield takeLatest([
        constants.fetchList,
        constants.createSuccess,
        constants.updateSuccess,
        constants.removeSuccess,
        constantsScheduleWeek.fetchList,
    ], fetchListAsync);
    yield takeLatest([constants.create], createItemAsync);
    yield takeLatest([constants.read], readItemAsync);
    yield takeLatest([constants.update], updateItemAsync);
    yield takeLatest([constants.remove], removeItemAsync);
    yield takeLatest([SCHEDULE_TIME_TOGGLE_ACTIVE_REQUEST], toggleItemAsync);
}

const PATH = 'schedule-week-time'
const STATE_PLACE = 'scheduleWeekTime'

// Worker Saga
function* fetchListAsync() {
    try {
        yield put(actionCreator.fetchListRequest())

        const state = yield select();
        const res = yield call(Api.find, PATH, state[STATE_PLACE].options);

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
        const res = yield call(Api.create, PATH, state[STATE_PLACE].crud.data);

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
        const res = yield call(Api.findOne, PATH, state[STATE_PLACE].crud.requestedId);

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
        const res = yield call(Api.create, PATH, state[STATE_PLACE].crud.data);

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
        const res = yield call(Api.remove, PATH, state[STATE_PLACE].crud.requestedId);

        if (res.status >= 400) throw yield res.json()

        yield put(actionCreator.removeSuccess())

    } catch (error) {
        yield put(actionCreator.removeError())
        yield put(pushMessage(errorHandler(error)))
    }
}

function* toggleItemAsync({ payload }) {
    try {

        const res = yield call(Api.update, PATH, payload);

        if (res.status >= 400) throw yield res.json()

        yield put({ type: SCHEDULE_TIME_TOGGLE_ACTIVE_SUCCESS })
        const message = withMessage.updateSuccess()
        yield put(pushMessage(message))

    } catch (error) {
        yield put({ type: SCHEDULE_TIME_TOGGLE_ACTIVE_FAILURE })
        yield put(pushMessage(errorHandler(error)))
    }
}