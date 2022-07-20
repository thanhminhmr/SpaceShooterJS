import { DialogScreen } from './dialog_screen.js'

/*
 * Listen: gamestart-show()
 * Listen: gamestart-hide()
 * Dispatch: gamestart-start()
 * Dispatch: gamestart-highscore()
 */
export class GameStartScreen extends DialogScreen {
	constructor(parent, dispatcher) {
		super(parent);
		this.dispatcher = dispatcher;

		let header = document.createElement("h1");
		header.appendChild(document.createTextNode("Space Shooter"));
		this.dialog.appendChild(header);

		let body = document.createElement("ul");
		body.innerHTML
			= '<li>Use the <span class="key">&larr;</span> and <span class="key">&rarr;</span> keys to move.</li>'
			+ '<li>Use <span class="key">spacebar</span> to shoot.</li>';
		this.dialog.appendChild(body);

		this.startButton = document.createElement("button");
		this.startButton.appendChild(document.createTextNode("Start"));
		this.dialog.appendChild(this.startButton);

		this.highscoreButton = document.createElement("button");
		this.highscoreButton.appendChild(document.createTextNode("Highscore"));
		this.dialog.appendChild(this.highscoreButton);

		this.startButton.addEventListener("mouseup", () => this.start(), true);
		this.highscoreButton.addEventListener("mouseup", () => this.highscore(), true);

		dispatcher.register("gamestart-show", () => this.show());
		dispatcher.register("gamestart-hide", () => this.hide());
	}

	start() {
		this.dispatcher.dispatch("gamestart-start");
	}

	highscore() {
		this.dispatcher.dispatch("gamestart-highscore");
	}
}