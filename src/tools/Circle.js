import Tool from './Tool.js'
import toolState from '../store/toolState.js'

export default class Circle extends Tool {
  constructor(canvas, socket, id) {
    super(canvas, socket, id)
    this.listen()
    this.ctx.lineWidth = 1
    this.setColor(toolState.savedColor || "black")
  }

  listen() {
    this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
  }

  mouseUpHandler(e) {
    this.mouseDown = false
    this.socket.send(JSON.stringify({
      method: "draw",
      id: this.id,
      figure: {
        type: "circle",
        color: toolState.color,
        x: this.startDrawX,
        y: this.startDrawY,
        r: this.radius
      }
    }))
    this.socket.send(JSON.stringify({
      method: "draw",
      id: this.id,
      figure: {
        type: "finish"
      }
    }))
  }

  mouseDownHandler(e) {
    this.mouseDown = true
    this.ctx.beginPath()
    this.startX = e.pageX - e.target.offsetLeft
    this.startY = e.pageY - e.target.offsetTop
    this.saved = this.canvas.toDataURL()
  }

  mouseMoveHandler(e) {
    if(this.mouseDown) {
      let currentX = e.pageX - e.target.offsetLeft
      let currentY = e.pageY - e.target.offsetTop
      this.radius = Math.sqrt((this.startX - currentX)*(this.startX - currentX) + (this.startY - currentY)*(this.startY - currentY)) / 2
      this.startDrawX = (this.startX + currentX) / 2
      this.startDrawY = (this.startY + currentY) / 2
      this.draw(this.startDrawX, this.startDrawY, this.radius)
    }
  }

  draw(x, y, r) {
    const img = new Image()
    img.src = this.saved
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      this.ctx.beginPath()
      this.ctx.arc(x, y, r, 0, 2 * Math.PI)
      this.ctx.fill()
      this.ctx.stroke()
    }
  }

  static staticDraw(ctx, x, y, r) {
    ctx.beginPath()
    ctx.arc(x, y, r, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()
  }
}