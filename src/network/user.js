import {request} from 'network/request'

export function _phoneVerify(phone){
    return request({
        url:'/cellphone/existence/check',
        params:{
            phone:phone
        }
    })
}

export function _login(phone,password){
    return request({
        url:'/login/cellphone',
        params:{
            phone:phone,
            password:password
        }
    })
}

/**获取用户歌单 */
export function _getSongList(id){
    return request({
        url:'/user/playlist',
        params:{
            uid:id,
            limit: 300
        }
    })
}

export class PlayList{
    constructor(playlist){
        this.name=playlist.name;//为了方便menu使用
        this.id=playlist.id;
        this.cover=playlist.coverImgUrl;
    }
}