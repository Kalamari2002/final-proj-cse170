const display = document.getElementById("display");
const tutorial = document.getElementById("tutorial");
const stop = document.getElementById("stopbutton");
const start = document.getElementById("start");
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isTiming = false;

function StartTimer(){
  if(isTiming)
    return;
  DisableElement(tutorial)
  //Before we start timing, record the time the moment we press the start button
  startTime = Date.now() - elapsedTime;
  
  //Will call Update every 10 miliseconds
  timer = setInterval(Update, 10);
  isTiming = true;
  start.replaceWith(stop);
  stop.disabled = false;
  stop.style.opacity = 1.0;
  /*start.disabled = true;
  start.style.visibility = "hidden";*/
}

function TutorialPage(){
  location.href='index.html';
}

function StopTimer(){
  if(!isTiming)
    return;
  clearInterval(timer);
  elapsedTime = Date.now() - startTime;
  isTiming = false;
}

function Update(){
  const currTime = Date.now();
  //elapsedTime is really just the difference of time between now and when we started timing
  elapsedTime = currTime - startTime;
  
  //elapsedTime is in Unix time, so we have to convert it to human readable time
  let minutes = Math.floor((elapsedTime/(1000*60)) % 60);
  let seconds = Math.floor((elapsedTime/(1000)) % 60);
  
  seconds = String(seconds).padStart(2,"0");
  display.textContent = `${minutes}:${seconds}`;
}

function DisableElement(element){
  element.disabled = true;
  element.style.visibility = "hidden";
}

function EnableElement(element){
  element.disabled = false;
  element.style.visibility = "initial";
}

function GetResult(){
  location.href='resultpage.html';
}