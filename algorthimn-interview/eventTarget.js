class MyEventTarget extends EventTarget {
    constructor(mySecret) {
        super();
        this._secret = mySecret;
    }

    get secret() { return this._secret; }
}


let myEventTarget = new MyEventTarget(5)
let value = myEventTarget.secret;  // == 5
myEventTarget.addEventListener("foo", function (e) {
    this._secret = e.detail
})

console.log('eventtarge');
// make a new Event
let event = new CustomEvent("foo", { detail: 7 });

// trigger
myEventTarget.dispatchEvent(event)
let newValue = myEventTarget.secret;