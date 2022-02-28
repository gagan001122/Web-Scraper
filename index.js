const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

async function getPriceFeed(){
    try{
        const siteUrl = 'https://coinmarketcap.com/'
        const {data} = await axios({
            method: "GET",
            url: siteUrl,
        })

        const $ = cheerio.load(data) 
        const elemSelector = '#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div:nth-child(1) > div.h7vnx2-1.bFzXgL > table > tbody > tr'
    
        const keys = [
            'rank',
            'name',
            'price',
            '24h',
            'marketCAp',
            'volume',
            'circulatingSupply'
        ]

        coinArr=[]

        $(elemSelector).each((parentIdx,parentElem)=>{
            let keyIdx=0
            const coinobj = {}
        if(parentIdx<=9){
            $(parentElem)``.children().each((childIdx,childElem)=>{
                let tdValue = $(childElem).text()
                if(keyIdx===1 || keyIdx===6){
                    console.log(
                    tdValue = $('p:first-child',$(childElem).html()).text()
                        )
                }
                if(tdValue){
                    coinobj[keys[keyIdx]] = tdValue
                    keyIdx++
                }
            })
            coinArr.push(coinobj)
        }
    })
    return coinArr
    }
    catch(err){
        console.error(err)
    }
}

const app = express()

app.get('/api/price-feed',async(req,res)=>{
    try{
        const priceFeed = await getPriceFeed()
        return res.status(200).json({
            result: priceFeed,
        })
       
    }

  
    catch(err){
        return res.status(500).json({
            err: err.toSring(),
        })
    }
})

app.listen(9000)

