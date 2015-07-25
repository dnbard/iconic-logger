(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.loge = factory();
  }
}(this, function () {
    var icons = {
        "github":{
            size: 16,
            path: "https://avatars3.githubusercontent.com/u/229244?s=16"
        },
        "spinner":{
            size: 16,
            path: "http://www.ajaxload.info/images/exemples/1.gif"
        },
        "spinner-kit":{
            size: 16,
            path: "http://www.ajaxload.info/images/exemples/3.gif"
        },
        "spinner-arrows":{
            size: 16,
            path: "http://www.ajaxload.info/images/exemples/4.gif"
        },
        "spinner-ball":{
            size: 16,
            path: "http://www.ajaxload.info/images/exemples/11.gif"
        },
        "spinner-block":{
            size: 16,
            path: "http://www.ajaxload.info/images/exemples/16.gif"
        },
        "bouncing-ball":{
            size: 16,
            path: "http://www.ajaxload.info/images/exemples/7.gif"
        },
        "pacman":{
            size: 24,
            path: "http://www.ajaxload.info/images/exemples/39.gif"
        }
    };

    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.

    return {
        register: function(iconName, iconSize, iconPath){
            if (typeof iconName !== 'string' || iconName.length === 0){
                throw new Error('Invalid argument: iconName must be non-empty string');
            }

            if (icons[iconName] !== undefine){
                throw new Error('Invalid argument: icon already declared');
            }

            icons[iconName] = {
                size: iconSize,
                path: iconPath
            };
        },
        _handler: function(){
            var arg, template, templateArguments, icon;

            if (typeof this.operation !== 'function'){
                throw new Error('Invalid context: operation must be a function');
            }

            if (icons[arguments[0]] === undefined){
                throw new Error('Invalid parameter: icon must be specified');
            } else {
                icon = icons[arguments[0]];

                if (icon === undefined){
                    throw new Error('Invalid parameter: icon not found');
                }

                templateArguments = Array.prototype.splice.call(arguments, 1);

                templateArguments.unshift('background: url(' + icon.path + '); background-repeat: no-repeat; font-size: ' + icon.size + 'px;');
                templateArguments.unshift('%c  ');
                templateArguments.unshift(console);

                return Function.prototype.bind.apply(this.operation, templateArguments);
            }
        },
        log: function(){
            return this._handler.apply({ operation: console.log }, arguments);
        },
        error: function(){
            return this._handler.apply({ operation: console.error }, arguments);
        },
        info: function(){
            return this._handler.apply({ operation: console.info }, arguments);
        },
        getIcons: function(){
            return icons;
        },
        getIconNames: function(){
            var iconNames = [];
            for (icon in icons){ iconNames.push(icon); }
            return iconNames;
        }
    }
}));
