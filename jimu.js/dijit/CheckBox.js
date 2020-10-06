// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define("dojo/_base/declare dijit/_WidgetBase dojo/_base/lang dojo/_base/html dojo/dom-class dojo/Evented ./a11y/CheckBox".split(" "),function(c,f,d,b,e,g,h){c=c([f,g],{baseClass:"jimu-checkbox",declaredClass:"jimu.dijit.CheckBox",checked:!1,disabled:!1,status:!0,label:"",title:"",postCreate:function(){this.checkNode=b.create("div",{"class":"checkbox jimu-float-leading jimu-icon jimu-icon-checkbox"},this.domNode);this.labelNode=b.create("div",{"class":"label jimu-float-leading",innerHTML:this.label||
""},this.domNode);this.checked&&(b.addClass(this.checkNode,"checked"),b.addClass(this.checkNode,"jimu-icon-checked"));this.status=this._getStatusByDisabled(this.disabled);this.status||(b.addClass(this.domNode,"jimu-state-disabled"),b.addClass(this.checkNode,"jimu-state-disabled"));this.a11y_setDisabled(!this.status);this.own(this.watch("disabled",d.hitch(this,function(){this.setStatus(this._getStatusByDisabled(this.disabled))})));this._udpateLabelClass();this.a11y_init()},setLabel:function(a){this.label=
a;this.labelNode.innerHTML=this.label;this.labelNode.title=this.label;this.a11y_updateAriaLabel(a);this._udpateLabelClass()},_udpateLabelClass:function(){this.labelNode&&(this.labelNode.innerHTML?b.removeClass(this.labelNode,"not-visible"):b.addClass(this.labelNode,"not-visible"))},setValue:function(a){this.status&&(!0===a?this.check():this.uncheck())},getValue:function(){return this.checked},setStatus:function(a){a=!!a;var c=this.status!==a;(this.status=a)?(e.remove(this.domNode,"jimu-state-disabled"),
b.removeClass(this.checkNode,"jimu-state-disabled")):(e.add(this.domNode,"jimu-state-disabled"),b.addClass(this.checkNode,"jimu-state-disabled"));this.a11y_setDisabled(!this.status);c&&this.emit("status-change",a)},getStatus:function(){return this.status},check:function(a){if(this.status&&(this.checked=!0,this.a11y_changeAriaCheckedAttr(),b.addClass(this.checkNode,"checked jimu-icon-checked"),b.removeClass(this.checkNode,"checked jimu-icon-checkbox"),!a))this.onStateChange()},uncheck:function(a){if(this.status&&
(this.checked=!1,this.a11y_changeAriaCheckedAttr(),b.removeClass(this.checkNode,"checked"),b.removeClass(this.checkNode,"jimu-icon-checked"),b.addClass(this.checkNode,"jimu-icon-checkbox"),!a))this.onStateChange()},onStateChange:function(){if(this.onChange&&d.isFunction(this.onChange))this.onChange(this.checked);this.emit("change",this.checked)},focus:function(){this.checkNode&&this.checkNode.focus&&this.checkNode.focus()},_getStatusByDisabled:function(a){return!0===a||"true"===a||"disabled"===a?
!1:!0}});c.extend(h);return c});