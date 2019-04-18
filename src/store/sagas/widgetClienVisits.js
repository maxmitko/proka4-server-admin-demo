import { call, put, select, takeLatest } from 'redux-saga/effects'

import Api from '../api'
import { errorHandler } from '../utils/errorHandler'
import { pushMessage } from '../reducers/message'
import { actionCreator, constants } from '../reducers/widgetClientVisit'
import { constants as clientVisitConstants } from '../reducers/clientVisit'

// Sagas
export default function* watchFetch() {
    yield takeLatest([
        constants.fetchList,
        constants.createSuccess,
        constants.updateSuccess,
        constants.removeSuccess,
        clientVisitConstants.createSuccess,
        clientVisitConstants.updateSuccess,
        clientVisitConstants.removeSuccess,
    ], fetchListAsync);
}

const PATH = 'client-visit'
const STATE_PLACE = 'widgetClientVisit'

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