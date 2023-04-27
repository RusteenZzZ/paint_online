import { makeAutoObservable } from 'mobx'

class CanvasState {
  canvas = null
  socket = null
  sessionId = null
  undoList = []
  redoList = []
  username = ""

  constructor() {
    makeAutoObservable(this)
  }

  setSessionId(sessionId) {
    this.sessionId = sessionId
  }

  setSocket(socket) {
    this.socket = socket
  }

  setUsername(username) {
    this.username = username
  }

  setCanvas(canvas) {
    this.canvas = canvas
  }

  pushToUndo(data) {
    this.undoList.push(data)
  }

  pushToRedo(data) {
    this.redoList.push(data)
  }

  undo() {
    const ctx = this.canvas.getContext('2d')
    if(this.undoList.length > 0) {
      this.pushToRedo(this.canvas.toDataURL())
      const dataUrl = this.undoList.pop()
      const img = new Image()
      img.src = dataUrl
      img.onload = () => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      }
    }
  }

  redo() {
    const ctx = this.canvas.getContext('2d')
    if(this.redoList.length > 0) {
      this.pushToUndo(this.canvas.toDataURL())
      const dataUrl = this.redoList.pop()
      const img = new Image()
      img.src = dataUrl
      img.onload = () => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      }
    }
  }
}

export default new CanvasState()