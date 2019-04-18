
export default function CrudFactory({ prefix, url, statePlace }) {

    this.prefix = prefix.toUpperCase();
    this.statePlace = statePlace ? statePlace : prefix
    this.url = url ? url : prefix;
    this.initialState = {
        data: [],
        totalCount: 0,
        options: {},
        error: false,
        loading: false,
        crud: {
            targetId: undefined,
            data: [],
            error: false,
            loading: false,
        }
    }

    this.constants = {
        fetchList: `${this.prefix}_LIST_FETCH`,
        fetchListRequest: `${this.prefix}_LIST_REQUEST`,
        fetchListSuccess: `${this.prefix}_LIST_SUCCESS`,
        fetchListError: `${this.prefix}_LIST_FAILURE`,

        create: `${this.prefix}_CREATE`,
        createRequest: `${this.prefix}_CREATE_REQUEST`,
        createSuccess: `${this.prefix}_CREATE_SUCCESS`,
        createError: `${this.prefix}_CREATE_FAILURE`,

        read: `${this.prefix}_READ`,
        readRequest: `${this.prefix}_READ_REQUEST`,
        readSuccess: `${this.prefix}_READ_SUCCESS`,
        readError: `${this.prefix}_READ_FAILURE`,

        update: `${this.prefix}_UPDATE`,
        updateRequest: `${this.prefix}_UPDATE_REQUEST`,
        updateSuccess: `${this.prefix}_UPDATE_SUCCESS`,
        updateError: `${this.prefix}_UPDATE_FAILURE`,

        remove: `${this.prefix}_DELETE`,
        removeRequest: `${this.prefix}_DELETE_REQUEST`,
        removeSuccess: `${this.prefix}_DELETE_SUCCESS`,
        removeError: `${this.prefix}_DELETE_FAILURE`,
    }

    this.handlers = {
        [this.constants.fetchList]: (draftState, { payload }) => {
            draftState.options = { ...draftState.options, ...payload }
        },
        [this.constants.fetchListRequest]: draftState => {
            draftState.loading = true
        },
        [this.constants.fetchListSuccess]: (draftState, { payload }) => {
            const [data, totalCount] = payload
            draftState.data = data
            draftState.totalCount = totalCount
            draftState.loading = false
        },
        [this.constants.fetchListError]: (draftState, { payload }) => {
            draftState.loading = false
            draftState.error = true
        },
        [this.constants.create]: (draftState, { payload }) => {
            draftState.crud.data = payload
        },
        [this.constants.createRequest]: draftState => {
            draftState.crud.loading = true
        },
        [this.constants.createSuccess]: draftState => {
            draftState.crud.loading = false
        },
        [this.constants.createError]: (draftState, { payload }) => {
            draftState.crud.loading = false
            draftState.error = true
        },
        [this.constants.read]: (draftState, { payload }) => {
            draftState.crud.requestedId = payload
        },
        [this.constants.readRequest]: draftState => {
            draftState.crud.loading = true
        },
        [this.constants.readSuccess]: (draftState, { payload }) => {
            draftState.crud.data = payload
            draftState.crud.loading = false
        },
        [this.constants.readError]: (draftState, { payload }) => {
            draftState.crud.loading = false
            draftState.error = true
        },
        [this.constants.update]: (draftState, { payload }) => {
            draftState.crud.data = payload
            draftState.crud.loading = true
        },
        [this.constants.updateRequest]: draftState => {
            draftState.crud.loading = true
        },
        [this.constants.updateSuccess]: draftState => {
            draftState.crud.loading = false
        },
        [this.constants.updateError]: (draftState, { payload }) => {
            draftState.crud.loading = false
            draftState.error = true
        },
        [this.constants.remove]: (draftState, { payload }) => {
            draftState.crud.requestedId = payload
        },
        [this.constants.removeRequest]: draftState => {
            draftState.crud.loading = true
        },
        [this.constants.removeSuccess]: draftState => {
            draftState.crud.loading = false
        },
        [this.constants.removeError]: (draftState, { payload }) => {
            draftState.crud.loading = false
            draftState.error = true
        },
    }

    this.actionCreator = {
        fetchList: options => ({ type: this.constants.fetchList, payload: options }),
        fetchListRequest: () => ({ type: this.constants.fetchListRequest }),
        fetchListSuccess: data => ({ type: this.constants.fetchListSuccess, payload: data }),
        fetchListError: () => ({ type: this.constants.fetchListError }),

        create: data => ({ type: this.constants.create, payload: data }),
        createRequest: data => ({ type: this.constants.createRequest, payload: data }),
        createSuccess: () => ({ type: this.constants.createSuccess }),
        createError: error => ({ type: this.constants.createError, payload: error }),

        read: id => ({ type: this.constants.read, payload: id }),
        readRequest: () => ({ type: this.constants.readRequest }),
        readSuccess: data => ({ type: this.constants.readSuccess, payload: data }),
        readError: () => ({ type: this.constants.readError }),

        update: data => ({ type: this.constants.update, payload: data }),
        updateRequest: () => ({ type: this.constants.updateRequest }),
        updateSuccess: () => ({ type: this.constants.updateSuccess }),
        updateError: error => ({ type: this.constants.updateError, payload: error }),

        remove: id => ({ type: this.constants.remove, payload: id }),
        removeRequest: () => ({ type: this.constants.removeRequest }),
        removeSuccess: () => ({ type: this.constants.removeSuccess }),
        removeError: error => ({ type: this.constants.removeError, payload: error }),
    }
}
