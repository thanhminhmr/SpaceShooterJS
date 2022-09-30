export class Entity {
    constructor(timestamp, callbacks) {
        this.timestamp = timestamp;
        this.callbacks = callbacks;

        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.dx = 0;
        this.dy = 0;

        this.region = { minX: 0, minY: 0, maxX: 0, maxY: 0 };
    }

    setPos(x, y) {
        this.x = x;
        this.y = y;
    }

    setSize(w, h) {
        this.w = w;
        this.h = h;
    }

    setSpeed(dx, dy) {
        this.dx = dx;
        this.dy = dy;
    }

    setRegion(region) {
        this.region = region;
    }

    tick(timestamp) {
        const delta = timestamp - this.timestamp;
        this.timestamp = timestamp;
        this.x += this.dx * delta;
        this.y += this.dy * delta;
        if (Entity.isOutside(this, this.region)) {
            this.callbacks.despawn(this);
        }
    }

    static isOutside(entity, region) {
        return entity.x + entity.w < region.minX
            || entity.x - entity.w > region.maxX
            || entity.y + entity.h < region.minY
            || entity.y - entity.h > region.maxY;
    }

    draw(ctx) {
        // must be overriden
        throw new Error("Abtract method!");
    }

    checkCollide(entity) {
        if (Entity.isCollided(this, entity)) {
            this.collided(entity);
            entity.collided(this);
            return true;
        }
        return false;
    }

    collided(entity) {
        // default do nothing
    }

    static isCollided(a, b) {
        return a.x - a.w / 2 <= b.x + b.w / 2 && b.x - b.w / 2 <= a.x + a.w / 2
            && a.y - a.h / 2 <= b.y + b.h / 2 && b.y - b.h / 2 <= a.y + a.h / 2;
    }
}
