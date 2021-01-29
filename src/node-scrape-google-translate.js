/*
 * Scrape Google Translate
 * @author Fazxid | https://github.com/fazxid/google-translate-cli
 */

const puppeteer = require('puppeteer');

module.exports = class scrapeTranslate {

    constructor(config) {
        this.url = config.url;
        this.userAgent = config.userAgent;
    }

    browserSelector(sl, tl) {
        return `span[lang=${tl}] span[data-language-to-translate-into=${sl}] span`;
    }
    
    async scrape(sl, tl, text) {

        if (sl===undefined) return false;
        if (tl===undefined) return false;
        if (text===undefined) return false;

        var url = this.url.replace('{sl}', sl).replace('{tl}', tl).replace('{text}', text);
        var browser = await puppeteer.launch({
            devtools: false,
            headless: true
        });
        var page = await browser.newPage();
        await page.setUserAgent(this.userAgent);
        //page.on('console', consoleObj => console.log(consoleObj.text()));
        await page.goto(url);
        await page.setViewport({width: 1200, height: 800});

        var params={selector:this.browserSelector(sl, tl)};
        var pageEvaluate = await page.evaluate(async (params) => {
            return await new Promise((resolve, reject) => {

                    var selector, timeout=0;
                    setInterval(function(){
                        try {
                            selector = document.querySelector(params.selector).innerText;    
                            if (selector!=undefined && selector!=null) resolve(selector);
                            
                        } catch (err) { }
                        timeout++;
                        if (timeout>=60) resolve('ERR : query selector undefined');
                    }, 500);                                                  

                }, params)

                .catch(err => {
                    throw (err);

                })
                
        }, params);

        await browser.close();

        return pageEvaluate;

    }

}




