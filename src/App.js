import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { fabric } from 'fabric';
import { ColorPicker, useColor } from 'react-color-palette';
import Modal from 'react-modal'
import 'react-color-palette/lib/css/styles.css';

//global
var isSelectedFlag = false;
var drawRectFlag = false;
var drawTriangleFlag = false;
var drawCircleFlag = false;
var drawStraightLineFlag = false;
var drawDashedLineFlag = false;
var cropImageFlag = false;
var selectionRect;
//var drawFreeHandFlag = false;
var imageObj;
var imageObjB;

//custom styles
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%'
  }
};

Modal.setAppElement('#root');

function App() {
  const [paper, setPaper] = useState(null);
  const [paperB, setPaperB] = useState(null);
  const [color, setColor] = useColor("hex", "#1034a6");
  const [spinNumber, setSpinNumber] = useState(0);
  const [selectedFont, setSelectedFont] = useState('sans-serif');
  const [selectedTextAlign, setSelectedTextAlign] = useState('left');
  const [selectedFontWeight, setSelectedFontWeight] = useState('normal');
  const [selectedFontSize, setSelectedFontSize] = useState(6);
  const [selectedLineHeight, setSelectedLineHeight] = useState(1)
  const [checkItalic, setCheckItalic] = useState(false);
  const [checkLineThrough, setCheckLineThrough] = useState(false);
  const [checkUnderline, setCheckUnderline] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  //const [imagepreview, setImagePreview] = useState('');
  const kanvas = useRef();
  const kanvasB = useRef();
  //get canvas
  function exposeCanvas(canvas){
    //console.log(x)
    setPaper(canvas);
  }
  //get canvasB
  function exposeCanvasB(canvasB){
    setPaperB(canvasB);
  }
  //logic
  useEffect(()=>{
    var canvas = new fabric.Canvas(kanvas.current, {backgroundColor: '#ddd', isDrawingMode: false});
    var canvasB = new fabric.Canvas(kanvasB.current, {backgroundColor: '#f4f8fb', isDrawingMode: false});
    canvasB.preserveObjectStacking = true;
    //make canvas publicly available
    exposeCanvas(canvas);
    exposeCanvasB(canvasB);
    //draw shapes
    //use canvas
    var isDown = false;
    var isDownB = false;
    var originX, originY, rect, ellipse, triangle, line = null;
    var crop = false;
    
    //draw a crop rectangle
    var rectangle = new fabric.Rect({
      fill: 'transparent',
      originX: 'left',
      originY: 'top',
      stroke: '#1034a6',
      strokeDashArray: [2, 2],
      opacity: 1,
      visible: false,
    });
    canvas.add(rectangle);
    canvasB.add(rectangle);
    //unit test
    //canvasB
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
        //crop drag rectangle
        //if(cropImageFlag){
        //  console.log('part of the deal');
        //  crop = true;
        //  //rectangleCrop = new fabric.Rect({
        //  //  left: originX,
        //  //  top: originY,
        //  //  width: pointer.x - originX,
        //  //  height: pointer.y - originY,
        //  //  fill: 'transparent',
        //  //  opacity: 1,
        //  //  stroke: '#1034a6',
        //  //  strokeDashArray: [2, 2],
        //  //});
        //  //canvas.add(rectangleCrop);
        //  //canvas.bringToFront(rectangleCrop);
        //  rectangle.left = originX;
        //  rectangle.top = originY;
        //  rectangle.visible = true;
        //  canvas.bringToFront(rectangle);
        //}
      }
      if(cropImageFlag){
        crop = true;
        rectangle.left = originX;
        rectangle.top = originY;
        rectangle.visible = true;
        canvas.bringToFront(rectangle);
        //canvasB.bringToFront(rectangle)
      }
    });
    canvasB.on('mouse:down', (o)=>{
      isDownB = true;
      var pointer = canvasB.getPointer(o.e);
      //var isSelectedObj = false;
      //var objChecker = canvasB.getActiveObject();
      //if(objChecker === null || objChecker === undefined){
      //  console.log('no obj');
      //  isSelectedObj = true;
      //}else{
      //  console.log('yes obj');
      //  isSelectedObj = false;
      //}
      //if(!isSelectedObj){
      //  //console.log(objChecker.width);
      //  objChecker.left = originX;
      //  objChecker.top = originY;
      //}
      originX = pointer.x;
      originY = pointer.y;
      if(cropImageFlag){
        crop = true;
        rectangle.left = originX;
        rectangle.top = originY;
        rectangle.visible = true;
        canvasB.bringToFront(rectangle);
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
        //draw crop rectangle area
        if(crop && cropImageFlag){
          //if(originX > pointer.y){
          //  rectangleCrop.set({left: Math.abs(pointer.x)});
          //}
          //if(originY > pointer.y){
          //  rectangleCrop.set({top: Math.abs(pointer.y)});
          //}
          //rectangleCrop.set({width: Math.abs(originX - pointer.x)});
          //rectangleCrop.set({height: Math.abs(originY - pointer.y)});
          if(originX > pointer.x){
            rectangle.set({left: Math.abs(pointer.x)});
          }
          if(originY > pointer.y){
            rectangle.set({top: Math.abs(pointer.y)});
          }
          rectangle.set({width: Math.abs(originX - pointer.x)});
          rectangle.set({height: Math.abs(originY - pointer.y)});
        }
      }
      canvas.renderAll();
      //canvasB.renderAll();
    });
    canvasB.on('mouse:move', (o)=>{
      if(!isDownB){
        return;
      }
      var pointer = canvasB.getPointer(o.e);
      originX = pointer.x;
      originY = pointer.y;
      //var isSelectedObj = false;
      //var objChecker = canvasB.getActiveObject();
      //if(objChecker === null || objChecker === undefined){
      //  console.log('no obj');;
      //  isSelectedObj = true;
      //}else{
      //  console.log('yes obj');
      //  isSelectedObj = false;
      //}
      //if(!isSelectedObj){
      //  //logics
      //  //console.log(objChecker);
      //  if(originX > pointer.x){
      //    objChecker.set({left: Math.abs(pointer.x)});
      //  }
      //  if(originY > pointer.y){
      //    objChecker.set({top: Math.abs(pointer.y)});
      //  }
      //  //objChecker.set({width: Math.abs(originX - pointer.x)});
      //  //objChecker.set({height: Math.abs(originY - pointer.y)});
      //  //console.log(Math.abs(objChecker.getScaledWidth()));
      //  //console.log(Math.abs(objChecker.getScaledHeight()));
      //  //objChecker.set({width: Math.abs(objChecker.getScaledWidth())});
      //  //objChecker.set({height: Math.abs(objChecker.getScaledHeight())});
      //}
      //get active object
      
      if(crop && cropImageFlag){
        if(originX > pointer.x){
          rectangle.set({left: Math.abs(pointer.x)});
        }
        if(originY > pointer.y){
          rectangle.set({top: Math.abs(pointer.y)});
        }
        rectangle.set({width: Math.abs(originX - pointer.x)});
        rectangle.set({height: Math.abs(originY - pointer.y)});
      }
      canvasB.renderAll();
    });
    //mouse up
    canvas.on('mouse:up', (o)=>{
      isDown = false;
      crop = false;
      //crop the obj
      //var left = rectangle.left - objLeft;
      //var top = rectangle.top - objTop;
      //left *= 1 / 0.25;
      //top *= 1 / 0.25;
//
      //var width = rectangle.width * 1 / 0.25;
      //var height = rectangle.height * 1 / 0.25;
//
      //imageObj.clipTo = (ctx) => { ctx.rect(left, top, width, height) };
      //imageObj.selectable = true;
      //rectangle.visible = false;
      //canvas.renderAll();
      if(imageObj !== undefined){
        //console.log(imageObj.left);
        var left = rectangle.left - imageObj.left;
        var top = rectangle.top - imageObj.top;
        left *= 1 / 0.25;
        top *= 1 / 0.25;
        var width = rectangle.width * 1 / 0.25;
        var height = rectangle.height * 1 / 0.25;
        imageObj.clipTo = (ctx) => {ctx.rect(left, top, width, height)};
        //imageObj.selectable = true
        canvas.renderAll();
      }
    });
    canvasB.on('mouse:up', ()=>{
      isDownB = false;
      crop = false;
    });

    //some stuff
    console.log('render');
    //clear canvas
    return () => {
      if(canvas){
        canvas.dispose();
        canvas = undefined;
      }
      //clear canvasB
      if(canvasB){
        canvasB.dispose();
        canvasB = undefined;
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
    cropImageFlag = false;
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
    cropImageFlag = false;
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
    cropImageFlag = false;
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
    cropImageFlag = false;
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
    cropImageFlag = false;
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
    cropImageFlag = false;
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
    cropImageFlag = false;
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
        top: 0
      });
      snap.scaleToWidth(500);
      snap.scaleToHeight(500);
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
    //TEXT FORMATTING
    //change font
    const handleSelectFont = (e) => {
      //logic
      setSelectedFont(e.target.value)
      //console.log(e.target.value.toLowerCase());
      //console.log(paper.getActiveObject());
      if(paper.getActiveObject() === null || paper.getActiveObject() === undefined){
        return;
      }
      paper.getActiveObject().set({fontFamily: e.target.value.toLowerCase()});
      paper.renderAll();
    }
    //align text
    const handleTextAlign = (e) => {
      //logic
      setSelectedTextAlign(e.target.value);
      if(paper.getActiveObject() === null || paper.getActiveObject() === undefined){
        return;
      }
      paper.getActiveObject().set({textAlign: e.target.value.toLowerCase()});
      paper.renderAll();
    }
    //font weight
    const handleFontWeight = (e) => {
      //logic
      setSelectedFontWeight(e.target.value);
      if(paper.getActiveObject() === null || paper.getActiveObject() === undefined){
        return;
      }
      paper.getActiveObject().set({fontWeight: e.target.value.toLowerCase()});
      paper.renderAll();
    }
    //font size
    const handleFontSize = (e) => {
      //logic
      setSelectedFontSize(e.target.value)
      //console.log(e.target.value);
      if(paper.getActiveObject() === null || paper.getActiveObject() === undefined){
        return;
      }
      paper.getActiveObject().set({fontSize: e.target.value});
      paper.renderAll();
    }
    //font color
    const handleFontColor = () => {
      //logic
      if(paper.getActiveObject() === null || paper.getActiveObject() === undefined){
        return;
      }
      paper.getActiveObject().set({fill: color.hex});
      paper.renderAll();
    }
    //line height
    const handleLineHeight = (e) => {
      //logic
      setSelectedLineHeight(e.target.value);
      if(paper.getActiveObject() === null || paper.getActiveObject() === undefined){
        return;
      }
      paper.getActiveObject().set({lineHeight: e.target.value});
      paper.renderAll();
    }
    //italic text
    const handleItalicText = (e) => {
      //logic      
      //console.log(e.target.checked);
      if(paper.getActiveObject() === null || paper.getActiveObject() === undefined){
        return;
      }
      if(checkItalic === false){
        setCheckItalic(true);
        paper.getActiveObject().set({fontStyle: 'italic'});
        paper.renderAll();
      }else{
        setCheckItalic(false);
        paper.getActiveObject().set({fontStyle: 'normal'});
        paper.renderAll();
      }
      console.log(e.target.checked);
    }
    //line/strike through
    const handleLineThrough = () => {
      //logic
      if(paper.getActiveObject() === null || paper.getActiveObject() === undefined){
        return;
      }
      if(checkLineThrough ===false){
        setCheckLineThrough(true);
        paper.getActiveObject().set({linethrough: true});
        paper.renderAll();
      }else{
        setCheckLineThrough(false);
        paper.getActiveObject().set({linethrough: false});
        paper.renderAll();
      }
    }
    //underline
    const handleUnderline = (e) => {
      //logic
      if(paper.getActiveObject() === null || paper.getActiveObject() === undefined){
        return;
      }
      if(checkUnderline ===false){
        setCheckUnderline(true);
        paper.getActiveObject().set({underline: true});
        paper.renderAll();
      }else{
        setCheckUnderline(false);
        paper.getActiveObject().set({underline: false});
        paper.renderAll();
      }
    }
    //CROP IMAGE IMPLEMENTATION
    const handleCropImage = () => {
      //logics
      cropImageFlag = true;
      drawStraightLineFlag = false;
      drawRectFlag = false;
      drawTriangleFlag = false;
      drawCircleFlag = false;
      drawDashedLineFlag = false;
      paper.isDrawingMode = false;
      console.log('cropping image');
    }
    const handleSelectCropObjects = () => {
      //logics
      imageObj = paper.getActiveObject();
      imageObj.selectable = false;
    }
    const handleCutOut = () => {
      //logics
      var cc = paper.getObjects();
      console.log(cc);
      var ImageWidth = imageObj.width/2;
      var ImageHeight = imageObj.height/2;
      var rectCL = cc[1].left;
      var rectCT = cc[1].top;
      var ln = 0;
      var tn = 0;
      if(rectCL < ImageWidth){
        ln = rectCL - ImageWidth;
      }else{
        ln = rectCL - ImageWidth;
      }
      if(rectCT < ImageHeight){
        tn = rectCT - ImageHeight;
      }else{
        tn = rectCT - ImageHeight;
      }
      //console.log(ImageWidth);
      //console.log(ImageHeight);
      //console.log('L',rectCL);
      //console.log('T', rectCT);
      console.log(ln);
      console.log(tn);
      let rectcrop = new fabric.Rect({
        left: ln,
        top:  tn,
        width: cc[1].width,
        height: cc[1].height
      });
      imageObj.clipPath = rectcrop;
      imageObj.selectable = true;
      //cc[1].visible = false;
       paper.renderAll();
    }
    const openModal = () => {
      setIsOpen(true);
      console.log(paper.getActiveObject());
      //define canvas logic
      //var kk = new fabric.Canvas(kanvasB.current, {backgroundColor: '#ddd'});
      //kk.set({backgroundColor: '#333'})
    }
    const closeModal = () => {
      setIsOpen(false);
    }
    //unit testing
    const handleKrop = () => {
      //krop logics
      console.log(paper.getActiveObject());
      paperB.add(paper.getActiveObject().set({selectable: false}));
      addSelectionRect();
      paperB.setActiveObject(selectionRect);
      paperB.centerObject(paperB.getObjects()[1]);
      paperB.renderAll();
      paper.remove(paper.getActiveObject());
      paper.renderAll();
    }
    const addSelectionRect = () => {
      //logics
      selectionRect = new fabric.Rect({
        fill: 'rgba(0, 0, 0, 0.3)',
        originX: 'left',
        originY: 'top',
        stroke: 'black',
        opacity: 1,
        width: 200,
        height: 200,
        cornerColor: 'white',
        cornerStrokeColor: 'black',
        borderColor: 'black'
      });
      paperB.centerObject(selectionRect);
      selectionRect.visible = true;
      selectionRect.setControlsVisibility({mtr: false});
      paperB.add(selectionRect);
    }
    const handleKropOut = () => {
      //logics
      console.log(paperB.getActiveObject());
      console.log('L', paperB.getActiveObject().left);
      console.log('T', paperB.getActiveObject().top);
      console.log('S-Width', paperB.getActiveObject().getScaledWidth());
      console.log('S-Height', paperB.getActiveObject().getScaledHeight());
      console.log('scale-x',paperB.getObjects()[1].scaleX);
      console.log('scale-y',paperB.getObjects()[1].scaleY);
      //clipping logics
      var ImageHeight = paperB.getObjects()[1].height / 2;
      var ImageWidth = paperB.getObjects()[1].width / 2;
      var rectCL = paperB.getActiveObject().left;
      var rectCT = paperB.getActiveObject().top;
      var ln = 0; var tn = 0;
      //check if the width & height goes beyond default 250
      //if(ImageHeight && ImageWidth > 250){
      //  //do something here
      //  //get the ratio h - 4.96 w - 3.496
      //  //var rL = ImageWidth/250;
      //  //var rT = ImageHeight/250;
      //  //check for rect L & T
      //  if(rectCL < ImageWidth){
      //    ln = rectCL*paperB.getObjects()[1].scaleX - ImageWidth;
      //  }else{
      //    ln = rectCL*paperB.getObjects()[1].scaleX - ImageWidth;
      //  }
      //  if(rectCT < ImageHeight){
      //    tn = rectCT*paperB.getObjects()[1].scaleY - ImageHeight;
      //  }else{
      //    tn = rectCT*paperB.getObjects()[1].scaleY - ImageHeight;
      //  }
      //}
      //if image width & height is === 250
      //if(rectCL < ImageWidth){
      //  ln = rectCL - ImageWidth;
      //}else{
      //  ln = rectCL - ImageWidth;
      //}
      //if(rectCT < ImageHeight){
      //  tn = rectCT - ImageHeight;
      //}else{
      //  tn = rectCT - ImageHeight;
      //}
      console.log(ln);
      console.log(tn);
      console.log('image', paperB.getObjects()[1]);
      var cropped = new Image();
      var imgg;
      cropped.src = paperB.toDataURL({
        left: 0,
        top: 0,
        width: 200,
        height: 200
      });
      cropped.onload = () => {
        paperB.clear(); //clear the canvas
        imgg = new fabric.Image(cropped);
        imgg.left = 0;
        imgg.top = 0;
        imgg.setCoords();
        paperB.add(imgg);
        paperB.renderAll();
      }
      //var x = paperB.getObjects()[1];
      ////crop the image - clip
      //let rectcrop = new fabric.Rect({
      //  left: ln,
      //  top: tn,
      //  width: 432,
      //  height: 432
      //});
      //paperB.getObjects()[1].clipPath = rectcrop;
      //paperB.getObjects()[1].selectable = true;
      //console.log('image', x);
      //imageObjB = x;
      //paperB.remove(selectionRect);
      //paperB.remove(x)
      //paperB.renderAll();
      //removeGarbageOnPaperB();
    }
    const removeGarbageOnPaperB = () => {
      //logics
      //console.log('cleaner', paperB.getObjects()[1]);
      //clear canvas
      //paperB.remove(paperB.getObjects()[0]);
      //paperB.getObjects().forEach((n)=>{
      //  //console.log('objects', n);
      //  paperB.remove(n)
      //});
      //paperB.renderAll();
      //paperB.clear().renderAll();
      //imageObjB.setCoords();
      console.log('toscale', imageObjB);
      //imageObjB.set({scaleX: 2})
      paper.add(imageObjB);
      paper.renderAll();
    }
    const handleUnitTest = () => {
      //logics
      //console.log(paperB.getActiveObject())
      //paperB.remove(paperB.getActiveObject());
      //paperB.renderAll();
      //paper
      console.log(paperB.getObjects());
    }
    //delete objects on the canvasB
    const handleDeleteObjectsCanvasB = () => {
      //logics
      //paperB.clear().renderAll()
    }
  return (
    <div className="container">
      <div className='row'>
        <div className='col-sm-12'>
          <div className='display-3'>Fabric M.CT</div>
        </div>
        <div className='col-sm-6'>
          <canvas ref={kanvas} width={500} height={500}></canvas>
        </div>
        <div className='col-sm-6'>
          <canvas ref={kanvasB} width={500} height={500}></canvas>
        </div>
        <div className='col-sm-12'>
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
            <button className='btn btn-warning' onClick={handleCropImage}>Crop Image</button>
            <button className='btn btn-warning' onClick={handleSelectCropObjects}>Select Crop Objects</button>
            <button className='btn btn-info' onClick={handleCutOut}>Cut Out</button>
            <button className='btn btn-secondary' onClick={openModal}>Crop Modal</button>
            <button className='btn btn-danger' onClick={handleKrop}>Krop</button>
            <button className='btn btn-info' onClick={handleKropOut}>Krop-Out</button>
            <button className='btn btn-warning' onClick={handleUnitTest}>Unit-Test</button>
            <button className='btn btn-secondary' onClick={handleDeleteObjectsCanvasB}>Garbage</button>
            <button className='btn btn-success' onClick={saveCanvasToImage}>Save</button>
            <Modal isOpen={modalIsOpen} style={customStyles} contentLabel="Modal-x">
              <button className='btn btn-danger' onClick={closeModal}>close</button>
            </Modal>
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
                <select className='form-select' onChange={handleSelectFont} value={selectedFont}>
                  <option>Arial</option>
                  <option>Courier</option>
                  <option>Helvetica</option>
                  <option>Sans-Serif </option>
                  <option>Monospace</option>
                  <option>Verdana</option>
                </select>
                <br/>
                <select className='form-select' onChange={handleTextAlign} value={selectedTextAlign}>
                  <option>Left</option>
                  <option>Center</option>
                  <option>Right</option>
                  <option>Justify</option>
                </select>
                <br/>
                <select className='form-select' onChange={handleFontWeight} value={selectedFontWeight}>
                  <option>Normal</option>
                  <option>Bold</option>
                </select>
                <br/>
                <span>FontSize</span>
                <input type="number" min={6} className='form-control' value={selectedFontSize} onChange={handleFontSize}/>
                <span onClick={handleFontColor}>FontColor<span style={{padding: '4px 32px', backgroundColor: color.hex}}></span></span>
                <br/>
                <span>LineHeight</span>
                <input type="number" min={1} className='form-control' value={selectedLineHeight} onChange={handleLineHeight}/>
                <br/>
                <div className='form-check'>
                  <input type='checkbox' className='form-check-input' id='check1' onChange={handleItalicText} checked={checkItalic}/>
                  <label className='form-check-label' htmlFor='check1'><i>Italic</i></label>
                </div>
                <div className='form-check'>
                  <input type='checkbox' className='form-check-input' id='check3' onChange={handleLineThrough} checked={checkLineThrough}/>
                  <label className='form-check-label' htmlFor='check3'>Line Through</label>
                </div>
                <div className='form-check'>
                  <input type='checkbox' className='form-check-input' id='check4' onChange={handleUnderline} checked={checkUnderline}/>
                  <label className='form-check-label' htmlFor='check4'>Underline</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
