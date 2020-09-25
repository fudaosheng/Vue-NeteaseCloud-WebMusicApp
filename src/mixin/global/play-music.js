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

            let musicList;
            if (this.musicList.length >= 200) {
                musicList = this.musicList.slice(0, 199);
            }
            else musicList = this.musicList;
            let url = null;
            let playList = [];
            for (let i = 0, length = musicList.length; i < length; i++) {
                _getMusicUrl(musicList[i].id).then(res => {
                    url = res.data.data[0].url;
                    /**Song 构造函数参数：1.下标、2.歌曲、3.歌曲路径、4.歌曲id */
                    let song = new Song(i, musicList[i], url, musicList[i].id);
                    playList.push(song);
                    if (i == musicList.length - 1) {
                        this.$bus.$emit("playMusic", playList, index, musicList);
                    }
                });
            }
        },
    }
}