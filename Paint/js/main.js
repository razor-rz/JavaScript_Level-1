let canvas = document.querySelector('#canv')
let ctx = canvas.getContext('2d')

let xCoord = document.querySelector('#x-coord')
let yCoord = document.querySelector('#y-coord')

let editor = {
    container: '#paint',
    width: canvas.getAttribute('width'),
    height: canvas.getAttribute('height'),
    currentTool: null,
    "current-color": '#000',
    "current-size": 5,
    x: 0,
    y: 0,


    _init() {
        document.querySelector(this.container).addEventListener('input', this.inputHandler)
        document.querySelector(this.container).addEventListener('click', this.clickHandler)

        canvas.addEventListener('mousemove', this.getCoordinates)
        canvas.addEventListener('mousedown', this.startDraw)
        canvas.addEventListener('mouseup', this.endDraw)
    },
    getCoordinates(evt) {
        editor.x = evt.offsetX
        editor.y = evt.offsetY

        xCoord.innerText = editor.x
        yCoord.innerText = editor.y
    },
    clickHandler(evt) {
        if (evt.target.name === 'tool-button') {
            editor.currentTool = evt.target.dataset.name
        }
    },
    inputHandler(evt) {
        if (evt.target.name === 'input-obj') {
            editor[`current-${evt.target.dataset.name}`] = evt.target.value
            evt.target.dataset.name === 'color' ? ctx.fillStyle = editor['current-color'] : ctx.fillStyle = ctx.fillStyle
        }
    },
    startDraw() {
        if (editor.currentTool === 'pencil') editor._drawPencil()
        if (editor.currentTool === 'brush') editor._drawBrush()
        if (editor.currentTool === 'circle') editor._drawCircle()
        if (editor.currentTool === 'ellipse') editor._drawEllipse()
        if (editor.currentTool === 'eraser') editor._clearEraser()
        if (editor.currentTool === 'gradient') editor._drawGradient()

    },
    endDraw() {
        canvas.onmousemove = null
    },
    _drawPencil() {
        canvas.onmousemove = () => {
            ctx.fillRect(editor.x, editor.y, editor['current-size'], editor['current-size'])
        }
    },
    _clearEraser() {
        canvas.onmousemove = () => {
            ctx.clearRect(editor.x, editor.y, editor['current-size'], editor['current-size'])
        }
    },
    _drawBrush() {
        canvas.onmousemove = () => {
            ctx.beginPath()
            ctx.strokeStyle = editor['current-color']
            ctx.shadowColor = editor['current-color']
            ctx.shadowBlur = editor['current-size']
            ctx.moveTo(editor.x, editor.y)
            ctx.lineWidth = editor['current-size']
            ctx.lineCap = 'round'
            ctx.lineTo(editor.x, editor.y)
            ctx.stroke()
        }
    },
    _drawCircle() {
        canvas.onmousemove = () => {
            ctx.beginPath()
            ctx.strokeStyle = editor['current-color']
            ctx.arc(editor.x, editor.y, editor['current-size'], 0, 2 * Math.PI)
            ctx.stroke()
        }
    },
    _drawEllipse() {
        canvas.onmousemove = () => {
            ctx.beginPath()
            ctx.strokeStyle = editor['current-color']
            ctx.ellipse(editor.x, editor.y, editor['current-size'] / 2, editor['current-size'], Math.PI / 4, 0, 2 * Math.PI)
            ctx.stroke()
        }
    },
    _drawGradient() {
        canvas.onmousemove = () => {
            var grd = ctx.createLinearGradient(0, 0, editor.x, editor.y, )
            grd.addColorStop(0, editor['current-color'])
            grd.addColorStop(1, "white")

            ctx.fillStyle = grd
            ctx.fillRect(0, 0, 1000, 800)
        }
    },
}

document.getElementById('clear').onclick = function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

editor._init()
