var GPSClient = {};

GPSClient.send = function(exeurl, latitude,longitude,actionname,username) {
	var client = Titanium.Network.createHTTPClient({timeout : 100000});
	var paramater = '&intaliouser=' + username + '&parameter=latitude:' + longitude + ',';
	//var paramater = '&username=' + username + '&parameter=latitude:' + longitude + ',';
	var paramater1 = 'longitude:' + latitude + ',';
	var paramater2 = 'timestamp:timestamp,';
	var paramater3 = 'actionname:' + actionname + ',';
	var paramater4 = 'name:' + username + ',';
	var url = exeurl + paramater + paramater1 + paramater2 + paramater3 + paramater4;

	client.open(GET_REC, url);
	client.onload = function() {
		try {
			var resData = eval("("+this.responseText+")");
			if (resData[0].error == 'Yes') {
				var dialog = Titanium.UI.createAlertDialog({});
				dialog.title =  Titanium.Locale.getString("gps_yes_title");
				dialog.message = resData[0].contents;
				dialog.show();
				return;
			} else {
				return;
			}
		} catch (e) {
			Titanium.API.error(e);
			var dialog = Titanium.UI.createAlertDialog({});
			dialog.title =  Titanium.Locale.getString("gps_catch_title");
			dialog.message = Titanium.Locale.getString("gps_catch_message");
			dialog.show();
			return;
		}
	};
	client.onerror = function() {
		if (client.status == 401) {
			var dialog = Titanium.UI.createAlertDialog({});
			dialog.title =  Titanium.Locale.getString("gps_connect_title");
			dialog.message = Titanium.Locale.getString("gps_connect_message");
			dialog.show();
			return;
		}
		var dialog = Titanium.UI.createAlertDialog({});
		dialog.title =  Titanium.Locale.getString("gps_network_title");
		dialog.message = Titanium.Locale.getString("gps_network_message");
		dialog.show();
		return;
	};
	client.send();
};