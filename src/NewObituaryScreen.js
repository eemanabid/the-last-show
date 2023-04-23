import { useEffect, useState } from "react";
import ObitDisplay from "./ObitDisplay";
import { v4 as uuidv4 } from "uuid";

function NewObituaryScreen({ setShowNewObituaryScreen }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState("");
  const [bornDate, setBornDate] = useState("");
  const [diedDate, setDiedDate] = useState("");
  const [savingObituary, setSavingObituary] = useState(false);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    setSelectedImage(e.target.files[0]);
    console.log(file);
  };

  const handleXButtonClick = () => {
    setShowNewObituaryScreen(false);
  };

  const handleSaveObituary = async () => {
    if (name.trim() === "") {
      alert("Please write a name for the deceased.");
      setSavingObituary(false);
      return;
    }

    if (!selectedImage) {
      alert("Please select an image for the deceased.");
      setSavingObituary(false);
      return;
    }
  
    if (!bornDate || !diedDate) {
      alert("Please select both a born and a died date.");
      setSavingObituary(false);
      return;
    }

    setSavingObituary(true);
    const reader = new FileReader();
    reader.readAsDataURL(selectedImage);
    reader.onload = async () => {
      const obituary = {
        selectedImage: reader.result,
        name,
        bornDate,
        diedDate,
      };
      const data = new FormData();
      data.append("image", selectedImage);
      data.append("name", name);
      data.append("bornDate", bornDate);
      data.append("diedDate", diedDate);
      const response = await fetch(
        "https://z7hbbsaieiinsdewucy3j3wq7u0vlksu.lambda-url.ca-central-1.on.aws/",
        {
          method: "POST",
          body: data,
        }
      );
      /*
      const savedObituaries = JSON.parse(localStorage.getItem("obituaries")) || [];
      savedObituaries.push(obituary);
      localStorage.setItem("obituaries", JSON.stringify(savedObituaries));
      console.log("Obituary saved to local storage:", obituary);*/
      setShowNewObituaryScreen(false);
      const result = await response.text();
      console.log(result);
    };
  };

  return (
    <div id="container">
      <header>
        <div id="app-header">
          <div>
            <button className="obit-log" onClick={handleXButtonClick}>
              X
            </button>
          </div>
        </div>
      </header>
      <div id="main-container">
        <div id="obit-holder-new">
          <div id="obit-maker">
            <h3>Create a New Obituary</h3>
            <img
              src="./obituary.png"
              alt="obituary-logo"
              className="obituary-logo"
            />
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
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name of the deceased"
                style={{
                  border: "1px solid black",
                  padding: "17px",
                  width: "500px",
                }}
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
            <button
              id="write-obit"
              onClick={handleSaveObituary}
              className={savingObituary ? "saving-obit" : ""}
            >
              {savingObituary ? "Saving obituary, please wait a moment.." : "Write Obituary"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewObituaryScreen;
