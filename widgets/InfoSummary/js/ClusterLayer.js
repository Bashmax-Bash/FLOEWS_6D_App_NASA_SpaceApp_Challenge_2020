// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define("dojo/_base/declare dojo/_base/array dojo/_base/event dojo/_base/lang dojo/_base/Color dojo/_base/html dojo/DeferredList dojo/dom-class dojo/dom dojox/gfx/fx dojo/on dojo/Evented jimu/utils esri/layers/GraphicsLayer esri/graphic esri/geometry/Extent esri/geometry/Point esri/symbols/PictureMarkerSymbol esri/symbols/SimpleMarkerSymbol esri/symbols/SimpleLineSymbol esri/symbols/TextSymbol esri/symbols/Font esri/renderers/SimpleRenderer esri/tasks/query esri/tasks/QueryTask esri/tasks/FeatureSet esri/symbols/jsonUtils esri/renderers/jsonUtils esri/layers/FeatureLayer".split(" "),
function(E,w,F,p,l,r,G,D,H,I,J,K,A,L,k,M,x,y,h,n,N,O,P,v,B,Q,z,C,R){return E("ClusterLayer",[L,K],{constructor:function(a){this.clusterGraphics=[];this.cancelRequest=!1;this.clusterSize=120;this._singles=[];this._showSingles=!0;this.updateFeatures=void 0;this.hidePanel=a.hidePanel;this._parent=a._parent;this._parentLayer=a.parentLayer;this.layerDefinition=a.layerDefinition;this._parentLayer&&(this.objectIdField=this._parentLayer.objectIdField,this.fields=this._parentLayer.fields);this.name=a.name;
this._map=a.map;this.color=l.fromString(a.color||"#ff0000");this._styleColor=a._styleColor;this.symbolData=a.lyrInfo.symbolData;this.countColor=this.symbolData._highLightColor;this.itemId=a.lyrInfo.itemId;this.refresh=a.lyrInfo.refresh;this.displayFeatureCount=this.symbolData.displayFeatureCount;this.node=a.node;this.countEnabled=a.countEnabled;this.legendNode=a.legendNode;this.id=a.id;this.infoTemplate=a.infoTemplate;this.url=a.lyrInfo.url;this._testRenderer=a.lyrInfo.renderer;(this.originOperLayer=
a.originOperLayer)&&this._getInfoTemplate(this.originOperLayer);this.lyrInfo=a.lyrInfo;this.lyrType=a.lyrType;this.filter=a.filter;this.showAllFeatures=a.showAllFeatures;this.listDisabled=a.listDisabled;this.selfType=a.selfType;this._setupSymbols();this._setFieldNames();this.countFeatures(this._parentLayer);0<this._parentLayer.refreshInterval&&setInterval(p.hitch(this,this._updateEnd),6E4*this._parentLayer.refreshInterval)},countFeatures:function(a){var b=new v;b.geometry=this.showAllFeatures?a.fullExtent:
this._map.extent;a.queryCount?a.queryCount(b,p.hitch(this,function(b){if(0<b)this.hidePanel||(this.nodeCount=b),this._initFeatures(this._parentLayer);else if(!this.hidePanel)if(this.nodeCount=0,a.url){var c=new R(a.url);J(c,"load",p.hitch(this,function(){this.countFeatures(c)}))}else this._initFeatures(this._parentLayer)})):this._initFeatures(this._parentLayer)},_initFeatures:function(a){this._features=[];var b=!0,c=new v;(-1<["CSV","Feature Collection","GeoRSS","KML"].indexOf(this.lyrType)||!this.url)&&
a.graphics?(this._getSourceFeatures(a.graphics),this.clusterFeatures()):"undefined"!==typeof this.url?this.loadData(this.url):(c.where=!this.showAllFeatures&&this.filter?this.filter:"1\x3d1",c.outFields=["*"],c.returnGeometry=!0,a.queryFeatures?a.queryFeatures(c).then(p.hitch(this,function(a){a.features&&(this._getSourceFeatures(a.features),this.clusterFeatures())})):b="error");"error"!==b&&(this.extentChangeSignal||(this.extentChangeSignal=this._map.on("extent-change",p.hitch(this,this.handleMapExtentChange))),
this.clickSignal||(this.clickSignal=this.on("click",p.hitch(this,this.handleClick))))},_getSourceFeatures:function(a){this._features=[];for(var b=0;b<a.length;b++){var c=a[b];c.geometry&&(this.preFormatDomain(c),this._features.push(c))}},_getInfoTemplate:function(a){a=a.parentLayerInfo?a.parentLayerInfo:a;if(a.controlPopupInfo&&(a=a.controlPopupInfo.infoTemplates)){if(this.url){var b=this.url.split("/").pop();b&&(a.indexOf?-1<a.indexOf(b)&&(this.infoTemplate=a[b].infoTemplate):a.hasOwnProperty(b)&&
(this.infoTemplate=a[b].infoTemplate))}this.setInfoTemplate(this.infoTemplate)}},_setFieldNames:function(){this._fieldNames=[];if(this.infoTemplate&&"undefined"!==typeof this.infoTemplate.info){var a=this.infoTemplate.info.fieldInfos;if(a)for(var b=0;b<a.length;b++)a[b].visible&&this._fieldNames.push(a[b].fieldName)}if(this.symbolData.featureDisplayOptions&&0<this.symbolData.featureDisplayOptions.fields.length)for(a=0;a<this.symbolData.featureDisplayOptions.fields.length;a++)b=this.symbolData.featureDisplayOptions.fields[a],
-1===this._fieldNames.indexOf(b.name)&&this._fieldNames.push(b.name);1>this._fieldNames.length&&(this._fieldNames=["*"])},setLayerInfo:function(a){this.lyrInfo=a},clearSingles:function(a){w.forEach(a||this._singles,function(a){this.remove(a)},this);this._singles.length=0},_getSingleGraphic:function(a){a=new k(new x(a.geometry.x,a.geometry.y,this._map.spatialReference),null,a.attributes);a.setSymbol(this._singleSym);return a},_addSingles:function(a){w.forEach(a,function(a){a=this._getSingleGraphic(a);
this._singles.push(a);this._showSingles&&this.add(a)},this);this._map.infoWindow.setFeatures(this._singles)},initalCount:function(a){if(!this.hidePanel){var b=new v;b.returnGeometry=!1;b.geometry=this.showAllFeatures?null:this._map.extent;b.where=!this.showAllFeatures&&this.filter?this.filter:"1\x3d1";(new B(a)).executeForIds(b).then(p.hitch(this,function(a){var b;this.node?(D.contains(this.node,"searching")&&D.remove(this.node,"searching"),this.node.innerHTML=a?A.localizeNumber(a.length):0,b=this.node.parentNode):
this.legendNode&&(b=this.legendNode.previousSibling);this.updateExpand(b,a?!1:!0)}))}},updateExpand:function(a,b){if(!this.hidePanel&&"undefined"!==typeof a){var c;-1<a.id.indexOf("rec_")&&(c=a.id.replace("rec_",""),c=H.byId("exp_"+c));b?(a&&(r.addClass(a,"recDefault"),r.addClass(a,"inActive")),c&&r.addClass(c,"expandInActive")):this.visible&&(a&&(r.removeClass(a,"recDefault"),r.removeClass(a,"inActive")),c&&r.removeClass(c,"expandInActive"))}},loadData:function(a){if(0<a.length){this.initalCount(a);
var b=new v;b.where="1\x3d1";this.filter&&(b.where=this.filter);b.returnGeometry=!1;this.queryPending=!0;(new B(a)).executeForIds(b).then(p.hitch(this,function(b){var c=this._parentLayer&&this._parentLayer.maxRecordCount?this._parentLayer.maxRecordCount:1E3;if(b){this.queryIDs=b;b=[];var d,h;d=0;for(h=this.queryIDs.length;d<h;d+=c){var m=this.queryIDs.slice(d,d+c),f=new v;f.outFields=["*"];f.objectIds=m;f.returnGeometry=!0;f.outSpatialReference=this._map.spatialReference;m=new B(a);b.push(m.execute(f))}this._features=
[];this.cancelRequest?console.log("Cancelled ClusterLayer 1"):(new G(b)).then(p.hitch(this,function(a){this.queryPending=!1;if(this.cancelRequest)console.log("Cancelled ClusterLayer 2");else if(a){for(var b=this._map.spatialReference,c=[],d=0;d<a.length;d++)if(a[d][1].features)for(var f=0;f<a[d][1].features.length;f++){var e=a[d][1].features[f];if("undefined"!==typeof e.geometry&&null!==e.geometry&&e.geometry){var g=new x(e.geometry.x,e.geometry.y,b),g=new k(g);g.setAttributes(e.attributes);this.infoTemplate&&
g.setInfoTemplate(this.infoTemplate);this.preFormatDomain(g);c.push(g)}}a=!0;1E4>c&&(a=JSON.stringify(this._features)!==JSON.stringify(c));a&&(this.requiresReload=!0,this._features=c,this.clusterFeatures(),this.emit("update-end",{bubbles:!0,cancelable:!0}))}}))}}))}},preFormatDomain:function(a){w.forEach(this.fields,p.hitch(this,function(b){if(b&&b.hasOwnProperty("name")&&this._parent&&a&&a.hasOwnProperty("attributes")&&a.attributes.hasOwnProperty(b.name)){var c=this._parent._checkDomainField(b),
e=this._parent._checkDomainAndSubtype(this.layerDefinition,b.name,a.attributes,{layerObject:this._parentLayer});if(c||e)a.attributes[b.name]=this._parent.formatDomainValue(a.attributes[b.name],c,e)}}))},handleClick:function(a){var b=[];if(a.graphic&&(b=a.graphic,b.attributes)){var c=b.attributes;c.Data&&1<c.Data.length?(this.clearSingles(this._singles),b=c.Data,a.stopPropagation(),this._addSingles(b)):c.Data&&1===c.Data.length?(c.Data[0].symbol=b.symbol,this._map.infoWindow.setFeatures([c.Data[0]])):
this._map.infoWindow.setFeatures([b])}this.infoTemplate&&this._map.infoWindow.show(a.mapPoint);F.stop(a)},handleMapExtentChange:function(a){if(a.levelChange)this.clusterFeatures();else if(a.delta){a=a.delta;var b=Math.abs(a.y);(50<Math.abs(a.x)||50<b)&&this.clusterFeatures()}},refreshFeatures:function(a){if(this.itemId){var b=a.featureSet.features;a.featureSet.transform&&(b=(new Q(a.featureSet)).features);"undefined"===typeof this.updateFeatures&&(this.updateFeatures=b);a=!0;1E4>b.length&&(a=JSON.stringify(this.updateFeatures)!==
JSON.stringify(b));if(a){this.requiresReload=!0;this._features=[];this._parentLayer.clear();a=this._parentLayer.spatialReference;for(var c=0;c<b.length;c++){var e=b[c];if(e.geometry){var d=new k(this.getGraphicOptions(e,a));d.setAttributes(e.attributes);this.infoTemplate&&d.setInfoTemplate(this.infoTemplate);this.preFormatDomain(d);this._parentLayer.add(d);this._features.push(d)}else console.log("Null geometry skipped")}this.clusterFeatures()}this.updateFeatures=b}else this.url&&this.loadData(this.url)},
getGraphicOptions:function(a,b){return"undefined"!==typeof a.geometry.rings?{geometry:{rings:a.geometry.rings,spatialReference:{wkid:b.wkid}}}:"undefined"!==typeof a.geometry.paths?{geometry:{paths:a.geometry.paths,spatialReference:{wkid:b.wkid}}}:"undefined"!==typeof a.geometry.points?{geometry:{points:a.geometry.points,spatialReference:{wkid:b.wkid}}}:{geometry:new x(a.geometry.x,a.geometry.y,a.geometry.spatialReference)}},flashFeatures:function(){this._map.graphics.clear();this.flashGraphics(this.graphics)},
flashSingle:function(a){if("undefined"===typeof a.symbol){var b=new n(n.STYLE_NULL,new l(0,0,0,0),0),c=this.color.toRgb();a.setSymbol(new h(h.STYLE_CIRCLE,9,b,new l([c[0],c[1],c[2],.5])))}this.flashGraphics([a])},flashGraphics:function(a){for(var b=0;b<a.length;b++)this._flashFeature(a[b]);setTimeout(p.hitch(this,this._clearFeatures),1100)},_flashFeature:function(a){var b;if(a.geometry){var c=l.fromHex(this._styleColor),e=p.clone(c);e.a=.4;"undefined"!==typeof a.symbol&&(b=new h(h.STYLE_CIRCLE,a.symbol.size,
new n(n.STYLE_SOLID,c,1),e))}"undefined"!==typeof b&&(a=new k(a.geometry,b),this._map.graphics.add(a),b=a.getDojoShape())&&(I.animateStroke({shape:b,duration:700,color:{start:b.strokeStyle.color,end:b.strokeStyle.color},width:{start:18,end:0}}).play(),setTimeout(this._clearFeature,850,a))},_clearFeatures:function(){this._map.graphics.clear()},_clearFeature:function(a){a.getLayer().remove(a)},setColor:function(a){this.color=a},setStyleColor:function(a){this._styleColor=a},cancelPendingRequests:function(){console.log("Cancel Query...");
this.queryPending&&(this.cancelRequest=!0);this.removeEventListeners()},removeEventListeners:function(){this.extentChangeSignal&&(this.extentChangeSignal.remove(),this.extentChangeSignal=null);this.clickSignal&&(this.clickSignal.remove(),this.clickSignal=null)},isLayerClusterEnabled:function(a){var b=!1;w.some(this._parent.config.layerInfos,p.hitch(this,function(c){if(a===c.layer+this._parent.UNIQUE_APPEND_VAL_CL&&c.symbolData.clusteringEnabled)return b=!0}));return b},clusterFeatures:function(){var a=
!0;this.clear();null===this._map&&(this._map=this._parent.map);this._map.infoWindow.isShowing&&(w.some(this._map.infoWindow.features,p.hitch(this,function(b){if(b._layer&&this.isLayerClusterEnabled(b._layer.id))return a=!1,!0})),!a&&this._parent.isOpen?this._map.infoWindow.hide():this._parent.config.hasOwnProperty("displayClusterLayer")&&!0===this._parent.config.displayClusterLayer&&!a&&this._map.infoWindow.hide());var b=this._features,c=0;if("undefined"!==typeof b){if(0<b.length&&(this.visible||
this.requiresReload)){var e=this.clusterSize;this.clusterGraphics=[];for(var d=this._map.spatialReference,h=this._map.extent,m=new x(h.xmin,h.ymax,d),f=Math.ceil(this._map.height/e),g=Math.ceil(this._map.width/e),q=h.getWidth()/this._map.width*e,e=h.getHeight()/this._map.height*e,h=0;h<f;h++)for(var n=0;n<g;n++){var l=m.x+q*n,r=m.y-e*h,r=new M(l,r-e,l+q,r,d),l=[],u;for(u in b){var v=b[u];r.contains(v.geometry)&&(c+=1,l.push(v))}0<l.length&&(r=this.getClusterCenter(l),this.clusterGraphics.push({center:r,
graphics:l}))}for(var y in this.clusterGraphics){d=this.clusterGraphics[y];m=d.graphics.length;f=d.graphics;u=A.localizeNumber(m);q=g=19*u.length;g+=5;e=new O;e.family="Arial";e.size="16px";u=new N(u,e,this.countColor);u.setOffset(0,-4);var t;this.symbolData&&this.symbolData.symbol?this.symbolData.symbol.size?t=this.symbolData.symbol.size:this.symbolData.symbol.width&&(t=this.symbolData.symbol.width,e=this.symbolData.symbol.height,t=t>=e?t:e):this.icon.width?(g=this.icon.width>=g?this.icon.width+
5:g,g=this.icon.height>=g?this.icon.height+5:g,q=this.icon.width>=q?this.icon.width+1:q,q=this.icon.height>=q?this.icon.height+1:q):this.icon.size&&(t=this.icon.size);t&&(g=t>=g?t+5:g,q=t>=q?t+1:q);q>=g&&(g+=0===q-g?4:q-g+5);this._setSymbols(g+15,g);f={Count:m,Data:f};1<m?"undefined"!==typeof this.symbolData?"CustomSymbol"!==this.symbolData.symbolType?(this.add(new k(d.center,this.csym,f)),this.displayFeatureCount?this.add(new k(d.center,u,f)):this.add(new k(d.center,this.csym3,f))):(this.add(new k(d.center,
this.csym,f)),this.displayFeatureCount?this.add(new k(d.center,u,f)):this.add(new k(d.center,this.psym,f))):(this.add(new k(d.center,this.csym,f)),this.displayFeatureCount?this.add(new k(d.center,u,f)):this.add(new k(d.center,this.psym,f))):(d=d.graphics[0].geometry,this.renderer&&(d=(this.renderer.hasOwnProperty("getSymbol")||this.renderer.hasOwnProperty("symbol"))&&"LayerSymbol"===this.symbolData.symbolType?new k(d,null,f.Data[0].attributes,this.infoTemplate):"EsriSymbol"===this.symbolData.symbolType?
new k(d,z.fromJson(this.symbolData.symbol),f,this.infoTemplate):"LayerSymbol"!==this.symbolData.symbolType?new k(d,this.psym,f,this.infoTemplate):this.renderer.symbol?new k(d,null,f,this.infoTemplate):new k(d,this.psym,f,this.infoTemplate),"undefined"!==typeof d&&this.add(d)))}}this._updateNode(this.showAllFeatures?b.length:c)}},_updateNode:function(a){if(!this.hidePanel){var b;this.node?(this.node.innerHTML=A.localizeNumber(a?a:0),b=this.node.parentNode):this.legendNode&&(b=this.legendNode.previousSibling);
this.updateExpand(b,a&&0<a&&this.visible?!1:!0)}},_setSymbols:function(a,b){var c=this.color.toRgb(),e,d,k;if("undefined"!==typeof this.symbolData){var m;"custom"===this.backgroundClusterSymbol?m=c:(e=z.fromJson(this.backgroundClusterSymbol),0===e.outline.color.a||0===e.outline.width?(d=n.STYLE_NULL,k=0):(d=n.STYLE_SOLID,k=e.outline.width));e?(c=n(d,e.outline.color,k),m=e.color.toRgb(),this.csym=new h(h.STYLE_CIRCLE,a,c,new l([m[0],m[1],m[2],.75]))):this.csym=new h(h.STYLE_CIRCLE,a,null,new l([m[0],
m[1],m[2],.75]));(a=this.symbolData.s)&&-1<a.indexOf("${appPath}")?(a=window.location.pathname.replace("index.html",""),a=this.symbolData.s.replace("${appPath}",window.location.origin+a)):a=this.symbolData.s?this.symbolData.s:this.icon.imageData;if(a&&"CustomIcon"===this.symbolData.iconType){var f,g;this.symbolData.symbol&&this.symbolData.symbol.height&&(f=this.symbolData.symbol.height);this.symbolData.symbol&&this.symbolData.symbol.width&&(g=this.symbolData.symbol.width);f&&g?g=f=g>f?g:f:(f=this.symbolData.icon.height?
this.symbolData.icon.height:b,g=this.symbolData.icon.width?this.symbolData.icon.width:b);this.psym=new y(a,f,g)}else a&&"LayerIcon"===this.symbolData.iconType?this.psym=z.fromJson(this.symbolData.symbol):"esriPMS"===this.icon.type?this.psym=this.icon:(b=n(this.icon.outline.style,this.icon.outline.color,this.icon.outline.width),this.psym=new h(this.icon.style,this.icon.size,b,this.icon.color));this.csym2=p.clone(this.psym);this.csym3=p.clone(this.csym2);"undefined"!==typeof this.csym2.xoffset&&(this.csym3.xoffset=
0);"undefined"!==typeof this.csym2.yoffset&&(this.csym3.yoffset=0)}else f=new n(n.STYLE_NULL,new l(0,0,0,0),0),this.csym=new h(h.STYLE_CIRCLE,a,f,new l([c[0],c[1],c[2],.5])),this.psym=new y(this.icon.url,a-10,a-10),this.psym2=new y(this.icon.url,b-7,b-7),f=new n(n.STYLE_NULL,new l(0,0,0,0),0),this.csym2=new h(h.STYLE_CIRCLE,b,f,new l([c[0],c[1],c[2],.5]))},_setupSymbols:function(){if("undefined"!==typeof this.symbolData){this.countColor=this.symbolData._highLightColor;this.backgroundClusterSymbol=
this.symbolData.clusterSymbol;this.icon=this.symbolData.icon;"LayerSymbol"===this.symbolData.symbolType?this._parentLayer.renderer?this.renderer=this._parentLayer.renderer.toJson?this._parentLayer.renderer:C.fromJson(this._parentLayer.renderer):this._testRenderer?this.renderer=C.fromJson(this._testRenderer):this.symbolData.renderer&&(this.renderer=this.symbolData.renderer.toJson?this.symbolData.renderer:C.fromJson(this.symbolData.renderer)):this.renderer=new P(z.fromJson(this.symbolData.symbol));
var a=this.color.toRgb(),b=new n(n.STYLE_NULL,new l(0,0,0,0),0);this._singleSym=new h(h.STYLE_CIRCLE,9,b,new l([a[0],a[1],a[2],.5]))}},getLayer:function(){return this},getClusterCenter:function(a){var b=0,c=0,e=a.length;w.forEach(a,function(a){b+=a.geometry.x;c+=a.geometry.y},this);return new x(b/e,c/e,a[0].geometry.spatialReference)},destroy:function(){this._clear();this.removeEventListeners()},_clear:function(){this.clear();this._features=[]},_updateEnd:function(){this.url&&this.loadData(this.url)}})});