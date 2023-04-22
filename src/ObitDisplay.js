import { useEffect, useState } from "react";

function ObitDisplay({ setShowNewObituaryScreen }) {
  const [obituaries, setObituaries] = useState([]);

  useEffect(() => {
    /*const savedObituaries =
      JSON.parse(localStorage.getItem("obituaries")) || [];
    setObituaries(savedObituaries);*/
    async function get_obituaries() {
      const res = await fetch(
        "https://p2fzxu4vzdmyvuykry3yh2kwnq0heoqz.lambda-url.ca-central-1.on.aws/",
        {
          method: "GET",
        }
      );

      const jsonRes = await res.json();
      console.log(jsonRes);

      if (jsonRes && jsonRes.length != null) {
        setObituaries(jsonRes);
      } else {
        setObituaries([]); // set notes to empty array
      }
    }
    get_obituaries();
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
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
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
              <div
                key={`${obituary.bornDate}-${obituary.diedDate}`}
                id="obit-preview"
              >
                <img
                  src={obituary.cloudinary_url}
                  alt="obituary-image"
                  className="obituary-image"
                />
                <div>
                  <p id="obit-title">
                    {obituary.name}
                    <p id="obit-date">{`${formatDate(
                      obituary.bornDate
                    )} - ${formatDate(obituary.diedDate)}`}</p>
                  </p>
                  <p id="obit-description">{obituary.obituary}</p>
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
