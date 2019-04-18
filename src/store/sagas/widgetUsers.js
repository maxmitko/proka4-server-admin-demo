import { call, put, select, takeLatest } from 'redux-saga/effects'

import Api from '../api'
import { errorHandler } from '../utils/errorHandler'
import { pushMessage } from '../reducers/message'
import { actionCreator, constants } from '../reducers/widgetUsers'
import { constants as usersConstants } from '../reducers/users'

// Sagas
export default function* watchFetch() {
    yield takeLatest([
        constants.fetchList,
        constants.createSuccess,
        constants.updateSuccess,
        constants.removeSuccess,
        usersConstants.createSuccess,
        usersConstants.updateSuccess,
        usersConstants.removeSuccess,
    ], fetchListAsync);
}

const PATH = 'users'
const STATE_PLACE = 'widgetUsers'

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