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
import { IChartConfig, IColInfo, IFrom } from './views/FromView'
import { DataFrame } from '@antv/data-wizard'
import { initColumnFields, initFields, initSwitcherFields } from '@/utils/table'
import { getTableMutil } from '@/services/table'

const MyAutoChart: React.FC = () => {
    const [currentStep, setcurrentStep] = React.useState<number>(0)
    const [tableInfo, settableInfo] = React.useState<ISelect>()
    const [colInfo, setColInfo] = React.useState<IColInfo>()

    const [chartConfig, setchartConfig] = React.useState<IChartConfig>()
    const [chartData, setChartData] = React.useState<any>([])

    React.useEffect(() => {
        if (tableInfo !== undefined) {
            const df = new DataFrame(tableInfo.tableData)
            const fieldsTmp = initFields(df.info())
            const fields: any = initColumnFields(fieldsTmp)
            const mutilFrom: IColInfo = {
                measure: [...fields['columns']['items'], ...fields['rows']['items']],
                value: fields['values']['items']
            }
            setColInfo(mutilFrom)
        }
    }, [tableInfo])

    const onStepChange = (currentStep: number) => {
        setcurrentStep(currentStep)
    }

    const onSelectReady = (info: ISelect) => {
        settableInfo(info)
        setcurrentStep(1)
    }

    const onFromReady = async (info: IChartConfig) => {
        console.log(info)
        console.log(tableInfo)
        setchartConfig(info)
        const mutilFrom = {
            ...tableInfo?.tableInfo,
            columns: info.serise === undefined ? [info.x?.name] : [info.x?.name, info.serise.name],
            values: [info?.y?.name]
        }
        console.log(mutilFrom)
        const newData = await getTableMutil(mutilFrom)
        console.log(newData)
        setChartData(newData.data.data)
        setcurrentStep(2)
    }

    const SelectContent = (
        <>
            <SelectView onReady={onSelectReady} />
        </>
    )
    const FromSelect = (
        <>
            <FromView info={tableInfo} colInfo={colInfo} onReady={onFromReady} />
        </>
    )

    const resultContent = (
        <>
            <ChartView table={chartData} config={chartConfig} />
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
