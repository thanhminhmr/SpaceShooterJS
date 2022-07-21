import { Ship } from "./ship.js";
import { Laser } from "./laser.js";
import { Enemy } from "./enemy.js";

export class Game {
	constructor(canvas, dispatcher, nextFrameCaller) {
		this.canvas = canvas;
		this.dispatcher = dispatcher;
		this.nextFrameCaller = nextFrameCaller;

		this.context2D = canvas.getContext("2d");

		this.region = Object.freeze({
			minX: 0,
			get maxX() { return canvas.clientWidth; },
			minY: 0,
			get maxY() { return canvas.clientHeight; }
		});

		this.callbacks = Object.freeze({
			spawn: entity => {
				if (entity instanceof Laser) {
					this.lasers.set(entity, entity);
				} else if (entity instanceof Enemy) {
					this.enemies.set(entity, entity);
				}
			},
			despawn: entity => {
				if (entity instanceof Laser) {
					this.lasers.delete(entity);
				} else if (entity instanceof Enemy) {
					this.enemies.delete(entity);
				}
			},
			shoot: () => dispatcher.dispatch("sound-shoot"),
			hit: () => dispatcher.dispatch("sound-hit")
		});

		this.enemies = new Map();
		this.lasers = new Map();
		this.ship = new Ship(0, this.callbacks, this.region);

		this.onKeyboard = this.ship.onKeyboard;
		this.score = 0;

		this.nextFrameCaller(this.render);
	}

	render = timestamp => {
		if (this.enemies.size < 50 && Math.random() > 0.5) {
			const enemy = new Enemy(timestamp, this.callbacks, this.region);
			this.enemies.set(enemy, enemy);
		}

		this.ship.tick(timestamp);
		for (const enemy of this.enemies.values()) enemy.tick(timestamp);
		for (const laser of this.lasers.values()) laser.tick(timestamp);

		let shipExploded = false;
		for (const enemy of this.enemies.values()) {
			for (const laser of this.lasers.values()) {
				if (enemy.checkCollide(laser) && this.ship.alive) this.updateScore();
			}
			if (this.ship.alive && enemy.checkCollide(this.ship)) {
				shipExploded = true;
			}
		}

		if (!this.ship.alive && shipExploded) this.dispatcher.dispatch("game-end", this.score);

		this.draw(this.context2D);
		for (const enemy of this.enemies.values()) enemy.draw(this.context2D);
		for (const laser of this.lasers.values()) laser.draw(this.context2D);
		if (this.ship.alive) this.ship.draw(this.context2D);

		this.nextFrameCaller(this.render);
	}

	draw(ctx) {
		ctx.save();
		ctx.fillStyle = "#000";
		ctx.fillRect(this.region.minX, this.region.minY, this.region.maxX, this.region.maxY);
		ctx.restore();
	}

	reset() {
		this.enemies.clear();
		this.lasers.clear();
		this.ship.reset();
		this.updateScore(0);
	}

	updateScore(newScore) {
		if (typeof newScore === "number") {
			this.score = newScore;
		} else {
			this.score += 10;
		}
		this.dispatcher.dispatch("game-update", this.score);
	}
}