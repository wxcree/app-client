import { left } from '@antv/g2plot/lib/plots/sankey/sankey'
import { Col, Radio, RadioChangeEvent, Row, Select } from 'antd'
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
        <Row justify="center" style={{padding: '10px'}}>
            <Col span={4} style={{textAlign: 'right', lineHeight: '200%'}}>{selectType + ': '}</Col>
            <Col span={4} style={{textAlign: 'center'}}>
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
            </Col>
            <Col span={4}>
                <Radio.Group onChange={handleChange} style={{ width: 200 }}>
                    {types.map((i) => (
                        <Button value={i} key={i}>
                            {i}
                        </Button>
                    ))}
                </Radio.Group>
            </Col>
        </Row>
    )
}

export default ColSelect
