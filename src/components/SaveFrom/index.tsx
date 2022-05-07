import React, { ChangeEvent } from 'react'
import { Modal, Button, Select, Input } from 'antd'
import { DefaultOptionType } from 'antd/lib/select'

const { Option } = Select

interface ISaveTableFrom {
    DataPkgs: any
    onOk: (from: ISaveTable) => void
}

export interface ISaveTable {
    pkgName: string
    viewName: string
}

const SaveTableFrom: React.FC<ISaveTableFrom> = (props) => {
    const { DataPkgs } = props
    const { onOk } = props

    const [visible, setVisible] = React.useState(false)
    const [confirmLoading, setConfirmLoading] = React.useState(false)
    const [inputText, setInputText] = React.useState<string>('')
    const [selectText, setSelectText] = React.useState<string>('')

    const showModal = () => {
        setVisible(true)
    }

    const handleOk = () => {
        if (selectText === '' || inputText === '') {
            // TODO: 弹出框
            return
        }
        onOk({
            pkgName: selectText,
            viewName: inputText
        })
        setConfirmLoading(true)
        setTimeout(() => {
            setVisible(false)
            setConfirmLoading(false)
        }, 300)
    }

    const handleCancel = () => {
        setVisible(false)
    }

    function handleSelect(value: any) {
        setSelectText(value)
    }

    function handleInput(e: any) {
        setInputText(e.target.value)
    }

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Save Table
            </Button>
            <Modal
                title="填写上传信息"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Select style={{ width: '100%' }} onChange={handleSelect} placeholder="选择数据包">
                    {DataPkgs.map((i: any) => (
                        <Option value={i.pkgName} key={i.pkgName}>
                            {i.pkgName}
                        </Option>
                    ))}
                </Select>
                <Input
                    style={{ marginTop: '12px' }}
                    placeholder="输入自定数据集的名字"
                    onChange={handleInput}
                />
            </Modal>
        </>
    )
}

export default SaveTableFrom
