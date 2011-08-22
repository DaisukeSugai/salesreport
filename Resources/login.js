Titanium.include('/common/constant.js');
Titanium.include('style.js');
Titanium.include('event.js');

var win = Titanium.UI.currentWindow;

var lblTitle = Titanium.UI.createLabel(styles["lblTitle"]);
lblTitle.text = Titanium.Locale.getString("login_title");
win.add(lblTitle);

var lblLoginTitle = Titanium.UI.createLabel(styles["lblLoginTitle"]);
lblLoginTitle.text = Titanium.Locale.getString("login_titlesub");
win.add(lblLoginTitle);

var txtLogin = Titanium.UI.createTextField(styles["txtLogin"]);
win.add(txtLogin);

var btnLogin = Titanium.UI.createButton(styles["btnLogin"]);
btnLogin.title = Titanium.Locale.getString("login_btnlogin");
btnLogin.addEventListener(EVT_CLICK,executeTrans);
win.add(btnLogin);

var btnReset = Titanium.UI.createButton(styles["btnReset"]);
btnReset.title = Titanium.Locale.getString("login_btnReset");
btnReset.addEventListener(EVT_CLICK,clearText);
win.add(btnReset);

win.open();