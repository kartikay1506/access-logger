const fs = require('fs');

//? VARS
const INPUT_PATH = "./logs.txt";
const OUTPUT_PATH = "./logscsv.csv";
const TIME_IN_SECONDS = 5;

const mainFunc = () => {
    const logData = fs.readFileSync(INPUT_PATH, 'utf8');
    
    const logDataArray = logData.split("\n");
    
    const reIp = new RegExp('[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}');
    //const myDate = new RegExp('\\\[\(\[A\-Za\-z0\-9\+\\\-\\\:\\\/ \]\+\)\\\]');
    const myDate = new RegExp("\\[[A-Za-z0-9+\-\:\/ ]+\]");
    const reHitting = new RegExp('\"([A-Za-z0-9+\:\/.:_; ]+)\"');
    
    let dateToBeWritten = '';
    logDataArray.forEach(logLine => {
        const ip = logLine.match(reIp);
        const dateandTime = logLine.match(myDate);
        const hitting = logLine.match(reHitting);

        //console.log(String(dateandTime[0]));
        const date = String(dateandTime[0]).substring(1, 12);
        const time = dateandTime[0].substring(14, 21);
        const statusCode = dateandTime[0].substring(24, 27);
        const temp = hitting[0].split("/")[0];
        const header = temp.substring(1, temp.length - 1);
        
        dateToBeWritten += `${ip[0]},${date},${time},${hitting[0]},${header},${statusCode}\n`;
    });
    
    // fs.appendFileSync('./logcsv.csv',dateToBeWritten); //* To append
    fs.writeFileSync(OUTPUT_PATH, dateToBeWritten); // To OverWrite 
    console.log("Iteration Complete");
}

console.log("Process Started");
setInterval(mainFunc, TIME_IN_SECONDS*1000);