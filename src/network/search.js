import {request} from "./request"

export function _hotSearchDetail(){
    return request({
        url:'/search/hot/detail'
    })
}

export function _Search(key){
    return request({
        url:'/search',
        params:{
            keywords:key,
            limit:50
        }
    })
}

export function _Suggest(keywords){
    return request({
        url:'/search/suggest',
        params:{
            keywords:keywords
        }
    })
}