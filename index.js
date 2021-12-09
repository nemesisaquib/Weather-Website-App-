const http = require('http');

const fs = require ('fs');

const request = require('request');

const indexFile = fs.readFileSync("index.html", 'utf-8');

const replaceVal = (tempVal, orgVal) => {
    let temperature = tempVal.replace("{%tempval%}", orgVal.main.temp);
   
    temperature = temperature.replace("{%tempmin%}", orgVal.main.temp_min);
     temperature = temperature.replace("{%tempmax%}", orgVal.main.temp_max);
    temperature = temperature.replace("{%location%}", orgVal.name);
    temperature = temperature.replace("{%country%}", orgVal.sys.country);
    temperature = temperature.replace("{%tepStatus%}", orgVal.weather.main);

    return temperature;
    
    
   
};





const server = http.createServer((req, res) => {
        if (req.url == "/") {
            request("https://api.openweathermap.org/data/2.5/weather?q=Lucknow&appid=f6b6f96be7d7f94a3c83ec1e113366cd")
.on("data" , (chuck) => {
    const objDate = JSON.parse(chuck);
    const arrData = [objDate];
  

    const realTimeDate = arrData.map((val) =>  replaceVal(indexFile, val)).join("");
        


    res.write(realTimeDate);
    
})

.on("end", (err) => {
    if (err) return console.log("nothing is here come back later !!" , err);
   
    res.end();  
});
        }
});


const port = process.env.PORT || 3000





server.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});