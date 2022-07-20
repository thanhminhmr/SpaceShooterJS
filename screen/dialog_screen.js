import { Screen } from "./screen.js";

export class DialogScreen extends Screen {
	constructor(parent) {
		super(parent);

		this.dialog = document.createElement("div");
		this.dialog.classList.add("dialog");
		this.screen.appendChild(this.dialog);

		this.screen.classList.add("hidden");
	}
}
