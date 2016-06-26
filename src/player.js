var Player = cc.PhysicsSprite.extend({
  space:null,
  _accelerationRate:0.9,
  _oldPosition:cc.p(100,100),
  _movingDistance:0,
  _direction:5,
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
    this.body.v_limit = 5000;
    this.space.addBody(this.body);

    this.shape = new cp.CircleShape(this.body, contentSize.width / 3,cp.v(0, 0));
    this.shape.setElasticity(1);
    this.shape.setFriction(1);
    this.shape.setCollisionType(collision.PLAYER);
    this.space.addShape(this.shape);
    this.setBody(this.body);
  },
  playerUpdate:function(){
	  var distance = cc.pDistanceSQ(this._oldPosition,this.getPosition());
	  var radian = cc.pToAngle( cc.pSub(this._oldPosition ,this.getPosition()));
	  var degree = radian * 180.0 / PI + 180.0;
	  var direction = this.get8Way(degree);

	  if( this._direction != direction){
		  this._direction = direction;
		  cc.log(this._direction);
	  }

	  this._movingDistance += distance;
	  while(this._movingDistance > 100 )
	  {
		  this._movingDistance -=100;
		  //コインが出る処理
	  }
	  this._oldPosition =  this.getPosition();
	  cc.log("",this.body.getVel().x,this.body.getVel().y);
    var v = this.body.getVel();
    v.x = v.x * this._accelerationRate;
    v.y = v.y * this._accelerationRate;
    this.body.setVel(v);
  },
  /**
   * 角度から方向の向きを以下の数字で表現
   *  123
   *  456
   *  789
   */
  get8Way:function(degree){
	  if(22.0 <= degree && degree <= 68.0) //右上 3
	  {
		  return 3;
	  }
	  if(68.0 <= degree && degree <= 112.0) //上 2
	  {
		  return 2;
	  }
	  if(112.0 <= degree && degree <= 158.0) //左上 1
	  {
		  return 1;
	  }
	  if(158.0 <= degree && degree <= 202.0) //左 4
	  {
		  return 4;
	  }
	  if(202.0 <= degree && degree <= 248.0) //左下 7
	  {
		  return 7;
	  }
	  if(248.0 <= degree && degree <= 292.0) //下 8
	  {
		  return 8;
	  }
	  if(292.0 <= degree && degree <= 338.0) //右下 9
	  {
		  return 9;
	  }
	  if(338.0 <= degree || degree <= 22.0) //右 6
	  {
		  return 6;
	  }
	  cc.log("uncolect degreee is ",degree );
	return -1
  },
});
