import React, { useState } from 'react'
import { useGet } from '../../../hooks/get.hook'
import Styles from './ManufacturingCreate.module.css'

import { Form } from './../../../components/Form/Form'

export const ManufacturingCreate = () => {
    const [opened, setOpened] = useState(0)
	const { data, data2, loading } = useGet('/admin/stoneMachine/getAll', '/size/getAll')

    // const Role1 = [
    //     { type: "number", name: "volume", label: "Объём(m3)"},
    //     { type: "number", name: "output", label: "Выхлоп"},
    // ]

    // const Role2 = [
    //     { type: "text", name: "carNumber", label: "Гос. номер"},
    //     { type: "text", name: "driver", label: "ФИО"},
    //     { type: "number", name: "invoice", label: "Накладная"},
    //     { type: "number", name: "cash", label: "Стоимость"},
    // ]

    // const User = [Role1]

    // const select = [
    //     { name: "categories", options: [
    //         { label: 'Категории', name: '' }, 
    //         { label: 'A1', name: 'A1' }, 
    //         { label: 'B2', name: 'B2' }, 
    //         { label: 'C3', name: 'C3' } 
    //     ] },
    // ]

    const Manufacturing = [
        { type: "date", name: "date", label: "Дата"},
        { type: "text", name: "layer", label: "Слой"},
        // { type: "text", name: "dimension", label: "Размеры"},
        { type: "number", name: "square", label: "Выработка(m2)"},
	]
	
	const Size = [
        { type: "text", name: "size", label: "Размеры"}
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
		
		{ name: "size", options: [
            [{ label: 'Размеры', id: 'undefined' }], 
            data2.object ?
            data2.object.reduce((acc, current) => {
                const x = acc.find(item => item.size === current.size);
                if (!x) {
                  return acc.concat([current]);
                } else {
                  return acc;
                }
              }, []).map((element) => {
                return { label: element.size !== null ? element.size : '', id: element.size }
            }) : ''
        ] },
	]
	
	const size = data2.object ? data2.object.reduce((acc, current) => {
        const x = acc.find(item => item.size === current.size);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
	}, []) : ''

    const machines = data.object ? data.object.reduce((acc, current) => {
        const x = acc.find(item => item.name === current.name);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
	}, []) : ''
	  
	const openTab = (id) => {
        setOpened(id)
    }

    const links = [
        { name: 'Создать размер' }, { name: 'Добавить' }
    ]

    const tabs = [
        { data: Size, url: 'size/create' },
        { id: 'manufacturing', data: Manufacturing, url: 'api/manufacturing/create', select: select, machines: machines, size: size },
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
                tabs.map(({id, data, url, select, machines, size}, i) => {
                    return (
                        <div key={ i } className={`${Styles.form} ${opened === i ? Styles.active : ''}`}>
                            <Form component={ 'manufacturing' } id={ id } data={ data } url={ url } select={ select } machines={ machines } size={ size } />
                        </div>
                    )
                })
            }
        </div>
    )
}