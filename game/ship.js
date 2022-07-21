import { Entity } from "./entity.js";
import { Laser } from "./laser.js";

export class Ship extends Entity {
	static get COLOR() { return "#F73"; }
	static get WIDTH() { return 30; }
	static get HEIGHT() { return 30; }
	static get SPEED() { return 0.5; }
	static get SHOOT_DELAY() { return 100; }

	static get KEYBOARD_ARROW_UP() { return "ArrowUp"; }
	static get KEYBOARD_ARROW_DOWN() { return "ArrowDown"; }
	static get KEYBOARD_ARROW_LEFT() { return "ArrowLeft"; }
	static get KEYBOARD_ARROW_RIGHT() { return "ArrowRight"; }
	static get KEYBOARD_SPACEBAR() { return " "; }

	constructor(timestamp, callbacks, region) {
		super(timestamp, callbacks);

		this.setPos((region.maxX + region.minX) / 2, (region.maxY + region.minY) / 2);
		this.setSize(Ship.WIDTH, Ship.HEIGHT);
		this.setRegion(region);

		this.arrowUp = false;
		this.arrowDown = false;
		this.arrowLeft = false;
		this.arrowRight = false;
		this.spacebar = false;

		this.lastShoot = timestamp;
		this.alive = false;
	}

	onKeyboard = (key, state) => {
		if (key == Ship.KEYBOARD_ARROW_UP) {
			this.arrowUp = state;
		} else if (key == Ship.KEYBOARD_ARROW_DOWN) {
			this.arrowDown = state;
		} else if (key == Ship.KEYBOARD_ARROW_LEFT) {
			this.arrowLeft = state;
		} else if (key == Ship.KEYBOARD_ARROW_RIGHT) {
			this.arrowRight = state;
		} else if (key == Ship.KEYBOARD_SPACEBAR) {
			this.spacebar = state;
		}
	}

	reset() {
		this.alive = true;

		const region = this.region;
		this.setPos((region.maxX + region.minX) / 2, (region.maxY + region.minY) / 2);
	}

	checkCollide(entity) {
		return entity instanceof Enemy && super.checkCollide(entity);
	}

	collided(entity) {
		this.alive = false;
	}

	tickSpeed() {
		const dx = (this.arrowLeft ? -Ship.SPEED : 0) + (this.arrowRight ? Ship.SPEED : 0);
		const dy = (this.arrowUp ? -Ship.SPEED : 0) + (this.arrowDown ? Ship.SPEED : 0);
		const dd = (this.arrowLeft ^ this.arrowRight) && (this.arrowUp ^ this.arrowDown);
		this.setSpeed(dd ? dx * Math.SQRT2 : dx, dd ? dy * Math.SQRT2 : dy);
	}

	tickLimitPos() {
		const x = Math.max(Math.min(this.x, this.region.maxX - this.w), this.region.minX + this.w);
		const y = Math.max(Math.min(this.y, this.region.maxY - this.h), this.region.minY + this.h);
		this.setPos(x, y);
	}

	tickShoot(timestamp) {
		if (this.alive && this.spacebar && timestamp - this.lastShoot > Ship.SHOOT_DELAY) {
			this.lastShoot = timestamp;
			const laserX = this.x;
			const laserY = this.y - this.h;
			this.callbacks.spawn(new Laser(timestamp, this.callbacks, this.region, laserX, laserY, 0));
			this.callbacks.spawn(new Laser(timestamp, this.callbacks, this.region, laserX, laserY, -1));
			this.callbacks.spawn(new Laser(timestamp, this.callbacks, this.region, laserX, laserY, 1));
			this.callbacks.shoot();
		}
	}

	tick(timestamp) {
		this.tickSpeed();
		super.tick(timestamp);
		this.tickLimitPos();
		this.tickShoot(timestamp);
	}

	draw(ctx) {
		if (this.alive) {
			ctx.save();
			const ww = this.w / 2, hh = this.h / 2;
			ctx.fillStyle = Ship.COLOR;
			ctx.beginPath();
			ctx.moveTo(this.x, this.y - hh);
			ctx.lineTo(this.x - ww, this.y + hh);
			ctx.lineTo(this.x, this.y);
			ctx.lineTo(this.x + ww, this.y + hh);
			ctx.closePath();
			ctx.fill();
			ctx.restore();
		}
	}
}