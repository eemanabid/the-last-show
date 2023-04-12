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

  const handleSaveObituary = () => {
    localStorage.setItem("selectedImage", selectedImage.name);
    localStorage.setItem("name", name);
    localStorage.setItem("bornDate", bornDate);
    localStorage.setItem("diedDate", diedDate);
    console.log("Obituary saved to local storage:", {
      selectedImage: selectedImage.name,
      name,
      bornDate,
      diedDate,
    });
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
              <label htmlFor="image-select">
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
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name of the individual who was obitchuarated"
                style={{ border: "1px solid black", padding: "17px", width: "500px" }}
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
            <br />
            <button id="write-obit" onClick={handleSaveObituary}>Write Obituary</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewObituaryScreen;
