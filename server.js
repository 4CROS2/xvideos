const xd = require('./index')

async function getData() {
    /* xd.channelDetails({
        path:'/sexmex_xxx',
        page:1
    }).then((data)=>console.log(data)) */
    await xd.videos.newFresh({page:2}).then((video)=>console.log(video))
}

getData()
