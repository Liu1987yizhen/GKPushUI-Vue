const auto_size = true
let push_size = null

function OnResizePushCanvas(size) {
    if (!size) return
    push_size = size
    const mCanvas = document.querySelector('#geoking_remote_player')
    if (auto_size) {
        const ratio = size.imgh / size.imgw
        mCanvas.style.width = '100%'
        mCanvas.style.height = '100%'
        let w = mCanvas.style.width
        let h = mCanvas.style.height
        if (h / w < ratio) {
            // 宽度多了，以高度为准
            w = h / ratio + 'px'
            mCanvas.style.width = w
        } else {
            h = w * ratio + 'px'
            mCanvas.style.height = h
        }
    } else {
        mCanvas.style.width = size.imgw
        mCanvas.style.height = size.imgh
        mCanvas.setAttribute('width', size.imgw * 2)
        mCanvas.setAttribute('height', size.imgh * 2)
    }
    // 更改窗口大小后要重新计算
    window.WebAPIInstance && window.WebAPIInstance.WebApiCalcClientSize()
}

window.onresize = function () {
    OnResizePushCanvas(push_size)

    const playerElement = document.getElementById('player')
    resizePlayerStyleToFillWindow(playerElement)
}

class WebAPI {
    constructor() {
        this.is_gk = UIConfig.bg_tpe === 'gk';
        return this
    }

    Initialize() {
        if (this.is_gk) {
            var params = {
                userName: UIConfig.gk.userName,
                chatUrl: UIConfig.gk.chatUrl,
                containerID: UIConfig.gk.containerID,
                tokenUrl: UIConfig.gk.tokenUrl,
                wndWidth: UIConfig.gk.wndWidth,
                wndHeight: UIConfig.gk.wndHeight,
                launcherArray: UIConfig.gk.launcherArray,
                launchProUrl: UIConfig.gk.launchProUrl,
                /**推流集群启动过程回调，比如：function launch_progress(pos, info){}，错误发生时pos为-1，成功时为100 */
                launchProgress: this.launchProgress,
            };
            GPSR.Initialize(params, function (e) {
                console.log("----------===== " + e + " =====----------");
            });

        } else {
            $('#gktips').hide();
            loadUE();
            const playerElement = document.getElementById('player');
            resizePlayerStyleToFillWindow(playerElement);
        }
    }

    launchProgress(pos, info) {
        $('#gktips').html("<h3>" + '集群启动中...请稍后->' + info + "</h3>");
        if (pos < 0) {
            console.error(info);  //StartPush("");
        }
        else if (pos === 100) {
            $('#gkviewport').show();
            $('#gktips').hide();
            window.parent.gkCallback && window.parent.gkCallback()
        }
    }

    /*
    * 添加监听函数
    */
    addEventListener(type, fn) {
        geoKingViewer.addEventListener(type, fn)
    }

    /*
       * 注销监听函数
       */
    removeEventListener(type) {
        geoKingViewer.removeEventListener(type)
    }

    /**
     * 获取窗体大小
     */
    WebApiGetWndSize() {
        if (this.is_gk) {
            return GPSR.mWndSize
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
                return
            }
            if (!GPSR._player) {
                console.error('请在创建完毕后再设置三维窗体大小')
                return
            }
            let wns = window.gk_wnd_size
            if (!GKP.TL.isDefined(wns) || !GKP.TL.isDefined(wns.w) || !GKP.TL.isDefined(wns.h)) {
                wns = { w: 0, h: 0 }
                window.gk_wnd_size = wns
            }
            if (!GPSR._player.isRTC) {
                if (wns.w !== w || wns.h !== h) {
                    wns.w = w
                    wns.h = h
                    const json = { 'ptype': 'setwsize', 'data': w + '*' + h }
                    GPSR._wst.send(JSON.stringify(json))
                }
            } else {
                if (wns.w !== w || wns.h !== h) {
                    wns.w = w
                    wns.h = h
                    GPSR.isResizing = true
                    GPSR._wst.close()
                    GPSR.init_socket(null, w, h)
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
    flyTo(name, durationSecond = 2, toBack = false) {
        if (this.is_gk) {
            return GPManager.GetByName(name).then(function (e) {
                if (e) {
                    return window.WebAPIInstance.WebApiFlyToObject(e.ObjectID, durationSecond, toBack)
                }
            })
        } else {
            geoKingViewer.flyTo(name)
        }
    }

    WebApiFlyToObject(objectID, durationSecond = 2, toBack = false) {
        if (this.is_gk) {
            return GPNavigate.FlyToObject(objectID, durationSecond, toBack)
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
     * 停止飞行，包括停止跟随模式
     * @constructor
     */
    WebApiStopFly() {
        if (this.is_gk) {
            if (!GPNavigate.GKP.IsOwner(true)) {
                return
            }
            const json = { action: 's_camstop' }
            GPNavigate.GKP.command1(json)
        }
    }

    // =====RENDER=====//
    /**
     * 根据物体id设置颜色
     * @param objectID  ObjectID
     * @param color  HEX
     * @constructor
     */
    WebApiSetColor(objectID, color) {
        if (this.is_gk) {
            GPManager.GetByID(objectID).then(function (obj) {
                console.log(obj)
                obj.SetColor(color)
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
                obj.SetOpacity(opacity)
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
            GPSR.AddEventHandle(GKP.EmEvent.CAM_CHANGE, 'g', fun)
        } else {
            geoKingViewer.addEventListener(GeoKingViewer.EVENT_ROTATE, fun)
        }
    }

    /**
     * 销毁相机位置改变事件
     * @constructor
     */
    WebApiRemoveEventHandleCamChange() {
        if (this.is_gk) {
            GPSR.RemoveEventHandle(GKP.EmEvent.CAM_CHANGE)
        } else {
            geoKingViewer.removeEventListener(GeoKingViewer.EVENT_ROTATE)
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
                        GPRender.Start3DTip('cSign')
                        window.WebAPIInstance.WebApiGetObjectFromScreen(e.x, e.y).then(function (ee) {
                            fun(ee)
                        })
                    }
                        break
                    default:
                        // console.log(e);
                        break
                }
            })
        } else {
            geoKingViewer.addEventListener(GeoKingViewer.EVENT_POI, fun)
            geoKingViewer.addEventListener(GeoKingViewer.EVENT_BIM, fun)
        }
    }

    /**
     * 结束查询物体
     * @constructor
     */
    WebApiEndGetObj() {
        if (this.is_gk) {
            GPRender.Stop3DTip('cSign')
            GPSR.RemoveEventHandle(GKP.EmEvent.MOUSE_EV, 'g')
        } else {
            geoKingViewer.removeEventListener(GeoKingViewer.EVENT_POI)
        }
    }

    /**
     * 根据屏幕坐标获取对象
     * @param x canvas的x坐标，小于1则为比例，鼠标事件中的数值
     * @param y canvas的y坐标，小于1则为比例，鼠标事件中的数值
     */
    WebApiGetObjectFromScreen(x, y) {
        if (this.is_gk) {
            return GPRender.GetObjectFromScreen(x, y)
        }
    }

    /**
     * 设置一个3D提示，3D场景会呈现边框
     * @param tipSign
     */
    WebApiStart3DTip(tipSign) {
        if (this.is_gk) {
            GPRender.Start3DTip(tipSign)
        }
    }

    /**
     * 停止一个3D提示  必须和Set3DTipStarting中的tipSign配对使用
     * @param tipSign
     */
    WebApiStop3DTip(tipSign) {
        if (this.is_gk) {
            GPRender.Stop3DTip(tipSign)
        }
    }

    // =====MANAGER=====//
    /** 获取信息树json */
    WebApiGetdynatree() {
        if (this.is_gk) {
            return GPManager.Getdynatree()
        }
    }

    /**
     * 设置对象的可见性
     * @param objectID
     * @param show
     */
    WebApiSetVisible(objectID, show) {
        if (this.is_gk) {            
            // 方法一
            // GPManager.GetByID(objectID).then(function (data) {
            //     data.SetVisible(show);
            // });

            // 方法二
            let obj = new GKP.GKObject(objectID);
            return obj.SetVisible(show);
        }
    }

    /**
     * 根据ID获取对象
     * @param objectID
     */
    WebApiGetByID(objectID) {
        return GPManager.GetByID(objectID)
    }

    // =====CREATOR=====//
    /**
     * 创建视点
     * @param name
     * @param pos
     */
    WebApiCreateViewPoint(name, pos) {
        if (this.is_gk) {
            return GPCreator.CreateViewPoint(name, { x: pos.x, y: pos.y, z: pos.z }, pos.yaw, pos.pitch, pos.range)
        }
    }

    WebApiCalcClientSize() {
        if (this.is_gk) {
            if (GPSR._player) {
                GPSR._player.CalcClientSize()
            }
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
            geoKingViewer.setWeather(weatherType)
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
            geoKingViewer.setTime(timeValue)
        }
    }

    /**
     * 设置fps【ue独有】
     * @constructor
     */
    WebApiSetFps() {
        if (!this.is_gk) {
            geoKingViewer.fps('')
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
            geoKingViewer.setRotation(yaw, pitch)
        } else {

        }
    }

    /**
     * 设置Cesium数据加载/卸载
     * @param {*} url 服务地址
     * @param {*} tag 服务tag
     * @param {*} visible 可见性
     */
    WebApiSetCesium(url, tag, visible, height = 0) {
        if (!this.is_gk) {
            geoKingViewer.setCesium(url, tag, visible, height)
        } else {

        }
    }

    // BIM 足球场
    /**
     * 显隐建筑/结构
     * setLayerVisble('JZ_1F_Map',true)
     * setLayerVisble('JZ_1F_Map',false)
     * setLayerVisble('JG_Topf',true)
     * setLayerVisble('JG_Topf',false)
     * @param layerName
     * @param visible
     * @constructor
     */
    WebApiSetLayerVisble(layerName, visible) {
        if (!this.is_gk) {
            geoKingViewer.setLayerVisble(layerName, visible)
        } else {
            alert('该接口目前仅支持ue环境.')
        }
    }

    /**
     * 设置可见性
     * 合川
     * @param {*} levelName  "L1,L2,L3" or levelName:"L1"
     * @param {*} visable
     */
    WebApiSetLayer(levelName, visable) {
        if (!this.is_gk) {
            geoKingViewer.setLayer(levelName, visable)
        } else {
            alert('该接口目前仅支持ue环境.')
        }
    }

    /**
     * 显隐热力图
     * setHotmapVisible(true)
     * setHotmapVisible(false)
     * @param visible
     * @constructor
     */
    WebApiSetHotmapVisible(visible) {
        if (!this.is_gk) {
            geoKingViewer.setHotmapVisible(visible)
        } else {
            alert('该接口目前仅支持ue环境.')
        }
    }

    /**
     * 设置热力图值（0-1）
     * @param value
     * @constructor
     */
    WebApiSetHotmapVal(value) {
        if (!this.is_gk) {
            geoKingViewer.setHotmapVal(value)
        } else {
            alert('该接口目前仅支持ue环境.')
        }
    }

    /**
     * MoveTo
     * @param posIndex
     * @constructor
     */
    WebApiMoveTo(posIndex) {
        if (!this.is_gk) {
            geoKingViewer.posIndex(posIndex)
        } else {
            alert('该接口目前仅支持ue环境.')
        }
    }

    /**
     * 进入/退出 横向剖面模式
     * @param flag
     * @constructor
     */
    WebApiopenSection(flag) {
        if (!this.is_gk) {
            geoKingViewer.openSection(flag)
        } else {
            alert('该接口目前仅支持ue环境.')
        }
    }

    /**
     * 设置剖面高度插值
     * @param val  0-1（对应0m-60m）
     * @constructor
     */
    WebApiSetSectionHigh(val) {
        if (!this.is_gk) {
            geoKingViewer.setSectionHigh(val)
        } else {
            alert('该接口目前仅支持ue环境.')
        }
    }

    /**
     * 动态增加数据
     * @param url
     * @param tag
     * @constructor
     */
    WebApiAddData(url, tag = '', height = 0, callback = null) {
        if (!this.is_gk) {
            this.WebApiSetCesium(url, tag, true, height);
        } else {
            GPCreator.CreateGKDBLayer(url).then(e => {
                this.WebApiFlyToObject(e.ObjectID);
                this.WebApiGetdynatree().then(data => {
                    callback && callback(data);
                })
                console.log(e);
            });
        }
    }

    /**
     * 动态移除数据
     * @param url
     * @param tag
     * @constructor
     */
    WebApiRemoveData(url, tag = '') {
        if (!this.is_gk) {
            this.WebApiSetCesium(url, tag, false);
        } else {
            url = url.trim();
            if (url.length < 6) return;
            if (url.charAt(1) === ":" || url.charAt(4) === ":" || url.charAt(5) === ":") {
                GPManager.GetLayerByURL(url).then(e => {
                    console.log(e);
                    if (e.length > 0) {
                        GPManager.DeleteObject(e).then(c => {
                            console.log(c);
                        });
                    }
                });
            }
            else {
                GPManager.DeleteObject(e).then(c => {
                    console.log(c);
                });
            }
        }
    }

    /**
     * 重置场景，清空所有数据
     */
    WebApiReset(){
        if(!this.is_gk)
        {
            this.WebApiSetCesium('','','','',true);
        }else{
            // todo gk
        }
    }


}

// window.GKWebAPI = new WebAPI();
// 嵌入iframe使用时 不需要先初始化一个实例 在父级窗口初始化
window.WebAPI = WebAPI
