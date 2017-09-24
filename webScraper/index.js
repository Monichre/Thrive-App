const express = require('express')
const cheerio = require('cheerio')
const request = require("tinyreq")

const mental_models = {
    url: 'https://www.farnamstreetblog.com/mental-models/',
    data: {}
}
const decision_making = {
    url: 'https://www.farnamstreetblog.com/smart-decisions/',
    data: {}
}
const cognitive_bias = {
    url: 'https://betterhumans.coach.me/cognitive-bias-cheat-sheet-55a472476b18',
    data: {}
} 
const DATA_URLS = [ mental_models, decision_making, cognitive_bias ]

// function populateData(key, response_data) {
//     key.data = response_data
//     return 'success'
// }

function scrape(key, callback) {

    request(key.url, function (err, body) {

        if (err){ return callback(err) }

        // Parse the data
        key.data = body
    
        // return the data
        callback(null, body)
        
    })
}


(function(){

    let model_keys = Object.keys(DATA_URLS)
    
    DATA_URLS.forEach(function(item){
        console.log(item.url)

        scrape(item, (err, data) => {
            console.log( err || data)
        })

    })
})()



