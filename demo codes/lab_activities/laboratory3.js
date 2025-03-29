const EventEmitter = require('events');
const emitter = new EventEmitter();

const data = {name: "Miguel", age: "22"}

emitter.on("start", () => {
    console.log("Application Started!" )
})

emitter.on("data", (data)=> {
    console.log("Data Received!")
    console.log("name: " + data.name)
    console.log("age: " + data.age)
})

const err = "} missing on line 69";

emitter.on("error", (err) => {
    console.log("Error Occured: " + err)
})

emitter.emit("start")
emitter.emit('data', data);
emitter.emit('error', err)