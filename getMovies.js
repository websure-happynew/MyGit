const axios = require("axios");
const cheerio = require("cheerio");
async function getMoviesHTML() {
    const resp = await axios.get("https://movie.douban.com/chart");
    return resp.data;
}
async function getMoviesData() {
    const html = await getMoviesHTML();
    const $ = cheerio.load(html);
    let trs = $('tr.item');
    let movie = [];
    for (let i = 0; i < trs.length; i++) {
        let tr = trs[i];
        let m = getMovie($(tr));
        movie.push(m);
    }
    return movie;

}
 function getMovie(tr) {
     let name=tr.find("div.pl2 a").text();
     name = name.replace(/\s/g, "");//去掉空白字符
    name = name.split("/")[0];
    var imgSrc = tr.find("a.nbg img").attr("src");
    var detail = tr.find("div.pl2 p.pl").text();
    return {
        name,
        imgSrc,
        detail
    }

}
module.exports =getMoviesData;