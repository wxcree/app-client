export interface MenusConfig {
    icon: string
    title: string
    path?: string
    SubMenu?: Array<MenusConfig>
}

const menus: Array<MenusConfig> = [
    {
        icon: 'pie-chart',
        title: '首页',
        path: '/app'
    },
    {
        icon: 'table',
        title: '数据准备',
        SubMenu: [
            {
                icon: 'api',
                path: '/app/tables/importTable',
                title: '数据导入'
            },
            {
                icon: 'container',
                path: '/app/tables/table1',
                title: '数据展示'
            }
        ]
    },
    {
        icon: 'compass',
        title: '数据分析',
        SubMenu: [
            {
                icon: 'project',
                path: '/app/analyze/MultiTable',
                title: '多维分析'
            },
            {
                icon: 'loading-3-quarters',
                path: '/app/components/loadingBar',
                title: 'LoadingBar'
            },
            {
                icon: 'drag',
                path: '/app/components/dragAblePage',
                title: '简易拖拽'
            }
        ]
    },
    {
        icon: 'dashboard',
        title: '数据展示',
        SubMenu: [
            {
                icon: 'fund',
                path: '/app/databoard/AutoChart',
                title: '自助图表'
            },
            {
                icon: 'loading-3-quarters',
                path: '/app/components/loadingBar',
                title: 'LoadingBar'
            },
            {
                icon: 'drag',
                path: '/app/components/dragAblePage',
                title: '简易拖拽'
            }
        ]
    }
]

export default menus
