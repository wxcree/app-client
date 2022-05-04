import { Radio, RadioChangeEvent, Select } from 'antd'
import React from 'react'
const { Option } = Select
const { Button } = Radio
interface IProps {
    selectType: string
    values: string[] | undefined
    types: string[]
    onReady: (value: IColSelectReady) => void
    mykey: string
}

export interface IColSelectReady {
    value: string
    type: string
    key: string
}

const ColSelect = (props: IProps) => {
    const [selectedValue, setSelectedValue] = React.useState<string>()
    const [selectedType, setSelectedType] = React.useState<string>()

    const { selectType } = props
    const { values } = props
    const { types } = props
    const { onReady } = props
    const { mykey } = props

    React.useEffect(() => {
        if (selectedType !== undefined && selectedValue !== undefined) {
            console.log(mykey)
            onReady({
                value: selectedValue,
                type: selectedType,
                key: mykey
            })
        }
    }, [selectedType, selectedValue])

    const handleChange = (e: RadioChangeEvent) => {
        setSelectedType(e.target.value)
    }

    const handleSelect = (value: any) => {
        setSelectedValue(value)
    }

    return (
        <div>
            {selectType + ': '}
            <Select
                showSearch
                onChange={handleSelect}
                style={{ width: 200 }}
                placeholder={'Select ' + selectType}
                optionFilterProp="children"
                filterOption={(input, option: any) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {values?.map((i) => (
                    <Option value={i} key={i}>
                        {i}
                    </Option>
                ))}
            </Select>
            <Radio.Group onChange={handleChange}>
                {types.map((i) => (
                    <Button value={i} key={i}>
                        {i}
                    </Button>
                ))}
            </Radio.Group>
        </div>
    )
}

export default ColSelect
