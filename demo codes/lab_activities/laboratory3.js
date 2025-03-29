const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on("start", () => {
    console.log("Application Started!" )
})

emitter.on("data", (data)=> {
    console.log("Data Received!")
    console.log("name: " + data.name)
    console.log("age: " + data.age)
})

emitter.on("error", (err) => {
    console.log("Error Occured: " + err)
})

emitter.emit("start")
emitter.emit('data', {name: "Miguel", age: 22});
emitter.emit('error', "} missing in line 69")