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
                currentLength = 0;
            let playlist = [];
            for (let i = 0, length = musiclist.length; i < length; i++) {
                let getUrl = _getMusicUrl(musiclist[i].id).then(res => {
                    url = res.data.data[0].url;
                    let song = new playList(i, musiclist[i], url, musiclist[i].id);
                    playlist.push(song);
                    currentLength++;
                    if (i == musiclist.length - 1) {

                        this.$bus.$emit("playMusic", playlist, index, path, musiclist);
            
                    }
                });
            }
        },
    }
}