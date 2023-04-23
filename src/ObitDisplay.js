import { useEffect, useState } from "react";

function ObitDisplay({ setShowNewObituaryScreen }) {
  const [obituaries, setObituaries] = useState([]);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

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

  const handleAudioToggle = (event) => {
    const audio = event.target.nextSibling;
    if (audio.paused) {
      audio.play();
      setAudioPlaying(true);
    } else {
      audio.pause();
      setAudioPlaying(false);
    }
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
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
                onClick={handleDropdownToggle}
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
                  {showDropdown && (
                    <div className="dropdown">
                      <p id="obit-description">{obituary.obituary}</p>
                      <div className="audio-container">
                        <button
                          className={`play-pause ${
                            audioPlaying ? "pause" : "play"
                          }`}
                          onClick={handleAudioToggle}
                        >
                          <span className="sr-only">
                            {audioPlaying ? "Pause" : "Play"}
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
