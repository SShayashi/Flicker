var ActionLayer = cc.Layer.extend({
  _player:null,
  _space:null,
  _body:null,
  _shape:null,
  _isTouch:false,

  ctor:function(space) {
    this._super();
    this.space = space;
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
    this._player = new Player(this.space);
    this.addChild(this._player);

    //コールバック関数はbindでthisを束縛する必要がある
    cc.eventManager.addListener({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      onTouchBegan: function(touch, event)
      {
        //タッチされた時の処理

        var touchPoint = touch.getLocation();
        var rect = this._player.getBoundingBox();
        var isHit = cc.rectContainsPoint(rect, touchPoint);
        if (isHit) {
          this._isTouch = true;
          this._player.body.setVel(cc.p(0,0));
          cc.log(this._player.body);
        }else{
          this._isTouch = false;
        }



        return true;
      }.bind(this),

      onTouchMoved: function(touch,event)
      {
        if(this._isTouch == false)
          return false;
        //タッチ中に動いた時の処理
        cc.log("touch at (%f, %f)", touch.getLocationX(), touch.getLocationY());
       var winSize = director.getWinSize();
       var delta = touch.getDelta();
       var position = this._player.getPosition();
       var newPosition = cc.pAdd(position,delta);


       this._player.setPosition(cc.pClamp(newPosition, cc.p(0, 0), cc.p(winSize.width, winSize.height)));

     }.bind(this),
     onTouchEnded: function(touch,event)
     {
       var delta = touch.getDelta();
       this._player.body.applyImpulse(delta,cp.v(0, 0));
     }.bind(this),
     onTouchCancelled:function(touch,event)
     {
       this._isTouch = false;
     }.bind(this),
    },this)
  },

    // /** @override */
  actionUpdate: function() {
    var position = this._player.getPosition();
    var winSize = cc.director.getWinSize();
    this._player.setPosition(cc.pClamp(position, cc.p(0, 0), cc.p(winSize.width, winSize.height )));
  },
  onEnter:function () {
     // onEnter の中では必ず this._super() を呼ばなくてはならない．
     this._super();
   }
});
