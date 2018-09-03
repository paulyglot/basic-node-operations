const fs = require("fs");

//write out data
 function done(output) {
     process.stdout.write(output);
     process.stdout.write('\nprompt > ');
 }

//where we will store our commands
 function evaluateCmd(userInput) {
  //parses the user input to understand which command was typed
   const userInputArray = userInput.split(" ");
   const command = userInputArray[0];

   switch (command) {
     case "echo":

     commandLibrary.echo(userInputArray.slice(1).join(" "));
       break;

     case "cat":
       commandLibrary.cat(userInputArray.slice(1));
       break;

     case "tail":
       commandLibrary.tail(userInputArray.slice(1));
       break;

     case "head":
       commandLibrary.head(userInputArray.slice(1));
       break;       

     case "errorHandler":
       commandLibrary.errorHandler(userInputArray.slice(1));
       break;

    }
 }

//where we will store the logic of our commands
 const commandLibrary = {

 	 "echo": function(userInput) {
       done(userInput);
   },

   "errorHandler": function(userInput) {
       if (userInput !== 'echo' | 'cat' | 'tail' | 'head') {
          console.log("error: the command cannot be found")
       }
   },

   "cat": function(fullPath) {
       const fileName = fullPath[0];
       fs.readFile(fileName, (err, data) => {
           if (err) throw err;
           done(data);
       });
   },

   "tail": function(fullPath) {
       const readLastLines = require('read-last-lines');
       readLastLines.read('./commands.js', 10)
        .then((lines) => console.log(lines));
   },

    "head": function(fullPath) {
        const readFirstLines = fullPath[0];
        console.log(
          fs.readFileSync(readFirstLines, 'utf8').slice(0, 200)
      );
    }
 };

 module.exports.commandLibrary = commandLibrary;
 module.exports.evaluateCmd = evaluateCmd;




