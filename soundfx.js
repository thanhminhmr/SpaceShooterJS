export class SoundFX {
	static get LIMIT() { return 16; }

	constructor(source) {
		this.index = 0;
		this.audios = [];
		for (let i = 0; i < SoundFX.LIMIT; i++) {
			this.audios.push(new Audio(source));
		}
	}

	play = () => {
		const audio = this.audios[this.index];
		this.index = (this.index + 1) % SoundFX.LIMIT;
		audio.play();
	}
}
