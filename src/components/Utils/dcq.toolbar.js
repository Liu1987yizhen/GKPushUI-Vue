/**
 * 地图工具：矩形框、多边形框、刷新、重置
 *
 * esri对象获取方法：let ee=this.$store.getters.getEsri;
 */


define("DcqToolBar", [], function () {
    class DcqToolBar {
        map = {};
        EsriUtils = {};
        baseMap = {};
        currLayer = {};
        currGraphic = {}

        constructor(baseMap) {
            this.baseMap = baseMap;
            this.map = baseMap.map;
            this.EsriUtils = baseMap.esri;
        }
        drawRange(type, mode = "single") {
            var self = this;
            var layer = this.baseMap.getLayer("range");
            return new Promise((resolve, reject) => {
                self.deactivate();
                let draw = new self.EsriUtils.Draw(self.map);
                self.draw = draw;
                draw.activate(type);
                self.clearDrawRange();

                draw.on("draw-complete", (evt) => {
                    self.clearDrawRange();
                    mode === "single" && draw.deactivate();
                    var sfs = new self.EsriUtils.SimpleFillSymbol(self.EsriUtils.SimpleFillSymbol.STYLE_SOLID,
                        new self.EsriUtils.SimpleLineSymbol(self.EsriUtils.SimpleLineSymbol.STYLE_SOLID,
                            new self.EsriUtils.Color([255, 0, 0]), 2), new self.EsriUtils.Color([255, 255, 0, 0.25])
                    );
                    var graphic = new self.EsriUtils.Graphic(evt.geometry, sfs);
                    self.currGraphic = graphic;
                    // polygonArray.push(evt.geometry);
                    layer.add(graphic);
                    resolve(evt.geometry);
                })
            })
        }
        //根据传入ID或ID数组清除手动画出图形
        clearDrawRange() {
            var layer = this.baseMap.getLayer("range");
            layer && layer.clear();
        }
        deactivate() {
            this.draw && typeof this.draw.deactivate && this.draw.deactivate();
        }

        /**
         * 绘制图形元素
         * layerId:图层id，行政区划和查询结果放在不同图层
         */
        addDataToMap(layerId, data) {
            let layer = this.baseMap.getLayer(layerId);
            let _data = Array.isArray(data) ? JSON.parse(JSON.stringify(data)) : [data];
            _data.forEach(item => {
                this.addGraphic(layer, item.id, item.name, item.type, item.geometry);
            });
        }

        //根据传入ID或ID数组清除行政区划图形
        removeGraphics(layerId, ids) {
            let layer = this.baseMap.getLayer(layerId);
            if (!ids) {
                layer && layer.clear();
            } else if (Array.isArray(ids)) {
                ids.map(id => {
                    this._removeGraphics(layer, id);
                })
            } else {
                this._removeGraphics(layer, ids);
            }
        }

        addGraphic(layer, id, name, type, ring) {
            var geometry = "";
            var graphic = null;
            var txtGraphic = null;
            //兼容geojson格式
            if (ring.type && ring.coodinates) {
                ring = ring.coodinates;
            }
            type = type.toLowerCase();
            switch (type) {
                case "point":
                    var point = null;
                    if (Array.isArray(ring)) {
                        if (ring.length < 2)
                            throw new Error("地图定位：无效参数，" + ring.toString());
                        point = new this.EsriUtils.Point(ring[0], ring[1], this.map.spatialReference);
                    } else if (ring.x && ring.y) {
                        point = new this.EsriUtils.Point(ring.x, ring.y, this.map.spatialReference);
                    } else if (ring.X && ring.Y) {
                        point = new this.EsriUtils.Point(ring.X, ring.Y, this.map.spatialReference);
                    } else if (
                        point.longtitude &&
                        point.latitude
                    ) {
                        point = new this.EsriUtils.Point(
                            ring.longtitude,
                            ring.latitude,
                            this.map.spatialReference
                        );
                    }
                    var sfs = new this.EsriUtils.PictureMarkerSymbol(require('@/assets/pedestal/p.svg'), 32, 32);
                    graphic = new this.EsriUtils.Graphic(point, sfs, {
                        id: id,
                        name: name
                    });
                    geometry = point;

                    break;
                case "polyline":
                    var lineSfs = new this.EsriUtils.SimpleLineSymbol(this.EsriUtils.SimpleLineSymbol.STYLE_SOLID, new this.EsriUtils.Color([0, 0, 255]), 2);
                    var line = new this.EsriUtils.Polyline(this.map.spatialReference);
                    ring.map(r => {
                        line.addPath(r);
                    });
                    geometry = line;
                    graphic = new this.EsriUtils.Graphic(line, lineSfs, {
                        id: id,
                        name: name
                    });
                    break;
                case "polygon":
                    //todo:是否存在面相离的情况，即rings包含多个范围线，需要特殊处理
                    var sfs = new this.EsriUtils.SimpleFillSymbol(this.EsriUtils.SimpleFillSymbol.STYLE_SOLID,
                        new this.EsriUtils.SimpleLineSymbol(this.EsriUtils.SimpleLineSymbol.STYLE_SOLID,
                            new this.EsriUtils.Color([255, 0, 0]), 2), new this.EsriUtils.Color([255, 255, 0, 0.25])
                    );
                    var polygon = new this.EsriUtils.Polygon(this.map.spatialReference);
                    ring.map(r => {
                        polygon.addRing(r);
                    });
                    geometry = polygon;
                    graphic = new this.EsriUtils.Graphic(polygon, sfs, {
                        id: id,
                        name: name
                    });
                    this.currGraphic = graphic;

                    break;
            }
            var font = new esri.symbol.Font();
            font.setSize("14pt");
            font.setFamily("微软雅黑");
            font.setWeight(esri.symbol.Font.WEIGHT_BOLD);
            var txtSymbol = new this.EsriUtils.TextSymbol(name, font, new this.EsriUtils.Color([255, 255, 255])).setAlign(this.EsriUtils.Font.ALIGN_START).setHaloColor(new this.EsriUtils.Color([80, 80, 80])).setHaloSize(2);

            let cpt = geometry;
            if (type === "polygon") {
                cpt = geometry.getExtent().getCenter();
            } else if (type === "polyline") {
                cpt = geometry.getPoint(0, Math.ceil(geometry.paths[0].length / 2) - 1);
            } else {
                txtSymbol.setOffset(0, 20);
            }
            txtGraphic = new this.EsriUtils.Graphic(cpt, txtSymbol, {
                id: "txt_" + id
            });
            // polygonArray.push(evt.geometry);
            layer.add(graphic);
            layer.add(txtGraphic);
        }

        /**
         * 定位到图层中的图形
         * id:String,图形标识
         * layerId：String,图层标识，如果为空，则定位到所有图层中第一个标识为id的图形
         */
        locate(id, layerId) {
            if (id !== 0 && !id) return;
            if (layerId) {
                let layer = this.map.getLayer(layerId);
                let g = this._findGraphic(layer, id);
                if (g) this.baseMap.centerAt(g.geometry);
            } else {
                let layerIds = this.map.graphicsLayerIds;
                for (let index = 0; index < layerIds.length; index++) {
                    const lId = layerIds[index];
                    let layer = this.map.getLayer(lId);
                    let g = this._findGraphic(layer, id);
                    if (g) {
                        this.baseMap.centerAt(g.geometry);
                        break;
                    }
                }
            }
        }

        _findGraphic(layer, id) {
            if (!layer || !layer.graphics) return null;
            let len = layer.graphics.length;
            for (let index = 0; index < len; index++) {
                const g = layer.graphics[index];
                if (g.attributes.id === id) {
                    return g;
                }
            }
            return null;
        }

        clear() {
            this.baseMap.clearAllLayer();
        }

        /**
         * 移除图层中指定的元素
         * 
         */
        _removeGraphics(layer, id) {
            let len = layer.graphics.length;
            for (let index = 0; index < len; index++) {
                const g = layer.graphics[0];
                if (g.attributes.id === id || g.attributes.id === ("txt_" + id)) {
                    layer.remove(g);
                }
            }
        }
    }
    return DcqToolBar;

})