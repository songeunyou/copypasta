import { useEffect, useState } from 'react';
import '../sass/App.scss';

function Clipping({ clipping }) {
  const [copied, setCopied] = useState(false);

  function copytoClipboard() {
      // reset the copy animation
      setCopied(false);

      navigator.clipboard.writeText(clipping).then(function() {
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
      }.bind(this), function() {
          console.log("Failed to copy");
      });
  }

  return (
    <div className="clipping" onClick={() => copytoClipboard()}>
      <div className="copied" style={{ opacity: copied ? 1 : 0 }}>
        <p>Copied</p>
      </div>

      <p>{clipping}</p>
    </div>
  );
}

export default Clipping;
