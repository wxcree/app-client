import * as React from 'react'
import withBreadcrumb from '@/hoc/withBreadcrumb'
import { Empty, Layout } from 'antd'
import { connect } from 'react-redux'
import { actionTypes, actionCreators } from '@/redux/modules/table'
import { RootState } from '@/redux/Types'
import { ThunkDispatch } from 'redux-thunk'
import MyTree from '@/components/Collapse/Tree'
import { getBasePkgs, getTable, getTableMutil, saveTable } from '@/services/table'
import { SheetComponent, Switcher } from '@antv/s2-react'
import '@antv/s2-react/dist/style.min.css'
import { DataFrame } from '@antv/data-wizard'
import { Data } from '@antv/s2'
import {
    generateFields,
    generateSwitcherFields,
    initFields,
    initSwitcherFields,
    TableBascInfo
} from '@/utils/table'
import { SwitcherResult } from '@antv/s2-react/esm/components/switcher/interface'
import './index.less'
import SaveTableFrom, { ISaveTable } from '@/components/SaveFrom'
import '@antv/s2-react/dist/style.min.css'

const MultiTable: React.FunctionComponent = () => {
    const [DataPkgs, setDataPkgs] = React.useState<any>([])
    const [SelectNode, setSelectNode] = React.useState<React.Key>()

    const [fields, setFields] = React.useState<any>({})
    const [switcherFields, setSwitcherFields] = React.useState({})
    const [S2Data, setS2Data] = React.useState<Data[]>([])

    const [currTableInfo, setCurrTableInfo] = React.useState<TableBascInfo>()

    const updatePkg = () => {
        getBasePkgs({}).then((Response) => {
            // console.log(Response.data.data)
            setDataPkgs(Response.data.data)
        })
    }

    React.useEffect(() => {
        updatePkg()
    }, [])

    const onSubmit = async (result: SwitcherResult) => {
        // console.log('result:', result)
        const newFields = generateFields(result)
        setFields(newFields)
        setSwitcherFields(generateSwitcherFields(result))
        // console.log(DataPkgs)
        if (currTableInfo === undefined) return
        const mutilFrom = {
            ...currTableInfo,
            columns: [...newFields['columns'], ...newFields['rows']],
            values: newFields['values']
        }
        // console.log(mutilFrom)
        const newData = await getTableMutil(mutilFrom)
        // console.log(newData)
        setS2Data(newData.data.data)
    }

    const onSelect = async (keys: React.Key[], info: any) => {
        if (info.node.isLeaf !== true || SelectNode === keys[0]) return
        if (SelectNode !== undefined && SelectNode === keys[0]) return
        setSelectNode(keys[0])
        const pkgName = info.node.pkgName
        const tableName = info.node.key
        const from = {
            pkgName: pkgName,
            tableName: tableName
        }
        setCurrTableInfo(from)
        const res = await getTable(from)
        const table = res.data.data
        // console.log(table)
        const tableInfo = DataPkgs.filter((i: any) => i.pkgName ===  pkgName)[0].tables.filter((i: any) => i.tableName === tableName)[0]
        if (table === undefined) {
            alert('该表为空')
            return
        }
        const df = new DataFrame(table)
        const fieldsTmp = initFields(df.info())
        const switcherFields: any = initSwitcherFields(fieldsTmp, tableInfo.type === 1)
        if (tableInfo.type === 1) {
            setFields(fieldsTmp)
        }
        setSwitcherFields(switcherFields)
        setS2Data(table)
    }

    const handleSave = async (from: ISaveTable) => {
        const res = await saveTable({
            pkgName: from.pkgName,
            tableName: SelectNode,
            viewName: from.viewName,
            columns: [...fields['columns'], ...fields['rows']],
            values: fields['values']
        })
        if (res.data.code === 1) {
            alert('保存失败')
            return
        }
        updatePkg()
    }

    const s2Options = {
        width: 1100,
        height: 800,
        interaction: {
            enableCopy: true,
        }
    }

    const header = {
        exportCfg: { open: true }
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
                            <>
                                <SheetComponent
                                    sheetType={'pivot'}
                                    adaptive={false}
                                    dataCfg={{ data: S2Data, fields }}
                                    options={s2Options}
                                    header={header}
                                />
                                <SaveTableFrom
                                    DataPkgs={DataPkgs}
                                    onOk={handleSave}
                                ></SaveTableFrom>
                            </>
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
