import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Profile } from './../../pages/Subpages/Profile/Profile'
import { Income } from '../../pages/Subpages/Income/Income'
import { IncomeCreate } from '../../pages/Subpages/Income/IncomeCreate'
import { Order } from '../../pages/Subpages/Order/Order'
import { OrderCreate } from '../../pages/Subpages/Order/OrderCreate'

import Styles from './Scene.module.css'
import { Clients } from '../../pages/Subpages/Clients/Clients'

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
            </Switch>
        </div>
    )
}