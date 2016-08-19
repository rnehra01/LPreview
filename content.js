var urlList;
var _timer1,_timer2,_timer3;
var myWin;
var button;
var url1;
var isButtonVisible=0,isWinVisible=0;
var mouseX=0,mouseY=0;

button=document.createElement("BUTTON");
button.addEventListener("mouseover",function(){
	clearTimeout(_timer3);
	mouseX = window.event.screenX;
    mouseY = window.event.screenY;
	var width = 600;
    var height = width / 1.6;
	_timer2=setTimeout(function(){
		myWin=window.open(url1, "_blank", 'resizable=yes, scrollbars=yes, titlebar=0, addressbar=0, menubar=0, toolbar=0,top=' + mouseY + ',screenY=' + mouseY + ',left=' + mouseX + ',screenX=' + mouseX + ',width=' + width + ',height=' + height);
        if (myWin.opener == null) myWin.opener = self;
        isWinVisible=1;
	},2000);
});

button.addEventListener("mouseout",function(){
	clearTimeout(_timer2);
	if (isWinVisible===1){myWin.close();}console.log("inside mouseout",isButtonVisible);
	if (isButtonVisible===1){
		button.parentNode.removeChild(button);
		isButtonVisible=0;console.log(isButtonVisible);
	}
	clearTimeout(_timer3);
});

urlList = document.getElementsByTagName("A");
for (var i=0; i<urlList.length; i++){
    urlList[i].onmouseover=showButton;
    urlList[i].onmouseout=removeButton;
}

function showButton() {
	clearTimeout(_timer2);
	clearTimeout(_timer3);
	if (isButtonVisible===1){
		button.parentNode.removeChild(button);
		isButtonVisible=0;console.log(isButtonVisible);
	}

    var url2=this.href;
    var rect = this.getBoundingClientRect();

    var pos=getOffset(this);
    _timer1=setTimeout(function(){
   	    button.setAttribute("style","position:absolute;height:40px;width:50px;z-index:2000;top:"+pos.top+"px;left:"+pos.left+"px");
    	document.body.appendChild(button);
    	isButtonVisible=1;console.log(isButtonVisible);
    	url1=url2;	
    },1000);

}

function removeButton(){
    
    if (isButtonVisible===1){
    	_timer3=setTimeout(function(){
    	button.parentNode.removeChild(button);
    	isButtonVisible=0;console.log(isButtonVisible);
    	},5000);
    }
    else {
    	clearTimeout(_timer1);
    }
}

function getOffset(el) {
  el = el.getBoundingClientRect();
  return {
    left: el.left + window.scrollX+el.width,
    top: el.top + window.scrollY+el.height
  }
}



