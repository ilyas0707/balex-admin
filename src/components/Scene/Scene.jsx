import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Income } from '../../pages/subpages/Income/Income'
import { IncomeCreate } from '../../pages/subpages/Income/IncomeCreate'
import { Manufacturing } from '../../pages/subpages/Manufacturing/Manufacturing'
import { ManufacturingCreate } from '../../pages/subpages/Manufacturing/ManufacturingCreate'
import { Realization } from '../../pages/subpages/Realization/Realization'
import { RealizationCreate } from '../../pages/subpages/Realization/RealizationCreate'
import { Analytics } from '../../pages/subpages/Analytics/Analytics'
import { Profile } from './../../pages/subpages/Profile/Profile'
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
                <Route path="/panel/profile" exact>
                    <Profile />
                </Route>
                <Route path="/panel/changePassword" exact>
                    <ChangePassword />
                </Route>
            </Switch>
        </div>
    )
}