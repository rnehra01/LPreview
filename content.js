var urlList;
var _timer;
var myWin;
var mouseX=0,mouseY=0;


urlList = document.getElementsByTagName("A");
for (var i=0; i<urlList.length; i++){
    urlList[i].onmouseover=openPreview;
    urlList[i].onmouseout=closePreview;
}

function openPreview() {
    var url1=this.href;
    var rect = this.getBoundingClientRect();
    //console.log(rect.right,rect.bottom);
    var width = 600;
    var height = width / 1.6;
    //open window after waiting for 2 sec 
    mouseX = window.event.screenX;
    mouseY = window.event.screenY;
    _timer=setTimeout(function(){
        myWin=window.open(url1, "_blank", 'resizable=yes, scrollbars=yes, titlebar=0, addressbar=0, menubar=0, toolbar=0,top=' + mouseY + ',screenY=' + mouseY + ',left=' + mouseX + ',screenX=' + mouseX + ',width=' + width + ',height=' + height);
        if (myWin.opener == null) myWin.opener = self;
    },2000);
    
}

function closePreview(){
    myWin.close();
    clearTimeout(_timer);
}



