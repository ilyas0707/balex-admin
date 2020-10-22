import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Analytics } from '../../pages/subpages/Analytics/Analytics'
import { Profile } from './../../pages/subpages/Profile/Profile'
import { ChangePassword } from '../../pages/subpages/ChangePassword/ChangePassword'

import Styles from './Scene.module.css'
export const Scene = () => {
    return (
        <div className={Styles.scene}>
            <Switch>
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