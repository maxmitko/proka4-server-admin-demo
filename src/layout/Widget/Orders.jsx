import HeaderBadge from 'components/Badge/Header'
import Paper from 'components/Paper'
import Text from 'components/Text'
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useMappedState } from 'redux-react-hook';
import { actionCreator } from 'store/reducers/widgetOrders'
import styled from 'styled-components'

import BadgeIcon from '@material-ui/icons/ShoppingBasket'

const UserWidget = props => {

    const dispatch = useDispatch();
    const mapState = useCallback(state => ({ ...state.widgetOrders }), [])
    const fetchList = useCallback(options => dispatch(actionCreator.fetchList(options)), []);

    const { data, loading } = useMappedState(mapState);

    useEffect(() => {
        if (!data.length) fetchList({ })
    }, [])

    const mainInfo = data.filter(item => item.status === 1)

    return (
        <Wrapper>
            <HeaderBadgeStyled float="left" color="rose"><BadgeIcon /></HeaderBadgeStyled>
            <Content>
                <Title variant="body2">Заказы в процессе</Title>
                <Text variant="h6">{`${loading ? "зaгрузка..." : mainInfo.length && mainInfo.length}`}</Text>
            </Content>
            <Bottom>
                <Text variant="body2">{`Всего: ${loading ? "зaгрузка..." : data.length}`}</Text>
            </Bottom>
        </Wrapper>
    )
}

export default UserWidget

const Wrapper = styled(Paper)`
    margin: 0 15px;
    flex-grow: 1;
`

const HeaderBadgeStyled = styled(HeaderBadge)`
    svg {
        width: 32px;
        height: 32px;
        margin: 3px;
    }
`
const Title = styled(Text)`
    color: #999;
    padding-top: 10px;
`

const Content = styled.div`
    text-align: right;
`

const Bottom = styled.div`
    border-top: 1px solid #eee;
    margin-bottom: 10px;
    margin-top: 20px;
    padding-top: 10px;
    padding-left: 5px;
    p {
        color: #999;
    }
`