import React from 'react'

import '../styles/toolBar.scss'
import toolState from '../store/toolState.js'
import Brush from '../tools/Brush.js'
import Rect from '../tools/Rect.js'
import Circle from '../tools/Circle.js'
import Eraser from '../tools/Eraser.js'
import Line from '../tools/Line.js'
import canvasState from '../store/canvasState'

const ToolBar = () => {

  const changeColor = e => {
    toolState.setColor(e.target.value)
  }

  return (
    <div className='tool-bar'>
      <button
        className='tool-bar__btn brush'
        onClick={() => {
          toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionId))
          toolState.setColor(toolState.color || "black")
        }}
      />
      <button
        className='tool-bar__btn rect'
        onClick={() => {
          toolState.setTool(new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionId))
          toolState.setColor(toolState.color || "black")
        }}
      />
      <button
        className='tool-bar__btn circle'
        onClick={() => {
          toolState.setTool(new Circle(canvasState.canvas, canvasState.socket, canvasState.sessionId))
          toolState.setColor(toolState.color || "black")
        }}
      />
      <button
        className='tool-bar__btn eraser'
        onClick={() => {
          toolState.setTool(new Eraser(canvasState.canvas, canvasState.socket, canvasState.sessionId))
          toolState.setColor("white")
        }}
        />
      <button
        className='tool-bar__btn line'
        onClick={() => {
          toolState.setTool(new Line(canvasState.canvas, canvasState.socket, canvasState.sessionId))
          toolState.setColor(toolState.color || "black")
        }}
      />
      <input
        type='color'
        style={{
          marginLeft: '10px'
        }}
        onChange={(e) => changeColor(e)}
      />
      <button
        className='tool-bar__btn undo'
        onClick={() => canvasState.undo()}
      />
      <button
        className='tool-bar__btn redo'
        onClick={() => canvasState.redo()}
      />
      <button className='tool-bar__btn save'/>
    </div>
  )
}

export default ToolBar