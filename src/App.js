import { useEffect, useState } from 'react';
import './sass/App.scss';

import forkImg from './media/fork.png';

import CopyText from './components/CopyText';

function App() {

  let [clippings, setClippings] = useState(["hey"]);
  let [inputClipping, setInputClipping] = useState("");
  let [fork, setFork] = useState({});
  let [editingMode, setEditingMode] = useState(false);

  useEffect(() => {
    document.body.style.cursor = 'none';
    window.addEventListener("mousemove", handleMove);
  }, []);

  function handleMove(e) {
    setFork({
      top: e.clientY,
      left: e.clientX
    });
  }

  function getTexts() {
    var storedClippings = JSON.parse(localStorage.getItem("copypasta"));
  }

  function setTexts() {
    localStorage.setItem("copypasta", JSON.stringify(clippings));
  }

  function newText(e) {
    if (e.charCode === 13 && !e.shiftKey) {
      e.preventDefault();

      setClippings(m => [
        ...m,
        inputClipping
      ]);

      setInputClipping("");
    }
  }

  function handleInputChange(e) {
    setInputClipping(e.target.value);
  }

  function deleteClipping(clipping) {
    setClippings(clippings.filter(c => c !== clipping));
  }

  return (
    <div className="App">
      <img id="fork" src={forkImg} style={fork}/>

      <div className="content">
        <h1>Copypasta!</h1>
        <span>
          <button
            className="edit-btn"
            onClick={() => setEditingMode(!editingMode)}>
            {editingMode ? "stop editing" : "edit"}
          </button>
        </span>

        <div className="copy-textblocks">
          {clippings ?
            clippings.map((clipping, i) =>
              <CopyText
                key={i}
                editingMode={editingMode}
                deleteClipping={deleteClipping}
                clipping={clipping}/>
            )
          : ""}
        </div>
      </div>

      <textarea
        type="text"
        placeholder="type a new copypasta"
        value={inputClipping}
        onChange={handleInputChange}
        onKeyPress={(e) => newText(e)}/>
    </div>
  );
}

export default App;
