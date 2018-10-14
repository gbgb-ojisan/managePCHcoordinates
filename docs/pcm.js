var csvFile = "pch_season4_OctCh.csv";
var Nrow = 2;

function Init(){
jQuery(function($){
	console.log("Init");
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

	Papa.parse(csvFile, {
		encoding: 'UTF-8',
		download: true,
		header: true,
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
				if(isExistData === 1){
					var isChecked = localStorage.getItem(pchId);
					if(isChecked){
						/* Checked coordinate*/
						cbAttr = ' type="checkbox" checked onChange="setLsData(this)"';
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
					 "class": groupId
					});
				/* img */
				var imgUrl = val['imgUrl'];
				$li.append($('<img>', {
					src: imgUrl,
					width: 128,
					height: 128
					})
				);
				$li.append($('<br>'));
				$li.append($('<span>').append('<input'+cbAttr+'></input>'));
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
	$('#main').append($ul);
});
/* End of jQuery.*/
}

function setLsData(obj){
jQuery(function($){
	var pchId = $(obj).closest('tr').attr('id');
	localStorage.setItem(pchId, 1);
	console.log(pchId);
});
}
