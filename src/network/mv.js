import {request} from './request'

/**最新MV */
export function _getNewMV(limit,area){
    return request({
        url:'/mv/first',
        params:{
            limit:limit,
            area:area
        }
    })
}

/**封装mv信息 */
export class MV{
    constructor(id,cover,name,artist,count,duration){
        this.id=id;
        this.cover=cover;
        this.name=name;
        this.artist=artist;
        this.count=count;
        this.duration=duration;
    }
}

/**mv数据 */
export function _getMvDetail(id){
    return request({
        url:'/mv/detail',
        params:{
            mvid:id
        }
    })
}
/**mv地址 */
export function _getMVUrl(id){
    return request({
        url:'/mv/url',
        params:{
            id:id
        }
    })
}

/**mv评论 */
export function _getMVComment(id,limit,offset=1){
    return request({
        url:'/comment/mv',
        params:{
            id:id,
            limit:limit,
            offset:offset
        }
    })
}

/**相似MV */
export function _getSimiMv(id){
    return request({
        url:'/simi/mv',
        params:{
            mvid:id
        }
    })
}

/**推荐mv */
export  function _getTopMv(limit=10,area,offset){
    return request({
        url:'/top/mv',
        params:{
            limit:limit,
            area,
            offset
        }
    })
}

/**全部mv */
export function _AllMv(area='全部',type='全部',order='最新',limit,offset=1){
    return request({
        url:'/mv/all',
        params:{
            area:area,
            type:type,
            order:order,
            limit:limit,
            offset:offset
        }
    })
}

/**推荐MV */
export function _Personalized(){
    return request({
        url:'/personalized/mv',
    })
}