import React, { useState } from 'react'
import { Select, Divider, Input, Typography, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { IPkgData } from '@/redux/modules/table/actionTypes'

const { Option } = Select

export interface ISelect {
    addItem: (e: any) => void
    onNameChange: (event: any) => void
    onSelect: (key: string) => void
    datapkgs: IPkgData[]
    name: string
    children: string
}

// let index = 0

const MySelect = (props: ISelect) => {
    const { datapkgs } = props
    const { addItem } = props
    const { onNameChange } = props
    const { name } = props
    const { children } = props
    const { onSelect } = props

    // const onNameChange = (event: any) => {
    //     setName(event.target.value)
    // }

    // const addItem = (e: any) => {
    //     e.preventDefault()
    //     setItems([...items, name || `New item ${index++}`])
    //     setName('')
    // }

    return (
        <Select
            style={{ width: 300 }}
            placeholder={children}
            onSelect={onSelect}
            dropdownRender={(menu) => (
                <>
                    {menu}
                    <Divider style={{ margin: '8px 0' }} />
                    <Space align="center" style={{ padding: '0 8px 4px' }}>
                        <Input
                            placeholder="Please enter item"
                            value={name}
                            onChange={onNameChange}
                        />
                        <Typography.Link onClick={addItem} style={{ whiteSpace: 'nowrap' }}>
                            <PlusOutlined /> Add item
                        </Typography.Link>
                    </Space>
                </>
            )}
        >
            {datapkgs.map((item) => (
                <Option key={item.pkgName}>{item.pkgName}</Option>
            ))}
        </Select>
    )
}

export default MySelect
