import { useEffect, useState } from "react";

function ObitDisplay({ setShowNewObituaryScreen }) {
  const [obituaries, setObituaries] = useState([]);

  useEffect(() => {
    const savedObituaries =
      JSON.parse(localStorage.getItem("obituaries")) || [];
    setObituaries(savedObituaries);
  }, []);

  const handleNewObituaryClick = () => {
    setShowNewObituaryScreen(true);
    {
      /* 
    Just to clear all obitueries from local storage -
    localStorage.clear();
    console.log("Local storage cleared.");   
    */
    }
  };

  const formatDate = (date) => {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  }

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
              <div
                key={`${obituary.bornDate}-${obituary.diedDate}`}
                id="obit-preview"
              >
                <img src={obituary.selectedImage} alt="obituary-image" />
                <div>
                  <p id="obit-title">{obituary.name}</p>
                  <p id="obit-date">{`${formatDate(obituary.bornDate)} - ${formatDate(obituary.diedDate)}`}</p>
                </div>
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
