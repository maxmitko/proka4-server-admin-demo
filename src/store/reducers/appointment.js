import { immerReducer } from "../utils/reducers";
import CrudFactory from '../utils/crudReducer'
import produce from 'immer'

export const { handlers, constants, initialState, actionCreator } = new CrudFactory({ prefix: 'appointment' })

const produceInitialState = produce(initialState, draftState => {
    draftState.options.skip = 0
    draftState.options.take = 10
    draftState.options.order = { id: "DESC" }
})

// REDUCER
export default immerReducer(produceInitialState, handlers)

// Page Actions
