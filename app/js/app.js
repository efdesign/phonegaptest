var App = angular.module('sei', [
    //'ngRoute',
    //'ngAnimate',
    //'ngStorage',
    //'ngCookies',
    //'pascalprecht.translate',
    //'ui.bootstrap',
    'ui.router',
    'oc.lazyLoad',
    //'lumx',
    'ngMaterial',
    //'ezfb'
    //'cfp.loadingBar',
    //'ngSanitize',
    //'ngResource',
    //'tmh.dynamicLocale',
    //'ui.utils',
    //'ngLocale',
    //'core.widgets'
    //'sei.alert'
]);








App.run(['$state', '$timeout', function run($state,$timeout) { // $rootScope, $state, $stateParams, $window, $templateCache
    'use strict';
    console.log('angular is running');
    $state.go('app.main');

    // do init here...simulate...
    // simulate initialization...then
   // $timeout(function(){
   //     $state.go('app.home');
    //},3000);
}]);

if (typeof $ === 'undefined') {
    throw new Error('This application\'s JavaScript requires jQuery');
}




// or angular.element(document).ready...
$(document).ready(function() {
    'use strict';
    /*
    var API_INTERCEPTOR_CONFIG_PATH = 'server/cu-proxy-interceptor/APIInterceptorConfig.json';

    $.getJSON(API_INTERCEPTOR_CONFIG_PATH)
    .done(function(success) {
        App.CU_APP_CONFIG = success;
        console.log('injected the config in angular via jquery prior to bootstrapping...', success);
        angular.bootstrap(document, ['sei']);
    })
    .fail(function() {
        App.CU_APP_CONFIG = {
            APIEnabled: false,
            routes: []
        };
    })
    .always(function() {
        console.log('app config not found, using defaults...');*/
        console.log('about to bootstrap...');
        angular.bootstrap(document, ['sei']);
    /*});*/


});
'use strict';
angular.module("ngLocale", [], ["$provide", function($provide) {
var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
function getDecimals(n) {
  n = n + '';
  var i = n.indexOf('.');
  return (i == -1) ? 0 : n.length - i - 1;
}

function getVF(n, opt_precision) {
  var v = opt_precision;

  if (undefined === v) {
    v = Math.min(getDecimals(n), 3);
  }

  var base = Math.pow(10, v);
  var f = ((n * base) | 0) % base;
  return {v: v, f: f};
}

$provide.value("$locale", {
  "DATETIME_FORMATS": {
    "AMPMS": [
      "AM",
      "PM"
    ],
    "DAY": [
      "domenica",
      "luned\u00ec",
      "marted\u00ec",
      "mercoled\u00ec",
      "gioved\u00ec",
      "venerd\u00ec",
      "sabato"
    ],
    "MONTH": [
      "gennaio",
      "febbraio",
      "marzo",
      "aprile",
      "maggio",
      "giugno",
      "luglio",
      "agosto",
      "settembre",
      "ottobre",
      "novembre",
      "dicembre"
    ],
    "SHORTDAY": [
      "dom",
      "lun",
      "mar",
      "mer",
      "gio",
      "ven",
      "sab"
    ],
    "SHORTMONTH": [
      "gen",
      "feb",
      "mar",
      "apr",
      "mag",
      "giu",
      "lug",
      "ago",
      "set",
      "ott",
      "nov",
      "dic"
    ],
    "fullDate": "EEEE d MMMM y",
    "longDate": "d MMMM y",
    "medium": "dd MMM y HH:mm:ss",
    "mediumDate": "dd/MM/yyyy",
    "mediumTime": "HH:mm:ss",
    "short": "dd/MM/yy HH:mm",
    "shortDate": "dd/MM/yy",
    "shortTime": "HH:mm"
  },
  "NUMBER_FORMATS": {
    "CURRENCY_SYM": "\u20ac",
    "DECIMAL_SEP": ",",
    "GROUP_SEP": ".",
    "PATTERNS": [
      {
        "gSize": 3,
        "lgSize": 3,
        "maxFrac": 3,
        "minFrac": 0,
        "minInt": 1,
        "negPre": "-",
        "negSuf": "",
        "posPre": "",
        "posSuf": ""
      },
      {
        "gSize": 3,
        "lgSize": 3,
        "maxFrac": 2,
        "minFrac": 2,
        "minInt": 1,
        "negPre": "-",
        "negSuf": "\u00a0\u00a4",
        "posPre": "",
        "posSuf": "\u00a0\u00a4"
      }
    ]
  },
  "id": "it",
  "pluralCat": function(n, opt_precision) {  var i = n | 0;  var vf = getVF(n, opt_precision);  if (i == 1 && vf.v == 0) {    return PLURAL_CATEGORY.ONE;  }  return PLURAL_CATEGORY.OTHER;}
});
}]);

/**
 *
 * baseRouting configuration expressed as a core config block
 */

App.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider',
function baseRoutingConfig($stateProvider, $locationProvider, $urlRouterProvider, helper) {
  'use strict';

  // Set the following to true to enable the HTML5 Mode
  // You may have to set <base> tag in index and a routing configuration in your server
  $locationProvider.html5Mode(false);

  // defaults to dashboard
  $urlRouterProvider.otherwise('/app/welcome');




  //
  // Application Routes
  // -----------------------------------
  $stateProvider
    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: helper.basepath('app.html'),
        controller: 'AppController',
        resolve: helper.resolveFor(
            'fastclick',    // Polyfill to remove click delays on browsers with touch UIs
            'modernizr'
            //'moment'
          )
    })

    .state('app.main',{
        url:'/main',
        controller:'AppController',
        templateUrl: helper.basepath('mealshare/main.html')

    })


   


}])

/**
 *
 * holds the baseRouting configuration
 */
    .config(['$ocLazyLoadProvider', 'APP_REQUIRES', function lazyLoadConfig($ocLazyLoadProvider, APP_REQUIRES) {
        'use strict';

        // Lazy Load modules configuration
        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
            modules: APP_REQUIRES.modules
        });

    }])

.config(['$mdThemingProvider', function($mdThemingProvider) {
    'use strict';
  $mdThemingProvider.theme('default')
    .primaryPalette('pink')
    .accentPalette('orange');
}])

/**
 * holds the app wide configuration block to hold references to register functions (to help lazy loading and post config service registration)
 */
    .config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
        function providerHandlersConfig($controllerProvider, $compileProvider, $filterProvider, $provide) {
            'use strict';
            // registering components after bootstrap
            App.controller = $controllerProvider.register;
            App.directive = $compileProvider.directive;
            App.filter = $filterProvider.register;
            App.factory = $provide.factory;
            App.service = $provide.service;
            App.constant = $provide.constant;
            App.value = $provide.value;

        }])

;

App.constant('APP_REQUIRES', {
    // jQuery based and standalone scripts
    scripts: {
        'fastclick': ['vendor/fastclick/lib/fastclick.js'],
        'modernizr': ['vendor/modernizr/modernizr.js'],
        'moment': ['vendor/moment/min/moment-with-locales.min.js',
            //'vendor/moment-timezone/builds/moment-timezone-with-data.min.js'
        ]
    },
    // Angular based script (use the right module name)
    modules: []
});

/**=========================================================
 * Module: browser.js
 * Browser detection
 =========================================================*/

App.service('browser', function(){
  "use strict";

  var matched, browser;

  var uaMatch = function( ua ) {
    ua = ua.toLowerCase();

    var match = /(opr)[\/]([\w.]+)/.exec( ua ) ||
      /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
      /(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec( ua ) ||
      /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
      /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
      /(msie) ([\w.]+)/.exec( ua ) ||
      ua.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec( ua ) ||
      ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
      [];

    var platform_match = /(ipad)/.exec( ua ) ||
      /(iphone)/.exec( ua ) ||
      /(android)/.exec( ua ) ||
      /(windows phone)/.exec( ua ) ||
      /(win)/.exec( ua ) ||
      /(mac)/.exec( ua ) ||
      /(linux)/.exec( ua ) ||
      /(cros)/i.exec( ua ) ||
      [];

    return {
      browser: match[ 3 ] || match[ 1 ] || "",
      version: match[ 2 ] || "0",
      platform: platform_match[ 0 ] || ""
    };
  };

  matched = uaMatch( window.navigator.userAgent );
  browser = {};

  if ( matched.browser ) {
    browser[ matched.browser ] = true;
    browser.version = matched.version;
    browser.versionNumber = parseInt(matched.version);
  }

  if ( matched.platform ) {
    browser[ matched.platform ] = true;
  }

  // These are all considered mobile platforms, meaning they run a mobile browser
  if ( browser.android || browser.ipad || browser.iphone || browser[ "windows phone" ] ) {
    browser.mobile = true;
  }

  // These are all considered desktop platforms, meaning they run a desktop browser
  if ( browser.cros || browser.mac || browser.linux || browser.win ) {
    browser.desktop = true;
  }

  // Chrome, Opera 15+ and Safari are webkit based browsers
  if ( browser.chrome || browser.opr || browser.safari ) {
    browser.webkit = true;
  }

  // IE11 has a new token so we will assign it msie to avoid breaking changes
  if ( browser.rv )
  {
    var ie = "msie";

    matched.browser = ie;
    browser[ie] = true;
  }

  // Opera 15+ are identified as opr
  if ( browser.opr )
  {
    var opera = "opera";

    matched.browser = opera;
    browser[opera] = true;
  }

  // Stock Android browsers are marked as Safari on Android.
  if ( browser.safari && browser.android )
  {
    var android = "android";

    matched.browser = android;
    browser[android] = true;
  }

  // Assign the name and platform variable
  browser.name = matched.browser;
  browser.platform = matched.platform;


  return browser;

});
/**=========================================================
 * Module: helpers.js
 * Provides helper functions for routes definition
 =========================================================*/

App.provider('RouteHelpers', ['APP_REQUIRES', function(appRequires) {
    'use strict';

    // Set here the base of the relative path
    // for all app views
    this.basepath = function(uri) {
        return 'app/views/' + uri;
    };

    // Generates a resolve object by passing script names
    // previously configured in constant.APP_REQUIRES
    this.resolveFor = function() {
        var _args = arguments;
        return {
            deps: ['$ocLazyLoad', '$q', function($ocLL, $q) {
                // Creates a promise chain for each argument
                var promise = $q.when(1); // empty promise
                for (var i = 0, len = _args.length; i < len; i++) {
                    promise = andThen(_args[i]);
                }
                return promise;

                // creates promise to chain dynamically
                function andThen(_arg) {
                    // also support a function that returns a promise
                    if (typeof _arg === 'function') {
                        return promise.then(_arg);
                    } else {
                        return promise.then(function() {
                            // if is a module, pass the name. If not, pass the array
                            var whatToLoad = getRequired(_arg);
                            // simple error check
                            if (!whatToLoad) {
                                return $.error('Route resolve: Bad resource name [' + _arg + ']');
                            }
                            // finally, return a promise
                            return $ocLL.load(whatToLoad);
                        });
                    }
                }
                // check and returns required data
                // analyze module items with the form [name: '', files: []]
                // and also simple array of script files (for not angular js)
                function getRequired(name) {
                    if (appRequires.modules) {
                        for (var m in appRequires.modules) {
                            if (appRequires.modules[m].name && appRequires.modules[m].name === name) {
                                {
                                    return appRequires.modules[m];
                                }
                            }
                        }
                    }
                    return appRequires.scripts && appRequires.scripts[name];
                }

            }]
        };
    }; // resolveFor

    // not necessary, only used in config block for routes
    this.$get = function() {
        return {
            basepath: this.basepath
        };
    };

}]);



// App.config();
// 
App.controller('AppController', ['$scope', '$rootScope', '$mdSidenav', '$mdToast', function($scope, $rootScope, $mdSidenav, $mdToast) {
    'use strict';

    // simple toast strings
    var TOAST = {
        NO_ELEMENTS_TO_REMOVE: 'Non ci sono elementi da rimuovere!',
    }


    $rootScope.$on('$stateChangeSuccess', function() {

        var sn = $mdSidenav('.left');
        console.log('changing', sn);
        if (sn.isOpen()) {

            sn.toggle(); // close this...
        }
    });

    // PLACES (geolocation, history etc)
    /*var places = [
        {name:'feronia'},
        {name:'cambusa'},
        {name:'trittico'},
        {name:'forno'},

    ];*/

    var friends = [{
        name: ' Default',
        gender: 'him',
        portrait: 'app/img/generic2.png'
    }, {
        name: 'mario',
        gender: 'him',
        portrait: 'app/img/mario.jpg'
    }, {
        name: 'laura',
        gender: 'her',
        portrait: 'app/img/laura.jpeg'
    }, {
        name: 'enrico',
        gender: 'him',
        portrait: 'app/img/enrico2.jpg'
    },
    {
        name: 'ferdinando',
        gender: 'him',
        portrait: 'app/img/ferdinando.jpg'
    },
    {
        name: 'giordano',
        gender: 'him',
        portrait: 'app/img/giordano.jpg'
    },
    {
        name: 'walter',
        gender: 'him',
        portrait: 'app/img/walter.jpg'
    },
    {
        name: 'roberto',
        gender: 'him',
        portrait: 'app/img/roberto.jpg'
    },
    {
        name: 'rosario',
        gender: 'him',
        portrait: 'app/img/rosario.jpg'
    },
    {
        name: 'fabio',
        gender: 'him',
        portrait: 'app/img/fabio.jpg'
    }, {
        name: 'paola',
        gender: 'her',
        portrait: 'app/img/paola.jpg'
    },{
        name: 'alessia',
        gender: 'her',
        portrait: 'app/img/alessia.png'
    },{
        name: 'serena',
        gender: 'her',
        portrait: 'app/img/serena.jpg'
    }];

    var items = [{
            name: 'cornetto'
        }, // 0
        {
            name: 'cappuccino'
        }, // 1
        {
            name: 'caffè'
        }, // 2
        {
            name: 'acqua'
        }, // 3
        {
            name: 'succo di frutta'
        } // 4

    ];



    var addedItems = [
        items[2], // caffè

        items[1], // cappuccino
        items[0], // cornetto
        
    ];

    // compact view ?
    var compact = false;
    var orderDetailsShown = true;

    var emptyItem = {
            name: ''
        };

    // all friend's orders
    var allFriends = [];





    /*var groups = [
        {
            name:'Consulenti IAD',
            friends:[friends[0],friends[1]],
            place:places[1]
        },
        {   name:'Team CU',
            friends:friends,
            place:places[0]
        }
    ];*/

    var current = friends[0]; // default friend



    // ddo, data + api
    $scope.app = {
        // user preferences and user pref api
        hints: {
            fastMode: true,
            hideHint: function(key) {
                $scope.app.hints[key] = false;
            }
        },
        // DATA (mock)
        name: 'Order IT!',
        logo: 'app/img/yummly.png',
        welcomeImage: 'app/img/mealshare.svg',
        //version:'0.0.1',
        title: 'MealShare!',
        friends: friends,
        //friendsOnMap: friends,
        //place:{
        //  name:'Er Paninaro'
        //},
        // reference to me
        me: friends[3],
        //default:{
        //  friend:{
        //      portrait:friends[0].portrait
        //  },
        //},
        //invite:{
        //  friend:friends[0],
        //  meal:'colazione',
        //},
        //groups:groups,
        items: items,
        //addedItems:addedItems,
        order: addedItems,
        // APIs
        //login:{
        //  credentialsLogin:credentialsLogin,
        //  facebookLogin:facebookLogin,
        //  recover:recover
        //},
        increment: increment,
        decrement: decrement,
        orderedItems: orderedItems,
        //checkIn:checkIn,
        //openLeftMenu:openLeftMenu,
        //group:{
        //    join:join,
        //    joined:joined
        //},
        current: current,
        setCurrent: setCurrent,
        getCurrent: getCurrent,
        compact: compact,
        // interface utility apis
        toggleCompact:toggleCompact,
        clearOrders:clearOrders,
        addOrderItem:addOrderItem,
        getAllFriends:getAllFriends,
        toggleOrderDetails:toggleOrderDetails

            // Generic api
            //navigate:navigate 
    };

    // API
    // login
    /*function credentialsLogin(){
        console.log('credentialsLogin');
    }

    function facebookLogin(){
        console.log('facebookLogin');
    }

    function recover(){
        console.log('recover');
    }
    // places / geo
    function checkIn(){
        console.log('checkIn');
        $state.go('app.map');
    }*/
    // added items
    function increment(item) {
        // this should not be here...
        if (!item.friends) {
            item.friends = [];
        }
        item.friends.push(current);

        allFriends = calculateAllFriendOrders();
    }

    function decrement(item) {
        if (!item.friends) {
            item.friends = [];
            showToast(TOAST.NO_ELEMENTS_TO_REMOVE);
        } else {
            var idx = item.friends.indexOf(current);
            if (idx !== -1) {
                // remove only on index found
                item.friends.splice(idx, 1);
            } else {
                showToast(current.name + ' non ha ordinato un ' + item.name + ' !!!');
            }
        }

        allFriends = calculateAllFriendOrders();
    }

    function setCurrent(friend) {
        current = friend;
    }

    function getCurrent() {
        //console.log('get current');
        return current;
    }
    /*
    function join(group){
        console.log('join group',group);
    }

    function joined(group,who){
        console.log('joined group who',group,who);
        return group.friends.indexOf(who) > 0 ? true : false;
    }*/

    // control layout
    // function openLeftMenu() {
    //     $mdSidenav('left').open();
    // }

    function showToast(msg) {
        $mdToast.show(
            $mdToast.simple().content(msg).hideDelay(6000)
        );
    }

    function calculateAllFriendOrders(){
        return addedItems.reduce(function(n, y) {
            var cc = y.friends || [];
            return n.concat(cc);
            //return globalArray.concat(y.friends || []);
        }, []);
    }

    function orderedItems(friend) {
        // allFriends = [];
        // can optimize this to just do it on + and -
        // reduce n someArray.friend list to one big list
        

        // filter to find the current one
        return allFriends.filter(function(x) {
            return x === friend;
        }).length;


    }


    function toggleCompact(){
        //console.log('toggleCompact');
        $scope.app.compact = !$scope.app.compact;
    }

    function toggleOrderDetails(){
        //console.log('toggleOrderDetails');
        $scope.app.orderDetailsShown = !$scope.app.orderDetailsShown;
    }

    function clearOrders(){
        angular.forEach(addedItems, function(value){
            value.friends = [];
        });

        allFriends = calculateAllFriendOrders();
    }

    function addOrderItem(){
        addedItems.push(angular.copy(emptyItem));
    }

    function getAllFriends(){
        return allFriends;
    }


    //function navigate(route){
    //    $state.go(route);
    //    $mdSidenav('left').close();
    //}

}])

.filter('capitalize',function(){
    'use strict';
    return function(input){
        return input.charAt(0).toUpperCase() + input.slice(1);
    }
})

.directive('action', function() {
    // Runs during compile
    'use strict';
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        scope: {
            action: '&',
            actionEvent: '@'
        }, // {} = isolate, true = child, false/undefined = no change
        // controller: function($scope, $element, $attrs, $transclude) {},
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        // templateUrl: '',
        // replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: function($scope, iElm) {
            //$log.info($scope.action);
            iElm.on($scope.actionEvent || 'click', $scope.action);
        }
    };
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5pbml0LmpzIiwiYXBwLmJvb3RzdHJhcC5qcyIsImFuZ3VsYXItbG9jYWxlX2l0LmpzIiwiY29uZmlnLmpzIiwiY29uc3RhbnRzLmFuZ2xlLm1kLmpzIiwic2VydmljZXMvYnJvd3Nlci5hbmdsZS5tZC5qcyIsInNlcnZpY2VzL3JvdXRlLWhlbHBlcnMuYW5nbGUuanMiLCJjb21wb25lbnRzL2ZhY2Vib29rL2ZhY2Vib29rLmNvbmZpZy5qcyIsImNvbXBvbmVudHMvZmFjZWJvb2svZmFjZWJvb2suc2VydmljZS5qcyIsInVuaXRzL21lYWxzaGFyZS9tZWFsc2hhcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBSSxNQUFNLFFBQVEsT0FBTyxPQUFPOzs7Ozs7O0lBTzVCO0lBQ0E7O0lBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQkosSUFBSSwyQkFBSSxTQUFTLElBQUksT0FBTyxVQUFVO0lBQ2xDO0lBQ0EsUUFBUSxJQUFJO0lBQ1osT0FBTyxHQUFHOzs7Ozs7OztBQVFkO0FDeENBLElBQUksT0FBTyxNQUFNLGFBQWE7SUFDMUIsTUFBTSxJQUFJLE1BQU07Ozs7Ozs7QUFPcEIsRUFBRSxVQUFVLE1BQU0sV0FBVztJQUN6Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBa0JJLFFBQVEsSUFBSTtRQUNaLFFBQVEsVUFBVSxVQUFVLENBQUM7Ozs7R0FJbEM7QUNoQ0g7QUFDQSxRQUFRLE9BQU8sWUFBWSxJQUFJLENBQUMsWUFBWSxTQUFTLFVBQVU7QUFDL0QsSUFBSSxrQkFBa0IsQ0FBQyxNQUFNLFFBQVEsS0FBSyxPQUFPLEtBQUssT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLE9BQU87QUFDOUYsU0FBUyxZQUFZLEdBQUc7RUFDdEIsSUFBSSxJQUFJO0VBQ1IsSUFBSSxJQUFJLEVBQUUsUUFBUTtFQUNsQixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFLFNBQVMsSUFBSTs7O0FBR3hDLFNBQVMsTUFBTSxHQUFHLGVBQWU7RUFD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QU87Ozs7QUFJMUQiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEFwcCA9IGFuZ3VsYXIubW9kdWxlKCdzZWknLCBbXG4gICAgLy8nbmdSb3V0ZScsXG4gICAgLy8nbmdBbmltYXRlJyxcbiAgICAvLyduZ1N0b3JhZ2UnLFxuICAgIC8vJ25nQ29va2llcycsXG4gICAgLy8ncGFzY2FscHJlY2h0LnRyYW5zbGF0ZScsXG4gICAgLy8ndWkuYm9vdHN0cmFwJyxcbiAgICAndWkucm91dGVyJyxcbiAgICAnb2MubGF6eUxvYWQnLFxuICAgIC8vJ2x1bXgnLFxuICAgICduZ01hdGVyaWFsJyxcbiAgICAvLydlemZiJ1xuICAgIC8vJ2NmcC5sb2FkaW5nQmFyJyxcbiAgICAvLyduZ1Nhbml0aXplJyxcbiAgICAvLyduZ1Jlc291cmNlJyxcbiAgICAvLyd0bWguZHluYW1pY0xvY2FsZScsXG4gICAgLy8ndWkudXRpbHMnLFxuICAgIC8vJ25nTG9jYWxlJyxcbiAgICAvLydjb3JlLndpZGdldHMnXG4gICAgLy8nc2VpLmFsZXJ0J1xuXSk7XG5cblxuXG5cblxuXG5cblxuQXBwLnJ1bihmdW5jdGlvbiBydW4oJHN0YXRlLCR0aW1lb3V0KSB7IC8vICRyb290U2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkd2luZG93LCAkdGVtcGxhdGVDYWNoZVxuICAgICd1c2Ugc3RyaWN0JztcbiAgICBjb25zb2xlLmxvZygnYW5ndWxhciBpcyBydW5uaW5nJyk7XG4gICAgJHN0YXRlLmdvKCdhcHAubWFpbicpO1xuXG4gICAgLy8gZG8gaW5pdCBoZXJlLi4uc2ltdWxhdGUuLi5cbiAgICAvLyBzaW11bGF0ZSBpbml0aWFsaXphdGlvbi4uLnRoZW5cbiAgIC8vICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAvLyAgICAgJHN0YXRlLmdvKCdhcHAuaG9tZScpO1xuICAgIC8vfSwzMDAwKTtcbn0pO1xuIiwiaWYgKHR5cGVvZiAkID09PSAndW5kZWZpbmVkJykge1xuICAgIHRocm93IG5ldyBFcnJvcignVGhpcyBhcHBsaWNhdGlvblxcJ3MgSmF2YVNjcmlwdCByZXF1aXJlcyBqUXVlcnknKTtcbn1cblxuXG5cblxuLy8gb3IgYW5ndWxhci5lbGVtZW50KGRvY3VtZW50KS5yZWFkeS4uLlxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIC8qXG4gICAgdmFyIEFQSV9JTlRFUkNFUFRPUl9DT05GSUdfUEFUSCA9ICdzZXJ2ZXIvY3UtcHJveHktaW50ZXJjZXB0b3IvQVBJSW50ZXJjZXB0b3JDb25maWcuanNvbic7XG5cbiAgICAkLmdldEpTT04oQVBJX0lOVEVSQ0VQVE9SX0NPTkZJR19QQVRIKVxuICAgIC5kb25lKGZ1bmN0aW9uKHN1Y2Nlc3MpIHtcbiAgICAgICAgQXBwLkNVX0FQUF9DT05GSUcgPSBzdWNjZXNzO1xuICAgICAgICBjb25zb2xlLmxvZygnaW5qZWN0ZWQgdGhlIGNvbmZpZyBpbiBhbmd1bGFyIHZpYSBqcXVlcnkgcHJpb3IgdG8gYm9vdHN0cmFwcGluZy4uLicsIHN1Y2Nlc3MpO1xuICAgICAgICBhbmd1bGFyLmJvb3RzdHJhcChkb2N1bWVudCwgWydzZWknXSk7XG4gICAgfSlcbiAgICAuZmFpbChmdW5jdGlvbigpIHtcbiAgICAgICAgQXBwLkNVX0FQUF9DT05GSUcgPSB7XG4gICAgICAgICAgICBBUElFbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgIHJvdXRlczogW11cbiAgICAgICAgfTtcbiAgICB9KVxuICAgIC5hbHdheXMoZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdhcHAgY29uZmlnIG5vdCBmb3VuZCwgdXNpbmcgZGVmYXVsdHMuLi4nKTsqL1xuICAgICAgICBjb25zb2xlLmxvZygnYWJvdXQgdG8gYm9vdHN0cmFwLi4uJyk7XG4gICAgICAgIGFuZ3VsYXIuYm9vdHN0cmFwKGRvY3VtZW50LCBbJ3NlaSddKTtcbiAgICAvKn0pOyovXG5cblxufSk7IiwiJ3VzZSBzdHJpY3QnO1xuYW5ndWxhci5tb2R1bGUoXCJuZ0xvY2FsZVwiLCBbXSwgW1wiJHByb3ZpZGVcIiwgZnVuY3Rpb24oJHByb3ZpZGUpIHtcbnZhciBQTFVSQUxfQ0FURUdPUlkgPSB7WkVSTzogXCJ6ZXJvXCIsIE9ORTogXCJvbmVcIiwgVFdPOiBcInR3b1wiLCBGRVc6IFwiZmV3XCIsIE1BTlk6IFwibWFueVwiLCBPVEhFUjogXCJvdGhlclwifTtcbmZ1bmN0aW9uIGdldERlY2ltYWxzKG4pIHtcbiAgbiA9IG4gKyAnJztcbiAgdmFyIGkgPSBuLmluZGV4T2YoJy4nKTtcbiAgcmV0dXJuIChpID09IC0xKSA/IDAgOiBuLmxlbmd0aCAtIGkgLSAxO1xufVxuXG5mdW5jdGlvbiBnZXRWRihuLCBvcHRfcHJlY2lzaW9uKSB7XG4gIHZhciB2ID0gb3B0X3ByZWNpc2lvbjtcblxuICBpZiAodW5kZWZpbmVkID09PSB2KSB7XG4gICAgdiA9IE1hdGgubWluKGdldERlY2ltYWxzKG4pLCAzKTtcbiAgfVxuXG4gIHZhciBiYXNlID0gTWF0aC5wb3coMTAsIHYpO1xuICB2YXIgZiA9ICgobiAqIGJhc2UpIHwgMCkgJSBiYXNlO1xuICByZXR1cm4ge3Y6IHYsIGY6IGZ9O1xufVxuXG4kcHJvdmlkZS52YWx1ZShcIiRsb2NhbGVcIiwge1xuICBcIkRBVEVUSU1FX0ZPUk1BVFNcIjoge1xuICAgIFwiQU1QTVNcIjogW1xuICAgICAgXCJBTVwiLFxuICAgICAgXCJQTVwiXG4gICAgXSxcbiAgICBcIkRBWVwiOiBbXG4gICAgICBcImRvbWVuaWNhXCIsXG4gICAgICBcImx1bmVkXFx1MDBlY1wiLFxuICAgICAgXCJtYXJ0ZWRcXHUwMGVjXCIsXG4gICAgICBcIm1lcmNvbGVkXFx1MDBlY1wiLFxuICAgICAgXCJnaW92ZWRcXHUwMGVjXCIsXG4gICAgICBcInZlbmVyZFxcdTAwZWNcIixcbiAgICAgIFwic2FiYXRvXCJcbiAgICBdLFxuICAgIFwiTU9OVEhcIjogW1xuICAgICAgXCJnZW5uYWlvXCIsXG4gICAgICBcImZlYmJyYWlvXCIsXG4gICAgICBcIm1hcnpvXCIsXG4gICAgICBcImFwcmlsZVwiLFxuICAgICAgXCJtYWdnaW9cIixcbiAgICAgIFwiZ2l1Z25vXCIsXG4gICAgICBcImx1Z2xpb1wiLFxuICAgICAgXCJhZ29zdG9cIixcbiAgICAgIFwic2V0dGVtYnJlXCIsXG4gICAgICBcIm90dG9icmVcIixcbiAgICAgIFwibm92ZW1icmVcIixcbiAgICAgIFwiZGljZW1icmVcIlxuICAgIF0sXG4gICAgXCJTSE9SVERBWVwiOiBbXG4gICAgICBcImRvbVwiLFxuICAgICAgXCJsdW5cIixcbiAgICAgIFwibWFyXCIsXG4gICAgICBcIm1lclwiLFxuICAgICAgXCJnaW9cIixcbiAgICAgIFwidmVuXCIsXG4gICAgICBcInNhYlwiXG4gICAgXSxcbiAgICBcIlNIT1JUTU9OVEhcIjogW1xuICAgICAgXCJnZW5cIixcbiAgICAgIFwiZmViXCIsXG4gICAgICBcIm1hclwiLFxuICAgICAgXCJhcHJcIixcbiAgICAgIFwibWFnXCIsXG4gICAgICBcImdpdVwiLFxuICAgICAgXCJsdWdcIixcbiAgICAgIFwiYWdvXCIsXG4gICAgICBcInNldFwiLFxuICAgICAgXCJvdHRcIixcbiAgICAgIFwibm92XCIsXG4gICAgICBcImRpY1wiXG4gICAgXSxcbiAgICBcImZ1bGxEYXRlXCI6IFwiRUVFRSBkIE1NTU0geVwiLFxuICAgIFwibG9uZ0RhdGVcIjogXCJkIE1NTU0geVwiLFxuICAgIFwibWVkaXVtXCI6IFwiZGQgTU1NIHkgSEg6bW06c3NcIixcbiAgICBcIm1lZGl1bURhdGVcIjogXCJkZC9NTS95eXl5XCIsXG4gICAgXCJtZWRpdW1UaW1lXCI6IFwiSEg6bW06c3NcIixcbiAgICBcInNob3J0XCI6IFwiZGQvTU0veXkgSEg6bW1cIixcbiAgICBcInNob3J0RGF0ZVwiOiBcImRkL01NL3l5XCIsXG4gICAgXCJzaG9ydFRpbWVcIjogXCJISDptbVwiXG4gIH0sXG4gIFwiTlVNQkVSX0ZPUk1BVFNcIjoge1xuICAgIFwiQ1VSUkVOQ1lfU1lNXCI6IFwiXFx1MjBhY1wiLFxuICAgIFwiREVDSU1BTF9TRVBcIjogXCIsXCIsXG4gICAgXCJHUk9VUF9TRVBcIjogXCIuXCIsXG4gICAgXCJQQVRURVJOU1wiOiBbXG4gICAgICB7XG4gICAgICAgIFwiZ1NpemVcIjogMyxcbiAgICAgICAgXCJsZ1NpemVcIjogMyxcbiAgICAgICAgXCJtYXhGcmFjXCI6IDMsXG4gICAgICAgIFwibWluRnJhY1wiOiAwLFxuICAgICAgICBcIm1pbkludFwiOiAxLFxuICAgICAgICBcIm5lZ1ByZVwiOiBcIi1cIixcbiAgICAgICAgXCJuZWdTdWZcIjogXCJcIixcbiAgICAgICAgXCJwb3NQcmVcIjogXCJcIixcbiAgICAgICAgXCJwb3NTdWZcIjogXCJcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJnU2l6ZVwiOiAzLFxuICAgICAgICBcImxnU2l6ZVwiOiAzLFxuICAgICAgICBcIm1heEZyYWNcIjogMixcbiAgICAgICAgXCJtaW5GcmFjXCI6IDIsXG4gICAgICAgIFwibWluSW50XCI6IDEsXG4gICAgICAgIFwibmVnUHJlXCI6IFwiLVwiLFxuICAgICAgICBcIm5lZ1N1ZlwiOiBcIlxcdTAwYTBcXHUwMGE0XCIsXG4gICAgICAgIFwicG9zUHJlXCI6IFwiXCIsXG4gICAgICAgIFwicG9zU3VmXCI6IFwiXFx1MDBhMFxcdTAwYTRcIlxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgXCJpZFwiOiBcIml0XCIsXG4gIFwicGx1cmFsQ2F0XCI6IGZ1bmN0aW9uKG4sIG9wdF9wcmVjaXNpb24pIHsgIHZhciBpID0gbiB8IDA7ICB2YXIgdmYgPSBnZXRWRihuLCBvcHRfcHJlY2lzaW9uKTsgIGlmIChpID09IDEgJiYgdmYudiA9PSAwKSB7ICAgIHJldHVybiBQTFVSQUxfQ0FURUdPUlkuT05FOyAgfSAgcmV0dXJuIFBMVVJBTF9DQVRFR09SWS5PVEhFUjt9XG59KTtcbn1dKTtcbiIsIi8qKlxuICpcbiAqIGJhc2VSb3V0aW5nIGNvbmZpZ3VyYXRpb24gZXhwcmVzc2VkIGFzIGEgY29yZSBjb25maWcgYmxvY2tcbiAqL1xuXG5BcHAuY29uZmlnKFsnJHN0YXRlUHJvdmlkZXInLCAnJGxvY2F0aW9uUHJvdmlkZXInLCAnJHVybFJvdXRlclByb3ZpZGVyJywgJ1JvdXRlSGVscGVyc1Byb3ZpZGVyJyxcbmZ1bmN0aW9uIGJhc2VSb3V0aW5nQ29uZmlnKCRzdGF0ZVByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCBoZWxwZXIpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIFNldCB0aGUgZm9sbG93aW5nIHRvIHRydWUgdG8gZW5hYmxlIHRoZSBIVE1MNSBNb2RlXG4gIC8vIFlvdSBtYXkgaGF2ZSB0byBzZXQgPGJhc2U+IHRhZyBpbiBpbmRleCBhbmQgYSByb3V0aW5nIGNvbmZpZ3VyYXRpb24gaW4geW91ciBzZXJ2ZXJcbiAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKGZhbHNlKTtcblxuICAvLyBkZWZhdWx0cyB0byBkYXNoYm9hcmRcbiAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2FwcC93ZWxjb21lJyk7XG5cblxuXG5cbiAgLy9cbiAgLy8gQXBwbGljYXRpb24gUm91dGVzXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICRzdGF0ZVByb3ZpZGVyXG4gICAgLnN0YXRlKCdhcHAnLCB7XG4gICAgICAgIHVybDogJy9hcHAnLFxuICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcbiAgICAgICAgdGVtcGxhdGVVcmw6IGhlbHBlci5iYXNlcGF0aCgnYXBwLmh0bWwnKSxcbiAgICAgICAgY29udHJvbGxlcjogJ0FwcENvbnRyb2xsZXInLFxuICAgICAgICByZXNvbHZlOiBoZWxwZXIucmVzb2x2ZUZvcihcbiAgICAgICAgICAgICdmYXN0Y2xpY2snLCAgICAvLyBQb2x5ZmlsbCB0byByZW1vdmUgY2xpY2sgZGVsYXlzIG9uIGJyb3dzZXJzIHdpdGggdG91Y2ggVUlzXG4gICAgICAgICAgICAnbW9kZXJuaXpyJ1xuICAgICAgICAgICAgLy8nbW9tZW50J1xuICAgICAgICAgIClcbiAgICB9KVxuXG4gICAgLnN0YXRlKCdhcHAubWFpbicse1xuICAgICAgICB1cmw6Jy9tYWluJyxcbiAgICAgICAgY29udHJvbGxlcjonQXBwQ29udHJvbGxlcicsXG4gICAgICAgIHRlbXBsYXRlVXJsOiBoZWxwZXIuYmFzZXBhdGgoJ21lYWxzaGFyZS9tYWluLmh0bWwnKVxuXG4gICAgfSlcblxuXG4gICBcblxuXG59XSlcblxuLyoqXG4gKlxuICogaG9sZHMgdGhlIGJhc2VSb3V0aW5nIGNvbmZpZ3VyYXRpb25cbiAqL1xuICAgIC5jb25maWcoWyckb2NMYXp5TG9hZFByb3ZpZGVyJywgJ0FQUF9SRVFVSVJFUycsIGZ1bmN0aW9uIGxhenlMb2FkQ29uZmlnKCRvY0xhenlMb2FkUHJvdmlkZXIsIEFQUF9SRVFVSVJFUykge1xuICAgICAgICAndXNlIHN0cmljdCc7XG5cbiAgICAgICAgLy8gTGF6eSBMb2FkIG1vZHVsZXMgY29uZmlndXJhdGlvblxuICAgICAgICAkb2NMYXp5TG9hZFByb3ZpZGVyLmNvbmZpZyh7XG4gICAgICAgICAgICBkZWJ1ZzogZmFsc2UsXG4gICAgICAgICAgICBldmVudHM6IHRydWUsXG4gICAgICAgICAgICBtb2R1bGVzOiBBUFBfUkVRVUlSRVMubW9kdWxlc1xuICAgICAgICB9KTtcblxuICAgIH1dKVxuXG4uY29uZmlnKGZ1bmN0aW9uKCRtZFRoZW1pbmdQcm92aWRlcikge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkZWZhdWx0JylcbiAgICAucHJpbWFyeVBhbGV0dGUoJ3BpbmsnKVxuICAgIC5hY2NlbnRQYWxldHRlKCdvcmFuZ2UnKTtcbn0pXG5cbi8qKlxuICogaG9sZHMgdGhlIGFwcCB3aWRlIGNvbmZpZ3VyYXRpb24gYmxvY2sgdG8gaG9sZCByZWZlcmVuY2VzIHRvIHJlZ2lzdGVyIGZ1bmN0aW9ucyAodG8gaGVscCBsYXp5IGxvYWRpbmcgYW5kIHBvc3QgY29uZmlnIHNlcnZpY2UgcmVnaXN0cmF0aW9uKVxuICovXG4gICAgLmNvbmZpZyhbJyRjb250cm9sbGVyUHJvdmlkZXInLCAnJGNvbXBpbGVQcm92aWRlcicsICckZmlsdGVyUHJvdmlkZXInLCAnJHByb3ZpZGUnLFxuICAgICAgICBmdW5jdGlvbiBwcm92aWRlckhhbmRsZXJzQ29uZmlnKCRjb250cm9sbGVyUHJvdmlkZXIsICRjb21waWxlUHJvdmlkZXIsICRmaWx0ZXJQcm92aWRlciwgJHByb3ZpZGUpIHtcbiAgICAgICAgICAgICd1c2Ugc3RyaWN0JztcbiAgICAgICAgICAgIC8vIHJlZ2lzdGVyaW5nIGNvbXBvbmVudHMgYWZ0ZXIgYm9vdHN0cmFwXG4gICAgICAgICAgICBBcHAuY29udHJvbGxlciA9ICRjb250cm9sbGVyUHJvdmlkZXIucmVnaXN0ZXI7XG4gICAgICAgICAgICBBcHAuZGlyZWN0aXZlID0gJGNvbXBpbGVQcm92aWRlci5kaXJlY3RpdmU7XG4gICAgICAgICAgICBBcHAuZmlsdGVyID0gJGZpbHRlclByb3ZpZGVyLnJlZ2lzdGVyO1xuICAgICAgICAgICAgQXBwLmZhY3RvcnkgPSAkcHJvdmlkZS5mYWN0b3J5O1xuICAgICAgICAgICAgQXBwLnNlcnZpY2UgPSAkcHJvdmlkZS5zZXJ2aWNlO1xuICAgICAgICAgICAgQXBwLmNvbnN0YW50ID0gJHByb3ZpZGUuY29uc3RhbnQ7XG4gICAgICAgICAgICBBcHAudmFsdWUgPSAkcHJvdmlkZS52YWx1ZTtcblxuICAgICAgICB9XSlcblxuO1xuIiwiQXBwLmNvbnN0YW50KCdBUFBfUkVRVUlSRVMnLCB7XG4gICAgLy8galF1ZXJ5IGJhc2VkIGFuZCBzdGFuZGFsb25lIHNjcmlwdHNcbiAgICBzY3JpcHRzOiB7XG4gICAgICAgICdmYXN0Y2xpY2snOiBbJ3ZlbmRvci9mYXN0Y2xpY2svbGliL2Zhc3RjbGljay5qcyddLFxuICAgICAgICAnbW9kZXJuaXpyJzogWyd2ZW5kb3IvbW9kZXJuaXpyL21vZGVybml6ci5qcyddLFxuICAgICAgICAnbW9tZW50JzogWyd2ZW5kb3IvbW9tZW50L21pbi9tb21lbnQtd2l0aC1sb2NhbGVzLm1pbi5qcycsXG4gICAgICAgICAgICAvLyd2ZW5kb3IvbW9tZW50LXRpbWV6b25lL2J1aWxkcy9tb21lbnQtdGltZXpvbmUtd2l0aC1kYXRhLm1pbi5qcydcbiAgICAgICAgXVxuICAgIH0sXG4gICAgLy8gQW5ndWxhciBiYXNlZCBzY3JpcHQgKHVzZSB0aGUgcmlnaHQgbW9kdWxlIG5hbWUpXG4gICAgbW9kdWxlczogW11cbn0pO1xuIiwiLyoqPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBNb2R1bGU6IGJyb3dzZXIuanNcbiAqIEJyb3dzZXIgZGV0ZWN0aW9uXG4gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cblxuQXBwLnNlcnZpY2UoJ2Jyb3dzZXInLCBmdW5jdGlvbigpe1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgbWF0Y2hlZCwgYnJvd3NlcjtcblxuICB2YXIgdWFNYXRjaCA9IGZ1bmN0aW9uKCB1YSApIHtcbiAgICB1YSA9IHVhLnRvTG93ZXJDYXNlKCk7XG5cbiAgICB2YXIgbWF0Y2ggPSAvKG9wcilbXFwvXShbXFx3Ll0rKS8uZXhlYyggdWEgKSB8fFxuICAgICAgLyhjaHJvbWUpWyBcXC9dKFtcXHcuXSspLy5leGVjKCB1YSApIHx8XG4gICAgICAvKHZlcnNpb24pWyBcXC9dKFtcXHcuXSspLiooc2FmYXJpKVsgXFwvXShbXFx3Ll0rKS8uZXhlYyggdWEgKSB8fFxuICAgICAgLyh3ZWJraXQpWyBcXC9dKFtcXHcuXSspLy5leGVjKCB1YSApIHx8XG4gICAgICAvKG9wZXJhKSg/Oi4qdmVyc2lvbnwpWyBcXC9dKFtcXHcuXSspLy5leGVjKCB1YSApIHx8XG4gICAgICAvKG1zaWUpIChbXFx3Ll0rKS8uZXhlYyggdWEgKSB8fFxuICAgICAgdWEuaW5kZXhPZihcInRyaWRlbnRcIikgPj0gMCAmJiAvKHJ2KSg/Ojp8ICkoW1xcdy5dKykvLmV4ZWMoIHVhICkgfHxcbiAgICAgIHVhLmluZGV4T2YoXCJjb21wYXRpYmxlXCIpIDwgMCAmJiAvKG1vemlsbGEpKD86Lio/IHJ2OihbXFx3Ll0rKXwpLy5leGVjKCB1YSApIHx8XG4gICAgICBbXTtcblxuICAgIHZhciBwbGF0Zm9ybV9tYXRjaCA9IC8oaXBhZCkvLmV4ZWMoIHVhICkgfHxcbiAgICAgIC8oaXBob25lKS8uZXhlYyggdWEgKSB8fFxuICAgICAgLyhhbmRyb2lkKS8uZXhlYyggdWEgKSB8fFxuICAgICAgLyh3aW5kb3dzIHBob25lKS8uZXhlYyggdWEgKSB8fFxuICAgICAgLyh3aW4pLy5leGVjKCB1YSApIHx8XG4gICAgICAvKG1hYykvLmV4ZWMoIHVhICkgfHxcbiAgICAgIC8obGludXgpLy5leGVjKCB1YSApIHx8XG4gICAgICAvKGNyb3MpL2kuZXhlYyggdWEgKSB8fFxuICAgICAgW107XG5cbiAgICByZXR1cm4ge1xuICAgICAgYnJvd3NlcjogbWF0Y2hbIDMgXSB8fCBtYXRjaFsgMSBdIHx8IFwiXCIsXG4gICAgICB2ZXJzaW9uOiBtYXRjaFsgMiBdIHx8IFwiMFwiLFxuICAgICAgcGxhdGZvcm06IHBsYXRmb3JtX21hdGNoWyAwIF0gfHwgXCJcIlxuICAgIH07XG4gIH07XG5cbiAgbWF0Y2hlZCA9IHVhTWF0Y2goIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50ICk7XG4gIGJyb3dzZXIgPSB7fTtcblxuICBpZiAoIG1hdGNoZWQuYnJvd3NlciApIHtcbiAgICBicm93c2VyWyBtYXRjaGVkLmJyb3dzZXIgXSA9IHRydWU7XG4gICAgYnJvd3Nlci52ZXJzaW9uID0gbWF0Y2hlZC52ZXJzaW9uO1xuICAgIGJyb3dzZXIudmVyc2lvbk51bWJlciA9IHBhcnNlSW50KG1hdGNoZWQudmVyc2lvbik7XG4gIH1cblxuICBpZiAoIG1hdGNoZWQucGxhdGZvcm0gKSB7XG4gICAgYnJvd3NlclsgbWF0Y2hlZC5wbGF0Zm9ybSBdID0gdHJ1ZTtcbiAgfVxuXG4gIC8vIFRoZXNlIGFyZSBhbGwgY29uc2lkZXJlZCBtb2JpbGUgcGxhdGZvcm1zLCBtZWFuaW5nIHRoZXkgcnVuIGEgbW9iaWxlIGJyb3dzZXJcbiAgaWYgKCBicm93c2VyLmFuZHJvaWQgfHwgYnJvd3Nlci5pcGFkIHx8IGJyb3dzZXIuaXBob25lIHx8IGJyb3dzZXJbIFwid2luZG93cyBwaG9uZVwiIF0gKSB7XG4gICAgYnJvd3Nlci5tb2JpbGUgPSB0cnVlO1xuICB9XG5cbiAgLy8gVGhlc2UgYXJlIGFsbCBjb25zaWRlcmVkIGRlc2t0b3AgcGxhdGZvcm1zLCBtZWFuaW5nIHRoZXkgcnVuIGEgZGVza3RvcCBicm93c2VyXG4gIGlmICggYnJvd3Nlci5jcm9zIHx8IGJyb3dzZXIubWFjIHx8IGJyb3dzZXIubGludXggfHwgYnJvd3Nlci53aW4gKSB7XG4gICAgYnJvd3Nlci5kZXNrdG9wID0gdHJ1ZTtcbiAgfVxuXG4gIC8vIENocm9tZSwgT3BlcmEgMTUrIGFuZCBTYWZhcmkgYXJlIHdlYmtpdCBiYXNlZCBicm93c2Vyc1xuICBpZiAoIGJyb3dzZXIuY2hyb21lIHx8IGJyb3dzZXIub3ByIHx8IGJyb3dzZXIuc2FmYXJpICkge1xuICAgIGJyb3dzZXIud2Via2l0ID0gdHJ1ZTtcbiAgfVxuXG4gIC8vIElFMTEgaGFzIGEgbmV3IHRva2VuIHNvIHdlIHdpbGwgYXNzaWduIGl0IG1zaWUgdG8gYXZvaWQgYnJlYWtpbmcgY2hhbmdlc1xuICBpZiAoIGJyb3dzZXIucnYgKVxuICB7XG4gICAgdmFyIGllID0gXCJtc2llXCI7XG5cbiAgICBtYXRjaGVkLmJyb3dzZXIgPSBpZTtcbiAgICBicm93c2VyW2llXSA9IHRydWU7XG4gIH1cblxuICAvLyBPcGVyYSAxNSsgYXJlIGlkZW50aWZpZWQgYXMgb3ByXG4gIGlmICggYnJvd3Nlci5vcHIgKVxuICB7XG4gICAgdmFyIG9wZXJhID0gXCJvcGVyYVwiO1xuXG4gICAgbWF0Y2hlZC5icm93c2VyID0gb3BlcmE7XG4gICAgYnJvd3NlcltvcGVyYV0gPSB0cnVlO1xuICB9XG5cbiAgLy8gU3RvY2sgQW5kcm9pZCBicm93c2VycyBhcmUgbWFya2VkIGFzIFNhZmFyaSBvbiBBbmRyb2lkLlxuICBpZiAoIGJyb3dzZXIuc2FmYXJpICYmIGJyb3dzZXIuYW5kcm9pZCApXG4gIHtcbiAgICB2YXIgYW5kcm9pZCA9IFwiYW5kcm9pZFwiO1xuXG4gICAgbWF0Y2hlZC5icm93c2VyID0gYW5kcm9pZDtcbiAgICBicm93c2VyW2FuZHJvaWRdID0gdHJ1ZTtcbiAgfVxuXG4gIC8vIEFzc2lnbiB0aGUgbmFtZSBhbmQgcGxhdGZvcm0gdmFyaWFibGVcbiAgYnJvd3Nlci5uYW1lID0gbWF0Y2hlZC5icm93c2VyO1xuICBicm93c2VyLnBsYXRmb3JtID0gbWF0Y2hlZC5wbGF0Zm9ybTtcblxuXG4gIHJldHVybiBicm93c2VyO1xuXG59KTsiLCIvKio9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIE1vZHVsZTogaGVscGVycy5qc1xuICogUHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9ucyBmb3Igcm91dGVzIGRlZmluaXRpb25cbiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuXG5BcHAucHJvdmlkZXIoJ1JvdXRlSGVscGVycycsIFsnQVBQX1JFUVVJUkVTJywgZnVuY3Rpb24oYXBwUmVxdWlyZXMpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICAvLyBTZXQgaGVyZSB0aGUgYmFzZSBvZiB0aGUgcmVsYXRpdmUgcGF0aFxuICAgIC8vIGZvciBhbGwgYXBwIHZpZXdzXG4gICAgdGhpcy5iYXNlcGF0aCA9IGZ1bmN0aW9uKHVyaSkge1xuICAgICAgICByZXR1cm4gJ2FwcC92aWV3cy8nICsgdXJpO1xuICAgIH07XG5cbiAgICAvLyBHZW5lcmF0ZXMgYSByZXNvbHZlIG9iamVjdCBieSBwYXNzaW5nIHNjcmlwdCBuYW1lc1xuICAgIC8vIHByZXZpb3VzbHkgY29uZmlndXJlZCBpbiBjb25zdGFudC5BUFBfUkVRVUlSRVNcbiAgICB0aGlzLnJlc29sdmVGb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIF9hcmdzID0gYXJndW1lbnRzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGVwczogWyckb2NMYXp5TG9hZCcsICckcScsIGZ1bmN0aW9uKCRvY0xMLCAkcSkge1xuICAgICAgICAgICAgICAgIC8vIENyZWF0ZXMgYSBwcm9taXNlIGNoYWluIGZvciBlYWNoIGFyZ3VtZW50XG4gICAgICAgICAgICAgICAgdmFyIHByb21pc2UgPSAkcS53aGVuKDEpOyAvLyBlbXB0eSBwcm9taXNlXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IF9hcmdzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UgPSBhbmRUaGVuKF9hcmdzW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb21pc2U7XG5cbiAgICAgICAgICAgICAgICAvLyBjcmVhdGVzIHByb21pc2UgdG8gY2hhaW4gZHluYW1pY2FsbHlcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBhbmRUaGVuKF9hcmcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gYWxzbyBzdXBwb3J0IGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgcHJvbWlzZVxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIF9hcmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9taXNlLnRoZW4oX2FyZyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIGlzIGEgbW9kdWxlLCBwYXNzIHRoZSBuYW1lLiBJZiBub3QsIHBhc3MgdGhlIGFycmF5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHdoYXRUb0xvYWQgPSBnZXRSZXF1aXJlZChfYXJnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzaW1wbGUgZXJyb3IgY2hlY2tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXdoYXRUb0xvYWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuZXJyb3IoJ1JvdXRlIHJlc29sdmU6IEJhZCByZXNvdXJjZSBuYW1lIFsnICsgX2FyZyArICddJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZpbmFsbHksIHJldHVybiBhIHByb21pc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJG9jTEwubG9hZCh3aGF0VG9Mb2FkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGFuZCByZXR1cm5zIHJlcXVpcmVkIGRhdGFcbiAgICAgICAgICAgICAgICAvLyBhbmFseXplIG1vZHVsZSBpdGVtcyB3aXRoIHRoZSBmb3JtIFtuYW1lOiAnJywgZmlsZXM6IFtdXVxuICAgICAgICAgICAgICAgIC8vIGFuZCBhbHNvIHNpbXBsZSBhcnJheSBvZiBzY3JpcHQgZmlsZXMgKGZvciBub3QgYW5ndWxhciBqcylcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBnZXRSZXF1aXJlZChuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhcHBSZXF1aXJlcy5tb2R1bGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBtIGluIGFwcFJlcXVpcmVzLm1vZHVsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXBwUmVxdWlyZXMubW9kdWxlc1ttXS5uYW1lICYmIGFwcFJlcXVpcmVzLm1vZHVsZXNbbV0ubmFtZSA9PT0gbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXBwUmVxdWlyZXMubW9kdWxlc1ttXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXBwUmVxdWlyZXMuc2NyaXB0cyAmJiBhcHBSZXF1aXJlcy5zY3JpcHRzW25hbWVdO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfV1cbiAgICAgICAgfTtcbiAgICB9OyAvLyByZXNvbHZlRm9yXG5cbiAgICAvLyBub3QgbmVjZXNzYXJ5LCBvbmx5IHVzZWQgaW4gY29uZmlnIGJsb2NrIGZvciByb3V0ZXNcbiAgICB0aGlzLiRnZXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJhc2VwYXRoOiB0aGlzLmJhc2VwYXRoXG4gICAgICAgIH07XG4gICAgfTtcblxufV0pO1xuIiwiIiwiIiwiLy8gQXBwLmNvbmZpZygpO1xuLy8gXG5BcHAuY29udHJvbGxlcignQXBwQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJyRyb290U2NvcGUnLCAnJG1kU2lkZW5hdicsICckbWRUb2FzdCcsIGZ1bmN0aW9uKCRzY29wZSwgJHJvb3RTY29wZSwgJG1kU2lkZW5hdiwgJG1kVG9hc3QpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICAvLyBzaW1wbGUgdG9hc3Qgc3RyaW5nc1xuICAgIHZhciBUT0FTVCA9IHtcbiAgICAgICAgTk9fRUxFTUVOVFNfVE9fUkVNT1ZFOiAnTm9uIGNpIHNvbm8gZWxlbWVudGkgZGEgcmltdW92ZXJlIScsXG4gICAgfVxuXG5cbiAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3VjY2VzcycsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBzbiA9ICRtZFNpZGVuYXYoJy5sZWZ0Jyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjaGFuZ2luZycsIHNuKTtcbiAgICAgICAgaWYgKHNuLmlzT3BlbigpKSB7XG5cbiAgICAgICAgICAgIHNuLnRvZ2dsZSgpOyAvLyBjbG9zZSB0aGlzLi4uXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIFBMQUNFUyAoZ2VvbG9jYXRpb24sIGhpc3RvcnkgZXRjKVxuICAgIC8qdmFyIHBsYWNlcyA9IFtcbiAgICAgICAge25hbWU6J2Zlcm9uaWEnfSxcbiAgICAgICAge25hbWU6J2NhbWJ1c2EnfSxcbiAgICAgICAge25hbWU6J3RyaXR0aWNvJ30sXG4gICAgICAgIHtuYW1lOidmb3Jubyd9LFxuXG4gICAgXTsqL1xuXG4gICAgdmFyIGZyaWVuZHMgPSBbe1xuICAgICAgICBuYW1lOiAnIERlZmF1bHQnLFxuICAgICAgICBnZW5kZXI6ICdoaW0nLFxuICAgICAgICBwb3J0cmFpdDogJ2FwcC9pbWcvZ2VuZXJpYzIucG5nJ1xuICAgIH0sIHtcbiAgICAgICAgbmFtZTogJ21hcmlvJyxcbiAgICAgICAgZ2VuZGVyOiAnaGltJyxcbiAgICAgICAgcG9ydHJhaXQ6ICdhcHAvaW1nL21hcmlvLmpwZydcbiAgICB9LCB7XG4gICAgICAgIG5hbWU6ICdsYXVyYScsXG4gICAgICAgIGdlbmRlcjogJ2hlcicsXG4gICAgICAgIHBvcnRyYWl0OiAnYXBwL2ltZy9sYXVyYS5qcGVnJ1xuICAgIH0sIHtcbiAgICAgICAgbmFtZTogJ2VucmljbycsXG4gICAgICAgIGdlbmRlcjogJ2hpbScsXG4gICAgICAgIHBvcnRyYWl0OiAnYXBwL2ltZy9lbnJpY28yLmpwZydcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2ZlcmRpbmFuZG8nLFxuICAgICAgICBnZW5kZXI6ICdoaW0nLFxuICAgICAgICBwb3J0cmFpdDogJ2FwcC9pbWcvZmVyZGluYW5kby5qcGcnXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdnaW9yZGFubycsXG4gICAgICAgIGdlbmRlcjogJ2hpbScsXG4gICAgICAgIHBvcnRyYWl0OiAnYXBwL2ltZy9naW9yZGFuby5qcGcnXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICd3YWx0ZXInLFxuICAgICAgICBnZW5kZXI6ICdoaW0nLFxuICAgICAgICBwb3J0cmFpdDogJ2FwcC9pbWcvd2FsdGVyLmpwZydcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3JvYmVydG8nLFxuICAgICAgICBnZW5kZXI6ICdoaW0nLFxuICAgICAgICBwb3J0cmFpdDogJ2FwcC9pbWcvcm9iZXJ0by5qcGcnXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdyb3NhcmlvJyxcbiAgICAgICAgZ2VuZGVyOiAnaGltJyxcbiAgICAgICAgcG9ydHJhaXQ6ICdhcHAvaW1nL3Jvc2FyaW8uanBnJ1xuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnZmFiaW8nLFxuICAgICAgICBnZW5kZXI6ICdoaW0nLFxuICAgICAgICBwb3J0cmFpdDogJ2FwcC9pbWcvZmFiaW8uanBnJ1xuICAgIH0sIHtcbiAgICAgICAgbmFtZTogJ3Bhb2xhJyxcbiAgICAgICAgZ2VuZGVyOiAnaGVyJyxcbiAgICAgICAgcG9ydHJhaXQ6ICdhcHAvaW1nL3Bhb2xhLmpwZydcbiAgICB9LHtcbiAgICAgICAgbmFtZTogJ2FsZXNzaWEnLFxuICAgICAgICBnZW5kZXI6ICdoZXInLFxuICAgICAgICBwb3J0cmFpdDogJ2FwcC9pbWcvYWxlc3NpYS5wbmcnXG4gICAgfSx7XG4gICAgICAgIG5hbWU6ICdzZXJlbmEnLFxuICAgICAgICBnZW5kZXI6ICdoZXInLFxuICAgICAgICBwb3J0cmFpdDogJ2FwcC9pbWcvc2VyZW5hLmpwZydcbiAgICB9XTtcblxuICAgIHZhciBpdGVtcyA9IFt7XG4gICAgICAgICAgICBuYW1lOiAnY29ybmV0dG8nXG4gICAgICAgIH0sIC8vIDBcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ2NhcHB1Y2Npbm8nXG4gICAgICAgIH0sIC8vIDFcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ2NhZmbDqCdcbiAgICAgICAgfSwgLy8gMlxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnYWNxdWEnXG4gICAgICAgIH0sIC8vIDNcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ3N1Y2NvIGRpIGZydXR0YSdcbiAgICAgICAgfSAvLyA0XG5cbiAgICBdO1xuXG5cblxuICAgIHZhciBhZGRlZEl0ZW1zID0gW1xuICAgICAgICBpdGVtc1syXSwgLy8gY2FmZsOoXG5cbiAgICAgICAgaXRlbXNbMV0sIC8vIGNhcHB1Y2Npbm9cbiAgICAgICAgaXRlbXNbMF0sIC8vIGNvcm5ldHRvXG4gICAgICAgIFxuICAgIF07XG5cbiAgICAvLyBjb21wYWN0IHZpZXcgP1xuICAgIHZhciBjb21wYWN0ID0gZmFsc2U7XG4gICAgdmFyIG9yZGVyRGV0YWlsc1Nob3duID0gdHJ1ZTtcblxuICAgIHZhciBlbXB0eUl0ZW0gPSB7XG4gICAgICAgICAgICBuYW1lOiAnJ1xuICAgICAgICB9O1xuXG4gICAgLy8gYWxsIGZyaWVuZCdzIG9yZGVyc1xuICAgIHZhciBhbGxGcmllbmRzID0gW107XG5cblxuXG5cblxuICAgIC8qdmFyIGdyb3VwcyA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTonQ29uc3VsZW50aSBJQUQnLFxuICAgICAgICAgICAgZnJpZW5kczpbZnJpZW5kc1swXSxmcmllbmRzWzFdXSxcbiAgICAgICAgICAgIHBsYWNlOnBsYWNlc1sxXVxuICAgICAgICB9LFxuICAgICAgICB7ICAgbmFtZTonVGVhbSBDVScsXG4gICAgICAgICAgICBmcmllbmRzOmZyaWVuZHMsXG4gICAgICAgICAgICBwbGFjZTpwbGFjZXNbMF1cbiAgICAgICAgfVxuICAgIF07Ki9cblxuICAgIHZhciBjdXJyZW50ID0gZnJpZW5kc1swXTsgLy8gZGVmYXVsdCBmcmllbmRcblxuXG5cbiAgICAvLyBkZG8sIGRhdGEgKyBhcGlcbiAgICAkc2NvcGUuYXBwID0ge1xuICAgICAgICAvLyB1c2VyIHByZWZlcmVuY2VzIGFuZCB1c2VyIHByZWYgYXBpXG4gICAgICAgIGhpbnRzOiB7XG4gICAgICAgICAgICBmYXN0TW9kZTogdHJ1ZSxcbiAgICAgICAgICAgIGhpZGVIaW50OiBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuYXBwLmhpbnRzW2tleV0gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgLy8gREFUQSAobW9jaylcbiAgICAgICAgbmFtZTogJ09yZGVyIElUIScsXG4gICAgICAgIGxvZ286ICdhcHAvaW1nL3l1bW1seS5wbmcnLFxuICAgICAgICB3ZWxjb21lSW1hZ2U6ICdhcHAvaW1nL21lYWxzaGFyZS5zdmcnLFxuICAgICAgICAvL3ZlcnNpb246JzAuMC4xJyxcbiAgICAgICAgdGl0bGU6ICdNZWFsU2hhcmUhJyxcbiAgICAgICAgZnJpZW5kczogZnJpZW5kcyxcbiAgICAgICAgLy9mcmllbmRzT25NYXA6IGZyaWVuZHMsXG4gICAgICAgIC8vcGxhY2U6e1xuICAgICAgICAvLyAgbmFtZTonRXIgUGFuaW5hcm8nXG4gICAgICAgIC8vfSxcbiAgICAgICAgLy8gcmVmZXJlbmNlIHRvIG1lXG4gICAgICAgIG1lOiBmcmllbmRzWzNdLFxuICAgICAgICAvL2RlZmF1bHQ6e1xuICAgICAgICAvLyAgZnJpZW5kOntcbiAgICAgICAgLy8gICAgICBwb3J0cmFpdDpmcmllbmRzWzBdLnBvcnRyYWl0XG4gICAgICAgIC8vICB9LFxuICAgICAgICAvL30sXG4gICAgICAgIC8vaW52aXRlOntcbiAgICAgICAgLy8gIGZyaWVuZDpmcmllbmRzWzBdLFxuICAgICAgICAvLyAgbWVhbDonY29sYXppb25lJyxcbiAgICAgICAgLy99LFxuICAgICAgICAvL2dyb3Vwczpncm91cHMsXG4gICAgICAgIGl0ZW1zOiBpdGVtcyxcbiAgICAgICAgLy9hZGRlZEl0ZW1zOmFkZGVkSXRlbXMsXG4gICAgICAgIG9yZGVyOiBhZGRlZEl0ZW1zLFxuICAgICAgICAvLyBBUElzXG4gICAgICAgIC8vbG9naW46e1xuICAgICAgICAvLyAgY3JlZGVudGlhbHNMb2dpbjpjcmVkZW50aWFsc0xvZ2luLFxuICAgICAgICAvLyAgZmFjZWJvb2tMb2dpbjpmYWNlYm9va0xvZ2luLFxuICAgICAgICAvLyAgcmVjb3ZlcjpyZWNvdmVyXG4gICAgICAgIC8vfSxcbiAgICAgICAgaW5jcmVtZW50OiBpbmNyZW1lbnQsXG4gICAgICAgIGRlY3JlbWVudDogZGVjcmVtZW50LFxuICAgICAgICBvcmRlcmVkSXRlbXM6IG9yZGVyZWRJdGVtcyxcbiAgICAgICAgLy9jaGVja0luOmNoZWNrSW4sXG4gICAgICAgIC8vb3BlbkxlZnRNZW51Om9wZW5MZWZ0TWVudSxcbiAgICAgICAgLy9ncm91cDp7XG4gICAgICAgIC8vICAgIGpvaW46am9pbixcbiAgICAgICAgLy8gICAgam9pbmVkOmpvaW5lZFxuICAgICAgICAvL30sXG4gICAgICAgIGN1cnJlbnQ6IGN1cnJlbnQsXG4gICAgICAgIHNldEN1cnJlbnQ6IHNldEN1cnJlbnQsXG4gICAgICAgIGdldEN1cnJlbnQ6IGdldEN1cnJlbnQsXG4gICAgICAgIGNvbXBhY3Q6IGNvbXBhY3QsXG4gICAgICAgIC8vIGludGVyZmFjZSB1dGlsaXR5IGFwaXNcbiAgICAgICAgdG9nZ2xlQ29tcGFjdDp0b2dnbGVDb21wYWN0LFxuICAgICAgICBjbGVhck9yZGVyczpjbGVhck9yZGVycyxcbiAgICAgICAgYWRkT3JkZXJJdGVtOmFkZE9yZGVySXRlbSxcbiAgICAgICAgZ2V0QWxsRnJpZW5kczpnZXRBbGxGcmllbmRzLFxuICAgICAgICB0b2dnbGVPcmRlckRldGFpbHM6dG9nZ2xlT3JkZXJEZXRhaWxzXG5cbiAgICAgICAgICAgIC8vIEdlbmVyaWMgYXBpXG4gICAgICAgICAgICAvL25hdmlnYXRlOm5hdmlnYXRlIFxuICAgIH07XG5cbiAgICAvLyBBUElcbiAgICAvLyBsb2dpblxuICAgIC8qZnVuY3Rpb24gY3JlZGVudGlhbHNMb2dpbigpe1xuICAgICAgICBjb25zb2xlLmxvZygnY3JlZGVudGlhbHNMb2dpbicpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZhY2Vib29rTG9naW4oKXtcbiAgICAgICAgY29uc29sZS5sb2coJ2ZhY2Vib29rTG9naW4nKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWNvdmVyKCl7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZWNvdmVyJyk7XG4gICAgfVxuICAgIC8vIHBsYWNlcyAvIGdlb1xuICAgIGZ1bmN0aW9uIGNoZWNrSW4oKXtcbiAgICAgICAgY29uc29sZS5sb2coJ2NoZWNrSW4nKTtcbiAgICAgICAgJHN0YXRlLmdvKCdhcHAubWFwJyk7XG4gICAgfSovXG4gICAgLy8gYWRkZWQgaXRlbXNcbiAgICBmdW5jdGlvbiBpbmNyZW1lbnQoaXRlbSkge1xuICAgICAgICAvLyB0aGlzIHNob3VsZCBub3QgYmUgaGVyZS4uLlxuICAgICAgICBpZiAoIWl0ZW0uZnJpZW5kcykge1xuICAgICAgICAgICAgaXRlbS5mcmllbmRzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgaXRlbS5mcmllbmRzLnB1c2goY3VycmVudCk7XG5cbiAgICAgICAgYWxsRnJpZW5kcyA9IGNhbGN1bGF0ZUFsbEZyaWVuZE9yZGVycygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlY3JlbWVudChpdGVtKSB7XG4gICAgICAgIGlmICghaXRlbS5mcmllbmRzKSB7XG4gICAgICAgICAgICBpdGVtLmZyaWVuZHMgPSBbXTtcbiAgICAgICAgICAgIHNob3dUb2FzdChUT0FTVC5OT19FTEVNRU5UU19UT19SRU1PVkUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGlkeCA9IGl0ZW0uZnJpZW5kcy5pbmRleE9mKGN1cnJlbnQpO1xuICAgICAgICAgICAgaWYgKGlkeCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgb25seSBvbiBpbmRleCBmb3VuZFxuICAgICAgICAgICAgICAgIGl0ZW0uZnJpZW5kcy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2hvd1RvYXN0KGN1cnJlbnQubmFtZSArICcgbm9uIGhhIG9yZGluYXRvIHVuICcgKyBpdGVtLm5hbWUgKyAnICEhIScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYWxsRnJpZW5kcyA9IGNhbGN1bGF0ZUFsbEZyaWVuZE9yZGVycygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldEN1cnJlbnQoZnJpZW5kKSB7XG4gICAgICAgIGN1cnJlbnQgPSBmcmllbmQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Q3VycmVudCgpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnZ2V0IGN1cnJlbnQnKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQ7XG4gICAgfVxuICAgIC8qXG4gICAgZnVuY3Rpb24gam9pbihncm91cCl7XG4gICAgICAgIGNvbnNvbGUubG9nKCdqb2luIGdyb3VwJyxncm91cCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gam9pbmVkKGdyb3VwLHdobyl7XG4gICAgICAgIGNvbnNvbGUubG9nKCdqb2luZWQgZ3JvdXAgd2hvJyxncm91cCx3aG8pO1xuICAgICAgICByZXR1cm4gZ3JvdXAuZnJpZW5kcy5pbmRleE9mKHdobykgPiAwID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH0qL1xuXG4gICAgLy8gY29udHJvbCBsYXlvdXRcbiAgICAvLyBmdW5jdGlvbiBvcGVuTGVmdE1lbnUoKSB7XG4gICAgLy8gICAgICRtZFNpZGVuYXYoJ2xlZnQnKS5vcGVuKCk7XG4gICAgLy8gfVxuXG4gICAgZnVuY3Rpb24gc2hvd1RvYXN0KG1zZykge1xuICAgICAgICAkbWRUb2FzdC5zaG93KFxuICAgICAgICAgICAgJG1kVG9hc3Quc2ltcGxlKCkuY29udGVudChtc2cpLmhpZGVEZWxheSg2MDAwKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbGN1bGF0ZUFsbEZyaWVuZE9yZGVycygpe1xuICAgICAgICByZXR1cm4gYWRkZWRJdGVtcy5yZWR1Y2UoZnVuY3Rpb24obiwgeSkge1xuICAgICAgICAgICAgdmFyIGNjID0geS5mcmllbmRzIHx8IFtdO1xuICAgICAgICAgICAgcmV0dXJuIG4uY29uY2F0KGNjKTtcbiAgICAgICAgICAgIC8vcmV0dXJuIGdsb2JhbEFycmF5LmNvbmNhdCh5LmZyaWVuZHMgfHwgW10pO1xuICAgICAgICB9LCBbXSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb3JkZXJlZEl0ZW1zKGZyaWVuZCkge1xuICAgICAgICAvLyBhbGxGcmllbmRzID0gW107XG4gICAgICAgIC8vIGNhbiBvcHRpbWl6ZSB0aGlzIHRvIGp1c3QgZG8gaXQgb24gKyBhbmQgLVxuICAgICAgICAvLyByZWR1Y2UgbiBzb21lQXJyYXkuZnJpZW5kIGxpc3QgdG8gb25lIGJpZyBsaXN0XG4gICAgICAgIFxuXG4gICAgICAgIC8vIGZpbHRlciB0byBmaW5kIHRoZSBjdXJyZW50IG9uZVxuICAgICAgICByZXR1cm4gYWxsRnJpZW5kcy5maWx0ZXIoZnVuY3Rpb24oeCkge1xuICAgICAgICAgICAgcmV0dXJuIHggPT09IGZyaWVuZDtcbiAgICAgICAgfSkubGVuZ3RoO1xuXG5cbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIHRvZ2dsZUNvbXBhY3QoKXtcbiAgICAgICAgLy9jb25zb2xlLmxvZygndG9nZ2xlQ29tcGFjdCcpO1xuICAgICAgICAkc2NvcGUuYXBwLmNvbXBhY3QgPSAhJHNjb3BlLmFwcC5jb21wYWN0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvZ2dsZU9yZGVyRGV0YWlscygpe1xuICAgICAgICAvL2NvbnNvbGUubG9nKCd0b2dnbGVPcmRlckRldGFpbHMnKTtcbiAgICAgICAgJHNjb3BlLmFwcC5vcmRlckRldGFpbHNTaG93biA9ICEkc2NvcGUuYXBwLm9yZGVyRGV0YWlsc1Nob3duO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsZWFyT3JkZXJzKCl7XG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaChhZGRlZEl0ZW1zLCBmdW5jdGlvbih2YWx1ZSl7XG4gICAgICAgICAgICB2YWx1ZS5mcmllbmRzID0gW107XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGFsbEZyaWVuZHMgPSBjYWxjdWxhdGVBbGxGcmllbmRPcmRlcnMoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRPcmRlckl0ZW0oKXtcbiAgICAgICAgYWRkZWRJdGVtcy5wdXNoKGFuZ3VsYXIuY29weShlbXB0eUl0ZW0pKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRBbGxGcmllbmRzKCl7XG4gICAgICAgIHJldHVybiBhbGxGcmllbmRzO1xuICAgIH1cblxuXG4gICAgLy9mdW5jdGlvbiBuYXZpZ2F0ZShyb3V0ZSl7XG4gICAgLy8gICAgJHN0YXRlLmdvKHJvdXRlKTtcbiAgICAvLyAgICAkbWRTaWRlbmF2KCdsZWZ0JykuY2xvc2UoKTtcbiAgICAvL31cblxufV0pXG5cbi5maWx0ZXIoJ2NhcGl0YWxpemUnLGZ1bmN0aW9uKCl7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIHJldHVybiBmdW5jdGlvbihpbnB1dCl7XG4gICAgICAgIHJldHVybiBpbnB1dC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGlucHV0LnNsaWNlKDEpO1xuICAgIH1cbn0pXG5cbi5kaXJlY3RpdmUoJ2FjdGlvbicsIGZ1bmN0aW9uKCkge1xuICAgIC8vIFJ1bnMgZHVyaW5nIGNvbXBpbGVcbiAgICAndXNlIHN0cmljdCc7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgLy8gbmFtZTogJycsXG4gICAgICAgIC8vIHByaW9yaXR5OiAxLFxuICAgICAgICAvLyB0ZXJtaW5hbDogdHJ1ZSxcbiAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgIGFjdGlvbjogJyYnLFxuICAgICAgICAgICAgYWN0aW9uRXZlbnQ6ICdAJ1xuICAgICAgICB9LCAvLyB7fSA9IGlzb2xhdGUsIHRydWUgPSBjaGlsZCwgZmFsc2UvdW5kZWZpbmVkID0gbm8gY2hhbmdlXG4gICAgICAgIC8vIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJHRyYW5zY2x1ZGUpIHt9LFxuICAgICAgICAvLyByZXF1aXJlOiAnbmdNb2RlbCcsIC8vIEFycmF5ID0gbXVsdGlwbGUgcmVxdWlyZXMsID8gPSBvcHRpb25hbCwgXiA9IGNoZWNrIHBhcmVudCBlbGVtZW50c1xuICAgICAgICAvLyByZXN0cmljdDogJ0EnLCAvLyBFID0gRWxlbWVudCwgQSA9IEF0dHJpYnV0ZSwgQyA9IENsYXNzLCBNID0gQ29tbWVudFxuICAgICAgICAvLyB0ZW1wbGF0ZTogJycsXG4gICAgICAgIC8vIHRlbXBsYXRlVXJsOiAnJyxcbiAgICAgICAgLy8gcmVwbGFjZTogdHJ1ZSxcbiAgICAgICAgLy8gdHJhbnNjbHVkZTogdHJ1ZSxcbiAgICAgICAgLy8gY29tcGlsZTogZnVuY3Rpb24odEVsZW1lbnQsIHRBdHRycywgZnVuY3Rpb24gdHJhbnNjbHVkZShmdW5jdGlvbihzY29wZSwgY2xvbmVMaW5raW5nRm4peyByZXR1cm4gZnVuY3Rpb24gbGlua2luZyhzY29wZSwgZWxtLCBhdHRycyl7fX0pKSxcbiAgICAgICAgbGluazogZnVuY3Rpb24oJHNjb3BlLCBpRWxtKSB7XG4gICAgICAgICAgICAvLyRsb2cuaW5mbygkc2NvcGUuYWN0aW9uKTtcbiAgICAgICAgICAgIGlFbG0ub24oJHNjb3BlLmFjdGlvbkV2ZW50IHx8ICdjbGljaycsICRzY29wZS5hY3Rpb24pO1xuICAgICAgICB9XG4gICAgfTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
