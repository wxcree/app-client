import * as React from 'react'
import withBreadcrumb from '@/hoc/withBreadcrumb'
import MySelect from '@/components/Select/MySelect'
import { CaretDownOutlined } from '@ant-design/icons'
import { StepBar } from '@/components/StepBar'
import { SelectView, FromView, ChartView } from './views'


const MyAutoChart: React.FC = () => {
    const [currentStep, setcurrentStep] = React.useState<number>(1)

    const onStepChange = (currentStep: number) => {
        setcurrentStep(currentStep)
    }

    const SelectContent = (
        <>
            <SelectView />
        </>
    )
    const FromSelect = (
        <>
            <FromView />
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
            title: 'manifest',
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

            <p>{steps[currentStep].desc}</p>

            <div className="steps-content" style={{ height: 'calc(100% - 80px)' }}>
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
