const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

let frame = null
let pTimestamp = 0
init()

async function init() {
    canvas.width = 500
    canvas.height = 500

    frame = new Frame(
        await getImage('spritesheet.png'),
        await getJSON('atlas.json'),
        "moveDown" 
     )

    frame.width = frame.frame.width / 3
    frame.height = frame.frame.height / 3


    requestAnimationFrame(loop)
}

function loop (timestamp) {
    const dTimestamp = timestamp - pTimestamp
    // циклично въйзъйвает самой себя
    requestAnimationFrame(loop)
    // очишаем canvas
    canvas.width = 0

    frame.tick(dTimestamp)

    frame.draw(context)

    // console.log(frame)

    // pTimestamp = timestamp

}
    // Возврашает изображение а и promise загружат картинку, ждат ейю загрузке 
    // на компютър
function getImage (src) {
    return new Promise (resolve => {
        const image = new Image
        image.onload = () => resolve (image)
        image.src = src
    }) 
}

function getJSON (src) {
    return new Promise(async resolve => {
        const request = await fetch(src)
        const json = await request.json()
        resolve(json)
    })
}

