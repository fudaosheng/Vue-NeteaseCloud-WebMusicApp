import Vue from 'vue'
import VueRouter from 'vue-router'

const DiscoverMusic=()=>import('views/discover/DiscoverMusic')
const Individuation=()=>import('views/discover/childRouter/Individuation')
const MusicListCategory=()=>import('views/discover/childRouter/MusicListCategory')
const MusicRankList=()=>import('views/discover/childRouter/MusicRankList')
const ArtistCategory=()=>import('views/discover/childRouter/ArtistCategory')
const NewSongsR=()=>import('views/discover/childRouter/NewSongsR')
const MV=()=>import('views/mv/MV')

const MusicListDetail=()=>import('views/musicListDetail/MusicListDetail')
const DayMusicListDetail=()=>import('views/musicListDetail/DayMusicListDetail')

const ArtistDetail=()=>import('views/artistdetail/ArtistDetail')
const ArtistAlbum=()=>import('views/artistdetail/childRouter/ArtistAlbum')
const ArtistMV=()=>import('views/artistdetail/childRouter/ArtistMV')
const ArtistDescDetail=()=>import('views/artistdetail/childRouter/ArtistDescDetail')
const SimiArtist=()=>import('views/artistdetail/childRouter/SimiArtist')

const SearchList=()=>import('views/search/SearchList')

const PlayMV=()=>import('views/mv/PlayMV')
const AllMV=()=>import('views/mv/AllMV')

Vue.use(VueRouter)

  const routes = [
    {
      path:'',
      redirect:'/discover'
    },
    {
      path:'/discover',
      component:DiscoverMusic,
      children:[
        {
          path:'/',
          redirect:'/discover/individ'
        },
        {
          path:'/discover/individ',
          component:Individuation
        },
        {
          path:'/discover/category',
          component:MusicListCategory
        },
        {
          path:'/discover/ranklist',
          component:MusicRankList
        },
        {
          path:'/discover/artist',
          component:ArtistCategory
        },
        {
          path:'/discover/newsongs',
          component:NewSongsR
        },
        {
          path:'/discover/mv',
          component:MV
        },
      ]
    },
    {
      path:'/musiclistdetail/:id/:time',
      name:'detail',
      component:MusicListDetail,
    },
    {
      path:'/daymusic',
      component:DayMusicListDetail
    },
    {
      path:'/artist',
      component:ArtistDetail,
      children:[
        {
          path:'/',
          redirect:'/artist/album'
        },
        {
          path:'/artist/album',
          component:ArtistAlbum
        },
        {
          path:'/artist/mv',
          component:ArtistMV
        },
        {
          path:'/artist/desc',
          component:ArtistDescDetail
        },
        {
          path:'/artist/simi',
          component:SimiArtist
        },
      ]
    },
    {
      path:'/search/:key',
      component:SearchList
    },
    {
      path:'/playmv/:id',
      component:PlayMV
    },
    {
      path:'/allmv',
      component:AllMV
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
