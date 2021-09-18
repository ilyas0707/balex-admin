import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Profile } from '../../pages/subpages/Profile/Profile'
import { Income } from '../../pages/subpages/Income/Income'
import { IncomeCreate } from '../../pages/subpages/Income/IncomeCreate'
import { Order } from '../../pages/subpages/Order/Order'
import { OrderCreate } from '../../pages/subpages/Order/OrderCreate'

import Styles from './Scene.module.css'
import { Clients } from './../../pages/subpages/Clients/Clients'
import { ClientFragment } from '../../fragments/ClientFragment'

export const Scene = () => {
    return (
        <div className={Styles.scene}>
            <Switch>
                <Route path="/panel/profile" exact>
                    <Profile />
                </Route>
                <Route path="/panel/income" exact>
                    <Income />
                </Route>
                <Route path="/panel/income/create" exact>
                    <IncomeCreate />
                </Route>
                <Route path="/panel/orders" exact>
                    <Order />
                </Route>
                <Route path="/panel/orders/create" exact>
                    <OrderCreate />
                </Route>
                <Route path="/panel/clients" exact>
                    <Clients />
                </Route>
                <Route path="/panel/clients/:id" exact>
                    <ClientFragment />
                </Route>
            </Switch>
        </div>
    )
}