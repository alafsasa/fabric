import React, { useEffect, useRef, useState} from 'react';
import './App.css';
import { fabric } from 'fabric';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function App() {
  //const [paper, setPaper] = useState('');
  const kanvas = useRef(null)
  //const [isRectActive, setIsRectActive] = useState(false);
  //const [toggle, setToggle] = useState(false);
  //const kanvas = useRef();
  //const y = useRef();
  //y.current = isRectActive;
  //configure flags
  useEffect(()=>{
    console.log('render')
    var paper = new fabric.Canvas(kanvas.current, {backgroundColor: '#ddd'});
    var isDown, objSelected = false;
    var originX, originY, rect, sl = null;
    
    //mouse down
    paper.on('mouse:down', (o)=>{
      //get mouse pos
      var pointer = paper.getPointer(o.e);
      //console.log(pointer)
      originX = pointer.x;
      originY = pointer.y;
      //set is down flag to 1
      isDown = true
      //if object is selected
      sl = paper.getActiveObject();
      if(sl === undefined || sl === null){
        console.log('no objects!')
        objSelected = false;
      }else{
        objSelected = true;
      }
      if(objSelected === false){
          //init rect
          rect = new fabric.Rect({
            left: originX,
            top: originY,
            fill:'',
            stroke: 'red',
            strokeWidth: 2,
          });
          paper.add(rect);
        }
    });
    //mouse move/drag
    paper.on('mouse:move', (o)=>{
      if(!isDown){
        return;
      }
      //else
      //get pointer pos
      var pointer = paper.getPointer(o.e);
      if(objSelected === false){
              //compare
      if(originX > pointer.x){
        rect.set({left: Math.abs(pointer.x)});
      }
      if(originY > pointer.y){
        rect.set({top: Math.abs(pointer.y)});
      }
      //otherwise
      rect.set({width: Math.abs(originX - pointer.x)});
      rect.set({height: Math.abs(originY - pointer.y)});
      paper.renderAll();
      }
    });
    //mouse up
    paper.on('mouse:up', (o)=>{
      isDown = false;
    });
    //unit test
  }, []); //the second empty array ensure we execute the function only once
  //delete objects
  const deleteObjects = () => {
    //logic
    //console.log(paper)
  }
  const testMe = () => {
    //logic
  }
  return (
    <div className="container">
      <div className='row'>
        <div className='col-sm-12'>
          <div className='display-4 text-center'>FabricJs - Meme Creator</div>
          <canvas ref={kanvas} width={700} height={700} className="cv"></canvas>
          <div className='mt-3 bg-info' onClick={deleteObjects}>
            <button className='btn'>
              <FontAwesomeIcon icon={faTrashAlt} size="2x" /> Delete objects
            </button>
            <button onClick={testMe}>test</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
