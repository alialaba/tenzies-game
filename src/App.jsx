import { useState } from 'react';
import Die from './Die';
import { nanoid } from 'nanoid';


function App() {

const [dice, setDice] = useState(allNewDice());


//Roll dice
function rollDice(){
  setDice(allNewDice());
}

  //Generate Random Number for dice
function allNewDice(){
    let newDice = [];
    for(let i = 0; i < 10; i++){
      //random number from 1-6
      const randomNumber = Math.ceil(Math.random() * 6);
      newDice.push({
        value: randomNumber,
        isHeld: false,
        id: nanoid()

      })
    }
    return newDice;
  }

  // console.log(allNewDice());

  const diceElements = dice.map((die)=> (<Die key={die.id} dieValue={die.value} isHeld={die.isHeld}/>))

  return (
    <main className='die__disc'>
      <div className='die__container'>
        {diceElements}
        </div>
        <button className='die__btn' onClick={rollDice}>Roll</button>
    </main>
  )
}

export default App
