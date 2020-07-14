export class playList{
    constructor(index,song,url='',lrc='') {
      this.index=index;
      this.title=song.name;
      this.artist=song.song;
      this.src=url;
      this.pic=song.pic;
      this.lrc=lrc; 
    }
}