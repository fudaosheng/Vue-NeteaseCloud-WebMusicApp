import { request } from "./request"

/**获取歌单分类 */
export function _getCatList(){
    return request({
        url:'/playlist/catlist'
    })
}

/**获取热门歌单 */
export function _getMusicListHot(){
    return request({
        url:'/playlist/hot',
    })
}

/**获取不同tag的精品歌单 */
export function _getHighquality(cat,limit){
    return request({
        url:'/top/playlist/highquality',
        params:{
            cat:cat,
            limit:limit,
            time:new Date().getTime()
        }
    })
}

/**获取歌单--网友精选碟，全部歌单 */
export function _getPlayList(cat,limit,offset){
    return request({
        url:'/top/playlist',
        params:{
            cat:cat,
            limit:limit,
            offset
        }
    })
}