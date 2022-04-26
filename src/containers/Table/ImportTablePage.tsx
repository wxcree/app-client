import * as React from 'react'
import ImportExcel from '@/components/ImportExcel'
import withBreadcrumb from '@/hoc/withBreadcrumb'
import { Divider } from 'antd'
import AdminTable from '@/components/AdminTable'
import { ColumnProps } from 'antd/es/table'
import { Button } from 'antd'
import { getBasePkgs, setPkgs } from '@/services/table'
import MyTree from '@/components/Collapse/Tree'
import MySelect from '@/components/ImportExcel/Select'

interface ImportExcelOptions {
    nameEN: string
    nameCN: string
    county: string
    timer: string
    key: string
}

// TODO: 这个应该是个类组件, 思考思考类组件和函数组件的不同用途，并且学习前端这个脚手架的构造原理
const ImportTable: React.FunctionComponent = (props) => {
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
    const [DataPkgs, setDataPkgs] = React.useState<any>([])
    React.useEffect(() => {
        console.log(1111)
        getBasePkgs({}).then((Response) => {
            console.log(Response)
            setDataPkgs(Response.data.data)
        })
    }, [])

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

    const handleCollapse = (key: string[] | string) => {
        console.log(key)
    }

    let index = 0
    const [name, setName] = React.useState('')
    const onNameChange = (event: any) => {
        setName(event.target.value)
    }

    const addItem = (e: any) => {
        e.preventDefault()
        for (const i in DataPkgs) {
            if (DataPkgs[i].pkgName === name) {
                alert('不能添加重复的数据包')
                return
            }
        }
        setPkgs({
            pkgName: name
        }).then((Response) => {
            console.log(Response)
            if (Response.data.code !== 0){
                alert('添加失败')
                return
            }
            setDataPkgs([
                ...DataPkgs,
                {
                    pkgName: name,
                    tables: []
                } || `New item ${index++}`
            ])
            setName('')
        })
    }

    return (
        <div>
            <MySelect datapkgs={DataPkgs} onNameChange={onNameChange} addItem={addItem} name={name}>
                请选择上传所使用的数据包
            </MySelect>
            <MyTree datapkgs={DataPkgs} onChange={handleCollapse}></MyTree>
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
