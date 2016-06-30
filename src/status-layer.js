var StatusLayer = cc.Layer.extend({
  prop:{
    configButton:"config",
    openButton:"open",
    coinLabel:"coin",
    shakeCountLabel:"shake_count",
    shakeCountMaxLabel:"shake_count_max",
  },
  _configButton:null,
  _openButton:null,
  _coinLabel:null,
  _shakeCountLabel:null,
  _shakeCountMaxLabel:null,
  _statuslayer:null,
  ctor:function() {
    this._super();
    var layer = ccs.csLoader.createNode(res.StatusLayer_json);
    this._statuslayer = layer;
    this.addChild(this._statuslayer);
    this.init();
  },
  init:function(){
    this._configButton = ccui.helper.seekWidgetByName(this,this.prop.configButton);
    this._openButton = ccui.helper.seekWidgetByName(this, this.prop.openButton);
    this._coinLabel = ccui.helper.seekWidgetByName(this, this.prop.coinLabel);
    this._shakeCountLabel = ccui.helper.seekWidgetByName(this, this.prop.shakeCountLabel);
    this._shakeCountMaxLabel = ccui.helper.seekWidgetByName(this, this.prop.shakeCountMaxLabel);

    model = Model.getInstance();
    this.statusUpdate(model);
  },
  statusUpdate:function(model){
    var coin_count = model.get(model_keys.coin);
    var shake_count = model.get(model_keys.shake_count);
    var shake_count_max = model.get(model_keys.shake_count_max);

    this._coinLabel.setString(cc.formatStr("コイン：%d", coin_count));
    this._shakeCountLabel.setString(cc.formatStr("降った回数：%d", shake_count));
    this._shakeCountLabel.setString(cc.formatStr("降った最高回数：%d", shake_count_max));

  }

});
