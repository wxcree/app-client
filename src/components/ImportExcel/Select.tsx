import React, { useState } from 'react'
import { Select, Divider, Input, Typography, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const { Option } = Select

let index = 0

const App = () => {
    const [items, setItems] = useState(['jack', 'lucy'])
    const [name, setName] = useState('')

    const onNameChange = (event: any) => {
        setName(event.target.value)
    }

    const addItem = (e: any) => {
        e.preventDefault()
        setItems([...items, name || `New item ${index++}`])
        setName('')
    }

    return (
        <Select
            style={{ width: 300 }}
            placeholder="custom dropdown render"
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
            {items.map((item) => (
                <Option key={item}>{item}</Option>
            ))}
        </Select>
    )
}

export default App
