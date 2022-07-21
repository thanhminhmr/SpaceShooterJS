import { Entity } from "./entity.js";

export class Laser extends Entity {
	static get COLOR() { return "#FDB"; }
	static get WIDTH() { return 5; }
	static get HEIGHT() { return 20; }
	static get SPEED() { return 0.75; }

	static get STEP_ANGLE() { return Math.PI / 48; }

	constructor(timestamp, callbacks, region, x, y, step) {
		super(timestamp, callbacks);
		this.setPos(x, y);
		this.setSize(Laser.WIDTH, Laser.HEIGHT);
		this.setRegion(region);

		const angle = Laser.STEP_ANGLE * step;
		const dx = Math.sin(angle) * Laser.SPEED;
		const dy = Math.cos(angle) * -Laser.SPEED;
		this.setSpeed(dx, dy);
	}

    checkCollide(entity) {
        return entity instanceof Enemy && super.checkCollide(entity);
    }

	collided(entity) {
		this.callbacks.despawn(this);
		this.callbacks.hit();
	}

	draw(ctx) {
		ctx.save();
		const ww = this.w / 2, hh = this.h / 2;
		ctx.fillStyle = Laser.COLOR;
		ctx.fillRect(this.x - ww, this.y - hh, this.w, this.h);
		ctx.restore();
	}
}
