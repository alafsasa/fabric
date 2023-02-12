import React, {useEffect, useRef} from 'react';
import './App.css';
import { fabric } from 'fabric';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowPointer, faBucket, faCircle, faDrawPolygon, faEraser, faImage, faPen, faSave, faSquare, faTextWidth, faTrash, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

function App() {
  //const [isRectActive, setIsRectActive] = useState(false);
  const kanvas = useRef();
  var isRectActive = false;
  //configure flags
  useEffect(()=>{
    var paper = new fabric.Canvas(kanvas.current, {backgroundColor: '#ddd'});
    var isDown = false;
    var origX, origY, rect;
    //mousedown
    paper.on('mouse:down', (o)=>{
      var pointer = paper.getPointer(o.e);
      //console.log(pointer)
      isDown = true;
      origX = pointer.x;
      origY = pointer.y;
      console.log(isRectActive)
      //check if rectangle is active
      if(isRectActive === true){
        rect = new fabric.Rect({
          left: origX,
          top: origY,
          fill: '',
          stroke: 'red',
          strokeWidth: 2
        });
        paper.add(rect);
      }
    });
    //mousemove
    paper.on('mouse:move', (o)=>{
      if(!isDown){return;}
      var pointer = paper.getPointer(o.e);
      //check is rect is active
      if(isRectActive === true){
        if(origX > pointer.x){
          rect.set({left: Math.abs(pointer.x)});
        }
        if(origY > pointer.y){
          rect.set({top: Math.abs(pointer.y)});
        }
        //otherwise
        rect.set({width: Math.abs(origX - pointer.x)});
        rect.set({height: Math.abs(origY - pointer.y)});
        paper.renderAll();
      }
    });
    //mouse up
    paper.on('mouse:up', (o)=>{
      isDown = false;
    });
  }, [isRectActive]); //the second empty array ensure we execute the function only once
  //set flag functions
  function activateRect(){
    isRectActive = true;
  }
  return (
    <div className="container">
      <div className='row'>
        <div className='col-sm-12'>
          <div className='display-4 text-center'>FabricJs - Meme Creator</div>
          <canvas ref={kanvas} className="cv" height={700} width={700}></canvas>
          <div className='mt-3 bg-info'>
            <button className='btn' onClick={activateRect}>
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
              <FontAwesomeIcon icon={faArrowPointer} size="2x" /> Select
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
