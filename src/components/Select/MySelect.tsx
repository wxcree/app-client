import { Button, Select } from 'antd'
import { any } from 'prop-types'
import React from 'react'

interface IProps {
    values: string[]
    measures: string[]
    handleChange: (value: any) => void
}

const MySelect = (props: IProps) => {
    const [selectedRow, setSelectedRow] = React.useState<any>([])
    const [selectedValues, setSelectedValues] = React.useState<any>([])
    const [selectedColumn, setSelectedColumn] = React.useState<any>([])

    const { handleChange } = props
    const { values } = props
    const { measures } = props

    const onClick = () => {
        const ret = {
            rows: selectedRow,
            columns: selectedColumn,
            values: selectedValues
        }
        handleChange(ret)
    }

    const handleRow = (values: any) => {
        setSelectedRow(values)
    }

    const handleColumn = (values: any) => {
        setSelectedColumn(values)
    }

    const handleValue = (values: any) => {
        setSelectedValues(values)
    }
    console.log()
    const filteredMeasures = measures.filter(
        (o) => !(selectedRow.includes(o) || selectedColumn.includes(o))
    )
    const filteredValues = values.filter((o) => !selectedValues.includes(o))
    return (
        <div>
            {'行内容: '}
            <Select
                mode="multiple"
                placeholder="选择行维度"
                value={selectedRow}
                onChange={handleRow}
                style={{ width: '50%' }}
            >
                {filteredMeasures.map((item: any) => (
                    <Select.Option key={item} value={item}>
                        {item}
                    </Select.Option>
                ))}
            </Select>
            <br />
            {'列内容: '}
            <Select
                mode="multiple"
                placeholder="选择列维度"
                value={selectedColumn}
                onChange={handleColumn}
                style={{ width: '50%' }}
            >
                {filteredMeasures.map((item: any) => (
                    <Select.Option key={item} value={item}>
                        {item}
                    </Select.Option>
                ))}
            </Select>
            <br />
            {'值内容: '}
            <Select
                mode="multiple"
                placeholder="选择数值"
                value={selectedValues}
                onChange={handleValue}
                style={{ width: '50%' }}
            >
                {filteredValues.map((item: any) => (
                    <Select.Option key={item} value={item}>
                        {item}
                    </Select.Option>
                ))}
            </Select>
            <Button onClick={onClick}>提交</Button>
        </div>
    )
}

export default MySelect
