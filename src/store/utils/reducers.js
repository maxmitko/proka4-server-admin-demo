import produce from "immer"

export const createReducer = (initialState, handlers) => {
    return function reducer(state = initialState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action)
        } else {
            return state
        }
    }
};

export const immerReducer = (initialState, handlers) => {
    return function reducer(state = initialState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            return produce(state, draftState => handlers[action.type](draftState, action))
        } else {
            return state
        }
    }
};