const express = require('express')
const cheerio = require('cheerio')
const request = require("tinyreq")
const fs = require('fs')
const _ = require('lodash')
const uuid = require('uuid/v4')


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


const filterScrape = (source, params) => {

    // Data template to return
    let filtered_data = {
        topics:[],
        content:[],
        additional_content:[]
    }
    console.log(filtered_data)

    // Run the scrape function and wait till it resolves
    scrape(source, params)
        .then((body) => {

            let $ = cheerio.load(body)
        
            params.forEach((elem) => {
                let headers = ['h1', 'h2', 'h3']
                if ($(elem) && headers.includes(elem)){
        
                    let topic = {}
                    let content = {}
                    let id = uuid()
                    topic.id = id
                    topic.text = $(elem).text()
        
                    if($(elem).closest('p')){
                        content.text = $(elem).closest('p').text()
                        content.id = id
                    }
                    filtered_data.topics.push(topic)
                    filtered_data.content.push(content)
                } else if ($(elem) && !headers.includes(elem)) {
        
                    let content = {}
                    let id = uuid()
                    content.text = $(elem).text()
                    content.id = id
                    filtered_data.additional_content.push(content)
        
                } else { }
            })
            // console.log(filtered_data)

            return filtered_data

        }).then((fd) => {
            console.log('fd: ' + fd)
            source.data = fd
            return fd
        })
        
}

const scrape = (source) => {
    return new Promise((resolve, reject) => {
        request(source.url, function (err, body) {
            if (err){ 
                reject(err)
                return
            }
            resolve(body)
        })
    })
}

DATA_URLS.forEach(function(source){
    let params = ['h1', 'h2', 'h3', 'p']
    filterScrape(source, params)
})

console.log(DATA_URLS)


