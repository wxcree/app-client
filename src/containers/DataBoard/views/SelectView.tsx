/* eslint-disable react/jsx-key */
import * as React from 'react'
import { Col, Layout, Radio, RadioChangeEvent, Row } from 'antd'
import { ColumnProps } from 'antd/es/table'
import MyTree from '@/components/Collapse/Tree'
import { getBasePkgs, getTable } from '@/services/table'
import { DataFrame } from '@antv/data-wizard'
import { S2DataConfig } from '@antv/s2'
import '@antv/s2-react/dist/style.min.css'
import { TableBascInfo } from '@/utils/table'
const { Sider, Content } = Layout

interface ISelectProps {
    onReady: (info: ISelect) => void
}

export interface ISelect {
    tableInfo: TableBascInfo
    tableMode: string
    tableData: any
}

const SelectView: React.FunctionComponent<ISelectProps> = (props) => {
    const [DataPkgs, setDataPkgs] = React.useState<any>([])
    const [SelectNode, setSelectNode] = React.useState<React.Key>()
    const [currTableInfo, setCurrTableInfo] = React.useState<TableBascInfo>()
    const [currTableMode, setCurrTableMode] = React.useState<string>()
    const [currTableData, setCurrTableData] = React.useState<[]>([])

    const { onReady } = props

    React.useEffect(() => {
        getBasePkgs({}).then((Response) => {
            setDataPkgs(Response.data.data)
        })
    }, [])

    React.useEffect(() => {
        if (
            currTableInfo !== undefined &&
            currTableMode !== undefined &&
            currTableData !== undefined
        ) {
            onReady({
                tableInfo: currTableInfo,
                tableMode: currTableMode,
                tableData: currTableData
            })
        }
    }, [currTableInfo, currTableMode, currTableData])

    const onSelect = async (keys: React.Key[], info: any) => {
        if (info.node.isLeaf !== true || SelectNode === keys[0]) return
        if (SelectNode !== undefined && SelectNode === keys[0]) return
        setSelectNode(keys[0])
        const from = {
            pkgName: info.node.pkgName,
            tableName: info.node.key
        }
        const res = await getTable(from)
        const table = res.data.data
        if (table === undefined || res.data.code === 1) {
            alert('该表为空')
            return
        }
        setCurrTableInfo(from)
        setCurrTableData(table)
    }

    function onChange(e: RadioChangeEvent) {
        setCurrTableMode(e.target.value)
    }

    const radioArr = [
        {
            value: 'pal',
            img: (
                <svg
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="9628"
                    width="100"
                    height="100"
                >
                    <path
                        d="M474.250111 0l-0.437515 511.629783 0.182961 3.714898c0.127277 1.368228 0.318193 2.728501 0.564792 4.08082a38.413798 38.413798 0 0 0 8.233233 28.68506l2.688727 2.998965 347.824249 360.329217a510.587702 510.587702 0 0 1-320.59492 112.560621C229.536163 1023.991409 0 794.463201 0 511.287726 0 241.070643 209.060471 19.656346 474.250111 0z"
                        fill="#FD6421"
                        p-id="9629"
                    ></path>
                    <path
                        d="M591.018828 549.749252l432.980536-0.079548a510.794527 510.794527 0 0 1-134.452269 309.283175L591.018828 549.717433l432.980536-0.079548-432.980536 0.079548v0.031819z"
                        fill="#56C6A1"
                        p-id="9630"
                    ></path>
                    <path
                        d="M550.727695 472.834154L551.157255 0c252.461937 18.709723 454.052838 220.284714 472.818244 472.714832l-473.22394 0.095458L551.157255 0l-0.437515 472.818245v0.015909z"
                        fill="#3EBDFF"
                        p-id="9631"
                    ></path>
                </svg>
            )
        },
        {
            value: 'bar',
            img: (
                <svg
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="13075"
                    id="mx_n_1651580387695"
                    width="100"
                    height="100"
                >
                    <path
                        d="M290.15 503.877l-149.461-2.114v333.16H290.15z"
                        fill="#D73949"
                        p-id="13076"
                    ></path>
                    <path
                        d="M497.316 227.066l-149.462-3.883v611.74h149.462z"
                        fill="#0CA294"
                        p-id="13077"
                    ></path>
                    <path
                        d="M704.481 368.468l-149.461-2.98v469.435h149.461z"
                        fill="#35A0D6"
                        p-id="13078"
                    ></path>
                    <path
                        d="M911.647 638.005l-149.462-1.258v198.176h149.462z"
                        fill="#D97B24"
                        p-id="13079"
                        data-spm-anchor-id="a313x.7781069.0.i5"
                    ></path>
                    <path
                        d="M102.139 885.365V98.152H65.063v830.142h895.855v-42.929z"
                        fill="#819292"
                        p-id="13080"
                    ></path>
                </svg>
            )
        },
        {
            value: 'ring',
            img: (
                <svg
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="14024"
                    width="100"
                    height="100"
                >
                    <path
                        d="M546.747475 259.665455c145.454545 18.182465 219.636364 124.36299 219.636363 253.090909 0 33.454545-5.091556 65.454545-16.727919 94.545454l126.545455 73.453899c23.272727-50.907798 34.909091-108.36299 34.909091-167.999353 0-209.454545-146.182465-381.818828-364.364283-400v146.909091z m0 0"
                        fill="#706EE7"
                        p-id="14025"
                    ></path>
                    <path
                        d="M474.020202 765.847273c-109.090909-18.182465-217.453899-124.364283-217.453899-253.090909 0-128.727919 108.36299-234.908444 217.453899-253.090909V112.756364C292.20202 130.937535 111.838384 303.301818 111.838384 512.756364s180.363636 381.818828 362.181818 400V765.847273z m0 0"
                        fill="#29C287"
                        p-id="14026"
                    ></path>
                    <path
                        d="M712.565657 670.573899c-40.000646 50.907798-93.090909 85.091556-165.818182 95.273374V912.756364c109.090909-10.909737 224.727919-74.909737 290.182464-168.727273l-124.364282-73.455192z m0 0"
                        fill="#FFC107"
                        p-id="14027"
                    ></path>
                </svg>
            )
        },
        {
            value: 'table',
            img: (
                <svg
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="17699"
                    width="100"
                    height="100"
                >
                    <path d="M0 0h1024v292.571429H0z" fill="#4185F4" p-id="17700"></path>
                    <path
                        d="M0 365.714286h292.571429v292.571428H0z"
                        fill="#A0C2F9"
                        p-id="17701"
                    ></path>
                    <path
                        d="M0 731.428571h292.571429v292.571429H0z"
                        fill="#A0C2F9"
                        p-id="17702"
                    ></path>
                    <path
                        d="M365.714286 365.714286h292.571428v292.571428H365.714286zM365.714286 731.428571h292.571428v292.571429H365.714286z"
                        fill="#A0C2F9"
                        p-id="17703"
                    ></path>
                    <path
                        d="M731.428571 365.714286h292.571429v292.571428h-292.571429z"
                        fill="#A0C2F9"
                        p-id="17704"
                    ></path>
                    <path
                        d="M731.428571 731.428571h292.571429v292.571429h-292.571429z"
                        fill="#4185F4"
                        p-id="17705"
                    ></path>
                </svg>
            )
        },
        {
            value: 'fold',
            img: (
                <svg
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="18551"
                    data-spm-anchor-id="a313x.7781069.0.i15"
                    width="100"
                    height="100"
                >
                    <path
                        d="M959.159 928.219H64.063V98.125h37.045v787.166h858.051z"
                        fill="#819292"
                        p-id="18552"
                    ></path>
                    <path
                        d="M580.658 796.245L369.686 628.169 158.642 760.785l-17.659-37.737 230.991-145.15 208.508 166.113 334.054-270.609 21.225 35.183z"
                        fill="#1296db"
                        p-id="18553"
                        data-spm-anchor-id="a313x.7781069.0.i12"
                    ></path>
                    <path
                        d="M152.112 601.753l-28.68-27.17L360.23 238.944 569.003 494.92 903.52 103.683l26.316 30.213-361.462 422.75L362.245 303.91z"
                        fill="#2ad69d"
                        p-id="18554"
                        data-spm-anchor-id="a313x.7781069.0.i13"
                    ></path>
                </svg>
            )
        }
    ]
    return (
        <Layout className="board-layout">
            <Sider className="board-sider">
                <MyTree datapkgs={DataPkgs} onSelect={onSelect}></MyTree>
            </Sider>
            <Layout>
                <Content className="board-content">
                    <Radio.Group onChange={onChange}>
                        {radioArr.map((item) => (
                            <Radio.Button
                                value={item.value}
                                key={item.value}
                                className="select-radio"
                            >
                                {item.img}
                            </Radio.Button>
                        ))}
                    </Radio.Group>
                </Content>
            </Layout>
        </Layout>
    )
}

export default SelectView
