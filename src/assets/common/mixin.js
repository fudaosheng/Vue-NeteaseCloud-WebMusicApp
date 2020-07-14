export const imgLoadMixin={
    data(){
        return {
            imgCount:1,
        }
    },
}

export const clickMixin={
    data(){
        return{
            currentIndex:0,
        }
    },
}

/**歌单详情路由混入 */
export const detailMixin={
    data(){
        return{
            time: null,
            date: null,
        }
    },
    created(){
        this.time = new Date().getDate();
        this.date = new Date().getDay();
    },
    computed: {
        getDate() {
          switch (this.date) {
            case 0:
              return "星期日";
              break;
            case 1:
              return "星期一";
              break;
            case 2:
              return "星期二";
              break;
            case 3:
              return "星期三";
              break;
            case 4:
              return "星期四";
              break;
            case 5:
              return "星期五";
              break;
            case 6:
              return "星期六";
              break;
          }
        }
      }
}