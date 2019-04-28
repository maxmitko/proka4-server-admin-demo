import { immerReducer } from "../utils/reducers";

export const PUSH_MESSAGE = "PUSH_MESSAGE"
export const CLOSE_MESSAGE = "CLOSE_MESSAGE"

const handlers = {
    pushMessage: (draftState, { payload }) => ({
        ...payload, open: true
    }),
    closeMessage: draftState => {
        draftState.open = false
    }
}

export const initialState = {
    open: false,
    text: "",
}


export default immerReducer(initialState, {
    [PUSH_MESSAGE]: handlers.pushMessage,
    [CLOSE_MESSAGE]: handlers.closeMessage,
})


// Actions

export const pushMessage = params => ({ type: PUSH_MESSAGE, payload: params })
export const closeMessage = params => ({ type: CLOSE_MESSAGE, payload: params })
