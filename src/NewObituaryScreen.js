import { useEffect, useState } from "react";

function NewObituaryScreen() {
  const [selectedImage, setSelectedImage] = useState(null);

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
            <br />
            {/* image isnt working? */}
            <img src="./obituary.jpg" alt="obituary" />
            <br />
            <div id="image-input">
              <label for="image-select">
                Select an image for the deceased ({selectedImage && <span>{selectedImage.name}</span>})
              </label>
              <input
                id="image-select"
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                style={{ display: "none" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewObituaryScreen;
