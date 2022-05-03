import axios, { ResponseResult } from './axios'
import { AxiosResponse } from 'axios'
import { actionTypes } from '@/redux/modules/table'

/* Table */
export const getBaseTable = function(
    payload: object
): Promise<AxiosResponse<ResponseResult<actionTypes.IBaseTableData>>> {
    return axios.get('/api/table1', {
        params: payload
    })
}

export const getTable = function(payload: object): Promise<AxiosResponse<ResponseResult<any>>> {
    return axios.post('/api/gettable', payload)
}

export const getTableMutil = function(payload: object): Promise<AxiosResponse<ResponseResult<any>>> {
    return axios.post('/api/getmutiltable', payload)
}

/* Pkgs */
export const getBasePkgs = function(payload: object): Promise<AxiosResponse<ResponseResult<any>>> {
    return axios.post('/api/getpkg', payload)
}

export const setPkgs = function(payload: object): Promise<AxiosResponse<ResponseResult<any>>> {
    return axios.post('/api/setpkg', payload)
}

export const addTableName = function(payload: object): Promise<AxiosResponse<ResponseResult<any>>> {
    return axios.post('/api/addpkg', payload)
}

export const addTable = function(payload: object): Promise<AxiosResponse<ResponseResult<any>>> {
    return axios.post('/api/addtable', payload)
}
