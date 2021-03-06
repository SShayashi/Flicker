var ActionLayer = cc.Layer.extend({
  _player:null,
  _space:null,
  _body:null,
  _shape:null,
  _delta:cp.v(0, 0),
  _state:null,

  ctor:function(space) {
    this._super();
    this._space = space;
    this.init();
  },

  init:function(){
    this._super();
    //cc.Director ではなく cc.director を利用する．
    var director = cc.director;
    var winSize = director.getWinSize();
    //背景
    var background = new cc.Sprite(res.background);
    background.setPosition( cc.p(winSize.width / 2, winSize.height / 2));
    this.addChild(background);
    //playerの設置
    this._player = new Player(this._space);
    this.addChild(this._player);
    //statusの設定
    this._state = state.shake;

    //shake => open用
    var customEvent = cc.EventListener.create({
    event: cc.EventListener.CUSTOM,
    eventName:"custom",
    callback: function(event){
      //このeventは通知するときに飛ばしたeventが入る
      this._state = state.open;
      model = Model.getInstance();
      var power = model.get(model_keys.shake_count);
      this._player.body.applyImpulse(cp.v(power, power),cp.v(0,0));
    }.bind(this)
    });
    cc.eventManager.addListener(customEvent, 1);

    //open =>result用
    //result => shake用
    //コールバック関数はbindでthisを束縛する必要がある
    cc.eventManager.addListener({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      onTouchBegan: function(touch, event)
      {
        if(this._state != state.shake)
          return false;
        //タッチされた時の処理
        var touchPoint = touch.getLocation();
        var rect = this._player.getBoundingBox();
        var isTouch = cc.rectContainsPoint(rect, touchPoint);
        if (isTouch) {
          this._player._isTouch = true;
          this._player.body.setVel(cc.p(0,0));
          this._player.body.w = 0;
        }else{
          this._player._isTouch = false;
        }
        return true;
      }.bind(this),

      onTouchMoved: function(touch,event)
      {
        if(this._state != state.shake)
          return false;

        if(this._player._isTouch == false)
          return false;
        //タッチ中に動いた時の処理
       var winSize = director.getWinSize();
       var delta = cc.p(touch.getDelta().x,touch.getDelta().y);
       var position = this._player.getPosition();
       var newPosition = cc.pAdd(position,delta);
       this._player.setPosition(cc.pClamp(newPosition, cc.p(0, 0), cc.p(winSize.width, winSize.height)));
       this._delta = cc.pMult(delta,PLAYER_APPLY_IMPULSE_RATE);

      return true;
     }.bind(this),
     onTouchEnded: function(touch,event)
     {
       if(this._state != state.shake)
         return false;

    	 if(this._player._isTouch == false)
    		 return false;
    	 this._player.body.applyImpulse(this._delta,cp.v(0, 0));
    	 this._delta = cp.v(0, 0);
    	 this._player._isTouch = false;

       return true;
     }.bind(this),
     onTouchCancelled:function(touch,event)
     {
       this._player._isTouch = false;
     }.bind(this),
    },this);

    this._space.addCollisionHandler( // 衝突イベントを設定
    		collision.WALL, collision.PLAYER,//playerと壁の衝突を検知
    		function(arbiter, space){ //接触処理
    			var shapes = arbiter.getShapes(); // 衝突したShapeの配列を取得
    			var shape = shapes[1]; // Shapeを取得（配列の順序は、引数で衝突タイプを指定した順序です。）
    			if (shape.collision_type == 1) {
    				var body = shape.getBody(); // ShapeからBodyを取得
    			}
    			model = Model.getInstance();
    			//エフェクトの表示
          if(this._state == state.shake){
            //値の保存
            model.add(model_keys.forse,1);
            model.add(model_keys.shake_count,1);

      			var star = new cc.ParticleSystem(res.crash_star);
      			star.setScale(0.5);
      			star.setAutoRemoveOnFinish(true);
      			star.setPosition(body.p);
      			this.addChild(star)
          }
          if(this._state == state.open){
            //値の保存
            model.add(model_keys.coin,5);

            var coin = new cc.ParticleSystem(res.pop_coin);
            coin.setScale(0.5);
            coin.setAutoRemoveOnFinish(true);
            coin.setPosition(body.p);
            this.addChild(coin)
          }

    			return true;
    		}.bind(this),  // レイヤーのthisを使えるようにする
    		null, // preSolve
    		null, // postSolve
    		null); // separate
  },
  actionUpdate: function() {

    var position = this._player.getPosition();
    var winSize = cc.director.getWinSize();
    this._player.setPosition(cc.pClamp(position, cc.p(0, 0), cc.p(winSize.width, winSize.height )));
    this._player.playerUpdate();
  },
  onEnter:function () {
     // onEnter の中では必ず this._super() を呼ばなくてはならない．
     this._super();
   }
});
