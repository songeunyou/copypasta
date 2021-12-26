import { useEffect, useState } from 'react';
import './sass/App.scss';

import Clipping from './components/Clipping';
import EditableClipping from './components/EditableClipping';
import TextareaAutosize from 'react-textarea-autosize';

import holo from './media/holo_texture.jpg';

function App() {
  let [loaded, setLoaded] = useState(false);
  let [clippings, setClippings] = useState(["Click me 😁"]);
  let [input, setInput] = useState("");
  let [editingMode, setEditingMode] = useState(false);
  let [creatingNewClipping, setCreatingNewClipping] = useState(false);

  useEffect(() => {
    // loaded keeps track of the very first time we load the app
    // only fetch from localstorage at the start, every other time useEffect runs,
    // we want to set the clippings within localStorage
    if (!loaded && localStorage.getItem("copypasta") != null) {
      getStoredClippings(); // from localStorage
      setLoaded(true);
    }

    setStoredClippings();

    if (creatingNewClipping == true) {
      var list = document.getElementById('clippings-list');
      list.scrollTop = list.scrollHeight;
      setCreatingNewClipping(false);
    }
  }, [clippings, creatingNewClipping]);

  // localStorage functions
  function getStoredClippings() {
    var storedClippings = JSON.parse(localStorage.getItem("copypasta"));
    setClippings(storedClippings);
  }

  function setStoredClippings() {
    localStorage.setItem("copypasta", JSON.stringify(clippings));
  }

  // clipping handling functions
  function newClipping(e) {
    if (e.charCode === 13 && !e.shiftKey && input.trim().length != 0) {
      e.preventDefault();

      setClippings(m => [
        ...m,
        input
      ]);

      setInput("");
      setCreatingNewClipping(true);
    }
  }

  function editClipping(index, newClipping) {
    let tempClippings = [...clippings]; // copying the old data array
    tempClippings[index] = newClipping;
    setClippings(tempClippings);
  }

  function deleteClipping(clipping) {
    setClippings(clippings.filter(c => c !== clipping));
  }

  function handleInputChange(e) {
    setInput(e.target.value);
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

        <div className="test">
        <div id="clippings-list" className="clipping-list">
          {clippings && clippings.length > 0 ?
            clippings.map((clipping, i) =>
              (editingMode ?
                <EditableClipping
                  key={i}
                  index={i}
                  editClipping={editClipping}
                  deleteClipping={deleteClipping}
                  clipping={clipping}/>
                :
                <Clipping
                  key={i}
                  clipping={clipping}/>
              ))
            : <p className="empty-placeholder">Get started by adding some text to easily copy + paste</p>
          }

          <div className="textarea-shadow"/>

          <div className="bg">
            <div className="bg-gradient"/>
            <img src={holo} className="bg-texture"/>
          </div>
        </div>
      </div>
      </div>

      <TextareaAutosize
        type="text"
        placeholder="type a new copypasta"
        value={input}
        onChange={handleInputChange}
        onKeyPress={(e) => newClipping(e)}/>
    </div>
  );
}

export default App;
