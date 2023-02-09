import React, {useEffect, useRef} from 'react';
import './App.css';
import { fabric } from 'fabric';

function App() {
  const kanvas = useRef();
  useEffect(()=>{
    if(kanvas.current){
      const canvas = kanvas.current;
      //console.log(canvas)
      const c = new fabric.Canvas(canvas);
      const rect = new fabric.Rect({
        top: 100,
        left: 100,
        width: 60,
        height: 70,
        fill: 'red'
      });
      c.add(rect)
    }
  })
  return (
    <div className="container">
      <div className='row'>
        <div className='col-sm-12'>
          <div className='display-4 text-center'>FabricJs</div>
          <canvas ref={kanvas} className="cv" height={400} width={400}></canvas>
        </div>
      </div>
    </div>
  );
}

export default App;
