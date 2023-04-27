import React, { useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useParams } from 'react-router-dom'

import '../styles/canvas.scss'
import canvasState from '../store/canvasState'
import toolState from '../store/toolState'
import Brush from '../tools/Brush'
import Rect from '../tools/Rect'
import Circle from '../tools/Circle'
import Eraser from '../tools/Eraser'
import Line from '../tools/Line'

const Canvas = observer(() => {
  const canvasRef = useRef()
  const usernameRef = useRef()
  const [modal, setModal] = useState(true)
  const params = useParams()

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current)
  }, [])

  useEffect(() => {
    if(canvasState.username) {
      const socket = new WebSocket('ws://localhost:5000/')
      canvasState.setSocket(socket)
      canvasState.setSessionId(params.id)
      toolState.setTool(new Brush(canvasRef.current, socket, params.id))

      socket.onopen = () => {
        socket.send(JSON.stringify({
          id: params.id,
          username: canvasState.username,
          method: "connection"
        }))
      }
      socket.onmessage = (e) => {
        let msg = JSON.parse(e.data)
        switch (msg.method) {
          case "connection":
            console.log(`User ${msg.username} connected`)
            break
          case "draw":
            drawHandler(msg)
            break
        }
      }
    }
  }, [canvasState.username])

  const drawHandler = (msg) => {
    const figure = msg.figure
    const ctx = canvasRef.current.getContext('2d')
    toolState.setColor(figure.color)
    // console.log("Hmm");
    switch (figure.type) {
      case "brush":
        Brush.draw(ctx, figure.x, figure.y)
        break
      case "rect":
        Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height)
        break
      case "circle":
        Circle.staticDraw(ctx, figure.x, figure.y, figure.r)
        break
      case "eraser":
        ctx.lineWidth = 15
        Eraser.draw(ctx, figure.x, figure.y)
        break
      case "line":
        Line.staticDraw(ctx, figure.startX, figure.startY, figure.x, figure.y)
        break
      case "eraser_finish":
        ctx.lineWidth = 1
        ctx.beginPath()
        break
      case "finish":
        ctx.beginPath()
        break
    }
  }

  const mouseDownHandler = () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL())
  }

  const connectionHandler = () => {
    canvasState.setUsername(usernameRef.current.value)
    setModal(false)
  }

  return (
    <div className='canvas'>
      <Modal show={modal} onHide={() => {}}>
        <Modal.Header closeButton>
          <Modal.Title>Insert your name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input ref={usernameRef} type='text'></input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => connectionHandler()}>
            Enter
          </Button>
        </Modal.Footer>
      </Modal>
      <canvas onMouseDown={() => mouseDownHandler()} ref={canvasRef} width={600} height={400}/>
    </div>
  )
})

export default Canvas