import * as React from 'react'
import withBreadcrumb from '@/hoc/withBreadcrumb'
import MySelect from '@/components/Select/MySelect'
import { CaretDownOutlined } from '@ant-design/icons'
import { StepBar } from '@/components/StepBar'
import { SelectView, FromView, ChartView } from './views'
import { Typography } from 'antd'
const { Title } = Typography
import './index.less'
import { ISelect } from './views/SelectView'

const MyAutoChart: React.FC = () => {
    const [currentStep, setcurrentStep] = React.useState<number>(0)
    const [tableInfo, settableInfo] = React.useState<ISelect>()

    const onStepChange = (currentStep: number) => {
        setcurrentStep(currentStep)
    }

    const onSelectReady = (info: ISelect) => {
        console.log(info)
        settableInfo(info)
        setcurrentStep(1)
    }

    const SelectContent = (
        <>
            <SelectView onReady={onSelectReady} />
        </>
    )
    const FromSelect = (
        <>
            <FromView info={tableInfo}/>
        </>
    )

    const resultContent = (
        <>
            <ChartView />
        </>
    )
    // manifest

    const steps = [
        {
            title: 'Data',
            desc: 'Source data:',
            content: SelectContent
        },
        {
            title: 'Manifest',
            desc: 'Advices with lint recommended from data:',
            content: FromSelect
        },
        {
            title: 'Chart',
            desc: 'Render chart but you also know the limits.',
            content: resultContent
        }
    ]

    return (
        <>
            <StepBar current={currentStep} onChange={onStepChange} steps={steps} />

            <Title level={3}>{steps[currentStep].desc}</Title>

            <div className="steps-content" style={{ height: 'calc(100% - 200px)' }}>
                {steps[currentStep].content}
            </div>
        </>
    )
}

export default withBreadcrumb([
    {
        title: '数据展示'
    },
    {
        title: '自助图表'
    }
])(MyAutoChart)
