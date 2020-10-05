const Individuation = () => import('views/individuation/Individuation');
const MusicListDetail = () => import('views/list-detail/MusicListDetail')
const AllMusicList = () => import('views/music-list/all-music-list')
const RankList = () => import('views/rank-list/rank-list')
const ArtistList = () => import('views/artist-list/artist-category')
const ArtistDetail = () => import('views/artist-detail/artist-detail')

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
    {
        path: '/artist-list',
        component: ArtistList
    },
    {
        path: '/artist-detail',
        name:'artist-detail',
        component: ArtistDetail
    },
]
export default routes