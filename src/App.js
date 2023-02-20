import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { fabric } from 'fabric';

//global
var isSelectedFlag = false;
var drawRectFlag = false;
var drawTriangleFlag = false;
var drawCircleFlag = false;

function App() {
  const [paper, setPaper] = useState(null);
  const kanvas = useRef();

  //get canvas
  function exposeCanvas(canvas){
    //console.log(x)
    setPaper(canvas);
  }
  //logic
  useEffect(()=>{
    var canvas = new fabric.Canvas(kanvas.current, {backgroundColor: '#ddd'});
    //make canvas publicly available
    exposeCanvas(canvas);
    //draw shapes
    //use canvas
    var isDown = false;
    var originX, originY, rect, ellipse = null;
    //mousedown
    canvas.on('mouse:down', (o)=>{
      isDown = true;
      var pointer = canvas.getPointer(o.e);
      //get active object
      var objChecker = canvas.getActiveObject();
      if(objChecker === null || objChecker === undefined){
        console.log('no obj')
        isSelectedFlag = true;
      }else{
        console.log('yes obj');
        isSelectedFlag = false;
      }
      originX = pointer.x;
      originY = pointer.y;
      //draw rect
      //console.log(drawRectFlag)
      if(isSelectedFlag){
        if(drawRectFlag){
          //set other to false
          rect = new fabric.Rect({
            left: originX,
            top: originY,
            width: pointer.x-originX,
            height: pointer.y-originY,
            fill: '',
            stroke: 'red',
            strokeWidth: 5
          });
          canvas.add(rect);
        }
        //draw triangle
        if(drawTriangleFlag){
          //logic
          //set other to false;
          console.log('draw triangle');
        }
        //draw circle/ellipse
        if(drawCircleFlag){
          //logic
          ellipse = new fabric.Ellipse({
            left: originX,
            top: originY,
            originX: 'left',
            originY : 'top',
            rx: pointer.x - originX,
            ry: pointer.y - originY,
            angle: 0,
            fill: '',
            stroke: 'blue',
            strokeWidth: 6
          });
          canvas.add(ellipse)
        }
      }
    });
    //mousemove
    canvas.on('mouse:move', (o)=>{
      if(!isDown) return;
      //else
      var pointer = canvas.getPointer(o.e);
      var objChecker = canvas.getActiveObject();
      if(objChecker === null || objChecker === undefined){
        console.log('no obj')
        isSelectedFlag = true;
      }else{
        console.log('yes obj');
        isSelectedFlag = false;
      }
      if(isSelectedFlag){
        //draw rectangle
        if(drawRectFlag){
          if(originX > pointer.x){
            rect.set({left: Math.abs(pointer.x)});
          }
          if(originY > pointer.y){
            rect.set({top: Math.abs(pointer.y)});
          }
          rect.set({width: Math.abs(originX - pointer.x)});
          rect.set({height: Math.abs(originY - pointer.y)});
        }
        //draw triangle
        if(drawTriangleFlag){
          //logic
        }
        //draw circle/ellipse
        if(drawCircleFlag){
          //logic
          if(ellipse === null){
            return;
          }
          //else
          var rx = Math.abs(originX - pointer.x)/2;
          var ry = Math.abs(originY - pointer.y)/2;
          if(rx > ellipse.strokeWidth){
            rx -= ellipse.strokeWidth/2;
          }
          if(ry > ellipse.strokeWidth){
            ry -= ellipse.strokeWidth/2;
          }
          ellipse.set({rx: rx, ry: ry});
          if(originX > pointer.x){
            ellipse.set({originX: 'right'});
          }else{
            ellipse.set({originX: 'left'});
          }
          if(originY > pointer.y){
            ellipse.set({originY: 'bottom'});
          }else{
            ellipse.set({originY: 'top'});
          }
        }
      }
      canvas.renderAll();
    });
    //mouse up
    canvas.on('mouse:up', (o)=>{
      isDown = false;
    });

    //some stuff
    console.log('render')

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
    //logic
    //if selected on this handler is clicked
    isSelectedFlag = true;
    drawRectFlag = false;
    drawTriangleFlag = false;
    drawCircleFlag = false;
    //log active object or objects
    console.log(paper.getActiveObject())
  }
  //delete objects
  const deleteObj = () => {
    paper.remove(paper.getActiveObject());
  }
  //triangle
  const toggleTriangleFlag = () => {
    //logic
    drawTriangleFlag = true;
    drawRectFlag = false;
    drawCircleFlag = false;
  }
  //unit test
  function testMe(){
    //logic
    console.log(drawRectFlag);
    console.log(drawTriangleFlag);
  }
  const drawRect = () => {
    //logic
    drawRectFlag = true;
    drawTriangleFlag = false;
    drawCircleFlag = false;
  }
  const toggleCircle = () => {
    //logic
    drawCircleFlag = true;
    drawRectFlag = false;
    drawTriangleFlag = false;
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
            <button className='btn btn-info' onClick={drawRect}>Draw Rectangle</button>
            <button className='btn btn-warning' onClick={toggleCircle}>Circle</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
