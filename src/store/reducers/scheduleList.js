
import { immerReducer } from "../utils/reducers";
import CrudFactory from '../utils/crudReducer'
import produce from 'immer'

export const { handlers, constants, initialState, actionCreator } = new CrudFactory({ prefix: 'schedule-list' })

const produceInitialState = produce(initialState, draftState => {
    draftState.options.relations = ["scheduleType"]
    draftState.options.order = { startDate: "ASC" }
})

export default immerReducer(produceInitialState, handlers)

// Page Actions
