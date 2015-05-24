/**
 * 디바이스 목록 조회
 */
angular
    .module('app.device')
    .controller('DeviceListController', DeviceListController);

	function DeviceListController(deviceDataService, $state, messageBox) {

		var vm = this;

		// 디바이스 목록
		vm.deviceList = {};

		// 검색 조건
		vm.searchInfo = {
	    	curPage : 1,
	    	pageSize : 5
	    };

		// 페이징 정보
		vm.pagingInfo = {};

		// 검색 유형
		vm.searchType = {};

		// 검색 유형 목록
		vm.searchTypeList = [
		    {dtlCd : '', dtlCdNm : '전체'},
		    {dtlCd : 'dev_nm', dtlCdNm : '디바이스명'},
		    {dtlCd : 'makr_nm', dtlCdNm : '제조사'},
		    {dtlCd : 'dev_model_type_nm', dtlCdNm : '모델타입'},
		    {dtlCd : 'dtl_sbst', dtlCdNm : '내용'}
		];


		// 페이징 변경
		vm.pageChanged = pageChanged;

		// 디바이스 목록 조회
		vm.getDeviceList = getDeviceList;

		// 검색 버튼
		vm.getSearchDeviceList = getSearchDeviceList;

		vm.imageFormatter = imageFormatter;

		vm.rowSelect = rowSelect;

		// 디바이스 목록 조회
		vm.getDeviceList();


	    /**
	     * 디바이스 목록 조회
	     */
	    function getDeviceList(){
	    	// data-service call
	    	deviceDataService.getDeviceList(vm.searchInfo)
	    	.success(function(data){
	    		vm.deviceList.rows = data.dataset;
	    		vm.deviceList.total = data.paging.total;
	    		vm.deviceList.page = data.paging.page;
	    	});
	    }


	    /**
	     * 페이징 변경
	     */
	    function pageChanged(page, rowNum) {
	    	vm.searchInfo.curPage = page;
	    	vm.searchInfo.pageSize = rowNum;
	    	vm.getDeviceList();
	    };


	    /**
	     * 검색 버튼 클릭
	     */
	    function getSearchDeviceList() {

	    	// 검색 유형만 선택 했을 경우
	    	if(!vm.searchInfo.searchTxt && vm.searchType.dtlCd){
	    		messageBox.open("검색어를 입력하세요.", {
					type :"info",
					title : "자재 관리"
				});
	    		return false;
	    	}

	    	// 검색어는 존재 , 검색 유형은 존재하지 않을 경우
	    	if(vm.searchInfo.searchTxt && !vm.searchType.dtlCd){
	    		messageBox.open("검색 유형을 선택하세요.", {
					type :"info",
					title : "자재 관리"
				});
	    		return false;
	    	}

	    	vm.searchInfo.searchType = vm.searchType.dtlCd;

	    	// 디바이스 목록 조회
	    	vm.getDeviceList();
	    }


	    function imageFormatter(cellvalue, options, rowObject){
			if(cellvalue){
				return "<img src="+cellvalue+" style='width:80px;height:50px'  class='img-responsive'/>";
			}else{
				return "<img src='' style='width:80px;height:50px'  class='img-responsive'/>";
			}
		}


	    function rowSelect(data){
	    	$state.go('device.deviceMgt.deviceDetail', { devMtrlSeq: data.devMtrlSeq });
	    }
	}

