import {
    SET_SCREEN_WIDTH,
    SetScreenWidthAction,
    SET_TAG_PAGE,
    SetTagsNavOptions,
    SetTagsNavAction,
    DELETE_ONE_TAG,
    DELETE_ALL_TAG,
    DELETE_OTHER_TAG,
    DeleteOneTagAction,
    DeleteAllTagAction,
    DeleteOtherTagAction,
    DeleteOneTagData,
    BreadcrumbData,
    UpdateBreadcrumbAction,
    UPDATE_BREADCRUMB
} from './actionTypes'

import * as H from 'history'
/**
 * 设置屏幕宽
 * @param data
 */
export const setScreenWidth = (data: number): SetScreenWidthAction => ({
    type: SET_SCREEN_WIDTH,
    data
})

/**
 * 设置设置 tags 导航数据
 * @param [SetTagsNavOptions] data
 */
export const setTagsNavData = (data: SetTagsNavOptions): SetTagsNavAction => ({
    type: SET_TAG_PAGE,
    data
})

/**
 * 删除一个 tag
 * @param [SetTagsNavOptions] data
 */
export const deleteOneTag = (data: DeleteOneTagData): DeleteOneTagAction => ({
    type: DELETE_ONE_TAG,
    data
})

/**
 * 删除全部 除了首页的 tag
 * @param [SetTagsNavOptions] data
 */
export const deleteAllTag = (data: H.History): DeleteAllTagAction => ({
    type: DELETE_ALL_TAG,
    data
})

/**
 * 删除其他 除了首页和当前选中的 tag
 * @param [SetTagsNavOptions] data
 */
export const deleteOtherTag = (data: H.History): DeleteOtherTagAction => ({
    type: DELETE_OTHER_TAG,
    data
})

/**
 * 删除其他 除了首页和当前选中的 tag
 * @param [BreadcrumbData] data
 */
export const updateBreadcrumbData = (data: Array<BreadcrumbData>): UpdateBreadcrumbAction => ({
    type: UPDATE_BREADCRUMB,
    data
})
