import React from "react";

const GetApp = () => {
  return (
    <div className="container mx-auto px-4 py-8 mb-8">
      <h2 className="text-2xl font-bold mb-4">
        Download or Add Shop Senses App On Your Device
      </h2>
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">For Android:</h3>
        <ul className="list-disc list-inside">
          <li>
            <span role="img" aria-label="Mobile Phone">
              📱
            </span>{" "}
            <span role="img" aria-label="Globe">
              🌐
            </span>{" "}
            <span role="img" aria-label="Download">
              📥
            </span>{" "}
            <br />
            Open the Shop Senses PWA in your web browser.
          </li>
          <li>
            <span role="img" aria-label="Three Dots">
              ...
            </span>{" "}
            <br />
            Tap the menu icon (three dots) in the top-right corner.
          </li>
          <li>Select &quot;Add to Home screen&quot; or &quot;Install Shop Senses.&quot;</li>
          <li>Tap &quot;Add&quot; or &quot;Install&quot; to confirm.</li>
          <li>The Shop Senses app icon will appear on your home screen.</li>
        </ul>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">For iPhone (iOS):</h3>
        <ul className="list-disc list-inside">
          <li>
            <span role="img" aria-label="Mobile Phone">
              📱
            </span>{" "}
            <span role="img" aria-label="Globe">
              🌐
            </span>{" "}
            <span role="img" aria-label="Right Arrow">
              ↗️
            </span>{" "}
            <br />
            Open the Shop Senses PWA in Safari.
          </li>
          <li>
            <span role="img" aria-label="Share Icon">
              📤
            </span>{" "}
            <br />
            Tap the &quot;Share&quot; icon at the bottom.
          </li>
          <li>
            Choose &quot;Add to Home Screen&quot; or &quot;Add to Home Screen (Shop Senses).&quot;
          </li>
          <li>Tap &quot;Add&quot; to confirm.</li>
          <li>The Shop Senses app icon will be added to your home screen.</li>
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2">
          For Desktop (Chrome browser):
        </h3>
        <ul className="list-disc list-inside">
          <li>
            <span role="img" aria-label="Computer">
              💻
            </span>{" "}
            <span role="img" aria-label="Globe">
              🌐
            </span>{" "}
            <span role="img" aria-label="Download">
              📥
            </span>{" "}
            <br />
            Open the Shop Senses PWA in Chrome.
          </li>
          <li>
            <span role="img" aria-label="Three Dots">
              ...
            </span>{" "}
            <br />
            Click the three-dot menu icon in the top-right.
          </li>
          <li>
            Select &quot;Install Shop Senses&quot; or &quot;Install Shop Senses as an app.&quot;
          </li>
          <li>Click &quot;Install&quot; to confirm.</li>
          <li>The Shop Senses app will be installed on your desktop.</li>
        </ul>
      </div>
    </div>
  );
};

export default GetApp;
