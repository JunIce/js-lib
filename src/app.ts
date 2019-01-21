
class Swiper {
    private index = 1
    private images: Array<string>
    private body = document.body
    private width: number = 400
    private height: number = 400
    private items: Array<any> = []
    private length: number
    private fagement = document.createDocumentFragment()
    private outBox: any
    private innerBox: any
    private timer: any = null

    constructor(images: Array<string>) {
        this.images = images
        this.length = images.length
    }

    init() {
        for(let i = 0; i < this.length; i++) {
            this.items[i] = this.createItem(i)
        }
        this.createWrap()
        this.autoPlay()

        this.boxOver()
    }

    createWrap() {
        let box = document.createElement('div')
        box.id = 'swiper-wrap'
        box.style.width = `${this.width}px`
        box.style.height = `${this.height}px`
        box.style.overflow = 'hidden'
        this.outBox = box

        let inner = document.createElement('div')
        inner.id = 'swiper-inner'
        inner.style.width = `${this.width * this.length}px`
        inner.style.height = `${this.height}px`
        inner.style.transition = 'transform 500ms ease'
        inner.style.transform = `translateX(-${this.width * (this.index - 1)}px)`
        this.innerBox = inner

        this.items.map(i => {
            inner.appendChild(i)
        })
        box.appendChild(inner)
        this.fagement.appendChild(box)
        this.body.appendChild(this.fagement)
    }

    createItem(id: number) {
        let item = document.createElement('div')
        item.style.width = `${this.width}px`
        item.style.height = `${this.height}px`
        item.style.overflow = 'hidden'
        item.style.cssFloat = 'left'
        
        let img = document.createElement('img') 
        img.src = this.images[id]
        img.id = `swiper-item-${id}`
        img.style.width = '100%'

        item.appendChild(img)
        return item
    }

    swipe(index: number) {
        let transWidth = this.width * (index - 1)
        this.innerBox.style.transform = `translateX(-${transWidth}px)`
    }

    autoPlay() {
        this.clearAutoPlay()
        this.timer = setTimeout(this.autoPlay.bind(this), 1500)
        if (this.index < 0) this.index = this.length
        if (this.index > this.length) this.index = 1
        this.swipe(this.index)
        this.index++
    }
    
    clearAutoPlay() {
        clearTimeout(this.timer)
    }

    boxOver() { // 鼠标悬停事件
        this.outBox.addEventListener('mouseover', this.clearAutoPlay.bind(this))
        this.outBox.addEventListener('mouseout', this.autoPlay.bind(this))
    }
}
let a = ['https://img2.woyaogexing.com/2019/01/19/e14a9faed0224df48eea2fda374188dc!400x400.jpeg',
'https://img2.woyaogexing.com/2019/01/19/f6eafbf085754068b166dd360174cccc!400x400.jpeg',
'https://img2.woyaogexing.com/2019/01/19/7d0003322dfa45be837ab93c76174f0d!400x400.jpeg']
let s = new Swiper(a)
s.init()