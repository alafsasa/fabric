import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { fabric } from 'fabric';
import { ColorPicker, useColor } from 'react-color-palette';
import 'react-color-palette/lib/css/styles.css';

//global
var isSelectedFlag = false;
var drawRectFlag = false;
var drawTriangleFlag = false;
var drawCircleFlag = false;
var drawStraightLineFlag = false;
var drawDashedLineFlag = false;
//var drawFreeHandFlag = false;

function App() {
  const [paper, setPaper] = useState(null);
  const [color, setColor] = useColor("hex", "#1034a6");
  const [spinNumber, setSpinNumber] = useState(0);
  //const [imagepreview, setImagePreview] = useState('');
  const kanvas = useRef();

  //get canvas
  function exposeCanvas(canvas){
    //console.log(x)
    setPaper(canvas);
  }
  //logic
  useEffect(()=>{
    var canvas = new fabric.Canvas(kanvas.current, {backgroundColor: '#ddd', isDrawingMode: false});
    //make canvas publicly available
    exposeCanvas(canvas);
    //draw shapes
    //use canvas
    var isDown = false;
    var originX, originY, rect, ellipse, triangle, line = null;
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
      var points = [pointer.x, pointer.y, pointer.x, pointer.y];
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
            fill: 'red',
            stroke: '',
            strokeWidth: 5
          });
          canvas.add(rect);
        }
        //draw triangle
        if(drawTriangleFlag){
          //logic
          //set other to false;
          triangle = new fabric.Triangle({
            left: pointer.x,
            top: pointer.y,
            strokeWidth: 2,
            width: pointer.x-originX,
            height: pointer.y-originY,
            stroke: 'green',
            fill: 'yellow',
            originX: 'center'
          });
          canvas.add(triangle);
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
        //draw straight line
        if(drawStraightLineFlag){
          //logic
          line = new fabric.Line(points, {
            strokeWidth: 4,
            fill: 'red',
            stroke: 'red',
            originX: 'center',
            originY: 'center'
          });
          canvas.add(line);
        }
        //draw dashed line
        if(drawDashedLineFlag){
          //logic
          line = new fabric.Line(points, {
            fill: 'red',
            stroke: 'red',
            originX: 'center',
            originY: 'center',
            strokeWidth: 4,
            strokeDashArray: [15, 4]
          });
          canvas.add(line);
        }
        //free hand drawing
        //if(drawFreeHandFlag){
        //  //logic
        //  console.log('active')
        //  canvas.isDrawingMode = true;
        //  //set properties
        //  canvas.freeDrawingBrush.width = 8;
        //  canvas.freeDrawingBrush.color = 'red';
        //}else{
        //  canvas.isDrawingMode = false;
        //}
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
          if(triangle === null){
            return;
          }
          //logic else
          triangle.set({width: Math.abs(originX - pointer.x), height: Math.abs(originY - pointer.y)});
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
        //draw straight line
        if(drawStraightLineFlag){
          //logic
          if(line === null){
            return;
          }
          //else
          line.set({x2: pointer.x, y2: pointer.y});
        }
        //draw dashed line
        if(drawDashedLineFlag){
          //logic
          if(line === null){
            return;
          }
          //else
          line.set({x2: pointer.x, y2: pointer.y});
        }
        //free hand drawing
        //if(drawFreeHandFlag){
        //  //logics
        //  console.log('moving')
        //  canvas.isDrawingMode = true;
        //  canvas.freeDrawingBrush.width = 5;
        //  canvas.freeDrawingBrush.color = "#1034a6";
        //  canvas.on('path:created', (e) =>{
        //    e.path.set();
        //  });
        //  //
        //}else{
        //  canvas.isDrawingMode = false;
        //}
      }
      canvas.renderAll();
    });
    //mouse up
    canvas.on('mouse:up', (o)=>{
      isDown = false;
    });

    //some stuff
    console.log('render');
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
  if(paper !== null){
    paper.isDrawingMode = false;
  }
  function isSelected(){
    //logic
    //if selected on this handler is clicked
    isSelectedFlag = true;
    drawRectFlag = false;
    drawTriangleFlag = false;
    drawCircleFlag = false;
    //log active object or objects
    paper.isDrawingMode = false;
  }
  //delete objects
  const deleteObj = () => {
    //paper.remove(paper.getActiveObject());
    //var activeObject = paper.getActiveObject();
    var activeGroupObjects = paper.getActiveObjects();
    //console.log(activeGroupObjects.length);
    activeGroupObjects.forEach((obj)=>{
      paper.remove(obj);
    });
    //if(activeObject){
    //  console.log('single object');
    //}else if(activeGroupObjects){
    //  console.log('multiple objects');
    //}
  }
  //triangle
  const toggleTriangleFlag = () => {
    //logic
    drawTriangleFlag = true;
    drawRectFlag = false;
    drawCircleFlag = false;
    drawStraightLineFlag = false;
    drawDashedLineFlag = false;
    //drawFreeHandFlag = false;
    paper.isDrawingMode = false;
  }
  //unit test
  function testMe(){
    //logic
    console.log(drawRectFlag);
    console.log(drawTriangleFlag);
    console.log(drawCircleFlag);
    console.log(drawStraightLineFlag);
  }
  const drawRect = () => {
    //logic
    drawRectFlag = true;
    drawTriangleFlag = false;
    drawCircleFlag = false;
    drawStraightLineFlag = false;
    drawDashedLineFlag = false;
    //drawFreeHandFlag = false;
    paper.isDrawingMode = false;
  }
  const toggleCircle = () => {
    //logic
    drawCircleFlag = true;
    drawRectFlag = false;
    drawTriangleFlag = false;
    drawStraightLineFlag = false;
    drawDashedLineFlag = false;
    //drawFreeHandFlag = false;
    paper.isDrawingMode = false;
  }
  //straight line
  const toggleStraightLine = () => {
    //logics
    drawStraightLineFlag = true;
    drawRectFlag = false;
    drawTriangleFlag = false;
    drawCircleFlag = false;
    drawDashedLineFlag = false;
    //drawFreeHandFlag = false;
    paper.isDrawingMode = false;
  }

  //draw dashed line
  const toggleDashedLineFlag = () => {
    //logics
    drawDashedLineFlag = true;
    drawStraightLineFlag = false;
    drawRectFlag = false;
    drawTriangleFlag = false;
    drawCircleFlag = false;
    //drawFreeHandFlag = false;
    paper.isDrawingMode = false;
  }
  
  //draw free hand
  const toggleDrawFreeHand = () => {
    //logics
    paper.isDrawingMode = true;
    //add pencil properties
    paper.freeDrawingBrush.width = 8;
    paper.freeDrawingBrush.color = '#f4a946'

    //drawFreeHandFlag = true;
    drawStraightLineFlag = false;
    drawRectFlag = false;
    drawTriangleFlag = false;
    drawCircleFlag = false;
    drawDashedLineFlag = false;
  }

  //add Text
  const toggleAddText = () => {
    //logics
    const text = new fabric.IText('Tap & Type', {
      left: 50,
      top: 100,
      fontFamily: 'sans-serif',
      fill: 'black',
      fontSize: 24
    });
    paper.add(text)

    //disable all other
  }

  //add image
  const toggleAddImage = () => {
    //logics
  }

  //handle image
  const handleImage = (e) => {
    //logics
    console.log(e.target.files[0]);
    console.log(URL.createObjectURL(e.target.files[0]));
    //setImagePreview(URL.createObjectURL(e.target.files[0]))
    //add this image to the canvas
    //const snap = new fabric.Image()
    const output = new Image();
    output.src = URL.createObjectURL(e.target.files[0])
    //console.log(output)
    output.onload = () => {
      const snap = new fabric.Image(output, {
        left: 0,
        top: 0,
        scaleX: .25,
        scaleY: .25
      });
      paper.add(snap);
    }
    //free memory
    URL.revokeObjectURL(output.src);
  }

    //save canvas to image - jpeg or png
    const saveCanvasToImage = () => {
      //logics
      //full quality
      const dataURL = paper.toDataURL("image/jpeg", 0.5);
      //medium quality
      //const mediumQuality = paper.toDataURL('image/jpeg', 0.5);
      //low quality
      //const lowQuality = paper.toDataURL('image/jpeg', 0.1);
      console.log(dataURL);
      //save dataurl to file
      const a = document.createElement('a');
      a.href = dataURL;
      a.download = 'lueminour.jpeg';
      a.click()
    }

    //MANIPULATE OBJECTS ON CANVAS
    //change background/fill color
    const changeObjFill = () => {
      //logics
      //console.log(paper.getActiveObject().fill);
      if(paper.getActiveObject() === null || paper.getActiveObject() === undefined){
        return;
      }
      paper.getActiveObject().set({fill: color.hex});
      paper.renderAll();
      //console.log(color.hex);
    }
    //change stroke color
    const changeObjStroke = () => {
      //logics
      if(paper.getActiveObject() === null || paper.getActiveObject() === undefined){
        return;
      }
      paper.getActiveObject().set({stroke: color.hex});
      paper.renderAll();
    }
    //change stroke width
    const changeStrokeWidth = () => {
      //logics
      if(paper.getActiveObject() === null || paper.getActiveObject() === undefined){
        return;
      }
      console.log(spinNumber)
      paper.getActiveObject().set({strokeWidth: spinNumber});
      paper.renderAll();
    }
    //spin number
    const minusSpinNumber = () => {
      //logics
      if(spinNumber !== 0){
        setSpinNumber(spinNumber - 1);
      }
    }
  return (
    <div className="container">
      <div className='row'>
        <div className='col-sm-12'>
          <div className='display-4'>Lueminour</div>
          <div className='display-3'>FabricJs Meme Creator</div>
          <canvas ref={kanvas} width={500} height={500}></canvas>
          <div className='mt-3'>
            <button className='btn btn-info' onClick={isSelected}>Select Objects</button>
            <button className='btn btn-danger' onClick={deleteObj}>Delete</button>
            <button className='btn btn-success' onClick={toggleTriangleFlag}>Triangle</button>
            <button className='btn btn-warning' onClick={testMe}>Test</button>
            <button className='btn btn-info' onClick={drawRect}>Draw Rectangle</button>
            <button className='btn btn-warning' onClick={toggleCircle}>Circle</button>
            <button className='btn btn-info' onClick={toggleStraightLine}>Straight Line</button>
            <button className='btn btn-info' onClick={toggleDashedLineFlag}>Dashed Line</button>
            <button className='btn btn-secondary' onClick={toggleDrawFreeHand}>Free Hand Drawing</button>
            <button className='btn btn-secondary' onClick={toggleAddText}>Add Text</button>
            <button className='btn btn-info' onClick={toggleAddImage}>Add Image</button>
            <button className='btn btn-success' onClick={saveCanvasToImage}>Save</button>
          </div>
          <div>
            <div>
              <input type='file' accept='image/*' onChange={handleImage} className='form-control'/>
            </div>
          </div>
          <div> 
            <h4>Properties</h4>
            <div>
              <div>
              </div>
              <div>
                <ColorPicker width={400} height={100} color={color} onChange={setColor} hideHSV hideRGB dark />
              </div>
              <div className='m-3'>
                <p onClick={changeObjFill}>fill <span style={{padding: '4px 32px', backgroundColor: color.hex}}></span></p>
                <p onClick={changeObjStroke}>stroke <span style={{padding: '4px 32px', backgroundColor: color.hex}}></span></p>
                <div>
                  <button className='btn btn-info' onClick={minusSpinNumber}>-</button>
                  <button className='btn btn-secondary'>{spinNumber}</button>
                  <button className='btn btn-info' onClick={()=>{setSpinNumber(spinNumber + 1)}}>+</button>
                </div>
                <p onClick={changeStrokeWidth}>strokeWidth</p>
              </div>
              <div>
                <p>Text Formatting</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
