import Subject from "./Store";

class State extends Subject {
	constructor() {
		super();
		this.dataApp = [];
	}

	// Update the state.
	// Calls the update method on each observer.
	update(data = []) {
		this.dataApp = Object.assign(this.dataApp, data);
		this.notify(this.dataApp);
	}

	// Get the state.
	get() {
		return this.dataApp;
	}
}

if (window["store"] === undefined) {
	window["store"] = new State();
}

export default window["store"] as State;
