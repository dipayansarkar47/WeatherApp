const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
    console.log(req.body.cityName);
    const query = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=ea83c785ab736920bb9e96e7bcd0a66d";
    https.get(url, function(response){
        console.log(response);
    
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const temp_c = temp - 273.15;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = " http://openweathermap.org/img/wn/"+ icon +"@2x.png";
    
            res.write("<p>The weather is currently "+weatherDescription+"</p>");
            res.write("<h1>The temperature of "+query+" is "+Math.round(temp_c)+" degree Celcius</h1>");
            res.write("<img src="+imageURL+">");
            
            res.send();
        });
    })
})


app.listen(8000, () => {
    console.log("Server is running on port 3000");
})