class RankingService {
    constructor(
        interval
    ) {
        this.interval = interval;
        this.eventBus = new EventBus();
    }

    getNumbers() {

    }
}

class EventBus {
    constructor() {
        this.callbackPairs = [];
    }

    subscribe(eventType, callback) {
        const callbackPair = this._findCallbackPair(eventType);

        if (callbackPair) {
            callbackPair.callbacks.push(callback);
        } else {
            this.callbackPairs.push(new CallbackPair(eventType, callback));
        }
    }

    post(eventType, args) {
        const callbackPair = this._findCallbackPair(eventType);

        if (!callbackPair) {
            console.error('no subscriber for ' + eventType);
            return;
        }
        callbackPair.callbacks.forEach((callbacks) => callbacks(args));
    }

    _findCallbackPair(eventType) {
        return this.callbackPairs.find(eventObject => eventObject.eventType === eventType);
    }

}

class CallbackPair {
    constructor(
        eventType,
        callback
    ) {
        this.eventType = eventType
        this.callbacks = [callback];
    }

}
