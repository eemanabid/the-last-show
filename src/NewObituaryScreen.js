import { useEffect, useState } from "react";

function NewObituaryScreen() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState("");
  const [bornDate, setBornDate] = useState("");
  const [diedDate, setDiedDate] = useState("");

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  return (
    <div id="container">
      <header>
        <div id="app-header">
          <div>
            <button className="obit-log">X</button>
          </div>
        </div>
      </header>
      <div id="main-container">
        <div id="obit-holder">
          <div id="obit-maker">
            <h3>Create a New Obituary</h3>
            {/* image isnt working? */}
            <img src="./obituary.jpg" alt="obituary" />
            <br />
            <br />
            <div id="image-input">
              <label for="image-select">
                Select an image for the deceased:{" "}
                {selectedImage && <span>{selectedImage.name}</span>}
              </label>
              <input
                id="image-select"
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                style={{ display: "none" }}
              />
            </div>
            <br />
            <div>
              <label id="name">Name:</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <br />
            <div>
              <label id="born-date">Born: </label>
              <input
                type="datetime-local"
                value={bornDate}
                onChange={(e) => setBornDate(e.target.value)}
              />
              <label id="died-date" style={{ marginLeft: "30px" }}>
                Died:{" "}
              </label>
              <input
                type="datetime-local"
                value={diedDate}
                onChange={(e) => setDiedDate(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewObituaryScreen;
