import { useEffect, useState } from 'react';

function CopyText(props) {

  const [copied, setCopied] = useState(false);

  function copytoClipboard() {
      // reset the copy animation
      setCopied(false);

      navigator.clipboard.writeText(props.clipping).then(function() {
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
      }.bind(this), function() {
          console.log("Failed to copy");
      });
  }

  return (
    <div className="CopyText" onClick={() => copytoClipboard()}>
      <p>{copied ? "copied" : "not copied yet"}</p>
      {props.clipping}
    </div>
  );
}

export default CopyText;
