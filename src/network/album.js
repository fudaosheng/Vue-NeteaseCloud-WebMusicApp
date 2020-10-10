import {request} from "./request"

export function _getAlbumDetail(id){
    return request({
        url:'/album/detail/dynamic',
        params:{
            id
        }
    })
}