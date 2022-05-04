/* eslint-disable prettier/prettier */
import { FieldsInfo } from '@antv/data-wizard/lib/dataset'
import { SwitcherResult } from '@antv/s2-react/esm/components/switcher/interface'
import { Fields } from '@antv/s2'

export interface TableBascInfo {
    pkgName: string
    tableName: string
}

export function getClomus(tableData: any[]) {
    const columns = []
    for (const key in tableData[0]) {
        columns.push({
            title: key,
            dataIndex: key,
            key: key
        })
    }
    return columns
}

// 生成 switcher 所需要的 fields 结构
export function generateSwitcherFields(updatedResult: SwitcherResult) {
    return {
        rows: {
            selectable: true,
            items: updatedResult.rows.items
        },
        columns: {
            selectable: true,
            items: updatedResult.columns.items
        },
        values: {
            selectable: true,
            items: updatedResult.values.items
        }
    }
}

// 生成 dataCfg fields 结构
// TODO: 隐藏的值不显示
export function generateFields(updatedResult: SwitcherResult) {
    return {
        rows: updatedResult.rows.items
            .filter(
                (i: any) => !updatedResult.rows.hideItems.find((hide: any) => hide.id === i.id)
            )
            .map((i: any) => i.id),
        columns: updatedResult.columns.items
            .filter(
                (i: any) => !updatedResult.columns.hideItems.find((hide: any) => hide.id === i.id)
            )
            .map((i: any) => i.id),
        values: updatedResult.values.items
            .filter(
                (i: any) => !updatedResult.values.hideItems.find((hide: any) => hide.id === i.id)
            )
            .map((i: any) => i.id)
    }
}

// 构造datacfg fields
export function initFields(infos: FieldsInfo) {
    const rows: string[] = []
    const columns: string[] = []
    const values: string[] = []
    for (const i in infos) {
        if (infos[i].type === 'integer') {
            values.push(infos[i].name)
        } else if (infos[i].type === 'string') {
            rows.push(infos[i].name)
        } else if (infos[i].type === 'mixed') {
            if (infos[i].recommendation === 'float' || infos[i].recommendation === 'integer') {
                values.push(infos[i].name)
            } else {
                columns.push(infos[i].name)
            }
        } else if (infos[i].type === 'date') {
            columns.push(infos[i].name)
        }
    }
    return {
        rows: rows,
        columns: columns,
        values: values
    }
}

export function initSwitcherFields(fields: Fields) {
    return {
        rows: {
            selectable: true,
            items: fields.rows?.map((i: string) => {
                return { id: i , checked: false}
            })
        },
        columns: {
            selectable: true,
            items: fields.columns?.map((i: string) => {
                return { id: i , checked: false}
            })
        },
        values: {
            selectable: true,
            items: fields.values?.map((i: string) => {
                return { id: i , checked: false}
            })
        }
    }
}

export function initColumnFields(fields: Fields) {
    return {
        rows: {
            selectable: true,
            items: fields.rows?.map((i: string) => {
                return i
            })
        },
        columns: {
            selectable: true,
            items: fields.columns?.map((i: string) => {
                return i
            })
        },
        values: {
            selectable: true,
            items: fields.values?.map((i: string) => {
                return i
            })
        }
    }
}
