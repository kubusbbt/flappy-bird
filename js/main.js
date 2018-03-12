const cvs = document.getElementById("canvas")
const ctx = cvs.getContext("2d")

var time = 0

var birdX = 100
var birdY = 100
const birdWidth = 20
const birdHeight = 20

let speed = 1.7
const birdSpeed = 20
const gravity = 5

let filarX = 300
let filarWidth = 20
const gap = 150
const space = 300

let filars = []

for (let i = 0; i < 40; i++) {

	let random = rand(0, 400)
	let obj = {
		th: random,

		bt: random + gap,
		bh: cvs.height - random - gap
	}
	filars.push(obj)

}

draw()
keyEvents()

function draw() {
	ctx.clearRect(0, 0, cvs.width, cvs.height)

	ctx.beginPath()
	ctx.rect(birdX, birdY, birdWidth, birdHeight)
	ctx.fillStyle = "#000";
	ctx.fill()

	// filar 
	for (let i = 0; i < filars.length; i++) {
		ctx.beginPath()
		ctx.rect(filarX + (i * space), 0, filarWidth, filars[i].th)
		ctx.fillStyle = "#115D09";
		ctx.fill()

		ctx.beginPath()
		ctx.rect(filarX + (i * space), filars[i].bt, filarWidth, filars[i].bh)
		ctx.fill()

		if (birdY + birdHeight > cvs.height) {
			console.error('HIT EARTH');
			endGame(time / 100)
			return
		}
		if (birdY < 0) {
			console.error('HIT SKY');
			endGame(time / 100)
			return
		}
		if (birdX + birdWidth > filarX + (i * space) && birdX < filarX + (i * space) + filarWidth && filars[i].th >= birdY) {
			console.error('HIT TOP');
			endGame(time / 100)
			return
		}
		if (birdX + birdWidth > filarX + (i * space) && birdX < filarX + (i * space) + filarWidth && birdY + birdHeight > filars[i].bt) {
			console.error('HIT BOTTOM')
			endGame(time / 100)
			return
		}
	}

	birdY += gravity
	filarX -= speed
	time++

	document.getElementById("time").innerHTML = time / 100

	if (time > 400) {
		speed = 2.3
	}
	if (time > 800) {
		speed = 3
	}
	if (time > 1200) {
		speed = 4
	}
	if (time > 1500) {
		speed = 10
	}

	requestAnimationFrame(draw)
}

function keyEvents() {
	let mouse = false

	function up() {
		setTimeout(function () {

			birdY -= 9

			if (mouse) {
				up()
			}

		}, 10)
	}

	document.addEventListener("mousedown", function (e) {
		mouse = true
		up()
	})

	document.addEventListener("mouseup", function (e) {
		mouse = false
	})

	document.addEventListener("keydown", function (e) {
		switch (e.keyCode) {
			case 32: //space
				birdY -= birdSpeed
				break;

			case 38: //up
				birdY -= birdSpeed
				break;

			case 40: //down
				birdY += birdSpeed
				break;
		}
	});
}


function endGame(result) {
	document.getElementById("end").style.display = "block";
	document.getElementById("canvas").style.display = "none";
	document.getElementById("time").style.display = "none";
	document.getElementById("tap").style.display = "none";
	document.getElementById("result").innerHTML = result;
}


function rand(min, max) {
	let value = Math.floor((Math.random() * max) + 1)

	if (value >= min) {
		return value
	} else {
		return rand(min, max)
	}
}
