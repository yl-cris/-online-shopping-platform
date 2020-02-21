function changeTo(obj) {
    obj.style.backgroundColor = "red";
}
function changeBack(obj) {
    obj.style.backgroundColor = "#6c6669";
}
window.onload = function () {

    //获取id为“test”的元素
    var oTab = document.getElementById("test");
    //获取ul标签
    var oUl = oTab.getElementsByTagName("ul")[0];
    //获取li标签
    var olist = oUl.getElementsByTagName('li');
    //获取div标签
    var odiv = oTab.getElementsByTagName('div');

    for (var i = 0; i < olist.length; i++) {
        olist[i].index = i;
        olist[i].onclick = function () {
            for (var n = 0; n < odiv.length; n++) {

                //olist[n].className = "";
                //把所有的div标签内的内容的css样式设置为‘hide’
                odiv[n].className = "hide";
            }
            //当前页面显示的css样式为“on”
            this.className = "on";
            //选中元素的css样式设置为“hh”
            odiv[this.index].className = "hh";
        }
    };
    //获取元素container
    var con = this.document.getElementById('container');
    //获取图片列表元素list
    var list = this.document.getElementById('list');
    //获取4个按钮
    var btn = this.document.getElementById('buttons').getElementsByTagName('span');
    //获取左右箭头
    var previous = this.document.getElementById('previous');
    var next = this.document.getElementById('next');
    //点亮小圆点
    var index = 1;
    var animated=false;
    var timer;

    //showBtn()
    function showBtn() {
        for (i = 0; i < btn.length; i++) {
            if (btn[i].className == 'onn') {
                btn[i].className = '';
                break;
            }
        }
        btn[index - 1].className = 'onn';
    }
    //定义animate函数
    function animate(offset) {
        animated=true;
        var newLeft = parseInt(list.style.left) + offset;
        //给图片加动画
        var time = 300;//定义总的动画时间
        var interV = 10;//定义时间间隔
        var speed = offset/(time/interV);//定义轮播速度（每次轮播的位移量）
        
        function goOn() {
            if ((speed<0 && parseInt(list.style.left)>newLeft) || (speed>0 && parseInt(list.style.left)<newLeft)) {
                list.style.left = parseInt(list.style.left) + speed + 'px';
                setTimeout(goOn,interV);
            }
            else {
                animated=false;
                list.style.left = newLeft + 'px';
                if (newLeft > -600) {
                    list.style.left = -2400 + 'px';
                }
                if (newLeft < -2400) {
                    list.style.left = -600 + 'px';
                }
            }
        }

        goOn();
    }
    //图片的自动播放
    function play(){
        timer=setInterval(function(){
            next.onclick();
        },3000);
    }
    //图片的暂停播放
    function stop(){
        clearInterval(timer);
    }
    //给previous绑定onclick事件
    previous.onclick = function () {
        index = index - 1;
        if (index < 1) {
            index = 4;
        }
        showBtn();
        if (animated==false) {
            animate(600);
        }
        

    }
    //给next绑定onclick实践
    next.onclick = function () {
        index = index + 1;
        if (index > 4) {
            index = 1;
        }
        showBtn();
        if (animated==false) {
            animate(-600);
        }
        
    }
    //点击小圆点切换图片
    for (i = 0; i < btn.length; i++) {
        btn[i].onclick = function () {
            if (this.className == 'onn') {
                return;
            }
        var myIndex = parseInt(this.getAttribute('index'));
        var offs = -600 * (myIndex - index);
        index = myIndex;
        showBtn();
        if (!animated) {
            animate(offs);
        }
    }
}
        con.onmouseover=stop;
        con.onmouseout=play;
        play();
    }


