var csvFile = "pch_season4_OctCh.csv";

function Init(){
jQuery(function($){
	console.log("Init");
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
	var $checkbox = $('<button type="checkbox"></button>');
	var $tbody = $('<tbody>');

	Papa.parse(csvFile, {
		encoding: 'UTF-8',
		download: true,
		header: true,
		complete: function(results){
			$.each(results, function(idx,val){
				console.log(idx);
				console.log(val);
				var $trBody = $('<tr>');
				$trBody.append($checkbox);
				$trBody.append($('<td>').html(val['pchId']));
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
