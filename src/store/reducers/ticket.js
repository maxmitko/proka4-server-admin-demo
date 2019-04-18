import produce from 'immer'

import Api from '../api'
import CrudFactory from '../utils/crudReducer'
import { errorHandler } from '../utils/errorHandler'
import { immerReducer } from "../utils/reducers";
import { pushMessage } from '../reducers/message'

export const { handlers, constants, initialState, actionCreator } = new CrudFactory({ prefix: 'ticket' })

handlers[constants.fetchListSuccess] = (draftState, { payload }) => {
    const [data, totalCount] = payload

    const selectFormat = data.map(item => ({ label: `${item.title} - ${item.count} по ${item.price}р`, value: item.id }))

    draftState.data = data
    draftState.selectFormat = selectFormat
    draftState.totalCount = totalCount
    draftState.loading = false
}

const produceInitialState = produce(initialState, draftState => {
    draftState.options.relations = ["service"]
})

export default immerReducer(produceInitialState, handlers)

// Page Actions

export const fetchTicketList = async options => {
    try {
        const res = await Api.find('ticket', options)
        if (res.status >= 400) throw await res.json()

        return res.json()

    } catch (error) {
        pushMessage(errorHandler(error))
    }
}