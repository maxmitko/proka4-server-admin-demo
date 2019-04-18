import React from 'react';
import { Route } from 'react-router-dom'

import ClientsRegistration from "../ClientRegistration/index";
import UserList from "../Users/UsersTable";
import News from "../News/NewsTable";
import Home from "../Home/index";
import Service from "../Service/index";
import Ticket from "../Ticket/index";
import ScheduleList from "../Schedule/index";
import Shop from "../Shop/index";
import Bids from "../Bids/index";

const Routes = () => {
    return (
        <>
            <Route path='/' exact component={Home} />
            <Route path='/registration' component={ClientsRegistration} />
            <Route path='/users' component={UserList} />
            <Route path='/news' component={News} />
            <Route path='/service' component={Service} />
            <Route path='/ticket' component={Ticket} />
            <Route path='/schedule-list' component={ScheduleList} />
            <Route path='/shop-list' component={Shop} />
            <Route path='/bids' component={Bids} />
        </>
    )
};

export default Routes