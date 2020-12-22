import React, { useState } from 'react'
import { useGet } from '../../../hooks/get.hook'
import Styles from './OutcomeCreate.module.css'

import { Form } from './../../../components/Form/Form'

export const OutcomeCreate = () => {
    const [opened, setOpened] = useState(0)
    const { data, loading } = useGet('/admin/stoneMachine/getAll')

    const Machine = [
        { type: "text", name: "name", label: "Станок"},
    ]

    const Outcome = [
        { type: "date", name: "date", label: "Дата"},
        { type: "text", name: "layer", label: "Слой"},
        { type: "number", name: "stoneVolume", label: "Объём(m3)"},
    ]

    const select = [
        { name: "stoneMachine", options: [
            [{ label: 'Станок', id: 'undefined' }], 
            data.object ?
            data.object.reduce((acc, current) => {
                const x = acc.find(item => item.name === current.name);
                if (!x) {
                  return acc.concat([current]);
                } else {
                  return acc;
                }
              }, []).map((element) => {
                return { label: element.name, id: element.name }
            }) : ''
        ] },
    ]

    const openTab = (id) => {
        setOpened(id)
    }

    const links = [
        { name: 'Станок' }, { name: 'Расход' }
    ]

    const tabs = [
        { data: Machine, url: 'admin/stoneMachine/create' },
        { id: 'outcome', data: Outcome, url: 'admin/stoneOutcome/create', select: select, machines: data.object ? data.object.reduce((acc, current) => {
            const x = acc.find(item => item.name === current.name);
            if (!x) {
              return acc.concat([current]);
            } else {
              return acc;
            }
          }, []) : '' },
    ]

    if (loading) {
        return (
            <>
                <h3 className={Styles.heading}>Создать</h3>
                <div className={Styles.loading}></div>
            </>
        )
    }

    return (
        <div className={Styles.create}>
            <h2 className={Styles.heading}>Создать</h2>
            <div className={Styles.tabs}>
                {
                    links.map(({name}, i) => {
                        return (
                            <a
                                key={ i }
                                href="/"
                                className={`${Styles.tab} ${opened === i ? Styles.active : ''}`}
                                onClick={e => {e.preventDefault(); openTab(i)}}>
                                { name }
                            </a>
                        )
                    })
                }
            </div>
            {
                tabs.map(({id, data, url, select, machines}, i) => {
                    return (
                        <div key={ i } className={`${Styles.form} ${opened === i ? Styles.active : ''}`}>
                            <Form component={ 'outcome' } id={ id } data={ data } url={ url } select={ select } machines={machines} />
                        </div>
                    )
                })
            }
        </div>
    )
}