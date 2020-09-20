const axios = require("axios")
const chalk = require("chalk")
const cheerio = require('cheerio')
const writefile = require("../utils/loader")
const metadata = require("../utils/metadata")

module.exports = {
    async getAllCourses() {

        try {
            const data = await axios.get('https://www.coursebuffet.com/')
            const $ = cheerio.load(data.data)
            const courses = []
            $('.resultlist-unitsmall').each(function (e) {
                let detail = {}
                detail.imageUrl = $(this).find('img.aalsi').attr('src')
                detail.college = $(this).find('span:nth-child(3)').text()
                detail.title = $(this).find('.rus-title').text()
                detail.coursecode = $(this).find('span:nth-child(4)').text()
                detail.calender = $(this).find('span:nth-child(5)').text()
                detail.url = $(this).find('a').attr('href')
                courses.push(detail)

            })
            await writefile('allcourses', courses)
            return courses
        } catch (error) {
            console.log(chalk.redBright('an Error occured in making the request to the server'))
            throw new Error(error)
        }
    },

    /**
     * @param {string} courseurl - course url
     */
    async getSingleCourse(courseurl) {
        try {
            const { data } = await axios.get(metadata.url + courseurl)
            const $ = cheerio.load(data)
            const details = {};
            details.title = $('.coursepage-coursetitle').text()
            details.course = $('.coursepage-coursenumber').text()
            details['course-tag'] = $('div.coursepage-titleblock > ul > li:nth-child(1)').text()
            details.school = $('div.coursepage-titleblock > ul > li:nth-child(2)').text()
            details.provider = $('div.coursepage-titleblock > ul > li:nth-child(3)').text()
            details.description = $('.coursedetails-description p').text()
            details.tags = $('.coursepage-extrainfo-coursetags a').text()
            details.instructor = $('#CourseInfo > ul:nth-child(1) > li:nth-child(1)').text().replace('Instructor(s)', '')
            details['start-data'] = $('#CourseInfo > ul:nth-child(2) > li:nth-child(1)').text().replace('Start Date', '')
            details['duration'] = $('#CourseInfo > ul:nth-child(2) > li:nth-child(2)').text().replace('Duration', '')
            return details
        } catch (error) {
            console.log(error)
        }
    }
}