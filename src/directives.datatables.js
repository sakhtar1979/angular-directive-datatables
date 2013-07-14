angular.module('directive', []).directive('datatable', ['$timeout', '$compile',
    function($timeout, $compile) {

        // default options to be used on to all datatables
        var defaults = {};

        return {
            restrict: 'A',
            compile: function(element, attrs) {
                var repeatOption = element.find('tr[ng-repeat], tr[data-ng-repeat]'),
                    repeatAttr,
                    watch,
                    original = $(repeatOption).clone();

                // enable watching of the dataset if in use
                repeatOption = element.find('tr[ng-repeat], tr[data-ng-repeat]');

                if (repeatOption.length) {
                    repeatAttr = repeatOption.attr('ng-repeat') || repeatOption.attr('data-ng-repeat');
                    watch = $.trim(repeatAttr.split('|')[0]).split(' ').pop();
                }

                // post-linking function
                return function(scope, element, attrs, controller) {

                    // merge default options with table specific override options
                    var options = angular.extend({}, defaults, scope.$eval(attrs.datatable)),
                        table = null;

                    if (watch) {

                        // deep watching of dataset to re-init on change
                        scope.$watch(watch, function(newValue, oldValue) {
                            if (newValue) {

                                if (!element.hasClass('dataTable')) {

                                    // init datatables after data load for first time
                                    table = element.dataTable(options);

                                } else if (newValue != oldValue) {

                                    // destroy and re-init datatable with new data (fnDraw not working here)
                                    table.fnDestroy();

                                    // DataTables addes specifc 'width' property after destroy, have to manually remove
                                    element.removeAttr('style');

                                    // empty the <tbody> to remove old ng-repeat rows and re-compile with new dataset
                                    var body = element.find('tbody');
                                    body.empty();
                                    body.append($compile(original)(scope));

                                    // 'timeout' to allow ng-repeat time to render
                                    $timeout(function() {
                                        table.dataTable(options);
                                    });

                                }
                            }
                        }, true);
                    } else {
                        // no dataset present, init normally
                        table = element.dataTable(options);
                    }
                };
            }
        };
    }
]);