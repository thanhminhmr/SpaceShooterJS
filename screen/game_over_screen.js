import { DialogScreen } from './dialog_screen.js'

/*
 * Listen: gameover-show()
 * Listen: gameover-hide()
 * Listen: gameover-update(newScore)
 * Dispatch: gameover-restart()
 * Dispatch: gameover-highscore()
 */
export class GameOverScreen extends DialogScreen {
	constructor(parent, dispatcher) {
		super(parent);
		this.dispatcher = dispatcher;

		let header = document.createElement("h1");
		header.appendChild(document.createTextNode("Game over"));
		this.dialog.appendChild(header);

		this.score = document.createElement("ul");
		this.score.textContent = "Your score is: 0";
		this.dialog.appendChild(this.score);

		this.restartButton = document.createElement("button");
		this.restartButton.appendChild(document.createTextNode("Restart"));
		this.dialog.appendChild(this.restartButton);

		this.highscoreButton = document.createElement("button");
		this.highscoreButton.appendChild(document.createTextNode("Highscore"));
		this.dialog.appendChild(this.highscoreButton);

		this.restartButton.addEventListener("mouseup", () => this.restart(), true);
		this.highscoreButton.addEventListener("mouseup", () => this.highscore(), true);

		dispatcher.register("gameover-show", () => this.show());
		dispatcher.register("gameover-hide", () => this.hide());
		dispatcher.register("gameover-update", newScore => this.update(newScore));
	}

	restart() {
		this.dispatcher.dispatch("gameover-restart");
	}

	highscore() {
		this.dispatcher.dispatch("gameover-highscore");
	}

	update(newScore) {
		this.score.textContent = "Your score is: " + newScore;
	}
}
