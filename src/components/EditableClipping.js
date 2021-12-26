import { useEffect, useState, useRef } from 'react';
import '../sass/App.scss';
import TextareaAutosize from 'react-textarea-autosize';

// create a ref to detect prop change
function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

function EditableClipping({ index, clipping, editClipping, deleteClipping }) {

  let [inputClipping, setInputClipping] = useState(clipping);

  const prevClipping = usePrevious(clipping);

  useEffect(() => {
    if (prevClipping !== clipping) {
      setInputClipping(clipping);
    }
  }, [clipping]);

  function handleInputChange(e) {
    setInputClipping(e.target.value);
  }

  function handleEnter(e) {
    if (e.charCode === 13 && !e.shiftKey) {
      e.preventDefault();
      editClipping(index, inputClipping);
      document.activeElement.blur();
    }
  }

  return (
    <div className="copy-text edit-text">
      <TextareaAutosize
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

export default EditableClipping;
