const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

let sprite = null
let pTimestamp = 0
init()

async function init() {
    canvas.width = 500
    canvas.height = 500

    sprite = new Sprite(
        await getImage('spritesheet.png'),
        await getJSON('atlas.json'),
        "moveLeft" 
     )

    sprite.width = sprite.frame.width / 3
    sprite.height = sprite.frame.height / 3


    requestAnimationFrame(loop)
}

function loop (timestamp) {
    const dTimestamp = timestamp - pTimestamp
    // циклично въйзъйвает самой себя
    requestAnimationFrame(loop)
    // очишаем canvas
    canvas.width |= 0

    sprite.x += 1
    sprite.tick(dTimestamp)

    sprite.draw(context)

    pTimestamp = timestamp

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

