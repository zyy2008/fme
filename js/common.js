// 定义全局变量
// 站点域名 -- 101.200.172.69 
//var SITE		= 'http://www.followme.com/wap/';
//var UPLOADDIR	= 'http://www.followme.com';
var SITE		= 'http://test.jikechufa.com/wap/';
var UPLOADDIR	= 'http://test.jikechufa.com';
//var SITE 		= 'http://192.168.1.134/wap/';
//var UPLOADDIR 	= 'http://192.168.1.134';
var TOPWVIEWID	= '';
//计算对象数组的长度
function objSize(obj){
	var size = 0, key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) size++;
	}
	return size;
}
//alert方法重写，适用于手机端
function alert(msg){
	plus.nativeUI.toast(msg);
}

//添加、删除、切换className
function hasClass(obj, cls) {  
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
}
function addClass(obj, cls) {  
    if (!hasClass(obj, cls)) obj.className += " " + cls;  
}  
function removeClass(obj, cls) {  
    if (hasClass(obj, cls)) {  
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
        obj.className = obj.className.replace(reg, '');  
    }  
}  
function toggleClass(obj,cls){  
    if(hasClass(obj,cls)){  
        removeClass(obj, cls);  
    }else{  
        addClass(obj, cls); 
    }  
}
//判断数组中是否存在某个元素
function in_array(val, arr)
{
	for (var i = 0; i < arr.length; i++) {
        if(arr[i] == val) {
        	return true;
        }
    }
    return false;
}
//删除数组中某个元素
function removeArrayByVal(arr, val)
{
	var flag 	= -1;
	for (var i = 0; i < arr.length; i++) {
        if(arr[i] == val) {
        	flag = i;
        }
    }
    var index = arr.indexOf(val);
    if (index > -1) {
        arr.splice(index, 1);
    }
}
// 检测变量是否为空
function empty(val) {
	if(val=='' || val==undefined || val==null){
		return true;
	}else {
		return false;
	}
}

//检查checkbox是否选择，只要选择一个就返回true
function chkCheckbox(obj){      
	for(var i=0; i<obj.length; i++){      
		if(obj[i].checked){      
			return true;
		}      
	}      
	return false;     
}
//取得复选框的值 return array
//obj 	= document.getElementsByName("objName");
function getCheckboxVal(obj){
	var val = new Array();
	for(var i=0;i<obj.length;i++){
	    if(obj[i].checked==true){
			val.push(obj[i].value);
	    }
	}
  	return val;
}
//取得单选框的值
//obj 	= document.getElementsByName("objName");
function getRadioVal(obj){
	var val = false;
	for(var i=0;i<obj.length;i++){
	    if(obj[i].checked==true){
			val=obj[i].value;
			break;
	    }
	}
  	return val;
}
//radio 默认选中
function setRadioChecked(radio_oj,aValue){//传入一个对象
   for(var i=0;i<radio_oj.length;i++) {//循环
        if(radio_oj[i].value==aValue){  //比较值
            radio_oj[i].checked=true; //修改选中状态
            break; //停止循环
        }
   }
}
function openwindow(url,extras){
	mui.openWindow({
		url: url,
		id:url,
		extras:extras,
		show: {
//			aniShow: 'pop-in',
			duration:500
		},
		styles: {
			popGesture: 'hide'
		},
		waiting:{
			autoShow:false
		}
	});
}