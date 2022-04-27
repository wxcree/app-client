import * as React from 'react'
import $store from '@/redux/index'
import { actionCreators, actionTypes } from '@/redux/modules/settings'

// 添加action后返回对应装饰器，输入组件返回高级组件
const withBreadcrumb = (options: actionTypes.BreadcrumbData[]) => {
    return <T extends {}>(WrappedComponent: React.ComponentType<T>) => {
        return (props: T) => {
            React.useEffect(() => {
                $store.dispatch<actionTypes.SettingsAction>(
                    actionCreators.updateBreadcrumbData(options)
                )
            }, [])

            return <WrappedComponent {...props} />
        }
    }
}

export default withBreadcrumb
