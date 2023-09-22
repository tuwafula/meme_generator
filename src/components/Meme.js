import React from "react";

import "./Meme.css";

const Meme = () => {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  const [allMemes, setAllMemes] = React.useState([]);

  React.useEffect(() => {
    // API call
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  const getMemeImg = () => {
    const url = allMemes[Math.floor(Math.random() * allMemes.length)].url;
    setMeme((prevMemeData) => {
      return {
        ...prevMemeData,
        randomImage: url,
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeme((prevMemeData) => {
      return {
        ...prevMemeData,
        [name]: value,
      };
    });
  };

  return (
    <main>
      <div className="meme--container">
        <input
          type="text"
          placeholder="Top text"
          className="meme--input"
          name="topText"
          onChange={handleChange}
          value={meme.topText}
        />
        <input
          type="text"
          placeholder="Bottom text"
          className="meme--input"
          name="bottomText"
          onChange={handleChange}
          value={meme.bottomText}
        />
        <button className="meme--button" onClick={getMemeImg}>
          Get a new meme image 🖼
        </button>
      </div>
      <div className="result--container">
        <img src={meme.randomImage} alt="meme" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
};

export default Meme;
