require=function n(r,c,h){function a(i,t){if(!c[i]){if(!r[i]){var e="function"==typeof require&&require;if(!t&&e)return e(i,!0);if(u)return u(i,!0);var o=new Error("Cannot find module '"+i+"'");throw o.code="MODULE_NOT_FOUND",o}var s=c[i]={exports:{}};r[i][0].call(s.exports,function(t){return a(r[i][1][t]||t)},s,s.exports,n,r,c,h)}return c[i].exports}for(var u="function"==typeof require&&require,t=0;t<h.length;t++)a(h[t]);return a}({bezier:[function(t,i,e){"use strict";cc._RF.push(i,"71193yWGTtKHaDpgThxbTip","bezier");i.exports=function(t,i,e){var o=3<arguments.length&&void 0!==arguments[3]?arguments[3]:2,s={},u=void 0,d=void 0,l=void 0,p=void 0,v=o,f=t,m=i,g=e;return s.getPoints=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:100;u=[],d=p=0,l={x:f.x,y:f.y,length:0};for(var i,e,o,s,n,r,c=v/t,h=0,a=t+1;h<a;h++)i=c,e=p/v,o=Math.pow(1-e,2)*f.x+2*e*(1-e)*m.x+Math.pow(e,2)*g.x,s=Math.pow(1-e,2)*f.y+2*e*(1-e)*m.y+Math.pow(e,2)*g.y,n=Math.sqrt(Math.pow(l.x-o,2)+Math.pow(l.y-s,2)),r={x:o,y:s,length:n},u.push(r),l=r,d+=n,p+=i;return u},s.getCurveLength=function(){return d},s},cc._RF.pop()},{}],myBezier_b:[function(t,i,e){"use strict";cc._RF.push(i,"ecd44FsVGlMtrayYiFSr4N5","myBezier_b"),cc.Class({extends:cc.Component,editor:{executeInEditMode:!0},properties:{graphicsNode:cc.Node,box:cc.Node,box_y:cc.Node,pointPosLists:[cc.Node],controlPosLists:[cc.Node],infoWindow:cc.Node},start:function(){this.runTime=2,this.bezierColor=cc.hexToColor("#03A8F3"),this.lineColor=cc.hexToColor("#e81e63"),this.notice=this.infoWindow.getChildByName("notice").getComponent(cc.Label),this.inputBox=this.infoWindow.getChildByName("Input").getChildByName("EditBox").getComponent(cc.EditBox),this.bezierLists=[],this.hideInfoWindow(),this.initGraphics(),this.initNodeEvents(),this.saveBezierPath()},initGraphics:function(){this.ctx=this.graphicsNode.getComponent(cc.Graphics),this.ctx.lineWidth=2,this.updateNodePos()},initNodeEvents:function(){this.addTouchEvents(this.node);for(var t=0,i=this.pointPosLists.length;t<i;t++){var e=this.pointPosLists[t];e.isMove=!0,this.addTouchEvents(e)}for(t=0,i=this.controlPosLists.length;t<i;t++){var o=this.controlPosLists[t];o.isMove=!0,this.addTouchEvents(o)}},updateNodePos:function(){this.startPos=this.pointPosLists[0].position,this.pointPos1=this.pointPosLists[1].position,this.pointPos2=this.pointPosLists[2].position,this.endPos=this.pointPosLists[3].position,this.controlPos1=this.controlPosLists[0].position,this.controlPos2=this.controlPosLists[1].position,this.controlPos3=this.controlPosLists[2].position},drawBezierAll:function(){this.ctx.clear(),this.drawBezier(this.startPos,this.controlPos1,this.pointPos1),this.drawBezier(this.pointPos1,this.controlPos2,this.pointPos2),this.drawBezier(this.pointPos2,this.controlPos3,this.endPos)},drawBezier:function(t,i,e){this.ctx.moveTo(t.x,t.y),this.ctx.strokeColor=this.bezierColor,this.ctx.quadraticCurveTo(i.x,i.y,e.x,e.y),this.ctx.stroke(),this.ctx.moveTo(e.x,e.y),this.ctx.strokeColor=this.lineColor,this.ctx.lineTo(i.x,i.y),this.ctx.stroke()},saveBezierPath:function(){this.bezierLists=[];for(var t=0,i=this.controlPosLists.length;t<i;t++)this.bezierLists.push({startPos:this.pointPosLists[t].position,controlPos:this.controlPosLists[t].position,endPos:this.pointPosLists[t+1].position});console.log(this.bezierLists)},save:function(){""!=this.inputBox.string?(this.setNoitce(""),this.saveBezierPathToJson(this.inputBox.string)):this.notice.string="文件名不能为空!"},saveBezierPathToJson:function(t){console.log(JSON.stringify(this.bezierLists));var i=jsb.fileUtils.getWritablePath();console.log("writeable_path: "+i);var e=i+"path";jsb.fileUtils.isDirectoryExist(e)?console.log("dir is exist!!!"):jsb.fileUtils.createDirectory(e),jsb.fileUtils.writeStringToFile(JSON.stringify(this.bezierLists),e+"/"+t+".json"),this.setNoitce("保存成功,JSON文件路径：\n"+e+"/"+t)},addTouchEvents:function(t){var e=this;t.on(cc.Node.EventType.MOUSE_DOWN,function(t){this.isMouseDown=!0,this.isMove&&(e.moveTargetNode=this)}),t.on(cc.Node.EventType.MOUSE_MOVE,function(t){var i=e.convertToNodeSpace(t);this.isMouseDown&&e.moveTargetNode&&e.moveTargetNode.setPosition(i),this.isMove&&(this.opacity=100,cc._canvas.style.cursor="all-scroll")}),t.on(cc.Node.EventType.MOUSE_LEAVE,function(t){this.isMove&&(this.opacity=255,cc._canvas.style.cursor="auto")}),t.on(cc.Node.EventType.MOUSE_UP,function(t){this.isMouseDown=!1,e.moveTargetNode=null,this.isMove&&e.saveBezierPath()})},convertToNodeSpace:function(t){return this.node.convertToNodeSpaceAR(t.getLocation())},showInfoWindow:function(){this.infoWindow.active=!0,this.setNoitce("")},hideInfoWindow:function(){this.infoWindow.active=!1},setNoitce:function(t){this.notice.string=t},update:function(t){this.updateNodePos(),this.drawBezierAll(),this.onBezierMoveTo(t,this.runTime)},onBezierMoveTo:function(t,i){if(!(null==this.currentRunTime||null==i||this.currentRunTime>=i)){this.currentRunTime+=t;var e=this.currentRunTime/i,o=Math.pow(1-e,2)*this.bezier.startPos.x+2*e*(1-e)*this.bezier.controlPos.x+Math.pow(e,2)*this.bezier.endPos.x,s=Math.pow(1-e,2)*this.bezier.startPos.y+2*e*(1-e)*this.bezier.controlPos.y+Math.pow(e,2)*this.bezier.endPos.y;console.log("x:"+o+",y:"+s),this.box.setPosition(o,s),console.log("currentRuntime: "+this.currentRunTime)}},play:function(){this.bezier=this.bezierLists[0],this.currentRunTime=0,this.box.setPosition(this.bezier.startPos)},playMoveAnimation:function(){var t=node.getComponent("nodeFish");t.setFish(fish),t.setFishLine(item),t.setFishPath(fishPath),t.startMove(time-item.showTime)}}),cc._RF.pop()},{}],myBezier:[function(t,i,e){"use strict";function c(t){if(Array.isArray(t)){for(var i=0,e=Array(t.length);i<t.length;i++)e[i]=t[i];return e}return Array.from(t)}cc._RF.push(i,"5f1e3Bvf/pIlrVZjlwy4M3n","myBezier");var h=t("./bezier"),s=0,n=1,o=2;cc.Class({extends:cc.Component,editor:{executeInEditMode:!0},properties:{graphicsNode:cc.Node,box:cc.Node,point:cc.Prefab,control:cc.Prefab,bezierColor:cc.hexToColor("#03A8F3"),lineColor:cc.hexToColor("#e81e63"),startNode:cc.Node,controlNode:cc.Node,endNode:cc.Node,infoWindow:cc.Node,runTime:cc.EditBox,msg:cc.Node,timeInfo:cc.Label},onLoad:function(){this.bezierLists=[],this.bezierCurveData={time:Number(this.runTime.string),length:0,points:[]},this.notice=this.infoWindow.getChildByName("notice").getComponent(cc.Label),this.fileInputBox=this.infoWindow.getChildByName("Input").getChildByName("fileEditBox").getComponent(cc.EditBox),this.inputNode=this.node.getChildByName("Input"),this.initGraphics(),this.initCurveLists(),this.initNodeEvents(),this.saveBezierPath(),this.hideInfoWindow()},update:function(t){this.drawBezierAll(),this.isStartRun&&this.setCountTimeLabel(t)},initGraphics:function(){this.ctx=this.graphicsNode.getComponent(cc.Graphics),this.ctx.lineWidth=2},initCurveLists:function(){this.bezierLists.push({start:this.startNode,control:this.controlNode,end:this.endNode})},initNodeEvents:function(){this.addTouchEvents(this.node),this.startNode.ident=s,this.addTouchEvents(this.startNode),this.controlNode.ident=n,this.addTouchEvents(this.controlNode),this.endNode.ident=s,this.addTouchEvents(this.endNode)},drawBezierAll:function(){this.ctx.clear();for(var t=0,i=this.bezierLists.length;t<i;t++){var e=this.bezierLists[t];this.drawBezier(e.start.position,e.control.position,e.end.position)}},drawBezier:function(t,i,e){this.ctx.moveTo(t.x,t.y),this.ctx.strokeColor=this.bezierColor,this.ctx.quadraticCurveTo(i.x,i.y,e.x,e.y),this.ctx.stroke(),this.ctx.moveTo(e.x,e.y),this.ctx.strokeColor=this.lineColor,this.ctx.lineTo(i.x,i.y),this.ctx.stroke()},isMove:function(t){return t.ident==s||t.ident==n||t.ident==o},addTouchEvents:function(t){var e=this;t.on(cc.Node.EventType.MOUSE_DOWN,function(t){var i=e.convertToNodeSpace(t);this.isMouseDown=!0,console.log(this),e.isMove(this)&&(e.moveTargetNode=this),e.isMove(this)||e.moveTargetNode||e.createCurve(i)}),t.on(cc.Node.EventType.MOUSE_MOVE,function(t){e.isMove(this)&&(this.opacity=100,cc._canvas.style.cursor="all-scroll");var i=e.convertToNodeSpace(t);this.isMouseDown&&e.moveTargetNode&&e.moveTargetNode.setPosition(i)}),t.on(cc.Node.EventType.MOUSE_LEAVE,function(t){e.isMove(this)&&(this.opacity=255,cc._canvas.style.cursor="auto")}),t.on(cc.Node.EventType.MOUSE_UP,function(t){this.isMouseDown=!1,e.moveTargetNode=null,e.isMove(this)&&e.saveBezierPath()})},createCurve:function(t){var i=cc.instantiate(this.point);i.parent=this.node,i.ident=s,i.setPosition(t),this.addTouchEvents(i);var e=cc.instantiate(this.control);e.parent=this.node,e.ident=n,e.setPosition(t),e.isMouseDown=!0,this.addTouchEvents(e),this.moveTargetNode=e;var o={start:this.bezierLists[this.bezierLists.length-1].end,control:e,end:i};this.bezierLists.push(o)},convertToNodeSpace:function(t){return this.node.convertToNodeSpaceAR(t.getLocation())},saveBezierPath:function(){this.bezierCurveData.length=0,this.bezierCurveData.points=[];for(var t=0,i=this.bezierLists.length;t<i;t++){var e,o=this.bezierLists[t],s=new h(o.start,o.control,o.end,100),n=s.getPoints(100),r=s.getCurveLength();this.bezierCurveData.length+=r,(e=this.bezierCurveData.points).push.apply(e,c(n)),console.log("points",n),console.log("bezierCurveData",this.bezierCurveData)}},save:function(){""!=this.fileInputBox.string?this.checkRunTimeInputBox()?(this.setNoitce(""),this.computeBezierActions(),this.saveBezierPathToJson(this.fileInputBox.string)):this.showMsg("运行时间只能填写数字！！！"):this.setNoitce("文件名不能为空!")},saveBezierPathToJson:function(t){if(console.log("保存"),cc.sys.isBrowser){console.log("保存",this.bezierCurveData);var i=JSON.stringify(this.bezierCurveData);console.log("保存",i);var e=new Blob([i],{type:"application/json"}),o=document.createElement("a");o.download=t,o.innerHTML="Download File",null!=window.webkitURL?o.href=window.webkitURL.createObjectURL(e):(o.href=window.URL.createObjectURL(e),o.onclick=destroyClickedElement,o.style.display="none",document.body.appendChild(o)),o.click()}},computeBezierActions:function(){this.actionLists=[];for(var t=0,i=this.bezierCurveData.points.length;t<i;t++){var e=this.bezierCurveData.points[t],o=e.length/this.bezierCurveData.length*this.bezierCurveData.time;e.time=o;var s=cc.moveTo(o,cc.v2(e.x,e.y));this.actionLists.push(s)}},playMoveAnimation:function(){var t,i=this;(this.computeBezierActions(),this.startCountTime(),console.time("time"),this.actionLists.push(cc.callFunc(function(){i.stopCountTime(),console.timeEnd("time")})),1<this.actionLists.length)?this.box.runAction(cc.sequence(this.actionLists)):(t=this.box).runAction.apply(t,c(this.actionLists))},checkRunTimeInputBox:function(){return""!=this.runTime.string&&!isNaN(Number(this.runTime.string))},setRunTime:function(){this.bezierCurveData.time=Number(this.runTime.string)},play:function(){this.checkRunTimeInputBox()?this.playMoveAnimation():this.showMsg("运行时间只能填写数字！！！")},showInfoWindow:function(){this.infoWindow.active=!0,this.setNoitce("")},hideInfoWindow:function(){this.infoWindow.active=!1},setNoitce:function(t){this.notice.string=t},showMsg:function(t){var i=this;this.msg.active=!0,this.msg.getComponent(cc.Label).string=t,setTimeout(function(){i.msg&&(i.msg.active=!1)},1e3)},startCountTime:function(){this.isStartRun=!0,this.timeInfo.string=0,this.currentRunTime=0},stopCountTime:function(){this.isStartRun=!1},setCountTimeLabel:function(t){this.currentRunTime=this.currentRunTime+t,this.timeInfo.string=this.currentRunTime.toFixed(2)}}),cc._RF.pop()},{"./bezier":"bezier"}],test:[function(t,i,e){"use strict";cc._RF.push(i,"3c1aeFLOLRFrrQU9tFTJ/Kg","test"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){cc.loader.loadRes("json/test.json",function(t,i){console.log(i),console.log(JSON.parse(i))})}}),cc._RF.pop()},{}]},{},["bezier","myBezier","myBezier_b","test"]);