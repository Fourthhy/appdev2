//import 
const http = require("http");
// import http from "http"
const fs = require("fs");
// import fs from "fs"
const path = require("path");
// import path from "path"
const url = require("url");
// import url from "url"
const EventEmitter = require("events");
//import Emitter

//create fileEvents object
const fileEvents = new EventEmitter();

//Log file events
fileEvents.on("fileAction", (message) => {
  console.log(message);
});

//define server

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;
  const filename = query.filename ? path.join(__dirname, query.filename) : null;
  const actualfilename = parsedUrl.query.filename
  const content = query.content || "no content"; //or pwede ren naman na empty string

  if (!filename && pathname !== "/") {
    res.writeHead(400, { "Content-Type": "text/plain" });
    return res.end("Filename is required!");
  }

  switch (pathname) {

    case "/create":
      fs.writeFile(filename, content, (err) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          return res.end("Error in creating file");
        }
        res.writeHead(200, { "Content-Type": "text/plain" });
        fileEvents.emit("fileAction",  "File created: " + actualfilename); //to prompt response on the cli
        res.end("File " + actualfilename + " created successfully") //to prompt response on the api tester
      });
      break;

    case "/read":
      fs.readFile(filename, "utf8", (err, data) => {
        if (err) {
          res.writeHead(404, { "Content-Type": "text/plain" });
          return res.end("File not found");
        }
        res.writeHead(200, { "Content-Type": "text/plain" });
        fileEvents.emit("fileaction, File read: " + actualfilename)
        res.end(actualfilename + "says: " + data); 
      });
      break;

    case "/update":
      fs.appendFile(filename, `\n${content}`, (err) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          return res.end("Error updating file");
        }
        fileEvents.emit("fileAction", `File updated: ${filename}`);
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("File " + actualfilename + " updated successfully")
      });
      break;

    case "/delete":
      fs.unlink(filename, (err) => {
        if (err) {
          res.writeHead(404, { "Content-Type": "text/plain" });
          return res.end("File not found");
        }
        fileEvents.emit("fileAction", `File deleted: ${filename}`);
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("File " + actualfilename + " deleted successfully")
      });
      break;

    default:
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Route not found");
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});