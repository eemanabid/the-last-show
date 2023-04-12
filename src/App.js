import Empty from "./Empty";
import NewObituaryScreen from "./NewObituaryScreen";
import { useEffect, useRef, useState } from "react";

function App() {
  const [showNewObituaryScreen, setShowNewObituaryScreen] = useState(false);

  return (
    <div id="container">
      {showNewObituaryScreen ? (
        <NewObituaryScreen />
      ) : (
        <Empty setShowNewObituaryScreen={setShowNewObituaryScreen} />
      )}
    </div>
  );
}

export default App;
