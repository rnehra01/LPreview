var urlList;
var _timer1;												//Clock for showing button
var _timer2;												//Clock for opening preview
var _timer3;												//Clock to retain button after removal of mouse from link
var myWin;
var button;
var url1;
var isButtonVisible=0,isWinVisible=0;
var mouseX=0,mouseY=0;
button=document.createElement("BUTTON");


urlList = document.getElementsByTagName("A");				//Get all the urls in the page
for (var i=0; i<urlList.length; i++){
    urlList[i].onmouseover=showButton;
    urlList[i].onmouseout=removeButton;
    urlList[i].onclick=removeButton1;
}

function showButton() {										//Show button on hovering on a link
	console.log("Enters showButton");
	clearTimeout(_timer2);
	clearTimeout(_timer3);

	var url2=this.href;
	if (isButtonVisible===1 && url1!=url2){					//If button is already visible and mouse hovers on other link
		button.parentNode.removeChild(button);				//then remove the visible button first
		isButtonVisible=0;
		console.log(isButtonVisible);
	}

    var pos=getButtonPos(this);
    _timer1=setTimeout(function(){
   	    button.setAttribute("style","position:absolute;height:40px;width:50px;z-index:2000;top:"+pos.top+"px;left:"+pos.left+"px");
    	document.body.appendChild(button);
    	isButtonVisible=1;
    	console.log(isButtonVisible);
    	url1=url2;	
    },500);

}

function removeButton(){									//If mouse moves out of the link, remove the button after 5 sec
    
    if (isButtonVisible===1){								//If mouse moves out but button is still visible
    	_timer3=setTimeout(function(){						//then, retain the button for 5 sec
    	button.parentNode.removeChild(button);
    	isButtonVisible=0;
    	console.log(isButtonVisible);
    	},5000);
    }
    else {
    	clearTimeout(_timer1);
    }
}

function removeButton1(){									//If the link is clicked and button is visible,
	if (isButtonVisible===1){								//then remove the button
		button.parentNode.removeChild(button);
    	isButtonVisible=0;
    	console.log(isButtonVisible);
    	location.reload();
	}
}

button.addEventListener("mouseover",function(){				//OPEN the window on mouse hover on button for 1 sec 
	clearTimeout(_timer3);
	mouseX = window.event.screenX;
    mouseY = window.event.screenY;
	var width = 600;
    var height = width / 1.6;
	_timer2=setTimeout(function(){
		myWin=window.open(url1, "_blank", 'resizable=yes, scrollbars=yes, titlebar=0, addressbar=0, menubar=0, toolbar=0,top=' + mouseY + ',screenY=' + mouseY + ',left=' + mouseX + ',screenX=' + mouseX + ',width=' + width + ',height=' + height);
        if (myWin.opener == null) myWin.opener = self;
        isWinVisible=1;
	},1000);
});

button.addEventListener("mouseout",function(){				//CLOSE the window on mouse out
	clearTimeout(_timer2);
	if (isWinVisible===1){myWin.close();}
	if (isButtonVisible===1){
		button.parentNode.removeChild(button);
		isButtonVisible=0;console.log(isButtonVisible);
	}
	clearTimeout(_timer3);
});

function getButtonPos(el) {						//Used to get position where button is to be put on the page
  el = el.getBoundingClientRect();
  return {
    left: el.left + window.scrollX+el.width,
    top: el.top + window.scrollY+el.height
  }
}

