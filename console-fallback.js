;(function(g) {
    'use strict';

    var fConsole = g.console || {};


    /*
    *  Fallback console.log() using alert
    *
    */
    if (typeof fConsole.log === "undefined"){
        fConsole.log = function (msg) {
            alert(msg);
        };
    }

    /*
    *  Fallback console methods
    *
    */
    var methods = ['error','info','warn', 'group', 'groupCollapsed', 'groupEnd'],
        method;
    /* jshint -W084,-W083*/
    while(method = methods.pop()) {
        if (typeof fConsole[method] === "undefined") {
            fConsole[method] = function(){
                Function.prototype.call.apply(fConsole.log, JSON.stringify(arguments));
            };
        }
    }
    /* jshint +W084,-W083 */


    /*
     *  Fallback console.time() and console.timeEnd() methods
     *
     */
    var timers = {}, self = this;

    if (typeof fConsole.time === "undefined" || fConsole.timeEnd === "undefined"){

        fConsole.time = function(title){
            if(typeof title !== 'string') return;

            self.timers[title] = +new Date();
        };

        fConsole.timeEnd = function(title){
            if(typeof title !== 'string' || !self.timers[title]) return;

            var execTime = +new Date() - self.timers[title];
            delete self.timers[title];
            fConsole.log( title + ": " + execTime +"ms");
        };
    }

    try {
        window.console = fConsole;
    } catch (e) {
        console.log('cannot overwrite existing console object');
    }

}(window));
