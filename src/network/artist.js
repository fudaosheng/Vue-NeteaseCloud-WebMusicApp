import {request} from './request'
export function _getArtistDesc(id){
    return request({
        url:'/artist/desc',
        params:{
            id:id
        }
    })
}
export function _getArtistHot50(id){
    return request({
        url:'/artist/top/song',
        params:{
            id:id
        }
    })
}

export function _getArtistAlbum(id){
    return request({
        url:'/artist/album',
        params:{
            id:id
        }
    })
}

export function _getAlbum(id){
    return request({
        url:'/album',
        params:{
            id:id
        }
    })
}

export function _getArtistDescDetail(id){
    return request({
        url:'/artist/desc',
        params:{
            id:id
        }
    })
}

export function _getSimiArtist(cookie,id){
    return request({
        url:'/simi/artist',
        params:{
            cookie:cookie,
            id:id
        }
    })
}
export function _getArtistMv(id){
    return request({
        url:'/artist/mv',
        params:{
            id:id
        }
    })
}
