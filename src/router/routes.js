const Individuation = ()=>import('views/individuation/Individuation');
const MusicListDetail = () =>import('views/musiclist/MusicListDetail')

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
]
export default routes