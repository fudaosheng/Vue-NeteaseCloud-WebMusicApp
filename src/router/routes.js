const Individuation = ()=>import('views/individuation/Individuation');
const MusicListDetail = () =>import('views/list-detail/MusicListDetail')
const AllMusicList =() =>import('views/music-list/all-music-list')

const routes=[
    {
        path:'/',
        redirect:'/individuation'
    },
    {
        path:'/individuation',
        component:Individuation
    },
    {
        path:'/musiclistdetail/:id/:time',
        component:MusicListDetail
    },
    {
        path:'/allmusiclist',
        component:AllMusicList
    },
]
export default routes