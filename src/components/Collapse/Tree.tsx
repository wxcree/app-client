import { Tree } from 'antd'
import React from 'react'
import { IPkgData } from '@/redux/modules/table/actionTypes'

const { DirectoryTree } = Tree

export interface ITree {
    datapkgs: IPkgData[]
    onSelect: (keys: React.Key[], info: any) => void
}

const MyTree = (props: ITree) => {
    const { datapkgs } = props
    const { onSelect } = props
    const treeData = []

    for (const i in datapkgs) {
        const tmp: any = {}
        tmp['title'] = datapkgs[i]['pkgName']
        tmp['key'] = datapkgs[i]['pkgName']
        tmp['children'] = []
        for (const j in datapkgs[i]['tables']) {
            tmp['children'].push({
                title: datapkgs[i]['tables'][j],
                key: datapkgs[i]['tables'][j],
                pkgName: tmp['title'],
                isLeaf: true
            })
        }
        treeData.push(tmp)
    }

    const onExpand = () => {
        //console.log('Trigger Expand')
    }

    return (
        <DirectoryTree
            defaultExpandAll
            onSelect={onSelect}
            onExpand={onExpand}
            treeData={treeData}
        />
    )
}

export default MyTree
