!function(e){var t=e.module("d01-table",[]);t.filter("slice",function(){return function(e,t,a){return(e||[]).slice(t,a)}}),t.directive("d01Table",["$parse","$filter",function(e,t){return{templateUrl:"table.html",restrict:"AE",scope:!0,link:function(e,a,n){e.tablestatus={query:"",select:"",pages:0,activePage:0,itemsPerPage:0,sorting:{direction:"-",column:""}},e.clickHeader=function(t){if(t.sortable){var a=e.tablestatus.sorting;a.column===t.key?a.direction="-"===a.direction?"+":"-":(a.column=t.key,a.direction="+")}},e.pages=function(){return new Array(e.tablestatus.pages)},e.setPage=function(t){e.tablestatus.activePage=t},e.getStartItem=function(){return e.tableconfig.pagination?e.tablestatus.itemsPerPage*e.tablestatus.activePage:0},e.getEnditem=function(){return e.tableconfig.pagination?e.getStartItem()+e.tablestatus.itemsPerPage:1e4};var l=function(){e.tablestatus.itemsPerPage=e.tableconfig.pagination.itemsPerPage,e.tablestatus.pages=Math.ceil(t("filter")(e.tablesource,e.tableconfig.filter).length/e.tablestatus.itemsPerPage)},i=function(){e.tablesource=e.$parent.$eval(n.source),e.tableconfig=e.$parent.$eval(n.config),e.tableconfig.filter=e.tableconfig.filter||{},e.rowIdentifier=n.rowIdentifier,_.forEach(e.tableconfig.columns,function(t){t.defaultSort&&(e.tablestatus.sorting.column=t.key)}),e.tableconfig.pagination&&l()};e.$on("setTablePage",function(t,a){e.setPage(parseInt(a))}),e.$watch("tablesource.length",function(t,a){e.tableconfig.pagination&&l()}),i()}}}]).directive("d01Td",["$compile",function(e){return{templateUrl:"td.html",restrict:"A",scope:!1,transclude:!0,replace:!0,link:function(t,a,n){var l=t.$eval(n.config),i=t.$eval(n.source),o=function(e,t){e=e||window;var a=t,n=t.split(".");n=e[n[0]];for(var l=1,t=t.split("."),i=t.length;i>l;l++){if(null===n)return void console.warn("%s could not be found in your source object",a,e);n=n[t[l]]}return n},s=function(e,t,a){if(e&&t){var n='<span ng-bind="i.'+t;return a&&(n+=" | "+a),n+='"></span>'}return o(e,t)};if(l.template)a.append(l.template);else if(l.mode)switch(l.mode){case"date":moment?a.append(s(i,l.key,"date:'"+(l.dateFormat||"dd/MM/yy")+"'")):(console.warn("Date-mode was set, but moment.js is not availabe. Did you forget to include it in your app?"),a.append(s(i,l.key)));break;case"timeAgo":moment?a.append('<span am-time-ago="i.'+l.key+'"></span>'):(console.warn("Date-mode was set, but moment.js is not availabe. Did you forget to include it in your app?"),a.append(s(i,l.key)))}else a.append(s(i,l.key,l.filter));e(a.contents())(t)}}}])}(angular),angular.module("d01-table").run(["$templateCache",function(e){e.put("table.html",'<div class="clearfix">\r\n    <input type="text" ng-model="tablestatus.query" ng-if="tableconfig.searchField" placeholder="{{tableconfig.placeholder}}" ng-class="tableconfig.select.options ? \'col-9 first\':\'col-12\'">\r\n    <select ng-if="tableconfig.select.options" class="col-3 last" ng-model="tablestatus.select" ng-options="option.value as option.name for option in tableconfig.select.options">\r\n    </select>\r\n</div>\r\n<table class="{{tableconfig.className}}">\r\n    <thead>\r\n        <th ng-repeat="col in tableconfig.columns" ng-click="clickHeader(col)" ng-class="{ \'sortable\': col.sortable}" class="{{\'field_\'+col.key + \' \'+ col.className}}">{{col.columnName}} <i ng-if="col.sortable" class="fa" ng-class="{\r\n            \'fa-angle-up\': tablestatus.sorting.column==col.key,\r\n            \'fa-flip-vertical\': tablestatus.sorting.direction == \'-\' && tablestatus.sorting.column==col.key\r\n        }"></i></th>\r\n    </thead>\r\n    <tbody>\r\n        <tr ng-repeat="i in tablesource|filter:tablestatus.query|filter:tablestatus.select|orderBy:tablestatus.sorting.direction+tablestatus.sorting.column|filter:tableconfig.filter|slice:getStartItem():getEnditem()" ng-class-odd="\'odd\'" ng-class-even="\'even\'" class="{{(rowIdentifier) ? \'row_\'+i[rowIdentifier] : \'\'}}">\r\n            <td d01-td ng-repeat="col in tableconfig.columns" source="i" config="col"></td d01-td>\r\n        </tr>\r\n    </tbody>\r\n</table>\r\n<ul class="pagination" ng-if="tablestatus.pages > 1">\r\n    <li ng-repeat="page in pages() track by $index">\r\n        <a ng-class="{\'active\': $index == tablestatus.activePage}" ng-click="setPage($index)">{{$index + 1}}</a>\r\n    </li>\r\n</ul>\r\n'),e.put("td.html","<td class=\"{{'field_'+col.key+ ' ' + col.className}}\"></td>")}]);