import React, {useEffect, useRef} from 'react';
import './App.css';
import { fabric } from 'fabric';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBucket, faCircle, faDrawPolygon, faEraser, faImage, faPen, faSave, faSquare, faTextWidth, faTrash, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

function App() {
  const kanvas = useRef();
  useEffect(()=>{
    //if(kanvas.current){
    //  const canvas = kanvas.current;
    //  //console.log(canvas)
    //  const c = new fabric.Canvas(canvas, {backgroundColor: '#ddd'});
    //  c.selection = false;
    //  //const rect, isDown, origX, origY = true;
    //  function drawRectangle(){}
//
    //}
    let rect, isDown, origX, origY = true;
    let canvas = new fabric.Canvas(kanvas.current, {backgroundColor: '#ddd'});
    //mousedown
    canvas.on('mouse:down', (o)=>{
      isDown = true;
      const pointer = canvas.getPointer(o.e);
      origX = pointer.x;
      origY = pointer.y;
      //rect
      rect = new fabric.Rect({
        left: origX,
        top: origY,
        width: pointer.x-origX,
        height: pointer.y-origY,
        fill: 'red',
        stroke: 'blue',
        type: 'rect',
        strokeWidth: 2
      });
      canvas.add(rect);
    });
    //mousemove
    canvas.on('mouse:move', (o)=>{
      if(isDown){
        const pointer = canvas.getPointer(o.e);
        if(origX>pointer.x){
          rect.set({left: Math.abs(pointer.x)});
        }
        if(origY>pointer.y){
          rect.set({top: Math.abs(pointer.y)});
        }
        rect.set({width: Math.abs(origX-pointer.x)});
        rect.set({height: Math.abs(origY-pointer.y)});
      }
    });
    //mouseup
    canvas.on('mouse:up', (o)=>{
      isDown = false;
      
    });
  });
  return (
    <div className="container">
      <div className='row'>
        <div className='col-sm-12'>
          <div className='display-4 text-center'>FabricJs - Meme Creator</div>
          <canvas ref={kanvas} className="cv" height={700} width={700}></canvas>
          <div className='mt-3 bg-info'>
            <button className='btn'>
              <FontAwesomeIcon icon={faSquare} size="2x" /> Rectangle/Square
            </button>
            <button className='btn'>
              <FontAwesomeIcon icon={faTriangleExclamation} size="2x" /> Triangle
            </button>
            <button className='btn'>
              <FontAwesomeIcon icon={faCircle} size="2x" /> Circle
            </button>
            <button className='btn'>
              <FontAwesomeIcon icon={faPen} size="2x" /> Pen
            </button>
            <button className='btn'>
              <FontAwesomeIcon icon={faTextWidth} size="2x" /> Text
            </button>
            <button className='btn'>
              <FontAwesomeIcon icon={faImage} size="2x" /> Add Image
            </button>
            <button className='btn'>
              <FontAwesomeIcon icon={faEraser} size="2x" /> Erase
            </button>
            <button className='btn'>
              <FontAwesomeIcon icon={faBucket} size="2x" /> Color
            </button>
            <button className='btn'>
              <FontAwesomeIcon icon={faDrawPolygon} size="2x" /> Polygon
            </button>
            <button className='btn'>
              <FontAwesomeIcon icon={faTrash} size="2x" /> Delete
            </button>
            <button className='btn'>
              <FontAwesomeIcon icon={faSave} size="2x" /> Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
