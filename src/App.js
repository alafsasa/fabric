import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { fabric } from 'fabric';


function App() {
  const [paper, setPaper] = useState(null);
  const [triangleFlag, setTriangleFlag] = useState(false);
  const kanvas = useRef();
  var y = useRef();
  y = triangleFlag;

  //get canvas
  function exposeCanvas(canvas){
    //console.log(x)
    setPaper(canvas);
  }

  function x(){
    console.log('x-1')
    return y;
  }
  //logic
  useEffect(()=>{
    var canvas = new fabric.Canvas(kanvas.current, {backgroundColor: '#ddd'});
    //make canvas publicly available
    exposeCanvas(canvas);
    //draw shapes
    //use canvas
    var isDown = false;
    var originX, originY, rect = null;
    //mousedown
    canvas.on('mouse:down', (o)=>{
      isDown = true;
      var pointer = canvas.getPointer(o.e);
      originX = pointer.x;
      originY = pointer.y;
      console.log(x());
      //draw rect
      //rect = new fabric.Rect({
      //  left: originX,
      //  top: originY,
      //  width: pointer.x-originX,
      //  height: pointer.y-originY,
      //  fill: '',
      //  stroke: 'red',
      //  strokeWidth: 5
      //});
      //canvas.add(rect);
    });
    //mousemove
    canvas.on('mouse:move', (o)=>{
      if(!isDown) return;
      //else
      var pointer = canvas.getPointer(o.e);
      if(originX > pointer.x){
        rect.set({left: Math.abs(pointer.x)});
      }
      if(originY > pointer.y){
        rect.set({top: Math.abs(pointer.y)});
      }
      rect.set({width: Math.abs(originX - pointer.x)});
      rect.set({height: Math.abs(originY - pointer.y)});
      canvas.renderAll();
    });
    //mouse up
    canvas.on('mouse:up', (o)=>{
      isDown = false;
    });

    //some stuff
    //console.log(tFlag);

    //clear canvas
    return () => {
      if(canvas){
        canvas.dispose();
        canvas = undefined;
      }
    }
  }, []);

  //handlers
  //use paper
  function isSelected(){
    console.log(paper.getActiveObject())
  }
  //delete objects
  const deleteObj = () => {
    paper.remove(paper.getActiveObject());
  }
  //triangle
  const toggleTriangleFlag = () => {
    setTriangleFlag(true);
    //y = true;
  }
  //unit test
  function testMe(){
    console.log(triangleFlag)
  }
  return (
    <div className="container">
      <div className='row'>
        <div className='col-sm-12'>
          <div className='display-3'>FabricJs Meme Creator</div>
          <canvas ref={kanvas} width={500} height={500}></canvas>
          <div className='mt-3'>
            <button className='btn btn-info' onClick={isSelected}>is Selected</button>
            <button className='btn btn-danger' onClick={deleteObj}>Delete</button>
            <button className='btn btn-success' onClick={toggleTriangleFlag}>Triangle</button>
            <button className='btn btn-warning' onClick={testMe}>Test</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
