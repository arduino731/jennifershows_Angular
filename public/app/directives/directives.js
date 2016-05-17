var app = angular.module('Youtube', []);


app.directive('myYoutube', function($sce) {
  return {
    restrict: 'EA',
    scope: { code:'=' },
    replace: true,
    // angularJSCart class video padding-bottom: 0px;height: 200px;overflow: hidden;top: 0;left: 0;width: 100%;height: 100%;
    // template: '<div class="video"><iframe src="{{url}}" frameborder="0" allowfullscreen></iframe></div>',
    template: '<div style="height:400px;"><iframe style="overflow:hidden;height:100%;width:100%" width="100%" height="100%" src="{{url}}" frameborder="0" allowfullscreen></iframe></div>',
    link: function (scope) {
        // console.log('here');
        scope.$watch('code', function (newVal) {
           if (newVal) {
               scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + newVal + "?rel=0&autoplay=1");
           }
        });
    }
  };
});


app.directive('radioButtonGroup', function () {
    return {
        restrict: 'E',
        scope: { model: '=', options: '=', id: '=', name: '=', suffix: '=', disabled: '=', showinfo: '=' },
        controller: function ($scope) {
            $scope.activate = function (option, $event) {
                if (option.showinfo.length > 0) {
                    alert(option.showinfo);
                    return false;
                }
                $scope.model = option[$scope.id];
                // stop click event to avoid Bootstrap toggling "active" class
                if ($event.stopPropagation) {
                    $event.stopPropagation();
                }
                if ($event.preventDefault) {
                    $event.preventDefault();
                }
                $event.cancelBubble = true;
                $event.returnValue = false;               
            };

            $scope.isActive = function (option) {
                return option[$scope.id] == $scope.model;
            };

            $scope.isDisabled = function (option) {
                return option[$scope.disabled] == $scope.model;
            };

            $scope.getName = function (option) {
                return option[$scope.name];
            }
        },
        template: "<button type='button' class='btn btn-{{suffix}}' " +
            "ng-class='{active: isActive(option)}'" +
            "ng-repeat='option in options' " +
            //The ng-disabled expression is evaluated in the present scope. Hence, 
            //you should NOT USE the extra interpolation with {{..}} which will not work:
            "ng-disabled=option.disabled ng-click='activate(option, $event)'><span ng-bind-html='getName(option) | unsafe'></span>" +
            "</button>"
    };
});

app.directive('aDisabled', function ($compile) {
    return {
        restrict: 'A',
        priority: -99999,
        link: function (scope, element, attrs) {
            scope.$watch(attrs.aDisabled, function (val, oldval) {
                if ( !! val) {
                    element.unbind('click');
                } else if (oldval) {
                    element.bind('click', function () {
                        scope.$apply(attrs.ngClick);
                    });
                }
            });
        }
    };
});