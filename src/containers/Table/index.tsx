import * as React from 'react'
import withBreadcrumb from '@/hoc/withBreadcrumb'
import { Divider, Layout } from 'antd'
import AdminTable from '@/components/AdminTable'
import { ColumnProps } from 'antd/es/table'
import { connect } from 'react-redux'
import { actionTypes, actionCreators } from '@/redux/modules/table'
import { RootState } from '@/redux/Types'
import { ThunkDispatch } from 'redux-thunk'
import MyTree from '@/components/Collapse/Tree'
import { getBasePkgs, getTable } from '@/services/table'
import { getClomus } from '@/utils/table'
import { SheetComponent } from '@antv/s2-react'
import '@antv/s2-react/dist/style.min.css'
import { DataFrame } from '@antv/data-wizard'
import { S2DataConfig } from '@antv/s2'

interface ITableProps {
    /**
     * @param F 当前页码。 eg：{ currentPage： 1 }
     */
    getBaseTableData: (F: object) => void
    baseTableData: actionTypes.IBaseTableData
}

const TablePage: React.FunctionComponent<ITableProps> = (props) => {
    const [DataPkgs, setDataPkgs] = React.useState<any>([])
    const [SelectNode, setSelectNode] = React.useState<React.Key>()

    const [TableData, setTableData] = React.useState<[]>([])
    const [TableColumns, setTableColumns] = React.useState<ColumnProps<any>[]>()

    const [s2DataConfig, setS2DataConfig] = React.useState<S2DataConfig>({
        fields: {
            // columns: ['province', 'city', 'type', 'price', 'cost']
        },
        data: []
    })
    React.useEffect(() => {
        props.getBaseTableData({ currentPage: 1 })
        getBasePkgs({}).then((Response) => {
            console.log(Response)
            setDataPkgs(Response.data.data)
        })
    }, [])

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
        if (table === undefined || table.data === undefined) {
            alert('该表为空')
            return
        }
        const df = new DataFrame(table.data)
        const columns: any = df.axes[1]
        console.log(df)
        setS2DataConfig({
            fields: {
                columns: columns
            },
            data: table.data
        })
    }

    const handleChangePage = (currentPage: number) => {
        props.getBaseTableData({ currentPage })
    }

    const s2Options = {
        width: 1100,
        height: 800
    }

    const { baseTableData } = props
    return (
        <Layout>
            <Layout.Sider style={{ width: 300, background: 0xffffff }}>
                <MyTree datapkgs={DataPkgs} onSelect={onSelect}></MyTree>
            </Layout.Sider>
            <Layout.Content>
                <SheetComponent dataCfg={s2DataConfig} options={s2Options} sheetType="table" />
                <AdminTable<actionTypes.ITableData>
                    isExport
                    isShowPage
                    columns={TableColumns}
                    dataSource={TableData}
                    // totalPage={baseTableData.totalPage}
                    // onPageChange={handleChangePage}
                />
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
            title: '数据准备'
        },
        {
            title: '数据展示'
        }
    ])(TablePage)
)
