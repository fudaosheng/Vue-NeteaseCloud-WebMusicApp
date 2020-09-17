const Individuation = ()=>import('views/individuation/Individuation');

const routes=[
    {
        path:'/',
        redirect:'/individuation'
    },
    {
        path:'/individuation',
        component:Individuation
    },
]
export default routes