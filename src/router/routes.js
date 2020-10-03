const Individuation = () => import('views/individuation/Individuation');
const MusicListDetail = () => import('views/list-detail/MusicListDetail')
const AllMusicList = () => import('views/music-list/all-music-list')
const RankList = () => import('views/rank-list/rank-list')

const routes = [
    {
        path: '/',
        redirect: '/individuation'
    },
    {
        path: '/individuation',
        component: Individuation
    },
    {
        path: '/musiclistdetail/:id/:time',
        component: MusicListDetail
    },
    {
        path: '/allmusiclist',
        component: AllMusicList
    },
    {
        path: '/ranklist',
        component: RankList
    },
]
export default routes