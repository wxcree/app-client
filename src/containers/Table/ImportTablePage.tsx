import * as React from 'react'
import ImportExcel from '@/components/ImportExcel'
import withBreadcrumb from '@/hoc/withBreadcrumb'
import { Input, notification } from 'antd'
import AdminTable from '@/components/AdminTable'
import { ColumnProps } from 'antd/es/table'
import { Button } from 'antd'
import { addTable, addTableName, getBasePkgs, setPkgs } from '@/services/table'
import MySelect from '@/components/ImportExcel/Select'
import { getClomus } from '@/utils/table'

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
    const [TableColumns, setTableColumns] = React.useState<ColumnProps<ImportExcelOptions>[]>()
    const [DataPkgs, setDataPkgs] = React.useState<any>([])

    let index = 0
    const [name, setName] = React.useState('')
    const [selectPkg, setSelectPkg] = React.useState<string>()
    const [tableName, setTableName] = React.useState<string>()

    React.useEffect(() => {
        getBasePkgs({}).then((Response) => {
            console.log(Response)
            setDataPkgs(Response.data.data)
        })
    }, [])

    const openNotification = (placement: any) => {
        notification.info({
            message: `Notification ${placement}`,
            description:
                'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            placement
        })
    }

    const handleCallback = (data: ImportExcelOptions[]) => {
        console.log(data)
        const newColumns = getClomus(data)
        setTableColumns(newColumns)
        setTableData(data)
        //setTableColumns(oldColumns)
    }

    //const

    const handleCheck = async () => {
        openNotification('top')
        if (selectPkg === undefined || tableName === undefined || TableData.length <= 0) {
            alert('请完整上传信息')
            return
        }
        // TODO: 添加tableName 到datapkg
        const addTableFrom = {
            pkgName: selectPkg,
            tableName: tableName
        }
        console.log(addTableFrom)
        let res = await addTableName(addTableFrom)
        console.log(res)
        if (res.data.code === 1){
            alert('添加数据表失败')
            return
        }
        // TODO: 添加数据到 tables
        const addDataFrom = {
            pkgName: selectPkg,
            tableName: tableName,
            data: TableData
        }
        console.log(addDataFrom)
        res = await addTable(addDataFrom)
        console.log(res)
        if (res.data.code === 1){
            alert('上传数据失败')
            return
        }
        openNotification('top')
        alert('上传成功')
    }

    const onTableNameChange = (event: any) => {
        setTableName(event.target.value)
    }

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
            if (Response.data.code !== 0) {
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

    const onSelect = (key: string) => {
        setSelectPkg(key)
    }

    return (
        <div>
            <div style={{ width: 300 }}>
                <MySelect
                    datapkgs={DataPkgs}
                    onNameChange={onNameChange}
                    addItem={addItem}
                    name={name}
                    onSelect={onSelect}
                >
                    请选择上传所使用的数据包
                </MySelect>
                <Input
                    placeholder="请填写数据集名"
                    value={tableName}
                    onChange={onTableNameChange}
                />
            </div>
            {/* <MyTree datapkgs={DataPkgs} onChange={handleCollapse}></MyTree> */}
            <ImportExcel<ImportExcelOptions> onCallback={handleCallback} />
            <Button onClick={handleCheck}>Upload</Button>
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
