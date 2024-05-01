const xd = require('./index')

async function getData() {
    xd.channels({country:'usa',page:1}).then((data)=>console.log(data))
}

getData()
