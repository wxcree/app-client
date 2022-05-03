import * as React from 'react'
import withBreadcrumb from '@/hoc/withBreadcrumb'
import MySelect from '@/components/Select/MySelect'


const MyAutoChart: React.FunctionComponent = () => {
    const values = ['营业额', '消费总数']
    const measures = ['时间', '桌台', '消费方式']
    const handleChange = (values: any) => {
        console.log(values)
    }
    return <MySelect values={values} measures={measures} handleChange={handleChange}></MySelect>
}

export default withBreadcrumb([
    {
        title: '数据展示'
    },
    {
        title: '自助图表'
    }
])(MyAutoChart)
