import { call, put, select, takeLatest } from 'redux-saga/effects'

import Api from '../api'
import { errorHandler } from '../utils/errorHandler'
import { pushMessage } from '../reducers/message'
import { actionCreator, constants } from '../reducers/widgetAppointment'
import { constants as appointmentConstants } from '../reducers/appointment'

// Sagas
export default function* watchFetch() {
    yield takeLatest([
        constants.fetchList,
        constants.createSuccess,
        constants.updateSuccess,
        constants.removeSuccess,
        appointmentConstants.createSuccess,
        appointmentConstants.updateSuccess,
        appointmentConstants.removeSuccess,
    ], fetchListAsync);
}

const PATH = 'appointment'
const STATE_PLACE = 'widgetAppointment'

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