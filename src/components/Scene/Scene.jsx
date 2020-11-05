import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Income } from '../../pages/subpages/Income/Income'
import { IncomeCreate } from '../../pages/subpages/Income/IncomeCreate'
import { OutcomeCreate } from '../../pages/subpages/Income/OutcomeCreate'
import { IncomeAccounting } from '../../pages/subpages/IncomeAccounting/IncomeAccounting'
import { IncomeAccountingCreate } from '../../pages/subpages/IncomeAccounting/IncomeAccountingCreate'
import { Manufacturing } from '../../pages/subpages/Manufacturing/Manufacturing'
import { ManufacturingCreate } from '../../pages/subpages/Manufacturing/ManufacturingCreate'
import { Realization } from '../../pages/subpages/Realization/Realization'
import { RealizationCreate } from '../../pages/subpages/Realization/RealizationCreate'
import { Analytics } from '../../pages/subpages/Analytics/Analytics'
import { AnalyticsCreate } from '../../pages/subpages/Analytics/AnalyticsCreate'
import { Profile } from './../../pages/subpages/Profile/Profile'
import { CreateUser } from '../../pages/subpages/CreateUser/CreateUser'
import { ChangePassword } from '../../pages/subpages/ChangePassword/ChangePassword'

import Styles from './Scene.module.css'

export const Scene = () => {
    return (
        <div className={Styles.scene}>
            <Switch>
                <Route path="/panel/income" exact>
                    <Income />
                </Route>
                <Route path="/panel/income/create" exact>
                    <IncomeCreate />
                </Route>
                <Route path="/panel/outcome/create" exact>
                    <OutcomeCreate />
                </Route>
                <Route path="/panel/incomeAccounting" exact>
                    <IncomeAccounting />
                </Route>
                <Route path="/panel/incomeAccounting/create" exact>
                    <IncomeAccountingCreate />
                </Route>
                <Route path="/panel/manufacturing" exact>
                    <Manufacturing />
                </Route>
                <Route path="/panel/manufacturing/create" exact>
                    <ManufacturingCreate />
                </Route>
                <Route path="/panel/realization" exact>
                    <Realization />
                </Route>
                <Route path="/panel/realization/create" exact>
                    <RealizationCreate />
                </Route>
                <Route path="/panel/analytics" exact>
                    <Analytics />
                </Route>
                <Route path="/panel/analytics/create" exact>
                    <AnalyticsCreate />
                </Route>
                <Route path="/panel/profile" exact>
                    <Profile />
                </Route>
                <Route path="/panel/profile/createUser" exact>
                    <CreateUser />
                </Route>
                <Route path="/panel/profile/changePassword" exact>
                    <ChangePassword />
                </Route>
            </Switch>
        </div>
    )
}