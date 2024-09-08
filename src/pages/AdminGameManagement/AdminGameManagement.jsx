import React, { useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {useParams, useNavigate} from "react-router-dom";

import "./style.css";
import GameTableView from '../../../components/GameTableView';
import PaginationBar from '../../../components/PaginationBar';

function AdminGameManagement() {

  const totalPages = 10;

  const data = [
    {
      id: 1, 
      name: "Trivia Blast", 
      type: "Trivia Quiz", 
      exchangable: "No", 
      instruction: "Each correct answer is worth 1000 points. If you pay late, every second will deduct 15 points. At the end of each question, the host will not repeat any questions. Each wrong answer is worth 0 points. The decision of the host is final.", 
      imageFile: ""
    },
    {id: 2, 
      name: "Lắc Xì", 
      type: "Roll Dice", 
      exchangable: "Yes", 
      instruction: "You can shake the phone if it supports it otherwise you can press the button right on the screen", 
      imageFile: ""},
    ];

  const [games, setGames] = useState();
  
  let navigate = useNavigate();

  useEffect(() => {
    const gameData = JSON.parse(localStorage.getItem("gameData"));
    if(!gameData){
      localStorage.setItem("gameData",JSON.stringify(data));
    }else{
      setGames(gameData);
    }
  }, [])

  function editGame(id){
    navigate(`/admin/game-management/${id}`);
  }

  function newGame(){
    navigate(`/admin/game-management/new`);
  }

  function deleteGame(id){
    //make API call
  
  }

  function changePage(number){
    //do sth
    console.log("Page " + number);
  }

  return (
    <div className="GameManagement">
      {/* <div style={{height: "50px"}}>
        <button className='Button'onClick={newGame} >Add new game</button>
      </div> */}
      <GameTableView data={games} onDelete={deleteGame} onEdit={editGame} />
      <PaginationBar totalPages={totalPages} onPageChange={changePage}/>
    </div>
  )
}

export default AdminGameManagement