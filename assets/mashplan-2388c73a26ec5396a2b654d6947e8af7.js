define("mashplan/app",["ember","ember/resolver","ember/load-initializers","mashplan/config/environment","exports"],function(e,s,t,n,a){"use strict";var r=e["default"],o=s["default"],i=t["default"],h=n["default"];r.MODEL_FACTORY_INJECTIONS=!0;var u=r.Application.extend({modulePrefix:h.modulePrefix,podModulePrefix:h.podModulePrefix,Resolver:o});i(u,h.modulePrefix),a["default"]=u}),define("mashplan/controllers/plan",["ember","exports"],function(e,s){"use strict";var t=e["default"];s["default"]=t.ArrayController.extend({sessionTimes:t.computed.map("model",function(e){return e.SessionStartTime}),uniqueSessionTimes:t.computed.uniq("sessionTimes"),groupedSessionTimes:function(){var e=this.get("uniqueSessionTimes").reduce(function(e,s){var t=moment(s).startOf("day");return e[t]?e[t].push(s):e[t]=[s],e},{});return Object.keys(e).map(function(s){return{key:s,values:e[s]}})}.property("uniqueSessionTimes")})}),define("mashplan/controllers/plan/sessions-by-time",["ember","exports"],function(e,s){"use strict";var t=e["default"];s["default"]=t.ArrayController.extend({SessionStartTime:function(){var e=this.get("model");return e.length?e[0].SessionStartTime:null}.property("model")})}),define("mashplan/helpers/moment-time",["ember","exports"],function(e,s){"use strict";var t=e["default"];s["default"]=t.Handlebars.makeBoundHelper(function(e){return moment(e).format("LT")})}),define("mashplan/helpers/moment-weekday",["ember","exports"],function(e,s){"use strict";var t=e["default"];s["default"]=t.Handlebars.makeBoundHelper(function(e){return moment(e).format("dddd")})}),define("mashplan/initializers/export-application-global",["ember","mashplan/config/environment","exports"],function(e,s,t){"use strict";function n(e,s){var t=a.String.classify(r.modulePrefix);r.exportApplicationGlobal&&(window[t]=s)}var a=e["default"],r=s["default"];t.initialize=n,t["default"]={name:"export-application-global",initialize:n}}),define("mashplan/router",["ember","mashplan/config/environment","exports"],function(e,s,t){"use strict";var n=e["default"],a=s["default"],r=n.Router.extend({location:a.locationType});r.map(function(){this.route("plan",{path:"/"},function(){this.route("sessions-by-time",{path:"/:time"},function(){this.route("session",{path:"/:Id"})})})}),t["default"]=r}),define("mashplan/routes/plan",["ember","exports"],function(e,s){"use strict";var t=e["default"];s["default"]=t.Route.extend({model:function(){return new t.RSVP.Promise(function(e,s){t.$.getJSON("https://cmprod-speakers.azurewebsites.net/api/sessionsdata").done(e).fail(s)}).then(function(e){return e.filter(function(e){return"Kidz Mash"!==e.SessionType})})}})}),define("mashplan/routes/plan/sessions-by-time",["ember","exports"],function(e,s){"use strict";var t=e["default"];s["default"]=t.Route.extend({model:function(e){return this.modelFor("plan").filter(function(s){return s.SessionStartTime===e.time})}})}),define("mashplan/routes/plan/sessions-by-time/session",["ember","exports"],function(e,s){"use strict";var t=e["default"];s["default"]=t.Route.extend({model:function(e){return this.modelFor("plan.sessions-by-time").find(function(s){return s.Id.toString()===e.Id})}})}),define("mashplan/templates/application",["ember","exports"],function(e,s){"use strict";var t=e["default"];s["default"]=t.Handlebars.template(function(e,s,n,a,r){this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,t.Handlebars.helpers),r=r||{};var o,i="";return r.buffer.push('<h2 id=\'title\'>Mashplan</h2>\n<a href="https://github.com/jimmay5469/mashplan"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/652c5b9acfaddf3a9c326fa6bde407b87f7be0f4/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6f72616e67655f6666373630302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png"></a>\n\n'),o=n._triageMustache.call(s,"outlet",{hash:{},hashTypes:{},hashContexts:{},contexts:[s],types:["ID"],data:r}),(o||0===o)&&r.buffer.push(o),r.buffer.push("\n"),i})}),define("mashplan/templates/loading",["ember","exports"],function(e,s){"use strict";var t=e["default"];s["default"]=t.Handlebars.template(function(e,s,n,a,r){this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,t.Handlebars.helpers),r=r||{},r.buffer.push("Loading...\n")})}),define("mashplan/templates/plan",["ember","exports"],function(e,s){"use strict";var t=e["default"];s["default"]=t.Handlebars.template(function(e,s,n,a,r){function o(e,s){var t,a,r,o="";return s.buffer.push("\n    <li>\n      "),s.buffer.push(p((a=n["moment-weekday"]||e&&e["moment-weekday"],r={hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:s},a?a.call(e,"group.key",r):f.call(e,"moment-weekday","group.key",r)))),s.buffer.push("\n      <ul>\n      "),t=n.each.call(e,"item","in","group.values",{hash:{},hashTypes:{},hashContexts:{},inverse:m.noop,fn:m.program(2,i,s),contexts:[e,e,e],types:["ID","ID","ID"],data:s}),(t||0===t)&&s.buffer.push(t),s.buffer.push("\n      </ul>\n    </li>\n  "),o}function i(e,s){var t,a,r,o="";return s.buffer.push("\n        <li>"),a=n["link-to"]||e&&e["link-to"],r={hash:{},hashTypes:{},hashContexts:{},inverse:m.noop,fn:m.program(3,h,s),contexts:[e,e],types:["STRING","ID"],data:s},t=a?a.call(e,"plan.sessions-by-time","item",r):f.call(e,"link-to","plan.sessions-by-time","item",r),(t||0===t)&&s.buffer.push(t),s.buffer.push("</li>\n      "),o}function h(e,s){var t,a;s.buffer.push(p((t=n["moment-time"]||e&&e["moment-time"],a={hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:s},t?t.call(e,"item",a):f.call(e,"moment-time","item",a))))}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,t.Handlebars.helpers),r=r||{};var u,l="",f=n.helperMissing,p=this.escapeExpression,m=this;return r.buffer.push("<div class='plan'>\n  <h3>Schedule</h3>\n\n  <ul>\n  "),u=n.each.call(s,"group","in","groupedSessionTimes",{hash:{},hashTypes:{},hashContexts:{},inverse:m.noop,fn:m.program(1,o,r),contexts:[s,s,s],types:["ID","ID","ID"],data:r}),(u||0===u)&&r.buffer.push(u),r.buffer.push("\n  </ul>\n</div>\n\n"),u=n._triageMustache.call(s,"outlet",{hash:{},hashTypes:{},hashContexts:{},contexts:[s],types:["ID"],data:r}),(u||0===u)&&r.buffer.push(u),r.buffer.push("\n"),l})}),define("mashplan/templates/plan/sessions-by-time",["ember","exports"],function(e,s){"use strict";var t=e["default"];s["default"]=t.Handlebars.template(function(e,s,n,a,r){function o(e,s){var t,a,r,o="";return s.buffer.push("\n    <li>\n      "),a=n["link-to"]||e&&e["link-to"],r={hash:{},hashTypes:{},hashContexts:{},inverse:m.noop,fn:m.program(2,i,s),contexts:[e,e],types:["STRING","ID"],data:s},t=a?a.call(e,"plan.sessions-by-time.session","session",r):d.call(e,"link-to","plan.sessions-by-time.session","session",r),(t||0===t)&&s.buffer.push(t),s.buffer.push("\n    "),t=n.each.call(e,"speaker","in","session.Speakers",{hash:{},hashTypes:{},hashContexts:{},inverse:m.noop,fn:m.program(4,h,s),contexts:[e,e,e],types:["ID","ID","ID"],data:s}),(t||0===t)&&s.buffer.push(t),s.buffer.push("\n    </li>\n  "),o}function i(e,s){var t;t=n._triageMustache.call(e,"session.Title",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:s}),s.buffer.push(t||0===t?t:"")}function h(e,s){var t,a="";return s.buffer.push("\n      "),t=n._triageMustache.call(e,"speaker.FirstName",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:s}),(t||0===t)&&s.buffer.push(t),s.buffer.push(" "),t=n._triageMustache.call(e,"speaker.LastName",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:s}),(t||0===t)&&s.buffer.push(t),s.buffer.push(", \n    "),a}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,t.Handlebars.helpers),r=r||{};var u,l,f,p="",m=this,d=n.helperMissing,c=this.escapeExpression;return r.buffer.push("<div class='sessions'>\n  <h3>\n    "),r.buffer.push(c((l=n["moment-weekday"]||s&&s["moment-weekday"],f={hash:{},hashTypes:{},hashContexts:{},contexts:[s],types:["ID"],data:r},l?l.call(s,"SessionStartTime",f):d.call(s,"moment-weekday","SessionStartTime",f)))),r.buffer.push(" - "),r.buffer.push(c((l=n["moment-time"]||s&&s["moment-time"],f={hash:{},hashTypes:{},hashContexts:{},contexts:[s],types:["ID"],data:r},l?l.call(s,"SessionStartTime",f):d.call(s,"moment-time","SessionStartTime",f)))),r.buffer.push(" Sessions\n  </h3>\n\n  <ul>\n  "),u=n.each.call(s,"session","in","model",{hash:{},hashTypes:{},hashContexts:{},inverse:m.noop,fn:m.program(1,o,r),contexts:[s,s,s],types:["ID","ID","ID"],data:r}),(u||0===u)&&r.buffer.push(u),r.buffer.push("\n  </ul>\n\n  "),u=n._triageMustache.call(s,"outlet",{hash:{},hashTypes:{},hashContexts:{},contexts:[s],types:["ID"],data:r}),(u||0===u)&&r.buffer.push(u),r.buffer.push("\n</div>\n"),p})}),define("mashplan/templates/plan/sessions-by-time/session",["ember","exports"],function(e,s){"use strict";var t=e["default"];s["default"]=t.Handlebars.template(function(e,s,n,a,r){function o(e,s){var t,a="";return s.buffer.push("\n      "),t=n._triageMustache.call(e,"room",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:s}),(t||0===t)&&s.buffer.push(t),s.buffer.push(", \n    "),a}function i(e,s){var t,a="";return s.buffer.push("\n      "),t=n._triageMustache.call(e,"tag",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:s}),(t||0===t)&&s.buffer.push(t),s.buffer.push(", \n    "),a}function h(e,s){var t,a="";return s.buffer.push("\n      "),t=n._triageMustache.call(e,"speaker.FirstName",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:s}),(t||0===t)&&s.buffer.push(t),s.buffer.push(" "),t=n._triageMustache.call(e,"speaker.LastName",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:s}),(t||0===t)&&s.buffer.push(t),s.buffer.push(", \n    "),a}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,t.Handlebars.helpers),r=r||{};var u,l,f,p="",m=n.helperMissing,d=this.escapeExpression,c=this;return r.buffer.push("<div class='session'>\n  <h3>"),u=n._triageMustache.call(s,"model.Title",{hash:{},hashTypes:{},hashContexts:{},contexts:[s],types:["ID"],data:r}),(u||0===u)&&r.buffer.push(u),r.buffer.push("</h3>\n\n  <div>\n    <strong>Day: </strong>\n    "),r.buffer.push(d((l=n["moment-weekday"]||s&&s["moment-weekday"],f={hash:{},hashTypes:{},hashContexts:{},contexts:[s],types:["ID"],data:r},l?l.call(s,"model.SessionStartTime",f):m.call(s,"moment-weekday","model.SessionStartTime",f)))),r.buffer.push("\n  </div>\n  <div>\n    <strong>Time: </strong>\n    "),r.buffer.push(d((l=n["moment-time"]||s&&s["moment-time"],f={hash:{},hashTypes:{},hashContexts:{},contexts:[s],types:["ID"],data:r},l?l.call(s,"model.SessionStartTime",f):m.call(s,"moment-time","model.SessionStartTime",f)))),r.buffer.push(" - "),r.buffer.push(d((l=n["moment-time"]||s&&s["moment-time"],f={hash:{},hashTypes:{},hashContexts:{},contexts:[s],types:["ID"],data:r},l?l.call(s,"model.SessionEndTime",f):m.call(s,"moment-time","model.SessionEndTime",f)))),r.buffer.push("\n  </div>\n  <div>\n    <strong>Rooms: </strong>\n    "),u=n.each.call(s,"room","in","model.Rooms",{hash:{},hashTypes:{},hashContexts:{},inverse:c.noop,fn:c.program(1,o,r),contexts:[s,s,s],types:["ID","ID","ID"],data:r}),(u||0===u)&&r.buffer.push(u),r.buffer.push("\n  </div>\n  <div>\n    <strong>Tags: </strong>\n    "),u=n.each.call(s,"tag","in","model.Tags",{hash:{},hashTypes:{},hashContexts:{},inverse:c.noop,fn:c.program(3,i,r),contexts:[s,s,s],types:["ID","ID","ID"],data:r}),(u||0===u)&&r.buffer.push(u),r.buffer.push("\n  </div>\n  <div>\n    <strong>Speakers: </strong>\n    "),u=n.each.call(s,"speaker","in","model.Speakers",{hash:{},hashTypes:{},hashContexts:{},inverse:c.noop,fn:c.program(5,h,r),contexts:[s,s,s],types:["ID","ID","ID"],data:r}),(u||0===u)&&r.buffer.push(u),r.buffer.push("\n  </div>\n  <div>"),u=n._triageMustache.call(s,"model.Abstract",{hash:{},hashTypes:{},hashContexts:{},contexts:[s],types:["ID"],data:r}),(u||0===u)&&r.buffer.push(u),r.buffer.push("</div>\n</div>\n"),p})}),define("mashplan/views/plan/sessions-by-time",["ember","exports"],function(e,s){"use strict";var t=e["default"];s["default"]=t.View.extend({didInsertElement:function(){this.scrollHere()},scrollHere:function(){this.$()&&(window.$("html, body").is(":animated")||window.$("html, body").animate({scrollTop:this.$().offset().top},300))}.observes("controller.model")})}),define("mashplan/views/plan/sessions-by-time/session",["ember","exports"],function(e,s){"use strict";var t=e["default"];s["default"]=t.View.extend({didInsertElement:function(){this.scrollHere()},scrollHere:function(){this.$()&&window.$("html, body").animate({scrollTop:this.$().offset().top},300)}.observes("controller.model")})}),define("mashplan/config/environment",["ember"],function(e){var s="mashplan";try{var t=s+"/config/environment",n=e["default"].$('meta[name="'+t+'"]').attr("content"),a=JSON.parse(unescape(n));return{"default":a}}catch(r){throw new Error('Could not read config from meta tag with name "'+t+'".')}}),runningTests?require("mashplan/tests/test-helper"):require("mashplan/app")["default"].create({});