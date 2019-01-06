(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/mattmesker/Sites/lacroix/node_modules/bowser/src/bowser.js":[function(require,module,exports){
/*!
 * Bowser - a browser detector
 * https://github.com/ded/bowser
 * MIT License | (c) Dustin Diaz 2015
 */

!function (root, name, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition()
  else if (typeof define == 'function' && define.amd) define(name, definition)
  else root[name] = definition()
}(this, 'bowser', function () {
  /**
    * See useragents.js for examples of navigator.userAgent
    */

  var t = true

  function detect(ua) {

    function getFirstMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[1]) || '';
    }

    function getSecondMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[2]) || '';
    }

    var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase()
      , likeAndroid = /like android/i.test(ua)
      , android = !likeAndroid && /android/i.test(ua)
      , nexusMobile = /nexus\s*[0-6]\s*/i.test(ua)
      , nexusTablet = !nexusMobile && /nexus\s*[0-9]+/i.test(ua)
      , chromeos = /CrOS/.test(ua)
      , silk = /silk/i.test(ua)
      , sailfish = /sailfish/i.test(ua)
      , tizen = /tizen/i.test(ua)
      , webos = /(web|hpw)os/i.test(ua)
      , windowsphone = /windows phone/i.test(ua)
      , samsungBrowser = /SamsungBrowser/i.test(ua)
      , windows = !windowsphone && /windows/i.test(ua)
      , mac = !iosdevice && !silk && /macintosh/i.test(ua)
      , linux = !android && !sailfish && !tizen && !webos && /linux/i.test(ua)
      , edgeVersion = getFirstMatch(/edge\/(\d+(\.\d+)?)/i)
      , versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i)
      , tablet = /tablet/i.test(ua)
      , mobile = !tablet && /[^-]mobi/i.test(ua)
      , xbox = /xbox/i.test(ua)
      , result

    if (/opera/i.test(ua)) {
      //  an old Opera
      result = {
        name: 'Opera'
      , opera: t
      , version: versionIdentifier || getFirstMatch(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
      }
    } else if (/opr|opios/i.test(ua)) {
      // a new Opera
      result = {
        name: 'Opera'
        , opera: t
        , version: getFirstMatch(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (/SamsungBrowser/i.test(ua)) {
      result = {
        name: 'Samsung Internet for Android'
        , samsungBrowser: t
        , version: versionIdentifier || getFirstMatch(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/coast/i.test(ua)) {
      result = {
        name: 'Opera Coast'
        , coast: t
        , version: versionIdentifier || getFirstMatch(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/yabrowser/i.test(ua)) {
      result = {
        name: 'Yandex Browser'
      , yandexbrowser: t
      , version: versionIdentifier || getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/ucbrowser/i.test(ua)) {
      result = {
          name: 'UC Browser'
        , ucbrowser: t
        , version: getFirstMatch(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/mxios/i.test(ua)) {
      result = {
        name: 'Maxthon'
        , maxthon: t
        , version: getFirstMatch(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/epiphany/i.test(ua)) {
      result = {
        name: 'Epiphany'
        , epiphany: t
        , version: getFirstMatch(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/puffin/i.test(ua)) {
      result = {
        name: 'Puffin'
        , puffin: t
        , version: getFirstMatch(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
      }
    }
    else if (/sleipnir/i.test(ua)) {
      result = {
        name: 'Sleipnir'
        , sleipnir: t
        , version: getFirstMatch(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/k-meleon/i.test(ua)) {
      result = {
        name: 'K-Meleon'
        , kMeleon: t
        , version: getFirstMatch(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (windowsphone) {
      result = {
        name: 'Windows Phone'
      , windowsphone: t
      }
      if (edgeVersion) {
        result.msedge = t
        result.version = edgeVersion
      }
      else {
        result.msie = t
        result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/msie|trident/i.test(ua)) {
      result = {
        name: 'Internet Explorer'
      , msie: t
      , version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
      }
    } else if (chromeos) {
      result = {
        name: 'Chrome'
      , chromeos: t
      , chromeBook: t
      , chrome: t
      , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    } else if (/chrome.+? edge/i.test(ua)) {
      result = {
        name: 'Microsoft Edge'
      , msedge: t
      , version: edgeVersion
      }
    }
    else if (/vivaldi/i.test(ua)) {
      result = {
        name: 'Vivaldi'
        , vivaldi: t
        , version: getFirstMatch(/vivaldi\/(\d+(\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (sailfish) {
      result = {
        name: 'Sailfish'
      , sailfish: t
      , version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/seamonkey\//i.test(ua)) {
      result = {
        name: 'SeaMonkey'
      , seamonkey: t
      , version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/firefox|iceweasel|fxios/i.test(ua)) {
      result = {
        name: 'Firefox'
      , firefox: t
      , version: getFirstMatch(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
      }
      if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
        result.firefoxos = t
      }
    }
    else if (silk) {
      result =  {
        name: 'Amazon Silk'
      , silk: t
      , version : getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/phantom/i.test(ua)) {
      result = {
        name: 'PhantomJS'
      , phantom: t
      , version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/slimerjs/i.test(ua)) {
      result = {
        name: 'SlimerJS'
        , slimer: t
        , version: getFirstMatch(/slimerjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
      result = {
        name: 'BlackBerry'
      , blackberry: t
      , version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
      }
    }
    else if (webos) {
      result = {
        name: 'WebOS'
      , webos: t
      , version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
      };
      /touchpad\//i.test(ua) && (result.touchpad = t)
    }
    else if (/bada/i.test(ua)) {
      result = {
        name: 'Bada'
      , bada: t
      , version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
      };
    }
    else if (tizen) {
      result = {
        name: 'Tizen'
      , tizen: t
      , version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
      };
    }
    else if (/qupzilla/i.test(ua)) {
      result = {
        name: 'QupZilla'
        , qupzilla: t
        , version: getFirstMatch(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || versionIdentifier
      }
    }
    else if (/chromium/i.test(ua)) {
      result = {
        name: 'Chromium'
        , chromium: t
        , version: getFirstMatch(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (/chrome|crios|crmo/i.test(ua)) {
      result = {
        name: 'Chrome'
        , chrome: t
        , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    }
    else if (android) {
      result = {
        name: 'Android'
        , version: versionIdentifier
      }
    }
    else if (/safari|applewebkit/i.test(ua)) {
      result = {
        name: 'Safari'
      , safari: t
      }
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if (iosdevice) {
      result = {
        name : iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
      }
      // WTF: version is not part of user agent in web apps
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if(/googlebot/i.test(ua)) {
      result = {
        name: 'Googlebot'
      , googlebot: t
      , version: getFirstMatch(/googlebot\/(\d+(\.\d+))/i) || versionIdentifier
      }
    }
    else {
      result = {
        name: getFirstMatch(/^(.*)\/(.*) /),
        version: getSecondMatch(/^(.*)\/(.*) /)
     };
   }

    // set webkit or gecko flag for browsers based on these engines
    if (!result.msedge && /(apple)?webkit/i.test(ua)) {
      if (/(apple)?webkit\/537\.36/i.test(ua)) {
        result.name = result.name || "Blink"
        result.blink = t
      } else {
        result.name = result.name || "Webkit"
        result.webkit = t
      }
      if (!result.version && versionIdentifier) {
        result.version = versionIdentifier
      }
    } else if (!result.opera && /gecko\//i.test(ua)) {
      result.name = result.name || "Gecko"
      result.gecko = t
      result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i)
    }

    // set OS flags for platforms that have multiple browsers
    if (!result.windowsphone && !result.msedge && (android || result.silk)) {
      result.android = t
    } else if (!result.windowsphone && !result.msedge && iosdevice) {
      result[iosdevice] = t
      result.ios = t
    } else if (mac) {
      result.mac = t
    } else if (xbox) {
      result.xbox = t
    } else if (windows) {
      result.windows = t
    } else if (linux) {
      result.linux = t
    }

    // OS version extraction
    var osVersion = '';
    if (result.windowsphone) {
      osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
    } else if (iosdevice) {
      osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
      osVersion = osVersion.replace(/[_\s]/g, '.');
    } else if (android) {
      osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
    } else if (result.webos) {
      osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
    } else if (result.blackberry) {
      osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
    } else if (result.bada) {
      osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
    } else if (result.tizen) {
      osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
    }
    if (osVersion) {
      result.osversion = osVersion;
    }

    // device type extraction
    var osMajorVersion = osVersion.split('.')[0];
    if (
         tablet
      || nexusTablet
      || iosdevice == 'ipad'
      || (android && (osMajorVersion == 3 || (osMajorVersion >= 4 && !mobile)))
      || result.silk
    ) {
      result.tablet = t
    } else if (
         mobile
      || iosdevice == 'iphone'
      || iosdevice == 'ipod'
      || android
      || nexusMobile
      || result.blackberry
      || result.webos
      || result.bada
    ) {
      result.mobile = t
    }

    // Graded Browser Support
    // http://developer.yahoo.com/yui/articles/gbs
    if (result.msedge ||
        (result.msie && result.version >= 10) ||
        (result.yandexbrowser && result.version >= 15) ||
		    (result.vivaldi && result.version >= 1.0) ||
        (result.chrome && result.version >= 20) ||
        (result.samsungBrowser && result.version >= 4) ||
        (result.firefox && result.version >= 20.0) ||
        (result.safari && result.version >= 6) ||
        (result.opera && result.version >= 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] >= 6) ||
        (result.blackberry && result.version >= 10.1)
        || (result.chromium && result.version >= 20)
        ) {
      result.a = t;
    }
    else if ((result.msie && result.version < 10) ||
        (result.chrome && result.version < 20) ||
        (result.firefox && result.version < 20.0) ||
        (result.safari && result.version < 6) ||
        (result.opera && result.version < 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
        || (result.chromium && result.version < 20)
        ) {
      result.c = t
    } else result.x = t

    return result
  }

  var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent || '' : '')

  bowser.test = function (browserList) {
    for (var i = 0; i < browserList.length; ++i) {
      var browserItem = browserList[i];
      if (typeof browserItem=== 'string') {
        if (browserItem in bowser) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Get version precisions count
   *
   * @example
   *   getVersionPrecision("1.10.3") // 3
   *
   * @param  {string} version
   * @return {number}
   */
  function getVersionPrecision(version) {
    return version.split(".").length;
  }

  /**
   * Array::map polyfill
   *
   * @param  {Array} arr
   * @param  {Function} iterator
   * @return {Array}
   */
  function map(arr, iterator) {
    var result = [], i;
    if (Array.prototype.map) {
      return Array.prototype.map.call(arr, iterator);
    }
    for (i = 0; i < arr.length; i++) {
      result.push(iterator(arr[i]));
    }
    return result;
  }

  /**
   * Calculate browser version weight
   *
   * @example
   *   compareVersions(['1.10.2.1',  '1.8.2.1.90'])    // 1
   *   compareVersions(['1.010.2.1', '1.09.2.1.90']);  // 1
   *   compareVersions(['1.10.2.1',  '1.10.2.1']);     // 0
   *   compareVersions(['1.10.2.1',  '1.0800.2']);     // -1
   *
   * @param  {Array<String>} versions versions to compare
   * @return {Number} comparison result
   */
  function compareVersions(versions) {
    // 1) get common precision for both versions, for example for "10.0" and "9" it should be 2
    var precision = Math.max(getVersionPrecision(versions[0]), getVersionPrecision(versions[1]));
    var chunks = map(versions, function (version) {
      var delta = precision - getVersionPrecision(version);

      // 2) "9" -> "9.0" (for precision = 2)
      version = version + new Array(delta + 1).join(".0");

      // 3) "9.0" -> ["000000000"", "000000009"]
      return map(version.split("."), function (chunk) {
        return new Array(20 - chunk.length).join("0") + chunk;
      }).reverse();
    });

    // iterate in reverse order by reversed chunks array
    while (--precision >= 0) {
      // 4) compare: "000000009" > "000000010" = false (but "9" > "10" = true)
      if (chunks[0][precision] > chunks[1][precision]) {
        return 1;
      }
      else if (chunks[0][precision] === chunks[1][precision]) {
        if (precision === 0) {
          // all version chunks are same
          return 0;
        }
      }
      else {
        return -1;
      }
    }
  }

  /**
   * Check if browser is unsupported
   *
   * @example
   *   bowser.isUnsupportedBrowser({
   *     msie: "10",
   *     firefox: "23",
   *     chrome: "29",
   *     safari: "5.1",
   *     opera: "16",
   *     phantom: "534"
   *   });
   *
   * @param  {Object}  minVersions map of minimal version to browser
   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
   * @param  {String}  [ua] user agent string
   * @return {Boolean}
   */
  function isUnsupportedBrowser(minVersions, strictMode, ua) {
    var _bowser = bowser;

    // make strictMode param optional with ua param usage
    if (typeof strictMode === 'string') {
      ua = strictMode;
      strictMode = void(0);
    }

    if (strictMode === void(0)) {
      strictMode = false;
    }
    if (ua) {
      _bowser = detect(ua);
    }

    var version = "" + _bowser.version;
    for (var browser in minVersions) {
      if (minVersions.hasOwnProperty(browser)) {
        if (_bowser[browser]) {
          if (typeof minVersions[browser] !== 'string') {
            throw new Error('Browser version in the minVersion map should be a string: ' + browser + ': ' + String(minVersions));
          }

          // browser version and min supported version.
          return compareVersions([version, minVersions[browser]]) < 0;
        }
      }
    }

    return strictMode; // not found
  }

  /**
   * Check if browser is supported
   *
   * @param  {Object} minVersions map of minimal version to browser
   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
   * @param  {String}  [ua] user agent string
   * @return {Boolean}
   */
  function check(minVersions, strictMode, ua) {
    return !isUnsupportedBrowser(minVersions, strictMode, ua);
  }

  bowser.isUnsupportedBrowser = isUnsupportedBrowser;
  bowser.compareVersions = compareVersions;
  bowser.check = check;

  /*
   * Set our detect method to the main bowser object so we can
   * reuse it to test other user agents.
   * This is needed to implement future tests.
   */
  bowser._detect = detect;

  return bowser
});

},{}],"/Users/mattmesker/Sites/lacroix/node_modules/draggabilly/draggabilly.js":[function(require,module,exports){
/*!
 * Draggabilly v2.1.1
 * Make that shiz draggable
 * http://draggabilly.desandro.com
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /*globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
        'get-size/get-size',
        'unidragger/unidragger'
      ],
      function( getSize, Unidragger ) {
        return factory( window, getSize, Unidragger );
      });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('get-size'),
      require('unidragger')
    );
  } else {
    // browser global
    window.Draggabilly = factory(
      window,
      window.getSize,
      window.Unidragger
    );
  }

}( window, function factory( window, getSize, Unidragger ) {

'use strict';

// vars
var document = window.document;

function noop() {}

// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

function isElement( obj ) {
  return obj instanceof HTMLElement;
}

// -------------------------- requestAnimationFrame -------------------------- //

// get rAF, prefixed, if present
var requestAnimationFrame = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

// fallback to setTimeout
var lastTime = 0;
if ( !requestAnimationFrame )  {
  requestAnimationFrame = function( callback ) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
    var id = setTimeout( callback, timeToCall );
    lastTime = currTime + timeToCall;
    return id;
  };
}

// -------------------------- support -------------------------- //

var docElem = document.documentElement;
var transformProperty = typeof docElem.style.transform == 'string' ?
  'transform' : 'WebkitTransform';

var jQuery = window.jQuery;

// --------------------------  -------------------------- //

function Draggabilly( element, options ) {
  // querySelector if string
  this.element = typeof element == 'string' ?
    document.querySelector( element ) : element;

  if ( jQuery ) {
    this.$element = jQuery( this.element );
  }

  // options
  this.options = extend( {}, this.constructor.defaults );
  this.option( options );

  this._create();
}

// inherit Unidragger methods
var proto = Draggabilly.prototype = Object.create( Unidragger.prototype );

Draggabilly.defaults = {
};

/**
 * set options
 * @param {Object} opts
 */
proto.option = function( opts ) {
  extend( this.options, opts );
};

// css position values that don't need to be set
var positionValues = {
  relative: true,
  absolute: true,
  fixed: true
};

proto._create = function() {

  // properties
  this.position = {};
  this._getPosition();

  this.startPoint = { x: 0, y: 0 };
  this.dragPoint = { x: 0, y: 0 };

  this.startPosition = extend( {}, this.position );

  // set relative positioning
  var style = getComputedStyle( this.element );
  if ( !positionValues[ style.position ] ) {
    this.element.style.position = 'relative';
  }

  this.enable();
  this.setHandles();

};

/**
 * set this.handles and bind start events to 'em
 */
proto.setHandles = function() {
  this.handles = this.options.handle ?
    this.element.querySelectorAll( this.options.handle ) : [ this.element ];

  this.bindHandles();
};

/**
 * emits events via EvEmitter and jQuery events
 * @param {String} type - name of event
 * @param {Event} event - original event
 * @param {Array} args - extra arguments
 */
proto.dispatchEvent = function( type, event, args ) {
  var emitArgs = [ event ].concat( args );
  this.emitEvent( type, emitArgs );
  var jQuery = window.jQuery;
  // trigger jQuery event
  if ( jQuery && this.$element ) {
    if ( event ) {
      // create jQuery event
      var $event = jQuery.Event( event );
      $event.type = type;
      this.$element.trigger( $event, args );
    } else {
      // just trigger with type if no event available
      this.$element.trigger( type, args );
    }
  }
};

// -------------------------- position -------------------------- //

// get x/y position from style
proto._getPosition = function() {
  var style = getComputedStyle( this.element );
  var x = this._getPositionCoord( style.left, 'width' );
  var y = this._getPositionCoord( style.top, 'height' );
  // clean up 'auto' or other non-integer values
  this.position.x = isNaN( x ) ? 0 : x;
  this.position.y = isNaN( y ) ? 0 : y;

  this._addTransformPosition( style );
};

proto._getPositionCoord = function( styleSide, measure ) {
  if ( styleSide.indexOf('%') != -1 ) {
    // convert percent into pixel for Safari, #75
    var parentSize = getSize( this.element.parentNode );
    // prevent not-in-DOM element throwing bug, #131
    return !parentSize ? 0 :
      ( parseFloat( styleSide ) / 100 ) * parentSize[ measure ];
  }
  return parseInt( styleSide, 10 );
};

// add transform: translate( x, y ) to position
proto._addTransformPosition = function( style ) {
  var transform = style[ transformProperty ];
  // bail out if value is 'none'
  if ( transform.indexOf('matrix') !== 0 ) {
    return;
  }
  // split matrix(1, 0, 0, 1, x, y)
  var matrixValues = transform.split(',');
  // translate X value is in 12th or 4th position
  var xIndex = transform.indexOf('matrix3d') === 0 ? 12 : 4;
  var translateX = parseInt( matrixValues[ xIndex ], 10 );
  // translate Y value is in 13th or 5th position
  var translateY = parseInt( matrixValues[ xIndex + 1 ], 10 );
  this.position.x += translateX;
  this.position.y += translateY;
};

// -------------------------- events -------------------------- //

/**
 * pointer start
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerDown = function( event, pointer ) {
  this._dragPointerDown( event, pointer );
  // kludge to blur focused inputs in dragger
  var focused = document.activeElement;
  // do not blur body for IE10, metafizzy/flickity#117
  if ( focused && focused.blur && focused != document.body ) {
    focused.blur();
  }
  // bind move and end events
  this._bindPostStartEvents( event );
  this.element.classList.add('is-pointer-down');
  this.dispatchEvent( 'pointerDown', event, [ pointer ] );
};

/**
 * drag move
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerMove = function( event, pointer ) {
  var moveVector = this._dragPointerMove( event, pointer );
  this.dispatchEvent( 'pointerMove', event, [ pointer, moveVector ] );
  this._dragMove( event, pointer, moveVector );
};

/**
 * drag start
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.dragStart = function( event, pointer ) {
  if ( !this.isEnabled ) {
    return;
  }
  this._getPosition();
  this.measureContainment();
  // position _when_ drag began
  this.startPosition.x = this.position.x;
  this.startPosition.y = this.position.y;
  // reset left/top style
  this.setLeftTop();

  this.dragPoint.x = 0;
  this.dragPoint.y = 0;

  this.element.classList.add('is-dragging');
  this.dispatchEvent( 'dragStart', event, [ pointer ] );
  // start animation
  this.animate();
};

proto.measureContainment = function() {
  var containment = this.options.containment;
  if ( !containment ) {
    return;
  }

  // use element if element
  var container = isElement( containment ) ? containment :
    // fallback to querySelector if string
    typeof containment == 'string' ? document.querySelector( containment ) :
    // otherwise just `true`, use the parent
    this.element.parentNode;

  var elemSize = getSize( this.element );
  var containerSize = getSize( container );
  var elemRect = this.element.getBoundingClientRect();
  var containerRect = container.getBoundingClientRect();

  var borderSizeX = containerSize.borderLeftWidth + containerSize.borderRightWidth;
  var borderSizeY = containerSize.borderTopWidth + containerSize.borderBottomWidth;

  var position = this.relativeStartPosition = {
    x: elemRect.left - ( containerRect.left + containerSize.borderLeftWidth ),
    y: elemRect.top - ( containerRect.top + containerSize.borderTopWidth )
  };

  this.containSize = {
    width: ( containerSize.width - borderSizeX ) - position.x - elemSize.width,
    height: ( containerSize.height - borderSizeY ) - position.y - elemSize.height
  };
};

// ----- move event ----- //

/**
 * drag move
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.dragMove = function( event, pointer, moveVector ) {
  if ( !this.isEnabled ) {
    return;
  }
  var dragX = moveVector.x;
  var dragY = moveVector.y;

  var grid = this.options.grid;
  var gridX = grid && grid[0];
  var gridY = grid && grid[1];

  dragX = applyGrid( dragX, gridX );
  dragY = applyGrid( dragY, gridY );

  dragX = this.containDrag( 'x', dragX, gridX );
  dragY = this.containDrag( 'y', dragY, gridY );

  // constrain to axis
  dragX = this.options.axis == 'y' ? 0 : dragX;
  dragY = this.options.axis == 'x' ? 0 : dragY;

  this.position.x = this.startPosition.x + dragX;
  this.position.y = this.startPosition.y + dragY;
  // set dragPoint properties
  this.dragPoint.x = dragX;
  this.dragPoint.y = dragY;

  this.dispatchEvent( 'dragMove', event, [ pointer, moveVector ] );
};

function applyGrid( value, grid, method ) {
  method = method || 'round';
  return grid ? Math[ method ]( value / grid ) * grid : value;
}

proto.containDrag = function( axis, drag, grid ) {
  if ( !this.options.containment ) {
    return drag;
  }
  var measure = axis == 'x' ? 'width' : 'height';

  var rel = this.relativeStartPosition[ axis ];
  var min = applyGrid( -rel, grid, 'ceil' );
  var max = this.containSize[ measure ];
  max = applyGrid( max, grid, 'floor' );
  return  Math.min( max, Math.max( min, drag ) );
};

// ----- end event ----- //

/**
 * pointer up
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerUp = function( event, pointer ) {
  this.element.classList.remove('is-pointer-down');
  this.dispatchEvent( 'pointerUp', event, [ pointer ] );
  this._dragPointerUp( event, pointer );
};

/**
 * drag end
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.dragEnd = function( event, pointer ) {
  if ( !this.isEnabled ) {
    return;
  }
  // use top left position when complete
  if ( transformProperty ) {
    this.element.style[ transformProperty ] = '';
    this.setLeftTop();
  }
  this.element.classList.remove('is-dragging');
  this.dispatchEvent( 'dragEnd', event, [ pointer ] );
};

// -------------------------- animation -------------------------- //

proto.animate = function() {
  // only render and animate if dragging
  if ( !this.isDragging ) {
    return;
  }

  this.positionDrag();

  var _this = this;
  requestAnimationFrame( function animateFrame() {
    _this.animate();
  });

};

// left/top positioning
proto.setLeftTop = function() {
  this.element.style.left = this.position.x + 'px';
  this.element.style.top  = this.position.y + 'px';
};

proto.positionDrag = function() {
  this.element.style[ transformProperty ] = 'translate3d( ' + this.dragPoint.x +
    'px, ' + this.dragPoint.y + 'px, 0)';
};

// ----- staticClick ----- //

proto.staticClick = function( event, pointer ) {
  this.dispatchEvent( 'staticClick', event, [ pointer ] );
};

// ----- methods ----- //

proto.enable = function() {
  this.isEnabled = true;
};

proto.disable = function() {
  this.isEnabled = false;
  if ( this.isDragging ) {
    this.dragEnd();
  }
};

proto.destroy = function() {
  this.disable();
  // reset styles
  this.element.style[ transformProperty ] = '';
  this.element.style.left = '';
  this.element.style.top = '';
  this.element.style.position = '';
  // unbind handles
  this.unbindHandles();
  // remove jQuery data
  if ( this.$element ) {
    this.$element.removeData('draggabilly');
  }
};

// ----- jQuery bridget ----- //

// required for jQuery bridget
proto._init = noop;

if ( jQuery && jQuery.bridget ) {
  jQuery.bridget( 'draggabilly', Draggabilly );
}

// -----  ----- //

return Draggabilly;

}));

},{"get-size":"/Users/mattmesker/Sites/lacroix/node_modules/get-size/get-size.js","unidragger":"/Users/mattmesker/Sites/lacroix/node_modules/unidragger/unidragger.js"}],"/Users/mattmesker/Sites/lacroix/node_modules/ev-emitter/ev-emitter.js":[function(require,module,exports){
/**
 * EvEmitter v1.0.3
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

( function( global, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, window */
  if ( typeof define == 'function' && define.amd ) {
    // AMD - RequireJS
    define( factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory();
  } else {
    // Browser globals
    global.EvEmitter = factory();
  }

}( typeof window != 'undefined' ? window : this, function() {

"use strict";

function EvEmitter() {}

var proto = EvEmitter.prototype;

proto.on = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // set events hash
  var events = this._events = this._events || {};
  // set listeners array
  var listeners = events[ eventName ] = events[ eventName ] || [];
  // only add once
  if ( listeners.indexOf( listener ) == -1 ) {
    listeners.push( listener );
  }

  return this;
};

proto.once = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // add event
  this.on( eventName, listener );
  // set once flag
  // set onceEvents hash
  var onceEvents = this._onceEvents = this._onceEvents || {};
  // set onceListeners object
  var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
  // set flag
  onceListeners[ listener ] = true;

  return this;
};

proto.off = function( eventName, listener ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var index = listeners.indexOf( listener );
  if ( index != -1 ) {
    listeners.splice( index, 1 );
  }

  return this;
};

proto.emitEvent = function( eventName, args ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var i = 0;
  var listener = listeners[i];
  args = args || [];
  // once stuff
  var onceListeners = this._onceEvents && this._onceEvents[ eventName ];

  while ( listener ) {
    var isOnce = onceListeners && onceListeners[ listener ];
    if ( isOnce ) {
      // remove listener
      // remove before trigger to prevent recursion
      this.off( eventName, listener );
      // unset once flag
      delete onceListeners[ listener ];
    }
    // trigger listener
    listener.apply( this, args );
    // get next listener
    i += isOnce ? 0 : 1;
    listener = listeners[i];
  }

  return this;
};

return EvEmitter;

}));

},{}],"/Users/mattmesker/Sites/lacroix/node_modules/get-size/get-size.js":[function(require,module,exports){
/*!
 * getSize v2.0.2
 * measure size of elements
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */
/*global define: false, module: false, console: false */

( function( window, factory ) {
  'use strict';

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( function() {
      return factory();
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.getSize = factory();
  }

})( window, function factory() {
'use strict';

// -------------------------- helpers -------------------------- //

// get a number from a string, not a percentage
function getStyleSize( value ) {
  var num = parseFloat( value );
  // not a percent like '100%', and a number
  var isValid = value.indexOf('%') == -1 && !isNaN( num );
  return isValid && num;
}

function noop() {}

var logError = typeof console == 'undefined' ? noop :
  function( message ) {
    console.error( message );
  };

// -------------------------- measurements -------------------------- //

var measurements = [
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'borderBottomWidth'
];

var measurementsLength = measurements.length;

function getZeroSize() {
  var size = {
    width: 0,
    height: 0,
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 0,
    outerHeight: 0
  };
  for ( var i=0; i < measurementsLength; i++ ) {
    var measurement = measurements[i];
    size[ measurement ] = 0;
  }
  return size;
}

// -------------------------- getStyle -------------------------- //

/**
 * getStyle, get style of element, check for Firefox bug
 * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
 */
function getStyle( elem ) {
  var style = getComputedStyle( elem );
  if ( !style ) {
    logError( 'Style returned ' + style +
      '. Are you running this code in a hidden iframe on Firefox? ' +
      'See http://bit.ly/getsizebug1' );
  }
  return style;
}

// -------------------------- setup -------------------------- //

var isSetup = false;

var isBoxSizeOuter;

/**
 * setup
 * check isBoxSizerOuter
 * do on first getSize() rather than on page load for Firefox bug
 */
function setup() {
  // setup once
  if ( isSetup ) {
    return;
  }
  isSetup = true;

  // -------------------------- box sizing -------------------------- //

  /**
   * WebKit measures the outer-width on style.width on border-box elems
   * IE & Firefox<29 measures the inner-width
   */
  var div = document.createElement('div');
  div.style.width = '200px';
  div.style.padding = '1px 2px 3px 4px';
  div.style.borderStyle = 'solid';
  div.style.borderWidth = '1px 2px 3px 4px';
  div.style.boxSizing = 'border-box';

  var body = document.body || document.documentElement;
  body.appendChild( div );
  var style = getStyle( div );

  getSize.isBoxSizeOuter = isBoxSizeOuter = getStyleSize( style.width ) == 200;
  body.removeChild( div );

}

// -------------------------- getSize -------------------------- //

function getSize( elem ) {
  setup();

  // use querySeletor if elem is string
  if ( typeof elem == 'string' ) {
    elem = document.querySelector( elem );
  }

  // do not proceed on non-objects
  if ( !elem || typeof elem != 'object' || !elem.nodeType ) {
    return;
  }

  var style = getStyle( elem );

  // if hidden, everything is 0
  if ( style.display == 'none' ) {
    return getZeroSize();
  }

  var size = {};
  size.width = elem.offsetWidth;
  size.height = elem.offsetHeight;

  var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';

  // get all measurements
  for ( var i=0; i < measurementsLength; i++ ) {
    var measurement = measurements[i];
    var value = style[ measurement ];
    var num = parseFloat( value );
    // any 'auto', 'medium' value will be 0
    size[ measurement ] = !isNaN( num ) ? num : 0;
  }

  var paddingWidth = size.paddingLeft + size.paddingRight;
  var paddingHeight = size.paddingTop + size.paddingBottom;
  var marginWidth = size.marginLeft + size.marginRight;
  var marginHeight = size.marginTop + size.marginBottom;
  var borderWidth = size.borderLeftWidth + size.borderRightWidth;
  var borderHeight = size.borderTopWidth + size.borderBottomWidth;

  var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

  // overwrite width and height if we can get it from style
  var styleWidth = getStyleSize( style.width );
  if ( styleWidth !== false ) {
    size.width = styleWidth +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth );
  }

  var styleHeight = getStyleSize( style.height );
  if ( styleHeight !== false ) {
    size.height = styleHeight +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight );
  }

  size.innerWidth = size.width - ( paddingWidth + borderWidth );
  size.innerHeight = size.height - ( paddingHeight + borderHeight );

  size.outerWidth = size.width + marginWidth;
  size.outerHeight = size.height + marginHeight;

  return size;
}

return getSize;

});

},{}],"/Users/mattmesker/Sites/lacroix/node_modules/lazysizes/lazysizes.js":[function(require,module,exports){
(function(window, factory) {
	var lazySizes = factory(window, window.document);
	window.lazySizes = lazySizes;
	if(typeof module == 'object' && module.exports){
		module.exports = lazySizes;
	}
}(window, function l(window, document) {
	'use strict';
	/*jshint eqnull:true */
	if(!document.getElementsByClassName){return;}

	var lazySizesConfig;

	var docElem = document.documentElement;

	var Date = window.Date;

	var supportPicture = window.HTMLPictureElement;

	var _addEventListener = 'addEventListener';

	var _getAttribute = 'getAttribute';

	var addEventListener = window[_addEventListener];

	var setTimeout = window.setTimeout;

	var requestAnimationFrame = window.requestAnimationFrame || setTimeout;

	var requestIdleCallback = window.requestIdleCallback;

	var regPicture = /^picture$/i;

	var loadEvents = ['load', 'error', 'lazyincluded', '_lazyloaded'];

	var regClassCache = {};

	var forEach = Array.prototype.forEach;

	var hasClass = function(ele, cls) {
		if(!regClassCache[cls]){
			regClassCache[cls] = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		}
		return regClassCache[cls].test(ele[_getAttribute]('class') || '') && regClassCache[cls];
	};

	var addClass = function(ele, cls) {
		if (!hasClass(ele, cls)){
			ele.setAttribute('class', (ele[_getAttribute]('class') || '').trim() + ' ' + cls);
		}
	};

	var removeClass = function(ele, cls) {
		var reg;
		if ((reg = hasClass(ele,cls))) {
			ele.setAttribute('class', (ele[_getAttribute]('class') || '').replace(reg, ' '));
		}
	};

	var addRemoveLoadEvents = function(dom, fn, add){
		var action = add ? _addEventListener : 'removeEventListener';
		if(add){
			addRemoveLoadEvents(dom, fn);
		}
		loadEvents.forEach(function(evt){
			dom[action](evt, fn);
		});
	};

	var triggerEvent = function(elem, name, detail, noBubbles, noCancelable){
		var event = document.createEvent('CustomEvent');

		event.initCustomEvent(name, !noBubbles, !noCancelable, detail || {});

		elem.dispatchEvent(event);
		return event;
	};

	var updatePolyfill = function (el, full){
		var polyfill;
		if( !supportPicture && ( polyfill = (window.picturefill || lazySizesConfig.pf) ) ){
			polyfill({reevaluate: true, elements: [el]});
		} else if(full && full.src){
			el.src = full.src;
		}
	};

	var getCSS = function (elem, style){
		return (getComputedStyle(elem, null) || {})[style];
	};

	var getWidth = function(elem, parent, width){
		width = width || elem.offsetWidth;

		while(width < lazySizesConfig.minSize && parent && !elem._lazysizesWidth){
			width =  parent.offsetWidth;
			parent = parent.parentNode;
		}

		return width;
	};

	var rAF = (function(){
		var running, waiting;
		var fns = [];

		var run = function(){
			var fn;
			running = true;
			waiting = false;
			while(fns.length){
				fn = fns.shift();
				fn[0].apply(fn[1], fn[2]);
			}
			running = false;
		};

		var rafBatch = function(fn){
			if(running){
				fn.apply(this, arguments);
			} else {
				fns.push([fn, this, arguments]);

				if(!waiting){
					waiting = true;
					(document.hidden ? setTimeout : requestAnimationFrame)(run);
				}
			}
		};

		rafBatch._lsFlush = run;

		return rafBatch;
	})();

	var rAFIt = function(fn, simple){
		return simple ?
			function() {
				rAF(fn);
			} :
			function(){
				var that = this;
				var args = arguments;
				rAF(function(){
					fn.apply(that, args);
				});
			}
		;
	};

	var throttle = function(fn){
		var running;
		var lastTime = 0;
		var gDelay = 125;
		var RIC_DEFAULT_TIMEOUT = 666;
		var rICTimeout = RIC_DEFAULT_TIMEOUT;
		var run = function(){
			running = false;
			lastTime = Date.now();
			fn();
		};
		var idleCallback = requestIdleCallback ?
			function(){
				requestIdleCallback(run, {timeout: rICTimeout});
				if(rICTimeout !== RIC_DEFAULT_TIMEOUT){
					rICTimeout = RIC_DEFAULT_TIMEOUT;
				}
			}:
			rAFIt(function(){
				setTimeout(run);
			}, true)
		;

		return function(isPriority){
			var delay;
			if((isPriority = isPriority === true)){
				rICTimeout = 44;
			}

			if(running){
				return;
			}

			running =  true;

			delay = gDelay - (Date.now() - lastTime);

			if(delay < 0){
				delay = 0;
			}

			if(isPriority || (delay < 9 && requestIdleCallback)){
				idleCallback();
			} else {
				setTimeout(idleCallback, delay);
			}
		};
	};

	//based on http://modernjavascript.blogspot.de/2013/08/building-better-debounce.html
	var debounce = function(func) {
		var timeout, timestamp;
		var wait = 99;
		var run = function(){
			timeout = null;
			func();
		};
		var later = function() {
			var last = Date.now() - timestamp;

			if (last < wait) {
				setTimeout(later, wait - last);
			} else {
				(requestIdleCallback || run)(run);
			}
		};

		return function() {
			timestamp = Date.now();

			if (!timeout) {
				timeout = setTimeout(later, wait);
			}
		};
	};


	var loader = (function(){
		var lazyloadElems, preloadElems, isCompleted, resetPreloadingTimer, loadMode, started;

		var eLvW, elvH, eLtop, eLleft, eLright, eLbottom;

		var defaultExpand, preloadExpand, hFac;

		var regImg = /^img$/i;
		var regIframe = /^iframe$/i;

		var supportScroll = ('onscroll' in window) && !(/glebot/.test(navigator.userAgent));

		var shrinkExpand = 0;
		var currentExpand = 0;

		var isLoading = 0;
		var lowRuns = -1;

		var resetPreloading = function(e){
			isLoading--;
			if(e && e.target){
				addRemoveLoadEvents(e.target, resetPreloading);
			}

			if(!e || isLoading < 0 || !e.target){
				isLoading = 0;
			}
		};

		var isNestedVisible = function(elem, elemExpand){
			var outerRect;
			var parent = elem;
			var visible = getCSS(document.body, 'visibility') == 'hidden' || getCSS(elem, 'visibility') != 'hidden';

			eLtop -= elemExpand;
			eLbottom += elemExpand;
			eLleft -= elemExpand;
			eLright += elemExpand;

			while(visible && (parent = parent.offsetParent) && parent != document.body && parent != docElem){
				visible = ((getCSS(parent, 'opacity') || 1) > 0);

				if(visible && getCSS(parent, 'overflow') != 'visible'){
					outerRect = parent.getBoundingClientRect();
					visible = eLright > outerRect.left &&
						eLleft < outerRect.right &&
						eLbottom > outerRect.top - 1 &&
						eLtop < outerRect.bottom + 1
					;
				}
			}

			return visible;
		};

		var checkElements = function() {
			var eLlen, i, rect, autoLoadElem, loadedSomething, elemExpand, elemNegativeExpand, elemExpandVal, beforeExpandVal;

			if((loadMode = lazySizesConfig.loadMode) && isLoading < 8 && (eLlen = lazyloadElems.length)){

				i = 0;

				lowRuns++;

				if(preloadExpand == null){
					if(!('expand' in lazySizesConfig)){
						lazySizesConfig.expand = docElem.clientHeight > 500 && docElem.clientWidth > 500 ? 500 : 370;
					}

					defaultExpand = lazySizesConfig.expand;
					preloadExpand = defaultExpand * lazySizesConfig.expFactor;
				}

				if(currentExpand < preloadExpand && isLoading < 1 && lowRuns > 2 && loadMode > 2 && !document.hidden){
					currentExpand = preloadExpand;
					lowRuns = 0;
				} else if(loadMode > 1 && lowRuns > 1 && isLoading < 6){
					currentExpand = defaultExpand;
				} else {
					currentExpand = shrinkExpand;
				}

				for(; i < eLlen; i++){

					if(!lazyloadElems[i] || lazyloadElems[i]._lazyRace){continue;}

					if(!supportScroll){unveilElement(lazyloadElems[i]);continue;}

					if(!(elemExpandVal = lazyloadElems[i][_getAttribute]('data-expand')) || !(elemExpand = elemExpandVal * 1)){
						elemExpand = currentExpand;
					}

					if(beforeExpandVal !== elemExpand){
						eLvW = innerWidth + (elemExpand * hFac);
						elvH = innerHeight + elemExpand;
						elemNegativeExpand = elemExpand * -1;
						beforeExpandVal = elemExpand;
					}

					rect = lazyloadElems[i].getBoundingClientRect();

					if ((eLbottom = rect.bottom) >= elemNegativeExpand &&
						(eLtop = rect.top) <= elvH &&
						(eLright = rect.right) >= elemNegativeExpand * hFac &&
						(eLleft = rect.left) <= eLvW &&
						(eLbottom || eLright || eLleft || eLtop) &&
						((isCompleted && isLoading < 3 && !elemExpandVal && (loadMode < 3 || lowRuns < 4)) || isNestedVisible(lazyloadElems[i], elemExpand))){
						unveilElement(lazyloadElems[i]);
						loadedSomething = true;
						if(isLoading > 9){break;}
					} else if(!loadedSomething && isCompleted && !autoLoadElem &&
						isLoading < 4 && lowRuns < 4 && loadMode > 2 &&
						(preloadElems[0] || lazySizesConfig.preloadAfterLoad) &&
						(preloadElems[0] || (!elemExpandVal && ((eLbottom || eLright || eLleft || eLtop) || lazyloadElems[i][_getAttribute](lazySizesConfig.sizesAttr) != 'auto')))){
						autoLoadElem = preloadElems[0] || lazyloadElems[i];
					}
				}

				if(autoLoadElem && !loadedSomething){
					unveilElement(autoLoadElem);
				}
			}
		};

		var throttledCheckElements = throttle(checkElements);

		var switchLoadingClass = function(e){
			addClass(e.target, lazySizesConfig.loadedClass);
			removeClass(e.target, lazySizesConfig.loadingClass);
			addRemoveLoadEvents(e.target, rafSwitchLoadingClass);
		};
		var rafedSwitchLoadingClass = rAFIt(switchLoadingClass);
		var rafSwitchLoadingClass = function(e){
			rafedSwitchLoadingClass({target: e.target});
		};

		var changeIframeSrc = function(elem, src){
			try {
				elem.contentWindow.location.replace(src);
			} catch(e){
				elem.src = src;
			}
		};

		var handleSources = function(source){
			var customMedia, parent;

			var sourceSrcset = source[_getAttribute](lazySizesConfig.srcsetAttr);

			if( (customMedia = lazySizesConfig.customMedia[source[_getAttribute]('data-media') || source[_getAttribute]('media')]) ){
				source.setAttribute('media', customMedia);
			}

			if(sourceSrcset){
				source.setAttribute('srcset', sourceSrcset);
			}

			//https://bugzilla.mozilla.org/show_bug.cgi?id=1170572
			if(customMedia){
				parent = source.parentNode;
				parent.insertBefore(source.cloneNode(), source);
				parent.removeChild(source);
			}
		};

		var lazyUnveil = rAFIt(function (elem, detail, isAuto, sizes, isImg){
			var src, srcset, parent, isPicture, event, firesLoad;

			if(!(event = triggerEvent(elem, 'lazybeforeunveil', detail)).defaultPrevented){

				if(sizes){
					if(isAuto){
						addClass(elem, lazySizesConfig.autosizesClass);
					} else {
						elem.setAttribute('sizes', sizes);
					}
				}

				srcset = elem[_getAttribute](lazySizesConfig.srcsetAttr);
				src = elem[_getAttribute](lazySizesConfig.srcAttr);

				if(isImg) {
					parent = elem.parentNode;
					isPicture = parent && regPicture.test(parent.nodeName || '');
				}

				firesLoad = detail.firesLoad || (('src' in elem) && (srcset || src || isPicture));

				event = {target: elem};

				if(firesLoad){
					addRemoveLoadEvents(elem, resetPreloading, true);
					clearTimeout(resetPreloadingTimer);
					resetPreloadingTimer = setTimeout(resetPreloading, 2500);

					addClass(elem, lazySizesConfig.loadingClass);
					addRemoveLoadEvents(elem, rafSwitchLoadingClass, true);
				}

				if(isPicture){
					forEach.call(parent.getElementsByTagName('source'), handleSources);
				}

				if(srcset){
					elem.setAttribute('srcset', srcset);
				} else if(src && !isPicture){
					if(regIframe.test(elem.nodeName)){
						changeIframeSrc(elem, src);
					} else {
						elem.src = src;
					}
				}

				if(srcset || isPicture){
					updatePolyfill(elem, {src: src});
				}
			}

			rAF(function(){
				if(elem._lazyRace){
					delete elem._lazyRace;
				}
				removeClass(elem, lazySizesConfig.lazyClass);

				if( !firesLoad || elem.complete ){
					if(firesLoad){
						resetPreloading(event);
					} else {
						isLoading--;
					}
					switchLoadingClass(event);
				}
			});
		});

		var unveilElement = function (elem){
			var detail;

			var isImg = regImg.test(elem.nodeName);

			//allow using sizes="auto", but don't use. it's invalid. Use data-sizes="auto" or a valid value for sizes instead (i.e.: sizes="80vw")
			var sizes = isImg && (elem[_getAttribute](lazySizesConfig.sizesAttr) || elem[_getAttribute]('sizes'));
			var isAuto = sizes == 'auto';

			if( (isAuto || !isCompleted) && isImg && (elem.src || elem.srcset) && !elem.complete && !hasClass(elem, lazySizesConfig.errorClass)){return;}

			detail = triggerEvent(elem, 'lazyunveilread').detail;

			if(isAuto){
				 autoSizer.updateElem(elem, true, elem.offsetWidth);
			}

			elem._lazyRace = true;
			isLoading++;

			lazyUnveil(elem, detail, isAuto, sizes, isImg);
		};

		var onload = function(){
			if(isCompleted){return;}
			if(Date.now() - started < 999){
				setTimeout(onload, 999);
				return;
			}
			var afterScroll = debounce(function(){
				lazySizesConfig.loadMode = 3;
				throttledCheckElements();
			});

			isCompleted = true;

			lazySizesConfig.loadMode = 3;

			throttledCheckElements();

			addEventListener('scroll', function(){
				if(lazySizesConfig.loadMode == 3){
					lazySizesConfig.loadMode = 2;
				}
				afterScroll();
			}, true);
		};

		return {
			_: function(){
				started = Date.now();

				lazyloadElems = document.getElementsByClassName(lazySizesConfig.lazyClass);
				preloadElems = document.getElementsByClassName(lazySizesConfig.lazyClass + ' ' + lazySizesConfig.preloadClass);
				hFac = lazySizesConfig.hFac;

				addEventListener('scroll', throttledCheckElements, true);

				addEventListener('resize', throttledCheckElements, true);

				if(window.MutationObserver){
					new MutationObserver( throttledCheckElements ).observe( docElem, {childList: true, subtree: true, attributes: true} );
				} else {
					docElem[_addEventListener]('DOMNodeInserted', throttledCheckElements, true);
					docElem[_addEventListener]('DOMAttrModified', throttledCheckElements, true);
					setInterval(throttledCheckElements, 999);
				}

				addEventListener('hashchange', throttledCheckElements, true);

				//, 'fullscreenchange'
				['focus', 'mouseover', 'click', 'load', 'transitionend', 'animationend', 'webkitAnimationEnd'].forEach(function(name){
					document[_addEventListener](name, throttledCheckElements, true);
				});

				if((/d$|^c/.test(document.readyState))){
					onload();
				} else {
					addEventListener('load', onload);
					document[_addEventListener]('DOMContentLoaded', throttledCheckElements);
					setTimeout(onload, 20000);
				}

				if(lazyloadElems.length){
					checkElements();
				} else {
					throttledCheckElements();
				}
			},
			checkElems: throttledCheckElements,
			unveil: unveilElement
		};
	})();


	var autoSizer = (function(){
		var autosizesElems;

		var sizeElement = rAFIt(function(elem, parent, event, width){
			var sources, i, len;
			elem._lazysizesWidth = width;
			width += 'px';

			elem.setAttribute('sizes', width);

			if(regPicture.test(parent.nodeName || '')){
				sources = parent.getElementsByTagName('source');
				for(i = 0, len = sources.length; i < len; i++){
					sources[i].setAttribute('sizes', width);
				}
			}

			if(!event.detail.dataAttr){
				updatePolyfill(elem, event.detail);
			}
		});
		var getSizeElement = function (elem, dataAttr, width){
			var event;
			var parent = elem.parentNode;

			if(parent){
				width = getWidth(elem, parent, width);
				event = triggerEvent(elem, 'lazybeforesizes', {width: width, dataAttr: !!dataAttr});

				if(!event.defaultPrevented){
					width = event.detail.width;

					if(width && width !== elem._lazysizesWidth){
						sizeElement(elem, parent, event, width);
					}
				}
			}
		};

		var updateElementsSizes = function(){
			var i;
			var len = autosizesElems.length;
			if(len){
				i = 0;

				for(; i < len; i++){
					getSizeElement(autosizesElems[i]);
				}
			}
		};

		var debouncedUpdateElementsSizes = debounce(updateElementsSizes);

		return {
			_: function(){
				autosizesElems = document.getElementsByClassName(lazySizesConfig.autosizesClass);
				addEventListener('resize', debouncedUpdateElementsSizes);
			},
			checkElems: debouncedUpdateElementsSizes,
			updateElem: getSizeElement
		};
	})();

	var init = function(){
		if(!init.i){
			init.i = true;
			autoSizer._();
			loader._();
		}
	};

	(function(){
		var prop;

		var lazySizesDefaults = {
			lazyClass: 'lazyload',
			loadedClass: 'lazyloaded',
			loadingClass: 'lazyloading',
			preloadClass: 'lazypreload',
			errorClass: 'lazyerror',
			//strictClass: 'lazystrict',
			autosizesClass: 'lazyautosizes',
			srcAttr: 'data-src',
			srcsetAttr: 'data-srcset',
			sizesAttr: 'data-sizes',
			//preloadAfterLoad: false,
			minSize: 40,
			customMedia: {},
			init: true,
			expFactor: 1.5,
			hFac: 0.8,
			loadMode: 2
		};

		lazySizesConfig = window.lazySizesConfig || window.lazysizesConfig || {};

		for(prop in lazySizesDefaults){
			if(!(prop in lazySizesConfig)){
				lazySizesConfig[prop] = lazySizesDefaults[prop];
			}
		}

		window.lazySizesConfig = lazySizesConfig;

		setTimeout(function(){
			if(lazySizesConfig.init){
				init();
			}
		});
	})();

	return {
		cfg: lazySizesConfig,
		autoSizer: autoSizer,
		loader: loader,
		init: init,
		uP: updatePolyfill,
		aC: addClass,
		rC: removeClass,
		hC: hasClass,
		fire: triggerEvent,
		gW: getWidth,
		rAF: rAF,
	};
}
));

},{}],"/Users/mattmesker/Sites/lacroix/node_modules/lazysizes/plugins/unveilhooks/ls.unveilhooks.js":[function(require,module,exports){
/*
This plugin extends lazySizes to lazyLoad:
background images, videos/posters and scripts

Background-Image:
For background images, use data-bg attribute:
<div class="lazyload" data-bg="bg-img.jpg"></div>

 Video:
 For video/audio use data-poster and preload="none":
 <video class="lazyload" data-poster="poster.jpg" preload="none">
 <!-- sources -->
 </video>

 Scripts:
 For scripts use data-script:
 <div class="lazyload" data-script="module-name.js"></div>


 Script modules using require:
 For modules using require use data-require:
 <div class="lazyload" data-require="module-name"></div>
*/

(function(window, document){
	/*jshint eqnull:true */
	'use strict';
	var bgLoad, regBgUrlEscape;
	var uniqueUrls = {};

	if(document.addEventListener){
		regBgUrlEscape = /\(|\)|'/;

		bgLoad = function (url, cb){
			var img = document.createElement('img');
			img.onload = function(){
				img.onload = null;
				img.onerror = null;
				img = null;
				cb();
			};
			img.onerror = img.onload;

			img.src = url;

			if(img && img.complete && img.onload){
				img.onload();
			}
		};

		addEventListener('lazybeforeunveil', function(e){
			var tmp, load, bg, poster;
			if(!e.defaultPrevented) {

				if(e.target.preload == 'none'){
					e.target.preload = 'auto';
				}

				tmp = e.target.getAttribute('data-link');
				if(tmp){
					addStyleScript(tmp, true);
				}

				// handle data-script
				tmp = e.target.getAttribute('data-script');
				if(tmp){
					addStyleScript(tmp);
				}

				// handle data-require
				tmp = e.target.getAttribute('data-require');
				if(tmp){
					if(window.require){
						require([tmp]);
					}
				}

				// handle data-bg
				bg = e.target.getAttribute('data-bg');
				if (bg) {
					e.detail.firesLoad = true;
					load = function(){
						e.target.style.backgroundImage = 'url(' + (regBgUrlEscape.test(bg) ? JSON.stringify(bg) : bg ) + ')';
						e.detail.firesLoad = false;
						lazySizes.fire(e.target, '_lazyloaded', {}, true, true);
					};

					bgLoad(bg, load);
				}

				// handle data-poster
				poster = e.target.getAttribute('data-poster');
				if(poster){
					e.detail.firesLoad = true;
					load = function(){
						e.target.poster = poster;
						e.detail.firesLoad = false;
						lazySizes.fire(e.target, '_lazyloaded', {}, true, true);
					};

					bgLoad(poster, load);

				}
			}
		}, false);

	}

	function addStyleScript(src, style){
		if(uniqueUrls[src]){
			return;
		}
		var elem = document.createElement(style ? 'link' : 'script');
		var insertElem = document.getElementsByTagName('script')[0];

		if(style){
			elem.rel = 'stylesheet';
			elem.href = src;
		} else {
			elem.src = src;
		}
		uniqueUrls[src] = true;
		uniqueUrls[elem.src || elem.href] = true;
		insertElem.parentNode.insertBefore(elem, insertElem);
	}
})(window, document);

},{}],"/Users/mattmesker/Sites/lacroix/node_modules/spectrum-colorpicker/spectrum.js":[function(require,module,exports){
// Spectrum Colorpicker v1.8.0
// https://github.com/bgrins/spectrum
// Author: Brian Grinstead
// License: MIT

(function (factory) {
    "use strict";

    if (typeof define === 'function' && define.amd) { // AMD
        define(['jquery'], factory);
    }
    else if (typeof exports == "object" && typeof module == "object") { // CommonJS
        module.exports = factory(require('jquery'));
    }
    else { // Browser
        factory(jQuery);
    }
})(function($, undefined) {
    "use strict";

    var defaultOpts = {

        // Callbacks
        beforeShow: noop,
        move: noop,
        change: noop,
        show: noop,
        hide: noop,

        // Options
        color: false,
        flat: false,
        showInput: false,
        allowEmpty: false,
        showButtons: true,
        clickoutFiresChange: true,
        showInitial: false,
        showPalette: false,
        showPaletteOnly: false,
        hideAfterPaletteSelect: false,
        togglePaletteOnly: false,
        showSelectionPalette: true,
        localStorageKey: false,
        appendTo: "body",
        maxSelectionSize: 7,
        cancelText: "cancel",
        chooseText: "choose",
        togglePaletteMoreText: "more",
        togglePaletteLessText: "less",
        clearText: "Clear Color Selection",
        noColorSelectedText: "No Color Selected",
        preferredFormat: false,
        className: "", // Deprecated - use containerClassName and replacerClassName instead.
        containerClassName: "",
        replacerClassName: "",
        showAlpha: false,
        theme: "sp-light",
        palette: [["#ffffff", "#000000", "#ff0000", "#ff8000", "#ffff00", "#008000", "#0000ff", "#4b0082", "#9400d3"]],
        selectionPalette: [],
        disabled: false,
        offset: null
    },
    spectrums = [],
    IE = !!/msie/i.exec( window.navigator.userAgent ),
    rgbaSupport = (function() {
        function contains( str, substr ) {
            return !!~('' + str).indexOf(substr);
        }

        var elem = document.createElement('div');
        var style = elem.style;
        style.cssText = 'background-color:rgba(0,0,0,.5)';
        return contains(style.backgroundColor, 'rgba') || contains(style.backgroundColor, 'hsla');
    })(),
    replaceInput = [
        "<div class='sp-replacer'>",
            "<div class='sp-preview'><div class='sp-preview-inner'></div></div>",
            "<div class='sp-dd'>&#9660;</div>",
        "</div>"
    ].join(''),
    markup = (function () {

        // IE does not support gradients with multiple stops, so we need to simulate
        //  that for the rainbow slider with 8 divs that each have a single gradient
        var gradientFix = "";
        if (IE) {
            for (var i = 1; i <= 6; i++) {
                gradientFix += "<div class='sp-" + i + "'></div>";
            }
        }

        return [
            "<div class='sp-container sp-hidden'>",
                "<div class='sp-palette-container'>",
                    "<div class='sp-palette sp-thumb sp-cf'></div>",
                    "<div class='sp-palette-button-container sp-cf'>",
                        "<button type='button' class='sp-palette-toggle'></button>",
                    "</div>",
                "</div>",
                "<div class='sp-picker-container'>",
                    "<div class='sp-top sp-cf'>",
                        "<div class='sp-fill'></div>",
                        "<div class='sp-top-inner'>",
                            "<div class='sp-color'>",
                                "<div class='sp-sat'>",
                                    "<div class='sp-val'>",
                                        "<div class='sp-dragger'></div>",
                                    "</div>",
                                "</div>",
                            "</div>",
                            "<div class='sp-clear sp-clear-display'>",
                            "</div>",
                            "<div class='sp-hue'>",
                                "<div class='sp-slider'></div>",
                                gradientFix,
                            "</div>",
                        "</div>",
                        "<div class='sp-alpha'><div class='sp-alpha-inner'><div class='sp-alpha-handle'></div></div></div>",
                    "</div>",
                    "<div class='sp-input-container sp-cf'>",
                        "<input class='sp-input' type='text' spellcheck='false'  />",
                    "</div>",
                    "<div class='sp-initial sp-thumb sp-cf'></div>",
                    "<div class='sp-button-container sp-cf'>",
                        "<a class='sp-cancel' href='#'></a>",
                        "<button type='button' class='sp-choose'></button>",
                    "</div>",
                "</div>",
            "</div>"
        ].join("");
    })();

    function paletteTemplate (p, color, className, opts) {
        var html = [];
        for (var i = 0; i < p.length; i++) {
            var current = p[i];
            if(current) {
                var tiny = tinycolor(current);
                var c = tiny.toHsl().l < 0.5 ? "sp-thumb-el sp-thumb-dark" : "sp-thumb-el sp-thumb-light";
                c += (tinycolor.equals(color, current)) ? " sp-thumb-active" : "";
                var formattedString = tiny.toString(opts.preferredFormat || "rgb");
                var swatchStyle = rgbaSupport ? ("background-color:" + tiny.toRgbString()) : "filter:" + tiny.toFilter();
                html.push('<span title="' + formattedString + '" data-color="' + tiny.toRgbString() + '" class="' + c + '"><span class="sp-thumb-inner" style="' + swatchStyle + ';" /></span>');
            } else {
                var cls = 'sp-clear-display';
                html.push($('<div />')
                    .append($('<span data-color="" style="background-color:transparent;" class="' + cls + '"></span>')
                        .attr('title', opts.noColorSelectedText)
                    )
                    .html()
                );
            }
        }
        return "<div class='sp-cf " + className + "'>" + html.join('') + "</div>";
    }

    function hideAll() {
        for (var i = 0; i < spectrums.length; i++) {
            if (spectrums[i]) {
                spectrums[i].hide();
            }
        }
    }

    function instanceOptions(o, callbackContext) {
        var opts = $.extend({}, defaultOpts, o);
        opts.callbacks = {
            'move': bind(opts.move, callbackContext),
            'change': bind(opts.change, callbackContext),
            'show': bind(opts.show, callbackContext),
            'hide': bind(opts.hide, callbackContext),
            'beforeShow': bind(opts.beforeShow, callbackContext)
        };

        return opts;
    }

    function spectrum(element, o) {

        var opts = instanceOptions(o, element),
            flat = opts.flat,
            showSelectionPalette = opts.showSelectionPalette,
            localStorageKey = opts.localStorageKey,
            theme = opts.theme,
            callbacks = opts.callbacks,
            resize = throttle(reflow, 10),
            visible = false,
            isDragging = false,
            dragWidth = 0,
            dragHeight = 0,
            dragHelperHeight = 0,
            slideHeight = 0,
            slideWidth = 0,
            alphaWidth = 0,
            alphaSlideHelperWidth = 0,
            slideHelperHeight = 0,
            currentHue = 0,
            currentSaturation = 0,
            currentValue = 0,
            currentAlpha = 1,
            palette = [],
            paletteArray = [],
            paletteLookup = {},
            selectionPalette = opts.selectionPalette.slice(0),
            maxSelectionSize = opts.maxSelectionSize,
            draggingClass = "sp-dragging",
            shiftMovementDirection = null;

        var doc = element.ownerDocument,
            body = doc.body,
            boundElement = $(element),
            disabled = false,
            container = $(markup, doc).addClass(theme),
            pickerContainer = container.find(".sp-picker-container"),
            dragger = container.find(".sp-color"),
            dragHelper = container.find(".sp-dragger"),
            slider = container.find(".sp-hue"),
            slideHelper = container.find(".sp-slider"),
            alphaSliderInner = container.find(".sp-alpha-inner"),
            alphaSlider = container.find(".sp-alpha"),
            alphaSlideHelper = container.find(".sp-alpha-handle"),
            textInput = container.find(".sp-input"),
            paletteContainer = container.find(".sp-palette"),
            initialColorContainer = container.find(".sp-initial"),
            cancelButton = container.find(".sp-cancel"),
            clearButton = container.find(".sp-clear"),
            chooseButton = container.find(".sp-choose"),
            toggleButton = container.find(".sp-palette-toggle"),
            isInput = boundElement.is("input"),
            isInputTypeColor = isInput && boundElement.attr("type") === "color" && inputTypeColorSupport(),
            shouldReplace = isInput && !flat,
            replacer = (shouldReplace) ? $(replaceInput).addClass(theme).addClass(opts.className).addClass(opts.replacerClassName) : $([]),
            offsetElement = (shouldReplace) ? replacer : boundElement,
            previewElement = replacer.find(".sp-preview-inner"),
            initialColor = opts.color || (isInput && boundElement.val()),
            colorOnShow = false,
            currentPreferredFormat = opts.preferredFormat,
            clickoutFiresChange = !opts.showButtons || opts.clickoutFiresChange,
            isEmpty = !initialColor,
            allowEmpty = opts.allowEmpty && !isInputTypeColor;

        function applyOptions() {

            if (opts.showPaletteOnly) {
                opts.showPalette = true;
            }

            toggleButton.text(opts.showPaletteOnly ? opts.togglePaletteMoreText : opts.togglePaletteLessText);

            if (opts.palette) {
                palette = opts.palette.slice(0);
                paletteArray = $.isArray(palette[0]) ? palette : [palette];
                paletteLookup = {};
                for (var i = 0; i < paletteArray.length; i++) {
                    for (var j = 0; j < paletteArray[i].length; j++) {
                        var rgb = tinycolor(paletteArray[i][j]).toRgbString();
                        paletteLookup[rgb] = true;
                    }
                }
            }

            container.toggleClass("sp-flat", flat);
            container.toggleClass("sp-input-disabled", !opts.showInput);
            container.toggleClass("sp-alpha-enabled", opts.showAlpha);
            container.toggleClass("sp-clear-enabled", allowEmpty);
            container.toggleClass("sp-buttons-disabled", !opts.showButtons);
            container.toggleClass("sp-palette-buttons-disabled", !opts.togglePaletteOnly);
            container.toggleClass("sp-palette-disabled", !opts.showPalette);
            container.toggleClass("sp-palette-only", opts.showPaletteOnly);
            container.toggleClass("sp-initial-disabled", !opts.showInitial);
            container.addClass(opts.className).addClass(opts.containerClassName);

            reflow();
        }

        function initialize() {

            if (IE) {
                container.find("*:not(input)").attr("unselectable", "on");
            }

            applyOptions();

            if (shouldReplace) {
                boundElement.after(replacer).hide();
            }

            if (!allowEmpty) {
                clearButton.hide();
            }

            if (flat) {
                boundElement.after(container).hide();
            }
            else {

                var appendTo = opts.appendTo === "parent" ? boundElement.parent() : $(opts.appendTo);
                if (appendTo.length !== 1) {
                    appendTo = $("body");
                }

                appendTo.append(container);
            }

            updateSelectionPaletteFromStorage();

            offsetElement.bind("click.spectrum touchstart.spectrum", function (e) {
                if (!disabled) {
                    toggle();
                }

                e.stopPropagation();

                if (!$(e.target).is("input")) {
                    e.preventDefault();
                }
            });

            if(boundElement.is(":disabled") || (opts.disabled === true)) {
                disable();
            }

            // Prevent clicks from bubbling up to document.  This would cause it to be hidden.
            container.click(stopPropagation);

            // Handle user typed input
            textInput.change(setFromTextInput);
            textInput.bind("paste", function () {
                setTimeout(setFromTextInput, 1);
            });
            textInput.keydown(function (e) { if (e.keyCode == 13) { setFromTextInput(); } });

            cancelButton.text(opts.cancelText);
            cancelButton.bind("click.spectrum", function (e) {
                e.stopPropagation();
                e.preventDefault();
                revert();
                hide();
            });

            clearButton.attr("title", opts.clearText);
            clearButton.bind("click.spectrum", function (e) {
                e.stopPropagation();
                e.preventDefault();
                isEmpty = true;
                move();

                if(flat) {
                    //for the flat style, this is a change event
                    updateOriginalInput(true);
                }
            });

            chooseButton.text(opts.chooseText);
            chooseButton.bind("click.spectrum", function (e) {
                e.stopPropagation();
                e.preventDefault();

                if (IE && textInput.is(":focus")) {
                    textInput.trigger('change');
                }

                if (isValid()) {
                    updateOriginalInput(true);
                    hide();
                }
            });

            toggleButton.text(opts.showPaletteOnly ? opts.togglePaletteMoreText : opts.togglePaletteLessText);
            toggleButton.bind("click.spectrum", function (e) {
                e.stopPropagation();
                e.preventDefault();

                opts.showPaletteOnly = !opts.showPaletteOnly;

                // To make sure the Picker area is drawn on the right, next to the
                // Palette area (and not below the palette), first move the Palette
                // to the left to make space for the picker, plus 5px extra.
                // The 'applyOptions' function puts the whole container back into place
                // and takes care of the button-text and the sp-palette-only CSS class.
                if (!opts.showPaletteOnly && !flat) {
                    container.css('left', '-=' + (pickerContainer.outerWidth(true) + 5));
                }
                applyOptions();
            });

            draggable(alphaSlider, function (dragX, dragY, e) {
                currentAlpha = (dragX / alphaWidth);
                isEmpty = false;
                if (e.shiftKey) {
                    currentAlpha = Math.round(currentAlpha * 10) / 10;
                }

                move();
            }, dragStart, dragStop);

            draggable(slider, function (dragX, dragY) {
                currentHue = parseFloat(dragY / slideHeight);
                isEmpty = false;
                if (!opts.showAlpha) {
                    currentAlpha = 1;
                }
                move();
            }, dragStart, dragStop);

            draggable(dragger, function (dragX, dragY, e) {

                // shift+drag should snap the movement to either the x or y axis.
                if (!e.shiftKey) {
                    shiftMovementDirection = null;
                }
                else if (!shiftMovementDirection) {
                    var oldDragX = currentSaturation * dragWidth;
                    var oldDragY = dragHeight - (currentValue * dragHeight);
                    var furtherFromX = Math.abs(dragX - oldDragX) > Math.abs(dragY - oldDragY);

                    shiftMovementDirection = furtherFromX ? "x" : "y";
                }

                var setSaturation = !shiftMovementDirection || shiftMovementDirection === "x";
                var setValue = !shiftMovementDirection || shiftMovementDirection === "y";

                if (setSaturation) {
                    currentSaturation = parseFloat(dragX / dragWidth);
                }
                if (setValue) {
                    currentValue = parseFloat((dragHeight - dragY) / dragHeight);
                }

                isEmpty = false;
                if (!opts.showAlpha) {
                    currentAlpha = 1;
                }

                move();

            }, dragStart, dragStop);

            if (!!initialColor) {
                set(initialColor);

                // In case color was black - update the preview UI and set the format
                // since the set function will not run (default color is black).
                updateUI();
                currentPreferredFormat = opts.preferredFormat || tinycolor(initialColor).format;

                addColorToSelectionPalette(initialColor);
            }
            else {
                updateUI();
            }

            if (flat) {
                show();
            }

            function paletteElementClick(e) {
                if (e.data && e.data.ignore) {
                    set($(e.target).closest(".sp-thumb-el").data("color"));
                    move();
                }
                else {
                    set($(e.target).closest(".sp-thumb-el").data("color"));
                    move();
                    updateOriginalInput(true);
                    if (opts.hideAfterPaletteSelect) {
                      hide();
                    }
                }

                return false;
            }

            var paletteEvent = IE ? "mousedown.spectrum" : "click.spectrum touchstart.spectrum";
            paletteContainer.delegate(".sp-thumb-el", paletteEvent, paletteElementClick);
            initialColorContainer.delegate(".sp-thumb-el:nth-child(1)", paletteEvent, { ignore: true }, paletteElementClick);
        }

        function updateSelectionPaletteFromStorage() {

            if (localStorageKey && window.localStorage) {

                // Migrate old palettes over to new format.  May want to remove this eventually.
                try {
                    var oldPalette = window.localStorage[localStorageKey].split(",#");
                    if (oldPalette.length > 1) {
                        delete window.localStorage[localStorageKey];
                        $.each(oldPalette, function(i, c) {
                             addColorToSelectionPalette(c);
                        });
                    }
                }
                catch(e) { }

                try {
                    selectionPalette = window.localStorage[localStorageKey].split(";");
                }
                catch (e) { }
            }
        }

        function addColorToSelectionPalette(color) {
            if (showSelectionPalette) {
                var rgb = tinycolor(color).toRgbString();
                if (!paletteLookup[rgb] && $.inArray(rgb, selectionPalette) === -1) {
                    selectionPalette.push(rgb);
                    while(selectionPalette.length > maxSelectionSize) {
                        selectionPalette.shift();
                    }
                }

                if (localStorageKey && window.localStorage) {
                    try {
                        window.localStorage[localStorageKey] = selectionPalette.join(";");
                    }
                    catch(e) { }
                }
            }
        }

        function getUniqueSelectionPalette() {
            var unique = [];
            if (opts.showPalette) {
                for (var i = 0; i < selectionPalette.length; i++) {
                    var rgb = tinycolor(selectionPalette[i]).toRgbString();

                    if (!paletteLookup[rgb]) {
                        unique.push(selectionPalette[i]);
                    }
                }
            }

            return unique.reverse().slice(0, opts.maxSelectionSize);
        }

        function drawPalette() {

            var currentColor = get();

            var html = $.map(paletteArray, function (palette, i) {
                return paletteTemplate(palette, currentColor, "sp-palette-row sp-palette-row-" + i, opts);
            });

            updateSelectionPaletteFromStorage();

            if (selectionPalette) {
                html.push(paletteTemplate(getUniqueSelectionPalette(), currentColor, "sp-palette-row sp-palette-row-selection", opts));
            }

            paletteContainer.html(html.join(""));
        }

        function drawInitial() {
            if (opts.showInitial) {
                var initial = colorOnShow;
                var current = get();
                initialColorContainer.html(paletteTemplate([initial, current], current, "sp-palette-row-initial", opts));
            }
        }

        function dragStart() {
            if (dragHeight <= 0 || dragWidth <= 0 || slideHeight <= 0) {
                reflow();
            }
            isDragging = true;
            container.addClass(draggingClass);
            shiftMovementDirection = null;
            boundElement.trigger('dragstart.spectrum', [ get() ]);
        }

        function dragStop() {
            isDragging = false;
            container.removeClass(draggingClass);
            boundElement.trigger('dragstop.spectrum', [ get() ]);
        }

        function setFromTextInput() {

            var value = textInput.val();

            if ((value === null || value === "") && allowEmpty) {
                set(null);
                updateOriginalInput(true);
            }
            else {
                var tiny = tinycolor(value);
                if (tiny.isValid()) {
                    set(tiny);
                    updateOriginalInput(true);
                }
                else {
                    textInput.addClass("sp-validation-error");
                }
            }
        }

        function toggle() {
            if (visible) {
                hide();
            }
            else {
                show();
            }
        }

        function show() {
            var event = $.Event('beforeShow.spectrum');

            if (visible) {
                reflow();
                return;
            }

            boundElement.trigger(event, [ get() ]);

            if (callbacks.beforeShow(get()) === false || event.isDefaultPrevented()) {
                return;
            }

            hideAll();
            visible = true;

            $(doc).bind("keydown.spectrum", onkeydown);
            $(doc).bind("click.spectrum", clickout);
            $(window).bind("resize.spectrum", resize);
            replacer.addClass("sp-active");
            container.removeClass("sp-hidden");

            reflow();
            updateUI();

            colorOnShow = get();

            drawInitial();
            callbacks.show(colorOnShow);
            boundElement.trigger('show.spectrum', [ colorOnShow ]);
        }

        function onkeydown(e) {
            // Close on ESC
            if (e.keyCode === 27) {
                hide();
            }
        }

        function clickout(e) {
            // Return on right click.
            if (e.button == 2) { return; }

            // If a drag event was happening during the mouseup, don't hide
            // on click.
            if (isDragging) { return; }

            if (clickoutFiresChange) {
                updateOriginalInput(true);
            }
            else {
                revert();
            }
            hide();
        }

        function hide() {
            // Return if hiding is unnecessary
            if (!visible || flat) { return; }
            visible = false;

            $(doc).unbind("keydown.spectrum", onkeydown);
            $(doc).unbind("click.spectrum", clickout);
            $(window).unbind("resize.spectrum", resize);

            replacer.removeClass("sp-active");
            container.addClass("sp-hidden");

            callbacks.hide(get());
            boundElement.trigger('hide.spectrum', [ get() ]);
        }

        function revert() {
            set(colorOnShow, true);
        }

        function set(color, ignoreFormatChange) {
            if (tinycolor.equals(color, get())) {
                // Update UI just in case a validation error needs
                // to be cleared.
                updateUI();
                return;
            }

            var newColor, newHsv;
            if (!color && allowEmpty) {
                isEmpty = true;
            } else {
                isEmpty = false;
                newColor = tinycolor(color);
                newHsv = newColor.toHsv();

                currentHue = (newHsv.h % 360) / 360;
                currentSaturation = newHsv.s;
                currentValue = newHsv.v;
                currentAlpha = newHsv.a;
            }
            updateUI();

            if (newColor && newColor.isValid() && !ignoreFormatChange) {
                currentPreferredFormat = opts.preferredFormat || newColor.getFormat();
            }
        }

        function get(opts) {
            opts = opts || { };

            if (allowEmpty && isEmpty) {
                return null;
            }

            return tinycolor.fromRatio({
                h: currentHue,
                s: currentSaturation,
                v: currentValue,
                a: Math.round(currentAlpha * 100) / 100
            }, { format: opts.format || currentPreferredFormat });
        }

        function isValid() {
            return !textInput.hasClass("sp-validation-error");
        }

        function move() {
            updateUI();

            callbacks.move(get());
            boundElement.trigger('move.spectrum', [ get() ]);
        }

        function updateUI() {

            textInput.removeClass("sp-validation-error");

            updateHelperLocations();

            // Update dragger background color (gradients take care of saturation and value).
            var flatColor = tinycolor.fromRatio({ h: currentHue, s: 1, v: 1 });
            dragger.css("background-color", flatColor.toHexString());

            // Get a format that alpha will be included in (hex and names ignore alpha)
            var format = currentPreferredFormat;
            if (currentAlpha < 1 && !(currentAlpha === 0 && format === "name")) {
                if (format === "hex" || format === "hex3" || format === "hex6" || format === "name") {
                    format = "rgb";
                }
            }

            var realColor = get({ format: format }),
                displayColor = '';

             //reset background info for preview element
            previewElement.removeClass("sp-clear-display");
            previewElement.css('background-color', 'transparent');

            if (!realColor && allowEmpty) {
                // Update the replaced elements background with icon indicating no color selection
                previewElement.addClass("sp-clear-display");
            }
            else {
                var realHex = realColor.toHexString(),
                    realRgb = realColor.toRgbString();

                // Update the replaced elements background color (with actual selected color)
                if (rgbaSupport || realColor.alpha === 1) {
                    previewElement.css("background-color", realRgb);
                }
                else {
                    previewElement.css("background-color", "transparent");
                    previewElement.css("filter", realColor.toFilter());
                }

                if (opts.showAlpha) {
                    var rgb = realColor.toRgb();
                    rgb.a = 0;
                    var realAlpha = tinycolor(rgb).toRgbString();
                    var gradient = "linear-gradient(left, " + realAlpha + ", " + realHex + ")";

                    if (IE) {
                        alphaSliderInner.css("filter", tinycolor(realAlpha).toFilter({ gradientType: 1 }, realHex));
                    }
                    else {
                        alphaSliderInner.css("background", "-webkit-" + gradient);
                        alphaSliderInner.css("background", "-moz-" + gradient);
                        alphaSliderInner.css("background", "-ms-" + gradient);
                        // Use current syntax gradient on unprefixed property.
                        alphaSliderInner.css("background",
                            "linear-gradient(to right, " + realAlpha + ", " + realHex + ")");
                    }
                }

                displayColor = realColor.toString(format);
            }

            // Update the text entry input as it changes happen
            if (opts.showInput) {
                textInput.val(displayColor);
            }

            if (opts.showPalette) {
                drawPalette();
            }

            drawInitial();
        }

        function updateHelperLocations() {
            var s = currentSaturation;
            var v = currentValue;

            if(allowEmpty && isEmpty) {
                //if selected color is empty, hide the helpers
                alphaSlideHelper.hide();
                slideHelper.hide();
                dragHelper.hide();
            }
            else {
                //make sure helpers are visible
                alphaSlideHelper.show();
                slideHelper.show();
                dragHelper.show();

                // Where to show the little circle in that displays your current selected color
                var dragX = s * dragWidth;
                var dragY = dragHeight - (v * dragHeight);
                dragX = Math.max(
                    -dragHelperHeight,
                    Math.min(dragWidth - dragHelperHeight, dragX - dragHelperHeight)
                );
                dragY = Math.max(
                    -dragHelperHeight,
                    Math.min(dragHeight - dragHelperHeight, dragY - dragHelperHeight)
                );
                dragHelper.css({
                    "top": dragY + "px",
                    "left": dragX + "px"
                });

                var alphaX = currentAlpha * alphaWidth;
                alphaSlideHelper.css({
                    "left": (alphaX - (alphaSlideHelperWidth / 2)) + "px"
                });

                // Where to show the bar that displays your current selected hue
                var slideY = (currentHue) * slideHeight;
                slideHelper.css({
                    "top": (slideY - slideHelperHeight) + "px"
                });
            }
        }

        function updateOriginalInput(fireCallback) {
            var color = get(),
                displayColor = '',
                hasChanged = !tinycolor.equals(color, colorOnShow);

            if (color) {
                displayColor = color.toString(currentPreferredFormat);
                // Update the selection palette with the current color
                addColorToSelectionPalette(color);
            }

            if (isInput) {
                boundElement.val(displayColor);
            }

            if (fireCallback && hasChanged) {
                callbacks.change(color);
                boundElement.trigger('change', [ color ]);
            }
        }

        function reflow() {
            if (!visible) {
                return; // Calculations would be useless and wouldn't be reliable anyways
            }
            dragWidth = dragger.width();
            dragHeight = dragger.height();
            dragHelperHeight = dragHelper.height();
            slideWidth = slider.width();
            slideHeight = slider.height();
            slideHelperHeight = slideHelper.height();
            alphaWidth = alphaSlider.width();
            alphaSlideHelperWidth = alphaSlideHelper.width();

            if (!flat) {
                container.css("position", "absolute");
                if (opts.offset) {
                    container.offset(opts.offset);
                } else {
                    container.offset(getOffset(container, offsetElement));
                }
            }

            updateHelperLocations();

            if (opts.showPalette) {
                drawPalette();
            }

            boundElement.trigger('reflow.spectrum');
        }

        function destroy() {
            boundElement.show();
            offsetElement.unbind("click.spectrum touchstart.spectrum");
            container.remove();
            replacer.remove();
            spectrums[spect.id] = null;
        }

        function option(optionName, optionValue) {
            if (optionName === undefined) {
                return $.extend({}, opts);
            }
            if (optionValue === undefined) {
                return opts[optionName];
            }

            opts[optionName] = optionValue;

            if (optionName === "preferredFormat") {
                currentPreferredFormat = opts.preferredFormat;
            }
            applyOptions();
        }

        function enable() {
            disabled = false;
            boundElement.attr("disabled", false);
            offsetElement.removeClass("sp-disabled");
        }

        function disable() {
            hide();
            disabled = true;
            boundElement.attr("disabled", true);
            offsetElement.addClass("sp-disabled");
        }

        function setOffset(coord) {
            opts.offset = coord;
            reflow();
        }

        initialize();

        var spect = {
            show: show,
            hide: hide,
            toggle: toggle,
            reflow: reflow,
            option: option,
            enable: enable,
            disable: disable,
            offset: setOffset,
            set: function (c) {
                set(c);
                updateOriginalInput();
            },
            get: get,
            destroy: destroy,
            container: container
        };

        spect.id = spectrums.push(spect) - 1;

        return spect;
    }

    /**
    * checkOffset - get the offset below/above and left/right element depending on screen position
    * Thanks https://github.com/jquery/jquery-ui/blob/master/ui/jquery.ui.datepicker.js
    */
    function getOffset(picker, input) {
        var extraY = 0;
        var dpWidth = picker.outerWidth();
        var dpHeight = picker.outerHeight();
        var inputHeight = input.outerHeight();
        var doc = picker[0].ownerDocument;
        var docElem = doc.documentElement;
        var viewWidth = docElem.clientWidth + $(doc).scrollLeft();
        var viewHeight = docElem.clientHeight + $(doc).scrollTop();
        var offset = input.offset();
        offset.top += inputHeight;

        offset.left -=
            Math.min(offset.left, (offset.left + dpWidth > viewWidth && viewWidth > dpWidth) ?
            Math.abs(offset.left + dpWidth - viewWidth) : 0);

        offset.top -=
            Math.min(offset.top, ((offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ?
            Math.abs(dpHeight + inputHeight - extraY) : extraY));

        return offset;
    }

    /**
    * noop - do nothing
    */
    function noop() {

    }

    /**
    * stopPropagation - makes the code only doing this a little easier to read in line
    */
    function stopPropagation(e) {
        e.stopPropagation();
    }

    /**
    * Create a function bound to a given object
    * Thanks to underscore.js
    */
    function bind(func, obj) {
        var slice = Array.prototype.slice;
        var args = slice.call(arguments, 2);
        return function () {
            return func.apply(obj, args.concat(slice.call(arguments)));
        };
    }

    /**
    * Lightweight drag helper.  Handles containment within the element, so that
    * when dragging, the x is within [0,element.width] and y is within [0,element.height]
    */
    function draggable(element, onmove, onstart, onstop) {
        onmove = onmove || function () { };
        onstart = onstart || function () { };
        onstop = onstop || function () { };
        var doc = document;
        var dragging = false;
        var offset = {};
        var maxHeight = 0;
        var maxWidth = 0;
        var hasTouch = ('ontouchstart' in window);

        var duringDragEvents = {};
        duringDragEvents["selectstart"] = prevent;
        duringDragEvents["dragstart"] = prevent;
        duringDragEvents["touchmove mousemove"] = move;
        duringDragEvents["touchend mouseup"] = stop;

        function prevent(e) {
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            if (e.preventDefault) {
                e.preventDefault();
            }
            e.returnValue = false;
        }

        function move(e) {
            if (dragging) {
                // Mouseup happened outside of window
                if (IE && doc.documentMode < 9 && !e.button) {
                    return stop();
                }

                var t0 = e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0];
                var pageX = t0 && t0.pageX || e.pageX;
                var pageY = t0 && t0.pageY || e.pageY;

                var dragX = Math.max(0, Math.min(pageX - offset.left, maxWidth));
                var dragY = Math.max(0, Math.min(pageY - offset.top, maxHeight));

                if (hasTouch) {
                    // Stop scrolling in iOS
                    prevent(e);
                }

                onmove.apply(element, [dragX, dragY, e]);
            }
        }

        function start(e) {
            var rightclick = (e.which) ? (e.which == 3) : (e.button == 2);

            if (!rightclick && !dragging) {
                if (onstart.apply(element, arguments) !== false) {
                    dragging = true;
                    maxHeight = $(element).height();
                    maxWidth = $(element).width();
                    offset = $(element).offset();

                    $(doc).bind(duringDragEvents);
                    $(doc.body).addClass("sp-dragging");

                    move(e);

                    prevent(e);
                }
            }
        }

        function stop() {
            if (dragging) {
                $(doc).unbind(duringDragEvents);
                $(doc.body).removeClass("sp-dragging");

                // Wait a tick before notifying observers to allow the click event
                // to fire in Chrome.
                setTimeout(function() {
                    onstop.apply(element, arguments);
                }, 0);
            }
            dragging = false;
        }

        $(element).bind("touchstart mousedown", start);
    }

    function throttle(func, wait, debounce) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var throttler = function () {
                timeout = null;
                func.apply(context, args);
            };
            if (debounce) clearTimeout(timeout);
            if (debounce || !timeout) timeout = setTimeout(throttler, wait);
        };
    }

    function inputTypeColorSupport() {
        return $.fn.spectrum.inputTypeColorSupport();
    }

    /**
    * Define a jQuery plugin
    */
    var dataID = "spectrum.id";
    $.fn.spectrum = function (opts, extra) {

        if (typeof opts == "string") {

            var returnValue = this;
            var args = Array.prototype.slice.call( arguments, 1 );

            this.each(function () {
                var spect = spectrums[$(this).data(dataID)];
                if (spect) {
                    var method = spect[opts];
                    if (!method) {
                        throw new Error( "Spectrum: no such method: '" + opts + "'" );
                    }

                    if (opts == "get") {
                        returnValue = spect.get();
                    }
                    else if (opts == "container") {
                        returnValue = spect.container;
                    }
                    else if (opts == "option") {
                        returnValue = spect.option.apply(spect, args);
                    }
                    else if (opts == "destroy") {
                        spect.destroy();
                        $(this).removeData(dataID);
                    }
                    else {
                        method.apply(spect, args);
                    }
                }
            });

            return returnValue;
        }

        // Initializing a new instance of spectrum
        return this.spectrum("destroy").each(function () {
            var options = $.extend({}, opts, $(this).data());
            var spect = spectrum(this, options);
            $(this).data(dataID, spect.id);
        });
    };

    $.fn.spectrum.load = true;
    $.fn.spectrum.loadOpts = {};
    $.fn.spectrum.draggable = draggable;
    $.fn.spectrum.defaults = defaultOpts;
    $.fn.spectrum.inputTypeColorSupport = function inputTypeColorSupport() {
        if (typeof inputTypeColorSupport._cachedResult === "undefined") {
            var colorInput = $("<input type='color'/>")[0]; // if color element is supported, value will default to not null
            inputTypeColorSupport._cachedResult = colorInput.type === "color" && colorInput.value !== "";
        }
        return inputTypeColorSupport._cachedResult;
    };

    $.spectrum = { };
    $.spectrum.localization = { };
    $.spectrum.palettes = { };

    $.fn.spectrum.processNativeColorInputs = function () {
        var colorInputs = $("input[type=color]");
        if (colorInputs.length && !inputTypeColorSupport()) {
            colorInputs.spectrum({
                preferredFormat: "hex6"
            });
        }
    };

    // TinyColor v1.1.2
    // https://github.com/bgrins/TinyColor
    // Brian Grinstead, MIT License

    (function() {

    var trimLeft = /^[\s,#]+/,
        trimRight = /\s+$/,
        tinyCounter = 0,
        math = Math,
        mathRound = math.round,
        mathMin = math.min,
        mathMax = math.max,
        mathRandom = math.random;

    var tinycolor = function(color, opts) {

        color = (color) ? color : '';
        opts = opts || { };

        // If input is already a tinycolor, return itself
        if (color instanceof tinycolor) {
           return color;
        }
        // If we are called as a function, call using new instead
        if (!(this instanceof tinycolor)) {
            return new tinycolor(color, opts);
        }

        var rgb = inputToRGB(color);
        this._originalInput = color,
        this._r = rgb.r,
        this._g = rgb.g,
        this._b = rgb.b,
        this._a = rgb.a,
        this._roundA = mathRound(100*this._a) / 100,
        this._format = opts.format || rgb.format;
        this._gradientType = opts.gradientType;

        // Don't let the range of [0,255] come back in [0,1].
        // Potentially lose a little bit of precision here, but will fix issues where
        // .5 gets interpreted as half of the total, instead of half of 1
        // If it was supposed to be 128, this was already taken care of by `inputToRgb`
        if (this._r < 1) { this._r = mathRound(this._r); }
        if (this._g < 1) { this._g = mathRound(this._g); }
        if (this._b < 1) { this._b = mathRound(this._b); }

        this._ok = rgb.ok;
        this._tc_id = tinyCounter++;
    };

    tinycolor.prototype = {
        isDark: function() {
            return this.getBrightness() < 128;
        },
        isLight: function() {
            return !this.isDark();
        },
        isValid: function() {
            return this._ok;
        },
        getOriginalInput: function() {
          return this._originalInput;
        },
        getFormat: function() {
            return this._format;
        },
        getAlpha: function() {
            return this._a;
        },
        getBrightness: function() {
            var rgb = this.toRgb();
            return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
        },
        setAlpha: function(value) {
            this._a = boundAlpha(value);
            this._roundA = mathRound(100*this._a) / 100;
            return this;
        },
        toHsv: function() {
            var hsv = rgbToHsv(this._r, this._g, this._b);
            return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a };
        },
        toHsvString: function() {
            var hsv = rgbToHsv(this._r, this._g, this._b);
            var h = mathRound(hsv.h * 360), s = mathRound(hsv.s * 100), v = mathRound(hsv.v * 100);
            return (this._a == 1) ?
              "hsv("  + h + ", " + s + "%, " + v + "%)" :
              "hsva(" + h + ", " + s + "%, " + v + "%, "+ this._roundA + ")";
        },
        toHsl: function() {
            var hsl = rgbToHsl(this._r, this._g, this._b);
            return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a };
        },
        toHslString: function() {
            var hsl = rgbToHsl(this._r, this._g, this._b);
            var h = mathRound(hsl.h * 360), s = mathRound(hsl.s * 100), l = mathRound(hsl.l * 100);
            return (this._a == 1) ?
              "hsl("  + h + ", " + s + "%, " + l + "%)" :
              "hsla(" + h + ", " + s + "%, " + l + "%, "+ this._roundA + ")";
        },
        toHex: function(allow3Char) {
            return rgbToHex(this._r, this._g, this._b, allow3Char);
        },
        toHexString: function(allow3Char) {
            return '#' + this.toHex(allow3Char);
        },
        toHex8: function() {
            return rgbaToHex(this._r, this._g, this._b, this._a);
        },
        toHex8String: function() {
            return '#' + this.toHex8();
        },
        toRgb: function() {
            return { r: mathRound(this._r), g: mathRound(this._g), b: mathRound(this._b), a: this._a };
        },
        toRgbString: function() {
            return (this._a == 1) ?
              "rgb("  + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" :
              "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
        },
        toPercentageRgb: function() {
            return { r: mathRound(bound01(this._r, 255) * 100) + "%", g: mathRound(bound01(this._g, 255) * 100) + "%", b: mathRound(bound01(this._b, 255) * 100) + "%", a: this._a };
        },
        toPercentageRgbString: function() {
            return (this._a == 1) ?
              "rgb("  + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" :
              "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
        },
        toName: function() {
            if (this._a === 0) {
                return "transparent";
            }

            if (this._a < 1) {
                return false;
            }

            return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
        },
        toFilter: function(secondColor) {
            var hex8String = '#' + rgbaToHex(this._r, this._g, this._b, this._a);
            var secondHex8String = hex8String;
            var gradientType = this._gradientType ? "GradientType = 1, " : "";

            if (secondColor) {
                var s = tinycolor(secondColor);
                secondHex8String = s.toHex8String();
            }

            return "progid:DXImageTransform.Microsoft.gradient("+gradientType+"startColorstr="+hex8String+",endColorstr="+secondHex8String+")";
        },
        toString: function(format) {
            var formatSet = !!format;
            format = format || this._format;

            var formattedString = false;
            var hasAlpha = this._a < 1 && this._a >= 0;
            var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "name");

            if (needsAlphaFormat) {
                // Special case for "transparent", all other non-alpha formats
                // will return rgba when there is transparency.
                if (format === "name" && this._a === 0) {
                    return this.toName();
                }
                return this.toRgbString();
            }
            if (format === "rgb") {
                formattedString = this.toRgbString();
            }
            if (format === "prgb") {
                formattedString = this.toPercentageRgbString();
            }
            if (format === "hex" || format === "hex6") {
                formattedString = this.toHexString();
            }
            if (format === "hex3") {
                formattedString = this.toHexString(true);
            }
            if (format === "hex8") {
                formattedString = this.toHex8String();
            }
            if (format === "name") {
                formattedString = this.toName();
            }
            if (format === "hsl") {
                formattedString = this.toHslString();
            }
            if (format === "hsv") {
                formattedString = this.toHsvString();
            }

            return formattedString || this.toHexString();
        },

        _applyModification: function(fn, args) {
            var color = fn.apply(null, [this].concat([].slice.call(args)));
            this._r = color._r;
            this._g = color._g;
            this._b = color._b;
            this.setAlpha(color._a);
            return this;
        },
        lighten: function() {
            return this._applyModification(lighten, arguments);
        },
        brighten: function() {
            return this._applyModification(brighten, arguments);
        },
        darken: function() {
            return this._applyModification(darken, arguments);
        },
        desaturate: function() {
            return this._applyModification(desaturate, arguments);
        },
        saturate: function() {
            return this._applyModification(saturate, arguments);
        },
        greyscale: function() {
            return this._applyModification(greyscale, arguments);
        },
        spin: function() {
            return this._applyModification(spin, arguments);
        },

        _applyCombination: function(fn, args) {
            return fn.apply(null, [this].concat([].slice.call(args)));
        },
        analogous: function() {
            return this._applyCombination(analogous, arguments);
        },
        complement: function() {
            return this._applyCombination(complement, arguments);
        },
        monochromatic: function() {
            return this._applyCombination(monochromatic, arguments);
        },
        splitcomplement: function() {
            return this._applyCombination(splitcomplement, arguments);
        },
        triad: function() {
            return this._applyCombination(triad, arguments);
        },
        tetrad: function() {
            return this._applyCombination(tetrad, arguments);
        }
    };

    // If input is an object, force 1 into "1.0" to handle ratios properly
    // String input requires "1.0" as input, so 1 will be treated as 1
    tinycolor.fromRatio = function(color, opts) {
        if (typeof color == "object") {
            var newColor = {};
            for (var i in color) {
                if (color.hasOwnProperty(i)) {
                    if (i === "a") {
                        newColor[i] = color[i];
                    }
                    else {
                        newColor[i] = convertToPercentage(color[i]);
                    }
                }
            }
            color = newColor;
        }

        return tinycolor(color, opts);
    };

    // Given a string or object, convert that input to RGB
    // Possible string inputs:
    //
    //     "red"
    //     "#f00" or "f00"
    //     "#ff0000" or "ff0000"
    //     "#ff000000" or "ff000000"
    //     "rgb 255 0 0" or "rgb (255, 0, 0)"
    //     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
    //     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
    //     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
    //     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
    //     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
    //     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
    //
    function inputToRGB(color) {

        var rgb = { r: 0, g: 0, b: 0 };
        var a = 1;
        var ok = false;
        var format = false;

        if (typeof color == "string") {
            color = stringInputToObject(color);
        }

        if (typeof color == "object") {
            if (color.hasOwnProperty("r") && color.hasOwnProperty("g") && color.hasOwnProperty("b")) {
                rgb = rgbToRgb(color.r, color.g, color.b);
                ok = true;
                format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
            }
            else if (color.hasOwnProperty("h") && color.hasOwnProperty("s") && color.hasOwnProperty("v")) {
                color.s = convertToPercentage(color.s);
                color.v = convertToPercentage(color.v);
                rgb = hsvToRgb(color.h, color.s, color.v);
                ok = true;
                format = "hsv";
            }
            else if (color.hasOwnProperty("h") && color.hasOwnProperty("s") && color.hasOwnProperty("l")) {
                color.s = convertToPercentage(color.s);
                color.l = convertToPercentage(color.l);
                rgb = hslToRgb(color.h, color.s, color.l);
                ok = true;
                format = "hsl";
            }

            if (color.hasOwnProperty("a")) {
                a = color.a;
            }
        }

        a = boundAlpha(a);

        return {
            ok: ok,
            format: color.format || format,
            r: mathMin(255, mathMax(rgb.r, 0)),
            g: mathMin(255, mathMax(rgb.g, 0)),
            b: mathMin(255, mathMax(rgb.b, 0)),
            a: a
        };
    }


    // Conversion Functions
    // --------------------

    // `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
    // <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

    // `rgbToRgb`
    // Handle bounds / percentage checking to conform to CSS color spec
    // <http://www.w3.org/TR/css3-color/>
    // *Assumes:* r, g, b in [0, 255] or [0, 1]
    // *Returns:* { r, g, b } in [0, 255]
    function rgbToRgb(r, g, b){
        return {
            r: bound01(r, 255) * 255,
            g: bound01(g, 255) * 255,
            b: bound01(b, 255) * 255
        };
    }

    // `rgbToHsl`
    // Converts an RGB color value to HSL.
    // *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
    // *Returns:* { h, s, l } in [0,1]
    function rgbToHsl(r, g, b) {

        r = bound01(r, 255);
        g = bound01(g, 255);
        b = bound01(b, 255);

        var max = mathMax(r, g, b), min = mathMin(r, g, b);
        var h, s, l = (max + min) / 2;

        if(max == min) {
            h = s = 0; // achromatic
        }
        else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }

            h /= 6;
        }

        return { h: h, s: s, l: l };
    }

    // `hslToRgb`
    // Converts an HSL color value to RGB.
    // *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
    // *Returns:* { r, g, b } in the set [0, 255]
    function hslToRgb(h, s, l) {
        var r, g, b;

        h = bound01(h, 360);
        s = bound01(s, 100);
        l = bound01(l, 100);

        function hue2rgb(p, q, t) {
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        if(s === 0) {
            r = g = b = l; // achromatic
        }
        else {
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }

        return { r: r * 255, g: g * 255, b: b * 255 };
    }

    // `rgbToHsv`
    // Converts an RGB color value to HSV
    // *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
    // *Returns:* { h, s, v } in [0,1]
    function rgbToHsv(r, g, b) {

        r = bound01(r, 255);
        g = bound01(g, 255);
        b = bound01(b, 255);

        var max = mathMax(r, g, b), min = mathMin(r, g, b);
        var h, s, v = max;

        var d = max - min;
        s = max === 0 ? 0 : d / max;

        if(max == min) {
            h = 0; // achromatic
        }
        else {
            switch(max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return { h: h, s: s, v: v };
    }

    // `hsvToRgb`
    // Converts an HSV color value to RGB.
    // *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
    // *Returns:* { r, g, b } in the set [0, 255]
     function hsvToRgb(h, s, v) {

        h = bound01(h, 360) * 6;
        s = bound01(s, 100);
        v = bound01(v, 100);

        var i = math.floor(h),
            f = h - i,
            p = v * (1 - s),
            q = v * (1 - f * s),
            t = v * (1 - (1 - f) * s),
            mod = i % 6,
            r = [v, q, p, p, t, v][mod],
            g = [t, v, v, q, p, p][mod],
            b = [p, p, t, v, v, q][mod];

        return { r: r * 255, g: g * 255, b: b * 255 };
    }

    // `rgbToHex`
    // Converts an RGB color to hex
    // Assumes r, g, and b are contained in the set [0, 255]
    // Returns a 3 or 6 character hex
    function rgbToHex(r, g, b, allow3Char) {

        var hex = [
            pad2(mathRound(r).toString(16)),
            pad2(mathRound(g).toString(16)),
            pad2(mathRound(b).toString(16))
        ];

        // Return a 3 character hex if possible
        if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
            return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
        }

        return hex.join("");
    }
        // `rgbaToHex`
        // Converts an RGBA color plus alpha transparency to hex
        // Assumes r, g, b and a are contained in the set [0, 255]
        // Returns an 8 character hex
        function rgbaToHex(r, g, b, a) {

            var hex = [
                pad2(convertDecimalToHex(a)),
                pad2(mathRound(r).toString(16)),
                pad2(mathRound(g).toString(16)),
                pad2(mathRound(b).toString(16))
            ];

            return hex.join("");
        }

    // `equals`
    // Can be called with any tinycolor input
    tinycolor.equals = function (color1, color2) {
        if (!color1 || !color2) { return false; }
        return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
    };
    tinycolor.random = function() {
        return tinycolor.fromRatio({
            r: mathRandom(),
            g: mathRandom(),
            b: mathRandom()
        });
    };


    // Modification Functions
    // ----------------------
    // Thanks to less.js for some of the basics here
    // <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>

    function desaturate(color, amount) {
        amount = (amount === 0) ? 0 : (amount || 10);
        var hsl = tinycolor(color).toHsl();
        hsl.s -= amount / 100;
        hsl.s = clamp01(hsl.s);
        return tinycolor(hsl);
    }

    function saturate(color, amount) {
        amount = (amount === 0) ? 0 : (amount || 10);
        var hsl = tinycolor(color).toHsl();
        hsl.s += amount / 100;
        hsl.s = clamp01(hsl.s);
        return tinycolor(hsl);
    }

    function greyscale(color) {
        return tinycolor(color).desaturate(100);
    }

    function lighten (color, amount) {
        amount = (amount === 0) ? 0 : (amount || 10);
        var hsl = tinycolor(color).toHsl();
        hsl.l += amount / 100;
        hsl.l = clamp01(hsl.l);
        return tinycolor(hsl);
    }

    function brighten(color, amount) {
        amount = (amount === 0) ? 0 : (amount || 10);
        var rgb = tinycolor(color).toRgb();
        rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * - (amount / 100))));
        rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * - (amount / 100))));
        rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * - (amount / 100))));
        return tinycolor(rgb);
    }

    function darken (color, amount) {
        amount = (amount === 0) ? 0 : (amount || 10);
        var hsl = tinycolor(color).toHsl();
        hsl.l -= amount / 100;
        hsl.l = clamp01(hsl.l);
        return tinycolor(hsl);
    }

    // Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
    // Values outside of this range will be wrapped into this range.
    function spin(color, amount) {
        var hsl = tinycolor(color).toHsl();
        var hue = (mathRound(hsl.h) + amount) % 360;
        hsl.h = hue < 0 ? 360 + hue : hue;
        return tinycolor(hsl);
    }

    // Combination Functions
    // ---------------------
    // Thanks to jQuery xColor for some of the ideas behind these
    // <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>

    function complement(color) {
        var hsl = tinycolor(color).toHsl();
        hsl.h = (hsl.h + 180) % 360;
        return tinycolor(hsl);
    }

    function triad(color) {
        var hsl = tinycolor(color).toHsl();
        var h = hsl.h;
        return [
            tinycolor(color),
            tinycolor({ h: (h + 120) % 360, s: hsl.s, l: hsl.l }),
            tinycolor({ h: (h + 240) % 360, s: hsl.s, l: hsl.l })
        ];
    }

    function tetrad(color) {
        var hsl = tinycolor(color).toHsl();
        var h = hsl.h;
        return [
            tinycolor(color),
            tinycolor({ h: (h + 90) % 360, s: hsl.s, l: hsl.l }),
            tinycolor({ h: (h + 180) % 360, s: hsl.s, l: hsl.l }),
            tinycolor({ h: (h + 270) % 360, s: hsl.s, l: hsl.l })
        ];
    }

    function splitcomplement(color) {
        var hsl = tinycolor(color).toHsl();
        var h = hsl.h;
        return [
            tinycolor(color),
            tinycolor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l}),
            tinycolor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l})
        ];
    }

    function analogous(color, results, slices) {
        results = results || 6;
        slices = slices || 30;

        var hsl = tinycolor(color).toHsl();
        var part = 360 / slices;
        var ret = [tinycolor(color)];

        for (hsl.h = ((hsl.h - (part * results >> 1)) + 720) % 360; --results; ) {
            hsl.h = (hsl.h + part) % 360;
            ret.push(tinycolor(hsl));
        }
        return ret;
    }

    function monochromatic(color, results) {
        results = results || 6;
        var hsv = tinycolor(color).toHsv();
        var h = hsv.h, s = hsv.s, v = hsv.v;
        var ret = [];
        var modification = 1 / results;

        while (results--) {
            ret.push(tinycolor({ h: h, s: s, v: v}));
            v = (v + modification) % 1;
        }

        return ret;
    }

    // Utility Functions
    // ---------------------

    tinycolor.mix = function(color1, color2, amount) {
        amount = (amount === 0) ? 0 : (amount || 50);

        var rgb1 = tinycolor(color1).toRgb();
        var rgb2 = tinycolor(color2).toRgb();

        var p = amount / 100;
        var w = p * 2 - 1;
        var a = rgb2.a - rgb1.a;

        var w1;

        if (w * a == -1) {
            w1 = w;
        } else {
            w1 = (w + a) / (1 + w * a);
        }

        w1 = (w1 + 1) / 2;

        var w2 = 1 - w1;

        var rgba = {
            r: rgb2.r * w1 + rgb1.r * w2,
            g: rgb2.g * w1 + rgb1.g * w2,
            b: rgb2.b * w1 + rgb1.b * w2,
            a: rgb2.a * p  + rgb1.a * (1 - p)
        };

        return tinycolor(rgba);
    };


    // Readability Functions
    // ---------------------
    // <http://www.w3.org/TR/AERT#color-contrast>

    // `readability`
    // Analyze the 2 colors and returns an object with the following properties:
    //    `brightness`: difference in brightness between the two colors
    //    `color`: difference in color/hue between the two colors
    tinycolor.readability = function(color1, color2) {
        var c1 = tinycolor(color1);
        var c2 = tinycolor(color2);
        var rgb1 = c1.toRgb();
        var rgb2 = c2.toRgb();
        var brightnessA = c1.getBrightness();
        var brightnessB = c2.getBrightness();
        var colorDiff = (
            Math.max(rgb1.r, rgb2.r) - Math.min(rgb1.r, rgb2.r) +
            Math.max(rgb1.g, rgb2.g) - Math.min(rgb1.g, rgb2.g) +
            Math.max(rgb1.b, rgb2.b) - Math.min(rgb1.b, rgb2.b)
        );

        return {
            brightness: Math.abs(brightnessA - brightnessB),
            color: colorDiff
        };
    };

    // `readable`
    // http://www.w3.org/TR/AERT#color-contrast
    // Ensure that foreground and background color combinations provide sufficient contrast.
    // *Example*
    //    tinycolor.isReadable("#000", "#111") => false
    tinycolor.isReadable = function(color1, color2) {
        var readability = tinycolor.readability(color1, color2);
        return readability.brightness > 125 && readability.color > 500;
    };

    // `mostReadable`
    // Given a base color and a list of possible foreground or background
    // colors for that base, returns the most readable color.
    // *Example*
    //    tinycolor.mostReadable("#123", ["#fff", "#000"]) => "#000"
    tinycolor.mostReadable = function(baseColor, colorList) {
        var bestColor = null;
        var bestScore = 0;
        var bestIsReadable = false;
        for (var i=0; i < colorList.length; i++) {

            // We normalize both around the "acceptable" breaking point,
            // but rank brightness constrast higher than hue.

            var readability = tinycolor.readability(baseColor, colorList[i]);
            var readable = readability.brightness > 125 && readability.color > 500;
            var score = 3 * (readability.brightness / 125) + (readability.color / 500);

            if ((readable && ! bestIsReadable) ||
                (readable && bestIsReadable && score > bestScore) ||
                ((! readable) && (! bestIsReadable) && score > bestScore)) {
                bestIsReadable = readable;
                bestScore = score;
                bestColor = tinycolor(colorList[i]);
            }
        }
        return bestColor;
    };


    // Big List of Colors
    // ------------------
    // <http://www.w3.org/TR/css3-color/#svg-color>
    var names = tinycolor.names = {
        aliceblue: "f0f8ff",
        antiquewhite: "faebd7",
        aqua: "0ff",
        aquamarine: "7fffd4",
        azure: "f0ffff",
        beige: "f5f5dc",
        bisque: "ffe4c4",
        black: "000",
        blanchedalmond: "ffebcd",
        blue: "00f",
        blueviolet: "8a2be2",
        brown: "a52a2a",
        burlywood: "deb887",
        burntsienna: "ea7e5d",
        cadetblue: "5f9ea0",
        chartreuse: "7fff00",
        chocolate: "d2691e",
        coral: "ff7f50",
        cornflowerblue: "6495ed",
        cornsilk: "fff8dc",
        crimson: "dc143c",
        cyan: "0ff",
        darkblue: "00008b",
        darkcyan: "008b8b",
        darkgoldenrod: "b8860b",
        darkgray: "a9a9a9",
        darkgreen: "006400",
        darkgrey: "a9a9a9",
        darkkhaki: "bdb76b",
        darkmagenta: "8b008b",
        darkolivegreen: "556b2f",
        darkorange: "ff8c00",
        darkorchid: "9932cc",
        darkred: "8b0000",
        darksalmon: "e9967a",
        darkseagreen: "8fbc8f",
        darkslateblue: "483d8b",
        darkslategray: "2f4f4f",
        darkslategrey: "2f4f4f",
        darkturquoise: "00ced1",
        darkviolet: "9400d3",
        deeppink: "ff1493",
        deepskyblue: "00bfff",
        dimgray: "696969",
        dimgrey: "696969",
        dodgerblue: "1e90ff",
        firebrick: "b22222",
        floralwhite: "fffaf0",
        forestgreen: "228b22",
        fuchsia: "f0f",
        gainsboro: "dcdcdc",
        ghostwhite: "f8f8ff",
        gold: "ffd700",
        goldenrod: "daa520",
        gray: "808080",
        green: "008000",
        greenyellow: "adff2f",
        grey: "808080",
        honeydew: "f0fff0",
        hotpink: "ff69b4",
        indianred: "cd5c5c",
        indigo: "4b0082",
        ivory: "fffff0",
        khaki: "f0e68c",
        lavender: "e6e6fa",
        lavenderblush: "fff0f5",
        lawngreen: "7cfc00",
        lemonchiffon: "fffacd",
        lightblue: "add8e6",
        lightcoral: "f08080",
        lightcyan: "e0ffff",
        lightgoldenrodyellow: "fafad2",
        lightgray: "d3d3d3",
        lightgreen: "90ee90",
        lightgrey: "d3d3d3",
        lightpink: "ffb6c1",
        lightsalmon: "ffa07a",
        lightseagreen: "20b2aa",
        lightskyblue: "87cefa",
        lightslategray: "789",
        lightslategrey: "789",
        lightsteelblue: "b0c4de",
        lightyellow: "ffffe0",
        lime: "0f0",
        limegreen: "32cd32",
        linen: "faf0e6",
        magenta: "f0f",
        maroon: "800000",
        mediumaquamarine: "66cdaa",
        mediumblue: "0000cd",
        mediumorchid: "ba55d3",
        mediumpurple: "9370db",
        mediumseagreen: "3cb371",
        mediumslateblue: "7b68ee",
        mediumspringgreen: "00fa9a",
        mediumturquoise: "48d1cc",
        mediumvioletred: "c71585",
        midnightblue: "191970",
        mintcream: "f5fffa",
        mistyrose: "ffe4e1",
        moccasin: "ffe4b5",
        navajowhite: "ffdead",
        navy: "000080",
        oldlace: "fdf5e6",
        olive: "808000",
        olivedrab: "6b8e23",
        orange: "ffa500",
        orangered: "ff4500",
        orchid: "da70d6",
        palegoldenrod: "eee8aa",
        palegreen: "98fb98",
        paleturquoise: "afeeee",
        palevioletred: "db7093",
        papayawhip: "ffefd5",
        peachpuff: "ffdab9",
        peru: "cd853f",
        pink: "ffc0cb",
        plum: "dda0dd",
        powderblue: "b0e0e6",
        purple: "800080",
        rebeccapurple: "663399",
        red: "f00",
        rosybrown: "bc8f8f",
        royalblue: "4169e1",
        saddlebrown: "8b4513",
        salmon: "fa8072",
        sandybrown: "f4a460",
        seagreen: "2e8b57",
        seashell: "fff5ee",
        sienna: "a0522d",
        silver: "c0c0c0",
        skyblue: "87ceeb",
        slateblue: "6a5acd",
        slategray: "708090",
        slategrey: "708090",
        snow: "fffafa",
        springgreen: "00ff7f",
        steelblue: "4682b4",
        tan: "d2b48c",
        teal: "008080",
        thistle: "d8bfd8",
        tomato: "ff6347",
        turquoise: "40e0d0",
        violet: "ee82ee",
        wheat: "f5deb3",
        white: "fff",
        whitesmoke: "f5f5f5",
        yellow: "ff0",
        yellowgreen: "9acd32"
    };

    // Make it easy to access colors via `hexNames[hex]`
    var hexNames = tinycolor.hexNames = flip(names);


    // Utilities
    // ---------

    // `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
    function flip(o) {
        var flipped = { };
        for (var i in o) {
            if (o.hasOwnProperty(i)) {
                flipped[o[i]] = i;
            }
        }
        return flipped;
    }

    // Return a valid alpha value [0,1] with all invalid values being set to 1
    function boundAlpha(a) {
        a = parseFloat(a);

        if (isNaN(a) || a < 0 || a > 1) {
            a = 1;
        }

        return a;
    }

    // Take input from [0, n] and return it as [0, 1]
    function bound01(n, max) {
        if (isOnePointZero(n)) { n = "100%"; }

        var processPercent = isPercentage(n);
        n = mathMin(max, mathMax(0, parseFloat(n)));

        // Automatically convert percentage into number
        if (processPercent) {
            n = parseInt(n * max, 10) / 100;
        }

        // Handle floating point rounding errors
        if ((math.abs(n - max) < 0.000001)) {
            return 1;
        }

        // Convert into [0, 1] range if it isn't already
        return (n % max) / parseFloat(max);
    }

    // Force a number between 0 and 1
    function clamp01(val) {
        return mathMin(1, mathMax(0, val));
    }

    // Parse a base-16 hex value into a base-10 integer
    function parseIntFromHex(val) {
        return parseInt(val, 16);
    }

    // Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
    // <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
    function isOnePointZero(n) {
        return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
    }

    // Check to see if string passed in is a percentage
    function isPercentage(n) {
        return typeof n === "string" && n.indexOf('%') != -1;
    }

    // Force a hex value to have 2 characters
    function pad2(c) {
        return c.length == 1 ? '0' + c : '' + c;
    }

    // Replace a decimal with it's percentage value
    function convertToPercentage(n) {
        if (n <= 1) {
            n = (n * 100) + "%";
        }

        return n;
    }

    // Converts a decimal to a hex value
    function convertDecimalToHex(d) {
        return Math.round(parseFloat(d) * 255).toString(16);
    }
    // Converts a hex value to a decimal
    function convertHexToDecimal(h) {
        return (parseIntFromHex(h) / 255);
    }

    var matchers = (function() {

        // <http://www.w3.org/TR/css3-values/#integers>
        var CSS_INTEGER = "[-\\+]?\\d+%?";

        // <http://www.w3.org/TR/css3-values/#number-value>
        var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

        // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
        var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

        // Actual matching.
        // Parentheses and commas are optional, but not required.
        // Whitespace can take the place of commas or opening paren
        var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
        var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";

        return {
            rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
            rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
            hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
            hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
            hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
            hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
            hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
            hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
            hex8: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
        };
    })();

    // `stringInputToObject`
    // Permissive string parsing.  Take in a number of formats, and output an object
    // based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
    function stringInputToObject(color) {

        color = color.replace(trimLeft,'').replace(trimRight, '').toLowerCase();
        var named = false;
        if (names[color]) {
            color = names[color];
            named = true;
        }
        else if (color == 'transparent') {
            return { r: 0, g: 0, b: 0, a: 0, format: "name" };
        }

        // Try to match string input using regular expressions.
        // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
        // Just return an object and let the conversion functions handle that.
        // This way the result will be the same whether the tinycolor is initialized with string or object.
        var match;
        if ((match = matchers.rgb.exec(color))) {
            return { r: match[1], g: match[2], b: match[3] };
        }
        if ((match = matchers.rgba.exec(color))) {
            return { r: match[1], g: match[2], b: match[3], a: match[4] };
        }
        if ((match = matchers.hsl.exec(color))) {
            return { h: match[1], s: match[2], l: match[3] };
        }
        if ((match = matchers.hsla.exec(color))) {
            return { h: match[1], s: match[2], l: match[3], a: match[4] };
        }
        if ((match = matchers.hsv.exec(color))) {
            return { h: match[1], s: match[2], v: match[3] };
        }
        if ((match = matchers.hsva.exec(color))) {
            return { h: match[1], s: match[2], v: match[3], a: match[4] };
        }
        if ((match = matchers.hex8.exec(color))) {
            return {
                a: convertHexToDecimal(match[1]),
                r: parseIntFromHex(match[2]),
                g: parseIntFromHex(match[3]),
                b: parseIntFromHex(match[4]),
                format: named ? "name" : "hex8"
            };
        }
        if ((match = matchers.hex6.exec(color))) {
            return {
                r: parseIntFromHex(match[1]),
                g: parseIntFromHex(match[2]),
                b: parseIntFromHex(match[3]),
                format: named ? "name" : "hex"
            };
        }
        if ((match = matchers.hex3.exec(color))) {
            return {
                r: parseIntFromHex(match[1] + '' + match[1]),
                g: parseIntFromHex(match[2] + '' + match[2]),
                b: parseIntFromHex(match[3] + '' + match[3]),
                format: named ? "name" : "hex"
            };
        }

        return false;
    }

    window.tinycolor = tinycolor;
    })();

    $(function () {
        if ($.fn.spectrum.load) {
            $.fn.spectrum.processNativeColorInputs();
        }
    });

});

},{"jquery":undefined}],"/Users/mattmesker/Sites/lacroix/node_modules/unidragger/unidragger.js":[function(require,module,exports){
/*!
 * Unidragger v2.1.0
 * Draggable base class
 * MIT license
 */

/*jshint browser: true, unused: true, undef: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'unipointer/unipointer'
    ], function( Unipointer ) {
      return factory( window, Unipointer );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('unipointer')
    );
  } else {
    // browser global
    window.Unidragger = factory(
      window,
      window.Unipointer
    );
  }

}( window, function factory( window, Unipointer ) {

'use strict';

// -----  ----- //

function noop() {}

// -------------------------- Unidragger -------------------------- //

function Unidragger() {}

// inherit Unipointer & EvEmitter
var proto = Unidragger.prototype = Object.create( Unipointer.prototype );

// ----- bind start ----- //

proto.bindHandles = function() {
  this._bindHandles( true );
};

proto.unbindHandles = function() {
  this._bindHandles( false );
};

var navigator = window.navigator;
/**
 * works as unbinder, as you can .bindHandles( false ) to unbind
 * @param {Boolean} isBind - will unbind if falsey
 */
proto._bindHandles = function( isBind ) {
  // munge isBind, default to true
  isBind = isBind === undefined ? true : !!isBind;
  // extra bind logic
  var binderExtra;
  if ( navigator.pointerEnabled ) {
    binderExtra = function( handle ) {
      // disable scrolling on the element
      handle.style.touchAction = isBind ? 'none' : '';
    };
  } else if ( navigator.msPointerEnabled ) {
    binderExtra = function( handle ) {
      // disable scrolling on the element
      handle.style.msTouchAction = isBind ? 'none' : '';
    };
  } else {
    binderExtra = noop;
  }
  // bind each handle
  var bindMethod = isBind ? 'addEventListener' : 'removeEventListener';
  for ( var i=0; i < this.handles.length; i++ ) {
    var handle = this.handles[i];
    this._bindStartEvent( handle, isBind );
    binderExtra( handle );
    handle[ bindMethod ]( 'click', this );
  }
};

// ----- start event ----- //

/**
 * pointer start
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerDown = function( event, pointer ) {
  // dismiss range sliders
  if ( event.target.nodeName == 'INPUT' && event.target.type == 'range' ) {
    // reset pointerDown logic
    this.isPointerDown = false;
    delete this.pointerIdentifier;
    return;
  }

  this._dragPointerDown( event, pointer );
  // kludge to blur focused inputs in dragger
  var focused = document.activeElement;
  if ( focused && focused.blur ) {
    focused.blur();
  }
  // bind move and end events
  this._bindPostStartEvents( event );
  this.emitEvent( 'pointerDown', [ event, pointer ] );
};

// base pointer down logic
proto._dragPointerDown = function( event, pointer ) {
  // track to see when dragging starts
  this.pointerDownPoint = Unipointer.getPointerPoint( pointer );

  var canPreventDefault = this.canPreventDefaultOnPointerDown( event, pointer );
  if ( canPreventDefault ) {
    event.preventDefault();
  }
};

// overwriteable method so Flickity can prevent for scrolling
proto.canPreventDefaultOnPointerDown = function( event ) {
  // prevent default, unless touchstart or <select>
  return event.target.nodeName != 'SELECT';
};

// ----- move event ----- //

/**
 * drag move
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerMove = function( event, pointer ) {
  var moveVector = this._dragPointerMove( event, pointer );
  this.emitEvent( 'pointerMove', [ event, pointer, moveVector ] );
  this._dragMove( event, pointer, moveVector );
};

// base pointer move logic
proto._dragPointerMove = function( event, pointer ) {
  var movePoint = Unipointer.getPointerPoint( pointer );
  var moveVector = {
    x: movePoint.x - this.pointerDownPoint.x,
    y: movePoint.y - this.pointerDownPoint.y
  };
  // start drag if pointer has moved far enough to start drag
  if ( !this.isDragging && this.hasDragStarted( moveVector ) ) {
    this._dragStart( event, pointer );
  }
  return moveVector;
};

// condition if pointer has moved far enough to start drag
proto.hasDragStarted = function( moveVector ) {
  return Math.abs( moveVector.x ) > 3 || Math.abs( moveVector.y ) > 3;
};


// ----- end event ----- //

/**
 * pointer up
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerUp = function( event, pointer ) {
  this.emitEvent( 'pointerUp', [ event, pointer ] );
  this._dragPointerUp( event, pointer );
};

proto._dragPointerUp = function( event, pointer ) {
  if ( this.isDragging ) {
    this._dragEnd( event, pointer );
  } else {
    // pointer didn't move enough for drag to start
    this._staticClick( event, pointer );
  }
};

// -------------------------- drag -------------------------- //

// dragStart
proto._dragStart = function( event, pointer ) {
  this.isDragging = true;
  this.dragStartPoint = Unipointer.getPointerPoint( pointer );
  // prevent clicks
  this.isPreventingClicks = true;

  this.dragStart( event, pointer );
};

proto.dragStart = function( event, pointer ) {
  this.emitEvent( 'dragStart', [ event, pointer ] );
};

// dragMove
proto._dragMove = function( event, pointer, moveVector ) {
  // do not drag if not dragging yet
  if ( !this.isDragging ) {
    return;
  }

  this.dragMove( event, pointer, moveVector );
};

proto.dragMove = function( event, pointer, moveVector ) {
  event.preventDefault();
  this.emitEvent( 'dragMove', [ event, pointer, moveVector ] );
};

// dragEnd
proto._dragEnd = function( event, pointer ) {
  // set flags
  this.isDragging = false;
  // re-enable clicking async
  setTimeout( function() {
    delete this.isPreventingClicks;
  }.bind( this ) );

  this.dragEnd( event, pointer );
};

proto.dragEnd = function( event, pointer ) {
  this.emitEvent( 'dragEnd', [ event, pointer ] );
};

// ----- onclick ----- //

// handle all clicks and prevent clicks when dragging
proto.onclick = function( event ) {
  if ( this.isPreventingClicks ) {
    event.preventDefault();
  }
};

// ----- staticClick ----- //

// triggered after pointer down & up with no/tiny movement
proto._staticClick = function( event, pointer ) {
  // ignore emulated mouse up clicks
  if ( this.isIgnoringMouseUp && event.type == 'mouseup' ) {
    return;
  }

  // allow click in <input>s and <textarea>s
  var nodeName = event.target.nodeName;
  if ( nodeName == 'INPUT' || nodeName == 'TEXTAREA' ) {
    event.target.focus();
  }
  this.staticClick( event, pointer );

  // set flag for emulated clicks 300ms after touchend
  if ( event.type != 'mouseup' ) {
    this.isIgnoringMouseUp = true;
    // reset flag after 300ms
    setTimeout( function() {
      delete this.isIgnoringMouseUp;
    }.bind( this ), 400 );
  }
};

proto.staticClick = function( event, pointer ) {
  this.emitEvent( 'staticClick', [ event, pointer ] );
};

// ----- utils ----- //

Unidragger.getPointerPoint = Unipointer.getPointerPoint;

// -----  ----- //

return Unidragger;

}));

},{"unipointer":"/Users/mattmesker/Sites/lacroix/node_modules/unipointer/unipointer.js"}],"/Users/mattmesker/Sites/lacroix/node_modules/unipointer/unipointer.js":[function(require,module,exports){
/*!
 * Unipointer v2.1.0
 * base class for doing one thing with pointer event
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /*global define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'ev-emitter/ev-emitter'
    ], function( EvEmitter ) {
      return factory( window, EvEmitter );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('ev-emitter')
    );
  } else {
    // browser global
    window.Unipointer = factory(
      window,
      window.EvEmitter
    );
  }

}( window, function factory( window, EvEmitter ) {

'use strict';

function noop() {}

function Unipointer() {}

// inherit EvEmitter
var proto = Unipointer.prototype = Object.create( EvEmitter.prototype );

proto.bindStartEvent = function( elem ) {
  this._bindStartEvent( elem, true );
};

proto.unbindStartEvent = function( elem ) {
  this._bindStartEvent( elem, false );
};

/**
 * works as unbinder, as you can ._bindStart( false ) to unbind
 * @param {Boolean} isBind - will unbind if falsey
 */
proto._bindStartEvent = function( elem, isBind ) {
  // munge isBind, default to true
  isBind = isBind === undefined ? true : !!isBind;
  var bindMethod = isBind ? 'addEventListener' : 'removeEventListener';

  if ( window.navigator.pointerEnabled ) {
    // W3C Pointer Events, IE11. See https://coderwall.com/p/mfreca
    elem[ bindMethod ]( 'pointerdown', this );
  } else if ( window.navigator.msPointerEnabled ) {
    // IE10 Pointer Events
    elem[ bindMethod ]( 'MSPointerDown', this );
  } else {
    // listen for both, for devices like Chrome Pixel
    elem[ bindMethod ]( 'mousedown', this );
    elem[ bindMethod ]( 'touchstart', this );
  }
};

// trigger handler methods for events
proto.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

// returns the touch that we're keeping track of
proto.getTouch = function( touches ) {
  for ( var i=0; i < touches.length; i++ ) {
    var touch = touches[i];
    if ( touch.identifier == this.pointerIdentifier ) {
      return touch;
    }
  }
};

// ----- start event ----- //

proto.onmousedown = function( event ) {
  // dismiss clicks from right or middle buttons
  var button = event.button;
  if ( button && ( button !== 0 && button !== 1 ) ) {
    return;
  }
  this._pointerDown( event, event );
};

proto.ontouchstart = function( event ) {
  this._pointerDown( event, event.changedTouches[0] );
};

proto.onMSPointerDown =
proto.onpointerdown = function( event ) {
  this._pointerDown( event, event );
};

/**
 * pointer start
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto._pointerDown = function( event, pointer ) {
  // dismiss other pointers
  if ( this.isPointerDown ) {
    return;
  }

  this.isPointerDown = true;
  // save pointer identifier to match up touch events
  this.pointerIdentifier = pointer.pointerId !== undefined ?
    // pointerId for pointer events, touch.indentifier for touch events
    pointer.pointerId : pointer.identifier;

  this.pointerDown( event, pointer );
};

proto.pointerDown = function( event, pointer ) {
  this._bindPostStartEvents( event );
  this.emitEvent( 'pointerDown', [ event, pointer ] );
};

// hash of events to be bound after start event
var postStartEvents = {
  mousedown: [ 'mousemove', 'mouseup' ],
  touchstart: [ 'touchmove', 'touchend', 'touchcancel' ],
  pointerdown: [ 'pointermove', 'pointerup', 'pointercancel' ],
  MSPointerDown: [ 'MSPointerMove', 'MSPointerUp', 'MSPointerCancel' ]
};

proto._bindPostStartEvents = function( event ) {
  if ( !event ) {
    return;
  }
  // get proper events to match start event
  var events = postStartEvents[ event.type ];
  // bind events to node
  events.forEach( function( eventName ) {
    window.addEventListener( eventName, this );
  }, this );
  // save these arguments
  this._boundPointerEvents = events;
};

proto._unbindPostStartEvents = function() {
  // check for _boundEvents, in case dragEnd triggered twice (old IE8 bug)
  if ( !this._boundPointerEvents ) {
    return;
  }
  this._boundPointerEvents.forEach( function( eventName ) {
    window.removeEventListener( eventName, this );
  }, this );

  delete this._boundPointerEvents;
};

// ----- move event ----- //

proto.onmousemove = function( event ) {
  this._pointerMove( event, event );
};

proto.onMSPointerMove =
proto.onpointermove = function( event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this._pointerMove( event, event );
  }
};

proto.ontouchmove = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this._pointerMove( event, touch );
  }
};

/**
 * pointer move
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */
proto._pointerMove = function( event, pointer ) {
  this.pointerMove( event, pointer );
};

// public
proto.pointerMove = function( event, pointer ) {
  this.emitEvent( 'pointerMove', [ event, pointer ] );
};

// ----- end event ----- //


proto.onmouseup = function( event ) {
  this._pointerUp( event, event );
};

proto.onMSPointerUp =
proto.onpointerup = function( event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this._pointerUp( event, event );
  }
};

proto.ontouchend = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this._pointerUp( event, touch );
  }
};

/**
 * pointer up
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */
proto._pointerUp = function( event, pointer ) {
  this._pointerDone();
  this.pointerUp( event, pointer );
};

// public
proto.pointerUp = function( event, pointer ) {
  this.emitEvent( 'pointerUp', [ event, pointer ] );
};

// ----- pointer done ----- //

// triggered on pointer up & pointer cancel
proto._pointerDone = function() {
  // reset properties
  this.isPointerDown = false;
  delete this.pointerIdentifier;
  // remove events
  this._unbindPostStartEvents();
  this.pointerDone();
};

proto.pointerDone = noop;

// ----- pointer cancel ----- //

proto.onMSPointerCancel =
proto.onpointercancel = function( event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this._pointerCancel( event, event );
  }
};

proto.ontouchcancel = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this._pointerCancel( event, touch );
  }
};

/**
 * pointer cancel
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */
proto._pointerCancel = function( event, pointer ) {
  this._pointerDone();
  this.pointerCancel( event, pointer );
};

// public
proto.pointerCancel = function( event, pointer ) {
  this.emitEvent( 'pointerCancel', [ event, pointer ] );
};

// -----  ----- //

// utility function for getting x/y coords from event
Unipointer.getPointerPoint = function( pointer ) {
  return {
    x: pointer.pageX,
    y: pointer.pageY
  };
};

// -----  ----- //

return Unipointer;

}));

},{"ev-emitter":"/Users/mattmesker/Sites/lacroix/node_modules/ev-emitter/ev-emitter.js"}],"/Users/mattmesker/Sites/lacroix/src/scripts/main.js":[function(require,module,exports){
(function (global){
'use strict';
/* ========================================================================== *
 * main.js
 *
 * @summary Nelson Cash Website Script Root
 *
 * Please, limit JavaScript inside this file. Create Modules!
 *
 * @copyright Nelson Cash, 2016
 * All rights reserved.
 * ========================================================================== */

/* External ================================================================= */

var $ = require('jquery');
var THREE = (typeof window !== "undefined" ? window['THREE'] : typeof global !== "undefined" ? global['THREE'] : null);
require('OBJLoader');
var saveSvgAsPng = require('save-svg-as-png');
var spectrum = require('spectrum-colorpicker');
var Draggabilly = require('draggabilly');
var debounce = require('lodash.debounce');

var lazySizes = require('lazysizes/lazysizes.js');
var unveilhooks = require('lazysizes/plugins/unveilhooks/ls.unveilhooks.js');
lazySizes.init();

var gifshot = require('gifshot');
var browser = require('bowser');

var Detector = require('Detector');

if (!Detector.webgl) {
  Detector.addGetWebGLMessage();
  $('body').addClass('hide-canv');
}

if (browser.msie && browser.version <= 11.0) {
  $('.internet-explorer').removeClass('hidden');
  $('body').addClass('hide-canv');
}


/* Interal ================================================================== */

var camera;
var scene;
var renderer;
var geometry;
var material;
var frame = 0;
var mouseX = 0;
var mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var canvWidth;
var canvHeight;

var gifArray = [];
var animatedGif;

var frames = 12;

var canObject;
var canPivot;

var singleImage;
var putId;
var putSlug;

var svgText = $('svg #type text');
svgText.attr('text-anchor', 'middle');
svgText.attr('x', '58');
svgText.attr('y', '-3');

var flavor;
var $body = $('body');
var $jsInput = $('.js-input');
var $inputColor = $('input[type="color"]');
var $spReplacer = $('.sp-replacer');


// Disclaimer: fuck the man =====================================================================
function disclaimer() {
  if (document.cookie.replace(/(?:(?:^|.*;\s*)closedMyLaCroixModal\s*\=\s*([^;]*).*$)|^.*$/, '$1') !== 'true') {
    $body.addClass('modal-open');
  }
}
// disclaimer();

if (window.location.hash) {
  var hash = window.location.hash.substring(1);
  console.log('hash: ' + hash);
  if (hash !== 'clean') {
    disclaimer();
  }
} else {
  disclaimer();
}
// console.log('window.location.hash', window.location.hash);

var $backdrop = $('.js-backdrop');
$backdrop.on('click', function(e) {
  e.preventDefault();
  console.log('close modal backdrop');
  $body.removeClass('modal-open');
  document.cookie = "closedMyLaCroixModal=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
});

$('.js-close-modal').on('click', function(e) {
  e.preventDefault();
  console.log('close modal');
  $body.removeClass('modal-open');
  document.cookie = "closedMyLaCroixModal=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
});



// TEXTURE =====================================================================
var textureLoader = new THREE.TextureLoader();

// TEXTURE: BUMP ===============================================================
var textureBump = textureLoader.load('/images/texture-bump.png');
// Set Map Render Filtering
textureBump.minFilter = THREE.NearestFilter;
textureBump.needsUpdate = true;

// TEXTURE: AMBIENT OCCLUSION ==================================================
var textureAo = textureLoader.load('/images/texture-ao.jpg');
// Map Render Filtering
textureAo.minFilter = THREE.LinearFilter;
textureAo.needsUpdate = true;


var can = function(texture) { // texture

  var loader = new THREE.OBJLoader();
  loader.load('/images/can4.obj', function(object) {
    canObject = object;
    // var ao = THREE.ImageUtils.loadTexture('../images/aotexture.jpg');
    // material = new THREE.MeshBasicMaterial({shading: THREE.SmoothShading, color: 0xffffff, ambient: 0xffffff, emissive: 0xa7a7a7, specular: 0xffffff, shininess: .7, map: texture, transparent: true, opacity: 1});
    material = new THREE.MeshStandardMaterial({
    // material = new THREE.MeshPhongMaterial({
      map: texture,
      bumpMap: textureBump,
      side: THREE.FrontSide,
      aoMap: textureAo,
      // Stronger AO Shadows Please :)
      aoMapIntensity: 0.35,
      shading: THREE.SmoothShading,
      roughness: 0.55,
      metalness: 0.45,
    });

    canObject.traverse(function(child) {
      if (child instanceof THREE.Mesh) {
        child.material = material;
        child.material.map.needsUpdate = true;
        child.material.needsUpdate = true;
      }
    });

    // UVW: 2nd UVs Required for AO ============================================

    var canGeometry = canObject.children[0].geometry;
    var uvs = canGeometry.attributes.uv.array;
    canGeometry.addAttribute( 'uv2', new THREE.BufferAttribute( uvs, 2 ) );

    // =========================================================================

    canObject.position.y = -12.28;
    scene.add(canObject);
    // rotate from center of object
    canPivot = new THREE.Object3D();
    canPivot.add(canObject);
    scene.add(canPivot);
  });
};


// Convert our svg to canvas to render on can
var tcanvas = document.createElement('canvas');
tcanvas.width = 1024;
tcanvas.height = 1024;
var img = document.createElement('img');
// var essveegee = document.getElementById('label');
var essveegee = document.getElementsByTagName('svg')[0];
var createImageOnCanvas = function() {
  saveSvgAsPng.svgAsDataUri(essveegee, {}, function(uri) {
    img.src = uri;
  });
  return img;
};

var setup = function() {
  if (window.innerWidth > 700) {
    canvWidth = window.innerWidth * 0.75;
  } else {
    canvWidth = window.innerWidth;
  }
  canvHeight = window.innerHeight;

  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true, // Smooth Object Edges
    // Physical Camera use Logarithmic Depth... Like Narwals.
    logarithmicDepthBuffer: true,
  });
  renderer.setClearColor( 0x000000, 0 );

  // Adjust Pixel Ratio for Retina Displays
  renderer.setPixelRatio(window.devicePixelRatio );
  renderer.setSize(canvWidth, canvHeight);

  document.querySelector('.js-canvas-container').appendChild(renderer.domElement);
  document.querySelector('.js-canvas-container').classList.add('loaded');

  document.addEventListener('mousemove', onDocumentMouseMove, false)
  window.addEventListener('resize', onWindowResize, false );

  camera = new THREE.PerspectiveCamera(45, canvWidth/canvHeight, 1, 2000);
  camera.position.z = 50;

  scene = new THREE.Scene();

  // LIGHT =====================================================================
  var ambient = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambient);


  // LIGHT: SKYLIGHT -----------------------------------------------------------
  var hemisphereLight = new THREE.HemisphereLight(0xFCFCD7, 0x080820, 0.45);
  scene.add(hemisphereLight);

  // LIGHT: KEY ----------------------------------------------------------------
  var directionalLight = new THREE.DirectionalLight(0xFCFCD7, 0.7);
  // var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  // Position Far Right
  directionalLight.position.set( 50, -2.5, 25 );
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  // LIGHT: FILL ---------------------------------------------------------------
  var fillLight = new THREE.DirectionalLight(0xFFF0DB, 0.45);
  // Position Far Left
  fillLight.position.set( -50, -2.5, 50 );
  scene.add(fillLight);


  createImageOnCanvas();
  var texture = new THREE.Texture(tcanvas);
  // http://stackoverflow.com/questions/16370617/is-it-possible-to-use-a-2d-canvas-as-a-texture-for-a-cube
  img.onload = function() {
    tcanvas.getContext('2d').drawImage(img, 0, 0);
    texture.needsUpdate = true;
  }
  can(texture);
};

var updateCan = function() {
  createImageOnCanvas();
  var updatedTexture = new THREE.Texture(tcanvas);
  // http://stackoverflow.com/questions/16370617/is-it-possible-to-use-a-2d-canvas-as-a-texture-for-a-cube
  img.onload = function() {
    tcanvas.getContext('2d').drawImage(img, 0, 0);
    updatedTexture.needsUpdate = true;
  }

  if (canObject !== undefined) {
    canObject.traverse(function(child) {
      if (child instanceof THREE.Mesh) {
        child.material.map = updatedTexture;
        child.material.map.needsUpdate = true;
        child.material.needsUpdate = true;
      }
    });
  }
};

var windowWidth = window.innerWidth;

var onWindowResize = function () {

  // prevent ios resize on scroll
  // http://stackoverflow.com/questions/8898412/iphone-ipad-triggering-unexpected-resize-events
  if (window.innerWidth != windowWidth) {
    canvWidth = window.innerWidth * 0.75;
    canvHeight = window.innerHeight;

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = canvWidth / canvHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(canvWidth, canvHeight);
  }
};

function onDocumentMouseMove( event ) {
  mouseX = ( event.clientX - (canvWidth/2) ) / 2;
  mouseY = ( event.clientY - (canvHeight/2) ) / 2;
};


var generating = false;
var current = 1;

function render() {
  // console.log('current: ' + current + ' | frames: ' + frames);
  if (generating === false) {
    // console.log('not generating');
    if (canObject !== undefined) {
      canPivot.rotation.y += Math.PI / 240;
      // canPivot.rotation.y = 106.2;
      canPivot.rotation.x = mouseY / canvHeight;
      // canPivot.rotation.x = mouseY / canvWidth;
      canPivot.rotation.z = mouseX / canvWidth;

      // canPivot.rotation.z = (-1 * mouseY / canvWidth)/2;
      // canPivot.rotation.z = 0;
      // canPivot.rotation.x += (mouseY - window.innerHeight * 0.015);
      // canPivot.rotation.x += (mouseX / canPivot.rotation.x) * .0025;
      // camera.lookAt( scene.position );

      renderer.render( scene, camera ); // reg render
    }

  } else {
    // canPivot.rotation.y += 360 / fps / frames;
    canPivot.rotation.y += (360 / frames) * Math.PI / 180;
    var meta = renderer.domElement;
    meta.width = 630;
    meta.height = 630;
    camera.aspect = 630/630;
    camera.updateProjectionMatrix();
    renderer.setSize(630, 630);

    renderer.render( scene, camera ); // render here so theres no black blip
    if (!browser.mobile) {
      if (current <= frames) {
        gifArray.push(meta.toDataURL());
      } else if (current > frames) {
        generating = false;
        current = 0;
        // console.log('postCan');
        // alert('gonna run gifshot');
        gifshot.createGIF({
          'images': gifArray,
          'gifWidth': 630,
          'gifHeight': 630,
          'interval': 0.15
        }, function(obj) {
            if (!obj.error) {
              animatedGif = obj.image;
              postCan();
            }
        });

      }
    } else {
      if (current === 1) {
        generating = false;
        current = 0;
        animatedGif = meta.toDataURL();
        postCan();
      }
    }
    current++;
  }
};


var flavors = [
  {
    "flavor": "Orange",
    "colors": [
      "#efc000",
      "#f49700",
      "#3ae7dd",
      "#0079d6",
      "#ec4700",
      "#0f2d73"
    ]
  },
  {
    "flavor": "Lime",
    "colors": [
      "#dde400",
      "#8fe142",
      "#06e8dc",
      "#0079d6",
      "#a4de1e",
      "#0f2d73"
    ]
  },
  {
    "flavor": "Coconut",
    "colors": [
      "#e8e8e6",
      "#d1bc66",
      "#1ab9a4",
      "#083a9c",
      "#912808",
      "#151b54"
    ]
  },
  {
    "flavor": "Peach-Pear",
    "colors": [
      "#e4e772",
      "#fec37b",
      "#00bab2",
      "#0077c3",
      "#f67d1b",
      "#27316d"
    ]
  },
  {
    "flavor": "Pure",
    "colors": [
      "#b2dff9",
      "#84cdfa",
      "#00d3cf",
      "#0079d6",
      "#0098f2",
      "#0f2d73"
    ]
  },
  {
    "flavor": "Berry",
    "colors": [
      "#ffd7ea",
      "#ffbee2",
      "#00c6bc",
      "#0066c5",
      "#ff52d3",
      "#000f63"
    ]
  },
  {
    "flavor": "Pamplemousse",
    "colors": [
      "#f0c78c",
      "#f5978a",
      "#63cbe4",
      "#2d6fe1",
      "#f85a42",
      "#19215c"
    ]
  },
  {
    "flavor": "Lemon",
    "colors": [
      "#e7d53a",
      "#e5bc00",
      "#00cabf",
      "#0079d6",
      "#f1b300",
      "#0f2d73"
    ]
  },
  {
    "flavor": "Cran-Raspberry",
    "colors": [
      "#ecbdbe",
      "#fa8a8e",
      "#6cc8dd",
      "#256ee6",
      "#e4487f",
      "#20267c"
    ]
  }
];

function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}


var updateSvg = function(string, color) {
  var element = document.getElementById(string);
  var tags = element.getElementsByTagName('*');
  var total = tags.length;
  for ( var i = 0; i < total; i++ ) {
    tags[i].style.fill = color;
  }
  if (string === 'color-5') {
    svgText.css('fill', color);
  }
  if (string === 'color-6') {
    $body.css('background-color', color);
    var rgb = hexToRgb(color);
    console.log('rgb', rgb);
    var o = Math.round(((parseInt(rgb.r) * 299) + (parseInt(rgb.g) * 587) + (parseInt(rgb.b) * 114)) /1000);
    if (o > 125) {
      $body.addClass('dark-text');
    } else {
      $body.removeClass('dark-text');
    }
  }
};


/////////////////////////////////////
// Colorpicker shit
/////////////////////////////////////
var updateColorPicker = function() {
  console.log('update colorpicker');
  Array.prototype.forEach.call($inputColor, function(el, i){
    var $theColor = el.getAttribute('value');
    // console.log('theColro: ' + $theColor);
    $(el).spectrum({
      color: $theColor,
      showInitial: true,
      showButtons: false,
      showInput: true,
      preferredFormat: 'hex',
      change: function(color) {
        var string = $(this).attr('data-selector');
        var color = color.toHexString();
        updateSvg(string, color);
        updateCan();
        // console.log('hide triggered');
        // alert('calledupdatesvg');
      }
    });

    $(el).on('dragstop.spectrum', debounce(function(e, color) {
      var string = $(this).attr('data-selector');
      var color = color.toHexString();
      updateSvg(string, color);
      updateCan();
    }, 100));

  });

  // click track color changes
  $('.sp-replacer').on('click touchstart', function() {
    var parent = $(this).parent().attr('data-parent');
    var selector = $('input[data-selector="' + parent + '"]');
    var category = selector.data('gtm-category');
    var action = selector.data('gtm-action');
    var label = selector.data('gtm-label');
    gtmClickTrack(category, action, label);
  });

};

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



var initialColor = function(flavor, color1, color2, color3, color4, color5, color6) {
  $body.css('background-color', color6);
  $jsInput.attr('placeholder', flavor);

  updateSvg('color-1', color1);
  updateSvg('color-2', color2);
  updateSvg('color-3', color3);
  updateSvg('color-4', color4);
  updateSvg('color-5', color5);
  updateSvg('color-6', color6);
  $('svg text').text(flavor);

  $('.js-color-picker-1').attr('value', color1);
  $('.js-color-picker-2').attr('value', color2);
  $('.js-color-picker-3').attr('value', color3);
  $('.js-color-picker-4').attr('value', color4);
  $('.js-color-picker-5').attr('value', color5);
  $('.js-color-picker-6').attr('value', color6);

  updateColorPicker();
  updateCan();
};



var chooseFlavor = function() {
  var numFlavors = flavors.length - 1;
  var randNum = getRandomIntInclusive(0, numFlavors)
  flavor = flavors[randNum];
};

if ($body.hasClass('home')) {
  chooseFlavor();
  var flave = flavor.flavor;
  var color1 = flavor.colors[0];
  var color2 = flavor.colors[1];
  var color3 = flavor.colors[2];
  var color4 = flavor.colors[3];
  var color5 = flavor.colors[4];
  var color6 = flavor.colors[5];
  initialColor(flave, color1, color2, color3, color4, color5, color6);
}

if ($body.hasClass('creation')) {
  var color1 = $('.js-color-1').attr('data-color');
  var color2 = $('.js-color-2').attr('data-color');
  var color3 = $('.js-color-3').attr('data-color');
  var color4 = $('.js-color-4').attr('data-color');
  var color5 = $('.js-color-5').attr('data-color');
  var color6 = $('.js-color-6').attr('data-color');
  var flavor = $('.js-flavor').attr('data-flavor');
  initialColor(flavor, color1, color2, color3, color4, color5, color6);
}


// var last;
var draw = function(now) {
  requestAnimationFrame(draw);
  render();
};

if ($body.hasClass('home') || $body.hasClass('creation')) {
  setup();
  draw();
}
if ($body.hasClass('home') || $body.hasClass('creation')) {
  if (window.innerWidth > 700) {
    var draggie = new Draggabilly( '.js-windows-container', {
      handle: '.js-winheader',
      containment: true
    });
    var dargie = new Draggabilly( '.js-windows', {
      handle: '.js-winheader',
      containment: true
    });
  }
}

var trackFlavor = function(category, action, label) {
  ga('send', {
    hitType: 'event',
    eventCategory: category,
    eventAction: action,
    eventLabel: label
  });
};


var generateGif = function() {
  var audio = new Audio('../open-short.mp3');
  audio.play();

  // console.log('color6', $('.js-color-picker-6').spectrum('get').toHexString());
  var bgColor = $('.js-color-picker-6').spectrum('get').toHexString();
  scene.background = new THREE.Color(bgColor);
  document.removeEventListener('mousemove', onDocumentMouseMove, false)
  // mouseX = 0;
  // mouseY = 0;
  canPivot.rotation.x = 0;
  canObject.rotation.x = 0;

  canPivot.rotation.y = 30.35; // turn the flavor to the front
  canObject.rotation.y = 0;

  canPivot.rotation.z = 245.5;
  canObject.rotation.z = 0;

  generating = true;
  $body.addClass('generating');
  trackFlavor('Flavor', 'flavorize', $jsInput.val());
};

var slugify = function(text) {
  return text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
};

$('.js-generate-gif').on('click touchstart', function() {
  generateGif();
});


$jsInput.on('keyup', debounce(function(e) {
  console.log('debounce');
  var text = $(this).val();
  svgText.text(text);
  updateCan();
}, 100));



var postCan = function() {
  var text = $jsInput.val();
  if (text === '') {
    text = $jsInput.attr('placeholder');
  }
  var slugged = slugify(text);

  var color1 = $('.js-color-picker-1').spectrum('get').toHexString();
  var color2 = $('.js-color-picker-2').spectrum('get').toHexString();
  var color3 = $('.js-color-picker-3').spectrum('get').toHexString();
  var color4 = $('.js-color-picker-4').spectrum('get').toHexString();
  var color5 = $('.js-color-picker-5').spectrum('get').toHexString();
  var color6 = $('.js-color-picker-6').spectrum('get').toHexString();

  var formData = {
    'slug': slugged,
    'fullText': text,
    'animatedGif': animatedGif,
    'singleImage': gifArray[0],
    'color1': color1,
    'color2': color2,
    'color3': color3,
    'color4': color4,
    'color5': color5,
    'color6': color6
  };

  // console.log('formData.animatedGif: ', formData.animatedGif);

  $.ajax({
    url : '/api/create',
    type: 'POST',
    contentType: 'application/json',
    jsonp: 'jsonp',
    data : JSON.stringify(formData),
    success: function(data, textStatus, jqXHR) {
      putId = data._id;
      putSlug = data.slug;
      // console.log('successful postcan');
      document.location.href = data.slug + '/' + data._id;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log('jqXHR', jqXHR);
      console.log('error', errorThrown);
      console.log('textStatus', textStatus);
    }
  });
}




/////////////////////////
// Vote
/////////////////////////
// var voteOnce = function(voteId) {
//   var formData = {
//     '_id': voteId
//   };
//   // console.log('voteId: ' + voteId);
//   $.ajax({
//     url : '/api/vote',
//     type: 'POST',
//     contentType: 'application/json',
//     jsonp: 'jsonp',
//     data : JSON.stringify(formData),
//     success: function(data, textStatus, jqXHR) {
//       console.log('vote data from server', data);
//       $('.js-vote-id-' + data._id).text(data.votes);
//     },
//     error: function (jqXHR, textStatus, errorThrown) {
//       console.log('jqXHR', jqXHR);
//       console.log('error', errorThrown);
//       console.log('textStatus', textStatus);
//     }
//   });
// };

// function doOnce(voteId) {
//   console.log('voteId: ' + voteId);
//   if (document.cookie.replace(/(?:(?:^|.*;\s*)voteId\s*\=\s*([^;]*).*$)|^.*$/, '$1') !== voteId) {
//     // alert('Do something here!');
//     voteOnce(voteId);
//     document.cookie = 'voteId=' + voteId + '; expires=Fri, 31 Dec 9999 23:59:59 GMT';
//   }
// }

// $('.js-vote').on('click touchstart', function(e) {
//   e.preventDefault();
//   var voteId = $(this).attr('data-vote-id');
//   voteOnce(voteId);
// });

// $('.js-auto-vote').on('click touchstart', function(e) {
//   // e.preventDefault();
//   var voteId = $('.js-vote').attr('data-vote-id');
//   console.log('voteId: ' + voteId);
//   voteOnce(voteId);
// });


$jsInput.on('keyup', function(e) {
  switch (e.keyCode) {
    case 13: // enter
      generateGif();
      break;
  }
});


// Click tracking
$('[data-gtm-category]').on('click', function() {
  var category = $(this).data('gtm-category');
  var action = $(this).data('gtm-action');
  var label = $(this).data('gtm-label');
  gtmClickTrack(category, action, label);
});



// Send the info to Google Analytics
var gtmClickTrack = function(category, action, label) {
  ga('send', {
    hitType: 'event',
    eventCategory: category,
    eventAction: action,
    eventLabel: label
  });
};

var $facebook = $('.js-facebook');
var $twitter = $('.js-twitter');

// share
function winOpen(url) {
  var width = 575;
  var height = 400;
  var left = (document.documentElement.clientWidth / 2 - width / 2);
  var top = (document.documentElement.clientHeight - height) / 2;
  var opts = 'status=1,resizable=yes' + ',width=' + width + ',height=' + height + ',top=' + top + ',left=' + left;
  var win = window.open(url, '', opts);
  win.focus();
  return win;
}

if (window.innerWidth > 700) {
  $twitter.on('click touchstart', function(e) {
    e.preventDefault();
    var url = $(this).attr('href');
    winOpen(url);
  });

  $facebook.on('click touchstart', function(e) {
    e.preventDefault();
    var url = $(this).attr('href');
    winOpen(url);
  });
}

$('.bullets a').on('click', function() {
  $(this).addClass('clicked');
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"Detector":"/Users/mattmesker/Sites/lacroix/src/scripts/vendor/Detector.js","OBJLoader":"/Users/mattmesker/Sites/lacroix/src/scripts/vendor/OBJLoader.js","bowser":"/Users/mattmesker/Sites/lacroix/node_modules/bowser/src/bowser.js","draggabilly":"/Users/mattmesker/Sites/lacroix/node_modules/draggabilly/draggabilly.js","gifshot":undefined,"jquery":undefined,"lazysizes/lazysizes.js":"/Users/mattmesker/Sites/lacroix/node_modules/lazysizes/lazysizes.js","lazysizes/plugins/unveilhooks/ls.unveilhooks.js":"/Users/mattmesker/Sites/lacroix/node_modules/lazysizes/plugins/unveilhooks/ls.unveilhooks.js","lodash.debounce":undefined,"save-svg-as-png":undefined,"spectrum-colorpicker":"/Users/mattmesker/Sites/lacroix/node_modules/spectrum-colorpicker/spectrum.js"}],"/Users/mattmesker/Sites/lacroix/src/scripts/vendor/Detector.js":[function(require,module,exports){
(function (global){
; var __browserify_shim_require__=require;(function browserifyShim(module, define, require) {
/**
 * @author alteredq / http://alteredqualia.com/
 * @author mr.doob / http://mrdoob.com/
 */

var Detector = {

	canvas: !! window.CanvasRenderingContext2D,
	webgl: ( function () {

		try {

			var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );

		} catch ( e ) {

			return false;

		}

	} )(),
	workers: !! window.Worker,
	fileapi: window.File && window.FileReader && window.FileList && window.Blob,

	getWebGLErrorMessage: function () {

		var element = document.createElement( 'div' );
		element.id = 'webgl-error-message';
		element.style.fontFamily = 'monospace';
		element.style.fontSize = '13px';
		element.style.fontWeight = 'normal';
		element.style.textAlign = 'center';
		element.style.background = '#fff';
		element.style.color = '#000';
		element.style.padding = '1.5em';
		element.style.width = '400px';
		element.style.margin = '5em auto 0';

		if ( ! this.webgl ) {

			element.innerHTML = window.WebGLRenderingContext ? [
				'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />',
				'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
			].join( '\n' ) : [
				'Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>',
				'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
			].join( '\n' );

		}

		return element;

	},

	addGetWebGLMessage: function ( parameters ) {

		var parent, id, element;

		parameters = parameters || {};

		parent = parameters.parent !== undefined ? parameters.parent : document.body;
		id = parameters.id !== undefined ? parameters.id : 'oldie';

		element = Detector.getWebGLErrorMessage();
		element.id = id;

		parent.appendChild( element );

	}

};

// browserify support
if ( typeof module === 'object' ) {

	module.exports = Detector;

}

}).call(global, module, undefined, undefined);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],"/Users/mattmesker/Sites/lacroix/src/scripts/vendor/OBJLoader.js":[function(require,module,exports){
(function (global){
; var __browserify_shim_require__=require;(function browserifyShim(module, define, require) {
/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.OBJLoader = function ( manager ) {

	this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;

	this.materials = null;

	this.regexp = {
		// v float float float
		vertex_pattern           : /^v\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,
		// vn float float float
		normal_pattern           : /^vn\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,
		// vt float float
		uv_pattern               : /^vt\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,
		// f vertex vertex vertex
		face_vertex              : /^f\s+(-?\d+)\s+(-?\d+)\s+(-?\d+)(?:\s+(-?\d+))?/,
		// f vertex/uv vertex/uv vertex/uv
		face_vertex_uv           : /^f\s+(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)(?:\s+(-?\d+)\/(-?\d+))?/,
		// f vertex/uv/normal vertex/uv/normal vertex/uv/normal
		face_vertex_uv_normal    : /^f\s+(-?\d+)\/(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\/(-?\d+)(?:\s+(-?\d+)\/(-?\d+)\/(-?\d+))?/,
		// f vertex//normal vertex//normal vertex//normal
		face_vertex_normal       : /^f\s+(-?\d+)\/\/(-?\d+)\s+(-?\d+)\/\/(-?\d+)\s+(-?\d+)\/\/(-?\d+)(?:\s+(-?\d+)\/\/(-?\d+))?/,
		// o object_name | g group_name
		object_pattern           : /^[og]\s*(.+)?/,
		// s boolean
		smoothing_pattern        : /^s\s+(\d+|on|off)/,
		// mtllib file_reference
		material_library_pattern : /^mtllib /,
		// usemtl material_name
		material_use_pattern     : /^usemtl /
	};

};

THREE.OBJLoader.prototype = {

	constructor: THREE.OBJLoader,

	load: function ( url, onLoad, onProgress, onError ) {

		var scope = this;

		var loader = new THREE.XHRLoader( scope.manager );
		loader.setPath( this.path );
		loader.load( url, function ( text ) {

			onLoad( scope.parse( text ) );

		}, onProgress, onError );

	},

	setPath: function ( value ) {

		this.path = value;

	},

	setMaterials: function ( materials ) {

		this.materials = materials;

	},

	_createParserState : function () {

		var state = {
			objects  : [],
			object   : {},

			vertices : [],
			normals  : [],
			uvs      : [],

			materialLibraries : [],

			startObject: function ( name, fromDeclaration ) {

				// If the current object (initial from reset) is not from a g/o declaration in the parsed
				// file. We need to use it for the first parsed g/o to keep things in sync.
				if ( this.object && this.object.fromDeclaration === false ) {

					this.object.name = name;
					this.object.fromDeclaration = ( fromDeclaration !== false );
					return;

				}

				if ( this.object && typeof this.object._finalize === 'function' ) {

					this.object._finalize();

				}

				var previousMaterial = ( this.object && typeof this.object.currentMaterial === 'function' ? this.object.currentMaterial() : undefined );

				this.object = {
					name : name || '',
					fromDeclaration : ( fromDeclaration !== false ),

					geometry : {
						vertices : [],
						normals  : [],
						uvs      : []
					},
					materials : [],
					smooth : true,

					startMaterial : function( name, libraries ) {

						var previous = this._finalize( false );

						// New usemtl declaration overwrites an inherited material, except if faces were declared
						// after the material, then it must be preserved for proper MultiMaterial continuation.
						if ( previous && ( previous.inherited || previous.groupCount <= 0 ) ) {

							this.materials.splice( previous.index, 1 );

						}

						var material = {
							index      : this.materials.length,
							name       : name || '',
							mtllib     : ( Array.isArray( libraries ) && libraries.length > 0 ? libraries[ libraries.length - 1 ] : '' ),
							smooth     : ( previous !== undefined ? previous.smooth : this.smooth ),
							groupStart : ( previous !== undefined ? previous.groupEnd : 0 ),
							groupEnd   : -1,
							groupCount : -1,
							inherited  : false,

							clone : function( index ) {
								return {
									index      : ( typeof index === 'number' ? index : this.index ),
									name       : this.name,
									mtllib     : this.mtllib,
									smooth     : this.smooth,
									groupStart : this.groupEnd,
									groupEnd   : -1,
									groupCount : -1,
									inherited  : false
								};
							}
						};

						this.materials.push( material );

						return material;

					},

					currentMaterial : function() {

						if ( this.materials.length > 0 ) {
							return this.materials[ this.materials.length - 1 ];
						}

						return undefined;

					},

					_finalize : function( end ) {

						var lastMultiMaterial = this.currentMaterial();
						if ( lastMultiMaterial && lastMultiMaterial.groupEnd === -1 ) {

							lastMultiMaterial.groupEnd = this.geometry.vertices.length / 3;
							lastMultiMaterial.groupCount = lastMultiMaterial.groupEnd - lastMultiMaterial.groupStart;
							lastMultiMaterial.inherited = false;

						}

						// Guarantee at least one empty material, this makes the creation later more straight forward.
						if ( end !== false && this.materials.length === 0 ) {
							this.materials.push({
								name   : '',
								smooth : this.smooth
							});
						}

						return lastMultiMaterial;

					}
				};

				// Inherit previous objects material.
				// Spec tells us that a declared material must be set to all objects until a new material is declared.
				// If a usemtl declaration is encountered while this new object is being parsed, it will
				// overwrite the inherited material. Exception being that there was already face declarations
				// to the inherited material, then it will be preserved for proper MultiMaterial continuation.

				if ( previousMaterial && previousMaterial.name && typeof previousMaterial.clone === "function" ) {

					var declared = previousMaterial.clone( 0 );
					declared.inherited = true;
					this.object.materials.push( declared );

				}

				this.objects.push( this.object );

			},

			finalize : function() {

				if ( this.object && typeof this.object._finalize === 'function' ) {

					this.object._finalize();

				}

			},

			parseVertexIndex: function ( value, len ) {

				var index = parseInt( value, 10 );
				return ( index >= 0 ? index - 1 : index + len / 3 ) * 3;

			},

			parseNormalIndex: function ( value, len ) {

				var index = parseInt( value, 10 );
				return ( index >= 0 ? index - 1 : index + len / 3 ) * 3;

			},

			parseUVIndex: function ( value, len ) {

				var index = parseInt( value, 10 );
				return ( index >= 0 ? index - 1 : index + len / 2 ) * 2;

			},

			addVertex: function ( a, b, c ) {

				var src = this.vertices;
				var dst = this.object.geometry.vertices;

				dst.push( src[ a + 0 ] );
				dst.push( src[ a + 1 ] );
				dst.push( src[ a + 2 ] );
				dst.push( src[ b + 0 ] );
				dst.push( src[ b + 1 ] );
				dst.push( src[ b + 2 ] );
				dst.push( src[ c + 0 ] );
				dst.push( src[ c + 1 ] );
				dst.push( src[ c + 2 ] );

			},

			addVertexLine: function ( a ) {

				var src = this.vertices;
				var dst = this.object.geometry.vertices;

				dst.push( src[ a + 0 ] );
				dst.push( src[ a + 1 ] );
				dst.push( src[ a + 2 ] );

			},

			addNormal : function ( a, b, c ) {

				var src = this.normals;
				var dst = this.object.geometry.normals;

				dst.push( src[ a + 0 ] );
				dst.push( src[ a + 1 ] );
				dst.push( src[ a + 2 ] );
				dst.push( src[ b + 0 ] );
				dst.push( src[ b + 1 ] );
				dst.push( src[ b + 2 ] );
				dst.push( src[ c + 0 ] );
				dst.push( src[ c + 1 ] );
				dst.push( src[ c + 2 ] );

			},

			addUV: function ( a, b, c ) {

				var src = this.uvs;
				var dst = this.object.geometry.uvs;

				dst.push( src[ a + 0 ] );
				dst.push( src[ a + 1 ] );
				dst.push( src[ b + 0 ] );
				dst.push( src[ b + 1 ] );
				dst.push( src[ c + 0 ] );
				dst.push( src[ c + 1 ] );

			},

			addUVLine: function ( a ) {

				var src = this.uvs;
				var dst = this.object.geometry.uvs;

				dst.push( src[ a + 0 ] );
				dst.push( src[ a + 1 ] );

			},

			addFace: function ( a, b, c, d, ua, ub, uc, ud, na, nb, nc, nd ) {

				var vLen = this.vertices.length;

				var ia = this.parseVertexIndex( a, vLen );
				var ib = this.parseVertexIndex( b, vLen );
				var ic = this.parseVertexIndex( c, vLen );
				var id;

				if ( d === undefined ) {

					this.addVertex( ia, ib, ic );

				} else {

					id = this.parseVertexIndex( d, vLen );

					this.addVertex( ia, ib, id );
					this.addVertex( ib, ic, id );

				}

				if ( ua !== undefined ) {

					var uvLen = this.uvs.length;

					ia = this.parseUVIndex( ua, uvLen );
					ib = this.parseUVIndex( ub, uvLen );
					ic = this.parseUVIndex( uc, uvLen );

					if ( d === undefined ) {

						this.addUV( ia, ib, ic );

					} else {

						id = this.parseUVIndex( ud, uvLen );

						this.addUV( ia, ib, id );
						this.addUV( ib, ic, id );

					}

				}

				if ( na !== undefined ) {

					// Normals are many times the same. If so, skip function call and parseInt.
					var nLen = this.normals.length;
					ia = this.parseNormalIndex( na, nLen );

					ib = na === nb ? ia : this.parseNormalIndex( nb, nLen );
					ic = na === nc ? ia : this.parseNormalIndex( nc, nLen );

					if ( d === undefined ) {

						this.addNormal( ia, ib, ic );

					} else {

						id = this.parseNormalIndex( nd, nLen );

						this.addNormal( ia, ib, id );
						this.addNormal( ib, ic, id );

					}

				}

			},

			addLineGeometry: function ( vertices, uvs ) {

				this.object.geometry.type = 'Line';

				var vLen = this.vertices.length;
				var uvLen = this.uvs.length;

				for ( var vi = 0, l = vertices.length; vi < l; vi ++ ) {

					this.addVertexLine( this.parseVertexIndex( vertices[ vi ], vLen ) );

				}

				for ( var uvi = 0, l = uvs.length; uvi < l; uvi ++ ) {

					this.addUVLine( this.parseUVIndex( uvs[ uvi ], uvLen ) );

				}

			}

		};

		state.startObject( '', false );

		return state;

	},

	parse: function ( text ) {

		console.time( 'OBJLoader' );

		var state = this._createParserState();

		if ( text.indexOf( '\r\n' ) !== - 1 ) {

			// This is faster than String.split with regex that splits on both
			text = text.replace( '\r\n', '\n' );

		}

		var lines = text.split( '\n' );
		var line = '', lineFirstChar = '', lineSecondChar = '';
		var lineLength = 0;
		var result = [];

		// Faster to just trim left side of the line. Use if available.
		var trimLeft = ( typeof ''.trimLeft === 'function' );

		for ( var i = 0, l = lines.length; i < l; i ++ ) {

			line = lines[ i ];

			line = trimLeft ? line.trimLeft() : line.trim();

			lineLength = line.length;

			if ( lineLength === 0 ) continue;

			lineFirstChar = line.charAt( 0 );

			// @todo invoke passed in handler if any
			if ( lineFirstChar === '#' ) continue;

			if ( lineFirstChar === 'v' ) {

				lineSecondChar = line.charAt( 1 );

				if ( lineSecondChar === ' ' && ( result = this.regexp.vertex_pattern.exec( line ) ) !== null ) {

					// 0                  1      2      3
					// ["v 1.0 2.0 3.0", "1.0", "2.0", "3.0"]

					state.vertices.push(
						parseFloat( result[ 1 ] ),
						parseFloat( result[ 2 ] ),
						parseFloat( result[ 3 ] )
					);

				} else if ( lineSecondChar === 'n' && ( result = this.regexp.normal_pattern.exec( line ) ) !== null ) {

					// 0                   1      2      3
					// ["vn 1.0 2.0 3.0", "1.0", "2.0", "3.0"]

					state.normals.push(
						parseFloat( result[ 1 ] ),
						parseFloat( result[ 2 ] ),
						parseFloat( result[ 3 ] )
					);

				} else if ( lineSecondChar === 't' && ( result = this.regexp.uv_pattern.exec( line ) ) !== null ) {

					// 0               1      2
					// ["vt 0.1 0.2", "0.1", "0.2"]

					state.uvs.push(
						parseFloat( result[ 1 ] ),
						parseFloat( result[ 2 ] )
					);

				} else {

					throw new Error( "Unexpected vertex/normal/uv line: '" + line  + "'" );

				}

			} else if ( lineFirstChar === "f" ) {

				if ( ( result = this.regexp.face_vertex_uv_normal.exec( line ) ) !== null ) {

					// f vertex/uv/normal vertex/uv/normal vertex/uv/normal
					// 0                        1    2    3    4    5    6    7    8    9   10         11         12
					// ["f 1/1/1 2/2/2 3/3/3", "1", "1", "1", "2", "2", "2", "3", "3", "3", undefined, undefined, undefined]

					state.addFace(
						result[ 1 ], result[ 4 ], result[ 7 ], result[ 10 ],
						result[ 2 ], result[ 5 ], result[ 8 ], result[ 11 ],
						result[ 3 ], result[ 6 ], result[ 9 ], result[ 12 ]
					);

				} else if ( ( result = this.regexp.face_vertex_uv.exec( line ) ) !== null ) {

					// f vertex/uv vertex/uv vertex/uv
					// 0                  1    2    3    4    5    6   7          8
					// ["f 1/1 2/2 3/3", "1", "1", "2", "2", "3", "3", undefined, undefined]

					state.addFace(
						result[ 1 ], result[ 3 ], result[ 5 ], result[ 7 ],
						result[ 2 ], result[ 4 ], result[ 6 ], result[ 8 ]
					);

				} else if ( ( result = this.regexp.face_vertex_normal.exec( line ) ) !== null ) {

					// f vertex//normal vertex//normal vertex//normal
					// 0                     1    2    3    4    5    6   7          8
					// ["f 1//1 2//2 3//3", "1", "1", "2", "2", "3", "3", undefined, undefined]

					state.addFace(
						result[ 1 ], result[ 3 ], result[ 5 ], result[ 7 ],
						undefined, undefined, undefined, undefined,
						result[ 2 ], result[ 4 ], result[ 6 ], result[ 8 ]
					);

				} else if ( ( result = this.regexp.face_vertex.exec( line ) ) !== null ) {

					// f vertex vertex vertex
					// 0            1    2    3   4
					// ["f 1 2 3", "1", "2", "3", undefined]

					state.addFace(
						result[ 1 ], result[ 2 ], result[ 3 ], result[ 4 ]
					);

				} else {

					throw new Error( "Unexpected face line: '" + line  + "'" );

				}

			} else if ( lineFirstChar === "l" ) {

				var lineParts = line.substring( 1 ).trim().split( " " );
				var lineVertices = [], lineUVs = [];

				if ( line.indexOf( "/" ) === - 1 ) {

					lineVertices = lineParts;

				} else {

					for ( var li = 0, llen = lineParts.length; li < llen; li ++ ) {

						var parts = lineParts[ li ].split( "/" );

						if ( parts[ 0 ] !== "" ) lineVertices.push( parts[ 0 ] );
						if ( parts[ 1 ] !== "" ) lineUVs.push( parts[ 1 ] );

					}

				}
				state.addLineGeometry( lineVertices, lineUVs );

			} else if ( ( result = this.regexp.object_pattern.exec( line ) ) !== null ) {

				// o object_name
				// or
				// g group_name

				var name = result[ 0 ].substr( 1 ).trim();
				state.startObject( name );

			} else if ( this.regexp.material_use_pattern.test( line ) ) {

				// material

				state.object.startMaterial( line.substring( 7 ).trim(), state.materialLibraries );

			} else if ( this.regexp.material_library_pattern.test( line ) ) {

				// mtl file

				state.materialLibraries.push( line.substring( 7 ).trim() );

			} else if ( ( result = this.regexp.smoothing_pattern.exec( line ) ) !== null ) {

				// smooth shading

				// @todo Handle files that have varying smooth values for a set of faces inside one geometry,
				// but does not define a usemtl for each face set.
				// This should be detected and a dummy material created (later MultiMaterial and geometry groups).
				// This requires some care to not create extra material on each smooth value for "normal" obj files.
				// where explicit usemtl defines geometry groups.
				// Example asset: examples/models/obj/cerberus/Cerberus.obj

				var value = result[ 1 ].trim().toLowerCase();
				state.object.smooth = ( value === '1' || value === 'on' );

				var material = state.object.currentMaterial();
				if ( material ) {

					material.smooth = state.object.smooth;

				}

			} else {

				// Handle null terminated files without exception
				if ( line === '\0' ) continue;

				throw new Error( "Unexpected line: '" + line  + "'" );

			}

		}

		state.finalize();

		var container = new THREE.Group();
		container.materialLibraries = [].concat( state.materialLibraries );

		for ( var i = 0, l = state.objects.length; i < l; i ++ ) {

			var object = state.objects[ i ];
			var geometry = object.geometry;
			var materials = object.materials;
			var isLine = ( geometry.type === 'Line' );

			// Skip o/g line declarations that did not follow with any faces
			if ( geometry.vertices.length === 0 ) continue;

			var buffergeometry = new THREE.BufferGeometry();

			buffergeometry.addAttribute( 'position', new THREE.BufferAttribute( new Float32Array( geometry.vertices ), 3 ) );

			if ( geometry.normals.length > 0 ) {

				buffergeometry.addAttribute( 'normal', new THREE.BufferAttribute( new Float32Array( geometry.normals ), 3 ) );

			} else {

				buffergeometry.computeVertexNormals();

			}

			if ( geometry.uvs.length > 0 ) {

				buffergeometry.addAttribute( 'uv', new THREE.BufferAttribute( new Float32Array( geometry.uvs ), 2 ) );

			}

			// Create materials

			var createdMaterials = [];

			for ( var mi = 0, miLen = materials.length; mi < miLen ; mi++ ) {

				var sourceMaterial = materials[mi];
				var material = undefined;

				if ( this.materials !== null ) {

					material = this.materials.create( sourceMaterial.name );

					// mtl etc. loaders probably can't create line materials correctly, copy properties to a line material.
					if ( isLine && material && ! ( material instanceof THREE.LineBasicMaterial ) ) {

						var materialLine = new THREE.LineBasicMaterial();
						materialLine.copy( material );
						material = materialLine;

					}

				}

				if ( ! material ) {

					material = ( ! isLine ? new THREE.MeshPhongMaterial() : new THREE.LineBasicMaterial() );
					material.name = sourceMaterial.name;

				}

				material.shading = sourceMaterial.smooth ? THREE.SmoothShading : THREE.FlatShading;

				createdMaterials.push(material);

			}

			// Create mesh

			var mesh;

			if ( createdMaterials.length > 1 ) {

				for ( var mi = 0, miLen = materials.length; mi < miLen ; mi++ ) {

					var sourceMaterial = materials[mi];
					buffergeometry.addGroup( sourceMaterial.groupStart, sourceMaterial.groupCount, mi );

				}

				var multiMaterial = new THREE.MultiMaterial( createdMaterials );
				mesh = ( ! isLine ? new THREE.Mesh( buffergeometry, multiMaterial ) : new THREE.LineSegments( buffergeometry, multiMaterial ) );

			} else {

				mesh = ( ! isLine ? new THREE.Mesh( buffergeometry, createdMaterials[ 0 ] ) : new THREE.LineSegments( buffergeometry, createdMaterials[ 0 ] ) );
			}

			mesh.name = object.name;

			container.add( mesh );

		}

		console.timeEnd( 'OBJLoader' );

		return container;

	}

};

}).call(global, module, undefined, undefined);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}]},{},["/Users/mattmesker/Sites/lacroix/src/scripts/main.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYm93c2VyL3NyYy9ib3dzZXIuanMiLCJub2RlX21vZHVsZXMvZHJhZ2dhYmlsbHkvZHJhZ2dhYmlsbHkuanMiLCJub2RlX21vZHVsZXMvZXYtZW1pdHRlci9ldi1lbWl0dGVyLmpzIiwibm9kZV9tb2R1bGVzL2dldC1zaXplL2dldC1zaXplLmpzIiwibm9kZV9tb2R1bGVzL2xhenlzaXplcy9sYXp5c2l6ZXMuanMiLCJub2RlX21vZHVsZXMvbGF6eXNpemVzL3BsdWdpbnMvdW52ZWlsaG9va3MvbHMudW52ZWlsaG9va3MuanMiLCJub2RlX21vZHVsZXMvc3BlY3RydW0tY29sb3JwaWNrZXIvc3BlY3RydW0uanMiLCJub2RlX21vZHVsZXMvdW5pZHJhZ2dlci91bmlkcmFnZ2VyLmpzIiwibm9kZV9tb2R1bGVzL3VuaXBvaW50ZXIvdW5pcG9pbnRlci5qcyIsInNyYy9zY3JpcHRzL21haW4uanMiLCJzcmMvc2NyaXB0cy92ZW5kb3IvRGV0ZWN0b3IuanMiLCJzcmMvc2NyaXB0cy92ZW5kb3IvT0JKTG9hZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwa0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1ZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM3FCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNueEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1UkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQy9TQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUMxMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ2pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIVxuICogQm93c2VyIC0gYSBicm93c2VyIGRldGVjdG9yXG4gKiBodHRwczovL2dpdGh1Yi5jb20vZGVkL2Jvd3NlclxuICogTUlUIExpY2Vuc2UgfCAoYykgRHVzdGluIERpYXogMjAxNVxuICovXG5cbiFmdW5jdGlvbiAocm9vdCwgbmFtZSwgZGVmaW5pdGlvbikge1xuICBpZiAodHlwZW9mIG1vZHVsZSAhPSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykgbW9kdWxlLmV4cG9ydHMgPSBkZWZpbml0aW9uKClcbiAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIGRlZmluZShuYW1lLCBkZWZpbml0aW9uKVxuICBlbHNlIHJvb3RbbmFtZV0gPSBkZWZpbml0aW9uKClcbn0odGhpcywgJ2Jvd3NlcicsIGZ1bmN0aW9uICgpIHtcbiAgLyoqXG4gICAgKiBTZWUgdXNlcmFnZW50cy5qcyBmb3IgZXhhbXBsZXMgb2YgbmF2aWdhdG9yLnVzZXJBZ2VudFxuICAgICovXG5cbiAgdmFyIHQgPSB0cnVlXG5cbiAgZnVuY3Rpb24gZGV0ZWN0KHVhKSB7XG5cbiAgICBmdW5jdGlvbiBnZXRGaXJzdE1hdGNoKHJlZ2V4KSB7XG4gICAgICB2YXIgbWF0Y2ggPSB1YS5tYXRjaChyZWdleCk7XG4gICAgICByZXR1cm4gKG1hdGNoICYmIG1hdGNoLmxlbmd0aCA+IDEgJiYgbWF0Y2hbMV0pIHx8ICcnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNlY29uZE1hdGNoKHJlZ2V4KSB7XG4gICAgICB2YXIgbWF0Y2ggPSB1YS5tYXRjaChyZWdleCk7XG4gICAgICByZXR1cm4gKG1hdGNoICYmIG1hdGNoLmxlbmd0aCA+IDEgJiYgbWF0Y2hbMl0pIHx8ICcnO1xuICAgIH1cblxuICAgIHZhciBpb3NkZXZpY2UgPSBnZXRGaXJzdE1hdGNoKC8oaXBvZHxpcGhvbmV8aXBhZCkvaSkudG9Mb3dlckNhc2UoKVxuICAgICAgLCBsaWtlQW5kcm9pZCA9IC9saWtlIGFuZHJvaWQvaS50ZXN0KHVhKVxuICAgICAgLCBhbmRyb2lkID0gIWxpa2VBbmRyb2lkICYmIC9hbmRyb2lkL2kudGVzdCh1YSlcbiAgICAgICwgbmV4dXNNb2JpbGUgPSAvbmV4dXNcXHMqWzAtNl1cXHMqL2kudGVzdCh1YSlcbiAgICAgICwgbmV4dXNUYWJsZXQgPSAhbmV4dXNNb2JpbGUgJiYgL25leHVzXFxzKlswLTldKy9pLnRlc3QodWEpXG4gICAgICAsIGNocm9tZW9zID0gL0NyT1MvLnRlc3QodWEpXG4gICAgICAsIHNpbGsgPSAvc2lsay9pLnRlc3QodWEpXG4gICAgICAsIHNhaWxmaXNoID0gL3NhaWxmaXNoL2kudGVzdCh1YSlcbiAgICAgICwgdGl6ZW4gPSAvdGl6ZW4vaS50ZXN0KHVhKVxuICAgICAgLCB3ZWJvcyA9IC8od2VifGhwdylvcy9pLnRlc3QodWEpXG4gICAgICAsIHdpbmRvd3NwaG9uZSA9IC93aW5kb3dzIHBob25lL2kudGVzdCh1YSlcbiAgICAgICwgc2Ftc3VuZ0Jyb3dzZXIgPSAvU2Ftc3VuZ0Jyb3dzZXIvaS50ZXN0KHVhKVxuICAgICAgLCB3aW5kb3dzID0gIXdpbmRvd3NwaG9uZSAmJiAvd2luZG93cy9pLnRlc3QodWEpXG4gICAgICAsIG1hYyA9ICFpb3NkZXZpY2UgJiYgIXNpbGsgJiYgL21hY2ludG9zaC9pLnRlc3QodWEpXG4gICAgICAsIGxpbnV4ID0gIWFuZHJvaWQgJiYgIXNhaWxmaXNoICYmICF0aXplbiAmJiAhd2Vib3MgJiYgL2xpbnV4L2kudGVzdCh1YSlcbiAgICAgICwgZWRnZVZlcnNpb24gPSBnZXRGaXJzdE1hdGNoKC9lZGdlXFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgLCB2ZXJzaW9uSWRlbnRpZmllciA9IGdldEZpcnN0TWF0Y2goL3ZlcnNpb25cXC8oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICAsIHRhYmxldCA9IC90YWJsZXQvaS50ZXN0KHVhKVxuICAgICAgLCBtb2JpbGUgPSAhdGFibGV0ICYmIC9bXi1dbW9iaS9pLnRlc3QodWEpXG4gICAgICAsIHhib3ggPSAveGJveC9pLnRlc3QodWEpXG4gICAgICAsIHJlc3VsdFxuXG4gICAgaWYgKC9vcGVyYS9pLnRlc3QodWEpKSB7XG4gICAgICAvLyAgYW4gb2xkIE9wZXJhXG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdPcGVyYSdcbiAgICAgICwgb3BlcmE6IHRcbiAgICAgICwgdmVyc2lvbjogdmVyc2lvbklkZW50aWZpZXIgfHwgZ2V0Rmlyc3RNYXRjaCgvKD86b3BlcmF8b3ByfG9waW9zKVtcXHNcXC9dKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoL29wcnxvcGlvcy9pLnRlc3QodWEpKSB7XG4gICAgICAvLyBhIG5ldyBPcGVyYVxuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnT3BlcmEnXG4gICAgICAgICwgb3BlcmE6IHRcbiAgICAgICAgLCB2ZXJzaW9uOiBnZXRGaXJzdE1hdGNoKC8oPzpvcHJ8b3Bpb3MpW1xcc1xcL10oXFxkKyhcXC5cXGQrKT8pL2kpIHx8IHZlcnNpb25JZGVudGlmaWVyXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKC9TYW1zdW5nQnJvd3Nlci9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdTYW1zdW5nIEludGVybmV0IGZvciBBbmRyb2lkJ1xuICAgICAgICAsIHNhbXN1bmdCcm93c2VyOiB0XG4gICAgICAgICwgdmVyc2lvbjogdmVyc2lvbklkZW50aWZpZXIgfHwgZ2V0Rmlyc3RNYXRjaCgvKD86U2Ftc3VuZ0Jyb3dzZXIpW1xcc1xcL10oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKC9jb2FzdC9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdPcGVyYSBDb2FzdCdcbiAgICAgICAgLCBjb2FzdDogdFxuICAgICAgICAsIHZlcnNpb246IHZlcnNpb25JZGVudGlmaWVyIHx8IGdldEZpcnN0TWF0Y2goLyg/OmNvYXN0KVtcXHNcXC9dKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgveWFicm93c2VyL2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ1lhbmRleCBCcm93c2VyJ1xuICAgICAgLCB5YW5kZXhicm93c2VyOiB0XG4gICAgICAsIHZlcnNpb246IHZlcnNpb25JZGVudGlmaWVyIHx8IGdldEZpcnN0TWF0Y2goLyg/OnlhYnJvd3NlcilbXFxzXFwvXShcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoL3VjYnJvd3Nlci9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgICAgbmFtZTogJ1VDIEJyb3dzZXInXG4gICAgICAgICwgdWNicm93c2VyOiB0XG4gICAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvKD86dWNicm93c2VyKVtcXHNcXC9dKFxcZCsoPzpcXC5cXGQrKSspL2kpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKC9teGlvcy9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdNYXh0aG9uJ1xuICAgICAgICAsIG1heHRob246IHRcbiAgICAgICAgLCB2ZXJzaW9uOiBnZXRGaXJzdE1hdGNoKC8oPzpteGlvcylbXFxzXFwvXShcXGQrKD86XFwuXFxkKykrKS9pKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvZXBpcGhhbnkvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnRXBpcGhhbnknXG4gICAgICAgICwgZXBpcGhhbnk6IHRcbiAgICAgICAgLCB2ZXJzaW9uOiBnZXRGaXJzdE1hdGNoKC8oPzplcGlwaGFueSlbXFxzXFwvXShcXGQrKD86XFwuXFxkKykrKS9pKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvcHVmZmluL2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ1B1ZmZpbidcbiAgICAgICAgLCBwdWZmaW46IHRcbiAgICAgICAgLCB2ZXJzaW9uOiBnZXRGaXJzdE1hdGNoKC8oPzpwdWZmaW4pW1xcc1xcL10oXFxkKyg/OlxcLlxcZCspPykvaSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoL3NsZWlwbmlyL2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ1NsZWlwbmlyJ1xuICAgICAgICAsIHNsZWlwbmlyOiB0XG4gICAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvKD86c2xlaXBuaXIpW1xcc1xcL10oXFxkKyg/OlxcLlxcZCspKykvaSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoL2stbWVsZW9uL2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ0stTWVsZW9uJ1xuICAgICAgICAsIGtNZWxlb246IHRcbiAgICAgICAgLCB2ZXJzaW9uOiBnZXRGaXJzdE1hdGNoKC8oPzprLW1lbGVvbilbXFxzXFwvXShcXGQrKD86XFwuXFxkKykrKS9pKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh3aW5kb3dzcGhvbmUpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ1dpbmRvd3MgUGhvbmUnXG4gICAgICAsIHdpbmRvd3NwaG9uZTogdFxuICAgICAgfVxuICAgICAgaWYgKGVkZ2VWZXJzaW9uKSB7XG4gICAgICAgIHJlc3VsdC5tc2VkZ2UgPSB0XG4gICAgICAgIHJlc3VsdC52ZXJzaW9uID0gZWRnZVZlcnNpb25cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZXN1bHQubXNpZSA9IHRcbiAgICAgICAgcmVzdWx0LnZlcnNpb24gPSBnZXRGaXJzdE1hdGNoKC9pZW1vYmlsZVxcLyhcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoL21zaWV8dHJpZGVudC9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdJbnRlcm5ldCBFeHBsb3JlcidcbiAgICAgICwgbXNpZTogdFxuICAgICAgLCB2ZXJzaW9uOiBnZXRGaXJzdE1hdGNoKC8oPzptc2llIHxydjopKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY2hyb21lb3MpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ0Nocm9tZSdcbiAgICAgICwgY2hyb21lb3M6IHRcbiAgICAgICwgY2hyb21lQm9vazogdFxuICAgICAgLCBjaHJvbWU6IHRcbiAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvKD86Y2hyb21lfGNyaW9zfGNybW8pXFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoL2Nocm9tZS4rPyBlZGdlL2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ01pY3Jvc29mdCBFZGdlJ1xuICAgICAgLCBtc2VkZ2U6IHRcbiAgICAgICwgdmVyc2lvbjogZWRnZVZlcnNpb25cbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoL3ZpdmFsZGkvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnVml2YWxkaSdcbiAgICAgICAgLCB2aXZhbGRpOiB0XG4gICAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvdml2YWxkaVxcLyhcXGQrKFxcLlxcZCspPykvaSkgfHwgdmVyc2lvbklkZW50aWZpZXJcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoc2FpbGZpc2gpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ1NhaWxmaXNoJ1xuICAgICAgLCBzYWlsZmlzaDogdFxuICAgICAgLCB2ZXJzaW9uOiBnZXRGaXJzdE1hdGNoKC9zYWlsZmlzaFxccz9icm93c2VyXFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvc2VhbW9ua2V5XFwvL2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ1NlYU1vbmtleSdcbiAgICAgICwgc2VhbW9ua2V5OiB0XG4gICAgICAsIHZlcnNpb246IGdldEZpcnN0TWF0Y2goL3NlYW1vbmtleVxcLyhcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoL2ZpcmVmb3h8aWNld2Vhc2VsfGZ4aW9zL2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ0ZpcmVmb3gnXG4gICAgICAsIGZpcmVmb3g6IHRcbiAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvKD86ZmlyZWZveHxpY2V3ZWFzZWx8Znhpb3MpWyBcXC9dKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfVxuICAgICAgaWYgKC9cXCgobW9iaWxlfHRhYmxldCk7W15cXCldKnJ2OltcXGRcXC5dK1xcKS9pLnRlc3QodWEpKSB7XG4gICAgICAgIHJlc3VsdC5maXJlZm94b3MgPSB0XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHNpbGspIHtcbiAgICAgIHJlc3VsdCA9ICB7XG4gICAgICAgIG5hbWU6ICdBbWF6b24gU2lsaydcbiAgICAgICwgc2lsazogdFxuICAgICAgLCB2ZXJzaW9uIDogZ2V0Rmlyc3RNYXRjaCgvc2lsa1xcLyhcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoL3BoYW50b20vaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnUGhhbnRvbUpTJ1xuICAgICAgLCBwaGFudG9tOiB0XG4gICAgICAsIHZlcnNpb246IGdldEZpcnN0TWF0Y2goL3BoYW50b21qc1xcLyhcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoL3NsaW1lcmpzL2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ1NsaW1lckpTJ1xuICAgICAgICAsIHNsaW1lcjogdFxuICAgICAgICAsIHZlcnNpb246IGdldEZpcnN0TWF0Y2goL3NsaW1lcmpzXFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvYmxhY2tiZXJyeXxcXGJiYlxcZCsvaS50ZXN0KHVhKSB8fCAvcmltXFxzdGFibGV0L2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ0JsYWNrQmVycnknXG4gICAgICAsIGJsYWNrYmVycnk6IHRcbiAgICAgICwgdmVyc2lvbjogdmVyc2lvbklkZW50aWZpZXIgfHwgZ2V0Rmlyc3RNYXRjaCgvYmxhY2tiZXJyeVtcXGRdK1xcLyhcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAod2Vib3MpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ1dlYk9TJ1xuICAgICAgLCB3ZWJvczogdFxuICAgICAgLCB2ZXJzaW9uOiB2ZXJzaW9uSWRlbnRpZmllciB8fCBnZXRGaXJzdE1hdGNoKC93KD86ZWIpP29zYnJvd3NlclxcLyhcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH07XG4gICAgICAvdG91Y2hwYWRcXC8vaS50ZXN0KHVhKSAmJiAocmVzdWx0LnRvdWNocGFkID0gdClcbiAgICB9XG4gICAgZWxzZSBpZiAoL2JhZGEvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnQmFkYSdcbiAgICAgICwgYmFkYTogdFxuICAgICAgLCB2ZXJzaW9uOiBnZXRGaXJzdE1hdGNoKC9kb2xmaW5cXC8oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICB9O1xuICAgIH1cbiAgICBlbHNlIGlmICh0aXplbikge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnVGl6ZW4nXG4gICAgICAsIHRpemVuOiB0XG4gICAgICAsIHZlcnNpb246IGdldEZpcnN0TWF0Y2goLyg/OnRpemVuXFxzPyk/YnJvd3NlclxcLyhcXGQrKFxcLlxcZCspPykvaSkgfHwgdmVyc2lvbklkZW50aWZpZXJcbiAgICAgIH07XG4gICAgfVxuICAgIGVsc2UgaWYgKC9xdXB6aWxsYS9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdRdXBaaWxsYSdcbiAgICAgICAgLCBxdXB6aWxsYTogdFxuICAgICAgICAsIHZlcnNpb246IGdldEZpcnN0TWF0Y2goLyg/OnF1cHppbGxhKVtcXHNcXC9dKFxcZCsoPzpcXC5cXGQrKSspL2kpIHx8IHZlcnNpb25JZGVudGlmaWVyXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKC9jaHJvbWl1bS9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdDaHJvbWl1bSdcbiAgICAgICAgLCBjaHJvbWl1bTogdFxuICAgICAgICAsIHZlcnNpb246IGdldEZpcnN0TWF0Y2goLyg/OmNocm9taXVtKVtcXHNcXC9dKFxcZCsoPzpcXC5cXGQrKT8pL2kpIHx8IHZlcnNpb25JZGVudGlmaWVyXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKC9jaHJvbWV8Y3Jpb3N8Y3Jtby9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdDaHJvbWUnXG4gICAgICAgICwgY2hyb21lOiB0XG4gICAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvKD86Y2hyb21lfGNyaW9zfGNybW8pXFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChhbmRyb2lkKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdBbmRyb2lkJ1xuICAgICAgICAsIHZlcnNpb246IHZlcnNpb25JZGVudGlmaWVyXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKC9zYWZhcml8YXBwbGV3ZWJraXQvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnU2FmYXJpJ1xuICAgICAgLCBzYWZhcmk6IHRcbiAgICAgIH1cbiAgICAgIGlmICh2ZXJzaW9uSWRlbnRpZmllcikge1xuICAgICAgICByZXN1bHQudmVyc2lvbiA9IHZlcnNpb25JZGVudGlmaWVyXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGlvc2RldmljZSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lIDogaW9zZGV2aWNlID09ICdpcGhvbmUnID8gJ2lQaG9uZScgOiBpb3NkZXZpY2UgPT0gJ2lwYWQnID8gJ2lQYWQnIDogJ2lQb2QnXG4gICAgICB9XG4gICAgICAvLyBXVEY6IHZlcnNpb24gaXMgbm90IHBhcnQgb2YgdXNlciBhZ2VudCBpbiB3ZWIgYXBwc1xuICAgICAgaWYgKHZlcnNpb25JZGVudGlmaWVyKSB7XG4gICAgICAgIHJlc3VsdC52ZXJzaW9uID0gdmVyc2lvbklkZW50aWZpZXJcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZigvZ29vZ2xlYm90L2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ0dvb2dsZWJvdCdcbiAgICAgICwgZ29vZ2xlYm90OiB0XG4gICAgICAsIHZlcnNpb246IGdldEZpcnN0TWF0Y2goL2dvb2dsZWJvdFxcLyhcXGQrKFxcLlxcZCspKS9pKSB8fCB2ZXJzaW9uSWRlbnRpZmllclxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogZ2V0Rmlyc3RNYXRjaCgvXiguKilcXC8oLiopIC8pLFxuICAgICAgICB2ZXJzaW9uOiBnZXRTZWNvbmRNYXRjaCgvXiguKilcXC8oLiopIC8pXG4gICAgIH07XG4gICB9XG5cbiAgICAvLyBzZXQgd2Via2l0IG9yIGdlY2tvIGZsYWcgZm9yIGJyb3dzZXJzIGJhc2VkIG9uIHRoZXNlIGVuZ2luZXNcbiAgICBpZiAoIXJlc3VsdC5tc2VkZ2UgJiYgLyhhcHBsZSk/d2Via2l0L2kudGVzdCh1YSkpIHtcbiAgICAgIGlmICgvKGFwcGxlKT93ZWJraXRcXC81MzdcXC4zNi9pLnRlc3QodWEpKSB7XG4gICAgICAgIHJlc3VsdC5uYW1lID0gcmVzdWx0Lm5hbWUgfHwgXCJCbGlua1wiXG4gICAgICAgIHJlc3VsdC5ibGluayA9IHRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdC5uYW1lID0gcmVzdWx0Lm5hbWUgfHwgXCJXZWJraXRcIlxuICAgICAgICByZXN1bHQud2Via2l0ID0gdFxuICAgICAgfVxuICAgICAgaWYgKCFyZXN1bHQudmVyc2lvbiAmJiB2ZXJzaW9uSWRlbnRpZmllcikge1xuICAgICAgICByZXN1bHQudmVyc2lvbiA9IHZlcnNpb25JZGVudGlmaWVyXG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghcmVzdWx0Lm9wZXJhICYmIC9nZWNrb1xcLy9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQubmFtZSA9IHJlc3VsdC5uYW1lIHx8IFwiR2Vja29cIlxuICAgICAgcmVzdWx0LmdlY2tvID0gdFxuICAgICAgcmVzdWx0LnZlcnNpb24gPSByZXN1bHQudmVyc2lvbiB8fCBnZXRGaXJzdE1hdGNoKC9nZWNrb1xcLyhcXGQrKFxcLlxcZCspPykvaSlcbiAgICB9XG5cbiAgICAvLyBzZXQgT1MgZmxhZ3MgZm9yIHBsYXRmb3JtcyB0aGF0IGhhdmUgbXVsdGlwbGUgYnJvd3NlcnNcbiAgICBpZiAoIXJlc3VsdC53aW5kb3dzcGhvbmUgJiYgIXJlc3VsdC5tc2VkZ2UgJiYgKGFuZHJvaWQgfHwgcmVzdWx0LnNpbGspKSB7XG4gICAgICByZXN1bHQuYW5kcm9pZCA9IHRcbiAgICB9IGVsc2UgaWYgKCFyZXN1bHQud2luZG93c3Bob25lICYmICFyZXN1bHQubXNlZGdlICYmIGlvc2RldmljZSkge1xuICAgICAgcmVzdWx0W2lvc2RldmljZV0gPSB0XG4gICAgICByZXN1bHQuaW9zID0gdFxuICAgIH0gZWxzZSBpZiAobWFjKSB7XG4gICAgICByZXN1bHQubWFjID0gdFxuICAgIH0gZWxzZSBpZiAoeGJveCkge1xuICAgICAgcmVzdWx0Lnhib3ggPSB0XG4gICAgfSBlbHNlIGlmICh3aW5kb3dzKSB7XG4gICAgICByZXN1bHQud2luZG93cyA9IHRcbiAgICB9IGVsc2UgaWYgKGxpbnV4KSB7XG4gICAgICByZXN1bHQubGludXggPSB0XG4gICAgfVxuXG4gICAgLy8gT1MgdmVyc2lvbiBleHRyYWN0aW9uXG4gICAgdmFyIG9zVmVyc2lvbiA9ICcnO1xuICAgIGlmIChyZXN1bHQud2luZG93c3Bob25lKSB7XG4gICAgICBvc1ZlcnNpb24gPSBnZXRGaXJzdE1hdGNoKC93aW5kb3dzIHBob25lICg/Om9zKT9cXHM/KFxcZCsoXFwuXFxkKykqKS9pKTtcbiAgICB9IGVsc2UgaWYgKGlvc2RldmljZSkge1xuICAgICAgb3NWZXJzaW9uID0gZ2V0Rmlyc3RNYXRjaCgvb3MgKFxcZCsoW19cXHNdXFxkKykqKSBsaWtlIG1hYyBvcyB4L2kpO1xuICAgICAgb3NWZXJzaW9uID0gb3NWZXJzaW9uLnJlcGxhY2UoL1tfXFxzXS9nLCAnLicpO1xuICAgIH0gZWxzZSBpZiAoYW5kcm9pZCkge1xuICAgICAgb3NWZXJzaW9uID0gZ2V0Rmlyc3RNYXRjaCgvYW5kcm9pZFsgXFwvLV0oXFxkKyhcXC5cXGQrKSopL2kpO1xuICAgIH0gZWxzZSBpZiAocmVzdWx0LndlYm9zKSB7XG4gICAgICBvc1ZlcnNpb24gPSBnZXRGaXJzdE1hdGNoKC8oPzp3ZWJ8aHB3KW9zXFwvKFxcZCsoXFwuXFxkKykqKS9pKTtcbiAgICB9IGVsc2UgaWYgKHJlc3VsdC5ibGFja2JlcnJ5KSB7XG4gICAgICBvc1ZlcnNpb24gPSBnZXRGaXJzdE1hdGNoKC9yaW1cXHN0YWJsZXRcXHNvc1xccyhcXGQrKFxcLlxcZCspKikvaSk7XG4gICAgfSBlbHNlIGlmIChyZXN1bHQuYmFkYSkge1xuICAgICAgb3NWZXJzaW9uID0gZ2V0Rmlyc3RNYXRjaCgvYmFkYVxcLyhcXGQrKFxcLlxcZCspKikvaSk7XG4gICAgfSBlbHNlIGlmIChyZXN1bHQudGl6ZW4pIHtcbiAgICAgIG9zVmVyc2lvbiA9IGdldEZpcnN0TWF0Y2goL3RpemVuW1xcL1xcc10oXFxkKyhcXC5cXGQrKSopL2kpO1xuICAgIH1cbiAgICBpZiAob3NWZXJzaW9uKSB7XG4gICAgICByZXN1bHQub3N2ZXJzaW9uID0gb3NWZXJzaW9uO1xuICAgIH1cblxuICAgIC8vIGRldmljZSB0eXBlIGV4dHJhY3Rpb25cbiAgICB2YXIgb3NNYWpvclZlcnNpb24gPSBvc1ZlcnNpb24uc3BsaXQoJy4nKVswXTtcbiAgICBpZiAoXG4gICAgICAgICB0YWJsZXRcbiAgICAgIHx8IG5leHVzVGFibGV0XG4gICAgICB8fCBpb3NkZXZpY2UgPT0gJ2lwYWQnXG4gICAgICB8fCAoYW5kcm9pZCAmJiAob3NNYWpvclZlcnNpb24gPT0gMyB8fCAob3NNYWpvclZlcnNpb24gPj0gNCAmJiAhbW9iaWxlKSkpXG4gICAgICB8fCByZXN1bHQuc2lsa1xuICAgICkge1xuICAgICAgcmVzdWx0LnRhYmxldCA9IHRcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgbW9iaWxlXG4gICAgICB8fCBpb3NkZXZpY2UgPT0gJ2lwaG9uZSdcbiAgICAgIHx8IGlvc2RldmljZSA9PSAnaXBvZCdcbiAgICAgIHx8IGFuZHJvaWRcbiAgICAgIHx8IG5leHVzTW9iaWxlXG4gICAgICB8fCByZXN1bHQuYmxhY2tiZXJyeVxuICAgICAgfHwgcmVzdWx0LndlYm9zXG4gICAgICB8fCByZXN1bHQuYmFkYVxuICAgICkge1xuICAgICAgcmVzdWx0Lm1vYmlsZSA9IHRcbiAgICB9XG5cbiAgICAvLyBHcmFkZWQgQnJvd3NlciBTdXBwb3J0XG4gICAgLy8gaHR0cDovL2RldmVsb3Blci55YWhvby5jb20veXVpL2FydGljbGVzL2dic1xuICAgIGlmIChyZXN1bHQubXNlZGdlIHx8XG4gICAgICAgIChyZXN1bHQubXNpZSAmJiByZXN1bHQudmVyc2lvbiA+PSAxMCkgfHxcbiAgICAgICAgKHJlc3VsdC55YW5kZXhicm93c2VyICYmIHJlc3VsdC52ZXJzaW9uID49IDE1KSB8fFxuXHRcdCAgICAocmVzdWx0LnZpdmFsZGkgJiYgcmVzdWx0LnZlcnNpb24gPj0gMS4wKSB8fFxuICAgICAgICAocmVzdWx0LmNocm9tZSAmJiByZXN1bHQudmVyc2lvbiA+PSAyMCkgfHxcbiAgICAgICAgKHJlc3VsdC5zYW1zdW5nQnJvd3NlciAmJiByZXN1bHQudmVyc2lvbiA+PSA0KSB8fFxuICAgICAgICAocmVzdWx0LmZpcmVmb3ggJiYgcmVzdWx0LnZlcnNpb24gPj0gMjAuMCkgfHxcbiAgICAgICAgKHJlc3VsdC5zYWZhcmkgJiYgcmVzdWx0LnZlcnNpb24gPj0gNikgfHxcbiAgICAgICAgKHJlc3VsdC5vcGVyYSAmJiByZXN1bHQudmVyc2lvbiA+PSAxMC4wKSB8fFxuICAgICAgICAocmVzdWx0LmlvcyAmJiByZXN1bHQub3N2ZXJzaW9uICYmIHJlc3VsdC5vc3ZlcnNpb24uc3BsaXQoXCIuXCIpWzBdID49IDYpIHx8XG4gICAgICAgIChyZXN1bHQuYmxhY2tiZXJyeSAmJiByZXN1bHQudmVyc2lvbiA+PSAxMC4xKVxuICAgICAgICB8fCAocmVzdWx0LmNocm9taXVtICYmIHJlc3VsdC52ZXJzaW9uID49IDIwKVxuICAgICAgICApIHtcbiAgICAgIHJlc3VsdC5hID0gdDtcbiAgICB9XG4gICAgZWxzZSBpZiAoKHJlc3VsdC5tc2llICYmIHJlc3VsdC52ZXJzaW9uIDwgMTApIHx8XG4gICAgICAgIChyZXN1bHQuY2hyb21lICYmIHJlc3VsdC52ZXJzaW9uIDwgMjApIHx8XG4gICAgICAgIChyZXN1bHQuZmlyZWZveCAmJiByZXN1bHQudmVyc2lvbiA8IDIwLjApIHx8XG4gICAgICAgIChyZXN1bHQuc2FmYXJpICYmIHJlc3VsdC52ZXJzaW9uIDwgNikgfHxcbiAgICAgICAgKHJlc3VsdC5vcGVyYSAmJiByZXN1bHQudmVyc2lvbiA8IDEwLjApIHx8XG4gICAgICAgIChyZXN1bHQuaW9zICYmIHJlc3VsdC5vc3ZlcnNpb24gJiYgcmVzdWx0Lm9zdmVyc2lvbi5zcGxpdChcIi5cIilbMF0gPCA2KVxuICAgICAgICB8fCAocmVzdWx0LmNocm9taXVtICYmIHJlc3VsdC52ZXJzaW9uIDwgMjApXG4gICAgICAgICkge1xuICAgICAgcmVzdWx0LmMgPSB0XG4gICAgfSBlbHNlIHJlc3VsdC54ID0gdFxuXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgdmFyIGJvd3NlciA9IGRldGVjdCh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyA/IG5hdmlnYXRvci51c2VyQWdlbnQgfHwgJycgOiAnJylcblxuICBib3dzZXIudGVzdCA9IGZ1bmN0aW9uIChicm93c2VyTGlzdCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnJvd3Nlckxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciBicm93c2VySXRlbSA9IGJyb3dzZXJMaXN0W2ldO1xuICAgICAgaWYgKHR5cGVvZiBicm93c2VySXRlbT09PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAoYnJvd3Nlckl0ZW0gaW4gYm93c2VyKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB2ZXJzaW9uIHByZWNpc2lvbnMgY291bnRcbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogICBnZXRWZXJzaW9uUHJlY2lzaW9uKFwiMS4xMC4zXCIpIC8vIDNcbiAgICpcbiAgICogQHBhcmFtICB7c3RyaW5nfSB2ZXJzaW9uXG4gICAqIEByZXR1cm4ge251bWJlcn1cbiAgICovXG4gIGZ1bmN0aW9uIGdldFZlcnNpb25QcmVjaXNpb24odmVyc2lvbikge1xuICAgIHJldHVybiB2ZXJzaW9uLnNwbGl0KFwiLlwiKS5sZW5ndGg7XG4gIH1cblxuICAvKipcbiAgICogQXJyYXk6Om1hcCBwb2x5ZmlsbFxuICAgKlxuICAgKiBAcGFyYW0gIHtBcnJheX0gYXJyXG4gICAqIEBwYXJhbSAge0Z1bmN0aW9ufSBpdGVyYXRvclxuICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICovXG4gIGZ1bmN0aW9uIG1hcChhcnIsIGl0ZXJhdG9yKSB7XG4gICAgdmFyIHJlc3VsdCA9IFtdLCBpO1xuICAgIGlmIChBcnJheS5wcm90b3R5cGUubWFwKSB7XG4gICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLm1hcC5jYWxsKGFyciwgaXRlcmF0b3IpO1xuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICByZXN1bHQucHVzaChpdGVyYXRvcihhcnJbaV0pKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgYnJvd3NlciB2ZXJzaW9uIHdlaWdodFxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiAgIGNvbXBhcmVWZXJzaW9ucyhbJzEuMTAuMi4xJywgICcxLjguMi4xLjkwJ10pICAgIC8vIDFcbiAgICogICBjb21wYXJlVmVyc2lvbnMoWycxLjAxMC4yLjEnLCAnMS4wOS4yLjEuOTAnXSk7ICAvLyAxXG4gICAqICAgY29tcGFyZVZlcnNpb25zKFsnMS4xMC4yLjEnLCAgJzEuMTAuMi4xJ10pOyAgICAgLy8gMFxuICAgKiAgIGNvbXBhcmVWZXJzaW9ucyhbJzEuMTAuMi4xJywgICcxLjA4MDAuMiddKTsgICAgIC8vIC0xXG4gICAqXG4gICAqIEBwYXJhbSAge0FycmF5PFN0cmluZz59IHZlcnNpb25zIHZlcnNpb25zIHRvIGNvbXBhcmVcbiAgICogQHJldHVybiB7TnVtYmVyfSBjb21wYXJpc29uIHJlc3VsdFxuICAgKi9cbiAgZnVuY3Rpb24gY29tcGFyZVZlcnNpb25zKHZlcnNpb25zKSB7XG4gICAgLy8gMSkgZ2V0IGNvbW1vbiBwcmVjaXNpb24gZm9yIGJvdGggdmVyc2lvbnMsIGZvciBleGFtcGxlIGZvciBcIjEwLjBcIiBhbmQgXCI5XCIgaXQgc2hvdWxkIGJlIDJcbiAgICB2YXIgcHJlY2lzaW9uID0gTWF0aC5tYXgoZ2V0VmVyc2lvblByZWNpc2lvbih2ZXJzaW9uc1swXSksIGdldFZlcnNpb25QcmVjaXNpb24odmVyc2lvbnNbMV0pKTtcbiAgICB2YXIgY2h1bmtzID0gbWFwKHZlcnNpb25zLCBmdW5jdGlvbiAodmVyc2lvbikge1xuICAgICAgdmFyIGRlbHRhID0gcHJlY2lzaW9uIC0gZ2V0VmVyc2lvblByZWNpc2lvbih2ZXJzaW9uKTtcblxuICAgICAgLy8gMikgXCI5XCIgLT4gXCI5LjBcIiAoZm9yIHByZWNpc2lvbiA9IDIpXG4gICAgICB2ZXJzaW9uID0gdmVyc2lvbiArIG5ldyBBcnJheShkZWx0YSArIDEpLmpvaW4oXCIuMFwiKTtcblxuICAgICAgLy8gMykgXCI5LjBcIiAtPiBbXCIwMDAwMDAwMDBcIlwiLCBcIjAwMDAwMDAwOVwiXVxuICAgICAgcmV0dXJuIG1hcCh2ZXJzaW9uLnNwbGl0KFwiLlwiKSwgZnVuY3Rpb24gKGNodW5rKSB7XG4gICAgICAgIHJldHVybiBuZXcgQXJyYXkoMjAgLSBjaHVuay5sZW5ndGgpLmpvaW4oXCIwXCIpICsgY2h1bms7XG4gICAgICB9KS5yZXZlcnNlKCk7XG4gICAgfSk7XG5cbiAgICAvLyBpdGVyYXRlIGluIHJldmVyc2Ugb3JkZXIgYnkgcmV2ZXJzZWQgY2h1bmtzIGFycmF5XG4gICAgd2hpbGUgKC0tcHJlY2lzaW9uID49IDApIHtcbiAgICAgIC8vIDQpIGNvbXBhcmU6IFwiMDAwMDAwMDA5XCIgPiBcIjAwMDAwMDAxMFwiID0gZmFsc2UgKGJ1dCBcIjlcIiA+IFwiMTBcIiA9IHRydWUpXG4gICAgICBpZiAoY2h1bmtzWzBdW3ByZWNpc2lvbl0gPiBjaHVua3NbMV1bcHJlY2lzaW9uXSkge1xuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGNodW5rc1swXVtwcmVjaXNpb25dID09PSBjaHVua3NbMV1bcHJlY2lzaW9uXSkge1xuICAgICAgICBpZiAocHJlY2lzaW9uID09PSAwKSB7XG4gICAgICAgICAgLy8gYWxsIHZlcnNpb24gY2h1bmtzIGFyZSBzYW1lXG4gICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGJyb3dzZXIgaXMgdW5zdXBwb3J0ZWRcbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogICBib3dzZXIuaXNVbnN1cHBvcnRlZEJyb3dzZXIoe1xuICAgKiAgICAgbXNpZTogXCIxMFwiLFxuICAgKiAgICAgZmlyZWZveDogXCIyM1wiLFxuICAgKiAgICAgY2hyb21lOiBcIjI5XCIsXG4gICAqICAgICBzYWZhcmk6IFwiNS4xXCIsXG4gICAqICAgICBvcGVyYTogXCIxNlwiLFxuICAgKiAgICAgcGhhbnRvbTogXCI1MzRcIlxuICAgKiAgIH0pO1xuICAgKlxuICAgKiBAcGFyYW0gIHtPYmplY3R9ICBtaW5WZXJzaW9ucyBtYXAgb2YgbWluaW1hbCB2ZXJzaW9uIHRvIGJyb3dzZXJcbiAgICogQHBhcmFtICB7Qm9vbGVhbn0gW3N0cmljdE1vZGUgPSBmYWxzZV0gZmxhZyB0byByZXR1cm4gZmFsc2UgaWYgYnJvd3NlciB3YXNuJ3QgZm91bmQgaW4gbWFwXG4gICAqIEBwYXJhbSAge1N0cmluZ30gIFt1YV0gdXNlciBhZ2VudCBzdHJpbmdcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICovXG4gIGZ1bmN0aW9uIGlzVW5zdXBwb3J0ZWRCcm93c2VyKG1pblZlcnNpb25zLCBzdHJpY3RNb2RlLCB1YSkge1xuICAgIHZhciBfYm93c2VyID0gYm93c2VyO1xuXG4gICAgLy8gbWFrZSBzdHJpY3RNb2RlIHBhcmFtIG9wdGlvbmFsIHdpdGggdWEgcGFyYW0gdXNhZ2VcbiAgICBpZiAodHlwZW9mIHN0cmljdE1vZGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICB1YSA9IHN0cmljdE1vZGU7XG4gICAgICBzdHJpY3RNb2RlID0gdm9pZCgwKTtcbiAgICB9XG5cbiAgICBpZiAoc3RyaWN0TW9kZSA9PT0gdm9pZCgwKSkge1xuICAgICAgc3RyaWN0TW9kZSA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAodWEpIHtcbiAgICAgIF9ib3dzZXIgPSBkZXRlY3QodWEpO1xuICAgIH1cblxuICAgIHZhciB2ZXJzaW9uID0gXCJcIiArIF9ib3dzZXIudmVyc2lvbjtcbiAgICBmb3IgKHZhciBicm93c2VyIGluIG1pblZlcnNpb25zKSB7XG4gICAgICBpZiAobWluVmVyc2lvbnMuaGFzT3duUHJvcGVydHkoYnJvd3NlcikpIHtcbiAgICAgICAgaWYgKF9ib3dzZXJbYnJvd3Nlcl0pIHtcbiAgICAgICAgICBpZiAodHlwZW9mIG1pblZlcnNpb25zW2Jyb3dzZXJdICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdCcm93c2VyIHZlcnNpb24gaW4gdGhlIG1pblZlcnNpb24gbWFwIHNob3VsZCBiZSBhIHN0cmluZzogJyArIGJyb3dzZXIgKyAnOiAnICsgU3RyaW5nKG1pblZlcnNpb25zKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gYnJvd3NlciB2ZXJzaW9uIGFuZCBtaW4gc3VwcG9ydGVkIHZlcnNpb24uXG4gICAgICAgICAgcmV0dXJuIGNvbXBhcmVWZXJzaW9ucyhbdmVyc2lvbiwgbWluVmVyc2lvbnNbYnJvd3Nlcl1dKSA8IDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3RyaWN0TW9kZTsgLy8gbm90IGZvdW5kXG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgYnJvd3NlciBpcyBzdXBwb3J0ZWRcbiAgICpcbiAgICogQHBhcmFtICB7T2JqZWN0fSBtaW5WZXJzaW9ucyBtYXAgb2YgbWluaW1hbCB2ZXJzaW9uIHRvIGJyb3dzZXJcbiAgICogQHBhcmFtICB7Qm9vbGVhbn0gW3N0cmljdE1vZGUgPSBmYWxzZV0gZmxhZyB0byByZXR1cm4gZmFsc2UgaWYgYnJvd3NlciB3YXNuJ3QgZm91bmQgaW4gbWFwXG4gICAqIEBwYXJhbSAge1N0cmluZ30gIFt1YV0gdXNlciBhZ2VudCBzdHJpbmdcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICovXG4gIGZ1bmN0aW9uIGNoZWNrKG1pblZlcnNpb25zLCBzdHJpY3RNb2RlLCB1YSkge1xuICAgIHJldHVybiAhaXNVbnN1cHBvcnRlZEJyb3dzZXIobWluVmVyc2lvbnMsIHN0cmljdE1vZGUsIHVhKTtcbiAgfVxuXG4gIGJvd3Nlci5pc1Vuc3VwcG9ydGVkQnJvd3NlciA9IGlzVW5zdXBwb3J0ZWRCcm93c2VyO1xuICBib3dzZXIuY29tcGFyZVZlcnNpb25zID0gY29tcGFyZVZlcnNpb25zO1xuICBib3dzZXIuY2hlY2sgPSBjaGVjaztcblxuICAvKlxuICAgKiBTZXQgb3VyIGRldGVjdCBtZXRob2QgdG8gdGhlIG1haW4gYm93c2VyIG9iamVjdCBzbyB3ZSBjYW5cbiAgICogcmV1c2UgaXQgdG8gdGVzdCBvdGhlciB1c2VyIGFnZW50cy5cbiAgICogVGhpcyBpcyBuZWVkZWQgdG8gaW1wbGVtZW50IGZ1dHVyZSB0ZXN0cy5cbiAgICovXG4gIGJvd3Nlci5fZGV0ZWN0ID0gZGV0ZWN0O1xuXG4gIHJldHVybiBib3dzZXJcbn0pO1xuIiwiLyohXG4gKiBEcmFnZ2FiaWxseSB2Mi4xLjFcbiAqIE1ha2UgdGhhdCBzaGl6IGRyYWdnYWJsZVxuICogaHR0cDovL2RyYWdnYWJpbGx5LmRlc2FuZHJvLmNvbVxuICogTUlUIGxpY2Vuc2VcbiAqL1xuXG4vKmpzaGludCBicm93c2VyOiB0cnVlLCBzdHJpY3Q6IHRydWUsIHVuZGVmOiB0cnVlLCB1bnVzZWQ6IHRydWUgKi9cblxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgLyoganNoaW50IHN0cmljdDogZmFsc2UgKi8gLypnbG9iYWxzIGRlZmluZSwgbW9kdWxlLCByZXF1aXJlICovXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBbXG4gICAgICAgICdnZXQtc2l6ZS9nZXQtc2l6ZScsXG4gICAgICAgICd1bmlkcmFnZ2VyL3VuaWRyYWdnZXInXG4gICAgICBdLFxuICAgICAgZnVuY3Rpb24oIGdldFNpemUsIFVuaWRyYWdnZXIgKSB7XG4gICAgICAgIHJldHVybiBmYWN0b3J5KCB3aW5kb3csIGdldFNpemUsIFVuaWRyYWdnZXIgKTtcbiAgICAgIH0pO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgcmVxdWlyZSgnZ2V0LXNpemUnKSxcbiAgICAgIHJlcXVpcmUoJ3VuaWRyYWdnZXInKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICB3aW5kb3cuRHJhZ2dhYmlsbHkgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgd2luZG93LmdldFNpemUsXG4gICAgICB3aW5kb3cuVW5pZHJhZ2dlclxuICAgICk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCB3aW5kb3csIGdldFNpemUsIFVuaWRyYWdnZXIgKSB7XG5cbid1c2Ugc3RyaWN0JztcblxuLy8gdmFyc1xudmFyIGRvY3VtZW50ID0gd2luZG93LmRvY3VtZW50O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gaGVscGVycyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vLyBleHRlbmQgb2JqZWN0c1xuZnVuY3Rpb24gZXh0ZW5kKCBhLCBiICkge1xuICBmb3IgKCB2YXIgcHJvcCBpbiBiICkge1xuICAgIGFbIHByb3AgXSA9IGJbIHByb3AgXTtcbiAgfVxuICByZXR1cm4gYTtcbn1cblxuZnVuY3Rpb24gaXNFbGVtZW50KCBvYmogKSB7XG4gIHJldHVybiBvYmogaW5zdGFuY2VvZiBIVE1MRWxlbWVudDtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8vIGdldCByQUYsIHByZWZpeGVkLCBpZiBwcmVzZW50XG52YXIgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XG5cbi8vIGZhbGxiYWNrIHRvIHNldFRpbWVvdXRcbnZhciBsYXN0VGltZSA9IDA7XG5pZiAoICFyZXF1ZXN0QW5pbWF0aW9uRnJhbWUgKSAge1xuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbiggY2FsbGJhY2sgKSB7XG4gICAgdmFyIGN1cnJUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgdmFyIHRpbWVUb0NhbGwgPSBNYXRoLm1heCggMCwgMTYgLSAoIGN1cnJUaW1lIC0gbGFzdFRpbWUgKSApO1xuICAgIHZhciBpZCA9IHNldFRpbWVvdXQoIGNhbGxiYWNrLCB0aW1lVG9DYWxsICk7XG4gICAgbGFzdFRpbWUgPSBjdXJyVGltZSArIHRpbWVUb0NhbGw7XG4gICAgcmV0dXJuIGlkO1xuICB9O1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBzdXBwb3J0IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnZhciBkb2NFbGVtID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xudmFyIHRyYW5zZm9ybVByb3BlcnR5ID0gdHlwZW9mIGRvY0VsZW0uc3R5bGUudHJhbnNmb3JtID09ICdzdHJpbmcnID9cbiAgJ3RyYW5zZm9ybScgOiAnV2Via2l0VHJhbnNmb3JtJztcblxudmFyIGpRdWVyeSA9IHdpbmRvdy5qUXVlcnk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5mdW5jdGlvbiBEcmFnZ2FiaWxseSggZWxlbWVudCwgb3B0aW9ucyApIHtcbiAgLy8gcXVlcnlTZWxlY3RvciBpZiBzdHJpbmdcbiAgdGhpcy5lbGVtZW50ID0gdHlwZW9mIGVsZW1lbnQgPT0gJ3N0cmluZycgP1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIGVsZW1lbnQgKSA6IGVsZW1lbnQ7XG5cbiAgaWYgKCBqUXVlcnkgKSB7XG4gICAgdGhpcy4kZWxlbWVudCA9IGpRdWVyeSggdGhpcy5lbGVtZW50ICk7XG4gIH1cblxuICAvLyBvcHRpb25zXG4gIHRoaXMub3B0aW9ucyA9IGV4dGVuZCgge30sIHRoaXMuY29uc3RydWN0b3IuZGVmYXVsdHMgKTtcbiAgdGhpcy5vcHRpb24oIG9wdGlvbnMgKTtcblxuICB0aGlzLl9jcmVhdGUoKTtcbn1cblxuLy8gaW5oZXJpdCBVbmlkcmFnZ2VyIG1ldGhvZHNcbnZhciBwcm90byA9IERyYWdnYWJpbGx5LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFVuaWRyYWdnZXIucHJvdG90eXBlICk7XG5cbkRyYWdnYWJpbGx5LmRlZmF1bHRzID0ge1xufTtcblxuLyoqXG4gKiBzZXQgb3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAqL1xucHJvdG8ub3B0aW9uID0gZnVuY3Rpb24oIG9wdHMgKSB7XG4gIGV4dGVuZCggdGhpcy5vcHRpb25zLCBvcHRzICk7XG59O1xuXG4vLyBjc3MgcG9zaXRpb24gdmFsdWVzIHRoYXQgZG9uJ3QgbmVlZCB0byBiZSBzZXRcbnZhciBwb3NpdGlvblZhbHVlcyA9IHtcbiAgcmVsYXRpdmU6IHRydWUsXG4gIGFic29sdXRlOiB0cnVlLFxuICBmaXhlZDogdHJ1ZVxufTtcblxucHJvdG8uX2NyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuXG4gIC8vIHByb3BlcnRpZXNcbiAgdGhpcy5wb3NpdGlvbiA9IHt9O1xuICB0aGlzLl9nZXRQb3NpdGlvbigpO1xuXG4gIHRoaXMuc3RhcnRQb2ludCA9IHsgeDogMCwgeTogMCB9O1xuICB0aGlzLmRyYWdQb2ludCA9IHsgeDogMCwgeTogMCB9O1xuXG4gIHRoaXMuc3RhcnRQb3NpdGlvbiA9IGV4dGVuZCgge30sIHRoaXMucG9zaXRpb24gKTtcblxuICAvLyBzZXQgcmVsYXRpdmUgcG9zaXRpb25pbmdcbiAgdmFyIHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZSggdGhpcy5lbGVtZW50ICk7XG4gIGlmICggIXBvc2l0aW9uVmFsdWVzWyBzdHlsZS5wb3NpdGlvbiBdICkge1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gIH1cblxuICB0aGlzLmVuYWJsZSgpO1xuICB0aGlzLnNldEhhbmRsZXMoKTtcblxufTtcblxuLyoqXG4gKiBzZXQgdGhpcy5oYW5kbGVzIGFuZCBiaW5kIHN0YXJ0IGV2ZW50cyB0byAnZW1cbiAqL1xucHJvdG8uc2V0SGFuZGxlcyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmhhbmRsZXMgPSB0aGlzLm9wdGlvbnMuaGFuZGxlID9cbiAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCggdGhpcy5vcHRpb25zLmhhbmRsZSApIDogWyB0aGlzLmVsZW1lbnQgXTtcblxuICB0aGlzLmJpbmRIYW5kbGVzKCk7XG59O1xuXG4vKipcbiAqIGVtaXRzIGV2ZW50cyB2aWEgRXZFbWl0dGVyIGFuZCBqUXVlcnkgZXZlbnRzXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIG5hbWUgb2YgZXZlbnRcbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gb3JpZ2luYWwgZXZlbnRcbiAqIEBwYXJhbSB7QXJyYXl9IGFyZ3MgLSBleHRyYSBhcmd1bWVudHNcbiAqL1xucHJvdG8uZGlzcGF0Y2hFdmVudCA9IGZ1bmN0aW9uKCB0eXBlLCBldmVudCwgYXJncyApIHtcbiAgdmFyIGVtaXRBcmdzID0gWyBldmVudCBdLmNvbmNhdCggYXJncyApO1xuICB0aGlzLmVtaXRFdmVudCggdHlwZSwgZW1pdEFyZ3MgKTtcbiAgdmFyIGpRdWVyeSA9IHdpbmRvdy5qUXVlcnk7XG4gIC8vIHRyaWdnZXIgalF1ZXJ5IGV2ZW50XG4gIGlmICggalF1ZXJ5ICYmIHRoaXMuJGVsZW1lbnQgKSB7XG4gICAgaWYgKCBldmVudCApIHtcbiAgICAgIC8vIGNyZWF0ZSBqUXVlcnkgZXZlbnRcbiAgICAgIHZhciAkZXZlbnQgPSBqUXVlcnkuRXZlbnQoIGV2ZW50ICk7XG4gICAgICAkZXZlbnQudHlwZSA9IHR5cGU7XG4gICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoICRldmVudCwgYXJncyApO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBqdXN0IHRyaWdnZXIgd2l0aCB0eXBlIGlmIG5vIGV2ZW50IGF2YWlsYWJsZVxuICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCB0eXBlLCBhcmdzICk7XG4gICAgfVxuICB9XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBwb3NpdGlvbiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vLyBnZXQgeC95IHBvc2l0aW9uIGZyb20gc3R5bGVcbnByb3RvLl9nZXRQb3NpdGlvbiA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKCB0aGlzLmVsZW1lbnQgKTtcbiAgdmFyIHggPSB0aGlzLl9nZXRQb3NpdGlvbkNvb3JkKCBzdHlsZS5sZWZ0LCAnd2lkdGgnICk7XG4gIHZhciB5ID0gdGhpcy5fZ2V0UG9zaXRpb25Db29yZCggc3R5bGUudG9wLCAnaGVpZ2h0JyApO1xuICAvLyBjbGVhbiB1cCAnYXV0bycgb3Igb3RoZXIgbm9uLWludGVnZXIgdmFsdWVzXG4gIHRoaXMucG9zaXRpb24ueCA9IGlzTmFOKCB4ICkgPyAwIDogeDtcbiAgdGhpcy5wb3NpdGlvbi55ID0gaXNOYU4oIHkgKSA/IDAgOiB5O1xuXG4gIHRoaXMuX2FkZFRyYW5zZm9ybVBvc2l0aW9uKCBzdHlsZSApO1xufTtcblxucHJvdG8uX2dldFBvc2l0aW9uQ29vcmQgPSBmdW5jdGlvbiggc3R5bGVTaWRlLCBtZWFzdXJlICkge1xuICBpZiAoIHN0eWxlU2lkZS5pbmRleE9mKCclJykgIT0gLTEgKSB7XG4gICAgLy8gY29udmVydCBwZXJjZW50IGludG8gcGl4ZWwgZm9yIFNhZmFyaSwgIzc1XG4gICAgdmFyIHBhcmVudFNpemUgPSBnZXRTaXplKCB0aGlzLmVsZW1lbnQucGFyZW50Tm9kZSApO1xuICAgIC8vIHByZXZlbnQgbm90LWluLURPTSBlbGVtZW50IHRocm93aW5nIGJ1ZywgIzEzMVxuICAgIHJldHVybiAhcGFyZW50U2l6ZSA/IDAgOlxuICAgICAgKCBwYXJzZUZsb2F0KCBzdHlsZVNpZGUgKSAvIDEwMCApICogcGFyZW50U2l6ZVsgbWVhc3VyZSBdO1xuICB9XG4gIHJldHVybiBwYXJzZUludCggc3R5bGVTaWRlLCAxMCApO1xufTtcblxuLy8gYWRkIHRyYW5zZm9ybTogdHJhbnNsYXRlKCB4LCB5ICkgdG8gcG9zaXRpb25cbnByb3RvLl9hZGRUcmFuc2Zvcm1Qb3NpdGlvbiA9IGZ1bmN0aW9uKCBzdHlsZSApIHtcbiAgdmFyIHRyYW5zZm9ybSA9IHN0eWxlWyB0cmFuc2Zvcm1Qcm9wZXJ0eSBdO1xuICAvLyBiYWlsIG91dCBpZiB2YWx1ZSBpcyAnbm9uZSdcbiAgaWYgKCB0cmFuc2Zvcm0uaW5kZXhPZignbWF0cml4JykgIT09IDAgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIHNwbGl0IG1hdHJpeCgxLCAwLCAwLCAxLCB4LCB5KVxuICB2YXIgbWF0cml4VmFsdWVzID0gdHJhbnNmb3JtLnNwbGl0KCcsJyk7XG4gIC8vIHRyYW5zbGF0ZSBYIHZhbHVlIGlzIGluIDEydGggb3IgNHRoIHBvc2l0aW9uXG4gIHZhciB4SW5kZXggPSB0cmFuc2Zvcm0uaW5kZXhPZignbWF0cml4M2QnKSA9PT0gMCA/IDEyIDogNDtcbiAgdmFyIHRyYW5zbGF0ZVggPSBwYXJzZUludCggbWF0cml4VmFsdWVzWyB4SW5kZXggXSwgMTAgKTtcbiAgLy8gdHJhbnNsYXRlIFkgdmFsdWUgaXMgaW4gMTN0aCBvciA1dGggcG9zaXRpb25cbiAgdmFyIHRyYW5zbGF0ZVkgPSBwYXJzZUludCggbWF0cml4VmFsdWVzWyB4SW5kZXggKyAxIF0sIDEwICk7XG4gIHRoaXMucG9zaXRpb24ueCArPSB0cmFuc2xhdGVYO1xuICB0aGlzLnBvc2l0aW9uLnkgKz0gdHJhbnNsYXRlWTtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGV2ZW50cyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vKipcbiAqIHBvaW50ZXIgc3RhcnRcbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gKiBAcGFyYW0ge0V2ZW50IG9yIFRvdWNofSBwb2ludGVyXG4gKi9cbnByb3RvLnBvaW50ZXJEb3duID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB0aGlzLl9kcmFnUG9pbnRlckRvd24oIGV2ZW50LCBwb2ludGVyICk7XG4gIC8vIGtsdWRnZSB0byBibHVyIGZvY3VzZWQgaW5wdXRzIGluIGRyYWdnZXJcbiAgdmFyIGZvY3VzZWQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAvLyBkbyBub3QgYmx1ciBib2R5IGZvciBJRTEwLCBtZXRhZml6enkvZmxpY2tpdHkjMTE3XG4gIGlmICggZm9jdXNlZCAmJiBmb2N1c2VkLmJsdXIgJiYgZm9jdXNlZCAhPSBkb2N1bWVudC5ib2R5ICkge1xuICAgIGZvY3VzZWQuYmx1cigpO1xuICB9XG4gIC8vIGJpbmQgbW92ZSBhbmQgZW5kIGV2ZW50c1xuICB0aGlzLl9iaW5kUG9zdFN0YXJ0RXZlbnRzKCBldmVudCApO1xuICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaXMtcG9pbnRlci1kb3duJyk7XG4gIHRoaXMuZGlzcGF0Y2hFdmVudCggJ3BvaW50ZXJEb3duJywgZXZlbnQsIFsgcG9pbnRlciBdICk7XG59O1xuXG4vKipcbiAqIGRyYWcgbW92ZVxuICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAqIEBwYXJhbSB7RXZlbnQgb3IgVG91Y2h9IHBvaW50ZXJcbiAqL1xucHJvdG8ucG9pbnRlck1vdmUgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIHZhciBtb3ZlVmVjdG9yID0gdGhpcy5fZHJhZ1BvaW50ZXJNb3ZlKCBldmVudCwgcG9pbnRlciApO1xuICB0aGlzLmRpc3BhdGNoRXZlbnQoICdwb2ludGVyTW92ZScsIGV2ZW50LCBbIHBvaW50ZXIsIG1vdmVWZWN0b3IgXSApO1xuICB0aGlzLl9kcmFnTW92ZSggZXZlbnQsIHBvaW50ZXIsIG1vdmVWZWN0b3IgKTtcbn07XG5cbi8qKlxuICogZHJhZyBzdGFydFxuICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAqIEBwYXJhbSB7RXZlbnQgb3IgVG91Y2h9IHBvaW50ZXJcbiAqL1xucHJvdG8uZHJhZ1N0YXJ0ID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICBpZiAoICF0aGlzLmlzRW5hYmxlZCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5fZ2V0UG9zaXRpb24oKTtcbiAgdGhpcy5tZWFzdXJlQ29udGFpbm1lbnQoKTtcbiAgLy8gcG9zaXRpb24gX3doZW5fIGRyYWcgYmVnYW5cbiAgdGhpcy5zdGFydFBvc2l0aW9uLnggPSB0aGlzLnBvc2l0aW9uLng7XG4gIHRoaXMuc3RhcnRQb3NpdGlvbi55ID0gdGhpcy5wb3NpdGlvbi55O1xuICAvLyByZXNldCBsZWZ0L3RvcCBzdHlsZVxuICB0aGlzLnNldExlZnRUb3AoKTtcblxuICB0aGlzLmRyYWdQb2ludC54ID0gMDtcbiAgdGhpcy5kcmFnUG9pbnQueSA9IDA7XG5cbiAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2lzLWRyYWdnaW5nJyk7XG4gIHRoaXMuZGlzcGF0Y2hFdmVudCggJ2RyYWdTdGFydCcsIGV2ZW50LCBbIHBvaW50ZXIgXSApO1xuICAvLyBzdGFydCBhbmltYXRpb25cbiAgdGhpcy5hbmltYXRlKCk7XG59O1xuXG5wcm90by5tZWFzdXJlQ29udGFpbm1lbnQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGNvbnRhaW5tZW50ID0gdGhpcy5vcHRpb25zLmNvbnRhaW5tZW50O1xuICBpZiAoICFjb250YWlubWVudCApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyB1c2UgZWxlbWVudCBpZiBlbGVtZW50XG4gIHZhciBjb250YWluZXIgPSBpc0VsZW1lbnQoIGNvbnRhaW5tZW50ICkgPyBjb250YWlubWVudCA6XG4gICAgLy8gZmFsbGJhY2sgdG8gcXVlcnlTZWxlY3RvciBpZiBzdHJpbmdcbiAgICB0eXBlb2YgY29udGFpbm1lbnQgPT0gJ3N0cmluZycgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCBjb250YWlubWVudCApIDpcbiAgICAvLyBvdGhlcndpc2UganVzdCBgdHJ1ZWAsIHVzZSB0aGUgcGFyZW50XG4gICAgdGhpcy5lbGVtZW50LnBhcmVudE5vZGU7XG5cbiAgdmFyIGVsZW1TaXplID0gZ2V0U2l6ZSggdGhpcy5lbGVtZW50ICk7XG4gIHZhciBjb250YWluZXJTaXplID0gZ2V0U2l6ZSggY29udGFpbmVyICk7XG4gIHZhciBlbGVtUmVjdCA9IHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgdmFyIGNvbnRhaW5lclJlY3QgPSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgdmFyIGJvcmRlclNpemVYID0gY29udGFpbmVyU2l6ZS5ib3JkZXJMZWZ0V2lkdGggKyBjb250YWluZXJTaXplLmJvcmRlclJpZ2h0V2lkdGg7XG4gIHZhciBib3JkZXJTaXplWSA9IGNvbnRhaW5lclNpemUuYm9yZGVyVG9wV2lkdGggKyBjb250YWluZXJTaXplLmJvcmRlckJvdHRvbVdpZHRoO1xuXG4gIHZhciBwb3NpdGlvbiA9IHRoaXMucmVsYXRpdmVTdGFydFBvc2l0aW9uID0ge1xuICAgIHg6IGVsZW1SZWN0LmxlZnQgLSAoIGNvbnRhaW5lclJlY3QubGVmdCArIGNvbnRhaW5lclNpemUuYm9yZGVyTGVmdFdpZHRoICksXG4gICAgeTogZWxlbVJlY3QudG9wIC0gKCBjb250YWluZXJSZWN0LnRvcCArIGNvbnRhaW5lclNpemUuYm9yZGVyVG9wV2lkdGggKVxuICB9O1xuXG4gIHRoaXMuY29udGFpblNpemUgPSB7XG4gICAgd2lkdGg6ICggY29udGFpbmVyU2l6ZS53aWR0aCAtIGJvcmRlclNpemVYICkgLSBwb3NpdGlvbi54IC0gZWxlbVNpemUud2lkdGgsXG4gICAgaGVpZ2h0OiAoIGNvbnRhaW5lclNpemUuaGVpZ2h0IC0gYm9yZGVyU2l6ZVkgKSAtIHBvc2l0aW9uLnkgLSBlbGVtU2l6ZS5oZWlnaHRcbiAgfTtcbn07XG5cbi8vIC0tLS0tIG1vdmUgZXZlbnQgLS0tLS0gLy9cblxuLyoqXG4gKiBkcmFnIG1vdmVcbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gKiBAcGFyYW0ge0V2ZW50IG9yIFRvdWNofSBwb2ludGVyXG4gKi9cbnByb3RvLmRyYWdNb3ZlID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyLCBtb3ZlVmVjdG9yICkge1xuICBpZiAoICF0aGlzLmlzRW5hYmxlZCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGRyYWdYID0gbW92ZVZlY3Rvci54O1xuICB2YXIgZHJhZ1kgPSBtb3ZlVmVjdG9yLnk7XG5cbiAgdmFyIGdyaWQgPSB0aGlzLm9wdGlvbnMuZ3JpZDtcbiAgdmFyIGdyaWRYID0gZ3JpZCAmJiBncmlkWzBdO1xuICB2YXIgZ3JpZFkgPSBncmlkICYmIGdyaWRbMV07XG5cbiAgZHJhZ1ggPSBhcHBseUdyaWQoIGRyYWdYLCBncmlkWCApO1xuICBkcmFnWSA9IGFwcGx5R3JpZCggZHJhZ1ksIGdyaWRZICk7XG5cbiAgZHJhZ1ggPSB0aGlzLmNvbnRhaW5EcmFnKCAneCcsIGRyYWdYLCBncmlkWCApO1xuICBkcmFnWSA9IHRoaXMuY29udGFpbkRyYWcoICd5JywgZHJhZ1ksIGdyaWRZICk7XG5cbiAgLy8gY29uc3RyYWluIHRvIGF4aXNcbiAgZHJhZ1ggPSB0aGlzLm9wdGlvbnMuYXhpcyA9PSAneScgPyAwIDogZHJhZ1g7XG4gIGRyYWdZID0gdGhpcy5vcHRpb25zLmF4aXMgPT0gJ3gnID8gMCA6IGRyYWdZO1xuXG4gIHRoaXMucG9zaXRpb24ueCA9IHRoaXMuc3RhcnRQb3NpdGlvbi54ICsgZHJhZ1g7XG4gIHRoaXMucG9zaXRpb24ueSA9IHRoaXMuc3RhcnRQb3NpdGlvbi55ICsgZHJhZ1k7XG4gIC8vIHNldCBkcmFnUG9pbnQgcHJvcGVydGllc1xuICB0aGlzLmRyYWdQb2ludC54ID0gZHJhZ1g7XG4gIHRoaXMuZHJhZ1BvaW50LnkgPSBkcmFnWTtcblxuICB0aGlzLmRpc3BhdGNoRXZlbnQoICdkcmFnTW92ZScsIGV2ZW50LCBbIHBvaW50ZXIsIG1vdmVWZWN0b3IgXSApO1xufTtcblxuZnVuY3Rpb24gYXBwbHlHcmlkKCB2YWx1ZSwgZ3JpZCwgbWV0aG9kICkge1xuICBtZXRob2QgPSBtZXRob2QgfHwgJ3JvdW5kJztcbiAgcmV0dXJuIGdyaWQgPyBNYXRoWyBtZXRob2QgXSggdmFsdWUgLyBncmlkICkgKiBncmlkIDogdmFsdWU7XG59XG5cbnByb3RvLmNvbnRhaW5EcmFnID0gZnVuY3Rpb24oIGF4aXMsIGRyYWcsIGdyaWQgKSB7XG4gIGlmICggIXRoaXMub3B0aW9ucy5jb250YWlubWVudCApIHtcbiAgICByZXR1cm4gZHJhZztcbiAgfVxuICB2YXIgbWVhc3VyZSA9IGF4aXMgPT0gJ3gnID8gJ3dpZHRoJyA6ICdoZWlnaHQnO1xuXG4gIHZhciByZWwgPSB0aGlzLnJlbGF0aXZlU3RhcnRQb3NpdGlvblsgYXhpcyBdO1xuICB2YXIgbWluID0gYXBwbHlHcmlkKCAtcmVsLCBncmlkLCAnY2VpbCcgKTtcbiAgdmFyIG1heCA9IHRoaXMuY29udGFpblNpemVbIG1lYXN1cmUgXTtcbiAgbWF4ID0gYXBwbHlHcmlkKCBtYXgsIGdyaWQsICdmbG9vcicgKTtcbiAgcmV0dXJuICBNYXRoLm1pbiggbWF4LCBNYXRoLm1heCggbWluLCBkcmFnICkgKTtcbn07XG5cbi8vIC0tLS0tIGVuZCBldmVudCAtLS0tLSAvL1xuXG4vKipcbiAqIHBvaW50ZXIgdXBcbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gKiBAcGFyYW0ge0V2ZW50IG9yIFRvdWNofSBwb2ludGVyXG4gKi9cbnByb3RvLnBvaW50ZXJVcCA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLXBvaW50ZXItZG93bicpO1xuICB0aGlzLmRpc3BhdGNoRXZlbnQoICdwb2ludGVyVXAnLCBldmVudCwgWyBwb2ludGVyIF0gKTtcbiAgdGhpcy5fZHJhZ1BvaW50ZXJVcCggZXZlbnQsIHBvaW50ZXIgKTtcbn07XG5cbi8qKlxuICogZHJhZyBlbmRcbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gKiBAcGFyYW0ge0V2ZW50IG9yIFRvdWNofSBwb2ludGVyXG4gKi9cbnByb3RvLmRyYWdFbmQgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIGlmICggIXRoaXMuaXNFbmFibGVkICkge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyB1c2UgdG9wIGxlZnQgcG9zaXRpb24gd2hlbiBjb21wbGV0ZVxuICBpZiAoIHRyYW5zZm9ybVByb3BlcnR5ICkge1xuICAgIHRoaXMuZWxlbWVudC5zdHlsZVsgdHJhbnNmb3JtUHJvcGVydHkgXSA9ICcnO1xuICAgIHRoaXMuc2V0TGVmdFRvcCgpO1xuICB9XG4gIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1kcmFnZ2luZycpO1xuICB0aGlzLmRpc3BhdGNoRXZlbnQoICdkcmFnRW5kJywgZXZlbnQsIFsgcG9pbnRlciBdICk7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBhbmltYXRpb24gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxucHJvdG8uYW5pbWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAvLyBvbmx5IHJlbmRlciBhbmQgYW5pbWF0ZSBpZiBkcmFnZ2luZ1xuICBpZiAoICF0aGlzLmlzRHJhZ2dpbmcgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhpcy5wb3NpdGlvbkRyYWcoKTtcblxuICB2YXIgX3RoaXMgPSB0aGlzO1xuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIGZ1bmN0aW9uIGFuaW1hdGVGcmFtZSgpIHtcbiAgICBfdGhpcy5hbmltYXRlKCk7XG4gIH0pO1xuXG59O1xuXG4vLyBsZWZ0L3RvcCBwb3NpdGlvbmluZ1xucHJvdG8uc2V0TGVmdFRvcCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmVsZW1lbnQuc3R5bGUubGVmdCA9IHRoaXMucG9zaXRpb24ueCArICdweCc7XG4gIHRoaXMuZWxlbWVudC5zdHlsZS50b3AgID0gdGhpcy5wb3NpdGlvbi55ICsgJ3B4Jztcbn07XG5cbnByb3RvLnBvc2l0aW9uRHJhZyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmVsZW1lbnQuc3R5bGVbIHRyYW5zZm9ybVByb3BlcnR5IF0gPSAndHJhbnNsYXRlM2QoICcgKyB0aGlzLmRyYWdQb2ludC54ICtcbiAgICAncHgsICcgKyB0aGlzLmRyYWdQb2ludC55ICsgJ3B4LCAwKSc7XG59O1xuXG4vLyAtLS0tLSBzdGF0aWNDbGljayAtLS0tLSAvL1xuXG5wcm90by5zdGF0aWNDbGljayA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdGhpcy5kaXNwYXRjaEV2ZW50KCAnc3RhdGljQ2xpY2snLCBldmVudCwgWyBwb2ludGVyIF0gKTtcbn07XG5cbi8vIC0tLS0tIG1ldGhvZHMgLS0tLS0gLy9cblxucHJvdG8uZW5hYmxlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuaXNFbmFibGVkID0gdHJ1ZTtcbn07XG5cbnByb3RvLmRpc2FibGUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5pc0VuYWJsZWQgPSBmYWxzZTtcbiAgaWYgKCB0aGlzLmlzRHJhZ2dpbmcgKSB7XG4gICAgdGhpcy5kcmFnRW5kKCk7XG4gIH1cbn07XG5cbnByb3RvLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5kaXNhYmxlKCk7XG4gIC8vIHJlc2V0IHN0eWxlc1xuICB0aGlzLmVsZW1lbnQuc3R5bGVbIHRyYW5zZm9ybVByb3BlcnR5IF0gPSAnJztcbiAgdGhpcy5lbGVtZW50LnN0eWxlLmxlZnQgPSAnJztcbiAgdGhpcy5lbGVtZW50LnN0eWxlLnRvcCA9ICcnO1xuICB0aGlzLmVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAnJztcbiAgLy8gdW5iaW5kIGhhbmRsZXNcbiAgdGhpcy51bmJpbmRIYW5kbGVzKCk7XG4gIC8vIHJlbW92ZSBqUXVlcnkgZGF0YVxuICBpZiAoIHRoaXMuJGVsZW1lbnQgKSB7XG4gICAgdGhpcy4kZWxlbWVudC5yZW1vdmVEYXRhKCdkcmFnZ2FiaWxseScpO1xuICB9XG59O1xuXG4vLyAtLS0tLSBqUXVlcnkgYnJpZGdldCAtLS0tLSAvL1xuXG4vLyByZXF1aXJlZCBmb3IgalF1ZXJ5IGJyaWRnZXRcbnByb3RvLl9pbml0ID0gbm9vcDtcblxuaWYgKCBqUXVlcnkgJiYgalF1ZXJ5LmJyaWRnZXQgKSB7XG4gIGpRdWVyeS5icmlkZ2V0KCAnZHJhZ2dhYmlsbHknLCBEcmFnZ2FiaWxseSApO1xufVxuXG4vLyAtLS0tLSAgLS0tLS0gLy9cblxucmV0dXJuIERyYWdnYWJpbGx5O1xuXG59KSk7XG4iLCIvKipcbiAqIEV2RW1pdHRlciB2MS4wLjNcbiAqIExpbCcgZXZlbnQgZW1pdHRlclxuICogTUlUIExpY2Vuc2VcbiAqL1xuXG4vKiBqc2hpbnQgdW51c2VkOiB0cnVlLCB1bmRlZjogdHJ1ZSwgc3RyaWN0OiB0cnVlICovXG5cbiggZnVuY3Rpb24oIGdsb2JhbCwgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIC8qIGpzaGludCBzdHJpY3Q6IGZhbHNlICovIC8qIGdsb2JhbHMgZGVmaW5lLCBtb2R1bGUsIHdpbmRvdyAqL1xuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRCAtIFJlcXVpcmVKU1xuICAgIGRlZmluZSggZmFjdG9yeSApO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTIC0gQnJvd3NlcmlmeSwgV2VicGFja1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICB9IGVsc2Uge1xuICAgIC8vIEJyb3dzZXIgZ2xvYmFsc1xuICAgIGdsb2JhbC5FdkVtaXR0ZXIgPSBmYWN0b3J5KCk7XG4gIH1cblxufSggdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IHRoaXMsIGZ1bmN0aW9uKCkge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gRXZFbWl0dGVyKCkge31cblxudmFyIHByb3RvID0gRXZFbWl0dGVyLnByb3RvdHlwZTtcblxucHJvdG8ub24gPSBmdW5jdGlvbiggZXZlbnROYW1lLCBsaXN0ZW5lciApIHtcbiAgaWYgKCAhZXZlbnROYW1lIHx8ICFsaXN0ZW5lciApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gc2V0IGV2ZW50cyBoYXNoXG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHMgPSB0aGlzLl9ldmVudHMgfHwge307XG4gIC8vIHNldCBsaXN0ZW5lcnMgYXJyYXlcbiAgdmFyIGxpc3RlbmVycyA9IGV2ZW50c1sgZXZlbnROYW1lIF0gPSBldmVudHNbIGV2ZW50TmFtZSBdIHx8IFtdO1xuICAvLyBvbmx5IGFkZCBvbmNlXG4gIGlmICggbGlzdGVuZXJzLmluZGV4T2YoIGxpc3RlbmVyICkgPT0gLTEgKSB7XG4gICAgbGlzdGVuZXJzLnB1c2goIGxpc3RlbmVyICk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbnByb3RvLm9uY2UgPSBmdW5jdGlvbiggZXZlbnROYW1lLCBsaXN0ZW5lciApIHtcbiAgaWYgKCAhZXZlbnROYW1lIHx8ICFsaXN0ZW5lciApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gYWRkIGV2ZW50XG4gIHRoaXMub24oIGV2ZW50TmFtZSwgbGlzdGVuZXIgKTtcbiAgLy8gc2V0IG9uY2UgZmxhZ1xuICAvLyBzZXQgb25jZUV2ZW50cyBoYXNoXG4gIHZhciBvbmNlRXZlbnRzID0gdGhpcy5fb25jZUV2ZW50cyA9IHRoaXMuX29uY2VFdmVudHMgfHwge307XG4gIC8vIHNldCBvbmNlTGlzdGVuZXJzIG9iamVjdFxuICB2YXIgb25jZUxpc3RlbmVycyA9IG9uY2VFdmVudHNbIGV2ZW50TmFtZSBdID0gb25jZUV2ZW50c1sgZXZlbnROYW1lIF0gfHwge307XG4gIC8vIHNldCBmbGFnXG4gIG9uY2VMaXN0ZW5lcnNbIGxpc3RlbmVyIF0gPSB0cnVlO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxucHJvdG8ub2ZmID0gZnVuY3Rpb24oIGV2ZW50TmFtZSwgbGlzdGVuZXIgKSB7XG4gIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHMgJiYgdGhpcy5fZXZlbnRzWyBldmVudE5hbWUgXTtcbiAgaWYgKCAhbGlzdGVuZXJzIHx8ICFsaXN0ZW5lcnMubGVuZ3RoICkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgaW5kZXggPSBsaXN0ZW5lcnMuaW5kZXhPZiggbGlzdGVuZXIgKTtcbiAgaWYgKCBpbmRleCAhPSAtMSApIHtcbiAgICBsaXN0ZW5lcnMuc3BsaWNlKCBpbmRleCwgMSApO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5wcm90by5lbWl0RXZlbnQgPSBmdW5jdGlvbiggZXZlbnROYW1lLCBhcmdzICkge1xuICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzICYmIHRoaXMuX2V2ZW50c1sgZXZlbnROYW1lIF07XG4gIGlmICggIWxpc3RlbmVycyB8fCAhbGlzdGVuZXJzLmxlbmd0aCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGkgPSAwO1xuICB2YXIgbGlzdGVuZXIgPSBsaXN0ZW5lcnNbaV07XG4gIGFyZ3MgPSBhcmdzIHx8IFtdO1xuICAvLyBvbmNlIHN0dWZmXG4gIHZhciBvbmNlTGlzdGVuZXJzID0gdGhpcy5fb25jZUV2ZW50cyAmJiB0aGlzLl9vbmNlRXZlbnRzWyBldmVudE5hbWUgXTtcblxuICB3aGlsZSAoIGxpc3RlbmVyICkge1xuICAgIHZhciBpc09uY2UgPSBvbmNlTGlzdGVuZXJzICYmIG9uY2VMaXN0ZW5lcnNbIGxpc3RlbmVyIF07XG4gICAgaWYgKCBpc09uY2UgKSB7XG4gICAgICAvLyByZW1vdmUgbGlzdGVuZXJcbiAgICAgIC8vIHJlbW92ZSBiZWZvcmUgdHJpZ2dlciB0byBwcmV2ZW50IHJlY3Vyc2lvblxuICAgICAgdGhpcy5vZmYoIGV2ZW50TmFtZSwgbGlzdGVuZXIgKTtcbiAgICAgIC8vIHVuc2V0IG9uY2UgZmxhZ1xuICAgICAgZGVsZXRlIG9uY2VMaXN0ZW5lcnNbIGxpc3RlbmVyIF07XG4gICAgfVxuICAgIC8vIHRyaWdnZXIgbGlzdGVuZXJcbiAgICBsaXN0ZW5lci5hcHBseSggdGhpcywgYXJncyApO1xuICAgIC8vIGdldCBuZXh0IGxpc3RlbmVyXG4gICAgaSArPSBpc09uY2UgPyAwIDogMTtcbiAgICBsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxucmV0dXJuIEV2RW1pdHRlcjtcblxufSkpO1xuIiwiLyohXG4gKiBnZXRTaXplIHYyLjAuMlxuICogbWVhc3VyZSBzaXplIG9mIGVsZW1lbnRzXG4gKiBNSVQgbGljZW5zZVxuICovXG5cbi8qanNoaW50IGJyb3dzZXI6IHRydWUsIHN0cmljdDogdHJ1ZSwgdW5kZWY6IHRydWUsIHVudXNlZDogdHJ1ZSAqL1xuLypnbG9iYWwgZGVmaW5lOiBmYWxzZSwgbW9kdWxlOiBmYWxzZSwgY29uc29sZTogZmFsc2UgKi9cblxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGZhY3RvcnkoKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgd2luZG93LmdldFNpemUgPSBmYWN0b3J5KCk7XG4gIH1cblxufSkoIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSgpIHtcbid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gaGVscGVycyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vLyBnZXQgYSBudW1iZXIgZnJvbSBhIHN0cmluZywgbm90IGEgcGVyY2VudGFnZVxuZnVuY3Rpb24gZ2V0U3R5bGVTaXplKCB2YWx1ZSApIHtcbiAgdmFyIG51bSA9IHBhcnNlRmxvYXQoIHZhbHVlICk7XG4gIC8vIG5vdCBhIHBlcmNlbnQgbGlrZSAnMTAwJScsIGFuZCBhIG51bWJlclxuICB2YXIgaXNWYWxpZCA9IHZhbHVlLmluZGV4T2YoJyUnKSA9PSAtMSAmJiAhaXNOYU4oIG51bSApO1xuICByZXR1cm4gaXNWYWxpZCAmJiBudW07XG59XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG52YXIgbG9nRXJyb3IgPSB0eXBlb2YgY29uc29sZSA9PSAndW5kZWZpbmVkJyA/IG5vb3AgOlxuICBmdW5jdGlvbiggbWVzc2FnZSApIHtcbiAgICBjb25zb2xlLmVycm9yKCBtZXNzYWdlICk7XG4gIH07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIG1lYXN1cmVtZW50cyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG52YXIgbWVhc3VyZW1lbnRzID0gW1xuICAncGFkZGluZ0xlZnQnLFxuICAncGFkZGluZ1JpZ2h0JyxcbiAgJ3BhZGRpbmdUb3AnLFxuICAncGFkZGluZ0JvdHRvbScsXG4gICdtYXJnaW5MZWZ0JyxcbiAgJ21hcmdpblJpZ2h0JyxcbiAgJ21hcmdpblRvcCcsXG4gICdtYXJnaW5Cb3R0b20nLFxuICAnYm9yZGVyTGVmdFdpZHRoJyxcbiAgJ2JvcmRlclJpZ2h0V2lkdGgnLFxuICAnYm9yZGVyVG9wV2lkdGgnLFxuICAnYm9yZGVyQm90dG9tV2lkdGgnXG5dO1xuXG52YXIgbWVhc3VyZW1lbnRzTGVuZ3RoID0gbWVhc3VyZW1lbnRzLmxlbmd0aDtcblxuZnVuY3Rpb24gZ2V0WmVyb1NpemUoKSB7XG4gIHZhciBzaXplID0ge1xuICAgIHdpZHRoOiAwLFxuICAgIGhlaWdodDogMCxcbiAgICBpbm5lcldpZHRoOiAwLFxuICAgIGlubmVySGVpZ2h0OiAwLFxuICAgIG91dGVyV2lkdGg6IDAsXG4gICAgb3V0ZXJIZWlnaHQ6IDBcbiAgfTtcbiAgZm9yICggdmFyIGk9MDsgaSA8IG1lYXN1cmVtZW50c0xlbmd0aDsgaSsrICkge1xuICAgIHZhciBtZWFzdXJlbWVudCA9IG1lYXN1cmVtZW50c1tpXTtcbiAgICBzaXplWyBtZWFzdXJlbWVudCBdID0gMDtcbiAgfVxuICByZXR1cm4gc2l6ZTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZ2V0U3R5bGUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLyoqXG4gKiBnZXRTdHlsZSwgZ2V0IHN0eWxlIG9mIGVsZW1lbnQsIGNoZWNrIGZvciBGaXJlZm94IGJ1Z1xuICogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NTQ4Mzk3XG4gKi9cbmZ1bmN0aW9uIGdldFN0eWxlKCBlbGVtICkge1xuICB2YXIgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKCBlbGVtICk7XG4gIGlmICggIXN0eWxlICkge1xuICAgIGxvZ0Vycm9yKCAnU3R5bGUgcmV0dXJuZWQgJyArIHN0eWxlICtcbiAgICAgICcuIEFyZSB5b3UgcnVubmluZyB0aGlzIGNvZGUgaW4gYSBoaWRkZW4gaWZyYW1lIG9uIEZpcmVmb3g/ICcgK1xuICAgICAgJ1NlZSBodHRwOi8vYml0Lmx5L2dldHNpemVidWcxJyApO1xuICB9XG4gIHJldHVybiBzdHlsZTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gc2V0dXAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxudmFyIGlzU2V0dXAgPSBmYWxzZTtcblxudmFyIGlzQm94U2l6ZU91dGVyO1xuXG4vKipcbiAqIHNldHVwXG4gKiBjaGVjayBpc0JveFNpemVyT3V0ZXJcbiAqIGRvIG9uIGZpcnN0IGdldFNpemUoKSByYXRoZXIgdGhhbiBvbiBwYWdlIGxvYWQgZm9yIEZpcmVmb3ggYnVnXG4gKi9cbmZ1bmN0aW9uIHNldHVwKCkge1xuICAvLyBzZXR1cCBvbmNlXG4gIGlmICggaXNTZXR1cCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaXNTZXR1cCA9IHRydWU7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gYm94IHNpemluZyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4gIC8qKlxuICAgKiBXZWJLaXQgbWVhc3VyZXMgdGhlIG91dGVyLXdpZHRoIG9uIHN0eWxlLndpZHRoIG9uIGJvcmRlci1ib3ggZWxlbXNcbiAgICogSUUgJiBGaXJlZm94PDI5IG1lYXN1cmVzIHRoZSBpbm5lci13aWR0aFxuICAgKi9cbiAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBkaXYuc3R5bGUud2lkdGggPSAnMjAwcHgnO1xuICBkaXYuc3R5bGUucGFkZGluZyA9ICcxcHggMnB4IDNweCA0cHgnO1xuICBkaXYuc3R5bGUuYm9yZGVyU3R5bGUgPSAnc29saWQnO1xuICBkaXYuc3R5bGUuYm9yZGVyV2lkdGggPSAnMXB4IDJweCAzcHggNHB4JztcbiAgZGl2LnN0eWxlLmJveFNpemluZyA9ICdib3JkZXItYm94JztcblxuICB2YXIgYm9keSA9IGRvY3VtZW50LmJvZHkgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICBib2R5LmFwcGVuZENoaWxkKCBkaXYgKTtcbiAgdmFyIHN0eWxlID0gZ2V0U3R5bGUoIGRpdiApO1xuXG4gIGdldFNpemUuaXNCb3hTaXplT3V0ZXIgPSBpc0JveFNpemVPdXRlciA9IGdldFN0eWxlU2l6ZSggc3R5bGUud2lkdGggKSA9PSAyMDA7XG4gIGJvZHkucmVtb3ZlQ2hpbGQoIGRpdiApO1xuXG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGdldFNpemUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuZnVuY3Rpb24gZ2V0U2l6ZSggZWxlbSApIHtcbiAgc2V0dXAoKTtcblxuICAvLyB1c2UgcXVlcnlTZWxldG9yIGlmIGVsZW0gaXMgc3RyaW5nXG4gIGlmICggdHlwZW9mIGVsZW0gPT0gJ3N0cmluZycgKSB7XG4gICAgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIGVsZW0gKTtcbiAgfVxuXG4gIC8vIGRvIG5vdCBwcm9jZWVkIG9uIG5vbi1vYmplY3RzXG4gIGlmICggIWVsZW0gfHwgdHlwZW9mIGVsZW0gIT0gJ29iamVjdCcgfHwgIWVsZW0ubm9kZVR5cGUgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHN0eWxlID0gZ2V0U3R5bGUoIGVsZW0gKTtcblxuICAvLyBpZiBoaWRkZW4sIGV2ZXJ5dGhpbmcgaXMgMFxuICBpZiAoIHN0eWxlLmRpc3BsYXkgPT0gJ25vbmUnICkge1xuICAgIHJldHVybiBnZXRaZXJvU2l6ZSgpO1xuICB9XG5cbiAgdmFyIHNpemUgPSB7fTtcbiAgc2l6ZS53aWR0aCA9IGVsZW0ub2Zmc2V0V2lkdGg7XG4gIHNpemUuaGVpZ2h0ID0gZWxlbS5vZmZzZXRIZWlnaHQ7XG5cbiAgdmFyIGlzQm9yZGVyQm94ID0gc2l6ZS5pc0JvcmRlckJveCA9IHN0eWxlLmJveFNpemluZyA9PSAnYm9yZGVyLWJveCc7XG5cbiAgLy8gZ2V0IGFsbCBtZWFzdXJlbWVudHNcbiAgZm9yICggdmFyIGk9MDsgaSA8IG1lYXN1cmVtZW50c0xlbmd0aDsgaSsrICkge1xuICAgIHZhciBtZWFzdXJlbWVudCA9IG1lYXN1cmVtZW50c1tpXTtcbiAgICB2YXIgdmFsdWUgPSBzdHlsZVsgbWVhc3VyZW1lbnQgXTtcbiAgICB2YXIgbnVtID0gcGFyc2VGbG9hdCggdmFsdWUgKTtcbiAgICAvLyBhbnkgJ2F1dG8nLCAnbWVkaXVtJyB2YWx1ZSB3aWxsIGJlIDBcbiAgICBzaXplWyBtZWFzdXJlbWVudCBdID0gIWlzTmFOKCBudW0gKSA/IG51bSA6IDA7XG4gIH1cblxuICB2YXIgcGFkZGluZ1dpZHRoID0gc2l6ZS5wYWRkaW5nTGVmdCArIHNpemUucGFkZGluZ1JpZ2h0O1xuICB2YXIgcGFkZGluZ0hlaWdodCA9IHNpemUucGFkZGluZ1RvcCArIHNpemUucGFkZGluZ0JvdHRvbTtcbiAgdmFyIG1hcmdpbldpZHRoID0gc2l6ZS5tYXJnaW5MZWZ0ICsgc2l6ZS5tYXJnaW5SaWdodDtcbiAgdmFyIG1hcmdpbkhlaWdodCA9IHNpemUubWFyZ2luVG9wICsgc2l6ZS5tYXJnaW5Cb3R0b207XG4gIHZhciBib3JkZXJXaWR0aCA9IHNpemUuYm9yZGVyTGVmdFdpZHRoICsgc2l6ZS5ib3JkZXJSaWdodFdpZHRoO1xuICB2YXIgYm9yZGVySGVpZ2h0ID0gc2l6ZS5ib3JkZXJUb3BXaWR0aCArIHNpemUuYm9yZGVyQm90dG9tV2lkdGg7XG5cbiAgdmFyIGlzQm9yZGVyQm94U2l6ZU91dGVyID0gaXNCb3JkZXJCb3ggJiYgaXNCb3hTaXplT3V0ZXI7XG5cbiAgLy8gb3ZlcndyaXRlIHdpZHRoIGFuZCBoZWlnaHQgaWYgd2UgY2FuIGdldCBpdCBmcm9tIHN0eWxlXG4gIHZhciBzdHlsZVdpZHRoID0gZ2V0U3R5bGVTaXplKCBzdHlsZS53aWR0aCApO1xuICBpZiAoIHN0eWxlV2lkdGggIT09IGZhbHNlICkge1xuICAgIHNpemUud2lkdGggPSBzdHlsZVdpZHRoICtcbiAgICAgIC8vIGFkZCBwYWRkaW5nIGFuZCBib3JkZXIgdW5sZXNzIGl0J3MgYWxyZWFkeSBpbmNsdWRpbmcgaXRcbiAgICAgICggaXNCb3JkZXJCb3hTaXplT3V0ZXIgPyAwIDogcGFkZGluZ1dpZHRoICsgYm9yZGVyV2lkdGggKTtcbiAgfVxuXG4gIHZhciBzdHlsZUhlaWdodCA9IGdldFN0eWxlU2l6ZSggc3R5bGUuaGVpZ2h0ICk7XG4gIGlmICggc3R5bGVIZWlnaHQgIT09IGZhbHNlICkge1xuICAgIHNpemUuaGVpZ2h0ID0gc3R5bGVIZWlnaHQgK1xuICAgICAgLy8gYWRkIHBhZGRpbmcgYW5kIGJvcmRlciB1bmxlc3MgaXQncyBhbHJlYWR5IGluY2x1ZGluZyBpdFxuICAgICAgKCBpc0JvcmRlckJveFNpemVPdXRlciA/IDAgOiBwYWRkaW5nSGVpZ2h0ICsgYm9yZGVySGVpZ2h0ICk7XG4gIH1cblxuICBzaXplLmlubmVyV2lkdGggPSBzaXplLndpZHRoIC0gKCBwYWRkaW5nV2lkdGggKyBib3JkZXJXaWR0aCApO1xuICBzaXplLmlubmVySGVpZ2h0ID0gc2l6ZS5oZWlnaHQgLSAoIHBhZGRpbmdIZWlnaHQgKyBib3JkZXJIZWlnaHQgKTtcblxuICBzaXplLm91dGVyV2lkdGggPSBzaXplLndpZHRoICsgbWFyZ2luV2lkdGg7XG4gIHNpemUub3V0ZXJIZWlnaHQgPSBzaXplLmhlaWdodCArIG1hcmdpbkhlaWdodDtcblxuICByZXR1cm4gc2l6ZTtcbn1cblxucmV0dXJuIGdldFNpemU7XG5cbn0pO1xuIiwiKGZ1bmN0aW9uKHdpbmRvdywgZmFjdG9yeSkge1xuXHR2YXIgbGF6eVNpemVzID0gZmFjdG9yeSh3aW5kb3csIHdpbmRvdy5kb2N1bWVudCk7XG5cdHdpbmRvdy5sYXp5U2l6ZXMgPSBsYXp5U2l6ZXM7XG5cdGlmKHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpe1xuXHRcdG1vZHVsZS5leHBvcnRzID0gbGF6eVNpemVzO1xuXHR9XG59KHdpbmRvdywgZnVuY3Rpb24gbCh3aW5kb3csIGRvY3VtZW50KSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0Lypqc2hpbnQgZXFudWxsOnRydWUgKi9cblx0aWYoIWRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUpe3JldHVybjt9XG5cblx0dmFyIGxhenlTaXplc0NvbmZpZztcblxuXHR2YXIgZG9jRWxlbSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxuXHR2YXIgRGF0ZSA9IHdpbmRvdy5EYXRlO1xuXG5cdHZhciBzdXBwb3J0UGljdHVyZSA9IHdpbmRvdy5IVE1MUGljdHVyZUVsZW1lbnQ7XG5cblx0dmFyIF9hZGRFdmVudExpc3RlbmVyID0gJ2FkZEV2ZW50TGlzdGVuZXInO1xuXG5cdHZhciBfZ2V0QXR0cmlidXRlID0gJ2dldEF0dHJpYnV0ZSc7XG5cblx0dmFyIGFkZEV2ZW50TGlzdGVuZXIgPSB3aW5kb3dbX2FkZEV2ZW50TGlzdGVuZXJdO1xuXG5cdHZhciBzZXRUaW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQ7XG5cblx0dmFyIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgc2V0VGltZW91dDtcblxuXHR2YXIgcmVxdWVzdElkbGVDYWxsYmFjayA9IHdpbmRvdy5yZXF1ZXN0SWRsZUNhbGxiYWNrO1xuXG5cdHZhciByZWdQaWN0dXJlID0gL15waWN0dXJlJC9pO1xuXG5cdHZhciBsb2FkRXZlbnRzID0gWydsb2FkJywgJ2Vycm9yJywgJ2xhenlpbmNsdWRlZCcsICdfbGF6eWxvYWRlZCddO1xuXG5cdHZhciByZWdDbGFzc0NhY2hlID0ge307XG5cblx0dmFyIGZvckVhY2ggPSBBcnJheS5wcm90b3R5cGUuZm9yRWFjaDtcblxuXHR2YXIgaGFzQ2xhc3MgPSBmdW5jdGlvbihlbGUsIGNscykge1xuXHRcdGlmKCFyZWdDbGFzc0NhY2hlW2Nsc10pe1xuXHRcdFx0cmVnQ2xhc3NDYWNoZVtjbHNdID0gbmV3IFJlZ0V4cCgnKFxcXFxzfF4pJytjbHMrJyhcXFxcc3wkKScpO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVnQ2xhc3NDYWNoZVtjbHNdLnRlc3QoZWxlW19nZXRBdHRyaWJ1dGVdKCdjbGFzcycpIHx8ICcnKSAmJiByZWdDbGFzc0NhY2hlW2Nsc107XG5cdH07XG5cblx0dmFyIGFkZENsYXNzID0gZnVuY3Rpb24oZWxlLCBjbHMpIHtcblx0XHRpZiAoIWhhc0NsYXNzKGVsZSwgY2xzKSl7XG5cdFx0XHRlbGUuc2V0QXR0cmlidXRlKCdjbGFzcycsIChlbGVbX2dldEF0dHJpYnV0ZV0oJ2NsYXNzJykgfHwgJycpLnRyaW0oKSArICcgJyArIGNscyk7XG5cdFx0fVxuXHR9O1xuXG5cdHZhciByZW1vdmVDbGFzcyA9IGZ1bmN0aW9uKGVsZSwgY2xzKSB7XG5cdFx0dmFyIHJlZztcblx0XHRpZiAoKHJlZyA9IGhhc0NsYXNzKGVsZSxjbHMpKSkge1xuXHRcdFx0ZWxlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAoZWxlW19nZXRBdHRyaWJ1dGVdKCdjbGFzcycpIHx8ICcnKS5yZXBsYWNlKHJlZywgJyAnKSk7XG5cdFx0fVxuXHR9O1xuXG5cdHZhciBhZGRSZW1vdmVMb2FkRXZlbnRzID0gZnVuY3Rpb24oZG9tLCBmbiwgYWRkKXtcblx0XHR2YXIgYWN0aW9uID0gYWRkID8gX2FkZEV2ZW50TGlzdGVuZXIgOiAncmVtb3ZlRXZlbnRMaXN0ZW5lcic7XG5cdFx0aWYoYWRkKXtcblx0XHRcdGFkZFJlbW92ZUxvYWRFdmVudHMoZG9tLCBmbik7XG5cdFx0fVxuXHRcdGxvYWRFdmVudHMuZm9yRWFjaChmdW5jdGlvbihldnQpe1xuXHRcdFx0ZG9tW2FjdGlvbl0oZXZ0LCBmbik7XG5cdFx0fSk7XG5cdH07XG5cblx0dmFyIHRyaWdnZXJFdmVudCA9IGZ1bmN0aW9uKGVsZW0sIG5hbWUsIGRldGFpbCwgbm9CdWJibGVzLCBub0NhbmNlbGFibGUpe1xuXHRcdHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuXG5cdFx0ZXZlbnQuaW5pdEN1c3RvbUV2ZW50KG5hbWUsICFub0J1YmJsZXMsICFub0NhbmNlbGFibGUsIGRldGFpbCB8fCB7fSk7XG5cblx0XHRlbGVtLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuXHRcdHJldHVybiBldmVudDtcblx0fTtcblxuXHR2YXIgdXBkYXRlUG9seWZpbGwgPSBmdW5jdGlvbiAoZWwsIGZ1bGwpe1xuXHRcdHZhciBwb2x5ZmlsbDtcblx0XHRpZiggIXN1cHBvcnRQaWN0dXJlICYmICggcG9seWZpbGwgPSAod2luZG93LnBpY3R1cmVmaWxsIHx8IGxhenlTaXplc0NvbmZpZy5wZikgKSApe1xuXHRcdFx0cG9seWZpbGwoe3JlZXZhbHVhdGU6IHRydWUsIGVsZW1lbnRzOiBbZWxdfSk7XG5cdFx0fSBlbHNlIGlmKGZ1bGwgJiYgZnVsbC5zcmMpe1xuXHRcdFx0ZWwuc3JjID0gZnVsbC5zcmM7XG5cdFx0fVxuXHR9O1xuXG5cdHZhciBnZXRDU1MgPSBmdW5jdGlvbiAoZWxlbSwgc3R5bGUpe1xuXHRcdHJldHVybiAoZ2V0Q29tcHV0ZWRTdHlsZShlbGVtLCBudWxsKSB8fCB7fSlbc3R5bGVdO1xuXHR9O1xuXG5cdHZhciBnZXRXaWR0aCA9IGZ1bmN0aW9uKGVsZW0sIHBhcmVudCwgd2lkdGgpe1xuXHRcdHdpZHRoID0gd2lkdGggfHwgZWxlbS5vZmZzZXRXaWR0aDtcblxuXHRcdHdoaWxlKHdpZHRoIDwgbGF6eVNpemVzQ29uZmlnLm1pblNpemUgJiYgcGFyZW50ICYmICFlbGVtLl9sYXp5c2l6ZXNXaWR0aCl7XG5cdFx0XHR3aWR0aCA9ICBwYXJlbnQub2Zmc2V0V2lkdGg7XG5cdFx0XHRwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gd2lkdGg7XG5cdH07XG5cblx0dmFyIHJBRiA9IChmdW5jdGlvbigpe1xuXHRcdHZhciBydW5uaW5nLCB3YWl0aW5nO1xuXHRcdHZhciBmbnMgPSBbXTtcblxuXHRcdHZhciBydW4gPSBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIGZuO1xuXHRcdFx0cnVubmluZyA9IHRydWU7XG5cdFx0XHR3YWl0aW5nID0gZmFsc2U7XG5cdFx0XHR3aGlsZShmbnMubGVuZ3RoKXtcblx0XHRcdFx0Zm4gPSBmbnMuc2hpZnQoKTtcblx0XHRcdFx0Zm5bMF0uYXBwbHkoZm5bMV0sIGZuWzJdKTtcblx0XHRcdH1cblx0XHRcdHJ1bm5pbmcgPSBmYWxzZTtcblx0XHR9O1xuXG5cdFx0dmFyIHJhZkJhdGNoID0gZnVuY3Rpb24oZm4pe1xuXHRcdFx0aWYocnVubmluZyl7XG5cdFx0XHRcdGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmbnMucHVzaChbZm4sIHRoaXMsIGFyZ3VtZW50c10pO1xuXG5cdFx0XHRcdGlmKCF3YWl0aW5nKXtcblx0XHRcdFx0XHR3YWl0aW5nID0gdHJ1ZTtcblx0XHRcdFx0XHQoZG9jdW1lbnQuaGlkZGVuID8gc2V0VGltZW91dCA6IHJlcXVlc3RBbmltYXRpb25GcmFtZSkocnVuKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRyYWZCYXRjaC5fbHNGbHVzaCA9IHJ1bjtcblxuXHRcdHJldHVybiByYWZCYXRjaDtcblx0fSkoKTtcblxuXHR2YXIgckFGSXQgPSBmdW5jdGlvbihmbiwgc2ltcGxlKXtcblx0XHRyZXR1cm4gc2ltcGxlID9cblx0XHRcdGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyQUYoZm4pO1xuXHRcdFx0fSA6XG5cdFx0XHRmdW5jdGlvbigpe1xuXHRcdFx0XHR2YXIgdGhhdCA9IHRoaXM7XG5cdFx0XHRcdHZhciBhcmdzID0gYXJndW1lbnRzO1xuXHRcdFx0XHRyQUYoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRmbi5hcHBseSh0aGF0LCBhcmdzKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0O1xuXHR9O1xuXG5cdHZhciB0aHJvdHRsZSA9IGZ1bmN0aW9uKGZuKXtcblx0XHR2YXIgcnVubmluZztcblx0XHR2YXIgbGFzdFRpbWUgPSAwO1xuXHRcdHZhciBnRGVsYXkgPSAxMjU7XG5cdFx0dmFyIFJJQ19ERUZBVUxUX1RJTUVPVVQgPSA2NjY7XG5cdFx0dmFyIHJJQ1RpbWVvdXQgPSBSSUNfREVGQVVMVF9USU1FT1VUO1xuXHRcdHZhciBydW4gPSBmdW5jdGlvbigpe1xuXHRcdFx0cnVubmluZyA9IGZhbHNlO1xuXHRcdFx0bGFzdFRpbWUgPSBEYXRlLm5vdygpO1xuXHRcdFx0Zm4oKTtcblx0XHR9O1xuXHRcdHZhciBpZGxlQ2FsbGJhY2sgPSByZXF1ZXN0SWRsZUNhbGxiYWNrID9cblx0XHRcdGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHJlcXVlc3RJZGxlQ2FsbGJhY2socnVuLCB7dGltZW91dDogcklDVGltZW91dH0pO1xuXHRcdFx0XHRpZihySUNUaW1lb3V0ICE9PSBSSUNfREVGQVVMVF9USU1FT1VUKXtcblx0XHRcdFx0XHRySUNUaW1lb3V0ID0gUklDX0RFRkFVTFRfVElNRU9VVDtcblx0XHRcdFx0fVxuXHRcdFx0fTpcblx0XHRcdHJBRkl0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHNldFRpbWVvdXQocnVuKTtcblx0XHRcdH0sIHRydWUpXG5cdFx0O1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uKGlzUHJpb3JpdHkpe1xuXHRcdFx0dmFyIGRlbGF5O1xuXHRcdFx0aWYoKGlzUHJpb3JpdHkgPSBpc1ByaW9yaXR5ID09PSB0cnVlKSl7XG5cdFx0XHRcdHJJQ1RpbWVvdXQgPSA0NDtcblx0XHRcdH1cblxuXHRcdFx0aWYocnVubmluZyl7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0cnVubmluZyA9ICB0cnVlO1xuXG5cdFx0XHRkZWxheSA9IGdEZWxheSAtIChEYXRlLm5vdygpIC0gbGFzdFRpbWUpO1xuXG5cdFx0XHRpZihkZWxheSA8IDApe1xuXHRcdFx0XHRkZWxheSA9IDA7XG5cdFx0XHR9XG5cblx0XHRcdGlmKGlzUHJpb3JpdHkgfHwgKGRlbGF5IDwgOSAmJiByZXF1ZXN0SWRsZUNhbGxiYWNrKSl7XG5cdFx0XHRcdGlkbGVDYWxsYmFjaygpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c2V0VGltZW91dChpZGxlQ2FsbGJhY2ssIGRlbGF5KTtcblx0XHRcdH1cblx0XHR9O1xuXHR9O1xuXG5cdC8vYmFzZWQgb24gaHR0cDovL21vZGVybmphdmFzY3JpcHQuYmxvZ3Nwb3QuZGUvMjAxMy8wOC9idWlsZGluZy1iZXR0ZXItZGVib3VuY2UuaHRtbFxuXHR2YXIgZGVib3VuY2UgPSBmdW5jdGlvbihmdW5jKSB7XG5cdFx0dmFyIHRpbWVvdXQsIHRpbWVzdGFtcDtcblx0XHR2YXIgd2FpdCA9IDk5O1xuXHRcdHZhciBydW4gPSBmdW5jdGlvbigpe1xuXHRcdFx0dGltZW91dCA9IG51bGw7XG5cdFx0XHRmdW5jKCk7XG5cdFx0fTtcblx0XHR2YXIgbGF0ZXIgPSBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBsYXN0ID0gRGF0ZS5ub3coKSAtIHRpbWVzdGFtcDtcblxuXHRcdFx0aWYgKGxhc3QgPCB3YWl0KSB7XG5cdFx0XHRcdHNldFRpbWVvdXQobGF0ZXIsIHdhaXQgLSBsYXN0KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdChyZXF1ZXN0SWRsZUNhbGxiYWNrIHx8IHJ1bikocnVuKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdFx0dGltZXN0YW1wID0gRGF0ZS5ub3coKTtcblxuXHRcdFx0aWYgKCF0aW1lb3V0KSB7XG5cdFx0XHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcblx0XHRcdH1cblx0XHR9O1xuXHR9O1xuXG5cblx0dmFyIGxvYWRlciA9IChmdW5jdGlvbigpe1xuXHRcdHZhciBsYXp5bG9hZEVsZW1zLCBwcmVsb2FkRWxlbXMsIGlzQ29tcGxldGVkLCByZXNldFByZWxvYWRpbmdUaW1lciwgbG9hZE1vZGUsIHN0YXJ0ZWQ7XG5cblx0XHR2YXIgZUx2VywgZWx2SCwgZUx0b3AsIGVMbGVmdCwgZUxyaWdodCwgZUxib3R0b207XG5cblx0XHR2YXIgZGVmYXVsdEV4cGFuZCwgcHJlbG9hZEV4cGFuZCwgaEZhYztcblxuXHRcdHZhciByZWdJbWcgPSAvXmltZyQvaTtcblx0XHR2YXIgcmVnSWZyYW1lID0gL15pZnJhbWUkL2k7XG5cblx0XHR2YXIgc3VwcG9ydFNjcm9sbCA9ICgnb25zY3JvbGwnIGluIHdpbmRvdykgJiYgISgvZ2xlYm90Ly50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKTtcblxuXHRcdHZhciBzaHJpbmtFeHBhbmQgPSAwO1xuXHRcdHZhciBjdXJyZW50RXhwYW5kID0gMDtcblxuXHRcdHZhciBpc0xvYWRpbmcgPSAwO1xuXHRcdHZhciBsb3dSdW5zID0gLTE7XG5cblx0XHR2YXIgcmVzZXRQcmVsb2FkaW5nID0gZnVuY3Rpb24oZSl7XG5cdFx0XHRpc0xvYWRpbmctLTtcblx0XHRcdGlmKGUgJiYgZS50YXJnZXQpe1xuXHRcdFx0XHRhZGRSZW1vdmVMb2FkRXZlbnRzKGUudGFyZ2V0LCByZXNldFByZWxvYWRpbmcpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZighZSB8fCBpc0xvYWRpbmcgPCAwIHx8ICFlLnRhcmdldCl7XG5cdFx0XHRcdGlzTG9hZGluZyA9IDA7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHZhciBpc05lc3RlZFZpc2libGUgPSBmdW5jdGlvbihlbGVtLCBlbGVtRXhwYW5kKXtcblx0XHRcdHZhciBvdXRlclJlY3Q7XG5cdFx0XHR2YXIgcGFyZW50ID0gZWxlbTtcblx0XHRcdHZhciB2aXNpYmxlID0gZ2V0Q1NTKGRvY3VtZW50LmJvZHksICd2aXNpYmlsaXR5JykgPT0gJ2hpZGRlbicgfHwgZ2V0Q1NTKGVsZW0sICd2aXNpYmlsaXR5JykgIT0gJ2hpZGRlbic7XG5cblx0XHRcdGVMdG9wIC09IGVsZW1FeHBhbmQ7XG5cdFx0XHRlTGJvdHRvbSArPSBlbGVtRXhwYW5kO1xuXHRcdFx0ZUxsZWZ0IC09IGVsZW1FeHBhbmQ7XG5cdFx0XHRlTHJpZ2h0ICs9IGVsZW1FeHBhbmQ7XG5cblx0XHRcdHdoaWxlKHZpc2libGUgJiYgKHBhcmVudCA9IHBhcmVudC5vZmZzZXRQYXJlbnQpICYmIHBhcmVudCAhPSBkb2N1bWVudC5ib2R5ICYmIHBhcmVudCAhPSBkb2NFbGVtKXtcblx0XHRcdFx0dmlzaWJsZSA9ICgoZ2V0Q1NTKHBhcmVudCwgJ29wYWNpdHknKSB8fCAxKSA+IDApO1xuXG5cdFx0XHRcdGlmKHZpc2libGUgJiYgZ2V0Q1NTKHBhcmVudCwgJ292ZXJmbG93JykgIT0gJ3Zpc2libGUnKXtcblx0XHRcdFx0XHRvdXRlclJlY3QgPSBwYXJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0XHRcdFx0dmlzaWJsZSA9IGVMcmlnaHQgPiBvdXRlclJlY3QubGVmdCAmJlxuXHRcdFx0XHRcdFx0ZUxsZWZ0IDwgb3V0ZXJSZWN0LnJpZ2h0ICYmXG5cdFx0XHRcdFx0XHRlTGJvdHRvbSA+IG91dGVyUmVjdC50b3AgLSAxICYmXG5cdFx0XHRcdFx0XHRlTHRvcCA8IG91dGVyUmVjdC5ib3R0b20gKyAxXG5cdFx0XHRcdFx0O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB2aXNpYmxlO1xuXHRcdH07XG5cblx0XHR2YXIgY2hlY2tFbGVtZW50cyA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGVMbGVuLCBpLCByZWN0LCBhdXRvTG9hZEVsZW0sIGxvYWRlZFNvbWV0aGluZywgZWxlbUV4cGFuZCwgZWxlbU5lZ2F0aXZlRXhwYW5kLCBlbGVtRXhwYW5kVmFsLCBiZWZvcmVFeHBhbmRWYWw7XG5cblx0XHRcdGlmKChsb2FkTW9kZSA9IGxhenlTaXplc0NvbmZpZy5sb2FkTW9kZSkgJiYgaXNMb2FkaW5nIDwgOCAmJiAoZUxsZW4gPSBsYXp5bG9hZEVsZW1zLmxlbmd0aCkpe1xuXG5cdFx0XHRcdGkgPSAwO1xuXG5cdFx0XHRcdGxvd1J1bnMrKztcblxuXHRcdFx0XHRpZihwcmVsb2FkRXhwYW5kID09IG51bGwpe1xuXHRcdFx0XHRcdGlmKCEoJ2V4cGFuZCcgaW4gbGF6eVNpemVzQ29uZmlnKSl7XG5cdFx0XHRcdFx0XHRsYXp5U2l6ZXNDb25maWcuZXhwYW5kID0gZG9jRWxlbS5jbGllbnRIZWlnaHQgPiA1MDAgJiYgZG9jRWxlbS5jbGllbnRXaWR0aCA+IDUwMCA/IDUwMCA6IDM3MDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRkZWZhdWx0RXhwYW5kID0gbGF6eVNpemVzQ29uZmlnLmV4cGFuZDtcblx0XHRcdFx0XHRwcmVsb2FkRXhwYW5kID0gZGVmYXVsdEV4cGFuZCAqIGxhenlTaXplc0NvbmZpZy5leHBGYWN0b3I7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihjdXJyZW50RXhwYW5kIDwgcHJlbG9hZEV4cGFuZCAmJiBpc0xvYWRpbmcgPCAxICYmIGxvd1J1bnMgPiAyICYmIGxvYWRNb2RlID4gMiAmJiAhZG9jdW1lbnQuaGlkZGVuKXtcblx0XHRcdFx0XHRjdXJyZW50RXhwYW5kID0gcHJlbG9hZEV4cGFuZDtcblx0XHRcdFx0XHRsb3dSdW5zID0gMDtcblx0XHRcdFx0fSBlbHNlIGlmKGxvYWRNb2RlID4gMSAmJiBsb3dSdW5zID4gMSAmJiBpc0xvYWRpbmcgPCA2KXtcblx0XHRcdFx0XHRjdXJyZW50RXhwYW5kID0gZGVmYXVsdEV4cGFuZDtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjdXJyZW50RXhwYW5kID0gc2hyaW5rRXhwYW5kO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Zm9yKDsgaSA8IGVMbGVuOyBpKyspe1xuXG5cdFx0XHRcdFx0aWYoIWxhenlsb2FkRWxlbXNbaV0gfHwgbGF6eWxvYWRFbGVtc1tpXS5fbGF6eVJhY2Upe2NvbnRpbnVlO31cblxuXHRcdFx0XHRcdGlmKCFzdXBwb3J0U2Nyb2xsKXt1bnZlaWxFbGVtZW50KGxhenlsb2FkRWxlbXNbaV0pO2NvbnRpbnVlO31cblxuXHRcdFx0XHRcdGlmKCEoZWxlbUV4cGFuZFZhbCA9IGxhenlsb2FkRWxlbXNbaV1bX2dldEF0dHJpYnV0ZV0oJ2RhdGEtZXhwYW5kJykpIHx8ICEoZWxlbUV4cGFuZCA9IGVsZW1FeHBhbmRWYWwgKiAxKSl7XG5cdFx0XHRcdFx0XHRlbGVtRXhwYW5kID0gY3VycmVudEV4cGFuZDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZihiZWZvcmVFeHBhbmRWYWwgIT09IGVsZW1FeHBhbmQpe1xuXHRcdFx0XHRcdFx0ZUx2VyA9IGlubmVyV2lkdGggKyAoZWxlbUV4cGFuZCAqIGhGYWMpO1xuXHRcdFx0XHRcdFx0ZWx2SCA9IGlubmVySGVpZ2h0ICsgZWxlbUV4cGFuZDtcblx0XHRcdFx0XHRcdGVsZW1OZWdhdGl2ZUV4cGFuZCA9IGVsZW1FeHBhbmQgKiAtMTtcblx0XHRcdFx0XHRcdGJlZm9yZUV4cGFuZFZhbCA9IGVsZW1FeHBhbmQ7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmVjdCA9IGxhenlsb2FkRWxlbXNbaV0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cblx0XHRcdFx0XHRpZiAoKGVMYm90dG9tID0gcmVjdC5ib3R0b20pID49IGVsZW1OZWdhdGl2ZUV4cGFuZCAmJlxuXHRcdFx0XHRcdFx0KGVMdG9wID0gcmVjdC50b3ApIDw9IGVsdkggJiZcblx0XHRcdFx0XHRcdChlTHJpZ2h0ID0gcmVjdC5yaWdodCkgPj0gZWxlbU5lZ2F0aXZlRXhwYW5kICogaEZhYyAmJlxuXHRcdFx0XHRcdFx0KGVMbGVmdCA9IHJlY3QubGVmdCkgPD0gZUx2VyAmJlxuXHRcdFx0XHRcdFx0KGVMYm90dG9tIHx8IGVMcmlnaHQgfHwgZUxsZWZ0IHx8IGVMdG9wKSAmJlxuXHRcdFx0XHRcdFx0KChpc0NvbXBsZXRlZCAmJiBpc0xvYWRpbmcgPCAzICYmICFlbGVtRXhwYW5kVmFsICYmIChsb2FkTW9kZSA8IDMgfHwgbG93UnVucyA8IDQpKSB8fCBpc05lc3RlZFZpc2libGUobGF6eWxvYWRFbGVtc1tpXSwgZWxlbUV4cGFuZCkpKXtcblx0XHRcdFx0XHRcdHVudmVpbEVsZW1lbnQobGF6eWxvYWRFbGVtc1tpXSk7XG5cdFx0XHRcdFx0XHRsb2FkZWRTb21ldGhpbmcgPSB0cnVlO1xuXHRcdFx0XHRcdFx0aWYoaXNMb2FkaW5nID4gOSl7YnJlYWs7fVxuXHRcdFx0XHRcdH0gZWxzZSBpZighbG9hZGVkU29tZXRoaW5nICYmIGlzQ29tcGxldGVkICYmICFhdXRvTG9hZEVsZW0gJiZcblx0XHRcdFx0XHRcdGlzTG9hZGluZyA8IDQgJiYgbG93UnVucyA8IDQgJiYgbG9hZE1vZGUgPiAyICYmXG5cdFx0XHRcdFx0XHQocHJlbG9hZEVsZW1zWzBdIHx8IGxhenlTaXplc0NvbmZpZy5wcmVsb2FkQWZ0ZXJMb2FkKSAmJlxuXHRcdFx0XHRcdFx0KHByZWxvYWRFbGVtc1swXSB8fCAoIWVsZW1FeHBhbmRWYWwgJiYgKChlTGJvdHRvbSB8fCBlTHJpZ2h0IHx8IGVMbGVmdCB8fCBlTHRvcCkgfHwgbGF6eWxvYWRFbGVtc1tpXVtfZ2V0QXR0cmlidXRlXShsYXp5U2l6ZXNDb25maWcuc2l6ZXNBdHRyKSAhPSAnYXV0bycpKSkpe1xuXHRcdFx0XHRcdFx0YXV0b0xvYWRFbGVtID0gcHJlbG9hZEVsZW1zWzBdIHx8IGxhenlsb2FkRWxlbXNbaV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYoYXV0b0xvYWRFbGVtICYmICFsb2FkZWRTb21ldGhpbmcpe1xuXHRcdFx0XHRcdHVudmVpbEVsZW1lbnQoYXV0b0xvYWRFbGVtKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR2YXIgdGhyb3R0bGVkQ2hlY2tFbGVtZW50cyA9IHRocm90dGxlKGNoZWNrRWxlbWVudHMpO1xuXG5cdFx0dmFyIHN3aXRjaExvYWRpbmdDbGFzcyA9IGZ1bmN0aW9uKGUpe1xuXHRcdFx0YWRkQ2xhc3MoZS50YXJnZXQsIGxhenlTaXplc0NvbmZpZy5sb2FkZWRDbGFzcyk7XG5cdFx0XHRyZW1vdmVDbGFzcyhlLnRhcmdldCwgbGF6eVNpemVzQ29uZmlnLmxvYWRpbmdDbGFzcyk7XG5cdFx0XHRhZGRSZW1vdmVMb2FkRXZlbnRzKGUudGFyZ2V0LCByYWZTd2l0Y2hMb2FkaW5nQ2xhc3MpO1xuXHRcdH07XG5cdFx0dmFyIHJhZmVkU3dpdGNoTG9hZGluZ0NsYXNzID0gckFGSXQoc3dpdGNoTG9hZGluZ0NsYXNzKTtcblx0XHR2YXIgcmFmU3dpdGNoTG9hZGluZ0NsYXNzID0gZnVuY3Rpb24oZSl7XG5cdFx0XHRyYWZlZFN3aXRjaExvYWRpbmdDbGFzcyh7dGFyZ2V0OiBlLnRhcmdldH0pO1xuXHRcdH07XG5cblx0XHR2YXIgY2hhbmdlSWZyYW1lU3JjID0gZnVuY3Rpb24oZWxlbSwgc3JjKXtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGVsZW0uY29udGVudFdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHNyYyk7XG5cdFx0XHR9IGNhdGNoKGUpe1xuXHRcdFx0XHRlbGVtLnNyYyA9IHNyYztcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0dmFyIGhhbmRsZVNvdXJjZXMgPSBmdW5jdGlvbihzb3VyY2Upe1xuXHRcdFx0dmFyIGN1c3RvbU1lZGlhLCBwYXJlbnQ7XG5cblx0XHRcdHZhciBzb3VyY2VTcmNzZXQgPSBzb3VyY2VbX2dldEF0dHJpYnV0ZV0obGF6eVNpemVzQ29uZmlnLnNyY3NldEF0dHIpO1xuXG5cdFx0XHRpZiggKGN1c3RvbU1lZGlhID0gbGF6eVNpemVzQ29uZmlnLmN1c3RvbU1lZGlhW3NvdXJjZVtfZ2V0QXR0cmlidXRlXSgnZGF0YS1tZWRpYScpIHx8IHNvdXJjZVtfZ2V0QXR0cmlidXRlXSgnbWVkaWEnKV0pICl7XG5cdFx0XHRcdHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ21lZGlhJywgY3VzdG9tTWVkaWEpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZihzb3VyY2VTcmNzZXQpe1xuXHRcdFx0XHRzb3VyY2Uuc2V0QXR0cmlidXRlKCdzcmNzZXQnLCBzb3VyY2VTcmNzZXQpO1xuXHRcdFx0fVxuXG5cdFx0XHQvL2h0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTExNzA1NzJcblx0XHRcdGlmKGN1c3RvbU1lZGlhKXtcblx0XHRcdFx0cGFyZW50ID0gc291cmNlLnBhcmVudE5vZGU7XG5cdFx0XHRcdHBhcmVudC5pbnNlcnRCZWZvcmUoc291cmNlLmNsb25lTm9kZSgpLCBzb3VyY2UpO1xuXHRcdFx0XHRwYXJlbnQucmVtb3ZlQ2hpbGQoc291cmNlKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0dmFyIGxhenlVbnZlaWwgPSByQUZJdChmdW5jdGlvbiAoZWxlbSwgZGV0YWlsLCBpc0F1dG8sIHNpemVzLCBpc0ltZyl7XG5cdFx0XHR2YXIgc3JjLCBzcmNzZXQsIHBhcmVudCwgaXNQaWN0dXJlLCBldmVudCwgZmlyZXNMb2FkO1xuXG5cdFx0XHRpZighKGV2ZW50ID0gdHJpZ2dlckV2ZW50KGVsZW0sICdsYXp5YmVmb3JldW52ZWlsJywgZGV0YWlsKSkuZGVmYXVsdFByZXZlbnRlZCl7XG5cblx0XHRcdFx0aWYoc2l6ZXMpe1xuXHRcdFx0XHRcdGlmKGlzQXV0byl7XG5cdFx0XHRcdFx0XHRhZGRDbGFzcyhlbGVtLCBsYXp5U2l6ZXNDb25maWcuYXV0b3NpemVzQ2xhc3MpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRlbGVtLnNldEF0dHJpYnV0ZSgnc2l6ZXMnLCBzaXplcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0c3Jjc2V0ID0gZWxlbVtfZ2V0QXR0cmlidXRlXShsYXp5U2l6ZXNDb25maWcuc3Jjc2V0QXR0cik7XG5cdFx0XHRcdHNyYyA9IGVsZW1bX2dldEF0dHJpYnV0ZV0obGF6eVNpemVzQ29uZmlnLnNyY0F0dHIpO1xuXG5cdFx0XHRcdGlmKGlzSW1nKSB7XG5cdFx0XHRcdFx0cGFyZW50ID0gZWxlbS5wYXJlbnROb2RlO1xuXHRcdFx0XHRcdGlzUGljdHVyZSA9IHBhcmVudCAmJiByZWdQaWN0dXJlLnRlc3QocGFyZW50Lm5vZGVOYW1lIHx8ICcnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGZpcmVzTG9hZCA9IGRldGFpbC5maXJlc0xvYWQgfHwgKCgnc3JjJyBpbiBlbGVtKSAmJiAoc3Jjc2V0IHx8IHNyYyB8fCBpc1BpY3R1cmUpKTtcblxuXHRcdFx0XHRldmVudCA9IHt0YXJnZXQ6IGVsZW19O1xuXG5cdFx0XHRcdGlmKGZpcmVzTG9hZCl7XG5cdFx0XHRcdFx0YWRkUmVtb3ZlTG9hZEV2ZW50cyhlbGVtLCByZXNldFByZWxvYWRpbmcsIHRydWUpO1xuXHRcdFx0XHRcdGNsZWFyVGltZW91dChyZXNldFByZWxvYWRpbmdUaW1lcik7XG5cdFx0XHRcdFx0cmVzZXRQcmVsb2FkaW5nVGltZXIgPSBzZXRUaW1lb3V0KHJlc2V0UHJlbG9hZGluZywgMjUwMCk7XG5cblx0XHRcdFx0XHRhZGRDbGFzcyhlbGVtLCBsYXp5U2l6ZXNDb25maWcubG9hZGluZ0NsYXNzKTtcblx0XHRcdFx0XHRhZGRSZW1vdmVMb2FkRXZlbnRzKGVsZW0sIHJhZlN3aXRjaExvYWRpbmdDbGFzcywgdHJ1ZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihpc1BpY3R1cmUpe1xuXHRcdFx0XHRcdGZvckVhY2guY2FsbChwYXJlbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NvdXJjZScpLCBoYW5kbGVTb3VyY2VzKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmKHNyY3NldCl7XG5cdFx0XHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoJ3NyY3NldCcsIHNyY3NldCk7XG5cdFx0XHRcdH0gZWxzZSBpZihzcmMgJiYgIWlzUGljdHVyZSl7XG5cdFx0XHRcdFx0aWYocmVnSWZyYW1lLnRlc3QoZWxlbS5ub2RlTmFtZSkpe1xuXHRcdFx0XHRcdFx0Y2hhbmdlSWZyYW1lU3JjKGVsZW0sIHNyYyk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGVsZW0uc3JjID0gc3JjO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmKHNyY3NldCB8fCBpc1BpY3R1cmUpe1xuXHRcdFx0XHRcdHVwZGF0ZVBvbHlmaWxsKGVsZW0sIHtzcmM6IHNyY30pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJBRihmdW5jdGlvbigpe1xuXHRcdFx0XHRpZihlbGVtLl9sYXp5UmFjZSl7XG5cdFx0XHRcdFx0ZGVsZXRlIGVsZW0uX2xhenlSYWNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJlbW92ZUNsYXNzKGVsZW0sIGxhenlTaXplc0NvbmZpZy5sYXp5Q2xhc3MpO1xuXG5cdFx0XHRcdGlmKCAhZmlyZXNMb2FkIHx8IGVsZW0uY29tcGxldGUgKXtcblx0XHRcdFx0XHRpZihmaXJlc0xvYWQpe1xuXHRcdFx0XHRcdFx0cmVzZXRQcmVsb2FkaW5nKGV2ZW50KTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0aXNMb2FkaW5nLS07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHN3aXRjaExvYWRpbmdDbGFzcyhldmVudCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0dmFyIHVudmVpbEVsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbSl7XG5cdFx0XHR2YXIgZGV0YWlsO1xuXG5cdFx0XHR2YXIgaXNJbWcgPSByZWdJbWcudGVzdChlbGVtLm5vZGVOYW1lKTtcblxuXHRcdFx0Ly9hbGxvdyB1c2luZyBzaXplcz1cImF1dG9cIiwgYnV0IGRvbid0IHVzZS4gaXQncyBpbnZhbGlkLiBVc2UgZGF0YS1zaXplcz1cImF1dG9cIiBvciBhIHZhbGlkIHZhbHVlIGZvciBzaXplcyBpbnN0ZWFkIChpLmUuOiBzaXplcz1cIjgwdndcIilcblx0XHRcdHZhciBzaXplcyA9IGlzSW1nICYmIChlbGVtW19nZXRBdHRyaWJ1dGVdKGxhenlTaXplc0NvbmZpZy5zaXplc0F0dHIpIHx8IGVsZW1bX2dldEF0dHJpYnV0ZV0oJ3NpemVzJykpO1xuXHRcdFx0dmFyIGlzQXV0byA9IHNpemVzID09ICdhdXRvJztcblxuXHRcdFx0aWYoIChpc0F1dG8gfHwgIWlzQ29tcGxldGVkKSAmJiBpc0ltZyAmJiAoZWxlbS5zcmMgfHwgZWxlbS5zcmNzZXQpICYmICFlbGVtLmNvbXBsZXRlICYmICFoYXNDbGFzcyhlbGVtLCBsYXp5U2l6ZXNDb25maWcuZXJyb3JDbGFzcykpe3JldHVybjt9XG5cblx0XHRcdGRldGFpbCA9IHRyaWdnZXJFdmVudChlbGVtLCAnbGF6eXVudmVpbHJlYWQnKS5kZXRhaWw7XG5cblx0XHRcdGlmKGlzQXV0byl7XG5cdFx0XHRcdCBhdXRvU2l6ZXIudXBkYXRlRWxlbShlbGVtLCB0cnVlLCBlbGVtLm9mZnNldFdpZHRoKTtcblx0XHRcdH1cblxuXHRcdFx0ZWxlbS5fbGF6eVJhY2UgPSB0cnVlO1xuXHRcdFx0aXNMb2FkaW5nKys7XG5cblx0XHRcdGxhenlVbnZlaWwoZWxlbSwgZGV0YWlsLCBpc0F1dG8sIHNpemVzLCBpc0ltZyk7XG5cdFx0fTtcblxuXHRcdHZhciBvbmxvYWQgPSBmdW5jdGlvbigpe1xuXHRcdFx0aWYoaXNDb21wbGV0ZWQpe3JldHVybjt9XG5cdFx0XHRpZihEYXRlLm5vdygpIC0gc3RhcnRlZCA8IDk5OSl7XG5cdFx0XHRcdHNldFRpbWVvdXQob25sb2FkLCA5OTkpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR2YXIgYWZ0ZXJTY3JvbGwgPSBkZWJvdW5jZShmdW5jdGlvbigpe1xuXHRcdFx0XHRsYXp5U2l6ZXNDb25maWcubG9hZE1vZGUgPSAzO1xuXHRcdFx0XHR0aHJvdHRsZWRDaGVja0VsZW1lbnRzKCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0aXNDb21wbGV0ZWQgPSB0cnVlO1xuXG5cdFx0XHRsYXp5U2l6ZXNDb25maWcubG9hZE1vZGUgPSAzO1xuXG5cdFx0XHR0aHJvdHRsZWRDaGVja0VsZW1lbnRzKCk7XG5cblx0XHRcdGFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGZ1bmN0aW9uKCl7XG5cdFx0XHRcdGlmKGxhenlTaXplc0NvbmZpZy5sb2FkTW9kZSA9PSAzKXtcblx0XHRcdFx0XHRsYXp5U2l6ZXNDb25maWcubG9hZE1vZGUgPSAyO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGFmdGVyU2Nyb2xsKCk7XG5cdFx0XHR9LCB0cnVlKTtcblx0XHR9O1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdF86IGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHN0YXJ0ZWQgPSBEYXRlLm5vdygpO1xuXG5cdFx0XHRcdGxhenlsb2FkRWxlbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGxhenlTaXplc0NvbmZpZy5sYXp5Q2xhc3MpO1xuXHRcdFx0XHRwcmVsb2FkRWxlbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGxhenlTaXplc0NvbmZpZy5sYXp5Q2xhc3MgKyAnICcgKyBsYXp5U2l6ZXNDb25maWcucHJlbG9hZENsYXNzKTtcblx0XHRcdFx0aEZhYyA9IGxhenlTaXplc0NvbmZpZy5oRmFjO1xuXG5cdFx0XHRcdGFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRocm90dGxlZENoZWNrRWxlbWVudHMsIHRydWUpO1xuXG5cdFx0XHRcdGFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRocm90dGxlZENoZWNrRWxlbWVudHMsIHRydWUpO1xuXG5cdFx0XHRcdGlmKHdpbmRvdy5NdXRhdGlvbk9ic2VydmVyKXtcblx0XHRcdFx0XHRuZXcgTXV0YXRpb25PYnNlcnZlciggdGhyb3R0bGVkQ2hlY2tFbGVtZW50cyApLm9ic2VydmUoIGRvY0VsZW0sIHtjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWUsIGF0dHJpYnV0ZXM6IHRydWV9ICk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZG9jRWxlbVtfYWRkRXZlbnRMaXN0ZW5lcl0oJ0RPTU5vZGVJbnNlcnRlZCcsIHRocm90dGxlZENoZWNrRWxlbWVudHMsIHRydWUpO1xuXHRcdFx0XHRcdGRvY0VsZW1bX2FkZEV2ZW50TGlzdGVuZXJdKCdET01BdHRyTW9kaWZpZWQnLCB0aHJvdHRsZWRDaGVja0VsZW1lbnRzLCB0cnVlKTtcblx0XHRcdFx0XHRzZXRJbnRlcnZhbCh0aHJvdHRsZWRDaGVja0VsZW1lbnRzLCA5OTkpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIHRocm90dGxlZENoZWNrRWxlbWVudHMsIHRydWUpO1xuXG5cdFx0XHRcdC8vLCAnZnVsbHNjcmVlbmNoYW5nZSdcblx0XHRcdFx0Wydmb2N1cycsICdtb3VzZW92ZXInLCAnY2xpY2snLCAnbG9hZCcsICd0cmFuc2l0aW9uZW5kJywgJ2FuaW1hdGlvbmVuZCcsICd3ZWJraXRBbmltYXRpb25FbmQnXS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpe1xuXHRcdFx0XHRcdGRvY3VtZW50W19hZGRFdmVudExpc3RlbmVyXShuYW1lLCB0aHJvdHRsZWRDaGVja0VsZW1lbnRzLCB0cnVlKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0aWYoKC9kJHxeYy8udGVzdChkb2N1bWVudC5yZWFkeVN0YXRlKSkpe1xuXHRcdFx0XHRcdG9ubG9hZCgpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBvbmxvYWQpO1xuXHRcdFx0XHRcdGRvY3VtZW50W19hZGRFdmVudExpc3RlbmVyXSgnRE9NQ29udGVudExvYWRlZCcsIHRocm90dGxlZENoZWNrRWxlbWVudHMpO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQob25sb2FkLCAyMDAwMCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihsYXp5bG9hZEVsZW1zLmxlbmd0aCl7XG5cdFx0XHRcdFx0Y2hlY2tFbGVtZW50cygpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRocm90dGxlZENoZWNrRWxlbWVudHMoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGNoZWNrRWxlbXM6IHRocm90dGxlZENoZWNrRWxlbWVudHMsXG5cdFx0XHR1bnZlaWw6IHVudmVpbEVsZW1lbnRcblx0XHR9O1xuXHR9KSgpO1xuXG5cblx0dmFyIGF1dG9TaXplciA9IChmdW5jdGlvbigpe1xuXHRcdHZhciBhdXRvc2l6ZXNFbGVtcztcblxuXHRcdHZhciBzaXplRWxlbWVudCA9IHJBRkl0KGZ1bmN0aW9uKGVsZW0sIHBhcmVudCwgZXZlbnQsIHdpZHRoKXtcblx0XHRcdHZhciBzb3VyY2VzLCBpLCBsZW47XG5cdFx0XHRlbGVtLl9sYXp5c2l6ZXNXaWR0aCA9IHdpZHRoO1xuXHRcdFx0d2lkdGggKz0gJ3B4JztcblxuXHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoJ3NpemVzJywgd2lkdGgpO1xuXG5cdFx0XHRpZihyZWdQaWN0dXJlLnRlc3QocGFyZW50Lm5vZGVOYW1lIHx8ICcnKSl7XG5cdFx0XHRcdHNvdXJjZXMgPSBwYXJlbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NvdXJjZScpO1xuXHRcdFx0XHRmb3IoaSA9IDAsIGxlbiA9IHNvdXJjZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspe1xuXHRcdFx0XHRcdHNvdXJjZXNbaV0uc2V0QXR0cmlidXRlKCdzaXplcycsIHdpZHRoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZighZXZlbnQuZGV0YWlsLmRhdGFBdHRyKXtcblx0XHRcdFx0dXBkYXRlUG9seWZpbGwoZWxlbSwgZXZlbnQuZGV0YWlsKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHR2YXIgZ2V0U2l6ZUVsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbSwgZGF0YUF0dHIsIHdpZHRoKXtcblx0XHRcdHZhciBldmVudDtcblx0XHRcdHZhciBwYXJlbnQgPSBlbGVtLnBhcmVudE5vZGU7XG5cblx0XHRcdGlmKHBhcmVudCl7XG5cdFx0XHRcdHdpZHRoID0gZ2V0V2lkdGgoZWxlbSwgcGFyZW50LCB3aWR0aCk7XG5cdFx0XHRcdGV2ZW50ID0gdHJpZ2dlckV2ZW50KGVsZW0sICdsYXp5YmVmb3Jlc2l6ZXMnLCB7d2lkdGg6IHdpZHRoLCBkYXRhQXR0cjogISFkYXRhQXR0cn0pO1xuXG5cdFx0XHRcdGlmKCFldmVudC5kZWZhdWx0UHJldmVudGVkKXtcblx0XHRcdFx0XHR3aWR0aCA9IGV2ZW50LmRldGFpbC53aWR0aDtcblxuXHRcdFx0XHRcdGlmKHdpZHRoICYmIHdpZHRoICE9PSBlbGVtLl9sYXp5c2l6ZXNXaWR0aCl7XG5cdFx0XHRcdFx0XHRzaXplRWxlbWVudChlbGVtLCBwYXJlbnQsIGV2ZW50LCB3aWR0aCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHZhciB1cGRhdGVFbGVtZW50c1NpemVzID0gZnVuY3Rpb24oKXtcblx0XHRcdHZhciBpO1xuXHRcdFx0dmFyIGxlbiA9IGF1dG9zaXplc0VsZW1zLmxlbmd0aDtcblx0XHRcdGlmKGxlbil7XG5cdFx0XHRcdGkgPSAwO1xuXG5cdFx0XHRcdGZvcig7IGkgPCBsZW47IGkrKyl7XG5cdFx0XHRcdFx0Z2V0U2l6ZUVsZW1lbnQoYXV0b3NpemVzRWxlbXNbaV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHZhciBkZWJvdW5jZWRVcGRhdGVFbGVtZW50c1NpemVzID0gZGVib3VuY2UodXBkYXRlRWxlbWVudHNTaXplcyk7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0XzogZnVuY3Rpb24oKXtcblx0XHRcdFx0YXV0b3NpemVzRWxlbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGxhenlTaXplc0NvbmZpZy5hdXRvc2l6ZXNDbGFzcyk7XG5cdFx0XHRcdGFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGRlYm91bmNlZFVwZGF0ZUVsZW1lbnRzU2l6ZXMpO1xuXHRcdFx0fSxcblx0XHRcdGNoZWNrRWxlbXM6IGRlYm91bmNlZFVwZGF0ZUVsZW1lbnRzU2l6ZXMsXG5cdFx0XHR1cGRhdGVFbGVtOiBnZXRTaXplRWxlbWVudFxuXHRcdH07XG5cdH0pKCk7XG5cblx0dmFyIGluaXQgPSBmdW5jdGlvbigpe1xuXHRcdGlmKCFpbml0Lmkpe1xuXHRcdFx0aW5pdC5pID0gdHJ1ZTtcblx0XHRcdGF1dG9TaXplci5fKCk7XG5cdFx0XHRsb2FkZXIuXygpO1xuXHRcdH1cblx0fTtcblxuXHQoZnVuY3Rpb24oKXtcblx0XHR2YXIgcHJvcDtcblxuXHRcdHZhciBsYXp5U2l6ZXNEZWZhdWx0cyA9IHtcblx0XHRcdGxhenlDbGFzczogJ2xhenlsb2FkJyxcblx0XHRcdGxvYWRlZENsYXNzOiAnbGF6eWxvYWRlZCcsXG5cdFx0XHRsb2FkaW5nQ2xhc3M6ICdsYXp5bG9hZGluZycsXG5cdFx0XHRwcmVsb2FkQ2xhc3M6ICdsYXp5cHJlbG9hZCcsXG5cdFx0XHRlcnJvckNsYXNzOiAnbGF6eWVycm9yJyxcblx0XHRcdC8vc3RyaWN0Q2xhc3M6ICdsYXp5c3RyaWN0Jyxcblx0XHRcdGF1dG9zaXplc0NsYXNzOiAnbGF6eWF1dG9zaXplcycsXG5cdFx0XHRzcmNBdHRyOiAnZGF0YS1zcmMnLFxuXHRcdFx0c3Jjc2V0QXR0cjogJ2RhdGEtc3Jjc2V0Jyxcblx0XHRcdHNpemVzQXR0cjogJ2RhdGEtc2l6ZXMnLFxuXHRcdFx0Ly9wcmVsb2FkQWZ0ZXJMb2FkOiBmYWxzZSxcblx0XHRcdG1pblNpemU6IDQwLFxuXHRcdFx0Y3VzdG9tTWVkaWE6IHt9LFxuXHRcdFx0aW5pdDogdHJ1ZSxcblx0XHRcdGV4cEZhY3RvcjogMS41LFxuXHRcdFx0aEZhYzogMC44LFxuXHRcdFx0bG9hZE1vZGU6IDJcblx0XHR9O1xuXG5cdFx0bGF6eVNpemVzQ29uZmlnID0gd2luZG93LmxhenlTaXplc0NvbmZpZyB8fCB3aW5kb3cubGF6eXNpemVzQ29uZmlnIHx8IHt9O1xuXG5cdFx0Zm9yKHByb3AgaW4gbGF6eVNpemVzRGVmYXVsdHMpe1xuXHRcdFx0aWYoIShwcm9wIGluIGxhenlTaXplc0NvbmZpZykpe1xuXHRcdFx0XHRsYXp5U2l6ZXNDb25maWdbcHJvcF0gPSBsYXp5U2l6ZXNEZWZhdWx0c1twcm9wXTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR3aW5kb3cubGF6eVNpemVzQ29uZmlnID0gbGF6eVNpemVzQ29uZmlnO1xuXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0aWYobGF6eVNpemVzQ29uZmlnLmluaXQpe1xuXHRcdFx0XHRpbml0KCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0pKCk7XG5cblx0cmV0dXJuIHtcblx0XHRjZmc6IGxhenlTaXplc0NvbmZpZyxcblx0XHRhdXRvU2l6ZXI6IGF1dG9TaXplcixcblx0XHRsb2FkZXI6IGxvYWRlcixcblx0XHRpbml0OiBpbml0LFxuXHRcdHVQOiB1cGRhdGVQb2x5ZmlsbCxcblx0XHRhQzogYWRkQ2xhc3MsXG5cdFx0ckM6IHJlbW92ZUNsYXNzLFxuXHRcdGhDOiBoYXNDbGFzcyxcblx0XHRmaXJlOiB0cmlnZ2VyRXZlbnQsXG5cdFx0Z1c6IGdldFdpZHRoLFxuXHRcdHJBRjogckFGLFxuXHR9O1xufVxuKSk7XG4iLCIvKlxuVGhpcyBwbHVnaW4gZXh0ZW5kcyBsYXp5U2l6ZXMgdG8gbGF6eUxvYWQ6XG5iYWNrZ3JvdW5kIGltYWdlcywgdmlkZW9zL3Bvc3RlcnMgYW5kIHNjcmlwdHNcblxuQmFja2dyb3VuZC1JbWFnZTpcbkZvciBiYWNrZ3JvdW5kIGltYWdlcywgdXNlIGRhdGEtYmcgYXR0cmlidXRlOlxuPGRpdiBjbGFzcz1cImxhenlsb2FkXCIgZGF0YS1iZz1cImJnLWltZy5qcGdcIj48L2Rpdj5cblxuIFZpZGVvOlxuIEZvciB2aWRlby9hdWRpbyB1c2UgZGF0YS1wb3N0ZXIgYW5kIHByZWxvYWQ9XCJub25lXCI6XG4gPHZpZGVvIGNsYXNzPVwibGF6eWxvYWRcIiBkYXRhLXBvc3Rlcj1cInBvc3Rlci5qcGdcIiBwcmVsb2FkPVwibm9uZVwiPlxuIDwhLS0gc291cmNlcyAtLT5cbiA8L3ZpZGVvPlxuXG4gU2NyaXB0czpcbiBGb3Igc2NyaXB0cyB1c2UgZGF0YS1zY3JpcHQ6XG4gPGRpdiBjbGFzcz1cImxhenlsb2FkXCIgZGF0YS1zY3JpcHQ9XCJtb2R1bGUtbmFtZS5qc1wiPjwvZGl2PlxuXG5cbiBTY3JpcHQgbW9kdWxlcyB1c2luZyByZXF1aXJlOlxuIEZvciBtb2R1bGVzIHVzaW5nIHJlcXVpcmUgdXNlIGRhdGEtcmVxdWlyZTpcbiA8ZGl2IGNsYXNzPVwibGF6eWxvYWRcIiBkYXRhLXJlcXVpcmU9XCJtb2R1bGUtbmFtZVwiPjwvZGl2PlxuKi9cblxuKGZ1bmN0aW9uKHdpbmRvdywgZG9jdW1lbnQpe1xuXHQvKmpzaGludCBlcW51bGw6dHJ1ZSAqL1xuXHQndXNlIHN0cmljdCc7XG5cdHZhciBiZ0xvYWQsIHJlZ0JnVXJsRXNjYXBlO1xuXHR2YXIgdW5pcXVlVXJscyA9IHt9O1xuXG5cdGlmKGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIpe1xuXHRcdHJlZ0JnVXJsRXNjYXBlID0gL1xcKHxcXCl8Jy87XG5cblx0XHRiZ0xvYWQgPSBmdW5jdGlvbiAodXJsLCBjYil7XG5cdFx0XHR2YXIgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cdFx0XHRpbWcub25sb2FkID0gZnVuY3Rpb24oKXtcblx0XHRcdFx0aW1nLm9ubG9hZCA9IG51bGw7XG5cdFx0XHRcdGltZy5vbmVycm9yID0gbnVsbDtcblx0XHRcdFx0aW1nID0gbnVsbDtcblx0XHRcdFx0Y2IoKTtcblx0XHRcdH07XG5cdFx0XHRpbWcub25lcnJvciA9IGltZy5vbmxvYWQ7XG5cblx0XHRcdGltZy5zcmMgPSB1cmw7XG5cblx0XHRcdGlmKGltZyAmJiBpbWcuY29tcGxldGUgJiYgaW1nLm9ubG9hZCl7XG5cdFx0XHRcdGltZy5vbmxvYWQoKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0YWRkRXZlbnRMaXN0ZW5lcignbGF6eWJlZm9yZXVudmVpbCcsIGZ1bmN0aW9uKGUpe1xuXHRcdFx0dmFyIHRtcCwgbG9hZCwgYmcsIHBvc3Rlcjtcblx0XHRcdGlmKCFlLmRlZmF1bHRQcmV2ZW50ZWQpIHtcblxuXHRcdFx0XHRpZihlLnRhcmdldC5wcmVsb2FkID09ICdub25lJyl7XG5cdFx0XHRcdFx0ZS50YXJnZXQucHJlbG9hZCA9ICdhdXRvJztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRtcCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1saW5rJyk7XG5cdFx0XHRcdGlmKHRtcCl7XG5cdFx0XHRcdFx0YWRkU3R5bGVTY3JpcHQodG1wLCB0cnVlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIGhhbmRsZSBkYXRhLXNjcmlwdFxuXHRcdFx0XHR0bXAgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2NyaXB0Jyk7XG5cdFx0XHRcdGlmKHRtcCl7XG5cdFx0XHRcdFx0YWRkU3R5bGVTY3JpcHQodG1wKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIGhhbmRsZSBkYXRhLXJlcXVpcmVcblx0XHRcdFx0dG1wID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXJlcXVpcmUnKTtcblx0XHRcdFx0aWYodG1wKXtcblx0XHRcdFx0XHRpZih3aW5kb3cucmVxdWlyZSl7XG5cdFx0XHRcdFx0XHRyZXF1aXJlKFt0bXBdKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBoYW5kbGUgZGF0YS1iZ1xuXHRcdFx0XHRiZyA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1iZycpO1xuXHRcdFx0XHRpZiAoYmcpIHtcblx0XHRcdFx0XHRlLmRldGFpbC5maXJlc0xvYWQgPSB0cnVlO1xuXHRcdFx0XHRcdGxvYWQgPSBmdW5jdGlvbigpe1xuXHRcdFx0XHRcdFx0ZS50YXJnZXQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJ3VybCgnICsgKHJlZ0JnVXJsRXNjYXBlLnRlc3QoYmcpID8gSlNPTi5zdHJpbmdpZnkoYmcpIDogYmcgKSArICcpJztcblx0XHRcdFx0XHRcdGUuZGV0YWlsLmZpcmVzTG9hZCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0bGF6eVNpemVzLmZpcmUoZS50YXJnZXQsICdfbGF6eWxvYWRlZCcsIHt9LCB0cnVlLCB0cnVlKTtcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0YmdMb2FkKGJnLCBsb2FkKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIGhhbmRsZSBkYXRhLXBvc3RlclxuXHRcdFx0XHRwb3N0ZXIgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcG9zdGVyJyk7XG5cdFx0XHRcdGlmKHBvc3Rlcil7XG5cdFx0XHRcdFx0ZS5kZXRhaWwuZmlyZXNMb2FkID0gdHJ1ZTtcblx0XHRcdFx0XHRsb2FkID0gZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcdGUudGFyZ2V0LnBvc3RlciA9IHBvc3Rlcjtcblx0XHRcdFx0XHRcdGUuZGV0YWlsLmZpcmVzTG9hZCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0bGF6eVNpemVzLmZpcmUoZS50YXJnZXQsICdfbGF6eWxvYWRlZCcsIHt9LCB0cnVlLCB0cnVlKTtcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0YmdMb2FkKHBvc3RlciwgbG9hZCk7XG5cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sIGZhbHNlKTtcblxuXHR9XG5cblx0ZnVuY3Rpb24gYWRkU3R5bGVTY3JpcHQoc3JjLCBzdHlsZSl7XG5cdFx0aWYodW5pcXVlVXJsc1tzcmNdKXtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0dmFyIGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHN0eWxlID8gJ2xpbmsnIDogJ3NjcmlwdCcpO1xuXHRcdHZhciBpbnNlcnRFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdO1xuXG5cdFx0aWYoc3R5bGUpe1xuXHRcdFx0ZWxlbS5yZWwgPSAnc3R5bGVzaGVldCc7XG5cdFx0XHRlbGVtLmhyZWYgPSBzcmM7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGVsZW0uc3JjID0gc3JjO1xuXHRcdH1cblx0XHR1bmlxdWVVcmxzW3NyY10gPSB0cnVlO1xuXHRcdHVuaXF1ZVVybHNbZWxlbS5zcmMgfHwgZWxlbS5ocmVmXSA9IHRydWU7XG5cdFx0aW5zZXJ0RWxlbS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShlbGVtLCBpbnNlcnRFbGVtKTtcblx0fVxufSkod2luZG93LCBkb2N1bWVudCk7XG4iLCIvLyBTcGVjdHJ1bSBDb2xvcnBpY2tlciB2MS44LjBcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9iZ3JpbnMvc3BlY3RydW1cbi8vIEF1dGhvcjogQnJpYW4gR3JpbnN0ZWFkXG4vLyBMaWNlbnNlOiBNSVRcblxuKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7IC8vIEFNRFxuICAgICAgICBkZWZpbmUoWydqcXVlcnknXSwgZmFjdG9yeSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG1vZHVsZSA9PSBcIm9iamVjdFwiKSB7IC8vIENvbW1vbkpTXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKCdqcXVlcnknKSk7XG4gICAgfVxuICAgIGVsc2UgeyAvLyBCcm93c2VyXG4gICAgICAgIGZhY3RvcnkoalF1ZXJ5KTtcbiAgICB9XG59KShmdW5jdGlvbigkLCB1bmRlZmluZWQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciBkZWZhdWx0T3B0cyA9IHtcblxuICAgICAgICAvLyBDYWxsYmFja3NcbiAgICAgICAgYmVmb3JlU2hvdzogbm9vcCxcbiAgICAgICAgbW92ZTogbm9vcCxcbiAgICAgICAgY2hhbmdlOiBub29wLFxuICAgICAgICBzaG93OiBub29wLFxuICAgICAgICBoaWRlOiBub29wLFxuXG4gICAgICAgIC8vIE9wdGlvbnNcbiAgICAgICAgY29sb3I6IGZhbHNlLFxuICAgICAgICBmbGF0OiBmYWxzZSxcbiAgICAgICAgc2hvd0lucHV0OiBmYWxzZSxcbiAgICAgICAgYWxsb3dFbXB0eTogZmFsc2UsXG4gICAgICAgIHNob3dCdXR0b25zOiB0cnVlLFxuICAgICAgICBjbGlja291dEZpcmVzQ2hhbmdlOiB0cnVlLFxuICAgICAgICBzaG93SW5pdGlhbDogZmFsc2UsXG4gICAgICAgIHNob3dQYWxldHRlOiBmYWxzZSxcbiAgICAgICAgc2hvd1BhbGV0dGVPbmx5OiBmYWxzZSxcbiAgICAgICAgaGlkZUFmdGVyUGFsZXR0ZVNlbGVjdDogZmFsc2UsXG4gICAgICAgIHRvZ2dsZVBhbGV0dGVPbmx5OiBmYWxzZSxcbiAgICAgICAgc2hvd1NlbGVjdGlvblBhbGV0dGU6IHRydWUsXG4gICAgICAgIGxvY2FsU3RvcmFnZUtleTogZmFsc2UsXG4gICAgICAgIGFwcGVuZFRvOiBcImJvZHlcIixcbiAgICAgICAgbWF4U2VsZWN0aW9uU2l6ZTogNyxcbiAgICAgICAgY2FuY2VsVGV4dDogXCJjYW5jZWxcIixcbiAgICAgICAgY2hvb3NlVGV4dDogXCJjaG9vc2VcIixcbiAgICAgICAgdG9nZ2xlUGFsZXR0ZU1vcmVUZXh0OiBcIm1vcmVcIixcbiAgICAgICAgdG9nZ2xlUGFsZXR0ZUxlc3NUZXh0OiBcImxlc3NcIixcbiAgICAgICAgY2xlYXJUZXh0OiBcIkNsZWFyIENvbG9yIFNlbGVjdGlvblwiLFxuICAgICAgICBub0NvbG9yU2VsZWN0ZWRUZXh0OiBcIk5vIENvbG9yIFNlbGVjdGVkXCIsXG4gICAgICAgIHByZWZlcnJlZEZvcm1hdDogZmFsc2UsXG4gICAgICAgIGNsYXNzTmFtZTogXCJcIiwgLy8gRGVwcmVjYXRlZCAtIHVzZSBjb250YWluZXJDbGFzc05hbWUgYW5kIHJlcGxhY2VyQ2xhc3NOYW1lIGluc3RlYWQuXG4gICAgICAgIGNvbnRhaW5lckNsYXNzTmFtZTogXCJcIixcbiAgICAgICAgcmVwbGFjZXJDbGFzc05hbWU6IFwiXCIsXG4gICAgICAgIHNob3dBbHBoYTogZmFsc2UsXG4gICAgICAgIHRoZW1lOiBcInNwLWxpZ2h0XCIsXG4gICAgICAgIHBhbGV0dGU6IFtbXCIjZmZmZmZmXCIsIFwiIzAwMDAwMFwiLCBcIiNmZjAwMDBcIiwgXCIjZmY4MDAwXCIsIFwiI2ZmZmYwMFwiLCBcIiMwMDgwMDBcIiwgXCIjMDAwMGZmXCIsIFwiIzRiMDA4MlwiLCBcIiM5NDAwZDNcIl1dLFxuICAgICAgICBzZWxlY3Rpb25QYWxldHRlOiBbXSxcbiAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgICBvZmZzZXQ6IG51bGxcbiAgICB9LFxuICAgIHNwZWN0cnVtcyA9IFtdLFxuICAgIElFID0gISEvbXNpZS9pLmV4ZWMoIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50ICksXG4gICAgcmdiYVN1cHBvcnQgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIGZ1bmN0aW9uIGNvbnRhaW5zKCBzdHIsIHN1YnN0ciApIHtcbiAgICAgICAgICAgIHJldHVybiAhIX4oJycgKyBzdHIpLmluZGV4T2Yoc3Vic3RyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBlbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHZhciBzdHlsZSA9IGVsZW0uc3R5bGU7XG4gICAgICAgIHN0eWxlLmNzc1RleHQgPSAnYmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC41KSc7XG4gICAgICAgIHJldHVybiBjb250YWlucyhzdHlsZS5iYWNrZ3JvdW5kQ29sb3IsICdyZ2JhJykgfHwgY29udGFpbnMoc3R5bGUuYmFja2dyb3VuZENvbG9yLCAnaHNsYScpO1xuICAgIH0pKCksXG4gICAgcmVwbGFjZUlucHV0ID0gW1xuICAgICAgICBcIjxkaXYgY2xhc3M9J3NwLXJlcGxhY2VyJz5cIixcbiAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nc3AtcHJldmlldyc+PGRpdiBjbGFzcz0nc3AtcHJldmlldy1pbm5lcic+PC9kaXY+PC9kaXY+XCIsXG4gICAgICAgICAgICBcIjxkaXYgY2xhc3M9J3NwLWRkJz4mIzk2NjA7PC9kaXY+XCIsXG4gICAgICAgIFwiPC9kaXY+XCJcbiAgICBdLmpvaW4oJycpLFxuICAgIG1hcmt1cCA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgLy8gSUUgZG9lcyBub3Qgc3VwcG9ydCBncmFkaWVudHMgd2l0aCBtdWx0aXBsZSBzdG9wcywgc28gd2UgbmVlZCB0byBzaW11bGF0ZVxuICAgICAgICAvLyAgdGhhdCBmb3IgdGhlIHJhaW5ib3cgc2xpZGVyIHdpdGggOCBkaXZzIHRoYXQgZWFjaCBoYXZlIGEgc2luZ2xlIGdyYWRpZW50XG4gICAgICAgIHZhciBncmFkaWVudEZpeCA9IFwiXCI7XG4gICAgICAgIGlmIChJRSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gNjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZ3JhZGllbnRGaXggKz0gXCI8ZGl2IGNsYXNzPSdzcC1cIiArIGkgKyBcIic+PC9kaXY+XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdzcC1jb250YWluZXIgc3AtaGlkZGVuJz5cIixcbiAgICAgICAgICAgICAgICBcIjxkaXYgY2xhc3M9J3NwLXBhbGV0dGUtY29udGFpbmVyJz5cIixcbiAgICAgICAgICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdzcC1wYWxldHRlIHNwLXRodW1iIHNwLWNmJz48L2Rpdj5cIixcbiAgICAgICAgICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdzcC1wYWxldHRlLWJ1dHRvbi1jb250YWluZXIgc3AtY2YnPlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCI8YnV0dG9uIHR5cGU9J2J1dHRvbicgY2xhc3M9J3NwLXBhbGV0dGUtdG9nZ2xlJz48L2J1dHRvbj5cIixcbiAgICAgICAgICAgICAgICAgICAgXCI8L2Rpdj5cIixcbiAgICAgICAgICAgICAgICBcIjwvZGl2PlwiLFxuICAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nc3AtcGlja2VyLWNvbnRhaW5lcic+XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nc3AtdG9wIHNwLWNmJz5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nc3AtZmlsbCc+PC9kaXY+XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIjxkaXYgY2xhc3M9J3NwLXRvcC1pbm5lcic+XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdzcC1jb2xvcic+XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nc3Atc2F0Jz5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nc3AtdmFsJz5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjxkaXYgY2xhc3M9J3NwLWRyYWdnZXInPjwvZGl2PlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8L2Rpdj5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8L2Rpdj5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjwvZGl2PlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nc3AtY2xlYXIgc3AtY2xlYXItZGlzcGxheSc+XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8L2Rpdj5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIjxkaXYgY2xhc3M9J3NwLWh1ZSc+XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nc3Atc2xpZGVyJz48L2Rpdj5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JhZGllbnRGaXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCI8L2Rpdj5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiPC9kaXY+XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIjxkaXYgY2xhc3M9J3NwLWFscGhhJz48ZGl2IGNsYXNzPSdzcC1hbHBoYS1pbm5lcic+PGRpdiBjbGFzcz0nc3AtYWxwaGEtaGFuZGxlJz48L2Rpdj48L2Rpdj48L2Rpdj5cIixcbiAgICAgICAgICAgICAgICAgICAgXCI8L2Rpdj5cIixcbiAgICAgICAgICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdzcC1pbnB1dC1jb250YWluZXIgc3AtY2YnPlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCI8aW5wdXQgY2xhc3M9J3NwLWlucHV0JyB0eXBlPSd0ZXh0JyBzcGVsbGNoZWNrPSdmYWxzZScgIC8+XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiPC9kaXY+XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nc3AtaW5pdGlhbCBzcC10aHVtYiBzcC1jZic+PC9kaXY+XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nc3AtYnV0dG9uLWNvbnRhaW5lciBzcC1jZic+XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcIjxhIGNsYXNzPSdzcC1jYW5jZWwnIGhyZWY9JyMnPjwvYT5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiPGJ1dHRvbiB0eXBlPSdidXR0b24nIGNsYXNzPSdzcC1jaG9vc2UnPjwvYnV0dG9uPlwiLFxuICAgICAgICAgICAgICAgICAgICBcIjwvZGl2PlwiLFxuICAgICAgICAgICAgICAgIFwiPC9kaXY+XCIsXG4gICAgICAgICAgICBcIjwvZGl2PlwiXG4gICAgICAgIF0uam9pbihcIlwiKTtcbiAgICB9KSgpO1xuXG4gICAgZnVuY3Rpb24gcGFsZXR0ZVRlbXBsYXRlIChwLCBjb2xvciwgY2xhc3NOYW1lLCBvcHRzKSB7XG4gICAgICAgIHZhciBodG1sID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGN1cnJlbnQgPSBwW2ldO1xuICAgICAgICAgICAgaWYoY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHZhciB0aW55ID0gdGlueWNvbG9yKGN1cnJlbnQpO1xuICAgICAgICAgICAgICAgIHZhciBjID0gdGlueS50b0hzbCgpLmwgPCAwLjUgPyBcInNwLXRodW1iLWVsIHNwLXRodW1iLWRhcmtcIiA6IFwic3AtdGh1bWItZWwgc3AtdGh1bWItbGlnaHRcIjtcbiAgICAgICAgICAgICAgICBjICs9ICh0aW55Y29sb3IuZXF1YWxzKGNvbG9yLCBjdXJyZW50KSkgPyBcIiBzcC10aHVtYi1hY3RpdmVcIiA6IFwiXCI7XG4gICAgICAgICAgICAgICAgdmFyIGZvcm1hdHRlZFN0cmluZyA9IHRpbnkudG9TdHJpbmcob3B0cy5wcmVmZXJyZWRGb3JtYXQgfHwgXCJyZ2JcIik7XG4gICAgICAgICAgICAgICAgdmFyIHN3YXRjaFN0eWxlID0gcmdiYVN1cHBvcnQgPyAoXCJiYWNrZ3JvdW5kLWNvbG9yOlwiICsgdGlueS50b1JnYlN0cmluZygpKSA6IFwiZmlsdGVyOlwiICsgdGlueS50b0ZpbHRlcigpO1xuICAgICAgICAgICAgICAgIGh0bWwucHVzaCgnPHNwYW4gdGl0bGU9XCInICsgZm9ybWF0dGVkU3RyaW5nICsgJ1wiIGRhdGEtY29sb3I9XCInICsgdGlueS50b1JnYlN0cmluZygpICsgJ1wiIGNsYXNzPVwiJyArIGMgKyAnXCI+PHNwYW4gY2xhc3M9XCJzcC10aHVtYi1pbm5lclwiIHN0eWxlPVwiJyArIHN3YXRjaFN0eWxlICsgJztcIiAvPjwvc3Bhbj4nKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGNscyA9ICdzcC1jbGVhci1kaXNwbGF5JztcbiAgICAgICAgICAgICAgICBodG1sLnB1c2goJCgnPGRpdiAvPicpXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmQoJCgnPHNwYW4gZGF0YS1jb2xvcj1cIlwiIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDtcIiBjbGFzcz1cIicgKyBjbHMgKyAnXCI+PC9zcGFuPicpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cigndGl0bGUnLCBvcHRzLm5vQ29sb3JTZWxlY3RlZFRleHQpXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgLmh0bWwoKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFwiPGRpdiBjbGFzcz0nc3AtY2YgXCIgKyBjbGFzc05hbWUgKyBcIic+XCIgKyBodG1sLmpvaW4oJycpICsgXCI8L2Rpdj5cIjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoaWRlQWxsKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNwZWN0cnVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHNwZWN0cnVtc1tpXSkge1xuICAgICAgICAgICAgICAgIHNwZWN0cnVtc1tpXS5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YW5jZU9wdGlvbnMobywgY2FsbGJhY2tDb250ZXh0KSB7XG4gICAgICAgIHZhciBvcHRzID0gJC5leHRlbmQoe30sIGRlZmF1bHRPcHRzLCBvKTtcbiAgICAgICAgb3B0cy5jYWxsYmFja3MgPSB7XG4gICAgICAgICAgICAnbW92ZSc6IGJpbmQob3B0cy5tb3ZlLCBjYWxsYmFja0NvbnRleHQpLFxuICAgICAgICAgICAgJ2NoYW5nZSc6IGJpbmQob3B0cy5jaGFuZ2UsIGNhbGxiYWNrQ29udGV4dCksXG4gICAgICAgICAgICAnc2hvdyc6IGJpbmQob3B0cy5zaG93LCBjYWxsYmFja0NvbnRleHQpLFxuICAgICAgICAgICAgJ2hpZGUnOiBiaW5kKG9wdHMuaGlkZSwgY2FsbGJhY2tDb250ZXh0KSxcbiAgICAgICAgICAgICdiZWZvcmVTaG93JzogYmluZChvcHRzLmJlZm9yZVNob3csIGNhbGxiYWNrQ29udGV4dClcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gb3B0cztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzcGVjdHJ1bShlbGVtZW50LCBvKSB7XG5cbiAgICAgICAgdmFyIG9wdHMgPSBpbnN0YW5jZU9wdGlvbnMobywgZWxlbWVudCksXG4gICAgICAgICAgICBmbGF0ID0gb3B0cy5mbGF0LFxuICAgICAgICAgICAgc2hvd1NlbGVjdGlvblBhbGV0dGUgPSBvcHRzLnNob3dTZWxlY3Rpb25QYWxldHRlLFxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlS2V5ID0gb3B0cy5sb2NhbFN0b3JhZ2VLZXksXG4gICAgICAgICAgICB0aGVtZSA9IG9wdHMudGhlbWUsXG4gICAgICAgICAgICBjYWxsYmFja3MgPSBvcHRzLmNhbGxiYWNrcyxcbiAgICAgICAgICAgIHJlc2l6ZSA9IHRocm90dGxlKHJlZmxvdywgMTApLFxuICAgICAgICAgICAgdmlzaWJsZSA9IGZhbHNlLFxuICAgICAgICAgICAgaXNEcmFnZ2luZyA9IGZhbHNlLFxuICAgICAgICAgICAgZHJhZ1dpZHRoID0gMCxcbiAgICAgICAgICAgIGRyYWdIZWlnaHQgPSAwLFxuICAgICAgICAgICAgZHJhZ0hlbHBlckhlaWdodCA9IDAsXG4gICAgICAgICAgICBzbGlkZUhlaWdodCA9IDAsXG4gICAgICAgICAgICBzbGlkZVdpZHRoID0gMCxcbiAgICAgICAgICAgIGFscGhhV2lkdGggPSAwLFxuICAgICAgICAgICAgYWxwaGFTbGlkZUhlbHBlcldpZHRoID0gMCxcbiAgICAgICAgICAgIHNsaWRlSGVscGVySGVpZ2h0ID0gMCxcbiAgICAgICAgICAgIGN1cnJlbnRIdWUgPSAwLFxuICAgICAgICAgICAgY3VycmVudFNhdHVyYXRpb24gPSAwLFxuICAgICAgICAgICAgY3VycmVudFZhbHVlID0gMCxcbiAgICAgICAgICAgIGN1cnJlbnRBbHBoYSA9IDEsXG4gICAgICAgICAgICBwYWxldHRlID0gW10sXG4gICAgICAgICAgICBwYWxldHRlQXJyYXkgPSBbXSxcbiAgICAgICAgICAgIHBhbGV0dGVMb29rdXAgPSB7fSxcbiAgICAgICAgICAgIHNlbGVjdGlvblBhbGV0dGUgPSBvcHRzLnNlbGVjdGlvblBhbGV0dGUuc2xpY2UoMCksXG4gICAgICAgICAgICBtYXhTZWxlY3Rpb25TaXplID0gb3B0cy5tYXhTZWxlY3Rpb25TaXplLFxuICAgICAgICAgICAgZHJhZ2dpbmdDbGFzcyA9IFwic3AtZHJhZ2dpbmdcIixcbiAgICAgICAgICAgIHNoaWZ0TW92ZW1lbnREaXJlY3Rpb24gPSBudWxsO1xuXG4gICAgICAgIHZhciBkb2MgPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQsXG4gICAgICAgICAgICBib2R5ID0gZG9jLmJvZHksXG4gICAgICAgICAgICBib3VuZEVsZW1lbnQgPSAkKGVsZW1lbnQpLFxuICAgICAgICAgICAgZGlzYWJsZWQgPSBmYWxzZSxcbiAgICAgICAgICAgIGNvbnRhaW5lciA9ICQobWFya3VwLCBkb2MpLmFkZENsYXNzKHRoZW1lKSxcbiAgICAgICAgICAgIHBpY2tlckNvbnRhaW5lciA9IGNvbnRhaW5lci5maW5kKFwiLnNwLXBpY2tlci1jb250YWluZXJcIiksXG4gICAgICAgICAgICBkcmFnZ2VyID0gY29udGFpbmVyLmZpbmQoXCIuc3AtY29sb3JcIiksXG4gICAgICAgICAgICBkcmFnSGVscGVyID0gY29udGFpbmVyLmZpbmQoXCIuc3AtZHJhZ2dlclwiKSxcbiAgICAgICAgICAgIHNsaWRlciA9IGNvbnRhaW5lci5maW5kKFwiLnNwLWh1ZVwiKSxcbiAgICAgICAgICAgIHNsaWRlSGVscGVyID0gY29udGFpbmVyLmZpbmQoXCIuc3Atc2xpZGVyXCIpLFxuICAgICAgICAgICAgYWxwaGFTbGlkZXJJbm5lciA9IGNvbnRhaW5lci5maW5kKFwiLnNwLWFscGhhLWlubmVyXCIpLFxuICAgICAgICAgICAgYWxwaGFTbGlkZXIgPSBjb250YWluZXIuZmluZChcIi5zcC1hbHBoYVwiKSxcbiAgICAgICAgICAgIGFscGhhU2xpZGVIZWxwZXIgPSBjb250YWluZXIuZmluZChcIi5zcC1hbHBoYS1oYW5kbGVcIiksXG4gICAgICAgICAgICB0ZXh0SW5wdXQgPSBjb250YWluZXIuZmluZChcIi5zcC1pbnB1dFwiKSxcbiAgICAgICAgICAgIHBhbGV0dGVDb250YWluZXIgPSBjb250YWluZXIuZmluZChcIi5zcC1wYWxldHRlXCIpLFxuICAgICAgICAgICAgaW5pdGlhbENvbG9yQ29udGFpbmVyID0gY29udGFpbmVyLmZpbmQoXCIuc3AtaW5pdGlhbFwiKSxcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvbiA9IGNvbnRhaW5lci5maW5kKFwiLnNwLWNhbmNlbFwiKSxcbiAgICAgICAgICAgIGNsZWFyQnV0dG9uID0gY29udGFpbmVyLmZpbmQoXCIuc3AtY2xlYXJcIiksXG4gICAgICAgICAgICBjaG9vc2VCdXR0b24gPSBjb250YWluZXIuZmluZChcIi5zcC1jaG9vc2VcIiksXG4gICAgICAgICAgICB0b2dnbGVCdXR0b24gPSBjb250YWluZXIuZmluZChcIi5zcC1wYWxldHRlLXRvZ2dsZVwiKSxcbiAgICAgICAgICAgIGlzSW5wdXQgPSBib3VuZEVsZW1lbnQuaXMoXCJpbnB1dFwiKSxcbiAgICAgICAgICAgIGlzSW5wdXRUeXBlQ29sb3IgPSBpc0lucHV0ICYmIGJvdW5kRWxlbWVudC5hdHRyKFwidHlwZVwiKSA9PT0gXCJjb2xvclwiICYmIGlucHV0VHlwZUNvbG9yU3VwcG9ydCgpLFxuICAgICAgICAgICAgc2hvdWxkUmVwbGFjZSA9IGlzSW5wdXQgJiYgIWZsYXQsXG4gICAgICAgICAgICByZXBsYWNlciA9IChzaG91bGRSZXBsYWNlKSA/ICQocmVwbGFjZUlucHV0KS5hZGRDbGFzcyh0aGVtZSkuYWRkQ2xhc3Mob3B0cy5jbGFzc05hbWUpLmFkZENsYXNzKG9wdHMucmVwbGFjZXJDbGFzc05hbWUpIDogJChbXSksXG4gICAgICAgICAgICBvZmZzZXRFbGVtZW50ID0gKHNob3VsZFJlcGxhY2UpID8gcmVwbGFjZXIgOiBib3VuZEVsZW1lbnQsXG4gICAgICAgICAgICBwcmV2aWV3RWxlbWVudCA9IHJlcGxhY2VyLmZpbmQoXCIuc3AtcHJldmlldy1pbm5lclwiKSxcbiAgICAgICAgICAgIGluaXRpYWxDb2xvciA9IG9wdHMuY29sb3IgfHwgKGlzSW5wdXQgJiYgYm91bmRFbGVtZW50LnZhbCgpKSxcbiAgICAgICAgICAgIGNvbG9yT25TaG93ID0gZmFsc2UsXG4gICAgICAgICAgICBjdXJyZW50UHJlZmVycmVkRm9ybWF0ID0gb3B0cy5wcmVmZXJyZWRGb3JtYXQsXG4gICAgICAgICAgICBjbGlja291dEZpcmVzQ2hhbmdlID0gIW9wdHMuc2hvd0J1dHRvbnMgfHwgb3B0cy5jbGlja291dEZpcmVzQ2hhbmdlLFxuICAgICAgICAgICAgaXNFbXB0eSA9ICFpbml0aWFsQ29sb3IsXG4gICAgICAgICAgICBhbGxvd0VtcHR5ID0gb3B0cy5hbGxvd0VtcHR5ICYmICFpc0lucHV0VHlwZUNvbG9yO1xuXG4gICAgICAgIGZ1bmN0aW9uIGFwcGx5T3B0aW9ucygpIHtcblxuICAgICAgICAgICAgaWYgKG9wdHMuc2hvd1BhbGV0dGVPbmx5KSB7XG4gICAgICAgICAgICAgICAgb3B0cy5zaG93UGFsZXR0ZSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRvZ2dsZUJ1dHRvbi50ZXh0KG9wdHMuc2hvd1BhbGV0dGVPbmx5ID8gb3B0cy50b2dnbGVQYWxldHRlTW9yZVRleHQgOiBvcHRzLnRvZ2dsZVBhbGV0dGVMZXNzVGV4dCk7XG5cbiAgICAgICAgICAgIGlmIChvcHRzLnBhbGV0dGUpIHtcbiAgICAgICAgICAgICAgICBwYWxldHRlID0gb3B0cy5wYWxldHRlLnNsaWNlKDApO1xuICAgICAgICAgICAgICAgIHBhbGV0dGVBcnJheSA9ICQuaXNBcnJheShwYWxldHRlWzBdKSA/IHBhbGV0dGUgOiBbcGFsZXR0ZV07XG4gICAgICAgICAgICAgICAgcGFsZXR0ZUxvb2t1cCA9IHt9O1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFsZXR0ZUFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcGFsZXR0ZUFycmF5W2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmdiID0gdGlueWNvbG9yKHBhbGV0dGVBcnJheVtpXVtqXSkudG9SZ2JTdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhbGV0dGVMb29rdXBbcmdiXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnRhaW5lci50b2dnbGVDbGFzcyhcInNwLWZsYXRcIiwgZmxhdCk7XG4gICAgICAgICAgICBjb250YWluZXIudG9nZ2xlQ2xhc3MoXCJzcC1pbnB1dC1kaXNhYmxlZFwiLCAhb3B0cy5zaG93SW5wdXQpO1xuICAgICAgICAgICAgY29udGFpbmVyLnRvZ2dsZUNsYXNzKFwic3AtYWxwaGEtZW5hYmxlZFwiLCBvcHRzLnNob3dBbHBoYSk7XG4gICAgICAgICAgICBjb250YWluZXIudG9nZ2xlQ2xhc3MoXCJzcC1jbGVhci1lbmFibGVkXCIsIGFsbG93RW1wdHkpO1xuICAgICAgICAgICAgY29udGFpbmVyLnRvZ2dsZUNsYXNzKFwic3AtYnV0dG9ucy1kaXNhYmxlZFwiLCAhb3B0cy5zaG93QnV0dG9ucyk7XG4gICAgICAgICAgICBjb250YWluZXIudG9nZ2xlQ2xhc3MoXCJzcC1wYWxldHRlLWJ1dHRvbnMtZGlzYWJsZWRcIiwgIW9wdHMudG9nZ2xlUGFsZXR0ZU9ubHkpO1xuICAgICAgICAgICAgY29udGFpbmVyLnRvZ2dsZUNsYXNzKFwic3AtcGFsZXR0ZS1kaXNhYmxlZFwiLCAhb3B0cy5zaG93UGFsZXR0ZSk7XG4gICAgICAgICAgICBjb250YWluZXIudG9nZ2xlQ2xhc3MoXCJzcC1wYWxldHRlLW9ubHlcIiwgb3B0cy5zaG93UGFsZXR0ZU9ubHkpO1xuICAgICAgICAgICAgY29udGFpbmVyLnRvZ2dsZUNsYXNzKFwic3AtaW5pdGlhbC1kaXNhYmxlZFwiLCAhb3B0cy5zaG93SW5pdGlhbCk7XG4gICAgICAgICAgICBjb250YWluZXIuYWRkQ2xhc3Mob3B0cy5jbGFzc05hbWUpLmFkZENsYXNzKG9wdHMuY29udGFpbmVyQ2xhc3NOYW1lKTtcblxuICAgICAgICAgICAgcmVmbG93KCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xuXG4gICAgICAgICAgICBpZiAoSUUpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuZmluZChcIio6bm90KGlucHV0KVwiKS5hdHRyKFwidW5zZWxlY3RhYmxlXCIsIFwib25cIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGFwcGx5T3B0aW9ucygpO1xuXG4gICAgICAgICAgICBpZiAoc2hvdWxkUmVwbGFjZSkge1xuICAgICAgICAgICAgICAgIGJvdW5kRWxlbWVudC5hZnRlcihyZXBsYWNlcikuaGlkZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWFsbG93RW1wdHkpIHtcbiAgICAgICAgICAgICAgICBjbGVhckJ1dHRvbi5oaWRlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChmbGF0KSB7XG4gICAgICAgICAgICAgICAgYm91bmRFbGVtZW50LmFmdGVyKGNvbnRhaW5lcikuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgYXBwZW5kVG8gPSBvcHRzLmFwcGVuZFRvID09PSBcInBhcmVudFwiID8gYm91bmRFbGVtZW50LnBhcmVudCgpIDogJChvcHRzLmFwcGVuZFRvKTtcbiAgICAgICAgICAgICAgICBpZiAoYXBwZW5kVG8ubGVuZ3RoICE9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGFwcGVuZFRvID0gJChcImJvZHlcIik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYXBwZW5kVG8uYXBwZW5kKGNvbnRhaW5lcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHVwZGF0ZVNlbGVjdGlvblBhbGV0dGVGcm9tU3RvcmFnZSgpO1xuXG4gICAgICAgICAgICBvZmZzZXRFbGVtZW50LmJpbmQoXCJjbGljay5zcGVjdHJ1bSB0b3VjaHN0YXJ0LnNwZWN0cnVtXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFkaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICB0b2dnbGUoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCEkKGUudGFyZ2V0KS5pcyhcImlucHV0XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYoYm91bmRFbGVtZW50LmlzKFwiOmRpc2FibGVkXCIpIHx8IChvcHRzLmRpc2FibGVkID09PSB0cnVlKSkge1xuICAgICAgICAgICAgICAgIGRpc2FibGUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gUHJldmVudCBjbGlja3MgZnJvbSBidWJibGluZyB1cCB0byBkb2N1bWVudC4gIFRoaXMgd291bGQgY2F1c2UgaXQgdG8gYmUgaGlkZGVuLlxuICAgICAgICAgICAgY29udGFpbmVyLmNsaWNrKHN0b3BQcm9wYWdhdGlvbik7XG5cbiAgICAgICAgICAgIC8vIEhhbmRsZSB1c2VyIHR5cGVkIGlucHV0XG4gICAgICAgICAgICB0ZXh0SW5wdXQuY2hhbmdlKHNldEZyb21UZXh0SW5wdXQpO1xuICAgICAgICAgICAgdGV4dElucHV0LmJpbmQoXCJwYXN0ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChzZXRGcm9tVGV4dElucHV0LCAxKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGV4dElucHV0LmtleWRvd24oZnVuY3Rpb24gKGUpIHsgaWYgKGUua2V5Q29kZSA9PSAxMykgeyBzZXRGcm9tVGV4dElucHV0KCk7IH0gfSk7XG5cbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvbi50ZXh0KG9wdHMuY2FuY2VsVGV4dCk7XG4gICAgICAgICAgICBjYW5jZWxCdXR0b24uYmluZChcImNsaWNrLnNwZWN0cnVtXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgcmV2ZXJ0KCk7XG4gICAgICAgICAgICAgICAgaGlkZSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNsZWFyQnV0dG9uLmF0dHIoXCJ0aXRsZVwiLCBvcHRzLmNsZWFyVGV4dCk7XG4gICAgICAgICAgICBjbGVhckJ1dHRvbi5iaW5kKFwiY2xpY2suc3BlY3RydW1cIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBpc0VtcHR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBtb3ZlKCk7XG5cbiAgICAgICAgICAgICAgICBpZihmbGF0KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vZm9yIHRoZSBmbGF0IHN0eWxlLCB0aGlzIGlzIGEgY2hhbmdlIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZU9yaWdpbmFsSW5wdXQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNob29zZUJ1dHRvbi50ZXh0KG9wdHMuY2hvb3NlVGV4dCk7XG4gICAgICAgICAgICBjaG9vc2VCdXR0b24uYmluZChcImNsaWNrLnNwZWN0cnVtXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoSUUgJiYgdGV4dElucHV0LmlzKFwiOmZvY3VzXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHRJbnB1dC50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZU9yaWdpbmFsSW5wdXQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdG9nZ2xlQnV0dG9uLnRleHQob3B0cy5zaG93UGFsZXR0ZU9ubHkgPyBvcHRzLnRvZ2dsZVBhbGV0dGVNb3JlVGV4dCA6IG9wdHMudG9nZ2xlUGFsZXR0ZUxlc3NUZXh0KTtcbiAgICAgICAgICAgIHRvZ2dsZUJ1dHRvbi5iaW5kKFwiY2xpY2suc3BlY3RydW1cIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIG9wdHMuc2hvd1BhbGV0dGVPbmx5ID0gIW9wdHMuc2hvd1BhbGV0dGVPbmx5O1xuXG4gICAgICAgICAgICAgICAgLy8gVG8gbWFrZSBzdXJlIHRoZSBQaWNrZXIgYXJlYSBpcyBkcmF3biBvbiB0aGUgcmlnaHQsIG5leHQgdG8gdGhlXG4gICAgICAgICAgICAgICAgLy8gUGFsZXR0ZSBhcmVhIChhbmQgbm90IGJlbG93IHRoZSBwYWxldHRlKSwgZmlyc3QgbW92ZSB0aGUgUGFsZXR0ZVxuICAgICAgICAgICAgICAgIC8vIHRvIHRoZSBsZWZ0IHRvIG1ha2Ugc3BhY2UgZm9yIHRoZSBwaWNrZXIsIHBsdXMgNXB4IGV4dHJhLlxuICAgICAgICAgICAgICAgIC8vIFRoZSAnYXBwbHlPcHRpb25zJyBmdW5jdGlvbiBwdXRzIHRoZSB3aG9sZSBjb250YWluZXIgYmFjayBpbnRvIHBsYWNlXG4gICAgICAgICAgICAgICAgLy8gYW5kIHRha2VzIGNhcmUgb2YgdGhlIGJ1dHRvbi10ZXh0IGFuZCB0aGUgc3AtcGFsZXR0ZS1vbmx5IENTUyBjbGFzcy5cbiAgICAgICAgICAgICAgICBpZiAoIW9wdHMuc2hvd1BhbGV0dGVPbmx5ICYmICFmbGF0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5jc3MoJ2xlZnQnLCAnLT0nICsgKHBpY2tlckNvbnRhaW5lci5vdXRlcldpZHRoKHRydWUpICsgNSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhcHBseU9wdGlvbnMoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBkcmFnZ2FibGUoYWxwaGFTbGlkZXIsIGZ1bmN0aW9uIChkcmFnWCwgZHJhZ1ksIGUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50QWxwaGEgPSAoZHJhZ1ggLyBhbHBoYVdpZHRoKTtcbiAgICAgICAgICAgICAgICBpc0VtcHR5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKGUuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEFscGhhID0gTWF0aC5yb3VuZChjdXJyZW50QWxwaGEgKiAxMCkgLyAxMDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBtb3ZlKCk7XG4gICAgICAgICAgICB9LCBkcmFnU3RhcnQsIGRyYWdTdG9wKTtcblxuICAgICAgICAgICAgZHJhZ2dhYmxlKHNsaWRlciwgZnVuY3Rpb24gKGRyYWdYLCBkcmFnWSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRIdWUgPSBwYXJzZUZsb2F0KGRyYWdZIC8gc2xpZGVIZWlnaHQpO1xuICAgICAgICAgICAgICAgIGlzRW1wdHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoIW9wdHMuc2hvd0FscGhhKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRBbHBoYSA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG1vdmUoKTtcbiAgICAgICAgICAgIH0sIGRyYWdTdGFydCwgZHJhZ1N0b3ApO1xuXG4gICAgICAgICAgICBkcmFnZ2FibGUoZHJhZ2dlciwgZnVuY3Rpb24gKGRyYWdYLCBkcmFnWSwgZSkge1xuXG4gICAgICAgICAgICAgICAgLy8gc2hpZnQrZHJhZyBzaG91bGQgc25hcCB0aGUgbW92ZW1lbnQgdG8gZWl0aGVyIHRoZSB4IG9yIHkgYXhpcy5cbiAgICAgICAgICAgICAgICBpZiAoIWUuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hpZnRNb3ZlbWVudERpcmVjdGlvbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCFzaGlmdE1vdmVtZW50RGlyZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvbGREcmFnWCA9IGN1cnJlbnRTYXR1cmF0aW9uICogZHJhZ1dpZHRoO1xuICAgICAgICAgICAgICAgICAgICB2YXIgb2xkRHJhZ1kgPSBkcmFnSGVpZ2h0IC0gKGN1cnJlbnRWYWx1ZSAqIGRyYWdIZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZnVydGhlckZyb21YID0gTWF0aC5hYnMoZHJhZ1ggLSBvbGREcmFnWCkgPiBNYXRoLmFicyhkcmFnWSAtIG9sZERyYWdZKTtcblxuICAgICAgICAgICAgICAgICAgICBzaGlmdE1vdmVtZW50RGlyZWN0aW9uID0gZnVydGhlckZyb21YID8gXCJ4XCIgOiBcInlcIjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgc2V0U2F0dXJhdGlvbiA9ICFzaGlmdE1vdmVtZW50RGlyZWN0aW9uIHx8IHNoaWZ0TW92ZW1lbnREaXJlY3Rpb24gPT09IFwieFwiO1xuICAgICAgICAgICAgICAgIHZhciBzZXRWYWx1ZSA9ICFzaGlmdE1vdmVtZW50RGlyZWN0aW9uIHx8IHNoaWZ0TW92ZW1lbnREaXJlY3Rpb24gPT09IFwieVwiO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNldFNhdHVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFNhdHVyYXRpb24gPSBwYXJzZUZsb2F0KGRyYWdYIC8gZHJhZ1dpZHRoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNldFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRWYWx1ZSA9IHBhcnNlRmxvYXQoKGRyYWdIZWlnaHQgLSBkcmFnWSkgLyBkcmFnSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpc0VtcHR5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKCFvcHRzLnNob3dBbHBoYSkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50QWxwaGEgPSAxO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG1vdmUoKTtcblxuICAgICAgICAgICAgfSwgZHJhZ1N0YXJ0LCBkcmFnU3RvcCk7XG5cbiAgICAgICAgICAgIGlmICghIWluaXRpYWxDb2xvcikge1xuICAgICAgICAgICAgICAgIHNldChpbml0aWFsQ29sb3IpO1xuXG4gICAgICAgICAgICAgICAgLy8gSW4gY2FzZSBjb2xvciB3YXMgYmxhY2sgLSB1cGRhdGUgdGhlIHByZXZpZXcgVUkgYW5kIHNldCB0aGUgZm9ybWF0XG4gICAgICAgICAgICAgICAgLy8gc2luY2UgdGhlIHNldCBmdW5jdGlvbiB3aWxsIG5vdCBydW4gKGRlZmF1bHQgY29sb3IgaXMgYmxhY2spLlxuICAgICAgICAgICAgICAgIHVwZGF0ZVVJKCk7XG4gICAgICAgICAgICAgICAgY3VycmVudFByZWZlcnJlZEZvcm1hdCA9IG9wdHMucHJlZmVycmVkRm9ybWF0IHx8IHRpbnljb2xvcihpbml0aWFsQ29sb3IpLmZvcm1hdDtcblxuICAgICAgICAgICAgICAgIGFkZENvbG9yVG9TZWxlY3Rpb25QYWxldHRlKGluaXRpYWxDb2xvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVVSSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZmxhdCkge1xuICAgICAgICAgICAgICAgIHNob3coKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gcGFsZXR0ZUVsZW1lbnRDbGljayhlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGUuZGF0YSAmJiBlLmRhdGEuaWdub3JlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldCgkKGUudGFyZ2V0KS5jbG9zZXN0KFwiLnNwLXRodW1iLWVsXCIpLmRhdGEoXCJjb2xvclwiKSk7XG4gICAgICAgICAgICAgICAgICAgIG1vdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNldCgkKGUudGFyZ2V0KS5jbG9zZXN0KFwiLnNwLXRodW1iLWVsXCIpLmRhdGEoXCJjb2xvclwiKSk7XG4gICAgICAgICAgICAgICAgICAgIG1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlT3JpZ2luYWxJbnB1dCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMuaGlkZUFmdGVyUGFsZXR0ZVNlbGVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgIGhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHBhbGV0dGVFdmVudCA9IElFID8gXCJtb3VzZWRvd24uc3BlY3RydW1cIiA6IFwiY2xpY2suc3BlY3RydW0gdG91Y2hzdGFydC5zcGVjdHJ1bVwiO1xuICAgICAgICAgICAgcGFsZXR0ZUNvbnRhaW5lci5kZWxlZ2F0ZShcIi5zcC10aHVtYi1lbFwiLCBwYWxldHRlRXZlbnQsIHBhbGV0dGVFbGVtZW50Q2xpY2spO1xuICAgICAgICAgICAgaW5pdGlhbENvbG9yQ29udGFpbmVyLmRlbGVnYXRlKFwiLnNwLXRodW1iLWVsOm50aC1jaGlsZCgxKVwiLCBwYWxldHRlRXZlbnQsIHsgaWdub3JlOiB0cnVlIH0sIHBhbGV0dGVFbGVtZW50Q2xpY2spO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlU2VsZWN0aW9uUGFsZXR0ZUZyb21TdG9yYWdlKCkge1xuXG4gICAgICAgICAgICBpZiAobG9jYWxTdG9yYWdlS2V5ICYmIHdpbmRvdy5sb2NhbFN0b3JhZ2UpIHtcblxuICAgICAgICAgICAgICAgIC8vIE1pZ3JhdGUgb2xkIHBhbGV0dGVzIG92ZXIgdG8gbmV3IGZvcm1hdC4gIE1heSB3YW50IHRvIHJlbW92ZSB0aGlzIGV2ZW50dWFsbHkuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9sZFBhbGV0dGUgPSB3aW5kb3cubG9jYWxTdG9yYWdlW2xvY2FsU3RvcmFnZUtleV0uc3BsaXQoXCIsI1wiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9sZFBhbGV0dGUubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHdpbmRvdy5sb2NhbFN0b3JhZ2VbbG9jYWxTdG9yYWdlS2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChvbGRQYWxldHRlLCBmdW5jdGlvbihpLCBjKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZENvbG9yVG9TZWxlY3Rpb25QYWxldHRlKGMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2goZSkgeyB9XG5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb25QYWxldHRlID0gd2luZG93LmxvY2FsU3RvcmFnZVtsb2NhbFN0b3JhZ2VLZXldLnNwbGl0KFwiO1wiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHsgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkQ29sb3JUb1NlbGVjdGlvblBhbGV0dGUoY29sb3IpIHtcbiAgICAgICAgICAgIGlmIChzaG93U2VsZWN0aW9uUGFsZXR0ZSkge1xuICAgICAgICAgICAgICAgIHZhciByZ2IgPSB0aW55Y29sb3IoY29sb3IpLnRvUmdiU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFwYWxldHRlTG9va3VwW3JnYl0gJiYgJC5pbkFycmF5KHJnYiwgc2VsZWN0aW9uUGFsZXR0ZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvblBhbGV0dGUucHVzaChyZ2IpO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZShzZWxlY3Rpb25QYWxldHRlLmxlbmd0aCA+IG1heFNlbGVjdGlvblNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvblBhbGV0dGUuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChsb2NhbFN0b3JhZ2VLZXkgJiYgd2luZG93LmxvY2FsU3RvcmFnZSkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZVtsb2NhbFN0b3JhZ2VLZXldID0gc2VsZWN0aW9uUGFsZXR0ZS5qb2luKFwiO1wiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaChlKSB7IH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXRVbmlxdWVTZWxlY3Rpb25QYWxldHRlKCkge1xuICAgICAgICAgICAgdmFyIHVuaXF1ZSA9IFtdO1xuICAgICAgICAgICAgaWYgKG9wdHMuc2hvd1BhbGV0dGUpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlbGVjdGlvblBhbGV0dGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJnYiA9IHRpbnljb2xvcihzZWxlY3Rpb25QYWxldHRlW2ldKS50b1JnYlN0cmluZygpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghcGFsZXR0ZUxvb2t1cFtyZ2JdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1bmlxdWUucHVzaChzZWxlY3Rpb25QYWxldHRlW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHVuaXF1ZS5yZXZlcnNlKCkuc2xpY2UoMCwgb3B0cy5tYXhTZWxlY3Rpb25TaXplKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGRyYXdQYWxldHRlKCkge1xuXG4gICAgICAgICAgICB2YXIgY3VycmVudENvbG9yID0gZ2V0KCk7XG5cbiAgICAgICAgICAgIHZhciBodG1sID0gJC5tYXAocGFsZXR0ZUFycmF5LCBmdW5jdGlvbiAocGFsZXR0ZSwgaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYWxldHRlVGVtcGxhdGUocGFsZXR0ZSwgY3VycmVudENvbG9yLCBcInNwLXBhbGV0dGUtcm93IHNwLXBhbGV0dGUtcm93LVwiICsgaSwgb3B0cyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdXBkYXRlU2VsZWN0aW9uUGFsZXR0ZUZyb21TdG9yYWdlKCk7XG5cbiAgICAgICAgICAgIGlmIChzZWxlY3Rpb25QYWxldHRlKSB7XG4gICAgICAgICAgICAgICAgaHRtbC5wdXNoKHBhbGV0dGVUZW1wbGF0ZShnZXRVbmlxdWVTZWxlY3Rpb25QYWxldHRlKCksIGN1cnJlbnRDb2xvciwgXCJzcC1wYWxldHRlLXJvdyBzcC1wYWxldHRlLXJvdy1zZWxlY3Rpb25cIiwgb3B0cykpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwYWxldHRlQ29udGFpbmVyLmh0bWwoaHRtbC5qb2luKFwiXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGRyYXdJbml0aWFsKCkge1xuICAgICAgICAgICAgaWYgKG9wdHMuc2hvd0luaXRpYWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5pdGlhbCA9IGNvbG9yT25TaG93O1xuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50ID0gZ2V0KCk7XG4gICAgICAgICAgICAgICAgaW5pdGlhbENvbG9yQ29udGFpbmVyLmh0bWwocGFsZXR0ZVRlbXBsYXRlKFtpbml0aWFsLCBjdXJyZW50XSwgY3VycmVudCwgXCJzcC1wYWxldHRlLXJvdy1pbml0aWFsXCIsIG9wdHMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGRyYWdTdGFydCgpIHtcbiAgICAgICAgICAgIGlmIChkcmFnSGVpZ2h0IDw9IDAgfHwgZHJhZ1dpZHRoIDw9IDAgfHwgc2xpZGVIZWlnaHQgPD0gMCkge1xuICAgICAgICAgICAgICAgIHJlZmxvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaXNEcmFnZ2luZyA9IHRydWU7XG4gICAgICAgICAgICBjb250YWluZXIuYWRkQ2xhc3MoZHJhZ2dpbmdDbGFzcyk7XG4gICAgICAgICAgICBzaGlmdE1vdmVtZW50RGlyZWN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgIGJvdW5kRWxlbWVudC50cmlnZ2VyKCdkcmFnc3RhcnQuc3BlY3RydW0nLCBbIGdldCgpIF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZHJhZ1N0b3AoKSB7XG4gICAgICAgICAgICBpc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgICAgICBjb250YWluZXIucmVtb3ZlQ2xhc3MoZHJhZ2dpbmdDbGFzcyk7XG4gICAgICAgICAgICBib3VuZEVsZW1lbnQudHJpZ2dlcignZHJhZ3N0b3Auc3BlY3RydW0nLCBbIGdldCgpIF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc2V0RnJvbVRleHRJbnB1dCgpIHtcblxuICAgICAgICAgICAgdmFyIHZhbHVlID0gdGV4dElucHV0LnZhbCgpO1xuXG4gICAgICAgICAgICBpZiAoKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSBcIlwiKSAmJiBhbGxvd0VtcHR5KSB7XG4gICAgICAgICAgICAgICAgc2V0KG51bGwpO1xuICAgICAgICAgICAgICAgIHVwZGF0ZU9yaWdpbmFsSW5wdXQodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgdGlueSA9IHRpbnljb2xvcih2YWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKHRpbnkuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldCh0aW55KTtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlT3JpZ2luYWxJbnB1dCh0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHRJbnB1dC5hZGRDbGFzcyhcInNwLXZhbGlkYXRpb24tZXJyb3JcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gdG9nZ2xlKCkge1xuICAgICAgICAgICAgaWYgKHZpc2libGUpIHtcbiAgICAgICAgICAgICAgICBoaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzaG93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzaG93KCkge1xuICAgICAgICAgICAgdmFyIGV2ZW50ID0gJC5FdmVudCgnYmVmb3JlU2hvdy5zcGVjdHJ1bScpO1xuXG4gICAgICAgICAgICBpZiAodmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIHJlZmxvdygpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYm91bmRFbGVtZW50LnRyaWdnZXIoZXZlbnQsIFsgZ2V0KCkgXSk7XG5cbiAgICAgICAgICAgIGlmIChjYWxsYmFja3MuYmVmb3JlU2hvdyhnZXQoKSkgPT09IGZhbHNlIHx8IGV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBoaWRlQWxsKCk7XG4gICAgICAgICAgICB2aXNpYmxlID0gdHJ1ZTtcblxuICAgICAgICAgICAgJChkb2MpLmJpbmQoXCJrZXlkb3duLnNwZWN0cnVtXCIsIG9ua2V5ZG93bik7XG4gICAgICAgICAgICAkKGRvYykuYmluZChcImNsaWNrLnNwZWN0cnVtXCIsIGNsaWNrb3V0KTtcbiAgICAgICAgICAgICQod2luZG93KS5iaW5kKFwicmVzaXplLnNwZWN0cnVtXCIsIHJlc2l6ZSk7XG4gICAgICAgICAgICByZXBsYWNlci5hZGRDbGFzcyhcInNwLWFjdGl2ZVwiKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5yZW1vdmVDbGFzcyhcInNwLWhpZGRlblwiKTtcblxuICAgICAgICAgICAgcmVmbG93KCk7XG4gICAgICAgICAgICB1cGRhdGVVSSgpO1xuXG4gICAgICAgICAgICBjb2xvck9uU2hvdyA9IGdldCgpO1xuXG4gICAgICAgICAgICBkcmF3SW5pdGlhbCgpO1xuICAgICAgICAgICAgY2FsbGJhY2tzLnNob3coY29sb3JPblNob3cpO1xuICAgICAgICAgICAgYm91bmRFbGVtZW50LnRyaWdnZXIoJ3Nob3cuc3BlY3RydW0nLCBbIGNvbG9yT25TaG93IF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gb25rZXlkb3duKGUpIHtcbiAgICAgICAgICAgIC8vIENsb3NlIG9uIEVTQ1xuICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMjcpIHtcbiAgICAgICAgICAgICAgICBoaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBjbGlja291dChlKSB7XG4gICAgICAgICAgICAvLyBSZXR1cm4gb24gcmlnaHQgY2xpY2suXG4gICAgICAgICAgICBpZiAoZS5idXR0b24gPT0gMikgeyByZXR1cm47IH1cblxuICAgICAgICAgICAgLy8gSWYgYSBkcmFnIGV2ZW50IHdhcyBoYXBwZW5pbmcgZHVyaW5nIHRoZSBtb3VzZXVwLCBkb24ndCBoaWRlXG4gICAgICAgICAgICAvLyBvbiBjbGljay5cbiAgICAgICAgICAgIGlmIChpc0RyYWdnaW5nKSB7IHJldHVybjsgfVxuXG4gICAgICAgICAgICBpZiAoY2xpY2tvdXRGaXJlc0NoYW5nZSkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZU9yaWdpbmFsSW5wdXQodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXZlcnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGhpZGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGhpZGUoKSB7XG4gICAgICAgICAgICAvLyBSZXR1cm4gaWYgaGlkaW5nIGlzIHVubmVjZXNzYXJ5XG4gICAgICAgICAgICBpZiAoIXZpc2libGUgfHwgZmxhdCkgeyByZXR1cm47IH1cbiAgICAgICAgICAgIHZpc2libGUgPSBmYWxzZTtcblxuICAgICAgICAgICAgJChkb2MpLnVuYmluZChcImtleWRvd24uc3BlY3RydW1cIiwgb25rZXlkb3duKTtcbiAgICAgICAgICAgICQoZG9jKS51bmJpbmQoXCJjbGljay5zcGVjdHJ1bVwiLCBjbGlja291dCk7XG4gICAgICAgICAgICAkKHdpbmRvdykudW5iaW5kKFwicmVzaXplLnNwZWN0cnVtXCIsIHJlc2l6ZSk7XG5cbiAgICAgICAgICAgIHJlcGxhY2VyLnJlbW92ZUNsYXNzKFwic3AtYWN0aXZlXCIpO1xuICAgICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKFwic3AtaGlkZGVuXCIpO1xuXG4gICAgICAgICAgICBjYWxsYmFja3MuaGlkZShnZXQoKSk7XG4gICAgICAgICAgICBib3VuZEVsZW1lbnQudHJpZ2dlcignaGlkZS5zcGVjdHJ1bScsIFsgZ2V0KCkgXSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiByZXZlcnQoKSB7XG4gICAgICAgICAgICBzZXQoY29sb3JPblNob3csIHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc2V0KGNvbG9yLCBpZ25vcmVGb3JtYXRDaGFuZ2UpIHtcbiAgICAgICAgICAgIGlmICh0aW55Y29sb3IuZXF1YWxzKGNvbG9yLCBnZXQoKSkpIHtcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgVUkganVzdCBpbiBjYXNlIGEgdmFsaWRhdGlvbiBlcnJvciBuZWVkc1xuICAgICAgICAgICAgICAgIC8vIHRvIGJlIGNsZWFyZWQuXG4gICAgICAgICAgICAgICAgdXBkYXRlVUkoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBuZXdDb2xvciwgbmV3SHN2O1xuICAgICAgICAgICAgaWYgKCFjb2xvciAmJiBhbGxvd0VtcHR5KSB7XG4gICAgICAgICAgICAgICAgaXNFbXB0eSA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlzRW1wdHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBuZXdDb2xvciA9IHRpbnljb2xvcihjb2xvcik7XG4gICAgICAgICAgICAgICAgbmV3SHN2ID0gbmV3Q29sb3IudG9Ic3YoKTtcblxuICAgICAgICAgICAgICAgIGN1cnJlbnRIdWUgPSAobmV3SHN2LmggJSAzNjApIC8gMzYwO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRTYXR1cmF0aW9uID0gbmV3SHN2LnM7XG4gICAgICAgICAgICAgICAgY3VycmVudFZhbHVlID0gbmV3SHN2LnY7XG4gICAgICAgICAgICAgICAgY3VycmVudEFscGhhID0gbmV3SHN2LmE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB1cGRhdGVVSSgpO1xuXG4gICAgICAgICAgICBpZiAobmV3Q29sb3IgJiYgbmV3Q29sb3IuaXNWYWxpZCgpICYmICFpZ25vcmVGb3JtYXRDaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJlZmVycmVkRm9ybWF0ID0gb3B0cy5wcmVmZXJyZWRGb3JtYXQgfHwgbmV3Q29sb3IuZ2V0Rm9ybWF0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXQob3B0cykge1xuICAgICAgICAgICAgb3B0cyA9IG9wdHMgfHwgeyB9O1xuXG4gICAgICAgICAgICBpZiAoYWxsb3dFbXB0eSAmJiBpc0VtcHR5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aW55Y29sb3IuZnJvbVJhdGlvKHtcbiAgICAgICAgICAgICAgICBoOiBjdXJyZW50SHVlLFxuICAgICAgICAgICAgICAgIHM6IGN1cnJlbnRTYXR1cmF0aW9uLFxuICAgICAgICAgICAgICAgIHY6IGN1cnJlbnRWYWx1ZSxcbiAgICAgICAgICAgICAgICBhOiBNYXRoLnJvdW5kKGN1cnJlbnRBbHBoYSAqIDEwMCkgLyAxMDBcbiAgICAgICAgICAgIH0sIHsgZm9ybWF0OiBvcHRzLmZvcm1hdCB8fCBjdXJyZW50UHJlZmVycmVkRm9ybWF0IH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaXNWYWxpZCgpIHtcbiAgICAgICAgICAgIHJldHVybiAhdGV4dElucHV0Lmhhc0NsYXNzKFwic3AtdmFsaWRhdGlvbi1lcnJvclwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG1vdmUoKSB7XG4gICAgICAgICAgICB1cGRhdGVVSSgpO1xuXG4gICAgICAgICAgICBjYWxsYmFja3MubW92ZShnZXQoKSk7XG4gICAgICAgICAgICBib3VuZEVsZW1lbnQudHJpZ2dlcignbW92ZS5zcGVjdHJ1bScsIFsgZ2V0KCkgXSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVVSSgpIHtcblxuICAgICAgICAgICAgdGV4dElucHV0LnJlbW92ZUNsYXNzKFwic3AtdmFsaWRhdGlvbi1lcnJvclwiKTtcblxuICAgICAgICAgICAgdXBkYXRlSGVscGVyTG9jYXRpb25zKCk7XG5cbiAgICAgICAgICAgIC8vIFVwZGF0ZSBkcmFnZ2VyIGJhY2tncm91bmQgY29sb3IgKGdyYWRpZW50cyB0YWtlIGNhcmUgb2Ygc2F0dXJhdGlvbiBhbmQgdmFsdWUpLlxuICAgICAgICAgICAgdmFyIGZsYXRDb2xvciA9IHRpbnljb2xvci5mcm9tUmF0aW8oeyBoOiBjdXJyZW50SHVlLCBzOiAxLCB2OiAxIH0pO1xuICAgICAgICAgICAgZHJhZ2dlci5jc3MoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIGZsYXRDb2xvci50b0hleFN0cmluZygpKTtcblxuICAgICAgICAgICAgLy8gR2V0IGEgZm9ybWF0IHRoYXQgYWxwaGEgd2lsbCBiZSBpbmNsdWRlZCBpbiAoaGV4IGFuZCBuYW1lcyBpZ25vcmUgYWxwaGEpXG4gICAgICAgICAgICB2YXIgZm9ybWF0ID0gY3VycmVudFByZWZlcnJlZEZvcm1hdDtcbiAgICAgICAgICAgIGlmIChjdXJyZW50QWxwaGEgPCAxICYmICEoY3VycmVudEFscGhhID09PSAwICYmIGZvcm1hdCA9PT0gXCJuYW1lXCIpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZvcm1hdCA9PT0gXCJoZXhcIiB8fCBmb3JtYXQgPT09IFwiaGV4M1wiIHx8IGZvcm1hdCA9PT0gXCJoZXg2XCIgfHwgZm9ybWF0ID09PSBcIm5hbWVcIikge1xuICAgICAgICAgICAgICAgICAgICBmb3JtYXQgPSBcInJnYlwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHJlYWxDb2xvciA9IGdldCh7IGZvcm1hdDogZm9ybWF0IH0pLFxuICAgICAgICAgICAgICAgIGRpc3BsYXlDb2xvciA9ICcnO1xuXG4gICAgICAgICAgICAgLy9yZXNldCBiYWNrZ3JvdW5kIGluZm8gZm9yIHByZXZpZXcgZWxlbWVudFxuICAgICAgICAgICAgcHJldmlld0VsZW1lbnQucmVtb3ZlQ2xhc3MoXCJzcC1jbGVhci1kaXNwbGF5XCIpO1xuICAgICAgICAgICAgcHJldmlld0VsZW1lbnQuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJ3RyYW5zcGFyZW50Jyk7XG5cbiAgICAgICAgICAgIGlmICghcmVhbENvbG9yICYmIGFsbG93RW1wdHkpIHtcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIHJlcGxhY2VkIGVsZW1lbnRzIGJhY2tncm91bmQgd2l0aCBpY29uIGluZGljYXRpbmcgbm8gY29sb3Igc2VsZWN0aW9uXG4gICAgICAgICAgICAgICAgcHJldmlld0VsZW1lbnQuYWRkQ2xhc3MoXCJzcC1jbGVhci1kaXNwbGF5XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlYWxIZXggPSByZWFsQ29sb3IudG9IZXhTdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgcmVhbFJnYiA9IHJlYWxDb2xvci50b1JnYlN0cmluZygpO1xuXG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSByZXBsYWNlZCBlbGVtZW50cyBiYWNrZ3JvdW5kIGNvbG9yICh3aXRoIGFjdHVhbCBzZWxlY3RlZCBjb2xvcilcbiAgICAgICAgICAgICAgICBpZiAocmdiYVN1cHBvcnQgfHwgcmVhbENvbG9yLmFscGhhID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZpZXdFbGVtZW50LmNzcyhcImJhY2tncm91bmQtY29sb3JcIiwgcmVhbFJnYik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwcmV2aWV3RWxlbWVudC5jc3MoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwidHJhbnNwYXJlbnRcIik7XG4gICAgICAgICAgICAgICAgICAgIHByZXZpZXdFbGVtZW50LmNzcyhcImZpbHRlclwiLCByZWFsQ29sb3IudG9GaWx0ZXIoKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG9wdHMuc2hvd0FscGhhKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZ2IgPSByZWFsQ29sb3IudG9SZ2IoKTtcbiAgICAgICAgICAgICAgICAgICAgcmdiLmEgPSAwO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVhbEFscGhhID0gdGlueWNvbG9yKHJnYikudG9SZ2JTdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGdyYWRpZW50ID0gXCJsaW5lYXItZ3JhZGllbnQobGVmdCwgXCIgKyByZWFsQWxwaGEgKyBcIiwgXCIgKyByZWFsSGV4ICsgXCIpXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKElFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbHBoYVNsaWRlcklubmVyLmNzcyhcImZpbHRlclwiLCB0aW55Y29sb3IocmVhbEFscGhhKS50b0ZpbHRlcih7IGdyYWRpZW50VHlwZTogMSB9LCByZWFsSGV4KSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbHBoYVNsaWRlcklubmVyLmNzcyhcImJhY2tncm91bmRcIiwgXCItd2Via2l0LVwiICsgZ3JhZGllbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxwaGFTbGlkZXJJbm5lci5jc3MoXCJiYWNrZ3JvdW5kXCIsIFwiLW1vei1cIiArIGdyYWRpZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFscGhhU2xpZGVySW5uZXIuY3NzKFwiYmFja2dyb3VuZFwiLCBcIi1tcy1cIiArIGdyYWRpZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVzZSBjdXJyZW50IHN5bnRheCBncmFkaWVudCBvbiB1bnByZWZpeGVkIHByb3BlcnR5LlxuICAgICAgICAgICAgICAgICAgICAgICAgYWxwaGFTbGlkZXJJbm5lci5jc3MoXCJiYWNrZ3JvdW5kXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsIFwiICsgcmVhbEFscGhhICsgXCIsIFwiICsgcmVhbEhleCArIFwiKVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGRpc3BsYXlDb2xvciA9IHJlYWxDb2xvci50b1N0cmluZyhmb3JtYXQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIHRleHQgZW50cnkgaW5wdXQgYXMgaXQgY2hhbmdlcyBoYXBwZW5cbiAgICAgICAgICAgIGlmIChvcHRzLnNob3dJbnB1dCkge1xuICAgICAgICAgICAgICAgIHRleHRJbnB1dC52YWwoZGlzcGxheUNvbG9yKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG9wdHMuc2hvd1BhbGV0dGUpIHtcbiAgICAgICAgICAgICAgICBkcmF3UGFsZXR0ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkcmF3SW5pdGlhbCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlSGVscGVyTG9jYXRpb25zKCkge1xuICAgICAgICAgICAgdmFyIHMgPSBjdXJyZW50U2F0dXJhdGlvbjtcbiAgICAgICAgICAgIHZhciB2ID0gY3VycmVudFZhbHVlO1xuXG4gICAgICAgICAgICBpZihhbGxvd0VtcHR5ICYmIGlzRW1wdHkpIHtcbiAgICAgICAgICAgICAgICAvL2lmIHNlbGVjdGVkIGNvbG9yIGlzIGVtcHR5LCBoaWRlIHRoZSBoZWxwZXJzXG4gICAgICAgICAgICAgICAgYWxwaGFTbGlkZUhlbHBlci5oaWRlKCk7XG4gICAgICAgICAgICAgICAgc2xpZGVIZWxwZXIuaGlkZSgpO1xuICAgICAgICAgICAgICAgIGRyYWdIZWxwZXIuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy9tYWtlIHN1cmUgaGVscGVycyBhcmUgdmlzaWJsZVxuICAgICAgICAgICAgICAgIGFscGhhU2xpZGVIZWxwZXIuc2hvdygpO1xuICAgICAgICAgICAgICAgIHNsaWRlSGVscGVyLnNob3coKTtcbiAgICAgICAgICAgICAgICBkcmFnSGVscGVyLnNob3coKTtcblxuICAgICAgICAgICAgICAgIC8vIFdoZXJlIHRvIHNob3cgdGhlIGxpdHRsZSBjaXJjbGUgaW4gdGhhdCBkaXNwbGF5cyB5b3VyIGN1cnJlbnQgc2VsZWN0ZWQgY29sb3JcbiAgICAgICAgICAgICAgICB2YXIgZHJhZ1ggPSBzICogZHJhZ1dpZHRoO1xuICAgICAgICAgICAgICAgIHZhciBkcmFnWSA9IGRyYWdIZWlnaHQgLSAodiAqIGRyYWdIZWlnaHQpO1xuICAgICAgICAgICAgICAgIGRyYWdYID0gTWF0aC5tYXgoXG4gICAgICAgICAgICAgICAgICAgIC1kcmFnSGVscGVySGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICBNYXRoLm1pbihkcmFnV2lkdGggLSBkcmFnSGVscGVySGVpZ2h0LCBkcmFnWCAtIGRyYWdIZWxwZXJIZWlnaHQpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBkcmFnWSA9IE1hdGgubWF4KFxuICAgICAgICAgICAgICAgICAgICAtZHJhZ0hlbHBlckhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5taW4oZHJhZ0hlaWdodCAtIGRyYWdIZWxwZXJIZWlnaHQsIGRyYWdZIC0gZHJhZ0hlbHBlckhlaWdodClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGRyYWdIZWxwZXIuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgXCJ0b3BcIjogZHJhZ1kgKyBcInB4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwibGVmdFwiOiBkcmFnWCArIFwicHhcIlxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdmFyIGFscGhhWCA9IGN1cnJlbnRBbHBoYSAqIGFscGhhV2lkdGg7XG4gICAgICAgICAgICAgICAgYWxwaGFTbGlkZUhlbHBlci5jc3Moe1xuICAgICAgICAgICAgICAgICAgICBcImxlZnRcIjogKGFscGhhWCAtIChhbHBoYVNsaWRlSGVscGVyV2lkdGggLyAyKSkgKyBcInB4XCJcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vIFdoZXJlIHRvIHNob3cgdGhlIGJhciB0aGF0IGRpc3BsYXlzIHlvdXIgY3VycmVudCBzZWxlY3RlZCBodWVcbiAgICAgICAgICAgICAgICB2YXIgc2xpZGVZID0gKGN1cnJlbnRIdWUpICogc2xpZGVIZWlnaHQ7XG4gICAgICAgICAgICAgICAgc2xpZGVIZWxwZXIuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgXCJ0b3BcIjogKHNsaWRlWSAtIHNsaWRlSGVscGVySGVpZ2h0KSArIFwicHhcIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlT3JpZ2luYWxJbnB1dChmaXJlQ2FsbGJhY2spIHtcbiAgICAgICAgICAgIHZhciBjb2xvciA9IGdldCgpLFxuICAgICAgICAgICAgICAgIGRpc3BsYXlDb2xvciA9ICcnLFxuICAgICAgICAgICAgICAgIGhhc0NoYW5nZWQgPSAhdGlueWNvbG9yLmVxdWFscyhjb2xvciwgY29sb3JPblNob3cpO1xuXG4gICAgICAgICAgICBpZiAoY29sb3IpIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5Q29sb3IgPSBjb2xvci50b1N0cmluZyhjdXJyZW50UHJlZmVycmVkRm9ybWF0KTtcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIHNlbGVjdGlvbiBwYWxldHRlIHdpdGggdGhlIGN1cnJlbnQgY29sb3JcbiAgICAgICAgICAgICAgICBhZGRDb2xvclRvU2VsZWN0aW9uUGFsZXR0ZShjb2xvcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc0lucHV0KSB7XG4gICAgICAgICAgICAgICAgYm91bmRFbGVtZW50LnZhbChkaXNwbGF5Q29sb3IpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZmlyZUNhbGxiYWNrICYmIGhhc0NoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFja3MuY2hhbmdlKGNvbG9yKTtcbiAgICAgICAgICAgICAgICBib3VuZEVsZW1lbnQudHJpZ2dlcignY2hhbmdlJywgWyBjb2xvciBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHJlZmxvdygpIHtcbiAgICAgICAgICAgIGlmICghdmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjsgLy8gQ2FsY3VsYXRpb25zIHdvdWxkIGJlIHVzZWxlc3MgYW5kIHdvdWxkbid0IGJlIHJlbGlhYmxlIGFueXdheXNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRyYWdXaWR0aCA9IGRyYWdnZXIud2lkdGgoKTtcbiAgICAgICAgICAgIGRyYWdIZWlnaHQgPSBkcmFnZ2VyLmhlaWdodCgpO1xuICAgICAgICAgICAgZHJhZ0hlbHBlckhlaWdodCA9IGRyYWdIZWxwZXIuaGVpZ2h0KCk7XG4gICAgICAgICAgICBzbGlkZVdpZHRoID0gc2xpZGVyLndpZHRoKCk7XG4gICAgICAgICAgICBzbGlkZUhlaWdodCA9IHNsaWRlci5oZWlnaHQoKTtcbiAgICAgICAgICAgIHNsaWRlSGVscGVySGVpZ2h0ID0gc2xpZGVIZWxwZXIuaGVpZ2h0KCk7XG4gICAgICAgICAgICBhbHBoYVdpZHRoID0gYWxwaGFTbGlkZXIud2lkdGgoKTtcbiAgICAgICAgICAgIGFscGhhU2xpZGVIZWxwZXJXaWR0aCA9IGFscGhhU2xpZGVIZWxwZXIud2lkdGgoKTtcblxuICAgICAgICAgICAgaWYgKCFmbGF0KSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmNzcyhcInBvc2l0aW9uXCIsIFwiYWJzb2x1dGVcIik7XG4gICAgICAgICAgICAgICAgaWYgKG9wdHMub2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5vZmZzZXQob3B0cy5vZmZzZXQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5vZmZzZXQoZ2V0T2Zmc2V0KGNvbnRhaW5lciwgb2Zmc2V0RWxlbWVudCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdXBkYXRlSGVscGVyTG9jYXRpb25zKCk7XG5cbiAgICAgICAgICAgIGlmIChvcHRzLnNob3dQYWxldHRlKSB7XG4gICAgICAgICAgICAgICAgZHJhd1BhbGV0dGUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYm91bmRFbGVtZW50LnRyaWdnZXIoJ3JlZmxvdy5zcGVjdHJ1bScpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgICAgIGJvdW5kRWxlbWVudC5zaG93KCk7XG4gICAgICAgICAgICBvZmZzZXRFbGVtZW50LnVuYmluZChcImNsaWNrLnNwZWN0cnVtIHRvdWNoc3RhcnQuc3BlY3RydW1cIik7XG4gICAgICAgICAgICBjb250YWluZXIucmVtb3ZlKCk7XG4gICAgICAgICAgICByZXBsYWNlci5yZW1vdmUoKTtcbiAgICAgICAgICAgIHNwZWN0cnVtc1tzcGVjdC5pZF0gPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gb3B0aW9uKG9wdGlvbk5hbWUsIG9wdGlvblZhbHVlKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9uTmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICQuZXh0ZW5kKHt9LCBvcHRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRpb25WYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdHNbb3B0aW9uTmFtZV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG9wdHNbb3B0aW9uTmFtZV0gPSBvcHRpb25WYWx1ZTtcblxuICAgICAgICAgICAgaWYgKG9wdGlvbk5hbWUgPT09IFwicHJlZmVycmVkRm9ybWF0XCIpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UHJlZmVycmVkRm9ybWF0ID0gb3B0cy5wcmVmZXJyZWRGb3JtYXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhcHBseU9wdGlvbnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGVuYWJsZSgpIHtcbiAgICAgICAgICAgIGRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgICBib3VuZEVsZW1lbnQuYXR0cihcImRpc2FibGVkXCIsIGZhbHNlKTtcbiAgICAgICAgICAgIG9mZnNldEVsZW1lbnQucmVtb3ZlQ2xhc3MoXCJzcC1kaXNhYmxlZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGRpc2FibGUoKSB7XG4gICAgICAgICAgICBoaWRlKCk7XG4gICAgICAgICAgICBkaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICBib3VuZEVsZW1lbnQuYXR0cihcImRpc2FibGVkXCIsIHRydWUpO1xuICAgICAgICAgICAgb2Zmc2V0RWxlbWVudC5hZGRDbGFzcyhcInNwLWRpc2FibGVkXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc2V0T2Zmc2V0KGNvb3JkKSB7XG4gICAgICAgICAgICBvcHRzLm9mZnNldCA9IGNvb3JkO1xuICAgICAgICAgICAgcmVmbG93KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpbml0aWFsaXplKCk7XG5cbiAgICAgICAgdmFyIHNwZWN0ID0ge1xuICAgICAgICAgICAgc2hvdzogc2hvdyxcbiAgICAgICAgICAgIGhpZGU6IGhpZGUsXG4gICAgICAgICAgICB0b2dnbGU6IHRvZ2dsZSxcbiAgICAgICAgICAgIHJlZmxvdzogcmVmbG93LFxuICAgICAgICAgICAgb3B0aW9uOiBvcHRpb24sXG4gICAgICAgICAgICBlbmFibGU6IGVuYWJsZSxcbiAgICAgICAgICAgIGRpc2FibGU6IGRpc2FibGUsXG4gICAgICAgICAgICBvZmZzZXQ6IHNldE9mZnNldCxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgICBzZXQoYyk7XG4gICAgICAgICAgICAgICAgdXBkYXRlT3JpZ2luYWxJbnB1dCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldDogZ2V0LFxuICAgICAgICAgICAgZGVzdHJveTogZGVzdHJveSxcbiAgICAgICAgICAgIGNvbnRhaW5lcjogY29udGFpbmVyXG4gICAgICAgIH07XG5cbiAgICAgICAgc3BlY3QuaWQgPSBzcGVjdHJ1bXMucHVzaChzcGVjdCkgLSAxO1xuXG4gICAgICAgIHJldHVybiBzcGVjdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIGNoZWNrT2Zmc2V0IC0gZ2V0IHRoZSBvZmZzZXQgYmVsb3cvYWJvdmUgYW5kIGxlZnQvcmlnaHQgZWxlbWVudCBkZXBlbmRpbmcgb24gc2NyZWVuIHBvc2l0aW9uXG4gICAgKiBUaGFua3MgaHR0cHM6Ly9naXRodWIuY29tL2pxdWVyeS9qcXVlcnktdWkvYmxvYi9tYXN0ZXIvdWkvanF1ZXJ5LnVpLmRhdGVwaWNrZXIuanNcbiAgICAqL1xuICAgIGZ1bmN0aW9uIGdldE9mZnNldChwaWNrZXIsIGlucHV0KSB7XG4gICAgICAgIHZhciBleHRyYVkgPSAwO1xuICAgICAgICB2YXIgZHBXaWR0aCA9IHBpY2tlci5vdXRlcldpZHRoKCk7XG4gICAgICAgIHZhciBkcEhlaWdodCA9IHBpY2tlci5vdXRlckhlaWdodCgpO1xuICAgICAgICB2YXIgaW5wdXRIZWlnaHQgPSBpbnB1dC5vdXRlckhlaWdodCgpO1xuICAgICAgICB2YXIgZG9jID0gcGlja2VyWzBdLm93bmVyRG9jdW1lbnQ7XG4gICAgICAgIHZhciBkb2NFbGVtID0gZG9jLmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgdmFyIHZpZXdXaWR0aCA9IGRvY0VsZW0uY2xpZW50V2lkdGggKyAkKGRvYykuc2Nyb2xsTGVmdCgpO1xuICAgICAgICB2YXIgdmlld0hlaWdodCA9IGRvY0VsZW0uY2xpZW50SGVpZ2h0ICsgJChkb2MpLnNjcm9sbFRvcCgpO1xuICAgICAgICB2YXIgb2Zmc2V0ID0gaW5wdXQub2Zmc2V0KCk7XG4gICAgICAgIG9mZnNldC50b3AgKz0gaW5wdXRIZWlnaHQ7XG5cbiAgICAgICAgb2Zmc2V0LmxlZnQgLT1cbiAgICAgICAgICAgIE1hdGgubWluKG9mZnNldC5sZWZ0LCAob2Zmc2V0LmxlZnQgKyBkcFdpZHRoID4gdmlld1dpZHRoICYmIHZpZXdXaWR0aCA+IGRwV2lkdGgpID9cbiAgICAgICAgICAgIE1hdGguYWJzKG9mZnNldC5sZWZ0ICsgZHBXaWR0aCAtIHZpZXdXaWR0aCkgOiAwKTtcblxuICAgICAgICBvZmZzZXQudG9wIC09XG4gICAgICAgICAgICBNYXRoLm1pbihvZmZzZXQudG9wLCAoKG9mZnNldC50b3AgKyBkcEhlaWdodCA+IHZpZXdIZWlnaHQgJiYgdmlld0hlaWdodCA+IGRwSGVpZ2h0KSA/XG4gICAgICAgICAgICBNYXRoLmFicyhkcEhlaWdodCArIGlucHV0SGVpZ2h0IC0gZXh0cmFZKSA6IGV4dHJhWSkpO1xuXG4gICAgICAgIHJldHVybiBvZmZzZXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBub29wIC0gZG8gbm90aGluZ1xuICAgICovXG4gICAgZnVuY3Rpb24gbm9vcCgpIHtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICogc3RvcFByb3BhZ2F0aW9uIC0gbWFrZXMgdGhlIGNvZGUgb25seSBkb2luZyB0aGlzIGEgbGl0dGxlIGVhc2llciB0byByZWFkIGluIGxpbmVcbiAgICAqL1xuICAgIGZ1bmN0aW9uIHN0b3BQcm9wYWdhdGlvbihlKSB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBDcmVhdGUgYSBmdW5jdGlvbiBib3VuZCB0byBhIGdpdmVuIG9iamVjdFxuICAgICogVGhhbmtzIHRvIHVuZGVyc2NvcmUuanNcbiAgICAqL1xuICAgIGZ1bmN0aW9uIGJpbmQoZnVuYywgb2JqKSB7XG4gICAgICAgIHZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbiAgICAgICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuYy5hcHBseShvYmosIGFyZ3MuY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICogTGlnaHR3ZWlnaHQgZHJhZyBoZWxwZXIuICBIYW5kbGVzIGNvbnRhaW5tZW50IHdpdGhpbiB0aGUgZWxlbWVudCwgc28gdGhhdFxuICAgICogd2hlbiBkcmFnZ2luZywgdGhlIHggaXMgd2l0aGluIFswLGVsZW1lbnQud2lkdGhdIGFuZCB5IGlzIHdpdGhpbiBbMCxlbGVtZW50LmhlaWdodF1cbiAgICAqL1xuICAgIGZ1bmN0aW9uIGRyYWdnYWJsZShlbGVtZW50LCBvbm1vdmUsIG9uc3RhcnQsIG9uc3RvcCkge1xuICAgICAgICBvbm1vdmUgPSBvbm1vdmUgfHwgZnVuY3Rpb24gKCkgeyB9O1xuICAgICAgICBvbnN0YXJ0ID0gb25zdGFydCB8fCBmdW5jdGlvbiAoKSB7IH07XG4gICAgICAgIG9uc3RvcCA9IG9uc3RvcCB8fCBmdW5jdGlvbiAoKSB7IH07XG4gICAgICAgIHZhciBkb2MgPSBkb2N1bWVudDtcbiAgICAgICAgdmFyIGRyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIHZhciBvZmZzZXQgPSB7fTtcbiAgICAgICAgdmFyIG1heEhlaWdodCA9IDA7XG4gICAgICAgIHZhciBtYXhXaWR0aCA9IDA7XG4gICAgICAgIHZhciBoYXNUb3VjaCA9ICgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpO1xuXG4gICAgICAgIHZhciBkdXJpbmdEcmFnRXZlbnRzID0ge307XG4gICAgICAgIGR1cmluZ0RyYWdFdmVudHNbXCJzZWxlY3RzdGFydFwiXSA9IHByZXZlbnQ7XG4gICAgICAgIGR1cmluZ0RyYWdFdmVudHNbXCJkcmFnc3RhcnRcIl0gPSBwcmV2ZW50O1xuICAgICAgICBkdXJpbmdEcmFnRXZlbnRzW1widG91Y2htb3ZlIG1vdXNlbW92ZVwiXSA9IG1vdmU7XG4gICAgICAgIGR1cmluZ0RyYWdFdmVudHNbXCJ0b3VjaGVuZCBtb3VzZXVwXCJdID0gc3RvcDtcblxuICAgICAgICBmdW5jdGlvbiBwcmV2ZW50KGUpIHtcbiAgICAgICAgICAgIGlmIChlLnN0b3BQcm9wYWdhdGlvbikge1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZS5wcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG1vdmUoZSkge1xuICAgICAgICAgICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICAgICAgICAgICAgLy8gTW91c2V1cCBoYXBwZW5lZCBvdXRzaWRlIG9mIHdpbmRvd1xuICAgICAgICAgICAgICAgIGlmIChJRSAmJiBkb2MuZG9jdW1lbnRNb2RlIDwgOSAmJiAhZS5idXR0b24pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0b3AoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgdDAgPSBlLm9yaWdpbmFsRXZlbnQgJiYgZS5vcmlnaW5hbEV2ZW50LnRvdWNoZXMgJiYgZS5vcmlnaW5hbEV2ZW50LnRvdWNoZXNbMF07XG4gICAgICAgICAgICAgICAgdmFyIHBhZ2VYID0gdDAgJiYgdDAucGFnZVggfHwgZS5wYWdlWDtcbiAgICAgICAgICAgICAgICB2YXIgcGFnZVkgPSB0MCAmJiB0MC5wYWdlWSB8fCBlLnBhZ2VZO1xuXG4gICAgICAgICAgICAgICAgdmFyIGRyYWdYID0gTWF0aC5tYXgoMCwgTWF0aC5taW4ocGFnZVggLSBvZmZzZXQubGVmdCwgbWF4V2lkdGgpKTtcbiAgICAgICAgICAgICAgICB2YXIgZHJhZ1kgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihwYWdlWSAtIG9mZnNldC50b3AsIG1heEhlaWdodCkpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGhhc1RvdWNoKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFN0b3Agc2Nyb2xsaW5nIGluIGlPU1xuICAgICAgICAgICAgICAgICAgICBwcmV2ZW50KGUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG9ubW92ZS5hcHBseShlbGVtZW50LCBbZHJhZ1gsIGRyYWdZLCBlXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzdGFydChlKSB7XG4gICAgICAgICAgICB2YXIgcmlnaHRjbGljayA9IChlLndoaWNoKSA/IChlLndoaWNoID09IDMpIDogKGUuYnV0dG9uID09IDIpO1xuXG4gICAgICAgICAgICBpZiAoIXJpZ2h0Y2xpY2sgJiYgIWRyYWdnaW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9uc3RhcnQuYXBwbHkoZWxlbWVudCwgYXJndW1lbnRzKSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgZHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBtYXhIZWlnaHQgPSAkKGVsZW1lbnQpLmhlaWdodCgpO1xuICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aCA9ICQoZWxlbWVudCkud2lkdGgoKTtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gJChlbGVtZW50KS5vZmZzZXQoKTtcblxuICAgICAgICAgICAgICAgICAgICAkKGRvYykuYmluZChkdXJpbmdEcmFnRXZlbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgJChkb2MuYm9keSkuYWRkQ2xhc3MoXCJzcC1kcmFnZ2luZ1wiKTtcblxuICAgICAgICAgICAgICAgICAgICBtb3ZlKGUpO1xuXG4gICAgICAgICAgICAgICAgICAgIHByZXZlbnQoZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc3RvcCgpIHtcbiAgICAgICAgICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgICAgICAgICAgICQoZG9jKS51bmJpbmQoZHVyaW5nRHJhZ0V2ZW50cyk7XG4gICAgICAgICAgICAgICAgJChkb2MuYm9keSkucmVtb3ZlQ2xhc3MoXCJzcC1kcmFnZ2luZ1wiKTtcblxuICAgICAgICAgICAgICAgIC8vIFdhaXQgYSB0aWNrIGJlZm9yZSBub3RpZnlpbmcgb2JzZXJ2ZXJzIHRvIGFsbG93IHRoZSBjbGljayBldmVudFxuICAgICAgICAgICAgICAgIC8vIHRvIGZpcmUgaW4gQ2hyb21lLlxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIG9uc3RvcC5hcHBseShlbGVtZW50LCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoZWxlbWVudCkuYmluZChcInRvdWNoc3RhcnQgbW91c2Vkb3duXCIsIHN0YXJ0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0aHJvdHRsZShmdW5jLCB3YWl0LCBkZWJvdW5jZSkge1xuICAgICAgICB2YXIgdGltZW91dDtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBjb250ZXh0ID0gdGhpcywgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgICAgIHZhciB0aHJvdHRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICAgICAgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoZGVib3VuY2UpIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgIGlmIChkZWJvdW5jZSB8fCAhdGltZW91dCkgdGltZW91dCA9IHNldFRpbWVvdXQodGhyb3R0bGVyLCB3YWl0KTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnB1dFR5cGVDb2xvclN1cHBvcnQoKSB7XG4gICAgICAgIHJldHVybiAkLmZuLnNwZWN0cnVtLmlucHV0VHlwZUNvbG9yU3VwcG9ydCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogRGVmaW5lIGEgalF1ZXJ5IHBsdWdpblxuICAgICovXG4gICAgdmFyIGRhdGFJRCA9IFwic3BlY3RydW0uaWRcIjtcbiAgICAkLmZuLnNwZWN0cnVtID0gZnVuY3Rpb24gKG9wdHMsIGV4dHJhKSB7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvcHRzID09IFwic3RyaW5nXCIpIHtcblxuICAgICAgICAgICAgdmFyIHJldHVyblZhbHVlID0gdGhpcztcbiAgICAgICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoIGFyZ3VtZW50cywgMSApO1xuXG4gICAgICAgICAgICB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBzcGVjdCA9IHNwZWN0cnVtc1skKHRoaXMpLmRhdGEoZGF0YUlEKV07XG4gICAgICAgICAgICAgICAgaWYgKHNwZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtZXRob2QgPSBzcGVjdFtvcHRzXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFtZXRob2QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvciggXCJTcGVjdHJ1bTogbm8gc3VjaCBtZXRob2Q6ICdcIiArIG9wdHMgKyBcIidcIiApO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdHMgPT0gXCJnZXRcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSBzcGVjdC5nZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChvcHRzID09IFwiY29udGFpbmVyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblZhbHVlID0gc3BlY3QuY29udGFpbmVyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9wdHMgPT0gXCJvcHRpb25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuVmFsdWUgPSBzcGVjdC5vcHRpb24uYXBwbHkoc3BlY3QsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9wdHMgPT0gXCJkZXN0cm95XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwZWN0LmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlRGF0YShkYXRhSUQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kLmFwcGx5KHNwZWN0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gcmV0dXJuVmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJbml0aWFsaXppbmcgYSBuZXcgaW5zdGFuY2Ugb2Ygc3BlY3RydW1cbiAgICAgICAgcmV0dXJuIHRoaXMuc3BlY3RydW0oXCJkZXN0cm95XCIpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgb3B0cywgJCh0aGlzKS5kYXRhKCkpO1xuICAgICAgICAgICAgdmFyIHNwZWN0ID0gc3BlY3RydW0odGhpcywgb3B0aW9ucyk7XG4gICAgICAgICAgICAkKHRoaXMpLmRhdGEoZGF0YUlELCBzcGVjdC5pZCk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAkLmZuLnNwZWN0cnVtLmxvYWQgPSB0cnVlO1xuICAgICQuZm4uc3BlY3RydW0ubG9hZE9wdHMgPSB7fTtcbiAgICAkLmZuLnNwZWN0cnVtLmRyYWdnYWJsZSA9IGRyYWdnYWJsZTtcbiAgICAkLmZuLnNwZWN0cnVtLmRlZmF1bHRzID0gZGVmYXVsdE9wdHM7XG4gICAgJC5mbi5zcGVjdHJ1bS5pbnB1dFR5cGVDb2xvclN1cHBvcnQgPSBmdW5jdGlvbiBpbnB1dFR5cGVDb2xvclN1cHBvcnQoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaW5wdXRUeXBlQ29sb3JTdXBwb3J0Ll9jYWNoZWRSZXN1bHQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHZhciBjb2xvcklucHV0ID0gJChcIjxpbnB1dCB0eXBlPSdjb2xvcicvPlwiKVswXTsgLy8gaWYgY29sb3IgZWxlbWVudCBpcyBzdXBwb3J0ZWQsIHZhbHVlIHdpbGwgZGVmYXVsdCB0byBub3QgbnVsbFxuICAgICAgICAgICAgaW5wdXRUeXBlQ29sb3JTdXBwb3J0Ll9jYWNoZWRSZXN1bHQgPSBjb2xvcklucHV0LnR5cGUgPT09IFwiY29sb3JcIiAmJiBjb2xvcklucHV0LnZhbHVlICE9PSBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbnB1dFR5cGVDb2xvclN1cHBvcnQuX2NhY2hlZFJlc3VsdDtcbiAgICB9O1xuXG4gICAgJC5zcGVjdHJ1bSA9IHsgfTtcbiAgICAkLnNwZWN0cnVtLmxvY2FsaXphdGlvbiA9IHsgfTtcbiAgICAkLnNwZWN0cnVtLnBhbGV0dGVzID0geyB9O1xuXG4gICAgJC5mbi5zcGVjdHJ1bS5wcm9jZXNzTmF0aXZlQ29sb3JJbnB1dHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjb2xvcklucHV0cyA9ICQoXCJpbnB1dFt0eXBlPWNvbG9yXVwiKTtcbiAgICAgICAgaWYgKGNvbG9ySW5wdXRzLmxlbmd0aCAmJiAhaW5wdXRUeXBlQ29sb3JTdXBwb3J0KCkpIHtcbiAgICAgICAgICAgIGNvbG9ySW5wdXRzLnNwZWN0cnVtKHtcbiAgICAgICAgICAgICAgICBwcmVmZXJyZWRGb3JtYXQ6IFwiaGV4NlwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBUaW55Q29sb3IgdjEuMS4yXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2Jncmlucy9UaW55Q29sb3JcbiAgICAvLyBCcmlhbiBHcmluc3RlYWQsIE1JVCBMaWNlbnNlXG5cbiAgICAoZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgdHJpbUxlZnQgPSAvXltcXHMsI10rLyxcbiAgICAgICAgdHJpbVJpZ2h0ID0gL1xccyskLyxcbiAgICAgICAgdGlueUNvdW50ZXIgPSAwLFxuICAgICAgICBtYXRoID0gTWF0aCxcbiAgICAgICAgbWF0aFJvdW5kID0gbWF0aC5yb3VuZCxcbiAgICAgICAgbWF0aE1pbiA9IG1hdGgubWluLFxuICAgICAgICBtYXRoTWF4ID0gbWF0aC5tYXgsXG4gICAgICAgIG1hdGhSYW5kb20gPSBtYXRoLnJhbmRvbTtcblxuICAgIHZhciB0aW55Y29sb3IgPSBmdW5jdGlvbihjb2xvciwgb3B0cykge1xuXG4gICAgICAgIGNvbG9yID0gKGNvbG9yKSA/IGNvbG9yIDogJyc7XG4gICAgICAgIG9wdHMgPSBvcHRzIHx8IHsgfTtcblxuICAgICAgICAvLyBJZiBpbnB1dCBpcyBhbHJlYWR5IGEgdGlueWNvbG9yLCByZXR1cm4gaXRzZWxmXG4gICAgICAgIGlmIChjb2xvciBpbnN0YW5jZW9mIHRpbnljb2xvcikge1xuICAgICAgICAgICByZXR1cm4gY29sb3I7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgd2UgYXJlIGNhbGxlZCBhcyBhIGZ1bmN0aW9uLCBjYWxsIHVzaW5nIG5ldyBpbnN0ZWFkXG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiB0aW55Y29sb3IpKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IHRpbnljb2xvcihjb2xvciwgb3B0cyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmdiID0gaW5wdXRUb1JHQihjb2xvcik7XG4gICAgICAgIHRoaXMuX29yaWdpbmFsSW5wdXQgPSBjb2xvcixcbiAgICAgICAgdGhpcy5fciA9IHJnYi5yLFxuICAgICAgICB0aGlzLl9nID0gcmdiLmcsXG4gICAgICAgIHRoaXMuX2IgPSByZ2IuYixcbiAgICAgICAgdGhpcy5fYSA9IHJnYi5hLFxuICAgICAgICB0aGlzLl9yb3VuZEEgPSBtYXRoUm91bmQoMTAwKnRoaXMuX2EpIC8gMTAwLFxuICAgICAgICB0aGlzLl9mb3JtYXQgPSBvcHRzLmZvcm1hdCB8fCByZ2IuZm9ybWF0O1xuICAgICAgICB0aGlzLl9ncmFkaWVudFR5cGUgPSBvcHRzLmdyYWRpZW50VHlwZTtcblxuICAgICAgICAvLyBEb24ndCBsZXQgdGhlIHJhbmdlIG9mIFswLDI1NV0gY29tZSBiYWNrIGluIFswLDFdLlxuICAgICAgICAvLyBQb3RlbnRpYWxseSBsb3NlIGEgbGl0dGxlIGJpdCBvZiBwcmVjaXNpb24gaGVyZSwgYnV0IHdpbGwgZml4IGlzc3VlcyB3aGVyZVxuICAgICAgICAvLyAuNSBnZXRzIGludGVycHJldGVkIGFzIGhhbGYgb2YgdGhlIHRvdGFsLCBpbnN0ZWFkIG9mIGhhbGYgb2YgMVxuICAgICAgICAvLyBJZiBpdCB3YXMgc3VwcG9zZWQgdG8gYmUgMTI4LCB0aGlzIHdhcyBhbHJlYWR5IHRha2VuIGNhcmUgb2YgYnkgYGlucHV0VG9SZ2JgXG4gICAgICAgIGlmICh0aGlzLl9yIDwgMSkgeyB0aGlzLl9yID0gbWF0aFJvdW5kKHRoaXMuX3IpOyB9XG4gICAgICAgIGlmICh0aGlzLl9nIDwgMSkgeyB0aGlzLl9nID0gbWF0aFJvdW5kKHRoaXMuX2cpOyB9XG4gICAgICAgIGlmICh0aGlzLl9iIDwgMSkgeyB0aGlzLl9iID0gbWF0aFJvdW5kKHRoaXMuX2IpOyB9XG5cbiAgICAgICAgdGhpcy5fb2sgPSByZ2Iub2s7XG4gICAgICAgIHRoaXMuX3RjX2lkID0gdGlueUNvdW50ZXIrKztcbiAgICB9O1xuXG4gICAgdGlueWNvbG9yLnByb3RvdHlwZSA9IHtcbiAgICAgICAgaXNEYXJrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEJyaWdodG5lc3MoKSA8IDEyODtcbiAgICAgICAgfSxcbiAgICAgICAgaXNMaWdodDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuaXNEYXJrKCk7XG4gICAgICAgIH0sXG4gICAgICAgIGlzVmFsaWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX29rO1xuICAgICAgICB9LFxuICAgICAgICBnZXRPcmlnaW5hbElucHV0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fb3JpZ2luYWxJbnB1dDtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0Rm9ybWF0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9mb3JtYXQ7XG4gICAgICAgIH0sXG4gICAgICAgIGdldEFscGhhOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hO1xuICAgICAgICB9LFxuICAgICAgICBnZXRCcmlnaHRuZXNzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciByZ2IgPSB0aGlzLnRvUmdiKCk7XG4gICAgICAgICAgICByZXR1cm4gKHJnYi5yICogMjk5ICsgcmdiLmcgKiA1ODcgKyByZ2IuYiAqIDExNCkgLyAxMDAwO1xuICAgICAgICB9LFxuICAgICAgICBzZXRBbHBoYTogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2EgPSBib3VuZEFscGhhKHZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuX3JvdW5kQSA9IG1hdGhSb3VuZCgxMDAqdGhpcy5fYSkgLyAxMDA7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcbiAgICAgICAgdG9Ic3Y6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGhzdiA9IHJnYlRvSHN2KHRoaXMuX3IsIHRoaXMuX2csIHRoaXMuX2IpO1xuICAgICAgICAgICAgcmV0dXJuIHsgaDogaHN2LmggKiAzNjAsIHM6IGhzdi5zLCB2OiBoc3YudiwgYTogdGhpcy5fYSB9O1xuICAgICAgICB9LFxuICAgICAgICB0b0hzdlN0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaHN2ID0gcmdiVG9Ic3YodGhpcy5fciwgdGhpcy5fZywgdGhpcy5fYik7XG4gICAgICAgICAgICB2YXIgaCA9IG1hdGhSb3VuZChoc3YuaCAqIDM2MCksIHMgPSBtYXRoUm91bmQoaHN2LnMgKiAxMDApLCB2ID0gbWF0aFJvdW5kKGhzdi52ICogMTAwKTtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5fYSA9PSAxKSA/XG4gICAgICAgICAgICAgIFwiaHN2KFwiICArIGggKyBcIiwgXCIgKyBzICsgXCIlLCBcIiArIHYgKyBcIiUpXCIgOlxuICAgICAgICAgICAgICBcImhzdmEoXCIgKyBoICsgXCIsIFwiICsgcyArIFwiJSwgXCIgKyB2ICsgXCIlLCBcIisgdGhpcy5fcm91bmRBICsgXCIpXCI7XG4gICAgICAgIH0sXG4gICAgICAgIHRvSHNsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBoc2wgPSByZ2JUb0hzbCh0aGlzLl9yLCB0aGlzLl9nLCB0aGlzLl9iKTtcbiAgICAgICAgICAgIHJldHVybiB7IGg6IGhzbC5oICogMzYwLCBzOiBoc2wucywgbDogaHNsLmwsIGE6IHRoaXMuX2EgfTtcbiAgICAgICAgfSxcbiAgICAgICAgdG9Ic2xTdHJpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGhzbCA9IHJnYlRvSHNsKHRoaXMuX3IsIHRoaXMuX2csIHRoaXMuX2IpO1xuICAgICAgICAgICAgdmFyIGggPSBtYXRoUm91bmQoaHNsLmggKiAzNjApLCBzID0gbWF0aFJvdW5kKGhzbC5zICogMTAwKSwgbCA9IG1hdGhSb3VuZChoc2wubCAqIDEwMCk7XG4gICAgICAgICAgICByZXR1cm4gKHRoaXMuX2EgPT0gMSkgP1xuICAgICAgICAgICAgICBcImhzbChcIiAgKyBoICsgXCIsIFwiICsgcyArIFwiJSwgXCIgKyBsICsgXCIlKVwiIDpcbiAgICAgICAgICAgICAgXCJoc2xhKFwiICsgaCArIFwiLCBcIiArIHMgKyBcIiUsIFwiICsgbCArIFwiJSwgXCIrIHRoaXMuX3JvdW5kQSArIFwiKVwiO1xuICAgICAgICB9LFxuICAgICAgICB0b0hleDogZnVuY3Rpb24oYWxsb3czQ2hhcikge1xuICAgICAgICAgICAgcmV0dXJuIHJnYlRvSGV4KHRoaXMuX3IsIHRoaXMuX2csIHRoaXMuX2IsIGFsbG93M0NoYXIpO1xuICAgICAgICB9LFxuICAgICAgICB0b0hleFN0cmluZzogZnVuY3Rpb24oYWxsb3czQ2hhcikge1xuICAgICAgICAgICAgcmV0dXJuICcjJyArIHRoaXMudG9IZXgoYWxsb3czQ2hhcik7XG4gICAgICAgIH0sXG4gICAgICAgIHRvSGV4ODogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gcmdiYVRvSGV4KHRoaXMuX3IsIHRoaXMuX2csIHRoaXMuX2IsIHRoaXMuX2EpO1xuICAgICAgICB9LFxuICAgICAgICB0b0hleDhTdHJpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICcjJyArIHRoaXMudG9IZXg4KCk7XG4gICAgICAgIH0sXG4gICAgICAgIHRvUmdiOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHI6IG1hdGhSb3VuZCh0aGlzLl9yKSwgZzogbWF0aFJvdW5kKHRoaXMuX2cpLCBiOiBtYXRoUm91bmQodGhpcy5fYiksIGE6IHRoaXMuX2EgfTtcbiAgICAgICAgfSxcbiAgICAgICAgdG9SZ2JTdHJpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICh0aGlzLl9hID09IDEpID9cbiAgICAgICAgICAgICAgXCJyZ2IoXCIgICsgbWF0aFJvdW5kKHRoaXMuX3IpICsgXCIsIFwiICsgbWF0aFJvdW5kKHRoaXMuX2cpICsgXCIsIFwiICsgbWF0aFJvdW5kKHRoaXMuX2IpICsgXCIpXCIgOlxuICAgICAgICAgICAgICBcInJnYmEoXCIgKyBtYXRoUm91bmQodGhpcy5fcikgKyBcIiwgXCIgKyBtYXRoUm91bmQodGhpcy5fZykgKyBcIiwgXCIgKyBtYXRoUm91bmQodGhpcy5fYikgKyBcIiwgXCIgKyB0aGlzLl9yb3VuZEEgKyBcIilcIjtcbiAgICAgICAgfSxcbiAgICAgICAgdG9QZXJjZW50YWdlUmdiOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHI6IG1hdGhSb3VuZChib3VuZDAxKHRoaXMuX3IsIDI1NSkgKiAxMDApICsgXCIlXCIsIGc6IG1hdGhSb3VuZChib3VuZDAxKHRoaXMuX2csIDI1NSkgKiAxMDApICsgXCIlXCIsIGI6IG1hdGhSb3VuZChib3VuZDAxKHRoaXMuX2IsIDI1NSkgKiAxMDApICsgXCIlXCIsIGE6IHRoaXMuX2EgfTtcbiAgICAgICAgfSxcbiAgICAgICAgdG9QZXJjZW50YWdlUmdiU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5fYSA9PSAxKSA/XG4gICAgICAgICAgICAgIFwicmdiKFwiICArIG1hdGhSb3VuZChib3VuZDAxKHRoaXMuX3IsIDI1NSkgKiAxMDApICsgXCIlLCBcIiArIG1hdGhSb3VuZChib3VuZDAxKHRoaXMuX2csIDI1NSkgKiAxMDApICsgXCIlLCBcIiArIG1hdGhSb3VuZChib3VuZDAxKHRoaXMuX2IsIDI1NSkgKiAxMDApICsgXCIlKVwiIDpcbiAgICAgICAgICAgICAgXCJyZ2JhKFwiICsgbWF0aFJvdW5kKGJvdW5kMDEodGhpcy5fciwgMjU1KSAqIDEwMCkgKyBcIiUsIFwiICsgbWF0aFJvdW5kKGJvdW5kMDEodGhpcy5fZywgMjU1KSAqIDEwMCkgKyBcIiUsIFwiICsgbWF0aFJvdW5kKGJvdW5kMDEodGhpcy5fYiwgMjU1KSAqIDEwMCkgKyBcIiUsIFwiICsgdGhpcy5fcm91bmRBICsgXCIpXCI7XG4gICAgICAgIH0sXG4gICAgICAgIHRvTmFtZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fYSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBcInRyYW5zcGFyZW50XCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9hIDwgMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGhleE5hbWVzW3JnYlRvSGV4KHRoaXMuX3IsIHRoaXMuX2csIHRoaXMuX2IsIHRydWUpXSB8fCBmYWxzZTtcbiAgICAgICAgfSxcbiAgICAgICAgdG9GaWx0ZXI6IGZ1bmN0aW9uKHNlY29uZENvbG9yKSB7XG4gICAgICAgICAgICB2YXIgaGV4OFN0cmluZyA9ICcjJyArIHJnYmFUb0hleCh0aGlzLl9yLCB0aGlzLl9nLCB0aGlzLl9iLCB0aGlzLl9hKTtcbiAgICAgICAgICAgIHZhciBzZWNvbmRIZXg4U3RyaW5nID0gaGV4OFN0cmluZztcbiAgICAgICAgICAgIHZhciBncmFkaWVudFR5cGUgPSB0aGlzLl9ncmFkaWVudFR5cGUgPyBcIkdyYWRpZW50VHlwZSA9IDEsIFwiIDogXCJcIjtcblxuICAgICAgICAgICAgaWYgKHNlY29uZENvbG9yKSB7XG4gICAgICAgICAgICAgICAgdmFyIHMgPSB0aW55Y29sb3Ioc2Vjb25kQ29sb3IpO1xuICAgICAgICAgICAgICAgIHNlY29uZEhleDhTdHJpbmcgPSBzLnRvSGV4OFN0cmluZygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gXCJwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuZ3JhZGllbnQoXCIrZ3JhZGllbnRUeXBlK1wic3RhcnRDb2xvcnN0cj1cIitoZXg4U3RyaW5nK1wiLGVuZENvbG9yc3RyPVwiK3NlY29uZEhleDhTdHJpbmcrXCIpXCI7XG4gICAgICAgIH0sXG4gICAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbihmb3JtYXQpIHtcbiAgICAgICAgICAgIHZhciBmb3JtYXRTZXQgPSAhIWZvcm1hdDtcbiAgICAgICAgICAgIGZvcm1hdCA9IGZvcm1hdCB8fCB0aGlzLl9mb3JtYXQ7XG5cbiAgICAgICAgICAgIHZhciBmb3JtYXR0ZWRTdHJpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciBoYXNBbHBoYSA9IHRoaXMuX2EgPCAxICYmIHRoaXMuX2EgPj0gMDtcbiAgICAgICAgICAgIHZhciBuZWVkc0FscGhhRm9ybWF0ID0gIWZvcm1hdFNldCAmJiBoYXNBbHBoYSAmJiAoZm9ybWF0ID09PSBcImhleFwiIHx8IGZvcm1hdCA9PT0gXCJoZXg2XCIgfHwgZm9ybWF0ID09PSBcImhleDNcIiB8fCBmb3JtYXQgPT09IFwibmFtZVwiKTtcblxuICAgICAgICAgICAgaWYgKG5lZWRzQWxwaGFGb3JtYXQpIHtcbiAgICAgICAgICAgICAgICAvLyBTcGVjaWFsIGNhc2UgZm9yIFwidHJhbnNwYXJlbnRcIiwgYWxsIG90aGVyIG5vbi1hbHBoYSBmb3JtYXRzXG4gICAgICAgICAgICAgICAgLy8gd2lsbCByZXR1cm4gcmdiYSB3aGVuIHRoZXJlIGlzIHRyYW5zcGFyZW5jeS5cbiAgICAgICAgICAgICAgICBpZiAoZm9ybWF0ID09PSBcIm5hbWVcIiAmJiB0aGlzLl9hID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRvTmFtZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b1JnYlN0cmluZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZvcm1hdCA9PT0gXCJyZ2JcIikge1xuICAgICAgICAgICAgICAgIGZvcm1hdHRlZFN0cmluZyA9IHRoaXMudG9SZ2JTdHJpbmcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmb3JtYXQgPT09IFwicHJnYlwiKSB7XG4gICAgICAgICAgICAgICAgZm9ybWF0dGVkU3RyaW5nID0gdGhpcy50b1BlcmNlbnRhZ2VSZ2JTdHJpbmcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmb3JtYXQgPT09IFwiaGV4XCIgfHwgZm9ybWF0ID09PSBcImhleDZcIikge1xuICAgICAgICAgICAgICAgIGZvcm1hdHRlZFN0cmluZyA9IHRoaXMudG9IZXhTdHJpbmcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmb3JtYXQgPT09IFwiaGV4M1wiKSB7XG4gICAgICAgICAgICAgICAgZm9ybWF0dGVkU3RyaW5nID0gdGhpcy50b0hleFN0cmluZyh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmb3JtYXQgPT09IFwiaGV4OFwiKSB7XG4gICAgICAgICAgICAgICAgZm9ybWF0dGVkU3RyaW5nID0gdGhpcy50b0hleDhTdHJpbmcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmb3JtYXQgPT09IFwibmFtZVwiKSB7XG4gICAgICAgICAgICAgICAgZm9ybWF0dGVkU3RyaW5nID0gdGhpcy50b05hbWUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmb3JtYXQgPT09IFwiaHNsXCIpIHtcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZWRTdHJpbmcgPSB0aGlzLnRvSHNsU3RyaW5nKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZm9ybWF0ID09PSBcImhzdlwiKSB7XG4gICAgICAgICAgICAgICAgZm9ybWF0dGVkU3RyaW5nID0gdGhpcy50b0hzdlN0cmluZygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZm9ybWF0dGVkU3RyaW5nIHx8IHRoaXMudG9IZXhTdHJpbmcoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBfYXBwbHlNb2RpZmljYXRpb246IGZ1bmN0aW9uKGZuLCBhcmdzKSB7XG4gICAgICAgICAgICB2YXIgY29sb3IgPSBmbi5hcHBseShudWxsLCBbdGhpc10uY29uY2F0KFtdLnNsaWNlLmNhbGwoYXJncykpKTtcbiAgICAgICAgICAgIHRoaXMuX3IgPSBjb2xvci5fcjtcbiAgICAgICAgICAgIHRoaXMuX2cgPSBjb2xvci5fZztcbiAgICAgICAgICAgIHRoaXMuX2IgPSBjb2xvci5fYjtcbiAgICAgICAgICAgIHRoaXMuc2V0QWxwaGEoY29sb3IuX2EpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG4gICAgICAgIGxpZ2h0ZW46IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FwcGx5TW9kaWZpY2F0aW9uKGxpZ2h0ZW4sIGFyZ3VtZW50cyk7XG4gICAgICAgIH0sXG4gICAgICAgIGJyaWdodGVuOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hcHBseU1vZGlmaWNhdGlvbihicmlnaHRlbiwgYXJndW1lbnRzKTtcbiAgICAgICAgfSxcbiAgICAgICAgZGFya2VuOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hcHBseU1vZGlmaWNhdGlvbihkYXJrZW4sIGFyZ3VtZW50cyk7XG4gICAgICAgIH0sXG4gICAgICAgIGRlc2F0dXJhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FwcGx5TW9kaWZpY2F0aW9uKGRlc2F0dXJhdGUsIGFyZ3VtZW50cyk7XG4gICAgICAgIH0sXG4gICAgICAgIHNhdHVyYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hcHBseU1vZGlmaWNhdGlvbihzYXR1cmF0ZSwgYXJndW1lbnRzKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ3JleXNjYWxlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hcHBseU1vZGlmaWNhdGlvbihncmV5c2NhbGUsIGFyZ3VtZW50cyk7XG4gICAgICAgIH0sXG4gICAgICAgIHNwaW46IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FwcGx5TW9kaWZpY2F0aW9uKHNwaW4sIGFyZ3VtZW50cyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgX2FwcGx5Q29tYmluYXRpb246IGZ1bmN0aW9uKGZuLCBhcmdzKSB7XG4gICAgICAgICAgICByZXR1cm4gZm4uYXBwbHkobnVsbCwgW3RoaXNdLmNvbmNhdChbXS5zbGljZS5jYWxsKGFyZ3MpKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGFuYWxvZ291czogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYXBwbHlDb21iaW5hdGlvbihhbmFsb2dvdXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBsZW1lbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FwcGx5Q29tYmluYXRpb24oY29tcGxlbWVudCwgYXJndW1lbnRzKTtcbiAgICAgICAgfSxcbiAgICAgICAgbW9ub2Nocm9tYXRpYzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYXBwbHlDb21iaW5hdGlvbihtb25vY2hyb21hdGljLCBhcmd1bWVudHMpO1xuICAgICAgICB9LFxuICAgICAgICBzcGxpdGNvbXBsZW1lbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FwcGx5Q29tYmluYXRpb24oc3BsaXRjb21wbGVtZW50LCBhcmd1bWVudHMpO1xuICAgICAgICB9LFxuICAgICAgICB0cmlhZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYXBwbHlDb21iaW5hdGlvbih0cmlhZCwgYXJndW1lbnRzKTtcbiAgICAgICAgfSxcbiAgICAgICAgdGV0cmFkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hcHBseUNvbWJpbmF0aW9uKHRldHJhZCwgYXJndW1lbnRzKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBJZiBpbnB1dCBpcyBhbiBvYmplY3QsIGZvcmNlIDEgaW50byBcIjEuMFwiIHRvIGhhbmRsZSByYXRpb3MgcHJvcGVybHlcbiAgICAvLyBTdHJpbmcgaW5wdXQgcmVxdWlyZXMgXCIxLjBcIiBhcyBpbnB1dCwgc28gMSB3aWxsIGJlIHRyZWF0ZWQgYXMgMVxuICAgIHRpbnljb2xvci5mcm9tUmF0aW8gPSBmdW5jdGlvbihjb2xvciwgb3B0cykge1xuICAgICAgICBpZiAodHlwZW9mIGNvbG9yID09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIHZhciBuZXdDb2xvciA9IHt9O1xuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBjb2xvcikge1xuICAgICAgICAgICAgICAgIGlmIChjb2xvci5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gXCJhXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NvbG9yW2ldID0gY29sb3JbaV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdDb2xvcltpXSA9IGNvbnZlcnRUb1BlcmNlbnRhZ2UoY29sb3JbaV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29sb3IgPSBuZXdDb2xvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aW55Y29sb3IoY29sb3IsIG9wdHMpO1xuICAgIH07XG5cbiAgICAvLyBHaXZlbiBhIHN0cmluZyBvciBvYmplY3QsIGNvbnZlcnQgdGhhdCBpbnB1dCB0byBSR0JcbiAgICAvLyBQb3NzaWJsZSBzdHJpbmcgaW5wdXRzOlxuICAgIC8vXG4gICAgLy8gICAgIFwicmVkXCJcbiAgICAvLyAgICAgXCIjZjAwXCIgb3IgXCJmMDBcIlxuICAgIC8vICAgICBcIiNmZjAwMDBcIiBvciBcImZmMDAwMFwiXG4gICAgLy8gICAgIFwiI2ZmMDAwMDAwXCIgb3IgXCJmZjAwMDAwMFwiXG4gICAgLy8gICAgIFwicmdiIDI1NSAwIDBcIiBvciBcInJnYiAoMjU1LCAwLCAwKVwiXG4gICAgLy8gICAgIFwicmdiIDEuMCAwIDBcIiBvciBcInJnYiAoMSwgMCwgMClcIlxuICAgIC8vICAgICBcInJnYmEgKDI1NSwgMCwgMCwgMSlcIiBvciBcInJnYmEgMjU1LCAwLCAwLCAxXCJcbiAgICAvLyAgICAgXCJyZ2JhICgxLjAsIDAsIDAsIDEpXCIgb3IgXCJyZ2JhIDEuMCwgMCwgMCwgMVwiXG4gICAgLy8gICAgIFwiaHNsKDAsIDEwMCUsIDUwJSlcIiBvciBcImhzbCAwIDEwMCUgNTAlXCJcbiAgICAvLyAgICAgXCJoc2xhKDAsIDEwMCUsIDUwJSwgMSlcIiBvciBcImhzbGEgMCAxMDAlIDUwJSwgMVwiXG4gICAgLy8gICAgIFwiaHN2KDAsIDEwMCUsIDEwMCUpXCIgb3IgXCJoc3YgMCAxMDAlIDEwMCVcIlxuICAgIC8vXG4gICAgZnVuY3Rpb24gaW5wdXRUb1JHQihjb2xvcikge1xuXG4gICAgICAgIHZhciByZ2IgPSB7IHI6IDAsIGc6IDAsIGI6IDAgfTtcbiAgICAgICAgdmFyIGEgPSAxO1xuICAgICAgICB2YXIgb2sgPSBmYWxzZTtcbiAgICAgICAgdmFyIGZvcm1hdCA9IGZhbHNlO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29sb3IgPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgY29sb3IgPSBzdHJpbmdJbnB1dFRvT2JqZWN0KGNvbG9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgY29sb3IgPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgaWYgKGNvbG9yLmhhc093blByb3BlcnR5KFwiclwiKSAmJiBjb2xvci5oYXNPd25Qcm9wZXJ0eShcImdcIikgJiYgY29sb3IuaGFzT3duUHJvcGVydHkoXCJiXCIpKSB7XG4gICAgICAgICAgICAgICAgcmdiID0gcmdiVG9SZ2IoY29sb3IuciwgY29sb3IuZywgY29sb3IuYik7XG4gICAgICAgICAgICAgICAgb2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGZvcm1hdCA9IFN0cmluZyhjb2xvci5yKS5zdWJzdHIoLTEpID09PSBcIiVcIiA/IFwicHJnYlwiIDogXCJyZ2JcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbG9yLmhhc093blByb3BlcnR5KFwiaFwiKSAmJiBjb2xvci5oYXNPd25Qcm9wZXJ0eShcInNcIikgJiYgY29sb3IuaGFzT3duUHJvcGVydHkoXCJ2XCIpKSB7XG4gICAgICAgICAgICAgICAgY29sb3IucyA9IGNvbnZlcnRUb1BlcmNlbnRhZ2UoY29sb3Iucyk7XG4gICAgICAgICAgICAgICAgY29sb3IudiA9IGNvbnZlcnRUb1BlcmNlbnRhZ2UoY29sb3Iudik7XG4gICAgICAgICAgICAgICAgcmdiID0gaHN2VG9SZ2IoY29sb3IuaCwgY29sb3IucywgY29sb3Iudik7XG4gICAgICAgICAgICAgICAgb2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGZvcm1hdCA9IFwiaHN2XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjb2xvci5oYXNPd25Qcm9wZXJ0eShcImhcIikgJiYgY29sb3IuaGFzT3duUHJvcGVydHkoXCJzXCIpICYmIGNvbG9yLmhhc093blByb3BlcnR5KFwibFwiKSkge1xuICAgICAgICAgICAgICAgIGNvbG9yLnMgPSBjb252ZXJ0VG9QZXJjZW50YWdlKGNvbG9yLnMpO1xuICAgICAgICAgICAgICAgIGNvbG9yLmwgPSBjb252ZXJ0VG9QZXJjZW50YWdlKGNvbG9yLmwpO1xuICAgICAgICAgICAgICAgIHJnYiA9IGhzbFRvUmdiKGNvbG9yLmgsIGNvbG9yLnMsIGNvbG9yLmwpO1xuICAgICAgICAgICAgICAgIG9rID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBmb3JtYXQgPSBcImhzbFwiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY29sb3IuaGFzT3duUHJvcGVydHkoXCJhXCIpKSB7XG4gICAgICAgICAgICAgICAgYSA9IGNvbG9yLmE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBhID0gYm91bmRBbHBoYShhKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb2s6IG9rLFxuICAgICAgICAgICAgZm9ybWF0OiBjb2xvci5mb3JtYXQgfHwgZm9ybWF0LFxuICAgICAgICAgICAgcjogbWF0aE1pbigyNTUsIG1hdGhNYXgocmdiLnIsIDApKSxcbiAgICAgICAgICAgIGc6IG1hdGhNaW4oMjU1LCBtYXRoTWF4KHJnYi5nLCAwKSksXG4gICAgICAgICAgICBiOiBtYXRoTWluKDI1NSwgbWF0aE1heChyZ2IuYiwgMCkpLFxuICAgICAgICAgICAgYTogYVxuICAgICAgICB9O1xuICAgIH1cblxuXG4gICAgLy8gQ29udmVyc2lvbiBGdW5jdGlvbnNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLy8gYHJnYlRvSHNsYCwgYHJnYlRvSHN2YCwgYGhzbFRvUmdiYCwgYGhzdlRvUmdiYCBtb2RpZmllZCBmcm9tOlxuICAgIC8vIDxodHRwOi8vbWppamFja3Nvbi5jb20vMjAwOC8wMi9yZ2ItdG8taHNsLWFuZC1yZ2ItdG8taHN2LWNvbG9yLW1vZGVsLWNvbnZlcnNpb24tYWxnb3JpdGhtcy1pbi1qYXZhc2NyaXB0PlxuXG4gICAgLy8gYHJnYlRvUmdiYFxuICAgIC8vIEhhbmRsZSBib3VuZHMgLyBwZXJjZW50YWdlIGNoZWNraW5nIHRvIGNvbmZvcm0gdG8gQ1NTIGNvbG9yIHNwZWNcbiAgICAvLyA8aHR0cDovL3d3dy53My5vcmcvVFIvY3NzMy1jb2xvci8+XG4gICAgLy8gKkFzc3VtZXM6KiByLCBnLCBiIGluIFswLCAyNTVdIG9yIFswLCAxXVxuICAgIC8vICpSZXR1cm5zOiogeyByLCBnLCBiIH0gaW4gWzAsIDI1NV1cbiAgICBmdW5jdGlvbiByZ2JUb1JnYihyLCBnLCBiKXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHI6IGJvdW5kMDEociwgMjU1KSAqIDI1NSxcbiAgICAgICAgICAgIGc6IGJvdW5kMDEoZywgMjU1KSAqIDI1NSxcbiAgICAgICAgICAgIGI6IGJvdW5kMDEoYiwgMjU1KSAqIDI1NVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIGByZ2JUb0hzbGBcbiAgICAvLyBDb252ZXJ0cyBhbiBSR0IgY29sb3IgdmFsdWUgdG8gSFNMLlxuICAgIC8vICpBc3N1bWVzOiogciwgZywgYW5kIGIgYXJlIGNvbnRhaW5lZCBpbiBbMCwgMjU1XSBvciBbMCwgMV1cbiAgICAvLyAqUmV0dXJuczoqIHsgaCwgcywgbCB9IGluIFswLDFdXG4gICAgZnVuY3Rpb24gcmdiVG9Ic2wociwgZywgYikge1xuXG4gICAgICAgIHIgPSBib3VuZDAxKHIsIDI1NSk7XG4gICAgICAgIGcgPSBib3VuZDAxKGcsIDI1NSk7XG4gICAgICAgIGIgPSBib3VuZDAxKGIsIDI1NSk7XG5cbiAgICAgICAgdmFyIG1heCA9IG1hdGhNYXgociwgZywgYiksIG1pbiA9IG1hdGhNaW4ociwgZywgYik7XG4gICAgICAgIHZhciBoLCBzLCBsID0gKG1heCArIG1pbikgLyAyO1xuXG4gICAgICAgIGlmKG1heCA9PSBtaW4pIHtcbiAgICAgICAgICAgIGggPSBzID0gMDsgLy8gYWNocm9tYXRpY1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIGQgPSBtYXggLSBtaW47XG4gICAgICAgICAgICBzID0gbCA+IDAuNSA/IGQgLyAoMiAtIG1heCAtIG1pbikgOiBkIC8gKG1heCArIG1pbik7XG4gICAgICAgICAgICBzd2l0Y2gobWF4KSB7XG4gICAgICAgICAgICAgICAgY2FzZSByOiBoID0gKGcgLSBiKSAvIGQgKyAoZyA8IGIgPyA2IDogMCk7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgZzogaCA9IChiIC0gcikgLyBkICsgMjsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBiOiBoID0gKHIgLSBnKSAvIGQgKyA0OyBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaCAvPSA2O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHsgaDogaCwgczogcywgbDogbCB9O1xuICAgIH1cblxuICAgIC8vIGBoc2xUb1JnYmBcbiAgICAvLyBDb252ZXJ0cyBhbiBIU0wgY29sb3IgdmFsdWUgdG8gUkdCLlxuICAgIC8vICpBc3N1bWVzOiogaCBpcyBjb250YWluZWQgaW4gWzAsIDFdIG9yIFswLCAzNjBdIGFuZCBzIGFuZCBsIGFyZSBjb250YWluZWQgWzAsIDFdIG9yIFswLCAxMDBdXG4gICAgLy8gKlJldHVybnM6KiB7IHIsIGcsIGIgfSBpbiB0aGUgc2V0IFswLCAyNTVdXG4gICAgZnVuY3Rpb24gaHNsVG9SZ2IoaCwgcywgbCkge1xuICAgICAgICB2YXIgciwgZywgYjtcblxuICAgICAgICBoID0gYm91bmQwMShoLCAzNjApO1xuICAgICAgICBzID0gYm91bmQwMShzLCAxMDApO1xuICAgICAgICBsID0gYm91bmQwMShsLCAxMDApO1xuXG4gICAgICAgIGZ1bmN0aW9uIGh1ZTJyZ2IocCwgcSwgdCkge1xuICAgICAgICAgICAgaWYodCA8IDApIHQgKz0gMTtcbiAgICAgICAgICAgIGlmKHQgPiAxKSB0IC09IDE7XG4gICAgICAgICAgICBpZih0IDwgMS82KSByZXR1cm4gcCArIChxIC0gcCkgKiA2ICogdDtcbiAgICAgICAgICAgIGlmKHQgPCAxLzIpIHJldHVybiBxO1xuICAgICAgICAgICAgaWYodCA8IDIvMykgcmV0dXJuIHAgKyAocSAtIHApICogKDIvMyAtIHQpICogNjtcbiAgICAgICAgICAgIHJldHVybiBwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYocyA9PT0gMCkge1xuICAgICAgICAgICAgciA9IGcgPSBiID0gbDsgLy8gYWNocm9tYXRpY1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIHEgPSBsIDwgMC41ID8gbCAqICgxICsgcykgOiBsICsgcyAtIGwgKiBzO1xuICAgICAgICAgICAgdmFyIHAgPSAyICogbCAtIHE7XG4gICAgICAgICAgICByID0gaHVlMnJnYihwLCBxLCBoICsgMS8zKTtcbiAgICAgICAgICAgIGcgPSBodWUycmdiKHAsIHEsIGgpO1xuICAgICAgICAgICAgYiA9IGh1ZTJyZ2IocCwgcSwgaCAtIDEvMyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geyByOiByICogMjU1LCBnOiBnICogMjU1LCBiOiBiICogMjU1IH07XG4gICAgfVxuXG4gICAgLy8gYHJnYlRvSHN2YFxuICAgIC8vIENvbnZlcnRzIGFuIFJHQiBjb2xvciB2YWx1ZSB0byBIU1ZcbiAgICAvLyAqQXNzdW1lczoqIHIsIGcsIGFuZCBiIGFyZSBjb250YWluZWQgaW4gdGhlIHNldCBbMCwgMjU1XSBvciBbMCwgMV1cbiAgICAvLyAqUmV0dXJuczoqIHsgaCwgcywgdiB9IGluIFswLDFdXG4gICAgZnVuY3Rpb24gcmdiVG9Ic3YociwgZywgYikge1xuXG4gICAgICAgIHIgPSBib3VuZDAxKHIsIDI1NSk7XG4gICAgICAgIGcgPSBib3VuZDAxKGcsIDI1NSk7XG4gICAgICAgIGIgPSBib3VuZDAxKGIsIDI1NSk7XG5cbiAgICAgICAgdmFyIG1heCA9IG1hdGhNYXgociwgZywgYiksIG1pbiA9IG1hdGhNaW4ociwgZywgYik7XG4gICAgICAgIHZhciBoLCBzLCB2ID0gbWF4O1xuXG4gICAgICAgIHZhciBkID0gbWF4IC0gbWluO1xuICAgICAgICBzID0gbWF4ID09PSAwID8gMCA6IGQgLyBtYXg7XG5cbiAgICAgICAgaWYobWF4ID09IG1pbikge1xuICAgICAgICAgICAgaCA9IDA7IC8vIGFjaHJvbWF0aWNcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHN3aXRjaChtYXgpIHtcbiAgICAgICAgICAgICAgICBjYXNlIHI6IGggPSAoZyAtIGIpIC8gZCArIChnIDwgYiA/IDYgOiAwKTsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBnOiBoID0gKGIgLSByKSAvIGQgKyAyOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIGI6IGggPSAociAtIGcpIC8gZCArIDQ7IGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaCAvPSA2O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGg6IGgsIHM6IHMsIHY6IHYgfTtcbiAgICB9XG5cbiAgICAvLyBgaHN2VG9SZ2JgXG4gICAgLy8gQ29udmVydHMgYW4gSFNWIGNvbG9yIHZhbHVlIHRvIFJHQi5cbiAgICAvLyAqQXNzdW1lczoqIGggaXMgY29udGFpbmVkIGluIFswLCAxXSBvciBbMCwgMzYwXSBhbmQgcyBhbmQgdiBhcmUgY29udGFpbmVkIGluIFswLCAxXSBvciBbMCwgMTAwXVxuICAgIC8vICpSZXR1cm5zOiogeyByLCBnLCBiIH0gaW4gdGhlIHNldCBbMCwgMjU1XVxuICAgICBmdW5jdGlvbiBoc3ZUb1JnYihoLCBzLCB2KSB7XG5cbiAgICAgICAgaCA9IGJvdW5kMDEoaCwgMzYwKSAqIDY7XG4gICAgICAgIHMgPSBib3VuZDAxKHMsIDEwMCk7XG4gICAgICAgIHYgPSBib3VuZDAxKHYsIDEwMCk7XG5cbiAgICAgICAgdmFyIGkgPSBtYXRoLmZsb29yKGgpLFxuICAgICAgICAgICAgZiA9IGggLSBpLFxuICAgICAgICAgICAgcCA9IHYgKiAoMSAtIHMpLFxuICAgICAgICAgICAgcSA9IHYgKiAoMSAtIGYgKiBzKSxcbiAgICAgICAgICAgIHQgPSB2ICogKDEgLSAoMSAtIGYpICogcyksXG4gICAgICAgICAgICBtb2QgPSBpICUgNixcbiAgICAgICAgICAgIHIgPSBbdiwgcSwgcCwgcCwgdCwgdl1bbW9kXSxcbiAgICAgICAgICAgIGcgPSBbdCwgdiwgdiwgcSwgcCwgcF1bbW9kXSxcbiAgICAgICAgICAgIGIgPSBbcCwgcCwgdCwgdiwgdiwgcV1bbW9kXTtcblxuICAgICAgICByZXR1cm4geyByOiByICogMjU1LCBnOiBnICogMjU1LCBiOiBiICogMjU1IH07XG4gICAgfVxuXG4gICAgLy8gYHJnYlRvSGV4YFxuICAgIC8vIENvbnZlcnRzIGFuIFJHQiBjb2xvciB0byBoZXhcbiAgICAvLyBBc3N1bWVzIHIsIGcsIGFuZCBiIGFyZSBjb250YWluZWQgaW4gdGhlIHNldCBbMCwgMjU1XVxuICAgIC8vIFJldHVybnMgYSAzIG9yIDYgY2hhcmFjdGVyIGhleFxuICAgIGZ1bmN0aW9uIHJnYlRvSGV4KHIsIGcsIGIsIGFsbG93M0NoYXIpIHtcblxuICAgICAgICB2YXIgaGV4ID0gW1xuICAgICAgICAgICAgcGFkMihtYXRoUm91bmQocikudG9TdHJpbmcoMTYpKSxcbiAgICAgICAgICAgIHBhZDIobWF0aFJvdW5kKGcpLnRvU3RyaW5nKDE2KSksXG4gICAgICAgICAgICBwYWQyKG1hdGhSb3VuZChiKS50b1N0cmluZygxNikpXG4gICAgICAgIF07XG5cbiAgICAgICAgLy8gUmV0dXJuIGEgMyBjaGFyYWN0ZXIgaGV4IGlmIHBvc3NpYmxlXG4gICAgICAgIGlmIChhbGxvdzNDaGFyICYmIGhleFswXS5jaGFyQXQoMCkgPT0gaGV4WzBdLmNoYXJBdCgxKSAmJiBoZXhbMV0uY2hhckF0KDApID09IGhleFsxXS5jaGFyQXQoMSkgJiYgaGV4WzJdLmNoYXJBdCgwKSA9PSBoZXhbMl0uY2hhckF0KDEpKSB7XG4gICAgICAgICAgICByZXR1cm4gaGV4WzBdLmNoYXJBdCgwKSArIGhleFsxXS5jaGFyQXQoMCkgKyBoZXhbMl0uY2hhckF0KDApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGhleC5qb2luKFwiXCIpO1xuICAgIH1cbiAgICAgICAgLy8gYHJnYmFUb0hleGBcbiAgICAgICAgLy8gQ29udmVydHMgYW4gUkdCQSBjb2xvciBwbHVzIGFscGhhIHRyYW5zcGFyZW5jeSB0byBoZXhcbiAgICAgICAgLy8gQXNzdW1lcyByLCBnLCBiIGFuZCBhIGFyZSBjb250YWluZWQgaW4gdGhlIHNldCBbMCwgMjU1XVxuICAgICAgICAvLyBSZXR1cm5zIGFuIDggY2hhcmFjdGVyIGhleFxuICAgICAgICBmdW5jdGlvbiByZ2JhVG9IZXgociwgZywgYiwgYSkge1xuXG4gICAgICAgICAgICB2YXIgaGV4ID0gW1xuICAgICAgICAgICAgICAgIHBhZDIoY29udmVydERlY2ltYWxUb0hleChhKSksXG4gICAgICAgICAgICAgICAgcGFkMihtYXRoUm91bmQocikudG9TdHJpbmcoMTYpKSxcbiAgICAgICAgICAgICAgICBwYWQyKG1hdGhSb3VuZChnKS50b1N0cmluZygxNikpLFxuICAgICAgICAgICAgICAgIHBhZDIobWF0aFJvdW5kKGIpLnRvU3RyaW5nKDE2KSlcbiAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgIHJldHVybiBoZXguam9pbihcIlwiKTtcbiAgICAgICAgfVxuXG4gICAgLy8gYGVxdWFsc2BcbiAgICAvLyBDYW4gYmUgY2FsbGVkIHdpdGggYW55IHRpbnljb2xvciBpbnB1dFxuICAgIHRpbnljb2xvci5lcXVhbHMgPSBmdW5jdGlvbiAoY29sb3IxLCBjb2xvcjIpIHtcbiAgICAgICAgaWYgKCFjb2xvcjEgfHwgIWNvbG9yMikgeyByZXR1cm4gZmFsc2U7IH1cbiAgICAgICAgcmV0dXJuIHRpbnljb2xvcihjb2xvcjEpLnRvUmdiU3RyaW5nKCkgPT0gdGlueWNvbG9yKGNvbG9yMikudG9SZ2JTdHJpbmcoKTtcbiAgICB9O1xuICAgIHRpbnljb2xvci5yYW5kb20gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRpbnljb2xvci5mcm9tUmF0aW8oe1xuICAgICAgICAgICAgcjogbWF0aFJhbmRvbSgpLFxuICAgICAgICAgICAgZzogbWF0aFJhbmRvbSgpLFxuICAgICAgICAgICAgYjogbWF0aFJhbmRvbSgpXG4gICAgICAgIH0pO1xuICAgIH07XG5cblxuICAgIC8vIE1vZGlmaWNhdGlvbiBGdW5jdGlvbnNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gVGhhbmtzIHRvIGxlc3MuanMgZm9yIHNvbWUgb2YgdGhlIGJhc2ljcyBoZXJlXG4gICAgLy8gPGh0dHBzOi8vZ2l0aHViLmNvbS9jbG91ZGhlYWQvbGVzcy5qcy9ibG9iL21hc3Rlci9saWIvbGVzcy9mdW5jdGlvbnMuanM+XG5cbiAgICBmdW5jdGlvbiBkZXNhdHVyYXRlKGNvbG9yLCBhbW91bnQpIHtcbiAgICAgICAgYW1vdW50ID0gKGFtb3VudCA9PT0gMCkgPyAwIDogKGFtb3VudCB8fCAxMCk7XG4gICAgICAgIHZhciBoc2wgPSB0aW55Y29sb3IoY29sb3IpLnRvSHNsKCk7XG4gICAgICAgIGhzbC5zIC09IGFtb3VudCAvIDEwMDtcbiAgICAgICAgaHNsLnMgPSBjbGFtcDAxKGhzbC5zKTtcbiAgICAgICAgcmV0dXJuIHRpbnljb2xvcihoc2wpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNhdHVyYXRlKGNvbG9yLCBhbW91bnQpIHtcbiAgICAgICAgYW1vdW50ID0gKGFtb3VudCA9PT0gMCkgPyAwIDogKGFtb3VudCB8fCAxMCk7XG4gICAgICAgIHZhciBoc2wgPSB0aW55Y29sb3IoY29sb3IpLnRvSHNsKCk7XG4gICAgICAgIGhzbC5zICs9IGFtb3VudCAvIDEwMDtcbiAgICAgICAgaHNsLnMgPSBjbGFtcDAxKGhzbC5zKTtcbiAgICAgICAgcmV0dXJuIHRpbnljb2xvcihoc2wpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdyZXlzY2FsZShjb2xvcikge1xuICAgICAgICByZXR1cm4gdGlueWNvbG9yKGNvbG9yKS5kZXNhdHVyYXRlKDEwMCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGlnaHRlbiAoY29sb3IsIGFtb3VudCkge1xuICAgICAgICBhbW91bnQgPSAoYW1vdW50ID09PSAwKSA/IDAgOiAoYW1vdW50IHx8IDEwKTtcbiAgICAgICAgdmFyIGhzbCA9IHRpbnljb2xvcihjb2xvcikudG9Ic2woKTtcbiAgICAgICAgaHNsLmwgKz0gYW1vdW50IC8gMTAwO1xuICAgICAgICBoc2wubCA9IGNsYW1wMDEoaHNsLmwpO1xuICAgICAgICByZXR1cm4gdGlueWNvbG9yKGhzbCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYnJpZ2h0ZW4oY29sb3IsIGFtb3VudCkge1xuICAgICAgICBhbW91bnQgPSAoYW1vdW50ID09PSAwKSA/IDAgOiAoYW1vdW50IHx8IDEwKTtcbiAgICAgICAgdmFyIHJnYiA9IHRpbnljb2xvcihjb2xvcikudG9SZ2IoKTtcbiAgICAgICAgcmdiLnIgPSBtYXRoTWF4KDAsIG1hdGhNaW4oMjU1LCByZ2IuciAtIG1hdGhSb3VuZCgyNTUgKiAtIChhbW91bnQgLyAxMDApKSkpO1xuICAgICAgICByZ2IuZyA9IG1hdGhNYXgoMCwgbWF0aE1pbigyNTUsIHJnYi5nIC0gbWF0aFJvdW5kKDI1NSAqIC0gKGFtb3VudCAvIDEwMCkpKSk7XG4gICAgICAgIHJnYi5iID0gbWF0aE1heCgwLCBtYXRoTWluKDI1NSwgcmdiLmIgLSBtYXRoUm91bmQoMjU1ICogLSAoYW1vdW50IC8gMTAwKSkpKTtcbiAgICAgICAgcmV0dXJuIHRpbnljb2xvcihyZ2IpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRhcmtlbiAoY29sb3IsIGFtb3VudCkge1xuICAgICAgICBhbW91bnQgPSAoYW1vdW50ID09PSAwKSA/IDAgOiAoYW1vdW50IHx8IDEwKTtcbiAgICAgICAgdmFyIGhzbCA9IHRpbnljb2xvcihjb2xvcikudG9Ic2woKTtcbiAgICAgICAgaHNsLmwgLT0gYW1vdW50IC8gMTAwO1xuICAgICAgICBoc2wubCA9IGNsYW1wMDEoaHNsLmwpO1xuICAgICAgICByZXR1cm4gdGlueWNvbG9yKGhzbCk7XG4gICAgfVxuXG4gICAgLy8gU3BpbiB0YWtlcyBhIHBvc2l0aXZlIG9yIG5lZ2F0aXZlIGFtb3VudCB3aXRoaW4gWy0zNjAsIDM2MF0gaW5kaWNhdGluZyB0aGUgY2hhbmdlIG9mIGh1ZS5cbiAgICAvLyBWYWx1ZXMgb3V0c2lkZSBvZiB0aGlzIHJhbmdlIHdpbGwgYmUgd3JhcHBlZCBpbnRvIHRoaXMgcmFuZ2UuXG4gICAgZnVuY3Rpb24gc3Bpbihjb2xvciwgYW1vdW50KSB7XG4gICAgICAgIHZhciBoc2wgPSB0aW55Y29sb3IoY29sb3IpLnRvSHNsKCk7XG4gICAgICAgIHZhciBodWUgPSAobWF0aFJvdW5kKGhzbC5oKSArIGFtb3VudCkgJSAzNjA7XG4gICAgICAgIGhzbC5oID0gaHVlIDwgMCA/IDM2MCArIGh1ZSA6IGh1ZTtcbiAgICAgICAgcmV0dXJuIHRpbnljb2xvcihoc2wpO1xuICAgIH1cblxuICAgIC8vIENvbWJpbmF0aW9uIEZ1bmN0aW9uc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFRoYW5rcyB0byBqUXVlcnkgeENvbG9yIGZvciBzb21lIG9mIHRoZSBpZGVhcyBiZWhpbmQgdGhlc2VcbiAgICAvLyA8aHR0cHM6Ly9naXRodWIuY29tL2luZnVzaW9uL2pRdWVyeS14Y29sb3IvYmxvYi9tYXN0ZXIvanF1ZXJ5Lnhjb2xvci5qcz5cblxuICAgIGZ1bmN0aW9uIGNvbXBsZW1lbnQoY29sb3IpIHtcbiAgICAgICAgdmFyIGhzbCA9IHRpbnljb2xvcihjb2xvcikudG9Ic2woKTtcbiAgICAgICAgaHNsLmggPSAoaHNsLmggKyAxODApICUgMzYwO1xuICAgICAgICByZXR1cm4gdGlueWNvbG9yKGhzbCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJpYWQoY29sb3IpIHtcbiAgICAgICAgdmFyIGhzbCA9IHRpbnljb2xvcihjb2xvcikudG9Ic2woKTtcbiAgICAgICAgdmFyIGggPSBoc2wuaDtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHRpbnljb2xvcihjb2xvciksXG4gICAgICAgICAgICB0aW55Y29sb3IoeyBoOiAoaCArIDEyMCkgJSAzNjAsIHM6IGhzbC5zLCBsOiBoc2wubCB9KSxcbiAgICAgICAgICAgIHRpbnljb2xvcih7IGg6IChoICsgMjQwKSAlIDM2MCwgczogaHNsLnMsIGw6IGhzbC5sIH0pXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdGV0cmFkKGNvbG9yKSB7XG4gICAgICAgIHZhciBoc2wgPSB0aW55Y29sb3IoY29sb3IpLnRvSHNsKCk7XG4gICAgICAgIHZhciBoID0gaHNsLmg7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICB0aW55Y29sb3IoY29sb3IpLFxuICAgICAgICAgICAgdGlueWNvbG9yKHsgaDogKGggKyA5MCkgJSAzNjAsIHM6IGhzbC5zLCBsOiBoc2wubCB9KSxcbiAgICAgICAgICAgIHRpbnljb2xvcih7IGg6IChoICsgMTgwKSAlIDM2MCwgczogaHNsLnMsIGw6IGhzbC5sIH0pLFxuICAgICAgICAgICAgdGlueWNvbG9yKHsgaDogKGggKyAyNzApICUgMzYwLCBzOiBoc2wucywgbDogaHNsLmwgfSlcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzcGxpdGNvbXBsZW1lbnQoY29sb3IpIHtcbiAgICAgICAgdmFyIGhzbCA9IHRpbnljb2xvcihjb2xvcikudG9Ic2woKTtcbiAgICAgICAgdmFyIGggPSBoc2wuaDtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHRpbnljb2xvcihjb2xvciksXG4gICAgICAgICAgICB0aW55Y29sb3IoeyBoOiAoaCArIDcyKSAlIDM2MCwgczogaHNsLnMsIGw6IGhzbC5sfSksXG4gICAgICAgICAgICB0aW55Y29sb3IoeyBoOiAoaCArIDIxNikgJSAzNjAsIHM6IGhzbC5zLCBsOiBoc2wubH0pXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYW5hbG9nb3VzKGNvbG9yLCByZXN1bHRzLCBzbGljZXMpIHtcbiAgICAgICAgcmVzdWx0cyA9IHJlc3VsdHMgfHwgNjtcbiAgICAgICAgc2xpY2VzID0gc2xpY2VzIHx8IDMwO1xuXG4gICAgICAgIHZhciBoc2wgPSB0aW55Y29sb3IoY29sb3IpLnRvSHNsKCk7XG4gICAgICAgIHZhciBwYXJ0ID0gMzYwIC8gc2xpY2VzO1xuICAgICAgICB2YXIgcmV0ID0gW3Rpbnljb2xvcihjb2xvcildO1xuXG4gICAgICAgIGZvciAoaHNsLmggPSAoKGhzbC5oIC0gKHBhcnQgKiByZXN1bHRzID4+IDEpKSArIDcyMCkgJSAzNjA7IC0tcmVzdWx0czsgKSB7XG4gICAgICAgICAgICBoc2wuaCA9IChoc2wuaCArIHBhcnQpICUgMzYwO1xuICAgICAgICAgICAgcmV0LnB1c2godGlueWNvbG9yKGhzbCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW9ub2Nocm9tYXRpYyhjb2xvciwgcmVzdWx0cykge1xuICAgICAgICByZXN1bHRzID0gcmVzdWx0cyB8fCA2O1xuICAgICAgICB2YXIgaHN2ID0gdGlueWNvbG9yKGNvbG9yKS50b0hzdigpO1xuICAgICAgICB2YXIgaCA9IGhzdi5oLCBzID0gaHN2LnMsIHYgPSBoc3YudjtcbiAgICAgICAgdmFyIHJldCA9IFtdO1xuICAgICAgICB2YXIgbW9kaWZpY2F0aW9uID0gMSAvIHJlc3VsdHM7XG5cbiAgICAgICAgd2hpbGUgKHJlc3VsdHMtLSkge1xuICAgICAgICAgICAgcmV0LnB1c2godGlueWNvbG9yKHsgaDogaCwgczogcywgdjogdn0pKTtcbiAgICAgICAgICAgIHYgPSAodiArIG1vZGlmaWNhdGlvbikgJSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG5cbiAgICAvLyBVdGlsaXR5IEZ1bmN0aW9uc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgdGlueWNvbG9yLm1peCA9IGZ1bmN0aW9uKGNvbG9yMSwgY29sb3IyLCBhbW91bnQpIHtcbiAgICAgICAgYW1vdW50ID0gKGFtb3VudCA9PT0gMCkgPyAwIDogKGFtb3VudCB8fCA1MCk7XG5cbiAgICAgICAgdmFyIHJnYjEgPSB0aW55Y29sb3IoY29sb3IxKS50b1JnYigpO1xuICAgICAgICB2YXIgcmdiMiA9IHRpbnljb2xvcihjb2xvcjIpLnRvUmdiKCk7XG5cbiAgICAgICAgdmFyIHAgPSBhbW91bnQgLyAxMDA7XG4gICAgICAgIHZhciB3ID0gcCAqIDIgLSAxO1xuICAgICAgICB2YXIgYSA9IHJnYjIuYSAtIHJnYjEuYTtcblxuICAgICAgICB2YXIgdzE7XG5cbiAgICAgICAgaWYgKHcgKiBhID09IC0xKSB7XG4gICAgICAgICAgICB3MSA9IHc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3MSA9ICh3ICsgYSkgLyAoMSArIHcgKiBhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHcxID0gKHcxICsgMSkgLyAyO1xuXG4gICAgICAgIHZhciB3MiA9IDEgLSB3MTtcblxuICAgICAgICB2YXIgcmdiYSA9IHtcbiAgICAgICAgICAgIHI6IHJnYjIuciAqIHcxICsgcmdiMS5yICogdzIsXG4gICAgICAgICAgICBnOiByZ2IyLmcgKiB3MSArIHJnYjEuZyAqIHcyLFxuICAgICAgICAgICAgYjogcmdiMi5iICogdzEgKyByZ2IxLmIgKiB3MixcbiAgICAgICAgICAgIGE6IHJnYjIuYSAqIHAgICsgcmdiMS5hICogKDEgLSBwKVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB0aW55Y29sb3IocmdiYSk7XG4gICAgfTtcblxuXG4gICAgLy8gUmVhZGFiaWxpdHkgRnVuY3Rpb25zXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gPGh0dHA6Ly93d3cudzMub3JnL1RSL0FFUlQjY29sb3ItY29udHJhc3Q+XG5cbiAgICAvLyBgcmVhZGFiaWxpdHlgXG4gICAgLy8gQW5hbHl6ZSB0aGUgMiBjb2xvcnMgYW5kIHJldHVybnMgYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzOlxuICAgIC8vICAgIGBicmlnaHRuZXNzYDogZGlmZmVyZW5jZSBpbiBicmlnaHRuZXNzIGJldHdlZW4gdGhlIHR3byBjb2xvcnNcbiAgICAvLyAgICBgY29sb3JgOiBkaWZmZXJlbmNlIGluIGNvbG9yL2h1ZSBiZXR3ZWVuIHRoZSB0d28gY29sb3JzXG4gICAgdGlueWNvbG9yLnJlYWRhYmlsaXR5ID0gZnVuY3Rpb24oY29sb3IxLCBjb2xvcjIpIHtcbiAgICAgICAgdmFyIGMxID0gdGlueWNvbG9yKGNvbG9yMSk7XG4gICAgICAgIHZhciBjMiA9IHRpbnljb2xvcihjb2xvcjIpO1xuICAgICAgICB2YXIgcmdiMSA9IGMxLnRvUmdiKCk7XG4gICAgICAgIHZhciByZ2IyID0gYzIudG9SZ2IoKTtcbiAgICAgICAgdmFyIGJyaWdodG5lc3NBID0gYzEuZ2V0QnJpZ2h0bmVzcygpO1xuICAgICAgICB2YXIgYnJpZ2h0bmVzc0IgPSBjMi5nZXRCcmlnaHRuZXNzKCk7XG4gICAgICAgIHZhciBjb2xvckRpZmYgPSAoXG4gICAgICAgICAgICBNYXRoLm1heChyZ2IxLnIsIHJnYjIucikgLSBNYXRoLm1pbihyZ2IxLnIsIHJnYjIucikgK1xuICAgICAgICAgICAgTWF0aC5tYXgocmdiMS5nLCByZ2IyLmcpIC0gTWF0aC5taW4ocmdiMS5nLCByZ2IyLmcpICtcbiAgICAgICAgICAgIE1hdGgubWF4KHJnYjEuYiwgcmdiMi5iKSAtIE1hdGgubWluKHJnYjEuYiwgcmdiMi5iKVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBicmlnaHRuZXNzOiBNYXRoLmFicyhicmlnaHRuZXNzQSAtIGJyaWdodG5lc3NCKSxcbiAgICAgICAgICAgIGNvbG9yOiBjb2xvckRpZmZcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgLy8gYHJlYWRhYmxlYFxuICAgIC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL0FFUlQjY29sb3ItY29udHJhc3RcbiAgICAvLyBFbnN1cmUgdGhhdCBmb3JlZ3JvdW5kIGFuZCBiYWNrZ3JvdW5kIGNvbG9yIGNvbWJpbmF0aW9ucyBwcm92aWRlIHN1ZmZpY2llbnQgY29udHJhc3QuXG4gICAgLy8gKkV4YW1wbGUqXG4gICAgLy8gICAgdGlueWNvbG9yLmlzUmVhZGFibGUoXCIjMDAwXCIsIFwiIzExMVwiKSA9PiBmYWxzZVxuICAgIHRpbnljb2xvci5pc1JlYWRhYmxlID0gZnVuY3Rpb24oY29sb3IxLCBjb2xvcjIpIHtcbiAgICAgICAgdmFyIHJlYWRhYmlsaXR5ID0gdGlueWNvbG9yLnJlYWRhYmlsaXR5KGNvbG9yMSwgY29sb3IyKTtcbiAgICAgICAgcmV0dXJuIHJlYWRhYmlsaXR5LmJyaWdodG5lc3MgPiAxMjUgJiYgcmVhZGFiaWxpdHkuY29sb3IgPiA1MDA7XG4gICAgfTtcblxuICAgIC8vIGBtb3N0UmVhZGFibGVgXG4gICAgLy8gR2l2ZW4gYSBiYXNlIGNvbG9yIGFuZCBhIGxpc3Qgb2YgcG9zc2libGUgZm9yZWdyb3VuZCBvciBiYWNrZ3JvdW5kXG4gICAgLy8gY29sb3JzIGZvciB0aGF0IGJhc2UsIHJldHVybnMgdGhlIG1vc3QgcmVhZGFibGUgY29sb3IuXG4gICAgLy8gKkV4YW1wbGUqXG4gICAgLy8gICAgdGlueWNvbG9yLm1vc3RSZWFkYWJsZShcIiMxMjNcIiwgW1wiI2ZmZlwiLCBcIiMwMDBcIl0pID0+IFwiIzAwMFwiXG4gICAgdGlueWNvbG9yLm1vc3RSZWFkYWJsZSA9IGZ1bmN0aW9uKGJhc2VDb2xvciwgY29sb3JMaXN0KSB7XG4gICAgICAgIHZhciBiZXN0Q29sb3IgPSBudWxsO1xuICAgICAgICB2YXIgYmVzdFNjb3JlID0gMDtcbiAgICAgICAgdmFyIGJlc3RJc1JlYWRhYmxlID0gZmFsc2U7XG4gICAgICAgIGZvciAodmFyIGk9MDsgaSA8IGNvbG9yTGlzdC5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICAvLyBXZSBub3JtYWxpemUgYm90aCBhcm91bmQgdGhlIFwiYWNjZXB0YWJsZVwiIGJyZWFraW5nIHBvaW50LFxuICAgICAgICAgICAgLy8gYnV0IHJhbmsgYnJpZ2h0bmVzcyBjb25zdHJhc3QgaGlnaGVyIHRoYW4gaHVlLlxuXG4gICAgICAgICAgICB2YXIgcmVhZGFiaWxpdHkgPSB0aW55Y29sb3IucmVhZGFiaWxpdHkoYmFzZUNvbG9yLCBjb2xvckxpc3RbaV0pO1xuICAgICAgICAgICAgdmFyIHJlYWRhYmxlID0gcmVhZGFiaWxpdHkuYnJpZ2h0bmVzcyA+IDEyNSAmJiByZWFkYWJpbGl0eS5jb2xvciA+IDUwMDtcbiAgICAgICAgICAgIHZhciBzY29yZSA9IDMgKiAocmVhZGFiaWxpdHkuYnJpZ2h0bmVzcyAvIDEyNSkgKyAocmVhZGFiaWxpdHkuY29sb3IgLyA1MDApO1xuXG4gICAgICAgICAgICBpZiAoKHJlYWRhYmxlICYmICEgYmVzdElzUmVhZGFibGUpIHx8XG4gICAgICAgICAgICAgICAgKHJlYWRhYmxlICYmIGJlc3RJc1JlYWRhYmxlICYmIHNjb3JlID4gYmVzdFNjb3JlKSB8fFxuICAgICAgICAgICAgICAgICgoISByZWFkYWJsZSkgJiYgKCEgYmVzdElzUmVhZGFibGUpICYmIHNjb3JlID4gYmVzdFNjb3JlKSkge1xuICAgICAgICAgICAgICAgIGJlc3RJc1JlYWRhYmxlID0gcmVhZGFibGU7XG4gICAgICAgICAgICAgICAgYmVzdFNjb3JlID0gc2NvcmU7XG4gICAgICAgICAgICAgICAgYmVzdENvbG9yID0gdGlueWNvbG9yKGNvbG9yTGlzdFtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJlc3RDb2xvcjtcbiAgICB9O1xuXG5cbiAgICAvLyBCaWcgTGlzdCBvZiBDb2xvcnNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyA8aHR0cDovL3d3dy53My5vcmcvVFIvY3NzMy1jb2xvci8jc3ZnLWNvbG9yPlxuICAgIHZhciBuYW1lcyA9IHRpbnljb2xvci5uYW1lcyA9IHtcbiAgICAgICAgYWxpY2VibHVlOiBcImYwZjhmZlwiLFxuICAgICAgICBhbnRpcXVld2hpdGU6IFwiZmFlYmQ3XCIsXG4gICAgICAgIGFxdWE6IFwiMGZmXCIsXG4gICAgICAgIGFxdWFtYXJpbmU6IFwiN2ZmZmQ0XCIsXG4gICAgICAgIGF6dXJlOiBcImYwZmZmZlwiLFxuICAgICAgICBiZWlnZTogXCJmNWY1ZGNcIixcbiAgICAgICAgYmlzcXVlOiBcImZmZTRjNFwiLFxuICAgICAgICBibGFjazogXCIwMDBcIixcbiAgICAgICAgYmxhbmNoZWRhbG1vbmQ6IFwiZmZlYmNkXCIsXG4gICAgICAgIGJsdWU6IFwiMDBmXCIsXG4gICAgICAgIGJsdWV2aW9sZXQ6IFwiOGEyYmUyXCIsXG4gICAgICAgIGJyb3duOiBcImE1MmEyYVwiLFxuICAgICAgICBidXJseXdvb2Q6IFwiZGViODg3XCIsXG4gICAgICAgIGJ1cm50c2llbm5hOiBcImVhN2U1ZFwiLFxuICAgICAgICBjYWRldGJsdWU6IFwiNWY5ZWEwXCIsXG4gICAgICAgIGNoYXJ0cmV1c2U6IFwiN2ZmZjAwXCIsXG4gICAgICAgIGNob2NvbGF0ZTogXCJkMjY5MWVcIixcbiAgICAgICAgY29yYWw6IFwiZmY3ZjUwXCIsXG4gICAgICAgIGNvcm5mbG93ZXJibHVlOiBcIjY0OTVlZFwiLFxuICAgICAgICBjb3Juc2lsazogXCJmZmY4ZGNcIixcbiAgICAgICAgY3JpbXNvbjogXCJkYzE0M2NcIixcbiAgICAgICAgY3lhbjogXCIwZmZcIixcbiAgICAgICAgZGFya2JsdWU6IFwiMDAwMDhiXCIsXG4gICAgICAgIGRhcmtjeWFuOiBcIjAwOGI4YlwiLFxuICAgICAgICBkYXJrZ29sZGVucm9kOiBcImI4ODYwYlwiLFxuICAgICAgICBkYXJrZ3JheTogXCJhOWE5YTlcIixcbiAgICAgICAgZGFya2dyZWVuOiBcIjAwNjQwMFwiLFxuICAgICAgICBkYXJrZ3JleTogXCJhOWE5YTlcIixcbiAgICAgICAgZGFya2toYWtpOiBcImJkYjc2YlwiLFxuICAgICAgICBkYXJrbWFnZW50YTogXCI4YjAwOGJcIixcbiAgICAgICAgZGFya29saXZlZ3JlZW46IFwiNTU2YjJmXCIsXG4gICAgICAgIGRhcmtvcmFuZ2U6IFwiZmY4YzAwXCIsXG4gICAgICAgIGRhcmtvcmNoaWQ6IFwiOTkzMmNjXCIsXG4gICAgICAgIGRhcmtyZWQ6IFwiOGIwMDAwXCIsXG4gICAgICAgIGRhcmtzYWxtb246IFwiZTk5NjdhXCIsXG4gICAgICAgIGRhcmtzZWFncmVlbjogXCI4ZmJjOGZcIixcbiAgICAgICAgZGFya3NsYXRlYmx1ZTogXCI0ODNkOGJcIixcbiAgICAgICAgZGFya3NsYXRlZ3JheTogXCIyZjRmNGZcIixcbiAgICAgICAgZGFya3NsYXRlZ3JleTogXCIyZjRmNGZcIixcbiAgICAgICAgZGFya3R1cnF1b2lzZTogXCIwMGNlZDFcIixcbiAgICAgICAgZGFya3Zpb2xldDogXCI5NDAwZDNcIixcbiAgICAgICAgZGVlcHBpbms6IFwiZmYxNDkzXCIsXG4gICAgICAgIGRlZXBza3libHVlOiBcIjAwYmZmZlwiLFxuICAgICAgICBkaW1ncmF5OiBcIjY5Njk2OVwiLFxuICAgICAgICBkaW1ncmV5OiBcIjY5Njk2OVwiLFxuICAgICAgICBkb2RnZXJibHVlOiBcIjFlOTBmZlwiLFxuICAgICAgICBmaXJlYnJpY2s6IFwiYjIyMjIyXCIsXG4gICAgICAgIGZsb3JhbHdoaXRlOiBcImZmZmFmMFwiLFxuICAgICAgICBmb3Jlc3RncmVlbjogXCIyMjhiMjJcIixcbiAgICAgICAgZnVjaHNpYTogXCJmMGZcIixcbiAgICAgICAgZ2FpbnNib3JvOiBcImRjZGNkY1wiLFxuICAgICAgICBnaG9zdHdoaXRlOiBcImY4ZjhmZlwiLFxuICAgICAgICBnb2xkOiBcImZmZDcwMFwiLFxuICAgICAgICBnb2xkZW5yb2Q6IFwiZGFhNTIwXCIsXG4gICAgICAgIGdyYXk6IFwiODA4MDgwXCIsXG4gICAgICAgIGdyZWVuOiBcIjAwODAwMFwiLFxuICAgICAgICBncmVlbnllbGxvdzogXCJhZGZmMmZcIixcbiAgICAgICAgZ3JleTogXCI4MDgwODBcIixcbiAgICAgICAgaG9uZXlkZXc6IFwiZjBmZmYwXCIsXG4gICAgICAgIGhvdHBpbms6IFwiZmY2OWI0XCIsXG4gICAgICAgIGluZGlhbnJlZDogXCJjZDVjNWNcIixcbiAgICAgICAgaW5kaWdvOiBcIjRiMDA4MlwiLFxuICAgICAgICBpdm9yeTogXCJmZmZmZjBcIixcbiAgICAgICAga2hha2k6IFwiZjBlNjhjXCIsXG4gICAgICAgIGxhdmVuZGVyOiBcImU2ZTZmYVwiLFxuICAgICAgICBsYXZlbmRlcmJsdXNoOiBcImZmZjBmNVwiLFxuICAgICAgICBsYXduZ3JlZW46IFwiN2NmYzAwXCIsXG4gICAgICAgIGxlbW9uY2hpZmZvbjogXCJmZmZhY2RcIixcbiAgICAgICAgbGlnaHRibHVlOiBcImFkZDhlNlwiLFxuICAgICAgICBsaWdodGNvcmFsOiBcImYwODA4MFwiLFxuICAgICAgICBsaWdodGN5YW46IFwiZTBmZmZmXCIsXG4gICAgICAgIGxpZ2h0Z29sZGVucm9keWVsbG93OiBcImZhZmFkMlwiLFxuICAgICAgICBsaWdodGdyYXk6IFwiZDNkM2QzXCIsXG4gICAgICAgIGxpZ2h0Z3JlZW46IFwiOTBlZTkwXCIsXG4gICAgICAgIGxpZ2h0Z3JleTogXCJkM2QzZDNcIixcbiAgICAgICAgbGlnaHRwaW5rOiBcImZmYjZjMVwiLFxuICAgICAgICBsaWdodHNhbG1vbjogXCJmZmEwN2FcIixcbiAgICAgICAgbGlnaHRzZWFncmVlbjogXCIyMGIyYWFcIixcbiAgICAgICAgbGlnaHRza3libHVlOiBcIjg3Y2VmYVwiLFxuICAgICAgICBsaWdodHNsYXRlZ3JheTogXCI3ODlcIixcbiAgICAgICAgbGlnaHRzbGF0ZWdyZXk6IFwiNzg5XCIsXG4gICAgICAgIGxpZ2h0c3RlZWxibHVlOiBcImIwYzRkZVwiLFxuICAgICAgICBsaWdodHllbGxvdzogXCJmZmZmZTBcIixcbiAgICAgICAgbGltZTogXCIwZjBcIixcbiAgICAgICAgbGltZWdyZWVuOiBcIjMyY2QzMlwiLFxuICAgICAgICBsaW5lbjogXCJmYWYwZTZcIixcbiAgICAgICAgbWFnZW50YTogXCJmMGZcIixcbiAgICAgICAgbWFyb29uOiBcIjgwMDAwMFwiLFxuICAgICAgICBtZWRpdW1hcXVhbWFyaW5lOiBcIjY2Y2RhYVwiLFxuICAgICAgICBtZWRpdW1ibHVlOiBcIjAwMDBjZFwiLFxuICAgICAgICBtZWRpdW1vcmNoaWQ6IFwiYmE1NWQzXCIsXG4gICAgICAgIG1lZGl1bXB1cnBsZTogXCI5MzcwZGJcIixcbiAgICAgICAgbWVkaXVtc2VhZ3JlZW46IFwiM2NiMzcxXCIsXG4gICAgICAgIG1lZGl1bXNsYXRlYmx1ZTogXCI3YjY4ZWVcIixcbiAgICAgICAgbWVkaXVtc3ByaW5nZ3JlZW46IFwiMDBmYTlhXCIsXG4gICAgICAgIG1lZGl1bXR1cnF1b2lzZTogXCI0OGQxY2NcIixcbiAgICAgICAgbWVkaXVtdmlvbGV0cmVkOiBcImM3MTU4NVwiLFxuICAgICAgICBtaWRuaWdodGJsdWU6IFwiMTkxOTcwXCIsXG4gICAgICAgIG1pbnRjcmVhbTogXCJmNWZmZmFcIixcbiAgICAgICAgbWlzdHlyb3NlOiBcImZmZTRlMVwiLFxuICAgICAgICBtb2NjYXNpbjogXCJmZmU0YjVcIixcbiAgICAgICAgbmF2YWpvd2hpdGU6IFwiZmZkZWFkXCIsXG4gICAgICAgIG5hdnk6IFwiMDAwMDgwXCIsXG4gICAgICAgIG9sZGxhY2U6IFwiZmRmNWU2XCIsXG4gICAgICAgIG9saXZlOiBcIjgwODAwMFwiLFxuICAgICAgICBvbGl2ZWRyYWI6IFwiNmI4ZTIzXCIsXG4gICAgICAgIG9yYW5nZTogXCJmZmE1MDBcIixcbiAgICAgICAgb3JhbmdlcmVkOiBcImZmNDUwMFwiLFxuICAgICAgICBvcmNoaWQ6IFwiZGE3MGQ2XCIsXG4gICAgICAgIHBhbGVnb2xkZW5yb2Q6IFwiZWVlOGFhXCIsXG4gICAgICAgIHBhbGVncmVlbjogXCI5OGZiOThcIixcbiAgICAgICAgcGFsZXR1cnF1b2lzZTogXCJhZmVlZWVcIixcbiAgICAgICAgcGFsZXZpb2xldHJlZDogXCJkYjcwOTNcIixcbiAgICAgICAgcGFwYXlhd2hpcDogXCJmZmVmZDVcIixcbiAgICAgICAgcGVhY2hwdWZmOiBcImZmZGFiOVwiLFxuICAgICAgICBwZXJ1OiBcImNkODUzZlwiLFxuICAgICAgICBwaW5rOiBcImZmYzBjYlwiLFxuICAgICAgICBwbHVtOiBcImRkYTBkZFwiLFxuICAgICAgICBwb3dkZXJibHVlOiBcImIwZTBlNlwiLFxuICAgICAgICBwdXJwbGU6IFwiODAwMDgwXCIsXG4gICAgICAgIHJlYmVjY2FwdXJwbGU6IFwiNjYzMzk5XCIsXG4gICAgICAgIHJlZDogXCJmMDBcIixcbiAgICAgICAgcm9zeWJyb3duOiBcImJjOGY4ZlwiLFxuICAgICAgICByb3lhbGJsdWU6IFwiNDE2OWUxXCIsXG4gICAgICAgIHNhZGRsZWJyb3duOiBcIjhiNDUxM1wiLFxuICAgICAgICBzYWxtb246IFwiZmE4MDcyXCIsXG4gICAgICAgIHNhbmR5YnJvd246IFwiZjRhNDYwXCIsXG4gICAgICAgIHNlYWdyZWVuOiBcIjJlOGI1N1wiLFxuICAgICAgICBzZWFzaGVsbDogXCJmZmY1ZWVcIixcbiAgICAgICAgc2llbm5hOiBcImEwNTIyZFwiLFxuICAgICAgICBzaWx2ZXI6IFwiYzBjMGMwXCIsXG4gICAgICAgIHNreWJsdWU6IFwiODdjZWViXCIsXG4gICAgICAgIHNsYXRlYmx1ZTogXCI2YTVhY2RcIixcbiAgICAgICAgc2xhdGVncmF5OiBcIjcwODA5MFwiLFxuICAgICAgICBzbGF0ZWdyZXk6IFwiNzA4MDkwXCIsXG4gICAgICAgIHNub3c6IFwiZmZmYWZhXCIsXG4gICAgICAgIHNwcmluZ2dyZWVuOiBcIjAwZmY3ZlwiLFxuICAgICAgICBzdGVlbGJsdWU6IFwiNDY4MmI0XCIsXG4gICAgICAgIHRhbjogXCJkMmI0OGNcIixcbiAgICAgICAgdGVhbDogXCIwMDgwODBcIixcbiAgICAgICAgdGhpc3RsZTogXCJkOGJmZDhcIixcbiAgICAgICAgdG9tYXRvOiBcImZmNjM0N1wiLFxuICAgICAgICB0dXJxdW9pc2U6IFwiNDBlMGQwXCIsXG4gICAgICAgIHZpb2xldDogXCJlZTgyZWVcIixcbiAgICAgICAgd2hlYXQ6IFwiZjVkZWIzXCIsXG4gICAgICAgIHdoaXRlOiBcImZmZlwiLFxuICAgICAgICB3aGl0ZXNtb2tlOiBcImY1ZjVmNVwiLFxuICAgICAgICB5ZWxsb3c6IFwiZmYwXCIsXG4gICAgICAgIHllbGxvd2dyZWVuOiBcIjlhY2QzMlwiXG4gICAgfTtcblxuICAgIC8vIE1ha2UgaXQgZWFzeSB0byBhY2Nlc3MgY29sb3JzIHZpYSBgaGV4TmFtZXNbaGV4XWBcbiAgICB2YXIgaGV4TmFtZXMgPSB0aW55Y29sb3IuaGV4TmFtZXMgPSBmbGlwKG5hbWVzKTtcblxuXG4gICAgLy8gVXRpbGl0aWVzXG4gICAgLy8gLS0tLS0tLS0tXG5cbiAgICAvLyBgeyAnbmFtZTEnOiAndmFsMScgfWAgYmVjb21lcyBgeyAndmFsMSc6ICduYW1lMScgfWBcbiAgICBmdW5jdGlvbiBmbGlwKG8pIHtcbiAgICAgICAgdmFyIGZsaXBwZWQgPSB7IH07XG4gICAgICAgIGZvciAodmFyIGkgaW4gbykge1xuICAgICAgICAgICAgaWYgKG8uaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICAgICAgICBmbGlwcGVkW29baV1dID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmxpcHBlZDtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYSB2YWxpZCBhbHBoYSB2YWx1ZSBbMCwxXSB3aXRoIGFsbCBpbnZhbGlkIHZhbHVlcyBiZWluZyBzZXQgdG8gMVxuICAgIGZ1bmN0aW9uIGJvdW5kQWxwaGEoYSkge1xuICAgICAgICBhID0gcGFyc2VGbG9hdChhKTtcblxuICAgICAgICBpZiAoaXNOYU4oYSkgfHwgYSA8IDAgfHwgYSA+IDEpIHtcbiAgICAgICAgICAgIGEgPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfVxuXG4gICAgLy8gVGFrZSBpbnB1dCBmcm9tIFswLCBuXSBhbmQgcmV0dXJuIGl0IGFzIFswLCAxXVxuICAgIGZ1bmN0aW9uIGJvdW5kMDEobiwgbWF4KSB7XG4gICAgICAgIGlmIChpc09uZVBvaW50WmVybyhuKSkgeyBuID0gXCIxMDAlXCI7IH1cblxuICAgICAgICB2YXIgcHJvY2Vzc1BlcmNlbnQgPSBpc1BlcmNlbnRhZ2Uobik7XG4gICAgICAgIG4gPSBtYXRoTWluKG1heCwgbWF0aE1heCgwLCBwYXJzZUZsb2F0KG4pKSk7XG5cbiAgICAgICAgLy8gQXV0b21hdGljYWxseSBjb252ZXJ0IHBlcmNlbnRhZ2UgaW50byBudW1iZXJcbiAgICAgICAgaWYgKHByb2Nlc3NQZXJjZW50KSB7XG4gICAgICAgICAgICBuID0gcGFyc2VJbnQobiAqIG1heCwgMTApIC8gMTAwO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSGFuZGxlIGZsb2F0aW5nIHBvaW50IHJvdW5kaW5nIGVycm9yc1xuICAgICAgICBpZiAoKG1hdGguYWJzKG4gLSBtYXgpIDwgMC4wMDAwMDEpKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENvbnZlcnQgaW50byBbMCwgMV0gcmFuZ2UgaWYgaXQgaXNuJ3QgYWxyZWFkeVxuICAgICAgICByZXR1cm4gKG4gJSBtYXgpIC8gcGFyc2VGbG9hdChtYXgpO1xuICAgIH1cblxuICAgIC8vIEZvcmNlIGEgbnVtYmVyIGJldHdlZW4gMCBhbmQgMVxuICAgIGZ1bmN0aW9uIGNsYW1wMDEodmFsKSB7XG4gICAgICAgIHJldHVybiBtYXRoTWluKDEsIG1hdGhNYXgoMCwgdmFsKSk7XG4gICAgfVxuXG4gICAgLy8gUGFyc2UgYSBiYXNlLTE2IGhleCB2YWx1ZSBpbnRvIGEgYmFzZS0xMCBpbnRlZ2VyXG4gICAgZnVuY3Rpb24gcGFyc2VJbnRGcm9tSGV4KHZhbCkge1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQodmFsLCAxNik7XG4gICAgfVxuXG4gICAgLy8gTmVlZCB0byBoYW5kbGUgMS4wIGFzIDEwMCUsIHNpbmNlIG9uY2UgaXQgaXMgYSBudW1iZXIsIHRoZXJlIGlzIG5vIGRpZmZlcmVuY2UgYmV0d2VlbiBpdCBhbmQgMVxuICAgIC8vIDxodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzc0MjIwNzIvamF2YXNjcmlwdC1ob3ctdG8tZGV0ZWN0LW51bWJlci1hcy1hLWRlY2ltYWwtaW5jbHVkaW5nLTEtMD5cbiAgICBmdW5jdGlvbiBpc09uZVBvaW50WmVybyhuKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgbiA9PSBcInN0cmluZ1wiICYmIG4uaW5kZXhPZignLicpICE9IC0xICYmIHBhcnNlRmxvYXQobikgPT09IDE7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHN0cmluZyBwYXNzZWQgaW4gaXMgYSBwZXJjZW50YWdlXG4gICAgZnVuY3Rpb24gaXNQZXJjZW50YWdlKG4pIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBuID09PSBcInN0cmluZ1wiICYmIG4uaW5kZXhPZignJScpICE9IC0xO1xuICAgIH1cblxuICAgIC8vIEZvcmNlIGEgaGV4IHZhbHVlIHRvIGhhdmUgMiBjaGFyYWN0ZXJzXG4gICAgZnVuY3Rpb24gcGFkMihjKSB7XG4gICAgICAgIHJldHVybiBjLmxlbmd0aCA9PSAxID8gJzAnICsgYyA6ICcnICsgYztcbiAgICB9XG5cbiAgICAvLyBSZXBsYWNlIGEgZGVjaW1hbCB3aXRoIGl0J3MgcGVyY2VudGFnZSB2YWx1ZVxuICAgIGZ1bmN0aW9uIGNvbnZlcnRUb1BlcmNlbnRhZ2Uobikge1xuICAgICAgICBpZiAobiA8PSAxKSB7XG4gICAgICAgICAgICBuID0gKG4gKiAxMDApICsgXCIlXCI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbjtcbiAgICB9XG5cbiAgICAvLyBDb252ZXJ0cyBhIGRlY2ltYWwgdG8gYSBoZXggdmFsdWVcbiAgICBmdW5jdGlvbiBjb252ZXJ0RGVjaW1hbFRvSGV4KGQpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgucm91bmQocGFyc2VGbG9hdChkKSAqIDI1NSkudG9TdHJpbmcoMTYpO1xuICAgIH1cbiAgICAvLyBDb252ZXJ0cyBhIGhleCB2YWx1ZSB0byBhIGRlY2ltYWxcbiAgICBmdW5jdGlvbiBjb252ZXJ0SGV4VG9EZWNpbWFsKGgpIHtcbiAgICAgICAgcmV0dXJuIChwYXJzZUludEZyb21IZXgoaCkgLyAyNTUpO1xuICAgIH1cblxuICAgIHZhciBtYXRjaGVycyA9IChmdW5jdGlvbigpIHtcblxuICAgICAgICAvLyA8aHR0cDovL3d3dy53My5vcmcvVFIvY3NzMy12YWx1ZXMvI2ludGVnZXJzPlxuICAgICAgICB2YXIgQ1NTX0lOVEVHRVIgPSBcIlstXFxcXCtdP1xcXFxkKyU/XCI7XG5cbiAgICAgICAgLy8gPGh0dHA6Ly93d3cudzMub3JnL1RSL2NzczMtdmFsdWVzLyNudW1iZXItdmFsdWU+XG4gICAgICAgIHZhciBDU1NfTlVNQkVSID0gXCJbLVxcXFwrXT9cXFxcZCpcXFxcLlxcXFxkKyU/XCI7XG5cbiAgICAgICAgLy8gQWxsb3cgcG9zaXRpdmUvbmVnYXRpdmUgaW50ZWdlci9udW1iZXIuICBEb24ndCBjYXB0dXJlIHRoZSBlaXRoZXIvb3IsIGp1c3QgdGhlIGVudGlyZSBvdXRjb21lLlxuICAgICAgICB2YXIgQ1NTX1VOSVQgPSBcIig/OlwiICsgQ1NTX05VTUJFUiArIFwiKXwoPzpcIiArIENTU19JTlRFR0VSICsgXCIpXCI7XG5cbiAgICAgICAgLy8gQWN0dWFsIG1hdGNoaW5nLlxuICAgICAgICAvLyBQYXJlbnRoZXNlcyBhbmQgY29tbWFzIGFyZSBvcHRpb25hbCwgYnV0IG5vdCByZXF1aXJlZC5cbiAgICAgICAgLy8gV2hpdGVzcGFjZSBjYW4gdGFrZSB0aGUgcGxhY2Ugb2YgY29tbWFzIG9yIG9wZW5pbmcgcGFyZW5cbiAgICAgICAgdmFyIFBFUk1JU1NJVkVfTUFUQ0gzID0gXCJbXFxcXHN8XFxcXChdKyhcIiArIENTU19VTklUICsgXCIpWyx8XFxcXHNdKyhcIiArIENTU19VTklUICsgXCIpWyx8XFxcXHNdKyhcIiArIENTU19VTklUICsgXCIpXFxcXHMqXFxcXCk/XCI7XG4gICAgICAgIHZhciBQRVJNSVNTSVZFX01BVENINCA9IFwiW1xcXFxzfFxcXFwoXSsoXCIgKyBDU1NfVU5JVCArIFwiKVssfFxcXFxzXSsoXCIgKyBDU1NfVU5JVCArIFwiKVssfFxcXFxzXSsoXCIgKyBDU1NfVU5JVCArIFwiKVssfFxcXFxzXSsoXCIgKyBDU1NfVU5JVCArIFwiKVxcXFxzKlxcXFwpP1wiO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZ2I6IG5ldyBSZWdFeHAoXCJyZ2JcIiArIFBFUk1JU1NJVkVfTUFUQ0gzKSxcbiAgICAgICAgICAgIHJnYmE6IG5ldyBSZWdFeHAoXCJyZ2JhXCIgKyBQRVJNSVNTSVZFX01BVENINCksXG4gICAgICAgICAgICBoc2w6IG5ldyBSZWdFeHAoXCJoc2xcIiArIFBFUk1JU1NJVkVfTUFUQ0gzKSxcbiAgICAgICAgICAgIGhzbGE6IG5ldyBSZWdFeHAoXCJoc2xhXCIgKyBQRVJNSVNTSVZFX01BVENINCksXG4gICAgICAgICAgICBoc3Y6IG5ldyBSZWdFeHAoXCJoc3ZcIiArIFBFUk1JU1NJVkVfTUFUQ0gzKSxcbiAgICAgICAgICAgIGhzdmE6IG5ldyBSZWdFeHAoXCJoc3ZhXCIgKyBQRVJNSVNTSVZFX01BVENINCksXG4gICAgICAgICAgICBoZXgzOiAvXihbMC05YS1mQS1GXXsxfSkoWzAtOWEtZkEtRl17MX0pKFswLTlhLWZBLUZdezF9KSQvLFxuICAgICAgICAgICAgaGV4NjogL14oWzAtOWEtZkEtRl17Mn0pKFswLTlhLWZBLUZdezJ9KShbMC05YS1mQS1GXXsyfSkkLyxcbiAgICAgICAgICAgIGhleDg6IC9eKFswLTlhLWZBLUZdezJ9KShbMC05YS1mQS1GXXsyfSkoWzAtOWEtZkEtRl17Mn0pKFswLTlhLWZBLUZdezJ9KSQvXG4gICAgICAgIH07XG4gICAgfSkoKTtcblxuICAgIC8vIGBzdHJpbmdJbnB1dFRvT2JqZWN0YFxuICAgIC8vIFBlcm1pc3NpdmUgc3RyaW5nIHBhcnNpbmcuICBUYWtlIGluIGEgbnVtYmVyIG9mIGZvcm1hdHMsIGFuZCBvdXRwdXQgYW4gb2JqZWN0XG4gICAgLy8gYmFzZWQgb24gZGV0ZWN0ZWQgZm9ybWF0LiAgUmV0dXJucyBgeyByLCBnLCBiIH1gIG9yIGB7IGgsIHMsIGwgfWAgb3IgYHsgaCwgcywgdn1gXG4gICAgZnVuY3Rpb24gc3RyaW5nSW5wdXRUb09iamVjdChjb2xvcikge1xuXG4gICAgICAgIGNvbG9yID0gY29sb3IucmVwbGFjZSh0cmltTGVmdCwnJykucmVwbGFjZSh0cmltUmlnaHQsICcnKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB2YXIgbmFtZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKG5hbWVzW2NvbG9yXSkge1xuICAgICAgICAgICAgY29sb3IgPSBuYW1lc1tjb2xvcl07XG4gICAgICAgICAgICBuYW1lZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29sb3IgPT0gJ3RyYW5zcGFyZW50Jykge1xuICAgICAgICAgICAgcmV0dXJuIHsgcjogMCwgZzogMCwgYjogMCwgYTogMCwgZm9ybWF0OiBcIm5hbWVcIiB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVHJ5IHRvIG1hdGNoIHN0cmluZyBpbnB1dCB1c2luZyByZWd1bGFyIGV4cHJlc3Npb25zLlxuICAgICAgICAvLyBLZWVwIG1vc3Qgb2YgdGhlIG51bWJlciBib3VuZGluZyBvdXQgb2YgdGhpcyBmdW5jdGlvbiAtIGRvbid0IHdvcnJ5IGFib3V0IFswLDFdIG9yIFswLDEwMF0gb3IgWzAsMzYwXVxuICAgICAgICAvLyBKdXN0IHJldHVybiBhbiBvYmplY3QgYW5kIGxldCB0aGUgY29udmVyc2lvbiBmdW5jdGlvbnMgaGFuZGxlIHRoYXQuXG4gICAgICAgIC8vIFRoaXMgd2F5IHRoZSByZXN1bHQgd2lsbCBiZSB0aGUgc2FtZSB3aGV0aGVyIHRoZSB0aW55Y29sb3IgaXMgaW5pdGlhbGl6ZWQgd2l0aCBzdHJpbmcgb3Igb2JqZWN0LlxuICAgICAgICB2YXIgbWF0Y2g7XG4gICAgICAgIGlmICgobWF0Y2ggPSBtYXRjaGVycy5yZ2IuZXhlYyhjb2xvcikpKSB7XG4gICAgICAgICAgICByZXR1cm4geyByOiBtYXRjaFsxXSwgZzogbWF0Y2hbMl0sIGI6IG1hdGNoWzNdIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChtYXRjaCA9IG1hdGNoZXJzLnJnYmEuZXhlYyhjb2xvcikpKSB7XG4gICAgICAgICAgICByZXR1cm4geyByOiBtYXRjaFsxXSwgZzogbWF0Y2hbMl0sIGI6IG1hdGNoWzNdLCBhOiBtYXRjaFs0XSB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICgobWF0Y2ggPSBtYXRjaGVycy5oc2wuZXhlYyhjb2xvcikpKSB7XG4gICAgICAgICAgICByZXR1cm4geyBoOiBtYXRjaFsxXSwgczogbWF0Y2hbMl0sIGw6IG1hdGNoWzNdIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChtYXRjaCA9IG1hdGNoZXJzLmhzbGEuZXhlYyhjb2xvcikpKSB7XG4gICAgICAgICAgICByZXR1cm4geyBoOiBtYXRjaFsxXSwgczogbWF0Y2hbMl0sIGw6IG1hdGNoWzNdLCBhOiBtYXRjaFs0XSB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICgobWF0Y2ggPSBtYXRjaGVycy5oc3YuZXhlYyhjb2xvcikpKSB7XG4gICAgICAgICAgICByZXR1cm4geyBoOiBtYXRjaFsxXSwgczogbWF0Y2hbMl0sIHY6IG1hdGNoWzNdIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChtYXRjaCA9IG1hdGNoZXJzLmhzdmEuZXhlYyhjb2xvcikpKSB7XG4gICAgICAgICAgICByZXR1cm4geyBoOiBtYXRjaFsxXSwgczogbWF0Y2hbMl0sIHY6IG1hdGNoWzNdLCBhOiBtYXRjaFs0XSB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICgobWF0Y2ggPSBtYXRjaGVycy5oZXg4LmV4ZWMoY29sb3IpKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBhOiBjb252ZXJ0SGV4VG9EZWNpbWFsKG1hdGNoWzFdKSxcbiAgICAgICAgICAgICAgICByOiBwYXJzZUludEZyb21IZXgobWF0Y2hbMl0pLFxuICAgICAgICAgICAgICAgIGc6IHBhcnNlSW50RnJvbUhleChtYXRjaFszXSksXG4gICAgICAgICAgICAgICAgYjogcGFyc2VJbnRGcm9tSGV4KG1hdGNoWzRdKSxcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IG5hbWVkID8gXCJuYW1lXCIgOiBcImhleDhcIlxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKG1hdGNoID0gbWF0Y2hlcnMuaGV4Ni5leGVjKGNvbG9yKSkpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcjogcGFyc2VJbnRGcm9tSGV4KG1hdGNoWzFdKSxcbiAgICAgICAgICAgICAgICBnOiBwYXJzZUludEZyb21IZXgobWF0Y2hbMl0pLFxuICAgICAgICAgICAgICAgIGI6IHBhcnNlSW50RnJvbUhleChtYXRjaFszXSksXG4gICAgICAgICAgICAgICAgZm9ybWF0OiBuYW1lZCA/IFwibmFtZVwiIDogXCJoZXhcIlxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKG1hdGNoID0gbWF0Y2hlcnMuaGV4My5leGVjKGNvbG9yKSkpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcjogcGFyc2VJbnRGcm9tSGV4KG1hdGNoWzFdICsgJycgKyBtYXRjaFsxXSksXG4gICAgICAgICAgICAgICAgZzogcGFyc2VJbnRGcm9tSGV4KG1hdGNoWzJdICsgJycgKyBtYXRjaFsyXSksXG4gICAgICAgICAgICAgICAgYjogcGFyc2VJbnRGcm9tSGV4KG1hdGNoWzNdICsgJycgKyBtYXRjaFszXSksXG4gICAgICAgICAgICAgICAgZm9ybWF0OiBuYW1lZCA/IFwibmFtZVwiIDogXCJoZXhcIlxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB3aW5kb3cudGlueWNvbG9yID0gdGlueWNvbG9yO1xuICAgIH0pKCk7XG5cbiAgICAkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCQuZm4uc3BlY3RydW0ubG9hZCkge1xuICAgICAgICAgICAgJC5mbi5zcGVjdHJ1bS5wcm9jZXNzTmF0aXZlQ29sb3JJbnB1dHMoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG59KTtcbiIsIi8qIVxuICogVW5pZHJhZ2dlciB2Mi4xLjBcbiAqIERyYWdnYWJsZSBiYXNlIGNsYXNzXG4gKiBNSVQgbGljZW5zZVxuICovXG5cbi8qanNoaW50IGJyb3dzZXI6IHRydWUsIHVudXNlZDogdHJ1ZSwgdW5kZWY6IHRydWUsIHN0cmljdDogdHJ1ZSAqL1xuXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKmpzaGludCBzdHJpY3Q6IGZhbHNlICovIC8qZ2xvYmFscyBkZWZpbmUsIG1vZHVsZSwgcmVxdWlyZSAqL1xuXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBbXG4gICAgICAndW5pcG9pbnRlci91bmlwb2ludGVyJ1xuICAgIF0sIGZ1bmN0aW9uKCBVbmlwb2ludGVyICkge1xuICAgICAgcmV0dXJuIGZhY3RvcnkoIHdpbmRvdywgVW5pcG9pbnRlciApO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgcmVxdWlyZSgndW5pcG9pbnRlcicpXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIHdpbmRvdy5VbmlkcmFnZ2VyID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHdpbmRvdy5Vbmlwb2ludGVyXG4gICAgKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIHdpbmRvdywgVW5pcG9pbnRlciApIHtcblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLSAgLS0tLS0gLy9cblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFVuaWRyYWdnZXIgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuZnVuY3Rpb24gVW5pZHJhZ2dlcigpIHt9XG5cbi8vIGluaGVyaXQgVW5pcG9pbnRlciAmIEV2RW1pdHRlclxudmFyIHByb3RvID0gVW5pZHJhZ2dlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBVbmlwb2ludGVyLnByb3RvdHlwZSApO1xuXG4vLyAtLS0tLSBiaW5kIHN0YXJ0IC0tLS0tIC8vXG5cbnByb3RvLmJpbmRIYW5kbGVzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX2JpbmRIYW5kbGVzKCB0cnVlICk7XG59O1xuXG5wcm90by51bmJpbmRIYW5kbGVzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX2JpbmRIYW5kbGVzKCBmYWxzZSApO1xufTtcblxudmFyIG5hdmlnYXRvciA9IHdpbmRvdy5uYXZpZ2F0b3I7XG4vKipcbiAqIHdvcmtzIGFzIHVuYmluZGVyLCBhcyB5b3UgY2FuIC5iaW5kSGFuZGxlcyggZmFsc2UgKSB0byB1bmJpbmRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNCaW5kIC0gd2lsbCB1bmJpbmQgaWYgZmFsc2V5XG4gKi9cbnByb3RvLl9iaW5kSGFuZGxlcyA9IGZ1bmN0aW9uKCBpc0JpbmQgKSB7XG4gIC8vIG11bmdlIGlzQmluZCwgZGVmYXVsdCB0byB0cnVlXG4gIGlzQmluZCA9IGlzQmluZCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6ICEhaXNCaW5kO1xuICAvLyBleHRyYSBiaW5kIGxvZ2ljXG4gIHZhciBiaW5kZXJFeHRyYTtcbiAgaWYgKCBuYXZpZ2F0b3IucG9pbnRlckVuYWJsZWQgKSB7XG4gICAgYmluZGVyRXh0cmEgPSBmdW5jdGlvbiggaGFuZGxlICkge1xuICAgICAgLy8gZGlzYWJsZSBzY3JvbGxpbmcgb24gdGhlIGVsZW1lbnRcbiAgICAgIGhhbmRsZS5zdHlsZS50b3VjaEFjdGlvbiA9IGlzQmluZCA/ICdub25lJyA6ICcnO1xuICAgIH07XG4gIH0gZWxzZSBpZiAoIG5hdmlnYXRvci5tc1BvaW50ZXJFbmFibGVkICkge1xuICAgIGJpbmRlckV4dHJhID0gZnVuY3Rpb24oIGhhbmRsZSApIHtcbiAgICAgIC8vIGRpc2FibGUgc2Nyb2xsaW5nIG9uIHRoZSBlbGVtZW50XG4gICAgICBoYW5kbGUuc3R5bGUubXNUb3VjaEFjdGlvbiA9IGlzQmluZCA/ICdub25lJyA6ICcnO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgYmluZGVyRXh0cmEgPSBub29wO1xuICB9XG4gIC8vIGJpbmQgZWFjaCBoYW5kbGVcbiAgdmFyIGJpbmRNZXRob2QgPSBpc0JpbmQgPyAnYWRkRXZlbnRMaXN0ZW5lcicgOiAncmVtb3ZlRXZlbnRMaXN0ZW5lcic7XG4gIGZvciAoIHZhciBpPTA7IGkgPCB0aGlzLmhhbmRsZXMubGVuZ3RoOyBpKysgKSB7XG4gICAgdmFyIGhhbmRsZSA9IHRoaXMuaGFuZGxlc1tpXTtcbiAgICB0aGlzLl9iaW5kU3RhcnRFdmVudCggaGFuZGxlLCBpc0JpbmQgKTtcbiAgICBiaW5kZXJFeHRyYSggaGFuZGxlICk7XG4gICAgaGFuZGxlWyBiaW5kTWV0aG9kIF0oICdjbGljaycsIHRoaXMgKTtcbiAgfVxufTtcblxuLy8gLS0tLS0gc3RhcnQgZXZlbnQgLS0tLS0gLy9cblxuLyoqXG4gKiBwb2ludGVyIHN0YXJ0XG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICogQHBhcmFtIHtFdmVudCBvciBUb3VjaH0gcG9pbnRlclxuICovXG5wcm90by5wb2ludGVyRG93biA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgLy8gZGlzbWlzcyByYW5nZSBzbGlkZXJzXG4gIGlmICggZXZlbnQudGFyZ2V0Lm5vZGVOYW1lID09ICdJTlBVVCcgJiYgZXZlbnQudGFyZ2V0LnR5cGUgPT0gJ3JhbmdlJyApIHtcbiAgICAvLyByZXNldCBwb2ludGVyRG93biBsb2dpY1xuICAgIHRoaXMuaXNQb2ludGVyRG93biA9IGZhbHNlO1xuICAgIGRlbGV0ZSB0aGlzLnBvaW50ZXJJZGVudGlmaWVyO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRoaXMuX2RyYWdQb2ludGVyRG93biggZXZlbnQsIHBvaW50ZXIgKTtcbiAgLy8ga2x1ZGdlIHRvIGJsdXIgZm9jdXNlZCBpbnB1dHMgaW4gZHJhZ2dlclxuICB2YXIgZm9jdXNlZCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gIGlmICggZm9jdXNlZCAmJiBmb2N1c2VkLmJsdXIgKSB7XG4gICAgZm9jdXNlZC5ibHVyKCk7XG4gIH1cbiAgLy8gYmluZCBtb3ZlIGFuZCBlbmQgZXZlbnRzXG4gIHRoaXMuX2JpbmRQb3N0U3RhcnRFdmVudHMoIGV2ZW50ICk7XG4gIHRoaXMuZW1pdEV2ZW50KCAncG9pbnRlckRvd24nLCBbIGV2ZW50LCBwb2ludGVyIF0gKTtcbn07XG5cbi8vIGJhc2UgcG9pbnRlciBkb3duIGxvZ2ljXG5wcm90by5fZHJhZ1BvaW50ZXJEb3duID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICAvLyB0cmFjayB0byBzZWUgd2hlbiBkcmFnZ2luZyBzdGFydHNcbiAgdGhpcy5wb2ludGVyRG93blBvaW50ID0gVW5pcG9pbnRlci5nZXRQb2ludGVyUG9pbnQoIHBvaW50ZXIgKTtcblxuICB2YXIgY2FuUHJldmVudERlZmF1bHQgPSB0aGlzLmNhblByZXZlbnREZWZhdWx0T25Qb2ludGVyRG93biggZXZlbnQsIHBvaW50ZXIgKTtcbiAgaWYgKCBjYW5QcmV2ZW50RGVmYXVsdCApIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG59O1xuXG4vLyBvdmVyd3JpdGVhYmxlIG1ldGhvZCBzbyBGbGlja2l0eSBjYW4gcHJldmVudCBmb3Igc2Nyb2xsaW5nXG5wcm90by5jYW5QcmV2ZW50RGVmYXVsdE9uUG9pbnRlckRvd24gPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIC8vIHByZXZlbnQgZGVmYXVsdCwgdW5sZXNzIHRvdWNoc3RhcnQgb3IgPHNlbGVjdD5cbiAgcmV0dXJuIGV2ZW50LnRhcmdldC5ub2RlTmFtZSAhPSAnU0VMRUNUJztcbn07XG5cbi8vIC0tLS0tIG1vdmUgZXZlbnQgLS0tLS0gLy9cblxuLyoqXG4gKiBkcmFnIG1vdmVcbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gKiBAcGFyYW0ge0V2ZW50IG9yIFRvdWNofSBwb2ludGVyXG4gKi9cbnByb3RvLnBvaW50ZXJNb3ZlID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB2YXIgbW92ZVZlY3RvciA9IHRoaXMuX2RyYWdQb2ludGVyTW92ZSggZXZlbnQsIHBvaW50ZXIgKTtcbiAgdGhpcy5lbWl0RXZlbnQoICdwb2ludGVyTW92ZScsIFsgZXZlbnQsIHBvaW50ZXIsIG1vdmVWZWN0b3IgXSApO1xuICB0aGlzLl9kcmFnTW92ZSggZXZlbnQsIHBvaW50ZXIsIG1vdmVWZWN0b3IgKTtcbn07XG5cbi8vIGJhc2UgcG9pbnRlciBtb3ZlIGxvZ2ljXG5wcm90by5fZHJhZ1BvaW50ZXJNb3ZlID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB2YXIgbW92ZVBvaW50ID0gVW5pcG9pbnRlci5nZXRQb2ludGVyUG9pbnQoIHBvaW50ZXIgKTtcbiAgdmFyIG1vdmVWZWN0b3IgPSB7XG4gICAgeDogbW92ZVBvaW50LnggLSB0aGlzLnBvaW50ZXJEb3duUG9pbnQueCxcbiAgICB5OiBtb3ZlUG9pbnQueSAtIHRoaXMucG9pbnRlckRvd25Qb2ludC55XG4gIH07XG4gIC8vIHN0YXJ0IGRyYWcgaWYgcG9pbnRlciBoYXMgbW92ZWQgZmFyIGVub3VnaCB0byBzdGFydCBkcmFnXG4gIGlmICggIXRoaXMuaXNEcmFnZ2luZyAmJiB0aGlzLmhhc0RyYWdTdGFydGVkKCBtb3ZlVmVjdG9yICkgKSB7XG4gICAgdGhpcy5fZHJhZ1N0YXJ0KCBldmVudCwgcG9pbnRlciApO1xuICB9XG4gIHJldHVybiBtb3ZlVmVjdG9yO1xufTtcblxuLy8gY29uZGl0aW9uIGlmIHBvaW50ZXIgaGFzIG1vdmVkIGZhciBlbm91Z2ggdG8gc3RhcnQgZHJhZ1xucHJvdG8uaGFzRHJhZ1N0YXJ0ZWQgPSBmdW5jdGlvbiggbW92ZVZlY3RvciApIHtcbiAgcmV0dXJuIE1hdGguYWJzKCBtb3ZlVmVjdG9yLnggKSA+IDMgfHwgTWF0aC5hYnMoIG1vdmVWZWN0b3IueSApID4gMztcbn07XG5cblxuLy8gLS0tLS0gZW5kIGV2ZW50IC0tLS0tIC8vXG5cbi8qKlxuICogcG9pbnRlciB1cFxuICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAqIEBwYXJhbSB7RXZlbnQgb3IgVG91Y2h9IHBvaW50ZXJcbiAqL1xucHJvdG8ucG9pbnRlclVwID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB0aGlzLmVtaXRFdmVudCggJ3BvaW50ZXJVcCcsIFsgZXZlbnQsIHBvaW50ZXIgXSApO1xuICB0aGlzLl9kcmFnUG9pbnRlclVwKCBldmVudCwgcG9pbnRlciApO1xufTtcblxucHJvdG8uX2RyYWdQb2ludGVyVXAgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIGlmICggdGhpcy5pc0RyYWdnaW5nICkge1xuICAgIHRoaXMuX2RyYWdFbmQoIGV2ZW50LCBwb2ludGVyICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gcG9pbnRlciBkaWRuJ3QgbW92ZSBlbm91Z2ggZm9yIGRyYWcgdG8gc3RhcnRcbiAgICB0aGlzLl9zdGF0aWNDbGljayggZXZlbnQsIHBvaW50ZXIgKTtcbiAgfVxufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZHJhZyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vLyBkcmFnU3RhcnRcbnByb3RvLl9kcmFnU3RhcnQgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIHRoaXMuaXNEcmFnZ2luZyA9IHRydWU7XG4gIHRoaXMuZHJhZ1N0YXJ0UG9pbnQgPSBVbmlwb2ludGVyLmdldFBvaW50ZXJQb2ludCggcG9pbnRlciApO1xuICAvLyBwcmV2ZW50IGNsaWNrc1xuICB0aGlzLmlzUHJldmVudGluZ0NsaWNrcyA9IHRydWU7XG5cbiAgdGhpcy5kcmFnU3RhcnQoIGV2ZW50LCBwb2ludGVyICk7XG59O1xuXG5wcm90by5kcmFnU3RhcnQgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIHRoaXMuZW1pdEV2ZW50KCAnZHJhZ1N0YXJ0JywgWyBldmVudCwgcG9pbnRlciBdICk7XG59O1xuXG4vLyBkcmFnTW92ZVxucHJvdG8uX2RyYWdNb3ZlID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyLCBtb3ZlVmVjdG9yICkge1xuICAvLyBkbyBub3QgZHJhZyBpZiBub3QgZHJhZ2dpbmcgeWV0XG4gIGlmICggIXRoaXMuaXNEcmFnZ2luZyApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aGlzLmRyYWdNb3ZlKCBldmVudCwgcG9pbnRlciwgbW92ZVZlY3RvciApO1xufTtcblxucHJvdG8uZHJhZ01vdmUgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIsIG1vdmVWZWN0b3IgKSB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIHRoaXMuZW1pdEV2ZW50KCAnZHJhZ01vdmUnLCBbIGV2ZW50LCBwb2ludGVyLCBtb3ZlVmVjdG9yIF0gKTtcbn07XG5cbi8vIGRyYWdFbmRcbnByb3RvLl9kcmFnRW5kID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICAvLyBzZXQgZmxhZ3NcbiAgdGhpcy5pc0RyYWdnaW5nID0gZmFsc2U7XG4gIC8vIHJlLWVuYWJsZSBjbGlja2luZyBhc3luY1xuICBzZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcbiAgICBkZWxldGUgdGhpcy5pc1ByZXZlbnRpbmdDbGlja3M7XG4gIH0uYmluZCggdGhpcyApICk7XG5cbiAgdGhpcy5kcmFnRW5kKCBldmVudCwgcG9pbnRlciApO1xufTtcblxucHJvdG8uZHJhZ0VuZCA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdGhpcy5lbWl0RXZlbnQoICdkcmFnRW5kJywgWyBldmVudCwgcG9pbnRlciBdICk7XG59O1xuXG4vLyAtLS0tLSBvbmNsaWNrIC0tLS0tIC8vXG5cbi8vIGhhbmRsZSBhbGwgY2xpY2tzIGFuZCBwcmV2ZW50IGNsaWNrcyB3aGVuIGRyYWdnaW5nXG5wcm90by5vbmNsaWNrID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICBpZiAoIHRoaXMuaXNQcmV2ZW50aW5nQ2xpY2tzICkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbn07XG5cbi8vIC0tLS0tIHN0YXRpY0NsaWNrIC0tLS0tIC8vXG5cbi8vIHRyaWdnZXJlZCBhZnRlciBwb2ludGVyIGRvd24gJiB1cCB3aXRoIG5vL3RpbnkgbW92ZW1lbnRcbnByb3RvLl9zdGF0aWNDbGljayA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgLy8gaWdub3JlIGVtdWxhdGVkIG1vdXNlIHVwIGNsaWNrc1xuICBpZiAoIHRoaXMuaXNJZ25vcmluZ01vdXNlVXAgJiYgZXZlbnQudHlwZSA9PSAnbW91c2V1cCcgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gYWxsb3cgY2xpY2sgaW4gPGlucHV0PnMgYW5kIDx0ZXh0YXJlYT5zXG4gIHZhciBub2RlTmFtZSA9IGV2ZW50LnRhcmdldC5ub2RlTmFtZTtcbiAgaWYgKCBub2RlTmFtZSA9PSAnSU5QVVQnIHx8IG5vZGVOYW1lID09ICdURVhUQVJFQScgKSB7XG4gICAgZXZlbnQudGFyZ2V0LmZvY3VzKCk7XG4gIH1cbiAgdGhpcy5zdGF0aWNDbGljayggZXZlbnQsIHBvaW50ZXIgKTtcblxuICAvLyBzZXQgZmxhZyBmb3IgZW11bGF0ZWQgY2xpY2tzIDMwMG1zIGFmdGVyIHRvdWNoZW5kXG4gIGlmICggZXZlbnQudHlwZSAhPSAnbW91c2V1cCcgKSB7XG4gICAgdGhpcy5pc0lnbm9yaW5nTW91c2VVcCA9IHRydWU7XG4gICAgLy8gcmVzZXQgZmxhZyBhZnRlciAzMDBtc1xuICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuICAgICAgZGVsZXRlIHRoaXMuaXNJZ25vcmluZ01vdXNlVXA7XG4gICAgfS5iaW5kKCB0aGlzICksIDQwMCApO1xuICB9XG59O1xuXG5wcm90by5zdGF0aWNDbGljayA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdGhpcy5lbWl0RXZlbnQoICdzdGF0aWNDbGljaycsIFsgZXZlbnQsIHBvaW50ZXIgXSApO1xufTtcblxuLy8gLS0tLS0gdXRpbHMgLS0tLS0gLy9cblxuVW5pZHJhZ2dlci5nZXRQb2ludGVyUG9pbnQgPSBVbmlwb2ludGVyLmdldFBvaW50ZXJQb2ludDtcblxuLy8gLS0tLS0gIC0tLS0tIC8vXG5cbnJldHVybiBVbmlkcmFnZ2VyO1xuXG59KSk7XG4iLCIvKiFcbiAqIFVuaXBvaW50ZXIgdjIuMS4wXG4gKiBiYXNlIGNsYXNzIGZvciBkb2luZyBvbmUgdGhpbmcgd2l0aCBwb2ludGVyIGV2ZW50XG4gKiBNSVQgbGljZW5zZVxuICovXG5cbi8qanNoaW50IGJyb3dzZXI6IHRydWUsIHVuZGVmOiB0cnVlLCB1bnVzZWQ6IHRydWUsIHN0cmljdDogdHJ1ZSAqL1xuXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKiBqc2hpbnQgc3RyaWN0OiBmYWxzZSAqLyAvKmdsb2JhbCBkZWZpbmUsIG1vZHVsZSwgcmVxdWlyZSAqL1xuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggW1xuICAgICAgJ2V2LWVtaXR0ZXIvZXYtZW1pdHRlcidcbiAgICBdLCBmdW5jdGlvbiggRXZFbWl0dGVyICkge1xuICAgICAgcmV0dXJuIGZhY3RvcnkoIHdpbmRvdywgRXZFbWl0dGVyICk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICByZXF1aXJlKCdldi1lbWl0dGVyJylcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgd2luZG93LlVuaXBvaW50ZXIgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgd2luZG93LkV2RW1pdHRlclxuICAgICk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCB3aW5kb3csIEV2RW1pdHRlciApIHtcblxuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBub29wKCkge31cblxuZnVuY3Rpb24gVW5pcG9pbnRlcigpIHt9XG5cbi8vIGluaGVyaXQgRXZFbWl0dGVyXG52YXIgcHJvdG8gPSBVbmlwb2ludGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIEV2RW1pdHRlci5wcm90b3R5cGUgKTtcblxucHJvdG8uYmluZFN0YXJ0RXZlbnQgPSBmdW5jdGlvbiggZWxlbSApIHtcbiAgdGhpcy5fYmluZFN0YXJ0RXZlbnQoIGVsZW0sIHRydWUgKTtcbn07XG5cbnByb3RvLnVuYmluZFN0YXJ0RXZlbnQgPSBmdW5jdGlvbiggZWxlbSApIHtcbiAgdGhpcy5fYmluZFN0YXJ0RXZlbnQoIGVsZW0sIGZhbHNlICk7XG59O1xuXG4vKipcbiAqIHdvcmtzIGFzIHVuYmluZGVyLCBhcyB5b3UgY2FuIC5fYmluZFN0YXJ0KCBmYWxzZSApIHRvIHVuYmluZFxuICogQHBhcmFtIHtCb29sZWFufSBpc0JpbmQgLSB3aWxsIHVuYmluZCBpZiBmYWxzZXlcbiAqL1xucHJvdG8uX2JpbmRTdGFydEV2ZW50ID0gZnVuY3Rpb24oIGVsZW0sIGlzQmluZCApIHtcbiAgLy8gbXVuZ2UgaXNCaW5kLCBkZWZhdWx0IHRvIHRydWVcbiAgaXNCaW5kID0gaXNCaW5kID09PSB1bmRlZmluZWQgPyB0cnVlIDogISFpc0JpbmQ7XG4gIHZhciBiaW5kTWV0aG9kID0gaXNCaW5kID8gJ2FkZEV2ZW50TGlzdGVuZXInIDogJ3JlbW92ZUV2ZW50TGlzdGVuZXInO1xuXG4gIGlmICggd2luZG93Lm5hdmlnYXRvci5wb2ludGVyRW5hYmxlZCApIHtcbiAgICAvLyBXM0MgUG9pbnRlciBFdmVudHMsIElFMTEuIFNlZSBodHRwczovL2NvZGVyd2FsbC5jb20vcC9tZnJlY2FcbiAgICBlbGVtWyBiaW5kTWV0aG9kIF0oICdwb2ludGVyZG93bicsIHRoaXMgKTtcbiAgfSBlbHNlIGlmICggd2luZG93Lm5hdmlnYXRvci5tc1BvaW50ZXJFbmFibGVkICkge1xuICAgIC8vIElFMTAgUG9pbnRlciBFdmVudHNcbiAgICBlbGVtWyBiaW5kTWV0aG9kIF0oICdNU1BvaW50ZXJEb3duJywgdGhpcyApO1xuICB9IGVsc2Uge1xuICAgIC8vIGxpc3RlbiBmb3IgYm90aCwgZm9yIGRldmljZXMgbGlrZSBDaHJvbWUgUGl4ZWxcbiAgICBlbGVtWyBiaW5kTWV0aG9kIF0oICdtb3VzZWRvd24nLCB0aGlzICk7XG4gICAgZWxlbVsgYmluZE1ldGhvZCBdKCAndG91Y2hzdGFydCcsIHRoaXMgKTtcbiAgfVxufTtcblxuLy8gdHJpZ2dlciBoYW5kbGVyIG1ldGhvZHMgZm9yIGV2ZW50c1xucHJvdG8uaGFuZGxlRXZlbnQgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHZhciBtZXRob2QgPSAnb24nICsgZXZlbnQudHlwZTtcbiAgaWYgKCB0aGlzWyBtZXRob2QgXSApIHtcbiAgICB0aGlzWyBtZXRob2QgXSggZXZlbnQgKTtcbiAgfVxufTtcblxuLy8gcmV0dXJucyB0aGUgdG91Y2ggdGhhdCB3ZSdyZSBrZWVwaW5nIHRyYWNrIG9mXG5wcm90by5nZXRUb3VjaCA9IGZ1bmN0aW9uKCB0b3VjaGVzICkge1xuICBmb3IgKCB2YXIgaT0wOyBpIDwgdG91Y2hlcy5sZW5ndGg7IGkrKyApIHtcbiAgICB2YXIgdG91Y2ggPSB0b3VjaGVzW2ldO1xuICAgIGlmICggdG91Y2guaWRlbnRpZmllciA9PSB0aGlzLnBvaW50ZXJJZGVudGlmaWVyICkge1xuICAgICAgcmV0dXJuIHRvdWNoO1xuICAgIH1cbiAgfVxufTtcblxuLy8gLS0tLS0gc3RhcnQgZXZlbnQgLS0tLS0gLy9cblxucHJvdG8ub25tb3VzZWRvd24gPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIC8vIGRpc21pc3MgY2xpY2tzIGZyb20gcmlnaHQgb3IgbWlkZGxlIGJ1dHRvbnNcbiAgdmFyIGJ1dHRvbiA9IGV2ZW50LmJ1dHRvbjtcbiAgaWYgKCBidXR0b24gJiYgKCBidXR0b24gIT09IDAgJiYgYnV0dG9uICE9PSAxICkgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMuX3BvaW50ZXJEb3duKCBldmVudCwgZXZlbnQgKTtcbn07XG5cbnByb3RvLm9udG91Y2hzdGFydCA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgdGhpcy5fcG9pbnRlckRvd24oIGV2ZW50LCBldmVudC5jaGFuZ2VkVG91Y2hlc1swXSApO1xufTtcblxucHJvdG8ub25NU1BvaW50ZXJEb3duID1cbnByb3RvLm9ucG9pbnRlcmRvd24gPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHRoaXMuX3BvaW50ZXJEb3duKCBldmVudCwgZXZlbnQgKTtcbn07XG5cbi8qKlxuICogcG9pbnRlciBzdGFydFxuICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAqIEBwYXJhbSB7RXZlbnQgb3IgVG91Y2h9IHBvaW50ZXJcbiAqL1xucHJvdG8uX3BvaW50ZXJEb3duID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICAvLyBkaXNtaXNzIG90aGVyIHBvaW50ZXJzXG4gIGlmICggdGhpcy5pc1BvaW50ZXJEb3duICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRoaXMuaXNQb2ludGVyRG93biA9IHRydWU7XG4gIC8vIHNhdmUgcG9pbnRlciBpZGVudGlmaWVyIHRvIG1hdGNoIHVwIHRvdWNoIGV2ZW50c1xuICB0aGlzLnBvaW50ZXJJZGVudGlmaWVyID0gcG9pbnRlci5wb2ludGVySWQgIT09IHVuZGVmaW5lZCA/XG4gICAgLy8gcG9pbnRlcklkIGZvciBwb2ludGVyIGV2ZW50cywgdG91Y2guaW5kZW50aWZpZXIgZm9yIHRvdWNoIGV2ZW50c1xuICAgIHBvaW50ZXIucG9pbnRlcklkIDogcG9pbnRlci5pZGVudGlmaWVyO1xuXG4gIHRoaXMucG9pbnRlckRvd24oIGV2ZW50LCBwb2ludGVyICk7XG59O1xuXG5wcm90by5wb2ludGVyRG93biA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdGhpcy5fYmluZFBvc3RTdGFydEV2ZW50cyggZXZlbnQgKTtcbiAgdGhpcy5lbWl0RXZlbnQoICdwb2ludGVyRG93bicsIFsgZXZlbnQsIHBvaW50ZXIgXSApO1xufTtcblxuLy8gaGFzaCBvZiBldmVudHMgdG8gYmUgYm91bmQgYWZ0ZXIgc3RhcnQgZXZlbnRcbnZhciBwb3N0U3RhcnRFdmVudHMgPSB7XG4gIG1vdXNlZG93bjogWyAnbW91c2Vtb3ZlJywgJ21vdXNldXAnIF0sXG4gIHRvdWNoc3RhcnQ6IFsgJ3RvdWNobW92ZScsICd0b3VjaGVuZCcsICd0b3VjaGNhbmNlbCcgXSxcbiAgcG9pbnRlcmRvd246IFsgJ3BvaW50ZXJtb3ZlJywgJ3BvaW50ZXJ1cCcsICdwb2ludGVyY2FuY2VsJyBdLFxuICBNU1BvaW50ZXJEb3duOiBbICdNU1BvaW50ZXJNb3ZlJywgJ01TUG9pbnRlclVwJywgJ01TUG9pbnRlckNhbmNlbCcgXVxufTtcblxucHJvdG8uX2JpbmRQb3N0U3RhcnRFdmVudHMgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIGlmICggIWV2ZW50ICkge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBnZXQgcHJvcGVyIGV2ZW50cyB0byBtYXRjaCBzdGFydCBldmVudFxuICB2YXIgZXZlbnRzID0gcG9zdFN0YXJ0RXZlbnRzWyBldmVudC50eXBlIF07XG4gIC8vIGJpbmQgZXZlbnRzIHRvIG5vZGVcbiAgZXZlbnRzLmZvckVhY2goIGZ1bmN0aW9uKCBldmVudE5hbWUgKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoIGV2ZW50TmFtZSwgdGhpcyApO1xuICB9LCB0aGlzICk7XG4gIC8vIHNhdmUgdGhlc2UgYXJndW1lbnRzXG4gIHRoaXMuX2JvdW5kUG9pbnRlckV2ZW50cyA9IGV2ZW50cztcbn07XG5cbnByb3RvLl91bmJpbmRQb3N0U3RhcnRFdmVudHMgPSBmdW5jdGlvbigpIHtcbiAgLy8gY2hlY2sgZm9yIF9ib3VuZEV2ZW50cywgaW4gY2FzZSBkcmFnRW5kIHRyaWdnZXJlZCB0d2ljZSAob2xkIElFOCBidWcpXG4gIGlmICggIXRoaXMuX2JvdW5kUG9pbnRlckV2ZW50cyApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5fYm91bmRQb2ludGVyRXZlbnRzLmZvckVhY2goIGZ1bmN0aW9uKCBldmVudE5hbWUgKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoIGV2ZW50TmFtZSwgdGhpcyApO1xuICB9LCB0aGlzICk7XG5cbiAgZGVsZXRlIHRoaXMuX2JvdW5kUG9pbnRlckV2ZW50cztcbn07XG5cbi8vIC0tLS0tIG1vdmUgZXZlbnQgLS0tLS0gLy9cblxucHJvdG8ub25tb3VzZW1vdmUgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHRoaXMuX3BvaW50ZXJNb3ZlKCBldmVudCwgZXZlbnQgKTtcbn07XG5cbnByb3RvLm9uTVNQb2ludGVyTW92ZSA9XG5wcm90by5vbnBvaW50ZXJtb3ZlID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICBpZiAoIGV2ZW50LnBvaW50ZXJJZCA9PSB0aGlzLnBvaW50ZXJJZGVudGlmaWVyICkge1xuICAgIHRoaXMuX3BvaW50ZXJNb3ZlKCBldmVudCwgZXZlbnQgKTtcbiAgfVxufTtcblxucHJvdG8ub250b3VjaG1vdmUgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHZhciB0b3VjaCA9IHRoaXMuZ2V0VG91Y2goIGV2ZW50LmNoYW5nZWRUb3VjaGVzICk7XG4gIGlmICggdG91Y2ggKSB7XG4gICAgdGhpcy5fcG9pbnRlck1vdmUoIGV2ZW50LCB0b3VjaCApO1xuICB9XG59O1xuXG4vKipcbiAqIHBvaW50ZXIgbW92ZVxuICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAqIEBwYXJhbSB7RXZlbnQgb3IgVG91Y2h9IHBvaW50ZXJcbiAqIEBwcml2YXRlXG4gKi9cbnByb3RvLl9wb2ludGVyTW92ZSA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdGhpcy5wb2ludGVyTW92ZSggZXZlbnQsIHBvaW50ZXIgKTtcbn07XG5cbi8vIHB1YmxpY1xucHJvdG8ucG9pbnRlck1vdmUgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIHRoaXMuZW1pdEV2ZW50KCAncG9pbnRlck1vdmUnLCBbIGV2ZW50LCBwb2ludGVyIF0gKTtcbn07XG5cbi8vIC0tLS0tIGVuZCBldmVudCAtLS0tLSAvL1xuXG5cbnByb3RvLm9ubW91c2V1cCA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgdGhpcy5fcG9pbnRlclVwKCBldmVudCwgZXZlbnQgKTtcbn07XG5cbnByb3RvLm9uTVNQb2ludGVyVXAgPVxucHJvdG8ub25wb2ludGVydXAgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIGlmICggZXZlbnQucG9pbnRlcklkID09IHRoaXMucG9pbnRlcklkZW50aWZpZXIgKSB7XG4gICAgdGhpcy5fcG9pbnRlclVwKCBldmVudCwgZXZlbnQgKTtcbiAgfVxufTtcblxucHJvdG8ub250b3VjaGVuZCA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgdmFyIHRvdWNoID0gdGhpcy5nZXRUb3VjaCggZXZlbnQuY2hhbmdlZFRvdWNoZXMgKTtcbiAgaWYgKCB0b3VjaCApIHtcbiAgICB0aGlzLl9wb2ludGVyVXAoIGV2ZW50LCB0b3VjaCApO1xuICB9XG59O1xuXG4vKipcbiAqIHBvaW50ZXIgdXBcbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gKiBAcGFyYW0ge0V2ZW50IG9yIFRvdWNofSBwb2ludGVyXG4gKiBAcHJpdmF0ZVxuICovXG5wcm90by5fcG9pbnRlclVwID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB0aGlzLl9wb2ludGVyRG9uZSgpO1xuICB0aGlzLnBvaW50ZXJVcCggZXZlbnQsIHBvaW50ZXIgKTtcbn07XG5cbi8vIHB1YmxpY1xucHJvdG8ucG9pbnRlclVwID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB0aGlzLmVtaXRFdmVudCggJ3BvaW50ZXJVcCcsIFsgZXZlbnQsIHBvaW50ZXIgXSApO1xufTtcblxuLy8gLS0tLS0gcG9pbnRlciBkb25lIC0tLS0tIC8vXG5cbi8vIHRyaWdnZXJlZCBvbiBwb2ludGVyIHVwICYgcG9pbnRlciBjYW5jZWxcbnByb3RvLl9wb2ludGVyRG9uZSA9IGZ1bmN0aW9uKCkge1xuICAvLyByZXNldCBwcm9wZXJ0aWVzXG4gIHRoaXMuaXNQb2ludGVyRG93biA9IGZhbHNlO1xuICBkZWxldGUgdGhpcy5wb2ludGVySWRlbnRpZmllcjtcbiAgLy8gcmVtb3ZlIGV2ZW50c1xuICB0aGlzLl91bmJpbmRQb3N0U3RhcnRFdmVudHMoKTtcbiAgdGhpcy5wb2ludGVyRG9uZSgpO1xufTtcblxucHJvdG8ucG9pbnRlckRvbmUgPSBub29wO1xuXG4vLyAtLS0tLSBwb2ludGVyIGNhbmNlbCAtLS0tLSAvL1xuXG5wcm90by5vbk1TUG9pbnRlckNhbmNlbCA9XG5wcm90by5vbnBvaW50ZXJjYW5jZWwgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIGlmICggZXZlbnQucG9pbnRlcklkID09IHRoaXMucG9pbnRlcklkZW50aWZpZXIgKSB7XG4gICAgdGhpcy5fcG9pbnRlckNhbmNlbCggZXZlbnQsIGV2ZW50ICk7XG4gIH1cbn07XG5cbnByb3RvLm9udG91Y2hjYW5jZWwgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHZhciB0b3VjaCA9IHRoaXMuZ2V0VG91Y2goIGV2ZW50LmNoYW5nZWRUb3VjaGVzICk7XG4gIGlmICggdG91Y2ggKSB7XG4gICAgdGhpcy5fcG9pbnRlckNhbmNlbCggZXZlbnQsIHRvdWNoICk7XG4gIH1cbn07XG5cbi8qKlxuICogcG9pbnRlciBjYW5jZWxcbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gKiBAcGFyYW0ge0V2ZW50IG9yIFRvdWNofSBwb2ludGVyXG4gKiBAcHJpdmF0ZVxuICovXG5wcm90by5fcG9pbnRlckNhbmNlbCA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdGhpcy5fcG9pbnRlckRvbmUoKTtcbiAgdGhpcy5wb2ludGVyQ2FuY2VsKCBldmVudCwgcG9pbnRlciApO1xufTtcblxuLy8gcHVibGljXG5wcm90by5wb2ludGVyQ2FuY2VsID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB0aGlzLmVtaXRFdmVudCggJ3BvaW50ZXJDYW5jZWwnLCBbIGV2ZW50LCBwb2ludGVyIF0gKTtcbn07XG5cbi8vIC0tLS0tICAtLS0tLSAvL1xuXG4vLyB1dGlsaXR5IGZ1bmN0aW9uIGZvciBnZXR0aW5nIHgveSBjb29yZHMgZnJvbSBldmVudFxuVW5pcG9pbnRlci5nZXRQb2ludGVyUG9pbnQgPSBmdW5jdGlvbiggcG9pbnRlciApIHtcbiAgcmV0dXJuIHtcbiAgICB4OiBwb2ludGVyLnBhZ2VYLFxuICAgIHk6IHBvaW50ZXIucGFnZVlcbiAgfTtcbn07XG5cbi8vIC0tLS0tICAtLS0tLSAvL1xuXG5yZXR1cm4gVW5pcG9pbnRlcjtcblxufSkpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKlxuICogbWFpbi5qc1xuICpcbiAqIEBzdW1tYXJ5IE5lbHNvbiBDYXNoIFdlYnNpdGUgU2NyaXB0IFJvb3RcbiAqXG4gKiBQbGVhc2UsIGxpbWl0IEphdmFTY3JpcHQgaW5zaWRlIHRoaXMgZmlsZS4gQ3JlYXRlIE1vZHVsZXMhXG4gKlxuICogQGNvcHlyaWdodCBOZWxzb24gQ2FzaCwgMjAxNlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qIEV4dGVybmFsID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbnZhciAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG52YXIgVEhSRUUgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snVEhSRUUnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ1RIUkVFJ10gOiBudWxsKTtcbnJlcXVpcmUoJ09CSkxvYWRlcicpO1xudmFyIHNhdmVTdmdBc1BuZyA9IHJlcXVpcmUoJ3NhdmUtc3ZnLWFzLXBuZycpO1xudmFyIHNwZWN0cnVtID0gcmVxdWlyZSgnc3BlY3RydW0tY29sb3JwaWNrZXInKTtcbnZhciBEcmFnZ2FiaWxseSA9IHJlcXVpcmUoJ2RyYWdnYWJpbGx5Jyk7XG52YXIgZGVib3VuY2UgPSByZXF1aXJlKCdsb2Rhc2guZGVib3VuY2UnKTtcblxudmFyIGxhenlTaXplcyA9IHJlcXVpcmUoJ2xhenlzaXplcy9sYXp5c2l6ZXMuanMnKTtcbnZhciB1bnZlaWxob29rcyA9IHJlcXVpcmUoJ2xhenlzaXplcy9wbHVnaW5zL3VudmVpbGhvb2tzL2xzLnVudmVpbGhvb2tzLmpzJyk7XG5sYXp5U2l6ZXMuaW5pdCgpO1xuXG52YXIgZ2lmc2hvdCA9IHJlcXVpcmUoJ2dpZnNob3QnKTtcbnZhciBicm93c2VyID0gcmVxdWlyZSgnYm93c2VyJyk7XG5cbnZhciBEZXRlY3RvciA9IHJlcXVpcmUoJ0RldGVjdG9yJyk7XG5cbmlmICghRGV0ZWN0b3Iud2ViZ2wpIHtcbiAgRGV0ZWN0b3IuYWRkR2V0V2ViR0xNZXNzYWdlKCk7XG4gICQoJ2JvZHknKS5hZGRDbGFzcygnaGlkZS1jYW52Jyk7XG59XG5cbmlmIChicm93c2VyLm1zaWUgJiYgYnJvd3Nlci52ZXJzaW9uIDw9IDExLjApIHtcbiAgJCgnLmludGVybmV0LWV4cGxvcmVyJykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAkKCdib2R5JykuYWRkQ2xhc3MoJ2hpZGUtY2FudicpO1xufVxuXG5cbi8qIEludGVyYWwgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbnZhciBjYW1lcmE7XG52YXIgc2NlbmU7XG52YXIgcmVuZGVyZXI7XG52YXIgZ2VvbWV0cnk7XG52YXIgbWF0ZXJpYWw7XG52YXIgZnJhbWUgPSAwO1xudmFyIG1vdXNlWCA9IDA7XG52YXIgbW91c2VZID0gMDtcbnZhciB3aW5kb3dIYWxmWCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gMjtcbnZhciB3aW5kb3dIYWxmWSA9IHdpbmRvdy5pbm5lckhlaWdodCAvIDI7XG5cbnZhciBjYW52V2lkdGg7XG52YXIgY2FudkhlaWdodDtcblxudmFyIGdpZkFycmF5ID0gW107XG52YXIgYW5pbWF0ZWRHaWY7XG5cbnZhciBmcmFtZXMgPSAxMjtcblxudmFyIGNhbk9iamVjdDtcbnZhciBjYW5QaXZvdDtcblxudmFyIHNpbmdsZUltYWdlO1xudmFyIHB1dElkO1xudmFyIHB1dFNsdWc7XG5cbnZhciBzdmdUZXh0ID0gJCgnc3ZnICN0eXBlIHRleHQnKTtcbnN2Z1RleHQuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJyk7XG5zdmdUZXh0LmF0dHIoJ3gnLCAnNTgnKTtcbnN2Z1RleHQuYXR0cigneScsICctMycpO1xuXG52YXIgZmxhdm9yO1xudmFyICRib2R5ID0gJCgnYm9keScpO1xudmFyICRqc0lucHV0ID0gJCgnLmpzLWlucHV0Jyk7XG52YXIgJGlucHV0Q29sb3IgPSAkKCdpbnB1dFt0eXBlPVwiY29sb3JcIl0nKTtcbnZhciAkc3BSZXBsYWNlciA9ICQoJy5zcC1yZXBsYWNlcicpO1xuXG5cbi8vIERpc2NsYWltZXI6IGZ1Y2sgdGhlIG1hbiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmZ1bmN0aW9uIGRpc2NsYWltZXIoKSB7XG4gIGlmIChkb2N1bWVudC5jb29raWUucmVwbGFjZSgvKD86KD86XnwuKjtcXHMqKWNsb3NlZE15TGFDcm9peE1vZGFsXFxzKlxcPVxccyooW147XSopLiokKXxeLiokLywgJyQxJykgIT09ICd0cnVlJykge1xuICAgICRib2R5LmFkZENsYXNzKCdtb2RhbC1vcGVuJyk7XG4gIH1cbn1cbi8vIGRpc2NsYWltZXIoKTtcblxuaWYgKHdpbmRvdy5sb2NhdGlvbi5oYXNoKSB7XG4gIHZhciBoYXNoID0gd2luZG93LmxvY2F0aW9uLmhhc2guc3Vic3RyaW5nKDEpO1xuICBjb25zb2xlLmxvZygnaGFzaDogJyArIGhhc2gpO1xuICBpZiAoaGFzaCAhPT0gJ2NsZWFuJykge1xuICAgIGRpc2NsYWltZXIoKTtcbiAgfVxufSBlbHNlIHtcbiAgZGlzY2xhaW1lcigpO1xufVxuLy8gY29uc29sZS5sb2coJ3dpbmRvdy5sb2NhdGlvbi5oYXNoJywgd2luZG93LmxvY2F0aW9uLmhhc2gpO1xuXG52YXIgJGJhY2tkcm9wID0gJCgnLmpzLWJhY2tkcm9wJyk7XG4kYmFja2Ryb3Aub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnNvbGUubG9nKCdjbG9zZSBtb2RhbCBiYWNrZHJvcCcpO1xuICAkYm9keS5yZW1vdmVDbGFzcygnbW9kYWwtb3BlbicpO1xuICBkb2N1bWVudC5jb29raWUgPSBcImNsb3NlZE15TGFDcm9peE1vZGFsPXRydWU7IGV4cGlyZXM9RnJpLCAzMSBEZWMgOTk5OSAyMzo1OTo1OSBHTVRcIjtcbn0pO1xuXG4kKCcuanMtY2xvc2UtbW9kYWwnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgY29uc29sZS5sb2coJ2Nsb3NlIG1vZGFsJyk7XG4gICRib2R5LnJlbW92ZUNsYXNzKCdtb2RhbC1vcGVuJyk7XG4gIGRvY3VtZW50LmNvb2tpZSA9IFwiY2xvc2VkTXlMYUNyb2l4TW9kYWw9dHJ1ZTsgZXhwaXJlcz1GcmksIDMxIERlYyA5OTk5IDIzOjU5OjU5IEdNVFwiO1xufSk7XG5cblxuXG4vLyBURVhUVVJFID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxudmFyIHRleHR1cmVMb2FkZXIgPSBuZXcgVEhSRUUuVGV4dHVyZUxvYWRlcigpO1xuXG4vLyBURVhUVVJFOiBCVU1QID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxudmFyIHRleHR1cmVCdW1wID0gdGV4dHVyZUxvYWRlci5sb2FkKCcvaW1hZ2VzL3RleHR1cmUtYnVtcC5wbmcnKTtcbi8vIFNldCBNYXAgUmVuZGVyIEZpbHRlcmluZ1xudGV4dHVyZUJ1bXAubWluRmlsdGVyID0gVEhSRUUuTmVhcmVzdEZpbHRlcjtcbnRleHR1cmVCdW1wLm5lZWRzVXBkYXRlID0gdHJ1ZTtcblxuLy8gVEVYVFVSRTogQU1CSUVOVCBPQ0NMVVNJT04gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbnZhciB0ZXh0dXJlQW8gPSB0ZXh0dXJlTG9hZGVyLmxvYWQoJy9pbWFnZXMvdGV4dHVyZS1hby5qcGcnKTtcbi8vIE1hcCBSZW5kZXIgRmlsdGVyaW5nXG50ZXh0dXJlQW8ubWluRmlsdGVyID0gVEhSRUUuTGluZWFyRmlsdGVyO1xudGV4dHVyZUFvLm5lZWRzVXBkYXRlID0gdHJ1ZTtcblxuXG52YXIgY2FuID0gZnVuY3Rpb24odGV4dHVyZSkgeyAvLyB0ZXh0dXJlXG5cbiAgdmFyIGxvYWRlciA9IG5ldyBUSFJFRS5PQkpMb2FkZXIoKTtcbiAgbG9hZGVyLmxvYWQoJy9pbWFnZXMvY2FuNC5vYmonLCBmdW5jdGlvbihvYmplY3QpIHtcbiAgICBjYW5PYmplY3QgPSBvYmplY3Q7XG4gICAgLy8gdmFyIGFvID0gVEhSRUUuSW1hZ2VVdGlscy5sb2FkVGV4dHVyZSgnLi4vaW1hZ2VzL2FvdGV4dHVyZS5qcGcnKTtcbiAgICAvLyBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7c2hhZGluZzogVEhSRUUuU21vb3RoU2hhZGluZywgY29sb3I6IDB4ZmZmZmZmLCBhbWJpZW50OiAweGZmZmZmZiwgZW1pc3NpdmU6IDB4YTdhN2E3LCBzcGVjdWxhcjogMHhmZmZmZmYsIHNoaW5pbmVzczogLjcsIG1hcDogdGV4dHVyZSwgdHJhbnNwYXJlbnQ6IHRydWUsIG9wYWNpdHk6IDF9KTtcbiAgICBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7XG4gICAgLy8gbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaFBob25nTWF0ZXJpYWwoe1xuICAgICAgbWFwOiB0ZXh0dXJlLFxuICAgICAgYnVtcE1hcDogdGV4dHVyZUJ1bXAsXG4gICAgICBzaWRlOiBUSFJFRS5Gcm9udFNpZGUsXG4gICAgICBhb01hcDogdGV4dHVyZUFvLFxuICAgICAgLy8gU3Ryb25nZXIgQU8gU2hhZG93cyBQbGVhc2UgOilcbiAgICAgIGFvTWFwSW50ZW5zaXR5OiAwLjM1LFxuICAgICAgc2hhZGluZzogVEhSRUUuU21vb3RoU2hhZGluZyxcbiAgICAgIHJvdWdobmVzczogMC41NSxcbiAgICAgIG1ldGFsbmVzczogMC40NSxcbiAgICB9KTtcblxuICAgIGNhbk9iamVjdC50cmF2ZXJzZShmdW5jdGlvbihjaGlsZCkge1xuICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgVEhSRUUuTWVzaCkge1xuICAgICAgICBjaGlsZC5tYXRlcmlhbCA9IG1hdGVyaWFsO1xuICAgICAgICBjaGlsZC5tYXRlcmlhbC5tYXAubmVlZHNVcGRhdGUgPSB0cnVlO1xuICAgICAgICBjaGlsZC5tYXRlcmlhbC5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBVVlc6IDJuZCBVVnMgUmVxdWlyZWQgZm9yIEFPID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgICB2YXIgY2FuR2VvbWV0cnkgPSBjYW5PYmplY3QuY2hpbGRyZW5bMF0uZ2VvbWV0cnk7XG4gICAgdmFyIHV2cyA9IGNhbkdlb21ldHJ5LmF0dHJpYnV0ZXMudXYuYXJyYXk7XG4gICAgY2FuR2VvbWV0cnkuYWRkQXR0cmlidXRlKCAndXYyJywgbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZSggdXZzLCAyICkgKTtcblxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgIGNhbk9iamVjdC5wb3NpdGlvbi55ID0gLTEyLjI4O1xuICAgIHNjZW5lLmFkZChjYW5PYmplY3QpO1xuICAgIC8vIHJvdGF0ZSBmcm9tIGNlbnRlciBvZiBvYmplY3RcbiAgICBjYW5QaXZvdCA9IG5ldyBUSFJFRS5PYmplY3QzRCgpO1xuICAgIGNhblBpdm90LmFkZChjYW5PYmplY3QpO1xuICAgIHNjZW5lLmFkZChjYW5QaXZvdCk7XG4gIH0pO1xufTtcblxuXG4vLyBDb252ZXJ0IG91ciBzdmcgdG8gY2FudmFzIHRvIHJlbmRlciBvbiBjYW5cbnZhciB0Y2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG50Y2FudmFzLndpZHRoID0gMTAyNDtcbnRjYW52YXMuaGVpZ2h0ID0gMTAyNDtcbnZhciBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbi8vIHZhciBlc3N2ZWVnZWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGFiZWwnKTtcbnZhciBlc3N2ZWVnZWUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc3ZnJylbMF07XG52YXIgY3JlYXRlSW1hZ2VPbkNhbnZhcyA9IGZ1bmN0aW9uKCkge1xuICBzYXZlU3ZnQXNQbmcuc3ZnQXNEYXRhVXJpKGVzc3ZlZWdlZSwge30sIGZ1bmN0aW9uKHVyaSkge1xuICAgIGltZy5zcmMgPSB1cmk7XG4gIH0pO1xuICByZXR1cm4gaW1nO1xufTtcblxudmFyIHNldHVwID0gZnVuY3Rpb24oKSB7XG4gIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDcwMCkge1xuICAgIGNhbnZXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoICogMC43NTtcbiAgfSBlbHNlIHtcbiAgICBjYW52V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgfVxuICBjYW52SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4gIHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoe1xuICAgIGFscGhhOiB0cnVlLFxuICAgIGFudGlhbGlhczogdHJ1ZSwgLy8gU21vb3RoIE9iamVjdCBFZGdlc1xuICAgIC8vIFBoeXNpY2FsIENhbWVyYSB1c2UgTG9nYXJpdGhtaWMgRGVwdGguLi4gTGlrZSBOYXJ3YWxzLlxuICAgIGxvZ2FyaXRobWljRGVwdGhCdWZmZXI6IHRydWUsXG4gIH0pO1xuICByZW5kZXJlci5zZXRDbGVhckNvbG9yKCAweDAwMDAwMCwgMCApO1xuXG4gIC8vIEFkanVzdCBQaXhlbCBSYXRpbyBmb3IgUmV0aW5hIERpc3BsYXlzXG4gIHJlbmRlcmVyLnNldFBpeGVsUmF0aW8od2luZG93LmRldmljZVBpeGVsUmF0aW8gKTtcbiAgcmVuZGVyZXIuc2V0U2l6ZShjYW52V2lkdGgsIGNhbnZIZWlnaHQpO1xuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1jYW52YXMtY29udGFpbmVyJykuYXBwZW5kQ2hpbGQocmVuZGVyZXIuZG9tRWxlbWVudCk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1jYW52YXMtY29udGFpbmVyJykuY2xhc3NMaXN0LmFkZCgnbG9hZGVkJyk7XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgb25Eb2N1bWVudE1vdXNlTW92ZSwgZmFsc2UpXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBvbldpbmRvd1Jlc2l6ZSwgZmFsc2UgKTtcblxuICBjYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoNDUsIGNhbnZXaWR0aC9jYW52SGVpZ2h0LCAxLCAyMDAwKTtcbiAgY2FtZXJhLnBvc2l0aW9uLnogPSA1MDtcblxuICBzY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuXG4gIC8vIExJR0hUID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICB2YXIgYW1iaWVudCA9IG5ldyBUSFJFRS5BbWJpZW50TGlnaHQoMHhmZmZmZmYsIDAuNSk7XG4gIHNjZW5lLmFkZChhbWJpZW50KTtcblxuXG4gIC8vIExJR0hUOiBTS1lMSUdIVCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICB2YXIgaGVtaXNwaGVyZUxpZ2h0ID0gbmV3IFRIUkVFLkhlbWlzcGhlcmVMaWdodCgweEZDRkNENywgMHgwODA4MjAsIDAuNDUpO1xuICBzY2VuZS5hZGQoaGVtaXNwaGVyZUxpZ2h0KTtcblxuICAvLyBMSUdIVDogS0VZIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgdmFyIGRpcmVjdGlvbmFsTGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweEZDRkNENywgMC43KTtcbiAgLy8gdmFyIGRpcmVjdGlvbmFsTGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGZmZmZmZiwgMSk7XG4gIC8vIFBvc2l0aW9uIEZhciBSaWdodFxuICBkaXJlY3Rpb25hbExpZ2h0LnBvc2l0aW9uLnNldCggNTAsIC0yLjUsIDI1ICk7XG4gIGRpcmVjdGlvbmFsTGlnaHQuY2FzdFNoYWRvdyA9IHRydWU7XG4gIHNjZW5lLmFkZChkaXJlY3Rpb25hbExpZ2h0KTtcblxuICAvLyBMSUdIVDogRklMTCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgdmFyIGZpbGxMaWdodCA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4RkZGMERCLCAwLjQ1KTtcbiAgLy8gUG9zaXRpb24gRmFyIExlZnRcbiAgZmlsbExpZ2h0LnBvc2l0aW9uLnNldCggLTUwLCAtMi41LCA1MCApO1xuICBzY2VuZS5hZGQoZmlsbExpZ2h0KTtcblxuXG4gIGNyZWF0ZUltYWdlT25DYW52YXMoKTtcbiAgdmFyIHRleHR1cmUgPSBuZXcgVEhSRUUuVGV4dHVyZSh0Y2FudmFzKTtcbiAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xNjM3MDYxNy9pcy1pdC1wb3NzaWJsZS10by11c2UtYS0yZC1jYW52YXMtYXMtYS10ZXh0dXJlLWZvci1hLWN1YmVcbiAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgIHRjYW52YXMuZ2V0Q29udGV4dCgnMmQnKS5kcmF3SW1hZ2UoaW1nLCAwLCAwKTtcbiAgICB0ZXh0dXJlLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxuICBjYW4odGV4dHVyZSk7XG59O1xuXG52YXIgdXBkYXRlQ2FuID0gZnVuY3Rpb24oKSB7XG4gIGNyZWF0ZUltYWdlT25DYW52YXMoKTtcbiAgdmFyIHVwZGF0ZWRUZXh0dXJlID0gbmV3IFRIUkVFLlRleHR1cmUodGNhbnZhcyk7XG4gIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTYzNzA2MTcvaXMtaXQtcG9zc2libGUtdG8tdXNlLWEtMmQtY2FudmFzLWFzLWEtdGV4dHVyZS1mb3ItYS1jdWJlXG4gIGltZy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICB0Y2FudmFzLmdldENvbnRleHQoJzJkJykuZHJhd0ltYWdlKGltZywgMCwgMCk7XG4gICAgdXBkYXRlZFRleHR1cmUubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgaWYgKGNhbk9iamVjdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgY2FuT2JqZWN0LnRyYXZlcnNlKGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBUSFJFRS5NZXNoKSB7XG4gICAgICAgIGNoaWxkLm1hdGVyaWFsLm1hcCA9IHVwZGF0ZWRUZXh0dXJlO1xuICAgICAgICBjaGlsZC5tYXRlcmlhbC5tYXAubmVlZHNVcGRhdGUgPSB0cnVlO1xuICAgICAgICBjaGlsZC5tYXRlcmlhbC5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn07XG5cbnZhciB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuXG52YXIgb25XaW5kb3dSZXNpemUgPSBmdW5jdGlvbiAoKSB7XG5cbiAgLy8gcHJldmVudCBpb3MgcmVzaXplIG9uIHNjcm9sbFxuICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzg4OTg0MTIvaXBob25lLWlwYWQtdHJpZ2dlcmluZy11bmV4cGVjdGVkLXJlc2l6ZS1ldmVudHNcbiAgaWYgKHdpbmRvdy5pbm5lcldpZHRoICE9IHdpbmRvd1dpZHRoKSB7XG4gICAgY2FudldpZHRoID0gd2luZG93LmlubmVyV2lkdGggKiAwLjc1O1xuICAgIGNhbnZIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICB3aW5kb3dIYWxmWCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gMjtcbiAgICB3aW5kb3dIYWxmWSA9IHdpbmRvdy5pbm5lckhlaWdodCAvIDI7XG5cbiAgICBjYW1lcmEuYXNwZWN0ID0gY2FudldpZHRoIC8gY2FudkhlaWdodDtcbiAgICBjYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuXG4gICAgcmVuZGVyZXIuc2V0U2l6ZShjYW52V2lkdGgsIGNhbnZIZWlnaHQpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBvbkRvY3VtZW50TW91c2VNb3ZlKCBldmVudCApIHtcbiAgbW91c2VYID0gKCBldmVudC5jbGllbnRYIC0gKGNhbnZXaWR0aC8yKSApIC8gMjtcbiAgbW91c2VZID0gKCBldmVudC5jbGllbnRZIC0gKGNhbnZIZWlnaHQvMikgKSAvIDI7XG59O1xuXG5cbnZhciBnZW5lcmF0aW5nID0gZmFsc2U7XG52YXIgY3VycmVudCA9IDE7XG5cbmZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgLy8gY29uc29sZS5sb2coJ2N1cnJlbnQ6ICcgKyBjdXJyZW50ICsgJyB8IGZyYW1lczogJyArIGZyYW1lcyk7XG4gIGlmIChnZW5lcmF0aW5nID09PSBmYWxzZSkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdub3QgZ2VuZXJhdGluZycpO1xuICAgIGlmIChjYW5PYmplY3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY2FuUGl2b3Qucm90YXRpb24ueSArPSBNYXRoLlBJIC8gMjQwO1xuICAgICAgLy8gY2FuUGl2b3Qucm90YXRpb24ueSA9IDEwNi4yO1xuICAgICAgY2FuUGl2b3Qucm90YXRpb24ueCA9IG1vdXNlWSAvIGNhbnZIZWlnaHQ7XG4gICAgICAvLyBjYW5QaXZvdC5yb3RhdGlvbi54ID0gbW91c2VZIC8gY2FudldpZHRoO1xuICAgICAgY2FuUGl2b3Qucm90YXRpb24ueiA9IG1vdXNlWCAvIGNhbnZXaWR0aDtcblxuICAgICAgLy8gY2FuUGl2b3Qucm90YXRpb24ueiA9ICgtMSAqIG1vdXNlWSAvIGNhbnZXaWR0aCkvMjtcbiAgICAgIC8vIGNhblBpdm90LnJvdGF0aW9uLnogPSAwO1xuICAgICAgLy8gY2FuUGl2b3Qucm90YXRpb24ueCArPSAobW91c2VZIC0gd2luZG93LmlubmVySGVpZ2h0ICogMC4wMTUpO1xuICAgICAgLy8gY2FuUGl2b3Qucm90YXRpb24ueCArPSAobW91c2VYIC8gY2FuUGl2b3Qucm90YXRpb24ueCkgKiAuMDAyNTtcbiAgICAgIC8vIGNhbWVyYS5sb29rQXQoIHNjZW5lLnBvc2l0aW9uICk7XG5cbiAgICAgIHJlbmRlcmVyLnJlbmRlciggc2NlbmUsIGNhbWVyYSApOyAvLyByZWcgcmVuZGVyXG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgLy8gY2FuUGl2b3Qucm90YXRpb24ueSArPSAzNjAgLyBmcHMgLyBmcmFtZXM7XG4gICAgY2FuUGl2b3Qucm90YXRpb24ueSArPSAoMzYwIC8gZnJhbWVzKSAqIE1hdGguUEkgLyAxODA7XG4gICAgdmFyIG1ldGEgPSByZW5kZXJlci5kb21FbGVtZW50O1xuICAgIG1ldGEud2lkdGggPSA2MzA7XG4gICAgbWV0YS5oZWlnaHQgPSA2MzA7XG4gICAgY2FtZXJhLmFzcGVjdCA9IDYzMC82MzA7XG4gICAgY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgICByZW5kZXJlci5zZXRTaXplKDYzMCwgNjMwKTtcblxuICAgIHJlbmRlcmVyLnJlbmRlciggc2NlbmUsIGNhbWVyYSApOyAvLyByZW5kZXIgaGVyZSBzbyB0aGVyZXMgbm8gYmxhY2sgYmxpcFxuICAgIGlmICghYnJvd3Nlci5tb2JpbGUpIHtcbiAgICAgIGlmIChjdXJyZW50IDw9IGZyYW1lcykge1xuICAgICAgICBnaWZBcnJheS5wdXNoKG1ldGEudG9EYXRhVVJMKCkpO1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50ID4gZnJhbWVzKSB7XG4gICAgICAgIGdlbmVyYXRpbmcgPSBmYWxzZTtcbiAgICAgICAgY3VycmVudCA9IDA7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdwb3N0Q2FuJyk7XG4gICAgICAgIC8vIGFsZXJ0KCdnb25uYSBydW4gZ2lmc2hvdCcpO1xuICAgICAgICBnaWZzaG90LmNyZWF0ZUdJRih7XG4gICAgICAgICAgJ2ltYWdlcyc6IGdpZkFycmF5LFxuICAgICAgICAgICdnaWZXaWR0aCc6IDYzMCxcbiAgICAgICAgICAnZ2lmSGVpZ2h0JzogNjMwLFxuICAgICAgICAgICdpbnRlcnZhbCc6IDAuMTVcbiAgICAgICAgfSwgZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICBpZiAoIW9iai5lcnJvcikge1xuICAgICAgICAgICAgICBhbmltYXRlZEdpZiA9IG9iai5pbWFnZTtcbiAgICAgICAgICAgICAgcG9zdENhbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoY3VycmVudCA9PT0gMSkge1xuICAgICAgICBnZW5lcmF0aW5nID0gZmFsc2U7XG4gICAgICAgIGN1cnJlbnQgPSAwO1xuICAgICAgICBhbmltYXRlZEdpZiA9IG1ldGEudG9EYXRhVVJMKCk7XG4gICAgICAgIHBvc3RDYW4oKTtcbiAgICAgIH1cbiAgICB9XG4gICAgY3VycmVudCsrO1xuICB9XG59O1xuXG5cbnZhciBmbGF2b3JzID0gW1xuICB7XG4gICAgXCJmbGF2b3JcIjogXCJPcmFuZ2VcIixcbiAgICBcImNvbG9yc1wiOiBbXG4gICAgICBcIiNlZmMwMDBcIixcbiAgICAgIFwiI2Y0OTcwMFwiLFxuICAgICAgXCIjM2FlN2RkXCIsXG4gICAgICBcIiMwMDc5ZDZcIixcbiAgICAgIFwiI2VjNDcwMFwiLFxuICAgICAgXCIjMGYyZDczXCJcbiAgICBdXG4gIH0sXG4gIHtcbiAgICBcImZsYXZvclwiOiBcIkxpbWVcIixcbiAgICBcImNvbG9yc1wiOiBbXG4gICAgICBcIiNkZGU0MDBcIixcbiAgICAgIFwiIzhmZTE0MlwiLFxuICAgICAgXCIjMDZlOGRjXCIsXG4gICAgICBcIiMwMDc5ZDZcIixcbiAgICAgIFwiI2E0ZGUxZVwiLFxuICAgICAgXCIjMGYyZDczXCJcbiAgICBdXG4gIH0sXG4gIHtcbiAgICBcImZsYXZvclwiOiBcIkNvY29udXRcIixcbiAgICBcImNvbG9yc1wiOiBbXG4gICAgICBcIiNlOGU4ZTZcIixcbiAgICAgIFwiI2QxYmM2NlwiLFxuICAgICAgXCIjMWFiOWE0XCIsXG4gICAgICBcIiMwODNhOWNcIixcbiAgICAgIFwiIzkxMjgwOFwiLFxuICAgICAgXCIjMTUxYjU0XCJcbiAgICBdXG4gIH0sXG4gIHtcbiAgICBcImZsYXZvclwiOiBcIlBlYWNoLVBlYXJcIixcbiAgICBcImNvbG9yc1wiOiBbXG4gICAgICBcIiNlNGU3NzJcIixcbiAgICAgIFwiI2ZlYzM3YlwiLFxuICAgICAgXCIjMDBiYWIyXCIsXG4gICAgICBcIiMwMDc3YzNcIixcbiAgICAgIFwiI2Y2N2QxYlwiLFxuICAgICAgXCIjMjczMTZkXCJcbiAgICBdXG4gIH0sXG4gIHtcbiAgICBcImZsYXZvclwiOiBcIlB1cmVcIixcbiAgICBcImNvbG9yc1wiOiBbXG4gICAgICBcIiNiMmRmZjlcIixcbiAgICAgIFwiIzg0Y2RmYVwiLFxuICAgICAgXCIjMDBkM2NmXCIsXG4gICAgICBcIiMwMDc5ZDZcIixcbiAgICAgIFwiIzAwOThmMlwiLFxuICAgICAgXCIjMGYyZDczXCJcbiAgICBdXG4gIH0sXG4gIHtcbiAgICBcImZsYXZvclwiOiBcIkJlcnJ5XCIsXG4gICAgXCJjb2xvcnNcIjogW1xuICAgICAgXCIjZmZkN2VhXCIsXG4gICAgICBcIiNmZmJlZTJcIixcbiAgICAgIFwiIzAwYzZiY1wiLFxuICAgICAgXCIjMDA2NmM1XCIsXG4gICAgICBcIiNmZjUyZDNcIixcbiAgICAgIFwiIzAwMGY2M1wiXG4gICAgXVxuICB9LFxuICB7XG4gICAgXCJmbGF2b3JcIjogXCJQYW1wbGVtb3Vzc2VcIixcbiAgICBcImNvbG9yc1wiOiBbXG4gICAgICBcIiNmMGM3OGNcIixcbiAgICAgIFwiI2Y1OTc4YVwiLFxuICAgICAgXCIjNjNjYmU0XCIsXG4gICAgICBcIiMyZDZmZTFcIixcbiAgICAgIFwiI2Y4NWE0MlwiLFxuICAgICAgXCIjMTkyMTVjXCJcbiAgICBdXG4gIH0sXG4gIHtcbiAgICBcImZsYXZvclwiOiBcIkxlbW9uXCIsXG4gICAgXCJjb2xvcnNcIjogW1xuICAgICAgXCIjZTdkNTNhXCIsXG4gICAgICBcIiNlNWJjMDBcIixcbiAgICAgIFwiIzAwY2FiZlwiLFxuICAgICAgXCIjMDA3OWQ2XCIsXG4gICAgICBcIiNmMWIzMDBcIixcbiAgICAgIFwiIzBmMmQ3M1wiXG4gICAgXVxuICB9LFxuICB7XG4gICAgXCJmbGF2b3JcIjogXCJDcmFuLVJhc3BiZXJyeVwiLFxuICAgIFwiY29sb3JzXCI6IFtcbiAgICAgIFwiI2VjYmRiZVwiLFxuICAgICAgXCIjZmE4YThlXCIsXG4gICAgICBcIiM2Y2M4ZGRcIixcbiAgICAgIFwiIzI1NmVlNlwiLFxuICAgICAgXCIjZTQ0ODdmXCIsXG4gICAgICBcIiMyMDI2N2NcIlxuICAgIF1cbiAgfVxuXTtcblxuZnVuY3Rpb24gaGV4VG9SZ2IoaGV4KSB7XG4gIC8vIEV4cGFuZCBzaG9ydGhhbmQgZm9ybSAoZS5nLiBcIjAzRlwiKSB0byBmdWxsIGZvcm0gKGUuZy4gXCIwMDMzRkZcIilcbiAgdmFyIHNob3J0aGFuZFJlZ2V4ID0gL14jPyhbYS1mXFxkXSkoW2EtZlxcZF0pKFthLWZcXGRdKSQvaTtcbiAgaGV4ID0gaGV4LnJlcGxhY2Uoc2hvcnRoYW5kUmVnZXgsIGZ1bmN0aW9uKG0sIHIsIGcsIGIpIHtcbiAgICByZXR1cm4gciArIHIgKyBnICsgZyArIGIgKyBiO1xuICB9KTtcblxuICB2YXIgcmVzdWx0ID0gL14jPyhbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KSQvaS5leGVjKGhleCk7XG4gIHJldHVybiByZXN1bHQgPyB7XG4gICAgcjogcGFyc2VJbnQocmVzdWx0WzFdLCAxNiksXG4gICAgZzogcGFyc2VJbnQocmVzdWx0WzJdLCAxNiksXG4gICAgYjogcGFyc2VJbnQocmVzdWx0WzNdLCAxNilcbiAgfSA6IG51bGw7XG59XG5cblxudmFyIHVwZGF0ZVN2ZyA9IGZ1bmN0aW9uKHN0cmluZywgY29sb3IpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzdHJpbmcpO1xuICB2YXIgdGFncyA9IGVsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJyonKTtcbiAgdmFyIHRvdGFsID0gdGFncy5sZW5ndGg7XG4gIGZvciAoIHZhciBpID0gMDsgaSA8IHRvdGFsOyBpKysgKSB7XG4gICAgdGFnc1tpXS5zdHlsZS5maWxsID0gY29sb3I7XG4gIH1cbiAgaWYgKHN0cmluZyA9PT0gJ2NvbG9yLTUnKSB7XG4gICAgc3ZnVGV4dC5jc3MoJ2ZpbGwnLCBjb2xvcik7XG4gIH1cbiAgaWYgKHN0cmluZyA9PT0gJ2NvbG9yLTYnKSB7XG4gICAgJGJvZHkuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgY29sb3IpO1xuICAgIHZhciByZ2IgPSBoZXhUb1JnYihjb2xvcik7XG4gICAgY29uc29sZS5sb2coJ3JnYicsIHJnYik7XG4gICAgdmFyIG8gPSBNYXRoLnJvdW5kKCgocGFyc2VJbnQocmdiLnIpICogMjk5KSArIChwYXJzZUludChyZ2IuZykgKiA1ODcpICsgKHBhcnNlSW50KHJnYi5iKSAqIDExNCkpIC8xMDAwKTtcbiAgICBpZiAobyA+IDEyNSkge1xuICAgICAgJGJvZHkuYWRkQ2xhc3MoJ2RhcmstdGV4dCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkYm9keS5yZW1vdmVDbGFzcygnZGFyay10ZXh0Jyk7XG4gICAgfVxuICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIENvbG9ycGlja2VyIHNoaXRcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbnZhciB1cGRhdGVDb2xvclBpY2tlciA9IGZ1bmN0aW9uKCkge1xuICBjb25zb2xlLmxvZygndXBkYXRlIGNvbG9ycGlja2VyJyk7XG4gIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoJGlucHV0Q29sb3IsIGZ1bmN0aW9uKGVsLCBpKXtcbiAgICB2YXIgJHRoZUNvbG9yID0gZWwuZ2V0QXR0cmlidXRlKCd2YWx1ZScpO1xuICAgIC8vIGNvbnNvbGUubG9nKCd0aGVDb2xybzogJyArICR0aGVDb2xvcik7XG4gICAgJChlbCkuc3BlY3RydW0oe1xuICAgICAgY29sb3I6ICR0aGVDb2xvcixcbiAgICAgIHNob3dJbml0aWFsOiB0cnVlLFxuICAgICAgc2hvd0J1dHRvbnM6IGZhbHNlLFxuICAgICAgc2hvd0lucHV0OiB0cnVlLFxuICAgICAgcHJlZmVycmVkRm9ybWF0OiAnaGV4JyxcbiAgICAgIGNoYW5nZTogZnVuY3Rpb24oY29sb3IpIHtcbiAgICAgICAgdmFyIHN0cmluZyA9ICQodGhpcykuYXR0cignZGF0YS1zZWxlY3RvcicpO1xuICAgICAgICB2YXIgY29sb3IgPSBjb2xvci50b0hleFN0cmluZygpO1xuICAgICAgICB1cGRhdGVTdmcoc3RyaW5nLCBjb2xvcik7XG4gICAgICAgIHVwZGF0ZUNhbigpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnaGlkZSB0cmlnZ2VyZWQnKTtcbiAgICAgICAgLy8gYWxlcnQoJ2NhbGxlZHVwZGF0ZXN2ZycpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJChlbCkub24oJ2RyYWdzdG9wLnNwZWN0cnVtJywgZGVib3VuY2UoZnVuY3Rpb24oZSwgY29sb3IpIHtcbiAgICAgIHZhciBzdHJpbmcgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtc2VsZWN0b3InKTtcbiAgICAgIHZhciBjb2xvciA9IGNvbG9yLnRvSGV4U3RyaW5nKCk7XG4gICAgICB1cGRhdGVTdmcoc3RyaW5nLCBjb2xvcik7XG4gICAgICB1cGRhdGVDYW4oKTtcbiAgICB9LCAxMDApKTtcblxuICB9KTtcblxuICAvLyBjbGljayB0cmFjayBjb2xvciBjaGFuZ2VzXG4gICQoJy5zcC1yZXBsYWNlcicpLm9uKCdjbGljayB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIHBhcmVudCA9ICQodGhpcykucGFyZW50KCkuYXR0cignZGF0YS1wYXJlbnQnKTtcbiAgICB2YXIgc2VsZWN0b3IgPSAkKCdpbnB1dFtkYXRhLXNlbGVjdG9yPVwiJyArIHBhcmVudCArICdcIl0nKTtcbiAgICB2YXIgY2F0ZWdvcnkgPSBzZWxlY3Rvci5kYXRhKCdndG0tY2F0ZWdvcnknKTtcbiAgICB2YXIgYWN0aW9uID0gc2VsZWN0b3IuZGF0YSgnZ3RtLWFjdGlvbicpO1xuICAgIHZhciBsYWJlbCA9IHNlbGVjdG9yLmRhdGEoJ2d0bS1sYWJlbCcpO1xuICAgIGd0bUNsaWNrVHJhY2soY2F0ZWdvcnksIGFjdGlvbiwgbGFiZWwpO1xuICB9KTtcblxufTtcblxuZnVuY3Rpb24gZ2V0UmFuZG9tSW50SW5jbHVzaXZlKG1pbiwgbWF4KSB7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xufVxuXG5cblxudmFyIGluaXRpYWxDb2xvciA9IGZ1bmN0aW9uKGZsYXZvciwgY29sb3IxLCBjb2xvcjIsIGNvbG9yMywgY29sb3I0LCBjb2xvcjUsIGNvbG9yNikge1xuICAkYm9keS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBjb2xvcjYpO1xuICAkanNJbnB1dC5hdHRyKCdwbGFjZWhvbGRlcicsIGZsYXZvcik7XG5cbiAgdXBkYXRlU3ZnKCdjb2xvci0xJywgY29sb3IxKTtcbiAgdXBkYXRlU3ZnKCdjb2xvci0yJywgY29sb3IyKTtcbiAgdXBkYXRlU3ZnKCdjb2xvci0zJywgY29sb3IzKTtcbiAgdXBkYXRlU3ZnKCdjb2xvci00JywgY29sb3I0KTtcbiAgdXBkYXRlU3ZnKCdjb2xvci01JywgY29sb3I1KTtcbiAgdXBkYXRlU3ZnKCdjb2xvci02JywgY29sb3I2KTtcbiAgJCgnc3ZnIHRleHQnKS50ZXh0KGZsYXZvcik7XG5cbiAgJCgnLmpzLWNvbG9yLXBpY2tlci0xJykuYXR0cigndmFsdWUnLCBjb2xvcjEpO1xuICAkKCcuanMtY29sb3ItcGlja2VyLTInKS5hdHRyKCd2YWx1ZScsIGNvbG9yMik7XG4gICQoJy5qcy1jb2xvci1waWNrZXItMycpLmF0dHIoJ3ZhbHVlJywgY29sb3IzKTtcbiAgJCgnLmpzLWNvbG9yLXBpY2tlci00JykuYXR0cigndmFsdWUnLCBjb2xvcjQpO1xuICAkKCcuanMtY29sb3ItcGlja2VyLTUnKS5hdHRyKCd2YWx1ZScsIGNvbG9yNSk7XG4gICQoJy5qcy1jb2xvci1waWNrZXItNicpLmF0dHIoJ3ZhbHVlJywgY29sb3I2KTtcblxuICB1cGRhdGVDb2xvclBpY2tlcigpO1xuICB1cGRhdGVDYW4oKTtcbn07XG5cblxuXG52YXIgY2hvb3NlRmxhdm9yID0gZnVuY3Rpb24oKSB7XG4gIHZhciBudW1GbGF2b3JzID0gZmxhdm9ycy5sZW5ndGggLSAxO1xuICB2YXIgcmFuZE51bSA9IGdldFJhbmRvbUludEluY2x1c2l2ZSgwLCBudW1GbGF2b3JzKVxuICBmbGF2b3IgPSBmbGF2b3JzW3JhbmROdW1dO1xufTtcblxuaWYgKCRib2R5Lmhhc0NsYXNzKCdob21lJykpIHtcbiAgY2hvb3NlRmxhdm9yKCk7XG4gIHZhciBmbGF2ZSA9IGZsYXZvci5mbGF2b3I7XG4gIHZhciBjb2xvcjEgPSBmbGF2b3IuY29sb3JzWzBdO1xuICB2YXIgY29sb3IyID0gZmxhdm9yLmNvbG9yc1sxXTtcbiAgdmFyIGNvbG9yMyA9IGZsYXZvci5jb2xvcnNbMl07XG4gIHZhciBjb2xvcjQgPSBmbGF2b3IuY29sb3JzWzNdO1xuICB2YXIgY29sb3I1ID0gZmxhdm9yLmNvbG9yc1s0XTtcbiAgdmFyIGNvbG9yNiA9IGZsYXZvci5jb2xvcnNbNV07XG4gIGluaXRpYWxDb2xvcihmbGF2ZSwgY29sb3IxLCBjb2xvcjIsIGNvbG9yMywgY29sb3I0LCBjb2xvcjUsIGNvbG9yNik7XG59XG5cbmlmICgkYm9keS5oYXNDbGFzcygnY3JlYXRpb24nKSkge1xuICB2YXIgY29sb3IxID0gJCgnLmpzLWNvbG9yLTEnKS5hdHRyKCdkYXRhLWNvbG9yJyk7XG4gIHZhciBjb2xvcjIgPSAkKCcuanMtY29sb3ItMicpLmF0dHIoJ2RhdGEtY29sb3InKTtcbiAgdmFyIGNvbG9yMyA9ICQoJy5qcy1jb2xvci0zJykuYXR0cignZGF0YS1jb2xvcicpO1xuICB2YXIgY29sb3I0ID0gJCgnLmpzLWNvbG9yLTQnKS5hdHRyKCdkYXRhLWNvbG9yJyk7XG4gIHZhciBjb2xvcjUgPSAkKCcuanMtY29sb3ItNScpLmF0dHIoJ2RhdGEtY29sb3InKTtcbiAgdmFyIGNvbG9yNiA9ICQoJy5qcy1jb2xvci02JykuYXR0cignZGF0YS1jb2xvcicpO1xuICB2YXIgZmxhdm9yID0gJCgnLmpzLWZsYXZvcicpLmF0dHIoJ2RhdGEtZmxhdm9yJyk7XG4gIGluaXRpYWxDb2xvcihmbGF2b3IsIGNvbG9yMSwgY29sb3IyLCBjb2xvcjMsIGNvbG9yNCwgY29sb3I1LCBjb2xvcjYpO1xufVxuXG5cbi8vIHZhciBsYXN0O1xudmFyIGRyYXcgPSBmdW5jdGlvbihub3cpIHtcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICByZW5kZXIoKTtcbn07XG5cbmlmICgkYm9keS5oYXNDbGFzcygnaG9tZScpIHx8ICRib2R5Lmhhc0NsYXNzKCdjcmVhdGlvbicpKSB7XG4gIHNldHVwKCk7XG4gIGRyYXcoKTtcbn1cbmlmICgkYm9keS5oYXNDbGFzcygnaG9tZScpIHx8ICRib2R5Lmhhc0NsYXNzKCdjcmVhdGlvbicpKSB7XG4gIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDcwMCkge1xuICAgIHZhciBkcmFnZ2llID0gbmV3IERyYWdnYWJpbGx5KCAnLmpzLXdpbmRvd3MtY29udGFpbmVyJywge1xuICAgICAgaGFuZGxlOiAnLmpzLXdpbmhlYWRlcicsXG4gICAgICBjb250YWlubWVudDogdHJ1ZVxuICAgIH0pO1xuICAgIHZhciBkYXJnaWUgPSBuZXcgRHJhZ2dhYmlsbHkoICcuanMtd2luZG93cycsIHtcbiAgICAgIGhhbmRsZTogJy5qcy13aW5oZWFkZXInLFxuICAgICAgY29udGFpbm1lbnQ6IHRydWVcbiAgICB9KTtcbiAgfVxufVxuXG52YXIgdHJhY2tGbGF2b3IgPSBmdW5jdGlvbihjYXRlZ29yeSwgYWN0aW9uLCBsYWJlbCkge1xuICBnYSgnc2VuZCcsIHtcbiAgICBoaXRUeXBlOiAnZXZlbnQnLFxuICAgIGV2ZW50Q2F0ZWdvcnk6IGNhdGVnb3J5LFxuICAgIGV2ZW50QWN0aW9uOiBhY3Rpb24sXG4gICAgZXZlbnRMYWJlbDogbGFiZWxcbiAgfSk7XG59O1xuXG5cbnZhciBnZW5lcmF0ZUdpZiA9IGZ1bmN0aW9uKCkge1xuICB2YXIgYXVkaW8gPSBuZXcgQXVkaW8oJy4uL29wZW4tc2hvcnQubXAzJyk7XG4gIGF1ZGlvLnBsYXkoKTtcblxuICAvLyBjb25zb2xlLmxvZygnY29sb3I2JywgJCgnLmpzLWNvbG9yLXBpY2tlci02Jykuc3BlY3RydW0oJ2dldCcpLnRvSGV4U3RyaW5nKCkpO1xuICB2YXIgYmdDb2xvciA9ICQoJy5qcy1jb2xvci1waWNrZXItNicpLnNwZWN0cnVtKCdnZXQnKS50b0hleFN0cmluZygpO1xuICBzY2VuZS5iYWNrZ3JvdW5kID0gbmV3IFRIUkVFLkNvbG9yKGJnQ29sb3IpO1xuICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbkRvY3VtZW50TW91c2VNb3ZlLCBmYWxzZSlcbiAgLy8gbW91c2VYID0gMDtcbiAgLy8gbW91c2VZID0gMDtcbiAgY2FuUGl2b3Qucm90YXRpb24ueCA9IDA7XG4gIGNhbk9iamVjdC5yb3RhdGlvbi54ID0gMDtcblxuICBjYW5QaXZvdC5yb3RhdGlvbi55ID0gMzAuMzU7IC8vIHR1cm4gdGhlIGZsYXZvciB0byB0aGUgZnJvbnRcbiAgY2FuT2JqZWN0LnJvdGF0aW9uLnkgPSAwO1xuXG4gIGNhblBpdm90LnJvdGF0aW9uLnogPSAyNDUuNTtcbiAgY2FuT2JqZWN0LnJvdGF0aW9uLnogPSAwO1xuXG4gIGdlbmVyYXRpbmcgPSB0cnVlO1xuICAkYm9keS5hZGRDbGFzcygnZ2VuZXJhdGluZycpO1xuICB0cmFja0ZsYXZvcignRmxhdm9yJywgJ2ZsYXZvcml6ZScsICRqc0lucHV0LnZhbCgpKTtcbn07XG5cbnZhciBzbHVnaWZ5ID0gZnVuY3Rpb24odGV4dCkge1xuICByZXR1cm4gdGV4dC50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzKy9nLCAnLScpLnJlcGxhY2UoL1teXFx3XFwtXSsvZywgJycpLnJlcGxhY2UoL1xcLVxcLSsvZywgJy0nKS5yZXBsYWNlKC9eLSsvLCAnJykucmVwbGFjZSgvLSskLywgJycpO1xufTtcblxuJCgnLmpzLWdlbmVyYXRlLWdpZicpLm9uKCdjbGljayB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oKSB7XG4gIGdlbmVyYXRlR2lmKCk7XG59KTtcblxuXG4kanNJbnB1dC5vbigna2V5dXAnLCBkZWJvdW5jZShmdW5jdGlvbihlKSB7XG4gIGNvbnNvbGUubG9nKCdkZWJvdW5jZScpO1xuICB2YXIgdGV4dCA9ICQodGhpcykudmFsKCk7XG4gIHN2Z1RleHQudGV4dCh0ZXh0KTtcbiAgdXBkYXRlQ2FuKCk7XG59LCAxMDApKTtcblxuXG5cbnZhciBwb3N0Q2FuID0gZnVuY3Rpb24oKSB7XG4gIHZhciB0ZXh0ID0gJGpzSW5wdXQudmFsKCk7XG4gIGlmICh0ZXh0ID09PSAnJykge1xuICAgIHRleHQgPSAkanNJbnB1dC5hdHRyKCdwbGFjZWhvbGRlcicpO1xuICB9XG4gIHZhciBzbHVnZ2VkID0gc2x1Z2lmeSh0ZXh0KTtcblxuICB2YXIgY29sb3IxID0gJCgnLmpzLWNvbG9yLXBpY2tlci0xJykuc3BlY3RydW0oJ2dldCcpLnRvSGV4U3RyaW5nKCk7XG4gIHZhciBjb2xvcjIgPSAkKCcuanMtY29sb3ItcGlja2VyLTInKS5zcGVjdHJ1bSgnZ2V0JykudG9IZXhTdHJpbmcoKTtcbiAgdmFyIGNvbG9yMyA9ICQoJy5qcy1jb2xvci1waWNrZXItMycpLnNwZWN0cnVtKCdnZXQnKS50b0hleFN0cmluZygpO1xuICB2YXIgY29sb3I0ID0gJCgnLmpzLWNvbG9yLXBpY2tlci00Jykuc3BlY3RydW0oJ2dldCcpLnRvSGV4U3RyaW5nKCk7XG4gIHZhciBjb2xvcjUgPSAkKCcuanMtY29sb3ItcGlja2VyLTUnKS5zcGVjdHJ1bSgnZ2V0JykudG9IZXhTdHJpbmcoKTtcbiAgdmFyIGNvbG9yNiA9ICQoJy5qcy1jb2xvci1waWNrZXItNicpLnNwZWN0cnVtKCdnZXQnKS50b0hleFN0cmluZygpO1xuXG4gIHZhciBmb3JtRGF0YSA9IHtcbiAgICAnc2x1Zyc6IHNsdWdnZWQsXG4gICAgJ2Z1bGxUZXh0JzogdGV4dCxcbiAgICAnYW5pbWF0ZWRHaWYnOiBhbmltYXRlZEdpZixcbiAgICAnc2luZ2xlSW1hZ2UnOiBnaWZBcnJheVswXSxcbiAgICAnY29sb3IxJzogY29sb3IxLFxuICAgICdjb2xvcjInOiBjb2xvcjIsXG4gICAgJ2NvbG9yMyc6IGNvbG9yMyxcbiAgICAnY29sb3I0JzogY29sb3I0LFxuICAgICdjb2xvcjUnOiBjb2xvcjUsXG4gICAgJ2NvbG9yNic6IGNvbG9yNlxuICB9O1xuXG4gIC8vIGNvbnNvbGUubG9nKCdmb3JtRGF0YS5hbmltYXRlZEdpZjogJywgZm9ybURhdGEuYW5pbWF0ZWRHaWYpO1xuXG4gICQuYWpheCh7XG4gICAgdXJsIDogJy9hcGkvY3JlYXRlJyxcbiAgICB0eXBlOiAnUE9TVCcsXG4gICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICBqc29ucDogJ2pzb25wJyxcbiAgICBkYXRhIDogSlNPTi5zdHJpbmdpZnkoZm9ybURhdGEpLFxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEsIHRleHRTdGF0dXMsIGpxWEhSKSB7XG4gICAgICBwdXRJZCA9IGRhdGEuX2lkO1xuICAgICAgcHV0U2x1ZyA9IGRhdGEuc2x1ZztcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdzdWNjZXNzZnVsIHBvc3RjYW4nKTtcbiAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSBkYXRhLnNsdWcgKyAnLycgKyBkYXRhLl9pZDtcbiAgICB9LFxuICAgIGVycm9yOiBmdW5jdGlvbiAoanFYSFIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSB7XG4gICAgICBjb25zb2xlLmxvZygnanFYSFInLCBqcVhIUik7XG4gICAgICBjb25zb2xlLmxvZygnZXJyb3InLCBlcnJvclRocm93bik7XG4gICAgICBjb25zb2xlLmxvZygndGV4dFN0YXR1cycsIHRleHRTdGF0dXMpO1xuICAgIH1cbiAgfSk7XG59XG5cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFZvdGVcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIHZhciB2b3RlT25jZSA9IGZ1bmN0aW9uKHZvdGVJZCkge1xuLy8gICB2YXIgZm9ybURhdGEgPSB7XG4vLyAgICAgJ19pZCc6IHZvdGVJZFxuLy8gICB9O1xuLy8gICAvLyBjb25zb2xlLmxvZygndm90ZUlkOiAnICsgdm90ZUlkKTtcbi8vICAgJC5hamF4KHtcbi8vICAgICB1cmwgOiAnL2FwaS92b3RlJyxcbi8vICAgICB0eXBlOiAnUE9TVCcsXG4vLyAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbi8vICAgICBqc29ucDogJ2pzb25wJyxcbi8vICAgICBkYXRhIDogSlNPTi5zdHJpbmdpZnkoZm9ybURhdGEpLFxuLy8gICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEsIHRleHRTdGF0dXMsIGpxWEhSKSB7XG4vLyAgICAgICBjb25zb2xlLmxvZygndm90ZSBkYXRhIGZyb20gc2VydmVyJywgZGF0YSk7XG4vLyAgICAgICAkKCcuanMtdm90ZS1pZC0nICsgZGF0YS5faWQpLnRleHQoZGF0YS52b3Rlcyk7XG4vLyAgICAgfSxcbi8vICAgICBlcnJvcjogZnVuY3Rpb24gKGpxWEhSLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikge1xuLy8gICAgICAgY29uc29sZS5sb2coJ2pxWEhSJywganFYSFIpO1xuLy8gICAgICAgY29uc29sZS5sb2coJ2Vycm9yJywgZXJyb3JUaHJvd24pO1xuLy8gICAgICAgY29uc29sZS5sb2coJ3RleHRTdGF0dXMnLCB0ZXh0U3RhdHVzKTtcbi8vICAgICB9XG4vLyAgIH0pO1xuLy8gfTtcblxuLy8gZnVuY3Rpb24gZG9PbmNlKHZvdGVJZCkge1xuLy8gICBjb25zb2xlLmxvZygndm90ZUlkOiAnICsgdm90ZUlkKTtcbi8vICAgaWYgKGRvY3VtZW50LmNvb2tpZS5yZXBsYWNlKC8oPzooPzpefC4qO1xccyopdm90ZUlkXFxzKlxcPVxccyooW147XSopLiokKXxeLiokLywgJyQxJykgIT09IHZvdGVJZCkge1xuLy8gICAgIC8vIGFsZXJ0KCdEbyBzb21ldGhpbmcgaGVyZSEnKTtcbi8vICAgICB2b3RlT25jZSh2b3RlSWQpO1xuLy8gICAgIGRvY3VtZW50LmNvb2tpZSA9ICd2b3RlSWQ9JyArIHZvdGVJZCArICc7IGV4cGlyZXM9RnJpLCAzMSBEZWMgOTk5OSAyMzo1OTo1OSBHTVQnO1xuLy8gICB9XG4vLyB9XG5cbi8vICQoJy5qcy12b3RlJykub24oJ2NsaWNrIHRvdWNoc3RhcnQnLCBmdW5jdGlvbihlKSB7XG4vLyAgIGUucHJldmVudERlZmF1bHQoKTtcbi8vICAgdmFyIHZvdGVJZCA9ICQodGhpcykuYXR0cignZGF0YS12b3RlLWlkJyk7XG4vLyAgIHZvdGVPbmNlKHZvdGVJZCk7XG4vLyB9KTtcblxuLy8gJCgnLmpzLWF1dG8tdm90ZScpLm9uKCdjbGljayB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xuLy8gICAvLyBlLnByZXZlbnREZWZhdWx0KCk7XG4vLyAgIHZhciB2b3RlSWQgPSAkKCcuanMtdm90ZScpLmF0dHIoJ2RhdGEtdm90ZS1pZCcpO1xuLy8gICBjb25zb2xlLmxvZygndm90ZUlkOiAnICsgdm90ZUlkKTtcbi8vICAgdm90ZU9uY2Uodm90ZUlkKTtcbi8vIH0pO1xuXG5cbiRqc0lucHV0Lm9uKCdrZXl1cCcsIGZ1bmN0aW9uKGUpIHtcbiAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICBjYXNlIDEzOiAvLyBlbnRlclxuICAgICAgZ2VuZXJhdGVHaWYoKTtcbiAgICAgIGJyZWFrO1xuICB9XG59KTtcblxuXG4vLyBDbGljayB0cmFja2luZ1xuJCgnW2RhdGEtZ3RtLWNhdGVnb3J5XScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICB2YXIgY2F0ZWdvcnkgPSAkKHRoaXMpLmRhdGEoJ2d0bS1jYXRlZ29yeScpO1xuICB2YXIgYWN0aW9uID0gJCh0aGlzKS5kYXRhKCdndG0tYWN0aW9uJyk7XG4gIHZhciBsYWJlbCA9ICQodGhpcykuZGF0YSgnZ3RtLWxhYmVsJyk7XG4gIGd0bUNsaWNrVHJhY2soY2F0ZWdvcnksIGFjdGlvbiwgbGFiZWwpO1xufSk7XG5cblxuXG4vLyBTZW5kIHRoZSBpbmZvIHRvIEdvb2dsZSBBbmFseXRpY3NcbnZhciBndG1DbGlja1RyYWNrID0gZnVuY3Rpb24oY2F0ZWdvcnksIGFjdGlvbiwgbGFiZWwpIHtcbiAgZ2EoJ3NlbmQnLCB7XG4gICAgaGl0VHlwZTogJ2V2ZW50JyxcbiAgICBldmVudENhdGVnb3J5OiBjYXRlZ29yeSxcbiAgICBldmVudEFjdGlvbjogYWN0aW9uLFxuICAgIGV2ZW50TGFiZWw6IGxhYmVsXG4gIH0pO1xufTtcblxudmFyICRmYWNlYm9vayA9ICQoJy5qcy1mYWNlYm9vaycpO1xudmFyICR0d2l0dGVyID0gJCgnLmpzLXR3aXR0ZXInKTtcblxuLy8gc2hhcmVcbmZ1bmN0aW9uIHdpbk9wZW4odXJsKSB7XG4gIHZhciB3aWR0aCA9IDU3NTtcbiAgdmFyIGhlaWdodCA9IDQwMDtcbiAgdmFyIGxlZnQgPSAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIC8gMiAtIHdpZHRoIC8gMik7XG4gIHZhciB0b3AgPSAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCAtIGhlaWdodCkgLyAyO1xuICB2YXIgb3B0cyA9ICdzdGF0dXM9MSxyZXNpemFibGU9eWVzJyArICcsd2lkdGg9JyArIHdpZHRoICsgJyxoZWlnaHQ9JyArIGhlaWdodCArICcsdG9wPScgKyB0b3AgKyAnLGxlZnQ9JyArIGxlZnQ7XG4gIHZhciB3aW4gPSB3aW5kb3cub3Blbih1cmwsICcnLCBvcHRzKTtcbiAgd2luLmZvY3VzKCk7XG4gIHJldHVybiB3aW47XG59XG5cbmlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDcwMCkge1xuICAkdHdpdHRlci5vbignY2xpY2sgdG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdmFyIHVybCA9ICQodGhpcykuYXR0cignaHJlZicpO1xuICAgIHdpbk9wZW4odXJsKTtcbiAgfSk7XG5cbiAgJGZhY2Vib29rLm9uKCdjbGljayB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgdXJsID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7XG4gICAgd2luT3Blbih1cmwpO1xuICB9KTtcbn1cblxuJCgnLmJ1bGxldHMgYScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAkKHRoaXMpLmFkZENsYXNzKCdjbGlja2VkJyk7XG59KTtcbiIsIjsgdmFyIF9fYnJvd3NlcmlmeV9zaGltX3JlcXVpcmVfXz1yZXF1aXJlOyhmdW5jdGlvbiBicm93c2VyaWZ5U2hpbShtb2R1bGUsIGRlZmluZSwgcmVxdWlyZSkge1xuLyoqXG4gKiBAYXV0aG9yIGFsdGVyZWRxIC8gaHR0cDovL2FsdGVyZWRxdWFsaWEuY29tL1xuICogQGF1dGhvciBtci5kb29iIC8gaHR0cDovL21yZG9vYi5jb20vXG4gKi9cblxudmFyIERldGVjdG9yID0ge1xuXG5cdGNhbnZhczogISEgd2luZG93LkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxcblx0d2ViZ2w6ICggZnVuY3Rpb24gKCkge1xuXG5cdFx0dHJ5IHtcblxuXHRcdFx0dmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdjYW52YXMnICk7IHJldHVybiAhISAoIHdpbmRvdy5XZWJHTFJlbmRlcmluZ0NvbnRleHQgJiYgKCBjYW52YXMuZ2V0Q29udGV4dCggJ3dlYmdsJyApIHx8IGNhbnZhcy5nZXRDb250ZXh0KCAnZXhwZXJpbWVudGFsLXdlYmdsJyApICkgKTtcblxuXHRcdH0gY2F0Y2ggKCBlICkge1xuXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cblx0XHR9XG5cblx0fSApKCksXG5cdHdvcmtlcnM6ICEhIHdpbmRvdy5Xb3JrZXIsXG5cdGZpbGVhcGk6IHdpbmRvdy5GaWxlICYmIHdpbmRvdy5GaWxlUmVhZGVyICYmIHdpbmRvdy5GaWxlTGlzdCAmJiB3aW5kb3cuQmxvYixcblxuXHRnZXRXZWJHTEVycm9yTWVzc2FnZTogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCAnZGl2JyApO1xuXHRcdGVsZW1lbnQuaWQgPSAnd2ViZ2wtZXJyb3ItbWVzc2FnZSc7XG5cdFx0ZWxlbWVudC5zdHlsZS5mb250RmFtaWx5ID0gJ21vbm9zcGFjZSc7XG5cdFx0ZWxlbWVudC5zdHlsZS5mb250U2l6ZSA9ICcxM3B4Jztcblx0XHRlbGVtZW50LnN0eWxlLmZvbnRXZWlnaHQgPSAnbm9ybWFsJztcblx0XHRlbGVtZW50LnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuXHRcdGVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZCA9ICcjZmZmJztcblx0XHRlbGVtZW50LnN0eWxlLmNvbG9yID0gJyMwMDAnO1xuXHRcdGVsZW1lbnQuc3R5bGUucGFkZGluZyA9ICcxLjVlbSc7XG5cdFx0ZWxlbWVudC5zdHlsZS53aWR0aCA9ICc0MDBweCc7XG5cdFx0ZWxlbWVudC5zdHlsZS5tYXJnaW4gPSAnNWVtIGF1dG8gMCc7XG5cblx0XHRpZiAoICEgdGhpcy53ZWJnbCApIHtcblxuXHRcdFx0ZWxlbWVudC5pbm5lckhUTUwgPSB3aW5kb3cuV2ViR0xSZW5kZXJpbmdDb250ZXh0ID8gW1xuXHRcdFx0XHQnWW91ciBncmFwaGljcyBjYXJkIGRvZXMgbm90IHNlZW0gdG8gc3VwcG9ydCA8YSBocmVmPVwiaHR0cDovL2tocm9ub3Mub3JnL3dlYmdsL3dpa2kvR2V0dGluZ19hX1dlYkdMX0ltcGxlbWVudGF0aW9uXCIgc3R5bGU9XCJjb2xvcjojMDAwXCI+V2ViR0w8L2E+LjxiciAvPicsXG5cdFx0XHRcdCdGaW5kIG91dCBob3cgdG8gZ2V0IGl0IDxhIGhyZWY9XCJodHRwOi8vZ2V0LndlYmdsLm9yZy9cIiBzdHlsZT1cImNvbG9yOiMwMDBcIj5oZXJlPC9hPi4nXG5cdFx0XHRdLmpvaW4oICdcXG4nICkgOiBbXG5cdFx0XHRcdCdZb3VyIGJyb3dzZXIgZG9lcyBub3Qgc2VlbSB0byBzdXBwb3J0IDxhIGhyZWY9XCJodHRwOi8va2hyb25vcy5vcmcvd2ViZ2wvd2lraS9HZXR0aW5nX2FfV2ViR0xfSW1wbGVtZW50YXRpb25cIiBzdHlsZT1cImNvbG9yOiMwMDBcIj5XZWJHTDwvYT4uPGJyLz4nLFxuXHRcdFx0XHQnRmluZCBvdXQgaG93IHRvIGdldCBpdCA8YSBocmVmPVwiaHR0cDovL2dldC53ZWJnbC5vcmcvXCIgc3R5bGU9XCJjb2xvcjojMDAwXCI+aGVyZTwvYT4uJ1xuXHRcdFx0XS5qb2luKCAnXFxuJyApO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGVsZW1lbnQ7XG5cblx0fSxcblxuXHRhZGRHZXRXZWJHTE1lc3NhZ2U6IGZ1bmN0aW9uICggcGFyYW1ldGVycyApIHtcblxuXHRcdHZhciBwYXJlbnQsIGlkLCBlbGVtZW50O1xuXG5cdFx0cGFyYW1ldGVycyA9IHBhcmFtZXRlcnMgfHwge307XG5cblx0XHRwYXJlbnQgPSBwYXJhbWV0ZXJzLnBhcmVudCAhPT0gdW5kZWZpbmVkID8gcGFyYW1ldGVycy5wYXJlbnQgOiBkb2N1bWVudC5ib2R5O1xuXHRcdGlkID0gcGFyYW1ldGVycy5pZCAhPT0gdW5kZWZpbmVkID8gcGFyYW1ldGVycy5pZCA6ICdvbGRpZSc7XG5cblx0XHRlbGVtZW50ID0gRGV0ZWN0b3IuZ2V0V2ViR0xFcnJvck1lc3NhZ2UoKTtcblx0XHRlbGVtZW50LmlkID0gaWQ7XG5cblx0XHRwYXJlbnQuYXBwZW5kQ2hpbGQoIGVsZW1lbnQgKTtcblxuXHR9XG5cbn07XG5cbi8vIGJyb3dzZXJpZnkgc3VwcG9ydFxuaWYgKCB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyApIHtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IERldGVjdG9yO1xuXG59XG5cbn0pLmNhbGwoZ2xvYmFsLCBtb2R1bGUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkKTtcbiIsIjsgdmFyIF9fYnJvd3NlcmlmeV9zaGltX3JlcXVpcmVfXz1yZXF1aXJlOyhmdW5jdGlvbiBicm93c2VyaWZ5U2hpbShtb2R1bGUsIGRlZmluZSwgcmVxdWlyZSkge1xuLyoqXG4gKiBAYXV0aG9yIG1yZG9vYiAvIGh0dHA6Ly9tcmRvb2IuY29tL1xuICovXG5cblRIUkVFLk9CSkxvYWRlciA9IGZ1bmN0aW9uICggbWFuYWdlciApIHtcblxuXHR0aGlzLm1hbmFnZXIgPSAoIG1hbmFnZXIgIT09IHVuZGVmaW5lZCApID8gbWFuYWdlciA6IFRIUkVFLkRlZmF1bHRMb2FkaW5nTWFuYWdlcjtcblxuXHR0aGlzLm1hdGVyaWFscyA9IG51bGw7XG5cblx0dGhpcy5yZWdleHAgPSB7XG5cdFx0Ly8gdiBmbG9hdCBmbG9hdCBmbG9hdFxuXHRcdHZlcnRleF9wYXR0ZXJuICAgICAgICAgICA6IC9edlxccysoW1xcZHxcXC58XFwrfFxcLXxlfEVdKylcXHMrKFtcXGR8XFwufFxcK3xcXC18ZXxFXSspXFxzKyhbXFxkfFxcLnxcXCt8XFwtfGV8RV0rKS8sXG5cdFx0Ly8gdm4gZmxvYXQgZmxvYXQgZmxvYXRcblx0XHRub3JtYWxfcGF0dGVybiAgICAgICAgICAgOiAvXnZuXFxzKyhbXFxkfFxcLnxcXCt8XFwtfGV8RV0rKVxccysoW1xcZHxcXC58XFwrfFxcLXxlfEVdKylcXHMrKFtcXGR8XFwufFxcK3xcXC18ZXxFXSspLyxcblx0XHQvLyB2dCBmbG9hdCBmbG9hdFxuXHRcdHV2X3BhdHRlcm4gICAgICAgICAgICAgICA6IC9ednRcXHMrKFtcXGR8XFwufFxcK3xcXC18ZXxFXSspXFxzKyhbXFxkfFxcLnxcXCt8XFwtfGV8RV0rKS8sXG5cdFx0Ly8gZiB2ZXJ0ZXggdmVydGV4IHZlcnRleFxuXHRcdGZhY2VfdmVydGV4ICAgICAgICAgICAgICA6IC9eZlxccysoLT9cXGQrKVxccysoLT9cXGQrKVxccysoLT9cXGQrKSg/OlxccysoLT9cXGQrKSk/Lyxcblx0XHQvLyBmIHZlcnRleC91diB2ZXJ0ZXgvdXYgdmVydGV4L3V2XG5cdFx0ZmFjZV92ZXJ0ZXhfdXYgICAgICAgICAgIDogL15mXFxzKygtP1xcZCspXFwvKC0/XFxkKylcXHMrKC0/XFxkKylcXC8oLT9cXGQrKVxccysoLT9cXGQrKVxcLygtP1xcZCspKD86XFxzKygtP1xcZCspXFwvKC0/XFxkKykpPy8sXG5cdFx0Ly8gZiB2ZXJ0ZXgvdXYvbm9ybWFsIHZlcnRleC91di9ub3JtYWwgdmVydGV4L3V2L25vcm1hbFxuXHRcdGZhY2VfdmVydGV4X3V2X25vcm1hbCAgICA6IC9eZlxccysoLT9cXGQrKVxcLygtP1xcZCspXFwvKC0/XFxkKylcXHMrKC0/XFxkKylcXC8oLT9cXGQrKVxcLygtP1xcZCspXFxzKygtP1xcZCspXFwvKC0/XFxkKylcXC8oLT9cXGQrKSg/OlxccysoLT9cXGQrKVxcLygtP1xcZCspXFwvKC0/XFxkKykpPy8sXG5cdFx0Ly8gZiB2ZXJ0ZXgvL25vcm1hbCB2ZXJ0ZXgvL25vcm1hbCB2ZXJ0ZXgvL25vcm1hbFxuXHRcdGZhY2VfdmVydGV4X25vcm1hbCAgICAgICA6IC9eZlxccysoLT9cXGQrKVxcL1xcLygtP1xcZCspXFxzKygtP1xcZCspXFwvXFwvKC0/XFxkKylcXHMrKC0/XFxkKylcXC9cXC8oLT9cXGQrKSg/OlxccysoLT9cXGQrKVxcL1xcLygtP1xcZCspKT8vLFxuXHRcdC8vIG8gb2JqZWN0X25hbWUgfCBnIGdyb3VwX25hbWVcblx0XHRvYmplY3RfcGF0dGVybiAgICAgICAgICAgOiAvXltvZ11cXHMqKC4rKT8vLFxuXHRcdC8vIHMgYm9vbGVhblxuXHRcdHNtb290aGluZ19wYXR0ZXJuICAgICAgICA6IC9ec1xccysoXFxkK3xvbnxvZmYpLyxcblx0XHQvLyBtdGxsaWIgZmlsZV9yZWZlcmVuY2Vcblx0XHRtYXRlcmlhbF9saWJyYXJ5X3BhdHRlcm4gOiAvXm10bGxpYiAvLFxuXHRcdC8vIHVzZW10bCBtYXRlcmlhbF9uYW1lXG5cdFx0bWF0ZXJpYWxfdXNlX3BhdHRlcm4gICAgIDogL151c2VtdGwgL1xuXHR9O1xuXG59O1xuXG5USFJFRS5PQkpMb2FkZXIucHJvdG90eXBlID0ge1xuXG5cdGNvbnN0cnVjdG9yOiBUSFJFRS5PQkpMb2FkZXIsXG5cblx0bG9hZDogZnVuY3Rpb24gKCB1cmwsIG9uTG9hZCwgb25Qcm9ncmVzcywgb25FcnJvciApIHtcblxuXHRcdHZhciBzY29wZSA9IHRoaXM7XG5cblx0XHR2YXIgbG9hZGVyID0gbmV3IFRIUkVFLlhIUkxvYWRlciggc2NvcGUubWFuYWdlciApO1xuXHRcdGxvYWRlci5zZXRQYXRoKCB0aGlzLnBhdGggKTtcblx0XHRsb2FkZXIubG9hZCggdXJsLCBmdW5jdGlvbiAoIHRleHQgKSB7XG5cblx0XHRcdG9uTG9hZCggc2NvcGUucGFyc2UoIHRleHQgKSApO1xuXG5cdFx0fSwgb25Qcm9ncmVzcywgb25FcnJvciApO1xuXG5cdH0sXG5cblx0c2V0UGF0aDogZnVuY3Rpb24gKCB2YWx1ZSApIHtcblxuXHRcdHRoaXMucGF0aCA9IHZhbHVlO1xuXG5cdH0sXG5cblx0c2V0TWF0ZXJpYWxzOiBmdW5jdGlvbiAoIG1hdGVyaWFscyApIHtcblxuXHRcdHRoaXMubWF0ZXJpYWxzID0gbWF0ZXJpYWxzO1xuXG5cdH0sXG5cblx0X2NyZWF0ZVBhcnNlclN0YXRlIDogZnVuY3Rpb24gKCkge1xuXG5cdFx0dmFyIHN0YXRlID0ge1xuXHRcdFx0b2JqZWN0cyAgOiBbXSxcblx0XHRcdG9iamVjdCAgIDoge30sXG5cblx0XHRcdHZlcnRpY2VzIDogW10sXG5cdFx0XHRub3JtYWxzICA6IFtdLFxuXHRcdFx0dXZzICAgICAgOiBbXSxcblxuXHRcdFx0bWF0ZXJpYWxMaWJyYXJpZXMgOiBbXSxcblxuXHRcdFx0c3RhcnRPYmplY3Q6IGZ1bmN0aW9uICggbmFtZSwgZnJvbURlY2xhcmF0aW9uICkge1xuXG5cdFx0XHRcdC8vIElmIHRoZSBjdXJyZW50IG9iamVjdCAoaW5pdGlhbCBmcm9tIHJlc2V0KSBpcyBub3QgZnJvbSBhIGcvbyBkZWNsYXJhdGlvbiBpbiB0aGUgcGFyc2VkXG5cdFx0XHRcdC8vIGZpbGUuIFdlIG5lZWQgdG8gdXNlIGl0IGZvciB0aGUgZmlyc3QgcGFyc2VkIGcvbyB0byBrZWVwIHRoaW5ncyBpbiBzeW5jLlxuXHRcdFx0XHRpZiAoIHRoaXMub2JqZWN0ICYmIHRoaXMub2JqZWN0LmZyb21EZWNsYXJhdGlvbiA9PT0gZmFsc2UgKSB7XG5cblx0XHRcdFx0XHR0aGlzLm9iamVjdC5uYW1lID0gbmFtZTtcblx0XHRcdFx0XHR0aGlzLm9iamVjdC5mcm9tRGVjbGFyYXRpb24gPSAoIGZyb21EZWNsYXJhdGlvbiAhPT0gZmFsc2UgKTtcblx0XHRcdFx0XHRyZXR1cm47XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICggdGhpcy5vYmplY3QgJiYgdHlwZW9mIHRoaXMub2JqZWN0Ll9maW5hbGl6ZSA9PT0gJ2Z1bmN0aW9uJyApIHtcblxuXHRcdFx0XHRcdHRoaXMub2JqZWN0Ll9maW5hbGl6ZSgpO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgcHJldmlvdXNNYXRlcmlhbCA9ICggdGhpcy5vYmplY3QgJiYgdHlwZW9mIHRoaXMub2JqZWN0LmN1cnJlbnRNYXRlcmlhbCA9PT0gJ2Z1bmN0aW9uJyA/IHRoaXMub2JqZWN0LmN1cnJlbnRNYXRlcmlhbCgpIDogdW5kZWZpbmVkICk7XG5cblx0XHRcdFx0dGhpcy5vYmplY3QgPSB7XG5cdFx0XHRcdFx0bmFtZSA6IG5hbWUgfHwgJycsXG5cdFx0XHRcdFx0ZnJvbURlY2xhcmF0aW9uIDogKCBmcm9tRGVjbGFyYXRpb24gIT09IGZhbHNlICksXG5cblx0XHRcdFx0XHRnZW9tZXRyeSA6IHtcblx0XHRcdFx0XHRcdHZlcnRpY2VzIDogW10sXG5cdFx0XHRcdFx0XHRub3JtYWxzICA6IFtdLFxuXHRcdFx0XHRcdFx0dXZzICAgICAgOiBbXVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0bWF0ZXJpYWxzIDogW10sXG5cdFx0XHRcdFx0c21vb3RoIDogdHJ1ZSxcblxuXHRcdFx0XHRcdHN0YXJ0TWF0ZXJpYWwgOiBmdW5jdGlvbiggbmFtZSwgbGlicmFyaWVzICkge1xuXG5cdFx0XHRcdFx0XHR2YXIgcHJldmlvdXMgPSB0aGlzLl9maW5hbGl6ZSggZmFsc2UgKTtcblxuXHRcdFx0XHRcdFx0Ly8gTmV3IHVzZW10bCBkZWNsYXJhdGlvbiBvdmVyd3JpdGVzIGFuIGluaGVyaXRlZCBtYXRlcmlhbCwgZXhjZXB0IGlmIGZhY2VzIHdlcmUgZGVjbGFyZWRcblx0XHRcdFx0XHRcdC8vIGFmdGVyIHRoZSBtYXRlcmlhbCwgdGhlbiBpdCBtdXN0IGJlIHByZXNlcnZlZCBmb3IgcHJvcGVyIE11bHRpTWF0ZXJpYWwgY29udGludWF0aW9uLlxuXHRcdFx0XHRcdFx0aWYgKCBwcmV2aW91cyAmJiAoIHByZXZpb3VzLmluaGVyaXRlZCB8fCBwcmV2aW91cy5ncm91cENvdW50IDw9IDAgKSApIHtcblxuXHRcdFx0XHRcdFx0XHR0aGlzLm1hdGVyaWFscy5zcGxpY2UoIHByZXZpb3VzLmluZGV4LCAxICk7XG5cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0dmFyIG1hdGVyaWFsID0ge1xuXHRcdFx0XHRcdFx0XHRpbmRleCAgICAgIDogdGhpcy5tYXRlcmlhbHMubGVuZ3RoLFxuXHRcdFx0XHRcdFx0XHRuYW1lICAgICAgIDogbmFtZSB8fCAnJyxcblx0XHRcdFx0XHRcdFx0bXRsbGliICAgICA6ICggQXJyYXkuaXNBcnJheSggbGlicmFyaWVzICkgJiYgbGlicmFyaWVzLmxlbmd0aCA+IDAgPyBsaWJyYXJpZXNbIGxpYnJhcmllcy5sZW5ndGggLSAxIF0gOiAnJyApLFxuXHRcdFx0XHRcdFx0XHRzbW9vdGggICAgIDogKCBwcmV2aW91cyAhPT0gdW5kZWZpbmVkID8gcHJldmlvdXMuc21vb3RoIDogdGhpcy5zbW9vdGggKSxcblx0XHRcdFx0XHRcdFx0Z3JvdXBTdGFydCA6ICggcHJldmlvdXMgIT09IHVuZGVmaW5lZCA/IHByZXZpb3VzLmdyb3VwRW5kIDogMCApLFxuXHRcdFx0XHRcdFx0XHRncm91cEVuZCAgIDogLTEsXG5cdFx0XHRcdFx0XHRcdGdyb3VwQ291bnQgOiAtMSxcblx0XHRcdFx0XHRcdFx0aW5oZXJpdGVkICA6IGZhbHNlLFxuXG5cdFx0XHRcdFx0XHRcdGNsb25lIDogZnVuY3Rpb24oIGluZGV4ICkge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpbmRleCAgICAgIDogKCB0eXBlb2YgaW5kZXggPT09ICdudW1iZXInID8gaW5kZXggOiB0aGlzLmluZGV4ICksXG5cdFx0XHRcdFx0XHRcdFx0XHRuYW1lICAgICAgIDogdGhpcy5uYW1lLFxuXHRcdFx0XHRcdFx0XHRcdFx0bXRsbGliICAgICA6IHRoaXMubXRsbGliLFxuXHRcdFx0XHRcdFx0XHRcdFx0c21vb3RoICAgICA6IHRoaXMuc21vb3RoLFxuXHRcdFx0XHRcdFx0XHRcdFx0Z3JvdXBTdGFydCA6IHRoaXMuZ3JvdXBFbmQsXG5cdFx0XHRcdFx0XHRcdFx0XHRncm91cEVuZCAgIDogLTEsXG5cdFx0XHRcdFx0XHRcdFx0XHRncm91cENvdW50IDogLTEsXG5cdFx0XHRcdFx0XHRcdFx0XHRpbmhlcml0ZWQgIDogZmFsc2Vcblx0XHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0XHR0aGlzLm1hdGVyaWFscy5wdXNoKCBtYXRlcmlhbCApO1xuXG5cdFx0XHRcdFx0XHRyZXR1cm4gbWF0ZXJpYWw7XG5cblx0XHRcdFx0XHR9LFxuXG5cdFx0XHRcdFx0Y3VycmVudE1hdGVyaWFsIDogZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0XHRcdGlmICggdGhpcy5tYXRlcmlhbHMubGVuZ3RoID4gMCApIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMubWF0ZXJpYWxzWyB0aGlzLm1hdGVyaWFscy5sZW5ndGggLSAxIF07XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cblx0XHRcdFx0XHR9LFxuXG5cdFx0XHRcdFx0X2ZpbmFsaXplIDogZnVuY3Rpb24oIGVuZCApIHtcblxuXHRcdFx0XHRcdFx0dmFyIGxhc3RNdWx0aU1hdGVyaWFsID0gdGhpcy5jdXJyZW50TWF0ZXJpYWwoKTtcblx0XHRcdFx0XHRcdGlmICggbGFzdE11bHRpTWF0ZXJpYWwgJiYgbGFzdE11bHRpTWF0ZXJpYWwuZ3JvdXBFbmQgPT09IC0xICkge1xuXG5cdFx0XHRcdFx0XHRcdGxhc3RNdWx0aU1hdGVyaWFsLmdyb3VwRW5kID0gdGhpcy5nZW9tZXRyeS52ZXJ0aWNlcy5sZW5ndGggLyAzO1xuXHRcdFx0XHRcdFx0XHRsYXN0TXVsdGlNYXRlcmlhbC5ncm91cENvdW50ID0gbGFzdE11bHRpTWF0ZXJpYWwuZ3JvdXBFbmQgLSBsYXN0TXVsdGlNYXRlcmlhbC5ncm91cFN0YXJ0O1xuXHRcdFx0XHRcdFx0XHRsYXN0TXVsdGlNYXRlcmlhbC5pbmhlcml0ZWQgPSBmYWxzZTtcblxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBHdWFyYW50ZWUgYXQgbGVhc3Qgb25lIGVtcHR5IG1hdGVyaWFsLCB0aGlzIG1ha2VzIHRoZSBjcmVhdGlvbiBsYXRlciBtb3JlIHN0cmFpZ2h0IGZvcndhcmQuXG5cdFx0XHRcdFx0XHRpZiAoIGVuZCAhPT0gZmFsc2UgJiYgdGhpcy5tYXRlcmlhbHMubGVuZ3RoID09PSAwICkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLm1hdGVyaWFscy5wdXNoKHtcblx0XHRcdFx0XHRcdFx0XHRuYW1lICAgOiAnJyxcblx0XHRcdFx0XHRcdFx0XHRzbW9vdGggOiB0aGlzLnNtb290aFxuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0cmV0dXJuIGxhc3RNdWx0aU1hdGVyaWFsO1xuXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdC8vIEluaGVyaXQgcHJldmlvdXMgb2JqZWN0cyBtYXRlcmlhbC5cblx0XHRcdFx0Ly8gU3BlYyB0ZWxscyB1cyB0aGF0IGEgZGVjbGFyZWQgbWF0ZXJpYWwgbXVzdCBiZSBzZXQgdG8gYWxsIG9iamVjdHMgdW50aWwgYSBuZXcgbWF0ZXJpYWwgaXMgZGVjbGFyZWQuXG5cdFx0XHRcdC8vIElmIGEgdXNlbXRsIGRlY2xhcmF0aW9uIGlzIGVuY291bnRlcmVkIHdoaWxlIHRoaXMgbmV3IG9iamVjdCBpcyBiZWluZyBwYXJzZWQsIGl0IHdpbGxcblx0XHRcdFx0Ly8gb3ZlcndyaXRlIHRoZSBpbmhlcml0ZWQgbWF0ZXJpYWwuIEV4Y2VwdGlvbiBiZWluZyB0aGF0IHRoZXJlIHdhcyBhbHJlYWR5IGZhY2UgZGVjbGFyYXRpb25zXG5cdFx0XHRcdC8vIHRvIHRoZSBpbmhlcml0ZWQgbWF0ZXJpYWwsIHRoZW4gaXQgd2lsbCBiZSBwcmVzZXJ2ZWQgZm9yIHByb3BlciBNdWx0aU1hdGVyaWFsIGNvbnRpbnVhdGlvbi5cblxuXHRcdFx0XHRpZiAoIHByZXZpb3VzTWF0ZXJpYWwgJiYgcHJldmlvdXNNYXRlcmlhbC5uYW1lICYmIHR5cGVvZiBwcmV2aW91c01hdGVyaWFsLmNsb25lID09PSBcImZ1bmN0aW9uXCIgKSB7XG5cblx0XHRcdFx0XHR2YXIgZGVjbGFyZWQgPSBwcmV2aW91c01hdGVyaWFsLmNsb25lKCAwICk7XG5cdFx0XHRcdFx0ZGVjbGFyZWQuaW5oZXJpdGVkID0gdHJ1ZTtcblx0XHRcdFx0XHR0aGlzLm9iamVjdC5tYXRlcmlhbHMucHVzaCggZGVjbGFyZWQgKTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5vYmplY3RzLnB1c2goIHRoaXMub2JqZWN0ICk7XG5cblx0XHRcdH0sXG5cblx0XHRcdGZpbmFsaXplIDogZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0aWYgKCB0aGlzLm9iamVjdCAmJiB0eXBlb2YgdGhpcy5vYmplY3QuX2ZpbmFsaXplID09PSAnZnVuY3Rpb24nICkge1xuXG5cdFx0XHRcdFx0dGhpcy5vYmplY3QuX2ZpbmFsaXplKCk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9LFxuXG5cdFx0XHRwYXJzZVZlcnRleEluZGV4OiBmdW5jdGlvbiAoIHZhbHVlLCBsZW4gKSB7XG5cblx0XHRcdFx0dmFyIGluZGV4ID0gcGFyc2VJbnQoIHZhbHVlLCAxMCApO1xuXHRcdFx0XHRyZXR1cm4gKCBpbmRleCA+PSAwID8gaW5kZXggLSAxIDogaW5kZXggKyBsZW4gLyAzICkgKiAzO1xuXG5cdFx0XHR9LFxuXG5cdFx0XHRwYXJzZU5vcm1hbEluZGV4OiBmdW5jdGlvbiAoIHZhbHVlLCBsZW4gKSB7XG5cblx0XHRcdFx0dmFyIGluZGV4ID0gcGFyc2VJbnQoIHZhbHVlLCAxMCApO1xuXHRcdFx0XHRyZXR1cm4gKCBpbmRleCA+PSAwID8gaW5kZXggLSAxIDogaW5kZXggKyBsZW4gLyAzICkgKiAzO1xuXG5cdFx0XHR9LFxuXG5cdFx0XHRwYXJzZVVWSW5kZXg6IGZ1bmN0aW9uICggdmFsdWUsIGxlbiApIHtcblxuXHRcdFx0XHR2YXIgaW5kZXggPSBwYXJzZUludCggdmFsdWUsIDEwICk7XG5cdFx0XHRcdHJldHVybiAoIGluZGV4ID49IDAgPyBpbmRleCAtIDEgOiBpbmRleCArIGxlbiAvIDIgKSAqIDI7XG5cblx0XHRcdH0sXG5cblx0XHRcdGFkZFZlcnRleDogZnVuY3Rpb24gKCBhLCBiLCBjICkge1xuXG5cdFx0XHRcdHZhciBzcmMgPSB0aGlzLnZlcnRpY2VzO1xuXHRcdFx0XHR2YXIgZHN0ID0gdGhpcy5vYmplY3QuZ2VvbWV0cnkudmVydGljZXM7XG5cblx0XHRcdFx0ZHN0LnB1c2goIHNyY1sgYSArIDAgXSApO1xuXHRcdFx0XHRkc3QucHVzaCggc3JjWyBhICsgMSBdICk7XG5cdFx0XHRcdGRzdC5wdXNoKCBzcmNbIGEgKyAyIF0gKTtcblx0XHRcdFx0ZHN0LnB1c2goIHNyY1sgYiArIDAgXSApO1xuXHRcdFx0XHRkc3QucHVzaCggc3JjWyBiICsgMSBdICk7XG5cdFx0XHRcdGRzdC5wdXNoKCBzcmNbIGIgKyAyIF0gKTtcblx0XHRcdFx0ZHN0LnB1c2goIHNyY1sgYyArIDAgXSApO1xuXHRcdFx0XHRkc3QucHVzaCggc3JjWyBjICsgMSBdICk7XG5cdFx0XHRcdGRzdC5wdXNoKCBzcmNbIGMgKyAyIF0gKTtcblxuXHRcdFx0fSxcblxuXHRcdFx0YWRkVmVydGV4TGluZTogZnVuY3Rpb24gKCBhICkge1xuXG5cdFx0XHRcdHZhciBzcmMgPSB0aGlzLnZlcnRpY2VzO1xuXHRcdFx0XHR2YXIgZHN0ID0gdGhpcy5vYmplY3QuZ2VvbWV0cnkudmVydGljZXM7XG5cblx0XHRcdFx0ZHN0LnB1c2goIHNyY1sgYSArIDAgXSApO1xuXHRcdFx0XHRkc3QucHVzaCggc3JjWyBhICsgMSBdICk7XG5cdFx0XHRcdGRzdC5wdXNoKCBzcmNbIGEgKyAyIF0gKTtcblxuXHRcdFx0fSxcblxuXHRcdFx0YWRkTm9ybWFsIDogZnVuY3Rpb24gKCBhLCBiLCBjICkge1xuXG5cdFx0XHRcdHZhciBzcmMgPSB0aGlzLm5vcm1hbHM7XG5cdFx0XHRcdHZhciBkc3QgPSB0aGlzLm9iamVjdC5nZW9tZXRyeS5ub3JtYWxzO1xuXG5cdFx0XHRcdGRzdC5wdXNoKCBzcmNbIGEgKyAwIF0gKTtcblx0XHRcdFx0ZHN0LnB1c2goIHNyY1sgYSArIDEgXSApO1xuXHRcdFx0XHRkc3QucHVzaCggc3JjWyBhICsgMiBdICk7XG5cdFx0XHRcdGRzdC5wdXNoKCBzcmNbIGIgKyAwIF0gKTtcblx0XHRcdFx0ZHN0LnB1c2goIHNyY1sgYiArIDEgXSApO1xuXHRcdFx0XHRkc3QucHVzaCggc3JjWyBiICsgMiBdICk7XG5cdFx0XHRcdGRzdC5wdXNoKCBzcmNbIGMgKyAwIF0gKTtcblx0XHRcdFx0ZHN0LnB1c2goIHNyY1sgYyArIDEgXSApO1xuXHRcdFx0XHRkc3QucHVzaCggc3JjWyBjICsgMiBdICk7XG5cblx0XHRcdH0sXG5cblx0XHRcdGFkZFVWOiBmdW5jdGlvbiAoIGEsIGIsIGMgKSB7XG5cblx0XHRcdFx0dmFyIHNyYyA9IHRoaXMudXZzO1xuXHRcdFx0XHR2YXIgZHN0ID0gdGhpcy5vYmplY3QuZ2VvbWV0cnkudXZzO1xuXG5cdFx0XHRcdGRzdC5wdXNoKCBzcmNbIGEgKyAwIF0gKTtcblx0XHRcdFx0ZHN0LnB1c2goIHNyY1sgYSArIDEgXSApO1xuXHRcdFx0XHRkc3QucHVzaCggc3JjWyBiICsgMCBdICk7XG5cdFx0XHRcdGRzdC5wdXNoKCBzcmNbIGIgKyAxIF0gKTtcblx0XHRcdFx0ZHN0LnB1c2goIHNyY1sgYyArIDAgXSApO1xuXHRcdFx0XHRkc3QucHVzaCggc3JjWyBjICsgMSBdICk7XG5cblx0XHRcdH0sXG5cblx0XHRcdGFkZFVWTGluZTogZnVuY3Rpb24gKCBhICkge1xuXG5cdFx0XHRcdHZhciBzcmMgPSB0aGlzLnV2cztcblx0XHRcdFx0dmFyIGRzdCA9IHRoaXMub2JqZWN0Lmdlb21ldHJ5LnV2cztcblxuXHRcdFx0XHRkc3QucHVzaCggc3JjWyBhICsgMCBdICk7XG5cdFx0XHRcdGRzdC5wdXNoKCBzcmNbIGEgKyAxIF0gKTtcblxuXHRcdFx0fSxcblxuXHRcdFx0YWRkRmFjZTogZnVuY3Rpb24gKCBhLCBiLCBjLCBkLCB1YSwgdWIsIHVjLCB1ZCwgbmEsIG5iLCBuYywgbmQgKSB7XG5cblx0XHRcdFx0dmFyIHZMZW4gPSB0aGlzLnZlcnRpY2VzLmxlbmd0aDtcblxuXHRcdFx0XHR2YXIgaWEgPSB0aGlzLnBhcnNlVmVydGV4SW5kZXgoIGEsIHZMZW4gKTtcblx0XHRcdFx0dmFyIGliID0gdGhpcy5wYXJzZVZlcnRleEluZGV4KCBiLCB2TGVuICk7XG5cdFx0XHRcdHZhciBpYyA9IHRoaXMucGFyc2VWZXJ0ZXhJbmRleCggYywgdkxlbiApO1xuXHRcdFx0XHR2YXIgaWQ7XG5cblx0XHRcdFx0aWYgKCBkID09PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdFx0XHR0aGlzLmFkZFZlcnRleCggaWEsIGliLCBpYyApO1xuXG5cdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRpZCA9IHRoaXMucGFyc2VWZXJ0ZXhJbmRleCggZCwgdkxlbiApO1xuXG5cdFx0XHRcdFx0dGhpcy5hZGRWZXJ0ZXgoIGlhLCBpYiwgaWQgKTtcblx0XHRcdFx0XHR0aGlzLmFkZFZlcnRleCggaWIsIGljLCBpZCApO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIHVhICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdFx0XHR2YXIgdXZMZW4gPSB0aGlzLnV2cy5sZW5ndGg7XG5cblx0XHRcdFx0XHRpYSA9IHRoaXMucGFyc2VVVkluZGV4KCB1YSwgdXZMZW4gKTtcblx0XHRcdFx0XHRpYiA9IHRoaXMucGFyc2VVVkluZGV4KCB1YiwgdXZMZW4gKTtcblx0XHRcdFx0XHRpYyA9IHRoaXMucGFyc2VVVkluZGV4KCB1YywgdXZMZW4gKTtcblxuXHRcdFx0XHRcdGlmICggZCA9PT0gdW5kZWZpbmVkICkge1xuXG5cdFx0XHRcdFx0XHR0aGlzLmFkZFVWKCBpYSwgaWIsIGljICk7XG5cblx0XHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0XHRpZCA9IHRoaXMucGFyc2VVVkluZGV4KCB1ZCwgdXZMZW4gKTtcblxuXHRcdFx0XHRcdFx0dGhpcy5hZGRVViggaWEsIGliLCBpZCApO1xuXHRcdFx0XHRcdFx0dGhpcy5hZGRVViggaWIsIGljLCBpZCApO1xuXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIG5hICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdFx0XHQvLyBOb3JtYWxzIGFyZSBtYW55IHRpbWVzIHRoZSBzYW1lLiBJZiBzbywgc2tpcCBmdW5jdGlvbiBjYWxsIGFuZCBwYXJzZUludC5cblx0XHRcdFx0XHR2YXIgbkxlbiA9IHRoaXMubm9ybWFscy5sZW5ndGg7XG5cdFx0XHRcdFx0aWEgPSB0aGlzLnBhcnNlTm9ybWFsSW5kZXgoIG5hLCBuTGVuICk7XG5cblx0XHRcdFx0XHRpYiA9IG5hID09PSBuYiA/IGlhIDogdGhpcy5wYXJzZU5vcm1hbEluZGV4KCBuYiwgbkxlbiApO1xuXHRcdFx0XHRcdGljID0gbmEgPT09IG5jID8gaWEgOiB0aGlzLnBhcnNlTm9ybWFsSW5kZXgoIG5jLCBuTGVuICk7XG5cblx0XHRcdFx0XHRpZiAoIGQgPT09IHVuZGVmaW5lZCApIHtcblxuXHRcdFx0XHRcdFx0dGhpcy5hZGROb3JtYWwoIGlhLCBpYiwgaWMgKTtcblxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRcdGlkID0gdGhpcy5wYXJzZU5vcm1hbEluZGV4KCBuZCwgbkxlbiApO1xuXG5cdFx0XHRcdFx0XHR0aGlzLmFkZE5vcm1hbCggaWEsIGliLCBpZCApO1xuXHRcdFx0XHRcdFx0dGhpcy5hZGROb3JtYWwoIGliLCBpYywgaWQgKTtcblxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9XG5cblx0XHRcdH0sXG5cblx0XHRcdGFkZExpbmVHZW9tZXRyeTogZnVuY3Rpb24gKCB2ZXJ0aWNlcywgdXZzICkge1xuXG5cdFx0XHRcdHRoaXMub2JqZWN0Lmdlb21ldHJ5LnR5cGUgPSAnTGluZSc7XG5cblx0XHRcdFx0dmFyIHZMZW4gPSB0aGlzLnZlcnRpY2VzLmxlbmd0aDtcblx0XHRcdFx0dmFyIHV2TGVuID0gdGhpcy51dnMubGVuZ3RoO1xuXG5cdFx0XHRcdGZvciAoIHZhciB2aSA9IDAsIGwgPSB2ZXJ0aWNlcy5sZW5ndGg7IHZpIDwgbDsgdmkgKysgKSB7XG5cblx0XHRcdFx0XHR0aGlzLmFkZFZlcnRleExpbmUoIHRoaXMucGFyc2VWZXJ0ZXhJbmRleCggdmVydGljZXNbIHZpIF0sIHZMZW4gKSApO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRmb3IgKCB2YXIgdXZpID0gMCwgbCA9IHV2cy5sZW5ndGg7IHV2aSA8IGw7IHV2aSArKyApIHtcblxuXHRcdFx0XHRcdHRoaXMuYWRkVVZMaW5lKCB0aGlzLnBhcnNlVVZJbmRleCggdXZzWyB1dmkgXSwgdXZMZW4gKSApO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXG5cdFx0fTtcblxuXHRcdHN0YXRlLnN0YXJ0T2JqZWN0KCAnJywgZmFsc2UgKTtcblxuXHRcdHJldHVybiBzdGF0ZTtcblxuXHR9LFxuXG5cdHBhcnNlOiBmdW5jdGlvbiAoIHRleHQgKSB7XG5cblx0XHRjb25zb2xlLnRpbWUoICdPQkpMb2FkZXInICk7XG5cblx0XHR2YXIgc3RhdGUgPSB0aGlzLl9jcmVhdGVQYXJzZXJTdGF0ZSgpO1xuXG5cdFx0aWYgKCB0ZXh0LmluZGV4T2YoICdcXHJcXG4nICkgIT09IC0gMSApIHtcblxuXHRcdFx0Ly8gVGhpcyBpcyBmYXN0ZXIgdGhhbiBTdHJpbmcuc3BsaXQgd2l0aCByZWdleCB0aGF0IHNwbGl0cyBvbiBib3RoXG5cdFx0XHR0ZXh0ID0gdGV4dC5yZXBsYWNlKCAnXFxyXFxuJywgJ1xcbicgKTtcblxuXHRcdH1cblxuXHRcdHZhciBsaW5lcyA9IHRleHQuc3BsaXQoICdcXG4nICk7XG5cdFx0dmFyIGxpbmUgPSAnJywgbGluZUZpcnN0Q2hhciA9ICcnLCBsaW5lU2Vjb25kQ2hhciA9ICcnO1xuXHRcdHZhciBsaW5lTGVuZ3RoID0gMDtcblx0XHR2YXIgcmVzdWx0ID0gW107XG5cblx0XHQvLyBGYXN0ZXIgdG8ganVzdCB0cmltIGxlZnQgc2lkZSBvZiB0aGUgbGluZS4gVXNlIGlmIGF2YWlsYWJsZS5cblx0XHR2YXIgdHJpbUxlZnQgPSAoIHR5cGVvZiAnJy50cmltTGVmdCA9PT0gJ2Z1bmN0aW9uJyApO1xuXG5cdFx0Zm9yICggdmFyIGkgPSAwLCBsID0gbGluZXMubGVuZ3RoOyBpIDwgbDsgaSArKyApIHtcblxuXHRcdFx0bGluZSA9IGxpbmVzWyBpIF07XG5cblx0XHRcdGxpbmUgPSB0cmltTGVmdCA/IGxpbmUudHJpbUxlZnQoKSA6IGxpbmUudHJpbSgpO1xuXG5cdFx0XHRsaW5lTGVuZ3RoID0gbGluZS5sZW5ndGg7XG5cblx0XHRcdGlmICggbGluZUxlbmd0aCA9PT0gMCApIGNvbnRpbnVlO1xuXG5cdFx0XHRsaW5lRmlyc3RDaGFyID0gbGluZS5jaGFyQXQoIDAgKTtcblxuXHRcdFx0Ly8gQHRvZG8gaW52b2tlIHBhc3NlZCBpbiBoYW5kbGVyIGlmIGFueVxuXHRcdFx0aWYgKCBsaW5lRmlyc3RDaGFyID09PSAnIycgKSBjb250aW51ZTtcblxuXHRcdFx0aWYgKCBsaW5lRmlyc3RDaGFyID09PSAndicgKSB7XG5cblx0XHRcdFx0bGluZVNlY29uZENoYXIgPSBsaW5lLmNoYXJBdCggMSApO1xuXG5cdFx0XHRcdGlmICggbGluZVNlY29uZENoYXIgPT09ICcgJyAmJiAoIHJlc3VsdCA9IHRoaXMucmVnZXhwLnZlcnRleF9wYXR0ZXJuLmV4ZWMoIGxpbmUgKSApICE9PSBudWxsICkge1xuXG5cdFx0XHRcdFx0Ly8gMCAgICAgICAgICAgICAgICAgIDEgICAgICAyICAgICAgM1xuXHRcdFx0XHRcdC8vIFtcInYgMS4wIDIuMCAzLjBcIiwgXCIxLjBcIiwgXCIyLjBcIiwgXCIzLjBcIl1cblxuXHRcdFx0XHRcdHN0YXRlLnZlcnRpY2VzLnB1c2goXG5cdFx0XHRcdFx0XHRwYXJzZUZsb2F0KCByZXN1bHRbIDEgXSApLFxuXHRcdFx0XHRcdFx0cGFyc2VGbG9hdCggcmVzdWx0WyAyIF0gKSxcblx0XHRcdFx0XHRcdHBhcnNlRmxvYXQoIHJlc3VsdFsgMyBdIClcblx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdH0gZWxzZSBpZiAoIGxpbmVTZWNvbmRDaGFyID09PSAnbicgJiYgKCByZXN1bHQgPSB0aGlzLnJlZ2V4cC5ub3JtYWxfcGF0dGVybi5leGVjKCBsaW5lICkgKSAhPT0gbnVsbCApIHtcblxuXHRcdFx0XHRcdC8vIDAgICAgICAgICAgICAgICAgICAgMSAgICAgIDIgICAgICAzXG5cdFx0XHRcdFx0Ly8gW1widm4gMS4wIDIuMCAzLjBcIiwgXCIxLjBcIiwgXCIyLjBcIiwgXCIzLjBcIl1cblxuXHRcdFx0XHRcdHN0YXRlLm5vcm1hbHMucHVzaChcblx0XHRcdFx0XHRcdHBhcnNlRmxvYXQoIHJlc3VsdFsgMSBdICksXG5cdFx0XHRcdFx0XHRwYXJzZUZsb2F0KCByZXN1bHRbIDIgXSApLFxuXHRcdFx0XHRcdFx0cGFyc2VGbG9hdCggcmVzdWx0WyAzIF0gKVxuXHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0fSBlbHNlIGlmICggbGluZVNlY29uZENoYXIgPT09ICd0JyAmJiAoIHJlc3VsdCA9IHRoaXMucmVnZXhwLnV2X3BhdHRlcm4uZXhlYyggbGluZSApICkgIT09IG51bGwgKSB7XG5cblx0XHRcdFx0XHQvLyAwICAgICAgICAgICAgICAgMSAgICAgIDJcblx0XHRcdFx0XHQvLyBbXCJ2dCAwLjEgMC4yXCIsIFwiMC4xXCIsIFwiMC4yXCJdXG5cblx0XHRcdFx0XHRzdGF0ZS51dnMucHVzaChcblx0XHRcdFx0XHRcdHBhcnNlRmxvYXQoIHJlc3VsdFsgMSBdICksXG5cdFx0XHRcdFx0XHRwYXJzZUZsb2F0KCByZXN1bHRbIDIgXSApXG5cdFx0XHRcdFx0KTtcblxuXHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCBcIlVuZXhwZWN0ZWQgdmVydGV4L25vcm1hbC91diBsaW5lOiAnXCIgKyBsaW5lICArIFwiJ1wiICk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9IGVsc2UgaWYgKCBsaW5lRmlyc3RDaGFyID09PSBcImZcIiApIHtcblxuXHRcdFx0XHRpZiAoICggcmVzdWx0ID0gdGhpcy5yZWdleHAuZmFjZV92ZXJ0ZXhfdXZfbm9ybWFsLmV4ZWMoIGxpbmUgKSApICE9PSBudWxsICkge1xuXG5cdFx0XHRcdFx0Ly8gZiB2ZXJ0ZXgvdXYvbm9ybWFsIHZlcnRleC91di9ub3JtYWwgdmVydGV4L3V2L25vcm1hbFxuXHRcdFx0XHRcdC8vIDAgICAgICAgICAgICAgICAgICAgICAgICAxICAgIDIgICAgMyAgICA0ICAgIDUgICAgNiAgICA3ICAgIDggICAgOSAgIDEwICAgICAgICAgMTEgICAgICAgICAxMlxuXHRcdFx0XHRcdC8vIFtcImYgMS8xLzEgMi8yLzIgMy8zLzNcIiwgXCIxXCIsIFwiMVwiLCBcIjFcIiwgXCIyXCIsIFwiMlwiLCBcIjJcIiwgXCIzXCIsIFwiM1wiLCBcIjNcIiwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZF1cblxuXHRcdFx0XHRcdHN0YXRlLmFkZEZhY2UoXG5cdFx0XHRcdFx0XHRyZXN1bHRbIDEgXSwgcmVzdWx0WyA0IF0sIHJlc3VsdFsgNyBdLCByZXN1bHRbIDEwIF0sXG5cdFx0XHRcdFx0XHRyZXN1bHRbIDIgXSwgcmVzdWx0WyA1IF0sIHJlc3VsdFsgOCBdLCByZXN1bHRbIDExIF0sXG5cdFx0XHRcdFx0XHRyZXN1bHRbIDMgXSwgcmVzdWx0WyA2IF0sIHJlc3VsdFsgOSBdLCByZXN1bHRbIDEyIF1cblx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdH0gZWxzZSBpZiAoICggcmVzdWx0ID0gdGhpcy5yZWdleHAuZmFjZV92ZXJ0ZXhfdXYuZXhlYyggbGluZSApICkgIT09IG51bGwgKSB7XG5cblx0XHRcdFx0XHQvLyBmIHZlcnRleC91diB2ZXJ0ZXgvdXYgdmVydGV4L3V2XG5cdFx0XHRcdFx0Ly8gMCAgICAgICAgICAgICAgICAgIDEgICAgMiAgICAzICAgIDQgICAgNSAgICA2ICAgNyAgICAgICAgICA4XG5cdFx0XHRcdFx0Ly8gW1wiZiAxLzEgMi8yIDMvM1wiLCBcIjFcIiwgXCIxXCIsIFwiMlwiLCBcIjJcIiwgXCIzXCIsIFwiM1wiLCB1bmRlZmluZWQsIHVuZGVmaW5lZF1cblxuXHRcdFx0XHRcdHN0YXRlLmFkZEZhY2UoXG5cdFx0XHRcdFx0XHRyZXN1bHRbIDEgXSwgcmVzdWx0WyAzIF0sIHJlc3VsdFsgNSBdLCByZXN1bHRbIDcgXSxcblx0XHRcdFx0XHRcdHJlc3VsdFsgMiBdLCByZXN1bHRbIDQgXSwgcmVzdWx0WyA2IF0sIHJlc3VsdFsgOCBdXG5cdFx0XHRcdFx0KTtcblxuXHRcdFx0XHR9IGVsc2UgaWYgKCAoIHJlc3VsdCA9IHRoaXMucmVnZXhwLmZhY2VfdmVydGV4X25vcm1hbC5leGVjKCBsaW5lICkgKSAhPT0gbnVsbCApIHtcblxuXHRcdFx0XHRcdC8vIGYgdmVydGV4Ly9ub3JtYWwgdmVydGV4Ly9ub3JtYWwgdmVydGV4Ly9ub3JtYWxcblx0XHRcdFx0XHQvLyAwICAgICAgICAgICAgICAgICAgICAgMSAgICAyICAgIDMgICAgNCAgICA1ICAgIDYgICA3ICAgICAgICAgIDhcblx0XHRcdFx0XHQvLyBbXCJmIDEvLzEgMi8vMiAzLy8zXCIsIFwiMVwiLCBcIjFcIiwgXCIyXCIsIFwiMlwiLCBcIjNcIiwgXCIzXCIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkXVxuXG5cdFx0XHRcdFx0c3RhdGUuYWRkRmFjZShcblx0XHRcdFx0XHRcdHJlc3VsdFsgMSBdLCByZXN1bHRbIDMgXSwgcmVzdWx0WyA1IF0sIHJlc3VsdFsgNyBdLFxuXHRcdFx0XHRcdFx0dW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLFxuXHRcdFx0XHRcdFx0cmVzdWx0WyAyIF0sIHJlc3VsdFsgNCBdLCByZXN1bHRbIDYgXSwgcmVzdWx0WyA4IF1cblx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdH0gZWxzZSBpZiAoICggcmVzdWx0ID0gdGhpcy5yZWdleHAuZmFjZV92ZXJ0ZXguZXhlYyggbGluZSApICkgIT09IG51bGwgKSB7XG5cblx0XHRcdFx0XHQvLyBmIHZlcnRleCB2ZXJ0ZXggdmVydGV4XG5cdFx0XHRcdFx0Ly8gMCAgICAgICAgICAgIDEgICAgMiAgICAzICAgNFxuXHRcdFx0XHRcdC8vIFtcImYgMSAyIDNcIiwgXCIxXCIsIFwiMlwiLCBcIjNcIiwgdW5kZWZpbmVkXVxuXG5cdFx0XHRcdFx0c3RhdGUuYWRkRmFjZShcblx0XHRcdFx0XHRcdHJlc3VsdFsgMSBdLCByZXN1bHRbIDIgXSwgcmVzdWx0WyAzIF0sIHJlc3VsdFsgNCBdXG5cdFx0XHRcdFx0KTtcblxuXHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCBcIlVuZXhwZWN0ZWQgZmFjZSBsaW5lOiAnXCIgKyBsaW5lICArIFwiJ1wiICk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9IGVsc2UgaWYgKCBsaW5lRmlyc3RDaGFyID09PSBcImxcIiApIHtcblxuXHRcdFx0XHR2YXIgbGluZVBhcnRzID0gbGluZS5zdWJzdHJpbmcoIDEgKS50cmltKCkuc3BsaXQoIFwiIFwiICk7XG5cdFx0XHRcdHZhciBsaW5lVmVydGljZXMgPSBbXSwgbGluZVVWcyA9IFtdO1xuXG5cdFx0XHRcdGlmICggbGluZS5pbmRleE9mKCBcIi9cIiApID09PSAtIDEgKSB7XG5cblx0XHRcdFx0XHRsaW5lVmVydGljZXMgPSBsaW5lUGFydHM7XG5cblx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdGZvciAoIHZhciBsaSA9IDAsIGxsZW4gPSBsaW5lUGFydHMubGVuZ3RoOyBsaSA8IGxsZW47IGxpICsrICkge1xuXG5cdFx0XHRcdFx0XHR2YXIgcGFydHMgPSBsaW5lUGFydHNbIGxpIF0uc3BsaXQoIFwiL1wiICk7XG5cblx0XHRcdFx0XHRcdGlmICggcGFydHNbIDAgXSAhPT0gXCJcIiApIGxpbmVWZXJ0aWNlcy5wdXNoKCBwYXJ0c1sgMCBdICk7XG5cdFx0XHRcdFx0XHRpZiAoIHBhcnRzWyAxIF0gIT09IFwiXCIgKSBsaW5lVVZzLnB1c2goIHBhcnRzWyAxIF0gKTtcblxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9XG5cdFx0XHRcdHN0YXRlLmFkZExpbmVHZW9tZXRyeSggbGluZVZlcnRpY2VzLCBsaW5lVVZzICk7XG5cblx0XHRcdH0gZWxzZSBpZiAoICggcmVzdWx0ID0gdGhpcy5yZWdleHAub2JqZWN0X3BhdHRlcm4uZXhlYyggbGluZSApICkgIT09IG51bGwgKSB7XG5cblx0XHRcdFx0Ly8gbyBvYmplY3RfbmFtZVxuXHRcdFx0XHQvLyBvclxuXHRcdFx0XHQvLyBnIGdyb3VwX25hbWVcblxuXHRcdFx0XHR2YXIgbmFtZSA9IHJlc3VsdFsgMCBdLnN1YnN0ciggMSApLnRyaW0oKTtcblx0XHRcdFx0c3RhdGUuc3RhcnRPYmplY3QoIG5hbWUgKTtcblxuXHRcdFx0fSBlbHNlIGlmICggdGhpcy5yZWdleHAubWF0ZXJpYWxfdXNlX3BhdHRlcm4udGVzdCggbGluZSApICkge1xuXG5cdFx0XHRcdC8vIG1hdGVyaWFsXG5cblx0XHRcdFx0c3RhdGUub2JqZWN0LnN0YXJ0TWF0ZXJpYWwoIGxpbmUuc3Vic3RyaW5nKCA3ICkudHJpbSgpLCBzdGF0ZS5tYXRlcmlhbExpYnJhcmllcyApO1xuXG5cdFx0XHR9IGVsc2UgaWYgKCB0aGlzLnJlZ2V4cC5tYXRlcmlhbF9saWJyYXJ5X3BhdHRlcm4udGVzdCggbGluZSApICkge1xuXG5cdFx0XHRcdC8vIG10bCBmaWxlXG5cblx0XHRcdFx0c3RhdGUubWF0ZXJpYWxMaWJyYXJpZXMucHVzaCggbGluZS5zdWJzdHJpbmcoIDcgKS50cmltKCkgKTtcblxuXHRcdFx0fSBlbHNlIGlmICggKCByZXN1bHQgPSB0aGlzLnJlZ2V4cC5zbW9vdGhpbmdfcGF0dGVybi5leGVjKCBsaW5lICkgKSAhPT0gbnVsbCApIHtcblxuXHRcdFx0XHQvLyBzbW9vdGggc2hhZGluZ1xuXG5cdFx0XHRcdC8vIEB0b2RvIEhhbmRsZSBmaWxlcyB0aGF0IGhhdmUgdmFyeWluZyBzbW9vdGggdmFsdWVzIGZvciBhIHNldCBvZiBmYWNlcyBpbnNpZGUgb25lIGdlb21ldHJ5LFxuXHRcdFx0XHQvLyBidXQgZG9lcyBub3QgZGVmaW5lIGEgdXNlbXRsIGZvciBlYWNoIGZhY2Ugc2V0LlxuXHRcdFx0XHQvLyBUaGlzIHNob3VsZCBiZSBkZXRlY3RlZCBhbmQgYSBkdW1teSBtYXRlcmlhbCBjcmVhdGVkIChsYXRlciBNdWx0aU1hdGVyaWFsIGFuZCBnZW9tZXRyeSBncm91cHMpLlxuXHRcdFx0XHQvLyBUaGlzIHJlcXVpcmVzIHNvbWUgY2FyZSB0byBub3QgY3JlYXRlIGV4dHJhIG1hdGVyaWFsIG9uIGVhY2ggc21vb3RoIHZhbHVlIGZvciBcIm5vcm1hbFwiIG9iaiBmaWxlcy5cblx0XHRcdFx0Ly8gd2hlcmUgZXhwbGljaXQgdXNlbXRsIGRlZmluZXMgZ2VvbWV0cnkgZ3JvdXBzLlxuXHRcdFx0XHQvLyBFeGFtcGxlIGFzc2V0OiBleGFtcGxlcy9tb2RlbHMvb2JqL2NlcmJlcnVzL0NlcmJlcnVzLm9ialxuXG5cdFx0XHRcdHZhciB2YWx1ZSA9IHJlc3VsdFsgMSBdLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRzdGF0ZS5vYmplY3Quc21vb3RoID0gKCB2YWx1ZSA9PT0gJzEnIHx8IHZhbHVlID09PSAnb24nICk7XG5cblx0XHRcdFx0dmFyIG1hdGVyaWFsID0gc3RhdGUub2JqZWN0LmN1cnJlbnRNYXRlcmlhbCgpO1xuXHRcdFx0XHRpZiAoIG1hdGVyaWFsICkge1xuXG5cdFx0XHRcdFx0bWF0ZXJpYWwuc21vb3RoID0gc3RhdGUub2JqZWN0LnNtb290aDtcblxuXHRcdFx0XHR9XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0Ly8gSGFuZGxlIG51bGwgdGVybWluYXRlZCBmaWxlcyB3aXRob3V0IGV4Y2VwdGlvblxuXHRcdFx0XHRpZiAoIGxpbmUgPT09ICdcXDAnICkgY29udGludWU7XG5cblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCBcIlVuZXhwZWN0ZWQgbGluZTogJ1wiICsgbGluZSAgKyBcIidcIiApO1xuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHRzdGF0ZS5maW5hbGl6ZSgpO1xuXG5cdFx0dmFyIGNvbnRhaW5lciA9IG5ldyBUSFJFRS5Hcm91cCgpO1xuXHRcdGNvbnRhaW5lci5tYXRlcmlhbExpYnJhcmllcyA9IFtdLmNvbmNhdCggc3RhdGUubWF0ZXJpYWxMaWJyYXJpZXMgKTtcblxuXHRcdGZvciAoIHZhciBpID0gMCwgbCA9IHN0YXRlLm9iamVjdHMubGVuZ3RoOyBpIDwgbDsgaSArKyApIHtcblxuXHRcdFx0dmFyIG9iamVjdCA9IHN0YXRlLm9iamVjdHNbIGkgXTtcblx0XHRcdHZhciBnZW9tZXRyeSA9IG9iamVjdC5nZW9tZXRyeTtcblx0XHRcdHZhciBtYXRlcmlhbHMgPSBvYmplY3QubWF0ZXJpYWxzO1xuXHRcdFx0dmFyIGlzTGluZSA9ICggZ2VvbWV0cnkudHlwZSA9PT0gJ0xpbmUnICk7XG5cblx0XHRcdC8vIFNraXAgby9nIGxpbmUgZGVjbGFyYXRpb25zIHRoYXQgZGlkIG5vdCBmb2xsb3cgd2l0aCBhbnkgZmFjZXNcblx0XHRcdGlmICggZ2VvbWV0cnkudmVydGljZXMubGVuZ3RoID09PSAwICkgY29udGludWU7XG5cblx0XHRcdHZhciBidWZmZXJnZW9tZXRyeSA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xuXG5cdFx0XHRidWZmZXJnZW9tZXRyeS5hZGRBdHRyaWJ1dGUoICdwb3NpdGlvbicsIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUoIG5ldyBGbG9hdDMyQXJyYXkoIGdlb21ldHJ5LnZlcnRpY2VzICksIDMgKSApO1xuXG5cdFx0XHRpZiAoIGdlb21ldHJ5Lm5vcm1hbHMubGVuZ3RoID4gMCApIHtcblxuXHRcdFx0XHRidWZmZXJnZW9tZXRyeS5hZGRBdHRyaWJ1dGUoICdub3JtYWwnLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKCBuZXcgRmxvYXQzMkFycmF5KCBnZW9tZXRyeS5ub3JtYWxzICksIDMgKSApO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdGJ1ZmZlcmdlb21ldHJ5LmNvbXB1dGVWZXJ0ZXhOb3JtYWxzKCk7XG5cblx0XHRcdH1cblxuXHRcdFx0aWYgKCBnZW9tZXRyeS51dnMubGVuZ3RoID4gMCApIHtcblxuXHRcdFx0XHRidWZmZXJnZW9tZXRyeS5hZGRBdHRyaWJ1dGUoICd1dicsIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUoIG5ldyBGbG9hdDMyQXJyYXkoIGdlb21ldHJ5LnV2cyApLCAyICkgKTtcblxuXHRcdFx0fVxuXG5cdFx0XHQvLyBDcmVhdGUgbWF0ZXJpYWxzXG5cblx0XHRcdHZhciBjcmVhdGVkTWF0ZXJpYWxzID0gW107XG5cblx0XHRcdGZvciAoIHZhciBtaSA9IDAsIG1pTGVuID0gbWF0ZXJpYWxzLmxlbmd0aDsgbWkgPCBtaUxlbiA7IG1pKysgKSB7XG5cblx0XHRcdFx0dmFyIHNvdXJjZU1hdGVyaWFsID0gbWF0ZXJpYWxzW21pXTtcblx0XHRcdFx0dmFyIG1hdGVyaWFsID0gdW5kZWZpbmVkO1xuXG5cdFx0XHRcdGlmICggdGhpcy5tYXRlcmlhbHMgIT09IG51bGwgKSB7XG5cblx0XHRcdFx0XHRtYXRlcmlhbCA9IHRoaXMubWF0ZXJpYWxzLmNyZWF0ZSggc291cmNlTWF0ZXJpYWwubmFtZSApO1xuXG5cdFx0XHRcdFx0Ly8gbXRsIGV0Yy4gbG9hZGVycyBwcm9iYWJseSBjYW4ndCBjcmVhdGUgbGluZSBtYXRlcmlhbHMgY29ycmVjdGx5LCBjb3B5IHByb3BlcnRpZXMgdG8gYSBsaW5lIG1hdGVyaWFsLlxuXHRcdFx0XHRcdGlmICggaXNMaW5lICYmIG1hdGVyaWFsICYmICEgKCBtYXRlcmlhbCBpbnN0YW5jZW9mIFRIUkVFLkxpbmVCYXNpY01hdGVyaWFsICkgKSB7XG5cblx0XHRcdFx0XHRcdHZhciBtYXRlcmlhbExpbmUgPSBuZXcgVEhSRUUuTGluZUJhc2ljTWF0ZXJpYWwoKTtcblx0XHRcdFx0XHRcdG1hdGVyaWFsTGluZS5jb3B5KCBtYXRlcmlhbCApO1xuXHRcdFx0XHRcdFx0bWF0ZXJpYWwgPSBtYXRlcmlhbExpbmU7XG5cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICggISBtYXRlcmlhbCApIHtcblxuXHRcdFx0XHRcdG1hdGVyaWFsID0gKCAhIGlzTGluZSA/IG5ldyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCgpIDogbmV3IFRIUkVFLkxpbmVCYXNpY01hdGVyaWFsKCkgKTtcblx0XHRcdFx0XHRtYXRlcmlhbC5uYW1lID0gc291cmNlTWF0ZXJpYWwubmFtZTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0bWF0ZXJpYWwuc2hhZGluZyA9IHNvdXJjZU1hdGVyaWFsLnNtb290aCA/IFRIUkVFLlNtb290aFNoYWRpbmcgOiBUSFJFRS5GbGF0U2hhZGluZztcblxuXHRcdFx0XHRjcmVhdGVkTWF0ZXJpYWxzLnB1c2gobWF0ZXJpYWwpO1xuXG5cdFx0XHR9XG5cblx0XHRcdC8vIENyZWF0ZSBtZXNoXG5cblx0XHRcdHZhciBtZXNoO1xuXG5cdFx0XHRpZiAoIGNyZWF0ZWRNYXRlcmlhbHMubGVuZ3RoID4gMSApIHtcblxuXHRcdFx0XHRmb3IgKCB2YXIgbWkgPSAwLCBtaUxlbiA9IG1hdGVyaWFscy5sZW5ndGg7IG1pIDwgbWlMZW4gOyBtaSsrICkge1xuXG5cdFx0XHRcdFx0dmFyIHNvdXJjZU1hdGVyaWFsID0gbWF0ZXJpYWxzW21pXTtcblx0XHRcdFx0XHRidWZmZXJnZW9tZXRyeS5hZGRHcm91cCggc291cmNlTWF0ZXJpYWwuZ3JvdXBTdGFydCwgc291cmNlTWF0ZXJpYWwuZ3JvdXBDb3VudCwgbWkgKTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIG11bHRpTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTXVsdGlNYXRlcmlhbCggY3JlYXRlZE1hdGVyaWFscyApO1xuXHRcdFx0XHRtZXNoID0gKCAhIGlzTGluZSA/IG5ldyBUSFJFRS5NZXNoKCBidWZmZXJnZW9tZXRyeSwgbXVsdGlNYXRlcmlhbCApIDogbmV3IFRIUkVFLkxpbmVTZWdtZW50cyggYnVmZmVyZ2VvbWV0cnksIG11bHRpTWF0ZXJpYWwgKSApO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdG1lc2ggPSAoICEgaXNMaW5lID8gbmV3IFRIUkVFLk1lc2goIGJ1ZmZlcmdlb21ldHJ5LCBjcmVhdGVkTWF0ZXJpYWxzWyAwIF0gKSA6IG5ldyBUSFJFRS5MaW5lU2VnbWVudHMoIGJ1ZmZlcmdlb21ldHJ5LCBjcmVhdGVkTWF0ZXJpYWxzWyAwIF0gKSApO1xuXHRcdFx0fVxuXG5cdFx0XHRtZXNoLm5hbWUgPSBvYmplY3QubmFtZTtcblxuXHRcdFx0Y29udGFpbmVyLmFkZCggbWVzaCApO1xuXG5cdFx0fVxuXG5cdFx0Y29uc29sZS50aW1lRW5kKCAnT0JKTG9hZGVyJyApO1xuXG5cdFx0cmV0dXJuIGNvbnRhaW5lcjtcblxuXHR9XG5cbn07XG5cbn0pLmNhbGwoZ2xvYmFsLCBtb2R1bGUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkKTtcbiJdfQ==
