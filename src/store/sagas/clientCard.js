import { call, put, takeLatest, select } from 'redux-saga/effects'

import Api from '../api'
import {
    constants,
    actionCreator,
    CLIENT_CARD_TOGGLE_REMAINDER_FILTER,
} from '../reducers/clientCard'
import {
    CLIENT_REGISTRATION_SELECT_SERVICE,
    CLIENT_REGISTRATION_TOGGLE_EXPIRED_FILTER,
} from '../reducers/clientRegistration'
import { pushMessage } from '../reducers/message'
import { withMessage, errorHandler } from '../utils/errorHandler'
import { constants as constantsClientVisit } from '../reducers/clientVisit'

// Sagas
export default function* watchFetch() {
    yield takeLatest([
        constants.fetchList,
        constants.createSuccess,
        constants.updateSuccess,
        constants.removeSuccess,
        constantsClientVisit.updateSuccess,
        CLIENT_REGISTRATION_SELECT_SERVICE,
        CLIENT_REGISTRATION_TOGGLE_EXPIRED_FILTER,
        CLIENT_CARD_TOGGLE_REMAINDER_FILTER,
    ], fetchListAsync);
    yield takeLatest([constants.create], createItemAsync);
    yield takeLatest([constants.read], readItemAsync);
    yield takeLatest([constants.update], updateItemAsync);
    yield takeLatest([constants.remove], removeItemAsync);
}

const PATH = 'client-card'
const STATE_PLACE = 'clientCard'

// Worker Saga
function* fetchListAsync() {
    try {
        yield put(actionCreator.fetchListRequest())

        const state = yield select();
        const { positiveRemainder } = state.clientCard.options

        const options = {
            ...state[STATE_PLACE].options,
            service: state.clientRegistration.serviceFilter,
            expiredDate: state.clientRegistration.expiredDate,
        }

        const res = yield call(Api.findCustom, PATH, options);

        if (res.status >= 400) throw yield res.json()

        let list = yield res.json()

        if (list[0].length && positiveRemainder) {
            list[0] = list[0].filter(item => {
                const remainderCount = item.visits.length ? item.visits.filter(visit => visit.visitStatus !== 0) : []
                return item.count > remainderCount.length
            })
        }

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