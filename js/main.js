class Game {
	
	constructor() {
		this.cvs = document.getElementById("canvas")
		this.ctx = this.cvs.getContext("2d")
		
		this.time = 0
		
		this.birdX = 100
		this.birdY = 100
		this.birdWidth = 20
		this.birdHeight = 20
		
		this.speed = 1.7
		this.birdSpeed = 20
		this.gravity = 5
		
		this.filarX = 300
		this.filarWidth = 20
		this.gap = 150
		this.space = 300
		
		this.filars = []
	}

	start() {
		this.generatePilars()
		this.draw()
		this.keyEvents()
	}

	generatePilars() {
		for (let i = 0; i < 40; i++) {
			let random = this.rand(0, 400)
			let obj = {
				th: random,
		
				bt: random + this.gap,
				bh: this.cvs.height - random - this.gap
			}
			this.filars.push(obj)
		}
	}

	draw() {
		this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height)

		this.ctx.beginPath()
		this.ctx.rect(this.birdX, this.birdY, this.birdWidth, this.birdHeight)
		this.ctx.fillStyle = "#000";
		this.ctx.fill()

		for (let i = 0; i < this.filars.length; i++) {
			this.ctx.beginPath()
			this.ctx.rect(this.filarX + (i * this.space), 0, this.filarWidth, this.filars[i].th)
			this.ctx.fillStyle = "#115D09";
			this.ctx.fill()
	
			this.ctx.beginPath()
			this.ctx.rect(this.filarX + (i * this.space), this.filars[i].bt, this.filarWidth, this.filars[i].bh)
			this.ctx.fill()
	
			if (this.birdY + this.birdHeight > this.cvs.height) {
				console.error('HIT EARTH');
				this.endGame(this.time / 100)
				return
			}
			if (this.birdY < 0) {
				console.error('HIT SKY');
				this.endGame(this.time / 100)
				return
			}
			if (this.birdX + this.birdWidth > this.filarX + (i * this.space) && this.birdX < this.filarX + (i * this.space) + this.filarWidth && this.filars[i].th >= this.birdY) {
				console.error('HIT TOP');
				this.endGame(this.time / 100)
				return
			}
			if (this.birdX + this.birdWidth > this.filarX + (i * this.space) && this.birdX < this.filarX + (i * this.space) + this.filarWidth && this.birdY + this.birdHeight > this.filars[i].bt) {
				console.error('HIT BOTTOM')
				this.endGame(this.time / 100)
				return
			}
		}
	
		this.birdY += this.gravity
		this.filarX -= this.speed
		this.time++
	
		document.getElementById("time").innerHTML = this.time / 100
	
		if (this.time > 400) {
			this.speed = 2.3
		}
		if (this.time > 800) {
			this.speed = 3
		}
		if (this.time > 1200) {
			this.speed = 4
		}
		if (this.time > 1500) {
			this.speed = 10
		}

		requestAnimationFrame(()=>this.draw());
	}

	keyEvents() {
		let mouse = false
	
		let up = () => {
			setTimeout( () => {
	
				this.birdY -= 9
	
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
	}

	endGame(result) {
		document.getElementById("end").style.display = "block";
		document.getElementById("canvas").style.display = "none";
		document.getElementById("time").style.display = "none";
		document.getElementById("tap").style.display = "none";
		document.getElementById("result").innerHTML = result;
	}

	rand(min, max) {
		let value = Math.floor((Math.random() * max) + 1)
	
		if (value >= min) {
			return value
		} else {
			return rand(min, max)
		}
	}

}

let game = new Game
game.start()