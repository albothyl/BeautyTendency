/**
 * 디바이스 등록/수정/삭제
 */
angular
    .module('app.device')
    .controller('DeviceDetailController', DeviceDetailController);

	function DeviceDetailController(deviceDataService, $stateParams, $state, messageBox) {

		var vm = this;

		// 디바이스 seq
		vm.devMtrlSeq = $stateParams.devMtrlSeq;

		vm.titleNm = $stateParams.devMtrlSeq ? '자재수정' : "자재 등록";

		// 썸네일 이미지
		//vm.selectedThumFiles = [];
		vm.tempThumFiles = [];

		// 첨부파일 목록
		vm.tempAttachFiles = [];

		// 디바이스 상세 정보
		vm.deviceDetail = {};

		// 업로드할 첨부파일, 썸네일
		vm.selectedFiles = [];

		// 첨부파일, 썸네일 목록
		vm.fileList = [];
		vm.tempFileList = [];




		// 디바이스 상세 조회
		vm.getDeviceDetail = getDeviceDetail;

		// 디바이스 등록
		vm.insertDevice = insertDevice;

		// 디바이스 수정
		vm.updateDevice = updateDevice;

		// 디바이스 삭제
		vm.deleteDevice = deleteDevice;

		// 파일 선택 팝업
		vm.fileSelectPop = fileSelectPop;

		// 파일 선택
		vm.onFileSelect = onFileSelect;

		// 파일 데이터 set
		vm.setFileData = setFileData;

		// 파일 삭제
		vm.fileDel = fileDel;

		// 폼 벨리데이션
		vm.validForm = validForm;


		if(vm.devMtrlSeq){
			vm.titleNm = "디바이스 수정";
			vm.getDeviceDetail();
		}


		/**
	     * 디바이스 상세 조회
	     */
	    function getDeviceDetail(){
	    	// data-service call
	    	deviceDataService.getDeviceDetail($stateParams)
	    	.success(function(data){
	    		vm.deviceDetail = data.dataset[0];

	    		deviceDataService.getDeviceFileList(vm.deviceDetail.devMtrlSeq)
	    		.success(function(data){
	    			vm.fileList = data.dataset;
					angular.forEach(vm.fileList, function(obj){
						//첨부파일
						if(obj.atc_file_type_cd === "000"){
							vm.tempAttachFiles.push(obj);
						}

						// 썸네일
						if(obj.atc_file_type_cd === "001"){
							vm.tempThumFiles.push(obj);
						}
					});
	    		});
	    	});
	    }


	    /**
	     * 디바이스 등록
	     */
	    function insertDevice(){

	    	// 파일 데이터 set
	    	vm.setFileData();

	    	// 필수값 체크
	    	if(!vm.validForm()){
	    		return false;
	    	}


	    	deviceDataService.insertDevice(vm.deviceDetail, vm.selectedFiles)
	    	.success(function(data){
	    		var resultCode = data.messages[0].resultCode,
					textMsg	= data.messages[0].textMsg;
				if(resultCode === 200){
					messageBox.open("디바이스가 등록 되었습니다.", {
						type :"info",
						title : "자재 관리"
					});
					$state.go("device.deviceMgt.deviceList");
				}
	    	});
	    }


	    /**
	     * 디바이스 수정
	     */
	    function updateDevice(){

	    	// 파일 데이터 set
	    	vm.setFileData();

	    	// 필수값 체크
	    	if(!vm.validForm()){
	    		return false;
	    	}

	    	deviceDataService.updateDevice(vm.deviceDetail, vm.selectedFiles, vm.tempFileList)
	    	.success(function(data){
	    		var resultCode = data.messages[0].resultCode,
					textMsg	= data.messages[0].textMsg;
	    		if(resultCode === 200){
	    			messageBox.open("디바이스가 수정 되었습니다.", {
						type :"info",
						title : "자재 관리"
					});
	    			$state.go("device.deviceMgt.deviceList");
	    		}
	    	});
	    }


	    /**
	     * 디바이스 삭제
	     */
	    function deleteDevice(){
	    	deviceDataService.deleteDevice($stateParams)
	    	.success(function(data){
	    		var resultCode = data.messages[0].resultCode,
					textMsg	= data.messages[0].textMsg;
	    		if(resultCode === 200){
	    			messageBox.open("디바이스가 삭제 되었습니다.", {
						type :"info",
						title : "자재 관리"
					});
	    			$state.go("device.deviceMgt.deviceList");
	    		}
	    	});
	    }


	    /**
	     * 디바이스 첨부파일 목록 조회
	     */
		/*function getDeviceFileList(){
			deviceDataService.getDeviceFileList()
	    	.success(function(data){
	    		var resultCode = data.messages[0].resultCode,
					textMsg	= data.messages[0].textMsg;
	    		if(resultCode === 200){
	    			//alert("파일 목록 조회");
	    		}
	    	});
		}*/


		/**
	     * 파일 선택 팝업
	     */
		function fileSelectPop(cmd){
			$("#"+cmd+"File").click();
		}


		/**
		 * 파일을 선택하면 전송하기 전에 파일 데이터를 보관해두었다가 send 호출 시 upload 서비스를 이용하여 전송
		 */
	    function onFileSelect($files, cmd) {

	    	if($files.length === 0){
	    		return;
	    	}
	    	vm.file = null;

	    	// 썸네일
	    	if(cmd === 'thum'){
	    		$files[0].atcFileTypeCd = '001';
	    		$files[0].fileNm = $files[0].name;
	    		$files[0].fileSize = $files[0].size;
	    		vm.tempThumFiles[0] = $files[0];
	    		vm.thumFileId = null;
	    	}

	    	// 첨부파일
	    	if(cmd === 'attach'){

	    		// 파일 갯수 체크
	    		if(vm.tempAttachFiles.length > 4){
	    			messageBox.open("파일 첨부는 5개까지 가능합니다.", {
						type :"info",
						title : "자재 관리"
					});
	    			return;
	    		}

	    		$files[0].atcFileTypeCd = '000';
	    		$files[0].fileNm = $files[0].name;
	    		$files[0].fileSize = $files[0].size;
	    		vm.tempAttachFiles.push($files[0]);
	    	}
	    };


	    /**
	     * 파일 삭제
	     */
	    function fileDel(fileInfo, cmd){
	    	if(cmd === 'attach'){
	    		var idx = vm.tempAttachFiles.indexOf(fileInfo);
	    		vm.tempAttachFiles.splice(idx,1);
	    	}
	    	if(cmd === 'thum'){
	    		vm.tempThumFiles = [];
	    		vm.thumFileId = null;
	    	}
		}


	    /**
	     * 파일 정보 set
	     */
	    function setFileData(){

	    	vm.selectedFiles = [];
	    	vm.tempFileList = [];


			// 썸네일
			angular.forEach(vm.tempThumFiles, function(obj){
				if(obj instanceof File){
					vm.selectedFiles.push(obj);
				}else{
					if(obj.fileId){
						vm.tempFileList.push({fileId : obj.fileId});
					}
				}
			});

			// 첨부파일
			angular.forEach(vm.tempAttachFiles, function(obj){
				if(obj instanceof File){
					vm.selectedFiles.push(obj);
				}else{
					if(obj.fileId){
						vm.tempFileList.push({fileId : obj.fileId});
					}
				}
			});

	    };


	    /**
		 * 필수 입력 항목 체크
		 */
		function validForm(){

			// 제조사 체크
			if(!vm.deviceDetail.makrNm){
				messageBox.open("제조사를 입력하세요.", {
					type :"info",
					title : "자재 관리"
				});
				return false;
			}

			// 디바이스 모델 타입
			if(!vm.deviceDetail.devModelTypeNm){
				messageBox.open("디바이스 모델 타입을 입력하세요.", {
					type :"info",
					title : "자재 관리"
				});
				return false;
			}

			// 디바이스 명 체크
			if(!vm.deviceDetail.devNm){
				messageBox.open("디바이스명을 입력하세요.", {
					type :"info",
					title : "자재 관리"
				});
				return false;
			}

			// 상세 설명
			if(!vm.deviceDetail.dtlSbst){
				messageBox.open("상세 설명을 입력하세요.", {
					type :"info",
					title : "자재 관리"
				});
				return false;
			}

			// 썸네일 이미지
			if(vm.tempThumFiles.length === 0){
				messageBox.open("썸네일 이미지를 등록하세요.", {
					type :"info",
					title : "자재 관리"
				});
				return false;
			}

			return true;
		};

	}

