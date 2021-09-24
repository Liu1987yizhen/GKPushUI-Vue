var GKP;
(function (GKP) {
    GKP.VERSION = 100028;
    GKP.VERSERV = 100000;
    let DBinType;
    (function (DBinType) {
        DBinType[DBinType["NONE"] = 0] = "NONE";
        DBinType[DBinType["PIC"] = 1] = "PIC";
        DBinType[DBinType["CAM_POS"] = 2] = "CAM_POS";
        DBinType[DBinType["MS_CLICK"] = 10] = "MS_CLICK";
        DBinType[DBinType["MS_DB"] = 11] = "MS_DB";
        DBinType[DBinType["MS_DOWN"] = 12] = "MS_DOWN";
        DBinType[DBinType["MS_UP"] = 13] = "MS_UP";
        DBinType[DBinType["MS_MOVE"] = 14] = "MS_MOVE";
        DBinType[DBinType["MS_WHEEL"] = 15] = "MS_WHEEL";
    })(DBinType = GKP.DBinType || (GKP.DBinType = {}));
    let DStrType;
    (function (DStrType) {
        DStrType[DStrType["OnWndSize"] = -3] = "OnWndSize";
        DStrType[DStrType["CLOSE"] = -2] = "CLOSE";
        DStrType[DStrType["ERROR"] = -2] = "ERROR";
        DStrType[DStrType["OPENING"] = -1] = "OPENING";
        DStrType[DStrType["TEST"] = 0] = "TEST";
        DStrType[DStrType["OPENED"] = 1] = "OPENED";
        DStrType[DStrType["PRO_COMPLETED"] = 2] = "PRO_COMPLETED";
        DStrType[DStrType["ONLINE"] = 3] = "ONLINE";
        DStrType[DStrType["OUT"] = 4] = "OUT";
        DStrType[DStrType["FORCEOUT"] = 5] = "FORCEOUT";
        DStrType[DStrType["CTRL"] = 6] = "CTRL";
        DStrType[DStrType["TREE_Fun"] = 7] = "TREE_Fun";
        DStrType[DStrType["USERMSG"] = 8] = "USERMSG";
        DStrType[DStrType["COMMAND"] = 9] = "COMMAND";
        DStrType[DStrType["NOTICE"] = 20] = "NOTICE";
        DStrType[DStrType["EXTEND"] = 99] = "EXTEND";
    })(DStrType = GKP.DStrType || (GKP.DStrType = {}));
    ;
    let EmViewportMode;
    (function (EmViewportMode) {
        EmViewportMode[EmViewportMode["GK_VM_MODE_SINGLE"] = 1] = "GK_VM_MODE_SINGLE";
        EmViewportMode[EmViewportMode["GK_VM_MODE_QUAD"] = 4] = "GK_VM_MODE_QUAD";
        EmViewportMode[EmViewportMode["GK_VM_MODE_SUBVIEW"] = 8] = "GK_VM_MODE_SUBVIEW";
        EmViewportMode[EmViewportMode["GK_WM_MODE_VER_2"] = 32] = "GK_WM_MODE_VER_2";
        EmViewportMode[EmViewportMode["GK_WM_MODE_VER_3"] = 33] = "GK_WM_MODE_VER_3";
        EmViewportMode[EmViewportMode["GK_VM_MODE_HOR_2"] = 64] = "GK_VM_MODE_HOR_2";
        EmViewportMode[EmViewportMode["GK_VM_MODE_HOR_3"] = 65] = "GK_VM_MODE_HOR_3";
        EmViewportMode[EmViewportMode["GK_VM_MODE_HOR_4"] = 66] = "GK_VM_MODE_HOR_4";
    })(EmViewportMode = GKP.EmViewportMode || (GKP.EmViewportMode = {}));
    let EmProjectionType;
    (function (EmProjectionType) {
        EmProjectionType[EmProjectionType["GK_CAM_PROJ_PERSPECTIVE"] = 1] = "GK_CAM_PROJ_PERSPECTIVE";
        EmProjectionType[EmProjectionType["GK_CAM_PROJ_ORTHOGRAPHIC"] = 2] = "GK_CAM_PROJ_ORTHOGRAPHIC";
    })(EmProjectionType = GKP.EmProjectionType || (GKP.EmProjectionType = {}));
    let EmManipMode;
    (function (EmManipMode) {
        EmManipMode[EmManipMode["GMANIP_FREE"] = 0] = "GMANIP_FREE";
        EmManipMode[EmManipMode["GMANIP_FRIST_PERSON"] = 1] = "GMANIP_FRIST_PERSON";
    })(EmManipMode = GKP.EmManipMode || (GKP.EmManipMode = {}));
    let GKAnaType;
    (function (GKAnaType) {
        GKAnaType[GKAnaType["None"] = 0] = "None";
        GKAnaType[GKAnaType["MeasurePoint"] = 1] = "MeasurePoint";
        GKAnaType[GKAnaType["MeasureHor"] = 2] = "MeasureHor";
        GKAnaType[GKAnaType["MeasureVer"] = 3] = "MeasureVer";
        GKAnaType[GKAnaType["MeasureSpace"] = 4] = "MeasureSpace";
        GKAnaType[GKAnaType["MeasureArea"] = 5] = "MeasureArea";
    })(GKAnaType = GKP.GKAnaType || (GKP.GKAnaType = {}));
    let EmVisualAnalyse;
    (function (EmVisualAnalyse) {
        EmVisualAnalyse[EmVisualAnalyse["VA_MODE_NONE"] = 0] = "VA_MODE_NONE";
        EmVisualAnalyse[EmVisualAnalyse["VA_MODE_HEIGHT"] = 1] = "VA_MODE_HEIGHT";
        EmVisualAnalyse[EmVisualAnalyse["VA_MODE_VIEWSHED"] = 2] = "VA_MODE_VIEWSHED";
        EmVisualAnalyse[EmVisualAnalyse["VA_MODE_SHADOW"] = 3] = "VA_MODE_SHADOW";
        EmVisualAnalyse[EmVisualAnalyse["VA_MODE_LINEOFSIGHT"] = 4] = "VA_MODE_LINEOFSIGHT";
        EmVisualAnalyse[EmVisualAnalyse["VA_MODE_SKYLINE"] = 5] = "VA_MODE_SKYLINE";
        EmVisualAnalyse[EmVisualAnalyse["VA_MODE_SECTION"] = 6] = "VA_MODE_SECTION";
    })(EmVisualAnalyse = GKP.EmVisualAnalyse || (GKP.EmVisualAnalyse = {}));
    let EmStereoMode;
    (function (EmStereoMode) {
        EmStereoMode[EmStereoMode["NONE"] = -1] = "NONE";
        EmStereoMode[EmStereoMode["QUAD_BUFFER"] = 0] = "QUAD_BUFFER";
        EmStereoMode[EmStereoMode["ANAGLYPHIC"] = 1] = "ANAGLYPHIC";
        EmStereoMode[EmStereoMode["HORIZONTAL_SPLIT"] = 2] = "HORIZONTAL_SPLIT";
        EmStereoMode[EmStereoMode["VERTICAL_SPLIT"] = 3] = "VERTICAL_SPLIT";
        EmStereoMode[EmStereoMode["LEFT_EYE"] = 4] = "LEFT_EYE";
        EmStereoMode[EmStereoMode["RIGHT_EYE"] = 5] = "RIGHT_EYE";
        EmStereoMode[EmStereoMode["HORIZONTAL_INTERLACE"] = 6] = "HORIZONTAL_INTERLACE";
        EmStereoMode[EmStereoMode["VERTICAL_INTERLACE"] = 7] = "VERTICAL_INTERLACE";
        EmStereoMode[EmStereoMode["CHECKERBOARD"] = 8] = "CHECKERBOARD";
    })(EmStereoMode = GKP.EmStereoMode || (GKP.EmStereoMode = {}));
    let EmFilter;
    (function (EmFilter) {
        EmFilter[EmFilter["GK_FILTER_FIRST"] = 1] = "GK_FILTER_FIRST";
        EmFilter[EmFilter["GK_FILTER_ENTITY"] = 2] = "GK_FILTER_ENTITY";
        EmFilter[EmFilter["GK_FILTER_FEATURE"] = 4] = "GK_FILTER_FEATURE";
        EmFilter[EmFilter["GK_FILTER_TERRAOBJECT"] = 8] = "GK_FILTER_TERRAOBJECT";
        EmFilter[EmFilter["GK_FILTER_PIPE"] = 16] = "GK_FILTER_PIPE";
        EmFilter[EmFilter["GK_FILTER_MESH"] = 32] = "GK_FILTER_MESH";
        EmFilter[EmFilter["GK_FILTER_TERRAIN"] = 64] = "GK_FILTER_TERRAIN";
        EmFilter[EmFilter["GK_FILTER_UNDERGROUD"] = 128] = "GK_FILTER_UNDERGROUD";
        EmFilter[EmFilter["GK_FILTER_ALL"] = 16777215] = "GK_FILTER_ALL";
    })(EmFilter = GKP.EmFilter || (GKP.EmFilter = {}));
    let EmObjectType;
    (function (EmObjectType) {
        EmObjectType[EmObjectType["OT_UNKNOWN"] = -1] = "OT_UNKNOWN";
        EmObjectType[EmObjectType["OT_OBJECT"] = 0] = "OT_OBJECT";
        EmObjectType[EmObjectType["OT_GROUP"] = 1] = "OT_GROUP";
        EmObjectType[EmObjectType["OT_COLLECTION"] = 2] = "OT_COLLECTION";
        EmObjectType[EmObjectType["OT_SKY"] = 3] = "OT_SKY";
        EmObjectType[EmObjectType["OT_IMAGE_LAYER"] = 4] = "OT_IMAGE_LAYER";
        EmObjectType[EmObjectType["OT_ELEVATION_LAYER"] = 5] = "OT_ELEVATION_LAYER";
        EmObjectType[EmObjectType["OT_FEATURE_LAYER"] = 6] = "OT_FEATURE_LAYER";
        EmObjectType[EmObjectType["OT_MODEL_LAYER"] = 7] = "OT_MODEL_LAYER";
        EmObjectType[EmObjectType["OT_MESH_LAYER"] = 8] = "OT_MESH_LAYER";
        EmObjectType[EmObjectType["OT_TERRAIN_LAYERS"] = 9] = "OT_TERRAIN_LAYERS";
        EmObjectType[EmObjectType["OT_TERRAOBJECT_LAYER"] = 10] = "OT_TERRAOBJECT_LAYER";
        EmObjectType[EmObjectType["OT_MODELENTITY"] = 11] = "OT_MODELENTITY";
        EmObjectType[EmObjectType["OT_MODELENTITYGROUP"] = 12] = "OT_MODELENTITYGROUP";
        EmObjectType[EmObjectType["OT_FEATURE"] = 13] = "OT_FEATURE";
        EmObjectType[EmObjectType["OT_TERRA_IMAGE"] = 14] = "OT_TERRA_IMAGE";
        EmObjectType[EmObjectType["OT_PIPELINE"] = 15] = "OT_PIPELINE";
        EmObjectType[EmObjectType["OT_BIM"] = 16] = "OT_BIM";
        EmObjectType[EmObjectType["OT_TERRA_FEATURE"] = 17] = "OT_TERRA_FEATURE";
        EmObjectType[EmObjectType["OT_TERRA_FEATURES"] = 18] = "OT_TERRA_FEATURES";
        EmObjectType[EmObjectType["OT_TERRA_PARTICLE"] = 19] = "OT_TERRA_PARTICLE";
        EmObjectType[EmObjectType["OT_TERRA_TEXTLABEL"] = 20] = "OT_TERRA_TEXTLABEL";
        EmObjectType[EmObjectType["OT_TERRA_MODEL"] = 21] = "OT_TERRA_MODEL";
        EmObjectType[EmObjectType["OT_TERRA_LABEL"] = 22] = "OT_TERRA_LABEL";
        EmObjectType[EmObjectType["OT_TERRA_RECTANGLE"] = 23] = "OT_TERRA_RECTANGLE";
        EmObjectType[EmObjectType["OT_TERRA_TRACK"] = 24] = "OT_TERRA_TRACK";
        EmObjectType[EmObjectType["OT_TERRA_MODIFIER"] = 25] = "OT_TERRA_MODIFIER";
        EmObjectType[EmObjectType["OT_TERRA_CIRCLE"] = 26] = "OT_TERRA_CIRCLE";
        EmObjectType[EmObjectType["OT_TERRA_ELLIPSE"] = 27] = "OT_TERRA_ELLIPSE";
        EmObjectType[EmObjectType["OT_TERRA_GEOMETRY"] = 28] = "OT_TERRA_GEOMETRY";
        EmObjectType[EmObjectType["OT_TERRA_POLYLINE"] = 29] = "OT_TERRA_POLYLINE";
        EmObjectType[EmObjectType["OT_TERRA_POLYGON"] = 30] = "OT_TERRA_POLYGON";
        EmObjectType[EmObjectType["OT_TERRA_HOLE"] = 31] = "OT_TERRA_HOLE";
        EmObjectType[EmObjectType["OT_TERRA_WATER"] = 32] = "OT_TERRA_WATER";
        EmObjectType[EmObjectType["OT_TERRA_DYNAMICOBJECT"] = 33] = "OT_TERRA_DYNAMICOBJECT";
        EmObjectType[EmObjectType["OT_POINTCLOUD_LAYER"] = 34] = "OT_POINTCLOUD_LAYER";
        EmObjectType[EmObjectType["OT_PATHROUTE"] = 35] = "OT_PATHROUTE";
        EmObjectType[EmObjectType["OT_MESHENTITY"] = 36] = "OT_MESHENTITY";
        EmObjectType[EmObjectType["OT_VIEW_POINT"] = 37] = "OT_VIEW_POINT";
    })(EmObjectType = GKP.EmObjectType || (GKP.EmObjectType = {}));
    let EmItemCode;
    (function (EmItemCode) {
        EmItemCode[EmItemCode["CHILD"] = 11] = "CHILD";
        EmItemCode[EmItemCode["NEXT"] = 13] = "NEXT";
        EmItemCode[EmItemCode["NEXTVISIBLE"] = 14] = "NEXTVISIBLE";
        EmItemCode[EmItemCode["PARENT"] = 15] = "PARENT";
        EmItemCode[EmItemCode["PREVIOUS"] = 16] = "PREVIOUS";
        EmItemCode[EmItemCode["PREVIOUSVISIBLE"] = 17] = "PREVIOUSVISIBLE";
        EmItemCode[EmItemCode["ROOT"] = 18] = "ROOT";
    })(EmItemCode = GKP.EmItemCode || (GKP.EmItemCode = {}));
    let EmEvent;
    (function (EmEvent) {
        EmEvent[EmEvent["CAM_CHANGE"] = 1] = "CAM_CHANGE";
        EmEvent[EmEvent["PROGRESS"] = 2] = "PROGRESS";
        EmEvent[EmEvent["MOUSE_EV"] = 3] = "MOUSE_EV";
        EmEvent[EmEvent["NOTICE"] = 4] = "NOTICE";
    })(EmEvent = GKP.EmEvent || (GKP.EmEvent = {}));
    GKP.TL = {
        toString: Object.prototype.toString,
        isIterable: function (v) {
            if (GKP.TL.isArray(v) || v.callee) {
                return true;
            }
            if (/NodeList|HTMLCollection/.test(GKP.TL.toString.call(v))) {
                return true;
            }
            return ((typeof v.nextNode != 'undefined' || v.item) && GKP.TL.isNumber(v.length));
        },
        isEmpty: function (v, allowBlank) {
            return v === null || v === undefined || ((GKP.TL.isArray(v) && !v.length)) || (!allowBlank ? v === '' : false);
        },
        isArray: function (v) {
            return GKP.TL.toString.apply(v) === '[object Array]';
        },
        isDate: function (v) {
            return GKP.TL.toString.apply(v) === '[object Date]';
        },
        isObject: function (v) {
            return !!v && GKP.TL.toString.call(v) === '[object Object]';
        },
        isPrimitive: function (v) {
            return GKP.TL.isString(v) || GKP.TL.isNumber(v) || GKP.TL.isBool(v);
        },
        isFunction: function (v) {
            return GKP.TL.toString.apply(v) === '[object Function]';
        },
        isNumber: function (v) {
            return typeof v === 'number' && isFinite(v);
        },
        isString: function (v) {
            return typeof v === 'string';
        },
        isBool: function (v) {
            return typeof v === 'boolean';
        },
        isDefined: function (v) {
            return typeof v !== 'undefined' && v !== null;
        },
        colorHex: function (color) {
            var that = color;
            var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
            if (/^(rgb|RGB)/.test(that)) {
                var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
                var strHex = "#";
                for (var i = 0; i < aColor.length; i++) {
                    var hex = Number(aColor[i]).toString(16);
                    if (hex.length < 2) {
                        hex = '0' + hex;
                    }
                    strHex += hex;
                }
                if (strHex.length !== 7) {
                    strHex = that;
                }
                return strHex;
            }
            else if (reg.test(that)) {
                var aNum = that.replace(/#/, "").split("");
                if (aNum.length === 6) {
                    return that;
                }
                else if (aNum.length === 3) {
                    var numHex = "#";
                    for (var i = 0; i < aNum.length; i += 1) {
                        numHex += (aNum[i] + aNum[i]);
                    }
                    return numHex;
                }
            }
            return that;
        },
        colorRgb: function (sColor) {
            sColor = sColor.toLowerCase();
            var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
            if (sColor && reg.test(sColor)) {
                if (sColor.length === 4) {
                    var sc = "#";
                    for (var i = 1; i < 4; i += 1) {
                        sc += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                    }
                    sColor = sc;
                }
                var scc = [];
                for (var i = 1; i < 7; i += 2) {
                    console.log(sColor.slice(i, i + 2));
                    scc.push(parseInt("0x" + sColor.slice(i, i + 2)));
                }
                return "RGB(" + scc.join(",") + ")";
            }
            return sColor;
        },
    };
    class GKLauncher {
        constructor(gkconfig) {
            if ($('#' + gkconfig.containerID).length == 0) {
                console.error("必须指定有效的容器id，一般为一个div的id");
                return;
            }
            if (!GKP.TL.isArray(gkconfig.launcherArray)) {
                console.error("必须指定推流集群启动器地址 launcherArray");
                return;
            }
            if (GKP.TL.isEmpty(gkconfig.launchProUrl, false)) {
                gkconfig.launchProUrl = "";
            }
            if (GKP.TL.isEmpty(gkconfig.userName, false)) {
                gkconfig.userName = "gk_test";
            }
            if (!GKP.TL.isFunction(gkconfig.launchProgress)) {
                gkconfig.launchProgress = (pos, info) => { console.log(pos); console.log(info); };
            }
            this.gk_config = gkconfig;
            this.m_appfreeMap = new Map;
            this.m_appCount = 0;
            this.m_freeOnline = 0;
            this.m_findQueueCount = 0;
            this.m_isLaunched = false;
            this.findFreeApp();
        }
        findFreeApp() {
            var self = this;
            var loopsuperID = 0;
            function loopsuperQueue() {
                if (self.m_isLaunched)
                    return;
                self.m_findQueueCount++;
                if (self.m_findQueueCount < 5)
                    self.gk_config.launchProgress(0, '正在获取程序队列......');
                else {
                    clearInterval(loopsuperID);
                    self.gk_config.launchProgress(-1, '获取程序队列5次，但没有找到可用的空闲程序');
                    return;
                }
                self.m_appCount = 0;
                self.m_freeOnline = 0;
                self.m_appfreeMap.clear();
                self.gk_config.launcherArray.forEach(function (inf) {
                    var url = inf.trim();
                    var rta_appurl = url.charAt(url.length - 1) == "/" ? url : url + "/";
                    $.ajax({
                        type: "get",
                        url: rta_appurl + "api/gk/gkonlinestate",
                        dataType: "json",
                        success: function (data, textStatus) {
                            self.m_appCount += data.appCount * 1;
                            if (data.freeOnline > 0) {
                                self.m_freeOnline += data.freeOnline * 1;
                                self.m_appfreeMap.set(rta_appurl, data.freePorts);
                                self.onLaunching(rta_appurl, data.freePorts[0]);
                            }
                            self.gk_config.launchProgress(1, '程序池空闲数量' + self.m_freeOnline + '/总数量' + self.m_appCount);
                        },
                        error: function (ex, ch, ee) {
                            self.gk_config.launchProgress(-1, '获取程序队列异常，将尝试重新获取');
                        }
                    });
                });
            }
            loopsuperID = setInterval(loopsuperQueue, 3000);
        }
        onLaunching(super_url, appPort) {
            var self = this;
            self.m_isLaunched = true;
            var runIndex = 0;
            var runErrorCount = 0;
            var app_url = super_url.substr(0, super_url.lastIndexOf(":") + 1) + appPort;
            function StartPush(app_url) {
                var cfg = Object.assign({}, self.gk_config);
                cfg.chatUrl = app_url;
                cfg.launcherArray = undefined;
                cfg.launchProgress = undefined;
                cfg.call_back = undefined;
                GPSR.Initialize(cfg, function (e) {
                    if (e === true)
                        self.gk_config.launchProgress(100, "推流已启动");
                    else
                        self.gk_config.launchProgress(-1, "推送服务关闭或出现错误");
                    if (GKP.TL.isFunction(self.gk_config.call_back)) {
                        self.gk_config.call_back(e);
                    }
                });
            }
            function onAppLoading() {
                runIndex++;
                $.ajax({
                    type: "get",
                    url: app_url + "/api/gk/app_gkprogress",
                    dataType: "json",
                    success: function (data, textStatus) {
                        if (data.desc == "100") {
                            self.gk_config.launchProgress(99, app_url);
                            StartPush(app_url);
                            return;
                        }
                        else {
                            self.gk_config.launchProgress(50, data.desc == "000" ? "正在启动远程推流程序" : data.desc);
                            setTimeout(onAppLoading, 1000);
                        }
                    },
                    error: function (ex) {
                        ++runErrorCount;
                        var erinfo = { "runIndex": runIndex, "errorIndex": runErrorCount };
                        console.warn(erinfo);
                        if (runErrorCount == 10) {
                            self.gk_config.launchProgress(20, "服务响应太久，现启动服务..." + app_url);
                            onCardClick();
                            return;
                        }
                        if (runErrorCount > 30) {
                            self.gk_config.launchProgress(20, "服务响应太久：" + app_url);
                            return;
                        }
                        self.gk_config.launchProgress(10, runIndex + " 正在启动服务...");
                        setTimeout(onAppLoading, 500);
                    }
                });
            }
            function onPushSuper() {
                var url = super_url + "api/gk/start_app";
                var tkstr = GKPusher.GetToken(self.gk_config.tokenUrl, "tk_start");
                $.ajax({
                    type: "post",
                    url: url,
                    dataType: "json",
                    timeout: 10000,
                    data: { port: appPort, token: tkstr, project: self.gk_config.launchProUrl },
                    success: function (data, textStatus) {
                        if (!data.result) {
                            if (data.desc.indexOf("指定端口") > 0 ||
                                data.desc.indexOf("程序已经在服务中") > 0) {
                                self.gk_config.launchProgress(1, data.desc + " 现重寻服务");
                                self.m_isLaunched = false;
                                self.findFreeApp();
                            }
                            else
                                self.gk_config.launchProgress(-1, data.desc);
                            return;
                        }
                        self.gk_config.launchProgress(5, data.desc);
                        onAppLoading();
                    },
                    error: function (ex) {
                        self.gk_config.launchProgress(-1, "服务监视器启动服务没有响应：" + super_url);
                    }
                });
            }
            function onCardClick() {
                $.ajax({
                    type: "get",
                    url: app_url + "/api/gk/app_gkprogress",
                    dataType: "json",
                    success: function (data, textStatus) {
                        console.log(data);
                        if (data.desc == "100") {
                            self.gk_config.launchProgress(99, app_url);
                            StartPush(app_url);
                            return;
                        }
                        self.gk_config.launchProgress(1, data.desc == "000" ? "正在启动远程推流程序" : data.desc);
                        runIndex++;
                        setTimeout(onCardClick, 500);
                    },
                    error: function (ex) {
                        self.gk_config.launchProgress(1, "服务启动中...");
                        onPushSuper();
                    }
                });
            }
            onCardClick();
        }
    }
    class GKPlayer {
        constructor(pusher) {
            this.mClientWidth = 0;
            this.mClientHeight = 0;
            this.isRTC = false;
            this.mPusher = null;
            this.mPusher = pusher;
        }
        CalcClientSize() { }
        Render(data, view) { }
        OnStrMessage(json) { }
        OnOpended() { }
        OnClosed() { }
        Statistics(show) { }
        touch_action(action, e) {
            if (!this.mPusher.IsController())
                return;
            if (this.mPusher.isClosed)
                return;
            var datas = action + ":";
            var touches = (action == "1" || action == "2") ? e.targetTouches : e.changedTouches;
            for (var i = 0; i < touches.length; i++) {
                var tch = touches[i];
                var x = tch.pageX / this.mClientWidth;
                var y = tch.pageY / this.mClientHeight;
                datas += x + "," + y + ";";
            }
            var json = JSON.stringify({
                "ptype": "gktouch",
                "datas": datas
            });
            this.mPusher._wst.send(json);
        }
        ;
        mouse_action(action, e) {
            if (!this.mPusher.IsController())
                return;
            if (this.mPusher.isClosed)
                return;
            var bytearr = new ArrayBuffer(16);
            var dv = new DataView(bytearr);
            dv.setUint32(0, 80569723, true);
            dv.setUint16(4, action, true);
            var key = "";
            if (action == DBinType.MS_WHEEL) {
                key = e.wheelDelta < 0 ? "WheelD" : "WheelU";
                e.wheelDelta < 0 ? dv.setUint16(6, 1, true) : dv.setUint16(6, 2, true);
            }
            else if (action == DBinType.MS_MOVE) {
                key = "Move";
                e.button == 0 ? dv.setUint16(6, 1, true) : e.button == 1 ? dv.setUint16(6, 2, true) : dv.setUint16(6, 3, true);
            }
            else {
                key = e.button == 0 ? "Left" : e.button == 1 ? "Mid" : "Right";
                e.button == 0 ? dv.setUint16(6, 1, true) : e.button == 1 ? dv.setUint16(6, 2, true) : dv.setUint16(6, 3, true);
            }
            var x = e.offsetX / this.mClientWidth;
            var y = e.offsetY / this.mClientHeight;
            dv.setFloat32(8, x, true);
            dv.setFloat32(12, y, true);
            this.mPusher._wst.send(bytearr);
            var ptr = { action: action, key: key, x: x, y: y };
            this.mPusher.evMouse.forEach((fun, key) => {
                fun(ptr);
            });
            if (x > 1.01 || y > 1.01) {
                console.warn('更改canvas大小后请重新计算CalcClientSize' + x + ', ' + y);
            }
        }
        ;
    }
    class CanvasPlayer extends GKPlayer {
        constructor(pusher) {
            super(pusher);
            this.mCanvas = null;
            this.context = null;
            this.frameIndex = 0;
            this.framePackets = 0;
            this.statisticsDiv = null;
            var container = $('#' + pusher._containerID);
            if (container.length < 1)
                console.error("请传入正确的div容器id");
            var htm = '<canvas id="' + pusher._playerID + '" width="2560" height="1440" style="width: 1280px; height: 720px; background-color:azure;" tabindex="0"></canvas>';
            container.html(htm);
            this.mCanvas = document.getElementById(pusher._playerID);
            this.context = this.mCanvas.getContext("2d");
            $(this.mCanvas).bind('contextmenu', function () { return false; });
            let self = this;
            var preFrame = 0;
            var t = setInterval(function () {
                if (!self.statisticsDiv)
                    return;
                var s = "Recvd " + self.frameIndex + " packets (" + (self.framePackets / 1048576).toFixed(2) + " MB)";
                s += "<br>FPS: " + (self.frameIndex - preFrame);
                s += "<br>FrameSize: " + self.mPusher.mWndSize.wndW + "x" + self.mPusher.mWndSize.wndH;
                preFrame = self.frameIndex;
                if (self.statisticsDiv)
                    self.statisticsDiv.html(s);
            }, 1000);
        }
        Statistics(show) {
            if (!this.context)
                return;
            this.mPusher.IsShowSS = show === true;
            var ssid = 'geoking_remote_statistics';
            var ss = $('#' + ssid);
            var container = $('#' + this.mPusher._containerID);
            if (this.mPusher.IsShowSS) {
                if (ss.length == 0) {
                    var htm = '<div id="' + ssid + '">...</div>';
                    container.append(htm);
                    this.statisticsDiv = $('#' + ssid);
                }
            }
            else {
                if (ss.length == 0) {
                    this.statisticsDiv = null;
                    ss.remove();
                }
            }
        }
        CalcClientSize() {
            this.mClientWidth = this.mCanvas.clientWidth;
            this.mClientHeight = this.mCanvas.clientHeight;
        }
        Render(data, view) {
            let self = this;
            let imgw = view.getUint16(4, true);
            let imgh = view.getUint16(6, true);
            let pX = view.getUint16(8, true);
            let pY = view.getUint16(10, true);
            let minw = view.getUint16(12, true);
            let minh = view.getUint16(14, true);
            var nblob = data.slice(16);
            var image = new Image();
            image.onload = function () {
                if (self.mPusher.mWndSize.wndW != imgw || self.mPusher.mWndSize.wndH != imgh) {
                    self.mPusher.mWndSize.wndW = imgw;
                    self.mPusher.mWndSize.wndH = imgh;
                    self.mPusher.onProgress(DStrType.OnWndSize, '渲染窗口大小改变！', { imgw: imgw, imgh: imgh });
                }
                var canW = self.mCanvas.width;
                var canH = self.mCanvas.height;
                pX = pX / imgw * canW;
                pY = pY / imgh * canH;
                minw = minw / imgw * canW;
                minh = minh / imgh * canH;
                self.context.clearRect(pX, pY, minw, minh);
                self.context.drawImage(image, pX, pY, minw, minh);
                window.URL.revokeObjectURL(image.src);
                self.framePackets += data.size * 1;
                self.frameIndex++;
                if (self.frameIndex < 10) {
                    self.CalcClientSize();
                }
            };
            image.src = window.URL.createObjectURL(nblob);
        }
        OnStrMessage(json) { }
        OnOpended() {
            this.CalcClientSize();
            var self = this;
            var isTouchMode = false;
            var timeTouch = 0;
            this.mCanvas.addEventListener('keydown', function (e) {
                self.onkeyInfo("down", e.key, e.keyCode);
            }, true);
            this.mCanvas.addEventListener('keyup', function (e) {
                self.onkeyInfo("up", e.key, e.keyCode);
            }, true);
            this.mCanvas.addEventListener('keypress', function (e) {
            }, true);
            this.mCanvas.addEventListener('touchstart', function (e) {
                timeTouch = Date.now();
                isTouchMode = true;
                self.touch_action("1", e);
            }, false);
            this.mCanvas.addEventListener('touchmove', function (e) {
                timeTouch = Date.now();
                isTouchMode = true;
                self.touch_action("2", e);
            }, false);
            this.mCanvas.addEventListener('touchend', function (e) {
                timeTouch = Date.now();
                isTouchMode = false;
                self.touch_action("3", e);
            }, false);
            this.mCanvas.onclick = function (e) {
                if (isTouchMode) {
                    var tnow = Date.now();
                    if (tnow - timeTouch > 111) {
                        isTouchMode = false;
                    }
                    else
                        return;
                }
                self.mouse_action(DBinType.MS_CLICK, e);
            };
            this.mCanvas.ondblclick = function (e) {
                if (isTouchMode) {
                    var tnow = Date.now();
                    if (tnow - timeTouch > 111) {
                        isTouchMode = false;
                    }
                    else
                        return;
                }
                self.mouse_action(DBinType.MS_DB, e);
            };
            this.mCanvas.onmousedown = function (e) {
                if (isTouchMode) {
                    var tnow = Date.now();
                    if (tnow - timeTouch > 111) {
                        isTouchMode = false;
                    }
                    else
                        return;
                }
                self.mouse_action(DBinType.MS_DOWN, e);
            };
            this.mCanvas.onmouseup = function (e) {
                if (isTouchMode) {
                    var tnow = Date.now();
                    if (tnow - timeTouch > 111) {
                        isTouchMode = false;
                    }
                    else
                        return;
                }
                self.mouse_action(DBinType.MS_UP, e);
            };
            this.mCanvas.onmousemove = function (e) {
                if (isTouchMode) {
                    return;
                }
                self.mouse_action(DBinType.MS_MOVE, e);
            };
            this.mCanvas.onmousewheel = function (e) {
                if (isTouchMode) {
                    var tnow = Date.now();
                    if (tnow - timeTouch > 111) {
                        isTouchMode = false;
                    }
                    else
                        return;
                }
                self.mouse_action(DBinType.MS_WHEEL, e);
            };
        }
        onkeyInfo(action, ekey, ecode) {
            ecode = ecode * 1;
            if (ekey == "Escape")
                ecode = 65307;
            if (!this.mPusher.IsController())
                return;
            if (ekey.length == 1) {
                var isLow = ekey.charCodeAt() >= 'A'.charCodeAt(0) && ekey.charCodeAt() <= 'Z'.charCodeAt(0);
                if (isLow) {
                    var j2 = { 'ptype': 'mky', 'motion': action, 'ecode': ecode + 32 };
                    this.mPusher._wst.send(JSON.stringify(j2));
                    return;
                }
            }
            var json = { 'ptype': 'mky', 'motion': action, 'ecode': ecode };
            this.mPusher._wst.send(JSON.stringify(json));
        }
    }
    class RTCPlayer extends GKPlayer {
        constructor(pusher) {
            super(pusher);
            this.pcClient = null;
            this.mVideo = null;
            this.remoteAnswer = null;
            this.remoteIce = [];
            this.localIce = [];
            this.prevFramesReceived = 0;
            this.dataChannel = null;
            this.testmsgcount = 0;
            this.feedbackmsg = "";
            this.feedbackmsgrecv = "";
            this.feedbackmsgsend = "";
            this.statisticsDiv = null;
            this.isPlaying = false;
            this.servers = {
                iceServers: [
                    { url: 'turn:192.168.0.100:3478', username: 'test', credential: 'test' }
                ]
            };
            this.offerOptions = {
                offerToReceiveAudio: 0,
                offerToReceiveVideo: 1,
                voiceActivityDetection: false,
                iceRestart: true
            };
            this.dataChannelOptions = {
                ordered: false,
                maxRetransmits: 1,
                negotiated: false
            };
            this.isRTC = true;
            var container = $('#' + this.mPusher._containerID);
            if (container.length < 1)
                console.error("请传入正确的div容器id");
            var htm = '<div id="' + this.mPusher._playerID + '"><h3>集景云端连接中...<h3></div>';
            container.html(htm);
        }
        OnStrMessage(json) {
            if (!this.pcClient)
                return;
            var remotestream = this.pcClient;
            let self = this;
            var command = json.command;
            switch (command) {
                case "OnRTC_SuccessAnswer":
                    {
                        if (remotestream) {
                            self.remoteAnswer = json.sdp;
                            remotestream.setRemoteDescription(new RTCSessionDescription({ type: "answer", sdp: self.remoteAnswer }), function () { }, function (errorInformation) {
                                console.error('setRemoteDescription error: ' + errorInformation);
                                self.mPusher._wst.close();
                            });
                        }
                    }
                    break;
                case "OnRTC_IceCandidate":
                    {
                        if (remotestream) {
                            var c = new RTCIceCandidate({
                                sdpMLineIndex: json.sdp_mline_index,
                                candidate: json.sdp
                            });
                            remotestream.addIceCandidate(c);
                        }
                    }
                    break;
            }
        }
        OnOpended() {
            this.startStream();
            this.CalcClientSize();
        }
        OnClosed() {
            if (this.dataChannel) {
                this.dataChannel.close();
                this.dataChannel = null;
            }
            if (this.pcClient) {
                this.pcClient.close();
                this.pcClient = null;
            }
            this.remoteAnswer = null;
            this.isPlaying = false;
        }
        CalcClientSize() {
            if (!this.mVideo)
                return;
            this.mClientWidth = this.mVideo.clientWidth;
            this.mClientHeight = this.mVideo.clientHeight;
        }
        Render(data, view) { }
        Statistics(show) {
            if (!this.pcClient)
                return;
            this.mPusher.IsShowSS = show === true;
            var ssid = 'geoking_remote_statistics';
            var ss = $('#' + ssid);
            var container = $('#' + this.mPusher._containerID);
            if (this.mPusher.IsShowSS) {
                if (ss.length == 0) {
                    var htm = '<div id="' + ssid + '">...</div>';
                    container.append(htm);
                    this.statisticsDiv = $('#' + ssid);
                }
            }
            else {
                if (ss.length == 0) {
                    this.statisticsDiv = null;
                    ss.remove();
                }
            }
        }
        createVDiv() {
            var container = $('#' + this.mPusher._containerID);
            if (container.length < 1)
                console.error("请传入正确的div容器id");
            var htm = '<video id="' + this.mPusher._playerID + '" playsInline=true muted oncontextmenu="return false;"></video>';
            container.html(htm);
            let self = this;
            var isTouchMode = false;
            var timeTouch = 0;
            this.mVideo = document.getElementById(this.mPusher._playerID);
            if (this.mPusher.IsShowSS)
                this.Statistics(this.mPusher.IsShowSS);
            this.mVideo.addEventListener('keydown', function (e) {
                self.onkeyInfo("down", e.key, e.keyCode);
            }, true);
            this.mVideo.addEventListener('keyup', function (e) {
                self.onkeyInfo("up", e.key, e.keyCode);
            }, true);
            this.mVideo.addEventListener('keypress', function (e) {
                self.onkeyInfo("press", e.key, e.keyCode);
            }, true);
            this.mVideo.addEventListener('touchstart', function (e) {
                timeTouch = Date.now();
                isTouchMode = true;
                self.touch_action("1", e);
            }, false);
            this.mVideo.addEventListener('touchmove', function (e) {
                timeTouch = Date.now();
                isTouchMode = true;
                self.touch_action("2", e);
            }, false);
            this.mVideo.addEventListener('touchend', function (e) {
                timeTouch = Date.now();
                isTouchMode = false;
                self.touch_action("3", e);
            }, false);
            this.mVideo.onclick = function (e) {
                if (isTouchMode) {
                    var tnow = Date.now();
                    if (tnow - timeTouch > 111) {
                        isTouchMode = false;
                    }
                    else
                        return;
                }
                self.mouse_action(DBinType.MS_CLICK, e);
            };
            this.mVideo.ondblclick = function (e) {
                if (isTouchMode) {
                    var tnow = Date.now();
                    if (tnow - timeTouch > 111) {
                        isTouchMode = false;
                    }
                    else
                        return;
                }
                self.mouse_action(DBinType.MS_DB, e);
            };
            this.mVideo.onmousedown = function (e) {
                if (isTouchMode) {
                    var tnow = Date.now();
                    if (tnow - timeTouch > 111) {
                        isTouchMode = false;
                    }
                    else
                        return;
                }
                self.mouse_action(DBinType.MS_DOWN, e);
            };
            this.mVideo.onmouseup = function (e) {
                if (isTouchMode) {
                    var tnow = Date.now();
                    if (tnow - timeTouch > 111) {
                        isTouchMode = false;
                    }
                    else
                        return;
                }
                self.mouse_action(DBinType.MS_UP, e);
            };
            this.mVideo.onmousemove = function (e) {
                if (isTouchMode) {
                    return;
                }
                self.mouse_action(DBinType.MS_MOVE, e);
            };
            this.mVideo.onmousewheel = function (e) {
                if (isTouchMode) {
                    var tnow = Date.now();
                    if (tnow - timeTouch > 100) {
                        isTouchMode = false;
                    }
                    else
                        return;
                }
                self.mouse_action(DBinType.MS_WHEEL, e);
            };
        }
        send(data) {
            try {
                this.mPusher._wst.send(data);
            }
            catch (ex) {
                console.log("Message sending failed!");
            }
        }
        startStream() {
            console.log("startStream...");
            this.pcClient = new RTCPeerConnection(this.servers);
            var remotestream = this.pcClient;
            this.dataChannel = remotestream.createDataChannel("msgDataChannel", this.dataChannelOptions);
            this.setDataChannel(this.dataChannel);
            let self = this;
            remotestream.onaddstream = function (e) {
                try {
                    console.log("remote media connection success!");
                    self.createVDiv();
                    self.mVideo.srcObject = e.stream;
                    self.mVideo.onloadedmetadata = function (e) {
                        self.isPlaying = true;
                        self.mVideo.play();
                        self.CalcClientSize();
                        self.mPusher.onProgress(DStrType.OnWndSize, '渲染窗口大小改变！', { imgw: self.mClientWidth, imgh: self.mClientHeight });
                    };
                    var tmsg = setInterval(function () {
                        if (!self.pcClient) {
                            clearInterval(tmsg);
                        }
                        else if (self.dataChannel && self.dataChannel.readyState == "open") {
                        }
                    }, 1000);
                    var t = setInterval(function () {
                        if (!self.pcClient) {
                            clearInterval(t);
                        }
                        else {
                            if (!self.statisticsDiv)
                                return;
                            Promise.all([
                                remotestream.getStats(null).then(function (o) {
                                    var rcv = [];
                                    var snd = [];
                                    o.forEach(function (s) {
                                        if ((s.type == "inbound-rtp" && s.mediaType == "video" && !s.isRemote) ||
                                            (s.type == "track" && s.remoteSource == true) ||
                                            (s.type == "ssrc" && s.mediaType == "video" && s.id.indexOf("recv") >= 0)) {
                                            rcv.push(s);
                                        }
                                        else if ((s.type == "outbound-rtp" && s.mediaType == "video" && !s.isRemote) ||
                                            (s.type == "track") ||
                                            (s.type == "ssrc" && s.mediaType == "video" && s.id.indexOf("send") >= 0)) {
                                            snd.push(s);
                                        }
                                    });
                                    return self.dumpStat(rcv, snd);
                                })
                            ]).then(function (s) {
                                if (self.statisticsDiv)
                                    self.statisticsDiv.html(s);
                            });
                        }
                    }, 1000);
                }
                catch (ex) {
                    console.log("Failed to connect to remote media!", ex);
                    self.mPusher._wst.close();
                }
            };
            remotestream.onicecandidate = function (event) {
                if (event.candidate) {
                    var ice = self.parseIce(event.candidate.candidate);
                    if (ice && ice.component_id == 1
                        && ice.localIP.indexOf(":") < 0) {
                        var obj = JSON.stringify({
                            "ptype": "onrtc_icecandidate",
                            "candidate": event.candidate
                        });
                        self.send(obj);
                    }
                    else {
                        console.log('onicecandidate[local skip]: ' + event.candidate.candidate);
                    }
                }
                else {
                    console.log('onicecandidate: complete.');
                    if (self.remoteAnswer) {
                    }
                }
            };
            remotestream.ondatachannel = function (event) {
                self.dataChannel = event.channel;
                self.setDataChannel(self.dataChannel);
            };
            remotestream.createOffer(function (desc) {
                remotestream.setLocalDescription(desc, function () {
                    var obj = JSON.stringify({
                        "ptype": "onrtc_offer",
                        "desc": desc
                    });
                    self.send(obj);
                }, function (errorInformation) {
                    console.error('setLocalDescription error: ' + errorInformation);
                    self.mPusher._wst.close();
                });
            }, function (error) {
                console.error(error);
                self.mPusher._wst.close();
            }, self.offerOptions);
        }
        setDataChannel(dc) {
            let self = this;
            dc.onerror = function (error) {
                console.log("DataChannel Error:", error);
            };
            dc.onmessage = function (event) {
                console.log("DataChannel Message:", event.data);
            };
            dc.onopen = function () {
                self.dataChannel.send("Hello World!");
            };
            dc.onclose = function () {
                console.log("DataChannel is Closed");
            };
        }
        formatStat(o) {
            let self = this;
            var s = "";
            if (o != undefined) {
                if (o.packetsReceived !== undefined) {
                    s += "RTC Recvd: " + o.packetsReceived + " packets (" + (o.bytesReceived / 1000000).toFixed(2) + " MB)" + " Lost: " + o.packetsLost + '<br>';
                    self.feedbackmsgrecv = s;
                }
                else if (o.packetsSent !== undefined) {
                    s += "Sent: " + o.packetsSent + " packets (" + (o.bytesSent / 1000000).toFixed(2) + " MB)";
                    self.feedbackmsgsend = s;
                }
                if (o.bitrateMean !== undefined) {
                    s += "<br>Avg. bitrate: " + (o.bitrateMean / 1000000).toFixed(2) + " Mbps (" + (o.bitrateStdDev / 1000000).toFixed(2) + " StdDev)";
                    if (o.discardedPackets !== undefined) {
                        s += " Discarded packts: " + o.discardedPackets;
                    }
                }
                if (o.type == 'track') {
                    s += "FPS: " + (o.framesReceived - self.prevFramesReceived) + " fps";
                    s += "<br>FrameSize: " + o.frameWidth + "x" + o.frameHeight;
                    self.prevFramesReceived = o.framesReceived;
                }
                if (o.framerateMean !== undefined) {
                    s += "<br>Avg. framerate: " + (o.framerateMean).toFixed(2) + " fps (" + o.framerateStdDev.toFixed(2) + " StdDev)";
                    if (o.droppedFrames !== undefined)
                        s += " Dropped frames: " + o.droppedFrames;
                    if (o.jitter !== undefined)
                        s += " Jitter: " + o.jitter;
                }
                if (o.googFrameRateReceived !== undefined) {
                    s += "<br>googFrameRateReceived: " + o.googFrameRateReceived + " fps";
                    s += " googJitterBufferMs: " + o.googJitterBufferMs;
                    s += "<br>googFrameReceived: " + o.googFrameWidthReceived + "x" + o.googFrameHeightReceived;
                    s += "<br>googCurrentDelayMs: " + o.googCurrentDelayMs;
                    s += " googDecodeMs: " + o.googDecodeMs;
                }
                if (o.googFrameRateSent !== undefined) {
                    s += "<br>googFrameRateSent: " + o.googFrameRateSent + " fps";
                    s += " googEncodeUsagePercent: " + o.googEncodeUsagePercent + "%";
                    s += "<br>googFrameSent: " + o.googFrameWidthSent + "x" + o.googFrameHeightSent;
                    s += " googAvgEncodeMs: " + o.googAvgEncodeMs;
                }
            }
            return s;
        }
        formatAllStat(os) {
            var s = "";
            os.forEach((e) => {
                s += this.formatStat(e);
            });
            return s;
        }
        dumpStat(o, b) {
            var s = "";
            s += this.formatAllStat(o);
            if (b.length > 0) {
                s += "<br> <br>";
                s += this.formatAllStat(b);
            }
            this.feedbackmsg = this.feedbackmsgrecv + this.feedbackmsgsend;
            return s;
        }
        parseCandidate(line) {
            var parts;
            if (line.indexOf('a=candidate:') === 0) {
                parts = line.substring(12).split(' ');
            }
            else {
                parts = line.substring(10).split(' ');
            }
            var candidate = {
                foundation: parts[0],
                component: parseInt(parts[1], 10),
                protocol: parts[2].toLowerCase(),
                priority: parseInt(parts[3], 10),
                ip: parts[4],
                address: parts[4],
                port: parseInt(parts[5], 10),
                type: parts[7]
            };
            for (var i = 8; i < parts.length; i += 2) {
                switch (parts[i]) {
                    case 'raddr':
                        candidate.relatedAddress = parts[i + 1];
                        break;
                    case 'rport':
                        candidate.relatedPort = parseInt(parts[i + 1], 10);
                        break;
                    case 'tcptype':
                        candidate.tcpType = parts[i + 1];
                        break;
                    case 'ufrag':
                        candidate.ufrag = parts[i + 1];
                        candidate.usernameFragment = parts[i + 1];
                        break;
                    default:
                        candidate[parts[i]] = parts[i + 1];
                        break;
                }
            }
            return candidate;
        }
        ;
        parseIce(candidateString) {
            var ppp = this.parseCandidate(candidateString);
            ppp.component_id = ppp.component;
            ppp.localIP = ppp.address;
            return ppp;
        }
        stringifyIce(iceCandObj) {
            var s = 'candidate:' + iceCandObj.foundation + '' +
                ' ' + iceCandObj.component_id + '' +
                ' ' + iceCandObj.transport + '' +
                ' ' + iceCandObj.priority + '' +
                ' ' + iceCandObj.localIP + '' +
                ' ' + iceCandObj.localPort + '' +
                ' typ ' + iceCandObj.type + '' +
                (iceCandObj.remoteIP ? ' raddr ' + iceCandObj.remoteIP + '' : '') +
                (iceCandObj.remotePort ? ' rport ' + iceCandObj.remotePort + '' : '') +
                (iceCandObj.generation ? ' generation ' + iceCandObj.generation + '' : '') +
                (iceCandObj.ufrag ? ' ufrag ' + iceCandObj.ufrag + '' : '');
            return s;
        }
        onkeyInfo(action, ekey, ecode) {
            if (!this.isPlaying)
                return;
            ecode = ecode * 1;
            if (ekey == "Escape")
                ecode = 65307;
            if (!this.mPusher.IsController())
                return;
            if (ekey.length == 1) {
                var isLow = ekey.charCodeAt() >= 'A'.charCodeAt(0) && ekey.charCodeAt() <= 'Z'.charCodeAt(0);
                if (isLow) {
                    var j2 = { 'ptype': 'mky', 'motion': action, 'ecode': ecode + 32 };
                    this.mPusher._wst.send(JSON.stringify(j2));
                    return;
                }
            }
            var json = { 'ptype': 'mky', 'motion': action, 'ecode': ecode };
            this.mPusher._wst.send(JSON.stringify(json));
        }
    }
    class GKObject {
        constructor(objectID, gpsr) {
            this.ClassType = EmObjectType.OT_UNKNOWN;
            this.ObjectID = null;
            this.GKP = null;
            this.ObjectID = GKP.TL.isDefined(objectID) && GKP.TL.isString(objectID) ? objectID : null;
            this.GKP = GKP.TL.isDefined(gpsr) && GKP.TL.isObject(gpsr) ? gpsr : GPSR;
        }
        _postbj(json) {
            let self = this;
            return new Promise((res, rej) => {
                self.GKP.command1(json, function (e) {
                    if (e.succeed)
                        res(e.data);
                    else
                        rej(e.data);
                });
            });
        }
        SetProperty(propertyName, value) {
            if (!this.GKP.IsCompleted(true))
                return null;
            if (!this.ObjectID) {
                console.error('no ObjectID');
                return null;
            }
            var json = { action: 's_o_property', objectID: this.ObjectID, propertyName: propertyName, value: value };
            return this._postbj(json);
        }
        SetMethod(methodName, value) {
            return this.SetProperty(methodName, value);
        }
        SetVisible(show) {
            return this.SetProperty('Visible', show);
        }
        SetColor(color) {
            var c = GKP.TL.colorHex(color);
            return this.SetProperty('Color', c);
        }
        SetOpacity(opacity) {
            return this.SetProperty('Opacity', opacity);
        }
    }
    GKP.GKObject = GKObject;
    class GKPusher {
        constructor() {
            this._playerID = "";
            this._containerID = "";
            this._wsUrl = "";
            this._userName = "";
            this._tokenUrl = "";
            this._wst = null;
            this._player = null;
            this.IsShowSS = false;
            this.Navigate = null;
            this.Analysis = null;
            this.Render = null;
            this.Manager = null;
            this.Creator = null;
            this.current_id = "";
            this.contrl_id = "";
            this.isController = false;
            this.isCompleted = false;
            this.isOpened = false;
            this.isClosed = false;
            this.isResizing = false;
            this.mExtendIndex = 1;
            this.evExtendMap = null;
            this.evCanChange = null;
            this.evProgress = null;
            this.evNotice = null;
            this.evMouse = null;
            this.mWndSize = { wndW: 0, wndH: 0 };
            this.mInitBack = null;
            this.mRegLoad = false;
            this.mRegSysEvent = false;
            this.mLauncher = null;
            this.Navigate = new GKNavigate(this);
            this.Analysis = new GKAnalysis(this);
            this.Render = new GKRender(this);
            this.Manager = new GKManager(this);
            this.Creator = new GKCreator(this);
            this.evExtendMap = new Map();
            this.evCanChange = new Map();
            this.evProgress = new Map();
            this.evNotice = new Map();
            this.evMouse = new Map();
            this._playerID = "geoking_remote_player";
        }
        Initialize(gkConfig, callback) {
            var reg = /^[0-9a-zA-Z_|-]+$/;
            if (!reg.test(gkConfig.userName)) {
                console.error('必须指定用户名，只能为数字、字母、下划线或中划线的组合');
                return;
            }
            this._tokenUrl = gkConfig.tokenUrl ? (gkConfig.tokenUrl.length > 5 ? gkConfig.tokenUrl : null) : null;
            if (GKP.TL.isArray(gkConfig.launcherArray) && gkConfig.launcherArray.length > 0) {
                gkConfig.call_back = callback;
                this.mLauncher = new GKLauncher(gkConfig);
                return;
            }
            var self = this;
            this._userName = gkConfig.userName;
            this._wsUrl = gkConfig.chatUrl;
            this._containerID = gkConfig.containerID;
            this.isController = false;
            this.isCompleted = false;
            this.mInitBack = callback;
            let wndW = GKP.TL.isNumber(gkConfig.wndWidth) ? gkConfig.wndWidth : 0;
            let wndH = GKP.TL.isNumber(gkConfig.wndHeight) ? gkConfig.wndHeight : 0;
            function init() {
                self.init_socket(self.mInitBack, wndW, wndH);
            }
            if (document.readyState == "complete") {
                init();
            }
            else {
                if (!this.mRegLoad) {
                    this.mRegLoad = true;
                    window.addEventListener("load", init, false);
                }
            }
            if (!this.mRegSysEvent) {
                this.mRegSysEvent = true;
                window.addEventListener('beforeunload', function (e) {
                    self._wst.close();
                }, true);
                window.addEventListener("resize", () => {
                    setTimeout(() => { self.CalcClientSize(); }, 200);
                }, false);
            }
        }
        init_socket(callback, wndW, wndH) {
            var self = this;
            window.WebSocket = window.WebSocket || window.MozWebSocket;
            var wsu = self._wsUrl.replace('http://', 'ws:\\').replace('https://', 'wss:\\');
            wsu = wsu.substr(0, wsu.indexOf('/') == -1 ? wsu.length : wsu.indexOf('/')) + "/Chat";
            wsu = wsu.replace(':\\', '://') + "?user=" + self._userName + "&wndw=" + wndW + "&wndh=" + wndH + "&token=" + GKPusher.GetToken(this._tokenUrl, "tk_register");
            self._wst = new WebSocket(wsu);
            self._wst.onopen = function (e) {
                self.isOpened = true;
                self.isClosed = false;
                if (!self.isResizing)
                    self.onProgress(DStrType.OPENING, '服务开启中！', null);
                setTimeout(() => {
                    if (self.mInitBack)
                        self.mInitBack(false);
                }, 10000);
            };
            self._wst.onmessage = function (e) {
                var data = e.data;
                if (data instanceof Blob) {
                    self.onMessageBlob(data);
                }
                else {
                    var json = JSON.parse(data);
                    switch (json.cType) {
                        case DStrType.OPENED:
                            {
                                self.current_id = json.userId;
                                self.contrl_id = json.controlId;
                                self.isController = self.contrl_id == self.current_id;
                                var rtc = GKP.TL.isDefined(json.webrtc) ? json.webrtc : true;
                                GKP.VERSERV = json.version;
                                console.log("------------------------------------------------");
                                console.log("欢迎使用集景云渲染 Copyright 2021 重庆市勘测院");
                                console.log("推流服务版本号：" + GKP.VERSERV);
                                console.log("SDK版本号：" + GKP.VERSION);
                                if (GKP.VERSERV < GKP.VERSION)
                                    console.warn("集景服务推流版本比JS推流版本小，有些JS接口可能无法正常使用！");
                                console.log(rtc ? "使用webrtc推流模式" : "使用canvas模式");
                                console.log("------------------------------------------------");
                                self._player = rtc ? new RTCPlayer(self) : new CanvasPlayer(self);
                                self._player.OnOpended();
                                if (!self.isResizing)
                                    self.onProgress(DStrType.OPENED, '服务已开启！', json);
                                if (self.isController)
                                    self.onProgress(DStrType.CTRL, '服务控制！', json);
                                if (self.mInitBack)
                                    self.mInitBack(true);
                                self.mInitBack = null;
                            }
                            break;
                    }
                    if (self._player)
                        self._player.OnStrMessage(json);
                    self.onMessageJSON(json);
                }
            };
            self._wst.onerror = function (e) {
                self.onProgress(DStrType.ERROR, '服务出现错误！', e);
            };
            self._wst.onclose = function (e) {
                if (callback)
                    callback(false);
                if (self._player) {
                    self._player.OnClosed();
                    self._player = null;
                }
                if (!self.isResizing) {
                    self.onProgress(DStrType.CLOSE, '服务关闭！', e);
                    var container = $('#' + self._containerID);
                    if (container.length < 1)
                        console.error("请传入正确的div容器id");
                    var htm = '<div id="' + self._playerID + '"><h3>集景云端已关闭<h3></div>';
                    container.html(htm);
                }
                self.isClosed = true;
            };
        }
        Close(closeApp) {
            this.isResizing = false;
            if (closeApp === true && this.IsController()) {
                var json = { 'ptype': 'app_close' };
                this._wst.send(JSON.stringify(json));
            }
            else
                this._wst.close();
        }
        Statistics(show) {
            if (this._player)
                this._player.Statistics(show);
        }
        AddEventHandle(type, key, fun) {
            switch (type) {
                case EmEvent.CAM_CHANGE: {
                    this.evCanChange.set(key, fun);
                    return true;
                }
                case EmEvent.PROGRESS: {
                    this.evProgress.set(key, fun);
                    return true;
                }
                case EmEvent.NOTICE: {
                    this.evNotice.set(key, fun);
                    return true;
                }
                case EmEvent.MOUSE_EV: {
                    this.evMouse.set(key, fun);
                    return true;
                }
                default: return false;
            }
        }
        RemoveEventHandle(type, key) {
            switch (type) {
                case EmEvent.CAM_CHANGE: {
                    this.evCanChange.delete(key);
                    return true;
                }
                case EmEvent.PROGRESS: {
                    this.evProgress.delete(key);
                    return true;
                }
                case EmEvent.NOTICE: {
                    this.evNotice.delete(key);
                    return true;
                }
                case EmEvent.MOUSE_EV: {
                    this.evMouse.delete(key);
                    return true;
                }
                default: return false;
            }
        }
        static GetToken(tokenUrl, key) {
            if (!tokenUrl)
                return "";
            if (!GKP.TL.isEmpty(tokenUrl, false))
                return "";
            var url = tokenUrl;
            if (url.charAt(url.length - 1) != '/')
                url += '/';
            url = url + "/tools/submit_geoking_ajax.ashx?action=user_token&key=" + key;
            var data = null;
            $.ajax({
                type: 'get',
                url: url,
                async: false,
                success: (res) => {
                    data = res;
                },
                error: (err, c, p) => {
                    console.error(err);
                    data = null;
                }
            });
            if (!data)
                return "";
            if (typeof (data) == 'string')
                data = eval('(' + data + ')');
            if (data.status != 1) {
                console.warn(data.token);
                return "";
            }
            return data.token;
        }
        SendExtendByWS(argc, callback) {
            if (!this.IsCompleted(true))
                return;
            var sign = GKP.TL.isDefined(argc.sign) ? argc.sign : (this.mExtendIndex++).toString();
            var needRet = GKP.TL.isDefined(argc.needRet) ? argc.needRet : false;
            var data = GKP.TL.isDefined(argc.data) ? (typeof (argc.data) == 'string' ? argc.data : JSON.stringify(argc.data)) : "";
            if (callback && needRet) {
                this.evExtendMap.set(sign, callback);
            }
            var json = { 'ptype': 'extend', 'sign': sign, 'needRet': needRet, 'data': data };
            this._wst.send(JSON.stringify(json));
            return sign;
        }
        SendExtendByAsync(argc) {
            let self = this;
            return new Promise((resolove, reject) => {
                if (!self.IsCompleted(true))
                    return reject("Completed前无法执行");
                var needRet = GKP.TL.isDefined(argc.needRet) ? argc.needRet : false;
                if (!needRet) {
                    return reject("必须指定返回");
                }
                self.SendExtendByWS(argc, function (e) {
                    resolove(e);
                });
                setTimeout(function () { reject("超时"); }, 2000);
            });
        }
        SendExtendBySync(argc) {
            if (!this.IsCompleted(true))
                return null;
            var sign = GKP.TL.isDefined(argc.sign) ? argc.sign : (this.mExtendIndex++).toString();
            var needRet = GKP.TL.isDefined(argc.needRet) ? argc.needRet : false;
            var data = GKP.TL.isDefined(argc.data) ? (typeof (argc.data) == 'string' ? argc.data : JSON.stringify(argc.data)) : "";
            var ret = null;
            var json = { 'ptype': 'extend', 'sign': sign, 'needRet': needRet, 'data': data, 'uid': this.current_id, 'uname': this._userName };
            $.ajax({
                type: 'post',
                url: "http://" + this._wsUrl + "/api/gk/app_extend",
                async: false,
                data: JSON.stringify(json),
                success: (res) => {
                    ret = res;
                },
                error: (err, c, p) => {
                    console.error(err);
                    ret = null;
                }
            });
            return ret;
        }
        IsController() {
            return this.isController;
        }
        IsCompleted(print) {
            if (print && !this.isCompleted) {
                console.error('尚未加载完毕！');
            }
            return this.isCompleted;
        }
        IsOwner(print) {
            if (print && (!this.isCompleted || !this.isController)) {
                console.error('尚未加载完毕或不是操作者！');
            }
            return this.isCompleted && this.isController;
        }
        GetSetting() {
            var from_app = "http://" + this._wsUrl + "/api/gk/app_setting";
            $.ajaxSettings.async = false;
            var data = null;
            $.get(from_app, function (result) {
                data = result;
            });
            $.ajaxSettings.async = true;
            return data;
        }
        GetWndSize() {
            return this.mWndSize;
        }
        SetWndSize(w, h) {
            if (!this.IsController()) {
                return;
            }
            if (!this._player) {
                console.error("请在创建完毕后再设置三维窗体大小");
                return;
            }
            var wns = window.gk_wnd_size;
            if (!GKP.TL.isDefined(wns) || !GKP.TL.isDefined(wns.w) || !GKP.TL.isDefined(wns.h)) {
                wns = { w: 0, h: 0 };
                window.gk_wnd_size = wns;
            }
            if (wns.w != w || wns.h != h) {
                wns.w = w;
                wns.h = h;
                var json = { 'ptype': 'setwsize', 'data': w + '*' + h };
                this._wst.send(JSON.stringify(json));
            }
        }
        SetWndQuality(quality) {
            if (!this.IsController()) {
                return;
            }
            var json = { 'ptype': 'setwquality', 'data': quality };
            this._wst.send(JSON.stringify(json));
        }
        FreeCtrl() {
            this.contrl_id = "";
            this.isController = false;
            var json = { 'ptype': 'free_ctrl' };
            this._wst.send(JSON.stringify(json));
        }
        RequestCtrl() {
            var json = { 'ptype': 'ask_ctrl' };
            this._wst.send(JSON.stringify(json));
        }
        CalcClientSize() {
            if (this._player)
                this._player.CalcClientSize();
        }
        GetCurrentID() {
            return this.current_id;
        }
        command1(command, callback, sg) {
            if (!this.isOpened)
                return;
            var sign = sg ? sg : (this.mExtendIndex++).toString();
            var json = {};
            json.sign = sign;
            json.needRet = callback ? true : false;
            json.ptype = "command";
            json.command = command;
            if (callback) {
                this.evExtendMap.set(sign, callback);
            }
            this._wst.send(JSON.stringify(json));
            return sign;
        }
        command2(command) {
            let self = this;
            return new Promise((resolove, reject) => {
                if (!self.isOpened)
                    return reject("场景未打开，无法执行");
                self.command1(command, function (e) {
                    if (e.succeed)
                        resolove(e.data);
                    else
                        reject(e.data);
                });
                setTimeout(function () {
                    reject("超时");
                }, 2000);
            });
        }
        command3(command, synchro, succeedBack, errorBack) {
            if (!this.isOpened)
                return null;
            var sign = (this.mExtendIndex++).toString();
            var json = {};
            json.sign = sign;
            json.ptype = "command";
            json.command = command;
            json.uid = this.current_id;
            json.uname = this._userName;
            var ret = null;
            $.ajax({
                type: 'post',
                url: "http://" + this._wsUrl + "/api/gk/app_command",
                async: !synchro,
                data: JSON.stringify(json),
                success: (res) => {
                    ret = res;
                    if (succeedBack)
                        succeedBack(res);
                },
                error: (err, c, p) => {
                    if (errorBack)
                        errorBack(err);
                }
            });
            if (synchro)
                return ret;
            return null;
        }
        Execute(className, callName, param) {
            let self = this;
            var json = { action: "s_core", className: className, callName: callName, value: param };
            return new Promise((res, rej) => {
                self.command1(json, function (e) {
                    if (e.succeed)
                        res(e.data);
                    else
                        rej(e.data);
                });
            });
        }
        onProgress(type, desc, obj) {
            this.evProgress.forEach((fun, key) => {
                fun({ type: type, desc: desc, obj: obj });
            });
        }
        onMessageBlob(data) {
            var self = this;
            var reader = new FileReader();
            reader.onload = function (e) {
                var abuf = e.target.result;
                var view = new DataView(abuf);
                let tp = view.getInt32(0, true);
                switch (tp) {
                    case DBinType.PIC:
                        {
                            self._player.Render(data, view);
                        }
                        break;
                    case DBinType.CAM_POS:
                        {
                            let camtp = view.getInt32(4, true);
                            let px = view.getFloat32(8, true);
                            let py = view.getFloat32(12, true);
                            let pz = view.getFloat32(16, true);
                            let yaw = view.getFloat32(20, true);
                            let pitch = view.getFloat32(24, true);
                            let roll = view.getFloat32(28, true);
                            if (camtp == 1) {
                                var camChangeObj = { x: px, y: py, z: pz, yaw: yaw, pitch: pitch, roll: roll };
                                self.Navigate._currentPos = camChangeObj;
                                self.evCanChange.forEach((fun, key) => {
                                    fun(camChangeObj);
                                });
                            }
                        }
                        break;
                }
            };
            reader.readAsArrayBuffer(data.slice(0, 32));
        }
        onMessageJSON(json) {
            var self = this;
            switch (json.cType) {
                case DStrType.OPENED:
                    {
                    }
                    break;
                case DStrType.ONLINE:
                    {
                        self.onProgress(DStrType.ONLINE, '用户上线！', json);
                    }
                    break;
                case DStrType.OUT:
                    {
                        self.onProgress(DStrType.OUT, '用户下线！', json);
                    }
                    break;
                case DStrType.FORCEOUT:
                    {
                        console.warn(json);
                        self.onProgress(DStrType.FORCEOUT, '强制下线！', json);
                    }
                    break;
                case DStrType.CTRL:
                    {
                        self.contrl_id = json.contrlId;
                        self.isController = self.contrl_id == self.current_id;
                        self.onProgress(DStrType.CTRL, '服务控制！', json);
                    }
                    break;
                case DStrType.PRO_COMPLETED:
                    {
                        self.isCompleted = true;
                        if (!self.isResizing)
                            self.onProgress(DStrType.PRO_COMPLETED, '工程导入完毕！', json);
                        self.isResizing = false;
                    }
                    break;
                case DStrType.TREE_Fun:
                    {
                        switch (json.action) {
                            case "visible":
                                if (self.IsController())
                                    return;
                                var jss = JSON.parse(json.msg);
                                self.onProgress(DStrType.TREE_Fun, '信息树功能！', jss);
                                break;
                        }
                    }
                    break;
                case DStrType.USERMSG:
                    {
                        self.onProgress(DStrType.USERMSG, '用户信息！', json);
                    }
                    break;
                case DStrType.NOTICE:
                    {
                        self.evNotice.forEach((fun, key) => {
                            fun(json);
                        });
                    }
                    break;
                case DStrType.COMMAND:
                    {
                        var cback = self.evExtendMap.get(json.sign);
                        if (cback) {
                            self.evExtendMap.delete(json.sign);
                            cback(json);
                        }
                        else {
                            console.log("command：" + JSON.stringify(json));
                        }
                    }
                    break;
                case DStrType.EXTEND:
                    {
                        var cback = self.evExtendMap.get(json.sign);
                        if (cback) {
                            self.evExtendMap.delete(json.sign);
                            cback(json);
                        }
                        else {
                            console.log("extend：" + JSON.stringify(json));
                        }
                    }
                    break;
            }
        }
    }
    GKP.GKPusher = GKPusher;
    class GKNavigate {
        constructor(gkp) {
            this.GKP = null;
            this.GKP = gkp;
        }
        _postng(json) {
            let self = this;
            return new Promise((res, rej) => {
                self.GKP.command1(json, function (e) {
                    if (e.succeed)
                        res(e.data);
                    else
                        rej(e.data);
                });
            });
        }
        SetCameraPos(x, y, z, yaw, pitch, roll) {
            if (!this.GKP.IsCompleted(true) || !this.GKP.IsController())
                return;
            var bytearr = new ArrayBuffer(4 + 4 * 8);
            var dv = new DataView(bytearr);
            dv.setUint32(0, 80569723, true);
            dv.setUint16(4, DBinType.CAM_POS, true);
            dv.setUint16(8, 0, true);
            dv.setFloat32(12, x, true);
            dv.setFloat32(16, y, true);
            dv.setFloat32(20, z, true);
            dv.setFloat32(24, yaw, true);
            dv.setFloat32(28, pitch, true);
            dv.setFloat32(32, roll, true);
            this.GKP._wst.send(bytearr);
        }
        SetCameraPos2(pos) {
            this.SetCameraPos(pos.x, pos.y, pos.z, pos.yaw, pos.pitch, pos.roll);
        }
        GetCameraPos() {
            return this._currentPos;
        }
        GetAttrByAsync() {
            var json = { action: 'g_camattr' };
            if (!this.GKP.IsCompleted(true))
                return new Promise((res, rej) => { rej("not completed"); });
            return this.GKP.command2(json);
        }
        GetAttrBySync() {
            var json = { action: 'g_camattr' };
            if (!this.GKP.IsCompleted(true))
                return null;
            return this.GKP.command3(json, true);
        }
        set FieldOfView(value) {
            if (!this.GKP.IsOwner(true))
                return;
            var json = { action: 's_camfov', value: value };
            this.GKP.command1(json);
        }
        get FieldOfView() {
            console.error("不可获取属性");
            return 0;
        }
        set OrthographicZoom(value) {
            if (!this.GKP.IsOwner(true))
                return;
            var json = { action: 's_camzoom', value: value };
            this.GKP.command1(json);
        }
        get OrthographicZoom() {
            console.error("不可获取属性");
            return 0;
        }
        set AspectRatio(value) {
            if (!this.GKP.IsOwner(true))
                return;
            var json = { action: 's_camasp', value: value };
            this.GKP.command1(json);
        }
        get AspectRatio() {
            console.error("不可获取属性");
            return 0;
        }
        set ViewportMode(value) {
            if (!this.GKP.IsOwner(true))
                return;
            var json = { action: 's_camvm', value: value };
            this.GKP.command1(json);
        }
        get ViewportMode() {
            console.error("不可获取属性");
            return 0;
        }
        set ProjectionMode(value) {
            if (!this.GKP.IsOwner(true))
                return;
            var json = { action: 's_campm', value: value };
            this.GKP.command1(json);
        }
        get ProjectionMode() {
            console.error("不可获取属性");
            return 0;
        }
        set ManipulatorMode(value) {
            if (!this.GKP.IsOwner(true))
                return;
            var json = { action: 's_cammm', value: value };
            this.GKP.command1(json);
        }
        get ManipulatorMode() {
            console.error("不可获取属性");
            return 0;
        }
        FlyToPos(pos, range = 100, durationSecond = 2, toback = false) {
            if (!this.GKP.IsOwner(true))
                return null;
            let self = this;
            var json = { action: 's_camfly1', pos: pos, range: range, duration: durationSecond };
            this.GKP.command1(json);
            if (toback)
                return new Promise((res, rej) => {
                    setTimeout(function () { res(true); }, durationSecond * 1000 + 100);
                });
            return null;
        }
        FlyToObject(pid, durationSecond = 2, toback = false) {
            if (!this.GKP.IsOwner(true))
                return;
            let self = this;
            var json = { action: 's_camfly2', pid: pid, duration: durationSecond, toback: toback };
            if (toback)
                return new Promise((res, rej) => {
                    self.GKP.command1(json, function (e) {
                        if (!e.succeed) {
                            console.error(e.data);
                            res(false);
                        }
                        else
                            res(true);
                    });
                    setTimeout(function () { res(false); }, durationSecond * 1000 + 100);
                });
            else
                this.GKP.command1(json);
            return null;
        }
        Stop() {
            if (!this.GKP.IsOwner(true))
                return;
            var json = { action: 's_camstop' };
            this.GKP.command1(json);
        }
        SetClipRange(bAuto, nearClip, farClip) {
            if (!this.GKP.IsOwner(true))
                return;
            var json = { action: 's_camcr', bAuto: bAuto, nearClip: nearClip, farClip: farClip };
            this.GKP.command1(json);
        }
        GetClipRange() {
            let self = this;
            var json = { action: 'g_camcr' };
            return this._postng(json);
        }
    }
    GKP.GKNavigate = GKNavigate;
    class GKAnalysis {
        constructor(gkp) {
            this.GKP = null;
            this._anaType = GKAnaType.None;
            this._vAnalyse = EmVisualAnalyse.VA_MODE_NONE;
            this._viewshedParams = {};
            this._sectionParams = {};
            this._skylineParams = {};
            this.GKP = gkp;
        }
        _postay(json) {
            let self = this;
            return new Promise((res, rej) => {
                self.GKP.command1(json, function (e) {
                    if (e.succeed)
                        res(e.data);
                    else
                        rej(e.data);
                });
            });
        }
        GetMeasure() {
            return this._anaType;
        }
        SetMeasure(anaType) {
            if (!this.GKP.IsController())
                return;
            this._anaType = anaType;
            var json = { 'ptype': 'measure', 'data': anaType };
            this.GKP._wst.send(JSON.stringify(json));
        }
        StartAnalyse(analyseMode) {
            if (!this.GKP.IsOwner(true))
                return null;
            var json = { action: 's_vs_start', analyseMode: analyseMode };
            if (analyseMode == EmVisualAnalyse.VA_MODE_SKYLINE) {
                json.needRet = true;
                return this._postay(json);
            }
            this.GKP.command1(json);
            return null;
        }
        GetAnalysisMode() {
            return this._vAnalyse;
        }
        StopAnalyse() {
            if (!this.GKP.IsOwner(true))
                return;
            var json = { action: 's_vs_stop' };
            this.GKP.command1(json);
        }
        SetViewshedParams(eye, target, missNear = 2, verAngle = 30, horAngle = 45, density = 0) {
            if (!this.GKP.IsOwner(true))
                return;
            this._viewshedParams = { action: 's_vs_viewshed', eye: eye, target: target, missNear: missNear, verAngle: verAngle, horAngle: horAngle, density: density };
            return this._postay(this._viewshedParams);
        }
        GetViewshedParams() {
            return this._viewshedParams;
        }
        SetSectionParams(point1, point2, point3 = null, vertical = true, expand = 0) {
            if (!this.GKP.IsOwner(true))
                return null;
            this._sectionParams = { action: 's_vs_secp', point1: point1, point2: point2, point3: point3, vertical: vertical, expand: expand };
            return this._postay(this._sectionParams);
        }
        GetSectionParams() {
            return this._sectionParams;
        }
        GetSectionResult() {
            if (!this.GKP.IsOwner(true))
                return null;
            var json = { action: 's_vs_secret' };
            return this._postay(json);
        }
        SetSkylineParamsByCurrentEye(radiusNear = 5, radiusFar = 100000) {
            if (!this.GKP.IsOwner(true))
                return null;
            this._skylineParams = { t: 1, action: 's_vs_skyline', radiusNear: radiusNear, radiusFar: radiusFar };
            return this._postay(this._skylineParams);
        }
        SetSkylineParamsByCustomEye(eye, radiusNear = 5, radiusFar = 3000, startAngle = 0, sweepAngle = 360, resolution = 2) {
            if (!this.GKP.IsOwner(true))
                return null;
            this._skylineParams = { t: 2, action: 's_vs_skyline', eye: eye, radiusNear: radiusNear, radiusFar: radiusFar, startAngle: startAngle, sweepAngle: sweepAngle, resolution: resolution };
            return this._postay(this._skylineParams);
        }
        GetSkylineParams() {
            return this._skylineParams;
        }
        GetSkylineResult(angleOfElevation) {
            if (!this.GKP.IsOwner(true))
                return;
            var json = { action: 's_vs_skylin_1', angleOfElevation: angleOfElevation };
            return this._postay(json);
        }
        GetSkylineImageResult(chart, imgWidth, imgHeight) {
            if (!this.GKP.IsOwner(true))
                return null;
            var json = { action: 's_vs_skylin_2', chart: chart, imgWidth: imgWidth, imgHeight: imgHeight };
            return this._postay(json);
        }
    }
    GKP.GKAnalysis = GKAnalysis;
    class GKRender {
        constructor(gkp) {
            this.GKP = null;
            this._stereoMode = EmStereoMode.NONE;
            this.GKP = gkp;
        }
        _postrd(json) {
            let self = this;
            return new Promise((res, rej) => {
                self.GKP.command1(json, function (e) {
                    if (e.succeed)
                        res(e.data);
                    else
                        rej(e.data);
                });
            });
        }
        AddLogInfo(info, logLevel = 1) {
            if (!this.GKP.IsOwner(true))
                return;
            var json = { action: 's_r_log', info: info, logLevel: logLevel };
            this.GKP.command1(json);
        }
        set StereoMode(value) {
            if (!this.GKP.IsOwner(true))
                return;
            var json = { action: 's_r_stereo', value: value };
            this.GKP.command1(json);
        }
        get StereoMode() {
            return this._stereoMode;
        }
        GetObjectFromScreen(x, y, pFilter = EmFilter.GK_FILTER_FIRST) {
            if (!this.GKP.IsOwner(true))
                return;
            var json = { action: 's_r_ofs', x: x, y: y, pFilter: pFilter };
            return this._postrd(json);
        }
        ScreenToWorld(pixelX, pixelY, pFilter = EmFilter.GK_FILTER_FIRST) {
            if (!this.GKP.IsOwner(true))
                return;
            var json = { action: 's_r_stw', pixelX: pixelX, pixelY: pixelY, pFilter: pFilter };
            return this._postrd(json);
        }
        ScreenFromWorld(worldPos) {
            if (!this.GKP.IsOwner(true))
                return;
            var json = { action: 's_r_sfw', worldPos: worldPos };
            return this._postrd(json);
        }
        Start3DTip(tipSign) {
            if (!this.GKP.IsOwner(true))
                return;
            var json = { action: 's_r_tip1', tipSign: tipSign };
            this.GKP.command1(json);
        }
        Stop3DTip(tipSign) {
            if (!this.GKP.IsOwner(true))
                return;
            var json = { action: 's_r_tip2', tipSign: tipSign };
            this.GKP.command1(json);
        }
        SetCompassShow(show) {
            return this.GKP.Execute('Render.Compass', 'Show', show === true);
        }
    }
    GKP.GKRender = GKRender;
    class GKManager {
        constructor(gkp) {
            this.GKP = null;
            this.GKP = gkp;
        }
        _postmg(json) {
            let self = this;
            return new Promise((res, rej) => {
                self.GKP.command1(json, function (e) {
                    if (e.succeed)
                        res(e.data);
                    else
                        rej(e.data);
                });
            });
        }
        Getdynatree() {
            if (!this.GKP.IsCompleted(true))
                return null;
            var json = { action: 'g_m_tree1' };
            return this._postmg(json);
        }
        GetImageLayers() {
            if (!this.GKP.IsCompleted(true))
                return null;
            var json = { action: 'g_m_imgs' };
            return this._postmg(json);
        }
        GetElevationLayers() {
            if (!this.GKP.IsCompleted(true))
                return null;
            var json = { action: 'g_m_eles' };
            return this._postmg(json);
        }
        GetFeatureLayers() {
            if (!this.GKP.IsCompleted(true))
                return null;
            var json = { action: 'g_m_feas' };
            return this._postmg(json);
        }
        GetModelLayers() {
            if (!this.GKP.IsCompleted(true))
                return null;
            var json = { action: 'g_m_mds' };
            return this._postmg(json);
        }
        GetMeshLayers() {
            if (!this.GKP.IsCompleted(true))
                return null;
            var json = { action: 'g_m_mes' };
            return this._postmg(json);
        }
        GetPointCloudLayers() {
            if (!this.GKP.IsCompleted(true))
                return null;
            var json = { action: 'g_m_pcs' };
            return this._postmg(json);
        }
        GetTerraObjLayers() {
            if (!this.GKP.IsCompleted(true))
                return null;
            var json = { action: 'g_m_tos' };
            return this._postmg(json);
        }
        GetByName(name, findType = EmObjectType.OT_UNKNOWN, groupID = "") {
            if (!this.GKP.IsCompleted(true))
                return null;
            var json = { action: 'g_m_bynm', name: name, findType: findType, groupID: groupID };
            return this._postmg(json);
        }
        GetDatabaseType(url) {
            if (!this.GKP.IsCompleted(true))
                return null;
            var json = { action: 'g_m_dbt', url: url };
            return this._postmg(json);
        }
        GetLayerByURL(url) {
            if (!this.GKP.IsCompleted(true))
                return null;
            var json = { action: 'g_m_lbyurl', url: url };
            return this._postmg(json);
        }
        GetByID(objectID) {
            if (!this.GKP.IsCompleted(true))
                return null;
            let self = this;
            var json = { action: 'g_m_byid', objectID: objectID };
            return this._postmg(json).then(e => {
                var ret = new GKObject(e.ObjectID, self.GKP);
                return Object.assign(ret, e);
            });
        }
        InfoTreeRoot() {
            if (!this.GKP.IsCompleted(true))
                return null;
            var json = { action: 'g_m_root' };
            return this._postmg(json);
        }
        CreateGroup(groupName, parentGroupId = "") {
            if (!this.GKP.IsCompleted(true))
                return null;
            var json = { action: 'g_m_cg', groupName: groupName, parentGroupId: parentGroupId };
            return this._postmg(json);
        }
        IsGroup(groupId) {
            if (!this.GKP.IsCompleted(true))
                return null;
            var json = { action: 'g_m_isg', groupId: groupId };
            return this._postmg(json);
        }
        SetParent(layerOrGroupID, newParentGroupID) {
            if (!this.GKP.IsCompleted(true))
                return null;
            var json = { action: 'g_m_setp', layerOrGroupID: layerOrGroupID, newParentGroupID: newParentGroupID };
            return this._postmg(json);
        }
        GetNextObject(objectID, code) {
            if (!this.GKP.IsCompleted(true))
                return null;
            var json = { action: 'g_m_nxo', objectID: objectID, code: code };
            return this._postmg(json);
        }
        DeleteObject(gkObjectID) {
            if (!this.GKP.IsOwner(true))
                return null;
            var json = { action: 'g_m_delo', gkObjectID: gkObjectID };
            return this._postmg(json);
        }
        GetByPath(pathName, pathFirstType, findAll) {
            if (!this.GKP.IsCompleted(true))
                return null;
            var json = { action: 'g_m_bypath', pathName: pathName, pathFirstType: pathFirstType, findAll: findAll };
            return this._postmg(json);
        }
    }
    GKP.GKManager = GKManager;
    class GKCreator {
        constructor(gkp) {
            this.GKP = null;
            this.GKP = gkp;
        }
        _postct(json) {
            let self = this;
            return new Promise((res, rej) => {
                self.GKP.command1(json, function (e) {
                    if (e.succeed)
                        res(e.data);
                    else
                        rej(e.data);
                });
            });
        }
        CreatePathRoute(pName, points = null, groupID = "") {
            if (!this.GKP.IsOwner(true))
                return null;
            var json = { action: 'c_c_pr', pName: pName, points: points, groupID: groupID };
            return this._postct(json);
        }
        CreateGKDBLayer(url, pName = "", isVisible = true, isTerrain = false, groupID = "") {
            if (!this.GKP.IsOwner(true))
                return null;
            var json = { action: 'c_c_clayer', pName: pName, url: url, isVisible: isVisible, isTerrain: isTerrain, groupID: groupID };
            return this._postct(json);
        }
        CreateTerraObjsLayer(pName, groupID = "") {
            if (!this.GKP.IsOwner(true))
                return null;
            var json = { action: 'c_c_colayer', pName: pName, groupID: groupID };
            return this._postct(json);
        }
        CreateViewPoint(name, pos, yaw = 0, pitch = -45, range = 0, groupID = "") {
            if (!this.GKP.IsOwner(true))
                return null;
            var json = { action: 'c_c_vp', name: name, pos: pos, yaw: yaw, pitch: pitch, range: range, groupID: groupID };
            return this._postct(json);
        }
        CreateTerraImageOverlay(name, imageUrl, centerX, centerY, width, heith, rotation, terraObjsLayerID = "") {
            if (!this.GKP.IsOwner(true))
                return null;
            var json = { action: 'c_c_imgov', name: name, imageUrl: imageUrl, centerX: centerX, centerY: centerY, width: width, heith: heith, rotation: rotation, terraObjsLayerID: terraObjsLayerID };
            return this._postct(json);
        }
        CreateTerraTextLabel(name, pos, fontSize = 32, terraObjsLayerID = "") {
            if (!this.GKP.IsOwner(true))
                return null;
            var json = { action: 'c_c_txtlb', name: name, pos: pos, fontSize: fontSize, terraObjsLayerID: terraObjsLayerID };
            return this._postct(json);
        }
        CreateTerraLabel(name, pos, imageUrl = "", terraObjsLayerID = "") {
            if (!this.GKP.IsOwner(true))
                return null;
            var json = { action: 'c_c_lb', name: name, pos: pos, imageUrl: imageUrl, terraObjsLayerID: terraObjsLayerID };
            return this._postct(json);
        }
        CreateTerraRectangle(name, pos, width, height, terraObjsLayerID = "", fillColor = 0xFF646464, lineColor = 0xFF00FF00) {
            if (!this.GKP.IsOwner(true))
                return null;
            var json = {
                action: 'c_c_rect', name: name, pos: pos, width: width, height: height, terraObjsLayerID: terraObjsLayerID, fillColor: fillColor, lineColor: lineColor
            };
            return this._postct(json);
        }
        CreateTerraCircle(name, pos, pRadius, terraObjsLayerID = "", fillColor = 0xFF646464, lineColor = 0xFF00FF00) {
            if (!this.GKP.IsOwner(true))
                return null;
            var json = {
                action: 'c_c_cc', name: name, pos: pos, pRadius: pRadius, terraObjsLayerID: terraObjsLayerID, fillColor: fillColor, lineColor: lineColor
            };
            return this._postct(json);
        }
        CreateTerraEllipse(name, pos, majorRadius, minnorRadius, terraObjsLayerID = "", fillColor = 0xFF646464, lineColor = 0xFF00FF00) {
            if (!this.GKP.IsOwner(true))
                return null;
            var json = {
                action: 'c_c_ep', name: name, pos: pos, majorRadius: majorRadius, minnorRadius: minnorRadius, terraObjsLayerID: terraObjsLayerID, fillColor: fillColor, lineColor: lineColor
            };
            return this._postct(json);
        }
        CreateTerraPolyline(name, verticesArray = null, terraObjsLayerID = "", lineColor = 0xFF00FF00) {
            if (!this.GKP.IsOwner(true))
                return null;
            var json = { action: 'c_c_pl', name: name, verticesArray: verticesArray, terraObjsLayerID: terraObjsLayerID, lineColor: lineColor };
            return this._postct(json);
        }
        CreateTerraPolygon(name, verticesArray = null, terraObjsLayerID = "", fillColor = 0xFF646464, lineColor = 0xFF00FF00) {
            if (!this.GKP.IsOwner(true))
                return null;
            var json = { action: 'c_c_pg', name: name, verticesArray: verticesArray, terraObjsLayerID: terraObjsLayerID, fillColor: fillColor, lineColor: lineColor };
            return this._postct(json);
        }
        CreateTerraHole(name, verticesArray = null, terraObjsLayerID = "") {
            if (!this.GKP.IsOwner(true))
                return null;
            var json = { action: 'c_c_ho', name: name, verticesArray: verticesArray, terraObjsLayerID: terraObjsLayerID };
            return this._postct(json);
        }
    }
    GKP.GKCreator = GKCreator;
})(GKP || (GKP = {}));
var GPSR = new GKP.GKPusher();
var GPNavigate = GPSR.Navigate;
var GPAnalysis = GPSR.Analysis;
var GPRender = GPSR.Render;
var GPManager = GPSR.Manager;
var GPCreator = GPSR.Creator;
