var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GKP;
(function (GKP) {
    /**JS接口版本，6位，大版本(两位)、小版本(两位)、修订版(两位) 100025 */
    GKP.VERSION = 100025;
    /**服务版本，6位，大版本(两位)、小版本(两位)、修订版(两位) 100000 */
    GKP.VERSERV = 100000;
    /**二进制数据类型，值不能改动，必须和C#代码保持一致 */
    var DBinType;
    (function (DBinType) {
        /**未知 */
        DBinType[DBinType["NONE"] = 0] = "NONE";
        /**窗口图像 */
        DBinType[DBinType["PIC"] = 1] = "PIC";
        /**相机姿态变更事件 */
        DBinType[DBinType["CAM_POS"] = 2] = "CAM_POS";
        /**鼠标单击 */
        DBinType[DBinType["MS_CLICK"] = 10] = "MS_CLICK";
        /**鼠标双击 */
        DBinType[DBinType["MS_DB"] = 11] = "MS_DB";
        /**鼠标按下 */
        DBinType[DBinType["MS_DOWN"] = 12] = "MS_DOWN";
        /**鼠标弹起 */
        DBinType[DBinType["MS_UP"] = 13] = "MS_UP";
        /**鼠标移动 */
        DBinType[DBinType["MS_MOVE"] = 14] = "MS_MOVE";
        /**鼠标滚轮 */
        DBinType[DBinType["MS_WHEEL"] = 15] = "MS_WHEEL";
    })(DBinType = GKP.DBinType || (GKP.DBinType = {}));
    /**字符串数据类型，值不能改动，必须和C#代码保持一致，负值是在JS中定义的 */
    var DStrType;
    (function (DStrType) {
        /**服务三维渲染窗口发生变化 */
        DStrType[DStrType["OnWndSize"] = -3] = "OnWndSize";
        /**服务关闭 */
        DStrType[DStrType["CLOSE"] = -2] = "CLOSE";
        /**服务发生错误 */
        DStrType[DStrType["ERROR"] = -2] = "ERROR";
        /**服务正在开启中 */
        DStrType[DStrType["OPENING"] = -1] = "OPENING";
        /**测试数据 */
        DStrType[DStrType["TEST"] = 0] = "TEST";
        /**某用户打开完毕 */
        DStrType[DStrType["OPENED"] = 1] = "OPENED";
        /**工程加载完毕通知 */
        DStrType[DStrType["PRO_COMPLETED"] = 2] = "PRO_COMPLETED";
        /**上线 */
        DStrType[DStrType["ONLINE"] = 3] = "ONLINE";
        /**下线 */
        DStrType[DStrType["OUT"] = 4] = "OUT";
        /**被挤下线 */
        DStrType[DStrType["FORCEOUT"] = 5] = "FORCEOUT";
        /**控制者 */
        DStrType[DStrType["CTRL"] = 6] = "CTRL";
        /**信息树操作 */
        DStrType[DStrType["TREE_Fun"] = 7] = "TREE_Fun";
        /**用户之间的消息 */
        DStrType[DStrType["USERMSG"] = 8] = "USERMSG";
        /**command */
        DStrType[DStrType["COMMAND"] = 9] = "COMMAND";
        /**通知消息 */
        DStrType[DStrType["NOTICE"] = 20] = "NOTICE";
        /**扩展信息，一般为二次开发提供的信息 */
        DStrType[DStrType["EXTEND"] = 99] = "EXTEND";
    })(DStrType = GKP.DStrType || (GKP.DStrType = {}));
    ;
    /**视口模式，要让模型出现在某个窗口，使用GKViewportMaskCode */
    var EmViewportMode;
    (function (EmViewportMode) {
        /**1 (默认)单视口 */
        EmViewportMode[EmViewportMode["GK_VM_MODE_SINGLE"] = 1] = "GK_VM_MODE_SINGLE";
        /**4 十字四视口 */
        EmViewportMode[EmViewportMode["GK_VM_MODE_QUAD"] = 4] = "GK_VM_MODE_QUAD";
        /**8 左下角开启一个小视口,用于观察指定模型 */
        EmViewportMode[EmViewportMode["GK_VM_MODE_SUBVIEW"] = 8] = "GK_VM_MODE_SUBVIEW";
        /**32 上下两视口 */
        EmViewportMode[EmViewportMode["GK_WM_MODE_VER_2"] = 32] = "GK_WM_MODE_VER_2";
        /**33 上下三视口 */
        EmViewportMode[EmViewportMode["GK_WM_MODE_VER_3"] = 33] = "GK_WM_MODE_VER_3";
        /**64 左右水平两视口 */
        EmViewportMode[EmViewportMode["GK_VM_MODE_HOR_2"] = 64] = "GK_VM_MODE_HOR_2";
        /**65 左右水平三视口 */
        EmViewportMode[EmViewportMode["GK_VM_MODE_HOR_3"] = 65] = "GK_VM_MODE_HOR_3";
        /**66 左右水平四视口 */
        EmViewportMode[EmViewportMode["GK_VM_MODE_HOR_4"] = 66] = "GK_VM_MODE_HOR_4";
    })(EmViewportMode = GKP.EmViewportMode || (GKP.EmViewportMode = {}));
    /**投影方式 */
    var EmProjectionType;
    (function (EmProjectionType) {
        /**透视投影 */
        EmProjectionType[EmProjectionType["GK_CAM_PROJ_PERSPECTIVE"] = 1] = "GK_CAM_PROJ_PERSPECTIVE";
        /**正交投影 */
        EmProjectionType[EmProjectionType["GK_CAM_PROJ_ORTHOGRAPHIC"] = 2] = "GK_CAM_PROJ_ORTHOGRAPHIC";
    })(EmProjectionType = GKP.EmProjectionType || (GKP.EmProjectionType = {}));
    /**模式 */
    var EmManipMode;
    (function (EmManipMode) {
        /**自由模式 */
        EmManipMode[EmManipMode["GMANIP_FREE"] = 0] = "GMANIP_FREE";
        /**第一人称模式 */
        EmManipMode[EmManipMode["GMANIP_FRIST_PERSON"] = 1] = "GMANIP_FRIST_PERSON";
    })(EmManipMode = GKP.EmManipMode || (GKP.EmManipMode = {}));
    var GKAnaType;
    (function (GKAnaType) {
        GKAnaType[GKAnaType["None"] = 0] = "None";
        GKAnaType[GKAnaType["MeasurePoint"] = 1] = "MeasurePoint";
        GKAnaType[GKAnaType["MeasureHor"] = 2] = "MeasureHor";
        GKAnaType[GKAnaType["MeasureVer"] = 3] = "MeasureVer";
        GKAnaType[GKAnaType["MeasureSpace"] = 4] = "MeasureSpace";
        GKAnaType[GKAnaType["MeasureArea"] = 5] = "MeasureArea";
    })(GKAnaType = GKP.GKAnaType || (GKP.GKAnaType = {}));
    /**可视分析模式 */
    var EmVisualAnalyse;
    (function (EmVisualAnalyse) {
        /**0 无分析模式 */
        EmVisualAnalyse[EmVisualAnalyse["VA_MODE_NONE"] = 0] = "VA_MODE_NONE";
        /**1 控高分析 */
        EmVisualAnalyse[EmVisualAnalyse["VA_MODE_HEIGHT"] = 1] = "VA_MODE_HEIGHT";
        /**2 视域分析 */
        EmVisualAnalyse[EmVisualAnalyse["VA_MODE_VIEWSHED"] = 2] = "VA_MODE_VIEWSHED";
        /**3 日照分析，受场景时间影响（通过Render.SceneTime设置） */
        EmVisualAnalyse[EmVisualAnalyse["VA_MODE_SHADOW"] = 3] = "VA_MODE_SHADOW";
        /**4 通透性分析 */
        EmVisualAnalyse[EmVisualAnalyse["VA_MODE_LINEOFSIGHT"] = 4] = "VA_MODE_LINEOFSIGHT";
        /**5 天际线分析 */
        EmVisualAnalyse[EmVisualAnalyse["VA_MODE_SKYLINE"] = 5] = "VA_MODE_SKYLINE";
        /**6 断面分析 */
        EmVisualAnalyse[EmVisualAnalyse["VA_MODE_SECTION"] = 6] = "VA_MODE_SECTION";
    })(EmVisualAnalyse = GKP.EmVisualAnalyse || (GKP.EmVisualAnalyse = {}));
    /**立体模式 */
    var EmStereoMode;
    (function (EmStereoMode) {
        /**未采用立体模式 */
        EmStereoMode[EmStereoMode["NONE"] = -1] = "NONE";
        /**四方体缓冲 */
        EmStereoMode[EmStereoMode["QUAD_BUFFER"] = 0] = "QUAD_BUFFER";
        /**红蓝互补色 */
        EmStereoMode[EmStereoMode["ANAGLYPHIC"] = 1] = "ANAGLYPHIC";
        /**左右格式立体 */
        EmStereoMode[EmStereoMode["HORIZONTAL_SPLIT"] = 2] = "HORIZONTAL_SPLIT";
        /**上下格式立体 */
        EmStereoMode[EmStereoMode["VERTICAL_SPLIT"] = 3] = "VERTICAL_SPLIT";
        /**左眼 */
        EmStereoMode[EmStereoMode["LEFT_EYE"] = 4] = "LEFT_EYE";
        /**右眼 */
        EmStereoMode[EmStereoMode["RIGHT_EYE"] = 5] = "RIGHT_EYE";
        /**水平交错 */
        EmStereoMode[EmStereoMode["HORIZONTAL_INTERLACE"] = 6] = "HORIZONTAL_INTERLACE";
        /**垂直交错 */
        EmStereoMode[EmStereoMode["VERTICAL_INTERLACE"] = 7] = "VERTICAL_INTERLACE";
        /**棋盘式交错，用于DLP显示器 */
        EmStereoMode[EmStereoMode["CHECKERBOARD"] = 8] = "CHECKERBOARD";
    })(EmStereoMode = GKP.EmStereoMode || (GKP.EmStereoMode = {}));
    /**物体筛选 */
    var EmFilter;
    (function (EmFilter) {
        /**1 第一个相交对象 */
        EmFilter[EmFilter["GK_FILTER_FIRST"] = 1] = "GK_FILTER_FIRST";
        /**2 模型实体（手工模型、BIM） */
        EmFilter[EmFilter["GK_FILTER_ENTITY"] = 2] = "GK_FILTER_ENTITY";
        /**4 矢量数据 */
        EmFilter[EmFilter["GK_FILTER_FEATURE"] = 4] = "GK_FILTER_FEATURE";
        /**8 自绘制物体 */
        EmFilter[EmFilter["GK_FILTER_TERRAOBJECT"] = 8] = "GK_FILTER_TERRAOBJECT";
        /**16 管线 */
        EmFilter[EmFilter["GK_FILTER_PIPE"] = 16] = "GK_FILTER_PIPE";
        /**32 倾斜摄影 */
        EmFilter[EmFilter["GK_FILTER_MESH"] = 32] = "GK_FILTER_MESH";
        /**64 地形 */
        EmFilter[EmFilter["GK_FILTER_TERRAIN"] = 64] = "GK_FILTER_TERRAIN";
        /**128 地下（在地形下面下） */
        EmFilter[EmFilter["GK_FILTER_UNDERGROUD"] = 128] = "GK_FILTER_UNDERGROUD";
        /** 0xFFFFFF 所有类型 */
        EmFilter[EmFilter["GK_FILTER_ALL"] = 16777215] = "GK_FILTER_ALL";
    })(EmFilter = GKP.EmFilter || (GKP.EmFilter = {}));
    /**对象类型 */
    var EmObjectType;
    (function (EmObjectType) {
        /**未知对象 */
        EmObjectType[EmObjectType["OT_UNKNOWN"] = -1] = "OT_UNKNOWN";
        /**对象 */
        EmObjectType[EmObjectType["OT_OBJECT"] = 0] = "OT_OBJECT";
        /**逻辑组 */
        EmObjectType[EmObjectType["OT_GROUP"] = 1] = "OT_GROUP";
        /**容器，对象集合 */
        EmObjectType[EmObjectType["OT_COLLECTION"] = 2] = "OT_COLLECTION";
        /**天空节点 */
        EmObjectType[EmObjectType["OT_SKY"] = 3] = "OT_SKY";
        /**影像层 */
        EmObjectType[EmObjectType["OT_IMAGE_LAYER"] = 4] = "OT_IMAGE_LAYER";
        /**高程层 */
        EmObjectType[EmObjectType["OT_ELEVATION_LAYER"] = 5] = "OT_ELEVATION_LAYER";
        /**矢量层 */
        EmObjectType[EmObjectType["OT_FEATURE_LAYER"] = 6] = "OT_FEATURE_LAYER";
        /**三维模型层 */
        EmObjectType[EmObjectType["OT_MODEL_LAYER"] = 7] = "OT_MODEL_LAYER";
        /**倾斜三维实景模型层 */
        EmObjectType[EmObjectType["OT_MESH_LAYER"] = 8] = "OT_MESH_LAYER";
        /**地形层（所有地形的总类型，值为9且值不可变更） */
        EmObjectType[EmObjectType["OT_TERRAIN_LAYERS"] = 9] = "OT_TERRAIN_LAYERS";
        /**地形对象层 */
        EmObjectType[EmObjectType["OT_TERRAOBJECT_LAYER"] = 10] = "OT_TERRAOBJECT_LAYER";
        /**三维模型对象实体 */
        EmObjectType[EmObjectType["OT_MODELENTITY"] = 11] = "OT_MODELENTITY";
        /**三维模型对象实体组 */
        EmObjectType[EmObjectType["OT_MODELENTITYGROUP"] = 12] = "OT_MODELENTITYGROUP";
        /**特征数据 */
        EmObjectType[EmObjectType["OT_FEATURE"] = 13] = "OT_FEATURE";
        /**图形覆盖 */
        EmObjectType[EmObjectType["OT_TERRA_IMAGE"] = 14] = "OT_TERRA_IMAGE";
        /**管线 */
        EmObjectType[EmObjectType["OT_PIPELINE"] = 15] = "OT_PIPELINE";
        /**BIM */
        EmObjectType[EmObjectType["OT_BIM"] = 16] = "OT_BIM";
        /**矢量特征 */
        EmObjectType[EmObjectType["OT_TERRA_FEATURE"] = 17] = "OT_TERRA_FEATURE";
        /**矢量特征组 */
        EmObjectType[EmObjectType["OT_TERRA_FEATURES"] = 18] = "OT_TERRA_FEATURES";
        /**地形效果 */
        EmObjectType[EmObjectType["OT_TERRA_PARTICLE"] = 19] = "OT_TERRA_PARTICLE";
        /**文本标签 */
        EmObjectType[EmObjectType["OT_TERRA_TEXTLABEL"] = 20] = "OT_TERRA_TEXTLABEL";
        /**外部模型 */
        EmObjectType[EmObjectType["OT_TERRA_MODEL"] = 21] = "OT_TERRA_MODEL";
        /**图片标签 */
        EmObjectType[EmObjectType["OT_TERRA_LABEL"] = 22] = "OT_TERRA_LABEL";
        /**矩形 */
        EmObjectType[EmObjectType["OT_TERRA_RECTANGLE"] = 23] = "OT_TERRA_RECTANGLE";
        /**运动物体 */
        EmObjectType[EmObjectType["OT_TERRA_TRACK"] = 24] = "OT_TERRA_TRACK";
        /**地形修正 */
        EmObjectType[EmObjectType["OT_TERRA_MODIFIER"] = 25] = "OT_TERRA_MODIFIER";
        /**圆 */
        EmObjectType[EmObjectType["OT_TERRA_CIRCLE"] = 26] = "OT_TERRA_CIRCLE";
        /**椭圆 */
        EmObjectType[EmObjectType["OT_TERRA_ELLIPSE"] = 27] = "OT_TERRA_ELLIPSE";
        /**带基点几何,基点为（0,0,0）表示绝对坐标 */
        EmObjectType[EmObjectType["OT_TERRA_GEOMETRY"] = 28] = "OT_TERRA_GEOMETRY";
        /**带基点线,基点为（0,0,0）表示绝对坐标 */
        EmObjectType[EmObjectType["OT_TERRA_POLYLINE"] = 29] = "OT_TERRA_POLYLINE";
        /**带基点多边形,基点为（0,0,0）表示绝对坐标 */
        EmObjectType[EmObjectType["OT_TERRA_POLYGON"] = 30] = "OT_TERRA_POLYGON";
        /**带基点地形挖洞,基点为（0,0,0）表示绝对坐标 */
        EmObjectType[EmObjectType["OT_TERRA_HOLE"] = 31] = "OT_TERRA_HOLE";
        /**水 */
        EmObjectType[EmObjectType["OT_TERRA_WATER"] = 32] = "OT_TERRA_WATER";
        /**动态对象 */
        EmObjectType[EmObjectType["OT_TERRA_DYNAMICOBJECT"] = 33] = "OT_TERRA_DYNAMICOBJECT";
        /**点云 */
        EmObjectType[EmObjectType["OT_POINTCLOUD_LAYER"] = 34] = "OT_POINTCLOUD_LAYER";
        /**动画路径 */
        EmObjectType[EmObjectType["OT_PATHROUTE"] = 35] = "OT_PATHROUTE";
        /**倾斜三维实景模型子瓦片 */
        EmObjectType[EmObjectType["OT_MESHENTITY"] = 36] = "OT_MESHENTITY";
        /**视点 */
        EmObjectType[EmObjectType["OT_VIEW_POINT"] = 37] = "OT_VIEW_POINT";
    })(EmObjectType = GKP.EmObjectType || (GKP.EmObjectType = {}));
    /**搜索信息树节点方式 */
    var EmItemCode;
    (function (EmItemCode) {
        /**指定组Item的第一个子节点 */
        EmItemCode[EmItemCode["CHILD"] = 11] = "CHILD";
        /**Item的下一个兄弟节点 */
        EmItemCode[EmItemCode["NEXT"] = 13] = "NEXT";
        /**Item的下一个可见的兄弟节点 */
        EmItemCode[EmItemCode["NEXTVISIBLE"] = 14] = "NEXTVISIBLE";
        /**Item的父节点 */
        EmItemCode[EmItemCode["PARENT"] = 15] = "PARENT";
        /**Item的前一个兄弟节点 */
        EmItemCode[EmItemCode["PREVIOUS"] = 16] = "PREVIOUS";
        /**Item的前一个可见的兄弟节点 */
        EmItemCode[EmItemCode["PREVIOUSVISIBLE"] = 17] = "PREVIOUSVISIBLE";
        /**根节点 */
        EmItemCode[EmItemCode["ROOT"] = 18] = "ROOT";
    })(EmItemCode = GKP.EmItemCode || (GKP.EmItemCode = {}));
    /**事件类型 */
    var EmEvent;
    (function (EmEvent) {
        /**相机位置变更 */
        EmEvent[EmEvent["CAM_CHANGE"] = 1] = "CAM_CHANGE";
        /**进度事件 */
        EmEvent[EmEvent["PROGRESS"] = 2] = "PROGRESS";
        /**鼠标事件，点击、双击、按下、释放、移动、滚轮 */
        EmEvent[EmEvent["MOUSE_EV"] = 3] = "MOUSE_EV";
        /**提示事件 */
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
        /**
         * rgb转为十六进制颜色 colorHex('rgb(255,255,255)') => "#ffffff"
         */
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
        /**
         * 十六进制颜色转为RGB  colorRgb("#fff") => "RGB(255,255,255)"
         */
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
    var GKPlayer = /** @class */ (function () {
        function GKPlayer(pusher) {
            this.mClientWidth = 0;
            this.mClientHeight = 0;
            this.isRTC = false;
            this.mPusher = null;
            this.mPusher = pusher;
        }
        GKPlayer.prototype.CalcClientSize = function () {
        };
        GKPlayer.prototype.Render = function (data, view) {
        };
        GKPlayer.prototype.OnStrMessage = function (json) {
        };
        GKPlayer.prototype.OnOpended = function () {
        };
        GKPlayer.prototype.OnClosed = function () {
        };
        GKPlayer.prototype.Statistics = function (show) {
        };
        return GKPlayer;
    }());
    var CanvasPlayer = /** @class */ (function (_super) {
        __extends(CanvasPlayer, _super);
        function CanvasPlayer(pusher) {
            var _this = _super.call(this, pusher) || this;
            _this.mCanvas = null;
            _this.context = null;
            _this.frameIndex = 0;
            _this.framePackets = 0;
            _this.statisticsDiv = null;
            var container = $('#' + pusher._containerID);
            if (container.length < 1)
                console.error("请传入正确的div容器id");
            var htm = '<canvas id="' + pusher._playerID + '" width="2560" height="1440" style="width: 1280px; height: 720px; background-color:azure;" tabindex="0"></canvas>';
            container.html(htm);
            _this.mCanvas = document.getElementById(pusher._playerID);
            _this.context = _this.mCanvas.getContext("2d");
            $(_this.mCanvas).bind('contextmenu', function () {
                return false;
            }); //禁止右键
            //统计
            var self = _this;
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
            return _this;
        }
        CanvasPlayer.prototype.Statistics = function (show) {
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
        };
        CanvasPlayer.prototype.CalcClientSize = function () {
            this.mClientWidth = this.mCanvas.clientWidth;
            this.mClientHeight = this.mCanvas.clientHeight;
        };
        CanvasPlayer.prototype.Render = function (data, view) {
            var self = this;
            var imgw = view.getUint16(4, true);
            var imgh = view.getUint16(6, true);
            var pX = view.getUint16(8, true);
            var pY = view.getUint16(10, true);
            var minw = view.getUint16(12, true);
            var minh = view.getUint16(14, true);
            var nblob = data.slice(16);
            var image = new Image();
            image.onload = function () {
                if (self.mPusher.mWndSize.wndW != imgw || self.mPusher.mWndSize.wndH != imgh) {
                    self.mPusher.mWndSize.wndW = imgw;
                    self.mPusher.mWndSize.wndH = imgh;
                    self.mPusher.onProgress(DStrType.OnWndSize, '渲染窗口大小改变！', { imgw: imgw, imgh: imgh });
                    //self.SetWndSize();
                }
                //计算位置
                var canW = self.mCanvas.width;
                var canH = self.mCanvas.height;
                pX = pX / imgw * canW;
                pY = pY / imgh * canH;
                //计算大小
                minw = minw / imgw * canW;
                minh = minh / imgh * canH;
                //console.log(pX + "  " + pY + "  " + minw + "  " + minh);
                self.context.clearRect(pX, pY, minw, minh);
                self.context.drawImage(image, pX, pY, minw, minh);
                window.URL.revokeObjectURL(image.src);
                //统计
                self.framePackets += data.size * 1;
                self.frameIndex++;
            };
            image.src = window.URL.createObjectURL(nblob);
        };
        CanvasPlayer.prototype.OnStrMessage = function (json) {
        };
        CanvasPlayer.prototype.OnOpended = function () {
            this.CalcClientSize();
            var self = this;
            //注冊事件，键盘事件，mCanvas上必须要有tabindex
            this.mCanvas.addEventListener('keydown', function (e) {
                self.onkeyInfo("down", e.key, e.keyCode);
            }, true);
            this.mCanvas.addEventListener('keyup', function (e) {
                self.onkeyInfo("up", e.key, e.keyCode);
            }, true);
            this.mCanvas.addEventListener('keypress', function (e) {
                //self.onkeyInfo("press", e.key, e.keyCode);
            }, true);
            this.mCanvas.onclick = function (e) {
                self.mouse_action(DBinType.MS_CLICK, e);
            };
            this.mCanvas.ondblclick = function (e) {
                self.mouse_action(DBinType.MS_DB, e);
            };
            this.mCanvas.onmousedown = function (e) {
                self.mouse_action(DBinType.MS_DOWN, e);
            };
            this.mCanvas.onmouseup = function (e) {
                self.mouse_action(DBinType.MS_UP, e);
            };
            this.mCanvas.onmousemove = function (e) {
                self.mouse_action(DBinType.MS_MOVE, e);
            };
            this.mCanvas.onmousewheel = function (e) {
                self.mouse_action(DBinType.MS_WHEEL, e);
            };
        };
        CanvasPlayer.prototype.onkeyInfo = function (action, ekey, ecode) {
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
        };
        CanvasPlayer.prototype.mouse_action = function (action, e) {
            if (!this.mPusher.IsController())
                return;
            if (this.mPusher.isClosed)
                return;
            var bytearr = new ArrayBuffer(16); //4 + 2 + 2 + 4 + 4
            var dv = new DataView(bytearr);
            //标记 80569723
            dv.setUint32(0, 80569723, true);
            //鼠标动作
            dv.setUint16(4, action, true);
            //哪个键
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
                key = e.button == 0 ? "Left" : e.button == 1 ? "Mid" : "Right"; //鼠标左中右键
                e.button == 0 ? dv.setUint16(6, 1, true) : e.button == 1 ? dv.setUint16(6, 2, true) : dv.setUint16(6, 3, true);
            }
            //位置
            var x = e.offsetX / this.mClientWidth;
            var y = e.offsetY / this.mClientHeight;
            dv.setFloat32(8, x, true);
            dv.setFloat32(12, y, true);
            this.mPusher._wst.send(bytearr);
            var ptr = { action: action, key: key, x: x, y: y };
            this.mPusher.evMouse.forEach(function (fun, key) {
                fun(ptr);
            });
            if (x > 1.0001 || y > 1.0001) {
                console.warn('更改canvas大小后请重新计算CalcClientSize' + x + ', ' + y);
            }
        };
        ;
        return CanvasPlayer;
    }(GKPlayer));
    var RTCPlayer = /** @class */ (function (_super) {
        __extends(RTCPlayer, _super);
        function RTCPlayer(pusher) {
            var _this = _super.call(this, pusher) || this;
            _this.pcClient = null;
            _this.mVideo = null;
            _this.remoteAnswer = null;
            _this.remoteIce = [];
            _this.localIce = [];
            _this.prevFramesReceived = 0;
            _this.dataChannel = null;
            _this.testmsgcount = 0;
            _this.feedbackmsg = "";
            _this.feedbackmsgrecv = "";
            _this.feedbackmsgsend = "";
            _this.statisticsDiv = null;
            _this.isPlaying = false;
            _this.servers = {
                //iceTransportPolicy: 'relay', // force turn
                iceServers: [
                    { url: 'turn:192.168.0.100:3478', username: 'test', credential: 'test' }
                ]
            };
            _this.offerOptions = {
                offerToReceiveAudio: 0,
                offerToReceiveVideo: 1,
                voiceActivityDetection: false,
                iceRestart: true
            };
            _this.dataChannelOptions = {
                ordered: false,
                maxRetransmits: 1,
                negotiated: false // If set to true, it removes the automatic setting up of a data channel on the other peer,
            };
            _this.isRTC = true;
            var container = $('#' + _this.mPusher._containerID);
            if (container.length < 1)
                console.error("请传入正确的div容器id");
            var htm = '<div id="' + _this.mPusher._playerID + '"><h3>集景云端连接中...<h3></div>';
            container.html(htm);
            return _this;
        }
        RTCPlayer.prototype.OnStrMessage = function (json) {
            if (!this.pcClient)
                return;
            var remotestream = this.pcClient;
            var self = this;
            var command = json.command;
            switch (command) {
                case "OnRTC_SuccessAnswer":
                    {
                        if (remotestream) {
                            //console.log("OnSuccessAnswer[remote]: " + json.sdp);
                            self.remoteAnswer = json.sdp;
                            remotestream.setRemoteDescription(new RTCSessionDescription({ type: "answer", sdp: self.remoteAnswer }), function () {
                            }, function (errorInformation) {
                                console.error('setRemoteDescription error: ' + errorInformation);
                                self.mPusher._wst.close();
                            });
                        }
                    }
                    break;
                case "OnRTC_IceCandidate":
                    {
                        if (remotestream) {
                            //console.log("OnIceCandidate[remote]: " + json.sdp);
                            var c = new RTCIceCandidate({
                                sdpMLineIndex: json.sdp_mline_index,
                                candidate: json.sdp
                            });
                            //remoteIce.push(c);
                            remotestream.addIceCandidate(c);
                        }
                    }
                    break;
            }
        };
        RTCPlayer.prototype.OnOpended = function () {
            this.startStream();
            this.CalcClientSize();
        };
        RTCPlayer.prototype.OnClosed = function () {
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
            //this.remoteIce = [];
            //this.localIce = [];
        };
        RTCPlayer.prototype.CalcClientSize = function () {
            if (!this.mVideo)
                return;
            //this.mClientWidth = this.mVideo.videoWidth;
            //this.mClientHeight = this.mVideo.videoHeight;
            this.mClientWidth = this.mVideo.clientWidth;
            this.mClientHeight = this.mVideo.clientHeight;
        };
        RTCPlayer.prototype.Render = function (data, view) {
        };
        RTCPlayer.prototype.Statistics = function (show) {
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
        };
        RTCPlayer.prototype.createVDiv = function () {
            var container = $('#' + this.mPusher._containerID);
            if (container.length < 1)
                console.error("请传入正确的div容器id");
            //muted静音才能自动播放
            var htm = '<video id="' + this.mPusher._playerID + '" playsInline=true muted oncontextmenu="return false;"></video>';
            container.html(htm);
            var self = this;
            this.mVideo = document.getElementById(this.mPusher._playerID);
            if (this.mPusher.IsShowSS)
                this.Statistics(this.mPusher.IsShowSS);
            //事件
            //注冊事件，键盘事件，mCanvas上必须要有tabindex
            this.mVideo.addEventListener('keydown', function (e) {
                self.onkeyInfo("down", e.key, e.keyCode);
            }, true);
            this.mVideo.addEventListener('keyup', function (e) {
                self.onkeyInfo("up", e.key, e.keyCode);
            }, true);
            this.mVideo.addEventListener('keypress', function (e) {
                self.onkeyInfo("press", e.key, e.keyCode);
            }, true);
            this.mVideo.onclick = function (e) {
                self.mouse_action(DBinType.MS_CLICK, e);
            };
            this.mVideo.ondblclick = function (e) {
                self.mouse_action(DBinType.MS_DB, e);
            };
            this.mVideo.onmousedown = function (e) {
                self.mouse_action(DBinType.MS_DOWN, e);
            };
            this.mVideo.onmouseup = function (e) {
                self.mouse_action(DBinType.MS_UP, e);
            };
            this.mVideo.onmousemove = function (e) {
                self.mouse_action(DBinType.MS_MOVE, e);
            };
            this.mVideo.onmousewheel = function (e) {
                self.mouse_action(DBinType.MS_WHEEL, e);
            };
        };
        RTCPlayer.prototype.send = function (data) {
            try {
                this.mPusher._wst.send(data);
            }
            catch (ex) {
                console.log("Message sending failed!");
            }
        };
        RTCPlayer.prototype.startStream = function () {
            console.log("startStream...");
            this.pcClient = new RTCPeerConnection(this.servers);
            var remotestream = this.pcClient;
            // optional data channel
            this.dataChannel = remotestream.createDataChannel("msgDataChannel", this.dataChannelOptions);
            this.setDataChannel(this.dataChannel);
            var self = this;
            remotestream.onaddstream = function (e) {
                try {
                    console.log("remote media connection success!");
                    self.createVDiv();
                    self.mVideo.srcObject = e.stream;
                    self.mVideo.onloadedmetadata = function (e) {
                        self.isPlaying = true;
                        self.mVideo.play();
                        self.CalcClientSize();
                        self.mPusher.onProgress(DStrType.OnWndSize, '渲染窗口大小改变！', {
                            imgw: self.mClientWidth,
                            imgh: self.mClientHeight
                        });
                    };
                    // send some test feedback
                    var tmsg = setInterval(function () {
                        if (!self.pcClient) {
                            clearInterval(tmsg);
                        }
                        else if (self.dataChannel && self.dataChannel.readyState == "open") {
                            //self.dataChannel.send("TEST_" + self.testmsgcount++ + ", feedback: " + self.feedbackmsg);
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
                    if (ice && ice.component_id == 1 // skip RTCP 
                        //&& ice.type == 'relay'           // force turn
                        && ice.localIP.indexOf(":") < 0) { // skip IP6
                        //console.log('onicecandidate[local]: ' + event.candidate.candidate);
                        var obj = JSON.stringify({
                            "ptype": "onrtc_icecandidate",
                            "candidate": event.candidate
                        });
                        self.send(obj);
                        //localIce.push(ice);
                    }
                    else {
                        console.log('onicecandidate[local skip]: ' + event.candidate.candidate);
                    }
                }
                else {
                    console.log('onicecandidate: complete.');
                    if (self.remoteAnswer) {
                        // fill empty pairs using last remote ice
                        //for (var i = 0, lenl = localIce.length; i < lenl; i++) {
                        //    if (i >= remoteIce.length) {
                        //        var c = remoteIce[remoteIce.length - 1];
                        //        var ice = parseIce(c.candidate);
                        //        ice.foundation += i;
                        //        c.candidate = stringifyIce(ice);
                        //        remotestream.addIceCandidate(c);
                        //    }
                        //}
                    }
                }
            };
            // can't manage to get trigger from other side ;/ wtf?
            remotestream.ondatachannel = function (event) {
                self.dataChannel = event.channel;
                self.setDataChannel(self.dataChannel);
            };
            remotestream.createOffer(function (desc) {
                //console.log('createOffer: ' + desc.sdp);
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
        };
        RTCPlayer.prototype.setDataChannel = function (dc) {
            //console.log("setDataChannel[" + dc.id + "]: " + dc.label);
            var self = this;
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
        };
        RTCPlayer.prototype.formatStat = function (o) {
            var self = this;
            var s = "";
            if (o != undefined) {
                //s += o.type + ": " + new Date(o.timestamp).toISOString() + "<br>";
                //if (o.ssrc) s += "SSRC: " + o.ssrc + " ";
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
        };
        RTCPlayer.prototype.formatAllStat = function (os) {
            var _this = this;
            var s = "";
            os.forEach(function (e) {
                s += _this.formatStat(e);
            });
            return s;
        };
        RTCPlayer.prototype.dumpStat = function (o, b) {
            var s = "";
            s += this.formatAllStat(o);
            if (b.length > 0) {
                s += "<br> <br>";
                s += this.formatAllStat(b);
            }
            this.feedbackmsg = this.feedbackmsgrecv + this.feedbackmsgsend;
            return s;
        };
        RTCPlayer.prototype.parseCandidate = function (line) {
            var parts;
            // Parse both variants.
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
                // skip parts[6] == 'typ'
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
                        candidate.ufrag = parts[i + 1]; // for backward compability.
                        candidate.usernameFragment = parts[i + 1];
                        break;
                    default: // extension handling, in particular ufrag
                        candidate[parts[i]] = parts[i + 1];
                        break;
                }
            }
            return candidate;
        };
        ;
        RTCPlayer.prototype.parseIce = function (candidateString) {
            var ppp = this.parseCandidate(candidateString);
            ppp.component_id = ppp.component;
            ppp.localIP = ppp.address;
            return ppp;
        };
        RTCPlayer.prototype.stringifyIce = function (iceCandObj) {
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
        };
        RTCPlayer.prototype.onkeyInfo = function (action, ekey, ecode) {
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
        };
        RTCPlayer.prototype.mouse_action = function (action, e) {
            if (!this.isPlaying)
                return;
            if (!this.mPusher.IsController())
                return;
            if (this.mPusher.isClosed)
                return;
            var bytearr = new ArrayBuffer(16); //4 + 2 + 2 + 4 + 4
            var dv = new DataView(bytearr);
            //标记 80569723
            dv.setUint32(0, 80569723, true);
            //鼠标动作
            dv.setUint16(4, action, true);
            //哪个键
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
                key = e.button == 0 ? "Left" : e.button == 1 ? "Mid" : "Right"; //鼠标左中右键
                e.button == 0 ? dv.setUint16(6, 1, true) : e.button == 1 ? dv.setUint16(6, 2, true) : dv.setUint16(6, 3, true);
            }
            //位置
            var x = e.offsetX / this.mClientWidth;
            var y = e.offsetY / this.mClientHeight;
            dv.setFloat32(8, x, true);
            dv.setFloat32(12, y, true);
            this.mPusher._wst.send(bytearr);
            var ptr = { action: action, key: key, x: x, y: y };
            this.mPusher.evMouse.forEach(function (fun, key) {
                fun(ptr);
            });
            if (x > 1.0001 || y > 1.0001) {
                console.error('更改video大小后请重新计算CalcClientSize');
            }
        };
        ;
        return RTCPlayer;
    }(GKPlayer));
    var GKObject = /** @class */ (function () {
        function GKObject(objectID, gpsr) {
            this.ClassType = EmObjectType.OT_UNKNOWN;
            this.ObjectID = null;
            this.GKP = null;
            this.ObjectID = GKP.TL.isDefined(objectID) && GKP.TL.isString(objectID) ? objectID : null;
            this.GKP = GKP.TL.isDefined(gpsr) && GKP.TL.isObject(gpsr) ? gpsr : GPSR;
        }
        GKObject.prototype._postbj = function (json) {
            var self = this;
            return new Promise(function (res, rej) {
                self.GKP.command1(json, function (e) {
                    if (e.succeed)
                        res(e.data);
                    else
                        rej(e.data);
                });
            });
        };
        GKObject.prototype.SetProperty = function (propertyName, value) {
            if (!this.GKP.IsCompleted(true))
                return null;
            if (!this.ObjectID) {
                console.error('no ObjectID');
                return null;
            }
            var json = { action: 's_o_property', objectID: this.ObjectID, propertyName: propertyName, value: value };
            return this._postbj(json);
        };
        /**
         * 设置对象的可见性
         * @param objectID
         * @param show
         */
        GKObject.prototype.SetVisible = function (show) {
            if (!this.GKP.IsCompleted(true))
                return null;
            if (!this.ObjectID) {
                console.error('no ObjectID');
                return null;
            }
            //var json = { action: 's_r_visible', objectID: this.ObjectID, show: show };
            //return this._postbj(json);
            return this.SetProperty('Visible', show);
        };
        /**
         * 设置对象颜色，颜色格式：rgb(255,255,0)、#00ff00
         * @param objectID
         * @param color
         */
        GKObject.prototype.SetColor = function (color) {
            if (!this.GKP.IsCompleted(true))
                return null;
            if (!this.ObjectID) {
                console.error('no ObjectID');
                return null;
            }
            var c = GKP.TL.colorHex(color);
            return this.SetProperty('Color', c);
        };
        /**
         * 设置对象透明度
         * @param opacity
         */
        GKObject.prototype.SetOpacity = function (opacity) {
            return this.SetProperty('Opacity', opacity);
        };
        return GKObject;
    }());
    GKP.GKObject = GKObject;
    /**集景推流核心类 */
    var GKPusher = /** @class */ (function () {
        //构造函数
        function GKPusher() {
            /**版本*/
            this._playerID = "";
            this._containerID = "";
            this._wsUrl = "";
            this._userName = "";
            this._tokenUrl = "";
            this._wst = null;
            this._player = null;
            this.IsShowSS = false;
            /**导览*/
            this.Navigate = null;
            /**分析*/
            this.Analysis = null;
            /**渲染*/
            this.Render = null;
            /**管理*/
            this.Manager = null;
            /**创建器*/
            this.Creator = null;
            this.current_id = ""; //当前用户id
            this.contrl_id = ""; //操作者id
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
        /**
         * 初始化
         * @param gkConfig
         * @param callback 执行后的回调函数，结果为true或false
         */
        GKPusher.prototype.Initialize = function (gkConfig, callback) {
            var reg = /^[0-9a-zA-Z_|-]+$/;
            if (!reg.test(gkConfig.userName)) {
                console.error('必须指定用户名，只能为数字、字母、下划线或中划线的组合');
                return;
            }
            var self = this;
            this._userName = gkConfig.userName;
            this._wsUrl = gkConfig.chatUrl;
            this._containerID = gkConfig.containerID;
            this._tokenUrl = gkConfig.tokenUrl ? (gkConfig.tokenUrl.length > 5 ? gkConfig.tokenUrl : null) : null;
            this.isController = false;
            this.isCompleted = false;
            this.mInitBack = callback;
            var wndW = GKP.TL.isNumber(gkConfig.wndWidth) ? gkConfig.wndWidth : 0;
            var wndH = GKP.TL.isNumber(gkConfig.wndHeight) ? gkConfig.wndHeight : 0;
            //以下窗口信息
            function init() {
                self.init_socket(callback, wndW, wndH);
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
                window.addEventListener("resize", function () {
                    setTimeout(function () {
                        self.CalcClientSize();
                    }, 200);
                }, false);
            }
        };
        GKPusher.prototype.init_socket = function (callback, wndW, wndH) {
            var self = this;
            window.WebSocket = window.WebSocket || window.MozWebSocket;
            var wsu = self._wsUrl.replace('http://', 'ws:\\').replace('https://', 'wss:\\');
            wsu = wsu.substr(0, wsu.indexOf('/') == -1 ? wsu.length : wsu.indexOf('/')) + "/Chat";
            wsu = wsu.replace(':\\', '://') + "?user=" + self._userName + "&wndw=" + wndW + "&wndh=" + wndH + "&token=" + self.getToken("tk_register");
            self._wst = new WebSocket(wsu);
            self._wst.onopen = function (e) {
                self.isOpened = true;
                self.isClosed = false;
                if (!self.isResizing)
                    self.onProgress(DStrType.OPENING, '服务开启中！', null);
                setTimeout(function () {
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
                                if (GKP.VERSERV < GKP.VERSION)
                                    console.warn("集景服务推流版本比JS推流版本小，有些JS接口可能无法正常使用！");
                                console.log(rtc ? " create webrtc" : "create canvas");
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
                //websocket.close ();
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
        };
        /**
         * 关闭
         * @param closeApp 是否关闭云端应用程序，当为true和控制者的时候有效
         */
        GKPusher.prototype.Close = function (closeApp) {
            this.isResizing = false;
            if (closeApp === true && this.IsController()) {
                var json = { 'ptype': 'app_close' };
                this._wst.send(JSON.stringify(json));
            }
            else
                this._wst.close();
        };
        /**
         * 显示统计信息
         * @param show
         */
        GKPusher.prototype.Statistics = function (show) {
            if (this._player)
                this._player.Statistics(show);
        };
        /**
         * 添加一个事件回调
         * @param type 类型
         * @param key 事件key，同一个类型的key不可重复（会覆盖）
         * @param fun
         */
        GKPusher.prototype.AddEventHandle = function (type, key, fun) {
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
                default:
                    return false;
            }
        };
        /**
         * 销毁一个事件回调
         * @param type 类型
         * @param key 事件key，同一个类型的key不可重复（会覆盖）
         */
        GKPusher.prototype.RemoveEventHandle = function (type, key) {
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
                default:
                    return false;
            }
        };
        /**
         * 获取服务中心的令牌
         * @param key
         */
        GKPusher.prototype.getToken = function (key) {
            if (!this._tokenUrl)
                return "";
            $.ajaxSettings.async = false;
            var data = null;
            var url = "/tools/submit_geoking_ajax.ashx?action=user_token&key=" + key;
            $.get(url, function (result) {
                data = result;
            });
            $.ajaxSettings.async = true;
            if (!data)
                return "";
            if (typeof (data) == 'string')
                data = eval('(' + data + ')');
            if (data.status != 1) {
                console.warn(data.token);
                return "";
            }
            return data.token;
        };
        /**
         * 通过WS发送信息，必须在Completed之后才有效，该方法只能异步
         * @param argc
         */
        GKPusher.prototype.SendExtendByWS = function (argc, callback) {
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
        };
        /**
         * 通过WS发送信息，必须在Completed之后才有效，该方法返回Promise
         * @param argc
         */
        GKPusher.prototype.SendExtendByAsync = function (argc) {
            var self = this;
            return new Promise(function (resolove, reject) {
                if (!self.IsCompleted(true))
                    return reject("Completed前无法执行");
                var needRet = GKP.TL.isDefined(argc.needRet) ? argc.needRet : false;
                if (!needRet) {
                    return reject("必须指定返回");
                }
                self.SendExtendByWS(argc, function (e) {
                    resolove(e);
                });
                setTimeout(function () {
                    reject("超时");
                }, 2000);
            });
        };
        /**
         * 同步获取信息，通过Http发送信息，必须在Completed之后才有效
         * @param argc
         */
        GKPusher.prototype.SendExtendBySync = function (argc) {
            if (!this.IsCompleted(true))
                return null;
            var sign = GKP.TL.isDefined(argc.sign) ? argc.sign : (this.mExtendIndex++).toString();
            var needRet = GKP.TL.isDefined(argc.needRet) ? argc.needRet : false;
            var data = GKP.TL.isDefined(argc.data) ? (typeof (argc.data) == 'string' ? argc.data : JSON.stringify(argc.data)) : "";
            var ret = null;
            var json = {
                'ptype': 'extend',
                'sign': sign,
                'needRet': needRet,
                'data': data,
                'uid': this.current_id,
                'uname': this._userName
            };
            $.ajax({
                type: 'post',
                url: "http://" + this._wsUrl + "/api/gk/app_extend",
                async: false,
                data: JSON.stringify(json),
                success: function (res) {
                    ret = res;
                },
                error: function (err, c, p) {
                    console.error(err);
                    ret = null;
                }
            });
            return ret;
        };
        /**
         * 是否是控制者
         */
        GKPusher.prototype.IsController = function () {
            return this.isController;
        };
        /**
         * 是否工程加载完毕
         */
        GKPusher.prototype.IsCompleted = function (print) {
            if (print && !this.isCompleted) {
                console.error('尚未加载完毕！');
            }
            return this.isCompleted;
        };
        /**
         * 是否具备所有权了，加载完成和控制者同时满足
         */
        GKPusher.prototype.IsOwner = function (print) {
            if (print && (!this.isCompleted || !this.isController)) {
                console.error('尚未加载完毕或不是操作者！');
            }
            return this.isCompleted && this.isController;
        };
        /**
         * 获取设置
         */
        GKPusher.prototype.GetSetting = function () {
            var from_app = "http://" + this._wsUrl + "/api/gk/app_setting";
            $.ajaxSettings.async = false;
            var data = null;
            $.get(from_app, function (result) {
                data = result;
            });
            $.ajaxSettings.async = true;
            return data;
        };
        /**
         * 获取窗体大小
         */
        GKPusher.prototype.GetWndSize = function () {
            return this.mWndSize;
        };
        /**
         * 设置三维窗体大小
         * @param w
         * @param h
         */
        GKPusher.prototype.SetWndSize = function (w, h) {
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
        };
        /**
         * 设置输出质量，可减少宽带
         * @param quality
         */
        GKPusher.prototype.SetWndQuality = function (quality) {
            if (!this.IsController()) {
                return;
            }
            var json = { 'ptype': 'setwquality', 'data': quality };
            this._wst.send(JSON.stringify(json));
        };
        /**释放控制权限 */
        GKPusher.prototype.FreeCtrl = function () {
            this.contrl_id = "";
            this.isController = false;
            var json = { 'ptype': 'free_ctrl' };
            this._wst.send(JSON.stringify(json));
        };
        /**请求控制权限 */
        GKPusher.prototype.RequestCtrl = function () {
            var json = { 'ptype': 'ask_ctrl' };
            this._wst.send(JSON.stringify(json));
        };
        /**重新计算canvas大小，当canvas大小变更后要调用 */
        GKPusher.prototype.CalcClientSize = function () {
            if (this._player)
                this._player.CalcClientSize();
        };
        /**获取当前用户ID */
        GKPusher.prototype.GetCurrentID = function () {
            return this.current_id;
        };
        /**使用ws，要求传入回调 */
        GKPusher.prototype.command1 = function (command, callback, sg) {
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
        };
        /**使用ws，要求返回Promise */
        GKPusher.prototype.command2 = function (command) {
            var self = this;
            return new Promise(function (resolove, reject) {
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
        };
        /**使用http，可同步，也可回调 */
        GKPusher.prototype.command3 = function (command, synchro, succeedBack, errorBack) {
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
                success: function (res) {
                    ret = res;
                    if (succeedBack)
                        succeedBack(res);
                },
                error: function (err, c, p) {
                    if (errorBack)
                        errorBack(err);
                }
            });
            if (synchro)
                return ret;
            return null;
        };
        GKPusher.prototype.onProgress = function (type, desc, obj) {
            //var progressEvent = new CustomEvent('gkevent_progress', { detail: { type: type, desc: desc, obj: obj } });
            //if (window.dispatchEvent) window.dispatchEvent(progressEvent);
            //else (<any>window).fireEvent(progressEvent);
            this.evProgress.forEach(function (fun, key) {
                fun({ type: type, desc: desc, obj: obj });
            });
        };
        GKPusher.prototype.onMessageBlob = function (data) {
            //图片和事件
            var self = this;
            var reader = new FileReader();
            reader.onload = function (e) {
                var abuf = e.target.result;
                var view = new DataView(abuf);
                var tp = view.getInt32(0, true);
                switch (tp) {
                    case DBinType.PIC:
                        {
                            self._player.Render(data, view);
                        }
                        break;
                    case DBinType.CAM_POS:
                        {
                            var camtp = view.getInt32(4, true);
                            var px = view.getFloat32(8, true);
                            var py = view.getFloat32(12, true);
                            var pz = view.getFloat32(16, true);
                            var yaw = view.getFloat32(20, true);
                            var pitch = view.getFloat32(24, true);
                            var roll = view.getFloat32(28, true);
                            if (camtp == 1) {
                                var camChangeObj = { x: px, y: py, z: pz, yaw: yaw, pitch: pitch, roll: roll };
                                self.Navigate._currentPos = camChangeObj;
                                //var camChangeEvent = new CustomEvent('gkevent_camera_change', { detail: camChangeObj });
                                //if (window.dispatchEvent) window.dispatchEvent(camChangeEvent);
                                //else (<any>window).fireEvent(camChangeEvent);
                                self.evCanChange.forEach(function (fun, key) {
                                    fun(camChangeObj);
                                });
                            }
                        }
                        break;
                }
            };
            reader.readAsArrayBuffer(data.slice(0, 32));
        };
        GKPusher.prototype.onMessageJSON = function (json) {
            var self = this;
            switch (json.cType) {
                case DStrType.OPENED:
                    {
                        //已使用
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
                        //var progressEvent = new CustomEvent('gkevent_notice', { detail: { desc: '通知！', obj: json } });
                        //if (window.dispatchEvent) window.dispatchEvent(progressEvent);
                        //else (<any>window).fireEvent(progressEvent);
                        self.evNotice.forEach(function (fun, key) {
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
        };
        return GKPusher;
    }());
    GKP.GKPusher = GKPusher;
    /**导览 */
    var GKNavigate = /** @class */ (function () {
        function GKNavigate(gkp) {
            this.GKP = null;
            this.GKP = gkp;
        }
        GKNavigate.prototype._postng = function (json) {
            var self = this;
            return new Promise(function (res, rej) {
                self.GKP.command1(json, function (e) {
                    if (e.succeed)
                        res(e.data);
                    else
                        rej(e.data);
                });
            });
        };
        /**
         * 设置相机位置
         * @param x
         * @param y
         * @param z
         * @param yaw
         * @param pitch
         * @param roll
         */
        GKNavigate.prototype.SetCameraPos = function (x, y, z, yaw, pitch, roll) {
            if (!this.GKP.IsCompleted(true) || !this.GKP.IsController())
                return;
            var bytearr = new ArrayBuffer(4 + 4 * 8);
            var dv = new DataView(bytearr);
            //标记 80569723
            dv.setUint32(0, 80569723, true);
            //信息
            dv.setUint16(4, DBinType.CAM_POS, true);
            dv.setUint16(8, 0, true);
            dv.setFloat32(12, x, true);
            dv.setFloat32(16, y, true);
            dv.setFloat32(20, z, true);
            dv.setFloat32(24, yaw, true);
            dv.setFloat32(28, pitch, true);
            dv.setFloat32(32, roll, true);
            this.GKP._wst.send(bytearr);
        };
        GKNavigate.prototype.SetCameraPos2 = function (pos) {
            this.SetCameraPos(pos.x, pos.y, pos.z, pos.yaw, pos.pitch, pos.roll);
        };
        GKNavigate.prototype.GetCameraPos = function () {
            return this._currentPos;
        };
        /**
         * 获取属性,sync为真时使用http同步，为false返回Promise
         * @param sync
         */
        GKNavigate.prototype.GetAttrByAsync = function () {
            //if (!this.GKP.IsCompleted(true) || !this.GKP.IsController()) return;
            var json = { action: 'g_camattr' };
            if (!this.GKP.IsCompleted(true))
                return new Promise(function (res, rej) {
                    rej("not completed");
                });
            return this.GKP.command2(json);
        };
        GKNavigate.prototype.GetAttrBySync = function () {
            //if (!this.GKP.IsCompleted(true) || !this.GKP.IsController()) return;
            var json = { action: 'g_camattr' };
            if (!this.GKP.IsCompleted(true))
                return null;
            return this.GKP.command3(json, true);
        };
        Object.defineProperty(GKNavigate.prototype, "FieldOfView", {
            get: function () {
                console.error("不可获取属性");
                return 0;
            },
            /**视域范围，单位角度*/
            set: function (value) {
                if (!this.GKP.IsOwner(true))
                    return;
                var json = { action: 's_camfov', value: value };
                this.GKP.command1(json);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GKNavigate.prototype, "OrthographicZoom", {
            get: function () {
                console.error("不可获取属性");
                return 0;
            },
            /**获取或设置相机的正投影因子(指相机平截体的宽度，高度由窗口比例计算得出)，注：只有相机投影类型为正交投影时才能获取或设置*/
            set: function (value) {
                if (!this.GKP.IsOwner(true))
                    return;
                var json = { action: 's_camzoom', value: value };
                this.GKP.command1(json);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GKNavigate.prototype, "AspectRatio", {
            get: function () {
                console.error("不可获取属性");
                return 0;
            },
            /**相机的宽高比（宽/高）(透视投影时有效)*/
            set: function (value) {
                if (!this.GKP.IsOwner(true))
                    return;
                var json = { action: 's_camasp', value: value };
                this.GKP.command1(json);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GKNavigate.prototype, "ViewportMode", {
            get: function () {
                console.error("不可获取属性");
                return 0;
            },
            /**获取或设置视图模式*/
            set: function (value) {
                if (!this.GKP.IsOwner(true))
                    return;
                var json = { action: 's_camvm', value: value };
                this.GKP.command1(json);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GKNavigate.prototype, "ProjectionMode", {
            get: function () {
                console.error("不可获取属性");
                return 0;
            },
            /**获取或设置相机的投影模式*/
            set: function (value) {
                if (!this.GKP.IsOwner(true))
                    return;
                var json = { action: 's_campm', value: value };
                this.GKP.command1(json);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GKNavigate.prototype, "ManipulatorMode", {
            get: function () {
                console.error("不可获取属性");
                return 0;
            },
            /**操作器模式*/
            set: function (value) {
                if (!this.GKP.IsOwner(true))
                    return;
                var json = { action: 's_cammm', value: value };
                this.GKP.command1(json);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 飞往某个点
         * @param pos
         * @param range
         * @param durationSecond
         * @param toback true则返回Promise，false返回null
         */
        GKNavigate.prototype.FlyToPos = function (pos, range, durationSecond, toback) {
            if (range === void 0) { range = 100; }
            if (durationSecond === void 0) { durationSecond = 2; }
            if (toback === void 0) { toback = false; }
            if (!this.GKP.IsOwner(true))
                return null;
            var self = this;
            var json = { action: 's_camfly1', pos: pos, range: range, duration: durationSecond };
            this.GKP.command1(json);
            if (toback)
                return new Promise(function (res, rej) {
                    setTimeout(function () {
                        res(true);
                    }, durationSecond * 1000 + 100);
                });
            return null;
        };
        /**
         * 飞往到对象
         * @param pid
         * @param durationSecond
         * @param toback
         */
        GKNavigate.prototype.FlyToObject = function (pid, durationSecond, toback) {
            if (durationSecond === void 0) { durationSecond = 2; }
            if (toback === void 0) { toback = false; }
            if (!this.GKP.IsOwner(true))
                return;
            var self = this;
            var json = { action: 's_camfly2', pid: pid, duration: durationSecond, toback: toback };
            if (toback)
                return new Promise(function (res, rej) {
                    self.GKP.command1(json, function (e) {
                        if (!e.succeed) {
                            console.error(e.data);
                            res(false);
                        }
                        else
                            res(true);
                    });
                    setTimeout(function () {
                        rej(false);
                    }, durationSecond * 1000 + 100);
                });
            else
                this.GKP.command1(json);
            return null;
        };
        /**停止飞行，包括停止跟随模式 */
        GKNavigate.prototype.Stop = function () {
            if (!this.GKP.IsOwner(true))
                return;
            var json = { action: 's_camstop' };
            this.GKP.command1(json);
        };
        /**
         * 设置相机的远近裁剪面
         * @param bAuto 是否自动设置
         * @param nearClip 最近剪切
         * @param farClip 比率
         */
        GKNavigate.prototype.SetClipRange = function (bAuto, nearClip, farClip) {
            if (!this.GKP.IsOwner(true))
                return;
            var json = { action: 's_camcr', bAuto: bAuto, nearClip: nearClip, farClip: farClip };
            this.GKP.command1(json);
            //_postng
        };
        /**获取相机的远近裁剪面 */
        GKNavigate.prototype.GetClipRange = function () {
            var self = this;
            var json = { action: 'g_camcr' };
            return this._postng(json);
        };
        return GKNavigate;
    }());
    GKP.GKNavigate = GKNavigate;
    /**分析 */
    var GKAnalysis = /** @class */ (function () {
        function GKAnalysis(gkp) {
            this.GKP = null;
            this._anaType = GKAnaType.None;
            this._vAnalyse = EmVisualAnalyse.VA_MODE_NONE;
            this._viewshedParams = {};
            this._sectionParams = {};
            this._skylineParams = {};
            this.GKP = gkp;
        }
        GKAnalysis.prototype._postay = function (json) {
            var self = this;
            return new Promise(function (res, rej) {
                self.GKP.command1(json, function (e) {
                    if (e.succeed)
                        res(e.data);
                    else
                        rej(e.data);
                });
            });
        };
        /**量算 */
        GKAnalysis.prototype.GetMeasure = function () {
            return this._anaType;
        };
        /**
         * 量算
         * @param anaType
         */
        GKAnalysis.prototype.SetMeasure = function (anaType) {
            if (!this.GKP.IsController())
                return;
            this._anaType = anaType;
            var json = { 'ptype': 'measure', 'data': anaType };
            this.GKP._wst.send(JSON.stringify(json));
        };
        /**
         * 根据已设置好的参数进行可视化分析
         * @param analyseMode
         */
        GKAnalysis.prototype.StartAnalyse = function (analyseMode) {
            if (!this.GKP.IsOwner(true))
                return null;
            var json = { action: 's_vs_start', analyseMode: analyseMode };
            if (analyseMode == EmVisualAnalyse.VA_MODE_SKYLINE) {
                json.needRet = true;
                return this._postay(json);
            }
            this.GKP.command1(json);
            return null;
        };
        /** */
        GKAnalysis.prototype.GetAnalysisMode = function () {
            return this._vAnalyse;
        };
        GKAnalysis.prototype.StopAnalyse = function () {
            if (!this.GKP.IsOwner(true))
                return;
            var json = { action: 's_vs_stop' };
            this.GKP.command1(json);
        };
        /**
         * 设置视域分析参数
         * @param eye 观察点
         * @param target 目标点
         * @param missNear 最近忽略距离，该距离内不进行检测，范围[1,100]
         * @param verAngle 上下张角，范围[10,90)
         * @param horAngle 左右张角，范围[10,360]
         * @param density 分析密度，范围[0,900],0表示自动设置计算密度
         */
        GKAnalysis.prototype.SetViewshedParams = function (eye, target, missNear, verAngle, horAngle, density) {
            if (missNear === void 0) { missNear = 2; }
            if (verAngle === void 0) { verAngle = 30; }
            if (horAngle === void 0) { horAngle = 45; }
            if (density === void 0) { density = 0; }
            if (!this.GKP.IsOwner(true))
                return;
            this._viewshedParams = {
                action: 's_vs_viewshed',
                eye: eye,
                target: target,
                missNear: missNear,
                verAngle: verAngle,
                horAngle: horAngle,
                density: density
            };
            return this._postay(this._viewshedParams);
        };
        /** 获取视域分析参数 获取的是上一次设置的*/
        GKAnalysis.prototype.GetViewshedParams = function () {
            return this._viewshedParams;
        };
        /**
         * 断面分析参数，三个点形成一个平面，在三个点的矩形包围盒内进行剖面，如果vertical为真则在第一点和第二点的垂直面进行剖面
         * @param point1 第一点
         * @param point2 第二点
         * @param point3 第三点，当vertical为真时可直接设置该点为null
         * @param vertical 是否垂直剖面，为真则在第一点和第二点的垂直面进行剖面，此时point3被直接忽略
         * @param expand 对矩形包围盒向外或向内扩展多少米，从而改变检测范围
         */
        GKAnalysis.prototype.SetSectionParams = function (point1, point2, point3, vertical, expand) {
            if (point3 === void 0) { point3 = null; }
            if (vertical === void 0) { vertical = true; }
            if (expand === void 0) { expand = 0; }
            if (!this.GKP.IsOwner(true))
                return null;
            this._sectionParams = {
                action: 's_vs_secp',
                point1: point1,
                point2: point2,
                point3: point3,
                vertical: vertical,
                expand: expand
            };
            return this._postay(this._sectionParams);
        };
        /** 断面分析参数，上一次设置的*/
        GKAnalysis.prototype.GetSectionParams = function () {
            return this._sectionParams;
        };
        /**获取断面分析结果，由一系列线组成。注：在执行过程中获取结果时返回null */
        GKAnalysis.prototype.GetSectionResult = function () {
            if (!this.GKP.IsOwner(true))
                return null;
            var json = { action: 's_vs_secret' };
            return this._postay(json);
        };
        /**
         * 设置天际线分析参数，该方法是以当前相机视点为观察点，进行水平观察，只分析视口中的对象，自动计算startAngle和sweepAngle
         * @param radiusNear 观察点最近距离，在最近距离内不进行检测，默认5，必须大于1
         * @param radiusFar 观察点最近距离，在最近距离内不进行检测，默认100000，必须大于radiusNear+100
         */
        GKAnalysis.prototype.SetSkylineParamsByCurrentEye = function (radiusNear, radiusFar) {
            if (radiusNear === void 0) { radiusNear = 5; }
            if (radiusFar === void 0) { radiusFar = 100000; }
            if (!this.GKP.IsOwner(true))
                return null;
            this._skylineParams = { t: 1, action: 's_vs_skyline', radiusNear: radiusNear, radiusFar: radiusFar };
            return this._postay(this._skylineParams);
        };
        /**
         * 设置天际线分析参数，此方法可对观察点进行360°分析
         * @param eye 观察点
         * @param radiusNear 观察点最近距离，在最近距离内不进行检测，默认5，范围[1,100]
         * @param radiusFar 观察点最远距离，默认3000，范围[100,10000]
         * @param startAngle 起始方位角，以正Y轴为起点，顺时针方向为正，默认0，范围[-360,360]
         * @param sweepAngle 扫描角度，以正Y轴为起点，顺时针方向为正，默认360，范围[-360,-10]、[10,360]
         * @param resolution 分辨率，离观察点1000米的地方可检测的大小，默认2米，范围[1,10]
         */
        GKAnalysis.prototype.SetSkylineParamsByCustomEye = function (eye, radiusNear, radiusFar, startAngle, sweepAngle, resolution) {
            if (radiusNear === void 0) { radiusNear = 5; }
            if (radiusFar === void 0) { radiusFar = 3000; }
            if (startAngle === void 0) { startAngle = 0; }
            if (sweepAngle === void 0) { sweepAngle = 360; }
            if (resolution === void 0) { resolution = 2; }
            if (!this.GKP.IsOwner(true))
                return null;
            this._skylineParams = {
                t: 2,
                action: 's_vs_skyline',
                eye: eye,
                radiusNear: radiusNear,
                radiusFar: radiusFar,
                startAngle: startAngle,
                sweepAngle: sweepAngle,
                resolution: resolution
            };
            return this._postay(this._skylineParams);
        };
        /**获取天际线参数，上一次设置的 */
        GKAnalysis.prototype.GetSkylineParams = function () {
            return this._skylineParams;
        };
        /**
         * 获取分析结果，结果按起始方位角到终点角度排序（起始方位角+扫描角度），在分析完毕后才会获取到结果，分析过程中结果为null
         * @param angleOfElevation 是否获取仰角，true时返回Vc3d中的z是仰角，false时返回Vc3d中的z是高度
         */
        GKAnalysis.prototype.GetSkylineResult = function (angleOfElevation) {
            if (!this.GKP.IsOwner(true))
                return;
            var json = { action: 's_vs_skylin_1', angleOfElevation: angleOfElevation };
            return this._postay(json);
        };
        /**
         * 获取天际线分析结果图表
         * @param chart 图表类型：0折线图(仰角)，1折线图(模拟在窗口上的投影)，2极线图
         * @param imgWidth 需要输出的图片宽度，范围[16,8192]
         * @param imgHeight 需要输出的图片高度，范围[16,8192]
         */
        GKAnalysis.prototype.GetSkylineImageResult = function (chart, imgWidth, imgHeight) {
            if (!this.GKP.IsOwner(true))
                return null;
            var json = { action: 's_vs_skylin_2', chart: chart, imgWidth: imgWidth, imgHeight: imgHeight };
            return this._postay(json);
        };
        return GKAnalysis;
    }());
    GKP.GKAnalysis = GKAnalysis;
    /**渲染 */
    var GKRender = /** @class */ (function () {
        function GKRender(gkp) {
            this.GKP = null;
            this._stereoMode = EmStereoMode.NONE;
            this.GKP = gkp;
        }
        GKRender.prototype._postrd = function (json) {
            var self = this;
            return new Promise(function (res, rej) {
                self.GKP.command1(json, function (e) {
                    if (e.succeed)
                        res(e.data);
                    else
                        rej(e.data);
                });
            });
        };
        /**
         * 添加一条屏幕日志数据，logLevel级别1为白色表示正常调试，2为黄色表示警告，3为红色表示错误
         * @param info
         * @param logLevel
         */
        GKRender.prototype.AddLogInfo = function (info, logLevel) {
            if (logLevel === void 0) { logLevel = 1; }
            if (!this.GKP.IsOwner(true))
                return;
            var json = { action: 's_r_log', info: info, logLevel: logLevel };
            this.GKP.command1(json);
        };
        Object.defineProperty(GKRender.prototype, "StereoMode", {
            get: function () {
                return this._stereoMode;
            },
            /// <summary>
            /// 立体模式
            /// </summary>
            set: function (value) {
                if (!this.GKP.IsOwner(true))
                    return;
                var json = { action: 's_r_stereo', value: value };
                this.GKP.command1(json);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 根据屏幕坐标获取对象
         * @param x canvas的x坐标，小于1则为比例，鼠标事件中的数值
         * @param y canvas的y坐标，小于1则为比例，鼠标事件中的数值
         * @param pFilter
         */
        GKRender.prototype.GetObjectFromScreen = function (x, y, pFilter) {
            if (pFilter === void 0) { pFilter = EmFilter.GK_FILTER_FIRST; }
            if (!this.GKP.IsOwner(true))
                return;
            var json = { action: 's_r_ofs', x: x, y: y, pFilter: pFilter };
            return this._postrd(json);
        };
        /**
         * 返回三维窗口中指定像素位置的真实世界坐标
         * @param pixelX
         * @param pixelY
         * @param pFilter
         */
        GKRender.prototype.ScreenToWorld = function (pixelX, pixelY, pFilter) {
            if (pFilter === void 0) { pFilter = EmFilter.GK_FILTER_FIRST; }
            if (!this.GKP.IsOwner(true))
                return;
            var json = { action: 's_r_stw', pixelX: pixelX, pixelY: pixelY, pFilter: pFilter };
            return this._postrd(json);
        };
        /**
         * 返回特定地形坐标点在三维窗口中是否可见，如果可见，返回指定像素的屏幕坐标
         * @param worldPos
         */
        GKRender.prototype.ScreenFromWorld = function (worldPos) {
            if (!this.GKP.IsOwner(true))
                return;
            var json = { action: 's_r_sfw', worldPos: worldPos };
            return this._postrd(json);
        };
        /**
         * 设置一个3D提示，3D场景会呈现边框
         * @param tipSign
         */
        GKRender.prototype.Start3DTip = function (tipSign) {
            if (!this.GKP.IsOwner(true))
                return;
            var json = { action: 's_r_tip1', tipSign: tipSign };
            this.GKP.command1(json);
        };
        /**
         * 停止一个3D提示  必须和Set3DTipStarting中的tipSign配对使用
         * @param tipSign
         */
        GKRender.prototype.Stop3DTip = function (tipSign) {
            if (!this.GKP.IsOwner(true))
                return;
            var json = { action: 's_r_tip2', tipSign: tipSign };
            this.GKP.command1(json);
        };
        return GKRender;
    }());
    GKP.GKRender = GKRender;
    /**管理 */
    var GKManager = /** @class */ (function () {
        function GKManager(gkp) {
            this.GKP = null;
            this.GKP = gkp;
        }
        GKManager.prototype._postmg = function (json) {
            var self = this;
            return new Promise(function (res, rej) {
                self.GKP.command1(json, function (e) {
                    if (e.succeed)
                        res(e.data);
                    else
                        rej(e.data);
                });
            });
        };
        /**获取信息树json */
        GKManager.prototype.Getdynatree = function () {
            if (!this.GKP.IsCompleted(true))
                return null;
            var json = { action: 'g_m_tree1' };
            return this._postmg(json);
        };
        /**所有影像层，等价于 GetByType(EmFindType.FT_IMAGE_LAYER); */
        GKManager.prototype.GetImageLayers = function () {
            if (!this.GKP.IsCompleted(true))
                return null;
            var json = { action: 'g_m_imgs' };
            return this._postmg(json);
        };
        /**所有高程层，等价于 GetByType(EmFindType.FT_ELEVATION_LAYER); */
        GKManager.prototype.GetElevationLayers = function () {
            if (!this.GKP.IsCompleted(true))
                return null;
            var json = { action: 'g_m_eles' };
            return this._postmg(json);
        };
        /**所有矢量层，等价于 GetByType(EmFindType.FT_FEATURE_LAYER); */
        GKManager.prototype.GetFeatureLayers = function () {
            if (!this.GKP.IsCompleted(true))
                return null;
            var json = { action: 'g_m_feas' };
            return this._postmg(json);
        };
        /**所有模型层，等价于 GetByType(EmFindType.FT_3DMODEL_LAYER); */
        GKManager.prototype.GetModelLayers = function () {
            if (!this.GKP.IsCompleted(true))
                return null;
            var json = { action: 'g_m_mds' };
            return this._postmg(json);
        };
        /**所有倾斜实景模型层，等价于 GetByType(EmFindType.FT_MESH_LAYER); */
        GKManager.prototype.GetMeshLayers = function () {
            if (!this.GKP.IsCompleted(true))
                return null;
            var json = { action: 'g_m_mes' };
            return this._postmg(json);
        };
        /**所有点云模型层，等价于 GetByType(EmFindType.FT_PC_LAYER); */
        GKManager.prototype.GetPointCloudLayers = function () {
            if (!this.GKP.IsCompleted(true))
                return null;
            var json = { action: 'g_m_pcs' };
            return this._postmg(json);
        };
        /**所有地物模型层，等价于 GetByType(EmFindType.FT_TERRA_OBJECT_LAYER); */
        GKManager.prototype.GetTerraObjLayers = function () {
            if (!this.GKP.IsCompleted(true))
                return null;
            var json = { action: 'g_m_tos' };
            return this._postmg(json);
        };
        /**
         * 通过名称查找
         * @param name 要查找对象的名称
         * @param findType 查找的类型，OT_UNKNOWN则在信息树上查找，指定类型会加快查询速度
         * @param groupID 指定在哪个组下面查找，如果为空或null则在根节点下查找，指定特定组会加快查询速度
         */
        GKManager.prototype.GetByName = function (name, findType, groupID) {
            if (findType === void 0) { findType = EmObjectType.OT_UNKNOWN; }
            if (groupID === void 0) { groupID = ""; }
            if (!this.GKP.IsCompleted(true))
                return null;
            var json = { action: 'g_m_bynm', name: name, findType: findType, groupID: groupID };
            return this._postmg(json);
        };
        /**
         * 判断数据集的图层类型，一般返回OT_XXX_LAYER的形式
         * @param url gkf绝对路径或网络服务路径
         */
        GKManager.prototype.GetDatabaseType = function (url) {
            if (!this.GKP.IsCompleted(true))
                return null;
            var json = { action: 'g_m_dbt', url: url };
            return this._postmg(json);
        };
        /**
         * 根据url获取图层
         * @param url
         */
        GKManager.prototype.GetLayerByURL = function (url) {
            if (!this.GKP.IsCompleted(true))
                return null;
            var json = { action: 'g_m_lbyurl', url: url };
            return this._postmg(json);
        };
        /**
         * 根据ID获取对象
         * @param objectID
         */
        GKManager.prototype.GetByID = function (objectID) {
            if (!this.GKP.IsCompleted(true))
                return null;
            var self = this;
            var json = { action: 'g_m_byid', objectID: objectID };
            return this._postmg(json).then(function (e) {
                var ret = new GKObject(e.ObjectID, self.GKP);
                return Object.assign(ret, e);
            });
        };
        /**获取信息树根节点，只有在打开集景工程之后才有 */
        GKManager.prototype.InfoTreeRoot = function () {
            if (!this.GKP.IsCompleted(true))
                return null;
            var json = { action: 'g_m_root' };
            return this._postmg(json);
        };
        /**
         * 创建组
         * @param groupName
         * @param parentGroupId
         */
        GKManager.prototype.CreateGroup = function (groupName, parentGroupId) {
            if (parentGroupId === void 0) { parentGroupId = ""; }
            if (!this.GKP.IsCompleted(true))
                return null;
            var json = { action: 'g_m_cg', groupName: groupName, parentGroupId: parentGroupId };
            return this._postmg(json);
        };
        /**
         * 是否是组
         * @param groupId
         */
        GKManager.prototype.IsGroup = function (groupId) {
            if (!this.GKP.IsCompleted(true))
                return null;
            var json = { action: 'g_m_isg', groupId: groupId };
            return this._postmg(json);
        };
        /**
         * 将一个条目移动到一个新组，为保证唯一性，该方法会从其他Group、或ITerraObjsLayer中去掉，但某些对象不可，比如：EntityGroup等
         * @param layerOrGroupID 仅图层和组可以指定新的父节点
         * @param newParentGroupID
         */
        GKManager.prototype.SetParent = function (layerOrGroupID, newParentGroupID) {
            if (!this.GKP.IsCompleted(true))
                return null;
            var json = { action: 'g_m_setp', layerOrGroupID: layerOrGroupID, newParentGroupID: newParentGroupID };
            return this._postmg(json);
        };
        /**
         * 迭代项
         * @param objectID
         * @param code
         */
        GKManager.prototype.GetNextObject = function (objectID, code) {
            if (!this.GKP.IsCompleted(true))
                return null;
            var json = { action: 'g_m_nxo', objectID: objectID, code: code };
            return this._postmg(json);
        };
        /**
         * 根据ID删除对象,不能删除模型实体和模型实体组
         * @param gkObjectID
         */
        GKManager.prototype.DeleteObject = function (gkObjectID) {
            if (!this.GKP.IsOwner(true))
                return null;
            var json = { action: 'g_m_delo', gkObjectID: gkObjectID };
            return this._postmg(json);
        };
        /**
         * 按路径查找，指定第二个参数具体类型可以加快查找速度（非OT_UNKNOWN或OT_GROUP）
         * @param pathName 路径查找，比如：/xxx/bbb或 \xxx/bbb
         * @param pathFirstType 路径的第一个对象是什么类型，加快查找速度，比如“/江北区/建筑”这个路径，如果江北区这个对象是三维图层，则为OT_MODEL_LAYER。
         * 可选参数为OT_UNKNOWN（或OT_GROUP）从根节点开始查找，此时必须是绝对路径。还可对路径第一个对象指定明确类型：OT_IMAGE_LAYER，OT_ELEVATION_LAYER，OT_FEATURE_LAYER，OT_MODEL_LAYER，OT_MESH_LAYER，OT_TERRAOBJECT_LAYER，OT_POINTCLOUD_LAYER
         * @param findAll 是否查找全部，false时只返回一个，相当于调用 GetByPath
         */
        GKManager.prototype.GetByPath = function (pathName, pathFirstType, findAll) {
            if (!this.GKP.IsCompleted(true))
                return null;
            var json = { action: 'g_m_bypath', pathName: pathName, pathFirstType: pathFirstType, findAll: findAll };
            return this._postmg(json);
        };
        return GKManager;
    }());
    GKP.GKManager = GKManager;
    /**管理 */
    var GKCreator = /** @class */ (function () {
        function GKCreator(gkp) {
            this.GKP = null;
            this.GKP = gkp;
        }
        GKCreator.prototype._postct = function (json) {
            var self = this;
            return new Promise(function (res, rej) {
                self.GKP.command1(json, function (e) {
                    if (e.succeed)
                        res(e.data);
                    else
                        rej(e.data);
                });
            });
        };
        /**
         * 创建动画
         * @param pName
         * @param points
         * @param groupID 所要放置的IGroup组，为空在根节点下
         */
        GKCreator.prototype.CreatePathRoute = function (pName, points, groupID) {
            if (points === void 0) { points = null; }
            if (groupID === void 0) { groupID = ""; }
            if (!this.GKP.IsOwner(true))
                return null;
            var json = { action: 'c_c_pr', pName: pName, points: points, groupID: groupID };
            return this._postct(json);
        };
        /**
         * 创建GKDB数据的图层，也可以是GKDB网络服务，目前仅支持GKF。创建完毕后可根据类型移动到在固定的组中去，固定组的ID在GKVar中
         * @param url
         * @param pName
         * @param isVisible
         * @param isTerrain
         * @param groupID 所要放置的IGroup组，为空在根节点下
         */
        GKCreator.prototype.CreateGKDBLayer = function (url, pName, isVisible, isTerrain, groupID) {
            if (pName === void 0) { pName = ""; }
            if (isVisible === void 0) { isVisible = true; }
            if (isTerrain === void 0) { isTerrain = false; }
            if (groupID === void 0) { groupID = ""; }
            if (!this.GKP.IsOwner(true))
                return null;
            var json = {
                action: 'c_c_clayer',
                pName: pName,
                url: url,
                isVisible: isVisible,
                isTerrain: isTerrain,
                groupID: groupID
            };
            return this._postct(json);
        };
        /**
         * 创建TerraObject图层组
         * @param pName
         * @param groupID 所要放置的IGroup组，为空在根节点下
         */
        GKCreator.prototype.CreateTerraObjsLayer = function (pName, groupID) {
            if (groupID === void 0) { groupID = ""; }
            if (!this.GKP.IsOwner(true))
                return null;
            var json = { action: 'c_c_colayer', pName: pName, groupID: groupID };
            return this._postct(json);
        };
        /**
         * 创建视点
         * @param name
         * @param pos
         * @param yaw
         * @param pitch
         * @param range
         * @param groupID 所要放置的IGroup组，为空在根节点下
         */
        GKCreator.prototype.CreateViewPoint = function (name, pos, yaw, pitch, range, groupID) {
            if (yaw === void 0) { yaw = 0; }
            if (pitch === void 0) { pitch = -45; }
            if (range === void 0) { range = 0; }
            if (groupID === void 0) { groupID = ""; }
            if (!this.GKP.IsOwner(true))
                return null;
            var json = { action: 'c_c_vp', name: name, pos: pos, yaw: yaw, pitch: pitch, range: range, groupID: groupID };
            return this._postct(json);
        };
        /**
         * 创建地形贴图纹理
         * @param name
         * @param imageUrl
         * @param centerX
         * @param centerY
         * @param width
         * @param heith
         * @param rotation
         * @param terraObjsLayerID 放置的图层，若未指定则放置在一个默认的图层中
         */
        GKCreator.prototype.CreateTerraImageOverlay = function (name, imageUrl, centerX, centerY, width, heith, rotation, terraObjsLayerID) {
            if (terraObjsLayerID === void 0) { terraObjsLayerID = ""; }
            if (!this.GKP.IsOwner(true))
                return null;
            var json = {
                action: 'c_c_imgov',
                name: name,
                imageUrl: imageUrl,
                centerX: centerX,
                centerY: centerY,
                width: width,
                heith: heith,
                rotation: rotation,
                terraObjsLayerID: terraObjsLayerID
            };
            return this._postct(json);
        };
        /**
         * 创建标签
         * @param name
         * @param pos
         * @param fontSize
         * @param terraObjsLayerID 放置的图层，若未指定则放置在一个默认的图层中
         */
        GKCreator.prototype.CreateTerraTextLabel = function (name, pos, fontSize, terraObjsLayerID) {
            if (fontSize === void 0) { fontSize = 32; }
            if (terraObjsLayerID === void 0) { terraObjsLayerID = ""; }
            if (!this.GKP.IsOwner(true))
                return null;
            var json = {
                action: 'c_c_txtlb',
                name: name,
                pos: pos,
                fontSize: fontSize,
                terraObjsLayerID: terraObjsLayerID
            };
            return this._postct(json);
        };
        /**
         * 创建包括图标（不是必须）、文字、鼠标事件以及气泡的标签
         * @param name
         * @param pos
         * @param imageUrl
         * @param terraObjsLayerID 放置的图层，若未指定则放置在一个默认的图层中
         */
        GKCreator.prototype.CreateTerraLabel = function (name, pos, imageUrl, terraObjsLayerID) {
            if (imageUrl === void 0) { imageUrl = ""; }
            if (terraObjsLayerID === void 0) { terraObjsLayerID = ""; }
            if (!this.GKP.IsOwner(true))
                return null;
            var json = { action: 'c_c_lb', name: name, pos: pos, imageUrl: imageUrl, terraObjsLayerID: terraObjsLayerID };
            return this._postct(json);
        };
        /**
         * 创建矩形
         * @param name
         * @param pos
         * @param width
         * @param height
         * @param terraObjsLayerID
         * @param fillColor
         * @param lineColor
         */
        GKCreator.prototype.CreateTerraRectangle = function (name, pos, width, height, terraObjsLayerID, fillColor, lineColor) {
            if (terraObjsLayerID === void 0) { terraObjsLayerID = ""; }
            if (fillColor === void 0) { fillColor = 0xFF646464; }
            if (lineColor === void 0) { lineColor = 0xFF00FF00; }
            if (!this.GKP.IsOwner(true))
                return null;
            var json = {
                action: 'c_c_rect',
                name: name,
                pos: pos,
                width: width,
                height: height,
                terraObjsLayerID: terraObjsLayerID,
                fillColor: fillColor,
                lineColor: lineColor
            };
            return this._postct(json);
        };
        /**
         * 创建一个圆
         * @param name
         * @param pos
         * @param pRadius
         * @param terraObjsLayerID
         * @param fillColor
         * @param lineColor
         */
        GKCreator.prototype.CreateTerraCircle = function (name, pos, pRadius, terraObjsLayerID, fillColor, lineColor) {
            if (terraObjsLayerID === void 0) { terraObjsLayerID = ""; }
            if (fillColor === void 0) { fillColor = 0xFF646464; }
            if (lineColor === void 0) { lineColor = 0xFF00FF00; }
            if (!this.GKP.IsOwner(true))
                return null;
            var json = {
                action: 'c_c_cc',
                name: name,
                pos: pos,
                pRadius: pRadius,
                terraObjsLayerID: terraObjsLayerID,
                fillColor: fillColor,
                lineColor: lineColor
            };
            return this._postct(json);
        };
        /**
         * 创建椭圆
         * @param name
         * @param pos
         * @param majorRadius
         * @param minnorRadius
         * @param terraObjsLayerID
         * @param fillColor
         * @param lineColor
         */
        GKCreator.prototype.CreateTerraEllipse = function (name, pos, majorRadius, minnorRadius, terraObjsLayerID, fillColor, lineColor) {
            if (terraObjsLayerID === void 0) { terraObjsLayerID = ""; }
            if (fillColor === void 0) { fillColor = 0xFF646464; }
            if (lineColor === void 0) { lineColor = 0xFF00FF00; }
            if (!this.GKP.IsOwner(true))
                return null;
            var json = {
                action: 'c_c_ep',
                name: name,
                pos: pos,
                majorRadius: majorRadius,
                minnorRadius: minnorRadius,
                terraObjsLayerID: terraObjsLayerID,
                fillColor: fillColor,
                lineColor: lineColor
            };
            return this._postct(json);
        };
        /**
         * 创建线条
         * @param name
         * @param terraObjsLayerID
         * @param lineColor
         */
        GKCreator.prototype.CreateTerraPolyline = function (name, verticesArray, terraObjsLayerID, lineColor) {
            if (verticesArray === void 0) { verticesArray = null; }
            if (terraObjsLayerID === void 0) { terraObjsLayerID = ""; }
            if (lineColor === void 0) { lineColor = 0xFF00FF00; }
            if (!this.GKP.IsOwner(true))
                return null;
            var json = {
                action: 'c_c_pl',
                name: name,
                verticesArray: verticesArray,
                terraObjsLayerID: terraObjsLayerID,
                lineColor: lineColor
            };
            return this._postct(json);
        };
        /**
         * 创建面
         * @param name
         * @param verticesArray
         * @param terraObjsLayerID
         * @param fillColor
         * @param lineColor
         */
        GKCreator.prototype.CreateTerraPolygon = function (name, verticesArray, terraObjsLayerID, fillColor, lineColor) {
            if (verticesArray === void 0) { verticesArray = null; }
            if (terraObjsLayerID === void 0) { terraObjsLayerID = ""; }
            if (fillColor === void 0) { fillColor = 0xFF646464; }
            if (lineColor === void 0) { lineColor = 0xFF00FF00; }
            if (!this.GKP.IsOwner(true))
                return null;
            var json = {
                action: 'c_c_pg',
                name: name,
                verticesArray: verticesArray,
                terraObjsLayerID: terraObjsLayerID,
                fillColor: fillColor,
                lineColor: lineColor
            };
            return this._postct(json);
        };
        /**
         * 地形挖洞
         * @param name
         * @param verticesArray
         * @param terraObjsLayerID
         */
        GKCreator.prototype.CreateTerraHole = function (name, verticesArray, terraObjsLayerID) {
            if (verticesArray === void 0) { verticesArray = null; }
            if (terraObjsLayerID === void 0) { terraObjsLayerID = ""; }
            if (!this.GKP.IsOwner(true))
                return null;
            var json = { action: 'c_c_ho', name: name, verticesArray: verticesArray, terraObjsLayerID: terraObjsLayerID };
            return this._postct(json);
        };
        return GKCreator;
    }());
    GKP.GKCreator = GKCreator;
})(GKP || (GKP = {}));
var GPSR = new GKP.GKPusher();
var GPNavigate = GPSR.Navigate;
var GPAnalysis = GPSR.Analysis;
var GPRender = GPSR.Render;
var GPManager = GPSR.Manager;
var GPCreator = GPSR.Creator;
