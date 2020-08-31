import {request} from './request'

export function _getBanner(){
    return request({
        url:'/banner'
    })
}

export function _getPersonalized(config){
    return request({
        url:'/personalized',
        params:{
            limit:config
        }
    })
}

export function _getPrivateContent(){
    return request({
        url:"/personalized/privatecontent"
    })
}

export function _getNewSong(){
    return request({
        url:'/personalized/newsong',
    })
}

export function _getRecommendResource(cookie,uid){
    return request({
        url:'/recommend/songs',
        params:{
            cookie:cookie,
            uid:uid
        }
    })
}

export function _getMusicListHot(){
    return request({
        url:'/playlist/hot',
    })
}

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

export function _getRankList(){
    return request({
        url:'/toplist',
    })
}


export function _getArtist(area,type,limit){
    return request({
        url:'/artist/list',
        params:{
            area:area,
            type:type,
            limit:limit
        }
    })
}

export function _getTopSongs(type){
    return request({
        url:'/top/song',
        params:{
            type:type
        }
    })
}