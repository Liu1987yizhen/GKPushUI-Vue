import MarkerManager from "../Cesium/core/MarkerManager";
import GraphicManager from "../Cesium/core/GraphicManager";
import {
    CVT,
    currentExtent,
    viewCenter
} from '../Cesium/core/utils'
import {
    CesiumLayerManager
} from "cesium-layer";

class Roaming {
    constructor(viewer) {
        this.viewer = viewer;
        this.entity = null;
        this.status = "ready";
    }
    /**
     * 开始按照czml定义的路径漫游
     * 漫游完成后自动结束并触发onStop事件,如需重新漫游则需要再次调用该方法
     * czml:Array<JSON>,[{document},{path info}]
     * options:JSON，{onStop,speed,showPath}定义漫游结束回调函数、漫游速度、是否显示漫游路径等
     */
    start(czml, options = {}) {
        let {
            viewer,
            entity
        } = this;
        this._options = options;
        this._options.onStop = options.onStop || ((c) => {});
        const speed = options.speed || 1;
        const showPath = options.showPath || false;
        if (entity) this.stop();
        let data = JSON.parse(JSON.stringify(czml));
        this.name = data[1].name;
        if (speed) data[0].clock.multiplier = speed;
        if (showPath) data[1].path.width = 8;
        let self = this;

        function stoped(clock) {
            try {
                viewer.clock.onStop.removeEventListener(stoped);
                self.stop(clock);
            } catch (error) {

            }
        }
        viewer.dataSources
            .add(Cesium.CzmlDataSource.load(data))
            .then((ds) => {
                entity = ds.entities.getById(data[1].id);
                entity.position.setInterpolationOptions({
                    interpolationDegree: 5,
                    interpolationAlgorithm: Cesium.LagrangePolynomialApproximation
                });
                viewer.trackedEntity = entity;
                viewer.clock.onStop.addEventListener(stoped);
                this.status = "run";
            });
        this.entity = entity;
        this.onKeyDown();
    }
    /**
     * 暂停或继续漫游
     */
    pause() {
        this.status = (this.status === "pause") ? "run" : "pause";
        this._run("pause");
    }
    /**
     * 反向漫游
     */
    reverse() {
        this._run("reverse");
    }
    /**
     * 结束漫游，如果不手动触发的话，漫游结束后自动调用该方法
     */
    stop() {
        let {
            viewer,
            name,
            entity
        } = this;
        console.log("Roaming stoped");
        if (this.status === "end") return;
        // this.pause();
        // Cesium.cancelAnimationFrame(requestID)

        for (var a = 0; a < viewer.dataSources.length; a++) {
            var ds = viewer.dataSources.get(a);
            console.log("name==" + ds.name);
            //str.includes("")返回一个布尔值，值为true时表示包含
            if (ds.name.includes(name)) {
                viewer.dataSources.remove(ds, true);
            }
        }
        entity && viewer.entities.removeById(entity.id);
        //解锁相机
        viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
        this.entity = null;
        this.name = "";
        this._options.onStop();
        this.status = "end";
        // viewer.clock.onStop.removeEventListener(this.stop);
    }
    _getCommand(type) {
        let viewModel = this.viewer.animation.viewModel;
        let command = {
            "forward": viewModel.playForwardViewModel.command,
            "pause": viewModel.pauseViewModel.command,
            "reverse": viewModel.playReverseViewModel.command
        }
        return command[type];
    }

    _run(type) {
        let command = this._getCommand(type);
        command.canExecute && command();
    }

    /**
     * 监听键盘事件，按 ESC 退出漫游
     */
    onKeyDown() {
        let self = this;

        function _keyup(e) {
            if (e.defaultPrevented) {
                return; // 如果已取消默认操作，则不应执行任何操作
            }
            if (e.key === "Escape") {
                self.stop();
                // 如果事件已处理，则禁止“双重操作”
                e.preventDefault();
            }
            document.removeEventListener("keyup", _keyup);
        }
        console.log("按ESC键退出漫游！");

        document.addEventListener('keyup', _keyup, true);
    }
}

class CesiumUtil {
    constructor(viewer) {
        this.viewer = viewer;
    }

    /**
     * 获取工具类实例
     * type:layer/marker/graphic/roam，默认layer
     */
    getManager(type = "layer") {
        switch (type) {
            case "marker":
                if (!this.markerUtil) this.markerUtil = new MarkerManager(this.viewer);
                return this.markerUtil;
            case "graphic":
                if (!this.graphicUtil) this.graphicUtil = new GraphicManager(this.viewer);
                return this.graphicUtil;
            case "roam":
                if (!this.roamUtil) this.roamUtil = new Roaming(this.viewer);
                return this.roamUtil;
            default:
                if (!this.layerUtil) this.layerUtil = new CesiumLayerManager(this.viewer);
                return this.layerUtil;
        }
    }

    /**
     * @description: 相机事件监听
     * @param {*} maxHeight 相机高度阈值，当相机高度高于该值，则不响应
     * @param {*} action 回调函数，接收一个参数
     * @return {Array} 返回经纬度、高度、相机高度
     */
    cameraListening(action) {
        const viewer = this.viewer;
        // let cameraMaxHeight = -1;
        let callback = action;
        // if (typeof maxHeight === "function") {
        //     callback = maxHeight;
        // } else if (typeof action === "function") {
        //     callback = action;
        // }
        // if (!isNaN(maxHeight)) {
        //     cameraMaxHeight = maxHeight;
        // }
        //相机移动完成事件监听,返回一个Remove方法，需要移除事件监听就执行一下该方法即可
        viewer.camera.RemoveMoveEndEvent = viewer.camera.moveEnd.addEventListener(() => {
            let pitch = Cesium.Math.toDegrees(viewer.camera.pitch);
            //当视角拉平后，无法获取屏幕中心坐标，不做响应
            if (pitch > -10)
                return;
            let height = this.getCameraHeight();
            // console.log("当前相机高度：" + height);
            //高度限制
            // if (cameraMaxHeight > 0 && cameraMaxHeight < height) {
            //     callback({
            //         show: false,
            //         cameraHeight: height
            //     });
            //     return;
            // }
            let degree = [];
            let position = viewCenter(viewer);
            degree = CVT.radians2Degree(position);
            callback({
                show: true,
                longitude: degree[0],
                latitude: degree[1],
                height: degree[2],
                cameraHeight: height
            });
        });
    }
    /**
     * @description: 移除相机事件监听
     * @param {*} eventType 事件类型，默认moveEnd
     * @return {*}
     */
    stopCameraListening() {
        (typeof this.viewer.camera.RemoveMoveEndEvent === "function") && this.viewer.camera.RemoveMoveEndEvent();
    }

    getCameraHeight() {
        var scene = this.viewer.scene;
        let ellipsoid = scene.globe.ellipsoid || Cesium.Ellipsoid.WGS84;
        let height = ellipsoid.cartesianToCartographic(this.viewer.camera.position).height;
        return height;
    }

    flyHome(duration) {
        this.viewer.camera.flyHome(duration);
    }

    flyTo(position) {
        let defaultView = {
            height: 100000,
            heading: 0.0,
            pitch: -90.0,
            roll: 0.0,
        };
        let view = JSON.parse(JSON.stringify(position));
        if (!view.position) {
            if (view.longitude) {
                view.position = {
                    longitude: view.longitude,
                    latitude: view.latitude,
                    height: view.height,
                };
            } else if (view.x) {
                view.position = {
                    longitude: view.x,
                    latitude: view.y,
                    height: view.z,
                };
            }
        }
        let v = {
            position: {}
        };
        view.position = Cesium.defaultValue(view.position, {});
        v.heading = Cesium.defaultValue(view.heading, defaultView.heading);
        v.pitch = Cesium.defaultValue(view.pitch, defaultView.pitch);
        v.roll = Cesium.defaultValue(view.roll, defaultView.roll);
        v.position.longitude = view.position.longitude;
        v.position.latitude = view.position.latitude;
        v.position.height = Cesium.defaultValue(view.position.height, defaultView.height);

        this.viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(
                v.position.longitude,
                v.position.latitude,
                v.position.height
            ),
            orientation: {
                heading: Cesium.Math.toRadians(v.heading),
                pitch: Cesium.Math.toRadians(v.pitch),
                roll: v.roll,
            },
        });
    }
}
export default CesiumUtil
