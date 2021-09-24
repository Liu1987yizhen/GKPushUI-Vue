/**
*
  Cesium坐标转换工具
*/
const CVT = (function () {
    function _() {}
    _.cartesian2Pixel = function (cartesian, viewer) {
        return Cesium.SceneTransforms.wgs84ToWindowCoordinates(
            viewer.scene,
            cartesian
        );
    };
    _.pixel2Cartesian = function (pixel, viewer) {
        if (viewer.terrainProvider instanceof Cesium.EllipsoidTerrainProvider) {
            return _.pixel2Cartesian1(pixel, viewer);
        } else {
            return _.pixel2Cartesian2(pixel, viewer);
        }
    };
    /**
     * 二维坐标，没有添加地形数据时调用
     */
    _.pixel2Cartesian1 = function (pixel, viewer) {
        const cartesian = viewer.camera.pickEllipsoid(
            pixel,
            viewer.scene.globe.ellipsoid
        );
        return cartesian;
    };
    /**
     * 三维坐标，添加地形数据时调用
     */
    _.pixel2Cartesian2 = function (pixel, viewer) {
        if (!viewer.scene) return {};
        const ray = viewer.camera.getPickRay(pixel);
        const cartesian = viewer.scene.globe.pick(ray, viewer.scene);
        return cartesian;
    };
    _.cartesian2Radians = function (cartesian, viewer) {
        if (!viewer.scene) return {};
        const ellipsoid = viewer.scene.globe.ellipsoid || Cesium.Ellipsoid.WGS84;
        const cartographic = Cesium.Cartographic.fromCartesian(
            cartesian,
            ellipsoid
        );
        const lon = cartographic.longitude;
        const lat = cartographic.latitude;
        const height = cartographic.height;
        return {
            lon,
            lat,
            height
        };
    };
    _.cartesian2Degrees = function (cartesian, viewer) {
        const coords = _.cartesian2Radians(cartesian, viewer);
        const lon = Cesium.Math.toDegrees(coords.lon);
        const lat = Cesium.Math.toDegrees(coords.lat);
        const height = coords.height;
        return {
            lon,
            lat,
            height
        };
    };
    _.degrees2Cartesian = function (position) {
        const cartesian = Cesium.Cartesian3.fromDegrees(
            position.lon || position.longitude,
            position.lat || position.latitude,
            position.height
        );
        return cartesian;
    };
    _.radians2Cartesian = function (position) {
        return Cesium.Cartesian3.fromRadians(
            position.lon || position.longitude,
            position.lat || position.latitude,
            position.height
        );
    };
    _.pixel2Degrees = function (pixel, viewer) {
        const cartesian = _.pixel2Cartesian(pixel, viewer);
        if (Cesium.defined(cartesian)) {
            return _.cartesian2Degrees(cartesian, viewer);
        }
        return undefined;
    };
    _.pixel2Radians = function (pixel, viewer) {
        const cartesian = _.pixel2Cartesian(pixel, viewer);
        if (Cesium.defined(cartesian)) {
            return _.cartesian2Radians(cartesian, viewer);
        }
        return undefined;
    };
    _.toDegrees = function (position, viewer) {
        if (position instanceof Cesium.Cartesian3) {
            return _.cartesian2Degrees(position, viewer);
        } else if (position instanceof Cesium.Cartesian2) {
            return _.pixel2Degrees(position, viewer);
        }
    };
    _.toRadians = function (position, viewer) {
        if (position instanceof Cesium.Cartesian3) {
            return _.cartesian2Radians(position, viewer);
        } else if (position instanceof Cesium.Cartesian2) {
            return _.pixel2Radians(position, viewer);
        }
    };
    _.toPixel = function (position, viewer) {
        if (position instanceof Cesium.Cartesian) {
            return _.cartesian2Pixel(position, viewer);
        }
    };
    _.cartesian3ToDegrees = (cartesian3, viewer) => {
        const ellipsoid = viewer.scene.globe.ellipsoid || Cesium.Ellipsoid.WGS84;
        var cartographic = ellipsoid.cartesianToCartographic(cartesian3);
        var lng = Cesium.Math.toDegrees(cartographic.longitude);
        var lat = Cesium.Math.toDegrees(cartographic.latitude);
        var alt = cartographic.height;
        return [lng, lat, alt];
    };
    _.radians2Degree = (position) => {
        let degree = [];
        let lon = position.longitude * 180 / Math.PI;
        let lat = position.latitude * 180 / Math.PI;
        degree.push(lon);
        degree.push(lat);
        degree.push(position.height);
        return degree;
    };
    /**
     * @description: 计算两个点直线距离
     * @param {经纬度Object} start 单位是度，不是弧度
     * @param {经纬度Object} end 单位是度，不是弧度
     * @return {Number} 距离
     */
    _.distance = (start, end) => {
        //计算地表距离（直接底边长度）
        let surfaceDistance = _.surfaceDistance(start, end);
        //计算直角三角形斜边长度
        let hsd = Math.sqrt(Math.pow(surfaceDistance, 2) + Math.pow(end.height - start.height, 2));
        return hsd;
    };
    /**
     * @description: 计算两个点地表距离
     * @param {经纬度Object} start 单位是度，不是弧度
     * @param {经纬度Object} end 单位是度，不是弧度
     * @return {Number} 距离
     */
    _.surfaceDistance = (start, end) => {
        let geodesic = new Cesium.EllipsoidGeodesic();
        let _start = {},
            _end = {};
        _start = new Cesium.Cartographic.fromDegrees(start.longitude, start.latitude, start.height, _start);
        _end = new Cesium.Cartographic.fromDegrees(end.longitude, end.latitude, end.height, _end);
        geodesic.setEndPoints(_start, _end);
        //计算地表距离（直接底边长度）
        return geodesic.surfaceDistance;
    };
    _.line2CZML = (polyline, options = {}) => {
        const id = options.id || ("czml" + Date.now());
        //如果未传漫游时间，则每段飞行时长定为10秒
        if (!options.time) options.time = 10 * polyline.positions.length;
        const startTime = Cesium.JulianDate.now();
        const tempTime = options.time - (options.time % polyline.positions.length);
        const increment = tempTime / polyline.positions.length;
        const stopTime = Cesium.JulianDate.addSeconds(startTime, tempTime, new Cesium.JulianDate());
        let doc = {
            id: "document",
            name: options.name || "CZML Path",
            version: options.version || "1.0",
            clock: {
                interval: startTime.toString() + "/" + stopTime.toString(),
                currentTime: startTime.toString(), //开始时间
                stopTime: stopTime.toString(),
                clockRange: Cesium.ClockRange.CLAMPED,
                multiplier: 1
            }
        };
        let position = [];
        let pathInfo = {
            id: id + "_path",
            name: options.name || "CZML Path",
            description: options.description,
            availability: startTime.toString() + "/" + stopTime.toString(),
            path: {
                width: 0,
                //显示未飞行的路径，0代表不显示
                leadTime: 0,
                //已飞行的路径何时消失，0代表立即消失
                trailTime: tempTime
            },
            billboard: options.billboard || {
                image: ''
            },
            position: {
                epoch: startTime.toString(), //开始时间
                cartographicDegrees: []
            }
        };
        // let dist = [],
        //     pre = polyline.positions[0];
        for (let index = 0; index < polyline.positions.length; index++) {
            let _p = [];
            const element = polyline.positions[index];
            _p.push(index * increment);
            _p = _p.concat(_.cartesian3ToDegrees(element, polyline.viewer));
            if (options.fixHeight) {
                _p[3] = options.height || 2000; //固定摄像头高度
            }
            position = position.concat(_p);
            // const dis = Cesium.Cartesian3.distance(pre, element);
            // dist.push(dis);
        }
        //const min = Math.min.apply(null, dist);
        //const max = Math.max.apply(null, dist);
        pathInfo.position.cartographicDegrees = position;
        return [doc, pathInfo];
    };
    return _;
})();



/**
 * 获得当前视野范围
 * @param {Viewer} viewer
 */
function currentExtent(viewer) {
    // 范围对象
    const extent = {};

    // 得到当前三维场景
    const scene = viewer.scene;

    // 得到当前三维场景的椭球体
    const ellipsoid = scene.globe.ellipsoid;
    const canvas = scene.canvas;

    // canvas左上角
    const car3_lt = viewer.camera.pickEllipsoid(
        new Cesium.Cartesian2(0, 0),
        ellipsoid
    );

    // canvas右下角
    const car3_rb = viewer.camera.pickEllipsoid(
        new Cesium.Cartesian2(canvas.width, canvas.height),
        ellipsoid
    );

    // 当canvas左上角和右下角全部在椭球体上
    if (car3_lt && car3_rb) {
        const carto_lt = ellipsoid.cartesianToCartographic(car3_lt);
        const carto_rb = ellipsoid.cartesianToCartographic(car3_rb);
        extent.xmin = Cesium.Math.toDegrees(carto_lt.longitude);
        extent.ymax = Cesium.Math.toDegrees(carto_lt.latitude);
        extent.xmax = Cesium.Math.toDegrees(carto_rb.longitude);
        extent.ymin = Cesium.Math.toDegrees(carto_rb.latitude);
    }

    // 当canvas左上角不在但右下角在椭球体上
    else if (!car3_lt && car3_rb) {
        let car3_lt2 = null;
        let yIndex = 0;
        do {
            // 这里每次10像素递加，一是10像素相差不大，二是为了提高程序运行效率
            yIndex <= canvas.height ? (yIndex += 10) : canvas.height;
            car3_lt2 = viewer.camera.pickEllipsoid(
                new Cesium.Cartesian2(0, yIndex),
                ellipsoid
            );
        } while (!car3_lt2);
        const carto_lt2 = ellipsoid.cartesianToCartographic(car3_lt2);
        const carto_rb2 = ellipsoid.cartesianToCartographic(car3_rb);
        extent.xmin = Cesium.Math.toDegrees(carto_lt2.longitude);
        extent.ymax = Cesium.Math.toDegrees(carto_lt2.latitude);
        extent.xmax = Cesium.Math.toDegrees(carto_rb2.longitude);
        extent.ymin = Cesium.Math.toDegrees(carto_rb2.latitude);
    }

    // 获取高度
    extent.height = Math.ceil(viewer.camera.positionCartographic.height);
    return extent;
}


/**
 * 获得当前视野中心
 * @param {*} viewer
 */
const viewCenter = (
    viewer,
    inWorldCoordinates = true,
    result = new Cesium.Cartesian3()
) => {
    const scene = viewer.scene;
    const camera = viewer.camera;

    //修改为直接获取屏幕中心点对应的坐标
    result = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(viewer.canvas.clientWidth / 2, viewer.canvas.clientHeight / 2));
    let ellipsoid = viewer.scene.globe.ellipsoid || Cesium.Ellipsoid.WGS84;
    result = ellipsoid.cartesianToCartographic(result);
    return result;

    //以下代码与上述代码获取的坐标误差范围很小（精确匹配到小数点后4位，第4位之后出现误差），但以下代码经常报错或者获取不到坐标

    const unprojectedScratch = new Cesium.Cartographic();
    const rayScratch = new Cesium.Ray();

    if (scene.mode === Cesium.SceneMode.MORPHING) {
        return undefined;
    }

    // TODO bug when tracking: if entity moves the current position should be used and not only the one when starting orbiting/rotating
    // TODO bug when tracking: reset should reset to default view of tracked entity

    if (Cesium.defined(viewer.trackedEntity)) {
        result = viewer.trackedEntity.position.getValue(
            viewer.clock.currentTime,
            result
        );
    } else {
        rayScratch.origin = camera.positionWC;
        rayScratch.direction = camera.directionWC;
        result = scene.globe.pick(rayScratch, scene, result);
    }

    if (!Cesium.defined(result)) {
        return undefined;
    }
    if (
        scene.mode === Cesium.SceneMode.SCENE2D ||
        scene.mode === Cesium.SceneMode.COLUMBUS_VIEW
    ) {
        result = camera.worldToCameraCoordinatesPoint(result, result);

        if (inWorldCoordinates) {
            result = scene.globe.ellipsoid.cartographicToCartesian(
                scene.mapProjection.unproject(result, unprojectedScratch),
                result
            );
        }
    } else {
        if (!inWorldCoordinates) {
            result = camera.worldToCameraCoordinatesPoint(result, result);
        }
    }

    return result;
};


const errroCatch = function (e, callback) {
    if (e.response) {
        callback(e.response.data);
    } else if (e.request) {
        callback(e.request);
    } else {
        callback(e.message);
    }
};

/**
 * 字符串超长处理
 */
function setString(str, len) {
    var strlen = 0;
    var s = "";
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 128) {
            strlen += 2;
        } else {
            strlen++;
        }
        s += str.charAt(i);
        if (strlen >= len) {
            return s + "...";
        }
    }
    return s;
}

class CursorTip {
    constructor(text, id, viewer) {
        checkViewer(viewer);
        id = id || ("cursor-tip-" + Date.now());
        const tooltip = document.createElement("div");
        tooltip.id = id;
        tooltip.className = "cursor-tip-class";
        tooltip.innerHTML = text;
        // viewer._element.parentElement.appendChild(tooltip);
        viewer.container.appendChild(tooltip);
        // document.body.appendChild(tooltip);
        this.ele = tooltip;
        this.viewer = viewer;
        this._visible = true;
        //todo:启动鼠标移动事件
        // const self = this;
        // if (viewer instanceof Cesium.Viewer) {
        //     viewer.screenSpaceEventHandler.setInputAction(e => {
        //         self.updatePosition(e.endPosition);
        //     }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        // }
    }
    updatePosition(pixel) {
        let offset = (this.viewer instanceof Cesium.Viewer) && this.viewer.container.getBoundingClientRect();
        let off = {
            x: 0,
            y: 0
        };
        offset.x = Cesium.defaultValue(offset.x, 0);
        offset.y = Cesium.defaultValue(offset.y, 0);
        offset.width = Cesium.defaultValue(offset.width, 0);
        offset.height = Cesium.defaultValue(offset.height, 0);
        off.x = 10 + offset.x + pixel.x;
        off.y = 10 + offset.y + pixel.y;
        //左界限制
        off.x < offset.x && (off.x -= pixel.x - 10);
        //上界限制
        off.y < offset.y && (off.y -= pixel.y - 10);
        //右界限制
        off.x > (offset.x + offset.width) && (off.x += offset.width - pixel.x - 10);
        //下界限制
        off.y > (offset.y + offset.height) && (off.y += offset.height - pixel.y - 10);

        this.ele.style.left = off.x + "px";
        this.ele.style.top = off.y + "px";
    }
    updateText(text) {
        this.ele.innerHTML = text;
    }
    get visible() {
        return this._visible;
    }
    set visible(v) {
        this._visible = v;
        this.ele.style.display = v ? "block" : "none";
    }

    destroy() {
        this.ele.remove();
        this.viewer = null;
    }
}

function checkViewer(viewer) {
    if (viewer instanceof Cesium.Viewer === false) {
        throw new CesiumDrawError(viewer + "不是一个有效的Cesium Viewer对象")
    }
}

function checkComponent(component, object) {
    if (component && component._viewer instanceof Cesium.Viewer === false) {
        throw new CesiumDrawError('组件尚未初始化' + component._uid)
    } else if (!component && !Cesium.defined(object)) {
        throw new CesiumDrawError('组件尚未初始化')
    }
}
class CesiumDrawError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CesiumDrawError'
    }
}
//是否在可视区
function pointVisibilityOnEarth(point, viewer) {
    return new Cesium.EllipsoidalOccluder(Cesium.Ellipsoid.WGS84, viewer.camera.position)
        .isPointVisible(point);
}

export {
    errroCatch,
    currentExtent,
    viewCenter,
    pointVisibilityOnEarth,
    CVT,
    setString,
    CursorTip,
    checkComponent,
    checkViewer
};
export default {
    errroCatch,
    currentExtent,
    viewCenter,
    setString,
    CVT,
    CursorTip,
    pointVisibilityOnEarth
};