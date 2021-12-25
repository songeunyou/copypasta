import { useEffect, useState } from 'react';
import './sass/App.scss';

import CopyText from './components/CopyText';
import EditText from './components/EditText';

function App() {

  let [clippings, setClippings] = useState(["Click me 😁"]);
  let [inputClipping, setInputClipping] = useState("");
  let [editingMode, setEditingMode] = useState(false);

  function getTexts() {
    var storedClippings = JSON.parse(localStorage.getItem("copypasta"));
  }

  function setTexts() {
    localStorage.setItem("copypasta", JSON.stringify(clippings));
  }

  function newText(e) {
    if (e.charCode === 13 && !e.shiftKey && inputClipping.trim().length != 0) {
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

  function saveEditedClipping(index, newClipping) {
    let tempClippings = [...clippings]; // copying the old datas array
    tempClippings[index] = newClipping;
    setClippings(tempClippings);
  }

  return (
    <div className="App">
      <div className="content">
        <h1>Copypasta!</h1>
        <span className="edit-span">
          <button
            className="edit-btn"
            onClick={() => setEditingMode(!editingMode)}>
            {editingMode ? "stop editing" : "edit"}
          </button>
        </span>

        <div className="copy-textblocks">
          {clippings && clippings.length > 0 ?
            clippings.map((clipping, i) =>
              (editingMode ?
                <EditText
                  key={i}
                  index={i}
                  saveEditedClipping={saveEditedClipping}
                  deleteClipping={deleteClipping}
                  clipping={clipping}/>
                :
                <CopyText
                  key={i}
                  clipping={clipping}/>
              ))
            : <p className="empty-placeholder">Get started by adding some text to easily copy + paste</p>
          }
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
