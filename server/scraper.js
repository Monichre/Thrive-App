const express = require('express')
const cheerio = require('cheerio')
const request = require("tinyreq")
const _ = require('lodash')
const uuid = require('uuid/v4')
const Firebase = require('./Data/firebase')

const mental_models = {
    url: 'https://www.farnamstreetblog.com/mental-models/',
    id: uuid(),
    data: {}
}
const decision_making = {
    url: 'https://www.farnamstreetblog.com/smart-decisions/',
    id: uuid(),
    data: {}
}
const cognitive_bias = {
    url: 'https://betterhumans.coach.me/cognitive-bias-cheat-sheet-55a472476b18',
    id: uuid(),
    data: {}
}
const DATA_URLS = [mental_models, decision_making, cognitive_bias]
const createNewEnrichmentEntry = (source) => Firebase.database().ref(`enrichment-entries/${source.id}`)

const filterScrape = async(source, params) => {

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

    } catch (err) {
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
function storeEnrichmentEntries(source) {

    createNewEnrichmentEntry(source).set({
        topics: source.data.topics,
        content: source.data.content,
        additional_content: source.data.additional_content
       
      }).then((response) => {
          console.log(response)
      }, (error) => {
          console.log(error)
      })
      
}
async function initEnrichment(source, callback) {

    let params = ['h1', 'h2', 'h3', 'p']
    let new_data = await filterScrape(source, params)

    try {
        source.data = new_data
    } catch (err) {
        console.log(err)
    }

    storeEnrichmentEntries(source)
    return new_data
}

const DATA = DATA_URLS.map(async (source) => {

    let incoming_data
    try {
        incoming_data = await initEnrichment(source)
    }
    catch (err) {
        console.log(err)
    }
    source.data = incoming_data

    return source.data
    
})

console.log(DATA)

// setTimeout(function() {
//     console.log(DATA)
// }, 2000)