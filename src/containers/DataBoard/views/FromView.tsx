import * as React from 'react'
import { ISelect } from './SelectView'
import ColSelect, { IColSelectReady } from '@/components/Select/ColSelect'
import { Button } from 'antd'

const foldConfig = {
    xField: 'year',
    yField: 'value',
    seriesField: 'category',
    xAxis: {
        type: 'time'
    },
    yAxis: {
        label: {
            // 数值格式化为千分位
            formatter: (v: any) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`)
        }
    }
}

const ringConfig = {
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6
}

const barConfig = {
    isGroup: true,
    xField: '月份',
    yField: '月均降雨量',
    seriesField: 'name'
}

const palConfig = {
    angleField: 'value',
    colorField: 'type'
}

export interface IFrom {
    feild: any
    type: string
}

export interface IColInfo {
    measure: string[]
    value: string[]
}

interface IFromView {
    info: ISelect | undefined
    colInfo: IColInfo | undefined
    onReady: (value: IChartConfig) => void
}

interface IFromItem {
    element: JSX.Element
}

export interface IChartConfig {
    type: string
    x?: {
        name: string
        type: string
    }
    y?: {
        name: string
        type: string
    }
    serise?: {
        name: string
        type: string
    }
}

interface IFold {
    xs: string[] | undefined
    ys: string[] | undefined
    seris: string[] | undefined
    onReady: (value: IChartConfig) => void
    type?: string
}

const FoldFrom: React.FunctionComponent<IFold> = (props) => {
    const [chartConfig, setchartConfig] = React.useState<IChartConfig>({
        type: props.type === undefined ? 'fola' : props.type
    })

    const handleClick = () => {
        props.onReady(chartConfig)
    }

    const handleOnReady = (values: IColSelectReady) => {
        console.log(values)
        const tmp: any = Object.assign({}, chartConfig)
        tmp[values.key] = {
            name: values.value,
            type: values.type
        }
        console.log(tmp)
        setchartConfig(tmp)
    }

    return (
        <>
            <ColSelect
                mykey="x"
                selectType="x轴/维度"
                values={props.xs}
                types={['Data', 'Others']}
                onReady={handleOnReady}
            ></ColSelect>
            <ColSelect
                mykey="y"
                selectType="y轴/数值"
                values={props.ys}
                types={['SUM', 'CONST']}
                onReady={handleOnReady}
            ></ColSelect>
            <ColSelect
                mykey="serise"
                selectType="分组量度"
                values={props.xs}
                types={['Data', 'Others']}
                onReady={handleOnReady}
            ></ColSelect>
            <br />
            <Button onClick={handleClick}>确定</Button>
        </>
    )
}

interface IPal {
    xs: string[] | undefined
    ys: string[] | undefined
    onReady: (value: IChartConfig) => void
    type?: string
}

const PalFrom: React.FunctionComponent<IPal> = (props) => {
    const [chartConfig, setchartConfig] = React.useState<IChartConfig>({
        type: props.type === undefined ? 'pal' : props.type
    })

    const handleClick = () => {
        props.onReady(chartConfig)
    }

    const handleOnReady = (values: IColSelectReady) => {
        console.log(values)
        const tmp: any = Object.assign({}, chartConfig)
        tmp[values.key] = {
            name: values.value,
            type: values.type
        }
        console.log(tmp)
        setchartConfig(tmp)
    }

    return (
        <>
            <ColSelect
                mykey="x"
                selectType="x轴/维度"
                values={props.xs}
                types={['Data', 'Others']}
                onReady={handleOnReady}
            ></ColSelect>
            <ColSelect
                mykey="y"
                selectType="y轴/数值"
                values={props.ys}
                types={['SUM', 'CONST']}
                onReady={handleOnReady}
            ></ColSelect>
            <br />
            <Button onClick={handleClick}>确定</Button>
        </>
    )
}

const FromView: React.FunctionComponent<IFromView> = (props) => {
    const { info } = props
    const { colInfo } = props
    const { onReady } = props
    if (info === undefined) {
        return <div>{'请先选择数据集与展示格式'}</div>
    }

    const fromArr: { [key: string]: IFromItem } = {
        fold: {
            element: (
                <FoldFrom
                    xs={colInfo?.measure}
                    ys={colInfo?.value}
                    seris={colInfo?.measure}
                    onReady={onReady}
                    type={'fold'}
                ></FoldFrom>
            )
        },
        pal: {
            element: (
                <PalFrom
                    xs={colInfo?.measure}
                    ys={colInfo?.value}
                    onReady={onReady}
                    type={'pal'}
                ></PalFrom>
            )
        },
        ring: {
            element: (
                <PalFrom
                    xs={colInfo?.measure}
                    ys={colInfo?.value}
                    onReady={onReady}
                    type={'ring'}
                ></PalFrom>
            )
        },
        bar: {
            element: (
                <FoldFrom
                    xs={colInfo?.measure}
                    ys={colInfo?.value}
                    seris={colInfo?.measure}
                    onReady={onReady}
                    type={'bar'}
                ></FoldFrom>
            )
        },
        area: {
            element: (
                <FoldFrom
                    xs={colInfo?.measure}
                    ys={colInfo?.value}
                    seris={colInfo?.measure}
                    onReady={onReady}
                    type={'area'}
                ></FoldFrom>
            )
        }
    }
    console.log(info)
    const tableType = info.tableMode
    if (fromArr[tableType] === undefined) {
        return <div>{'正在施工中'}</div>
    }
    return <div>{fromArr[tableType].element}</div>
}

export default FromView
