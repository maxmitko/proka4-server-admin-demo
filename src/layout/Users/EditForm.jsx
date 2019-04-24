import CornerBadge from 'components/Badge/Corner'
import HeaderBadge from 'components/Badge/Header'
import Button from 'components/Button'
import Paper from 'components/Paper'
import React, { useCallback, useState } from 'react'
import { useMappedState } from 'redux-react-hook';
import styled from 'styled-components';

import UserCard from '../UserCard/UserCardTable'
import UserProfile from '../UserProfile/UserProfile'

const UsersForm = props => {

    const mapState = useCallback(state => ({ userCard: state.userCard }), [])

    const { userCard } = useMappedState(mapState);
    const { formState, initialData } = props;

    const [tabValue, setTabValue] = useState(0)

    return (
        <Wrapper>
            <HeaderBadge fullWidth>
                <TabsButtonWrapper>
                    <Button
                        active={tabValue === 0}
                        onClick={() => setTabValue(0)}
                        variant="text"
                        color="white" >Личные данные
                        </Button>

                    {!!initialData.id && <Button
                        active={tabValue === 1}
                        onClick={() => setTabValue(1)}
                        variant="text"
                        color="white" >Карта клиента
                        <CornerBadge
                            badgeContent={userCard.data.length}
                            color={userCard.data.length === 0 ? "warning" : "success"}
                        />
                    </Button>}
                </TabsButtonWrapper>
            </HeaderBadge>

            <TabContentWrapper>

                <Tab isVisible={tabValue === 0}>
                    <UserProfile formState={formState} initialData={initialData}/>
                </Tab>

                <Tab isVisible={tabValue === 1}>
                    <UserCard userId={initialData.id} />
                </Tab>

            </TabContentWrapper>
        </Wrapper>
    )
}

export default UsersForm

const Wrapper = styled(Paper)`
    width: 750px;
`

export const Tab = styled.div`
    display: ${props => props.isVisible ? 'block' : 'none'};
`

export const TabContentWrapper = styled.div`
    margin: 20px 10px;
`

export const TabsButtonWrapper = styled.div`

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

export const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;

    > * {
        margin-left: 20px;
    }
`