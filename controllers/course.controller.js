const axios = require("axios")
const cheerio = require('cheerio')
const writefile = require("../utils/loader")
const metadata = require("../utils/metadata")

module.exports = {
    async getAllCourses() {
        const data = await axios.get('https://www.coursebuffet.com/')
        const $ = cheerio.load(data.data)
        const courses = []
        $('.resultlist-unitsmall').each(function (e) {
            let detail = {}
            detail.imageUrl = $(this).find('img').attr('src')
            detail.college = $(this).find('span:nth-child(3)').text()
            detail.title = $(this).find('.rus-title').text()
            detail.coursecode = $(this).find('span:nth-child(4)').text()
            detail.calender = $(this).find('span:nth-child(5)').text()
            courses.push(detail)
        })
        writefile('allcourses', courses)
        return courses
    }
}