import ObitDisplay from "./ObitDisplay";
import NewObituaryScreen from "./NewObituaryScreen";
import { useEffect, useState } from "react";


function App() {
  const [showNewObituaryScreen, setShowNewObituaryScreen] = useState(false);

  return (
    <div id="container">
      {showNewObituaryScreen ? (
        <NewObituaryScreen setShowNewObituaryScreen={setShowNewObituaryScreen}/>
      ) : (
        <ObitDisplay setShowNewObituaryScreen={setShowNewObituaryScreen} />
      )}
    </div>
  );
}

export default App;
