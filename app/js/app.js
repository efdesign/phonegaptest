var App = angular.module('sei', [
    'ui.router',
    'oc.lazyLoad',
    'ngMaterial'
]);


App.run(['$state', function run($state) { // $rootScope, $state, $stateParams, $window, $templateCache
    'use strict';
    
    $state.go('app.main');

    
}]);

if (typeof $ === 'undefined') {
    throw new Error('This application\'s JavaScript requires jQuery');
}


// or angular.element(document).ready...
$(document).ready(function() {
    'use strict';
        angular.bootstrap(document, ['sei']);
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
            debug: true,
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

    //  a static list of items in the software (used as basis for added items)
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


    // getting a default list of items
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
        remove:remove,
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

    // on swipe right, remove the item
    function remove(item){
        console.log('removing...'+item);
        addedItems.splice(addedItems.indexOf(item));
        showToast(item.name + ' rimosso');
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


App.directive('efBadge', ['$log', function($log){
    // Runs during compile
    'use strict';
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        scope: {
            efBadge:'='
        }, // {} = isolate, true = child, false/undefined = no change
        // controller: function($scope, $element, $attrs, $transclude) {},
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        template: '<div class="ef-badge"><ng-transclude></ng-transclude></div>',
        // templateUrl: '',
        replace: true,
        transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: function($scope) {
            $log.info($scope.efBadge);   
        }
    };
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5pbml0LmpzIiwiYXBwLmJvb3RzdHJhcC5qcyIsImFuZ3VsYXItbG9jYWxlX2l0LmpzIiwiY29uZmlnLmpzIiwiY29uc3RhbnRzLmFuZ2xlLm1kLmpzIiwic2VydmljZXMvYnJvd3Nlci5hbmdsZS5tZC5qcyIsInNlcnZpY2VzL3JvdXRlLWhlbHBlcnMuYW5nbGUuanMiLCJjb21wb25lbnRzL2ZhY2Vib29rL2ZhY2Vib29rLmNvbmZpZy5qcyIsImNvbXBvbmVudHMvZmFjZWJvb2svZmFjZWJvb2suc2VydmljZS5qcyIsInVuaXRzL21lYWxzaGFyZS9tZWFsc2hhcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBSSxNQUFNLFFBQVEsT0FBTyxPQUFPO0lBQzVCO0lBQ0E7SUFDQTs7OztBQUlKLElBQUksZUFBSSxTQUFTLElBQUksUUFBUTtJQUN6Qjs7SUFFQSxPQUFPLEdBQUc7Ozs7QUFJZDtBQ2RBLElBQUksT0FBTyxNQUFNLGFBQWE7SUFDMUIsTUFBTSxJQUFJLE1BQU07Ozs7O0FBS3BCLEVBQUUsVUFBVSxNQUFNLFdBQVc7SUFDekI7UUFDSSxRQUFRLFVBQVUsVUFBVSxDQUFDO0dBQ2xDO0FDVEg7QUFDQSxRQUFRLE9BQU8sWUFBWSxJQUFJLENBQUMsWUFBWSxTQUFTLFVBQVU7QUFDL0QsSUFBSSxrQkFBa0IsQ0FBQyxNQUFNLFFBQVEsS0FBSyxPQUFPLEtBQUssT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLE9BQU87QUFDOUYsU0FBUyxZQUFZLEdBQUc7RUFDdEIsSUFBSSxJQUFJO0VBQ1IsSUFBSSxJQUFJLEVBQUUsUUFBUTtFQUNsQixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFLFNBQVMsSUFBSTs7O0FBR3hDLFNBQVMsTUFBTSxHQUFHLGVBQWU7RUFDL0IsSUFBSSxJQUFJOztFQUVSLElBQUksY0FBYyxHQUFHO0lBQ25CLElBQUksS0FBSyxJQUFJLFlBQVksSUFBSTs7O0VBRy9CLElBQUksT0FBTyxLQUFL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TyxlQUFlLFNBQVMsT0FBTzs7Ozs7O0FBTTFELElBQUksVUFBVSxXQUFXLENBQUMsUUFBUSxTQUFTLEtBQUs7O0lBRTVDO0lBQ0EsT0FBTzs7OztRQUlILE9BQU87WUFDSCxRQUFROzs7OztRQUtaLFVBQVU7O1FBRVYsU0FBUztRQUNULFlBQVk7O1FBRVosTUFBTSxTQUFTLFFBQVE7WUFDbkIsS0FBSyxLQUFLLE9BQU87Ozs7QUFJN0IiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEFwcCA9IGFuZ3VsYXIubW9kdWxlKCdzZWknLCBbXG4gICAgJ3VpLnJvdXRlcicsXG4gICAgJ29jLmxhenlMb2FkJyxcbiAgICAnbmdNYXRlcmlhbCdcbl0pO1xuXG5cbkFwcC5ydW4oZnVuY3Rpb24gcnVuKCRzdGF0ZSkgeyAvLyAkcm9vdFNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcywgJHdpbmRvdywgJHRlbXBsYXRlQ2FjaGVcbiAgICAndXNlIHN0cmljdCc7XG4gICAgXG4gICAgJHN0YXRlLmdvKCdhcHAubWFpbicpO1xuXG4gICAgXG59KTtcbiIsImlmICh0eXBlb2YgJCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgYXBwbGljYXRpb25cXCdzIEphdmFTY3JpcHQgcmVxdWlyZXMgalF1ZXJ5Jyk7XG59XG5cblxuLy8gb3IgYW5ndWxhci5lbGVtZW50KGRvY3VtZW50KS5yZWFkeS4uLlxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgICAgICBhbmd1bGFyLmJvb3RzdHJhcChkb2N1bWVudCwgWydzZWknXSk7XG59KTsiLCIndXNlIHN0cmljdCc7XG5hbmd1bGFyLm1vZHVsZShcIm5nTG9jYWxlXCIsIFtdLCBbXCIkcHJvdmlkZVwiLCBmdW5jdGlvbigkcHJvdmlkZSkge1xudmFyIFBMVVJBTF9DQVRFR09SWSA9IHtaRVJPOiBcInplcm9cIiwgT05FOiBcIm9uZVwiLCBUV086IFwidHdvXCIsIEZFVzogXCJmZXdcIiwgTUFOWTogXCJtYW55XCIsIE9USEVSOiBcIm90aGVyXCJ9O1xuZnVuY3Rpb24gZ2V0RGVjaW1hbHMobikge1xuICBuID0gbiArICcnO1xuICB2YXIgaSA9IG4uaW5kZXhPZignLicpO1xuICByZXR1cm4gKGkgPT0gLTEpID8gMCA6IG4ubGVuZ3RoIC0gaSAtIDE7XG59XG5cbmZ1bmN0aW9uIGdldFZGKG4sIG9wdF9wcmVjaXNpb24pIHtcbiAgdmFyIHYgPSBvcHRfcHJlY2lzaW9uO1xuXG4gIGlmICh1bmRlZmluZWQgPT09IHYpIHtcbiAgICB2ID0gTWF0aC5taW4oZ2V0RGVjaW1hbHMobiksIDMpO1xuICB9XG5cbiAgdmFyIGJhc2UgPSBNYXRoLnBvdygxMCwgdik7XG4gIHZhciBmID0gKChuICogYmFzZSkgfCAwKSAlIGJhc2U7XG4gIHJldHVybiB7djogdiwgZjogZn07XG59XG5cbiRwcm92aWRlLnZhbHVlKFwiJGxvY2FsZVwiLCB7XG4gIFwiREFURVRJTUVfRk9STUFUU1wiOiB7XG4gICAgXCJBTVBNU1wiOiBbXG4gICAgICBcIkFNXCIsXG4gICAgICBcIlBNXCJcbiAgICBdLFxuICAgIFwiREFZXCI6IFtcbiAgICAgIFwiZG9tZW5pY2FcIixcbiAgICAgIFwibHVuZWRcXHUwMGVjXCIsXG4gICAgICBcIm1hcnRlZFxcdTAwZWNcIixcbiAgICAgIFwibWVyY29sZWRcXHUwMGVjXCIsXG4gICAgICBcImdpb3ZlZFxcdTAwZWNcIixcbiAgICAgIFwidmVuZXJkXFx1MDBlY1wiLFxuICAgICAgXCJzYWJhdG9cIlxuICAgIF0sXG4gICAgXCJNT05USFwiOiBbXG4gICAgICBcImdlbm5haW9cIixcbiAgICAgIFwiZmViYnJhaW9cIixcbiAgICAgIFwibWFyem9cIixcbiAgICAgIFwiYXByaWxlXCIsXG4gICAgICBcIm1hZ2dpb1wiLFxuICAgICAgXCJnaXVnbm9cIixcbiAgICAgIFwibHVnbGlvXCIsXG4gICAgICBcImFnb3N0b1wiLFxuICAgICAgXCJzZXR0ZW1icmVcIixcbiAgICAgIFwib3R0b2JyZVwiLFxuICAgICAgXCJub3ZlbWJyZVwiLFxuICAgICAgXCJkaWNlbWJyZVwiXG4gICAgXSxcbiAgICBcIlNIT1JUREFZXCI6IFtcbiAgICAgIFwiZG9tXCIsXG4gICAgICBcImx1blwiLFxuICAgICAgXCJtYXJcIixcbiAgICAgIFwibWVyXCIsXG4gICAgICBcImdpb1wiLFxuICAgICAgXCJ2ZW5cIixcbiAgICAgIFwic2FiXCJcbiAgICBdLFxuICAgIFwiU0hPUlRNT05USFwiOiBbXG4gICAgICBcImdlblwiLFxuICAgICAgXCJmZWJcIixcbiAgICAgIFwibWFyXCIsXG4gICAgICBcImFwclwiLFxuICAgICAgXCJtYWdcIixcbiAgICAgIFwiZ2l1XCIsXG4gICAgICBcImx1Z1wiLFxuICAgICAgXCJhZ29cIixcbiAgICAgIFwic2V0XCIsXG4gICAgICBcIm90dFwiLFxuICAgICAgXCJub3ZcIixcbiAgICAgIFwiZGljXCJcbiAgICBdLFxuICAgIFwiZnVsbERhdGVcIjogXCJFRUVFIGQgTU1NTSB5XCIsXG4gICAgXCJsb25nRGF0ZVwiOiBcImQgTU1NTSB5XCIsXG4gICAgXCJtZWRpdW1cIjogXCJkZCBNTU0geSBISDptbTpzc1wiLFxuICAgIFwibWVkaXVtRGF0ZVwiOiBcImRkL01NL3l5eXlcIixcbiAgICBcIm1lZGl1bVRpbWVcIjogXCJISDptbTpzc1wiLFxuICAgIFwic2hvcnRcIjogXCJkZC9NTS95eSBISDptbVwiLFxuICAgIFwic2hvcnREYXRlXCI6IFwiZGQvTU0veXlcIixcbiAgICBcInNob3J0VGltZVwiOiBcIkhIOm1tXCJcbiAgfSxcbiAgXCJOVU1CRVJfRk9STUFUU1wiOiB7XG4gICAgXCJDVVJSRU5DWV9TWU1cIjogXCJcXHUyMGFjXCIsXG4gICAgXCJERUNJTUFMX1NFUFwiOiBcIixcIixcbiAgICBcIkdST1VQX1NFUFwiOiBcIi5cIixcbiAgICBcIlBBVFRFUk5TXCI6IFtcbiAgICAgIHtcbiAgICAgICAgXCJnU2l6ZVwiOiAzLFxuICAgICAgICBcImxnU2l6ZVwiOiAzLFxuICAgICAgICBcIm1heEZyYWNcIjogMyxcbiAgICAgICAgXCJtaW5GcmFjXCI6IDAsXG4gICAgICAgIFwibWluSW50XCI6IDEsXG4gICAgICAgIFwibmVnUHJlXCI6IFwiLVwiLFxuICAgICAgICBcIm5lZ1N1ZlwiOiBcIlwiLFxuICAgICAgICBcInBvc1ByZVwiOiBcIlwiLFxuICAgICAgICBcInBvc1N1ZlwiOiBcIlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImdTaXplXCI6IDMsXG4gICAgICAgIFwibGdTaXplXCI6IDMsXG4gICAgICAgIFwibWF4RnJhY1wiOiAyLFxuICAgICAgICBcIm1pbkZyYWNcIjogMixcbiAgICAgICAgXCJtaW5JbnRcIjogMSxcbiAgICAgICAgXCJuZWdQcmVcIjogXCItXCIsXG4gICAgICAgIFwibmVnU3VmXCI6IFwiXFx1MDBhMFxcdTAwYTRcIixcbiAgICAgICAgXCJwb3NQcmVcIjogXCJcIixcbiAgICAgICAgXCJwb3NTdWZcIjogXCJcXHUwMGEwXFx1MDBhNFwiXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBcImlkXCI6IFwiaXRcIixcbiAgXCJwbHVyYWxDYXRcIjogZnVuY3Rpb24obiwgb3B0X3ByZWNpc2lvbikgeyAgdmFyIGkgPSBuIHwgMDsgIHZhciB2ZiA9IGdldFZGKG4sIG9wdF9wcmVjaXNpb24pOyAgaWYgKGkgPT0gMSAmJiB2Zi52ID09IDApIHsgICAgcmV0dXJuIFBMVVJBTF9DQVRFR09SWS5PTkU7ICB9ICByZXR1cm4gUExVUkFMX0NBVEVHT1JZLk9USEVSO31cbn0pO1xufV0pO1xuIiwiLyoqXG4gKlxuICogYmFzZVJvdXRpbmcgY29uZmlndXJhdGlvbiBleHByZXNzZWQgYXMgYSBjb3JlIGNvbmZpZyBibG9ja1xuICovXG5cbkFwcC5jb25maWcoWyckc3RhdGVQcm92aWRlcicsICckbG9jYXRpb25Qcm92aWRlcicsICckdXJsUm91dGVyUHJvdmlkZXInLCAnUm91dGVIZWxwZXJzUHJvdmlkZXInLFxuZnVuY3Rpb24gYmFzZVJvdXRpbmdDb25maWcoJHN0YXRlUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsIGhlbHBlcikge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gU2V0IHRoZSBmb2xsb3dpbmcgdG8gdHJ1ZSB0byBlbmFibGUgdGhlIEhUTUw1IE1vZGVcbiAgLy8gWW91IG1heSBoYXZlIHRvIHNldCA8YmFzZT4gdGFnIGluIGluZGV4IGFuZCBhIHJvdXRpbmcgY29uZmlndXJhdGlvbiBpbiB5b3VyIHNlcnZlclxuICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUoZmFsc2UpO1xuXG4gIC8vIGRlZmF1bHRzIHRvIGRhc2hib2FyZFxuICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvYXBwL3dlbGNvbWUnKTtcblxuXG5cblxuICAvL1xuICAvLyBBcHBsaWNhdGlvbiBSb3V0ZXNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgJHN0YXRlUHJvdmlkZXJcbiAgICAuc3RhdGUoJ2FwcCcsIHtcbiAgICAgICAgdXJsOiAnL2FwcCcsXG4gICAgICAgIGFic3RyYWN0OiB0cnVlLFxuICAgICAgICB0ZW1wbGF0ZVVybDogaGVscGVyLmJhc2VwYXRoKCdhcHAuaHRtbCcpLFxuICAgICAgICBjb250cm9sbGVyOiAnQXBwQ29udHJvbGxlcicsXG4gICAgICAgIHJlc29sdmU6IGhlbHBlci5yZXNvbHZlRm9yKFxuICAgICAgICAgICAgJ2Zhc3RjbGljaycsICAgIC8vIFBvbHlmaWxsIHRvIHJlbW92ZSBjbGljayBkZWxheXMgb24gYnJvd3NlcnMgd2l0aCB0b3VjaCBVSXNcbiAgICAgICAgICAgICdtb2Rlcm5penInXG4gICAgICAgICAgICAvLydtb21lbnQnXG4gICAgICAgICAgKVxuICAgIH0pXG5cbiAgICAuc3RhdGUoJ2FwcC5tYWluJyx7XG4gICAgICAgIHVybDonL21haW4nLFxuICAgICAgICBjb250cm9sbGVyOidBcHBDb250cm9sbGVyJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6IGhlbHBlci5iYXNlcGF0aCgnbWVhbHNoYXJlL21haW4uaHRtbCcpXG5cbiAgICB9KVxuXG5cbiAgIFxuXG5cbn1dKVxuXG4vKipcbiAqXG4gKiBob2xkcyB0aGUgYmFzZVJvdXRpbmcgY29uZmlndXJhdGlvblxuICovXG4gICAgLmNvbmZpZyhbJyRvY0xhenlMb2FkUHJvdmlkZXInLCAnQVBQX1JFUVVJUkVTJywgZnVuY3Rpb24gbGF6eUxvYWRDb25maWcoJG9jTGF6eUxvYWRQcm92aWRlciwgQVBQX1JFUVVJUkVTKSB7XG4gICAgICAgICd1c2Ugc3RyaWN0JztcblxuICAgICAgICAvLyBMYXp5IExvYWQgbW9kdWxlcyBjb25maWd1cmF0aW9uXG4gICAgICAgICRvY0xhenlMb2FkUHJvdmlkZXIuY29uZmlnKHtcbiAgICAgICAgICAgIGRlYnVnOiB0cnVlLFxuICAgICAgICAgICAgZXZlbnRzOiB0cnVlLFxuICAgICAgICAgICAgbW9kdWxlczogQVBQX1JFUVVJUkVTLm1vZHVsZXNcbiAgICAgICAgfSk7XG5cbiAgICB9XSlcblxuLmNvbmZpZyhmdW5jdGlvbigkbWRUaGVtaW5nUHJvdmlkZXIpIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZGVmYXVsdCcpXG4gICAgLnByaW1hcnlQYWxldHRlKCdwaW5rJylcbiAgICAuYWNjZW50UGFsZXR0ZSgnb3JhbmdlJyk7XG59KVxuXG4vKipcbiAqIGhvbGRzIHRoZSBhcHAgd2lkZSBjb25maWd1cmF0aW9uIGJsb2NrIHRvIGhvbGQgcmVmZXJlbmNlcyB0byByZWdpc3RlciBmdW5jdGlvbnMgKHRvIGhlbHAgbGF6eSBsb2FkaW5nIGFuZCBwb3N0IGNvbmZpZyBzZXJ2aWNlIHJlZ2lzdHJhdGlvbilcbiAqL1xuICAgIC5jb25maWcoWyckY29udHJvbGxlclByb3ZpZGVyJywgJyRjb21waWxlUHJvdmlkZXInLCAnJGZpbHRlclByb3ZpZGVyJywgJyRwcm92aWRlJyxcbiAgICAgICAgZnVuY3Rpb24gcHJvdmlkZXJIYW5kbGVyc0NvbmZpZygkY29udHJvbGxlclByb3ZpZGVyLCAkY29tcGlsZVByb3ZpZGVyLCAkZmlsdGVyUHJvdmlkZXIsICRwcm92aWRlKSB7XG4gICAgICAgICAgICAndXNlIHN0cmljdCc7XG4gICAgICAgICAgICAvLyByZWdpc3RlcmluZyBjb21wb25lbnRzIGFmdGVyIGJvb3RzdHJhcFxuICAgICAgICAgICAgQXBwLmNvbnRyb2xsZXIgPSAkY29udHJvbGxlclByb3ZpZGVyLnJlZ2lzdGVyO1xuICAgICAgICAgICAgQXBwLmRpcmVjdGl2ZSA9ICRjb21waWxlUHJvdmlkZXIuZGlyZWN0aXZlO1xuICAgICAgICAgICAgQXBwLmZpbHRlciA9ICRmaWx0ZXJQcm92aWRlci5yZWdpc3RlcjtcbiAgICAgICAgICAgIEFwcC5mYWN0b3J5ID0gJHByb3ZpZGUuZmFjdG9yeTtcbiAgICAgICAgICAgIEFwcC5zZXJ2aWNlID0gJHByb3ZpZGUuc2VydmljZTtcbiAgICAgICAgICAgIEFwcC5jb25zdGFudCA9ICRwcm92aWRlLmNvbnN0YW50O1xuICAgICAgICAgICAgQXBwLnZhbHVlID0gJHByb3ZpZGUudmFsdWU7XG5cbiAgICAgICAgfV0pXG5cbjtcbiIsIkFwcC5jb25zdGFudCgnQVBQX1JFUVVJUkVTJywge1xuICAgIC8vIGpRdWVyeSBiYXNlZCBhbmQgc3RhbmRhbG9uZSBzY3JpcHRzXG4gICAgc2NyaXB0czoge1xuICAgICAgICAnZmFzdGNsaWNrJzogWyd2ZW5kb3IvZmFzdGNsaWNrL2xpYi9mYXN0Y2xpY2suanMnXSxcbiAgICAgICAgJ21vZGVybml6cic6IFsndmVuZG9yL21vZGVybml6ci9tb2Rlcm5penIuanMnXSxcbiAgICAgICAgJ21vbWVudCc6IFsndmVuZG9yL21vbWVudC9taW4vbW9tZW50LXdpdGgtbG9jYWxlcy5taW4uanMnLFxuICAgICAgICAgICAgLy8ndmVuZG9yL21vbWVudC10aW1lem9uZS9idWlsZHMvbW9tZW50LXRpbWV6b25lLXdpdGgtZGF0YS5taW4uanMnXG4gICAgICAgIF1cbiAgICB9LFxuICAgIC8vIEFuZ3VsYXIgYmFzZWQgc2NyaXB0ICh1c2UgdGhlIHJpZ2h0IG1vZHVsZSBuYW1lKVxuICAgIG1vZHVsZXM6IFtdXG59KTtcbiIsIi8qKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogTW9kdWxlOiBicm93c2VyLmpzXG4gKiBCcm93c2VyIGRldGVjdGlvblxuID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG5cbkFwcC5zZXJ2aWNlKCdicm93c2VyJywgZnVuY3Rpb24oKXtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIG1hdGNoZWQsIGJyb3dzZXI7XG5cbiAgdmFyIHVhTWF0Y2ggPSBmdW5jdGlvbiggdWEgKSB7XG4gICAgdWEgPSB1YS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgdmFyIG1hdGNoID0gLyhvcHIpW1xcL10oW1xcdy5dKykvLmV4ZWMoIHVhICkgfHxcbiAgICAgIC8oY2hyb21lKVsgXFwvXShbXFx3Ll0rKS8uZXhlYyggdWEgKSB8fFxuICAgICAgLyh2ZXJzaW9uKVsgXFwvXShbXFx3Ll0rKS4qKHNhZmFyaSlbIFxcL10oW1xcdy5dKykvLmV4ZWMoIHVhICkgfHxcbiAgICAgIC8od2Via2l0KVsgXFwvXShbXFx3Ll0rKS8uZXhlYyggdWEgKSB8fFxuICAgICAgLyhvcGVyYSkoPzouKnZlcnNpb258KVsgXFwvXShbXFx3Ll0rKS8uZXhlYyggdWEgKSB8fFxuICAgICAgLyhtc2llKSAoW1xcdy5dKykvLmV4ZWMoIHVhICkgfHxcbiAgICAgIHVhLmluZGV4T2YoXCJ0cmlkZW50XCIpID49IDAgJiYgLyhydikoPzo6fCApKFtcXHcuXSspLy5leGVjKCB1YSApIHx8XG4gICAgICB1YS5pbmRleE9mKFwiY29tcGF0aWJsZVwiKSA8IDAgJiYgLyhtb3ppbGxhKSg/Oi4qPyBydjooW1xcdy5dKyl8KS8uZXhlYyggdWEgKSB8fFxuICAgICAgW107XG5cbiAgICB2YXIgcGxhdGZvcm1fbWF0Y2ggPSAvKGlwYWQpLy5leGVjKCB1YSApIHx8XG4gICAgICAvKGlwaG9uZSkvLmV4ZWMoIHVhICkgfHxcbiAgICAgIC8oYW5kcm9pZCkvLmV4ZWMoIHVhICkgfHxcbiAgICAgIC8od2luZG93cyBwaG9uZSkvLmV4ZWMoIHVhICkgfHxcbiAgICAgIC8od2luKS8uZXhlYyggdWEgKSB8fFxuICAgICAgLyhtYWMpLy5leGVjKCB1YSApIHx8XG4gICAgICAvKGxpbnV4KS8uZXhlYyggdWEgKSB8fFxuICAgICAgLyhjcm9zKS9pLmV4ZWMoIHVhICkgfHxcbiAgICAgIFtdO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGJyb3dzZXI6IG1hdGNoWyAzIF0gfHwgbWF0Y2hbIDEgXSB8fCBcIlwiLFxuICAgICAgdmVyc2lvbjogbWF0Y2hbIDIgXSB8fCBcIjBcIixcbiAgICAgIHBsYXRmb3JtOiBwbGF0Zm9ybV9tYXRjaFsgMCBdIHx8IFwiXCJcbiAgICB9O1xuICB9O1xuXG4gIG1hdGNoZWQgPSB1YU1hdGNoKCB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCApO1xuICBicm93c2VyID0ge307XG5cbiAgaWYgKCBtYXRjaGVkLmJyb3dzZXIgKSB7XG4gICAgYnJvd3NlclsgbWF0Y2hlZC5icm93c2VyIF0gPSB0cnVlO1xuICAgIGJyb3dzZXIudmVyc2lvbiA9IG1hdGNoZWQudmVyc2lvbjtcbiAgICBicm93c2VyLnZlcnNpb25OdW1iZXIgPSBwYXJzZUludChtYXRjaGVkLnZlcnNpb24pO1xuICB9XG5cbiAgaWYgKCBtYXRjaGVkLnBsYXRmb3JtICkge1xuICAgIGJyb3dzZXJbIG1hdGNoZWQucGxhdGZvcm0gXSA9IHRydWU7XG4gIH1cblxuICAvLyBUaGVzZSBhcmUgYWxsIGNvbnNpZGVyZWQgbW9iaWxlIHBsYXRmb3JtcywgbWVhbmluZyB0aGV5IHJ1biBhIG1vYmlsZSBicm93c2VyXG4gIGlmICggYnJvd3Nlci5hbmRyb2lkIHx8IGJyb3dzZXIuaXBhZCB8fCBicm93c2VyLmlwaG9uZSB8fCBicm93c2VyWyBcIndpbmRvd3MgcGhvbmVcIiBdICkge1xuICAgIGJyb3dzZXIubW9iaWxlID0gdHJ1ZTtcbiAgfVxuXG4gIC8vIFRoZXNlIGFyZSBhbGwgY29uc2lkZXJlZCBkZXNrdG9wIHBsYXRmb3JtcywgbWVhbmluZyB0aGV5IHJ1biBhIGRlc2t0b3AgYnJvd3NlclxuICBpZiAoIGJyb3dzZXIuY3JvcyB8fCBicm93c2VyLm1hYyB8fCBicm93c2VyLmxpbnV4IHx8IGJyb3dzZXIud2luICkge1xuICAgIGJyb3dzZXIuZGVza3RvcCA9IHRydWU7XG4gIH1cblxuICAvLyBDaHJvbWUsIE9wZXJhIDE1KyBhbmQgU2FmYXJpIGFyZSB3ZWJraXQgYmFzZWQgYnJvd3NlcnNcbiAgaWYgKCBicm93c2VyLmNocm9tZSB8fCBicm93c2VyLm9wciB8fCBicm93c2VyLnNhZmFyaSApIHtcbiAgICBicm93c2VyLndlYmtpdCA9IHRydWU7XG4gIH1cblxuICAvLyBJRTExIGhhcyBhIG5ldyB0b2tlbiBzbyB3ZSB3aWxsIGFzc2lnbiBpdCBtc2llIHRvIGF2b2lkIGJyZWFraW5nIGNoYW5nZXNcbiAgaWYgKCBicm93c2VyLnJ2IClcbiAge1xuICAgIHZhciBpZSA9IFwibXNpZVwiO1xuXG4gICAgbWF0Y2hlZC5icm93c2VyID0gaWU7XG4gICAgYnJvd3NlcltpZV0gPSB0cnVlO1xuICB9XG5cbiAgLy8gT3BlcmEgMTUrIGFyZSBpZGVudGlmaWVkIGFzIG9wclxuICBpZiAoIGJyb3dzZXIub3ByIClcbiAge1xuICAgIHZhciBvcGVyYSA9IFwib3BlcmFcIjtcblxuICAgIG1hdGNoZWQuYnJvd3NlciA9IG9wZXJhO1xuICAgIGJyb3dzZXJbb3BlcmFdID0gdHJ1ZTtcbiAgfVxuXG4gIC8vIFN0b2NrIEFuZHJvaWQgYnJvd3NlcnMgYXJlIG1hcmtlZCBhcyBTYWZhcmkgb24gQW5kcm9pZC5cbiAgaWYgKCBicm93c2VyLnNhZmFyaSAmJiBicm93c2VyLmFuZHJvaWQgKVxuICB7XG4gICAgdmFyIGFuZHJvaWQgPSBcImFuZHJvaWRcIjtcblxuICAgIG1hdGNoZWQuYnJvd3NlciA9IGFuZHJvaWQ7XG4gICAgYnJvd3NlclthbmRyb2lkXSA9IHRydWU7XG4gIH1cblxuICAvLyBBc3NpZ24gdGhlIG5hbWUgYW5kIHBsYXRmb3JtIHZhcmlhYmxlXG4gIGJyb3dzZXIubmFtZSA9IG1hdGNoZWQuYnJvd3NlcjtcbiAgYnJvd3Nlci5wbGF0Zm9ybSA9IG1hdGNoZWQucGxhdGZvcm07XG5cblxuICByZXR1cm4gYnJvd3NlcjtcblxufSk7IiwiLyoqPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBNb2R1bGU6IGhlbHBlcnMuanNcbiAqIFByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbnMgZm9yIHJvdXRlcyBkZWZpbml0aW9uXG4gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cblxuQXBwLnByb3ZpZGVyKCdSb3V0ZUhlbHBlcnMnLCBbJ0FQUF9SRVFVSVJFUycsIGZ1bmN0aW9uKGFwcFJlcXVpcmVzKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLy8gU2V0IGhlcmUgdGhlIGJhc2Ugb2YgdGhlIHJlbGF0aXZlIHBhdGhcbiAgICAvLyBmb3IgYWxsIGFwcCB2aWV3c1xuICAgIHRoaXMuYmFzZXBhdGggPSBmdW5jdGlvbih1cmkpIHtcbiAgICAgICAgcmV0dXJuICdhcHAvdmlld3MvJyArIHVyaTtcbiAgICB9O1xuXG4gICAgLy8gR2VuZXJhdGVzIGEgcmVzb2x2ZSBvYmplY3QgYnkgcGFzc2luZyBzY3JpcHQgbmFtZXNcbiAgICAvLyBwcmV2aW91c2x5IGNvbmZpZ3VyZWQgaW4gY29uc3RhbnQuQVBQX1JFUVVJUkVTXG4gICAgdGhpcy5yZXNvbHZlRm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBfYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRlcHM6IFsnJG9jTGF6eUxvYWQnLCAnJHEnLCBmdW5jdGlvbigkb2NMTCwgJHEpIHtcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGVzIGEgcHJvbWlzZSBjaGFpbiBmb3IgZWFjaCBhcmd1bWVudFxuICAgICAgICAgICAgICAgIHZhciBwcm9taXNlID0gJHEud2hlbigxKTsgLy8gZW1wdHkgcHJvbWlzZVxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBfYXJncy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBwcm9taXNlID0gYW5kVGhlbihfYXJnc1tpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBwcm9taXNlO1xuXG4gICAgICAgICAgICAgICAgLy8gY3JlYXRlcyBwcm9taXNlIHRvIGNoYWluIGR5bmFtaWNhbGx5XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gYW5kVGhlbihfYXJnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGFsc28gc3VwcG9ydCBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIHByb21pc2VcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBfYXJnID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKF9hcmcpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiBpcyBhIG1vZHVsZSwgcGFzcyB0aGUgbmFtZS4gSWYgbm90LCBwYXNzIHRoZSBhcnJheVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3aGF0VG9Mb2FkID0gZ2V0UmVxdWlyZWQoX2FyZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2ltcGxlIGVycm9yIGNoZWNrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF3aGF0VG9Mb2FkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkLmVycm9yKCdSb3V0ZSByZXNvbHZlOiBCYWQgcmVzb3VyY2UgbmFtZSBbJyArIF9hcmcgKyAnXScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmaW5hbGx5LCByZXR1cm4gYSBwcm9taXNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRvY0xMLmxvYWQod2hhdFRvTG9hZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBjaGVjayBhbmQgcmV0dXJucyByZXF1aXJlZCBkYXRhXG4gICAgICAgICAgICAgICAgLy8gYW5hbHl6ZSBtb2R1bGUgaXRlbXMgd2l0aCB0aGUgZm9ybSBbbmFtZTogJycsIGZpbGVzOiBbXV1cbiAgICAgICAgICAgICAgICAvLyBhbmQgYWxzbyBzaW1wbGUgYXJyYXkgb2Ygc2NyaXB0IGZpbGVzIChmb3Igbm90IGFuZ3VsYXIganMpXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZ2V0UmVxdWlyZWQobmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYXBwUmVxdWlyZXMubW9kdWxlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgbSBpbiBhcHBSZXF1aXJlcy5tb2R1bGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFwcFJlcXVpcmVzLm1vZHVsZXNbbV0ubmFtZSAmJiBhcHBSZXF1aXJlcy5tb2R1bGVzW21dLm5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFwcFJlcXVpcmVzLm1vZHVsZXNbbV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFwcFJlcXVpcmVzLnNjcmlwdHMgJiYgYXBwUmVxdWlyZXMuc2NyaXB0c1tuYW1lXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1dXG4gICAgICAgIH07XG4gICAgfTsgLy8gcmVzb2x2ZUZvclxuXG4gICAgLy8gbm90IG5lY2Vzc2FyeSwgb25seSB1c2VkIGluIGNvbmZpZyBibG9jayBmb3Igcm91dGVzXG4gICAgdGhpcy4kZ2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBiYXNlcGF0aDogdGhpcy5iYXNlcGF0aFxuICAgICAgICB9O1xuICAgIH07XG5cbn1dKTtcbiIsIiIsIiIsIi8vIEFwcC5jb25maWcoKTtcbi8vIFxuQXBwLmNvbnRyb2xsZXIoJ0FwcENvbnRyb2xsZXInLCBbJyRzY29wZScsICckcm9vdFNjb3BlJywgJyRtZFNpZGVuYXYnLCAnJG1kVG9hc3QnLCBmdW5jdGlvbigkc2NvcGUsICRyb290U2NvcGUsICRtZFNpZGVuYXYsICRtZFRvYXN0KSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLy8gc2ltcGxlIHRvYXN0IHN0cmluZ3NcbiAgICB2YXIgVE9BU1QgPSB7XG4gICAgICAgIE5PX0VMRU1FTlRTX1RPX1JFTU9WRTogJ05vbiBjaSBzb25vIGVsZW1lbnRpIGRhIHJpbXVvdmVyZSEnLFxuICAgIH1cblxuXG4gICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN1Y2Nlc3MnLCBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgc24gPSAkbWRTaWRlbmF2KCcubGVmdCcpO1xuICAgICAgICBjb25zb2xlLmxvZygnY2hhbmdpbmcnLCBzbik7XG4gICAgICAgIGlmIChzbi5pc09wZW4oKSkge1xuXG4gICAgICAgICAgICBzbi50b2dnbGUoKTsgLy8gY2xvc2UgdGhpcy4uLlxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBQTEFDRVMgKGdlb2xvY2F0aW9uLCBoaXN0b3J5IGV0YylcbiAgICAvKnZhciBwbGFjZXMgPSBbXG4gICAgICAgIHtuYW1lOidmZXJvbmlhJ30sXG4gICAgICAgIHtuYW1lOidjYW1idXNhJ30sXG4gICAgICAgIHtuYW1lOid0cml0dGljbyd9LFxuICAgICAgICB7bmFtZTonZm9ybm8nfSxcblxuICAgIF07Ki9cblxuICAgIHZhciBmcmllbmRzID0gW3tcbiAgICAgICAgbmFtZTogJyBEZWZhdWx0JyxcbiAgICAgICAgZ2VuZGVyOiAnaGltJyxcbiAgICAgICAgcG9ydHJhaXQ6ICdhcHAvaW1nL2dlbmVyaWMyLnBuZydcbiAgICB9LCB7XG4gICAgICAgIG5hbWU6ICdtYXJpbycsXG4gICAgICAgIGdlbmRlcjogJ2hpbScsXG4gICAgICAgIHBvcnRyYWl0OiAnYXBwL2ltZy9tYXJpby5qcGcnXG4gICAgfSwge1xuICAgICAgICBuYW1lOiAnbGF1cmEnLFxuICAgICAgICBnZW5kZXI6ICdoZXInLFxuICAgICAgICBwb3J0cmFpdDogJ2FwcC9pbWcvbGF1cmEuanBlZydcbiAgICB9LCB7XG4gICAgICAgIG5hbWU6ICdlbnJpY28nLFxuICAgICAgICBnZW5kZXI6ICdoaW0nLFxuICAgICAgICBwb3J0cmFpdDogJ2FwcC9pbWcvZW5yaWNvMi5qcGcnXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdmZXJkaW5hbmRvJyxcbiAgICAgICAgZ2VuZGVyOiAnaGltJyxcbiAgICAgICAgcG9ydHJhaXQ6ICdhcHAvaW1nL2ZlcmRpbmFuZG8uanBnJ1xuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnZ2lvcmRhbm8nLFxuICAgICAgICBnZW5kZXI6ICdoaW0nLFxuICAgICAgICBwb3J0cmFpdDogJ2FwcC9pbWcvZ2lvcmRhbm8uanBnJ1xuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnd2FsdGVyJyxcbiAgICAgICAgZ2VuZGVyOiAnaGltJyxcbiAgICAgICAgcG9ydHJhaXQ6ICdhcHAvaW1nL3dhbHRlci5qcGcnXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdyb2JlcnRvJyxcbiAgICAgICAgZ2VuZGVyOiAnaGltJyxcbiAgICAgICAgcG9ydHJhaXQ6ICdhcHAvaW1nL3JvYmVydG8uanBnJ1xuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAncm9zYXJpbycsXG4gICAgICAgIGdlbmRlcjogJ2hpbScsXG4gICAgICAgIHBvcnRyYWl0OiAnYXBwL2ltZy9yb3NhcmlvLmpwZydcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2ZhYmlvJyxcbiAgICAgICAgZ2VuZGVyOiAnaGltJyxcbiAgICAgICAgcG9ydHJhaXQ6ICdhcHAvaW1nL2ZhYmlvLmpwZydcbiAgICB9LCB7XG4gICAgICAgIG5hbWU6ICdwYW9sYScsXG4gICAgICAgIGdlbmRlcjogJ2hlcicsXG4gICAgICAgIHBvcnRyYWl0OiAnYXBwL2ltZy9wYW9sYS5qcGcnXG4gICAgfSx7XG4gICAgICAgIG5hbWU6ICdhbGVzc2lhJyxcbiAgICAgICAgZ2VuZGVyOiAnaGVyJyxcbiAgICAgICAgcG9ydHJhaXQ6ICdhcHAvaW1nL2FsZXNzaWEucG5nJ1xuICAgIH0se1xuICAgICAgICBuYW1lOiAnc2VyZW5hJyxcbiAgICAgICAgZ2VuZGVyOiAnaGVyJyxcbiAgICAgICAgcG9ydHJhaXQ6ICdhcHAvaW1nL3NlcmVuYS5qcGcnXG4gICAgfV07XG5cbiAgICAvLyAgYSBzdGF0aWMgbGlzdCBvZiBpdGVtcyBpbiB0aGUgc29mdHdhcmUgKHVzZWQgYXMgYmFzaXMgZm9yIGFkZGVkIGl0ZW1zKVxuICAgIHZhciBpdGVtcyA9IFt7XG4gICAgICAgICAgICBuYW1lOiAnY29ybmV0dG8nXG4gICAgICAgIH0sIC8vIDBcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ2NhcHB1Y2Npbm8nXG4gICAgICAgIH0sIC8vIDFcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ2NhZmbDqCdcbiAgICAgICAgfSwgLy8gMlxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnYWNxdWEnXG4gICAgICAgIH0sIC8vIDNcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ3N1Y2NvIGRpIGZydXR0YSdcbiAgICAgICAgfSAvLyA0XG5cbiAgICBdO1xuXG5cbiAgICAvLyBnZXR0aW5nIGEgZGVmYXVsdCBsaXN0IG9mIGl0ZW1zXG4gICAgdmFyIGFkZGVkSXRlbXMgPSBbXG4gICAgICAgIGl0ZW1zWzJdLCAvLyBjYWZmw6hcbiAgICAgICAgaXRlbXNbMV0sIC8vIGNhcHB1Y2Npbm9cbiAgICAgICAgaXRlbXNbMF0sIC8vIGNvcm5ldHRvICAgICAgICBcbiAgICBdO1xuXG4gICAgLy8gY29tcGFjdCB2aWV3ID9cbiAgICB2YXIgY29tcGFjdCA9IGZhbHNlO1xuICAgIHZhciBvcmRlckRldGFpbHNTaG93biA9IHRydWU7XG5cbiAgICB2YXIgZW1wdHlJdGVtID0ge1xuICAgICAgICAgICAgbmFtZTogJydcbiAgICAgICAgfTtcblxuICAgIC8vIGFsbCBmcmllbmQncyBvcmRlcnNcbiAgICB2YXIgYWxsRnJpZW5kcyA9IFtdO1xuXG5cblxuXG5cbiAgICAvKnZhciBncm91cHMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6J0NvbnN1bGVudGkgSUFEJyxcbiAgICAgICAgICAgIGZyaWVuZHM6W2ZyaWVuZHNbMF0sZnJpZW5kc1sxXV0sXG4gICAgICAgICAgICBwbGFjZTpwbGFjZXNbMV1cbiAgICAgICAgfSxcbiAgICAgICAgeyAgIG5hbWU6J1RlYW0gQ1UnLFxuICAgICAgICAgICAgZnJpZW5kczpmcmllbmRzLFxuICAgICAgICAgICAgcGxhY2U6cGxhY2VzWzBdXG4gICAgICAgIH1cbiAgICBdOyovXG5cbiAgICB2YXIgY3VycmVudCA9IGZyaWVuZHNbMF07IC8vIGRlZmF1bHQgZnJpZW5kXG5cblxuXG4gICAgLy8gZGRvLCBkYXRhICsgYXBpXG4gICAgJHNjb3BlLmFwcCA9IHtcbiAgICAgICAgLy8gdXNlciBwcmVmZXJlbmNlcyBhbmQgdXNlciBwcmVmIGFwaVxuICAgICAgICBoaW50czoge1xuICAgICAgICAgICAgZmFzdE1vZGU6IHRydWUsXG4gICAgICAgICAgICBoaWRlSGludDogZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmFwcC5oaW50c1trZXldID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIC8vIERBVEEgKG1vY2spXG4gICAgICAgIG5hbWU6ICdPcmRlciBJVCEnLFxuICAgICAgICBsb2dvOiAnYXBwL2ltZy95dW1tbHkucG5nJyxcbiAgICAgICAgd2VsY29tZUltYWdlOiAnYXBwL2ltZy9tZWFsc2hhcmUuc3ZnJyxcbiAgICAgICAgLy92ZXJzaW9uOicwLjAuMScsXG4gICAgICAgIHRpdGxlOiAnTWVhbFNoYXJlIScsXG4gICAgICAgIGZyaWVuZHM6IGZyaWVuZHMsXG4gICAgICAgIC8vZnJpZW5kc09uTWFwOiBmcmllbmRzLFxuICAgICAgICAvL3BsYWNlOntcbiAgICAgICAgLy8gIG5hbWU6J0VyIFBhbmluYXJvJ1xuICAgICAgICAvL30sXG4gICAgICAgIC8vIHJlZmVyZW5jZSB0byBtZVxuICAgICAgICBtZTogZnJpZW5kc1szXSxcbiAgICAgICAgLy9kZWZhdWx0OntcbiAgICAgICAgLy8gIGZyaWVuZDp7XG4gICAgICAgIC8vICAgICAgcG9ydHJhaXQ6ZnJpZW5kc1swXS5wb3J0cmFpdFxuICAgICAgICAvLyAgfSxcbiAgICAgICAgLy99LFxuICAgICAgICAvL2ludml0ZTp7XG4gICAgICAgIC8vICBmcmllbmQ6ZnJpZW5kc1swXSxcbiAgICAgICAgLy8gIG1lYWw6J2NvbGF6aW9uZScsXG4gICAgICAgIC8vfSxcbiAgICAgICAgLy9ncm91cHM6Z3JvdXBzLFxuICAgICAgICBpdGVtczogaXRlbXMsXG4gICAgICAgIC8vYWRkZWRJdGVtczphZGRlZEl0ZW1zLFxuICAgICAgICBvcmRlcjogYWRkZWRJdGVtcyxcbiAgICAgICAgLy8gQVBJc1xuICAgICAgICAvL2xvZ2luOntcbiAgICAgICAgLy8gIGNyZWRlbnRpYWxzTG9naW46Y3JlZGVudGlhbHNMb2dpbixcbiAgICAgICAgLy8gIGZhY2Vib29rTG9naW46ZmFjZWJvb2tMb2dpbixcbiAgICAgICAgLy8gIHJlY292ZXI6cmVjb3ZlclxuICAgICAgICAvL30sXG4gICAgICAgIGluY3JlbWVudDogaW5jcmVtZW50LFxuICAgICAgICBkZWNyZW1lbnQ6IGRlY3JlbWVudCxcbiAgICAgICAgb3JkZXJlZEl0ZW1zOiBvcmRlcmVkSXRlbXMsXG4gICAgICAgIHJlbW92ZTpyZW1vdmUsXG4gICAgICAgIC8vY2hlY2tJbjpjaGVja0luLFxuICAgICAgICAvL29wZW5MZWZ0TWVudTpvcGVuTGVmdE1lbnUsXG4gICAgICAgIC8vZ3JvdXA6e1xuICAgICAgICAvLyAgICBqb2luOmpvaW4sXG4gICAgICAgIC8vICAgIGpvaW5lZDpqb2luZWRcbiAgICAgICAgLy99LFxuICAgICAgICBjdXJyZW50OiBjdXJyZW50LFxuICAgICAgICBzZXRDdXJyZW50OiBzZXRDdXJyZW50LFxuICAgICAgICBnZXRDdXJyZW50OiBnZXRDdXJyZW50LFxuICAgICAgICBjb21wYWN0OiBjb21wYWN0LFxuICAgICAgICAvLyBpbnRlcmZhY2UgdXRpbGl0eSBhcGlzXG4gICAgICAgIHRvZ2dsZUNvbXBhY3Q6dG9nZ2xlQ29tcGFjdCxcbiAgICAgICAgY2xlYXJPcmRlcnM6Y2xlYXJPcmRlcnMsXG4gICAgICAgIGFkZE9yZGVySXRlbTphZGRPcmRlckl0ZW0sXG4gICAgICAgIGdldEFsbEZyaWVuZHM6Z2V0QWxsRnJpZW5kcyxcbiAgICAgICAgdG9nZ2xlT3JkZXJEZXRhaWxzOnRvZ2dsZU9yZGVyRGV0YWlsc1xuXG4gICAgICAgICAgICAvLyBHZW5lcmljIGFwaVxuICAgICAgICAgICAgLy9uYXZpZ2F0ZTpuYXZpZ2F0ZSBcbiAgICB9O1xuXG4gICAgLy8gQVBJXG4gICAgLy8gbG9naW5cbiAgICAvKmZ1bmN0aW9uIGNyZWRlbnRpYWxzTG9naW4oKXtcbiAgICAgICAgY29uc29sZS5sb2coJ2NyZWRlbnRpYWxzTG9naW4nKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmYWNlYm9va0xvZ2luKCl7XG4gICAgICAgIGNvbnNvbGUubG9nKCdmYWNlYm9va0xvZ2luJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVjb3Zlcigpe1xuICAgICAgICBjb25zb2xlLmxvZygncmVjb3ZlcicpO1xuICAgIH1cbiAgICAvLyBwbGFjZXMgLyBnZW9cbiAgICBmdW5jdGlvbiBjaGVja0luKCl7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjaGVja0luJyk7XG4gICAgICAgICRzdGF0ZS5nbygnYXBwLm1hcCcpO1xuICAgIH0qL1xuICAgIC8vIGFkZGVkIGl0ZW1zXG4gICAgZnVuY3Rpb24gaW5jcmVtZW50KGl0ZW0pIHtcbiAgICAgICAgLy8gdGhpcyBzaG91bGQgbm90IGJlIGhlcmUuLi5cbiAgICAgICAgaWYgKCFpdGVtLmZyaWVuZHMpIHtcbiAgICAgICAgICAgIGl0ZW0uZnJpZW5kcyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGl0ZW0uZnJpZW5kcy5wdXNoKGN1cnJlbnQpO1xuXG4gICAgICAgIGFsbEZyaWVuZHMgPSBjYWxjdWxhdGVBbGxGcmllbmRPcmRlcnMoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWNyZW1lbnQoaXRlbSkge1xuICAgICAgICBpZiAoIWl0ZW0uZnJpZW5kcykge1xuICAgICAgICAgICAgaXRlbS5mcmllbmRzID0gW107XG4gICAgICAgICAgICBzaG93VG9hc3QoVE9BU1QuTk9fRUxFTUVOVFNfVE9fUkVNT1ZFKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBpZHggPSBpdGVtLmZyaWVuZHMuaW5kZXhPZihjdXJyZW50KTtcbiAgICAgICAgICAgIGlmIChpZHggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIG9ubHkgb24gaW5kZXggZm91bmRcbiAgICAgICAgICAgICAgICBpdGVtLmZyaWVuZHMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNob3dUb2FzdChjdXJyZW50Lm5hbWUgKyAnIG5vbiBoYSBvcmRpbmF0byB1biAnICsgaXRlbS5uYW1lICsgJyAhISEnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGFsbEZyaWVuZHMgPSBjYWxjdWxhdGVBbGxGcmllbmRPcmRlcnMoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRDdXJyZW50KGZyaWVuZCkge1xuICAgICAgICBjdXJyZW50ID0gZnJpZW5kO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEN1cnJlbnQoKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ2dldCBjdXJyZW50Jyk7XG4gICAgICAgIHJldHVybiBjdXJyZW50O1xuICAgIH1cbiAgICAvKlxuICAgIGZ1bmN0aW9uIGpvaW4oZ3JvdXApe1xuICAgICAgICBjb25zb2xlLmxvZygnam9pbiBncm91cCcsZ3JvdXApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGpvaW5lZChncm91cCx3aG8pe1xuICAgICAgICBjb25zb2xlLmxvZygnam9pbmVkIGdyb3VwIHdobycsZ3JvdXAsd2hvKTtcbiAgICAgICAgcmV0dXJuIGdyb3VwLmZyaWVuZHMuaW5kZXhPZih3aG8pID4gMCA/IHRydWUgOiBmYWxzZTtcbiAgICB9Ki9cblxuICAgIC8vIGNvbnRyb2wgbGF5b3V0XG4gICAgLy8gZnVuY3Rpb24gb3BlbkxlZnRNZW51KCkge1xuICAgIC8vICAgICAkbWRTaWRlbmF2KCdsZWZ0Jykub3BlbigpO1xuICAgIC8vIH1cblxuICAgIGZ1bmN0aW9uIHNob3dUb2FzdChtc2cpIHtcbiAgICAgICAgJG1kVG9hc3Quc2hvdyhcbiAgICAgICAgICAgICRtZFRvYXN0LnNpbXBsZSgpLmNvbnRlbnQobXNnKS5oaWRlRGVsYXkoNjAwMClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYWxjdWxhdGVBbGxGcmllbmRPcmRlcnMoKXtcbiAgICAgICAgcmV0dXJuIGFkZGVkSXRlbXMucmVkdWNlKGZ1bmN0aW9uKG4sIHkpIHtcbiAgICAgICAgICAgIHZhciBjYyA9IHkuZnJpZW5kcyB8fCBbXTtcbiAgICAgICAgICAgIHJldHVybiBuLmNvbmNhdChjYyk7XG4gICAgICAgICAgICAvL3JldHVybiBnbG9iYWxBcnJheS5jb25jYXQoeS5mcmllbmRzIHx8IFtdKTtcbiAgICAgICAgfSwgW10pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9yZGVyZWRJdGVtcyhmcmllbmQpIHtcbiAgICAgICAgLy8gYWxsRnJpZW5kcyA9IFtdO1xuICAgICAgICAvLyBjYW4gb3B0aW1pemUgdGhpcyB0byBqdXN0IGRvIGl0IG9uICsgYW5kIC1cbiAgICAgICAgLy8gcmVkdWNlIG4gc29tZUFycmF5LmZyaWVuZCBsaXN0IHRvIG9uZSBiaWcgbGlzdFxuICAgICAgICBcblxuICAgICAgICAvLyBmaWx0ZXIgdG8gZmluZCB0aGUgY3VycmVudCBvbmVcbiAgICAgICAgcmV0dXJuIGFsbEZyaWVuZHMuZmlsdGVyKGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgICAgIHJldHVybiB4ID09PSBmcmllbmQ7XG4gICAgICAgIH0pLmxlbmd0aDtcblxuXG4gICAgfVxuXG4gICAgLy8gb24gc3dpcGUgcmlnaHQsIHJlbW92ZSB0aGUgaXRlbVxuICAgIGZ1bmN0aW9uIHJlbW92ZShpdGVtKXtcbiAgICAgICAgY29uc29sZS5sb2coJ3JlbW92aW5nLi4uJytpdGVtKTtcbiAgICAgICAgYWRkZWRJdGVtcy5zcGxpY2UoYWRkZWRJdGVtcy5pbmRleE9mKGl0ZW0pKTtcbiAgICAgICAgc2hvd1RvYXN0KGl0ZW0ubmFtZSArICcgcmltb3NzbycpO1xuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gdG9nZ2xlQ29tcGFjdCgpe1xuICAgICAgICAvL2NvbnNvbGUubG9nKCd0b2dnbGVDb21wYWN0Jyk7XG4gICAgICAgICRzY29wZS5hcHAuY29tcGFjdCA9ICEkc2NvcGUuYXBwLmNvbXBhY3Q7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9nZ2xlT3JkZXJEZXRhaWxzKCl7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ3RvZ2dsZU9yZGVyRGV0YWlscycpO1xuICAgICAgICAkc2NvcGUuYXBwLm9yZGVyRGV0YWlsc1Nob3duID0gISRzY29wZS5hcHAub3JkZXJEZXRhaWxzU2hvd247XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYXJPcmRlcnMoKXtcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKGFkZGVkSXRlbXMsIGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgICAgICAgIHZhbHVlLmZyaWVuZHMgPSBbXTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYWxsRnJpZW5kcyA9IGNhbGN1bGF0ZUFsbEZyaWVuZE9yZGVycygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZE9yZGVySXRlbSgpe1xuICAgICAgICBhZGRlZEl0ZW1zLnB1c2goYW5ndWxhci5jb3B5KGVtcHR5SXRlbSkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEFsbEZyaWVuZHMoKXtcbiAgICAgICAgcmV0dXJuIGFsbEZyaWVuZHM7XG4gICAgfVxuXG5cbiAgICAvL2Z1bmN0aW9uIG5hdmlnYXRlKHJvdXRlKXtcbiAgICAvLyAgICAkc3RhdGUuZ28ocm91dGUpO1xuICAgIC8vICAgICRtZFNpZGVuYXYoJ2xlZnQnKS5jbG9zZSgpO1xuICAgIC8vfVxuXG59XSlcblxuLmZpbHRlcignY2FwaXRhbGl6ZScsZnVuY3Rpb24oKXtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGlucHV0KXtcbiAgICAgICAgcmV0dXJuIGlucHV0LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgaW5wdXQuc2xpY2UoMSk7XG4gICAgfVxufSlcblxuLmRpcmVjdGl2ZSgnYWN0aW9uJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gUnVucyBkdXJpbmcgY29tcGlsZVxuICAgICd1c2Ugc3RyaWN0JztcbiAgICByZXR1cm4ge1xuICAgICAgICAvLyBuYW1lOiAnJyxcbiAgICAgICAgLy8gcHJpb3JpdHk6IDEsXG4gICAgICAgIC8vIHRlcm1pbmFsOiB0cnVlLFxuICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgYWN0aW9uOiAnJicsXG4gICAgICAgICAgICBhY3Rpb25FdmVudDogJ0AnXG4gICAgICAgIH0sIC8vIHt9ID0gaXNvbGF0ZSwgdHJ1ZSA9IGNoaWxkLCBmYWxzZS91bmRlZmluZWQgPSBubyBjaGFuZ2VcbiAgICAgICAgLy8gY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkdHJhbnNjbHVkZSkge30sXG4gICAgICAgIC8vIHJlcXVpcmU6ICduZ01vZGVsJywgLy8gQXJyYXkgPSBtdWx0aXBsZSByZXF1aXJlcywgPyA9IG9wdGlvbmFsLCBeID0gY2hlY2sgcGFyZW50IGVsZW1lbnRzXG4gICAgICAgIC8vIHJlc3RyaWN0OiAnQScsIC8vIEUgPSBFbGVtZW50LCBBID0gQXR0cmlidXRlLCBDID0gQ2xhc3MsIE0gPSBDb21tZW50XG4gICAgICAgIC8vIHRlbXBsYXRlOiAnJyxcbiAgICAgICAgLy8gdGVtcGxhdGVVcmw6ICcnLFxuICAgICAgICAvLyByZXBsYWNlOiB0cnVlLFxuICAgICAgICAvLyB0cmFuc2NsdWRlOiB0cnVlLFxuICAgICAgICAvLyBjb21waWxlOiBmdW5jdGlvbih0RWxlbWVudCwgdEF0dHJzLCBmdW5jdGlvbiB0cmFuc2NsdWRlKGZ1bmN0aW9uKHNjb3BlLCBjbG9uZUxpbmtpbmdGbil7IHJldHVybiBmdW5jdGlvbiBsaW5raW5nKHNjb3BlLCBlbG0sIGF0dHJzKXt9fSkpLFxuICAgICAgICBsaW5rOiBmdW5jdGlvbigkc2NvcGUsIGlFbG0pIHtcbiAgICAgICAgICAgIC8vJGxvZy5pbmZvKCRzY29wZS5hY3Rpb24pO1xuICAgICAgICAgICAgaUVsbS5vbigkc2NvcGUuYWN0aW9uRXZlbnQgfHwgJ2NsaWNrJywgJHNjb3BlLmFjdGlvbik7XG4gICAgICAgIH1cbiAgICB9O1xufSk7XG5cblxuQXBwLmRpcmVjdGl2ZSgnZWZCYWRnZScsIFsnJGxvZycsIGZ1bmN0aW9uKCRsb2cpe1xuICAgIC8vIFJ1bnMgZHVyaW5nIGNvbXBpbGVcbiAgICAndXNlIHN0cmljdCc7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgLy8gbmFtZTogJycsXG4gICAgICAgIC8vIHByaW9yaXR5OiAxLFxuICAgICAgICAvLyB0ZXJtaW5hbDogdHJ1ZSxcbiAgICAgICAgc2NvcGU6IHtcbiAgICAgICAgICAgIGVmQmFkZ2U6Jz0nXG4gICAgICAgIH0sIC8vIHt9ID0gaXNvbGF0ZSwgdHJ1ZSA9IGNoaWxkLCBmYWxzZS91bmRlZmluZWQgPSBubyBjaGFuZ2VcbiAgICAgICAgLy8gY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkdHJhbnNjbHVkZSkge30sXG4gICAgICAgIC8vIHJlcXVpcmU6ICduZ01vZGVsJywgLy8gQXJyYXkgPSBtdWx0aXBsZSByZXF1aXJlcywgPyA9IG9wdGlvbmFsLCBeID0gY2hlY2sgcGFyZW50IGVsZW1lbnRzXG4gICAgICAgIC8vIHJlc3RyaWN0OiAnQScsIC8vIEUgPSBFbGVtZW50LCBBID0gQXR0cmlidXRlLCBDID0gQ2xhc3MsIE0gPSBDb21tZW50XG4gICAgICAgIHRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cImVmLWJhZGdlXCI+PG5nLXRyYW5zY2x1ZGU+PC9uZy10cmFuc2NsdWRlPjwvZGl2PicsXG4gICAgICAgIC8vIHRlbXBsYXRlVXJsOiAnJyxcbiAgICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgICAgdHJhbnNjbHVkZTogdHJ1ZSxcbiAgICAgICAgLy8gY29tcGlsZTogZnVuY3Rpb24odEVsZW1lbnQsIHRBdHRycywgZnVuY3Rpb24gdHJhbnNjbHVkZShmdW5jdGlvbihzY29wZSwgY2xvbmVMaW5raW5nRm4peyByZXR1cm4gZnVuY3Rpb24gbGlua2luZyhzY29wZSwgZWxtLCBhdHRycyl7fX0pKSxcbiAgICAgICAgbGluazogZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgICAgICAkbG9nLmluZm8oJHNjb3BlLmVmQmFkZ2UpOyAgIFxuICAgICAgICB9XG4gICAgfTtcbn1dKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
