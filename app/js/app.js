var App = angular.module('sei', [
    'ui.router',
    //'oc.lazyLoad',
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
        controller: 'AppController'
        //,
        //resolve: helper.resolveFor(
        //    'fastclick',    // Polyfill to remove click delays on browsers with touch UIs
        //    'modernizr'
            //'moment'
        //  )
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
    /*.config(['$ocLazyLoadProvider', 'APP_REQUIRES', function lazyLoadConfig($ocLazyLoadProvider, APP_REQUIRES) {
        'use strict';

        // Lazy Load modules configuration
        $ocLazyLoadProvider.config({
            debug: true,
            events: true,
            modules: APP_REQUIRES.modules
        });

    }])*/

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5pbml0LmpzIiwiYXBwLmJvb3RzdHJhcC5qcyIsImFuZ3VsYXItbG9jYWxlX2l0LmpzIiwiY29uZmlnLmpzIiwiY29uc3RhbnRzLmFuZ2xlLm1kLmpzIiwic2VydmljZXMvYnJvd3Nlci5hbmdsZS5tZC5qcyIsInNlcnZpY2VzL3JvdXRlLWhlbHBlcnMuYW5nbGUuanMiLCJjb21wb25lbnRzL2ZhY2Vib29rL2ZhY2Vib29rLmNvbmZpZy5qcyIsImNvbXBvbmVudHMvZmFjZWJvb2svZmFjZWJvb2suc2VydmljZS5qcyIsInVuaXRzL21lYWxzaGFyZS9tZWFsc2hhcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBSSxNQUFNLFFBQVEsT0FBTyxPQUFPO0lBQzVCOztJQUVBOzs7O0FBSUosSUFBSSxlQUFJLFNBQVMsSUFBSSxRQUFRO0lBQ3pCOztJQUVBLE9BQU8sR0FBRzs7OztBQUlkO0FDZEEsSUFBSSxPQUFPLE1BQU0sYUFBYTtJQUMxQixNQUFNLElBQUksTUFBTTs7Ozs7QUFLcEIsRUFBRSxVQUFVLE1BQU0sV0FBVztJQUN6QjtRQUNJLFFBQVEsVUFBVSxVQUFVLENBQUM7R0FDbEM7QUNUSDtBQUNBLFFBQVEsT0FBTyxZQUFZLElBQUksQ0FBQyxZQUFZLFNBQVMsVUFBVTtBQUMvRCxJQUFJLGtCQUFrQixDQUFDLE1BQU0sUUFBUSxLQUFLLE9BQU8sS0FBSyxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsT0FBTztBQUM5RixTQUFTLFlBQVksR0FBRztFQUN0QixJQUFJLElBQUk7RUFDUixJQUFJLElBQUksRUFBRSxRQUFRO0VBQ2xCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUUsU0FBUyxJQUFJOzs7QUFHeEMsU0FBUyxNQUFNLEdBQUcsZUFBZTtFQUMvQixJQUFJLElBQUk7O0VBRVIsSUFBSSxjQUFjLEdBQUc7SUFDbkIsSUFBSSxLQUFLLElBQUksWUFBWSxJQUFJOzs7RUFHL0IsSUFBSSxPQUFPLEtBQUssSUFB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QUNULFlBQVk7O1FBRVosTUFBTSxTQUFTLFFBQVE7WUFDbkIsS0FBSyxLQUFLLE9BQU87Ozs7QUFJN0IiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEFwcCA9IGFuZ3VsYXIubW9kdWxlKCdzZWknLCBbXG4gICAgJ3VpLnJvdXRlcicsXG4gICAgLy8nb2MubGF6eUxvYWQnLFxuICAgICduZ01hdGVyaWFsJ1xuXSk7XG5cblxuQXBwLnJ1bihmdW5jdGlvbiBydW4oJHN0YXRlKSB7IC8vICRyb290U2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zLCAkd2luZG93LCAkdGVtcGxhdGVDYWNoZVxuICAgICd1c2Ugc3RyaWN0JztcbiAgICBcbiAgICAkc3RhdGUuZ28oJ2FwcC5tYWluJyk7XG5cbiAgICBcbn0pO1xuIiwiaWYgKHR5cGVvZiAkID09PSAndW5kZWZpbmVkJykge1xuICAgIHRocm93IG5ldyBFcnJvcignVGhpcyBhcHBsaWNhdGlvblxcJ3MgSmF2YVNjcmlwdCByZXF1aXJlcyBqUXVlcnknKTtcbn1cblxuXG4vLyBvciBhbmd1bGFyLmVsZW1lbnQoZG9jdW1lbnQpLnJlYWR5Li4uXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgICAgIGFuZ3VsYXIuYm9vdHN0cmFwKGRvY3VtZW50LCBbJ3NlaSddKTtcbn0pOyIsIid1c2Ugc3RyaWN0JztcbmFuZ3VsYXIubW9kdWxlKFwibmdMb2NhbGVcIiwgW10sIFtcIiRwcm92aWRlXCIsIGZ1bmN0aW9uKCRwcm92aWRlKSB7XG52YXIgUExVUkFMX0NBVEVHT1JZID0ge1pFUk86IFwiemVyb1wiLCBPTkU6IFwib25lXCIsIFRXTzogXCJ0d29cIiwgRkVXOiBcImZld1wiLCBNQU5ZOiBcIm1hbnlcIiwgT1RIRVI6IFwib3RoZXJcIn07XG5mdW5jdGlvbiBnZXREZWNpbWFscyhuKSB7XG4gIG4gPSBuICsgJyc7XG4gIHZhciBpID0gbi5pbmRleE9mKCcuJyk7XG4gIHJldHVybiAoaSA9PSAtMSkgPyAwIDogbi5sZW5ndGggLSBpIC0gMTtcbn1cblxuZnVuY3Rpb24gZ2V0VkYobiwgb3B0X3ByZWNpc2lvbikge1xuICB2YXIgdiA9IG9wdF9wcmVjaXNpb247XG5cbiAgaWYgKHVuZGVmaW5lZCA9PT0gdikge1xuICAgIHYgPSBNYXRoLm1pbihnZXREZWNpbWFscyhuKSwgMyk7XG4gIH1cblxuICB2YXIgYmFzZSA9IE1hdGgucG93KDEwLCB2KTtcbiAgdmFyIGYgPSAoKG4gKiBiYXNlKSB8IDApICUgYmFzZTtcbiAgcmV0dXJuIHt2OiB2LCBmOiBmfTtcbn1cblxuJHByb3ZpZGUudmFsdWUoXCIkbG9jYWxlXCIsIHtcbiAgXCJEQVRFVElNRV9GT1JNQVRTXCI6IHtcbiAgICBcIkFNUE1TXCI6IFtcbiAgICAgIFwiQU1cIixcbiAgICAgIFwiUE1cIlxuICAgIF0sXG4gICAgXCJEQVlcIjogW1xuICAgICAgXCJkb21lbmljYVwiLFxuICAgICAgXCJsdW5lZFxcdTAwZWNcIixcbiAgICAgIFwibWFydGVkXFx1MDBlY1wiLFxuICAgICAgXCJtZXJjb2xlZFxcdTAwZWNcIixcbiAgICAgIFwiZ2lvdmVkXFx1MDBlY1wiLFxuICAgICAgXCJ2ZW5lcmRcXHUwMGVjXCIsXG4gICAgICBcInNhYmF0b1wiXG4gICAgXSxcbiAgICBcIk1PTlRIXCI6IFtcbiAgICAgIFwiZ2VubmFpb1wiLFxuICAgICAgXCJmZWJicmFpb1wiLFxuICAgICAgXCJtYXJ6b1wiLFxuICAgICAgXCJhcHJpbGVcIixcbiAgICAgIFwibWFnZ2lvXCIsXG4gICAgICBcImdpdWdub1wiLFxuICAgICAgXCJsdWdsaW9cIixcbiAgICAgIFwiYWdvc3RvXCIsXG4gICAgICBcInNldHRlbWJyZVwiLFxuICAgICAgXCJvdHRvYnJlXCIsXG4gICAgICBcIm5vdmVtYnJlXCIsXG4gICAgICBcImRpY2VtYnJlXCJcbiAgICBdLFxuICAgIFwiU0hPUlREQVlcIjogW1xuICAgICAgXCJkb21cIixcbiAgICAgIFwibHVuXCIsXG4gICAgICBcIm1hclwiLFxuICAgICAgXCJtZXJcIixcbiAgICAgIFwiZ2lvXCIsXG4gICAgICBcInZlblwiLFxuICAgICAgXCJzYWJcIlxuICAgIF0sXG4gICAgXCJTSE9SVE1PTlRIXCI6IFtcbiAgICAgIFwiZ2VuXCIsXG4gICAgICBcImZlYlwiLFxuICAgICAgXCJtYXJcIixcbiAgICAgIFwiYXByXCIsXG4gICAgICBcIm1hZ1wiLFxuICAgICAgXCJnaXVcIixcbiAgICAgIFwibHVnXCIsXG4gICAgICBcImFnb1wiLFxuICAgICAgXCJzZXRcIixcbiAgICAgIFwib3R0XCIsXG4gICAgICBcIm5vdlwiLFxuICAgICAgXCJkaWNcIlxuICAgIF0sXG4gICAgXCJmdWxsRGF0ZVwiOiBcIkVFRUUgZCBNTU1NIHlcIixcbiAgICBcImxvbmdEYXRlXCI6IFwiZCBNTU1NIHlcIixcbiAgICBcIm1lZGl1bVwiOiBcImRkIE1NTSB5IEhIOm1tOnNzXCIsXG4gICAgXCJtZWRpdW1EYXRlXCI6IFwiZGQvTU0veXl5eVwiLFxuICAgIFwibWVkaXVtVGltZVwiOiBcIkhIOm1tOnNzXCIsXG4gICAgXCJzaG9ydFwiOiBcImRkL01NL3l5IEhIOm1tXCIsXG4gICAgXCJzaG9ydERhdGVcIjogXCJkZC9NTS95eVwiLFxuICAgIFwic2hvcnRUaW1lXCI6IFwiSEg6bW1cIlxuICB9LFxuICBcIk5VTUJFUl9GT1JNQVRTXCI6IHtcbiAgICBcIkNVUlJFTkNZX1NZTVwiOiBcIlxcdTIwYWNcIixcbiAgICBcIkRFQ0lNQUxfU0VQXCI6IFwiLFwiLFxuICAgIFwiR1JPVVBfU0VQXCI6IFwiLlwiLFxuICAgIFwiUEFUVEVSTlNcIjogW1xuICAgICAge1xuICAgICAgICBcImdTaXplXCI6IDMsXG4gICAgICAgIFwibGdTaXplXCI6IDMsXG4gICAgICAgIFwibWF4RnJhY1wiOiAzLFxuICAgICAgICBcIm1pbkZyYWNcIjogMCxcbiAgICAgICAgXCJtaW5JbnRcIjogMSxcbiAgICAgICAgXCJuZWdQcmVcIjogXCItXCIsXG4gICAgICAgIFwibmVnU3VmXCI6IFwiXCIsXG4gICAgICAgIFwicG9zUHJlXCI6IFwiXCIsXG4gICAgICAgIFwicG9zU3VmXCI6IFwiXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiZ1NpemVcIjogMyxcbiAgICAgICAgXCJsZ1NpemVcIjogMyxcbiAgICAgICAgXCJtYXhGcmFjXCI6IDIsXG4gICAgICAgIFwibWluRnJhY1wiOiAyLFxuICAgICAgICBcIm1pbkludFwiOiAxLFxuICAgICAgICBcIm5lZ1ByZVwiOiBcIi1cIixcbiAgICAgICAgXCJuZWdTdWZcIjogXCJcXHUwMGEwXFx1MDBhNFwiLFxuICAgICAgICBcInBvc1ByZVwiOiBcIlwiLFxuICAgICAgICBcInBvc1N1ZlwiOiBcIlxcdTAwYTBcXHUwMGE0XCJcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIFwiaWRcIjogXCJpdFwiLFxuICBcInBsdXJhbENhdFwiOiBmdW5jdGlvbihuLCBvcHRfcHJlY2lzaW9uKSB7ICB2YXIgaSA9IG4gfCAwOyAgdmFyIHZmID0gZ2V0VkYobiwgb3B0X3ByZWNpc2lvbik7ICBpZiAoaSA9PSAxICYmIHZmLnYgPT0gMCkgeyAgICByZXR1cm4gUExVUkFMX0NBVEVHT1JZLk9ORTsgIH0gIHJldHVybiBQTFVSQUxfQ0FURUdPUlkuT1RIRVI7fVxufSk7XG59XSk7XG4iLCIvKipcbiAqXG4gKiBiYXNlUm91dGluZyBjb25maWd1cmF0aW9uIGV4cHJlc3NlZCBhcyBhIGNvcmUgY29uZmlnIGJsb2NrXG4gKi9cblxuQXBwLmNvbmZpZyhbJyRzdGF0ZVByb3ZpZGVyJywgJyRsb2NhdGlvblByb3ZpZGVyJywgJyR1cmxSb3V0ZXJQcm92aWRlcicsICdSb3V0ZUhlbHBlcnNQcm92aWRlcicsXG5mdW5jdGlvbiBiYXNlUm91dGluZ0NvbmZpZygkc3RhdGVQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciwgaGVscGVyKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBTZXQgdGhlIGZvbGxvd2luZyB0byB0cnVlIHRvIGVuYWJsZSB0aGUgSFRNTDUgTW9kZVxuICAvLyBZb3UgbWF5IGhhdmUgdG8gc2V0IDxiYXNlPiB0YWcgaW4gaW5kZXggYW5kIGEgcm91dGluZyBjb25maWd1cmF0aW9uIGluIHlvdXIgc2VydmVyXG4gICRsb2NhdGlvblByb3ZpZGVyLmh0bWw1TW9kZShmYWxzZSk7XG5cbiAgLy8gZGVmYXVsdHMgdG8gZGFzaGJvYXJkXG4gICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9hcHAvd2VsY29tZScpO1xuXG5cblxuXG4gIC8vXG4gIC8vIEFwcGxpY2F0aW9uIFJvdXRlc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAkc3RhdGVQcm92aWRlclxuICAgIC5zdGF0ZSgnYXBwJywge1xuICAgICAgICB1cmw6ICcvYXBwJyxcbiAgICAgICAgYWJzdHJhY3Q6IHRydWUsXG4gICAgICAgIHRlbXBsYXRlVXJsOiBoZWxwZXIuYmFzZXBhdGgoJ2FwcC5odG1sJyksXG4gICAgICAgIGNvbnRyb2xsZXI6ICdBcHBDb250cm9sbGVyJ1xuICAgICAgICAvLyxcbiAgICAgICAgLy9yZXNvbHZlOiBoZWxwZXIucmVzb2x2ZUZvcihcbiAgICAgICAgLy8gICAgJ2Zhc3RjbGljaycsICAgIC8vIFBvbHlmaWxsIHRvIHJlbW92ZSBjbGljayBkZWxheXMgb24gYnJvd3NlcnMgd2l0aCB0b3VjaCBVSXNcbiAgICAgICAgLy8gICAgJ21vZGVybml6cidcbiAgICAgICAgICAgIC8vJ21vbWVudCdcbiAgICAgICAgLy8gIClcbiAgICB9KVxuXG4gICAgLnN0YXRlKCdhcHAubWFpbicse1xuICAgICAgICB1cmw6Jy9tYWluJyxcbiAgICAgICAgY29udHJvbGxlcjonQXBwQ29udHJvbGxlcicsXG4gICAgICAgIHRlbXBsYXRlVXJsOiBoZWxwZXIuYmFzZXBhdGgoJ21lYWxzaGFyZS9tYWluLmh0bWwnKVxuXG4gICAgfSlcblxuXG4gICBcblxuXG59XSlcblxuLyoqXG4gKlxuICogaG9sZHMgdGhlIGJhc2VSb3V0aW5nIGNvbmZpZ3VyYXRpb25cbiAqL1xuICAgIC8qLmNvbmZpZyhbJyRvY0xhenlMb2FkUHJvdmlkZXInLCAnQVBQX1JFUVVJUkVTJywgZnVuY3Rpb24gbGF6eUxvYWRDb25maWcoJG9jTGF6eUxvYWRQcm92aWRlciwgQVBQX1JFUVVJUkVTKSB7XG4gICAgICAgICd1c2Ugc3RyaWN0JztcblxuICAgICAgICAvLyBMYXp5IExvYWQgbW9kdWxlcyBjb25maWd1cmF0aW9uXG4gICAgICAgICRvY0xhenlMb2FkUHJvdmlkZXIuY29uZmlnKHtcbiAgICAgICAgICAgIGRlYnVnOiB0cnVlLFxuICAgICAgICAgICAgZXZlbnRzOiB0cnVlLFxuICAgICAgICAgICAgbW9kdWxlczogQVBQX1JFUVVJUkVTLm1vZHVsZXNcbiAgICAgICAgfSk7XG5cbiAgICB9XSkqL1xuXG4uY29uZmlnKGZ1bmN0aW9uKCRtZFRoZW1pbmdQcm92aWRlcikge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkZWZhdWx0JylcbiAgICAucHJpbWFyeVBhbGV0dGUoJ3BpbmsnKVxuICAgIC5hY2NlbnRQYWxldHRlKCdvcmFuZ2UnKTtcbn0pXG5cbi8qKlxuICogaG9sZHMgdGhlIGFwcCB3aWRlIGNvbmZpZ3VyYXRpb24gYmxvY2sgdG8gaG9sZCByZWZlcmVuY2VzIHRvIHJlZ2lzdGVyIGZ1bmN0aW9ucyAodG8gaGVscCBsYXp5IGxvYWRpbmcgYW5kIHBvc3QgY29uZmlnIHNlcnZpY2UgcmVnaXN0cmF0aW9uKVxuICovXG4gICAgLmNvbmZpZyhbJyRjb250cm9sbGVyUHJvdmlkZXInLCAnJGNvbXBpbGVQcm92aWRlcicsICckZmlsdGVyUHJvdmlkZXInLCAnJHByb3ZpZGUnLFxuICAgICAgICBmdW5jdGlvbiBwcm92aWRlckhhbmRsZXJzQ29uZmlnKCRjb250cm9sbGVyUHJvdmlkZXIsICRjb21waWxlUHJvdmlkZXIsICRmaWx0ZXJQcm92aWRlciwgJHByb3ZpZGUpIHtcbiAgICAgICAgICAgICd1c2Ugc3RyaWN0JztcbiAgICAgICAgICAgIC8vIHJlZ2lzdGVyaW5nIGNvbXBvbmVudHMgYWZ0ZXIgYm9vdHN0cmFwXG4gICAgICAgICAgICBBcHAuY29udHJvbGxlciA9ICRjb250cm9sbGVyUHJvdmlkZXIucmVnaXN0ZXI7XG4gICAgICAgICAgICBBcHAuZGlyZWN0aXZlID0gJGNvbXBpbGVQcm92aWRlci5kaXJlY3RpdmU7XG4gICAgICAgICAgICBBcHAuZmlsdGVyID0gJGZpbHRlclByb3ZpZGVyLnJlZ2lzdGVyO1xuICAgICAgICAgICAgQXBwLmZhY3RvcnkgPSAkcHJvdmlkZS5mYWN0b3J5O1xuICAgICAgICAgICAgQXBwLnNlcnZpY2UgPSAkcHJvdmlkZS5zZXJ2aWNlO1xuICAgICAgICAgICAgQXBwLmNvbnN0YW50ID0gJHByb3ZpZGUuY29uc3RhbnQ7XG4gICAgICAgICAgICBBcHAudmFsdWUgPSAkcHJvdmlkZS52YWx1ZTtcblxuICAgICAgICB9XSlcblxuO1xuIiwiQXBwLmNvbnN0YW50KCdBUFBfUkVRVUlSRVMnLCB7XG4gICAgLy8galF1ZXJ5IGJhc2VkIGFuZCBzdGFuZGFsb25lIHNjcmlwdHNcbiAgICBzY3JpcHRzOiB7XG4gICAgICAgICdmYXN0Y2xpY2snOiBbJ3ZlbmRvci9mYXN0Y2xpY2svbGliL2Zhc3RjbGljay5qcyddLFxuICAgICAgICAnbW9kZXJuaXpyJzogWyd2ZW5kb3IvbW9kZXJuaXpyL21vZGVybml6ci5qcyddLFxuICAgICAgICAnbW9tZW50JzogWyd2ZW5kb3IvbW9tZW50L21pbi9tb21lbnQtd2l0aC1sb2NhbGVzLm1pbi5qcycsXG4gICAgICAgICAgICAvLyd2ZW5kb3IvbW9tZW50LXRpbWV6b25lL2J1aWxkcy9tb21lbnQtdGltZXpvbmUtd2l0aC1kYXRhLm1pbi5qcydcbiAgICAgICAgXVxuICAgIH0sXG4gICAgLy8gQW5ndWxhciBiYXNlZCBzY3JpcHQgKHVzZSB0aGUgcmlnaHQgbW9kdWxlIG5hbWUpXG4gICAgbW9kdWxlczogW11cbn0pO1xuIiwiLyoqPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBNb2R1bGU6IGJyb3dzZXIuanNcbiAqIEJyb3dzZXIgZGV0ZWN0aW9uXG4gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cblxuQXBwLnNlcnZpY2UoJ2Jyb3dzZXInLCBmdW5jdGlvbigpe1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgbWF0Y2hlZCwgYnJvd3NlcjtcblxuICB2YXIgdWFNYXRjaCA9IGZ1bmN0aW9uKCB1YSApIHtcbiAgICB1YSA9IHVhLnRvTG93ZXJDYXNlKCk7XG5cbiAgICB2YXIgbWF0Y2ggPSAvKG9wcilbXFwvXShbXFx3Ll0rKS8uZXhlYyggdWEgKSB8fFxuICAgICAgLyhjaHJvbWUpWyBcXC9dKFtcXHcuXSspLy5leGVjKCB1YSApIHx8XG4gICAgICAvKHZlcnNpb24pWyBcXC9dKFtcXHcuXSspLiooc2FmYXJpKVsgXFwvXShbXFx3Ll0rKS8uZXhlYyggdWEgKSB8fFxuICAgICAgLyh3ZWJraXQpWyBcXC9dKFtcXHcuXSspLy5leGVjKCB1YSApIHx8XG4gICAgICAvKG9wZXJhKSg/Oi4qdmVyc2lvbnwpWyBcXC9dKFtcXHcuXSspLy5leGVjKCB1YSApIHx8XG4gICAgICAvKG1zaWUpIChbXFx3Ll0rKS8uZXhlYyggdWEgKSB8fFxuICAgICAgdWEuaW5kZXhPZihcInRyaWRlbnRcIikgPj0gMCAmJiAvKHJ2KSg/Ojp8ICkoW1xcdy5dKykvLmV4ZWMoIHVhICkgfHxcbiAgICAgIHVhLmluZGV4T2YoXCJjb21wYXRpYmxlXCIpIDwgMCAmJiAvKG1vemlsbGEpKD86Lio/IHJ2OihbXFx3Ll0rKXwpLy5leGVjKCB1YSApIHx8XG4gICAgICBbXTtcblxuICAgIHZhciBwbGF0Zm9ybV9tYXRjaCA9IC8oaXBhZCkvLmV4ZWMoIHVhICkgfHxcbiAgICAgIC8oaXBob25lKS8uZXhlYyggdWEgKSB8fFxuICAgICAgLyhhbmRyb2lkKS8uZXhlYyggdWEgKSB8fFxuICAgICAgLyh3aW5kb3dzIHBob25lKS8uZXhlYyggdWEgKSB8fFxuICAgICAgLyh3aW4pLy5leGVjKCB1YSApIHx8XG4gICAgICAvKG1hYykvLmV4ZWMoIHVhICkgfHxcbiAgICAgIC8obGludXgpLy5leGVjKCB1YSApIHx8XG4gICAgICAvKGNyb3MpL2kuZXhlYyggdWEgKSB8fFxuICAgICAgW107XG5cbiAgICByZXR1cm4ge1xuICAgICAgYnJvd3NlcjogbWF0Y2hbIDMgXSB8fCBtYXRjaFsgMSBdIHx8IFwiXCIsXG4gICAgICB2ZXJzaW9uOiBtYXRjaFsgMiBdIHx8IFwiMFwiLFxuICAgICAgcGxhdGZvcm06IHBsYXRmb3JtX21hdGNoWyAwIF0gfHwgXCJcIlxuICAgIH07XG4gIH07XG5cbiAgbWF0Y2hlZCA9IHVhTWF0Y2goIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50ICk7XG4gIGJyb3dzZXIgPSB7fTtcblxuICBpZiAoIG1hdGNoZWQuYnJvd3NlciApIHtcbiAgICBicm93c2VyWyBtYXRjaGVkLmJyb3dzZXIgXSA9IHRydWU7XG4gICAgYnJvd3Nlci52ZXJzaW9uID0gbWF0Y2hlZC52ZXJzaW9uO1xuICAgIGJyb3dzZXIudmVyc2lvbk51bWJlciA9IHBhcnNlSW50KG1hdGNoZWQudmVyc2lvbik7XG4gIH1cblxuICBpZiAoIG1hdGNoZWQucGxhdGZvcm0gKSB7XG4gICAgYnJvd3NlclsgbWF0Y2hlZC5wbGF0Zm9ybSBdID0gdHJ1ZTtcbiAgfVxuXG4gIC8vIFRoZXNlIGFyZSBhbGwgY29uc2lkZXJlZCBtb2JpbGUgcGxhdGZvcm1zLCBtZWFuaW5nIHRoZXkgcnVuIGEgbW9iaWxlIGJyb3dzZXJcbiAgaWYgKCBicm93c2VyLmFuZHJvaWQgfHwgYnJvd3Nlci5pcGFkIHx8IGJyb3dzZXIuaXBob25lIHx8IGJyb3dzZXJbIFwid2luZG93cyBwaG9uZVwiIF0gKSB7XG4gICAgYnJvd3Nlci5tb2JpbGUgPSB0cnVlO1xuICB9XG5cbiAgLy8gVGhlc2UgYXJlIGFsbCBjb25zaWRlcmVkIGRlc2t0b3AgcGxhdGZvcm1zLCBtZWFuaW5nIHRoZXkgcnVuIGEgZGVza3RvcCBicm93c2VyXG4gIGlmICggYnJvd3Nlci5jcm9zIHx8IGJyb3dzZXIubWFjIHx8IGJyb3dzZXIubGludXggfHwgYnJvd3Nlci53aW4gKSB7XG4gICAgYnJvd3Nlci5kZXNrdG9wID0gdHJ1ZTtcbiAgfVxuXG4gIC8vIENocm9tZSwgT3BlcmEgMTUrIGFuZCBTYWZhcmkgYXJlIHdlYmtpdCBiYXNlZCBicm93c2Vyc1xuICBpZiAoIGJyb3dzZXIuY2hyb21lIHx8IGJyb3dzZXIub3ByIHx8IGJyb3dzZXIuc2FmYXJpICkge1xuICAgIGJyb3dzZXIud2Via2l0ID0gdHJ1ZTtcbiAgfVxuXG4gIC8vIElFMTEgaGFzIGEgbmV3IHRva2VuIHNvIHdlIHdpbGwgYXNzaWduIGl0IG1zaWUgdG8gYXZvaWQgYnJlYWtpbmcgY2hhbmdlc1xuICBpZiAoIGJyb3dzZXIucnYgKVxuICB7XG4gICAgdmFyIGllID0gXCJtc2llXCI7XG5cbiAgICBtYXRjaGVkLmJyb3dzZXIgPSBpZTtcbiAgICBicm93c2VyW2llXSA9IHRydWU7XG4gIH1cblxuICAvLyBPcGVyYSAxNSsgYXJlIGlkZW50aWZpZWQgYXMgb3ByXG4gIGlmICggYnJvd3Nlci5vcHIgKVxuICB7XG4gICAgdmFyIG9wZXJhID0gXCJvcGVyYVwiO1xuXG4gICAgbWF0Y2hlZC5icm93c2VyID0gb3BlcmE7XG4gICAgYnJvd3NlcltvcGVyYV0gPSB0cnVlO1xuICB9XG5cbiAgLy8gU3RvY2sgQW5kcm9pZCBicm93c2VycyBhcmUgbWFya2VkIGFzIFNhZmFyaSBvbiBBbmRyb2lkLlxuICBpZiAoIGJyb3dzZXIuc2FmYXJpICYmIGJyb3dzZXIuYW5kcm9pZCApXG4gIHtcbiAgICB2YXIgYW5kcm9pZCA9IFwiYW5kcm9pZFwiO1xuXG4gICAgbWF0Y2hlZC5icm93c2VyID0gYW5kcm9pZDtcbiAgICBicm93c2VyW2FuZHJvaWRdID0gdHJ1ZTtcbiAgfVxuXG4gIC8vIEFzc2lnbiB0aGUgbmFtZSBhbmQgcGxhdGZvcm0gdmFyaWFibGVcbiAgYnJvd3Nlci5uYW1lID0gbWF0Y2hlZC5icm93c2VyO1xuICBicm93c2VyLnBsYXRmb3JtID0gbWF0Y2hlZC5wbGF0Zm9ybTtcblxuXG4gIHJldHVybiBicm93c2VyO1xuXG59KTsiLCIvKio9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIE1vZHVsZTogaGVscGVycy5qc1xuICogUHJvdmlkZXMgaGVscGVyIGZ1bmN0aW9ucyBmb3Igcm91dGVzIGRlZmluaXRpb25cbiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuXG5BcHAucHJvdmlkZXIoJ1JvdXRlSGVscGVycycsIFsnQVBQX1JFUVVJUkVTJywgZnVuY3Rpb24oYXBwUmVxdWlyZXMpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICAvLyBTZXQgaGVyZSB0aGUgYmFzZSBvZiB0aGUgcmVsYXRpdmUgcGF0aFxuICAgIC8vIGZvciBhbGwgYXBwIHZpZXdzXG4gICAgdGhpcy5iYXNlcGF0aCA9IGZ1bmN0aW9uKHVyaSkge1xuICAgICAgICByZXR1cm4gJ2FwcC92aWV3cy8nICsgdXJpO1xuICAgIH07XG5cbiAgICAvLyBHZW5lcmF0ZXMgYSByZXNvbHZlIG9iamVjdCBieSBwYXNzaW5nIHNjcmlwdCBuYW1lc1xuICAgIC8vIHByZXZpb3VzbHkgY29uZmlndXJlZCBpbiBjb25zdGFudC5BUFBfUkVRVUlSRVNcbiAgICB0aGlzLnJlc29sdmVGb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIF9hcmdzID0gYXJndW1lbnRzO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGVwczogWyckb2NMYXp5TG9hZCcsICckcScsIGZ1bmN0aW9uKCRvY0xMLCAkcSkge1xuICAgICAgICAgICAgICAgIC8vIENyZWF0ZXMgYSBwcm9taXNlIGNoYWluIGZvciBlYWNoIGFyZ3VtZW50XG4gICAgICAgICAgICAgICAgdmFyIHByb21pc2UgPSAkcS53aGVuKDEpOyAvLyBlbXB0eSBwcm9taXNlXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IF9hcmdzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb21pc2UgPSBhbmRUaGVuKF9hcmdzW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb21pc2U7XG5cbiAgICAgICAgICAgICAgICAvLyBjcmVhdGVzIHByb21pc2UgdG8gY2hhaW4gZHluYW1pY2FsbHlcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBhbmRUaGVuKF9hcmcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gYWxzbyBzdXBwb3J0IGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgcHJvbWlzZVxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIF9hcmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm9taXNlLnRoZW4oX2FyZyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIGlzIGEgbW9kdWxlLCBwYXNzIHRoZSBuYW1lLiBJZiBub3QsIHBhc3MgdGhlIGFycmF5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHdoYXRUb0xvYWQgPSBnZXRSZXF1aXJlZChfYXJnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzaW1wbGUgZXJyb3IgY2hlY2tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXdoYXRUb0xvYWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICQuZXJyb3IoJ1JvdXRlIHJlc29sdmU6IEJhZCByZXNvdXJjZSBuYW1lIFsnICsgX2FyZyArICddJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZpbmFsbHksIHJldHVybiBhIHByb21pc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJG9jTEwubG9hZCh3aGF0VG9Mb2FkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGFuZCByZXR1cm5zIHJlcXVpcmVkIGRhdGFcbiAgICAgICAgICAgICAgICAvLyBhbmFseXplIG1vZHVsZSBpdGVtcyB3aXRoIHRoZSBmb3JtIFtuYW1lOiAnJywgZmlsZXM6IFtdXVxuICAgICAgICAgICAgICAgIC8vIGFuZCBhbHNvIHNpbXBsZSBhcnJheSBvZiBzY3JpcHQgZmlsZXMgKGZvciBub3QgYW5ndWxhciBqcylcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBnZXRSZXF1aXJlZChuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhcHBSZXF1aXJlcy5tb2R1bGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBtIGluIGFwcFJlcXVpcmVzLm1vZHVsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXBwUmVxdWlyZXMubW9kdWxlc1ttXS5uYW1lICYmIGFwcFJlcXVpcmVzLm1vZHVsZXNbbV0ubmFtZSA9PT0gbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXBwUmVxdWlyZXMubW9kdWxlc1ttXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXBwUmVxdWlyZXMuc2NyaXB0cyAmJiBhcHBSZXF1aXJlcy5zY3JpcHRzW25hbWVdO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfV1cbiAgICAgICAgfTtcbiAgICB9OyAvLyByZXNvbHZlRm9yXG5cbiAgICAvLyBub3QgbmVjZXNzYXJ5LCBvbmx5IHVzZWQgaW4gY29uZmlnIGJsb2NrIGZvciByb3V0ZXNcbiAgICB0aGlzLiRnZXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJhc2VwYXRoOiB0aGlzLmJhc2VwYXRoXG4gICAgICAgIH07XG4gICAgfTtcblxufV0pO1xuIiwiIiwiIiwiLy8gQXBwLmNvbmZpZygpO1xuLy8gXG5BcHAuY29udHJvbGxlcignQXBwQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJyRyb290U2NvcGUnLCAnJG1kU2lkZW5hdicsICckbWRUb2FzdCcsIGZ1bmN0aW9uKCRzY29wZSwgJHJvb3RTY29wZSwgJG1kU2lkZW5hdiwgJG1kVG9hc3QpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICAvLyBzaW1wbGUgdG9hc3Qgc3RyaW5nc1xuICAgIHZhciBUT0FTVCA9IHtcbiAgICAgICAgTk9fRUxFTUVOVFNfVE9fUkVNT1ZFOiAnTm9uIGNpIHNvbm8gZWxlbWVudGkgZGEgcmltdW92ZXJlIScsXG4gICAgfVxuXG5cbiAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3VjY2VzcycsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBzbiA9ICRtZFNpZGVuYXYoJy5sZWZ0Jyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjaGFuZ2luZycsIHNuKTtcbiAgICAgICAgaWYgKHNuLmlzT3BlbigpKSB7XG5cbiAgICAgICAgICAgIHNuLnRvZ2dsZSgpOyAvLyBjbG9zZSB0aGlzLi4uXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIFBMQUNFUyAoZ2VvbG9jYXRpb24sIGhpc3RvcnkgZXRjKVxuICAgIC8qdmFyIHBsYWNlcyA9IFtcbiAgICAgICAge25hbWU6J2Zlcm9uaWEnfSxcbiAgICAgICAge25hbWU6J2NhbWJ1c2EnfSxcbiAgICAgICAge25hbWU6J3RyaXR0aWNvJ30sXG4gICAgICAgIHtuYW1lOidmb3Jubyd9LFxuXG4gICAgXTsqL1xuXG4gICAgdmFyIGZyaWVuZHMgPSBbe1xuICAgICAgICBuYW1lOiAnIERlZmF1bHQnLFxuICAgICAgICBnZW5kZXI6ICdoaW0nLFxuICAgICAgICBwb3J0cmFpdDogJ2FwcC9pbWcvZ2VuZXJpYzIucG5nJ1xuICAgIH0sIHtcbiAgICAgICAgbmFtZTogJ21hcmlvJyxcbiAgICAgICAgZ2VuZGVyOiAnaGltJyxcbiAgICAgICAgcG9ydHJhaXQ6ICdhcHAvaW1nL21hcmlvLmpwZydcbiAgICB9LCB7XG4gICAgICAgIG5hbWU6ICdsYXVyYScsXG4gICAgICAgIGdlbmRlcjogJ2hlcicsXG4gICAgICAgIHBvcnRyYWl0OiAnYXBwL2ltZy9sYXVyYS5qcGVnJ1xuICAgIH0sIHtcbiAgICAgICAgbmFtZTogJ2VucmljbycsXG4gICAgICAgIGdlbmRlcjogJ2hpbScsXG4gICAgICAgIHBvcnRyYWl0OiAnYXBwL2ltZy9lbnJpY28yLmpwZydcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ2ZlcmRpbmFuZG8nLFxuICAgICAgICBnZW5kZXI6ICdoaW0nLFxuICAgICAgICBwb3J0cmFpdDogJ2FwcC9pbWcvZmVyZGluYW5kby5qcGcnXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdnaW9yZGFubycsXG4gICAgICAgIGdlbmRlcjogJ2hpbScsXG4gICAgICAgIHBvcnRyYWl0OiAnYXBwL2ltZy9naW9yZGFuby5qcGcnXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICd3YWx0ZXInLFxuICAgICAgICBnZW5kZXI6ICdoaW0nLFxuICAgICAgICBwb3J0cmFpdDogJ2FwcC9pbWcvd2FsdGVyLmpwZydcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ3JvYmVydG8nLFxuICAgICAgICBnZW5kZXI6ICdoaW0nLFxuICAgICAgICBwb3J0cmFpdDogJ2FwcC9pbWcvcm9iZXJ0by5qcGcnXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdyb3NhcmlvJyxcbiAgICAgICAgZ2VuZGVyOiAnaGltJyxcbiAgICAgICAgcG9ydHJhaXQ6ICdhcHAvaW1nL3Jvc2FyaW8uanBnJ1xuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnZmFiaW8nLFxuICAgICAgICBnZW5kZXI6ICdoaW0nLFxuICAgICAgICBwb3J0cmFpdDogJ2FwcC9pbWcvZmFiaW8uanBnJ1xuICAgIH0sIHtcbiAgICAgICAgbmFtZTogJ3Bhb2xhJyxcbiAgICAgICAgZ2VuZGVyOiAnaGVyJyxcbiAgICAgICAgcG9ydHJhaXQ6ICdhcHAvaW1nL3Bhb2xhLmpwZydcbiAgICB9LHtcbiAgICAgICAgbmFtZTogJ2FsZXNzaWEnLFxuICAgICAgICBnZW5kZXI6ICdoZXInLFxuICAgICAgICBwb3J0cmFpdDogJ2FwcC9pbWcvYWxlc3NpYS5wbmcnXG4gICAgfSx7XG4gICAgICAgIG5hbWU6ICdzZXJlbmEnLFxuICAgICAgICBnZW5kZXI6ICdoZXInLFxuICAgICAgICBwb3J0cmFpdDogJ2FwcC9pbWcvc2VyZW5hLmpwZydcbiAgICB9XTtcblxuICAgIC8vICBhIHN0YXRpYyBsaXN0IG9mIGl0ZW1zIGluIHRoZSBzb2Z0d2FyZSAodXNlZCBhcyBiYXNpcyBmb3IgYWRkZWQgaXRlbXMpXG4gICAgdmFyIGl0ZW1zID0gW3tcbiAgICAgICAgICAgIG5hbWU6ICdjb3JuZXR0bydcbiAgICAgICAgfSwgLy8gMFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnY2FwcHVjY2lubydcbiAgICAgICAgfSwgLy8gMVxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnY2FmZsOoJ1xuICAgICAgICB9LCAvLyAyXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdhY3F1YSdcbiAgICAgICAgfSwgLy8gM1xuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnc3VjY28gZGkgZnJ1dHRhJ1xuICAgICAgICB9IC8vIDRcblxuICAgIF07XG5cblxuICAgIC8vIGdldHRpbmcgYSBkZWZhdWx0IGxpc3Qgb2YgaXRlbXNcbiAgICB2YXIgYWRkZWRJdGVtcyA9IFtcbiAgICAgICAgaXRlbXNbMl0sIC8vIGNhZmbDqFxuICAgICAgICBpdGVtc1sxXSwgLy8gY2FwcHVjY2lub1xuICAgICAgICBpdGVtc1swXSwgLy8gY29ybmV0dG8gICAgICAgIFxuICAgIF07XG5cbiAgICAvLyBjb21wYWN0IHZpZXcgP1xuICAgIHZhciBjb21wYWN0ID0gZmFsc2U7XG4gICAgdmFyIG9yZGVyRGV0YWlsc1Nob3duID0gdHJ1ZTtcblxuICAgIHZhciBlbXB0eUl0ZW0gPSB7XG4gICAgICAgICAgICBuYW1lOiAnJ1xuICAgICAgICB9O1xuXG4gICAgLy8gYWxsIGZyaWVuZCdzIG9yZGVyc1xuICAgIHZhciBhbGxGcmllbmRzID0gW107XG5cblxuXG5cblxuICAgIC8qdmFyIGdyb3VwcyA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTonQ29uc3VsZW50aSBJQUQnLFxuICAgICAgICAgICAgZnJpZW5kczpbZnJpZW5kc1swXSxmcmllbmRzWzFdXSxcbiAgICAgICAgICAgIHBsYWNlOnBsYWNlc1sxXVxuICAgICAgICB9LFxuICAgICAgICB7ICAgbmFtZTonVGVhbSBDVScsXG4gICAgICAgICAgICBmcmllbmRzOmZyaWVuZHMsXG4gICAgICAgICAgICBwbGFjZTpwbGFjZXNbMF1cbiAgICAgICAgfVxuICAgIF07Ki9cblxuICAgIHZhciBjdXJyZW50ID0gZnJpZW5kc1swXTsgLy8gZGVmYXVsdCBmcmllbmRcblxuXG5cbiAgICAvLyBkZG8sIGRhdGEgKyBhcGlcbiAgICAkc2NvcGUuYXBwID0ge1xuICAgICAgICAvLyB1c2VyIHByZWZlcmVuY2VzIGFuZCB1c2VyIHByZWYgYXBpXG4gICAgICAgIGhpbnRzOiB7XG4gICAgICAgICAgICBmYXN0TW9kZTogdHJ1ZSxcbiAgICAgICAgICAgIGhpZGVIaW50OiBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuYXBwLmhpbnRzW2tleV0gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgLy8gREFUQSAobW9jaylcbiAgICAgICAgbmFtZTogJ09yZGVyIElUIScsXG4gICAgICAgIGxvZ286ICdhcHAvaW1nL3l1bW1seS5wbmcnLFxuICAgICAgICB3ZWxjb21lSW1hZ2U6ICdhcHAvaW1nL21lYWxzaGFyZS5zdmcnLFxuICAgICAgICAvL3ZlcnNpb246JzAuMC4xJyxcbiAgICAgICAgdGl0bGU6ICdNZWFsU2hhcmUhJyxcbiAgICAgICAgZnJpZW5kczogZnJpZW5kcyxcbiAgICAgICAgLy9mcmllbmRzT25NYXA6IGZyaWVuZHMsXG4gICAgICAgIC8vcGxhY2U6e1xuICAgICAgICAvLyAgbmFtZTonRXIgUGFuaW5hcm8nXG4gICAgICAgIC8vfSxcbiAgICAgICAgLy8gcmVmZXJlbmNlIHRvIG1lXG4gICAgICAgIG1lOiBmcmllbmRzWzNdLFxuICAgICAgICAvL2RlZmF1bHQ6e1xuICAgICAgICAvLyAgZnJpZW5kOntcbiAgICAgICAgLy8gICAgICBwb3J0cmFpdDpmcmllbmRzWzBdLnBvcnRyYWl0XG4gICAgICAgIC8vICB9LFxuICAgICAgICAvL30sXG4gICAgICAgIC8vaW52aXRlOntcbiAgICAgICAgLy8gIGZyaWVuZDpmcmllbmRzWzBdLFxuICAgICAgICAvLyAgbWVhbDonY29sYXppb25lJyxcbiAgICAgICAgLy99LFxuICAgICAgICAvL2dyb3Vwczpncm91cHMsXG4gICAgICAgIGl0ZW1zOiBpdGVtcyxcbiAgICAgICAgLy9hZGRlZEl0ZW1zOmFkZGVkSXRlbXMsXG4gICAgICAgIG9yZGVyOiBhZGRlZEl0ZW1zLFxuICAgICAgICAvLyBBUElzXG4gICAgICAgIC8vbG9naW46e1xuICAgICAgICAvLyAgY3JlZGVudGlhbHNMb2dpbjpjcmVkZW50aWFsc0xvZ2luLFxuICAgICAgICAvLyAgZmFjZWJvb2tMb2dpbjpmYWNlYm9va0xvZ2luLFxuICAgICAgICAvLyAgcmVjb3ZlcjpyZWNvdmVyXG4gICAgICAgIC8vfSxcbiAgICAgICAgaW5jcmVtZW50OiBpbmNyZW1lbnQsXG4gICAgICAgIGRlY3JlbWVudDogZGVjcmVtZW50LFxuICAgICAgICBvcmRlcmVkSXRlbXM6IG9yZGVyZWRJdGVtcyxcbiAgICAgICAgcmVtb3ZlOnJlbW92ZSxcbiAgICAgICAgLy9jaGVja0luOmNoZWNrSW4sXG4gICAgICAgIC8vb3BlbkxlZnRNZW51Om9wZW5MZWZ0TWVudSxcbiAgICAgICAgLy9ncm91cDp7XG4gICAgICAgIC8vICAgIGpvaW46am9pbixcbiAgICAgICAgLy8gICAgam9pbmVkOmpvaW5lZFxuICAgICAgICAvL30sXG4gICAgICAgIGN1cnJlbnQ6IGN1cnJlbnQsXG4gICAgICAgIHNldEN1cnJlbnQ6IHNldEN1cnJlbnQsXG4gICAgICAgIGdldEN1cnJlbnQ6IGdldEN1cnJlbnQsXG4gICAgICAgIGNvbXBhY3Q6IGNvbXBhY3QsXG4gICAgICAgIC8vIGludGVyZmFjZSB1dGlsaXR5IGFwaXNcbiAgICAgICAgdG9nZ2xlQ29tcGFjdDp0b2dnbGVDb21wYWN0LFxuICAgICAgICBjbGVhck9yZGVyczpjbGVhck9yZGVycyxcbiAgICAgICAgYWRkT3JkZXJJdGVtOmFkZE9yZGVySXRlbSxcbiAgICAgICAgZ2V0QWxsRnJpZW5kczpnZXRBbGxGcmllbmRzLFxuICAgICAgICB0b2dnbGVPcmRlckRldGFpbHM6dG9nZ2xlT3JkZXJEZXRhaWxzXG5cbiAgICAgICAgICAgIC8vIEdlbmVyaWMgYXBpXG4gICAgICAgICAgICAvL25hdmlnYXRlOm5hdmlnYXRlIFxuICAgIH07XG5cbiAgICAvLyBBUElcbiAgICAvLyBsb2dpblxuICAgIC8qZnVuY3Rpb24gY3JlZGVudGlhbHNMb2dpbigpe1xuICAgICAgICBjb25zb2xlLmxvZygnY3JlZGVudGlhbHNMb2dpbicpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZhY2Vib29rTG9naW4oKXtcbiAgICAgICAgY29uc29sZS5sb2coJ2ZhY2Vib29rTG9naW4nKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWNvdmVyKCl7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZWNvdmVyJyk7XG4gICAgfVxuICAgIC8vIHBsYWNlcyAvIGdlb1xuICAgIGZ1bmN0aW9uIGNoZWNrSW4oKXtcbiAgICAgICAgY29uc29sZS5sb2coJ2NoZWNrSW4nKTtcbiAgICAgICAgJHN0YXRlLmdvKCdhcHAubWFwJyk7XG4gICAgfSovXG4gICAgLy8gYWRkZWQgaXRlbXNcbiAgICBmdW5jdGlvbiBpbmNyZW1lbnQoaXRlbSkge1xuICAgICAgICAvLyB0aGlzIHNob3VsZCBub3QgYmUgaGVyZS4uLlxuICAgICAgICBpZiAoIWl0ZW0uZnJpZW5kcykge1xuICAgICAgICAgICAgaXRlbS5mcmllbmRzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgaXRlbS5mcmllbmRzLnB1c2goY3VycmVudCk7XG5cbiAgICAgICAgYWxsRnJpZW5kcyA9IGNhbGN1bGF0ZUFsbEZyaWVuZE9yZGVycygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlY3JlbWVudChpdGVtKSB7XG4gICAgICAgIGlmICghaXRlbS5mcmllbmRzKSB7XG4gICAgICAgICAgICBpdGVtLmZyaWVuZHMgPSBbXTtcbiAgICAgICAgICAgIHNob3dUb2FzdChUT0FTVC5OT19FTEVNRU5UU19UT19SRU1PVkUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGlkeCA9IGl0ZW0uZnJpZW5kcy5pbmRleE9mKGN1cnJlbnQpO1xuICAgICAgICAgICAgaWYgKGlkeCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgb25seSBvbiBpbmRleCBmb3VuZFxuICAgICAgICAgICAgICAgIGl0ZW0uZnJpZW5kcy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2hvd1RvYXN0KGN1cnJlbnQubmFtZSArICcgbm9uIGhhIG9yZGluYXRvIHVuICcgKyBpdGVtLm5hbWUgKyAnICEhIScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYWxsRnJpZW5kcyA9IGNhbGN1bGF0ZUFsbEZyaWVuZE9yZGVycygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldEN1cnJlbnQoZnJpZW5kKSB7XG4gICAgICAgIGN1cnJlbnQgPSBmcmllbmQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Q3VycmVudCgpIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnZ2V0IGN1cnJlbnQnKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQ7XG4gICAgfVxuICAgIC8qXG4gICAgZnVuY3Rpb24gam9pbihncm91cCl7XG4gICAgICAgIGNvbnNvbGUubG9nKCdqb2luIGdyb3VwJyxncm91cCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gam9pbmVkKGdyb3VwLHdobyl7XG4gICAgICAgIGNvbnNvbGUubG9nKCdqb2luZWQgZ3JvdXAgd2hvJyxncm91cCx3aG8pO1xuICAgICAgICByZXR1cm4gZ3JvdXAuZnJpZW5kcy5pbmRleE9mKHdobykgPiAwID8gdHJ1ZSA6IGZhbHNlO1xuICAgIH0qL1xuXG4gICAgLy8gY29udHJvbCBsYXlvdXRcbiAgICAvLyBmdW5jdGlvbiBvcGVuTGVmdE1lbnUoKSB7XG4gICAgLy8gICAgICRtZFNpZGVuYXYoJ2xlZnQnKS5vcGVuKCk7XG4gICAgLy8gfVxuXG4gICAgZnVuY3Rpb24gc2hvd1RvYXN0KG1zZykge1xuICAgICAgICAkbWRUb2FzdC5zaG93KFxuICAgICAgICAgICAgJG1kVG9hc3Quc2ltcGxlKCkuY29udGVudChtc2cpLmhpZGVEZWxheSg2MDAwKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbGN1bGF0ZUFsbEZyaWVuZE9yZGVycygpe1xuICAgICAgICByZXR1cm4gYWRkZWRJdGVtcy5yZWR1Y2UoZnVuY3Rpb24obiwgeSkge1xuICAgICAgICAgICAgdmFyIGNjID0geS5mcmllbmRzIHx8IFtdO1xuICAgICAgICAgICAgcmV0dXJuIG4uY29uY2F0KGNjKTtcbiAgICAgICAgICAgIC8vcmV0dXJuIGdsb2JhbEFycmF5LmNvbmNhdCh5LmZyaWVuZHMgfHwgW10pO1xuICAgICAgICB9LCBbXSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb3JkZXJlZEl0ZW1zKGZyaWVuZCkge1xuICAgICAgICAvLyBhbGxGcmllbmRzID0gW107XG4gICAgICAgIC8vIGNhbiBvcHRpbWl6ZSB0aGlzIHRvIGp1c3QgZG8gaXQgb24gKyBhbmQgLVxuICAgICAgICAvLyByZWR1Y2UgbiBzb21lQXJyYXkuZnJpZW5kIGxpc3QgdG8gb25lIGJpZyBsaXN0XG4gICAgICAgIFxuXG4gICAgICAgIC8vIGZpbHRlciB0byBmaW5kIHRoZSBjdXJyZW50IG9uZVxuICAgICAgICByZXR1cm4gYWxsRnJpZW5kcy5maWx0ZXIoZnVuY3Rpb24oeCkge1xuICAgICAgICAgICAgcmV0dXJuIHggPT09IGZyaWVuZDtcbiAgICAgICAgfSkubGVuZ3RoO1xuXG5cbiAgICB9XG5cbiAgICAvLyBvbiBzd2lwZSByaWdodCwgcmVtb3ZlIHRoZSBpdGVtXG4gICAgZnVuY3Rpb24gcmVtb3ZlKGl0ZW0pe1xuICAgICAgICBjb25zb2xlLmxvZygncmVtb3ZpbmcuLi4nK2l0ZW0pO1xuICAgICAgICBhZGRlZEl0ZW1zLnNwbGljZShhZGRlZEl0ZW1zLmluZGV4T2YoaXRlbSkpO1xuICAgICAgICBzaG93VG9hc3QoaXRlbS5uYW1lICsgJyByaW1vc3NvJyk7XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiB0b2dnbGVDb21wYWN0KCl7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ3RvZ2dsZUNvbXBhY3QnKTtcbiAgICAgICAgJHNjb3BlLmFwcC5jb21wYWN0ID0gISRzY29wZS5hcHAuY29tcGFjdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b2dnbGVPcmRlckRldGFpbHMoKXtcbiAgICAgICAgLy9jb25zb2xlLmxvZygndG9nZ2xlT3JkZXJEZXRhaWxzJyk7XG4gICAgICAgICRzY29wZS5hcHAub3JkZXJEZXRhaWxzU2hvd24gPSAhJHNjb3BlLmFwcC5vcmRlckRldGFpbHNTaG93bjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhck9yZGVycygpe1xuICAgICAgICBhbmd1bGFyLmZvckVhY2goYWRkZWRJdGVtcywgZnVuY3Rpb24odmFsdWUpe1xuICAgICAgICAgICAgdmFsdWUuZnJpZW5kcyA9IFtdO1xuICAgICAgICB9KTtcblxuICAgICAgICBhbGxGcmllbmRzID0gY2FsY3VsYXRlQWxsRnJpZW5kT3JkZXJzKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkT3JkZXJJdGVtKCl7XG4gICAgICAgIGFkZGVkSXRlbXMucHVzaChhbmd1bGFyLmNvcHkoZW1wdHlJdGVtKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0QWxsRnJpZW5kcygpe1xuICAgICAgICByZXR1cm4gYWxsRnJpZW5kcztcbiAgICB9XG5cblxuICAgIC8vZnVuY3Rpb24gbmF2aWdhdGUocm91dGUpe1xuICAgIC8vICAgICRzdGF0ZS5nbyhyb3V0ZSk7XG4gICAgLy8gICAgJG1kU2lkZW5hdignbGVmdCcpLmNsb3NlKCk7XG4gICAgLy99XG5cbn1dKVxuXG4uZmlsdGVyKCdjYXBpdGFsaXplJyxmdW5jdGlvbigpe1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICByZXR1cm4gZnVuY3Rpb24oaW5wdXQpe1xuICAgICAgICByZXR1cm4gaW5wdXQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBpbnB1dC5zbGljZSgxKTtcbiAgICB9XG59KVxuXG4uZGlyZWN0aXZlKCdhY3Rpb24nLCBmdW5jdGlvbigpIHtcbiAgICAvLyBSdW5zIGR1cmluZyBjb21waWxlXG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIHJldHVybiB7XG4gICAgICAgIC8vIG5hbWU6ICcnLFxuICAgICAgICAvLyBwcmlvcml0eTogMSxcbiAgICAgICAgLy8gdGVybWluYWw6IHRydWUsXG4gICAgICAgIHNjb3BlOiB7XG4gICAgICAgICAgICBhY3Rpb246ICcmJyxcbiAgICAgICAgICAgIGFjdGlvbkV2ZW50OiAnQCdcbiAgICAgICAgfSwgLy8ge30gPSBpc29sYXRlLCB0cnVlID0gY2hpbGQsIGZhbHNlL3VuZGVmaW5lZCA9IG5vIGNoYW5nZVxuICAgICAgICAvLyBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICR0cmFuc2NsdWRlKSB7fSxcbiAgICAgICAgLy8gcmVxdWlyZTogJ25nTW9kZWwnLCAvLyBBcnJheSA9IG11bHRpcGxlIHJlcXVpcmVzLCA/ID0gb3B0aW9uYWwsIF4gPSBjaGVjayBwYXJlbnQgZWxlbWVudHNcbiAgICAgICAgLy8gcmVzdHJpY3Q6ICdBJywgLy8gRSA9IEVsZW1lbnQsIEEgPSBBdHRyaWJ1dGUsIEMgPSBDbGFzcywgTSA9IENvbW1lbnRcbiAgICAgICAgLy8gdGVtcGxhdGU6ICcnLFxuICAgICAgICAvLyB0ZW1wbGF0ZVVybDogJycsXG4gICAgICAgIC8vIHJlcGxhY2U6IHRydWUsXG4gICAgICAgIC8vIHRyYW5zY2x1ZGU6IHRydWUsXG4gICAgICAgIC8vIGNvbXBpbGU6IGZ1bmN0aW9uKHRFbGVtZW50LCB0QXR0cnMsIGZ1bmN0aW9uIHRyYW5zY2x1ZGUoZnVuY3Rpb24oc2NvcGUsIGNsb25lTGlua2luZ0ZuKXsgcmV0dXJuIGZ1bmN0aW9uIGxpbmtpbmcoc2NvcGUsIGVsbSwgYXR0cnMpe319KSksXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSwgaUVsbSkge1xuICAgICAgICAgICAgLy8kbG9nLmluZm8oJHNjb3BlLmFjdGlvbik7XG4gICAgICAgICAgICBpRWxtLm9uKCRzY29wZS5hY3Rpb25FdmVudCB8fCAnY2xpY2snLCAkc2NvcGUuYWN0aW9uKTtcbiAgICAgICAgfVxuICAgIH07XG59KTtcblxuXG5BcHAuZGlyZWN0aXZlKCdlZkJhZGdlJywgWyckbG9nJywgZnVuY3Rpb24oJGxvZyl7XG4gICAgLy8gUnVucyBkdXJpbmcgY29tcGlsZVxuICAgICd1c2Ugc3RyaWN0JztcbiAgICByZXR1cm4ge1xuICAgICAgICAvLyBuYW1lOiAnJyxcbiAgICAgICAgLy8gcHJpb3JpdHk6IDEsXG4gICAgICAgIC8vIHRlcm1pbmFsOiB0cnVlLFxuICAgICAgICBzY29wZToge1xuICAgICAgICAgICAgZWZCYWRnZTonPSdcbiAgICAgICAgfSwgLy8ge30gPSBpc29sYXRlLCB0cnVlID0gY2hpbGQsIGZhbHNlL3VuZGVmaW5lZCA9IG5vIGNoYW5nZVxuICAgICAgICAvLyBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICR0cmFuc2NsdWRlKSB7fSxcbiAgICAgICAgLy8gcmVxdWlyZTogJ25nTW9kZWwnLCAvLyBBcnJheSA9IG11bHRpcGxlIHJlcXVpcmVzLCA/ID0gb3B0aW9uYWwsIF4gPSBjaGVjayBwYXJlbnQgZWxlbWVudHNcbiAgICAgICAgLy8gcmVzdHJpY3Q6ICdBJywgLy8gRSA9IEVsZW1lbnQsIEEgPSBBdHRyaWJ1dGUsIEMgPSBDbGFzcywgTSA9IENvbW1lbnRcbiAgICAgICAgdGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwiZWYtYmFkZ2VcIj48bmctdHJhbnNjbHVkZT48L25nLXRyYW5zY2x1ZGU+PC9kaXY+JyxcbiAgICAgICAgLy8gdGVtcGxhdGVVcmw6ICcnLFxuICAgICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgICB0cmFuc2NsdWRlOiB0cnVlLFxuICAgICAgICAvLyBjb21waWxlOiBmdW5jdGlvbih0RWxlbWVudCwgdEF0dHJzLCBmdW5jdGlvbiB0cmFuc2NsdWRlKGZ1bmN0aW9uKHNjb3BlLCBjbG9uZUxpbmtpbmdGbil7IHJldHVybiBmdW5jdGlvbiBsaW5raW5nKHNjb3BlLCBlbG0sIGF0dHJzKXt9fSkpLFxuICAgICAgICBsaW5rOiBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgICAgICRsb2cuaW5mbygkc2NvcGUuZWZCYWRnZSk7ICAgXG4gICAgICAgIH1cbiAgICB9O1xufV0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
