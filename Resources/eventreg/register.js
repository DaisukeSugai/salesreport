Titanium.include('../common/constant.js');
Titanium.include('style.js');
Titanium.include('event.js');
 
var win = Titanium.UI.currentWindow;

var scrollview = Titanium.UI.createScrollView();

var selectData = [];
selectData = Titanium.App.Properties.getList(KEY_CODE_SELECTUSER);

var lblTitle = Titanium.UI.createLabel(styles["lblTitle"]);
lblTitle.text = Titanium.Locale.getString("register_title");
win.add(lblTitle);

var lblTaskName = Titanium.UI.createLabel(styles["lblTaskName"]);
lblTaskName.text =  Titanium.Locale.getString("register_taskname") + selectData[2];
win.add(lblTaskName);

var lblPriority = Titanium.UI.createLabel(styles["lblPriority"]);
var prioritycode = selectData[5];
if (prioritycode == '1') {
	lblPriority.text = Titanium.Locale.getString("register_priority") + Titanium.Locale.getString("priority_high") 
} else if (prioritycode == '3') {
	lblPriority.text = Titanium.Locale.getString("register_priority") + Titanium.Locale.getString("priority_low") 
} else {
	lblPriority.text = Titanium.Locale.getString("register_priority") + Titanium.Locale.getString("priority_middle") 
}
win.add(lblPriority);

var lblVisitDate = Titanium.UI.createLabel(styles["lblVisitDate"]);
var visitdate = selectData[4];
var visitdate1 = visitdate.split('T');
var splitdate = visitdate1[0].split('-');
lblVisitDate.text = Titanium.Locale.getString("register_visitdate") + splitdate[0] + Titanium.Locale.getString("date_year") + splitdate[1] 
+ Titanium.Locale.getString("date_month") + splitdate[2] + Titanium.Locale.getString("date_day");
win.add(lblVisitDate);

var lblMemo = Titanium.UI.createLabel(styles["lblMemo"]);
lblMemo.text =  Titanium.Locale.getString("register_memo") + selectData[1];
win.add(lblMemo);

var lblCategory = Titanium.UI.createLabel(styles["lblCategory"]);
lblCategory.text = '';
win.add(lblCategory);

var dialog = Titanium.UI.createOptionDialog();
dialog.setTitle(Titanium.Locale.getString("register_dialog_title"));

var arrCategory = [];
arrCategory[0] = Titanium.Locale.getString("category_no");
arrCategory[1] = Titanium.Locale.getString("category_daily");
arrCategory[2] = Titanium.Locale.getString("category_emergy");
arrCategory[3] = Titanium.Locale.getString("category_estimate");

dialog.setOptions(arrCategory);
//dialog.setOptions([Titanium.Locale.getString("register_dialog_category")]);
dialog.setCancel(0);
dialog.addEventListener(EVT_CLICK,function(e) {
    if (e.index == 0) {
    	lblCategory.text = Titanium.Locale.getString("category_no");
    } else if(e.index == 1) {
    	lblCategory.text = Titanium.Locale.getString("category_daily");
    } else if(e.index == 2) {
    	lblCategory.text = Titanium.Locale.getString("category_emergy");
    } else if(e.index == 3) {
    	lblCategory.text = Titanium.Locale.getString("category_estimate");
    } else {
    	lblCategory.text = '';
    }
});

var btnCategory = Ti.UI.createButton(styles["btnCategory"]);
btnCategory.title = Titanium.Locale.getString("register_dialog_select");
btnCategory.addEventListener(EVT_CLICK,function() {
	dialog.show();
});
win.add(btnCategory);

var txtReport = Titanium.UI.createTextArea(styles["txtReport"]);
win.add(txtReport);
txtReport.addEventListener(EVT_BLUR,function(e){
	Titanium.App.Properties.setList(KEY_CODE_MEMO, e.value);
});

var btnReport = Titanium.UI.createButton(styles["btnReport"]);
btnReport.title = Titanium.Locale.getString("register_btnReport");
btnReport.addEventListener(EVT_CLICK,insertTrans);
win.add(btnReport);

var btnBack = Titanium.UI.createButton(styles["btnBack"]);
btnBack.title = Titanium.Locale.getString("register_btnBack");
btnBack.addEventListener(EVT_CLICK,backList);
win.add(btnBack);

win.open();