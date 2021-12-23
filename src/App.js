import { useEffect, useState } from 'react';
import './App.css';

import CopyText from './components/CopyText';

function App() {

  let [clippings, setClippings] = useState(["hey"]);
  let [inputClipping, setInputClipping] = useState("");

  function getTexts() {
    var storedClippings = JSON.parse(localStorage.getItem("copypasta"));
  }

  function setTexts() {
    localStorage.setItem("copypasta", JSON.stringify(clippings));
  }

  function newText(e) {
    if (e.charCode === 13) {
      e.stopPropagation();

      let n = clippings;
      n.push(inputClipping);

      setClippings(n);
      setInputClipping("");
    }
  }

  function handleInputChange(e) {
    setInputClipping(e.target.value);
  }

  return (
    <div className="App">
      <p>Copy whatever you want with ease</p>

      <div className="copy-textblocks">
        {clippings ?
          clippings.map(clipping =>
            <CopyText clipping={clipping}/>
          )
        : ""}

        <textarea
          type="text"
          value={inputClipping}
          onChange={handleInputChange}
          onKeyPress={(e) => newText(e)}/>
      </div>
    </div>
  );
}

export default App;
