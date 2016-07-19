function AppModel(attrs){
	this.val = "";
	//オブザーバーの機能をthis.listenersに持たせる
	this.listeners = {
		valid:[],
		invalid[]
	};
}

AppModel.prototype.on = function(event,func){
	//配列に関数を追加する
	this.listeners[event].push(func);
};

AppModel.prototype.trigger = function(event){
	$.each(this.listeners[event],function(){
		this();
	});
};

//setメソッドを実装
AppModel.prototype.set = function(val){
	if(this.val === val){
		return;
	}
	this.val = val;
	this.validate();
};