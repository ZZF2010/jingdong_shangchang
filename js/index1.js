//搜索框滚轮时固定颜色
var wrap = document.getElementsByClassName('wrapper')[0]
// console.log(wrap);
window.onscroll = function(){
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // console.log(scrollTop)
    if (scrollTop > 0){
        wrap.style.background = '#e23437';
    } else if (scrollTop == 0){
        wrap.style.background = 'none';
    }

    //返回顶部显示和隐藏
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if(scrollTop == 0 || scrollTop<700){
        goTop.style.display = 'none';
    } else if(scrollTop>=700) {
        goTop.style.display = 'block';
    }
}

//轮播图
var banner = document.getElementsByClassName('banner')[0];
var ulr = banner.getElementsByTagName('ul')[0];
var olr = banner.getElementsByTagName('ol')[0];
var lir = olr.getElementsByTagName('li');
var width = banner.offsetWidth;
var timer = 0;
var index = 1;
// console.log(lir)

function run(){
    timer = setInterval(function(){
        ulr.style.marginLeft = index*(-width)+'px';
        for(var i=0;i<lir.length;i++){
            lir[i].className = '';
        }
        lir[index].className = 'active';
        index++;
        if(index==6){
            index = 0;
        }
        
    },3000)
    
}
run();

//返回顶部
var goTop = document.getElementsByClassName('goTop')[0];

goTop.onclick = function(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


//京东秒杀拖拽


//瀑布流
