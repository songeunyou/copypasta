import { useEffect, useState } from 'react';
import './sass/App.scss';

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

      setInputClipping(m => [
        ...m,
        inputClipping
      ]);
    }
  }

  function handleInputChange(e) {
    setInputClipping(e.target.value);
  }

  return (
    <div className="App">
      <div className="content">
        <h1>Copypasta!</h1>
        <p>Copy whatever you want with ease</p>

        <div className="copy-textblocks">
          {clippings ?
            clippings.map((clipping, i) =>
              <CopyText key={i} clipping={clipping}/>
            )
          : ""}
        </div>

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
