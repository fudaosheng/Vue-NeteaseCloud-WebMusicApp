const Individuation = () => import('views/individuation/Individuation');
const MusicListDetail = () => import('views/list-detail/MusicListDetail')
const AllMusicList = () => import('views/music-list/all-music-list')
const RankList = () => import('views/rank-list/rank-list')
const ArtistList = () => import('views/artist-list/artist-category')
const ArtistDetail = () => import('views/artist-detail/artist-detail')
const MvCategory = () => import('views/mv/mv-category')
const MvDetail = () => import('views/mv/mv-detail')
const Mv = () => import('views/mv/mv')
const NewSongs = () => import('views/new-songs/new-songs')
const AlbumDetail = () => import('views/album-detail/album-detail')

const SearchDetail = () => import('views/search-detail/search-detail')
const SearchSongs = () => import('views/search-detail/childsPage/search-songs')
const SearchArtist = () => import('views/search-detail/childsPage/search-artist')
const SearchPlaylist = () => import('views/search-detail/childsPage/search-playlist')
const SearchAlbum = () => import('views/search-detail/childsPage/search-album')
const SearchMv = () => import('views/search-detail/childsPage/search-mv')

const routes = [
    {
        path: '/',
        redirect: '/individuation'
    },
    {
        path: '/individuation',
        component: Individuation,
        meta: {
            title: 'Dance Music'
        }
    },
    {
        path: '/musiclistdetail/:id/:time',
        component: MusicListDetail,
        meta: {
            title: '歌单信息 - Dance Music'
        }
    },
    {
        path: '/allmusiclist',
        component: AllMusicList,
        meta: {
            title: '歌单 - Dance Music'
        }
    },
    {
        path: '/ranklist',
        component: RankList,
        meta: {
            title: '排行榜 - Dance Music'
        }
    },
    {
        path: '/artist-list',
        component: ArtistList,
        meta: {
            title: '歌手 - Dance Music'
        }
    },
    {
        path: '/artist-detail',
        name: 'artist-detail',
        component: ArtistDetail,
        meta: {
            title: '歌手信息 - Dance Music'
        }
    },
    {
        path: '/mv-list',
        component: MvCategory,
        meta: {
            title: 'MV列表 - Dance Music'
        }
    },
    {
        path: '/mv-detail/:id',
        component: MvDetail,
        meta: {
            title: 'MV详情 - Dance Music'
        }
    },
    {
        path: '/mv',
        component: Mv,
        meta: {
            title: 'MV - Dance Music'
        }
    },
    {
        path: '/new-songs',
        component: NewSongs,
        meta: {
            title: '最新音乐 - Dance Music'
        }
    },
    {
        path: '/album-detail',
        component: AlbumDetail,
        meta: {
            title: '专辑详情 - Dance Music'
        }
    },
    {
        path: '/search-detail/:keywords',
        name: 'search-detail',
        component: SearchDetail,
        children: [
            {
                path: '/',
                redirect: 'songs'
            },
            {
                path: 'songs',
                name: 'search-songs',
                component: SearchSongs,
                meta: {
                    title: '歌曲搜索 - Dance Music'
                }
            },
            {
                path: 'artist',
                name: 'search-artist',
                component: SearchArtist,
                meta: {
                    title: '歌手搜索 - Dance Music'
                }
            },
            {
                path: 'album',
                name: 'search-album',
                component: SearchAlbum,
                meta: {
                    title: '专辑搜索 - Dance Music'
                }
            },
            {
                path: 'playlist',
                name: 'search-playlist',
                component: SearchPlaylist,
                meta: {
                    title: '歌单搜索 - Dance Music'
                }
            },
            {
                path: 'mv',
                name: 'search-mv',
                component: SearchMv,
                meta: {
                    title: 'MV搜索 - Dance Music'
                }
            }
        ]
    },
]
export default routes