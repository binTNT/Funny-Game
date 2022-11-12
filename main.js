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
resetTime();
new1();
Time();

// đặt thời gian kết thúc
function resetTime() {
  time = 10;
}

//hàm đếm ngược
function Time() {
  timeOut();
  var setTM = setInterval(timeOut, 1000);
  setTM1 = setTM;
  function timeOut() {
    if (time >= -1) {
      document.getElementById("time").innerHTML = "  " + time;
      time--;
    }
    if (time == -1) {
      resetTime();
      document.getElementById("false").play();
      document.getElementById("BtnPause").style.display = "none";
      document.getElementById("end-task").id = "show-task";
      document.getElementById("score1").innerHTML = "Score: " + score;

      clearInterval(setTM);
    }
    time;
  }
}

//hàm tạo phép toán mới
function new1() {
  var a = rand(Min_, Max_);
  var b = rand(Min_, Max_);
  let result = 0;
  var Case = rand(1, 4);

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
      var bth_ = check_abs(a) + " x " + check_abs(b);
      ctx.fillText(bth_, canvas.width / 2, canvas.height / 2 + 11);
      result = a * b;
      break;
    case 4:
      var bth_ = check_abs(a) + " / " + check_abs(b);
      ctx.fillText(bth_, canvas.width / 2, canvas.height / 2 + 11);
      result = a / b;
      break;
  }
  x = result;

  switch (rand(1, 3)) {
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
}

//chơi lại từ đầu
function play_again() {
  score = 0;
  resetTime();
  new1();
  Time();
  document.getElementById("BtnPause").style.display = "block";
  document.getElementById("show-task").id = "end-task";
}
function play_again2() {
  score = 0;
  resetTime();
  new1();
  Time();
  document.getElementById("BtnPause").style.display = "block";

  document.getElementById("continue").id = "pause";
}

// continue
function Continue() {
  Time();
  document.getElementById("BtnPause").style.display = "block";
  document.getElementById("continue").id = "pause";
}

// pause
function pause() {
  clearInterval(setTM1);
  document.getElementById("pause").id = "continue";
  document.getElementById("BtnPause").style.display = "none";
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
    if (score > hightScore) {
      hightScore = score;
      document.getElementById("score1").innerHTML = "Hight Score: " + score;
    } else {
      document.getElementById("score1").innerHTML = "Score: " + score;
    }
    document.getElementById("false").play();
    document.getElementById("BtnPause").style.display = "none";
    document.getElementById("end-task").id = "show-task";
    // resetTime();
    Min_ = -20;
    Max_ = 20;
    clearInterval(setTM1);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
