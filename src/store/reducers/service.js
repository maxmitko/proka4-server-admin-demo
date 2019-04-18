import { immerReducer } from "../utils/reducers";
import CrudFactory from '../utils/crudReducer'
import produce from 'immer'

export const { handlers, constants, initialState, actionCreator } = new CrudFactory({ prefix: 'service' })

export const SERVICE_TOGGLE_ACTIVE_REQUEST = 'SERVICE_TOGGLE_ACTIVE_REQUEST';
export const SERVICE_TOGGLE_ACTIVE_SUCCESS = 'SERVICE_TOGGLE_ACTIVE_SUCCESS';
export const SERVICE_TOGGLE_ACTIVE_FAILURE = 'SERVICE_TOGGLE_ACTIVE_FAILURE';

handlers[constants.fetchListSuccess] = (draftState, { payload }) => {
    const [data, totalCount] = payload

    const selectFormat = data.map(item => ({ label: item.title, value: item.id }))
    selectFormat.unshift({ label: "Все", value: 'all' })

    draftState.data = data
    draftState.selectFormat = selectFormat
    draftState.totalCount = totalCount
    draftState.loading = false
}

const extend = {
    [SERVICE_TOGGLE_ACTIVE_REQUEST]: (draftState, { payload }) => {
        draftState.crud.data = payload
        draftState.crud.loading = true
    },
    [SERVICE_TOGGLE_ACTIVE_SUCCESS]: (draftState, { payload }) => {
        draftState.crud.loading = false
        draftState.data = draftState.data.map(item => {
            return item.id === draftState.crud.data.id
                ? { ...item, isActive: draftState.crud.data.isActive }
                : item
        })
    },
    [SERVICE_TOGGLE_ACTIVE_FAILURE]: (draftState, { payload }) => {
        draftState.crud.error = true
        draftState.crud.loading = false
    },
}

const produceInitialState = produce(initialState, draftState => {
    draftState['selectFormat'] = []
    draftState.options = { ...draftState.options, order: { myOrder: "ASC" } }
})

// REDUCER
export default immerReducer(produceInitialState, { ...handlers, ...extend })

// Page Actions

export const toggleActive = data => ({
    type: SERVICE_TOGGLE_ACTIVE_REQUEST,
    payload: data
})
