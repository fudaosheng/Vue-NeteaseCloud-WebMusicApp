import { request } from './request'

/**获取轮播图数据 */
export function _getBanner() {
    return request({
        url: '/banner'
    })
}
/**推荐歌单 */
export function _getPersonalized(config) {
    return request({
        url: '/personalized',
        params: {
            limit: config
        }
    })
}

/**独家放送 */
export function _getPrivateContent() {
    return request({
        url: "/personalized/privatecontent"
    })
}

/**获取每日新歌 */
export function _getNewSong() {
    return request({
        url: '/personalized/newsong',
    })
}

export function _getDaySongs(){
    return request({
        url:'/recommend/songs',
    })
}

/**获取每日推荐歌单  需要登陆*/
export function _getRecommendResource(cookie, uid) {
    return request({
        url: '/recommend/songs',
        params: {
            cookie: cookie,
            uid: uid
        }
    })
}


/**获取排行榜数据 */
export function _getRankList() {
    return request({
        url: '/toplist',
    })
}

/**歌手 */
export function _getArtist(area, type, name = -1,limit,offset=1) {
    return request({
        url: '/artist/list',
        params: {
            area: area,
            type: type,
            limit: limit,
            initial:name,
            offset:offset
        }
    })
}

/**最新歌曲 */
export function _getTopSongs(type) {
    return request({
        url: '/top/song',
        params: {
            type: type
        }
    })
}