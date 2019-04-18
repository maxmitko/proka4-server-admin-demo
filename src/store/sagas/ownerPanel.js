import { call, put, takeLatest } from 'redux-saga/effects'

import Api from '../api'
import { errorHandler } from '../utils/errorHandler'
import { pushMessage } from '../reducers/message'
import { actionCreator, constants } from '../reducers/ownerPanel'

// Sagas
export default function* watchFetch() {
    yield takeLatest([constants.fetchList], fetchListAsync);
}

const PATH = 'user/profile'

// Worker Saga

function* fetchListAsync() {
    try {
        yield put(actionCreator.fetchListRequest())

        const res = yield call(Api.findAll, PATH);

        if (res.status >= 400) throw yield res.json()

        const data = yield res.json()

        yield put(actionCreator.fetchListSuccess([data, 1]));

    } catch (error) {
        yield put(actionCreator.fetchListError())
        yield put(pushMessage(errorHandler(error)))
    }
}
