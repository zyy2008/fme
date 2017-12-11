var wgtVer;
var SITE		= 'http://test.jikechufa.com/wap/';
var UPLOADDIR	= 'http://test.jikechufa.com/';
function plusReady(){
	// 获取本地应用资源版本号
	plus.runtime.getProperty(plus.runtime.appid,function(inf){
		wgtVer = inf.version;//'"'+inf.version+'"';
//		alert("当前应用版本："+wgtVer);
	});
}
if(window.plus){
	plusReady();
}else{
	document.addEventListener('plusready',plusReady,false);
}
// 检测更新
var checkUrl= SITE + "my/ajaxUpdateChk";
function checkUpdate(){
	plus.nativeUI.showWaiting("检测更新...");
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		switch(xhr.readyState){
			case 4:
			plus.nativeUI.closeWaiting();
			if(xhr.status==200){
//				console.log("检测更新成功："+xhr.responseText);
				var newVer=xhr.responseText;
//alert(newVer +"当前应用版本："+ wgtVer);
				if(wgtVer&&newVer&&(wgtVer!=newVer)){
					var btn = ["立即更新","下次再说"];
					plus.nativeUI.confirm("发现新版本！",function(e){
						if (e.index == 0) {
							switch (plus.os.name ) {
								case "Android":
									downWgt();
									break;
								case "iOS":
									var appUrl = "https://itunes.apple.com/cn/app/id1039208504";
									plus.runtime.openURL(appUrl);
									break;
							}
							// 下载升级包
						} else {
							return;
						}
					},"更新",btn)

				}else{
					plus.nativeUI.alert("无新版本可更新！");
				}
			}else{
				console.log("检测更新失败！");
				plus.nativeUI.alert("检测更新失败！");
			}
			break;
			default:
			break;
		}
	}
	xhr.open('GET',checkUrl);
	xhr.send();
}
// 下载wgt文件
var wgtUrl=UPLOADDIR + "/uploads/app_soft/follow_me.wgt";
//console.log(wgtUrl);
function downWgt(){
	plus.nativeUI.showWaiting("下载wgt文件...");
	plus.downloader.createDownload( wgtUrl, {filename:"_doc/update/"}, function(d,status){
		if ( status == 200 ) { 
//			alert("下载wgt成功："+d.filename);
			installWgt(d.filename);	// 安装wgt包
		} else {
//			console.log("下载wgt失败！");
			plus.nativeUI.alert("下载wgt失败！");
		}
		plus.nativeUI.closeWaiting();
	}).start();
}
// 更新应用资源
function installWgt(path){
	plus.nativeUI.showWaiting("安装wgt文件...");
	plus.runtime.install(path,{},function(){
		plus.nativeUI.closeWaiting();
//		console.log("安装wgt文件成功！");
		plus.nativeUI.alert("应用资源更新完成！",function(){
			plus.runtime.restart();
		});
	},function(e){
		plus.nativeUI.closeWaiting();
//		console.log("安装wgt文件失败["+e.code+"]："+e.message);
		plus.nativeUI.alert("安装wgt文件失败["+e.code+"]："+e.message);
	});
}
