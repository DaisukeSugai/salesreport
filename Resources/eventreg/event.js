Titanium.include('../common/constant.js');
Titanium.include('../common/dateutil.js');
Titanium.include('../gps.js');

var backList = function() {
	var win = Titanium.UI.createWindow({url:LIST_FILE});
	Titanium.UI.currentTab.open(win, {animated:true});
}

var insertTrans = function() {
	var selectData = [];
	selectData = Titanium.App.Properties.getList(KEY_CODE_SELECTUSER);
	
	var paramater = '&eventname=' + selectData[0];
	var paramater1 = '';
	var category = lblCategory.text;
	if (category == '' || category == Titanium.Locale.getString("category_no")) {
		paramater1 = '&chatmessage=' + Titanium.App.Properties.getString(KEY_CODE_MEMO);
	} else {
		paramater1 = '&chatmessage=' + '[' + lblCategory.text + ']' + Titanium.App.Properties.getString(KEY_CODE_MEMO);
	}
	var paramater2 = '&subject=' + selectData[2];
	var paramater3 = '&username=' + Titanium.App.Properties.getString(KEY_CODE_USERNAME);
	var paramater4 = '&location=' + selectData[3];
	var paramater5 = '&owner=' + Titanium.App.Properties.getString(KEY_CODE_USERXID);
	
	var latitude = -1;
	var longitude = -1;
	Titanium.Geolocation.purpose = Titanium.Locale.getString("event_purpose");
	Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
	Titanium.Geolocation.getCurrentPosition(function(e) {
		latitude = e.coords.latitude;
		longitude = e.coords.longitude;
		var paramater6 = '&latitude=' + latitude;
		var paramater7 = '&longitude=' + longitude;
		
		var paramater8 = '&language=' + Titanium.App.Properties.getString(KEY_CODE_LANGUAGE);
		
		var url = REGISTER_URL + paramater + paramater1 + paramater2 + paramater3 + paramater4 + paramater5 + paramater6 + paramater7 + paramater8;
		//var url = REGISTER_URL + paramater + paramater1 + paramater2 + paramater3 + paramater4 + paramater5 + paramater8;
		Titanium.API.info(url);
		var client = Titanium.Network.createHTTPClient({timeout : 100000});
		
		client.open(GET_REC, url);
		client.onload = function() {
			try {
				var resData = eval("("+this.responseText+")");
				Titanium.API.info(resData);
				if (resData[0].error == 'Yes') {
					var dialog = Titanium.UI.createAlertDialog({});
					dialog.title =  Titanium.Locale.getString("event_yes_title");
					dialog.message = resData[0].contents;
					dialog.show();
					return;
				} else {
					GPSClient.send(TRACE_URL,latitude, longitude, ACTION_SALES_REG, Titanium.App.Properties.getString(KEY_CODE_USERNAME));
					if (resData[0].count == 0) {
						var dialog = Titanium.UI.createAlertDialog({});
						dialog.title =  Titanium.Locale.getString("event_yes_title");
						dialog.message = Titanium.Locale.getString("event_catch_message");
						dialog.show();
						return;
					}
					var win = Titanium.UI.createWindow({url:LIST_FILE});
					Titanium.UI.currentTab.open(win, {animated:true});
				}
			} catch (e) {
				Titanium.API.error(e);
				var dialog = Titanium.UI.createAlertDialog({});
				dialog.title =  Titanium.Locale.getString("event_catch_title");
				dialog.message = Titanium.Locale.getString("event_catch_message");
				dialog.show();
				return;
			}
		};
		client.onerror = function() {
			if (client.status == 401) {
				var dialog = Titanium.UI.createAlertDialog({});
				dialog.title =  Titanium.Locale.getString("event_connect_title");
				dialog.message = Titanium.Locale.getString("event_connect_message");
				dialog.show();
				return;
			}
			var dialog = Titanium.UI.createAlertDialog({});
			dialog.title =  Titanium.Locale.getString("event_network_title");
			dialog.message = Titanium.Locale.getString("event_network_message");
			dialog.show();
			return;
		};
		client.send();
		}
	)
}