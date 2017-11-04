const express = require('express')
const cheerio = require('cheerio')
const request = require("tinyreq")
const fs = require('fs')
const _ = require('lodash')
const uuid = require('uuid/v4')
const async = require('async')


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
const DATA_URLS = [mental_models, decision_making, cognitive_bias]

const filterScrape = async (source, params) => {

    let filtered_data = {
        topics: [],
        content: [],
        additional_content: []
    }
    
    let response = await scrape(source)

    try {
        let $ = cheerio.load(response)
        
        params.forEach((elem) => {
            let headers = ['h1', 'h2', 'h3']
            if ($(elem) && headers.includes(elem)) {

                let topic = {}
                let content = {}
                let id = uuid()
                topic.id = id
                topic.text = $(elem).text()

                if ($(elem).closest('p')) {
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

            } else {

            }
        })
        
    }
    catch (err) {
        console.log(err)
    }
    
    return filtered_data
        
}

const scrape = (source) => {
    return new Promise((resolve, reject) => {
        request(source.url, function (err, body) {
            if (err) {
                reject(err)
                return
            }
            resolve(body)
        })
    })
}

const DATA = _.map(DATA_URLS, async (source) => {

    let params = ['h1', 'h2', 'h3', 'p']
    let new_data = await filterScrape(source, params)

    try {
        source.data = new_data
     }
     catch (err) {
         console.log(err)
     }
     
})
module.exports = DATA