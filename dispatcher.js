export class Dispatcher {
	constructor() {
		this.eventCallbacks = new Map();
	}

	dispatch(eventName, data) {
		const callbacks = this.eventCallbacks.get(eventName);
		if (callbacks) {
			for (const callback of callbacks.values()) {
				callback(data);
			}
		}
	}

	register(eventName, callback) {
		if (typeof callback !== "function") return;
		const callbacks = this.eventCallbacks.get(eventName) || new Map();
		if (callbacks.set(callback, callback).size === 1) {
			this.eventCallbacks.set(eventName, callbacks);
		}
	}

	unregister(eventName, callback) {
		if (typeof callback !== "function") return;
		const callbacks = this.eventCallbacks.get(eventName);
		if (callbacks && callbacks.delete(callback) && callbacks.size === 0) {
			this.eventCallbacks.delete(eventName);
		}
	}
}
