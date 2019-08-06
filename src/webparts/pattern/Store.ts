class Store {
    public observers: any[];

	constructor() {
		this.observers = [];
	}

	public subscribe (fn) {
		this.observers.push(fn);
	}

    public broadcast (data) {
		if (this.observers.length === 0) {
			console.log("No subsricer in Array");
		} else {
            this.observers.forEach(subscriber => subscriber(data));
        }
	}
}
if (window["store"] === undefined) {
	window["store"] = new Store();
}

export default (window["store"] as Store);
