var csvFile = "pch_season4_OctCh.csv";

function Init(){
jQuery(function($){
	console.log("Init");
	Papa.parse(csvFile, {
		encoding: 'UTF-8',
		download: true,
		header: true,
		complete: function(results){
			$.each(results, function(idx,val){
				console.log(idx+val);
			});
		}
	});
});
}
