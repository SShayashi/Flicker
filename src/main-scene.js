var MainScene = cc.Scene.extend({
  space:null,
  actionlayer:null,
  //chipmunkの物理空間の初期化
  initPhysics: function () {
  this.space = new cp.Space();
  var size = cc.director.getWinSize();
  var THICKNESS = 1000;
  // 壁を作る
  var walls = [
    //下上左右の順番
      new cp.SegmentShape(this.space.staticBody, cp.v(-THICKNESS, -THICKNESS), cp.v(size.width + THICKNESS, -THICKNESS), THICKNESS),
      new cp.SegmentShape(this.space.staticBody, cp.v(-THICKNESS, size.height + THICKNESS ), cp.v(size.width + THICKNESS, size.height + THICKNESS), THICKNESS),
      new cp.SegmentShape(this.space.staticBody, cp.v(-THICKNESS, -THICKNESS), cp.v(-THICKNESS, size.height + THICKNESS), THICKNESS),
      new cp.SegmentShape(this.space.staticBody, cp.v(size.width + THICKNESS, -THICKNESS), cp.v(size.width + THICKNESS, size.height + THICKNESS), THICKNESS)
  ];
  for (var i = 0; i < walls.length; i++) {
      var shape = walls[i];
      shape.setElasticity(1);
      shape.setFriction(0);
      shape.setCollisionType(collision.WALL);
      this.space.addStaticShape(shape);
    }
    this.space.gravity = cp.v(0, 0); // 下方向に重力を設定する

    this._debugNode = new cc.PhysicsDebugNode(this.space); // 物体の形状を表示するデバッグノードを作成
    this._debugNode.setVisible(true); // 表示する
    this.addChild(this._debugNode, 10); // 自ノード（レイヤー）の最前面に追加
  },

  /** @override */
  update: function(dt) {
    this.space && this.space.step(dt);
    this.actionlayer.actionUpdate();
  },

  onEnter:function () {
       // API リファレンスに書いてある通り，
       // onEnter の中では必ず this._super() を呼ばなくてはならない．
       this._super();
       this.initPhysics();
       //書くレイヤーを読み込む
       this.actionlayer = new ActionLayer(this.space);
       this.addChild(this.actionlayer);
       this.scheduleUpdate();
   }
});
