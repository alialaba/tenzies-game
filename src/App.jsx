import { useEffect, useState } from 'react';
import Die from './Die';
import { nanoid } from 'nanoid';


function App() {

const [dice, setDice] = useState(allNewDice());
const [tenzies, setTenzies] = useState(false);



//SideEffect that run everytime dice changes

useEffect(()=>{
  // const firstValue  =  dice
  const allDiceHeld = dice.every((die) => die.isHeld);


  console.log(allDiceHeld);
},[dice])


//Pull random dice
function generateNewDice(){
  return {
    value: Math.ceil(Math.random() * 6),
    isHeld: false,
    id: nanoid()
  }
}

//Generate Random Number for dice
function allNewDice(){
    let newDice = [];
    for(let i = 0; i < 10; i++){
      newDice.push(generateNewDice())
    }
    return newDice;
  }


//Roll dice
function rollDice(){
  // setDice(allNewDice());

  setDice((oldDice)=> oldDice.map((die)=>( die.isHeld ? die : generateNewDice())))
}



  // Hold dice
  function holdDice(id){

   setDice((prevDice)=> prevDice.map((die)=>(die.id === id ? {...die, isHeld:!die.isHeld} : die)))
  }

  const diceElements = dice.map((die)=> (<Die key={die.id}   dieValue={die.value} isHeld={die.isHeld} onHold={()=> holdDice(die.id)} />))

  return (
    <main className='die__disc'>
            <h1 className="die__title">Tenzies</h1>
            <p className="die__instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='die__container'>
        {diceElements}
        </div>
        <button className='die__btn' onClick={rollDice}>Roll</button>
    </main>
  )
}

export default App
