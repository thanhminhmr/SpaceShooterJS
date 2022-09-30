import { Entity } from "./entity.js";

export class Enemy extends Entity {
    static random(a, b) { return Math.min(a, b) + Math.random() * Math.abs(a - b); }

    static get FILL() { return "#CBA"; }
    static get STROKE() { return "#987"; }

    static get RADIUS_MIN() { return 10; }
    static get RADIUS_MAX() { return 60; }
    static get SPEED_X_MIN() { return -0.1; }
    static get SPEED_X_MAX() { return 0.1; }
    static get SPEED_Y_MIN() { return 0.1; }
    static get SPEED_Y_MAX() { return 0.5; }

    static get RADIUS() { return Enemy.random(Enemy.RADIUS_MIN, Enemy.RADIUS_MAX); }
    static get SPEED_X() { return Enemy.random(Enemy.SPEED_X_MIN, Enemy.SPEED_X_MAX); }
    static get SPEED_Y() { return Enemy.random(Enemy.SPEED_Y_MIN, Enemy.SPEED_Y_MAX); }

    constructor(timestamp, callbacks, region) {
        super(timestamp, callbacks);

        const radius = Enemy.RADIUS;
        this.setSize(radius, radius);
        this.setPos(Enemy.random(region.minX, region.maxX), -radius);
        this.setSpeed(Enemy.SPEED_X, Enemy.SPEED_Y);
        this.setRegion(region);
    }

    checkCollide(entity) {
        return !(entity instanceof Enemy) && super.checkCollide(entity);
    }

    collided(entity) {
        this.callbacks.despawn(this);
    }

    draw(ctx) {
        ctx.save();

        const ww = this.w / 2, hh = this.h / 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, ww, 0, Math.PI * 2);
        ctx.closePath();

        ctx.fillStyle = Enemy.FILL;
        ctx.fill();

        ctx.strokeStyle = Enemy.STROKE;
        ctx.lineWidth = Math.min(ww, hh) / 5;
        ctx.stroke();

        ctx.restore();
    }
}

