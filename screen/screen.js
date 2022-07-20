export class Screen {
	constructor(parent) {
		this.parent = parent;

		this.screen = document.createElement("div");
		this.screen.classList.add("screen")
		this.parent.appendChild(this.screen);
	}

	show() {
		this.screen.classList.remove("hidden");
	}

	hide() {
		this.screen.classList.add("hidden");
	}
}
