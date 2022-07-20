import { DialogScreen } from './dialog_screen.js'

/*
 * Listen: highscore-show()
 * Listen: highscore-hide()
 * Listen: highscore-update(newScore)
 * Dispatch: highscore-back()
 */
export class HighscoreScreen extends DialogScreen {
	static get LIMIT() { return 5; }

	highscores = [5000, 4000, 3000, 2000, 1000];

	constructor(parent, dispatcher) {
		super(parent);
		this.dispatcher = dispatcher;

		let header = document.createElement("h1");
		header.appendChild(document.createTextNode("Highscores"));
		this.dialog.appendChild(header);

		this.highscoreList = document.createElement("ol");
		this.dialog.appendChild(this.highscoreList);

		this.backButton = document.createElement("button");
		this.backButton.appendChild(document.createTextNode("Back"));
		this.dialog.appendChild(this.backButton);

		this.backButton.addEventListener("mouseup", () => this.back(), true);

		dispatcher.register("highscore-show", () => this.show());
		dispatcher.register("highscore-hide", () => this.hide());
		dispatcher.register("highscore-update", newScore => this.update(newScore));
	}

	back() {
		this.dispatcher.dispatch("highscore-back");
	}

	update(newScore) {
		const highscores = this.highscores;
		highscores.push(newScore);
		highscores.sort((a, b) => b - a);
		highscores.splice(HighscoreScreen.LIMIT);
		// somehow js doesn't have a direct way to clear Element.children
		this.highscoreList.textContent = "";
		for (let i = 0, len = highscores.length; i < len; ++i) {
			let element = document.createElement("li");
			element.appendChild(document.createTextNode(highscores[i]));
			this.highscoreList.appendChild(element);
		}
	}
}