angular
	.module('app')
	.constant("adminConstant", {
        "contextPath": "/ccei/cms",
        "commonContextPath": "/ccei"
    })
    .constant('messageType', {
		warning : "warning",
		normal : undefined,
		info : "info",
		success : "success"
	});