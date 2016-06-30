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

    this._configButton.addTouchEventListener(this.onClickConfig,this);
    this._openButton.addTouchEventListener(this.onClickOpen,this);

  },
  onClickOpen:function(button,type){
    if(type == 2){
      cc.log("button clicked");
      cc.eventManager.dispatchCustomEvent("custom","");
    }
  },
  onClickConfig:function(button,type){
    if(type == 2){
      cc.log("button Config");
    }
  },
  statusUpdate:function(model){
    // cc.eventManager.dispatchCustomEvent("custom","");
    var size = cc.winSize;
    var coin_count = model.get(model_keys.coin);
    var shake_count = model.get(model_keys.shake_count);
    var shake_count_max = model.get(model_keys.shake_count_max);

    // var str = cc.formatStr("コイン:%d",coin_count);
    this._coinLabel.setString(coin_count);
    // var coinLabel = new ccui.Text(str ,"Arial",20);
    // coinLabel.x = size.width/2;
    // coinLabel.y = size.height/2;


    this._shakeCountLabel.setString(cc.formatStr("振:%d",shake_count));
    this._shakeCountMaxLabel.setString(cc.formatStr("最高振:%d",shake_count_max));

  }

});
