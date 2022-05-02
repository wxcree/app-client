import * as React from 'react'
import withBreadcrumb from '@/hoc/withBreadcrumb'
import { Empty, Layout } from 'antd'
import { connect } from 'react-redux'
import { actionTypes, actionCreators } from '@/redux/modules/table'
import { RootState } from '@/redux/Types'
import { ThunkDispatch } from 'redux-thunk'
import MyTree from '@/components/Collapse/Tree'
import { getBasePkgs, getTable } from '@/services/table'
import { SheetComponent, Switcher } from '@antv/s2-react'
import '@antv/s2-react/dist/style.min.css'
import { DataFrame } from '@antv/data-wizard'
import { Data } from '@antv/s2'
import {
    generateFields,
    generateSwitcherFields,
    initFields,
    initSwitcherFields
} from '@/utils/table'
import { SwitcherResult } from '@antv/s2-react/esm/components/switcher/interface'
import { FieldsInfo } from '@antv/data-wizard/lib/dataset'
import './index.less'

const MultiTable: React.FunctionComponent = () => {
    const [DataPkgs, setDataPkgs] = React.useState<any>([])
    const [SelectNode, setSelectNode] = React.useState<React.Key>()

    const [fields, setFields] = React.useState({})
    const [switcherFields, setSwitcherFields] = React.useState({})
    const [S2Data, setS2Data] = React.useState<Data[]>([])

    React.useEffect(() => {
        getBasePkgs({}).then((Response) => {
            console.log(Response)
            setDataPkgs(Response.data.data)
        })
    }, [])

    const onSubmit = (result: SwitcherResult) => {
        console.log('result:', result)
        const newFields = generateFields(result)
        setFields(newFields)
        setSwitcherFields(generateSwitcherFields(result))
        console.log(newFields)
        const newCol = [...newFields['columns'], ...newFields['rows'], ...newFields['values']]
        console.log(newCol)
        const tmp = Object.assign([], S2Data)
        console.log(tmp)
        // TODO: 缺少数据升维的过程
        const newData = tmp.map((item) => {
            const ret: any = {}
            for (const i of newCol) {
                ret[i] = item[i]
            }
            return ret
        })
        console.log(newData)
    }

    const onSelect = async (keys: React.Key[], info: any) => {
        if (info.node.isLeaf !== true || SelectNode === keys[0]) return
        if (SelectNode !== undefined && SelectNode === keys[0]) return
        setSelectNode(keys[0])
        const from = {
            pkgName: info.node.pkgName,
            tableName: info.node.key
        }
        console.log(from)
        const res = await getTable(from)
        const table = res.data.data
        console.log(table)
        if (table === undefined) {
            alert('该表为空')
            return
        }
        const df = new DataFrame(table)
        const fieldsTmp = initFields(df.info())
        const switcherFields: any = initSwitcherFields(fieldsTmp)
        console.log(switcherFields)
        setSwitcherFields(switcherFields)
        setS2Data(table)
    }

    const s2Options = {
        width: 1100,
        height: 800
    }

    return (
        <Layout className="inner-layout">
            <Layout.Sider style={{ width: 300, background: 0xffffff }}>
                <MyTree datapkgs={DataPkgs} onSelect={onSelect}></MyTree>
            </Layout.Sider>
            <Layout.Content>
                {SelectNode === undefined ? (
                    <Empty style={s2Options} />
                ) : (
                    <div>
                        <Switcher {...switcherFields} onSubmit={onSubmit} />
                        {JSON.stringify(fields) === '{}' ? (
                            <Empty
                                description={'请选择需要展示的维度与量度'}
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                            />
                        ) : (
                            <SheetComponent
                                sheetType={'pivot'}
                                adaptive={false}
                                dataCfg={{ data: S2Data, fields }}
                                options={s2Options}
                            />
                        )}
                    </div>
                )}
            </Layout.Content>
        </Layout>
    )
}

const mapStateToProps = (state: RootState) => {
    return {
        baseTableData: state.table.baseTableData
    }
}

const mapDispatchToProps = (
    dispatch: ThunkDispatch<actionTypes.ITableState, void, actionTypes.TableActions>
) => {
    return {
        getBaseTableData: async (payload: object) => {
            dispatch(actionCreators.tableDataAxios(payload))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    withBreadcrumb([
        {
            title: '数据分析'
        },
        {
            title: '多维分析'
        }
    ])(MultiTable)
)
