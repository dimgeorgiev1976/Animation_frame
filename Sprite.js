class Sprite {
    constructor (image, atlas, actionName) {
        this.image = image
        this.atlas = atlas
        this.actionName = actionName

        this.frameOrder = 0
        this.timer = 0

        this.x = 0
        this.y = 0
        this.width = 100
        this.height = 100
    }

    get action () {
        return this.atlas.actions.find(action => action.name === this.actionName)
    }

    get cooldown () {
        // если прошло достатачно време,  что бъй наш фрейм обновился
        return this.action.duration / this.action.frames.length
    }

    get frameId () {
        return this.action.frames[this.frameOrder]
    }

    get frame () {
        return this.atlas.frames.find(frame => frame.id === this.frameId )
    }

    tick (dTimestamp) {
        this.timer += dTimestamp

        if (this.timer >= this.cooldown) {
            // будет сбрасаваться, только сколько етой cooldown
            this.timer -= this.cooldown
            // Ордер увеличиваться на 1 но не больше чем количества
            this.frameOrder = (this.frameOrder + 1 ) % this.action.frames.length
        }
    }

    draw (context ) {
        context.drawImage(
            this.image,
            this.frame.x,
            this.frame.y,
            this.frame.width,
            this.frame.height,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }
}