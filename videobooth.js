var videos={video1:"video/demovideo1",video2:"video/demovideo2"};
var effectFunction=null;
window.onload=function(){
    var video=document.getElementById("video");
    video.src=videos.video1+getFormatExtension();
    video.load();

    var controlLinks=document.querySelectorAll("a.control");
    for(var i=0;i<controlLinks.length;i++){
        controlLinks[i].onclick=handleControl;
    }

    var effectLinks=document.querySelectorAll("a.effect");
    for(var i=0;i<effectLinks.length;i++){
        effectLinks[i].onclick=setEffect;
    }

    var videoLinks=document.querySelectorAll("a.videoSelection");
    for(var i=0;i<videoLinks.length;i++){
        videoLinks[i].onclick=setVideo;
    }

    pushUnpushButtons("video1",[]);
    pushUnpushButtons("normal",[]);
    effectFunction=normal;
    video.addEventListener("ended",endedHandler,false);
    video.addEventListener("play",processFrame,false);
};
function handleControl(e)
{
    var id=e.target.getAttribute("id");
    var video=document.getElementById("video");

    if(id=="play"){
        pushUnpushButtons(id,["pause"]);
        if(video.ended){
            video.load();
        }
        video.play();
    }
    else if(id=="pause"){
        pushUnpushButtons(id,["play"]);
        video.pause();
    }
    else if(id=="loop"){
        if(isButtonPushed(id)){
            pushUnpushButtons("",[id]);
        }
        else{
            pushUnpushButtons(id,[]);
        }
        video.loop=!video.loop;
    }
    else if(id=="mute"){
        if(isButtonPushed(id)){
            pushUnpushButtons("",[id])
        }
        else{
            pushUnpushButtons(id,[]);
        }
        video.muted=!video.muted;
    }
}
function setEffect(e){
    var id=e.target.getAttribute("id");

    if(id=="normal"){
        pushUnpushButtons(id,["western","noir","scifi"]);
        effectFunction=normal;
    }
    else if(id=="western"){
        pushUnpushButtons(id,["normal","noir","scifi"]);
        effectFunction=western;
    }
    else if(id=="noir"){
        pushUnpushButtons(id,["normal","western","scifi"]);
        effectFunction=noir;
    }
    else if(id=="scifi"){
        pushUnpushButtons(id,["normal","western","noir"]);
        effectFunction=scifi;
    }
}
function setVideo(e){
    var id=e.target.getAttribute("id");
    var video=document.getElementById("video");

    if(id=="video1"){
        pushUnpushButtons(id,["video2"]);
    }
    else if(id=="video2"){
        pushUnpushButtons(id,["video1"]);
    }
    video.src=videos[id]+getFormatExtension();
    video.load();
    video.play();
    pushUnpushButtons("play",["pause"]);
}
function pushUnpushButtons(idToPush,arrayToUnpush){
    if(idToPush!=""){
        var anchor=document.getElementById(idToPush);
        var theClass=anchor.getAttribute("class");
        if(!(theClass.indexOf("selected")>=0)){
            theClass=theClass+" selected";
            anchor.setAttribute("class",theClass);
            var newImage="url(images/"+idToPush+"pressed.png)";
            anchor.style.backgroundImage=newImage;
        }
    }
    
    for(var i=0;i<arrayToUnpush.length;i++){
        anchor=document.getElementById(arrayToUnpush[i]);
        theClass=anchor.getAttribute("class");
        if(theClass.indexOf("selected")>=0){
            theClass=theClass.replace("selected","");
            anchor.setAttribute("class",theClass);
            anchor.style.backgroundImage="";
        }
    }
}
function isButtonPushed(id){
    var anchor=document.getElementById(id);
    var theClass=anchor.getAttribute("class");
    return (theClass.indexOf("selected")>=0);
}
function getFormatExtension(){
    var video=document.getElementById("video");
    if(video.canPlayType("video/mp4")!=""){
        return ".mp4";
    }
    else if(video.canPlayType("video/ogg")!=""){
        return ".ogv";
    }
    else if(video.canPlayType("video/webm")!=""){
        return ".webm";
    }
}
function endedHandler(){
    pushUnpushButtons("",["play"]);
}

function processFrame(){
    // var video=document.getElementById("video");

    // if(video.ended || video.pause ){
    //     return;
    // }

    // var bufferCanvas=document.getElementById("buffer");
    // var displayCanvas=document.getElementById("display");
    // var buffer=bufferCanvas.getContext("2d");
    // var display=displayCanvas.getContext("2d");

    // buffer.drawImage(video,0,0,bufferCanvas.width,bufferCanvas.height);
    // var frame=buffer.getImageData(0,0,bufferCanvas.width,bufferCanvas.height);

    // var length=frame.data.length;
    // for(var i=0;i<length;i++){
    //     var r=frame.data[i*4+0];
    //     var g=frame.data[i*4+1];
    //     var b=frame.data[i*4+2];
    //     if(effectFunction){
    //         effectFunction(i,r,g,b,frame.data);
    //     }
    // }
    // display.putImageData(frame,0,0);
    
    // setTimeout(processFrame,0);
    // requestAnimationFrame(processFrame);
    effectFunction();
    setTimeout(processFrame,0);
}

function noir(pos,r,g,b,data){// these commented effects do not work for some unknown reason.
    var video=document.getElementById("video");
    video.style.filter="grayscale(100%)";
    // var brightness=(3*r+4*g+b)>>>3;
    // if(brightness<0) brightness=0;
    // data[pos*4+0]=brightness;
    // data[pos*4+1]=brightness;
    // data[pos*4+2]=brightness;
}
function normal(){
    var video=document.getElementById("video");
    video.style.filter="none";
}
function western() {
    var video=document.getElementById("video");
    video.style.filter="sepia(100%)";
    // var brightness = (3*r + 4*g + b) >>> 3;
    // data[pos * 4 + 0] = brightness+40;
    // data[pos * 4 + 1] = brightness+20;
    // data[pos * 4 + 2] = brightness-20;
}
function scifi(){
    var video=document.getElementById("video");
    video.style.filter="invert(100%)";
}