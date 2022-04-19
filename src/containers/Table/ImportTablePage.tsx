import * as React from 'react'
import ImportExcel from '@/components/ImportExcel'
import withBreadcrumb from '@/hoc/withBreadcrumb'
import { Divider } from 'antd'
import AdminTable from '@/components/AdminTable'
import { ColumnProps } from 'antd/es/table'
import { Button } from 'antd'
import DataCollapse from '@/components/Collapse'

interface ImportExcelOptions {
    nameEN: string
    nameCN: string
    county: string
    timer: string
    key: string
}

const ImportTable: React.FunctionComponent = () => {
    const [TableData, setTableData] = React.useState<ImportExcelOptions[]>([])
    const [TableColumns, setTableColumns] = React.useState<ColumnProps<ImportExcelOptions>[]>([
        {
            title: 'nameCN',
            dataIndex: 'nameCN',
            key: 'nameCN'
        },
        {
            title: 'nameEN',
            dataIndex: 'nameEN',
            key: 'nameEN'
        },
        {
            title: 'county',
            dataIndex: 'county',
            key: 'county'
        },
        {
            title: 'timer',
            dataIndex: 'timer',
            key: 'timer'
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a>{record.nameCN}</a>
                    <Divider type="vertical" />
                    <a>Delete</a>
                </span>
            )
        }
    ])

    const componentDidMount = () => {
        console.log(1)
    }

    const handleCallback = (data: ImportExcelOptions[]) => {
        console.log(data)
        const newColumns = []
        for (const key in data[0]) {
            console.log(key)
            newColumns.push({
                title: key,
                dataIndex: key,
                key: key
            })
        }
        setTableColumns(newColumns)
        setTableData(data)
        //setTableColumns(oldColumns)
    }

    //const

    const handleCheck = () => {
        const oldColumns = [...TableColumns]
        //oldColumns.pop()
        oldColumns.push({
            title: 'nameCN1',
            dataIndex: 'nameCN1',
            key: 'nameCN1'
        })
        console.log(oldColumns)
        //setTableData(TableData)
        setTableColumns(oldColumns)
    }

    const datapkg: any = [
        {
            id: 1,
            name: 'test',
            datas: [
                {
                    id: 1,
                    name: 'test2'
                }
            ]
        },
        {
            id: 2,
            name: 'test2',
            datas: [
                {
                    id: 2,
                    name: 'test22'
                }
            ]
        }
    ]

    const handleCollapse = (key: string[] | string) => {
        console.log(key)
    }

    return (
        <div>
            <DataCollapse datapkgs={datapkg} onChange={handleCollapse}></DataCollapse>
            <ImportExcel<ImportExcelOptions> onCallback={handleCallback} />
            <Button onClick={handleCheck}>Test</Button>
            <AdminTable<ImportExcelOptions> columns={TableColumns} dataSource={TableData} />
        </div>
    )
}

export default withBreadcrumb([
    {
        title: '数据准备'
    },
    {
        title: '数据导入'
    }
])(ImportTable)
