
function Empty({ setShowNewObituaryScreen }) {
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
        <div id="empty-holder">
          <div id="message">No Obituary Yet.</div>
        </div>
      </div>
    </div>
  );
}

export default Empty;
