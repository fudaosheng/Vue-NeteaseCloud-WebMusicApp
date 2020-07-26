import { _getMusicUrl, _getLyric } from "network/detail"
import { playList } from "components/content/playmusic/playList";
export const indexMixin = {
    methods: {
        PlayMusic(index = 0) {
            let path = this.$route.path;
            let musiclist;
            if (this.musiclist.length >= 200) {
                musiclist = this.musiclist.slice(0, 199);
            }
            else musiclist = this.musiclist;
            let url = null,
                lyric = null,
                currentLength = 0;
            let playlist = [];
            for (let i = 0, length = musiclist.length; i < length; i++) {
                let getUrl = _getMusicUrl(musiclist[i].id).then(res => {
                    url = res.data.data[0].url;
                    // return url;
                    let song = new playList(i, musiclist[i], url, musiclist[i].id);
                    playlist.push(song);
                    currentLength++;
                    if (i == musiclist.length - 1) {

                        this.$bus.$emit("playMusic", playlist, index, path, musiclist);
            
                    }
                });
                // let getLyric = _getLyric(musiclist[i].id).then(res => {
                //     console.log(musiclist[i].id);
                //     lyric = res.data.tlyric.lyric;
                //     console.log(lyric);
                //     return lyric;
                // });
                // Promise.all([getUrl, getLyric])
                //     .then(results => {
                //         let song = new playList(i, musiclist[i], results[0], results[1]);
                //         playlist.push(song);
                //         currentLength++;
                //         /**每次完成两个网络请求都判断是否满足要求，满足才发送事件 */

                //         if (i == musiclist.length - 1) {

                //             this.$bus.$emit("playMusic", playlist, index, path,musiclist);
                //         }
                //     })
                //     .catch(err => {
                //         this.$Message.warning('数据加载中，请稍等');
                //     });
            }
        },
    }
}