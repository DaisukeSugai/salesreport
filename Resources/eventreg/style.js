var styles = {
    lblTitle: {
    	textAlign:'center',
    	shadowColor:'#aaa',
    	shadowOffset:{x:5,y:5},
    	font:{fontSize: 30},
        height: 80,
        width:'auto',
        top: "vertical"
    },
    scrollview: {
        contentWidth:'auto',
        contentHeight:'auto',
        top:0,
        buttom:0,
        showVerticalScrollIndicator : true,
        showHorizonScrollIndicator:true
    },
    lblTaskName: {
        textAlign: 'left',
    	font:{fontSize: 16},
    	shadowColor:'#aaa',
    	shadowOffset:{x:0, y:0},
        height: 30,
        left: 40,
        top:80
    },
    lblPriority: {
        textAlign: 'left',
    	font:{fontSize: 16},
    	shadowColor:'#aaa',
    	shadowOffset:{x:0, y:0},
        height: 30,
        left: 40,
        top:120
    },
    lblVisitDate: {
        textAlign: 'left',
    	font:{fontSize: 16},
    	shadowColor:'#aaa',
    	shadowOffset:{x:0, y:0},
        height: 30,
        left: 40,
        top:160
    },
    lblMemo: {
        textAlign: 'left',
    	font:{fontSize: 16},
    	shadowColor:'#aaa',
    	shadowOffset:{x:0, y:0},
        height: 30,
        left: 40,
        top:200
    },
   	lblCategory: {
        textAlign: 'left',
    	shadowColor:'#aaa',
    	shadowOffset:{x:0, y:0},
    	font:{fontSize: 16},
        height: 40,
        left: 40,
        top:240
    },
   	btnCategory: {
        width: 200,
        height: 40,
        left: 40,
        top:280,
        color:'#000000'
    },
   	txtReport: {
        color:'#000000',
        top: 330,
        left: 40,
        width: 250,
        height: 60,
		font: {
			fontSize: 20,
			fontWeight: 'bold',
			fontFamily: 'Arial'
		},
        textAlign:'left',
        hintText:'補足情報を入力してください',
        borderWidth:2,
        borderColor:'#bbb',
        borderRadius:5		
    },
    btnReport: {
        width: 110,
        height: 50,
        left: 40,
        top: 400,
        color:'#000000',
        style: Titanium.UI.iPhone.SystemButtonStyle.BORDERED
    },
    btnBack: {
        width: 110,
        height: 50,
        left: 170,
        top: 400,
        color:'#000000',
        style: Titanium.UI.iPhone.SystemButtonStyle.BORDERED
    }
};