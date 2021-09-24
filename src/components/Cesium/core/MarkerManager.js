import {
  CesiumBillboard,
  CesiumLabel,
  CesiumModel
} from "./Graphic";
import {
  CVT,
  setString,
  CursorTip,
  pointVisibilityOnEarth
} from './utils';
import GraphicType from "./GraphicType";
const LEFT_CLICK = Cesium.ScreenSpaceEventType.LEFT_CLICK;
const RIGHT_CLICK = Cesium.ScreenSpaceEventType.RIGHT_CLICK;
const MOUSE_MOVE = Cesium.ScreenSpaceEventType.MOUSE_MOVE;

export default class MarkerManager {
  /**
   * 鼠标交互绘制点、文本和模型
   * @param {Viewer} viewer Cesium Viewer
   * @param {*} markerOptions 点参数
   * @param {*} labelOptions 文本参数
   * @param {*} modelOptions 模型参数
   */
  constructor(viewer, markerOptions = CesiumBillboard.defaultStyle,
    labelOptions = CesiumBillboard.defaultLabelStyle, modelOptions = CesiumModel.defaultStyle) {
    if (viewer instanceof Cesium.Viewer) {
      this._viewer = viewer
    }
    if (!Cesium.defined(this._viewer)) {
      return
    }
    /**
     * 表示当前添加的标记类型,marker,label,model
     */
    this.markName = ''
    this.markRemark = ''
    this.markMode = 'marker'
    this.defaultImage = CesiumBillboard.defaultStyle.image
    this.selectedImage = undefined
    //弹出层位置
    this.popWinPosition = undefined
    this.markerid = undefined
    this.markerOptions = markerOptions;
    this.labelOptions = labelOptions;
    this.modelOptions = modelOptions;
    this.cursorTip = new CursorTip(
      "左键标绘，右键结束.",
      "marker-tip",
      viewer
    );
    this.cursorTip.visible = false;

    this.handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
    this.manager = new Map();
    this.pickHandler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
    this.init(this._viewer)
  }
  init(viewer) {
    if (viewer instanceof Cesium.Viewer === false) {
      throw new Error("viewer不是一个有效的Cesium Viewer对象.");
    }
    this.viewer = viewer;
    const handler = this.handler;
    const manager = this.manager
    const self = this;
    //气泡跟随地球移动
    viewer.scene.postRender.addEventListener(function () {
      if (Cesium.defined(self.popWinPosition)) {
        const pos = CVT.cartesian2Pixel(self.popWinPosition, viewer);

        const ele = document.getElementById("popContainer");
        if (!ele) {
          return;
        }
        let offset = self.viewer.container.getBoundingClientRect();
        let off = {
          x: offset.x + pos.x - 100,
          y: offset.y + pos.y - 140
        };
        ele.style.left = off.x + "px";
        ele.style.top = off.y + "px";

        const curPos = JSON.parse(JSON.stringify(self.popWinPosition));
        //上下左右边界
        const inRect = off.x > offset.x && off.y > offset.y && (off.x < (offset.x + offset.width - 100)) && (off.y < (offset.y + offset.height - 110));
        //标记转到地球背面隐藏气泡
        ele.style.display = (inRect && pointVisibilityOnEarth(curPos, self._viewer)) ? "block" : "none";
      }
    });
    //显示属性窗口
    const showTip = function (e) {
      const obj = viewer.scene.pick(e.position);
      if (
        Cesium.defined(obj) &&
        obj.id instanceof Cesium.Entity &&
        obj.id.mtype === GraphicType.MARKER
      ) {
        //   self.popWinPosition = CVT.pixel2Cartesian(e.position, viewer);
        self.selectedMarker = manager.get(obj.id.mid);
        if (self.popDiv) {
          self.destroyPopPanel();
        } else {
          self.activeMarker = self.selectedMarker;
          self.createPopPanel();
        }
      } else {
        self.destroyPopPanel();
      }
    };

    handler.setInputAction(showTip, LEFT_CLICK);
  }
  /**
   * 开始拾取marker，调用该方法后开始监听鼠标单击，添加标记
   * @param {string} type表示何种标记,marker:billboard，label:label,model:model
   * @param {string} mode如果mode不是single，将连续添加标记
   * @returns Promise
   */
  draw(type = "marker", mode = "single") {
    return this.pick(type, mode);
  }
  /**
   * 开始拾取marker，调用该方法后开始监听鼠标单击，添加标记
   * @param {string} type表示何种标记,marker:billboard，label:label,model:model
   * @param {string} mode如果mode不是single，将连续添加标记
   * @returns Promise
   */
  pick(type = "marker", mode = "single") {
    const self = this;
    return new Promise((resolve, reject) => {
      try {
        this.markMode = type;
        const viewer = this._viewer;
        this.cursorTip.visible = true;
        const handler = this.pickHandler
        const id = this.generateId();
        self.markerid = id;
        const manager = this.manager

        const pick = function (e) {
          const cartesian = CVT.pixel2Cartesian(e.position, viewer);
          if (Cesium.defined(cartesian)) {
            // mp.position = cartesian;
            let marker;
            if (type === "label") {
              marker = self.createLabel(cartesian);
            } else if (type === "model") {
              marker = self.createModel(cartesian);
            } else {
              //默认marker
              marker = self.createMarker(cartesian);
            }
            manager.set(id, marker);
            marker.mid = id;
            // marker.mname = "未命名" + viewer.entities.values.length;

            self.selectedMarker = marker;
            self.activeMarker = type !== "model" ? marker : undefined;

            self.cursorTip.visible = false;
            if (mode === "single") {
              handler.removeInputAction(LEFT_CLICK);
              handler.removeInputAction(RIGHT_CLICK);
            }
            const detail = {
              status: 1,
              id: marker.mid,
              name: marker.mname || '未命名',
              description: marker.description,
              type: marker.mtype,
              position: CVT.toDegrees(cartesian, self._viewer)
            };
            self.update(detail.name, detail.description);
            const evt = new CustomEvent('marker-add', {
              detail: detail
            });
            //触发事件
            window.dispatchEvent(evt)
            resolve(manager.get( marker.mid));
            marker = undefined
          }
        };
        const cancel = function () {
          handler.removeInputAction(LEFT_CLICK);
          handler.removeInputAction(RIGHT_CLICK);
          // handler.destroy();
          self.cursorTip.visible = false;
          const id = self.activeMarker ? self.activeMarker.id : undefined
          const evt = new CustomEvent('marker-delete', {
            detail: {
              id: id
            }
          })
          window.dispatchEvent(evt)

          resolve({
            status: 0
          });
          self.activeMarker = undefined;
          //handler=undefined
        };
        const updateTip = function (e) {
          self.cursorTip.updatePosition(e.endPosition);
        };
        //右键取消
        handler.setInputAction(cancel, RIGHT_CLICK);

        handler.setInputAction(pick, LEFT_CLICK);
        handler.setInputAction(updateTip, MOUSE_MOVE);
      } catch (error) {
        reject(error);
      }
    });
  }
  get(id) {
    if (this.has(id)) {
      return this.manager.get(id)
    }
  }
  has(id) {
    if (this.manager) {
      return this.manager.has(id)
    }
    return false
  }
  createMarker(cartesian) {

    const mp = this.labelOptions;
    const marker = new CesiumBillboard(
      this._viewer, {
        ...this.markerOptions,
        position: cartesian,
        image: this.selectedImage
      },
      mp
    );
    return marker;
  }
  changeHandler(img) {
    this.selectedImage = img;
    this.activeMarker.updateImage(this.selectedImage);
  }
  panelPosition() {
    if (this.activeMarker) {
      if (this.markMode === "marker") {
        const position = this.activeMarker.graphic.position.getValue(this.viewer.clock.currentTime);
        const pixel = CVT.cartesian2Pixel(position, this._viewer);
        const x = pixel.x > 170 ? pixel.x - 170 : pixel.x + 10;
        const y = pixel.y > 210 ? pixel.y - 240 : pixel.y + 50;
        return {
          x: x,
          y: y
        };
      } else {
        const position = this.activeMarker.graphic.position.getValue(this.viewer.clock.currentTime);
        const pixel = CVT.cartesian2Pixel(position, this._viewer);
        const x = pixel.x + 10;
        const y = pixel.y - 25;
        return {
          x: x,
          y: y
        };
      }
    } else {
      return {
        x: 0,
        y: 0
      };
    }
  }
  createLabel(cartesian) {
    const options = this.labelOptions;
    options.position = cartesian;

    const marker = new CesiumLabel(this._viewer, options);
    return marker;
  }
  createModel(cartesian) {
    const options = this.modelOptions;
    options.position = cartesian;
    const marker = new CesiumModel(this._viewer, options);

    return marker;
  }
  removeEventListener() {
    const pickHandler = this.pickHandler
    if (pickHandler) {
      if (!pickHandler.isDestroyed()) {
        // pickHandler.destroy();
        pickHandler.removeInputAction(LEFT_CLICK);
        pickHandler.removeInputAction(RIGHT_CLICK);
        pickHandler.removeInputAction(MOUSE_MOVE);
      }
    }
  }
  stopPick() {
    this.removeEventListener();
    if (this.activeMarker) {
      this.activeMarker.destroy();
      const evt = new CustomEvent('marker-delete', {
        detail: {
          id: this.activeMarker.mid
        }
      })
      window.dispatchEvent(evt)

    }
    this.activeMarker = undefined;
    this.cursorTip.visible = false;
  }
  zoomTo(id) {
    if (this.manager.has(id)) {
      this.manager.get(id).zoomTo();
    }
  }
  edit(id) {
    const manager = this.manager
    if (manager.has(id)) {
      const mm = manager.get(id);
      this.activeMarker = mm
      mm.startEdit()
      if (
        mm.mtype === GraphicType.MARKER ||
        mm.mtype === GraphicType.LABEL
      ) {
        this.markName = this.activeMarker.mname;
        this.markRemark = this.activeMarker.description;
        this.cursorTip.visible = true;
      }
      // this.activeMarker.zoomTo();
      const pixel = this.panelPosition()
      const evt = new CustomEvent('marker-edit', {
        detail: {
          name: this.markName,
          remark: this.markRemark,
          type: this.activeMarker.type,
          pos: pixel
        }
      })
      window.dispatchEvent(evt)
    }
  }
  drop(id) {
    const mm = this.manager.get(id);
    mm && mm.destroy();
    this.manager.delete(id);
  }
  rename(id, name) {
    const mm = this.manager.get(id);
    mm.mname = name;
  }
  select(type, id, status) {
    if (Cesium.defined(id)) {
      const manager = this.manager.get(id);
      if (Cesium.defined(manager)) {
        manager.show = status;
      }
    }
    if (Cesium.defined(type)) {
      const values = this.manager.values();
      for (let v of values) {
        if (v.mtype === type) {
          v.show = status;
        }
      }
    }
  }
  destroyPopPanel() {
    if (this.popDiv) {
      this.popDiv.remove()
      this.popDiv = undefined;
    }
  }
  destroy() {
    this.removeAll()
    this.destroyPopPanel()
    if (!this.pickHandler.isDestroyed()) {
      this.pickHandler.destroy()
    }
    if (!this.handler.isDestroyed()) {
      this.handler.destroy()
    }
    this._viewer = undefined
    this.labelOptions = undefined
    this.markerOptions = undefined;
    this.modelOptions = undefined
  }
  createPopPanel() {
    if (!Cesium.defined(this.selectedMarker)) {
      return;
    }
    if (this.popDiv) {
      this.destroyPopPanel();
    }
    const self = this;
    const popdiv = document.createElement("div");
    popdiv.id = "popContainer";
    popdiv.className = "marker-popWin-class";
    popdiv.style.display = "none";
    popdiv.innerHTML = "";
    const position = this.selectedMarker.position;
    this.popWinPosition = position;

    //header:
    const header = document.createElement("div");
    header.className = "marker-popWin-class-header";
    //关闭按钮
    const closebtn = document.createElement("div");
    closebtn.className = "iconfont iconclose closebtn";
    closebtn.onclick = function () {
      self.popDiv.remove();
      self.popDiv = undefined;
    };
    header.appendChild(closebtn);

    let remarkdiv = document.createElement('span');
    // remarkdiv.title = this.selectedMarker.description
    remarkdiv.innerText = setString(this.selectedMarker.name || '', 16);
    if (remarkdiv) {
      header.appendChild(remarkdiv);
    }
    popdiv.appendChild(header);
    //body:
    const body = document.createElement("div");
    body.className = "marker-popWin-class-body";
    if (this.selectedMarker.description && Array.isArray(this.selectedMarker.description)) {
      this.selectedMarker.description.map(des => {
        let descdiv = document.createElement('span');
        let txt = des.text + "：";
        if (des.value.indexOf("http") > -1) {
          txt += '<a target="_blank" href="' + des.value + '">' + des.text + '</a>';
        } else {
          txt += setString(des.value || '', 18);
        }
        descdiv.innerHTML = txt;
        body.appendChild(descdiv);
      });
    }
    const coord = CVT.cartesian2Degrees(position, this._viewer);
    const coordsdiv = document.createElement("span");
    coordsdiv.innerHTML =
      "经度：" + coord.lon.toFixed(4) + "</br>纬度：" + coord.lat.toFixed(4);
    body.appendChild(coordsdiv);
    popdiv.appendChild(body);
    //footer:
    const arrow = document.createElement("div");
    arrow.className = "arrow";
    popdiv.appendChild(arrow);
    this.popDiv = popdiv;
    this._viewer.container.appendChild(this.popDiv);
  }

  import(feat) {
    if (feat.geometry.type.toUpperCase() !== "POINT") {
      throw new Error("无效的数据类型.");
    }
    const id = this.generateId();
    let marker;
    if (feat.properties.mtype === GraphicType.LABEL) {
      const lopts = CesiumLabel.defaultStyle;
      lopts.position = Cesium.Cartesian3.fromDegrees(
        ...feat.geometry.coordinates
      );
      lopts.text = feat.properties.name;
      marker = new CesiumLabel(this._viewer, lopts);
    } else {
      const coord = {
        lon: feat.geometry.coordinates[0],
        lat: feat.geometry.coordinates[1],
        height: feat.geometry.coordinates[2]
      };
      marker = CesiumBillboard.fromDegrees(this._viewer, coord);
    }
    marker.mname = feat.properties.name;
    marker.mid = id;
    this.manager.set(id, marker);
    const evt = new CustomEvent('marker-add', {
      detail: {
        id: marker.mid,
        name: marker.mname || '未命名',
        type: marker.mtype,
        description: marker.description,
        properties: feat.properties,
        position: {
          lon: feat.geometry.coordinates[0],
          lat: feat.geometry.coordinates[1],
          height: feat.geometry.coordinates[2]
        }
      }
    })
    window.dispatchEvent(evt)
  }
  addMarker(marker) {
    this.manager.set(marker.mid, marker)
  }
  export (type) {
    const managers = this.manager.values();
    const json = {
      type: "FeatureCollection",
      name: "graphic",
      crs: {
        type: "name",
        properties: {
          name: "urn:ogc:def:crs:OGC:1.3:CRS84"
        }
      },
      features: []
    };

    for (let m of managers) {
      if (m.type === type) {
        json.features.push(m.toGeoJson());
      }
    }
    const blob = new Blob([JSON.stringify(json)], {
      type: ""
    });

    window.saveAs(blob, type + parseInt(Cesium.getTimestamp()) + ".geojson");
  }
  set font(font) {
    this.labelOptions.font = font
    if (this.activeMarker) {
      this.activeMarker.font = font;
    }
  }
  get font() {
    if (this.activeMarker) {
      return this.activeMarker.font;
    }
    return undefined;
  }
  set color(color) {
    this.labelOptions.fillColor = color;
    if (this.activeMarker) {
      this.activeMarker.color = color;
    }
  }
  set label(option) {
    const keys = Object.keys(option);
    for (let key of keys) {
      this.labelOptions[key] = option[key];
    }
    // this.modelAndLabelOptions=[...this.modelAndLabelOptions,...option]
    if (this.activeMarker) {
      this.activeMarker.setLabel(this.labelOptions);
    }
  }
  set model(options) {
    this.modelOptions = {
      ...this.modelOptions,
      ...options
    };
    if (this.activeMarker) {
      if (options.uri) {
        this.activeMarker.uri = options.uri;
      }
      if (options.color) {
        this.activeMarker.color = options.color;
      }
      if (options.mode != undefined) {
        this.activeMarker.model = options.mode;
      }
      if (options.mixed != undefined) {
        this.activeMarker.mixed = options.mixed;
      }
    }
  }
  removeAll() {
    const values = this.manager.values();
    for (let v of values) {
      v.remove();
      v.destroy();
    }
    this.manager.clear();
    this.destroyPopPanel();
  }
  cancelMark() {
    this.activeMarker && this.activeMarker.destroy();
    this.activeMarker = undefined;
    this.cursorTip.visible = false;
    const evt = new CustomEvent('marker-delete', {
      detail: {
        id: this.markerid
      }
    })
    window.dispatchEvent(evt)
    this.markName = "";
    this.markRemark = "";
    this.manager.delete(this.markerid);
    this.markerid = undefined;
    this.removeEventListener();
  }
  update(name, remark) {
    this.markName = name;
    this.markRemark = remark
    this.activeMarker.updateText(this.markName, this.markRemark);
    this.cursorTip.visible = false;
    this.activeMarker.stopEdit()
    const evt = new CustomEvent('marker-update', {
      detail: {
        id: this.activeMarker.mid,
        name: this.activeMarker.mname,
        description: this.activeMarker.description,
        position: CVT.toDegrees(this.activeMarker.position, this._viewer)
      }
    })
    window.dispatchEvent(evt)
    // this.activeMarker = undefined;
    this.removeEventListener();
  }
  generateId() {
    return (
      (Math.random() * 10000000).toString(16).substr(0, 4) +
      "-" +
      new Date().getTime() +
      "-" +
      Math.random()
      .toString()
      .substr(2, 5)
    );
  }
}
