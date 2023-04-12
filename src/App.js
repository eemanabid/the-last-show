import Empty from "./Empty";
import NewObituaryScreen from "./NewObituaryScreen";
import { useEffect, useRef, useState } from "react";

function App() {
  const [showNewObituaryScreen, setShowNewObituaryScreen] = useState(false);
  const mainContainerRef = useRef(null);

  const handleNewObituaryClick = () => {
    setShowNewObituaryScreen(true);
  };

  return (
    <div id="container">
      <header>
        <div id="app-header">
          <h1>The Last Show</h1>

          <div onClick={handleNewObituaryClick}>
            <button className="log">+ New Obituary</button>
          </div>
        </div>
      </header>
      <div id="main-container" ref={mainContainerRef}>
        {showNewObituaryScreen ? <NewObituaryScreen /> : <Empty />}
      </div>
    </div>
  );
}

export default App;
