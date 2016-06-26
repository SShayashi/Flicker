var model_keys = {
		shake_count:"shake_count",
		max_forse:"max_forse",
		forse:"forse",
		money:"money",
		point:"point"
}

//singleton
var Model = (function(){
	var instance;
	//keys
	//初期化処理
	function init(){
		var randNumber = Math.random();

		//数値を扱うものは0で初期化する
		for ( var key in model_keys) {
			if (cc.sys.localStorage.getItem(key) == "")
				cc.sys.localStorage.setItem(key,0);
		}

		return {
				getRandomNumber:function(){
					return randNumber;
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

		};
	};
	return {
		getInstance:function(){
			if(!instance){
				instance = init();
			}
			return instance;
		}
	};
})();
