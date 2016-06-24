var res = {
    background :"res/image/background.png",
    player: "res/image/player.png"
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