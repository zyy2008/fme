$(function() {
	! function() {
		var i = {
			aspectRatio: 1 / 1
		};
	}()
});
(function(c) {
	var Cro = function() {}
	c.extend(Cro.prototype, {
		orientation: null,
		simg: null,
		simg2: null,
		urldata: null,
		view: null,
		num: 0,
		sbx: null,
		sby: null,
		n: 0,
		onReady: function() {
			var that = this;
			mui.init();
			that.bindEvent();
			that.view = plus.webview.currentWebview();
			var how = plus.webview.currentWebview().how;
			that.simg = document.createElement("img");
			that.simg.setAttribute("id", "simg");
			document.body.appendChild(that.simg);
			var url = that.view.path;
			var img = document.createElement("img");
			img.setAttribute("src", url);
			img.addEventListener("load", function() {
				EXIF.getData(img, function() {
					var orientation = EXIF.getAllTags(this).Orientation;
					$("#im").attr("src", that.loadcopyImg(img, orientation));
					that.cropperImg(how);
				});
			});
			
		},
		cropperImg: function(how) {
			var that = this;
			if(how === "1 / 1"){
				$('#cropper-example-1 > img').cropper({
					aspectRatio: 1 / 1,
					autoCropArea: 1,
				 	viewMode: 1,
					strict: true,
					background: false,
			        dragMode: 'move',
			        restore: false,
			        guides: false,
			        highlight: false,
			        cropBoxMovable: false,
			        cropBoxResizable: false,
					crop: function(data) {
						that.urldata = that.base64(data);
					}
				});
			}else{
				$('#cropper-example-1 > img').cropper({
					aspectRatio: 16 / 9,
					autoCropArea: 1,
				 	viewMode: 1,
					strict: true,
					background: false,
			        dragMode: 'move',
			        restore: false,
			        guides: false,
			        highlight: false,
			        cropBoxMovable: false,
			        cropBoxResizable: false,
					crop: function(data) {
						that.urldata = that.base64(data);
					}
				});
			};
			
		},
		loadcopyImg: function(img, opt) {
			var that = this;
			var canvas = document.createElement("canvas");
			var square = 500;
			var imageWidth, imageHeight;
			if (img.width > img.height) {
				imageHeight = square;
				imageWidth = Math.round(square * img.width / img.height);
			} else {
				imageHeight = square; //this.width;
				imageWidth = Math.round(square * img.width / img.height);
			}
			canvas.height = imageHeight;
			canvas.width = imageWidth;
			if (opt == 6) {
				that.num = 90;
			} else if (opt == 3) {
				that.num = 180;
			} else if (opt == 8) {
				that.num = 270;
			}
			if (that.num == 360) {
				that.num = 0;
			}

			var ctx = canvas.getContext("2d");
			ctx.translate(imageWidth / 2, imageHeight / 2);
			ctx.rotate(that.num * Math.PI / 180);
			ctx.translate(-imageWidth / 2, -imageHeight / 2);
			ctx.drawImage(img, 0, 0, imageWidth, imageHeight);
			//document.getElementById("test").appendChild(canvas);
			var dataURL = canvas.toDataURL("image/jpeg", 1);
			return dataURL;
		},
		bindEvent: function() {
			document.getElementById("quxiao").addEventListener("click", function() {
				window.cro.view.close();
			});
			document.getElementById("xuanqu").addEventListener("click", function() {
				window.cro.showFace(window.cro.urldata);
			});
		},
		base64: function(data) {
			var w =window.cro.view.w;
			var h =window.cro.view.h;
			console.log(w+ '  '+h );
			var that = this;
			var img = document.getElementById("im");

			var canvas = document.createElement("canvas");
			canvas.height = h;
			canvas.width = w;

			var bx = data.x;
			var by = data.y;
			var ctx = canvas.getContext("2d");
			ctx.drawImage(img, bx, by, data.width, data.height, 0, 0, w, h);
			var dataURL = canvas.toDataURL("image/jpeg", 0.5);
			return dataURL;
		},
		getdata: function() {
			var view1 = plus.webview.getWebviewById("modifyInfo.html");
			mui.fire(view1, 'headimg', {});
			window.cro.view.close();
		},
		showFace: function(str) {
			bitmap = new plus.nativeObj.Bitmap("app");
			window.cro.view.draw(bitmap,function(){
				bitmap.loadBase64Data(str, function(){
					bitmap.save( "_doc/a.png"
						,{overwrite:true}
						,function(i){
							var pw = plus.webview.getWebviewById(window.cro.view.pid);
							var turl = i.target;
							mui.fire(pw,'upd',{turl:turl});
							window.cro.view.close();
						}
						,function(e){
							console.log('保存图片失败：'+JSON.stringify(e));
						});
				}, function(){
					console.log('加载Base64图片数据失败：'+JSON.stringify(e));
				} );
				
				
			},function(e){
				console.log('绘制图片失败：'+JSON.stringify(e));
			});
		}
	});
	window.cro = new Cro();
	c.plusReady(function() {
		window.cro.onReady();
	})
})(mui)