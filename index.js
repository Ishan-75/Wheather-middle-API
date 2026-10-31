import cors from 'cors';
import express from 'express';

const app = express();
app.use(cors());
app.use(express.json());

async function getWheather(city) {
    const response = await fetch(
        `https://wttr.in/${city}?format=j1`
    );
    if (!response.ok) {
        console.log('error')
    }
    const data = await response.json();

    return data;
}

app.get('/wheather/:city', async function (req, res) {
    try {
        const city = req.params.city;
        const wheather = await getWheather(city);

        const result = {
            temperature: wheather.current_condition[0].temp_C,
            location: wheather.nearest_area[0].areaName[0].value,
            wheather_condition: wheather.current_condition[0].weatherDesc[0].value,
            latitude: wheather.nearest_area[0].latitude,
            longitude: wheather.nearest_area[0].longitude,

        }
        res.json(result)
    }
    catch (error) { 
        console.log(error)
    }
})

app.listen(8002, function () {
    console.log("server is running .....")
})