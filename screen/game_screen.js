import { Screen } from "./screen.js";
import { Game } from "../game/game.js"

/*
 * Listen: game-update(score)
 */
export class GameScreen extends Screen {
	constructor(parent, dispatcher) {
		super(parent);
		this.dispatcher = dispatcher;

		this.score = document.createElement("li");
		this.score.textContent = "Score: 0";

		let hud = document.createElement("ul");
		hud.classList.add("hud");
		hud.appendChild(this.score);
		this.screen.appendChild(hud);

		this.canvas = document.createElement("canvas");
		this.screen.appendChild(this.canvas);

		this.game = new Game(this.canvas, dispatcher,
			callback => window.requestAnimationFrame(callback));

		this.canvas.width = this.canvas.clientWidth;
		this.canvas.height = this.canvas.clientHeight;

		window.addEventListener("resize", () => {
			this.canvas.width = this.canvas.clientWidth;
			this.canvas.height = this.canvas.clientHeight;
		});

		document.addEventListener("keydown", event => this.dispatchKey(event, true));
		document.addEventListener("keyup", event => this.dispatchKey(event, false));

		dispatcher.register("game-update", score => this.update(score));
	}

	dispatchKey(event, state) {
		this.game.onKeyboard(event.key, state);
	}

	update(score) {
		this.score.textContent = "Score: " + score;
	}

	start() {
		this.game.reset();
	}
}