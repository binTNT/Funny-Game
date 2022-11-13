let x = 0;
let score = 0;
let time = 0;
let setTM1 = 0;
let Min_ = -20;
let Max_ = 20;
let canvas = document.getElementById("out");
let ctx = canvas.getContext("2d");
ctx.font = "45px Comic Sans MS";
ctx.textAlign = "center";
let hightScore = 0;
let songs = document.getElementById("effectSound");
let pause_ = 10;
let err = 0;
let ColorA = 255;
let ColorB = 0;
resetTime();
new1();
Time();

// đặt thời gian kết thúc
function resetTime() {
  time = 10;
}
function restMinMax() {
  Min_ = -20;
  Max_ = 20;
}

//hàm đếm ngược
function Time() {
  timeOut();
  var setTM = setInterval(timeOut, 1000);
  setTM1 = setTM;
  function timeOut() {
    if (time > -1) {
      document.getElementById("time").innerHTML = "  " + time;
      time--;
    }
    if (time == 0) {
      document.getElementById("BtnPause").style.display = "none";
    }
    if (time == -1) {
      resetTime();
      gameOver();
    }
  }
}

//hàm tạo phép toán mới
function new1() {
  var a = rand(Min_, Max_);
  var b = rand(Min_, Max_);
  var Color = "rgb(" + ColorB + " ," + ColorA + ",0)";
  let result = 0;
  var Case = rand(1, 4);
  ColorA -= 5;
  ColorB += 5;
  //tạo kết quả fake
  function resetRe() {
    var result_fake = rand(Min_ - 20, Max_ + 20);
    return result_fake;
  }
  //kiểm tra âm dương
  function check_abs(a) {
    var x = "";
    if (a < 0) x = "(" + a + ")";
    else x = a;
    return x;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  switch (Case) {
    case 1:
      var bth_ = check_abs(a) + " + " + check_abs(b);
      ctx.fillText(bth_, canvas.width / 2, canvas.height / 2 + 11);
      result = a + b;
      break;
    case 2:
      var bth_ = check_abs(a) + " - " + check_abs(b);
      ctx.fillText(bth_, canvas.width / 2, canvas.height / 2 + 11);
      result = a - b;
      break;
    case 3:
      var bth_ =
        check_abs(Math.floor(a / 2)) + " x " + check_abs(Math.floor(b / 2));
      ctx.fillText(bth_, canvas.width / 2, canvas.height / 2 + 11);
      result = Math.floor(a / 2) * Math.floor(b / 2);
      break;
  }
  x = result;

  switch (rand(1, 4)) {
    case 1:
      document.getElementById("var1").innerHTML = result;
      document.getElementById("var2").innerHTML = resetRe();
      document.getElementById("var3").innerHTML = resetRe();

      break;
    case 2:
      document.getElementById("var1").innerHTML = resetRe();
      document.getElementById("var2").innerHTML = result;
      document.getElementById("var3").innerHTML = resetRe();

      break;
    case 3:
      document.getElementById("var1").innerHTML = resetRe();
      document.getElementById("var2").innerHTML = resetRe();
      document.getElementById("var3").innerHTML = result;
      break;
  }
  document.getElementById("score").innerHTML = " " + score;
  if (hightScore > 0) {
    document.getElementById("hightScore").style.display = "block";
    document.getElementById("hightScore").innerHTML = " " + hightScore;
  } else {
    document.getElementById("hightScore").style.display = "none";
  }
  document.getElementById("container").style.background = Color;
}

// bắt sự kiện phím
function Key(event) {
  var x = event.key;
  if (x == 1 && pause_ != 0 && pause_ != 1) check(1);
  else if (x == 2 && pause_ != 0 && pause_ != 1) check(2);
  else if (x == 3 && pause_ != 0 && pause_ != 1) check(3);
  else if (x == "m") playSong();
  else if (x == " " && (pause_ == 0 || pause_ == 1)) {
    play_again();
    pause_ = 10;
  } else if (x == "p" && pause_ != 0 && time > 0) {
    if (pause_ != 1) {
      pause();
      pause_ = 1;
    } else Continue();
  }
  console.log(pause_);
}

//chơi lại từ đầu
function play_again() {
  score = 0;
  resetTime();
  restMinMax();
  new1();
  Time();

  document.getElementById("BtnPause").style.display = "block";
  if (pause_ == 0 && err == 1) {
    document.getElementById("show-task").id = "end-task";
  } else if (pause_ == 1 || pause_ == 0) {
    document.getElementById("continue").id = "pause";
  }
}

// continue
function Continue() {
  Time();
  pause_ = 10;
  if (time > 0 && pause_ == 10) {
    document.getElementById("BtnPause").style.display = "block";
  }
  document.getElementById("continue").id = "pause";
}

// pause
function pause() {
  clearInterval(setTM1);
  document.getElementById("pause").id = "continue";
  document.getElementById("BtnPause").style.display = "none";
  pause_ = 1;
  document.getElementById("score2").innerHTML = "Score: " + score;
}

//kiểm tra các lựa chọn
function check(index) {
  index = "var" + index;
  var a = document.getElementById(index).innerHTML;
  if (a == x) {
    document.getElementById("true").play();
    score++;
    if (score % 10 == 0) {
      Min_ -= 10;
      Max_ += 10;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    new1();
    resetTime();
  } else {
    gameOver();
  }
}

// game over
function gameOver() {
  if (score > hightScore) {
    hightScore = score;
    document.getElementById("score1").innerHTML = "Hight Score: " + score;
  } else {
    document.getElementById("score1").innerHTML = "Score: " + score;
  }
  document.getElementById("false").play();
  document.getElementById("end-task").id = "show-task";
  document.getElementById("BtnPause").style.display = "none";
  err = 1;
  pause_ = 0;
  ColorA = 255;
  ColorB = 0;
  clearInterval(setTM1);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// effecrSound

function playSong() {
  console.log(songs.paused);
  if (songs.paused === true) {
    songs.play();
    songs.volume = 0.3;
    document.getElementById("btnMute").className = "fas fa-music";
  } else {
    songs.pause();
    document.getElementById("btnMute").className = "fas fa-volume-mute";
  }
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
