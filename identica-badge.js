// identica badge -- updated to work with the native API, 12-4-2008
// copyright Kent Brewster 2008
// see http://kentbrewster.com/identica-badge for info
// Adapted to only show own status notices by Remko Tronçon
( function() { 
   var trueName = '';
   for (var i = 0; i < 16; i++) { 
      trueName += String.fromCharCode(Math.floor(Math.random() * 26) + 97); 
   }
   window[trueName] = {};
   var $ = window[trueName];
   $.f = function() {
      return { 
         runFunction : [],
         init : function(target) {
            var theScripts = document.getElementsByTagName('SCRIPT');
            for (var i = 0; i < theScripts.length; i++) {
               if (theScripts[i].src.match(target)) {
                  $.a = {};
                  if (theScripts[i].innerHTML) {
                     $.a = $.f.parseJson(theScripts[i].innerHTML);
                  }
                  if ($.a.err) {
                     alert('bad json!');
                  }
                  $.f.loadDefaults();
                  $.f.buildStructure();
                  $.f.buildPresentation();
                  theScripts[i].parentNode.insertBefore($.s, theScripts[i]);
                  theScripts[i].parentNode.removeChild(theScripts[i]);
                  break;
               }
            }         
         },
         parseJson : function(json) {
            this.parseJson.data = json;
            if ( typeof json !== 'string') {
               return {"err":"trying to parse a non-string JSON object"};
            }
            try {
               var f = Function(['var document,top,self,window,parent,Number,Date,Object,Function,',
                  'Array,String,Math,RegExp,Image,ActiveXObject;',
                  'return (' , json.replace(/<\!--.+-->/gim,'').replace(/\bfunction\b/g,'function&shy;') , ');'].join(''));
               return f();
            } catch (e) {
               return {"err":"trouble parsing JSON object"};
            }
         },
         loadDefaults : function() {
            $.d = { 
               "user":"7000",
               "headerText" : "",
               "height" : 350,
               "width" : 300,
               "background" : "#193441",
               "border" : "1px solid black",
               "userFontSize" : "inherit",
               "userColor" : "inherit",
               "headerBackground" : "transparent", 
               "headerColor" : "white",
               "evenBackground" : "#fff",
               "oddBackground" : "#eee",
               "thumbnailBorder" : "1px solid black",
               "thumbnailSize" : 24,
               "padding" : 3,
               "server" : "identi.ca"
            };
            for (var k in $.d) { if ($.a[k] === undefined) { $.a[k] = $.d[k]; } }
         },
          buildPresentation : function () {
            var ns = document.createElement('style');
            document.getElementsByTagName('head')[0].appendChild(ns);
            if (!window.createPopup) {
               ns.appendChild(document.createTextNode(''));
               ns.setAttribute("type", "text/css");
            }
            var s = document.styleSheets[document.styleSheets.length - 1];
            var rules = {
               "" : "{zoom:1;margin:0;padding:0;width:" + $.a.width + "px;background:" + $.a.background + ";border:" + $.a.border + ";font:11px/1.2em tahoma, veranda, arial, helvetica, clean, sans-serif;*font-size:small;*font:x-small;}",
               "a" : "{cursor:pointer;text-decoration:none;}",
               "a:hover" : "{text-decoration:underline;}",
               "cite" : "{font-weight:bold;margin:0 0 0 4px;padding:0;display:block;font-style:normal;line-height:" + ($.a.thumbnailSize/2) + "px;}",
               "cite a" : "{color:#C15D42;}",
               "date":"{font-size:80%;margin:0 0 0 0;text-align:right;padding:0;display:block;font-style:normal;line-height:" + ($.a.thumbnailSize/2) + "px;}",
               "date:after" : "{clear:both; content:\".\"; display:block; height:0; visibility:hidden; }",
               "date a" : "{color:#676;}",
               "h3" : "{margin:0;padding:" + $.a.padding + "px;font-weight:bold;background:" + $.a.headerBackground + " url('http://" + $.a.server + "/favicon.ico') " + $.a.padding + "px 50% no-repeat;text-indent:" + ($.a.padding + 16) + "px;}",
               "h3.loading" : "{background-image:url('http://l.yimg.com/us.yimg.com/i/us/my/mw/anim_loading_sm.gif');}",
               "h3 a" : "{font-size:92%; color:" + $.a.headerColor + ";}",
               "h4" : "{font-weight:normal; background:" + $.a.headerBackground + ";text-align:right;margin:0;padding:" + $.a.padding + "px;}",
               "h4 a" : "{font-size:92%; color:" + $.a.headerColor + ";}",
               "img":"{float:left; height:" + $.a.thumbnailSize + "px;width:" + $.a.thumbnailSize + "px;border:" + $.a.thumbnailBorder + ";margin-right:" + $.a.padding + "px;}",
               "p" : "{margin:0; padding:0;width:" + ($.a.width - 22) + "px;overflow:hidden;font-size:87%;}",
               "p a" : "{color:#C15D42;}",
               "ul":"{margin:0; padding:0; height:" + $.a.height + "px;width:" + $.a.width + "px;overflow:auto;}",
               "ul li":"{background:" + $.a.evenBackground + ";margin:0;padding:" + $.a.padding + "px;list-style:none;width:" + ($.a.width - 22) + "px;overflow:hidden;border-bottom:1px solid #D8E2D7;}",
               "ul li:hover":"{background:#f3f8ea;}"
            };
            var ieRules = "";
            // brute-force each and every style rule here to !important
            // sometimes you have to take off and nuke the site from orbit; it's the only way to be sure
            for (var z in rules) {
               var selector = '.' + trueName + ' ' + z;
               var rule = rules[z];
               if (typeof rule === 'string') {
                  var important = rule.replace(/;/gi, '!important;');
                  if (!window.createPopup) {
                     var theRule = document.createTextNode(selector + important);
                     ns.appendChild(theRule);
                  } else {
                     ieRules += selector + important;
                  }
               }
            }
            if (window.createPopup) { s.cssText = ieRules; }
         },
         buildStructure : function() {
            $.s = document.createElement('DIV');
            $.s.className = trueName;         
            $.s.h = document.createElement('H3');
            $.s.h.a = document.createElement('A');
            $.s.h.a.target = '_laconica';
            $.s.h.appendChild($.s.h.a);
            $.s.appendChild($.s.h);
            $.s.r = document.createElement('UL');
            $.s.appendChild($.s.r);
            $.s.f = document.createElement('H4');
            /*var a = document.createElement('A');
            a.innerHTML = 'get this';
            a.target = '_blank';
            a.href = 'http://kentbrewster.com/identica-badge';
            $.s.f.appendChild(a);*/
            $.s.appendChild($.s.f);
            $.f.getUser();
         },
         getUser : function() {
            if (!$.f.runFunction) { $.f.runFunction = []; }
            var n = $.f.runFunction.length;
            var id = trueName + '.f.runFunction[' + n + ']';
            $.f.runFunction[n] = function(r) {
               delete($.f.runFunction[n]);
               var a = document.createElement('A');
               a.rel = $.a.user;
               a.rev = r.name; 
               a.id = r.screen_name;
               $.f.removeScript(id);
               $.f.changeUserTo(a);
            };
            var url = 'http://' + $.a.server + '/api/users/show/' + $.a.user + '.json?callback=' + id;
            $.f.runScript(url, id);
         },
         changeUserTo : function(el) {
            $.a.user = el.rel;
            $.s.h.a.innerHTML = $.a.headerText;
            $.s.h.a.href = 'http://' + $.a.server + '/' + el.id;
            $.f.runSearch(); 
         },
         runSearch : function() {
            $.s.h.className = 'loading';
            $.s.r.innerHTML = '';
            if (!$.f.runFunction) { $.f.runFunction = []; }
            var n = $.f.runFunction.length;
            var id = trueName + '.f.runFunction[' + n + ']';
            $.f.runFunction[n] = function(r) {
               delete($.f.runFunction[n]);
               $.f.removeScript(id);
               $.f.renderResult(r); 
            };
            //var url = 'http://' + $.a.server + '/api/statuses/friends/' + $.a.user + '.json?callback=' + id;
            var url = 'http://' + $.a.server + '/api/statuses/user_timeline/' + $.a.user + '.json?callback=' + id;
            $.f.runScript(url, id);
         },
         renderResult: function(r) { 
            r = $.f.sortArray(r, "id", true);
            $.s.h.className = '';
            for (var i = 0; i < r.length; i++) {
               if (!r[i] || !r[i].user) {
                 continue;
               }
               if (r[i].text && r[i].text[0] == "@") {
                 continue;
               }
               var li = document.createElement('LI');
               var p = document.createElement('P');
               if (r[i].text) {
                  var raw = r[i].text;
                  var cooked = raw;
                  cooked = cooked.replace(/http:\/\/([^ ]+)/g, "<a href=\"http://$1\" target=\"_laconica\">http://$1</a>");
                  cooked = cooked.replace(/@([\w*]+)/g, '@<a href="http://' + $.a.server + '/$1" target=\"_laconica\">$1</a>');
                  cooked = cooked.replace(/#([\w*]+)/g, '#<a href="http://' + $.a.server + '/tag/$1" target="_laconica">$1</a>');
                  p.innerHTML = cooked;
               }
               li.appendChild(p);
               var updated = document.createElement('DATE');
               if (r[i].created_at) {
                  var date_link = document.createElement('A');
                  date_link.innerHTML = r[i].created_at.split(/\+/)[0];
                  date_link.href = 'http://' + $.a.server + '/notice/' + r[i].id;
                  date_link.target = '_laconica';
                  updated.appendChild(date_link);
                  if (r[i].in_reply_to_status_id) {
                     updated.appendChild(document.createTextNode(' in reply to '));
                     var in_reply_to = document.createElement('A');
                     in_reply_to.innerHTML = r[i].in_reply_to_status_id;
                     in_reply_to.href = 'http://' + $.a.server + '/notice/' + r[i].in_reply_to_status_id;
                     in_reply_to.target = '_laconica';
                     updated.appendChild(in_reply_to);
                  }
               } else {
                  updated.innerHTML = 'has not updated yet';
               }
               li.appendChild(updated);
               $.s.r.appendChild(li);
            }         
         },
         sortArray : function(r, k, x) {
            if (window.createPopup) { 
               return r; 
            }
            function s(a, b) {
               if (x === true) {
                   return b[k] - a[k];
               } else {
                   return a[k] - b[k];
               }
            }
            r = r.sort(s);
            return r;
         },         
         runScript : function(url, id) {
            var s = document.createElement('script');
            s.id = id;
            s.type ='text/javascript';
            s.src = url;
            document.getElementsByTagName('body')[0].appendChild(s);
         },
         removeScript : function(id) {
            if (document.getElementById(id)) {
               var s = document.getElementById(id);
               s.parentNode.removeChild(s);
            }
         }         
      };
   }();
//   var thisScript = /^https?:\/\/[^\/]*r8ar.com\/identica-badge.js$/;
   var thisScript = /identica-badge.js$/;
   if(typeof window.addEventListener !== 'undefined') {
      window.addEventListener('load', function() { $.f.init(thisScript); }, false);
   } else if(typeof window.attachEvent !== 'undefined') {
      window.attachEvent('onload', function() { $.f.init(thisScript); });
   }
} )();
