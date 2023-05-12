export default function({dieValue, isHeld, onHold}){

  const bgColor ={
     backgroundColor: isHeld ? "#59E391" : "#fff" 
  }
  // let dots = [];

  //Create dots for each side of the dice
  const dotConfigurations = [
    null,
    [<span className="dot"></span>],
    [
      <span className="dot"></span>,
      <span className="dot"></span>
    ],
    [
      <span className="dot"></span>,
      <span className="dot"></span>,
      <span className="dot"></span>
    ],
    [
      
      <div key="dot-4a"  className="dot" />,
      <div key="dot-4b" className="dot" />,
      <div key="dot-4c" className="dot" />,
      <div key="dot-4d" className="dot" />
    ],
    [
      <div key="dot-5a" className="dot" />,
      <div key="dot-5b" className="dot" />,
      <div key="dot-5c" className="dot" />,
      <div key="dot-5d" className="dot" />,
      <div key="dot-5e" className="dot" />
    ],
    [
      <div key="dot-6a" className="dot" />,
      <div key="dot-6b" className="dot" />,
      <div key="dot-6c" className="dot" />,
      <div key="dot-6d" className="dot" />,
      <div key="dot-6e" className="dot" />,
      <div key="dot-6f" className="dot" />
    ]
  ];

  const dots = dotConfigurations[dieValue] || [];
  console.log(dots);
    return(
       <>
       <div className="die__face"  style={bgColor} onClick={onHold}>
         <div className={`die__${dieValue}`}>{dots}</div>
         {/* <div className={`die__${dieValue}`}></div> */}
         </div>
       
       </>
    );
}