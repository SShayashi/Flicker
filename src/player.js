var Player = cc.PhysicsSprite.extend({
  space:null,
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
    //playerの設置
    this.initWithFile(res.player);
    var contentSize = this.getContentSize();
    // init body
    this.body = new cp.Body(1, cp.momentForBox(1, contentSize.width, contentSize.height));
    this.body.p = cc.p(100, 100);
    this.space.addBody(this.body);

    this.shape = new cp.CircleShape(this.body, contentSize.width / 3,cp.v(0, 0));
    this.shape.setElasticity(1);
    this.shape.setFriction(1);
    this.space.addShape(this.shape);
    this.setBody(this.body);
  }
});
