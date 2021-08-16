// 首页js代码
// 原生js代码
// 浏览器窗口程序资源全部加载完毕 之后 触发
window.onload = function() {
    fe15.headBgFn();
    fe15.goTopFn();
    fe15.downTimeFn();
    fe15.lunboFn();
    fe15.conzyhd();
}

// 对象统一管理所有的方法
var fe15 = {
    toolFn: { // 小工具方法
        // 补零函数
        zeroFn(m) {
            return m < 10 ? '0' + m : m
        }
    },
    // 1 顶部背景颜色变化：随着滚动条不断向下滚动  透明度从0 变化到1 
    headBgFn() {

        // 1 获取元素
        var oWrapper = document.querySelector('header div.wrapper');
        var iH = document.querySelector('.banner').offsetHeight;
        // console.log(iH);
        // 2 功能实现
        window.addEventListener('scroll', function() {
            var iTop = document.documentElement.scrollTop;
            // console.log('哈哈哈滚动啦，值为', iTop); // 50/160
            // console.log(oWrapper);
            oWrapper.style.backgroundColor = 'rgba(226,52,55,' + (iTop / iH) + ')';
        });

    },

    // 2 轮播图效果
    lunboFn() {
        // 功能分析 无缝轮播
        //  初始化 的时候 在第一张的前面要加一个和最后一张一摸一样的图  
        //              在最后一张的后面添加和第一张一摸一样的图
        //  1 轮播图自动走起来  （定时器）
        //  2 小圆圈跟着走
        //  3 手指触摸之后 可以控制向左滑动 或者向右滑动
        //  4 手指触摸滑动的时候 可以让轮播图跟着走

        // 代码编写
        // 1 获取元素
        var oUl = document.querySelector('.banner>ul');

        var navs = document.querySelectorAll('.banner>ol.nav>li');

        // console.log(aLi);

        // 2 初始化准备工作
        // 无缝
        var firstLi = oUl.children[0].cloneNode(true);
        var lastLi = oUl.children[oUl.children.length - 1].cloneNode(true);
        // 初始化设置一个变量作为计数器 
        var num = 1;
        oUl.appendChild(firstLi);
        oUl.insertBefore(lastLi, oUl.children[0]);

        var iW = oUl.children[0].offsetWidth;


        oUl.style.transform = "translateX(" + num * -iW + "px)";


        // 3 开启定时器
        var timer = setInterval(function() {

            num++;

            oUl.style.transform = "translateX(" + num * -iW + "px)";
            oUl.style.transition = 'all 0.3s';

        }, 2000);

        //   transitionend 过渡完成事件
        oUl.addEventListener('transitionend', function() {
                // console.log('哈哈哈我过渡完成了');
                if (num >= oUl.children.length - 1) {
                    num = 1;
                    oUl.style.transform = "translateX(" + num * -iW + "px)";
                    oUl.style.transition = 'none';
                }
                if (num <= 0) {
                    num = oUl.children.length - 2;
                    oUl.style.transform = "translateX(" + num * -iW + "px)";
                    oUl.style.transition = 'none';
                }
                document.querySelector('.banner>ol.nav>li.active').classList.remove('active');
                navs[num - 1].classList.add('active');
            })
            // ==================================
            // 手指控制
        var startX = 0; // 初始化一个变量 记录开始触摸的坐标点
        var moveX = 0; // 手指移动过程中的 x坐标
        var cha = 0; // 差值
        oUl.addEventListener('touchstart', function(e) {
            clearInterval(timer);
            timer = null;
            // 记录一下当前的手指触摸的坐标点
            // console.log(e.touches[0].clientX, e.touches[0].clientY);
            startX = e.touches[0].clientX;

        })
        oUl.addEventListener('touchmove', function(e) {
                // 滑动的手指坐标
                moveX = e.touches[0].clientX;
                cha = startX - moveX;

                oUl.style.transform = "translateX(" + (num * -iW + -cha) + "px)";
                oUl.style.transition = 'none';
            })
            // 手指离开屏幕了
        oUl.addEventListener('touchend', function() {
            //  

            if (cha > 0 && cha > iW / 3) {
                // 手指向左了 
                num++;
            } else if (cha < 0 && Math.abs(cha) > iW / 3) {
                // 向右滑动
                num--;
            }
            oUl.style.transform = "translateX(" + num * -iW + "px)";
            oUl.style.transition = 'all 0.3s';

            // 开启定时器
            timer = setInterval(function() {
                num++;
                oUl.style.transform = "translateX(" + num * -iW + "px)";
                oUl.style.transition = 'all 0.3s';
            }, 2000);

        })


    },

    // 3 商品分类区域的 左右滑动
    conzyhd(){
        var con = document.querySelector('.con>ul');
        // 手指控制
        var startX = 0; // 初始化一个变量 记录开始触摸的坐标点
        var moveX = 0; // 手指移动过程中的 x坐标
        var cha = 0; // 差值
        var yd = 0;
        con.addEventListener('touchstart', function(e) {
            // 记录一下当前的手指触摸的坐标点
            // console.log(e.touches[0].clientX, e.touches[0].clientY);
            startX = e.touches[0].clientX;

        })
        var iW = con.children[0].offsetWidth;
        con.addEventListener('touchmove', function(e) {
                // 滑动的手指坐标
                moveX = e.touches[0].clientX;
                cha = startX - moveX;
                yd = ( -iW + -cha)
                // console.log(yd);
                if( yd > 0){
                    yd = 0;
                 } else if(yd<-100){
                    yd = -100;
                 }
                con.style.transform = "translateX(" + yd + "px)";
                
                con.style.transition = 'none';
            })
        },

    // 4 倒计时
    downTimeFn() {
        var aDiv = document.querySelectorAll('.time>div');
        console.log(aDiv);
        // 假定时间 60*60*3
        var totalTime = 60 * 60 * 3;
        console.log(this);

        var fn = () => {
            // 总秒数
            totalTime--;

            var h = parseInt(totalTime / 3600); // 整小时数
            var m = parseInt(totalTime % 3600 / 60); // 整分钟数
            var s = totalTime % 60; // 秒数

            aDiv[0].innerHTML = this.toolFn.zeroFn(h);
            aDiv[1].innerHTML = this.toolFn.zeroFn(m);
            aDiv[2].innerHTML = this.toolFn.zeroFn(s);
            if (totalTime <= 0) {
                totalTime = 0;
                clearInterval(timer);
                timer = null;
                this.downTimeFn();
            }

        }
        var timer = setInterval(fn, 1000);
    },
    // 5 京东秒杀区域的滑动

    // 6 返回顶部
    goTopFn() {
        var goTop = document.querySelector('.goTop');
        // 显示隐藏
        window.addEventListener('scroll', function() {
            if (document.documentElement.scrollTop >= document.documentElement.clientHeight) {
                goTop.style.display = 'block';
            } else {
                goTop.style.display = 'none';
            }
        });

        goTop.addEventListener('touchend', function() {

            var currentTop = document.documentElement.scrollTop;


            var timer = setInterval(function() {
                currentTop -= 20;
                if (currentTop <= 0) {
                    currentTop = 0;
                    clearInterval(timer);
                    timer = null;
                }
                document.documentElement.scrollTop = currentTop;

            }, 8);


        });

        // 移动端不推荐使用这个click事件  鼠标点击事件 有300ms延迟
        // 推荐使用移动端事件： 
        // touchstart  手指按下事件
        // touchmove 手指滑动事件
        // touchend  手指离开屏幕事件 
        //  touchcancel:因为系统程序原因中断手指触摸 则触发取消事件

        // 这些移动端事件 触发时候 函数中都可以接收事件对象
        // 事件对象中 有这么几个东西
        // changedTouches 改变变化的手指集合列表
        // touches： 当前屏幕上 所有的手指集合列表
        // targetTouches ： 当前目标元素身上的手指集合列表
        // document.addEventListener('touchstart', function(e) {
        //     // console.log(e);
        //     console.log('哈哈哈我触发了touchstart');
        // })
        // document.addEventListener('touchmove', function(e) {
        //     // console.log(e);
        //     console.log('哈哈哈我触发了touchmove');
        // })
        // document.addEventListener('touchend', function(e) {
        //     // console.log(e);
        //     console.log('哈哈哈我触发了touchend');
        // })
        // document.addEventListener('touchcancel', function() {
        //     console.log('哈哈哈触摸中断了');
        // })

        // setTimeout(function() {
        //     alert('哈哈哈我是弹框')
        // }, 3000);

    }
}