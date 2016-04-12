function updateWindow(prev, next){
  $("#" + prev).hide();
  $("#" + next).show();
}
function updateTextInput(val) {
  document.getElementById('timevalue').innerHTML = val + " minutes";
}

var foundDiff, numDiff, circleRadius;

function canv() {
  document.getElementById("imgCanvas").width = document.getElementById("imgCanvas").offsetWidth;
  document.getElementById("imgCanvas").height = document.getElementById("imgCanvas").offsetHeight;
  numDiff = 0;
  foundDiff = [];
  circleRadius = document.getElementById("imgCanvas").height / 20;
}

function handleEvent(e) {
  var canvas = document.getElementById("imgCanvas");
  var context = canvas.getContext("2d");
  var pos = getMousePos(canvas, e);
  
  var i;
  for(i=1; i<=numDiff; i++)
    if(dist(foundDiff[i], pos) <= circleRadius){
      removeDifference(i, context);
      draw(context, canvas);
      return;
    }

  if(numDiff == 12){
    alert("You have already spotted 12 differences!");
    return;
  }
  
  addDifference(pos);
  draw(context, canvas);
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

function addDifference(pos) {
  numDiff++;
  foundDiff[numDiff] = pos;
}

function removeDifference(index, context){
  var p = foundDiff[index];
  var i;
  for(i=index; i<numDiff; i++)
    foundDiff[i] = foundDiff [i+1];
  numDiff--;
}

function dist(a, b){
  return Math.sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y));
}

function draw(context, canvas){
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = "#00FF00";
  for(i=1; i<=numDiff; i++){
    context.beginPath();
    context.arc(foundDiff[i].x, foundDiff[i].y, circleRadius, 0, 2*Math.PI);
    context.stroke();
  }
  
}


function addToDo(subjectCode,age,gender,record,time) {
  var todo = {
    _id: new Date().toISOString(),
    subjectNumber: subjectCode,
    age: age,
    gender:gender,
    recording:record,
    time:time,
    //completed: false
  };
  db.put(todo, function callback(err, result) {
    if (!err) {
      console.log('Successfully created a new Experiment!');
    }
  });
}


// Timer

var time;
var seconds, minutes;

function startTimer(){
    if(document.getElementById('showTimer').checked)
        $("#timerDiv").show();
    else
        $("#timerDiv").hide();

  minutes = parseInt(document.getElementById('timevalue').innerHTML);
  seconds = 0;

  document.getElementById('timer').innerHTML = "";
  if(minutes < 10)
    document.getElementById('timer').innerHTML += "0";
  document.getElementById('timer').innerHTML += minutes.toString() + ":00";

  time = setInterval(updateTimer, 1000);
}

function pauseTimer(){
    clearInterval(time);
}

function resumeTimer() {
    clearInterval(time);
    time = setInterval(updateTimer, 1000);
}

function updateTimer(){
    if(document.getElementById('timer').innerHTML === "00:00"){
        clearInterval(time);
        alert("Time is up!");
        return;
    }

    seconds--;
    if(seconds<0){
        minutes--;
        seconds+=60;
    }
    document.getElementById('timer').innerHTML = ""

    if(minutes < 10)
        document.getElementById('timer').innerHTML += "0";
    document.getElementById('timer').innerHTML += minutes.toString() + ":";
    if(seconds < 10)
        document.getElementById('timer').innerHTML += "0"
    document.getElementById('timer').innerHTML += seconds.toString();
}
