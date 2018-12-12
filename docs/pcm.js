/* Global variations */
var filelist = "./csv/csvlist.csv";
var Nrow = 2; /* 列数*/

function Init(){
jQuery(function($){
	/* CSVリストを取得し，最新弾を表示 */
	Papa.parse(filelist, {
		encoding: 'UTF-8',
		download: true,
		skipEmptyLines: true,
		complete: function(results){
			var csvNames = results.data; /* csvNames is N*3 size array. */
			makeUlFromCsv(csvNames[csvNames.length-1][0]);
			makeSeasonSelect(csvNames);
		}
	}
	);
	$(document).ready(function(){
  	$(window).scroll(function() {
    	if($(this).scrollTop() > 100) {
				// 100pxスクロールしていたら上に戻るボタンを表示
				$(".back-to-top").fadeIn(); 
      } else {
				$(".back-to-top").fadeOut();
      }
    });
		$(".back-to-top").click(function() {
			$("body,html").animate({scrollTop:0},800); // 800msかけて上に戻る
		});
	});
});
/* End of jQuery.*/
}
/* End of Init()*/

function makeUlFromCsv(csvFileName){
/* CSVを読み込み，リストを作成 */
jQuery(function($){
	/* Make a list */
	var $ul = $('<ul>', {
		id: 'coordinate-list'
	});

	/* Read CSV */
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
				var isChecked = localStorage.getItem(pchId);
				if(isChecked){
					/* Checked coordinate*/
					cbAttr = ' type="checkbox" checked onChange="setLsData(this)"';
					className = 'already';
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
}

function setLsData(obj){
/* Set the belonging status of the item. */
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

function getLsData(obj){
/* Get the pch coordinate's data.*/
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
/* Show the menu. */
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
	makeUlFromCsv(selectedCsvVal);
});
}

function makeSeasonSelect(csvArray){
jQuery(function($){
	var L = csvArray.length;
	console.log(L);
	var $select = $('<select>', {
		id: 'channelSelect',
		onChange: 'selectChannel(this)'
	});

	var $options = $.map(csvArray, function(elm, idx){
		var isSelected = (idx === L-1);
		if(elm[2] === 'finished'){
			var prefix = '（終了）';
		}else{
			var prefix = '';
		}
		$option = $('<option>', {
			value: elm[0],
			text: prefix + elm[1],
			selected: isSelected
		});
		return $option;
	});
	$select.append($options);


	$('#channelSelect-outer').append($select);
});
}
