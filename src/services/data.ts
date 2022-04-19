import axios, { ResponseResult } from './axios'
import { AxiosResponse } from 'axios'
import { actionTypes } from '@/redux/modules/table'

/* baseTable */
export const getDataPkg = function(
    payload: object
): Promise<AxiosResponse<ResponseResult<actionTypes.IBaseTableData>>> {
    return axios.get('/api/datapkg', {
        params: payload
    })
}
