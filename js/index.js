/*
    参数说明
    G()用来获取ID，s是ID名
    timer定义的时间函数
    iSpeed轮播的速度

 */
$(document).ready(function(){
    function G(s){
        return document.getElementById(s);
    }

    function getStyle(obj, attr){
        if(obj.currentStyle){
            return obj.currentStyle[attr];
        }else{
            return getComputedStyle(obj, false)[attr];
        }
    }

    function Animate(obj, json){
        if(obj.timer){
            clearInterval(obj.timer);
        }
        obj.timer = setInterval(function(){
            for(var attr in json){
                var iCur = parseInt(getStyle(obj, attr));
                iCur = iCur ? iCur : 0;
                var iSpeed = (json[attr] - iCur) / 4;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                obj.style[attr] = iCur + iSpeed + 'px';
                if(iCur == json[attr]){
                    clearInterval(obj.timer);
                }
            }
        }, 30);
    }

    var oPic = G("picBox");
    var oList = G("listBox");

    var oPrev = G("prev");
    var oNext = G("next");
    var oPrevTop = G("prevTop");
    var oNextTop = G("nextTop");

    var oPicLi = oPic.getElementsByTagName("li");
    var oListLi = oList.getElementsByTagName("li");
    var oplen = oPicLi.length;
    var ollen = oListLi.length;

    var oPicUl = oPic.getElementsByTagName("ul")[0];
    var oListUl = oList.getElementsByTagName("ul")[0];
    var w1 = oPicLi[0].offsetWidth;
    var w2 = oListLi[0].offsetHeight;

    oPicUl.style.width = w1 * oplen + "px";
    oListUl.style.height = (w2+9) * ollen + "px";

    var index = 0;

    var num = 4;
    var num2 = Math.ceil(num / 1.5);

    function Change(){
        Animate(oPicUl, {left: - index * w1});
        if(index < num2){
            Animate(oListUl, {top: 0});
        }else if(index + num2 <= ollen){
            Animate(oListUl, {top: - (index - num2 + 1) * w2});
        }else{
            Animate(oListUl, {top: - (ollen - num) * w2});
        }

        for (var i = 0; i < ollen; i++) {
            oListLi[i].className = "";
            if(i == index){
                oListLi[i].className = "on";
            }
        }
    }

    oNextTop.onclick = oNext.onclick = function(){
        index ++;
        index = index == ollen ? 0 : index;
        Change();
    }

    oPrev.onmouseover = oNext.onmouseover = oPrevTop.onmouseover = oNextTop.onmouseover = function(){
        clearInterval(timer);
        }
    oPrev.onmouseout = oNext.onmouseout = oPrevTop.onmouseout = oNextTop.onmouseout = function(){
        timer=setInterval(autoPlay,4000);
        }

    oPrevTop.onclick = oPrev.onclick = function(){

        index --;
        index = index == -1 ? ollen -1 : index;
        Change();
    }

    //设置自动轮播
    var timer=null;
    timer=setInterval(autoPlay,4000);
    function autoPlay(){
        index ++;
        index = index == ollen ? 0 : index;
        Change();
    }

    for (var i = 0; i < ollen; i++) {
        oListLi[i].index = i;
        oListLi[i].onclick = function(){
            index = this.index;
            Change();
        }
    }
});