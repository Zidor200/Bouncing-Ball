import {values} from "./data.js";
const canvas = document.querySelector(".canvas");
const balll = document.querySelector(".ball");
const inputs = document.querySelectorAll(".BallType");
let ctx = canvas.getContext("2d");
var width = canvas?.clientWidth;
var height = canvas?.clientHeight;
var rd = balll.clientWidth / 2;
let frameRate = 1 / 60;
let offLeft = width + canvas.offsetLeft;
let offTop = height + canvas.offsetTop;
inputs[0].checked = true;
var balls = values;
var ball = balls[0];
function varr() {
  width = canvas?.clientWidth;
  height = canvas?.clientHeight;
  offLeft = width + canvas.offsetLeft;
  offTop = height + canvas.offsetTop;
}
balll.className = "ball football";
ball.position.x = canvas.offsetLeft + width / 2 - rd;
ball.position.y = height / 2;
var screenLog = document.querySelector("#screen-log");
function getMousePos(e) {
  mouse.x = e.pageX;
  mouse.y = e.pageY;
}
var ag = 9.81;
var cd = 0.47;
var rho = 1.22;
var A = Math.PI * ball.radius * ball.radius / 1e4;
var mouse = {x: 0, y: 0, isClicked: false};
function move() {
  getMousePos;
  if (mouse.x < offLeft && mouse.x > canvas.offsetLeft) {
    ball.velocity.x = (mouse.x - ball.position.x) / 100 * -1;
    ball.velocity.y = (mouse.y - ball.position.y) / 100 * -1;
  }
}
function getBall() {
  let pos = [ball.position.x, ball.position.y];
  let vel = [ball.velocity.x, ball.velocity.y];
  inputs.forEach((item) => {
    if (item.checked) {
      ball = balls[parseInt(item.id)];
      ball.position.x = pos[0];
      ball.position.y = pos[1];
      ball.velocity.x = vel[0];
      ball.velocity.y = vel[1];
      balll.className = "ball";
      balll.classList.add(ball.name);
      balll.style.width = ball.radius * 2 + "px";
      balll.style.height = ball.radius * 2 + "px";
    }
  });
}
function loop() {
  varr();
  getBall();
  document.addEventListener("mousedown", move);
  document.addEventListener("mousemove", getMousePos);
  var rotationSpeed = Math.abs(ball.velocity.x) + Math.abs(ball.velocity.y) / frameRate;
  var Fx = -5 * A * cd * rho * ball.velocity.x * ball.velocity.x * ball.velocity.x / Math.abs(ball.velocity.x);
  var Fy = -0.5 * A * cd * rho * ball.velocity.y * ball.velocity.y * ball.velocity.y / Math.abs(ball.velocity.y);
  Fx = isNaN(Fx) ? 0 : Fx;
  Fy = isNaN(Fy) ? 0 : Fy;
  var ax = Fx / ball.mass;
  var ay = ag + Fy / ball.mass;
  ball.velocity.x += ax * 1 / 500;
  ball.velocity.y += ay * 1 / 100;
  ball.position.x += ball.velocity.x * frameRate * 1e3;
  ball.position.y += ball.velocity.y * frameRate * 1e3;
  ball.rotation += rotationSpeed;
  if (ball.position.y == offTop - ball.radius * 3) {
    balll.classList.add("shadow");
  } else {
    balll.classList.remove("shadow");
  }
  if (ball.position.y > offTop - ball.radius * 2) {
    ball.velocity.y *= ball.restitution;
    ball.position.y = offTop - ball.radius * 2;
  }
  if (ball.position.x > offLeft - ball.radius * 2) {
    ball.velocity.x *= ball.restitution;
    ball.position.x = offLeft - ball.radius * 2;
  }
  if (ball.position.y < canvas.offsetTop) {
    ball.velocity.y *= ball.restitution + 0.3;
    ball.position.y = canvas.offsetTop;
  }
  if (ball.position.x < canvas.offsetLeft) {
    ball.velocity.x *= ball.restitution;
    ball.position.x = canvas.offsetLeft;
  }
  screenLog.innerText = `
    Ball X/Y : ${balll.getBoundingClientRect().left} / ${balll.getBoundingClientRect().top}
    veloctiy x/y:${ball.velocity.x} / ${ball.velocity.y}
    ballRadius : ${ball.radius}
    ballMass: ${ball.mass}
    width/Height : ${width}/${height}
`;
  balll.style.top = ball.position.y + "px";
  balll.style.left = ball.position.x + "px";
  balll.style.transform = `rotate(${ball.rotation}deg)`;
  if (Math.abs(ball.velocity.x) < 0.15) {
    rotationSpeed = 0;
    ball.rotation = 0;
    ball.velocity.x = 0;
  }
}
setInterval(loop, 2500 * frameRate);
