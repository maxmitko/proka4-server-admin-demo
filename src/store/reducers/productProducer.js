import { immerReducer } from "../utils/reducers";
import CrudFactory from '../utils/crudReducer'

export const { handlers, constants, initialState, actionCreator } = new CrudFactory({ prefix: 'product_producer' })


// REDUCER
export default immerReducer(initialState, handlers)

// Page Actions
