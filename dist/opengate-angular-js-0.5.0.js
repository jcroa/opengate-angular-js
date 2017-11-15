(function(window, undefined) {'use strict';


angular.module('opengate-angular-js', ['schemaForm']);
angular.module("opengate-angular-js").run(["$templateCache", function($templateCache) {$templateCache.put("views/custom.ui.select.area.html","<div class=form-group mass-autocomplete ng-if=$ctrl.multiple><label class=custom-ui-select-label>Area</label><ui-select custom-ui-select-config=$ctrl.ownConfig name=area ng-model=$ctrl.area theme=bootstrap title=\"Choose an area multi\" custom-ui-select multiple=true custom-mass-autocomplete-item=$ctrl.ownConfig on-select=\"$ctrl.areaSelected($item, $model)\" on-remove=\"$ctrl.areaRemove($item, $model)\" ng-required=$ctrl.isRequired><ui-select-match placeholder=\"Choose an area multi\" allow-clear=true>{{$item.identifier}}</ui-select-match><ui-select-choices repeat=\"area in $ctrl.ownConfig.collection | filter:$select.search track by $index\"><div><span ng-bind-html=\"area.identifier | highlight: $select.search\"></span> - <span ng-bind-html=\"area.name | highlight: $select.search\"></span><br><span ng-bind-html=\"area.organization | highlight: $select.search\"></span></div></ui-select-choices></ui-select></div><div class=form-group mass-autocomplete ng-if=!$ctrl.multiple><label class=custom-ui-select-label>Area</label><ui-select custom-ui-select-config=$ctrl.ownConfig name=area ng-model=$ctrl.area theme=bootstrap title=\"Choose an area\" custom-ui-select multiple=false custom-mass-autocomplete-item=$ctrl.ownConfig on-select=\"$ctrl.areaSelected($item, $model)\" on-remove=\"$ctrl.areaRemove($item, $model)\" ng-required=$ctrl.isRequired><ui-select-match placeholder=\"Choose an area\" allow-clear=true>{{$item.identifier}}</ui-select-match><ui-select-choices repeat=\"area in $ctrl.ownConfig.collection | filter:$select.search track by $index\"><div><span ng-bind-html=\"area.identifier | highlight: $select.search\"></span> - <span ng-bind-html=\"area.name | highlight: $select.search\"></span><br><span ng-bind-html=\"area.organization | highlight: $select.search\"></span></div></ui-select-choices></ui-select></div>");
$templateCache.put("views/custom.ui.select.bundle.html","<div class=form-group mass-autocomplete ng-if=$ctrl.multiple><label class=custom-ui-select-label>Bundle</label><ui-select custom-ui-select-config=$ctrl.ownConfig name=bundle ng-model=$ctrl.bundle theme=bootstrap title=\"Choose an bundle multi\" custom-ui-select multiple=true custom-mass-autocomplete-item=$ctrl.ownConfig on-select=\"$ctrl.bundleSelected($item, $model)\" on-remove=\"$ctrl.bundleRemove($item, $model)\" ng-required=$ctrl.isRequired><ui-select-match placeholder=\"Choose an bundle multi\" allow-clear=true>{{$item.name}} (v{{$item.version}})</ui-select-match><ui-select-choices repeat=\"bundle in $ctrl.ownConfig.collection | filter:$select.search track by $index\"><div><span ng-bind-html=\"bundle.name | highlight: $select.search\"></span> - <span ng-bind-html=\"bundle.version | highlight: $select.search\"></span><br><span ng-bind-html=\"bundle.description | highlight: $select.search\"></span></div></ui-select-choices></ui-select></div><div class=form-group mass-autocomplete ng-if=!$ctrl.multiple><label class=custom-ui-select-label>Bundle</label><ui-select custom-ui-select-config=$ctrl.ownConfig name=bundle ng-model=$ctrl.bundle theme=bootstrap title=\"Choose an bundle\" custom-ui-select multiple=false custom-mass-autocomplete-item=$ctrl.ownConfig on-select=\"$ctrl.bundleSelected($item, $model)\" on-remove=\"$ctrl.bundleRemove($item, $model)\" ng-required=$ctrl.isRequired><ui-select-match placeholder=\"Choose an bundle\" allow-clear=true>{{$item.name}} (v{{$item.version}})</ui-select-match><ui-select-choices repeat=\"bundle in $ctrl.ownConfig.collection | filter:$select.search track by $index\"><div><span ng-bind-html=\"bundle.name | highlight: $select.search\"></span> (v<span ng-bind-html=\"bundle.version | highlight: $select.search\"></span>)<br><span ng-bind-html=\"bundle.description | highlight: $select.search\"></span></div></ui-select-choices></ui-select></div>");
$templateCache.put("views/custom.ui.select.datastream.html","<div class=form-group mass-autocomplete ng-if=$ctrl.multiple><label class=custom-ui-select-label>Datastream Id</label><ui-select custom-ui-select-config=$ctrl.ownConfig name=datastream ng-model=$ctrl.datastream theme=bootstrap title=\"Choose a datastream\" custom-ui-select multiple=true custom-mass-autocomplete-item=$ctrl.ownConfig on-select=\"$ctrl.datastreamSelected($item, $model)\" on-remove=\"$ctrl.datastreamRemove($item, $model)\" ng-required=$ctrl.isRequired><ui-select-match placeholder=\"Choose a datastream\" allow-clear=true>{{$item.identifier}}</ui-select-match><ui-select-choices repeat=\"ds in $ctrl.ownConfig.collection | filter:$select.search track by $index\"><div><span ng-bind-html=\"ds.identifier | highlight: $select.search\"></span> - <span ng-bind-html=\"ds.name | highlight: $select.search\"></span></div><small><div ng-if=ds.category.name>Category: <span ng-bind-html=\"ds.category.name | highlight: $select.search\"></span></div><div ng-if=ds.feed>Feed: <span ng-bind-html=\"ds.feed | highlight: $select.search\"></span></div><div ng-if=ds.datamodel><div>Datamodel:</div><div>- Id: <span ng-bind-html=\"ds.datamodel.identifier | highlight: $select.search\"></span><div>- Organization: <span ng-bind-html=\"ds.datamodel.organization | highlight: $select.search\"></span><div>- Name: <span ng-bind-html=\"ds.datamodel.name | highlight: $select.search\"></span><div>- Description: <span ng-bind-html=\"ds.datamodel.description | highlight: $select.search\"></span><div>- Version: <span ng-bind-html=\"ds.datamodel.version | highlight: $select.search\"></span></div></div></div></div></div></div></small></ui-select-choices></ui-select></div><div class=form-group mass-autocomplete ng-if=!$ctrl.multiple><label class=custom-ui-select-label>Datastream Id</label><ui-select custom-ui-select-config=$ctrl.ownConfig name=datastream ng-model=$ctrl.datastream theme=bootstrap title=\"Choose a datastream\" custom-ui-select multiple=false custom-mass-autocomplete-item=$ctrl.ownConfig on-select=\"$ctrl.datastreamSelected($item, $model)\" on-remove=\"$ctrl.datastreamRemove($item, $model)\" ng-required=$ctrl.isRequired><ui-select-match placeholder=\"Choose a datastream\" allow-clear=true>{{$item.identifier}}</ui-select-match><ui-select-choices repeat=\"ds in $ctrl.ownConfig.collection | filter:$select.search track by $index\"><div><span ng-bind-html=\"ds.identifier | highlight: $select.search\"></span> - <span ng-bind-html=\"ds.name | highlight: $select.search\"></span></div><small><div ng-if=ds.category.name>Category: <span ng-bind-html=\"ds.category.name | highlight: $select.search\"></span></div><div ng-if=ds.feed>Feed: <span ng-bind-html=\"ds.feed | highlight: $select.search\"></span></div><div ng-if=ds.datamodel><div>Datamodel:</div><div>- Id: <span ng-bind-html=\"ds.datamodel.identifier | highlight: $select.search\"></span><div>- Organization: <span ng-bind-html=\"ds.datamodel.organization | highlight: $select.search\"></span><div>- Name: <span ng-bind-html=\"ds.datamodel.name | highlight: $select.search\"></span><div>- Description: <span ng-bind-html=\"ds.datamodel.description | highlight: $select.search\"></span><div>- Version: <span ng-bind-html=\"ds.datamodel.version | highlight: $select.search\"></span></div></div></div></div></div></div></small></ui-select-choices></ui-select></div>");
$templateCache.put("views/custom.ui.select.entity.html","<div class=form-group mass-autocomplete ng-if=$ctrl.multiple><label class=custom-ui-select-label>Entity Key</label><ui-select custom-ui-select-config=$ctrl.ownConfig name=entity ng-model=$ctrl.entity theme=bootstrap title=\"Choose a entity\" custom-ui-select multiple=true custom-mass-autocomplete-item=$ctrl.ownConfig on-select=\"$ctrl.entitySelected($item, $model)\" on-remove=\"$ctrl.entityRemove($item, $model)\" ng-required=$ctrl.isRequired><ui-select-match placeholder=\"Choose a entity\" allow-clear=true>{{$item.provision.administration.identifier._current.value}}</ui-select-match><ui-select-choices repeat=\"entityData in $ctrl.ownConfig.collection track by $index\"><span ng-bind-html=\"entityData.provision.administration.identifier._current.value | highlight: $select.search\"></span> <small><div ng-if=entityData.provision.device.specificType._current.value>Specific type: <span ng-bind-html=\"entityData.provision.device.specificType._current.value | highlight: $select.search\"></span></div><div ng-if=entityData.provision.device.operationalStatus._current.value>Operational status: <span ng-bind-html=\"\'\'+entityData.provision.device.operationalStatus._current.value | highlight: $select.search\"></span></div><div ng-if=\"!entityData.provision.device.specificType && entityData.provision.device.communicationsModule[0].subscriber.specificType._current.value\">Specific type: <span ng-bind-html=\"entityData.provision.device.communicationsModule[0].subscriber.specificType._current.value | highlight: $select.search\"></span></div><div ng-if=\"!entityData.provision.device.specificType && entityData.provision.device.communicationsModule[0].subscription.specificType._current.value\">Specific type: <span ng-bind-html=\"entityData.provision.device.communicationsModule[0].subscriber.specificType._current.value | highlight: $select.search\"></span></div></small></ui-select-choices></ui-select></div><div class=form-group mass-autocomplete ng-if=!$ctrl.multiple><label class=custom-ui-select-label>Entity Key</label><ui-select custom-ui-select-config=$ctrl.ownConfig name=entity ng-model=$ctrl.entity theme=bootstrap title=\"Choose a entity\" custom-ui-select multiple=false custom-mass-autocomplete-item=$ctrl.ownConfig on-select=\"$ctrl.entitySelected($item, $model)\" on-remove=\"$ctrl.entityRemove($item, $model)\" ng-required=$ctrl.isRequired><ui-select-match placeholder=\"Choose a entity\" allow-clear=true>{{$item.provision.administration.identifier._current.value}}</ui-select-match><ui-select-choices repeat=\"entityData in $ctrl.ownConfig.collection track by $index\"><span ng-bind-html=\"entityData.provision.administration.identifier._current.value | highlight: $select.search\"></span> <small><div ng-if=entityData.provision.device.specificType._current.value>Specific type: <span ng-bind-html=\"entityData.provision.device.specificType._current.value | highlight: $select.search\"></span></div><div ng-if=entityData.provision.device.operationalStatus._current.value>Operational status: <span ng-bind-html=\"\'\'+entityData.provision.device.operationalStatus._current.value | highlight: $select.search\"></span></div><div ng-if=\"!entityData.provision.device.specificType && entityData.provision.device.communicationsModule[0].subscriber.specificType._current.value\">Specific type: <span ng-bind-html=\"entityData.provision.device.communicationsModule[0].subscriber.specificType._current.value | highlight: $select.search\"></span></div><div ng-if=\"!entityData.provision.device.specificType && entityData.provision.device.communicationsModule[0].subscription.specificType._current.value\">Specific type: <span ng-bind-html=\"entityData.provision.device.communicationsModule[0].subscriber.specificType._current.value | highlight: $select.search\"></span></div></small></ui-select-choices></ui-select></div>");
$templateCache.put("views/custom.ui.select.helper.html","<div class=form-group ng-hide=$ctrl.have_helper_keys ng-transclude=input><label for={{$ctrl.id}}>{{$ctrl.labelText}}</label> <input class=form-control name={{$ctrl.name}} type=text id={{$ctrl.id}} ng-model=$ctrl.helperModel ng-required=$ctrl.required> <span class=help-inline ng-show=\"!$ctrl.helperModel && $ctrl.required\">{{$ctrl.labelError}}</span></div><div class=form-group ng-hide=!$ctrl.have_helper_keys><label for={{$ctrl.id}}>{{$ctrl.labelText}}</label><ui-select id={{$ctrl.id}} name={{$ctrl.name}} ng-model=$ctrl.helperModel theme=bootstrap title=\"Choose an option\" ng-required=$ctrl.required tagging=$ctrl.helperTagTransform tagging-label=false><ui-select-match placeholder=\"Choose an option\">{{$select.selected.value}}</ui-select-match><ui-select-choices repeat=\"parameter.value as (key, parameter) in $ctrl.$helper_keys | filter: $select.search\"><span ng-bind-html=\"parameter.key | highlight: $select.search | humanize\"></span>: <small ng-bind-html=\"parameter.value | highlight: $select.search\"></small></ui-select-choices></ui-select><span class=help-inline ng-show=\"!$ctrl.helperModel && $ctrl.required\">Field is required</span></div>");
$templateCache.put("views/custom.ui.select.subscriber.html","<div class=form-group mass-autocomplete ng-if=$ctrl.multiple><label class=custom-ui-select-label>Entity Key</label><ui-select custom-ui-select-config=$ctrl.ownConfig name=entity ng-model=$ctrl.entity theme=bootstrap title=\"Choose a entity\" custom-ui-select multiple=true custom-mass-autocomplete-item=$ctrl.ownConfig on-select=\"$ctrl.entitySelected($item, $model)\" on-remove=\"$ctrl.entityRemove($item, $model)\" ng-required=$ctrl.isRequired><ui-select-match placeholder=\"Choose a entity\" allow-clear=true>{{$item.provision.subscriber.identifier._current.value}}</ui-select-match><ui-select-choices repeat=\"subscriberData in $ctrl.ownConfig.collection track by $index\"><span ng-bind-html=\"subscriberData.provision.subscriber.identifier._current.value | highlight: $select.search\"></span> <small><div ng-if=subscriberData.provision.subscriber.name._current.value>Name: <span ng-bind-html=\"\'\'+subscriberData.provision.subscriber.name._current.value | highlight: $select.search\"></span></div></small></ui-select-choices></ui-select></div><div class=form-group mass-autocomplete ng-if=!$ctrl.multiple><label class=custom-ui-select-label>Entity Key</label><ui-select custom-ui-select-config=$ctrl.ownConfig name=entity ng-model=$ctrl.entity theme=bootstrap title=\"Choose a entity\" custom-ui-select multiple=false custom-mass-autocomplete-item=$ctrl.ownConfig on-select=\"$ctrl.entitySelected($item, $model)\" on-remove=\"$ctrl.entityRemove($item, $model)\" ng-required=$ctrl.isRequired><ui-select-match placeholder=\"Choose a entity\" allow-clear=true>{{$item.provision.subscriber.identifier._current.value}}</ui-select-match><ui-select-choices repeat=\"subscriberData in $ctrl.ownConfig.collection track by $index\"><span ng-bind-html=\"subscriberData.provision.subscriber.identifier._current.value | highlight: $select.search\"></span> <small><div ng-if=subscriberData.provision.subscriber.name._current.value>Name: <span ng-bind-html=\"\'\'+subscriberData.provision.subscriber.name._current.value | highlight: $select.search\"></span></div><div ng-if=subscriberData.provision.subscriber.mobile.icc._current.value>Name: <span ng-bind-html=\"\'\'+subscriberData.provision.subscriber.mobile.icc.name._current.value | highlight: $select.search\"></span></div></small></ui-select-choices></ui-select></div>");
$templateCache.put("views/custom.ui.select.subscription.html","<div class=form-group mass-autocomplete ng-if=$ctrl.multiple><label class=custom-ui-select-label>Entity Key</label><ui-select custom-ui-select-config=$ctrl.ownConfig name=entity ng-model=$ctrl.entity theme=bootstrap title=\"Choose a entity\" custom-ui-select multiple=true custom-mass-autocomplete-item=$ctrl.ownConfig on-select=\"$ctrl.entitySelected($item, $model)\" on-remove=\"$ctrl.entityRemove($item, $model)\" ng-required=$ctrl.isRequired><ui-select-match placeholder=\"Choose a entity\" allow-clear=true>{{$item.provision.subscription.identifier._current.value}}</ui-select-match><ui-select-choices repeat=\"subscriptionData in $ctrl.ownConfig.collection track by $index\"><span ng-bind-html=\"subscriptionData.provision.subscription.identifier._current.value | highlight: $select.search\"></span> <small><div ng-if=subscriptionData.provision.subscription.name._current.value>Name: <span ng-bind-html=\"\'\'+subscriptionData.provision.subscription.name._current.value | highlight: $select.search\"></span></div></small></ui-select-choices></ui-select></div><div class=form-group mass-autocomplete ng-if=!$ctrl.multiple><label class=custom-ui-select-label>Entity Key</label><ui-select custom-ui-select-config=$ctrl.ownConfig name=entity ng-model=$ctrl.entity theme=bootstrap title=\"Choose a entity\" custom-ui-select multiple=false custom-mass-autocomplete-item=$ctrl.ownConfig on-select=\"$ctrl.entitySelected($item, $model)\" on-remove=\"$ctrl.entityRemove($item, $model)\" ng-required=$ctrl.isRequired><ui-select-match placeholder=\"Choose a entity\" allow-clear=true>{{$item.provision.subscription.identifier._current.value}}</ui-select-match><ui-select-choices repeat=\"subscriptionData in $ctrl.ownConfig.collection track by $index\"><span ng-bind-html=\"subscriptionData.provision.subscription.identifier._current.value | highlight: $select.search\"></span> <small><div ng-if=subscriptionData.provision.subscription.name._current.value>Name: <span ng-bind-html=\"\'\'+subscriptionData.provision.subscription.name._current.value | highlight: $select.search\"></span></div></small></ui-select-choices></ui-select></div>");
$templateCache.put("views/helper.view.html","<div class=\"container col-md-12 col-xs-12\" ng-transclude></div><div class=\"col-xs-12 col-md-12\"><a class=\"btn btn-default btn-sm ux-txt-info pointer\" ng-href ng-click=$helper.open() ng-switch=$helper.mode><span ng-switch-when=button><i ng-class=$helper.helperButton aria-hidden=true></i></span> <span ng-switch-when=title>{{$helper.helperTitle}}</span> <span ng-switch-when=title_button><i ng-class=$helper.helperButton aria-hidden=true></i>{{$helper.helperTitle}}</span> <span ng-switch-default><i ng-if=\"!$helper.helperTitle && !$helper.helperButton\" class=\"fa fa-lg fa-search-plus\" aria-hidden=true></i> Helper</span></a></div><script type=text/ng-template id=helper.view.modal.html><div class=\"modal-header\"> <h4 class=\"modal-title\">Helper</h4> </div> <div class=\"modal-body without-padding-top\"> <uib-accordion close-others=\"true\"> <div uib-accordion-group is-open=\"$ctrl.mapIsOpen\" is-disabled=\"$ctrl.helper_exclusive ? !$ctrl.mapIsExclusive : false\" class=\"map-option\"> <div uib-accordion-heading>Map</div> <div class=\"row\" ng-if=\"$ctrl.mapIsOpen\"> <div class=\"col-xs-12\"> <div class=\"form-group leaflet-container\"> <leaflet id=\"map-marker\" lf-center=\"$ctrl.map.center\" event-broadcast=\"$ctrl.map.events\" markers=\"$ctrl.map.markers\" width=\"100% \" height=\"300px\"></leaflet> </div> </div> <div class=\"col-xs-12 text-right\" ng-if=\"$ctrl.helper_exclusive\"> <a class=\"top-buffer btn btn-default ux-txt-success pointer\" ng-class=\"{\'disabled\': !$ctrl.helper_keys.map}\" ng-click=\"$ctrl.ok(\'map\')\" ng-disabled=\"!$ctrl.helper_keys.map\"> <i class=\"fa fa-lg fa-files-o\" aria-hidden=\"true\"></i> </a> </div> </div> </div> <div uib-accordion-group is-open=\"$ctrl.entityIsOpen\" is-disabled=\"$ctrl.helper_exclusive ? !$ctrl.entityIsExclusive: false\" class=\"entity-option\"> <div uib-accordion-heading>Entity</div> <div class=\"row row-eq-height\"> <div class=\"col-xs-10\"> <custom-ui-select-entity on-select-item=\"onSelectEntityKey($item, $model)\" on-remove=\"onDeleteEntityKey()\" entity=\"$ctrl.entity.selected\" multiple=\"false\"> </custom-ui-select-entity> </div> <div class=\"col-xs-2 vcenter\" ng-if=\"$ctrl.helper_exclusive\"> <a class=\"top-buffer btn btn-default ux-txt-success pointer\" ng-class=\"{\'disabled\': !$ctrl.helper_keys.entity}\" ng-click=\"$ctrl.ok(\'entity\')\" ng-disabled=\"!$ctrl.helper_keys.entity\"> <i class=\"fa fa-lg fa-files-o\" aria-hidden=\"true\"></i> </a> </div> </div> </div> <div uib-accordion-group is-open=\"$ctrl.subscriberIsOpen\" class=\"subscriber-option\" is-disabled=\"$ctrl.helper_exclusive ? (!$ctrl.entityIsExclusive && !$ctrl.subscriberIsExclusive): false\"> <div uib-accordion-heading>Subscribers</div> <div class=\"row row-eq-height\"> <div class=\"col-xs-10\"> <custom-ui-select-subscriber on-select-item=\"onSelectSubscriberKey($item, $model)\" specific-type=\"{{$ctrl.specific_type}}\" on-remove=\"onDeleteSubscriberKey()\" entity=\"$ctrl.subscriber.selected\" multiple=\"false\"> </custom-ui-select-subscriber> </div> <div class=\"col-xs-2 vcenter\" ng-if=\"$ctrl.helper_exclusive\"> <a class=\"top-buffer btn btn-default ux-txt-success pointer\" ng-class=\"{\'disabled\': !$ctrl.helper_keys.subscriber}\" ng-click=\"$ctrl.ok(\'subscriber\')\" ng-disabled=\"!$ctrl.helper_keys.subscriber\"> <i class=\"fa fa-lg fa-files-o\" aria-hidden=\"true\"></i> </a> </div> </div> </div> <div uib-accordion-group is-open=\"$ctrl.subscriptionIsOpen\" class=\"subscription-option\" is-disabled=\"$ctrl.helper_exclusive ? (!$ctrl.entityIsExclusive && !$ctrl.subscriptionIsExclusive): false\"> <div uib-accordion-heading>Subscriptions</div> <div class=\"row row-eq-height\"> <div class=\"col-xs-10\"> <custom-ui-select-subscription on-select-item=\"onSelectSubscriptionKey($item, $model)\" specific-type=\"{{$ctrl.specific_type}}\" on-remove=\"onDeleteSubscriptionKey()\" entity=\"$ctrl.subscription.selected\" multiple=\"false\"> </custom-ui-select-subscription> </div> <div class=\"col-xs-2 vcenter\" ng-if=\"$ctrl.helper_exclusive\"> <a class=\"top-buffer btn btn-default ux-txt-success pointer\" ng-class=\"{\'disabled\': !$ctrl.helper_keys.subscription}\" ng-click=\"$ctrl.ok(\'subscription\')\" ng-disabled=\"!$ctrl.helper_keys.subscription\"> <i class=\"fa fa-lg fa-files-o\" aria-hidden=\"true\"></i> </a> </div> </div> </div> <div uib-accordion-group is-open=\"$ctrl.datastreamIsOpen\" is-disabled=\"$ctrl.helper_exclusive ? !$ctrl.datastreamIsExclusive: false\" class=\"datastream-option\"> <div uib-accordion-heading>Datastream</div> <div class=\"row row-eq-height\"> <div class=\"col-xs-10\"> <custom-ui-select-datastream on-select-item=\"onSelectDatastreamKey($item, $model)\" on-remove=\"onDeleteDatastreamKey()\" datastream=\"$ctrl.datastream.selected\" multiple=\"false\"> </custom-ui-select-datastream> </div> <div class=\"col-xs-2 vcenter\" ng-if=\"$ctrl.helper_exclusive\"> <a class=\"top-buffer btn btn-default ux-txt-success pointer\" ng-class=\"{\'disabled\': !$ctrl.helper_keys.datastream}\" ng-click=\"$ctrl.ok(\'datastream\')\" ng-disabled=\"!$ctrl.helper_keys.datastream\"> <i class=\"fa fa-lg fa-files-o\" aria-hidden=\"true\"></i> </a> </div> </div> </div> <div uib-accordion-group is-open=\"$ctrl.areaIsOpen\" class=\"area-option\" is-disabled=\"$ctrl.helper_exclusive ? !$ctrl.areaIsExclusive: false\"> <div uib-accordion-heading>Areas</div> <div class=\"row row-eq-height\"> <div class=\"col-xs-10\"> <custom-ui-select-area on-select-item=\"onSelectAreaKey($item, $model)\" on-remove=\"onDeleteAreaKey()\" area=\"$ctrl.area.selected\" organization=\"$ctrl.area.organization\" multiple=\"false\"> </custom-ui-select-area> </div> <div class=\"col-xs-2 vcenter\" ng-if=\"$ctrl.helper_exclusive\"> <a class=\"top-buffer btn btn-default ux-txt-success pointer\" ng-class=\"{\'disabled\': !$ctrl.helper_keys.area}\" ng-click=\"$ctrl.ok(\'area\')\" ng-disabled=\"!$ctrl.helper_keys.area\"> <i class=\"fa fa-lg fa-files-o\" aria-hidden=\"true\"></i> </a> </div> </div> </div> <div uib-accordion-group is-open=\"$ctrl.bundleIsOpen\" class=\"bundle-option\" is-disabled=\"$ctrl.helper_exclusive ? !$ctrl.bundleIsExclusive: false\"> <div uib-accordion-heading>Bundles</div> <div class=\"row row-eq-height\"> <div class=\"col-xs-10\"> <custom-ui-select-bundle on-select-item=\"onSelectBundleKey($item, $model)\" on-remove=\"onDeleteBundleKey()\" bundle=\"$ctrl.bundle.selected\" multiple=\"false\"> </custom-ui-select-bundle> </div> <div class=\"col-xs-2 vcenter\" ng-if=\"$ctrl.helper_exclusive\"> <a class=\"top-buffer btn btn-default ux-txt-success pointer\" ng-class=\"{\'disabled\': !$ctrl.helper_keys.bundle}\" ng-click=\"$ctrl.ok(\'bundle\')\" ng-disabled=\"!$ctrl.helper_keys.bundle\"> <i class=\"fa fa-lg fa-files-o\" aria-hidden=\"true\"></i> </a> </div> </div> </div> </uib-accordion> </div> <div class=\"modal-footer\"> <a ng-if=\"!$ctrl.helper_exclusive\" class=\"top-buffer btn btn-default ux-txt-success pointer\" ng-class=\"{\'disabled\': !$ctrl.canApply()}\" ng-click=\"$ctrl.ok()\" ng-disabled=\"!$ctrl.canApply()\"> <i class=\"fa fa-lg fa-files-o\" aria-hidden=\"true\"></i> All </a> <button class=\"btn btn-warning\" type=\"button\" ng-click=\"$ctrl.cancel()\">Cancel</button> </div></script>");
$templateCache.put("views/schema.form.datastream.template.html","<div><custom-ui-select-datastream on-select-item=\"evalExpr(form.onselectitem, {$item: $$value$$, $model: $model})\" on-remove=\"evalExpr(form.onremove, {$item: $$value$$, $model: $model})\" datastream=$$value$$ multiple={{form.multiple}}></custom-ui-select-datastream></div>");
$templateCache.put("views/schema.form.entity.template.html","<div><custom-ui-select-entity on-select-item=\"evalExpr(form.onselectitem, {$item: $$value$$, $model: $model})\" on-remove=\"evalExpr(form.onremove, {$item: $$value$$, $model: $model})\" entity=$$value$$ multiple={{form.multiple}}></custom-ui-select-entity></div>");
$templateCache.put("views/schema.form.helper.template.html","<div class=form-group><helper-dialog helper-id={{form.helperid}} helper-exclusive={{form.exclusive}}><helper-ui-select id={{form.id}} name={{form.name}} label-text={{form.title}} helper-model=$$value$$ label-error={{form.labelerror}} required={{form.required}}><helper-ui-select-input><label for={{form.name}}>{{form.title}}</label> <input class=form-control name={{form.name}} type=text id={{form.id}} ng-model=$$value$$ ng-required=form.required></helper-ui-select-input></helper-ui-select></helper-dialog></div>");
$templateCache.put("views/window-time.select.view.html","<div class=window-time-container><button type=button class=\"btn btn-xs\" ng-class=oneDayClass ng-click=oneDay()>Last day</button> <button type=button class=\"btn btn-xs\" ng-class=oneWeekClass ng-click=oneWeek()>Last 7 days</button> <button type=button class=\"btn btn-xs\" ng-class=oneMonthClass ng-click=oneMonth()>Last 30 days</button> <button type=button class=\"btn btn-xs\" ng-class=customClass ng-click=custom()>Custom</button> <button type=button class=\"btn btn-xs btn-info\" ng-if=customEnabled ng-disabled=!!errorCustomWindow ng-click=applyCustom()>Apply</button> <button type=button class=\"btn btn-xs btn-info\" ng-if=filterApplied ng-click=clear()>Clear</button><div ng-if=customEnabled class=window-time-body><div class=row><div class=col-xs-12><p class=input-group><label class=control-label>From: {{fromDate | date:\'fullDate\'}}</label> <input readonly datepicker-options=fromOptions type=text class=form-control show-button-bar=false uib-datepicker-popup={{format}} ng-model=date.from is-open=fromPopup.opened ng-required=true close-text=Close ng-change=fromChange()> <span class=input-group-btn><a class=\"btn btn-sm\" ng-click=fromOpen()><i class=\"glyphicon glyphicon-calendar\"></i></a></span></p></div><div class=col-xs-12><div uib-timepicker max=fromMax ng-model=date.from show-meridian=false ng-change=fromChange()></div></div></div><div class=row><div class=col-xs-12><p class=input-group><label class=control-label>To: {{toDate | date:\'fullDate\'}}</label> <input readonly datepicker-options=toOptions type=text class=form-control show-button-bar=false uib-datepicker-popup={{format}} ng-model=date.to is-open=toPopup.opened ng-required=true close-text=Close ng-change=toChange()> <span class=input-group-btn><button type=button class=\"btn btn-sm\" ng-click=toOpen()><i class=\"glyphicon glyphicon-calendar\"></i></button></span></p></div><div class=col-xs-12><div uib-timepicker max=toMax min=toMin ng-model=date.to show-meridian=false ng-change=toChange()></div></div></div><alert type=danger ng-show=errorCustomWindow class=text-danger style=\"display: block;text-align: center;\"><span ng-bind=errorCustomWindow></span></alert></div></div>");}]);

angular.module('opengate-angular-js').service('$oguxThemes', [
    function() {
        var themeCompositionTheme = 'light';
        var themeCompositionColor = 'orange';
        var themeComposition = themeCompositionTheme + ' ' + themeCompositionColor;

        var themes = [{
            'name': 'default'
        }, {
            'name': 'light'
        }];

        var colorThemes = {
            'red': {
                'id': 'red',
                'sample': '#f44336',
                'rgba': 'rgba(244, 67, 54, 0.5)',
                'name': 'Red',
                'theme': ['light', 'default']
            },
            'pink': {
                'id': 'pink',
                'sample': '#e91e63',
                'rgba': 'rgba(233, 30, 99, 0.5)',
                'name': 'Pink',
                'theme': ['light', 'default']
            },
            'purple': {
                'id': 'purple',
                'sample': '#9c27b0',
                'rgba': 'rgba(156, 39, 176, 0.5)',
                'name': 'Purple',
                'theme': ['light']
            },
            'deeppurple': {
                'id': 'deeppurple',
                'sample': '#673ab7',
                'rgba': 'rgba(103, 10, 183, 0.5)',
                'name': 'Deep Purple',
                'theme': ['light']
            },
            'indigo': {
                'id': 'indigo',
                'sample': '#3f51b5',
                'rgba': 'rgba(63, 81, 181, 0.5)',
                'name': 'Indigo',
                'theme': ['light']
            },
            'blue': {
                'id': 'blue',
                'sample': '#2196f3',
                'rgba': 'rgba(33, 150, 243, 0.5)',
                'name': 'Blue',
                'theme': ['light', 'default']
            },
            'lightblue': {
                'id': 'lightblue',
                'sample': '#03a9f4',
                'rgba': 'rgba(3, 169, 244, 0.5)',
                'name': 'Light Blue',
                'theme': ['light', 'default']
            },
            'cyan': {
                'id': 'cyan',
                'sample': '#00bcd4',
                'rgba': 'rgba(0, 188, 212, 0.5)',
                'name': 'Cyan',
                'theme': ['light', 'default']
            },
            'teal': {
                'id': 'teal',
                'sample': '#009688',
                'rgba': 'rgba(0, 150, 136, 0.5)',
                'name': 'Teal',
                'theme': ['light', 'default']
            },
            'green': {
                'id': 'green',
                'sample': '#4caf50',
                'rgba': 'rgba(76, 175, 80, 0.5)',
                'name': 'Green',
                'theme': ['light', 'default']
            },
            'lightgreen': {
                'id': 'lightgreen',
                'sample': '#8bc34a',
                'rgba': 'rgba(139, 195, 74, 0.5)',
                'name': 'Light Green',
                'theme': ['light', 'default']
            },
            'lime': {
                'id': 'lime',
                'sample': '#cddc39',
                'rgba': 'rgba(205, 220, 57, 0.5)',
                'name': 'Lime',
                'theme': ['default']
            },
            'yellow': {
                'id': 'yellow',
                'sample': '#ffeb3b',
                'rgba': 'rgba(255, 235, 59, 0.5)',
                'name': 'Yellow',
                'theme': ['default']
            },
            'amber': {
                'id': 'amber',
                'sample': '#ffc107',
                'rgba': 'rgba(255, 193, 7, 0.5)',
                'name': 'Amber',
                'theme': ['default']
            },
            'orange': {
                'id': 'orange',
                'sample': '#ff9800',
                'rgba': 'rgba(255, 152, 0, 0.5)',
                'name': 'Orange',
                'theme': ['light', 'default']
            },
            'deeporange': {
                'id': 'deeporange',
                'sample': '#ff5722',
                'rgba': 'rgba(255, 87, 34, 0.5)',
                'name': 'Deep Orange',
                'theme': ['light', 'default']
            },
            'brown': {
                'id': 'brown',
                'sample': '#795548',
                'rgba': 'rgba(121, 85, 72, 0.5)',
                'name': 'Brown',
                'theme': ['light']
            },
            'grey': {
                'id': 'grey',
                'sample': '#9e9e9e',
                'rgba': 'rgba(33, 150, 243, 1)',
                'name': 'Grey',
                'theme': ['light', 'default']
            },
            'bluegrey': {
                'id': 'bluegrey',
                'sample': '#607d8b',
                'rgba': 'rgba(96, 125, 139, 0.5)',
                'name': 'Blue Grey',
                'theme': ['light', 'default']
            },
            'darkgrey': {
                'id': 'darkgrey',
                'sample': '#2D2D2D',
                'rgba': 'rgba(45, 45, 45, 0.5)',
                'name': 'Dark Grey',
                'theme': ['light']
            }
        };

        return {
            setThemeComposition: function(_themeComposition) {
                themeComposition = _themeComposition;
                var tc = themeComposition.split(' ');
                themeCompositionTheme = tc[0];
                themeCompositionColor = tc[1];
            },
            colors: function() {
                return colorThemes;
            },
            themes: function() {
                return themes;
            },
            getColorConfig: function(colorId) {
                if (colorThemes[colorId]) {
                    return colorThemes[colorId];
                } else {
                    return undefined;
                }
            },
            getColorsKeys: function() {
                return Object.keys(colorThemes);
            },
            colorsByTheme: function(theme) {
                var themeColors = [];
                angular.forEach(colorThemes, function(config, color) {
                    if (config.theme.indexOf(theme) !== -1) {
                        themeColors.push(config);
                    }
                });
                return themeColors;
            },
            getThemeFromThemeComposition: function() {
                return themeCompositionTheme;
            },
            getColorFromThemeComposition: function() {
                return colorThemes[themeCompositionColor];
            }
        };
    }
]);


angular.module('opengate-angular-js')
    .service('$ogapi', function() {
        function OgApiService() {
            var ogapi = undefined;
            this.api = function() {
                if (typeof ogapi !== "undefined") return ogapi;
                else throw new Error("Must invoke create([options]) function before api() function");
            };
            this.create = function(options) {
                return ogapi = new window.OpenGateAPI(options);
            };
            this.release = function() {
                ogapi = undefined;
                return this;
            };
        }
        return new OgApiService();
    });

angular.module('opengate-angular-js').service('$ogapiErrorParser', [
    // EXAMPLE
    // [{
    //     "code": 20481,
    //     "description": "Filter path does not exists",
    //     "context": [{
    //         "name": "Filter field path",
    //         "value": "datamodel.organizationName"
    //     }]
    // }]

    function() {
        return {
            toString: function(error, errorSeparatorString) {
                var errorMessage = '';
                if (error.data && (error.data.errors && error.data.errors.length > 0)) {
                    for (var i = 0; i < error.data.errors.length; i++) {
                        errorMessage += (error.data.errors[i].message || error.data.errors[i].description) + (errorSeparatorString ? errorSeparatorString : '\n');
                    }
                } else if (error.data && error.data.length > 0) {
                    if (angular.isArray(error.data)) {
                        for (var i = 0; i < error.data.length; i++) {
                            errorMessage += error.data[i].description + (errorSeparatorString ? errorSeparatorString : '\n');
                        }
                    } else {
                        errorMessage = error.data;
                    }
                } else {
                    errorMessage = error;
                }

                return errorMessage;
            },
            toStringArray: function(error) {
                var errorMessage = [];
                if (error.data && (error.data.errors && error.data.errors.length > 0)) {
                    for (var i = 0; i < error.data.errors.length; i++) {
                        errorMessage.push(error.data.errors[i].message);
                    }
                } else if (error.data && error.data.length > 0) {
                    if (angular.isArray(error.data)) {
                        for (var i = 0; i < error.data.length; i++) {
                            errorMessage.push(error.data[i].description);
                        }
                    } else {
                        errorMessage.push(error.data[i]);
                    }
                } else {
                    errorMessage.push(error.data);
                }

                return errorMessage;
            }
        };
    }
]);


angular.module('opengate-angular-js')
    .service('$jsonFinderHelper', ['jsonPath',
        function (jsonPath) {
            JsonFinderHelper.prototype.jsonPath = jsonPath;
            return {
                administration: new JsonFinderHelper(),
                provisioned: new ProvisionJsonFinderHelper(),
                collected: new CollectedJsonFinderHelper(),
                subscriber: {
                    collected: new SubscriberCollectedJsonFinderHelper(),
                    provisioned: new SubscriberProvisionJsonFinderHelper()
                },
                subscription: {
                    collected: new SubscriptionCollectedJsonFinderHelper(),
                    provisioned: new SubscriptionProvisionJsonFinderHelper()
                },
                asset: {
                    collected: new AssetCollectedJsonFinderHelper(),
                    provisioned: new AssetProvisionJsonFinderHelper()
                },
                human: {
                    collected: new HumanCollectedJsonFinderHelper(),
                    provisioned: new HumanProvisionJsonFinderHelper()
                }
            };
        }
    ]);

JsonFinderHelper.prototype.getPath = function (field) {
    if (!this.fields[field]) throw new Error('Field <' + field + '> not found. Available:' + JSON.stringify(Object.keys(this.fields)));
    return this.fields[field].replace('[]', '[*]');
};
JsonFinderHelper.prototype.getAmpliaPath = function (field) {
    if (!this.fields[field]) throw new Error('Field <' + field + '> not found. Available:' + JSON.stringify(Object.keys(this.fields)));
    return this.fields[field];
};
JsonFinderHelper.prototype.findOne = function (data, field) {
    return this.findAll(data, field)[0];
};
JsonFinderHelper.prototype.findAll = function (data, field) {
    return this.jsonPath(data, this.getPath(field) + '._current.value') || [];
};

function JsonFinderHelper() {
    Object.defineProperty(this, 'fields', {
        value: {
            'identifier': 'provision.administration.identifier',
            'organization': 'provision.administration.organization',
            'serviceGroup': 'provision.administration.serviceGroup',
            'channel': 'provision.administration.channel',
            'feed': 'provision.administration.defaultFeed',
            'resourceType': 'resourceType'
        },
        writable: false
    });
}

CollectedJsonFinderHelper.prototype = new JsonFinderHelper();

function CollectedJsonFinderHelper() {
    Object.defineProperty(this, 'fields', {
        value: {
            'specificType': 'device.specificType',
            'location': 'device.location',
            'name': 'device.name',
            'description': 'device.description',
            'operationalStatus': 'device.operationalStatus',
            'serialNumber': 'device.serialNumber',
            'identifier': 'device.identifier',
            'model': 'device.model',
            'software': 'device.software',
            'trustedBoot': 'device.trustedBoot',

            'commsModuleIdentifier': 'provision.device.communicationModules[].identifier',
            'commsModuleSpecificType': 'provision.device.communicationModules[].specificType',
            'commsModuleImei': 'provision.device.communicationModules[].mobile.imei',

            'subscriberIdentifier': 'device.communicationModules[].subscriber.identifier',
            'subscriberSerialNumber': 'device.communicationModules[].subscriber.serialNumber',
            'subscriberSpecificType': 'device.communicationModules[].subscriber.specificType',
            'subscriberName': 'device.communicationModules[].subscriber.name',
            'subscriberDescription': 'device.communicationModules[].subscriber.description',

            'subscriptionIdentifier': 'device.communicationModules[].subscription.identifier',
            'subscriptionSpecificType': 'device.communicationModules[].subscription.specificType',
            'subscriptionName': 'device.communicationModules[].subscription.name',
            'subscriptionDescription': 'device.communicationModules[].subscription.description',
            'subscriptionImsi': 'device.communicationModules[].subscription.mobile.imsi',
            'subscriptionMsisdn': 'device.communicationModules[].subscription.mobile.msisdn',
            'subscriptionMsisdnVoice': 'device.communicationModules[].subscription.mobile.voice.msisdn',
            'subscriptionAddress': 'device.communicationModules[].subscription.address',
            'subscriptionHomeOperator': 'device.communicationModules[].subscription.mobile.homeOperator',
            'subscriptionRegisteredOperator': 'device.communicationModules[].subscription.mobile.registeredOperator'
        },
        writable: false
    });
}

ProvisionJsonFinderHelper.prototype = new CollectedJsonFinderHelper();

ProvisionJsonFinderHelper.prototype.getPath = function (field) {
    var path = JsonFinderHelper.prototype.getPath.call(this, field);
    if (!path.startsWith('provision.')) {
        path = 'provision.' + path;
    }
    return path;
};
ProvisionJsonFinderHelper.prototype.getAmpliaPath = function (field) {
    var path = JsonFinderHelper.prototype.getAmpliaPath.call(this, field);
    if (!path.startsWith('provision.')) {
        path = 'provision.' + path;
    }
    return path;
};

function ProvisionJsonFinderHelper() {
    Object.defineProperty(this, 'fields', {
        value: Object.assign({},
            this.fields, {
                'adState': 'provision.device.administrativeState',
                'certificates': 'provision.device.certificates',
                'subscriberAdState': 'device.communicationModules[].subscriber.administrativeState',
                'subscriptionAdState': 'device.communicationModules[].subscription.administrativeState',
                'subscriberIcc': 'provision.device.communicationModules[].subscriber.mobile.icc'
            }),
        writable: false
    });
}

SubscriberCollectedJsonFinderHelper.prototype = new CollectedJsonFinderHelper();
SubscriberCollectedJsonFinderHelper.prototype.getPath = function (field) {
    var path = CollectedJsonFinderHelper.prototype.getPath.call(this, field);
    return path.replace('device.communicationModules[*].subscriber', '');
};

SubscriberProvisionJsonFinderHelper.prototype = new ProvisionJsonFinderHelper();
SubscriberProvisionJsonFinderHelper.prototype.getPath = function (field) {
    var path = ProvisionJsonFinderHelper.prototype.getPath.call(this, field);
    return path.replace('device.communicationModules[*].subscriber', '');
};

SubscriptionCollectedJsonFinderHelper.prototype = new CollectedJsonFinderHelper();
SubscriptionCollectedJsonFinderHelper.prototype.getPath = function (field) {
    var path = CollectedJsonFinderHelper.prototype.getPath.call(this, field);
    return path.replace('device.communicationModules[*].subscription', '');
};

SubscriptionProvisionJsonFinderHelper.prototype = new ProvisionJsonFinderHelper();
SubscriptionProvisionJsonFinderHelper.prototype.getPath = function (field) {
    var path = ProvisionJsonFinderHelper.prototype.getPath.call(this, field);
    return path.replace('device.communicationModules[*].subscription', '');
};

////////////////////////////
AssetCollectedJsonFinderHelper.prototype = new CollectedJsonFinderHelper();

AssetCollectedJsonFinderHelper.prototype.getPath = function (field) {
    var path = CollectedJsonFinderHelper.prototype.getPath.call(this, field);
    return path.replace('device.', 'asset.');
};

function AssetCollectedJsonFinderHelper() {
    Object.defineProperty(this, 'fields', {
        value: Object.assign({},
            this.fields, {
                'image': 'asset.image'
            }),
        writable: false
    });
}

AssetProvisionJsonFinderHelper.prototype = new ProvisionJsonFinderHelper();
AssetProvisionJsonFinderHelper.prototype.getPath = function (field) {
    var path = ProvisionJsonFinderHelper.prototype.getPath.call(this, field);
    return path.replace('device.', 'asset.');
};

HumanCollectedJsonFinderHelper.prototype = new AssetCollectedJsonFinderHelper();

HumanCollectedJsonFinderHelper.prototype.getPath = function (field) {
    var path = AssetCollectedJsonFinderHelper.prototype.getPath.call(this, field);
    var result = path.replace('asset.', 'human.');
    return result.replace('device.', 'human.');
};

function HumanCollectedJsonFinderHelper() {
    Object.defineProperty(this, 'fields', {
        value: Object.assign({},
            this.fields, {
                'surname': 'human.surname',
                'surname2': 'human.surname2',
                'birthdate': 'human.birthdate'
            }),
        writable: false
    });
}

HumanProvisionJsonFinderHelper.prototype = new AssetProvisionJsonFinderHelper();

HumanProvisionJsonFinderHelper.prototype.getPath = function (field) {
    var path = AssetProvisionJsonFinderHelper.prototype.getPath.call(this, field);
    var result = path.replace('asset.', 'human.');
    return result.replace('device.', 'human.');
};
////////////////////////////

function SubscriberProvisionJsonFinderHelper() {}

function SubscriberCollectedJsonFinderHelper() {}

function SubscriptionCollectedJsonFinderHelper() {}

function SubscriptionProvisionJsonFinderHelper() {}

function AssetCollectedJsonFinderHelper() {}

function AssetProvisionJsonFinderHelper() {}

function HumanCollectedJsonFinderHelper() {}

function HumanProvisionJsonFinderHelper() {}


/**
 * Service that contains a list of font awesome 4.7.x icons
 */
angular.module('opengate-angular-js').service('$faIcons', [
    function() {
        var availableIcons = ['fa-500px', 'fa-address-book', 'fa-address-book-o', 'fa-address-card', 'fa-address-card-o', 'fa-adjust', 'fa-adn',
            'fa-align-center', 'fa-align-justify', 'fa-align-left', 'fa-align-right', 'fa-amazon', 'fa-ambulance',
            'fa-american-sign-language-interpreting', 'fa-anchor', 'fa-android', 'fa-angellist', 'fa-angle-double-down',
            'fa-angle-double-left', 'fa-angle-double-right', 'fa-angle-double-up', 'fa-angle-down', 'fa-angle-left', 'fa-angle-right',
            'fa-angle-up', 'fa-apple', 'fa-archive', 'fa-area-chart', 'fa-arrow-circle-down', 'fa-arrow-circle-left',
            'fa-arrow-circle-o-down', 'fa-arrow-circle-o-left', 'fa-arrow-circle-o-right', 'fa-arrow-circle-o-up',
            'fa-arrow-circle-right', 'fa-arrow-circle-up', 'fa-arrow-down', 'fa-arrow-left', 'fa-arrow-right', 'fa-arrow-up', 'fa-arrows',
            'fa-arrows-alt', 'fa-arrows-h', 'fa-arrows-v', 'fa-asl-interpreting', 'fa-assistive-listening-systems', 'fa-asterisk',
            'fa-at', 'fa-audio-description', 'fa-automobile', 'fa-backward', 'fa-balance-scale', 'fa-ban', 'fa-bandcamp', 'fa-bank',
            'fa-bar-chart', 'fa-bar-chart-o', 'fa-barcode', 'fa-bars', 'fa-bath', 'fa-bathtub', 'fa-battery', 'fa-battery-0',
            'fa-battery-1', 'fa-battery-2', 'fa-battery-3', 'fa-battery-4', 'fa-battery-empty', 'fa-battery-full', 'fa-battery-half',
            'fa-battery-quarter', 'fa-battery-three-quarters', 'fa-bed', 'fa-beer', 'fa-behance', 'fa-behance-square', 'fa-bell',
            'fa-bell-o', 'fa-bell-slash', 'fa-bell-slash-o', 'fa-bicycle', 'fa-binoculars', 'fa-birthday-cake', 'fa-bitbucket',
            'fa-bitbucket-square', 'fa-bitcoin', 'fa-black-tie', 'fa-blind', 'fa-bluetooth', 'fa-bluetooth-b', 'fa-bold', 'fa-bolt',
            'fa-bomb', 'fa-book', 'fa-bookmark', 'fa-bookmark-o', 'fa-braille', 'fa-briefcase', 'fa-btc', 'fa-bug', 'fa-building',
            'fa-building-o', 'fa-bullhorn', 'fa-bullseye', 'fa-bus', 'fa-buysellads', 'fa-cab', 'fa-calculator', 'fa-calendar',
            'fa-calendar-check-o', 'fa-calendar-minus-o', 'fa-calendar-o', 'fa-calendar-plus-o', 'fa-calendar-times-o', 'fa-camera',
            'fa-camera-retro', 'fa-car', 'fa-caret-down', 'fa-caret-left', 'fa-caret-right', 'fa-caret-square-o-down',
            'fa-caret-square-o-left', 'fa-caret-square-o-right', 'fa-caret-square-o-up', 'fa-caret-up', 'fa-cart-arrow-down',
            'fa-cart-plus', 'fa-cc', 'fa-cc-amex', 'fa-cc-diners-club', 'fa-cc-discover', 'fa-cc-jcb', 'fa-cc-mastercard', 'fa-cc-paypal',
            'fa-cc-stripe', 'fa-cc-visa', 'fa-certificate', 'fa-chain', 'fa-chain-broken', 'fa-check', 'fa-check-circle',
            'fa-check-circle-o', 'fa-check-square', 'fa-check-square-o', 'fa-chevron-circle-down', 'fa-chevron-circle-left',
            'fa-chevron-circle-right', 'fa-chevron-circle-up', 'fa-chevron-down', 'fa-chevron-left', 'fa-chevron-right', 'fa-chevron-up',
            'fa-child', 'fa-chrome', 'fa-circle', 'fa-circle-o', 'fa-circle-o-notch', 'fa-circle-thin', 'fa-clipboard', 'fa-clock-o',
            'fa-clone', 'fa-close', 'fa-cloud', 'fa-cloud-download', 'fa-cloud-upload', 'fa-cny', 'fa-code', 'fa-code-fork', 'fa-codepen',
            'fa-codiepie', 'fa-coffee', 'fa-cog', 'fa-cogs', 'fa-columns', 'fa-comment', 'fa-comment-o', 'fa-commenting',
            'fa-commenting-o', 'fa-comments', 'fa-comments-o', 'fa-compass', 'fa-compress', 'fa-connectdevelop', 'fa-contao', 'fa-copy',
            'fa-copyright', 'fa-creative-commons', 'fa-credit-card', 'fa-credit-card-alt', 'fa-crop', 'fa-crosshairs', 'fa-css3',
            'fa-cube', 'fa-cubes', 'fa-cut', 'fa-cutlery', 'fa-dashboard', 'fa-dashcube', 'fa-database', 'fa-deaf', 'fa-deafness',
            'fa-dedent', 'fa-delicious', 'fa-desktop', 'fa-deviantart', 'fa-diamond', 'fa-digg', 'fa-dollar', 'fa-dot-circle-o',
            'fa-download', 'fa-dribbble', 'fa-drivers-license', 'fa-drivers-license-o', 'fa-dropbox', 'fa-drupal', 'fa-edge', 'fa-edit',
            'fa-eercast', 'fa-eject', 'fa-ellipsis-h', 'fa-ellipsis-v', 'fa-empire', 'fa-envelope', 'fa-envelope-o', 'fa-envelope-open',
            'fa-envelope-open-o', 'fa-envelope-square', 'fa-envira', 'fa-eraser', 'fa-etsy', 'fa-eur', 'fa-euro', 'fa-exchange',
            'fa-exclamation', 'fa-exclamation-circle', 'fa-exclamation-triangle', 'fa-expand', 'fa-expeditedssl', 'fa-external-link',
            'fa-external-link-square', 'fa-eye', 'fa-eye-slash', 'fa-eyedropper', 'fa-fa', 'fa-facebook', 'fa-facebook-f',
            'fa-facebook-official', 'fa-facebook-square', 'fa-fast-backward', 'fa-fast-forward', 'fa-fax', 'fa-feed', 'fa-female',
            'fa-fighter-jet', 'fa-file', 'fa-file-archive-o', 'fa-file-audio-o', 'fa-file-code-o', 'fa-file-excel-o', 'fa-file-image-o',
            'fa-file-movie-o', 'fa-file-o', 'fa-file-pdf-o', 'fa-file-photo-o', 'fa-file-picture-o', 'fa-file-powerpoint-o',
            'fa-file-sound-o', 'fa-file-text', 'fa-file-text-o', 'fa-file-video-o', 'fa-file-word-o', 'fa-file-zip-o', 'fa-files-o',
            'fa-film', 'fa-filter', 'fa-fire', 'fa-fire-extinguisher', 'fa-firefox', 'fa-first-order', 'fa-flag', 'fa-flag-checkered',
            'fa-flag-o', 'fa-flash', 'fa-flask', 'fa-flickr', 'fa-floppy-o', 'fa-folder', 'fa-folder-o', 'fa-folder-open',
            'fa-folder-open-o', 'fa-font', 'fa-font-awesome', 'fa-fonticons', 'fa-fort-awesome', 'fa-forumbee', 'fa-forward',
            'fa-foursquare', 'fa-free-code-camp', 'fa-frown-o', 'fa-futbol-o', 'fa-gamepad', 'fa-gavel', 'fa-gbp', 'fa-ge', 'fa-gear',
            'fa-gears', 'fa-genderless', 'fa-get-pocket', 'fa-gg', 'fa-gg-circle', 'fa-gift', 'fa-git', 'fa-git-square', 'fa-github',
            'fa-github-alt', 'fa-github-square', 'fa-gitlab', 'fa-gittip', 'fa-glass', 'fa-glide', 'fa-glide-g', 'fa-globe', 'fa-google',
            'fa-google-plus', 'fa-google-plus-circle', 'fa-google-plus-official', 'fa-google-plus-square', 'fa-google-wallet',
            'fa-graduation-cap', 'fa-gratipay', 'fa-grav', 'fa-group', 'fa-h-square', 'fa-hacker-news', 'fa-hand-grab-o',
            'fa-hand-lizard-o', 'fa-hand-o-down', 'fa-hand-o-left', 'fa-hand-o-right', 'fa-hand-o-up', 'fa-hand-paper-o',
            'fa-hand-peace-o', 'fa-hand-pointer-o', 'fa-hand-rock-o', 'fa-hand-scissors-o', 'fa-hand-spock-o', 'fa-hand-stop-o',
            'fa-handshake-o', 'fa-hard-of-hearing', 'fa-hashtag', 'fa-hdd-o', 'fa-header', 'fa-headphones', 'fa-heart', 'fa-heart-o',
            'fa-heartbeat', 'fa-history', 'fa-home', 'fa-hospital-o', 'fa-hotel', 'fa-hourglass', 'fa-hourglass-1', 'fa-hourglass-2',
            'fa-hourglass-3', 'fa-hourglass-end', 'fa-hourglass-half', 'fa-hourglass-o', 'fa-hourglass-start', 'fa-houzz', 'fa-html5',
            'fa-i-cursor', 'fa-id-badge', 'fa-id-card', 'fa-id-card-o', 'fa-ils', 'fa-image', 'fa-imdb', 'fa-inbox', 'fa-indent',
            'fa-industry', 'fa-info', 'fa-info-circle', 'fa-inr', 'fa-instagram', 'fa-institution', 'fa-internet-explorer', 'fa-intersex',
            'fa-ioxhost', 'fa-italic', 'fa-joomla', 'fa-jpy', 'fa-jsfiddle', 'fa-key', 'fa-keyboard-o', 'fa-krw', 'fa-language',
            'fa-laptop', 'fa-lastfm', 'fa-lastfm-square', 'fa-leaf', 'fa-leanpub', 'fa-legal', 'fa-lemon-o', 'fa-level-down',
            'fa-level-up', 'fa-life-bouy', 'fa-life-buoy', 'fa-life-ring', 'fa-life-saver', 'fa-lightbulb-o', 'fa-line-chart', 'fa-link',
            'fa-linkedin', 'fa-linkedin-square', 'fa-linode', 'fa-linux', 'fa-list', 'fa-list-alt', 'fa-list-ol', 'fa-list-ul',
            'fa-location-arrow', 'fa-lock', 'fa-long-arrow-down', 'fa-long-arrow-left', 'fa-long-arrow-right', 'fa-long-arrow-up',
            'fa-low-vision', 'fa-magic', 'fa-magnet', 'fa-mail-forward', 'fa-mail-reply', 'fa-mail-reply-all', 'fa-male', 'fa-map',
            'fa-map-marker', 'fa-map-o', 'fa-map-pin', 'fa-map-signs', 'fa-mars', 'fa-mars-double', 'fa-mars-stroke', 'fa-mars-stroke-h',
            'fa-mars-stroke-v', 'fa-maxcdn', 'fa-meanpath', 'fa-medium', 'fa-medkit', 'fa-meetup', 'fa-meh-o', 'fa-mercury',
            'fa-microchip', 'fa-microphone', 'fa-microphone-slash', 'fa-minus', 'fa-minus-circle', 'fa-minus-square', 'fa-minus-square-o',
            'fa-mixcloud', 'fa-mobile', 'fa-mobile-phone', 'fa-modx', 'fa-money', 'fa-moon-o', 'fa-mortar-board', 'fa-motorcycle',
            'fa-mouse-pointer', 'fa-music', 'fa-navicon', 'fa-neuter', 'fa-newspaper-o', 'fa-object-group', 'fa-object-ungroup',
            'fa-odnoklassniki', 'fa-odnoklassniki-square', 'fa-opencart', 'fa-openid', 'fa-opera', 'fa-optin-monster', 'fa-outdent',
            'fa-pagelines', 'fa-paint-brush', 'fa-paper-plane', 'fa-paper-plane-o', 'fa-paperclip', 'fa-paragraph', 'fa-paste',
            'fa-pause', 'fa-pause-circle', 'fa-pause-circle-o', 'fa-paw', 'fa-paypal', 'fa-pencil', 'fa-pencil-square',
            'fa-pencil-square-o', 'fa-percent', 'fa-phone', 'fa-phone-square', 'fa-photo', 'fa-picture-o', 'fa-pie-chart',
            'fa-pied-piper', 'fa-pied-piper-alt', 'fa-pied-piper-pp', 'fa-pinterest', 'fa-pinterest-p', 'fa-pinterest-square', 'fa-plane',
            'fa-play', 'fa-play-circle', 'fa-play-circle-o', 'fa-plug', 'fa-plus', 'fa-plus-circle', 'fa-plus-square', 'fa-plus-square-o',
            'fa-podcast', 'fa-power-off', 'fa-print', 'fa-product-hunt', 'fa-puzzle-piece', 'fa-qq', 'fa-qrcode', 'fa-question',
            'fa-question-circle', 'fa-question-circle-o', 'fa-quora', 'fa-quote-left', 'fa-quote-right', 'fa-ra', 'fa-random',
            'fa-ravelry', 'fa-rebel', 'fa-recycle', 'fa-reddit', 'fa-reddit-alien', 'fa-reddit-square', 'fa-refresh', 'fa-registered',
            'fa-remove', 'fa-renren', 'fa-reorder', 'fa-repeat', 'fa-reply', 'fa-reply-all', 'fa-resistance', 'fa-retweet', 'fa-rmb',
            'fa-road', 'fa-rocket', 'fa-rotate-left', 'fa-rotate-right', 'fa-rouble', 'fa-rss', 'fa-rss-square', 'fa-rub', 'fa-ruble',
            'fa-rupee', 'fa-s15', 'fa-safari', 'fa-save', 'fa-scissors', 'fa-scribd', 'fa-search', 'fa-search-minus', 'fa-search-plus',
            'fa-sellsy', 'fa-send', 'fa-send-o', 'fa-server', 'fa-share', 'fa-share-alt', 'fa-share-alt-square', 'fa-share-square',
            'fa-share-square-o', 'fa-shekel', 'fa-sheqel', 'fa-shield', 'fa-ship', 'fa-shirtsinbulk', 'fa-shopping-bag',
            'fa-shopping-basket', 'fa-shopping-cart', 'fa-shower', 'fa-sign-in', 'fa-sign-language', 'fa-sign-out', 'fa-signal',
            'fa-signing', 'fa-simplybuilt', 'fa-sitemap', 'fa-skyatlas', 'fa-skype', 'fa-slack', 'fa-sliders', 'fa-slideshare',
            'fa-smile-o', 'fa-snapchat', 'fa-snapchat-ghost', 'fa-snapchat-square', 'fa-snowflake-o', 'fa-soccer-ball-o', 'fa-sort',
            'fa-sort-alpha-asc', 'fa-sort-alpha-desc', 'fa-sort-amount-asc', 'fa-sort-amount-desc', 'fa-sort-asc', 'fa-sort-desc',
            'fa-sort-down', 'fa-sort-numeric-asc', 'fa-sort-numeric-desc', 'fa-sort-up', 'fa-soundcloud', 'fa-space-shuttle',
            'fa-spinner', 'fa-spoon', 'fa-spotify', 'fa-square', 'fa-square-o', 'fa-stack-exchange', 'fa-stack-overflow', 'fa-star',
            'fa-star-half', 'fa-star-half-empty', 'fa-star-half-full', 'fa-star-half-o', 'fa-star-o', 'fa-steam', 'fa-steam-square',
            'fa-step-backward', 'fa-step-forward', 'fa-stethoscope', 'fa-sticky-note', 'fa-sticky-note-o', 'fa-stop', 'fa-stop-circle',
            'fa-stop-circle-o', 'fa-street-view', 'fa-strikethrough', 'fa-stumbleupon', 'fa-stumbleupon-circle', 'fa-subscript',
            'fa-subway', 'fa-suitcase', 'fa-sun-o', 'fa-superpowers', 'fa-superscript', 'fa-support', 'fa-table', 'fa-tablet',
            'fa-tachometer', 'fa-tag', 'fa-tags', 'fa-tasks', 'fa-taxi', 'fa-telegram', 'fa-television', 'fa-tencent-weibo',
            'fa-terminal', 'fa-text-height', 'fa-text-width', 'fa-th', 'fa-th-large', 'fa-th-list', 'fa-themeisle', 'fa-thermometer',
            'fa-thermometer-0', 'fa-thermometer-1', 'fa-thermometer-2', 'fa-thermometer-3', 'fa-thermometer-4', 'fa-thermometer-empty',
            'fa-thermometer-full', 'fa-thermometer-half', 'fa-thermometer-quarter', 'fa-thermometer-three-quarters', 'fa-thumb-tack',
            'fa-thumbs-down', 'fa-thumbs-o-down', 'fa-thumbs-o-up', 'fa-thumbs-up', 'fa-ticket', 'fa-times', 'fa-times-circle',
            'fa-times-circle-o', 'fa-times-rectangle', 'fa-times-rectangle-o', 'fa-tint', 'fa-toggle-down', 'fa-toggle-left',
            'fa-toggle-off', 'fa-toggle-on', 'fa-toggle-right', 'fa-toggle-up', 'fa-trademark', 'fa-train', 'fa-transgender',
            'fa-transgender-alt', 'fa-trash', 'fa-trash-o', 'fa-tree', 'fa-trello', 'fa-tripadvisor', 'fa-trophy', 'fa-truck', 'fa-try',
            'fa-tty', 'fa-tumblr', 'fa-tumblr-square', 'fa-turkish-lira', 'fa-tv', 'fa-twitch', 'fa-twitter', 'fa-twitter-square',
            'fa-umbrella', 'fa-underline', 'fa-undo', 'fa-universal-access', 'fa-university', 'fa-unlink', 'fa-unlock', 'fa-unlock-alt',
            'fa-unsorted', 'fa-upload', 'fa-usb', 'fa-usd', 'fa-user', 'fa-user-circle', 'fa-user-circle-o', 'fa-user-md', 'fa-user-o',
            'fa-user-plus', 'fa-user-secret', 'fa-user-times', 'fa-users', 'fa-vcard', 'fa-vcard-o', 'fa-venus', 'fa-venus-double',
            'fa-venus-mars', 'fa-viacoin', 'fa-viadeo', 'fa-viadeo-square', 'fa-video-camera', 'fa-vimeo', 'fa-vimeo-square', 'fa-vine',
            'fa-vk', 'fa-volume-control-phone', 'fa-volume-down', 'fa-volume-off', 'fa-volume-up', 'fa-warning', 'fa-wechat', 'fa-weibo',
            'fa-weixin', 'fa-whatsapp', 'fa-wheelchair', 'fa-wheelchair-alt', 'fa-wifi', 'fa-wikipedia-w', 'fa-window-close',
            'fa-window-close-o', 'fa-window-maximize', 'fa-window-minimize', 'fa-window-restore', 'fa-windows', 'fa-won', 'fa-wordpress',
            'fa-wpbeginner', 'fa-wpexplorer', 'fa-wpforms', 'fa-wrench', 'fa-xing', 'fa-xing-square', 'fa-y-combinator',
            'fa-y-combinator-square', 'fa-yahoo', 'fa-yc', 'fa-yc-square', 'fa-yelp', 'fa-yen', 'fa-yoast', 'fa-youtube',
            'fa-youtube-play', 'fa-youtube-square'
        ];

        return {
            list: function() {
                return availableIcons;
            },
            exists: function(icon) {
                if (availableIcons.indexOf(icon) > -1) {
                    return true;
                } else {
                    return false;
                }
            }
        };
    }
]);


// Filter service
angular.module('opengate-angular-js').factory('Filter', ['$window', '$sce', '$q',

    function($window, $sce, $q) {
        //var customSelectors = [];
        var conditionSelectors = [];
        //var separators = [' ', '\n', '-', '!', '=', '~', '>', '<', '&', 'or', 'and', '(', ')', 'eq', 'neq', '==', 'like', 'gt', 'gte', 'lt', 'lte', '<=', '>='];
        var separators = [' ', '\n', '-', '!', '=', '~', '>', '<', '&', 'or', 'and', ')', 'in', ',', 'neq', 'like'];

        function suggest_field(term, customSelectors) {
            var results = [];
            var i, customSelector, conditionSelector;

            if (!term || term.trim().length === 0) {
                for (i = 0; i < customSelectors.length && results.length < 8; i++) {
                    customSelector = customSelectors[i];
                    results.push({ label: $sce.trustAsHtml(highlight(customSelector, term)), value: customSelector });
                }

                for (i = 0; i < conditionSelectors.length && results.length < 12; i++) {
                    conditionSelector = conditionSelectors[i];
                    results.push({ label: $sce.trustAsHtml(highlight(conditionSelector, term)), value: conditionSelector });
                }
            } else {
                var q = term.toLowerCase().trim();

                // Find first 10 allSelectors that start with `term`.
                for (i = 0; i < customSelectors.length && results.length < 8; i++) {
                    customSelector = customSelectors[i];
                    if (customSelector.toLowerCase().indexOf(q) > -1)
                        results.push({ label: $sce.trustAsHtml(highlight(customSelector, term)), value: customSelector });
                }

                for (i = 0; i < conditionSelectors.length && results.length < 12; i++) {
                    conditionSelector = conditionSelectors[i];
                    if (conditionSelector.toLowerCase().indexOf(q) > -1)
                        results.push({ label: $sce.trustAsHtml(highlight(conditionSelector, term)), value: conditionSelector });
                }
            }

            return results;
        }


        function suggest_field_delimited(term, target_element, query) {
            var deferred = $q.defer();
            query.findFields(term).then(function(fields) {
                var values = fields;
                var idx = -1;

                if (target_element.selectionStart) {
                    idx = target_element.selectionStart - 1;
                } else if (target_element.prop) {
                    idx = target_element.prop('selectionStart') - 1;
                }

                if (idx < 0) return;

                var suggestions;
                if (term !== undefined && term !== '') {
                    var ix = -1;
                    for (; idx >= 0 && ix === -1; idx--) {
                        if (separators.indexOf(term[idx]) > -1) {
                            ix = idx + 1;
                        } else if (idx === 0) {
                            ix = idx;
                        }
                    }

                    var ex = ix;

                    for (idx = ix; idx < term.length && ex === ix; idx++) {
                        if (separators.indexOf(term[idx]) > -1) {
                            ex = idx + 1;
                        } else if (idx === (term.length - 1)) {
                            ex = idx + 1;
                        }
                    }

                    suggestions = suggest_field(term.substring(ix, ex), values);
                } else {
                    suggestions = suggest_field();
                }

                suggestions.forEach(function(s) {
                    s.value = s.value;
                });
                deferred.resolve(suggestions);

            }).catch(function(err) {
                console.error(err);
                deferred.reject(err);
            });



            return deferred.promise;
        }

        function highlight(str, term) {
            var highlight_regex = new RegExp('(' + term + ')', 'gi');
            return str.replace(highlight_regex,
                '<span class="text-info">$1</span>');
        }



        function parseQuery(string) {
            var promises = '';
            var defered = $q.defer();
            var promise = defered.promise;
            var parse_tree = null;
            var query = {
                text: [],
                offsets: [],
                filter: {}
            };
            try {
                //job.id like "1e" or (job.id like 189 and job.status== FINISHED) and job.status== CANCELED
                $window.jsep.addBinaryOp('and', 1);
                $window.jsep.addBinaryOp('&&', 1);
                $window.jsep.addBinaryOp('||', 2);
                $window.jsep.addBinaryOp('or', 2);
                $window.jsep.addBinaryOp('in', 2);
                $window.jsep.addBinaryOp('~', 6);
                $window.jsep.addBinaryOp('=', 6);

                $window.jsep.addBinaryOp('like', 6);
                $window.jsep.addBinaryOp('gt', 6);
                $window.jsep.addBinaryOp('lte', 6);
                $window.jsep.addBinaryOp('gte', 6);
                $window.jsep.addBinaryOp('eq', 6);
                $window.jsep.addBinaryOp('neq', 6);
                $window.jsep.addBinaryOp(',', 6);
                parse_tree = $window.jsep(string);
                query.filter[parse_tree.operator] = [];

                query.filter = parseSimple(parse_tree);
                defered.resolve(query);
            } catch (err) {
                var error = err;
                if (err.description) {
                    error = err.description;
                }
                defered.reject(error);
            }

            return promise;


        }
        //job.id like "1e" or (job.id like 189 and job.status== FINISHED) and job.status== CANCELED
        // job.id like "1e" and job.status<= CANCELED

        function parseSimple(parse_tree) {
            var id, value, newFilter = {};

            if (parse_tree.type === 'BinaryExpression' && /\eq|\neq|\like|\gt|\lt|\gte|\lte|\=|\'<'|\'>'|\~|\!/.test(parse_tree.operator)) {
                id = getId(parse_tree.left).split('.').reverse().join('.');
                id = id.replace('.undefined', '[]');
                value = parse_tree.right.name || parse_tree.right.value;
                var op = getSimpleOperator(parse_tree.operator);

                newFilter[op] = {};
                newFilter[op][id] = value;
            } else if (parse_tree.type === 'BinaryExpression' && /or|and/.test(parse_tree.operator)) {
                newFilter[parse_tree.operator] = [];
                newFilter[parse_tree.operator].push(parseSimple(parse_tree.left));
                newFilter[parse_tree.operator].push(parseSimple(parse_tree.right));

            } else if (parse_tree.type === 'BinaryExpression' && /\in/.test(parse_tree.operator)) {
                id = getId(parse_tree.left).split('.').reverse().join('.');
                id = id.replace('.undefined', '[]');
                var op = getSimpleOperator(parse_tree.operator);

                newFilter[op] = {};
                var ids = getSimpleValuesFromArray(parse_tree.right);
                console.log(ids);
                newFilter[op][id] = ids;
            }

            return newFilter;

        }

        function getSimpleValuesFromArray(parser_tree) {
            var identifiers = [];

            if (parser_tree.type === 'Identifier') {
                identifiers.push(parser_tree.name);
            } else if (parser_tree.type === 'BinaryExpression' && /\,/.test(parser_tree.operator)) {
                var left = getSimpleValuesFromArray(parser_tree.left);
                var right = getSimpleValuesFromArray(parser_tree.right);
                identifiers = left.concat(right);
            }

            return identifiers;
        }

        function getId(parser_tree) {
            var id = '';
            if (parser_tree.type === 'Identifier') {
                id = parser_tree.name;
            } else if (parser_tree.type === 'MemberExpression') {
                id = parser_tree.property.name + '.' + getId(parser_tree.object);
            }
            return id;


        }

        function getSimpleOperator(operator) {
            return operator === '==' ? 'eq' :
                operator === '=' ? 'eq' :
                operator === '!=' ? 'neq' :
                operator === '~' ? 'like' :
                operator === '>' ? 'gt' :
                operator === '<' ? 'lt' :
                operator === '>=' ? 'gte' :
                operator === '<=' ? 'lte' : operator;
        }


        return {
            suggest_field_delimited: function(term, target_element, selectors) {
                var customSelectors = selectors;
                var result = suggest_field_delimited(term, target_element, selectors);
                return result;
            },
            parseQuery: function(values) {
                var result = parseQuery(values);
                return result;
            }
        };
    }
]);


angular.module('opengate-angular-js')
    .service('$entityFlattenedExtractor', ['$jsonFinderHelper', function($jsonFinderHelper) {
        function genericExtractor(entityList, element) {
            var resultList = [];

            if (entityList && entityList.length > 0) {
                var resultsFound = {};
                angular.forEach(entityList, function(entityData, idx) {
                    if (entityData[$jsonFinderHelper.provisioned.getAmpliaPath(element + 'Identifier')] ||
                        entityData[$jsonFinderHelper.collected.getAmpliaPath(element + 'Identifier')]) {
                        // Recorrer cada uno de los item para sacar los de subscriber
                        angular.forEach(entityData, function(itemData, item) {
                            if (item.startsWith('provision.device.communicationModules[].' + element) ||
                                item.startsWith('device.communicationModules[].' + element)) {
                                angular.forEach(itemData, function(value, itemIdx) {
                                    if (value._index) {
                                        if (!resultsFound[idx]) {
                                            resultsFound[idx] = {};

                                            resultsFound[idx]['$device'] = entityData;
                                        }
                                        resultsFound[idx][item] = value;
                                    }
                                });
                            } else if (item.startsWith('provision.administration')) {
                                if (!resultsFound[idx]) {
                                    resultsFound[idx] = {};

                                    resultsFound[idx]['$device'] = entityData;
                                }

                                resultsFound[idx][item] = itemData;
                            }
                        });
                    }
                });

                // De todos los leidos hacemos
                angular.forEach(resultsFound, function(entities, entitiesKey) {
                    resultList.push(entities);
                });
            }

            return resultList;
        }

        function extractSubscribers(entityList, destinationList) {
            var entityList = genericExtractor(entityList, 'subscriber');
            if (destinationList) {
                destinationList = entityList;
            }

            return entityList;
        }

        function extractSubscriptions(entityList, destinationList) {
            var entityList = genericExtractor(entityList, 'subscription');
            if (destinationList) {
                destinationList = entityList;
            }

            return entityList;
        }

        return {
            extractSubscribers: extractSubscribers,
            extractSubscriptions: extractSubscriptions
        };
    }])
    .service('$entityExtractor', ['$q', function($q) {
        function genericExtractor(entityList, element) {
            var resultList = [];

            if ((entityList && entityList.length > 0) || entityList && entityList.length > 0) {
                angular.forEach(entityList, function(entityData, idx) {
                    var finalData = null;
                    var entityIdentifier = null;

                    // Provision data
                    if (entityData.provision.device && entityData.provision.device.communicationModules &&
                        entityData.provision.device.communicationModules.length > 0) {
                        // Recorrer cada uno de los item para sacar los de subscriber
                        angular.forEach(entityData.provision.device.communicationModules, function(commData, commIdx) {
                            if (commData[element]) {
                                if (!finalData) {
                                    finalData = {
                                        provision: {}
                                    };
                                } else if (!finalData.provision) {
                                    finalData.provision = {};
                                }

                                finalData.provision[element] = commData[element];

                                if (finalData.provision[element].identifier) {
                                    entityIdentifier = angular.copy(finalData.provision[element].identifier);
                                }
                            }
                        });
                    }

                    // Collection data
                    if (entityData.device && entityData.device.communicationModules &&
                        entityData.device.communicationModules.length > 0) {
                        // Recorrer cada uno de los item para sacar los de subscriber
                        angular.forEach(entityData.device.communicationModules, function(commData, commIdx) {
                            if (commData[element]) {
                                if (!finalData) {
                                    finalData = {};
                                }

                                finalData[element] = commData[element];
                            }
                        });
                    }

                    // completar informacion de caja si hay datos
                    if (finalData[element] || finalData.provision[element]) {
                        // Se coge el documento entero
                        finalData['$device'] = entityData;

                        // administration data
                        if (entityData.provision.administration) {
                            finalData.provision.administration = entityData.provision.administration;

                            if (entityIdentifier) {
                                finalData.provision.administration.identifier = entityIdentifier;
                            }
                        }

                    }

                    if (finalData) {
                        resultList.push(finalData);
                    }

                });
            }

            return resultList;
        }

        function extractSubscribers(entityList, destinationList) {
            var final;
            if (entityList && entityList.devices) {
                final = genericExtractor(entityList.devices, 'subscriber');
            } else if (entityList && entityList.data && entityList.data.devices) {
                final = genericExtractor(entityList.data.devices, 'subscriber');
            }

            if (destinationList) {
                angular.copy(final, destinationList);
            }

            var finalEntityData = {
                subscribers: final
            };
            return $q(function(ok) {
                ok(destinationList || finalEntityData);
            });
        }

        function extractSubscriptions(entityList, destinationList) {
            var final;
            if (entityList && entityList.devices) {
                final = genericExtractor(entityList.devices, 'subscription');
            } else if (entityList && entityList.data && entityList.data.devices) {
                final = genericExtractor(entityList.data.devices, 'subscription');
            }

            if (destinationList) {
                angular.copy(final, destinationList);
            }

            var finalEntityData = {
                subscriptions: final
            };
            return $q(function(ok) {
                ok(destinationList || finalEntityData);
            });

        }

        return {
            extractSubscribers: extractSubscribers,
            extractSubscriptions: extractSubscriptions
        };
    }]);


angular.module('opengate-angular-js')
    .service('$dataFormatter', [
        function() {
            return new DataFormatter();
        }
    ]);

DataFormatter.prototype.format = function(value) {
    if (this.isDataUrl(value)) {
        return (new DataUrlFormatter()).format(value);
    }
    return value;
};

function DataFormatter() {
    this.dataurl_regex = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;
    this.isDataUrl = function(value) {
        if (typeof value !== 'string') return false;
        return !!value.match(this.dataurl_regex);
    };
}

DataUrlFormatter.prototype = new DataFormatter();
DataUrlFormatter.prototype.format = function(value) {
    return '<img alt="image" class="datastreamImage" src="' + value + '"/>';
};

function DataUrlFormatter() {}


angular.module('opengate-angular-js')
    .filter('humanize', ['$window', function($window) {
        function hasNumber(myString) {
            return (/\d/.test(myString));
        }

        return function(input, optional1, optional2) {

            var output = input;


            if ($window.S(output).indexOf('$') !== -1) {
                output = $window.S(output).strip('$').s;
            }
            if (angular.isString(output) && !hasNumber(output)) {
                output = $window.S(output).humanize().s;
            }

            return output;

        };

    }])
    .filter('communicationsInterface', function() {
        return function(input) {

            var output = input;

            switch (output) {
                case 'COMMUNICATIONS_MODULE':
                    return 'Communications module';
                case 'SUBSCRIPTION':
                    return 'Mobile line';
                case 'SUBSCRIBER':
                    return 'SIM';
                case 'HOME_OPERATOR':
                    return 'Home Operator';
                case 'REGISTER_OPERATOR':
                    return 'Register Operator';
                case 'ADDRESS':
                    return 'IP';
                case 'SOFTWARE':
                    return 'Software';
                case 'HARDWARE':
                    return 'Hardware';
                case 'entityKey':
                    return 'Identifier';
                default:
                    return output;
            }
        };
    })
    .filter('dateNames', function() {
        var days = {
            'MON': 'Monday',
            'TUE': 'Tuesday',
            'WED': 'Wednesday',
            'THU': 'Thursday',
            'FRI': 'Friday',
            'SAT': 'Saturday',
            'SUN': 'Sunday'
        };
        var months = {
            'JAN': 'January',
            'FEB': 'February',
            'MAR': 'March',
            'APR': 'April',
            'MAY': 'May',
            'JUN': 'June',
            'JUL': 'July',
            'AUG': 'August',
            'SEP': 'September',
            'OCT': 'October',
            'NOV': 'November',
            'DEC': 'December'
        };

        return function(input) {
            return (days[input] || months[input]) || input;
        };
    })

.filter('icons', function() {
        return function(input, optional1, optional2) {
            var output = 'fa fa-info';
            if (input === 'list') {
                output = 'fa fa-list';
            }
            if (input === 'ban') {
                output = 'fa fa-ban';
            }
            if (input === 'laptop') {
                output = 'fa fa-laptop';
            }
            if (input === 'spin') {
                output = 'fa fa-spinner fa-spin';
            }
            if (input === 'unit') {
                output = 'fa fa-plus-square';
            }
            if (input === 'tags') {
                output = 'fa fa-tags';
            }
            return output;
        };

    })
    .filter('codeErrors', function() {
        var errors = {
            '1004': 'At least one valid reference to an entity is required',
            '1005': 'At least one valid reference to an entity is required',
            '1017': 'Tag is not valid. Please, check it.'
        };

        return function(input) {
            return { code: input.code, message: errors[input.code] || input.message };
        };
    })
    .filter('wapiErrors', function() {
        var errors = {
            '-1': 'Connection problems',
            '413': 'Upload size exceeded'
        };

        return function(status, partialMessage) {
            var finalMessage = '';
            if (!angular.isUndefined(partialMessage)) {
                finalMessage = partialMessage + ' (' + (errors[status] ? errors[status] : 'Code: ' + status) + ')';
            } else {
                finalMessage = (errors[status] ? errors[status] : 'Code: ' + status);
            }
            return finalMessage;
        };
    })
    .filter('textlength', function() {
        return function(input, optional1) {
            var maxLength = 30;
            if (optional1 && angular.isNumber(optional1)) {
                maxLength = optional1;
            }

            if (input && input.length > maxLength) {
                return input.substring(0, maxLength) + '...';
            } else {
                return input;
            }
        };
    }).filter('compactid', function() {
        return function(input) {
            if (input && input.indexOf('.') > -1) {
                return input.substring(input.lastIndexOf('.') + 1);
            }
            return input;
        };
    });
angular.module('opengate-angular-js').config(["schemaFormProvider", "schemaFormDecoratorsProvider", "sfPathProvider", "sfBuilderProvider", function (schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider, sfBuilderProvider) {

    var helper = function (name, schema, options) {
        if (schema.type === 'string' && schema.format == 'helperdialog') {
            var f = schemaFormProvider.stdFormObj(name, schema, options);
            f.key = options.path;
            f.type = 'helperdialog';

            options.lookup[sfPathProvider.stringify(options.path)] = f;
            return f;
        }
    };

    schemaFormProvider.defaults.string.unshift(helper);

    schemaFormDecoratorsProvider.defineAddOn(
        'bootstrapDecorator',         // Name of the decorator you want to add to.
        'helperdialog',                    // Form type that should render this add-on
        'views/schema.form.helper.template.html',    // Template name in $templateCache
        sfBuilderProvider.stdBuilders // List of builder functions to apply.
    );

    var customUiSelect = function (name, schema, options) {
        if (schema.type === 'string' && schema.format == 'customuiselect') {
            var f = schemaFormProvider.stdFormObj(name, schema, options);
            f.key = options.path;
            f.type = (schema.properties && schema.properties.type) ? schema.properties.type : 'string';
            options.lookup[sfPathProvider.stringify(options.path)] = f;
            return f;
        }
    };

    schemaFormProvider.defaults.string.unshift(customUiSelect);

    schemaFormDecoratorsProvider.defineAddOn(
        'bootstrapDecorator',         // Name of the decorator you want to add to.
        'entity',                    // Form type that should render this add-on
        'views/schema.form.entity.template.html',    // Template name in $templateCache
        sfBuilderProvider.stdBuilders // List of builder functions to apply.
    );

    schemaFormDecoratorsProvider.defineAddOn(
        'bootstrapDecorator',         // Name of the decorator you want to add to.
        'datastream',                    // Form type that should render this add-on
        'views/schema.form.datastream.template.html',    // Template name in $templateCache
        sfBuilderProvider.stdBuilders // List of builder functions to apply.
    );

}]);


angular.module('opengate-angular-js').directive('windowTimeSelect', function() { // ['$scope', '$compile'], function($scope, $compile) {


    return {
        restrict: 'AE',
        templateUrl: 'views/window-time.select.view.html',
        scope: {
            event: '@',
            rawdate: '@'
        },
        controller: ["$scope", "$element", "$attrs", function($scope, $element, $attrs) {

            function toLimit() {
                return window.moment($scope.date.from).add(1, 'hours')._d;
            }

            function fromLimit() {
                return window.moment($scope.date.to).subtract(1, 'minutes')._d;
            }

            function fromDate() {
                return window.moment($scope.date.to).subtract(1, 'months')._d;
            }

            function setTo(toDate) {
                if (!$scope.date) $scope.date = {};
                $scope.date.to = toDate;
                $scope.toMax = toDate;
                $scope.toOptions = {
                    startingDay: 1,
                    showWeeks: false,
                    maxDate: toDate
                };
            }

            function setFrom() {
                $scope.date.from = fromDate($scope.date.to);
                $scope.fromOptions = {
                    startingDay: 1,
                    showWeeks: false,
                    maxDate: fromLimit($scope.date.to)
                };
                $scope.toOptions.minDate = toLimit();
                $scope.toMin = toLimit();
                $scope.fromMax = fromLimit($scope.date.to);
            }

            $scope.oneDayClass = $scope.oneWeekClass = $scope.oneMonthClass = $scope.customClass = 'btn-info';
            $scope.filterApplied = false;
            $scope.format = 'dd MMMM yyyy';
            $scope.clear = function() {

                $scope.oneDayClass = $scope.oneWeekClass = $scope.oneMonthClass = $scope.customClass = 'btn-info';
                $scope.filterApplied = false;
                $scope.customEnabled = false;
                $scope.$emit('onWindowTimeChanged', {});
            };
            $scope.fromOpen = function() {
                $scope.fromPopup.opened = true;
            };
            $scope.fromPopup = {
                opened: false
            };
            $scope.toOpen = function() {
                $scope.toPopup.opened = true;
            };
            $scope.toPopup = {
                opened: false
            };
            $scope.custom = function() {
                $scope.customEnabled = !$scope.customEnabled;
            };
            $scope.apply = function(winTime, fire_event) {
                $scope.filterApplied = true;
                $scope.customEnabled = false;
                /* jshint ignore:start */
                if (!window.eval($scope.rawdate)) {
                    for (var key in winTime) {
                        if (key !== 'type' && key !== 'rawdate')
                            winTime[key] = window.moment(winTime[key]).format();
                    }
                    //TODO: enganche con widgets, habría que ver como resolver este problema o hacer que esto sea una directiva propia del angular-dashboard-framework
                    winTime.rawdate = false;
                }
                /* jshint ignore:end */
                if (fire_event)
                    $scope.$emit('onWindowTimeChanged', winTime);
            };
            $scope.oneDay = function(no_fire_event) {
                $scope.oneDayClass = 'btn-success';
                $scope.oneWeekClass = $scope.oneMonthClass = $scope.customClass = 'btn-info';
                $scope.apply(genWindowTime('days'), !no_fire_event);
            };
            $scope.oneWeek = function(no_fire_event) {
                $scope.oneWeekClass = 'btn-success';
                $scope.oneDayClass = $scope.oneMonthClass = $scope.customClass = 'btn-info';
                $scope.apply(genWindowTime('weeks'), !no_fire_event);
            };
            $scope.oneMonth = function(no_fire_event) {
                $scope.oneMonthClass = 'btn-success';
                $scope.oneWeekClass = $scope.oneDayClass = $scope.customClass = 'btn-info';
                $scope.apply(genWindowTime('months'), !no_fire_event);
            };

            $scope.applyCustom = function(no_fire_event) {
                $scope.customClass = 'btn-success';
                $scope.oneWeekClass = $scope.oneDayClass = $scope.oneMonthClass = 'btn-info';
                $scope.apply({
                    type: 'custom',
                    to: $scope.date.to,
                    from: $scope.date.from
                }, !no_fire_event);
            };


            // Config custom window
            $scope.init = function() {

                setTo(new Date());
                setFrom();

                $scope.toChange = function() {
                    validateCustomWindow();
                    $scope.fromOptions = {
                        maxDate: fromLimit($scope.date.to)
                    };
                    $scope.fromMax = fromLimit($scope.date.to);
                };
                $scope.fromChange = function() {
                    validateCustomWindow();
                    $scope.toOptions.minDate = toLimit();
                    $scope.toMin = toLimit();
                };

                function validateCustomWindow() {
                    if (window.moment($scope.date.to).diff($scope.date.from) <= 0) {
                        $scope.errorCustomWindow = 'From date(' + $scope.date.from.toISOString() + ') is bigger than to date(' + $scope.date.to.toISOString() + ')';
                    } else {
                        $scope.errorCustomWindow = undefined;
                    }
                }


                //TODO: enganche con widgets, habría que ver como resolver este problema o hacer que esto sea una directiva propia del angular-dashboard-framework
                if ($scope.$parent.config && $scope.$parent.config.windowFilter) {
                    var configWindowFilter = $scope.$parent.config.windowFilter;
                    /* jshint ignore:start */
                    if (!window.eval($scope.rawdate)) {
                        $scope.$parent.config.windowFilter.rawdate = false;
                    }
                    /* jshint ignore:end */
                    switch (configWindowFilter.type) {
                        case 'days':
                            $scope.oneDay(true);
                            break;
                        case 'weeks':
                            $scope.oneWeek(true);
                            break;
                        case 'months':
                            $scope.oneMonth(true);
                            break;
                        case 'custom':
                            if (configWindowFilter.to && configWindowFilter.from) {
                                $scope.date.to = new Date(configWindowFilter.to);
                                $scope.date.from = new Date(configWindowFilter.from);
                            }
                            $scope.applyCustom(true);
                            break;
                        default:
                            break;
                    }
                }
            };

            $scope.init();

            function genWindowTime(type) {
                var from = window.moment().subtract(1, type);
                return {
                    from: from._d,
                    type: type
                };
            }
        }]
    };
});


/**
 * Edits by Ryan Hutchison
 * Credit: https://github.com/paulyoder/angular-bootstrap-show-errors */

angular.module('opengate-angular-js')
    .directive('showErrors', ['$timeout', '$interpolate', function($timeout, $interpolate) {
        var linkFn = function(scope, el, attrs, formCtrl) {
            var inputEl, inputName, inputNgEl, options, showSuccess, toggleClasses,
                initCheck = false,
                showValidationMessages = false,
                blurred = false;

            options = scope.$eval(attrs.showErrors) || {};
            showSuccess = options.showSuccess || false;
            inputEl = el[0].querySelector('.form-control[name]') || el[0].querySelector('[name]');
            inputNgEl = angular.element(inputEl);
            inputName = $interpolate(inputNgEl.attr('name') || '')(scope);

            if (!inputName) {
                throw 'show-errors element has no child input elements with a \'name\' attribute class';
            }

            var reset = function() {
                return $timeout(function() {
                    el.removeClass('has-error');
                    el.removeClass('has-success');
                    showValidationMessages = false;
                }, 0, false);
            };

            scope.$watch(function() {
                return formCtrl[inputName] && formCtrl[inputName].$invalid;
            }, function(invalid) {
                return toggleClasses(invalid);
            });

            scope.$on('show-errors-check-validity', function(event, name) {
                if (angular.isUndefined(name) || formCtrl.$name === name) {
                    initCheck = true;
                    showValidationMessages = true;

                    return toggleClasses(formCtrl[inputName].$invalid);
                }
            });

            scope.$on('show-errors-reset', function(event, name) {
                if (angular.isUndefined(name) || formCtrl.$name === name) {
                    return reset();
                }
            });

            toggleClasses = function(invalid) {
                el.toggleClass('has-error', showValidationMessages && invalid);
                if (showSuccess) {
                    return el.toggleClass('has-success', showValidationMessages && !invalid);
                }
            };
        };

        return {
            restrict: 'A',
            require: '^form',
            compile: function(elem, attrs) {
                if (attrs.showErrors.indexOf('skipFormGroupCheck') === -1) {
                    if (!(elem.hasClass('form-group') || elem.hasClass('input-group'))) {
                        throw 'show-errors element does not have the \'form-group\' or \'input-group\' class';
                    }
                }
                return linkFn;
            }
        };
    }]);


angular.module('opengate-angular-js')
    .directive('elemReady', ["$parse", function($parse) {
        return {
            restrict: 'A',
            link: function($scope, elem, attrs) {
                elem.ready(function() {
                    $scope.$apply(function() {
                        var func = $parse(attrs.elemReady);
                        func($scope);
                    });
                });
            }
        };
    }]);


angular.module('opengate-angular-js').directive('disallowSpaces', function() {
    return {
        restrict: 'A',
        link: function($scope, $element) {
            $element.bind('input', function() {
                window.$(this).val(window.$(this).val().replace(/ /g, ''));
            });
        }
    };
});


angular.module('opengate-angular-js')
    .directive('customUiSelect', ['$compile', 'Filter', function($compile, Filter) {
        var button = angular.element('<div title="Toggle Advanced/Basic filter search" ng-click="complex()" style="cursor:pointer" class="custom-ui-select-button input-group-addon"><i class="fa fa-filter"></i><i class="filter-icon fa fa-bold text-muted"></i></div>');
        var container = angular.element('<div class="custom-ui-select-container input-group"></div>');
        var style = angular.element('<style title="custom-ui-select-no-multiple">.custom-ui-select-no-multiple .ui-select-search[placeholder=""]{display:none}</style>');

        var isEmpty = function(value) {
            return !value || value.trim().length === 0;
        };

        var setRefresh = function(obj, fnc) {
            var choices = obj.querySelectorAll('ui-select-choices');
            choices.attr('refresh', fnc);
            choices.attr('refresh-delay', '0');
        };

        return {
            require: 'uiSelect',
            scope: true,
            bindToController: true,
            controller: ["$scope", "$element", "$attrs", "$q", function($scope, $element, $attrs, $q) {
                var uiConfig = getConfig();

                function processFilter(_filter) {
                    if (uiConfig.prefilter) {
                        var filter = { and: [] };
                        filter.and.push(uiConfig.prefilter);
                        filter.and.push(_filter);
                        return filter;
                    }
                    return _filter;
                }

                function getConfig() {
                    var configPath = $attrs.customUiSelectConfig.split('.');
                    if (configPath.length === 1) {
                        return $scope[$attrs.customUiSelectConfig];
                    } else {
                        var config = $scope;
                        configPath.forEach(function(path) {
                            config = config[path];
                        });
                        return config;
                    }
                }

                //Filtro asistido con mass-autocomplete
                $scope.complexfilter = function(search) {
                    //console.log(search);
                    Filter.parseQuery(search || '')
                        .then(function(data) {
                            var filter = data.filter;
                            //Solo filtramos si no se trata de un filtro vacio
                            if (Object.keys(filter).length > 0) {
                                //$scope.filter.error = null;
                                _loadCollection(uiConfig.builder, uiConfig.collection, uiConfig.rootKey, processFilter(filter));
                                console.log('Final filter: ' + filter);
                            } else {
                                //lo tratamos igual que si fuera un filtro no valido
                                uiConfig.collection.splice(0, uiConfig.collection.length);
                            }
                        })
                        .catch(function(err) {
                            //Si el filtro no es valido borramos la lista de opciones del ui-select
                            //$scope.filter.error = err;
                            uiConfig.collection.splice(0, uiConfig.collection.length);
                            // Tratar el error
                        });
                };

                //Filtro simple con or-like
                $scope.asyncfilter = function(search) {
                    _loadCollection(uiConfig.builder, uiConfig.collection, uiConfig.rootKey, processFilter(uiConfig.filter(search)));
                };

                $scope._complex = $attrs.$$button.querySelectorAll('.fa-filter').hasClass('text-primary');
                $scope.complex = function() {
                    $scope._complex = !$scope._complex;
                    if ($scope._complex) {
                        $element.css('display', '').removeClass('custom-ui-select-hide');
                        $attrs.$$cloneElement.css('display', 'none').addClass('custom-ui-select-hide');
                        //$attrs.$$button.querySelectorAll('.fa-filter').removeClass('text-muted').addClass('text-primary');
                        $attrs.$$button.querySelectorAll('.filter-icon').removeClass('fa-bold').removeClass('text-muted').addClass('fa-font').addClass('text-primary');
                    } else {
                        $element.css('display', 'none').addClass('custom-ui-select-hide');
                        $attrs.$$cloneElement.css('display', '').removeClass('custom-ui-select-hide');
                        //$attrs.$$button.querySelectorAll('.fa-filter').addClass('text-muted').removeClass('text-primary');
                        $attrs.$$button.querySelectorAll('.filter-icon').removeClass('fa-font').addClass('text-muted').addClass('fa-bold').removeClass('text-primary');
                    }
                };

                $scope.customUiTagTransform = function(value) {
                    return null;
                };

                // Retraso de la peticion de recarga para no saturar (OUW-431)
                var lastTimeout = null;

                function _loadCollection(builder, collection, id, filter) {
                    if (lastTimeout) clearTimeout(lastTimeout);

                    lastTimeout = setTimeout(function() { _loadCollectionTimeout(builder, collection, id, filter); }, 500);
                }

                function _loadCollectionTimeout(builder, collection, id, filter) {
                    $attrs.$$button.querySelectorAll('.filter-icon').removeClass('fa-bold').removeClass('fa-font').addClass('fa-spinner').addClass('fa-spin');
                    builder.limit(1000).filter(filter).build().execute().then(
                        function(data) {
                            if ($scope._complex) {
                                $attrs.$$button.querySelectorAll('.filter-icon').removeClass('fa-spinner').removeClass('fa-spin').addClass('fa-font');
                            } else {
                                $attrs.$$button.querySelectorAll('.filter-icon').removeClass('fa-spinner').removeClass('fa-spin').addClass('fa-bold');
                            }

                            if (data.statusCode === 200) {
                                var datas = data.data[id];
                                if (angular.isFunction(uiConfig.processingData)) {
                                    uiConfig.processingData(data, datas).then(function(datas) {
                                        var _collection = [];
                                        if (!angular.isArray(datas)) {
                                            angular.forEach(datas, function(data, key) {
                                                _collection.push(data);
                                            });
                                        } else {
                                            angular.copy(datas, _collection);
                                        }
                                        angular.copy(_collection, collection);
                                    });
                                } else {
                                    var _collection = [];
                                    if (!angular.isArray(datas)) {
                                        angular.forEach(datas, function(data, key) {
                                            _collection.push(data);
                                        });
                                    } else {
                                        angular.copy(datas, _collection);
                                    }
                                    angular.copy(_collection, collection);
                                }
                            } else {
                                collection.splice(0, collection.length);
                                if (data.statusCode !== 204) {
                                    //toastr.error('Loading error');
                                    console.error(JSON.stringify(data));
                                } else {
                                    console.log(JSON.stringify(data));
                                }
                            }
                            $scope.$apply();
                        }
                    ).catch(function(err) {
                        $attrs.$$button.querySelectorAll('.filter-icon').removeClass('fa-spinner').removeClass('fa-spin').addClass('fa-filter');
                    });
                }
            }],
            compile: function(templateElement, templateAttributes) {
                templateAttributes.$$button = button.clone();
                templateAttributes.$$container = container.clone();
                var simple = templateAttributes.multiple !== 'true';
                var taggFunction = templateAttributes.tagging;
                console.log('isSimple: ' + simple);
                if (simple) {
                    templateElement.attr('limit', '1');
                    templateAttributes.limit = '1';
                    templateAttributes.searchEnabled = '!$select.selected || $select.selected.length === 0';
                    templateElement.attr('search-enabled', '!$select.selected || $select.selected.length === 0');
                    templateElement.addClass('custom-ui-select-no-multiple');
                    templateAttributes.$$style = style.clone();
                }

                if (!taggFunction || taggFunction.trim().length === 0) {
                    templateElement.attr('tagging', 'customUiTagTransform');
                    templateAttributes.tagging = 'customUiTagTransform';
                }

                var asyncFilter = 'asyncfilter($select.search);';
                var complexFilter = 'complexfilter($select.search);';


                if (templateAttributes.customMassAutocompleteItem) {
                    setRefresh(templateElement, complexFilter);
                    var _templateElement = angular.element(templateElement.clone());
                    _templateElement.removeAttr('custom-ui-select');
                    setRefresh(_templateElement, asyncFilter);
                    templateAttributes.$$templateElement = _templateElement;
                } else {
                    setRefresh(templateElement, asyncFilter);
                }

                return function link($scope, $element, $attrs, $select) {
                    var maus = 'mass-autocomplete-ui-select';
                    var aus = 'async-ui-select';

                    var head = angular.element('html head');
                    if ($attrs.$$style && head.find('style[title="custom-ui-select-no-multiple"]').length === 0)
                        head.append($attrs.$$style);

                    if ($attrs.customMassAutocompleteItem) {
                        $element.addClass(maus);
                        var massAutocompleteItem = getMassAutocompleteItem();
                        if (!massAutocompleteItem.suggest) {
                            massAutocompleteItem.suggest = Filter.suggest_field_delimited;
                        }
                        var filterInput = $element.querySelectorAll('input.ui-select-search');
                        filterInput.attr('mass-autocomplete-item', $attrs.customMassAutocompleteItem);
                        //filterInput.attr('ng-change', 'debugQuery()');
                        $compile(filterInput)($scope);


                        $attrs.$$container.empty();
                        $element.before($attrs.$$container);
                        $element.detach();

                        $attrs.$$container.append($element);
                        var template = $attrs.$$templateElement.clone();
                        var _cloneElement = $compile(template)($scope, function(clonedElement, $scope) {
                            $attrs.$$container.append(clonedElement);
                        });
                        _cloneElement.addClass(aus);
                        $attrs.$$cloneElement = _cloneElement;

                        $compile($attrs.$$button)($scope);
                        $attrs.$$container.append($attrs.$$button);
                        $element.css('display', 'none').addClass('custom-ui-select-hide');

                        var keys = [];
                        $attrs.$$container.bind('keydown', function(e) {
                            keys.push(e.keyCode);
                        });
                        $attrs.$$container.bind('keyup', function(e) {
                            if (keys.length > 0) {
                                if (angular.equals(keys, [17, 18, 70])) {
                                    $scope.complex();
                                }
                                keys.splice(0, keys.length);
                            }
                        });
                    } else {
                        $element.addClass(aus);
                    }

                    function getMassAutocompleteItem() {
                        var configPath = $attrs.customMassAutocompleteItem.split('.');
                        if (configPath.length === 1) {
                            return $scope[$attrs.customMassAutocompleteItem];
                        } else {
                            var config = $scope;
                            configPath.forEach(function(path) {
                                config = config[path];
                            });
                            return config;
                        }
                    }
                };
            }
        };
    }]);
/**
 * Created by Monica on 12/09/2016.
 */


var _wizard = angular.module('opengate-angular-js');

_wizard.controller('helperDialogController', ['$scope', '$element', '$attrs', '$uibModal', function($scope, $element, $attrs, $uibModal) {
    var $helper = this;
    var style = angular.element('<style title="helper-dialog-style">' +
        'helper-dialog .row-eq-height,.helper-dialog .row-eq-height {display: -webkit-box;display: -webkit-flex;display: -ms-flexbox;display: flex;}' +
        'helper-dialog .vcenter,.helper-dialog .vcenter {display: -webkit-box;display: -webkit-flex;display: -ms-flexbox;display: flex;flex-direction: column;justify-content: center;}' +
        '.helper-dialog .top-buffer {margin-top: 25px;}' +
        '.helper-dialog .custom-ui-select-label {display: none;}' +
        '.helper-dialog .without-padding-top .form-group {margin-top: 0 !important;}' +
        '.helper-dialog .without-padding-top.modal-body h4 {padding-bottom: 0px;}' +
        '</style>');

    var head = angular.element('html head');
    if (head.find('style[title="helper-dialog-style"]').length === 0)
        head.append(style);

    $helper.mode = 'default';
    if ($helper.helperTitle) {
        $helper.mode = 'title';
        if ($helper.helperButton) {
            $helper.mode = 'title_button';
        }
    } else if ($helper.helperButton) {
        $helper.mode = 'button';
    }

    $helper.open = function() {

        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'helper.view.modal.html',
            controller: 'helperDialogModalController',
            controllerAs: '$ctrl',
            windowClass: 'helper-dialog',
            resolve: {
                helper_id: function() {
                    if ($helper.componentsIds && $helper.componentsIds.length === 1) {
                        return $helper.componentsIds[0];
                    } else {
                        return $helper.helperId;
                    }

                },
                helper_exclusive: function() {
                    return $helper.helperExclusive === 'true';
                },
                specific_type: function() {
                    return $helper.specificType;
                },
                helper_extra: function() {
                    return $helper.helperExtra;
                },
                helper_selected: function() {
                    if ($helper.helperExtra && $helper.helperExtra.selected) {
                        return $helper.helperExtra.selected;
                    } else {
                        return $helper.selected;
                    }
                }
            }
        });
        //Send result
        modalInstance.result.then(function(helper_result) {
            if (helper_result) {
                $helper.selected = angular.fromJson(helper_result);
                if ($helper.onCopy) {
                    $helper.onCopy({ $helper_keys: helper_result });
                }

                if ($helper.onMulti && angular.isArray($helper.onMulti)) {
                    angular.forEach($helper.onMulti, function(_onCopy, idx) {
                        if (angular.isFunction(_onCopy))
                            _onCopy({ $helper_keys: helper_result });
                    });
                }
            } else {
                console.warn('Nothing selected on modal');
            }
        }, function() {});
    };
}]);

_wizard.controller('helperDialogModalController', ['$scope', '$uibModalInstance', 'helper_id', 'helper_exclusive', 'specific_type', 'helper_extra', 'helper_selected',
    function($scope, $uibModalInstance, helper_id, helper_exclusive, specific_type, helper_extra, helper_selected) {
        var $ctrl = this;
        $ctrl.helper_extra = helper_extra;

        // Extraer el primer bloque de letras
        var regex = /(\w|0-9)+/g;
        helper_id = regex.exec(helper_id.toLowerCase())[0];

        $ctrl.helper_id = helper_id;

        $ctrl[helper_id + 'IsOpen'] = true;
        $ctrl[helper_id + 'IsExclusive'] = $ctrl.helper_exclusive = helper_exclusive;

        $ctrl.helper_keys = {};
        $ctrl.specific_type = specific_type;
        var events = [];

        //config map helper
        $ctrl.map = {
            center: {
                lat: helper_selected && helper_selected.latitude ? helper_selected.latitude : 40.095,
                lng: helper_selected && helper_selected.longitude ? helper_selected.longitude : -3.823,
                zoom: helper_selected && helper_selected.zoom ? helper_selected.zoom : 4
            },
            markers: {},
            events: {
                markers: {
                    enable: ['dragend', 'click'],
                    logic: 'emit'
                },
                map: {
                    enable: ['click'],
                    logic: 'emit'
                }
            }
        };

        if (helper_selected && helper_selected.latitude) {
            $ctrl.map.markers = {
                marker: {
                    lat: helper_selected.latitude,
                    lng: helper_selected.longitude,
                    draggable: true,
                    focus: true,
                    message: 'Drag me to move. Click me to remove'
                }
            };
            setPosition(helper_selected.latitude, helper_selected.longitude, helper_selected.zoom);
        }

        // contorl de elementos de entrada
        if (helper_extra) {
            // configuración extra de mapa
            if (helper_extra.map) {
                var markers = {
                    marker: {
                        draggable: true,
                        focus: true,
                        message: 'Drag me to move. Click me to remove'
                    }
                };
                $ctrl.map = _.merge($ctrl.map, helper_extra.map, markers);
            }

            //Configuracion extra para areas
            if (helper_extra.area) {
                $ctrl.area = helper_extra.area
            }
        }

        function setPosition(lat, lng, zoom) {
            $ctrl.helper_keys['map'] = {
                latitude: lat,
                longitude: lng,
                zoom: zoom
            };
        };

        events.push(
            $scope.$on('leafletDirectiveMarker.map-marker.click', function(event, args) {
                delete $ctrl.helper_keys.map;
                $ctrl.map.markers = {};
            }),
            $scope.$on('leafletDirectiveMap.map-marker.click', function(event, args) {
                var latlng = args.leafletEvent.latlng;
                $ctrl.map.markers = {
                    marker: {
                        lat: latlng.lat,
                        lng: latlng.lng,
                        draggable: true,
                        focus: true,
                        message: 'Drag me to move. Click me to remove'
                    }
                };
                setPosition(latlng.lat, latlng.lng, args.leafletObject._zoom);
            }),
            $scope.$on('leafletDirectiveMarker.map-marker.dragend', function(event, args) {
                var point = args.leafletEvent.target._leaflet_events.dragend[0].context._latlng;
                setPosition(point.lat, point.lng, args.leafletObject._zoom);
            })
        );

        //config datastream
        $ctrl.datastream = {};
        if (helper_selected && helper_selected.datastreamId) {
            $ctrl.helper_keys['datastream'] = { datastreamId: helper_selected.datastreamId };
            $ctrl.datastream = {
                selected: [{ identifier: helper_selected.datastreamId }]
            };
        }
        $scope.onSelectDatastreamKey = function($item, $model) {
            $ctrl.helper_keys['datastream'] = { datastreamId: $item.identifier };
        };

        $scope.onDeleteDatastreamKey = function() {
            delete $ctrl.helper_keys.datastream;
        };

        //config entity
        $ctrl.entity = {};
        if (helper_selected && helper_selected.entityKey) {
            $ctrl.helper_keys['entity'] = {
                entityKey: helper_selected.entityKey
            };
            $ctrl.entity = {
                selected: [{
                    provision: {
                        administration: {
                            identifier: {
                                _current: {
                                    value: helper_selected.entityKey
                                }
                            }
                        }
                    }
                }]
            };
        }

        $scope.onSelectEntityKey = function($item, $model) {
            // $ctrl.helper_keys['entity'] = { entityKey: $item.id };
            $ctrl.helper_keys['entity'] = {
                entityKey: $item.provision.administration.identifier._current.value
            };
        };

        $scope.onDeleteEntityKey = function() {
            delete $ctrl.helper_keys.entity;
        };

        //config subscriber
        $ctrl.subscriber = {};
        if (helper_selected && helper_selected.subscriberKey) {
            $ctrl.helper_keys['subscriberKey'] = {
                subscriberKey: helper_selected.subscriberKey
            };
            $ctrl.subscriber = {
                selected: [{
                    provision: {
                        subscriber: {
                            identifier: {
                                _current: {
                                    value: helper_selected.subscriberKey
                                }
                            }
                        }
                    }
                }]
            };
        }

        $scope.onSelectSubscriberKey = function($item, $model) {
            $ctrl.helper_keys['subscriber'] = $item;
        };

        $scope.onDeleteSubscriberKey = function() {
            delete $ctrl.helper_keys.subscriber;
        };

        //config entity
        $ctrl.subscription = {};

        if (helper_selected && helper_selected.subscriptionKey) {
            $ctrl.helper_keys['subscriptionKey'] = {
                subscriptionKey: helper_selected.subscriptionKey
            };
            $ctrl.subscription = {
                selected: [{
                    provision: {
                        subscription: {
                            identifier: {
                                _current: {
                                    value: helper_selected.subscriptionKey
                                }
                            }
                        }
                    }
                }]
            };
        }

        $scope.onSelectSubscriptionKey = function($item, $model) {
            $ctrl.helper_keys['subscription'] = $item;
        };

        $scope.onDeleteSubscriptionKey = function() {
            delete $ctrl.helper_keys.subscription;
        };

        //config areas
        if (!$ctrl.area) {
            $ctrl.area = {};
        } else {
            delete $ctrl.area.selected;
        }

        if (helper_selected && helper_selected.area) {
            $ctrl.helper_keys['area'] = { area: helper_selected.area };
            $ctrl.area.selected = [{ identifier: helper_selected.area }];
        }

        $scope.onSelectAreaKey = function($item, $model) {
            $ctrl.helper_keys['area'] = { area: $item.identifier };
        };

        $scope.onDeleteAreaKey = function() {
            delete $ctrl.helper_keys.area;
        };

        //Condicion para botón de aplicar todo lo seleccionado en los helpers
        $ctrl.canApply = function() {
            return Object.keys($ctrl.helper_keys).length > 0;
        };


        //config bundles
        if (!$ctrl.bundle) {
            $ctrl.bundle = {};
        } else {
            delete $ctrl.bundle.selected;
        }

        if (helper_selected && helper_selected.bundle) {
            $ctrl.helper_keys['bundle'] = { bundle: helper_selected.bundle };
            $ctrl.bundle.selected = [{ id: helper_selected.bundle }];
        }

        $scope.onSelectBundleKey = function($item, $model) {
            $ctrl.helper_keys['bundle'] = {
                bundleId: $item.id,
                bundleName: $item.name,
                bundleVersion: $item.version
            };
        };

        $scope.onDeleteBundleKey = function() {
            delete $ctrl.helper_keys.bundle;
        };

        //Condicion para botón de aplicar todo lo seleccionado en los helpers
        $ctrl.canApply = function() {
            return Object.keys($ctrl.helper_keys).length > 0;
        };

        //Modal methods
        $ctrl.ok = function(helper) {
            if (helper) {
                $uibModalInstance.close($ctrl.helper_keys[helper]);
            } else {
                var finalKeys = {};
                angular.forEach($ctrl.helper_keys, function(value, key) {
                    if (key.trim().toLowerCase() === 'subscriber' || key.trim().toLowerCase() === 'subscription') {
                        var identifier = value.provision[key.trim().toLowerCase()].identifier._current.value;
                        finalKeys[key.trim().toLowerCase() + 'Key'] = identifier;
                    } else {
                        angular.forEach(value, function(finalValue, finalkey) {
                            finalKeys[finalkey] = finalValue;
                        });
                    }
                });

                $uibModalInstance.close(finalKeys);
            }
        };
        $ctrl.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

        //clear evetns
        $scope.$on('destroy', function() {
            for (var eventToDestroy in events) {
                eventToDestroy();
            }
        });
    }
]);


_wizard.component('helperDialog', {
    transclude: true,
    templateUrl: 'views/helper.view.html',
    controller: 'helperDialogController',
    controllerAs: '$helper',
    bindings: {
        onCopy: '&',
        helperId: '@',
        specificType: '@',
        helperButton: '@',
        helperTitle: '@',
        helperExclusive: '@',
        helperExtra: '<',
        modalTemplate: '@',
        modalController: '@',
        onMulti: '<'
    }
});



angular.module('opengate-angular-js').controller('customUiSelectSubscriptionController', ['$scope', '$element', '$attrs', '$api', '$entityExtractor',
    function($scope, $element, $attrs, $api, $entityExtractor) {
        var ctrl = this;
        ctrl.ownConfig = {
            builder: $api().subscriptionsSearchBuilder().provisioned(),
            filter: function(search) {
                var filter = {
                    'or': [
                        { 'like': { 'provision.device.communicationModules[].subscription.identifier': search } },
                        { 'like': { 'device.communicationModules[].subscription.identifier': search } }
                    ]
                };
                if (!!ctrl.specificType) {
                    filter = {
                        'and': [
                            filter,
                            {
                                'or': [{
                                        'eq': {
                                            'device.communicationModules[].subscription.specificType': ctrl.specificType
                                        }
                                    },
                                    {
                                        'eq': {
                                            'provision.device.communicationModules[].subscription.specificType': ctrl.specificType
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                }

                return filter;
            },
            rootKey: 'devices',
            collection: [],
            customSelectors: $api().subscriptionsSearchBuilder().provisioned(),
            processingData: $entityExtractor.extractSubscriptions
        };

        ctrl.entitySelected = function($item, $model) {
            var return_obj = {};
            return_obj['$item'] = $item;
            return_obj['$model'] = $model;
            ctrl.onSelectItem(return_obj);
        };

        ctrl.entityRemove = function($item, $model) {
            ctrl.onRemove($item, $model);
        };
    }
]);

angular.module('opengate-angular-js').component('customUiSelectSubscription', {

    templateUrl: 'views/custom.ui.select.subscription.html',
    controller: 'customUiSelectSubscriptionController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        entity: '=',
        specificType: '@',
        multiple: '<',
        isRequired: '='
    }

});



angular.module('opengate-angular-js').controller('customUiSelectSubscriberController', ['$scope', '$element', '$attrs', '$api', '$entityExtractor',
    function($scope, $element, $attrs, $api, $entityExtractor) {

        var ctrl = this;
        ctrl.ownConfig = {
            builder: $api().subscribersSearchBuilder().provisioned(),
            filter: function(search) {
                var filter = {
                    'or': [
                        { 'like': { 'provision.device.communicationModules[].subscriber.identifier': search } },
                        { 'like': { 'device.communicationModules[].subscriber.identifier': search } },
                        { 'like': { 'provision.device.communicationModules[].subscriber.mobile.icc': search } }
                    ]
                };
                if (!!ctrl.specificType) {
                    filter = {
                        'and': [
                            filter,
                            {
                                'or': [{
                                        'eq': {
                                            'device.communicationModules[].subscriber.specificType': ctrl.specificType
                                        }
                                    },
                                    {
                                        'eq': {
                                            'provision.device.communicationModules[].subscriber.specificType': ctrl.specificType
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                }
                return filter;
            },
            rootKey: 'devices',
            collection: [],
            customSelectors: $api().subscribersSearchBuilder().provisioned(),
            processingData: $entityExtractor.extractSubscribers
        };

        ctrl.entitySelected = function($item, $model) {
            var return_obj = {};
            return_obj['$item'] = $item;
            return_obj['$model'] = $model;
            ctrl.onSelectItem(return_obj);
        };

        ctrl.entityRemove = function($item, $model) {
            ctrl.onRemove($item, $model);
        };
    }
]);

angular.module('opengate-angular-js').component('customUiSelectSubscriber', {

    templateUrl: 'views/custom.ui.select.subscriber.html',
    controller: 'customUiSelectSubscriberController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        entity: '=',
        specificType: '@',
        multiple: '<',
        isRequired: '='
    }

});



angular.module('opengate-angular-js').controller('customUiSelectProvisionDatastreamController', ['$scope', '$element', '$attrs', '$api', '$q', '$http',
    function($scope, $element, $attrs, $api, $q, $http) {
        var ctrl = this;
        ctrl.ownConfig = {
            builder: $api().datamodelsSearchBuilder(),
            filter: function(search) {
                ctrl.lastSearch = search;
                var filter = {
                    and: [
                        { like: { 'datamodels.categories.datastreams.name': '^(provision\.).*' } },
                        { like: { 'datamodels.categories.datastreams.name': '^(?!provision\.administration\.).*' } },
                        { like: { 'datamodels.categories.datastreams.name': '^(?!provision\.device\.).*' } },
                        { like: { 'datamodels.categories.datastreams.name': '^(?!provision\.asset\.).*' } }
                    ]
                };
                if (search) {
                    filter.and.push({ 'like': { 'datamodels.categories.datastreams.name': search } });
                }
                return filter;
            },
            rootKey: 'datamodels',
            collection: [],
            processingData: function(data, collection) {
                if (!ctrl.lastSearch) return $q(function(ok) { ok([]); });
                return $q(function(ok) {
                    var _datastreams = [];
                    var datamodels = data.data.datamodels;
                    $http.post('/datamodels/default').then(
                        function(datamodels_default) {
                            var identifiers_defaults = '';

                            if (datamodels_default.status !== 204) {
                                identifiers_defaults = datamodels_default.data.datamodels.map(function(datamodel) { return datamodel.identifier; });
                            }

                            datamodels = datamodels.filter(function(datamodel) {
                                return identifiers_defaults.indexOf(datamodel.identifier) === -1;
                            });
                            angular.forEach(datamodels, function(datamodel, key) {
                                var categories = datamodel.categories;
                                var _datamodel = {
                                    identifier: datamodel.identifier,
                                    description: datamodel.description,
                                    name: datamodel.name,
                                    organization: datamodel.organizationName
                                };
                                angular.forEach(categories, function(category, key) {
                                    var datastreams = category.datastreams;
                                    var _category = { identifier: category.identifier };
                                    angular.forEach(datastreams
                                        .filter(function(ds) {
                                            return (ds.identifier.indexOf(ctrl.lastSearch) > -1 && !!ctrl.lastSearch.length) || !ctrl.lastSearch;
                                        }),
                                        function(datastream, key) {
                                            var _datastream = angular.copy(datastream);
                                            _datastream.datamodel = _datamodel;
                                            _datastream.category = _category;
                                            _datastreams.push(_datastream);
                                        });
                                });
                            });
                            angular.copy(_datastreams, collection);
                            ok(collection);
                        }
                    ).catch(function(err) {
                        console.error(err);
                        ok([]);
                    });

                });
            },
            customSelectors: $api().datamodelsSearchBuilder()
        };

        ctrl.datastreamSelected = function($item, $model) {
            var return_obj = {};
            return_obj['$item'] = $item;
            return_obj['$model'] = $model;
            ctrl.onSelectItem(return_obj);
        };

        ctrl.datastreamRemove = function($item, $model) {
            var return_obj = {};
            return_obj['$item'] = $item;
            return_obj['$model'] = $model;
            ctrl.onRemove(return_obj);
        };
    }
]);

angular.module('opengate-angular-js').component('customUiSelectProvisionDatastream', {
    templateUrl: 'views/custom.ui.select.datastream.html',
    controller: 'customUiSelectProvisionDatastreamController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        datastream: '=',
        multiple: '<',
        isRequired: '='
    }

});


angular.module('opengate-angular-js').controller('helperUiSelectController', ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
    var $ctrl = this;
    $ctrl.$helper_keys = {};
    $ctrl.labelError = $ctrl.labelError ? $ctrl.labelError : 'Parameter is required';
    $ctrl.labelText = $ctrl.labelText ? $ctrl.labelText : 'Parameter';

    $ctrl.helperTagTransform = function(newTag) {
        return { key: 'custom', value: newTag };
    }

    $ctrl._onCopy = function(copy_obj) {
        $ctrl.$helper_keys = copy_obj.$helper_keys;
        $ctrl.have_helper_keys = true;
        if ($ctrl.helperModel && $ctrl.helperModel.length > 0) {
            $ctrl.$helper_keys["'" + $ctrl.labelText + "' default"] = $ctrl.helperModel;
        }
    }

    $ctrl.$onChanges = function(changesObj) {
        //console.log(JSON.stringify(changesObj));
        if (changesObj && changesObj.selectedKeys && changesObj.selectedKeys.currentValue) {
            if (Object.keys(changesObj.selectedKeys.currentValue).length > 0) {
                $ctrl.$helper_keys = changesObj.selectedKeys.currentValue;
                $ctrl.have_helper_keys = true;
            } else {
                $ctrl.$helper_keys = {};
                $ctrl.have_helper_keys = false;
            }
        }
    }

    $ctrl.$onInit = function() {
        if (!$ctrl.helperCtrl.onMulti) {
            $ctrl.helperCtrl.onMulti = [];
        }
        $ctrl.helperCtrl.onMulti.push($ctrl._onCopy);

        if (!$ctrl.helperCtrl.componentsIds) {
            $ctrl.helperCtrl.componentsIds = [];
        }
        $ctrl.helperCtrl.componentsIds.push($ctrl.labelText);

        $ctrl.have_helper_keys = false;
    };

}]);

angular.module('opengate-angular-js').component('helperUiSelect', {
    templateUrl: 'views/custom.ui.select.helper.html',
    transclude: {
        input: '?helperUiSelectInput'
            //,custom: '?helperUiSelectCustom'
    },
    require: {
        helperCtrl: '^^helperDialog'
    },
    controller: 'helperUiSelectController',
    bindings: {
        id: '@',
        name: '@',
        labelText: '@',
        helperModel: '=',
        required: '=',
        multiple: '<',
        labelError: '@',
        selectedKeys: '<'
    }

});



angular.module('opengate-angular-js').controller('customUiSelectEntityController', ['$scope', '$element', '$attrs', '$api', function($scope, $element, $attrs, $api) {
    var ctrl = this;
    ctrl.ownConfig = {
        builder: $api().devicesSearchBuilder(),
        filter: function(search) {
            return {
                'or': [
                    { 'like': { 'provision.administration.identifier': search } },
                    { 'like': { 'provision.device.specificType': search } },
                    { 'like': { 'device.specificType': search } }
                ]
            };
        },
        rootKey: 'devices',
        collection: [],
        customSelectors: $api().devicesSearchBuilder()
    };

    ctrl.entitySelected = function($item, $model) {
        var return_obj = {};
        return_obj['$item'] = $item;
        return_obj['$model'] = $model;
        ctrl.onSelectItem(return_obj);
    };

    ctrl.entityRemove = function($item, $model) {
        ctrl.onRemove($item, $model);
    };
}]);

angular.module('opengate-angular-js').component('customUiSelectEntity', {

    templateUrl: 'views/custom.ui.select.entity.html',
    controller: 'customUiSelectEntityController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        entity: '=',
        multiple: '<',
        isRequired: '='
    }

});



angular.module('opengate-angular-js').controller('customUiSelectDatastreamController', ['$scope', '$element', '$attrs', '$api', '$q', function($scope, $element, $attrs, $api, $q) {
    var ctrl = this;
    ctrl.ownConfig = {
        builder: $api().datamodelsSearchBuilder(),
        filter: function(search) {
            ctrl.lastSearch = search;
            if (!search)
                return {};
            return {
                'or': [
                    //{ 'like': { 'datamodel.categories.datastreams.id': search } },
                    { 'like': { 'datamodels.categories.datastreams.name': search } }
                    //{ 'like': { 'datamodel.identifier': search } },
                    //{ 'like': { 'datamodel.name': search } },
                    //{ 'like': { 'datamodel.description': search } },
                    //{ 'like': { 'datamodel.version': search } }
                ]
            };
        },
        rootKey: 'datamodels',
        collection: [],
        processingData: function(data, collection) {
            if (!ctrl.lastSearch) return $q(function(ok) { ok(); });
            return $q(function(C_ok) {
                var _datastreams = [];
                var datamodels = data.data.datamodels;
                angular.forEach(datamodels, function(datamodel, key) {
                    var categories = datamodel.categories;
                    var _datamodel = {
                        identifier: datamodel.identifier,
                        description: datamodel.description,
                        name: datamodel.name,
                        organization: datamodel.organizationName
                    };
                    angular.forEach(categories, function(category, key) {
                        var datastreams = category.datastreams;
                        var _category = { identifier: category.identifier };
                        angular.forEach(datastreams
                            .filter(function(ds) {
                                return (ds.identifier.indexOf(ctrl.lastSearch) > -1 && !!ctrl.lastSearch.length) || !ctrl.lastSearch;
                            }),
                            function(datastream, key) {
                                var _datastream = angular.copy(datastream);
                                _datastream.datamodel = _datamodel;
                                _datastream.category = _category;
                                _datastreams.push(_datastream);
                            });
                    });
                });
                angular.copy(_datastreams, collection);
                C_ok(collection);
            })
        },
        customSelectors: $api().datamodelsSearchBuilder()
    };

    ctrl.datastreamSelected = function($item, $model) {
        var return_obj = {};
        return_obj['$item'] = $item;
        return_obj['$model'] = $model;
        ctrl.onSelectItem(return_obj);
    };

    ctrl.datastreamRemove = function($item, $model) {
        var return_obj = {};
        return_obj['$item'] = $item;
        return_obj['$model'] = $model;
        ctrl.onRemove(return_obj);
    };
}]);

angular.module('opengate-angular-js').component('customUiSelectDatastream', {
    templateUrl: 'views/custom.ui.select.datastream.html',
    controller: 'customUiSelectDatastreamController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        datastream: '=',
        multiple: '<',
        isRequired: '='
    }

});



angular.module('opengate-angular-js').controller('customUiSelectBundleController', ['$scope', '$element', '$attrs', '$api', '$q', function($scope, $element, $attrs, $api, $q) {
    var ctrl = this;

    ctrl.ownConfig = {
        builder: $api().bundlesSearchBuilder(),
        filter: function(search) {
            ctrl.lastSearch = search;

            if (!search) {
                return {};
            } else {
                return {
                    'or': [
                        { 'like': { 'bundles.name': search } },
                        { 'like': { 'bundles.version': search } },
                        { 'like': { 'bundles.description': search } }
                    ]
                };
            }
        },
        rootKey: 'bundles',
        collection: [],
        customSelectors: $api().bundlesSearchBuilder()
    };

    ctrl.bundleSelected = function($item, $model) {
        var return_obj = {};
        return_obj['$item'] = $item;
        return_obj['$model'] = $model;
        ctrl.onSelectItem(return_obj);
    };

    ctrl.bundleRemove = function($item, $model) {
        var return_obj = {};
        return_obj['$item'] = $item;
        return_obj['$model'] = $model;
        ctrl.onRemove(return_obj);
    };
}]);

angular.module('opengate-angular-js').component('customUiSelectBundle', {
    templateUrl: 'views/custom.ui.select.bundle.html',
    controller: 'customUiSelectBundleController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        bundle: '=',
        multiple: '<',
        isRequired: '='
    }
});



angular.module('opengate-angular-js').controller('customUiSelectAreaController', ['$scope', '$element', '$attrs', '$api', '$q', function($scope, $element, $attrs, $api, $q) {
    var ctrl = this;

    var andFilter;
    if (ctrl.organization) {
        andFilter = [{ 'eq': { 'areas.organization': ctrl.organization } }];
    }

    ctrl.ownConfig = {
        builder: $api().areasSearchBuilder(),
        filter: function(search) {
            ctrl.lastSearch = search;

            if (andFilter) {
                if (search) {
                    andFilter.push({
                        'or': [
                            { 'like': { 'areas.name': search } },
                            { 'like': { 'areas.organization': search } }
                        ]
                    });
                }

                return {
                    'and': andFilter
                };
            } else {
                if (!search) {
                    return {};
                } else {
                    return {
                        'or': [
                            { 'like': { 'areas.name': search } },
                            { 'like': { 'areas.organization': search } }
                        ]
                    };
                }
            }
        },
        rootKey: 'areas',
        collection: [],
        customSelectors: $api().areasSearchBuilder()
    };

    ctrl.areaSelected = function($item, $model) {
        var return_obj = {};
        return_obj['$item'] = $item;
        return_obj['$model'] = $model;
        ctrl.onSelectItem(return_obj);
    };

    ctrl.areaRemove = function($item, $model) {
        var return_obj = {};
        return_obj['$item'] = $item;
        return_obj['$model'] = $model;
        ctrl.onRemove(return_obj);
    };
}]);

angular.module('opengate-angular-js').component('customUiSelectArea', {
    templateUrl: 'views/custom.ui.select.area.html',
    controller: 'customUiSelectAreaController',
    bindings: {
        onSelectItem: '&',
        onRemove: '&',
        area: '=',
        multiple: '<',
        isRequired: '=',
        organization: '<'
    }
});})(window);