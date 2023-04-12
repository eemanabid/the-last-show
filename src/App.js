import Empty from "./Empty";
import NewObituaryScreen from "./NewObituaryScreen";
import React, { useState } from 'react';

function App() {
    const [showNewObituaryScreen, setShowNewObituaryScreen] = useState(false);

    const handleNewObituaryClick = () => {
      setShowNewObituaryScreen(true);
    };

  return (
    <div id="container">
      <header>
        <div id="app-header">
          <h1>The Last Show</h1>
        </div>
        <div className="new-obituary">
          <div className="email" onClick={handleNewObituaryClick}>
            <button className="log">+ New Obituary</button>
          </div>
        </div>
      </header>
      {showNewObituaryScreen ? <NewObituaryScreen /> : <Empty />}
    </div>
  );
}

export default App;
