export function _Swiper (oSwiper) {
    // var oSwiper = document.getElementById('swiper');
    var oSwiper=oSwiper;
    var oPre = oSwiper.getElementsByClassName('pre')[0];
    var oNext = oSwiper.getElementsByClassName('next')[0];
    var oLeft = oSwiper.getElementsByClassName('left')[0];
    var oRight = oSwiper.getElementsByClassName('right')[0];
    var aLi = oSwiper.querySelectorAll('li');
    var aSpan = oSwiper.querySelectorAll('span');


    var aName = [];
    var currentIndex = 0;
    for (let item of aLi) {
        aName.push(item.classList[0]);
    }
    
    switchTo();
    setCurrent();
    clearInterval(timer);
    var timer = setInterval(() => {
        nextPic();
    }, 3000)
    oSwiper.onmouseover = function () {
        clearInterval(timer);
        oPre.style.display = 'block';
        oNext.style.display = 'block';
        oLeft.onclick = function () {
            prePic();
        }
        oRight.onclick = function () {
            nextPic();
        }
    }
    oSwiper.onmouseout = function () {
        clearInterval(timer);
        timer = setInterval(() => {
            nextPic();
        }, 3000);
        oPre.style.display = 'none';
        oNext.style.display = 'none';
    }
    /**下一张*/
    function nextPic() {
        switchNext();
        addClass();

        currentIndex++;
        if (currentIndex > 5) currentIndex = 0;

        setCurrent();
    };
    function prePic() {
        switchPre();
        addClass();
        currentIndex--;
        if (currentIndex < 0) currentIndex = 5;
        setCurrent();
    }
    function setCurrent() {
        for (let i = 0, length = aSpan.length; i < length; i++) {
            aSpan[i].className = ''
        }
        aSpan[currentIndex].className = 'action';
    }
    function switchTo() {
        for (let i = 0, length = aSpan.length; i < length; i++) {
            aSpan[i].index = i;
            aSpan[i].onclick = function () {
                for (let j = 0, length = aSpan.length; j < length; j++) {
                    aSpan[j].className = '';
                }
                this.className = 'action';
                if (this.index > currentIndex) {
                    for (let i = currentIndex, length = this.index; i < length; i++) {
                        switchNext();
                    }
                    addClass();
                }
                else {
                    for (let i = this.index, length = currentIndex; i < length; i++) {
                        switchPre();
                    }
                    addClass();
                }
                currentIndex = this.index;

            }
        }
    }
    /**给Li添加类*/
    function addClass() {
        /**设置属性远比访问属性节省性能*/
        for (let i = 0, length = aLi.length; i < length; i++) {
            aLi[i].setAttribute('class', aName[i]);
        }
    }
    /**将数组所有元素向后移一位*/
    function switchNext() {
        aName.unshift(aName[aName.length - 1]);//将类名数组最后一个元素复制一份插入数组最前面
        aName.pop();//
    }
    /**将数组所有元素向前移一位*/
    function switchPre() {
        aName.push(aName[0]);
        aName.shift();
    }
}