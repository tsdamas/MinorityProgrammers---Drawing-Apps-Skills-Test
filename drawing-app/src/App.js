import  {useState, useRef, useEffect } from "react";
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



  return (
    <div className="App container-fluid">
      <header className="App-header">
      </header>
      <h1 className="title">Let's get drawing</h1>
      <div className="drawing-space">
        <canvas 
        onMouseDown={beginDrawing}
        onMouseUp={endDrawing}
        onMouseMove={drawing}
        ref={boxRef}
        width={`600px`}
        height={`400px`}
        />
        <button className="save-button" onClick={downloadDrawing}>Save</button>
        <button className="erase-button" onClick={eraseDrawing}>Reset</button>
      </div>
    </div>
  );
}

export default App;
