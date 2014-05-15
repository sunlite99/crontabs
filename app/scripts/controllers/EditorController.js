angular.module("crontabs").controller("EditorCtrl", [

    '$scope',
    'i18nManager',
    'AdvancedScheduleService',

function($scope,
         i18nManager,
         AdvancedScheduleService) {

    $scope.i18nManager = i18nManager;
    $scope.isRemovable = AdvancedScheduleService.isRemovable;
    $scope.tabs = AdvancedScheduleService.getTabs();
    $scope.operations = AdvancedScheduleService.getOperations();
    $scope.types = AdvancedScheduleService.getTabTriggerTypes();

    $scope.addCron = function(tab) {
        AdvancedScheduleService.addCronToTab(tab);
        $scope.editor.$setDirty();
    };

    $scope.addTextExpression = function(tab) {
        AdvancedScheduleService.addTextExpressionToTab(tab);
        $scope.editor.$setDirty();
    };

    $scope.removeCron = function(tab, cronToRemove) {
        AdvancedScheduleService.removeCron(tab, cronToRemove);
        $scope.editor.$setDirty();
    };

    $scope.removeTab = function(tabToRemove) {
        $scope.tabs = AdvancedScheduleService.removeTab($scope.tabs, tabToRemove);
        $scope.editor.$setDirty();
    };

    $scope.addTab = function() {
        AdvancedScheduleService.addTab($scope.tabs);
        $scope.editor.$setDirty();
    };

    $scope.onCronExpressionChanged = function(cron) {
        AdvancedScheduleService.onCronExpressionChanged(cron);
    };

    $scope.onSubmit = function() {
        AdvancedScheduleService.saveSchedule(angular.copy($scope.tabs));
        $scope.editor.$setPristine();
    };
}]);