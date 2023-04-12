import { useEffect, useState } from "react";

function ObitDisplay({ setShowNewObituaryScreen }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState("");
  const [bornDate, setBornDate] = useState("");
  const [diedDate, setDiedDate] = useState("");

  useEffect(() => {
    {/* image isnt working? */}
    const savedSelectedImage = localStorage.getItem("selectedImage");
    const savedName = localStorage.getItem("name");
    const savedBornDate = localStorage.getItem("bornDate");
    const savedDiedDate = localStorage.getItem("diedDate");

    if (savedSelectedImage && savedName && savedBornDate && savedDiedDate) {
      setSelectedImage(savedSelectedImage);
      setName(savedName);
      setBornDate(savedBornDate);
      setDiedDate(savedDiedDate);
    }
  }, []);

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
      <div id="main-container">
        {selectedImage && name && bornDate && diedDate ? (
          <div id="obit-holder">
            <div id="obit-preview">
              <img src={selectedImage} alt="obituary" />
              <h3>{name}</h3>
              <p>Born: {bornDate}</p>
              <p>Died: {diedDate}</p>
            </div>
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

