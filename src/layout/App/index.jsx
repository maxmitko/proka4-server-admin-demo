import forestImg from 'assets/images/sidebar/e30.jpg'
import Carpet from 'components/Carpet'
import Drawer from 'components/Drawer'
import Notification from 'components/Notification'
import React, { useState, useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import { closeMessage } from 'store/reducers/message'
import styled from 'styled-components';

import MoreVerts from '@material-ui/icons/MoreVert'
import ViewList from '@material-ui/icons/ViewList'
import WidgetUsers from '../Widget/Users'
import WidgetAppointments from '../Widget/Appointments'
import WidgetOrders from '../Widget/Orders'
import WidgetClientVisit from '../Widget/ClientVisit'
import Router from '../SiteNavigation/router'
import SiteNavigation from '../SiteNavigation/Nav'
import OwnerInfo from '../OwnerPanel'
import { useDispatch, useMappedState } from 'redux-react-hook';

const App = props => {
    const dispatch = useDispatch();
    const mapState = useCallback(state => ({ message: state.message }), [])
    const close = useCallback(options => dispatch(closeMessage(options)), []);

    const { message} = useMappedState(mapState);

    const [open, setOpen] = useState(true)

    return (
        <>
            <Sidebar>
                <Drawer open={+open} minWidth="84px">
                    <OwnerInfo transitionTrigger={open}/>
                    <SiteNavigation transitionTrigger={open} />
                </Drawer>
                <Carpet url={forestImg} />
            </Sidebar>
            <Content>
                <ContentHeader>
                    <SliderButton onClick={() => setOpen(state => !state)}>
                        {open ? <MoreVerts /> : <ViewList />}
                    </SliderButton>
                    <WidgetsWrapper>
                        <WidgetClientVisit />
                        <WidgetUsers />
                        <WidgetAppointments />
                        <WidgetOrders />
                    </WidgetsWrapper>
                </ContentHeader>
                <ContentMain>
                    <Router />
                </ContentMain>
            </Content>
            <Notification {...message} onClose={close} />
        </>
    )
}
export default withRouter(App)

const Column = styled.div`
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
`
const Sidebar = styled(Column)`
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    position: relative;

    a {
        text-decoration: none;
        color: inherit;
    }
`

const Content = styled(Column)`
    background-color: ${props => props.color ? "hsl(10, 17%, 95%)" : props.theme.palette.background};
    padding: 0 30px;
    flex-grow: 1;
`

const ContentHeader = styled.header`
    padding: 15px 0;
`

const ContentMain = styled.div`
    margin: 30px 0px;
`

const SliderButton = styled.button`
    width: 41px;
    height: 41px;
    border: none;
    color: #999999;
    border-radius: 50%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    box-shadow: 0 2px 2px 0 rgba(153, 153, 153, 0.14), 0 3px 1px -2px rgba(153, 153, 153, 0.2), 0 1px 5px 0 rgba(153, 153, 153, 0.12);
    transition: box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    
    svg {
        width: 18px;
        height: 18px;
    }
`

const WidgetsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 20px -15px;
    margin-top: 55px;
`