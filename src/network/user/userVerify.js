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

export function _getSongList(id){
    return request({
        url:'/user/playlist',
        params:{
            uid:id
        }
    })
}