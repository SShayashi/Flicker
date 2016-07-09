var ResultLayer = cc.Layer.extend({

  ctor:function(space) {
    this._super();
    this.init();
  },

  init:function(){
    this._super();
    //cc.Director ではなく cc.director を利用する．
    var director = cc.director;
    var winSize = director.getWinSize();

    // var dispathcer = this.director.getEventDispatcher();
    // var dispathcer = this.getEventDispatcher();

    var listener = cc.EventListener.create({
         event: cc.EventListener.TOUCH_ONE_BY_ONE,
         swallowTouches: true,
         onTouchBegan: function (touch, event) {
             //do something
               return true;
          }
        });
    cc.eventManager.addListener(listener, 1);
  },
  resultUpdate: function() {
    // if(this._state != state.open)
    //   // TODO プレイヤーが停止したらEventを飛ばす
    //   // open -> resultへ
  },
  onEnter:function () {
     // onEnter の中では必ず this._super() を呼ばなくてはならない．
     this._super();
   }
});
