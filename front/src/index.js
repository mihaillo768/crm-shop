import React, { useState } from "react";
import ReactDOM from "react-dom";
import Board, { moveCard, moveColumn, removeCard, removeColumn } from "@lourenci/react-kanban";
import Card from "./card";
import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
// Use your own styles to override the default styles
// import "./styles.css";


const axios = require('axios');
const cfg_backend_url = "http://127.0.0.1:8000";

const board = {
  columns: [
    {
      id: 1,
      title: "Backlog",
      cards: [
        {
          id: 1,
          title: "Card title 1",
          description: "Card content"
        },
        {
          id: 2,
          title: "Card title 2",
          description: "Card content"
        },
        {
          id: 3,
          title: "Card title 3",
          description: "Card content"
        }
      ]
    },
    {
      id: 2,
      title: "Doing",
      cards: [
        {
          id: 9,
          title: "Card title 9",
          description: "Card content"
        }
      ]
    },
    {
      id: 3,
      title: "Q&A",
      cards: [
        {
          id: 10,
          title: "Card title 10",
          description: "Card content"
        },
        {
          id: 11,
          title: "Card title 11",
          description: "Card content"
        }
      ]
    },
    {
      id: 4,
      title: "Production",
      cards: [
        {
          id: 12,
          title: "Card title 12",
          description: "Card content"
        },
        {
          id: 13,
          title: "Card title 13",
          description: "Card content"
        }
      ]
    }
  ]
};

function ControlledBoard() {
  // You need to control the state yourself.
  const [controlledBoard, setBoard] = useState(board);

  function handleCardMove(_card, source, destination) {
    console.log(_card);

    axios.post(cfg_backend_url + "/move_card/", 
      	{
	          fromColumnId: source.fromColumnId,
	          fromPosition: source.fromPosition,
	          toColumnId: destination.toColumnId,
            toPosition: destination.toPosition,
            cardId: _card.id 
	      }
              ).then(function (response) {
    	              console.log(response);
              }).catch(function (err) {
            	console.error(err);
              });

    const updatedBoard = moveCard(controlledBoard, source, destination);
    setBoard(updatedBoard);
  }

  function handleColumnMove(_column, source, destination) {
    const updatedBoard = moveColumn(controlledBoard, source, destination);
    console.log(source)
    console.log(destination)
    setBoard(updatedBoard);
  }

  function handleCardRemove(board, fromColumn, card) {
    const updatedBoard = removeCard(controlledBoard, fromColumn, card);
    console.log(fromColumn)
    console.log(card)
    setBoard(updatedBoard);
  }

  return (
    <Board onCardDragEnd={handleCardMove}
    onColumnRemove={console.log}
    onCardRemove={console.log}
    onColumnDragEnd={handleColumnMove}
    allowRenameColumn
    onColumnRename={console.log}

    >
      {controlledBoard}
    </Board>
  );
}

function UncontrolledBoard() {
  return (
    <Board
      renderCard={({ content }, { removeCard, dragging }) => (
        <div class="card bg-light mt-" style={{width: 200}}>
            <Card  dragging={dragging}/>
            <button type="button" class="btn btn-light" style={{border:"2px solid black"}} onClick={removeCard}>Remove Card</button>
        </div>
      )}
      renderColumnHeader={({ title }, {addCard }) => (
        <div className="d-flex justify-content-between">
          {title}
          <button type='button' class="btn btn-light" style={{border:"2px solid black"}} onClick={() => addCard({ id: new Date().getTime(), title: 'New Card' })}>Add Card</button>
        </div>
      )}
      onColumnRename={console.log}
      allowRemoveLane
      onLaneRemove={console.log}
      onCardRemove={console.log}
      onLaneRename={console.log}
      initialBoard={board}
      //allowAddCard={{ on: "top" }}
      //onNewCardConfirm={draftCard => ({
      //  id: new Date().getTime(),
     //   ...draftCard
    //  })}
     onCardNew={console.log}
    />
  );
}

function App() {
  return (
    <>
      <h4>Example of an uncontrolled board</h4>
      <UncontrolledBoard />
      <h4>Example of a controlled board</h4>
      <p>Just the card moving is implemented in this demo.</p>
      <p>
        In this kind of board, you can do whatever you want. We just mirror your
        board state.
      </p>
      <ControlledBoard />
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
