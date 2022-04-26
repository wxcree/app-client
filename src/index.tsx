import * as React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import ZHCH from 'antd/es/locale-provider/zh_CN'
import store from './redux'
import LoadingFull from './components/LoadingFull'
// import 'normalize.css'

// lazy懒加载，webpack会将import内容拆分，需要时再下载文件，运行时加载
const Page = React.lazy(() => import('./Page'))

ReactDOM.render(
    <Provider store={store}>
        {/* antd全局配置 */}
        <ConfigProvider locale={ZHCH}>
            {/* IO优化，加入缓存，没缓存的抛出Promise */}
            <React.Suspense fallback={<LoadingFull></LoadingFull>}>
                <Page />
            </React.Suspense>
        </ConfigProvider>
    </Provider>,
    document.getElementById('app') as HTMLDivElement
)
