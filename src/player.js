var Player = cc.PhysicsSprite.extend({
  space:null,
  _accelerationRate:0.9,
  _oldPosition:cc.p(100,100),
  _movingDistance:0,
  _direction:5,
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
    //playerの設置
    this.initWithFile(res.player_default);
    var contentSize = this.getContentSize();
    // init body
    this.body = new cp.Body(1, cp.momentForBox(100, contentSize.width, contentSize.height));
    this.body.p = cc.p(100, 100);
    this.body.v_limit = 5000;

    this.space.addBody(this.body);

    this.shape = new cp.BoxShape(this.body, contentSize.width,contentSize.height );
    this.shape.setElasticity(1);
    this.shape.setFriction(1);
    this.shape.setCollisionType(collision.PLAYER);
    this.space.addShape(this.shape);
    this.setBody(this.body);
  },
  playerUpdate:function(){
    var old_pos = this._oldPosition;
    var now_pos = this.getPosition();
	  var distanceDelta = cc.pDistanceSQ(old_pos,now_pos);
    var direction = this.getDirection(distanceDelta);

	  if( this._direction != direction){
		  this._direction = direction;
		  //シェイクポイントを貯める
		  model = Model.getInstance();
		  model.add(model_keys.shake_count,1);
		  // cc.log(model.get(model_keys.shake_count));
	  }

	  this._movingDistance += distanceDelta;
	  while(this._movingDistance > 100 )
	  {
		  this._movingDistance -=100;
		  //コインが出る処理
	  }
	  this._oldPosition =  this.getPosition();

    //速度を減少
    var v = this.body.getVel();
    v.x = v.x * this._accelerationRate;
    v.y = v.y * this._accelerationRate;
    this.body.setVel(v);

    this.body.w = this.body.w * 0.9;
    this.changeSprite();
  },
  /** タッチされてる時でSpriteを変更
   *
   */
  changeSprite:function(){
    if(this._isTouch)
      this.initWithFile(res.player_touch);
    else {
      this.initWithFile(res.player_default);
    }
  },
  getDirection:function(distanceDelta){
    //動きが無い場合は前の方向を返す．
    if(distanceDelta == 0)
      return this._direction;
	  var radian = cc.pToAngle( cc.pSub(this._oldPosition ,this.getPosition()));
	  var degree = radian * 180.0 / PI + 180.0;
	  var direction = this.get4Way(degree);
    return direction;
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

  /**
   * 角度から方向の向きを以下の数字で表現
   *   2
   *  456
   *   8
   */
  get4Way:function(degree){
    if(45.0 <= degree && degree <= 135.0) //上 2
    {
      return 2;
    }
    if(135.0 <= degree && degree <= 225.0) //左 4
    {
      return 4;
    }
    if(225.0 <= degree && degree <= 315.0) //下 8
    {
      return 1;
    }
    if(315.0 <= degree || degree <= 45.0) //右 6
    {
      return 6;
    }
    cc.log("uncolect degreee is ",degree );
  return -1
  },

});
