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