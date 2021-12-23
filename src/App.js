import { useEffect, useState } from 'react';
import './App.css';

import CopyText from './components/CopyText';

function App() {

  let [clippings, setClippings] = useState(["hey"]);

  function getTexts() {
    var storedClippings = JSON.parse(localStorage.getItem("copypasta"));
  }

  function setTexts() {
    localStorage.setItem("copypasta", JSON.stringify(clippings));
  }

  return (
    <div className="App">
      <p>Copy whatever you want with ease</p>

      <div className="copy-textblocks">
        {clippings.map(clipping =>
          <CopyText clipping={clipping}/>
        )}
      </div>
    </div>
  );
}

export default App;
