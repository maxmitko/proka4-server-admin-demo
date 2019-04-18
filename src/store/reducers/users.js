import { immerReducer } from "../utils/reducers";
import CrudFactory from "../utils/crudReducer"
import produce from 'immer'

export const { handlers, constants, initialState, actionCreator } = new CrudFactory({ prefix: 'users' })

const produceInitialState = produce(initialState, draftState => {
    draftState.options.take = 10
})

export default immerReducer(produceInitialState, handlers)

// Page Actions
