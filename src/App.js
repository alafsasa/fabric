import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { fabric } from 'fabric';


function App() {
  const [cv, setCv] = useState(null);
  const kanvas = useRef();

  function someFunc(x){
    //console.log(x)
    setCv(x);
  }
  //logic
  useEffect(()=>{
    var paper = new fabric.Canvas(kanvas.current, {backgroundColor: '#ddd'});
    //paper.add(new fabric.Rect({top: 100, left: 100, width: 100, height: 100, fill: 'red'}));
    someFunc(paper);

    //mousedown
    console.log('tracker - x1')
    paper.on('mouse:down', (o)=>{
      console.log('mouse down');
    });
    //mouse move
    //paper.on('mouse:move', (o)=>{
    //  console.log('mouse moving...🚶‍♂️');
    //})
    //mouseup
    paper.on('mouse:up', (o)=>{
      console.log('out');
    })


    //clear canvas
    return () => {
      if(paper){
        paper.dispose();
        paper = undefined;
      }
    }
  }, []);
  function drawRect(){
    const rect = new fabric.Rect({
      top: 100,
      left: 100,
      width: 100,
      height: 100,
      fill: 'red'
    });
    cv.add(rect)
  }
  function deleteObj(){
    console.log(cv)
  }
  function showSelectedObj(){
    console.log(cv.getActiveObject())
  }
  function purgeObj(){
    cv.remove(cv.getActiveObject());
  }
  return (
    <div className="container">
      <div className='row'>
        <div className='col-sm-12'>
          <div className='display-3'>FabricJs Meme Creator</div>
          <canvas ref={kanvas} width={500} height={500}></canvas>
          <div className='mt-3'>
            <button className='btn btn-primary' onClick={deleteObj}>Click me</button>
            <button className='btn btn-warning' onClick={drawRect}>Add Rect</button>
            <button className='btn btn-info' onClick={showSelectedObj}>Active</button>
            <button className='btn btn-danger' onClick={purgeObj}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
