export class Song{
    constructor(index,song,url='',id) {
      this.index=index;
      this.name=song.name;
      this.artist=song.artist;
      this.src=url;
      this.pic=song.pic||song.picUrl;
      this.id=id;
    }
}

// 用于格式化歌词
export class lyricItem{
  constructor(time,lyric){
    this.time=time;
    this.lyric=lyric;
  }
}