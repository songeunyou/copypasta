import { useEffect, useState } from 'react';

function CopyText() {

  const [copied, setCopied] = useState(false);

  function copytoClipboard() {
      // reset the copy animation
      setCopied(false);

      navigator.clipboard.writeText(" text to copy ").then(function() {
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
      }.bind(this), function() {
          console.log("Failed to copy");
      });
  }

  return (
    <div className="CopyText">

    </div>
  );
}

export default CopyText;
