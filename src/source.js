(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object' && !!module.parent) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.loge = factory();
  }
}(window, function () {
    var icons = require('./icons'),
        browser = require('detect-browser');

    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.

    return {
        register: function(iconName, iconSize, iconPath){
            if (typeof iconName !== 'string' || iconName.length === 0){
                throw new Error('Invalid argument: iconName must be non-empty string');
            }

            if (icons[iconName] !== undefined){
                throw new Error('Invalid argument: icon already declared');
            }

            icons[iconName] = {
                size: iconSize,
                path: iconPath
            };
        },
        _handler: function(iconName, prefix){
            var arg, template, templateArguments, icon;

            prefix = typeof prefix === 'string' ? prefix : '';

            if (typeof this.operation !== 'function'){
                throw new Error('Invalid context: operation must be a function');
            }

            if (typeof iconName !== 'string'){
                throw new Error('Invalid parameter: icon must be specified');
            } else {
                icon = icons.filter(function(i){
                    return i.name === iconName;
                })[0];

                if (icon === undefined){
                    throw new Error('Invalid parameter: icon not found');
                }

                templateArguments = Array.prototype.splice.call(arguments, 1);

                if (browser.name === 'chrome'){
                    templateArguments.unshift('background: url(' + icon.path + '); background-repeat: no-repeat; font-size: ' + icon.size + 'px;');
                    templateArguments.unshift('%c  ');
                }
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
            return icons.map(function(i){
                return i.name;
            });
        }
    }
}));
