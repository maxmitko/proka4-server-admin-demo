import { immerReducer } from "../utils/reducers";
import CrudFactory from '../utils/crudReducer'

export const { handlers, constants, initialState, actionCreator } = new CrudFactory({ prefix: 'orders_book' })

// REDUCER
export default immerReducer(initialState, handlers)

// Page Actions
