Titanium.include('../common/constant.js');
Titanium.include('style.js');

var win = Titanium.UI.currentWindow;

var lblTitle = Titanium.UI.createLabel(styles["lblTitle"]);
lblTitle.text = Titanium.Locale.getString("list_title");
win.add(lblTitle);

var btnLatest = Titanium.UI.createButton(styles["btnLatest"]);
btnLatest.title = Titanium.Locale.getString("list_btnLatest");
win.add(btnLatest);
btnLatest.addEventListener(EVT_CLICK, function() {
	var win = Titanium.UI.createWindow({url:LIST_FILE});
	Titanium.UI.currentTab.open(win, {animated:true});		
});

var btnBack = Titanium.UI.createButton(styles["btnBack"]);
btnBack.title = Titanium.Locale.getString("list_btnBack");
win.add(btnBack);
btnBack.addEventListener(EVT_CLICK, function() {
	Titanium.App.Properties.setList(KEY_CODE_SELECTUSER, null);
	Titanium.App.Properties.setString(KEY_CODE_USERXID, null);
	Titanium.App.Properties.setString(KEY_CODE_USERNAME, null);
	var win = Titanium.UI.createWindow({url:LOGIN_FILE2});
	Titanium.UI.currentTab.open(win, {animated:true});		
});

var rowData = [];
var selectData = [];
var xids = [];
var descriptions = [];
var subjects = [];
var locations = [];
var start_day_gs = [];
var prioritycodes = [];

var client = Titanium.Network.createHTTPClient({timeout : 100000});
var url = LIST_URL + '&intaliouser=' + Titanium.App.Properties.getString(KEY_CODE_USERNAME);
//var url = LIST_URL + '&username=' + Titanium.App.Properties.getString(KEY_CODE_USERNAME);
Titanium.API.info(url);

client.open(GET_REC, url);
client.onload = function() {
	try {
		var resData = eval("("+this.responseText+")");
		Titanium.API.info(resData);
		if (resData[0].error == 'Yes') {
			var record = resData[0].count;
			if (record == 0) {
				return;				
			} else {
				var dialog = Titanium.UI.createAlertDialog({});
				dialog.title =  Titanium.Locale.getString("event_yes_title");
				dialog.message = resData[0].contents;
				dialog.show();
				return;
			}
		} else {
			var record = resData[0].count;
			if (record == 0) {
				return;				
			}
			for (var i = 0; i < resData[0].records.length; i++) {
				//permission issue
				if (resData[0].records[i].xid == null) {
				} else {
					xids[i] = resData[0].records[i].xid;
					descriptions[i] = resData[0].records[i].description;
					subjects[i] = resData[0].records[i].subject;
					locations[i] = resData[0].records[i].location;
					start_day_gs[i] = resData[0].records[i].start_date_com;
					prioritycodes[i] = resData[0].records[i].prioritycode;
					
					if (i == 0) {
						selectData[0] = resData[0].records[i].xid;
						selectData[1] = resData[0].records[i].description;
						selectData[2] = resData[0].records[i].subject;
						selectData[3] = resData[0].records[i].location;
						selectData[4] = resData[0].records[i].start_day_g;
						selectData[5] = resData[0].records[i].prioritycode;
						Titanium.App.Properties.setList(KEY_CODE_SELECTUSER, null);
						Titanium.App.Properties.setList(KEY_CODE_SELECTUSER, selectData);
					}
					row = Titanium.UI.createTableViewRow(styles["rows"]);
					rowTitle = Titanium.UI.createLabel(styles["rowTitle"]);
					rowTitle.text = Titanium.Locale.getString("list_rowtitle") + resData[0].records[i].subject;
					row.add(rowTitle);
					contentsTitle = Titanium.UI.createLabel(styles["contentsTitle"]);
					var priority = '';
					var prioritycode = resData[0].records[i].prioritycode;
					if (prioritycode == '1') {
						priority = Titanium.Locale.getString("priority_high") 
					} else if (prioritycode == '3') {
						priority = Titanium.Locale.getString("priority_low") 
					} else {
						priority = Titanium.Locale.getString("priority_middle") 
					}
					contentsTitle.text = Titanium.Locale.getString("list_rowcontentstitle") + resData[0].records[i].location + ' / ' + Titanium.Locale.getString("list_rowcontentstitle2") + priority;
					row.add(contentsTitle);
					footTitle = Titanium.UI.createLabel(styles["footTitle"]);
					var visitdate = resData[0].records[i].start_day_g;
					var splitdate = visitdate.split('-');
					footTitle.text = Titanium.Locale.getString("list_rowcontentstitle3") + splitdate[0] + Titanium.Locale.getString("date_year") + splitdate[1] 
					+ Titanium.Locale.getString("date_month") + splitdate[2] + Titanium.Locale.getString("date_day");
					row.add(footTitle);
					rowData.push(row);
					row = [];
				}
			}
		}
		
		tableview = Titanium.UI.createTableView(styles["tableRows"]);
		tableview.data = rowData;
		tableview.addEventListener(EVT_CHANGE, function(e){
			var index = e.index;
			Titanium.API.info(index);
			callNext(index);
		});
		
		tableview.addEventListener(EVT_SINGLETAP, function(e){
			var index = e.index;
			Titanium.API.info(index);
			callNext(index);
		});
		
		function callNext(index) {
			selectData = [];
			selectData.push(xids[index]);
			selectData.push(descriptions[index]);
			selectData.push(subjects[index]);
			selectData.push(locations[index]);
			selectData.push(start_day_gs[index]);
			selectData.push(prioritycodes[index]);
			Titanium.App.Properties.setList(KEY_CODE_SELECTUSER, selectData);
			Titanium.API.info(xids[index]);
			
			var win1 = Titanium.UI.createWindow({url:REGISTR_FILE});
			Titanium.UI.currentTab.open(win1, {animated:true});		
		}
		
		win.add(tableview);		
		win.open();
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