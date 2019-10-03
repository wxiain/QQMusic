class Event {
    constructor() {

    }
    add(event, type, fn, isCapture = false) {
        event.addEventListener(type, fn, isCapture);
    }
    removeEvent(event, type, fn) {
        event.removeEventListener(type, fn);
    }
}

export default Event;