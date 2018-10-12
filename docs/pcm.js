var csvFile = "pch_season4_OctCh.csv";

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
	/* Table */
	var $table = $('<table>');
	var $thead = $('<thead>');
	var $tr = $('<tr>');
	$tr.append('<td>Check</td>');
	$tr.append('<td>PCH-ID</td>');
	$tr.append('<td>コーデグループ</td>');
	$tr.append('<td>名前</td>');
	$tr.append('<td>Image</td>');
	$thead.append($tr);
	$table.append($thead);
	var $tbody = $('<tbody>');

	Papa.parse(csvFile, {
		encoding: 'UTF-8',
		download: true,
		header: true,
		complete: function(results){
			console.log(results);
			var data = results['data'];
			var nogroupIdx = 0;
			$.each(data, function(idx,val){
				console.log(idx);
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
				var $trBody = $('<tr>',
					{id: pchId,
					 "class": groupId
					});
				$trBody.append($('<td>').append('<input'+cbAttr+'></input>'));
				$trBody.append($('<td>').html(pchId));
				$trBody.append($('<td>').html(val['groupId']));
				$trBody.append($('<td>').html(val['name']));
				$tbody.append($trBody);
			});
			$table.append($tbody);
			$('#main').html($table);
		}
	});
});
}

function setLsData(obj){
jQuery(function($){
	var pchId = $(obj).closest('tr').attr('id');
	localStorage.setItem(pchId, 1);
	console.log(pchId);
});
}
