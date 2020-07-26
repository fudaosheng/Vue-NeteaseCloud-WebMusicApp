import {request} from './request'
export function _getArtistDesc(id){
    return request({
        url:'/artist/desc',
        params:{
            id:id
        }
    })
}
/**获取歌手热门五十首歌曲 */
export function _getArtistHot50(id){
    return request({
        url:'/artist/top/song',
        params:{
            id:id
        }
    })
}

/**获取歌手专辑 */
export function _getArtistAlbum(id){
    return request({
        url:'/artist/album',
        params:{
            id:id
        }
    })
}

/**获取专辑内容 */
export function _getAlbum(id){
    return request({
        url:'/album',
        params:{
            id:id
        }
    })
}

/**获取歌手描述 */
export function _getArtistDescDetail(id){
    return request({
        url:'/artist/desc',
        params:{
            id:id
        }
    })
}

/**获取相识歌手 */
export function _getSimiArtist(cookie,id){
    return request({
        url:'/simi/artist',
        params:{
            cookie:cookie,
            id:id
        }
    })
}

/**mv */
export function _getArtistMv(id){
    return request({
        url:'/artist/mv',
        params:{
            id:id
        }
    })
}
