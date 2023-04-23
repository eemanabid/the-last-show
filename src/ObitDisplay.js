import { useEffect, useState } from "react";

function ObitDisplay({ setShowNewObituaryScreen }) {
  const [obituaries, setObituaries] = useState([]);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [showDropdown, setShowDropdown] = useState({});

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
        const mappedObituaries = jsonRes.map((obituary) => ({
          ...obituary,
          audioPlaying: false,
        }));
        setObituaries(mappedObituaries);
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

  const handleAudioToggle = (event, obituary) => {
    const audio = event.target.nextSibling;
    const newObituaries = obituaries.map((o) =>
      o.cloudinary_url === obituary.cloudinary_url
        ? { ...o, audioPlaying: !o.audioPlaying }
        : o
    );
    setObituaries(newObituaries);
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    event.stopPropagation();
  };
  

  const handleDropdownToggle = (obituaryId) => {
    setShowDropdown((prevState) => ({
      ...prevState,
      [obituaryId]: !prevState[obituaryId],
    }));
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
                key={obituary.cloudinary_url}
                id="obit-preview"
                onClick={() => handleDropdownToggle(obituary.cloudinary_url)}
              >
                <img
                  src={obituary.cloudinary_url}
                  alt="obituary-image"
                  className="obituary-image"
                />
                <div>
                  <div id="obit-title">
                    {obituary.name}
                    <p id="obit-date">{`${formatDate(
                      obituary.bornDate
                    )} - ${formatDate(obituary.diedDate)}`}</p>
                  </div>
                  {showDropdown[obituary.cloudinary_url] && (
                    <div className="dropdown">
                      <p id="obit-description">{obituary.obituary}</p>
                      <div className="audio-container">
                        <button
                          className={`play-pause ${
                            obituary.audioPlaying ? "pause" : "play"
                          }`}
                          onClick={(event) => handleAudioToggle(event, obituary)}
                        >
                          <span className="sr-only">
                            {obituary.audioPlaying ? "Pause" : "Play"}
                          </span>
                        </button>
                        <audio src={obituary.polly_url} />
                      </div>
                    </div>
                  )}
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
