import {request} from './request'

import {formatDate} from "assets/common/tool"
export function _getMusicListDetail(id){
    return request({
        url:'/playlist/detail',
        params:{
            id:id
        }
    })
}

/**获取歌曲url */
export function _getMusicUrl(id){
    return request({
        url:'/song/url',
        params:{
            id:id
        }
    })
}

/**歌曲评论 */
export function _musicRecommend(id,limit){
    return request({
        url:'/comment/music',
        params:{
            id:id,
            limit:limit
        }
    })
}

/**获取歌词 */
export function _getLyric(id){
    return request ({
        url:'/lyric',
        params:{
            id:id
        }
    })
}

/**对歌单发表评论 */
export  function _pushCommend(cookie,id,content){
    return request({
        url:'/comment',
        params:{
            cookie:cookie,
            t:1,
            type:2,
            id:id,
            content:content,
        }
    })
}

/**获取歌单收藏者 */
export function _getSub(id,limit){
    return request({
        url:'/playlist/subscribers',
        params:{
            id:id,
            limit
        }
    })
}

/**歌单评论信息 */
export function _getRecommends(id,limit){
    return request({
        url:'/comment/playlist',
        params:{
            id:id,
            limit:limit
        }
    })
}

/**获取歌单歌曲信息 */
export function _getSongsDetail(arr){
    return request({
        url:'/song/detail',
        params:{
            ids:arr
        }
    })
}
/**对歌曲数据进行封装 */
export class songDetail{
    constructor(songs){
        this.id=songs[0].id;
        this.name=songs[0].name;
        this.album=songs[0].al.name;
        this.song=songs[0].ar[0].name;
        this.pic=songs[0].al.picUrl;
        this.time=formatDate(new Date(songs[0].dt),'mm:ss')
    }
}

/**歌单基础信息 */
export class baseInfo{
    constructor(playlist){
        this.img=playlist.coverImgUrl;
        this.title=playlist.description;
        this.name=playlist.name;
        this.shareCount=playlist.shareCount;
        this.subscribedCount=playlist.subscribedCount;
        this.playCount=playlist.playCount;
        this.trackCount=playlist.trackCount;
        this.tags=playlist.tags[0];
    }
}