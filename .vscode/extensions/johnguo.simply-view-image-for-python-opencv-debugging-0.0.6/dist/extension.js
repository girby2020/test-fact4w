module.exports=function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t){e.exports=require("vscode")},function(e,t){e.exports=require("path")},function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(i,r){function s(e){try{c(o.next(e))}catch(e){r(e)}}function u(e){try{c(o.throw(e))}catch(e){r(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,u)}c((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const i=n(0),r=n(3),s=n(4),u=n(5),c=n(1);let a;t.activate=function(e){let t=i.workspace.getConfiguration("svifpod").get("usetmppathtosave",!0),n=e.storagePath;if((t||void 0===n)&&(n=s.tmpdir(),n=c.join(n,"svifpod")),u.existsSync(n)){u.readdirSync(n).forEach(e=>{let t=c.join(n,e);u.unlinkSync(t)})}else u.mkdirSync(n);a=new r.default(n),console.log('Congratulations, your extension "simply-view-image-for-python-opencv-debugging" is now active!'),e.subscriptions.push(i.languages.registerCodeActionsProvider("python",new d,{providedCodeActionKinds:[i.CodeActionKind.Empty]})),e.subscriptions.push(i.commands.registerTextEditorCommand("extension.viewimagepythonopencvdebug",e=>o(this,void 0,void 0,(function*(){let t=yield a.ViewImage(e.document,e.selection);void 0!==t&&i.commands.executeCommand("vscode.open",i.Uri.file(t),i.ViewColumn.Beside)}))))},t.deactivate=function(){};class d{provideCodeActions(e,t){return o(this,void 0,void 0,(function*(){let n=yield a.ViewImage(e,t);if(void 0!==n)return[{command:"vscode.open",title:"View Image",arguments:[i.Uri.file(n),i.ViewColumn.Beside]}]}))}}t.PythonOpencvImageProvider=d},function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(i,r){function s(e){try{c(o.next(e))}catch(e){r(e)}}function u(e){try{c(o.throw(e))}catch(e){r(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,u)}c((o=o.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const i=n(0),r=n(1);t.default=class{constructor(e){this.workingdir=e}ViewImage(e,t){return o(this,void 0,void 0,(function*(){const n=i.debug.activeDebugSession;if(void 0===n)return;let o=yield n.customRequest("threads",{}),s=o.threads[0].id;o=yield n.customRequest("stackTrace",{threadId:s});let u=o.stackFrames[0].id;o=yield n.customRequest("scopes",{frameId:u});let c=o.scopes[0];o=yield n.customRequest("variables",{variablesReference:c.variablesReference});let a=o.variables;const d=e.getText(e.getWordRangeAtPosition(t.start));let l=a.find(e=>e.name===d);if(void 0===l)return;let f=r.join(this.workingdir,l.name+".png"),p=f.replace(/\\/g,"/");const v=l.evaluateName,m=`cv2.imwrite('${p}', ${`${v} * 255.0 if (isinstance(${v}, (np.ndarray)) and (${v}.dtype == np.float64 or ${v}.dtype == np.float32)) else ${v}`})`;return o=yield n.customRequest("evaluate",{expression:m,frameId:u,context:"hover"}),console.log(`evaluate ${m} result: ${o.result}`),f}))}}},function(e,t){e.exports=require("os")},function(e,t){e.exports=require("fs")}]);
//# sourceMappingURL=extension.js.map