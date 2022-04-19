import { Button, Collapse } from 'antd'
import React from 'react'

const { Panel } = Collapse

interface ICollapse {
    onChange: (key: string[] | string) => void
    datapkgs: [
        {
            id: number
            name: string
            datas: [
                {
                    id: number
                    name: string
                }
            ]
        }
    ]
}

const DataCollapse = (props: ICollapse) => {
    const { onChange } = props
    const { datapkgs } = props

    const panels = datapkgs.map((item) => {
        return (
            <Panel header={item.name} key={item.id}>
                {item.datas.map((i) => {
                    return <Button key={i.id}>{i.name}</Button>
                })}
            </Panel>
        )
    })
    return (
        <React.Fragment>
            <Collapse defaultActiveKey={['1']} onChange={onChange}>
                {panels}
            </Collapse>
        </React.Fragment>
    )
}

export default DataCollapse
