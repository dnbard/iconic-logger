# Iconic Logger

Customizable logger with icons support for browser

## Install

```
npm install iconic-logger --save
```

## Browser support

Only Chrome are supporting the image output to console. Every other browser just write your log as usual `console.log`.

## How to use

* CommonJS(browserify)

```js
var iconicLogger = require('iconic-logger');
var myLogger = iconicLogger.log('chrome');

myLogger('Chrome is awesome!');
```

* Regular browser

```
<script src="iconic-logger.js"></script>

var myLogger = window.iconicLogger('chrome');
myLogger('Chrome is awesome!');
```

Will put next to the console log:  
![example](https://raw.githubusercontent.com/dnbard/iconic-logger/master/shots/example0.png)

* Prefix support
You can specify the prefix that will appear at the beginning of every message:

```js
var iconicLogger = require('iconic-logger');
var myLogger = iconicLogger.log('chrome', 'My log:');

myLogger('Chrome is awesome!');
myLogger('I really like it!');
```

![example](https://raw.githubusercontent.com/dnbard/iconic-logger/master/shots/example1.png)

## Iconic Logger instance API

* .log(icon[, prefix])
Create a logger that is similar to `console.log` with icon and optional prefix

* .info(icon[, prefix])
Create a logger that is similar to `console.info` with icon and optional prefix

* .error(icon[, prefix])
Create a logger that is similar to `console.error` with icon and optional prefix

* .getIconNames()
Returns a list of registered icon names

* .getIcons()
Returns a list of registered icons