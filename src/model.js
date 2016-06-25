//localStorageのkey
var model_int = {
		shake_count:"shake_count",
		max_forse:"max_forse",
		forse:"forse",
		money:"money",
		point:"point"
}
var Model = cc.Node.extend({
	
	ctor:function() {
		this._super();
		//singlton
		if(typeof Model.instance === "object")
			return Model.instance
		Model.instance = this;
		this.init();
		return this;
	},

	init:function(){
		this._super();
		for ( var key in model_int) {
			if (cc.sys.localStorage.getItem(key) == "")
				cc.sys.localStorage.setItem(key,0);
		}
	},
	
	set:function(key,value){
		cc.sys.localStorage.setItem(key,new_value);
	},
	
	get:function(key){
		return Number(cc.sys.localStorage.getItem(key));
	},
	
	add:function(key, value){
		var old_value = cc.sys.localStorage.getItem(key);
		var new_value = Number(old_value) + value;
		cc.sys.localStorage.setItem(key,new_value);
	}
});
var model = new Model();