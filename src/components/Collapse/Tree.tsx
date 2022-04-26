import { Tree } from 'antd'
import React from 'react'
import { IPkgData } from '@/redux/modules/table/actionTypes'

const { DirectoryTree } = Tree

export interface ITree {
    onChange: (key: string[] | string) => void
    datapkgs: IPkgData[]
}

const MyTree = (props: ITree) => {
    const { datapkgs } = props
    const treeData = []

    for (const i in datapkgs) {
        const tmp: any = {}
        tmp['title'] = datapkgs[i]['pkgName']
        tmp['key'] = datapkgs[i]['pkgName']
        tmp['children'] = []
        for (const j in datapkgs[i]['tables']) {
            tmp['children'].push({
                title: datapkgs[i]['tables'][j],
                key: datapkgs[i]['tables'][j]
            })
        }
        treeData.push(tmp)
    }
    const onSelect = (keys: React.Key[], info: any) => {
        console.log('Trigger Select', keys, info)
    }

    const onExpand = () => {
        console.log('Trigger Expand')
    }

    return (
        <DirectoryTree
            multiple
            defaultExpandAll
            onSelect={onSelect}
            onExpand={onExpand}
            treeData={treeData}
        />
    )
}

export default MyTree
