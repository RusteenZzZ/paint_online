import toolState from '../store/toolState.js'
import Tool from './Tool.js'

export default class Eraser extends Tool {
  constructor(canvas, socket, id) {
    super(canvas, socket, id)
    this.listen()
    this.ctx.lineWidth = 15
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
        type: "eraser_finish"
      }
    }))
  }

  mouseDownHandler(e) {
    this.mouseDown = true
    this.ctx.beginPath()
    this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
  }

  mouseMoveHandler(e) {
    if(this.mouseDown) {
      this.socket.send(JSON.stringify({
        method: "draw",
        id: this.id,
        figure: {
          type: "eraser",
          color: "white",
          x: e.pageX - e.target.offsetLeft,
          y: e.pageY - e.target.offsetTop
        }
      }))
    }
  }

  static draw(ctx, x, y) {
    ctx.strokeStyle = "white"
    ctx.lineTo(x, y)
    ctx.stroke()
  }
}