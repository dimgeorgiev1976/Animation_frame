
const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

let sprite = null
let keyboard = null
let pTimestamp = 0

init()

async function init() {
    canvas.width = 500
    canvas.height = 500

    sprite = new Sprite(
        // Oжидаемся загрузке image и atlas.json
        await getImage('spritesheet.png'),
        await getJSON('atlas.json'),

        "moveRight",
        "moveLeft",
        "moveUp",
        "moveDown",
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

    // sprite.x += 1
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

document.body.addEventListener('keydown', function (event) {

    switch (event.code ) {
        case "KeyA":
            sprite.actionName = 'moveLeft'
            sprite.x = sprite.x - 1

            break

        case 'KeyD':
            sprite.actionName = 'moveRight'
            sprite.x = sprite.x + 1
            break

        case 'KeyW':
            sprite.actionName = 'moveUp'
            sprite.y  = sprite.y - 1
            break

        case 'KeyS':
            sprite.actionName = 'moveDown'
            sprite.y  = sprite.y + 1
            break
        }
    })
