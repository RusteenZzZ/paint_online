import { makeAutoObservable } from "mobx"

class ToolState {
  tool = null
  color = null

  constructor() {
    makeAutoObservable(this)
  }

  setTool(tool) {
    this.tool = tool
  }

  setColor(color) {
    this.color = color
    this.tool.setColor(color)
  }
}

export default new ToolState()