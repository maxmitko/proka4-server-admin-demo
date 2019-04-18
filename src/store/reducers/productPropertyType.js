import Api from '../api'
import { pushMessage } from '../reducers/message'
import { errorHandler } from '../utils/errorHandler'

import CrudFactory from '../utils/crudReducer'
import { immerReducer } from "../utils/reducers";

export const { handlers, constants, initialState, actionCreator } = new CrudFactory({ prefix: 'product_property_type' })

// REDUCER
export default immerReducer(initialState, handlers)

// Page Actions

export const fetchPropertyTypeList = async options => {
    try {
        const res = await Api.find('product-property-type', options)
        if (res.status >= 400) throw await res.json()

        return res.json()

    } catch (error) {
        pushMessage(errorHandler(error))
    }
}