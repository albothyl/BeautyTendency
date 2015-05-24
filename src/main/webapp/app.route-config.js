angular
    .module('app')
    .config(routeConfig);

	function routeConfig($stateProvider, $urlRouterProvider){

		$urlRouterProvider
			.when("", "/main")
	    	.otherwise("/main");

		$stateProvider
			.state('main', {
				url : '/main',
				template: '<h3>main dashboard</h3>'
			});


	}
