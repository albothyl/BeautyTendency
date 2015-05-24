/**
 * 자재관리 dataService
 */
angular
    .module('app.device')
    .service('deviceDataService', deviceDataService);

	function deviceDataService($http, $upload, adminConstant) {

	    var service = {
	        getDeviceList: getDeviceList,
	        getDeviceDetail : getDeviceDetail,
	        insertDevice : insertDevice,
	        updateDevice : updateDevice,
	        deleteDevice : deleteDevice,
	        getDeviceFileList : getDeviceFileList
	    };

	    return service;


	    /**
	     * 디바이스 목록 조회
	     */
	    function getDeviceList(searchInfo) {
	    	return $http.post(adminConstant.contextPath + '/deviceMgt/getDeviceList', searchInfo)
	    	  .success(getDeviceListComplete)
              .error(getDeviceListFailed);

	    	function getDeviceListComplete(response){
	    		return response;
	    	}

	    	function getDeviceListFailed(error) {
	            //logger.error('XHR Failed for getAvengers.' + error.data);
	        }
	    }


	    /**
	     * 디바이스 상세 조회
	     */
	    function getDeviceDetail(searchInfo) {
	    	return $http.post(adminConstant.contextPath + '/deviceMgt/getDeviceInfo', searchInfo)
	    	  .success(getDeviceDetailComplete)
              .error(getDeviceDetailFailed);

	    	function getDeviceDetailComplete(response){
	    		return response;
	    	}

	    	function getDeviceDetailFailed(error) {
	            //logger.error('XHR Failed for getAvengers.' + error.data);
	        }
	    }


	    /**
	     * 디바이스 등록
	     */
	    function insertDevice(deviceDetail, files){
	    	return $upload.upload({
	            url: adminConstant.contextPath +'/deviceMgt/insertDevice',
	            method: 'POST',
	            headers : {
					"Content-Type" : "multipart/form-data"
				},
	            file : files,
	            fields : {
	            	files : files
	            },
	            //data 속성으로 별도의 데이터를 보냄.
	            data : {
            		bbsPrntsTypeCd : "003",
	            	devNm : deviceDetail.devNm,
	            	makrNm : deviceDetail.makrNm,
	            	devModelTypeNm : deviceDetail.devModelTypeNm,
	            	frmwrVerVal : deviceDetail.frmwrVerVal,
	            	contlInfoSbst : deviceDetail.contlInfoSbst,
	            	contlFormlSbst : deviceDetail.contlFormlSbst,
	            	dtlSbst : deviceDetail.dtlSbst,
	            	ottpYn : deviceDetail.ottpYn
	            },
	            fileFormDataName : 'fileField1'
			}).success(insertDeviceComplete)
			  .error(insertDeviceFailed);

	    	function insertDeviceComplete(response){
	    		return response;
	    	}

	    	function insertDeviceFailed(error) {
	        }

	    }




	    /**
	     * 디바이스 수정
	     */
	    function updateDevice(deviceDetail, files, tempFileList){
	    	return $upload.upload({
	            url: adminConstant.contextPath +'/deviceMgt/updateDevice',
	            method: 'POST',
	            headers : {
					"Content-Type" : "multipart/form-data"
				},
	            file : files,
	            fields : {
	            	files : files
	            },
	            //data 속성으로 별도의 데이터를 보냄.
	            data : {
            		bbsPrntsTypeCd : "003",
            		devMtrlSeq : deviceDetail.devMtrlSeq,
	            	devNm : deviceDetail.devNm,
	            	makrNm : deviceDetail.makrNm,
	            	devModelTypeNm : deviceDetail.devModelTypeNm,
	            	frmwrVerVal : deviceDetail.frmwrVerVal,
	            	contlInfoSbst : deviceDetail.contlInfoSbst,
	            	contlFormlSbst : deviceDetail.contlFormlSbst,
	            	dtlSbst : deviceDetail.dtlSbst,
	            	ottpYn : deviceDetail.ottpYn,
	            	fileList : tempFileList
	            },
	            fileFormDataName : 'fileField1'
			}).success(updateDeviceComplete)
              .error(updateDeviceFailed);

	    	function updateDeviceComplete(response){
	    		return response;
	    	}

	    	function updateDeviceFailed(error) {
	        }
	    }


	    /**
	     * 디바이스 삭제
	     */
	    function deleteDevice(searchInfo){

	    	return $http.post(adminConstant.contextPath + '/deviceMgt/deleteDevice', searchInfo)
	    	  .success(deleteDeviceComplete)
              .error(deleteDeviceFailed);

	    	function deleteDeviceComplete(response){
	    		return response;
	    	}

	    	function deleteDeviceFailed(error) {
	        }
	    }


	    /**
	     * 디바이스 파일 목록 조회
	     */
	    function getDeviceFileList(devMtrlSeq){
	    	return $http.get(adminConstant.contextPath +'/admin/bbs/fileList',{
				params : {
					"bbs_prnts_seq" : devMtrlSeq || "",
					"bbs_prnts_type_cd" : "003"
				}
			}).success(getDeviceFileListComplete)
			  .error(getDeviceFileListFailed);

	    	function getDeviceFileListComplete(response){
	    		return response;
	    	}

	    	function getDeviceFileListFailed(error) {
	        }
	    }

	}

