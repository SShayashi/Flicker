var res = {
    background :"res/image/background.png",
    player: "res/image/player.png",
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

var PI = 3.141592653589793;