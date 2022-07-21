export class SoundFX {
	static get LIMIT() { return 10; }

	constructor(dispatcher, eventName, source) {
		this.index = 0;
		this.audios = [];
		for (let i = 0; i < SoundFX.LIMIT; i++) {
			this.audios.push(new Audio(source));
		}
		dispatcher.register(eventName, this.play);
	}

	play = () => {
		const audio = this.audios[this.index];
		this.index = (this.index + 1) % SoundFX.LIMIT;
		audio.play();
	}
}
