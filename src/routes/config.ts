import { lazy, ComponentType } from 'react'

interface Meta {
    title: string
    rules: string[]
}

export interface RouteConfig {
    name: string
    path: string
    component: ComponentType
    meta: Meta
}

const routes: RouteConfig[] = [
    {
        name: 'Home',
        path: '/app',
        component: lazy(() => import('../containers/Home')),
        meta: {
            title: '首页',
            rules: ['loginRequired']
        }
    },
    {
        name: 'Table',
        path: '/app/tables/table1',
        component: lazy(() => import('../containers/Table')),
        meta: {
            title: '数据展示',
            rules: ['loginRequired']
        }
    },
    {
        name: 'ImportTable',
        path: '/app/tables/importTable',
        component: lazy(() => import('../containers/Table/ImportTablePage')),
        meta: {
            title: '数据导入',
            rules: ['loginRequired']
        }
    },
    {
        name: 'MultiTable',
        path: '/app/analyze/MultiTable',
        component: lazy(() => import('@/containers/Analyze/MultiTable')),
        meta: {
            title: '多维分析',
            rules: ['loginRequired']
        }
    },
    {
        name: 'AutoChart',
        path: '/app/databoard/AutoChart',
        component: lazy(() => import('@/containers/DataBoard/AutoChart')),
        meta: {
            title: '自助图表',
            rules: ['loginRequired']
        }
    },
    /* ComponentsPage start */
    {
        name: 'LoadingBar',
        path: '/app/components/loadingBar',
        component: lazy(() => import('../containers/ComponentsPage/LoadingBar')),
        meta: {
            title: 'LoadingBar',
            rules: ['loginRequired']
        }
    },
    {
        name: 'LoadingBar',
        path: '/app/components/dragAblePage',
        component: lazy(() => import('../containers/ComponentsPage/DragAblePage')),
        meta: {
            title: '简易拖拽',
            rules: ['loginRequired']
        }
    }
]

export default routes
