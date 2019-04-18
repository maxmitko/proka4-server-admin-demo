import HeaderBadge from 'components/Badge/Header'
import Paper from 'components/Paper'
import Text from 'components/Text'
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useMappedState } from 'redux-react-hook';
import { actionCreator } from 'store/reducers/widgetClientVisit'
import styled from 'styled-components'
import BadgeIcon from '@material-ui/icons/Assignment'
import moment from 'moment'

const UserWidget = props => {

    const dispatch = useDispatch();
    const mapState = useCallback(state => ({ ...state.widgetClientVisit }), [])
    const fetchList = useCallback(options => dispatch(actionCreator.fetchList(options)), []);

    const { data, loading } = useMappedState(mapState);

    useEffect(() => {
        if (!data.length) fetchList({ regDate: moment(new Date()).format('YYYY-MM-DD') })
    }, [])

    const visitedClients = data.filter(item => item.visitStatus === 1)

    return (
        <Wrapper>
            <HeaderBadgeStyled float="left" color="warning"><BadgeIcon /></HeaderBadgeStyled>
            <Content>
                <Title variant="body2">Клиенты пришедшие сегодня</Title>
                <Text variant="h6">{`${loading ? "зaгрузка..." : visitedClients.length && visitedClients.length}`}</Text>
            </Content>
            <Bottom>
                <Text variant="body2">{`Всего зарегестрировано: ${loading ? "зaгрузка..." : data.length}`}</Text>
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