function dateCheck(dtDate, dtTime) {

	var arr = dtDate.split('-');
	var year = arr[0];
	year = parseInt(year);
	var month = arr[1];
	month = parseInt(month);
	var day = arr[2];
	day = parseInt(day);

	var arrT = dtTime.split(':');
	var hour = arrT[0];
	hour = parseInt(hour);
	var minutes = arrT[1];
	minutes = parseInt(minutes);
	var seconds = arrT[2];
	seconds = parseInt(seconds);

	var dt = new Date(year, month - 1, day, hour, minutes, seconds);
	var cdt = new Date();
	
	var dif = dt.getTime() - cdt.getTime();
	
	var difM = dif / 3600000;
	var resutlM = Math.round(difM);
	
	return resutlM;
}

function checkBoolean(value) {
	if (value == false) {
		return 0;
	} else {
		return 1;
	}
}