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
                icon: 'container',
                path: '/app/tables/table1',
                title: '流水分析'
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
        ]
    }
]

export default menus
