define("mashplan/app",["ember","ember/resolver","ember/load-initializers","mashplan/config/environment","exports"],function(e,s,t,n,a){"use strict";var o=e["default"],r=s["default"],i=t["default"],h=n["default"];o.MODEL_FACTORY_INJECTIONS=!0;var l=o.Application.extend({modulePrefix:h.modulePrefix,podModulePrefix:h.podModulePrefix,Resolver:r});i(l,h.modulePrefix),a["default"]=l}),define("mashplan/controllers/plan",["ember","exports"],function(e,s){"use strict";var t=e["default"];s["default"]=t.ArrayController.extend({queryParams:["type"],type:"sessions",isSessionView:t.computed.equal("type","sessions"),groupedSessionTimes:function(){var e=this.get("model").map(function(e){return e.SessionStartTime}),s=e.filter(function(e,s,t){return t.indexOf(e)===s}),t=s.reduce(function(e,s){var t=moment(s).startOf("day");return e[t]?e[t].push(s):e[t]=[s],e},{});return Object.keys(t).map(function(e){return{key:e,values:t[e]}})}.property("model")})}),define("mashplan/controllers/plan/sessions-by-time",["ember","exports"],function(e,s){"use strict";var t=e["default"];s["default"]=t.ObjectController.extend({needs:"plan".w(),type:t.computed.alias("controllers.plan.type"),isSessionView:t.computed.alias("controllers.plan.isSessionView"),filteredModel:function(){var e=this;return this.get("model.sessions").filter("sessions"===this.get("type")?function(s){return s.SessionStartTime===e.get("time")}:function(s){return moment(s.SessionStartTime).day()===moment(e.get("time")).day()})}.property("model"),sessionStartTime:function(){var e=this.get("filteredModel");return e.length?e[0].SessionStartTime:null}.property("filteredModel")})}),define("mashplan/helpers/moment-time",["ember","exports"],function(e,s){"use strict";var t=e["default"];s["default"]=t.Handlebars.makeBoundHelper(function(e){return moment(e).format("LT")})}),define("mashplan/helpers/moment-weekday",["ember","exports"],function(e,s){"use strict";var t=e["default"];s["default"]=t.Handlebars.makeBoundHelper(function(e){return moment(e).format("dddd")})}),define("mashplan/initializers/export-application-global",["ember","mashplan/config/environment","exports"],function(e,s,t){"use strict";function n(e,s){var t=a.String.classify(o.modulePrefix);o.exportApplicationGlobal&&(window[t]=s)}var a=e["default"],o=s["default"];t.initialize=n,t["default"]={name:"export-application-global",initialize:n}}),define("mashplan/router",["ember","mashplan/config/environment","exports"],function(e,s,t){"use strict";var n=e["default"],a=s["default"],o=n.Router.extend({location:a.locationType});o.map(function(){this.route("map"),this.route("plan",{path:"/"},function(){this.route("sessions-by-time",{path:"/:time"},function(){this.route("session",{path:"/:Id"})})})}),t["default"]=o}),define("mashplan/routes/plan",["ember","exports"],function(e,s){"use strict";var t=e["default"];s["default"]=t.Route.extend({queryParams:{type:{refreshModel:!0}},model:function(e){return new t.RSVP.Promise(function(e,s){localStorage.getItem("sessions")?e(JSON.parse(localStorage.getItem("sessions"))):t.$.getJSON("https://cmprod-speakers.azurewebsites.net/api/sessionsdata").done(e).fail(s)}).then(function(e){return localStorage.getItem("sessions")||localStorage.setItem("sessions",JSON.stringify(e)),e}).then(function(s){switch(e.type){case"kidzmash":return console.log("kidzmash"),s.filter(function(e){return"Kidz Mash"===e.SessionType});case"codemash":return console.log("codemash"),s.filter(function(e){return"CodeMash Schedule Item"===e.SessionType});default:return console.log("sessions"),s.filter(function(e){return"Kidz Mash"!==e.SessionType&&"CodeMash Schedule Item"!==e.SessionType})}})},actions:{refreshSessions:function(){localStorage.removeItem("sessions"),this.refresh()}}})}),define("mashplan/routes/plan/sessions-by-time",["ember","exports"],function(e,s){"use strict";var t=e["default"];s["default"]=t.Route.extend({model:function(e){return{time:e.time,sessions:this.modelFor("plan")}}})}),define("mashplan/routes/plan/sessions-by-time/session",["ember","exports"],function(e,s){"use strict";var t=e["default"];s["default"]=t.Route.extend({model:function(e){return this.modelFor("plan").find(function(s){return s.Id.toString()===e.Id})}})}),define("mashplan/templates/application",["ember","exports"],function(e,s){"use strict";var t=e["default"];s["default"]=t.Handlebars.template(function(e,s,n,a,o){function r(e,s){s.buffer.push("CodeMash Sessions")}function i(e,s){s.buffer.push("CodeMash Schedule Items")}function h(e,s){s.buffer.push("Kidz Mash")}function l(e,s){s.buffer.push("Map")}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,t.Handlebars.helpers),o=o||{};var u,p,f,m="",c=n.helperMissing,d=this;return o.buffer.push('<h2 id=\'title\'>Mashplan</h2>\n<a href="https://github.com/jimmay5469/mashplan"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/652c5b9acfaddf3a9c326fa6bde407b87f7be0f4/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6f72616e67655f6666373630302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png"></a>\n\n<ul>\n  <li>'),p=n["query-params"]||s&&s["query-params"],f={hash:{type:"sessions"},hashTypes:{type:"STRING"},hashContexts:{type:s},contexts:[],types:[],data:o},u=p?p.call(s,f):c.call(s,"query-params",f),p=n["link-to"]||s&&s["link-to"],f={hash:{},hashTypes:{},hashContexts:{},inverse:d.noop,fn:d.program(1,r,o),contexts:[s,s],types:["STRING","sexpr"],data:o},u=p?p.call(s,"plan",u,f):c.call(s,"link-to","plan",u,f),(u||0===u)&&o.buffer.push(u),o.buffer.push("</li>\n  <li>"),p=n["query-params"]||s&&s["query-params"],f={hash:{type:"codemash"},hashTypes:{type:"STRING"},hashContexts:{type:s},contexts:[],types:[],data:o},u=p?p.call(s,f):c.call(s,"query-params",f),p=n["link-to"]||s&&s["link-to"],f={hash:{},hashTypes:{},hashContexts:{},inverse:d.noop,fn:d.program(3,i,o),contexts:[s,s],types:["STRING","sexpr"],data:o},u=p?p.call(s,"plan",u,f):c.call(s,"link-to","plan",u,f),(u||0===u)&&o.buffer.push(u),o.buffer.push("</li>\n  <li>"),p=n["query-params"]||s&&s["query-params"],f={hash:{type:"kidzmash"},hashTypes:{type:"STRING"},hashContexts:{type:s},contexts:[],types:[],data:o},u=p?p.call(s,f):c.call(s,"query-params",f),p=n["link-to"]||s&&s["link-to"],f={hash:{},hashTypes:{},hashContexts:{},inverse:d.noop,fn:d.program(5,h,o),contexts:[s,s],types:["STRING","sexpr"],data:o},u=p?p.call(s,"plan",u,f):c.call(s,"link-to","plan",u,f),(u||0===u)&&o.buffer.push(u),o.buffer.push("</li>\n  <li>"),p=n["link-to"]||s&&s["link-to"],f={hash:{},hashTypes:{},hashContexts:{},inverse:d.noop,fn:d.program(7,l,o),contexts:[s],types:["STRING"],data:o},u=p?p.call(s,"map",f):c.call(s,"link-to","map",f),(u||0===u)&&o.buffer.push(u),o.buffer.push("</li>\n</ul>\n\n"),u=n._triageMustache.call(s,"outlet",{hash:{},hashTypes:{},hashContexts:{},contexts:[s],types:["ID"],data:o}),(u||0===u)&&o.buffer.push(u),o.buffer.push("\n"),m})}),define("mashplan/templates/loading",["ember","exports"],function(e,s){"use strict";var t=e["default"];s["default"]=t.Handlebars.template(function(e,s,n,a,o){this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,t.Handlebars.helpers),o=o||{},o.buffer.push("Loading...\n")})}),define("mashplan/templates/map",["ember","exports"],function(e,s){"use strict";var t=e["default"];s["default"]=t.Handlebars.template(function(e,s,n,a,o){this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,t.Handlebars.helpers),o=o||{},o.buffer.push("<div class='map'>\n  <h3>Map</h3>\n  <img src='KalahariFloorplan-8067da4c7e9716d968a911d6d5ac8d3b.png' />\n</div>\n")})}),define("mashplan/templates/plan",["ember","exports"],function(e,s){"use strict";var t=e["default"];s["default"]=t.Handlebars.template(function(e,s,n,a,o){function r(e,s){var t,a="";return s.buffer.push("\n    <li>\n      "),t=n["if"].call(e,"isSessionView",{hash:{},hashTypes:{},hashContexts:{},inverse:b.program(6,u,s),fn:b.program(2,i,s),contexts:[e],types:["ID"],data:s}),(t||0===t)&&s.buffer.push(t),s.buffer.push("\n    </li>\n  "),a}function i(e,s){var t,a,o,r="";return s.buffer.push("\n        "),s.buffer.push(d((a=n["moment-weekday"]||e&&e["moment-weekday"],o={hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:s},a?a.call(e,"group.key",o):c.call(e,"moment-weekday","group.key",o)))),s.buffer.push("\n        <ul>\n        "),t=n.each.call(e,"item","in","group.values",{hash:{},hashTypes:{},hashContexts:{},inverse:b.noop,fn:b.program(3,h,s),contexts:[e,e,e],types:["ID","ID","ID"],data:s}),(t||0===t)&&s.buffer.push(t),s.buffer.push("\n        </ul>\n      "),r}function h(e,s){var t,a,o,r="";return s.buffer.push("\n          <li>"),a=n["link-to"]||e&&e["link-to"],o={hash:{},hashTypes:{},hashContexts:{},inverse:b.noop,fn:b.program(4,l,s),contexts:[e,e],types:["STRING","ID"],data:s},t=a?a.call(e,"plan.sessions-by-time","item",o):c.call(e,"link-to","plan.sessions-by-time","item",o),(t||0===t)&&s.buffer.push(t),s.buffer.push("</li>\n        "),r}function l(e,s){var t,a;s.buffer.push(d((t=n["moment-time"]||e&&e["moment-time"],a={hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:s},t?t.call(e,"item",a):c.call(e,"moment-time","item",a))))}function u(e,s){var t,a,o,r="";return s.buffer.push("\n        "),a=n["link-to"]||e&&e["link-to"],o={hash:{},hashTypes:{},hashContexts:{},inverse:b.noop,fn:b.program(7,p,s),contexts:[e,e],types:["STRING","ID"],data:s},t=a?a.call(e,"plan.sessions-by-time","group.key",o):c.call(e,"link-to","plan.sessions-by-time","group.key",o),(t||0===t)&&s.buffer.push(t),s.buffer.push("\n      "),r}function p(e,s){var t,a;s.buffer.push(d((t=n["moment-weekday"]||e&&e["moment-weekday"],a={hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:s},t?t.call(e,"group.key",a):c.call(e,"moment-weekday","group.key",a))))}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,t.Handlebars.helpers),o=o||{};var f,m="",c=n.helperMissing,d=this.escapeExpression,b=this;return o.buffer.push("<div class='plan'>\n  <h3>Schedule</h3>\n\n  <ul>\n  "),f=n.each.call(s,"group","in","groupedSessionTimes",{hash:{},hashTypes:{},hashContexts:{},inverse:b.noop,fn:b.program(1,r,o),contexts:[s,s,s],types:["ID","ID","ID"],data:o}),(f||0===f)&&o.buffer.push(f),o.buffer.push("\n  </ul>\n\n  <button "),o.buffer.push(d(n.action.call(s,"refreshSessions",{hash:{},hashTypes:{},hashContexts:{},contexts:[s],types:["STRING"],data:o}))),o.buffer.push(">Refresh Schedule</button>\n</div>\n\n"),f=n._triageMustache.call(s,"outlet",{hash:{},hashTypes:{},hashContexts:{},contexts:[s],types:["ID"],data:o}),(f||0===f)&&o.buffer.push(f),o.buffer.push("\n"),m})}),define("mashplan/templates/plan/sessions-by-time",["ember","exports"],function(e,s){"use strict";var t=e["default"];s["default"]=t.Handlebars.template(function(e,s,n,a,o){function r(e,s){var t,a,o,r="";return s.buffer.push("\n    <h3>\n      "),s.buffer.push(b((a=n["moment-weekday"]||e&&e["moment-weekday"],o={hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:s},a?a.call(e,"sessionStartTime",o):d.call(e,"moment-weekday","sessionStartTime",o)))),s.buffer.push(": "),s.buffer.push(b((a=n["moment-time"]||e&&e["moment-time"],o={hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:s},a?a.call(e,"sessionStartTime",o):d.call(e,"moment-time","sessionStartTime",o)))),s.buffer.push("\n    </h3>\n\n    <ul>\n    "),t=n.each.call(e,"session","in","filteredModel",{hash:{},hashTypes:{},hashContexts:{},inverse:c.noop,fn:c.program(2,i,s),contexts:[e,e,e],types:["ID","ID","ID"],data:s}),(t||0===t)&&s.buffer.push(t),s.buffer.push("\n    </ul>\n  "),r}function i(e,s){var t,a,o,r="";return s.buffer.push("\n      <li>\n        "),a=n["link-to"]||e&&e["link-to"],o={hash:{},hashTypes:{},hashContexts:{},inverse:c.noop,fn:c.program(3,h,s),contexts:[e,e],types:["STRING","ID"],data:s},t=a?a.call(e,"plan.sessions-by-time.session","session",o):d.call(e,"link-to","plan.sessions-by-time.session","session",o),(t||0===t)&&s.buffer.push(t),s.buffer.push("\n        <ul class='inline-list'>\n          "),t=n.each.call(e,"speaker","in","session.Speakers",{hash:{},hashTypes:{},hashContexts:{},inverse:c.noop,fn:c.program(5,l,s),contexts:[e,e,e],types:["ID","ID","ID"],data:s}),(t||0===t)&&s.buffer.push(t),s.buffer.push("\n        </ul>\n      </li>\n    "),r}function h(e,s){var t;t=n._triageMustache.call(e,"session.Title",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:s}),s.buffer.push(t||0===t?t:"")}function l(e,s){var t,a="";return s.buffer.push("\n            <li>"),t=n._triageMustache.call(e,"speaker.FirstName",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:s}),(t||0===t)&&s.buffer.push(t),s.buffer.push(" "),t=n._triageMustache.call(e,"speaker.LastName",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:s}),(t||0===t)&&s.buffer.push(t),s.buffer.push("</li>\n          "),a}function u(e,s){var t,a,o,r="";return s.buffer.push("\n    <h3>\n      "),s.buffer.push(b((a=n["moment-weekday"]||e&&e["moment-weekday"],o={hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:s},a?a.call(e,"sessionStartTime",o):d.call(e,"moment-weekday","sessionStartTime",o)))),s.buffer.push("\n    </h3>\n\n    <ul>\n    "),t=n.each.call(e,"session","in","filteredModel",{hash:{},hashTypes:{},hashContexts:{},inverse:c.noop,fn:c.program(8,p,s),contexts:[e,e,e],types:["ID","ID","ID"],data:s}),(t||0===t)&&s.buffer.push(t),s.buffer.push("\n    </ul>\n  "),r}function p(e,s){var t,a,o,r="";return s.buffer.push("\n      <li>\n        "),s.buffer.push(b((a=n["moment-time"]||e&&e["moment-time"],o={hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:s},a?a.call(e,"session.SessionStartTime",o):d.call(e,"moment-time","session.SessionStartTime",o)))),s.buffer.push("-"),s.buffer.push(b((a=n["moment-time"]||e&&e["moment-time"],o={hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:s},a?a.call(e,"session.SessionEndTime",o):d.call(e,"moment-time","session.SessionEndTime",o)))),s.buffer.push(":\n        "),a=n["link-to"]||e&&e["link-to"],o={hash:{},hashTypes:{},hashContexts:{},inverse:c.noop,fn:c.program(3,h,s),contexts:[e,e],types:["STRING","ID"],data:s},t=a?a.call(e,"plan.sessions-by-time.session","session",o):d.call(e,"link-to","plan.sessions-by-time.session","session",o),(t||0===t)&&s.buffer.push(t),s.buffer.push("\n      </li>\n    "),r}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,t.Handlebars.helpers),o=o||{};var f,m="",c=this,d=n.helperMissing,b=this.escapeExpression;return o.buffer.push("<div class='sessions'>\n  "),f=n["if"].call(s,"isSessionView",{hash:{},hashTypes:{},hashContexts:{},inverse:c.program(7,u,o),fn:c.program(1,r,o),contexts:[s],types:["ID"],data:o}),(f||0===f)&&o.buffer.push(f),o.buffer.push("\n\n  "),f=n._triageMustache.call(s,"outlet",{hash:{},hashTypes:{},hashContexts:{},contexts:[s],types:["ID"],data:o}),(f||0===f)&&o.buffer.push(f),o.buffer.push("\n</div>\n"),m})}),define("mashplan/templates/plan/sessions-by-time/session",["ember","exports"],function(e,s){"use strict";var t=e["default"];s["default"]=t.Handlebars.template(function(e,s,n,a,o){function r(e,s){var t,a="";return s.buffer.push("\n        <li>"),t=n._triageMustache.call(e,"room",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:s}),(t||0===t)&&s.buffer.push(t),s.buffer.push("</li>\n      "),a}function i(e,s){var t,a="";return s.buffer.push("\n        <li>"),t=n._triageMustache.call(e,"tag",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:s}),(t||0===t)&&s.buffer.push(t),s.buffer.push("</li>\n      "),a}function h(e,s){var t,a="";return s.buffer.push("\n        <li>"),t=n._triageMustache.call(e,"speaker.FirstName",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:s}),(t||0===t)&&s.buffer.push(t),s.buffer.push(" "),t=n._triageMustache.call(e,"speaker.LastName",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:s}),(t||0===t)&&s.buffer.push(t),s.buffer.push("</li>\n      "),a}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,t.Handlebars.helpers),o=o||{};var l,u,p,f="",m=n.helperMissing,c=this.escapeExpression,d=this;return o.buffer.push("<div class='session'>\n  <h3>"),l=n._triageMustache.call(s,"model.Title",{hash:{},hashTypes:{},hashContexts:{},contexts:[s],types:["ID"],data:o}),(l||0===l)&&o.buffer.push(l),o.buffer.push("</h3>\n\n  <div>\n    <strong>Day: </strong>\n    "),o.buffer.push(c((u=n["moment-weekday"]||s&&s["moment-weekday"],p={hash:{},hashTypes:{},hashContexts:{},contexts:[s],types:["ID"],data:o},u?u.call(s,"model.SessionStartTime",p):m.call(s,"moment-weekday","model.SessionStartTime",p)))),o.buffer.push("\n  </div>\n  <div>\n    <strong>Time: </strong>\n    "),o.buffer.push(c((u=n["moment-time"]||s&&s["moment-time"],p={hash:{},hashTypes:{},hashContexts:{},contexts:[s],types:["ID"],data:o},u?u.call(s,"model.SessionStartTime",p):m.call(s,"moment-time","model.SessionStartTime",p)))),o.buffer.push("-"),o.buffer.push(c((u=n["moment-time"]||s&&s["moment-time"],p={hash:{},hashTypes:{},hashContexts:{},contexts:[s],types:["ID"],data:o},u?u.call(s,"model.SessionEndTime",p):m.call(s,"moment-time","model.SessionEndTime",p)))),o.buffer.push("\n  </div>\n  <div>\n    <strong>Room: </strong>\n    <ul class='inline-list rooms'>\n      "),l=n.each.call(s,"room","in","model.Rooms",{hash:{},hashTypes:{},hashContexts:{},inverse:d.noop,fn:d.program(1,r,o),contexts:[s,s,s],types:["ID","ID","ID"],data:o}),(l||0===l)&&o.buffer.push(l),o.buffer.push("\n    </ul>\n  </div>\n  <div>\n    <strong>Tags: </strong>\n    <ul class='inline-list'>\n      "),l=n.each.call(s,"tag","in","model.Tags",{hash:{},hashTypes:{},hashContexts:{},inverse:d.noop,fn:d.program(3,i,o),contexts:[s,s,s],types:["ID","ID","ID"],data:o}),(l||0===l)&&o.buffer.push(l),o.buffer.push("\n    </ul>\n  </div>\n  <div>\n    <strong>Speakers: </strong>\n    <ul class='inline-list'>\n      "),l=n.each.call(s,"speaker","in","model.Speakers",{hash:{},hashTypes:{},hashContexts:{},inverse:d.noop,fn:d.program(5,h,o),contexts:[s,s,s],types:["ID","ID","ID"],data:o}),(l||0===l)&&o.buffer.push(l),o.buffer.push("\n    </ul>\n  </div>\n  <div>"),l=n._triageMustache.call(s,"model.Abstract",{hash:{},hashTypes:{},hashContexts:{},contexts:[s],types:["ID"],data:o}),(l||0===l)&&o.buffer.push(l),o.buffer.push("</div>\n</div>\n"),f})}),define("mashplan/views/plan/sessions-by-time",["ember","exports"],function(e,s){"use strict";var t=e["default"];s["default"]=t.View.extend({didInsertElement:function(){this.scrollHere()},scrollHere:function(){this.$()&&(window.$("html, body").is(":animated")||window.$("html, body").animate({scrollTop:this.$().offset().top},1e3))}.observes("controller.model")})}),define("mashplan/views/plan/sessions-by-time/session",["ember","exports"],function(e,s){"use strict";var t=e["default"];s["default"]=t.View.extend({didInsertElement:function(){this.scrollHere()},scrollHere:function(){this.$()&&window.$("html, body").animate({scrollTop:this.$().offset().top},1e3)}.observes("controller.model")})}),define("mashplan/config/environment",["ember"],function(e){var s="mashplan";try{var t=s+"/config/environment",n=e["default"].$('meta[name="'+t+'"]').attr("content"),a=JSON.parse(unescape(n));return{"default":a}}catch(o){throw new Error('Could not read config from meta tag with name "'+t+'".')}}),runningTests?require("mashplan/tests/test-helper"):require("mashplan/app")["default"].create({});