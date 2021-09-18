import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import { useClients } from '../hooks/clients.hook'
import { useGet } from '../hooks/get.hook'
import { Client } from '../pages/subpages/Client/Client'

export const ClientFragment = () => {
    const { data, loading } = useGet('/api/users/getAll')
    const { clientsData } = useClients(data.object)

    console.log(clientsData)

    if (loading) {
        return <div className="loading"></div>
    }

    return (
        <Fragment>
            {
                clientsData.map(({ id }, i) => {
                    return (
                        <Route key={ i } path={`/panel/clients/${id}`} exact>
                            <Client data={ clientsData[i] } />
                        </Route>
                    )
                })
            }
        </Fragment>
    )
}
