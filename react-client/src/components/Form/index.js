import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchQuiz } from "../../actions";
import { useSelector } from 'react-redux'
import {roomConfig} from "../../actions/roomConfig"
import {socket} from '../../socket/index.js';
//import logo from "../../images/quizlogo.png";
import "./style.css";

function Form() {

  const [difficulty, setDifficulty] = useState("easy");
  const [numberOfQs, setNumberOfQs] = useState(5);
  const [subject, setSubject] = useState("9");


  // const [results, setResults] = useState("");
  // const [index, setIndex] = useState("");
  // const [score, setScore] = useState("");

  const roomName = useSelector(state => state.user.room);
  const id = useSelector(state => state.user.id);
  const username = useSelector(state => state.user.user.username);
  // const resultsFetch = useSelector((state) => state.quizReducer.results);
  // const indexFetch = useSelector((state) => state.quizReducer.current_question_index);
  // const scoreFetch =  useSelector((state) => state.quizReducer.score)
 


  const dispatch = useDispatch();
  const history = useHistory();

 
  

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(roomName)

    dispatch(fetchQuiz(numberOfQs, subject, difficulty));



    // setResults(useSelector(resultsFetch))

    const config =  {
      host: id,
      room: roomName, 
      difficulty: difficulty, 
      count: numberOfQs,
      subject: subject,
      username: username
      // results:results, 
      // current_question_index: index,
      // score: score
    }

    // console.log(results)

    dispatch(roomConfig(numberOfQs,subject,difficulty));

  
    socket.emit("add-config", config, (res) => {
      console.log(res)
    });

    history.push("/lobby");
  };


  const handleChangeDifficulty = (e) => {
    setDifficulty(e.target.value);
  };

  const handleChangeNumberQs = (e) => {
    setNumberOfQs(e.target.value);
  };

  const handleChangeSubject = (e) => {
    setSubject(e.target.value);
    subject(setSubject);
  };

  //random category
  let categories = [
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
  ];
  //let categories = [9, 12, 21, 22, 26, 31]
  const random = Math.floor(Math.random() * categories.length);
  let randomCategory = categories[random];

  return (
    <div>
      {/* <h1 id="lets-get-quizzical">Let's Get Quizzical</h1> */}
      {/* <img src={logo} alt="logo: Let's Get Quizzical" className="logo-small" /> */}
      <form aria-label="game-selection" onSubmit={handleSubmit}>
        {/* <label for="number of players">
          Number of players
          <input type="radio" id="1-player" name="players" value="1 player" />
          <label for="1 player">1 player</label>
          <input type="radio" id="2-players" name="players" value="2 players" />
          <label for="2 players">2 players</label>
          <input type="radio" id="3-players" name="players" value="3 players" />
          <label for="3 players">3 players</label>
        </label> */}
        <label htmlFor="pick a category">
          Pick a category
          <select
            onChange={handleChangeSubject}
            aria-label="category"
            id="category"
          >
            {/* https://opentdb.com/api_category.php */}
            <option value="9">General Knowledge</option>
            <option value="12">Music</option>
            <option value="21">Sport</option>
            <option value="22">Geography</option>
            <option value="31">Anime and Manga</option>
            <option value="26">Celebrities</option>
            <option value={randomCategory}> Surprise Me</option>
          </select>
        </label>
        <br />
        <label htmlFor="number of questions">
          Number of questions (min:5 max:20)
          <input
            value={numberOfQs}
            type="number"
            name="number-of-questions"
            aria-label="number of questions"
            min="5"
            max="20"
            id="number-of-questions"
            onChange={handleChangeNumberQs}
          />
        </label>
        <br />
        <label htmlFor="difficulty">
          Difficulty
          <select
            name="difficulty-level"
            onChange={handleChangeDifficulty}
            aria-label="number of questions"
            id="difficulty"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
        <br />
        <input type="submit" value="Play" id="play-button" />
      </form>
    </div>
  );
}

export default Form;
