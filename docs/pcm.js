var csvFile = "pch_season4_OctCh.csv";

function Init(){
	console.log("Init");
	Papa.parse(csvFile, {
		encoding: 'UTF-8',
		download: true,
		complete: function(results){
			console.log(results);
		}
	});
}
