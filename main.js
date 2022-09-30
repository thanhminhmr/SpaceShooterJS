import { Dispatcher } from "./dispatcher.js";
import { GameScreen } from "./screen/game_screen.js"
import { GameStartScreen } from "./screen/game_start_screen.js"
import { GameOverScreen } from "./screen/game_over_screen.js"
import { HighscoreScreen } from "./screen/highscore_screen.js"
import { SoundFX } from "./soundfx.js";

const body = document.querySelector("body");
const dispatcher = new Dispatcher();
const gameScreen = new GameScreen(body, dispatcher);
const gameStartScreen = new GameStartScreen(body, dispatcher);
const gameOverScreen = new GameOverScreen(body, dispatcher);
const highscoreScreen = new HighscoreScreen(body, dispatcher);

dispatcher.register("game-end", score => {
    highscoreScreen.update(score);
    gameOverScreen.update(score);
    gameOverScreen.show();
});

dispatcher.register("gamestart-start", () => {
    gameStartScreen.hide();
    gameScreen.start();
});
dispatcher.register("gamestart-highscore", () => {
    highscoreScreen.show();
});

dispatcher.register("gameover-restart", () => {
    gameOverScreen.hide();
    gameScreen.start();
});
dispatcher.register("gameover-highscore", () => {
    highscoreScreen.show();
});

dispatcher.register("highscore-back", () => {
    highscoreScreen.hide();
});

const hitSfx = new SoundFX("./assets/hit.wav");
const shootSfx = new SoundFX("./assets/shoot.wav");
dispatcher.register("sound-hit", hitSfx.play);
dispatcher.register("sound-shoot", shootSfx.play);


gameStartScreen.show();
