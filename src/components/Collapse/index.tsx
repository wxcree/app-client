import { Button, Collapse } from 'antd'
import React from 'react'

const { Panel } = Collapse

interface ICollapse {
    onChange: (key: string[] | string) => void
    datapkgs: [
        {
            pkgName: string
            tables: string[]
        }
    ]
}

const DataCollapse = (props: ICollapse) => {
    const { onChange } = props
    const { datapkgs } = props
    let panels
    if (datapkgs.length <= 0) {
        panels = <Panel header={'暂无数据'} key={'0'}></Panel>
    } else {
        panels = datapkgs.map((item) => {
            return (
                <Panel header={item.pkgName} key={item.pkgName}>
                    {item.tables.map((i, index) => {
                        return <Button key={index}>{i}</Button>
                    })}
                </Panel>
            )
        })
    }
    return <Collapse onChange={onChange}>{panels}</Collapse>
}

export default DataCollapse
