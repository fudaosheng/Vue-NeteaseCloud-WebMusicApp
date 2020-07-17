export class playList{
    constructor(index,song,url='',id) {
      this.index=index;
      this.title=song.name;
      this.artist=song.song;
      this.src=url;
      this.pic=song.pic;
      this.id=id;
    }
}

export class lyricItem{
  constructor(time,lyric){
    this.time=time;
    this.lyric=lyric;
  }
}