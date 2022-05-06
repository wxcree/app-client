import * as React from 'react'
import withBreadcrumb from '@/hoc/withBreadcrumb'
import { Layout } from 'antd'
import { ColumnProps } from 'antd/es/table'
import MyTree from '@/components/Collapse/Tree'
import { getBasePkgs, getTable } from '@/services/table'
import { SheetComponent, Switcher } from '@antv/s2-react'
import '@antv/s2-react/dist/style.min.css'
import { DataFrame } from '@antv/data-wizard'
import { S2DataConfig } from '@antv/s2'
import { SwitcherResult } from '@antv/s2-react/esm/components/switcher/interface'
import { initSwitcherFields } from '@/utils/table'

function generateSwitcherFields(updatedResult: any) {
    return {
        columns: {
            selectable: true,
            items: updatedResult.columns.items
        }
    }
}

// 生成 dataCfg fields 结构
function generateFields(updatedResult: any) {
    return {
        columns: updatedResult.columns.items.map((i: any) => i.id)
    }
}
const defaultFields = {
    columns: ['province', 'city', 'type', 'sub_type', 'number']
}

const defaultSwitcherFields = {
    columns: {
        selectable: true,
        items: [
            { id: 'province' },
            { id: 'city' },
            { id: 'type' },
            { id: 'sub_type' },
            { id: 'number' }
        ]
    }
}

const TablePage: React.FunctionComponent = (props) => {
    const [DataPkgs, setDataPkgs] = React.useState<any>([])
    const [SelectNode, setSelectNode] = React.useState<React.Key>()

    const [hiddenColumnFields, setHiddenColumnFields] = React.useState([])
    const [switcherFields, setSwitcherFields] = React.useState<any>()

    const [s2DataConfig, setS2DataConfig] = React.useState<S2DataConfig>({
        fields: {
            // columns: ['province', 'city', 'type', 'price', 'cost']
        },
        data: []
    })
    React.useEffect(() => {
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
        const res = await getTable(from)
        const table = res.data.data
        if (table === undefined || res.data.code === 1) {
            alert('该表为空')
            return
        }
        const df = new DataFrame(table)
        const columns: any = df.axes[1]
        setS2DataConfig({
            fields: {
                columns: columns
            },
            data: table
        })
        const sf = {
            columns: {
                selectable: true,
                items: columns?.map((i: string) => {
                    return { id: i, checked: true }
                })
            }
        }
        setSwitcherFields(sf)
    }

    const onSubmit = (result: any) => {
        const data = Object.assign({}, s2DataConfig)
        data.fields = generateFields(result)
        setS2DataConfig(data)
        setSwitcherFields(generateSwitcherFields(result))
        setHiddenColumnFields(result.columns.hideItems.map((i: any) => i.id))
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
                <Switcher sheetType="table" {...switcherFields} onSubmit={onSubmit} />
                <SheetComponent
                    dataCfg={s2DataConfig}
                    options={{ ...s2Options, interaction: { hiddenColumnFields } }}
                    sheetType="table"
                />
            </Layout.Content>
        </Layout>
    )
}

export default withBreadcrumb([
    {
        title: '数据准备'
    },
    {
        title: '数据展示'
    }
])(TablePage)
