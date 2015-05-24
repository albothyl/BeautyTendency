/**
 * 지원시설 관리
 */
angular.module('app.device', ['angularFileUpload', 'ui.router', 'kt.ui'])
    .controller('DeviceController', DeviceController);

	function DeviceController() {

		var vm = this;

		vm.menuData = transformTozTreeFormat($.parseJSON(sessionStorage.getItem('menuList')));

		angular.forEach(vm.menuData, function(menuInfo){
			if(menuInfo.scrnAdr === "/device"){
				vm.menu = menuInfo.child;
				vm.parentScrnAdr = menuInfo.scrnAdr;
			}
		});
	}