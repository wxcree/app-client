import * as React from 'react'
import { message } from 'antd'
import $store from '@/redux/index'
import { actionCreators, actionTypes } from '@/redux/modules/auth'
import { LoginParams, loginAjax, registerAjax } from '@/services/auth'
import { RouteComponentProps } from 'react-router-dom'
import './index.less'
import Input from './Input'

interface IProps extends RouteComponentProps {}

const Login = (props: IProps) => {
    const [submitParams, setSubmitParams] = React.useState<LoginParams>({
        username: '',
        password: '',
        passwordTow: ''
    })

    const [isRegister, setIsRegister] = React.useState<boolean>(false)
    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSubmitParams(
            Object.assign({}, submitParams, {
                [e.target.name]: e.target.value
            })
        )
    }

    const handleLogin = async (payload: LoginParams) => {
        await loginAjax(payload).then((res) => {
            if (res.data.code === 0) {
                $store.dispatch<actionTypes.AuthActions>(actionCreators.setUserInfo(res.data.data))
                // userInfo 存入localStorage
                window.localStorage.setItem('USER_INFO', JSON.stringify(res.data.data))

                setTimeout(() => {
                    props.history.push('/app')
                }, 100)
            } else {
                message.error('登录失败，请稍后重试！')
            }
        })
    }

    const doRegister = async (payload: LoginParams) => {
        await registerAjax(payload).then((res) => {
            if (res.data.code === 0) {
                message.info('注册成功！')
                setTimeout(() => {
                    setIsRegister(false)
                }, 100)
            } else {
                message.error('注册失败，请稍后重试！')
            }
        })
    }

    const handleSubmit = () => {
        if (!submitParams.username) {
            message.error('请输入用户名！')
            return
        }

        if (!submitParams.password) {
            message.error('请输入密码！')
            return
        }

        handleLogin(submitParams)
    }

    const goRegister = () => {
        setIsRegister(true)
    }

    const handleRegister = () => {
        if (!submitParams.username) {
            message.error('请输入用户名！')
            return
        }

        if (!submitParams.password) {
            message.error('请输入密码！')
            return
        }

        if (!submitParams.passwordTow) {
            message.error('请二次输入密码！')
            return
        }

        if (submitParams.passwordTow !== submitParams.password) {
            message.error('输入的两次密码不同！')
            return
        }

        doRegister(submitParams)
    }

    return (
        <div className="login">
            <form className="login-form">
                {!isRegister ? 
                <>
                    <h1>登录</h1>
                    <Input
                        name="username"
                        type="text"
                        placeholder="username"
                        onChange={inputChange}
                    ></Input>
                    <Input
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={inputChange}
                    ></Input>
                    <div className="form-item1">
                        <button type="button" onClick={handleSubmit}>
                            登录
                        </button>
                    </div>
                    <br></br>
                    <div className="form-item1">
                        <button type="button" onClick={goRegister}>
                            注册
                        </button>
                    </div>
                </> : <>
                <h1>注册</h1>
                    <Input
                        name="username"
                        type="text"
                        placeholder="输入用户名"
                        onChange={inputChange}
                    ></Input>
                    <Input
                        name="password"
                        type="password"
                        placeholder="输入密码"
                        onChange={inputChange}
                    ></Input>
                    <Input
                        name="passwordTow"
                        type="password"
                        placeholder="二次输入密码"
                        onChange={inputChange}
                    ></Input>
                    <div className="form-item1">
                        <button type="button" onClick={handleRegister}>
                            注册
                        </button>
                    </div>
                </>}
            </form>
        </div>
    )
}

export default Login
