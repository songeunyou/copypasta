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
    // because we set the textarea input text manually with handleInputChange,
    // we need to update the input text when a text clipping has been deleted from the parent array
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
      document.activeElement.blur();
    }
  }

  // save edits when textarea loses focus
  function onBlur() {
    editClipping(index, inputClipping);
  }

  return (
    <div className="clipping editable-clipping">
      <TextareaAutosize
        type="text"
        placeholder="type a new copypasta"
        value={inputClipping}
        onChange={handleInputChange}
        onKeyPress={(e) => handleEnter(e)}
        onBlur={onBlur}/>

      <button
        className="delete-btn"
        onClick={() => deleteClipping(clipping)}>✕</button>
    </div>
  );
}

export default EditableClipping;
