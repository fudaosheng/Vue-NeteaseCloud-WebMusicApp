    /**格式化歌词
     * @param lyric 一个歌词字符串
     */
    export function parseLyric(lyric) {
      let RegExp = /\[(\d*:\d*\.\d*)\]/;
      /**暂存数组 */
      let arr = [],
      /**存放时间的数组 */
        timeArr = [],
      /**存放歌词的锁足 */
        lyricArr = [],
      /**time数组、lyric数组合并之后的数组 */
        mergeArr = [];

      /**将歌词转换成数组 */
      arr = lyric.split("\n");

      for (let i of arr) {
        /**获取歌词 */
        let lrc = i.split("]")[1];
        if (lrc == "" || lrc == undefined) continue;
        lyricArr.push(lrc);

        /**处理时间 */
        let resTime = RegExp.exec(i)[1];
        let resTime2 = resTime.split(":");
        let min = parseInt(resTime2[0]) * 60;
        let sec = parseFloat(resTime2[1]);
        let time = parseFloat(Number(min + sec).toFixed(2)); //toFixed返回值是String
        timeArr.push(time);
      }
      /**合并数组 */
      for (let i = 0, length = timeArr.length; i < length; i++) {
        let lrc=[timeArr[i],lyricArr[i]]
        // let obj = new lyricItem(timeArr[i], lyricArr[i]);
        mergeArr.push(lrc);
      }
      /**排序 */
      mergeArr = mergeArr.sort((a, b) => {
        // return a.time - b.time;
        return a[0]-b[0];
      });
      console.log(mergeArr);
      return mergeArr;
    }