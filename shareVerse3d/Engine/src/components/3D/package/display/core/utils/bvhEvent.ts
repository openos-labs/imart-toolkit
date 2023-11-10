import { Cancellable } from '@lincode/promiselikes';

class ListenerEvent {
	initCallBacks = new Set<(e?: any) => void>();

	constructor() {}

	// position
	listener = cb => {
		this.initCallBacks.add(cb);
		return new Cancellable(() => this.initCallBacks.delete(cb));
	};
	// position
	emit = (val?: any) => {
		for (const cb of this.initCallBacks) cb && cb(val);
	};

	removeAll() {
		this.initCallBacks.clear();
	}
}

const personFallEvent = new ListenerEvent();
const initPositionEvent = new ListenerEvent();
export { personFallEvent, initPositionEvent };
