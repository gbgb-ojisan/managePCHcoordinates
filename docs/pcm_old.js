/* Global variations */
var csvFile = "pch_season4_OctCh.csv";
var csvFile2 = "pch_season4_NovCh.csv";
var csvFile3 = "pch_season4_Selection.csv";
var csvFile4 = "pch_season5_DecCh.csv";
var Nrow = 2; /* 列数*/

function Init(csvFileName){
jQuery(function($){
	if(!csvFileName){
					csvFileName = csvFile4;
	}
	/* Check localstorage already exists */
	if(!localStorage.getItem('existData')){
		/* First access*/
		localStorage.setItem('existData', 1);
	}else{
		var isExistData = 1;
	}
	/* Make a list */
	var $ul = $('<ul>', {
		id: 'coordinate-list'
	});

	Papa.parse(csvFileName, {
		encoding: 'UTF-8',
		download: true,
		header: true,
		skipEmptyLines: true,
		complete: function(results){
			console.log(results);
			var data = results['data'];
			var nogroupIdx = 0;
			/* Process for each coordinate. */
			$.each(data, function(idx,val){
				/* Set pchId */
				var pchId = val['pchId'];
				/* Read local data */
				var cbAttr = ' type="checkbox" onChange="setLsData(this)"';
				var className = 'yet';
				if(isExistData === 1){
					var isChecked = localStorage.getItem(pchId);
					if(isChecked){
						/* Checked coordinate*/
						cbAttr = ' type="checkbox" checked onChange="setLsData(this)"';
						className = 'already';
					}
				}
				/* Set groupID */
				var groupId = val['groupId'];
				if(!groupId){
					groupId = ""+nogroupIdx;
					nogroupIdx += 1;
				}
				/* Make a li*/
				var $li = $('<li>',
					{id: pchId,
					"class": className,
					"data-groupId": groupId
					});
				/* img */
				var imgUrl = val['imgUrl'];
				$li.append($('<img>', {
					src: imgUrl,
					width: 256,
					height: 256
					})
				);
				$li.append($('<br>'));
				$li.append($('<span>').append('<input'+cbAttr+'></input>'));
				$li.append($('<br>'));
				$li.append($('<span>',{'class':'s-size'}).html(val['rarity']));
				$li.append($('<br>'));
				$li.append($('<span>',{'class':'s-size'}).html(pchId));
				$li.append($('<br>'));
				$li.append($('<span>',{'class':'s-size'}).html(val['groupId']));
				$li.append($('<br>'));
				$li.append($('<span>').html(val['name']));
				/* End of making a li*/
				$ul.append($li);
			});
		}
	});
	/* End of PapaParse*/
	$('#main').html($ul);
});
/* End of jQuery.*/
}
/* End of Init()*/

function setLsData(obj){
jQuery(function($){
	var pchId = $(obj).closest('li').attr('id');
	if(!localStorage.getItem(pchId)){
		localStorage.setItem(pchId, 1);
		$(obj).closest('li').removeClass('yet');
		$(obj).closest('li').addClass('already');
	}else{
		localStorage.removeItem(pchId);
		$(obj).closest('li').removeClass('already');
		$(obj).closest('li').addClass('yet');
	}
	console.log(pchId);
});
}

/* Get the pch coordinate's data.*/
function getLsData(obj){
jQuery(function($){
	var pchId = $(obj).closest('li').attr('id');
	var isHaving = localStorage.getItem(pchId);
	if(!isHaving){
		return isHaving;
	}else{
		return 0;
	}
});
}

function changeDispMenu(){
jQuery(function($){
	var $menulist = $('#menulist');	
	/* Show or hide menu*/
	if($menulist.hasClass('hide')){
		$menulist.removeClass('hide');
		$menulist.addClass('show');
	}else if($menulist.hasClass('show')){
		$menulist.removeClass('show');
		$menulist.addClass('hide');
	}
});
}

function changeShowMode(mode){
jQuery(function($){
	if(mode === 'hide'){
		$('.already').css('display', 'none');
	}else if(mode === 'show'){
		$('.already').css('display', 'list-item');
	}
});
}

function selectChannel(obj){
jQuery(function($){
				console.log(obj);
				var $obj = $(obj);
				var selectedCsvVal = $obj.children('option:selected').val();
				console.log(selectedCsvVal);
				switch (selectedCsvVal){
					case '4-10':
						Init(csvFile);
						break;
					case '4-11':
						Init(csvFile2);
						break;
					case '4-12':
						Init(csvFile3);
						break;
					case '5-12':
						Init(csvFile4);
						break;
					default:
						alert('ERROR');
				}
});
}
