import {
  CesiumPoint,
  CesiumPolyline,
  CesiumPolygon
} from './Graphic'
import {
  CVT,
  setString,
  CursorTip,
  pointVisibilityOnEarth
} from './utils';
import GraphicType from './GraphicType'
const LEFT_CLICK = Cesium.ScreenSpaceEventType.LEFT_CLICK;
const RIGHT_CLICK = Cesium.ScreenSpaceEventType.RIGHT_CLICK;
const MOUSE_MOVE = Cesium.ScreenSpaceEventType.MOUSE_MOVE;
const MOUSE_DOWN = Cesium.ScreenSpaceEventType.LEFT_DOWN;
const MOUSE_UP = Cesium.ScreenSpaceEventType.LEFT_UP;
class GraphicManager {
  /**
   * 鼠标交互绘制线和多边形
   * @param {Viewer} viewer Cesium Viewer
   * @param {*} options 预留参数，目前不需要关注
   */
  constructor(viewer, options = {}) {
    if (viewer instanceof Cesium.Viewer === false) {
      throw new Error('viewer不是一个有效的Cesium Viewer')
    }

    this.viewer = viewer
    this.options = options
    /*heightReference 定义几何图形的高程基准
     *CLAMP_TO_GROUND:依附地形
     *CLAMP_TO_MODEL:依附模型
     *NONE:空间线
     */
    this._heightReference = 'CLAMP_TO_GROUND'
    this._material = undefined
    this._style = {}

    this.graphicId = undefined
    this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.canvas);
    //点击弹出信息窗口
    this.pickHandler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
    //弹出层位置
    this.popWinPosition = undefined
    this.graphicType = undefined
    this.positions = []
    this.tip = new CursorTip('', 'line-tip', viewer)
    this.tip.visible = false
    this.mode = 'ready'
    this.dragging = false
    // this.init()
    // this.addEventListener()
    //当前正在编辑的graphic
    this.editManager = undefined
    this.selectedNodeIndex = -1
    //Graphic集合
    this.manager = new Map()
    const self = this
    document.onkeydown = function (event) {

      if (self.mode !== 'edit') return;

      const e = event || window.event || arguments.callee.caller.arguments[0];

      if (e && e.keyCode == 46) { // 按 delete
        if (self.selectedNodeIndex > -1 && self.editManager) {
          self.editManager.dropNode(self.selectedNodeIndex)
          self.highlightedNode(undefined, self.editManager.nodeGraphic)
          self.selectedNodeIndex = -1
        } else if (self.editManager) {
          self.editManager.destroy()
          self.manager.delete(self.editManager.id)
          self.mode = 'end'

          self.tip.visible = false
          const evt = new CustomEvent('deleteEvent', {
            detail: {
              mid: self.editManager ? self.editManager.mid : undefined
            }
          })
          document.dispatchEvent(evt)
          self.editManager = undefined
          // self.removeEventListener();
        }
      }
    };
    this.init();
  }

  init() {
    const handler = this.pickHandler;
    const manager = this.manager
    const viewer = this.viewer;
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
          y: offset.y + pos.y - 115
        };
        ele.style.left = off.x + "px";
        ele.style.top = off.y + "px";

        const curPos = JSON.parse(JSON.stringify(self.popWinPosition));
        //上下左右边界
        const inRect = off.x > offset.x && off.y > offset.y && (off.x < (offset.x + offset.width - 100)) && (off.y < (offset.y + offset.height - 115));
        //标记转到地球背面隐藏气泡
        ele.style.display = (inRect && pointVisibilityOnEarth(curPos, self.viewer)) ? "block" : "none";
      }
    });
    //显示属性窗口
    const showTip = function (e) {
      const obj = viewer.scene.pick(e.position);
      if (
        Cesium.defined(obj) &&
        obj.id instanceof Cesium.Entity
      ) {
        //   self.popWinPosition = CVT.pixel2Cartesian(e.position, viewer);
        self.selectedMarker = manager.get(obj.id.mid);
        if (self.mode != "end") return;
        self.activeMarker = self.selectedMarker;
        self.createPopPanel();
      } else {
        self.destroyPopPanel();
      }
    };

    handler.setInputAction(showTip, LEFT_CLICK);
  }
  destroyPopPanel() {
    if (this.popDiv) {
      this.popDiv.remove()
      this.popDiv = undefined;
    }
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
    popdiv.innerHTML = "";
    const position = this.selectedMarker.positions[0];
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
    const coordsdiv = document.createElement("span");
    coordsdiv.innerText = "节点数:" + this.selectedMarker.positions.length;
    body.appendChild(coordsdiv);
    popdiv.appendChild(body);
    //footer:
    const arrow = document.createElement("div");
    arrow.className = "arrow";
    popdiv.appendChild(arrow);

    this.popDiv = popdiv;
    this.viewer.container.appendChild(this.popDiv);
  }
  get heightReference() {
    return this._heightReference;
  }
  set heightReference(h) {
    this._heightReference = h
    if (this.editManager) {
      this.editManager.heightReference = h
      if (this.editManager.type === 'POLYLINE') {
        this.editManager.graphic.polyline.clampToGround = /.*GROUND.*/.test(h);
        this.editManager.options.polyline.clampToGround = /.*GROUND.*/.test(h);

      } else if (this.editManager.type === 'POLYGON') {
        const graphic = this.editManager.graphic;
        const options = this.editManager.options;
        if (/.*GROUND.*/.test(h)) {
          graphic.polygon.perPositionHeight = false;
          if (this.editManager.outline) {
            this.editManager.outlineGraphic.graphic.polyline.clampToGround = true
          } // polygon.heightReference = Cesium.HeightReference.CLAMP_TO_GROUND
          // options.polygon.heightReference= Cesium.HeightReference.CLAMP_TO_GROUND
          options.polygon.perPositionHeight = false;
        } else {
          graphic.polygon.perPositionHeight = true;
          if (this.editManager.outline) {
            this.editManager.outlineGraphic.graphic.polyline.clampToGround = false
          }
          // polygon.heightReference = Cesium.HeightReference.RELATIVE_TO_GROUND
          // options.polygon.heightReference= Cesium.HeightReference.RELATIVE_TO_GROUND
          options.polygon.perPositionHeight = true;
        }

      }
    }
  }
  get material() {
    return this._material;
  }
  set material(v) {
    this._material = v;
    if (this.editManager) {
      if (this.editManager.type === 'POLYLINE') {
        this.editManager.graphic.polyline.material = this._material;
        this.editManager.options.polyline.material = this._material;

      } else if (this.editManager.type === 'POLYGON') {
        this.editManager.graphic.polygon.material = this._material;
        this.editManager.options.polygon.material = this._material;
      }
    }
  }
  get style() {
    return this._style;
  }
  set style(option) {
    this._style = option;
    if (!this.editManager) {
      return
    }
    const keys = Object.keys(option);
    for (let key of keys) {
      if (this.editManager.type === 'POLYLINE') {
        this.editManager.graphic.polyline[key] = option[key];
        this.editManager.options.polyline[key] = option[key];
      } else if (this.editManager.type === 'POLYGON') {
        if (key !== 'outline') {
          this.editManager.graphic.polygon[key] = option[key];
        }

        this.editManager.options.polygon[key] = option[key];
      }
    }
    if (this.editManager.type === 'POLYGON') {
      this.editManager.outlineStyle = option
    }
  }


  draw(type, options) {
    if (typeof type !== "string" && !options) {
      options = JSON.parse(JSON.stringify(type));
      type = "polyline";
    }
    if (type === "polyline") {
      return this.createPolyline(options)
    } else
      return this.createPolygon(options);
  }

  /**
   *
   * @param {Object} options 定义一个CesiumPolyline
   */
  createPolyline(options) {
    if (!options) {
      options = {};
    }
    options.material = Cesium.defaultValue(options.material, CesiumPolyline.defaultStyle.material);
    options.width = Cesium.defaultValue(options.width, CesiumPolyline.defaultStyle.width);
    //是否固定高度,该条件优于clampToGround
    // options.fixHeight = Cesium.defaultValue(options.fixHeight, false);
    // options.height = Cesium.defaultValue(options.height, 2000);
    //是否贴地
    options.clampToGround = Cesium.defaultValue(options.clampToGround, CesiumPolyline.defaultStyle.clampToGround);

    this.graphicType = GraphicType.POLYLINE;
    const id = this.generateId();
    this.graphicId = id;

    options.positions = this.positions;
    // if (/.*GROUND.*/.test(this._heightReference)) {
    //   options.clampToGround = true
    // } else {
    //   options.clampToGround = false
    // }
    this._heightReference = (options.clampToGround) ? Cesium.HeightReference.CLAMP_TO_GROUND : Cesium.HeightReference.NONE;
    // options.fixHeight && (options.clampToGround = false);

    options.material = this.material || options.material
    options.width = this.style.width || options.width

    this.tip.updateText('左键标绘，右键结束.');
    this.tip.visible = true;

    const manager = new CesiumPolyline(this.viewer, options);
    manager.mid = id;
    manager.mname = '未命名';
    manager.heightReference = this.heightReference
    this.manager.set(id, manager);
    this.editManager = manager
    const detail = {
      status: 1,
      mid: manager.mid,
      mtype: manager.mtype,
      mname: manager.mname
    };
    const evt = new CustomEvent('addEvent', {
      detail: detail
    });
    // document.dispatchEvent(evt);
    // this.handler.setInputAction(e => {
    //   this.tip && this.tip.updatePosition(e.endPosition);
    // }, MOUSE_MOVE)
    return this.addEventListener();
  }

  /**
   *
   * @param {Object} options 定义一个CesiumPolygon
   */
  createPolygon(options) {
    if (!options) {
      options = {};
    }
    options.outline = Cesium.defaultValue(options.outline, CesiumPolygon.defaultStyle.outline);
    options.outlineColor = Cesium.defaultValue(options.outlineColor, CesiumPolygon.defaultStyle.outlineColor);
    options.outlineWidth = Cesium.defaultValue(options.outlineWidth, CesiumPolygon.defaultStyle.outlineWidth);
    options.material = Cesium.defaultValue(options.material, CesiumPolygon.defaultStyle.material);
    options.perPositionHeight = Cesium.defaultValue(options.perPositionHeight, CesiumPolygon.defaultStyle.perPositionHeight);

    this.graphicType = GraphicType.POLYGON;
    const id = this.generateId();
    this.graphicId = id;

    options.positions = this.positions;
    if (/.*GROUND.*/.test(this._heightReference)) {
      options.perPositionHeight = false
      // options.heightReference = Cesium.HeightReference.CLAMP_TO_GROUND;
    } else {
      options.perPositionHeight = true;
      // options.heightReference = Cesium.HeightReference.RELATIVE_TO_GROUND;
      // options.height = 0
    }
    options.material = this.material || options.material;
    options.outlineWidth = this.style.outlineWidth || options.outlineWidth;
    options.outlineColor = this.style.outlineColor || options.outlineColor;

    this.tip.updateText('左键标绘，右键结束.');
    this.tip.visible = true;

    const manager = new CesiumPolygon(this.viewer, options);
    manager.mid = id;
    manager.mname = '未命名';
    manager.heightReference = this.heightReference;

    this.manager.set(id, manager);
    this.editManager = manager;
    const detail = {
      status: 1,
      mid: manager.mid,
      mtype: manager.mtype,
      mname: manager.mname
    };
    const evt = new CustomEvent('addEvent', {
      detail: detail
    });
    document.dispatchEvent(evt);
    // const self = this;
    // this.handler.setInputAction(e => {
    //   self.tip && self.tip.updatePosition(e.endPosition);
    // }, MOUSE_MOVE);
    return this.addEventListener();

  }
  generateId() {
    return (Math.random() * 10000000).toString(16).substr(0, 4) + '-' + (new Date()).getTime() + '-' + Math.random().toString().substr(2, 5);
  }
  isKnownGraphic(pickedObj) {
    if (Cesium.defined(pickedObj) &&
      pickedObj.id instanceof Cesium.Entity &&
      (pickedObj.id.mtype === GraphicType.POLYLINE ||
        pickedObj.id.mtype === GraphicType.POLYGON ||
        pickedObj.id.mtype === GraphicType.POINT)) {
      return true
    }
    return false
  }
  /**
   * 将当前选中的点设为高亮
   * @param {Cartesian3} node
   * @param {CesiumPoint} cp
   */
  highlightedNode(node, cp) {
    const soption = CesiumPoint.selectedStyle
    const doption = CesiumPoint.defaultStyle
    for (let n of cp.graphic) {
      if (n === node) {
        CesiumPoint.setStyle(n, soption)
      } else {
        CesiumPoint.setStyle(n, doption)
      }
    }

  }
  addEventListener() {
    const self = this;
    const viewer = this.viewer;
    return new Promise((resolve, reject) => {
      viewer.scene.globe.depthTestAgainstTerrain = true;
      const clickHandler = function (e) {
        //编辑要素
        if (self.mode === 'edit') {
          if (!self.editManager) {
            self.removeEventListener();
            return;
          }
          const nodeGraphic = self.editManager.nodeGraphic ||
            self.editManager.outlineGraphic.nodeGraphic
          const pickedObjs = viewer.scene.drillPick(e.position);
          let known = false,
            pickedObj = undefined;
          for (let obj of pickedObjs) {
            known = self.isKnownGraphic(obj)
            if (known && obj.id.mtype === GraphicType.POINT) {
              pickedObj = obj
              //再事件监听之前移除上次的监听
              self.handler.removeInputAction(MOUSE_DOWN);
              self.handler.removeInputAction(MOUSE_MOVE);
              self.handler.setInputAction(mouseDownHandler, MOUSE_DOWN);
              self.handler.setInputAction(moseMoveHandler, MOUSE_MOVE);
              break;
            }
          }
          // const pickedPosition=CVT.pixel2Cartesian(e.position,viewer)

          if (pickedObj && known) {
            if (pickedObj.id.mtype === GraphicType.POINT) {
              self.selectedNodeIndex = nodeGraphic.contain(pickedObj.id)
              if (self.selectedNodeIndex !== -1) {
                self.highlightedNode(pickedObj.id, nodeGraphic)

              }
            } else {
              self.highlightedNode(pickedObj.id, self.editManager.nodeGraphic)
              self.selectedNodeIndex = -1
            }

          } else {
            self.editManager && self.editManager.stopEdit();
            // self.handler.removeInputAction(MOUSE_MOVE);
            self.removeEventListener();
            self.mode = 'end';
            self.selectedNodeIndex = -1;
            self.editManager = undefined;
            self.tip.visible = false;
            const evt = new CustomEvent('stopEdit');
            document.dispatchEvent(evt);
          }
          return;
        }
        //非法的要素类型
        if (self.graphicType != GraphicType.POLYLINE &&
          self.graphicType != GraphicType.POLYGON) {
          return;
        }
        let cartesian = CVT.pixel2Cartesian(e.position, self.viewer);
        cartesian = viewer.scene.pickPosition(e.position);
        if (/.*MODEL.*/.test(self._heightReference)) {
          if (!viewer.scene.pickPositionSupported) {
            console.log('This browser does not support pickPosition.');
            return;
          }
          cartesian = viewer.scene.pickPosition(e.position);
        }
        //添加第一个点后再监听鼠标移动事件，绘绘完成后移除监听，以免不必要的事件监听
        // if (self.manager.get(self.graphicId).positions.length === 0) {
        //   self.handler.removeInputAction(MOUSE_MOVE);
        //   self.handler.setInputAction(moseMoveHandler, MOUSE_MOVE);
        // }
        if (Cesium.defined(cartesian) && self.manager.has(self.graphicId)) {
          self.manager.get(self.graphicId).addNode(cartesian);
        }
        self.mode = 'create';
      }
      const rightHandler = function () {
        const manager = self.manager.get(self.graphicId);
        if ((self.mode === 'create') && manager) {
          manager.stopEdit();
          self.graphicType = undefined;
          self.graphicId = undefined;
          self.positions = [];
          self.mode = 'end'
          self.tip.visible = false;
          self.editManager = undefined;
        } else if (self.mode === 'ready') {
          self.cancel();
        } else if (self.mode === 'edit') {
          self.editManager && self.editManager.stopEdit();
          self.removeEventListener();
          self.mode = 'end';
          self.selectedNodeIndex = -1;
          self.editManager = undefined;
          self.tip.visible = false;
        }
        const evt = new CustomEvent('stopEdit');
        document.dispatchEvent(evt);
        self.removeEventListener();
        self.selectedMarker = manager;
        manager.id = manager.mid;
        manager.czml = CVT.line2CZML(manager, {
          fixHeight: true
        });
        manager.toCZML = CVT.line2CZML;
        resolve(manager);
      }

      const moseMoveHandler = function (e) {
        let cartesian = CVT.pixel2Cartesian(e.endPosition, self.viewer);
        if (/.*MODEL.*/.test(self._heightReference)) {
          if (!viewer.scene.pickPositionSupported) {
            console.log('This browser does not support pickPosition.');
            return;
          }
          cartesian = viewer.scene.pickPosition(e.endPosition);
        }
        if (!Cesium.defined(cartesian)) {
          return;
        }
        self.tip.updatePosition(e.endPosition);
        if (self.mode === 'create') {
          //如果当前是create模式，创建辅助线
          if (self.positions.length > 1) {
            self.manager.get(self.graphicId).popNode();
          }
          //添加临时节点
          //再添加第一个节点前，不拾取鼠标移动的坐标
          if (self.positions.length > 0) {
            // self.positions.push(cartesian);
            self.manager.get(self.graphicId).addNode(cartesian);
          }
        } else if (self.mode == 'edit' && self.dragging) {
          if (self.selectedNodeIndex !== -1) {
            self.editManager.updateNode(self.selectedNodeIndex, cartesian);
          }
        }
      }
      const mouseDownHandler = function (e) {
        self.handler.setInputAction(mouseUpHandler, MOUSE_UP)
        const objs = viewer.scene.drillPick(e.position);
        let isCesiumPoint = false;
        for (let obj of objs) {
          if (CesiumPoint.isCesiumPoint(obj)) {
            isCesiumPoint = true;
          }

        }
        if (isCesiumPoint == false) {
          return;
        }
        if (self.mode === 'edit' && self.selectedNodeIndex != -1) {
          self.dragging = true
          viewer.scene.screenSpaceCameraController.enableRotate = false

        }

      }
      const mouseUpHandler = function () {
        self.dragging = false;
        viewer.scene.screenSpaceCameraController.enableRotate = true;
        self.handler.removeInputAction(MOUSE_UP);
        // self.handler.removeInputAction(MOUSE_DOWN);


      }
      this.handler.setInputAction(clickHandler, LEFT_CLICK);
      this.handler.setInputAction(rightHandler, RIGHT_CLICK);
      this.handler.setInputAction(moseMoveHandler, MOUSE_MOVE);
    });
  }

  update(name) {
    this.rename(this.selectedMarker.mid, name);
  }
  rename(id, name) {
    const graphic = this.manager.get(id);
    if (Cesium.defined(graphic)) {
      graphic.mname = name
    }
  }
  has(id) {
    if (this.manager) {
      return this.manager.has(id)
    }
    return false
  }
  get(id) {
    if (this.has(id)) {
      return this.manager.get(id)
    }
  }
  /**
   * 当图形处于ready状态时，不想画了
   */
  cancel() {

    const manager = this.manager.get(this.graphicId);
    manager && manager.stopEdit();
    manager && manager.destroy()
    this.graphicType = undefined;
    this.graphicId = undefined;
    this.positions = [];
    this.mode = 'end'
    this.tip.visible = false
    this.editManager = undefined
  }
  select(type, id, status) {
    if (Cesium.defined(id)) {
      const manager = this.manager.get(id)
      if (manager) {
        manager.show = status
      }
    }
    if (Cesium.defined(type)) {
      const values = this.manager.values()
      for (let v of values) {
        if (v.mtype === type) {
          v.show = status
        }
      }
    }
  }
  edit(id) {
    const self = this
    const manager = self.manager.get(id);
    this.handler.setInputAction(e => {
      self.tip.updatePosition(e.endPosition);
    }, MOUSE_MOVE);
    self.graphicId = id;
    if (Cesium.defined(manager)) {
      // manager.zoomTo()
      self.mode = 'edit'
      manager.startEdit();
      self.tip.visible = true;
      self.tip.updateText('拖动节点编辑，按del删除.')
      self.editManager = manager;
      const evt = new CustomEvent('startEdit', {
        detail: {
          graphicType: self.editManager.type,
          material: self.editManager.material,
          width: self.editManager.width,
          outline: self.editManager.outline,
          outlineColor: self.editManager.outlineColor,
          outlineWidth: self.editManager.outlineWidth,
          heightReference: self.editManager.heightReference
        }
      })
      document.dispatchEvent(evt)
      self.addEventListener()
    }
  }
  export (type) {
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
    const managers = this.manager.values()
    for (let m of managers) {
      if (m.type === type) {
        json.features.push(m.toGeoJson())
      }
    }
    const blob = new Blob([JSON.stringify(json)], {
      type: ""
    });
    // saveAs(blob, type + parseInt(Cesium.getTimestamp()) + '.geojson');
  }
  import(feat) {
    const id = this.generateId();
    let graphic, coordinates, positions = [];
    if (feat.geometry.type.toUpperCase() === 'LineString'.toUpperCase()) {
      coordinates = feat.geometry.coordinates
      for (let c of coordinates) {
        positions.push({
          lon: c[0],
          lat: c[1],
          height: c[2]
        })
      }
      try {
        graphic = CesiumPolyline.fromDegrees(this.viewer, positions, feat.properties);
      } catch (e) {
        console.log(e)
      }

    } else if (feat.geometry.type.toUpperCase() === "POLYGON") {
      coordinates = feat.geometry.coordinates[0]
      for (let c of coordinates) {
        positions.push({
          lon: c[0],
          lat: c[1],
          height: c[2]
        })
      }
      graphic = CesiumPolygon.fromDegrees(this.viewer, positions, feat.properties);
    } else {
      throw new Error('不能识别的数据源.')
    }
    if (graphic) {
      graphic.mid = id;
      graphic.mname = feat.properties.name
      this.manager.set(id, graphic)
      const evt = new CustomEvent('addEvent', {
        detail: {
          mid: graphic.mid,
          mtype: graphic.mtype,
          mname: graphic.mname || '未命名',
        }
      })
      document.dispatchEvent(evt)
    }
    return graphic

  }

  removeEventListener() {
    this.handler.removeInputAction(LEFT_CLICK);
    this.handler.removeInputAction(MOUSE_MOVE);
    this.handler.removeInputAction(RIGHT_CLICK);
    this.handler.removeInputAction(MOUSE_DOWN);
    this.handler.removeInputAction(MOUSE_UP);
  }
  removeAll() {
    const values = this.manager.values();
    for (let v of values) {
      v.remove();
      v.destroy();
    }
    this.manager.clear();
    this.tip.visible = false;
  }

  destroy() {
    this.activeManager = undefined;
    this.manager = undefined;
    this.editManager = undefined;
    this.removeEventListener();
    if (!this.handler.isDestroyed) {
      this.handler.destroy();
      this.handler = undefined;
    }
  }
  destroyManager() {
    const manager = this.editManager;
    const evt = new CustomEvent('destroyEvent', {
      detail: {
        mid: manager ? manager.mid : undefined
      }
    })
    if (manager) {
      if (this.mode === 'edit') {
        manager && manager.stopEdit();
      } else {
        manager && manager.destroy();
        this.manager.delete(this.graphicId)
      }
      this.editManager = undefined;
    }

    this.graphicId = undefined;
    this.handler.removeInputAction(MOUSE_MOVE);

    document.dispatchEvent(evt);
  }
}
export default GraphicManager