export default class Tool {
  constructor(canvas, socket, id) {
    this.canvas = canvas
    this.socket = socket
    this.id = id
    this.ctx = canvas.getContext('2d')
    this.destroyEvents()
  }

  setColor(color) {
    this.ctx.fillStyle = color
    this.ctx.strokeStyle = color
  }

  destroyEvents() {
    this.canvas.onmouseup = null
    this.canvas.onmousedown = null
    this.canvas.onmousemove = null
  }
}