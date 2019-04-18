import produce from 'immer'
import Api from '../api'
import { pushMessage } from '../reducers/message'
import { errorHandler } from '../utils/errorHandler'

import CrudFactory from '../utils/crudReducer'
import { immerReducer } from "../utils/reducers";

export const { handlers, constants, initialState, actionCreator } = new CrudFactory({ prefix: 'product_category' })

const produceInitialState = produce(initialState, draftState => {
    draftState.options.take = 10
})

// REDUCER
export default immerReducer(produceInitialState, handlers)

// Page Actions

export const fetchCategoryList = async options => {
    try {
        const res = await Api.find('product-category', options)
        if (res.status >= 400) throw await res.json()

        return res.json()

    } catch (error) {
        pushMessage(errorHandler(error))
    }
}