import { _getMusicUrl } from "network/detail"
import { Song } from "player/init-songs";
export const playMusic = {
    methods: {
        /**全局音乐播放方法
         * @param this.musicList 音乐列表
         * 
         * musicList 暂存音乐列表
         * playList  处理后的音乐播放列表
         */
        PlayMusic(index = 0) {
            let path = this.$route.path;

            let musicList;
            if (this.musicList.length >= 200) {
                musicList = this.musicList.slice(0, 199);
            }
            else musicList = this.musicList;
            let url = null,
                currentLength = 0;
            let playList = [];
            for (let i = 0, length = musicList.length; i < length; i++) {
                _getMusicUrl(musicList[i].id).then(res => {
                    url = res.data.data[0].url;
                    /**Song 构造函数参数：1.下标、2.歌曲、3.歌曲路径、4.歌曲id */
                    let song = new Song(i, musicList[i], url, musicList[i].id);
                    playList.push(song);
                    currentLength++;
                    if (i == musicList.length - 1) {
                        console.log(playList);
                        this.$bus.$emit("playMusic", playList, index, path, musicList);
            
                    }
                });
                // let getLyric = _getLyric(musicList[i].id).then(res => {
                //     console.log(musicList[i].id);
                //     lyric = res.data.tlyric.lyric;
                //     console.log(lyric);
                //     return lyric;
                // });
                // Promise.all([getUrl, getLyric])
                //     .then(results => {
                //         let song = new Song(i, musicList[i], results[0], results[1]);
                //         Song.push(song);
                //         currentLength++;
                //         /**每次完成两个网络请求都判断是否满足要求，满足才发送事件 */

                //         if (i == musicList.length - 1) {

                //             this.$bus.$emit("playMusic", Song, index, path,musicList);
                //         }
                //     })
                //     .catch(err => {
                //         this.$Message.warning('数据加载中，请稍等');
                //     });
            }
        },
    }
}