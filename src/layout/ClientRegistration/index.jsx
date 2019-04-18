import CornerBadge from 'components/Badge/Corner'
import HeaderBadge from 'components/Badge/Header'
import Button from 'components/Button'
import Paper from 'components/Paper'
import Text from 'components/Text'
import moment from 'moment'
import React, { useCallback, useState } from 'react'
import { useMappedState } from 'redux-react-hook';
import styled from 'styled-components'

import DoneAll from '@material-ui/icons/DoneAll'
import PeopleOutline from '@material-ui/icons/PeopleOutline'

import ClientCard from '../ClientCard/ClientCardTable'
import ClientVisitTable from '../ClientVisit/ClientVisitTable'
import ControlPanel from './ControlPanel'

const ClientsRegPage = props => {

    const mapState = useCallback(state => ({
        clientVisit: state.clientVisit,
        clientRegistration: state.clientRegistration
    }), [])

    const { clientVisit, clientRegistration } = useMappedState(mapState);

    const [tabValue, setTabValue] = useState(0)

    return (
        <Content>
            <ControlPanel />
            <TableWrapper>
                <Wrapper>
                    <HeaderBadge fullWidth>
                        <TabsWrapper>
                            <Text variant="body2" color="primary">Таблицы: </Text>
                            <Button
                                active={tabValue === 0}
                                onClick={() => setTabValue(0)}
                                variant="text"
                                color="white"
                            >
                                <PeopleOutline />Клиенты с квотой
                            </Button>
                            <Button
                                active={tabValue === 1}
                                onClick={() => setTabValue(1)}
                                variant="text"
                                color="white"
                            >
                                <DoneAll />
                                Зарегестрированы
                            <CornerBadge
                                    badgeContent={clientVisit.data.length}
                                    color={clientVisit.data.length === 0 ? "warning" : "success"}
                                />
                            </Button>
                        </TabsWrapper>
                        <CurrentDate variant="body2" color="primary">{moment(clientRegistration.dateFilter, 'YYYY-MM-DD').format("D MMMM")}</CurrentDate>
                    </HeaderBadge>
                    <TabContentWrapper>
                        <Hider isVisible={tabValue === 0}><ClientCard /></Hider>
                        <Hider isVisible={tabValue === 1}><ClientVisitTable /></Hider>
                    </TabContentWrapper>
                </Wrapper>
            </TableWrapper>
        </Content>
    )
}

export default ClientsRegPage


export const Content = styled.div`
    display: flex;
    align-items: stretch;
`

export const TableWrapper = styled.div`
    flex-grow: 1;
`

export const Wrapper = styled(Paper)`
    height: 100%;
`

export const Hider = styled.div`
    display: ${props => props.isVisible ? 'block' : 'none'};
`

export const TabContentWrapper = styled.div`
    margin: 20px 10px;
`

export const TabsWrapper = styled.div`

    display: flex;
    align-items: center;

    > * {
        margin-right: 10px;
    }

    svg {
        margin-right: 8px;
        height: 21px;
    }
`

export const CurrentDate = styled(Text)`
    margin-left: auto;
    margin-right: 10px;
    align-self: center;
    text-transform: uppercase;
`