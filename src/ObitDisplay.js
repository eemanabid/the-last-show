import { useEffect, useState } from "react";

function ObitDisplay({ setShowNewObituaryScreen }) {
  
  const [obituaries, setObituaries] = useState([]);

  useEffect(() => {
    const savedObituaries = JSON.parse(localStorage.getItem("obituaries")) || [];
    setObituaries(savedObituaries);
  }, []);

  const handleNewObituaryClick = () => {
    setShowNewObituaryScreen(true);
    {/* 
    Just to clear all obitueries from local storage -
    localStorage.clear();
    console.log("Local storage cleared.");   
    */}
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
      <div id="main-container">
        {obituaries.length > 0 ? (
          <div id="obit-holder">
            {obituaries.map((obituary) => (
              <div key={`${obituary.bornDate}-${obituary.diedDate}`} id="obit-preview">
                <img src={obituary.selectedImage} alt="obituary-image" />
                <h3>{obituary.name}</h3>
                <p>Born: {obituary.bornDate}</p>
                <p>Died: {obituary.diedDate}</p>
              </div>
            ))}
          </div>
        ) : (
          <div id="empty-holder">
            <div id="message">No Obituary Yet.</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ObitDisplay;

