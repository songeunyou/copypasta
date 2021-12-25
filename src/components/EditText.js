import { useEffect, useState } from 'react';
import '../sass/App.scss';

function EditText({ index, clipping, saveEditedClipping, deleteClipping }) {

  let [inputClipping, setInputClipping] = useState(clipping);

  function handleInputChange(e) {
    setInputClipping(e.target.value);
  }

  function handleEnter(e) {
    if (e.charCode === 13 && !e.shiftKey) {
      e.preventDefault();
      saveEditedClipping(index, inputClipping);
      document.activeElement.blur();
    }
  }

  return (
    <div className="copy-text edit-text">
      <textarea
        type="text"
        placeholder="type a new copypasta"
        value={inputClipping}
        onChange={handleInputChange}
        onKeyPress={(e) => handleEnter(e)}/>

      <button
        className="delete-btn"
        onClick={() => deleteClipping(clipping)}>✕</button>
    </div>
  );
}

export default EditText;
