const parseVideo = ($, video) => {
    const data = $(video)
    const url = data.find('.thumb a').attr('href')
    const title = data.find('.title a').attr('title')
    const thumbNail = data.find('.thumb a img').attr('src')
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

    let preview = ''
    if (thumbnailPart && thumbnailPath) {
        const matchNumber = thumbnailPath.match(/-(\d+)$/)
        let numberToAdd = ''
        if (matchNumber) {
            numberToAdd = `-${matchNumber[1]}` 
            thumbnailPath = thumbnailPath.replace(/-\d+$/, '') 
        }
        preview = `https://cdn77-pic.xvideos-cdn.com/videos/videopreview/${thumbnailPart}/${thumbnailPath}_169${numberToAdd}.mp4`
    }
    const duration = data.find('.metadata .bg .duration').text()
    const channel = data.find('.metadata .name').text()
    return {
        title,
        duration,
        channel,
        thumbNail,
        preview,
        url,
    }
}
module.exports = parseVideo