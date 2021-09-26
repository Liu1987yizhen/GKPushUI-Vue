<template>
  <div class="fullsize relative">
    <div :id="id" class="fullsize"></div>
    <!--<div :id="id + '_loadingOverlay'" class="loadingOverlay" v-if="loading">-->
      <!--<h1>Loading...</h1>-->
    <!--</div>-->
  </div>
</template>

<script>
import CesiumUtil from "../../components/Utils/dcq.cesium.util";
import { CVT } from "./core/utils";
export default {
  name: "CesiumViewer",
  props: {
    id: {
      type: String,
      default: "cesiumContainer",
      require: false,
    },
    defaultView: {
      type: Object,
      default: () => {
        return {
          position: {
            longitude: 106.6630539053369,
            latitude: 29.539823960596444,
            height: 10000000,
          },
          heading: 0.0,
          pitch: -90.0,
          roll: 0.0,
        };
      },
      require: false,
    },
  },
  data() {
    return { layerUtil: null, viewer: null, loading: true };
  },
  mounted() {
    this.loading = true;
    var cgs2000Ellipsolid = new Cesium.Ellipsoid(
      6378137.0,
      6378137.0,
      6356752.31414035585
    );
    var cgs2000GeographicProj = new Cesium.GeographicProjection(
      cgs2000Ellipsolid
    );
    let viewer = new Cesium.Viewer(this.id, {
      selectionIndicator: false,
      animation: true, //是否显示动画控件
      homeButton: false, //是否显示home键
      geocoder: false, //是否显示地名查找控件        如果设置为true，则无法查询
      baseLayerPicker: false, //是否显示图层选择控件
      timeline: false, //是否显示时间线控件
      fullscreenButton: false, //是否全屏显示
      scene3DOnly: true, //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
      shouldAnimate: true,
      infoBox: false, //是否显示点击要素之后显示的信息
      sceneModePicker: false, //是否显示投影方式控件  三维/二维
      navigationInstructionsInitiallyVisible: false,
      navigationHelpButton: false, //是否显示帮助信息控件
      selectionIndicator: false,
      orderIndependentTranslucency: false,
      mapProjection: cgs2000GeographicProj,
      imageryProvider: new Cesium.SingleTileImageryProvider({
        url: require("/public/Cesium/Assets/Textures/GlobalBkLayer1.jpg"),
      }),
      contextOptions: {
        webgl: {
          alpha: true,
          depth: true,
          stencil: true,
          antialias: true,
          premultipliedAlpha: true,
          //通过canvas.toDataURL()实现截图需要将该项设置为true
          preserveDrawingBuffer: true,
          failIfMajorPerformanceCaveat: true,
        },
      },
    });
    viewer.animation.container.style.display = "none"; //隐藏动画控件
    window.viewer = viewer;
    //清除cesium-widget-credits
    const credits = document.getElementsByClassName("cesium-widget-credits");
    credits[0].parentElement.removeChild(credits[0]);

    viewer.resolutionScale = 0.95;
    viewer._cesiumWidget._creditContainer.style.display = "none";

    const config = window._CONFIG.dev
      ? window._CONFIG.config_dev.cesium
      : window._CONFIG.config_online.cesium;

    if (Cesium.defined(config.minCameraHeight))
      viewer.scene.screenSpaceCameraController.minimumZoomDistance =
        config.minCameraHeight; //相机最小高度
    if (Cesium.defined(config.maxCameraHeight))
      viewer.scene.screenSpaceCameraController.maximumZoomDistance =
        config.maxCameraHeight; //相机最大高度
    if (config.maxCameraHeight || Cesium.defined(config.minCameraHeight)) {
      viewer.scene.screenSpaceCameraController._minimumZoomRate = 30000; //设置相机缩小速率
      viewer.scene.screenSpaceCameraController._maximumZoomRate = 5906376272000; //设置相机放大速率
      //重写了相机的setView方法，解决Cesium底层未判断高度范围限制的bug，其他跟相机高度有关的函数可能都需要如此修改
      if (typeof Cesium.Camera.prototype.__tsqSetView__ !== "function") {
        Cesium.Camera.prototype.__tsqSetView__ =
          Cesium.Camera.prototype.setView;
        Cesium.Camera.prototype.setView = function (data) {
          if (data.destination) {
            //笛卡尔转经纬度
            let degree = CVT.cartesian2Degrees(data.destination, viewer);
            if (
              (degree.height,
              viewer.scene.screenSpaceCameraController.minimumZoomDistance ==
                undefined)
            )
              degree.height,
                (viewer.scene.screenSpaceCameraController.minimumZoomDistance =
                  null);
            if (
              (degree.height,
              viewer.scene.screenSpaceCameraController.maximumZoomDistance ==
                undefined)
            )
              degree.height,
                (viewer.scene.screenSpaceCameraController.maximumZoomDistance =
                  null);
            degree.height = Math.min(
              Math.max(
                degree.height,
                viewer.scene.screenSpaceCameraController.minimumZoomDistance
              ),
              viewer.scene.screenSpaceCameraController.maximumZoomDistance
            );
            data.destination = Cesium.Cartesian3.fromDegrees(
              degree.lon,
              degree.lat,
              degree.height
            );
          }
          this.__tsqSetView__(data);
        };
      }
    }

    this.setView(this.defaultView);

    //取消双击Entity追踪功能
    viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
      Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
    );

    // this.layerUtil = new LayerUtil(viewer);
    //缓存到store中方便不同组件进行调用
    // this.$store.commit("setCesiumLayerUtil", this.layerUtil);

    this.cesiumUtil = new CesiumUtil(viewer);
    //缓存到store中方便不同组件进行调用
    this.$store.commit("setCesiumUtil", this.cesiumUtil);

    // 加载影像
    // let options = {
    //   url: "http://23.36.41.131:6080/arcgis/rest/services/CIM/bg_cq_zc_tile/MapServer",
    //   layer: "bg_cq_zc_tile",
    //   type: "arcgismap",
    // };
    // let options2 = {
    //   name: "A3tiles",
    //   alpha: 0.3,
    //   type: "3dtile",
    //   url: "http://139.159.160.62:12306/honeycomb/gkfcesium1/cesium_jycceishi_20210419/data/tileset.json",
    // };
    // let options3 = {
    //   name: "arcgis",
    //   alpha: 0.3,
    //   type: "arcgismap",
    //   url: "http://localhost:6080/arcgis/rest/services/SampleWorldCities/MapServer",
    // };
    // todo 临时，记得还原!!!
    // let layerObj= this.cesiumUtil.getManager().add(options2);
    // 修改透明度：layerObj.opacity=0.5;
    // 修改透明度方法2：layerObj.setOpacity(0.5);
    // this.cesiumUtil.getManager().add(options3);

    let currentBIM = null;
    //开启事件监听
    this.cesiumUtil.cameraListening((position) => {
      //格式(单位：度)：{longitude,latitude,height,cameraHeight}
      console.log(position);
      //相机高度阈值判断
      if (position.cameraHeight <= 300) {
        //todo:查询并显示BIM
        let sd = CVT.surfaceDistance(position, this.defaultView.position);
        let d = CVT.distance(position, this.defaultView.position);
        console.log("地表距离：" + sd + "，直线距离：" + d);
        //未查询到新的BIM，则移除当前BIM
        //currentBIM && typeof currentBIM.remove === "function" && currentBIM.remove();
      } else {
        //移除BIM
        currentBIM &&
          typeof currentBIM.remove === "function" &&
          currentBIM.remove();
      }
    });

    setTimeout(() => {
      // 移除事件监听
      this.cesiumUtil.stopCameraListening();
    }, 10 * 60 * 1000);

    viewer.loading = () => {
      this.loading = true;
    };
    var helper = new Cesium.EventHelper();
    helper.add(viewer.scene.globe.tileLoadProgressEvent, (e) => {
      e === 0 && (this.loading = false);
    });
    // this.$bus.$on("closeLoading", (type) => {
    //   this.loading = type;
    // });
  },
  beforeDestroy() {
    this.layerUtil && this.layerUtil.destroy();
    //销毁Cesium场景实例
    this.destroy();
  },
  methods: {
    setView(view) {
      let defaultView = {
        position: {
          longitude: 106.6630539053369,
          latitude: 29.539823960596444,
          height: 1000000,
        },
        heading: 0.0,
        pitch: -90.0,
        roll: 0.0,
      };
      let v = { position: {} };
      v.heading = view.heading ? view.heading : defaultView.heading;
      v.pitch = view.pitch ? view.pitch : defaultView.pitch;
      v.roll = view.roll ? view.roll : defaultView.roll;
      v.position.longitude = view.position.longitude
        ? view.position.longitude
        : defaultView.position.longitude;
      v.position.latitude = view.position.latitude
        ? view.position.latitude
        : defaultView.position.latitude;
      v.position.height = view.position.height
        ? view.position.height
        : defaultView.position.height;
      viewer.camera.setView({
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
    },
    /**
     * 回到默认视角
     * duration:Number  飞行时间
     */
    flyHome(duration) {
      window.viewer.camera.flyHome(duration);
    },
    /**
     * 定位
     * view:Object{x,y,z}|Object{longitude,latitude,height}
     */
    flyTo(view) {
      let defaultView = {
        height: 100000,
        heading: 0.0,
        pitch: -90.0,
        roll: 0.0,
      };
      if (!view.hasOwnProperty("position")) {
        if (view.hasOwnProperty("longitude")) {
          view.position = {
            longitude: view.longitude,
            latitude: view.latitude,
            height: view.height,
          };
        } else if (view.hasOwnProperty("x")) {
          view.position = {
            longitude: view.x,
            latitude: view.y,
            height: view.z,
          };
        }
      }
      let v = { position: {} };
      v.heading = view.heading ? view.heading : defaultView.heading;
      v.pitch = view.pitch ? view.pitch : defaultView.pitch;
      v.roll = view.roll ? view.roll : defaultView.roll;
      v.position.longitude = view.position.longitude;
      v.position.latitude = view.position.latitude;
      v.position.height = view.position.height
        ? view.position.height
        : defaultView.height;
      viewer.camera.flyTo({
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
    },
    destroy() {
      try {
        //todo:底层destroy方法报错
        //   window.viewer.destroy();
      } catch (error) {}
    },
  },
};
</script>

<style scoped>
@import "./css/dark.scss";
.relative {
  position: relative;
  /* overflow: hidden; */
}
.fullsize {
  width: 100%;
  height: 100%;
}

.cesiumContainer {
  position: relative;
  z-index: 0;
}

.loadingOverlay {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.9;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 99999;
}

.loadingOverlay h1 {
  text-align: center;
  position: relative;
  top: 50%;
  color: #fff;
  margin-top: -0.5em;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -moz-user-select: none;
  -webkit-animation: Glow 1.5s ease infinite alternate;
  animation: Glow 1.5s ease infinite alternate;
}

@-webkit-keyframes Glow {
  from {
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #00a67c;
  }

  to {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #00a67c;
  }
}

@keyframes Glow {
  from {
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #00a67c;
  }

  to {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #00a67c;
  }
}

#drawtoolPanel {
  z-index: 9999;
}
</style>
<style>
.cesium-widget-credits {
  display: none !important;
}
</style>
