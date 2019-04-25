import { LocalesContext } from 'LocalesProvider'
import React, { useCallback, useContext } from 'react'
import { useDispatch, useMappedState } from 'redux-react-hook';
import { actionCreator } from 'store/reducers/userCard'

import UserCardTable from './UserCardTable.component'

const connect = props => {

    const dispatch = useDispatch();
    const mapState = useCallback(store => ({
        userCard: store.userCard,
    }), [])

    const store = {
        ...useMappedState(mapState),
        fetchList: useCallback(options => dispatch(actionCreator.fetchList(options)), []),
        removeItem: useCallback(id => dispatch(actionCreator.remove(id)), []),
        createItem: useCallback(data => dispatch(actionCreator.create(data)), []),
        updateItem: useCallback(data => dispatch(actionCreator.update(data)), []),
    }
    
    const locales = useContext(LocalesContext)

    return <UserCardTable locales={locales} {...store} {...props} />
}

export default connect