import { immerReducer } from "../utils/reducers";

export const DIALOG_MODAL_TOGGLE = "DIALOG_MODAL_TOGGLE"

const handlers = {
    toggleDialogModal: draftState => {
        draftState.modal = !draftState.modal
    },
}

const initialState = {
    modal: false,
}

export default immerReducer(initialState, {
    [DIALOG_MODAL_TOGGLE]: handlers.toggleDialogModal,
});

export const actionCreators = {
    toggleDialogModal: () => ({ type: DIALOG_MODAL_TOGGLE }),
}

export const toggleDialogModal = () => (dispatch) => {
    dispatch(actionCreators.toggleDialogModal())
}
