(function(root){var freeExports=typeof exports=="object"&&exports&&!exports.nodeType&&exports;var freeModule=typeof module=="object"&&module&&!module.nodeType&&module;var freeGlobal=typeof global=="object"&&global;if(freeGlobal.global===freeGlobal||freeGlobal.window===freeGlobal||freeGlobal.self===freeGlobal){root=freeGlobal}var punycode,maxInt=2147483647,base=36,tMin=1,tMax=26,skew=38,damp=700,initialBias=72,initialN=128,delimiter="-",regexPunycode=/^xn--/,regexNonASCII=/[^\x20-\x7E]/,regexSeparators=/[\x2E\u3002\uFF0E\uFF61]/g,errors={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},baseMinusTMin=base-tMin,floor=Math.floor,stringFromCharCode=String.fromCharCode,key;function error(type){throw RangeError(errors[type])}function map(array,fn){var length=array.length;var result=[];while(length--){result[length]=fn(array[length])}return result}function mapDomain(string,fn){var parts=string.split("@");var result="";if(parts.length>1){result=parts[0]+"@";string=parts[1]}var labels=string.split(regexSeparators);var encoded=map(labels,fn).join(".");return result+encoded}function ucs2decode(string){var output=[],counter=0,length=string.length,value,extra;while(counter<length){value=string.charCodeAt(counter++);if(value>=55296&&value<=56319&&counter<length){extra=string.charCodeAt(counter++);if((extra&64512)==56320){output.push(((value&1023)<<10)+(extra&1023)+65536)}else{output.push(value);counter--}}else{output.push(value)}}return output}function ucs2encode(array){return map(array,function(value){var output="";if(value>65535){value-=65536;output+=stringFromCharCode(value>>>10&1023|55296);value=56320|value&1023}output+=stringFromCharCode(value);return output}).join("")}function basicToDigit(codePoint){if(codePoint-48<10){return codePoint-22}if(codePoint-65<26){return codePoint-65}if(codePoint-97<26){return codePoint-97}return base}function digitToBasic(digit,flag){return digit+22+75*(digit<26)-((flag!=0)<<5)}function adapt(delta,numPoints,firstTime){var k=0;delta=firstTime?floor(delta/damp):delta>>1;delta+=floor(delta/numPoints);for(;delta>baseMinusTMin*tMax>>1;k+=base){delta=floor(delta/baseMinusTMin)}return floor(k+(baseMinusTMin+1)*delta/(delta+skew))}function decode(input){var output=[],inputLength=input.length,out,i=0,n=initialN,bias=initialBias,basic,j,index,oldi,w,k,digit,t,baseMinusT;basic=input.lastIndexOf(delimiter);if(basic<0){basic=0}for(j=0;j<basic;++j){if(input.charCodeAt(j)>=128){error("not-basic")}output.push(input.charCodeAt(j))}for(index=basic>0?basic+1:0;index<inputLength;){for(oldi=i,w=1,k=base;;k+=base){if(index>=inputLength){error("invalid-input")}digit=basicToDigit(input.charCodeAt(index++));if(digit>=base||digit>floor((maxInt-i)/w)){error("overflow")}i+=digit*w;t=k<=bias?tMin:k>=bias+tMax?tMax:k-bias;if(digit<t){break}baseMinusT=base-t;if(w>floor(maxInt/baseMinusT)){error("overflow")}w*=baseMinusT}out=output.length+1;bias=adapt(i-oldi,out,oldi==0);if(floor(i/out)>maxInt-n){error("overflow")}n+=floor(i/out);i%=out;output.splice(i++,0,n)}return ucs2encode(output)}function encode(input){var n,delta,handledCPCount,basicLength,bias,j,m,q,k,t,currentValue,output=[],inputLength,handledCPCountPlusOne,baseMinusT,qMinusT;input=ucs2decode(input);inputLength=input.length;n=initialN;delta=0;bias=initialBias;for(j=0;j<inputLength;++j){currentValue=input[j];if(currentValue<128){output.push(stringFromCharCode(currentValue))}}handledCPCount=basicLength=output.length;if(basicLength){output.push(delimiter)}while(handledCPCount<inputLength){for(m=maxInt,j=0;j<inputLength;++j){currentValue=input[j];if(currentValue>=n&&currentValue<m){m=currentValue}}handledCPCountPlusOne=handledCPCount+1;if(m-n>floor((maxInt-delta)/handledCPCountPlusOne)){error("overflow")}delta+=(m-n)*handledCPCountPlusOne;n=m;for(j=0;j<inputLength;++j){currentValue=input[j];if(currentValue<n&&++delta>maxInt){error("overflow")}if(currentValue==n){for(q=delta,k=base;;k+=base){t=k<=bias?tMin:k>=bias+tMax?tMax:k-bias;if(q<t){break}qMinusT=q-t;baseMinusT=base-t;output.push(stringFromCharCode(digitToBasic(t+qMinusT%baseMinusT,0)));q=floor(qMinusT/baseMinusT)}output.push(stringFromCharCode(digitToBasic(q,0)));bias=adapt(delta,handledCPCountPlusOne,handledCPCount==basicLength);delta=0;++handledCPCount}}++delta;++n}return output.join("")}function toUnicode(input){return mapDomain(input,function(string){return regexPunycode.test(string)?decode(string.slice(4).toLowerCase()):string})}function toASCII(input){return mapDomain(input,function(string){return regexNonASCII.test(string)?"xn--"+encode(string):string})}punycode={version:"1.3.1",ucs2:{decode:ucs2decode,encode:ucs2encode},decode:decode,encode:encode,toASCII:toASCII,toUnicode:toUnicode};if(typeof define=="function"&&typeof define.amd=="object"&&define.amd){define("punycode",function(){return punycode})}else if(freeExports&&freeModule){if(module.exports==freeExports){freeModule.exports=punycode}else{for(key in punycode){punycode.hasOwnProperty(key)&&(freeExports[key]=punycode[key])}}}else{root.punycode=punycode}})(this);var _uiconv=_uiconv||[];if(typeof uiinit=="undefined"){var a="0123456789".split(""),uiinit="";for(var i=0;i<7;i++){uiinit+=a[Math.floor(Math.random()*a.length)]}}(function(){function randobet(n){var a="0123456789".split(""),s="";for(var i=0;i<n;i++){s+=a[Math.floor(Math.random()*a.length)]}return s}function getuid(mode,key,period,domains){var arr=[],date=new Date;if(mode==1||mode==2&&navigator.userAgent.toLowerCase().indexOf("safari")==-1){return""}if(document.cookie){arr=document.cookie.split(";");for(var i=0;i<arr.length;i++){var str=arr[i].replace(/^\s+|\s+$/g,"");var len=str.indexOf("=");if(str.substring(0,len)==key)return unescape(str.slice(len+1))}}var exp=new Date;if(period){var nowtime=exp.getTime();exp.setTime(nowtime+period*1e3)}else{var nowtime=exp.getTime();exp.setTime(nowtime+2*365*24*60*60*1e3)}var r=randobet(4);var m=date.getMonth()+1,d=date.getDate(),h=date.getHours(),i=date.getMinutes(),s=date.getSeconds();var num=String(date.getFullYear())+(String(m).length==1?"0":"")+String(m)+(String(d).length==1?"0":"")+String(d)+(String(h).length==1?"0":"")+String(h)+(String(i).length==1?"0":"")+String(i)+(String(s).length==1?"0":"")+String(s)+String(r);var domain=location.hostname;for(var i=0;i<domains.length;i++){if((domain+" ").indexOf(domains[i]+" ")!==-1){domain=domains[i];break}}document.cookie=key+"="+num+"; expires="+new Date(exp).toUTCString()+"; path=/; domain="+domain;return num}function get_sample_flag(sample_rate,fp){if(!sample_rate){return false}if(!fp){fp=randobet(4)}else{fp=fp.slice(-4)}if(fp%100>=sample_rate){return true}else{return false}}function sendLog(hash_orig,conf){if(conf["sample_flag"]){return false}var hash={};for(var key in hash_orig){if(hash_orig.hasOwnProperty(key))hash[key]=hash_orig[key]}var img=document.createElement("img");img.async=true;var src=conf["host"]+"?uisv="+conf["uisv"]+"&from=ui3";var encode_keys=["lg_id","sb","ref","uigr_1","uigr_2","uigr_3","uigr_4","uigr_5","uigr_6","uigr_7","uigr_8","uigr_9","uigr_10"];for(var i=0;i<encode_keys.length;i++){if(hash[encode_keys[i]]){hash[encode_keys[i]]=encodeURIComponent(hash[encode_keys[i]])}}if(hash["url"]){var parser=document.createElement("a");parser.href=hash["url"];var alphabet_reg=new RegExp("^"+"[\\dA-Za-z-]+"+"$","i");var sub_domains=parser.hostname.split(".");var alphabet_flag=true;for(var i=0;i<sub_domains.length;i++){if(!alphabet_reg.test(sub_domains[i])){var encoded=punycode.encode(sub_domains[i]);if(encoded.slice(-1)!="-"){sub_domains[i]="xn--"+encoded;alphabet_flag=false}}}if(!alphabet_flag){var hostname=sub_domains.join(".");hash["url"]=parser.protocol+"//"+hostname;var other=parser.pathname+parser.search+parser.hash;if(other!=""&&other.substr(0,1)!="/"){hash["url"]+="/"}hash["url"]+=other}hash["url"]=encodeURIComponent(hash["url"])}for(var key in hash){if(hash.hasOwnProperty(key)&&hash[key]){src+="&"+key+"="+hash[key]}}src+="&eflg=1";img.width=1;img.height=1;img.style.display="none";img.src=src;try{if(!window.attachEvent||window.opera){if(document.body){document.body.appendChild(img)}}}catch(e){return null}}_uih["mode"]="default";if(typeof uiinit!=="undefined"){_uih["rand"]=uiinit}_uih["rand"]=_uih["rand"]||randobet(7);_uic["safari_mode"]=_uic["safari_mode"]||2;_uic["uisv"]=_uih["id"]%10;_uih["url"]=_uih["url"]||document.URL;_uih["sb"]=_uih["sb"]||document.title;_uih["ref"]=_uih["ref"]||document.referrer;if(document.documentElement.clientWidth){_uih["bw"]=document.documentElement.clientWidth;_uih["bh"]=document.documentElement.clientHeight}else if(document.body){_uih["bw"]=document.body.clientWidth;_uih["bh"]=document.body.clientHeight}_uih["sw"]=screen.width;_uih["sh"]=screen.height;_uih["dpr"]=window.devicePixelRatio!=undefined?window.devicePixelRatio:0;_uic["fp_name"]=_uic["fp_name"]||"__ulfpc";if(_uih["id"]=="50153"){_uic["fp_mode"]=1}else{_uic["fp_mode"]=_uic["fp_mode"]||3}_uic["fp_period"]=_uic["fp_period"]||2*365*24*60*60;_uic["fp_domains"]=_uic["fp_domains"]||[];_uih["fp"]=getuid(_uic["fp_mode"],_uic["fp_name"],_uic["fp_period"],_uic["fp_domains"]);_uic["force_behv"]=_uic["force_behv"]||false;_uic["host"]=_uic["host"]||("https:"==document.location.protocol?"https://bs":"http://c0"+_uic["uisv"])+".nakanohito.jp/b3/";var uicount=uicount||0;_uih["count"]=_uih["count"]||0;_uih["count"]=uicount+_uih["count"];_uih["count"]+=1;_uic["sample_flag"]=get_sample_flag(_uic["sample_rate"],_uih["fp"]);sendLog(_uih,_uic);_uic["send_pv"]=function(){_uih["rand"]=Math.floor(Math.random()*9e5)+1e6;sendLog(_uih,_uic)};if(_uic["restart_on_anchor_change"]){var addEvent=function(){if(document.addEventListener){return function(node,type,handler){node.addEventListener(type,handler,false)}}else if(document.attachEvent){return function(node,type,handler){node.attachEvent("on"+type,function(evt){handler.call(node,evt)})}}}();var addHashChange=function(){var str_hashchange="hashchange";var doc_mode=document.documentMode;if("onhashchange"in window&&(doc_mode===undefined||doc_mode>7)){return function(handler){addEvent(window,"hashchange",handler)}}else{return function(handler){addEvent(document.body,"click",function(){setTimeout(handler,10)})}}}();addHashChange(function(){if(_uih["url"]!=document.URL){if(_uic["lb"]){_uic["lb"].stop()}_uih["rand"]=Math.floor(Math.random()*9e5)+1e6;_uih["url"]=document.URL;_uic["send_pv"](_uih,_uic)}})}function Conversion(){this.isConversion=true;this.push=function(conv){var hash={mode:"conv"};var dflt_keys=["id","rand","fp"];for(var i=0;i<dflt_keys.length;i++){var key=dflt_keys[i];hash[key]=_uih[key]}for(var key in conv){if(conv.hasOwnProperty(key)&&conv[key]){var tmpkey="conv_"+key;hash[tmpkey]=encodeURIComponent(conv[key])}}sendLog(hash,_uic)}}if(typeof _uiconv.isConversion=="undefined"){var convs=[];for(var i=0,l=_uiconv.length;i<l;i++){convs[i]=_uiconv[i]}_uiconv=new Conversion;for(var i=0;i<convs.length;i++){_uiconv.push(convs[i])}}})();if(typeof document.documentElement.style.maxHeight!="undefined"&&_uih["count"]==1||_uic["force_behv"]){if(typeof Vesicomyid=="undefined")Vesicomyid=function(){};if(typeof Vesicomyid.BivalvesLoading=="undefined"){Vesicomyid.BivalvesLoading=true;Vesicomyid.Bivalves=function(id,rand,lvl){this.id=id;this.rand=rand;this.beacon_id="Vesicomyid-BEACON"+id;this.env=new Vesicomyid.Bivalves.Env;this.char=this.env.char;this.dynMousePositionPeriod=this.env.dynMousePositionPeriod;this.freeHash=Vesicomyid.bivalvesHash?Vesicomyid.bivalvesHash:{};this.message=Vesicomyid.bivalvesMessage?Vesicomyid.bivalvesMessage:{comment:"",style:""};this.lvl=lvl?lvl:2;this.ratio=0;this.safariSupport=true;this.safariOutBound=false;this.safariSupportDelayTime=500;this.safariControlOnClick=false;this.flagFirefoxSslAccess=true;this.flagDynMouseReport=true;this.dynMousePositionReportPeriod=this.env.dynMousePositionReportPeriod;this.forceMobileFirefox=true;this.cookie_off=true;this.host="http://bc.test.userlocal.jp/b1/";this.hostssl="https://bs.nakanohito.jp/b3/";this.uisv=1;this.max_url_length=2040};Vesicomyid.Bivalves.Browser={IE:!!(window.attachEvent&&!window.opera),Opera:!!window.opera,Gecko:navigator.userAgent.indexOf("Gecko")>-1&&navigator.userAgent.indexOf("KHTML")==-1,Safari:navigator.userAgent.toLowerCase().indexOf("safari")!=-1,ModeStd:document.compatMode&&document.compatMode!="BackCompat",MobileApple:navigator.userAgent.indexOf("iPhone")>-1||navigator.userAgent.indexOf("iPod")>-1||navigator.userAgent.indexOf("iPad")>-1,MobileAndroid:navigator.userAgent.indexOf("Android")>-1};Vesicomyid.Bivalves.Env=function(){return this};Vesicomyid.Bivalves.Env.type_prod=true;Vesicomyid.Bivalves.Env.prototype.domain1="nakanohito.jp";Vesicomyid.Bivalves.Env.prototype.domain2="userlocal.jp";Vesicomyid.Bivalves.Env.prototype.char="null";Vesicomyid.Bivalves.Env.prototype.image_url2="";Vesicomyid.Bivalves.Env.prototype.ssl_image_url2="";Vesicomyid.Bivalves.Env.prototype.dynMousePositionPeriod=[2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,12,12,12,12,12,12,12,12,12,12];Vesicomyid.Bivalves.Env.prototype.dynMousePositionReportPeriod=[10,15,15,15,20,20,20];Vesicomyid.Bivalves.addEventListener=function(elem,event,func){if(!Vesicomyid.Bivalves.listeners){Vesicomyid.Bivalves.listeners=new Array}Vesicomyid.Bivalves.listeners.push({elem:elem,event:event,func:func});if(elem&&elem.addEventListener&&!Vesicomyid.Bivalves.Browser.Opera){elem.addEventListener(event,func,false)}else if(window.attachEvent){event=this.convertEvent(event);elem.attachEvent("on"+event,func)}};Vesicomyid.Bivalves.removeAllEventListeners=function(){if(Vesicomyid.Bivalves.listeners){for(var i=0;i<Vesicomyid.Bivalves.listeners.length;i++){var entry=Vesicomyid.Bivalves.listeners[i];var elem=entry.elem;var event=entry.event;var func=entry.func;if(window.addEventListener&&!Vesicomyid.Bivalves.Browser.Opera){if(elem){elem.removeEventListener(event,func,false)}}else if(window.attachEvent){event=this.convertEvent(event);elem.detachEvent("on"+event,func)}}}};Vesicomyid.Bivalves.getElementByClassName=function(targetClass){if(typeof document.getElementsByClassName!="undefined"){var compatibleFlag=true;if(typeof Prototype!="undifinied"){var ver=window.navigator.appVersion.toLowerCase();if(ver.indexOf("msie 8.")!=-1||ver.indexOf("msie 7.")!=-1||ver.indexOf("msie 6.")!=-1){compatibleFlag=false}}if(compatibleFlag){var results=document.getElementsByClassName(targetClass);if(results.length&&results.length>=1){return results[0]}return null}}var foundElements=new Array;if(document.all){var allElements=document.all}else{var allElements=document.getElementsByTagName("*")}for(var i=0,j=0;i<allElements.length;i++){if(allElements[i].className==targetClass){foundElements[j]=allElements[i];j++}}if(foundElements.length&&foundElements.length>=2){return foundElements[0]}return null};Vesicomyid.Bivalves.convertEvent=function(event){if(event=="DOMMouseScroll"){event="mousewheel"}return event};Vesicomyid.Bivalves.prototype.init=function(){if(typeof Vesicomyid.Bivalves.flagAlreadyInit=="undefined"){Vesicomyid.Bivalves.flagAlreadyInit=true}else{return}var self=this;if(!this.host.match(this.env.domain1)&&!this.host.match(this.env.domain2)){return false}this.image_url=this.host;if(_uih["id"]!="31873"){if(Vesicomyid.Bivalves.Browser.Gecko&&this.flagFirefoxSslAccess){if(!Vesicomyid.Bivalves.Browser.MobileAndroid){this.image_url=this.hostssl}}if(Vesicomyid.Bivalves.Browser.IE){this.image_url=this.hostssl}}var tt=Vesicomyid.Bivalves.getElementByClassName("class_bivalves");if(tt){tt.innerHTML='<img id="'+this.beacon_id+'" width="1" height="1" />'+'<span style="'+this.message["style"]+'" >'+this.message["comment"]+"</span>"}if(!Vesicomyid.Bivalves.Browser.Safari){var f=function(){self.start()};f();Vesicomyid.Bivalves.addEventListener(window,"unload",function(){self.end();Vesicomyid.Bivalves.removeAllEventListeners()});if(self.lvl==2&&document.body){Vesicomyid.Bivalves.addEventListener(document.body,"mouseup",function(ev){self.mouseClick(ev)});Vesicomyid.Bivalves.addEventListener(document.body,"DOMMouseScroll",function(ev){self.mouseScroll(ev)});Vesicomyid.Bivalves.addEventListener(document.body,"mousemove",function(ev){self.mouseMove(ev)});if(Vesicomyid.Bivalves.Browser.MobileApple||Vesicomyid.Bivalves.Browser.MobileAndroid){Vesicomyid.Bivalves.addEventListener(document.body,"touchstart",function(ev){if(typeof event!="undefined"){if(!ev.pageX){ev=event.touches[0]}}else if(ev.touches){ev=ev.touches[0]}self.mouseMove(ev)});Vesicomyid.Bivalves.addEventListener(document.body,"touchmove",function(ev){if(typeof event!="undefined"){if(!ev.pageX){ev=event.touches[0]}}else if(ev.touches){ev=ev.touches[0]}self.mouseMove(ev)})}}}else{var f=function(){self.start();if(self.lvl==2&&self.safariSupport&&self.safariOutBound){self.setFilters("A",function(elem,ev,onloadFunc){self.setMouseClick(elem,ev);self.end(onloadFunc)})}Vesicomyid.Bivalves.addEventListener(window,"unload",function(){Vesicomyid.Bivalves.removeAllEventListeners()});if(self.lvl==2&&self.safariSupport){if(document.body){if("onpagehide"in window){window.addEventListener("pagehide",function(event){self.end();Vesicomyid.Bivalves.removeAllEventListeners()})}else{window.addEventListener("beforeunload",function(event){self.end();Vesicomyid.Bivalves.removeAllEventListeners()})}Vesicomyid.Bivalves.addEventListener(document.body,"mouseup",function(ev){self.mouseClick(ev)});Vesicomyid.Bivalves.addEventListener(document.body,"mousewheel",function(ev){self.mouseScroll(ev)});Vesicomyid.Bivalves.addEventListener(document.body,"mousemove",function(ev){self.mouseMove(ev)})}if(Vesicomyid.Bivalves.Browser.MobileApple||Vesicomyid.Bivalves.Browser.MobileAndroid){Vesicomyid.Bivalves.addEventListener(document.body,"touchstart",function(ev){if(typeof event!="undefined"){if(!ev.pageX){ev=event.touches[0]}}self.mouseMove(ev)});Vesicomyid.Bivalves.addEventListener(document.body,"touchmove",function(ev){if(typeof event!="undefined"){if(!ev.pageX){ev=event.touches[0]}}self.mouseMove(ev)})}}};f()}};Vesicomyid.Bivalves.prototype.start=function(){this.startTime=(new Date).getTime();this.mouseWheelUp=0;this.mouseWheelDown=0;if(this.flagDynMouseReport){this.countDynMouseReport=0;this.timerDynMouseReport=false;this.sendDynMouseReport=0;var flagGo=true;if(Vesicomyid.Bivalves.Browser.Gecko&&Vesicomyid.Bivalves.Browser.MobileAndroid){if(!this.forceMobileFirefox){flagGo=false}}if(flagGo){this.setNextDynMouseReport()}}};Vesicomyid.Bivalves.prototype.setNextDynMouseReport=function(){var ct=this.countDynMouseReport;if(ct>=0&&ct<this.dynMousePositionReportPeriod.length-1){var period=this.dynMousePositionReportPeriod[ct]*1e3;var self=this;this.timerDynMouseReport=setTimeout(function(){self.dynReport()},period)}};Vesicomyid.Bivalves.prototype.end=function(onloadFunc){this.commonReport(0,onloadFunc)};Vesicomyid.Bivalves.prototype.stop=function(){if(!this.flagEnd){this.end();this.flagEnd=true}};Vesicomyid.Bivalves.prototype.dynReport=function(){this.commonReport(1)};Vesicomyid.Bivalves.prototype.commonReport=function(report_type,onloadFunc){var flag_skip=false;if(report_type==1){if(!this.dynMousePositionRecord){flag_skip=true}else if(this.sendDynMouseReport==this.dynMousePositionRecord.length){flag_skip=true}}if(!flag_skip){var im=new Image(1,1);this.lastTime=(new Date).getTime();var params=new Array;params.push("uisv="+this.uisv);params.push("from=ui3");params.push("mode=behavior");if(report_type==1){params.push("dyn_report="+this.countDynMouseReport)}else{if(this.timerDynMouseReport){clearTimeout(this.timerDynMouseReport);this.timerDynMouseReport=false}}params.push("id="+this.id);params.push("time="+Math.floor(this.lastTime/100));if(report_type==0){params.push("char="+this.char)}params.push("rand="+this.rand);params.push("period="+Math.floor(this.getPeriod()/100));var mhref=encodeURIComponent(this.lastClickHref);if(mhref.length>500){mhref=mhref.substr(0,500)}params.push("href="+mhref);params.push("lastClickTime="+Math.floor((this.lastClickTime-this.startTime)/100));if(report_type==0||report_type==1&&this.sendDynMouseReport==0){params.push("startMousePosition="+this.getStartMousePosition())}params.push("mouseTimes="+this.mouseTimes);params.push("mouseWheelUp="+this.mouseWheelUp);params.push("mouseWheelDown="+this.mouseWheelDown);params.push("mouse="+this.getMousePositions());if(report_type==0){params.push("mousePositions="+this.getDynMousePositions(0))}else{if(this.dynMousePositionRecord){params.push("mousePositions="+this.getDynMousePositions(this.sendDynMouseReport));this.sendDynMouseReport=this.dynMousePositionRecord.length}}if(report_type==0){}if(report_type==0){}var hash=this.makeFreeHash(["mode","lvl","id","time","char","ref","url","cookie","flash","title","width","height","sw","sh"]);if(hash){params.push(hash)}if(this.ratio!=0){params.push("ratio="+this.ratio)}params.push("paramend=1");if(onloadFunc){im.onload=onloadFunc}else{im.onload=function(){}}im.src=this.image_url+"?"+params.join("&")}if(report_type==1){this.countDynMouseReport+=1;this.setNextDynMouseReport()}};Vesicomyid.Bivalves.prototype.getWindowSize=function(){var width=null;var height=null;if(Vesicomyid.Bivalves.Browser.ModeStd){width=document.documentElement.clientWidth;height=document.documentElement.clientHeight}else{if(document.body){width=document.body.clientWidth;height=document.body.clientHeight}}return{width:width,height:height}};Vesicomyid.Bivalves.prototype.getScreenSize=function(){var width=null;var height=null;var sw=screen.width;var sh=screen.height;return{width:sw,height:sh}};Vesicomyid.Bivalves.prototype.makeFreeHash=function(ngkeys){if(this.freeHash){var nghash=new Array;for(var i=0;i<ngkeys.length;i++){nghash[ngkeys[i]]=true}var msg=new Array;for(var key in this.freeHash){if(nghash[key]!=true){msg.push(key+"="+encodeURIComponent(this.freeHash[key]))}}return msg.join("&")}return null};Vesicomyid.Bivalves.prototype.getPeriod=function(){if(this.startTime&&this.lastTime){return this.lastTime-this.startTime}return null};Vesicomyid.Bivalves.prototype.mouseClick=function(ev){if(!ev)var ev=window.event;var target=ev.srcElement?ev.srcElement:ev.target;if(target){this.setMouseClick(target,ev)}};Vesicomyid.Bivalves.prototype.setMouseClick=function(target,ev){var nodeName=target.nodeName;if(nodeName){if(nodeName.toUpperCase()=="A"){this.lastClickHref=target.href;this.lastClickTime=(new Date).getTime();this.addMousePosition(ev)}else if(nodeName.toUpperCase()=="INPUT"){this.lastClickHref=target.form?target.form.action:"";this.lastClickTime=(new Date).getTime();this.addMousePosition(ev)}else{this.addMousePosition(ev)}}};Vesicomyid.Bivalves.prototype.mouseScroll=function(ev){if(!ev)var ev=window.event;var delta=0;if(ev.wheelDelta){delta=ev.wheelDelta/120;if(window.opera){delta=-delta}}else if(ev.detail){delta=-ev.detail/3}if(delta>0){this.mouseWheelUp+=delta}else{this.mouseWheelDown+=-delta}};Vesicomyid.Bivalves.prototype.mouseMove=function(ev){if(!this.startMousePosition){this.startMousePosition=this.eventPosition(ev)}if(!this.dynMousePositionRecord){this.dynMousePositionRecord=new Array;this.dynMousePositionTime=this.startTime}var n=this.dynMousePositionRecord.length;if(n<this.dynMousePositionPeriod.length){var x=((new Date).getTime()-this.dynMousePositionTime)/1e3;if(x>this.dynMousePositionPeriod[n]){this.dynMousePositionTime=(new Date).getTime();var v=this.eventPosition(ev);this.dynMousePositionRecord.push(v)}}};Vesicomyid.Bivalves.prototype.addMousePosition=function(ev){if(!this.mouseTimes){this.mouseTimes=0}this.mouseTimes++;if(!this.mousePositionRecord){this.mousePositionRecord=new Array}var v=this.eventPosition(ev);this.mousePositionRecord.push(v);if(this.mousePositionRecord.length>10){this.mousePositionRecord.shift()}};Vesicomyid.Bivalves.prototype.eventPosition=function(ev){var left=0;var top=0;if(ev.pageX){left=ev.pageX;top=ev.pageY}else{left=ev.clientX+document.documentElement.scrollLeft;top=ev.clientY+document.documentElement.scrollTop}if(Vesicomyid.Bivalves.Browser.IE&&Vesicomyid.Bivalves.Browser.ModeStd){left-=2;top-=2}var scrollTop=0;if(Vesicomyid.Bivalves.Browser.ModeStd){scrollTop=window.pageYOffset||document.documentElement.scrollTop}else{if(document.body){scrollTop=window.pageYOffset||document.body.scrollTop}}return{x:left,y:top,t:Math.floor(((new Date).getTime()-this.startTime)/100),st:scrollTop}};Vesicomyid.Bivalves.prototype.getStartMousePosition=function(){if(this.startMousePosition){var h=this.startMousePosition;return h.x+","+h.y+","+h.t+","+h.st}return null};Vesicomyid.Bivalves.prototype.getMousePositions=function(){if(this.mousePositionRecord){var arr=new Array;for(var i=0;i<this.mousePositionRecord.length;i++){var h=this.mousePositionRecord[i];arr.push(h.x+","+h.y+","+h.t+","+h.st)}var arr2=this.joinShort(arr,200);var str=arr2.join("|");if(arr2.length>0){str+="|"}return str}return null};Vesicomyid.Bivalves.prototype.getDynMousePositions=function(sendPos){if(this.dynMousePositionRecord){var arr=new Array;for(var i=sendPos;i<this.dynMousePositionRecord.length;i++){var h=this.dynMousePositionRecord[i];arr.push(h.x+","+h.y+","+h.t+","+h.st)}var arr2=this.joinShort(arr,200);var str=arr2.join("|");if(arr2.length>0){str+="|"}return str}return null};Vesicomyid.Bivalves.prototype.joinShort=function(arr,msize){var arr2=new Array;var cnt=arr.length+1;for(var i=0;i<arr.length;i++){cnt=cnt+arr[i].length+1;if(cnt>msize){break}arr2.push(arr[i])}return arr2};Vesicomyid.Bivalves.prototype.searchNodes=function(nodeName,elem,arr){var cn=elem.childNodes;if(cn&&cn.length){for(var i=0;i<cn.length;i++){var c=cn[i];if(c.nodeType==1){if(c.nodeName.toUpperCase()==nodeName){arr[arr.length]=c}else if(c.hasChildNodes()){this.searchNodes(nodeName,c,arr)}}}}};Vesicomyid.Bivalves.prototype.setFilters=function(tag,func){var self=this;var lFunc=func;var arr=new Array;if(document.body){this.searchNodes(tag,document.body,arr);for(var i=0;i<arr.length;i++){var elem=arr[i];var prev_onclick=elem.getAttribute("onclick");if(prev_onclick){if(self.safariControlOnClick){(function(act,lFunc2){elem.onclick=function(ev){var res=eval(" var vesicomyid_dummy_function = function() { "+act+"}; vesicomyid_dummy_function.apply(this);");if(res){var myself=this;myself.flagAlreadyMove=false;lFunc2(this,ev,function(){if(!myself.flagAlreadyMove){location.href=myself.href}});setTimeout(function(){location.href=myself.href;myself.flagAlreadyMove=true},self.safariSupportDelayTime)}return false}})(prev_onclick,lFunc)}}else{(function(lFunc2){elem.onclick=function(ev){var myself=this;myself.flagAlreadMove=false;lFunc2(this,ev,function(){if(!myself.flagAlreadyMove){location.href=myself.href;myself.flagAlreadMove=true}});setTimeout(function(){location.href=myself.href;myself.flagAlreadyMove=true},self.safariSupportDelayTime);return false}})(lFunc)}}}};Vesicomyid.Bivalves.Loaded=function(){}}(function(){var lb=new Vesicomyid.Bivalves(_uih["id"],_uih["rand"]);lb.host=_uic["host"];lb.hostssl="https://bs.nakanohito.jp/b3/";lb.uisv=_uic["uisv"];if(_uic["safari_mode"]==1){lb.safariSupport=false}if(_uic["safari_mode"]==3){lb.safariOutBound=true}if(_uic["report_period"]){lb.dynMousePositionReportPeriod=_uic["report_period"]}if(!_uic["disable_heatmap"]&&!_uic["sample_flag"]){lb.init();_uic["lb"]=lb}})()}