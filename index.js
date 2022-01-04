const axios = require("axios")
const cheerio = require("cheerio")
const fs = require("fs")

const URL = "https://github.com/hflabs/city/blob/master/city.csv"

const start = async () => {
    const {data} = await axios.get(URL)
    const $ = cheerio.load(data)

    let russianCities = []
    for (let i = 2; i <= 1118; i++) {
        const address = $(`#LC${i}`).children().eq(1).text()
        const postal_code = $(`#LC${i}`).children().eq(2).text()
        russianCities.push({cityName: address, cityCode: postal_code})
        console.log(i)
    }
    fs.writeFileSync("russianCities.json", JSON.stringify(russianCities))
    console.log("READY")
}

start()