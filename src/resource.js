var res = {
    background :"res/image/background.png",
    player_default: "res/image/player00.png",
    player_touch: "res/image/player01.png",
    crash_star:"res/particle/pop_star.plist",
    p_star:"res/particle/star.png",
    pop_coin:"res/particle/pop_coin.plist",
    p_coin:"res/particle/pop_coin.png",
    StatusLayer_json:"res/StatusLayer-web.json"
};
var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

//衝突番号
var collision = {
		WALL:0,
		PLAYER:1,
		OBJE:2
};

var state = {
  tutorial:"-1",
  shake:"0",
  action:"1",
  result:"2"
}
var PI = 3.141592653589793;
