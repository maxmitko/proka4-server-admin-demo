import { immerReducer } from "../utils/reducers";
import CrudFactory from '../utils/crudReducer'

export const { handlers, constants, initialState, actionCreator } = new CrudFactory({ prefix: 'widget_appointment' })


// REDUCER
export default immerReducer(initialState, handlers)

// Page Actions
