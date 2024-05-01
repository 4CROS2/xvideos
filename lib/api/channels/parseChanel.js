const parseChannel = ($, channel) => {
    const data = $(channel)
    const path = data.find('.thumb a').attr('href')
    let thumbNail = data.find('.thumb a script').html().match(/<img src="(.*?)"/)[1]
    let name = data.find('.thumb .profile-name').text().trim().replace(/^#\d+\s+/g, '')
    const number = data.find('.thumb-under p span').text().trim()
    const thumbnailPartMatch = thumbNail.match(/\/([^/]+)\/[^/]+\.jpg$/)
    let thumbnailPart = null
    let thumbnailPath = null
    if (thumbnailPartMatch) {
        thumbnailPath = thumbnailPartMatch[1]
        const thumbnailSectionMatch = thumbnailPath.match(/^(\w\w)(\w\w)(\w\w)/)
        if (thumbnailSectionMatch) {
            thumbnailPart = thumbnailSectionMatch.slice(1).join('/')
        }
    }

    let preview = null
    if (thumbnailPart && thumbnailPath) {
        if (thumbnailPath.endsWith('-1')) {
            thumbnailPath = thumbnailPath.slice(0, -2)
        }
        preview = `https://cdn77-pic.xvideos-cdn.com/videos/videopreview/${thumbnailPart}/${thumbnailPath}_169.mp4`
    }else{
        preview = ''
    }
    let videoLength = number.match(/\d{1,3}(,\d{3})*|\d+/)
    if (number) {
        videoLength = parseInt(videoLength[0].replace(/,/g, ''))
    }else{
        videoLength = 0
    }

    return {
        path,
        thumbNail,
        name,
        preview,
        videoLength,
    }
}
module.exports = parseChannel