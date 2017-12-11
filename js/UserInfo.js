(function($, owner) {
	
	var SITE = "http://test.jikechufa.com/";
	/**
	 * 获取验证码
	 **/
	
	owner.getcode = function(btn,getInfo, callback){
		var checkNetwork = owner.checknetwork();
		var regcodeUrl = SITE + '/wap/auth/sendCaptcha';
		callback = callback || $.noop;
		getInfo = getInfo || {};
		btn = btn || {};
		if(checkNetwork){
			mui.get(regcodeUrl,getInfo,function(data){
				if (data.code > 0) {
					time(btn);
					return callback(data.msg);
				}else{
					return callback(data.msg);
				}
			},'json');
		}else{
			callback('无法连接服务器，请检查网络或稍后重试');
		};
	};
	
	/**
	 * 找回密码
	 **/
	owner.forgetPassword = function(forgetInfo, callback) {
		var checkNetwork = owner.checknetwork();
		var forgetUrl = SITE + '/wap/auth/forgetPassword';
		forgetInfo = forgetInfo || $.noop;
		callback = callback || {};
		if(checkNetwork){
			mui.get(forgetUrl,forgetInfo,function(data){
				if (data.code > 0) {
					return callback(data.data);
				}else{
					mui.back();
					return callback('修改密码成功！');
				}
			},'json');
		}else{
			callback('无法连接服务器，请检查网络或稍后重试');
		};
	};
	
	/**
	 * 用户登录
	 **/
	owner.login = function(loginInfo, callback) {
		var checkNetwork = owner.checknetwork();
		var loginUrl = SITE+"/wap/auth/login";
		callback = callback || $.noop;
		loginInfo = loginInfo || {};
		var user_name = loginInfo.username;
		if(checkNetwork){
			mui.post(loginUrl,loginInfo,function(data){
				if (data.code > 0) {
					owner.sessionId(data.sessionId);
					owner.username(user_name);
					return callback();
				}else{
					return callback(data.msg);
				};
			},'json')
		}else{
			return callback('无法连接服务器，请检查网络或稍后重试');
		};
	
	};
	/**
	 * 新用户注册
	 **/
	owner.reg = function(regInfo, callback) {
		var checkNetwork = owner.checknetwork();
		var regUrl = SITE + '/wap/auth/reg';
		callback = callback || $.noop;
		regInfo = regInfo || {};
		if(checkNetwork){
			mui.post(regUrl,regInfo,function(data){
				if (data.code > 0) {
					return callback();
				}else{
					return callback(data.msg);
				};
			},'json');
		}else{
			return callback('无法连接服务器，请检查网络或稍后重试');
		};
	};

	
	/**
	 * 验证码等待时间
	 **/
	
	var wait=60;  
	function time(o) {  
        if (wait == 0) {  
            o.removeAttribute("disabled");            
            o.value="获取验证码";  
            wait = 60;  
        } else {  
            o.setAttribute("disabled", true);  
            o.value="重新发送(" + wait + ")";  
            wait--;  
            setTimeout(function() {  
                time(o)  
            },  
            1000)  
        }  
    };
	/**
	 * 检查网络连接
	 **/
	owner.checknetwork = function(){
		var network = plus.networkinfo.getCurrentType();
		if(network<2){
			return false;
		}else{
			return true;
		}
	};
	/**
	 * 清除登录信息
	 **/
	owner.clear = function() {
		plus.storage.removeItem('sessionId');
	};
	/**
	 * 清除用户名称
	 **/
	owner.clear_Username = function() {
		plus.storage.removeItem('username');
	};
	/**
	 * 检查是否包含自动登录的信息
	 **/
	owner.has_login = function(){
		var sessionId = owner.sessionId();
		if (! sessionId) {
			return false;
		}
		return true;
	};
	/**
	 * 存储登陆信息
	 **/
	owner.sessionId = function() {
		if (arguments.length == 0) {
			return plus.storage.getItem('sessionId');
		}
		if (arguments[0] === '') {
			plus.storage.removeItem('sessionId');
			return;
		}
		plus.storage.setItem('sessionId', arguments[0]);
	};
	
	/**
	 * 存储用户名称信息
	 **/
	owner.username = function() {
		if (arguments.length == 0) {
			return plus.storage.getItem('username');
		}
		if (arguments[0] === '') {
			plus.storage.removeItem('username');
			return;
		}
		plus.storage.setItem('username', arguments[0]);
	};
	
	
}(mui, window.app = {}));