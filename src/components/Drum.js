import "../App.css";
import React from "react";
import { useState } from "react";

function App() {
  const [song, setSong] = useState("");
  const [pad, setPad] = useState([
    {
      key: "Q",
      song: "Heater-1",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    },
    {
      key: "W",
      song: "Heater-2",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    },
    {
      key: "E",
      song: "Heater-3",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    },
    {
      key: "A",
      song: "Heater-4",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    },
    {
      key: "S",
      song: "Heater-6",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    },
    {
      key: "D",
      song: "Dsc_Oh",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    },
    {
      key: "Z",
      song: "Kick_n_Hat",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    },
    {
      key: "X",
      song: "RP4_KICK_1",
      url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    },
    {
      key: "C",
      song: "Cev_H2",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    },
  ]);

  function clickHandler(e) {
    e.target.lastChild.play();
    setSong(e.target.id);
  }

  window.addEventListener("keypress", (e) => {
    const padItem = pad.find((item) => {
      return item.key == e.key.toUpperCase();
    });
    if (padItem) {
      document.getElementById(padItem.song).click();
    }
  });

  function powerHandler(e) {
    e.target.classList.toggle("left");
    const audioClips = document.querySelectorAll(".clip");
    const drumPads = document.querySelectorAll(".drum-pad");

    if (audioClips.length > 0) {
      audioClips.forEach((i) => {
        i.remove();
      });
      setSong("Power Off");
    } else if (audioClips.length == 0) {
      setSong("Power On");
      const padItem = pad.map((response) => {
        return response;
      });
      const buttonItem = Array.from(drumPads).map((item) => {
        return item;
      });
      for (let i = 0; i < padItem.length; i++) {
        buttonItem[
          i
        ].innerHTML += `<audio class="clip" id=${padItem[i].key} src=${padItem[i].url} />`;
      }
    }
  }

  function volumeChangeHandler(e) {
    setSong("Volume : " + e.target.value);
    const audioClips = document.querySelectorAll(".clip");
    audioClips.forEach((i) => {
      i.volume = e.target.value / 100;
    });
  }

  return (
    <>
      <div className="container" id="drum-machine">
        <div className="container-left">
          {pad.map((response) => {
            return (
              <button
                className={response.key + " drum-pad"}
                id={response.song}
                key={response.song}
                onClick={clickHandler}
              >
                {response.key}
                <audio className="clip" id={response.key} src={response.url} />
              </button>
            );
          })}
        </div>
        <div className="container-right">
          <p>Power</p>
          <div className="power select">
            <div className="power inner" onClick={powerHandler} />
          </div>
          <p className="display" id="display">
            {song}
          </p>
          <input
            type={"range"}
            min={0}
            max={100}
            onChange={volumeChangeHandler}
          />
          <p>Mode</p>
          <div className="mode select">
            <div className="mode inner" />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
