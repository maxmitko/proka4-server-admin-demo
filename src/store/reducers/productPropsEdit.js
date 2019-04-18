import CrudFactory from '../utils/crudReducer'
import { immerReducer } from "../utils/reducers";

export const { handlers, constants, initialState, actionCreator } = new CrudFactory({ prefix: 'product_props_edit'})

// REDUCER
export default immerReducer(initialState, handlers)

// Page Actions