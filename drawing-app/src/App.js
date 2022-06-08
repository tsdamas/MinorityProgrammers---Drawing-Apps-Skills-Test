import  {useState, useRef, useEffect } from "react";
import photo from "./hand-drawing.png"
import './App.css';

function App() {
  
  //useStates and useRef to store the drawing
  //useRef will return an object that will persist for the lifetime of the component
  let boxRef = useRef(null); //create the box that holds the drawing
  let lineRef = useRef(null); //create a line that persit and will not cause re-render
  let [startDrawing, setStartDrawing] = useState(false);

  //useEffect to render after the component renders
  useEffect(() => {
    const box = boxRef.current;
    const line = box.getContext("2d");
    line.lineCap = "round";
    line.lineJoin = "round";
    lineRef.current = line;
  })



  //function start drawing
  let beginDrawing = (e) => {
    lineRef.current.beginPath();
    lineRef.current.moveTo(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );
    setStartDrawing(true);
  }

  //function to stop drawing when mouse is up
  let endDrawing = () => {
    lineRef.current.closePath();
    setStartDrawing(false)
  };

  let drawing = (e) => {
    if (!startDrawing) {
      return;
    }
    lineRef.current.lineTo(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );
    lineRef.current.stroke();
  };

  //function to erase the drawing
  let eraseDrawing = () => {
    const box = boxRef.current;
    const line = box.getContext("2d");
    const canvas = document.querySelector("canvas")
    line.clearRect(0, 0, canvas.width, canvas.height); 
  }

  //function to download drawing
  let downloadDrawing = () => {
    let canvas = document.querySelector("canvas"); 
    let url = canvas.toDataURL("image/png");
    let link = document.createElement("a");
    link.download = "filename.png";
    link.href = url;
    link.click();  
  }

  //function to download svg drawing
  let downloadSvgDrawing = () => {
    let canvas = document.querySelector("canvas"); 
    let url = canvas.toDataURL("image/svg");
    let link = document.createElement("a");
    link.download = "filename.svg";
    link.href = url;
    link.click();  
  }

  //function set drawing after using the partial erase. 
  let setDrawing = () =>{
    lineRef.current.globalCompositeOperation = "source-over"; 
  }

  //function erase part of drawing
  let erasePartDrawing = () => {
    lineRef.current.globalCompositeOperation = "destination-out";
  }



  return (
    <div className="App container-fluid">
      <header className="App-header">
      </header>
      <div className="row">
      <div className="col-sm-4 description-area">
        <img src={photo} alt="hand writing" className="img-fluid"></img> 
        <div className="title-container">
      <h4 className="title">Let it be</h4>
      <p>Let your <span className="creativity">creativity</span> dictates your expression.</p>
      </div>
      </div>
      <div className="col-sm-4 drawing-area">
        <div className="drawing-space">
        <canvas 
        onMouseDown={beginDrawing}
        onMouseUp={endDrawing}
        onMouseMove={drawing}
        ref={boxRef}
        width={`600px`}
        height={`400px`}
        />
        </div>
        <button className="reset-button" onClick={eraseDrawing}>Reset</button>
        <button className="save-button" onClick={downloadDrawing}>Save PNG</button>
        <button className="save-svg-button" onClick={downloadSvgDrawing}>Save SVG</button>
      </div>
        <div className="col-sm-4 right-buttons">
        <button className="erase-button" onClick={erasePartDrawing}>Erase</button>
        <button className="draw-button" onClick={setDrawing}>Draw</button>
        </div>
      </div>
    </div>
  );
}

export default App;
