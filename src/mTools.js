/*
 * mTools
 */
;(function (factory){
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define(factory);
	} else {

		// Browser globals
		mTools = factory();
	}
})(function(){
	/*
	 * 基础通用方法
	 */
	var base = {
		isArray: function(arr){
			return Object.prototype.toString.call(arr) === '[object Array]';
		},
		each: function (obj, fn){
			var len = obj.length,i = 0;

			if(this.isArray(obj)){
				//如果是数组
				for(; i<len; i++){
			       if ( false === fn.call(obj[i], obj[i], i) ){break;}
			    }
			}else{
				//如果是对象
			    for( i in obj ){
			       if(false === fn.call(obj[i],i+1,obj[i])){break;}
			    }
			}
		}
	};

	/*
	 * 正则相关方法
	 */
	var regCheck = {
		'isIdcard': function(strId){
            var patrn = /^\s*\d{15}\s*$/;
            var patrn1 = /^\s*\d{16}[\dxX]{2}\s*$/;
            if(!patrn.exec(strId) && !patrn1.exec(strId)){return false;}
            return true;
        },
        'isName': function(strName){
            var onlyName = strName.split('·').join('');
            var patrn = /^\s*[\u4e00-\u9fa5]{1,}[\u4e00-\u9fa5.·]{0,15}[\u4e00-\u9fa5]{1,}\s*$/; 
            if(!patrn.exec(onlyName)){return false;}
            return true;
        },
        'isMobilePhone': function(strPhone){
            var  patrn = /^[1][0-9]{10}$/;
            if(!patrn.exec(strPhone)){return false;}
            return true;
        },
        'isNumber': function(strNumber){
        	var patrn = /^[0-9]*$/;
        	if(!patrn.exec(strNumber)){return false;}
        	return true;
        }
	};


	/*
	 * 浏览器相关方法
	 */
	var browser = {
		isIos: function(){
			return (navigator.userAgent.indexOf("iPhone") === -1) ? false: true;
		},
		isAndroid: function(){
			return (window.navigator.userAgent.toLowerCase().indexOf("android") === -1) ? false : true;
		},
		isBrowser: function(browserUAName){
			return (window.navigator.userAgent.toLowerCase().indexOf(browserUAName) === -1) ? false: true;
		},
		isWeiXin: function(){
			//return /micromessenger/i.test(navigator.userAgent.toLowerCase());
			return this.isBrowser("micromessenger");
		},
		isUC: function(){
			return this.isBrowser("ucbrowser");
		},
		isQQ: function(){
			return this.isBrowser("mqqbrowser");
		},
		isSafari: function(){
			return this.isBrowser("Safari");
		}
	};

	/*
	 * url
	 */
	var urlParse = {};

	/*
	 * cookie
	 */
	var cookie = {
		setCookie: function (key, value, expiredays){
			var exdate=new Date()
			exdate.setDate(exdate.getDate()+expiredays);
			document.cookie=key+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
		},
		getCookie: function(key){
			if (document.cookie.length > 0) {
			    c_start = document.cookie.indexOf(key + "=");
			    if (c_start != -1) {
			        c_start = c_start + key.length + 1;
			        c_end = document.cookie.indexOf(";", c_start);
			        if (c_end == -1) c_end = document.cookie.length;
			        return unescape(document.cookie.substring(c_start, c_end));
			    }
			}
			return "";
		}
	};

	/*
	 * load
	 */
	var loader = {
		imgLoader: function(imgs, cb){
			setTimeout(function(){
				var imgsLen = imgs.length;
				var count = 0;
				base.each(imgs, function (v_img, i_img){
					(function (v_img, i_img){
						var imgItem = document.createElement("img");
						imgItem.setAttribute("style", "display:none;");
						imgItem.setAttribute("src", v_img);
						var imgD = document.body.appendChild(imgItem);
						imgD.onload = function(){
							count += 1;
							cb && cb({
								"count": count,
								"length": imgsLen,
								"img": v_img
							});
							imgD.parentNode.removeChild(imgD); 
						};
					})(v_img, i_img);
				});
			}, 1);

		}
	};

	/****************************************************************
	 * public
	 */
	var mTools = {
		/*base*/
		isArray: base.isArray,
		each: base.each,
		/*reg*/
		isIdcard: regCheck.isIdcard,
		isName: regCheck.isName,
		isMobile: regCheck.isMobilePhone,
		isNumber: regCheck.isNumber,
		/*browser*/
		isIos: browser.isIos,
		isAndroid: browser.isAndroid,
		Browser: browser,
		/*cookie*/
		setCookie: cookie.setCookie,
		getCookie: cookie.getCookie,
		/*load*/
		imgLoader: loader.imgLoader
	};

	return mTools;
});