function updateWindow(prev, next){
  $("#" + prev).hide();
  $("#" + next).show();
}
function updateTextInput(val) {
  document.getElementById('timevalue').innerHTML = val + " minutes";
}

function createCanvas() {
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    ctx.lineWidth=5;
    var img=document.getElementById("Beach1A");
    ctx.drawImage(img,100,100);
};

var canvas = document.getElementById("imgCanvas");
var context = canvas.getContext("2d");

function createImageOnCanvas(imageId) {
    canvas.style.display = "block";
    document.getElementById("images").style.overflowY = "hidden";
    var img = new Image(300, 300);
    img.src = document.getElementById(imageId).src;
    context.drawImage(img, (0), (0)); //onload....
}

function draw(e) {
    var pos = getMousePos(canvas, e);
    posx = pos.x;
    posy = pos.y;
    context.strokeStyle = "#00FF00";
    context.beginPath();
    context.arc(posx, posy, 20, 0, 2*Math.PI);
    context.stroke();
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}
window.draw = draw;

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