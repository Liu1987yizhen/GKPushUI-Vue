// window.UIConfig = window.configs.main
function Init() {
    GKWebAPI.Initialize();
}

function flyTo(name) {
    GKWebAPI.WebApiFlyToName(name);
}

function setWeather(flag) {
    GKWebAPI.WebApiSetWeather(flag);
}

function setOpacity() {
    if (!GKWebAPI.is_gk) {
        alert('ue环境暂不支持.');
        return;
    }
    GPNavigate.FlyToObject('215dcc96398c3f9a09b0ab1a91be093b$g1_ycn63_zy_bui_56', 1, true).then(function () {
        let opacity = prompt("透明度：", '0.5');
        GKWebAPI.WebApiSetOpacity('215dcc96398c3f9a09b0ab1a91be093b$g1_ycn63_zy_bui_56', opacity);
    });
    // GKWebAPI.WebApiFlyToObject('215dcc96398c3f9a09b0ab1a91be093b$g1_ycn63_zy_bui_56', 1, true).then(function () {
    //     let opacity = prompt("透明度：", '0.5');
    //     GKWebAPI.WebApiSetOpacity('215dcc96398c3f9a09b0ab1a91be093b$g1_ycn63_zy_bui_56', opacity);
    // });
}

function setColor() {
    if (!GKWebAPI.is_gk) {
        alert('ue环境暂不支持.');
        return;
    }
    GKWebAPI.WebApiFlyToObject('215dcc96398c3f9a09b0ab1a91be093b$g1_ycn63_zy_bui_56', 1, true).then(function () {
        let color = prompt("颜色：", '#00FF00');
        GKWebAPI.WebApiSetColor('215dcc96398c3f9a09b0ab1a91be093b$g1_ycn63_zy_bui_56', color);
    });
}

function setRotationLeft() {
    GKWebAPI.WebApiSetRotation(-10, 0)
}

function setRotationRight() {
    GKWebAPI.WebApiSetRotation(10, 0)
}

function addCamChange() {
    GKWebAPI.WebApiAddEventHandleCamChange(function (e) {
        $('#camera-info').html('相机信息：' + JSON.stringify(e));
    })
}

function removeCamChange() {
    GKWebAPI.WebApiRemoveEventHandleCamChange();
    $('#camera-info').html('');
}

function startGetObj() {
    GKWebAPI.WebApiStartGetObj(function (e) {
        $('#obj-info').html('物体信息：' + JSON.stringify(e));
    })
}

function endGetObj() {
    GKWebAPI.WebApiEndGetObj();
    $('#obj-info').html('');
}


/**
 * UE BIM足球场
 */
function setLayerVisble(levelName, visible) {
    GKWebAPI.WebApiSetLayerVisble(levelName, visible);
}

function setHotmapVisible(visible) {
    GKWebAPI.WebApiSetHotmapVisible(visible);
}

function setHotmapVal() {
    let hotval = document.getElementById("range").value;
    GKWebAPI.WebApiSetHotmapVal(hotval);
}

function MoveTo(posIndex) {
    GKWebAPI.WebApiMoveTo(posIndex);
}

function openSection(flag) {
    GKWebAPI.WebApiopenSection(flag);
}

function setSectionHigh() {
    let val = document.getElementById("gdcz").value;
    GKWebAPI.WebApiSetSectionHigh(val);
}

/**
 * 设置可见性
 * BIM 合川
 * @param {*} levelName  "L1,L2,L3" or levelName:"L1"
 * @param {*} visable
 */
function setLayer(levelName, visable) {
    GKWebAPI.WebApiSetLayer(levelName, visable);
}

/**
 * 动态增加数据
 */
function addData() {
    let url = "http://172.16.8.64:12308/api/honeycomb/gk3doptile/wulongnan135sj_op";
    url = 'D:/Data/[xlhpq]兴龙湖片区.GKF';
    GKWebAPI.WebApiAddData(url);
}

/**
 * 动态移除数据
 */
function removeData() {
    let url = "http://172.16.8.64:12308/api/honeycomb/gk3doptile/wulongnan135sj_op";
    url = 'D:/Data/[xlhpq]兴龙湖片区.GKF';
    GKWebAPI.WebApiRemoveData(url);
}