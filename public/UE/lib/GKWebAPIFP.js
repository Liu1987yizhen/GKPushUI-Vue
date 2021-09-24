let auto_size = true;
let push_size = null;

function WebApiCalcClientSize() {
    if (this.is_gk) {
        if (GPSR._player)
            GPSR._player.CalcClientSize();
    }
}

function OnResizePushCanvas(size) {
    if (!size) return;
    push_size = size;
    let mCanvas = $('#geoking_remote_player');
    if (auto_size) {
        let ratio = size.imgh / size.imgw;
        mCanvas.css("width", '100%');
        mCanvas.css("height", '100%');
        let w = mCanvas.width();
        let h = mCanvas.height();
        if (h / w < ratio) {
            //宽度多了，以高度为准
            w = h / ratio + 'px';
            mCanvas.css("width", w);
        } else {
            h = w * ratio + 'px';
            mCanvas.css("height", h);
        }
    } else {
        mCanvas.css("width", size.imgw);
        mCanvas.css("height", size.imgh);
        mCanvas.attr("width", size.imgw * 2);
        mCanvas.attr("height", size.imgh * 2);
    }
    //更改窗口大小后要重新计算
    WebApiCalcClientSize();
}

window.onresize = function () {
    OnResizePushCanvas(push_size);

    let playerElement = document.getElementById('player');
    resizePlayerStyleToFillWindow(playerElement);
};

class WebAPIFP {
    is_gk = true;

    constructor(bg_type) {
        this.is_gk = $.trim(bg_type) === 'gk';
    }

    Initialize() {
        if (UIConfig.bg_tpe === "gk") {
            let params = {
                userName: UIConfig.gk.userName,
                chatUrl: UIConfig.gk.chatUrl,
                containerID: UIConfig.gk.containerID,
                tokenUrl: UIConfig.gk.tokenUrl,
            };
            GPSR.Initialize(params, function (e) {
                console.log(e);
            });
            //进度事件
            GPSR.AddEventHandle(GKP.EmEvent.PROGRESS, "g", function (e) {
                switch (e.type) {
                    case GKP.DStrType.OnWndSize:
                        OnResizePushCanvas(e.obj);
                        break;
                    case GKP.DStrType.PRO_COMPLETED:
                        console.log("pro_completed");
                    default:
                        break;
                }
            });
        }
        else {
            loadUE();
            let playerElement = document.getElementById("player");
            resizePlayerStyleToFillWindow(playerElement);
        }
    }

    /**
     * 获取窗体大小
     */
    WebApiGetWndSize() {
        if (this.is_gk) {
            return GPSR.mWndSize;
        } else {

        }
    }

    /**
     * 设置三维窗体大小
     * @param w
     * @param h
     */
    WebApiSetWndSize(w, h) {
        if (this.is_gk) {
            if (!GPSR.IsController()) {
                return;
            }
            if (!GPSR._player) {
                console.error("请在创建完毕后再设置三维窗体大小");
                return;
            }
            let wns = window.gk_wnd_size;
            if (!GKP.TL.isDefined(wns) || !GKP.TL.isDefined(wns.w) || !GKP.TL.isDefined(wns.h)) {
                wns = {w: 0, h: 0};
                window.gk_wnd_size = wns;
            }
            if (!GPSR._player.isRTC) {
                if (wns.w !== w || wns.h !== h) {
                    wns.w = w;
                    wns.h = h;
                    let json = {'ptype': 'setwsize', 'data': w + '*' + h};
                    GPSR._wst.send(JSON.stringify(json));
                }
            }
            else {
                if (wns.w !== w || wns.h !== h) {
                    wns.w = w;
                    wns.h = h;
                    GPSR.isResizing = true;
                    GPSR._wst.close();
                    GPSR.init_socket(null, w, h);
                }
            }
        }
    }


    /**
     *  根据物体name,飞往物体位置
     * @param name
     * @param durationSecond
     * @param toBack
     * @constructor
     */
    WebApiFlyToName(name, durationSecond = 2, toBack = false) {
        if (this.is_gk) {
            return GPManager.GetByName(name).then(function (e) {
                if (e) {
                    return GKWebAPI.WebApiFlyToObject(e.ObjectID, durationSecond, toBack);
                }
            });
        } else {
            geoKingViewer.flyTo(name);
        }
    }


    /**
     * 飞往制定位置
     * @param pos {x:1,y:1,z:1,yaw:1,pitch:1,range:1}
     * @param range
     * @param durationSecond
     * @param toBack
     * @constructor
     */
    WebApiFlyToPos(pos, range = 100, durationSecond = 2, toBack = false) {
        return GPNavigate.FlyToPos(pos, range, durationSecond, toBack);
    }

    WebApiFlyToObject(objectID, durationSecond = 2, toBack = false) {
        if (this.is_gk) {
            return GPNavigate.FlyToObject(objectID, durationSecond, toBack);
        }
    }

    /**
     * 停止飞行，包括停止跟随模式
     * @constructor
     */
    WebApiStopFly() {
        if (this.is_gk) {
            if (!GPNavigate.GKP.IsOwner(true))
                return;
            let json = {action: 's_camstop'};
            GPNavigate.GKP.command1(json);
        }
    }

    //=====RENDER=====//
    /**
     * 根据物体id设置颜色
     * @param objectID  ObjectID
     * @param color  HEX
     * @constructor
     */
    WebApiSetColor(objectID, color) {
        if (this.is_gk) {
            GPManager.GetByID(objectID).then(function (obj) {
                console.log(obj);
                obj.SetColor(color);
            })
        }
    }

    /**
     * 根据物体id设置透明度
     * @param objectID ObjectID
     * @param opacity 0-1
     * @constructor
     */
    WebApiSetOpacity(objectID, opacity) {
        if (this.is_gk) {
            GPManager.GetByID(objectID).then(function (obj) {
                obj.SetOpacity(opacity);
            })
        }
    }

    /**
     * 添加相机位置改变事件
     * @param fun
     * @constructor
     */
    WebApiAddEventHandleCamChange(fun) {
        if (this.is_gk) {
            GPSR.AddEventHandle(GKP.EmEvent.CAM_CHANGE, 'g', fun);
        } else {
            geoKingViewer.addEventListener(GeoKingViewer.EVENT_ROTATE, fun);
        }
    }

    /**
     * 销毁相机位置改变事件
     * @constructor
     */
    WebApiRemoveEventHandleCamChange() {
        if (this.is_gk) {
            GPSR.RemoveEventHandle(GKP.EmEvent.CAM_CHANGE);
        } else {
            geoKingViewer.removeEventListener(GeoKingViewer.EVENT_ROTATE);
        }
    }


    /**
     * 开始查询物体
     * @param fun
     * @constructor
     */
    WebApiStartGetObj(fun) {
        if (this.is_gk) {
            GPSR.AddEventHandle(GKP.EmEvent.MOUSE_EV, 'g', function (e) {
                switch (e.action) {
                    case GKP.DBinType.MS_CLICK: {
                        GPRender.Start3DTip('cSign');
                        GKWebAPI.WebApiGetObjectFromScreen(e.x, e.y).then(function (ee) {
                            fun(ee);
                        })
                    }
                        break;
                    default:
                        // console.log(e);
                        break;
                }
            });
        } else {
            geoKingViewer.addEventListener(GeoKingViewer.EVENT_POI, fun);
        }
    }

    /**
     * 结束查询物体
     * @constructor
     */
    WebApiEndGetObj() {
        if (this.is_gk) {
            GPRender.Stop3DTip('cSign');
            GPSR.RemoveEventHandle(GKP.EmEvent.MOUSE_EV, 'g');
        } else {
            geoKingViewer.removeEventListener(GeoKingViewer.EVENT_POI);
        }
    }


    /**
     * 根据屏幕坐标获取对象
     * @param x canvas的x坐标，小于1则为比例，鼠标事件中的数值
     * @param y canvas的y坐标，小于1则为比例，鼠标事件中的数值
     */
    WebApiGetObjectFromScreen(x, y) {
        if (this.is_gk) {
            return GPRender.GetObjectFromScreen(x, y);
        }
    }

    /**
     * 设置一个3D提示，3D场景会呈现边框
     * @param tipSign
     */
    WebApiStart3DTip(tipSign) {
        if (this.is_gk) {
            GPRender.Start3DTip(tipSign);
        }
    }

    /**
     * 停止一个3D提示  必须和Set3DTipStarting中的tipSign配对使用
     * @param tipSign
     */
    WebApiStop3DTip(tipSign) {
        if (this.is_gk) {
            GPRender.Stop3DTip(tipSign);
        }
    }

    //=====MANAGER=====//
    /**获取信息树json */
    WebApiGetdynatree() {
        if (this.is_gk) {
            return GPManager.Getdynatree();
        }
    }

    /**
     * 设置对象的可见性
     * @param objectID
     * @param show
     */
    WebApiSetVisible(objectID, show) {
        if (this.is_gk) {
            return GPManager.SetVisible(objectID, show);
        }
    }

    /**
     * 根据ID获取对象
     * @param objectID
     */
    WebApiGetByID(objectID) {
        return GPManager.GetByID(objectID);
    }


    //=====CREATOR=====//
    /**
     * 创建视点
     * @param name
     * @param pos
     */
    WebApiCreateViewPoint(name, pos) {
        if (this.is_gk) {
            return GPCreator.CreateViewPoint(name, {x: pos.x, y: pos.y, z: pos.z}, pos.yaw, pos.pitch, pos.range);
        }
    }

    WebApiCalcClientSize() {
        if (this.is_gk) {
            if (GPSR._player)
                GPSR._player.CalcClientSize();
        }
    }


    // ue4
    /**
     * 设置天气【ue独有】
     * setWeather(0)
     * setWeather(6)
     * @param weatherType 0-天晴； 6-下雨
     * @constructor
     */
    WebApiSetWeather(weatherType) {
        if (!this.is_gk) {
            geoKingViewer.setWeather(weatherType);
        }
    }

    /**
     * 设置时间【ue独有】
     * setTime(8)
     * setTime(22)
     * @param timeValue
     * @constructor
     */
    WebApiSetTime(timeValue) {
        if (!this.is_gk) {
            geoKingViewer.setTime(timeValue);
        }
    }

    /**
     * 设置fps【ue独有】
     * @constructor
     */
    WebApiSetFps() {
        if (!this.is_gk) {
            geoKingViewer.fps("");
        }
    }

    /**
     * 设置旋转
     * setRotation(-10,0) 向左移动
     * setRotation(10,0) 向右移动
     * @param yaw
     * @param pitch
     * @constructor
     */
    WebApiSetRotation(yaw, pitch) {
        if (!this.is_gk) {
            geoKingViewer.setRotation(yaw, pitch);
        } else {

        }
    }

    WebApiDeleteObjectByID(id) {
        if (!this.is_gk) {
        } else {
            return GPManager.DeleteObject(id);
        }
    }


    InitTmp() {
        $("#echart").hide();
        $("#external-iframe").hide();
        ['温度监测点位', '视频监测点位', '着火点'].forEach((item) => {
            GPManager.GetByName(item).then(function (obj) {
                if (obj.ObjectID) {
                    GPManager.DeleteObject(obj.ObjectID);
                }
            })
        })
    }

    sendServerMsg(datastr) {
        mysocket.emit('command', {
            from: 'UI',
            appname: 'GK',
            scene: 'COMMON',
            cmd: 'WEBUI_GK_SCENE_CHANGE',
            datastr: JSON.stringify(datastr),
        });
    }

    WebApiFireAnalysis(fireSpot, radius) {
        this.InitTmp();
        (function connect_Server() {
            let namespace = '/';
            window.appname = 'UI';
            window.serverURL = "ws://localhost:3001" + namespace;
            try {
                var socket = io.connect(window.serverURL);
                window.mysocket = socket;
                socket.on('connect', function () {
                    window.mysocket.emit('login', {appname: "UI"});
                });
            } catch (error) {
                console.log("connect_Server error: " + error.message);
            }
        })()

        let datastr = null;
        if (radius < 400) {
            datastr = {"project": "GYGDYS", "flag": "广阳岛验收-缓冲区300"};
        } else {
            datastr = {"project": "GYGDYS", "flag": "广阳岛验收-缓冲区500"};
        }

        this.sendServerMsg(datastr);

        let poi = {
            x: 67132.81,
            y: 68084.64,
            z: 383.41,
            yaw: 101.8233,
            pitch: -89.91875,
            range: 2249.808,
        };
        let name = "着火点";
        let imageUrl = "C:\\phpStudy\\PHPTutorial\\WWW\\point2.png";
        this.WebApiFlyToPos(poi, poi.range, 1, true).then(() => {
            GPCreator.CreateTerraLabel(name, poi, imageUrl, '22345');
        });

    }

    pointName = [];

    /**
     * 接入监测点位
     * @param config
     * @constructor
     */
    WebApiAddMonitor(config) {
        let name = config.name;
        let type = config.type;
        let url = config.url;
        let location = config.location;

        this.InitTmp();

        let imageUrl = "D:\\Code\\GK\\App\\Resources\\icon_kmz\\grn-diamond.png";
        let poi = {
            x: location.x,
            y: location.y,
            z: location.z,
            yaw: 16.1326,
            pitch: -32.07438,
            range: 200,
        };
        if (this.is_gk) {
            if (location) {

                // 已经配置location -> 飞往点位 -> 创建标签
                GPManager.GetByName(name).then(function (obj) {
                    if (obj.ObjectID) {
                        GPManager.DeleteObject(obj.ObjectID);
                    }
                })

                this.WebApiFlyToPos(poi, poi.range, 1, true).then(() => {
                    GPCreator.CreateTerraLabel(name, poi, imageUrl, '12345').then(() => {
                        // 展示图表或视频
                        this.showChart(type, url, name);
                    });
                });

            } else {
                //todo: 手动在场景中创建点
                this.showChart(type, url, name);
            }
        }
    }

    showChart(type, url, name) {
        if (type === 'video') {
            $('#external-iframe').show();
        } else if (type === 'json') {
            // $.dcqquery(url).then((jsonData) => {
            //     alert(jsonData);
            // });


            this.setEchart(name);
        }
    }

    setEchart(name) {
        this.InitTmp();

        var node = $('#echart');
        if (node.is(':visible')) {
            // node.hide();
        } else {
            node.show();
            var dom = document.getElementById("echart");
            var myChart = echarts.init(dom);
            var option;
            option = {
                title: {
                    text: 'title',
                    textStyle: {
                        fontSize: 12,
                    },
                },
                tooltip: {
                    trigger: 'axis',
                },
                xAxis: {
                    type: 'category',
                    data: ['01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [21.5, 22.5, 23.4, 23.3, 23.5, 23.8, 24.0, 24.2, 24.5, 24.8, 25.3, 25.8, 26.4, 26.5, 26.2, 26.0, 25.8, 25.4, 24.8, 23.5, 22.9, 22.0, 21.6, 21.5],
                    type: 'line'
                }]
            };

            if (option && typeof option === 'object') {
                // let j = JSON.parse(jsonData);
                option.title.text = name + '： 温度变化情况';
                // option.xAxis.data = j.time;
                // option.series[0].data = j.data;
                myChart.setOption(option);
            }
        }


    }

}

window.WebAPIFP = WebAPIFP
