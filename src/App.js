import { useState, useRef, useEffect } from "react";
import AnimatedGif from "./AnimatedGif";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [userString, setUserString] = useState("");
  const [reason, setReason] = useState("");
  const audioRef = useRef(null);
  const [audioSrc, setAudioSrc] = useState("");
  const [disable, setDisable] = useState(false);
  const intNum = 45;
  const strNum = "FORTYFIVE";
  const strThala = `${intNum} - HITMAN for a reason`;
  const CharMapping = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5,
    F: 6,
    G: 7,
    H: 8,
    I: 9,
    J: 10,
    K: 11,
    L: 12,
    M: 13,
    N: 14,
    O: 15,
    P: 16,
    Q: 17,
    R: 18,
    S: 19,
    T: 20,
    U: 21,
    V: 22,
    W: 23,
    X: 24,
    Y: 25,
    Z: 26,
  };
  const myFunc = [
    checkForEqual,
    checkAdditionOfDigits,
    checkForModOrDivision,
    checkForIncludes,
    checkLetterAndAdd2,
    checkForLength,
  ];
  useEffect(() => {
    if (reason) {
      setAudioSrc(`${process.env.PUBLIC_URL}/thala.mp3`); // Set audioSrc again after resetting
    }
  }, [reason]);

  useEffect(() => {
    if (audioSrc && audioRef.current) {
      audioRef.current.load();
      // audioRef.current.play().catch((error) => {
      //   console.error("Error playing audio:", error);
      // });
    }
  }, [audioSrc]);
  const handleString = (e) => {
    const value = e.target.value.replace(/\s/g, "");
    setUserString(value);
  };
  const handleSubmit = () => {
    let newReason = "";
    if (userString.length === 0) {
      alert("Please enter anything first!..");
      return false;
    }
    // if (!isNaN(userString)) {
    //   var check1 = checkForEqual(userString);
    //   if (check1[0]) {
    //     newReason = check1[1] + strThala;
    //   } else {
    //     var check2 = checkAdditionOfDigits(userString);
    //     if (check2[0]) {
    //       newReason = check2[1] + strThala;
    //     } else {
    //       var check3 = checkForModOrDivision(userString);
    //       if (check3[0]) {
    //         newReason = check3[1] + strThala;
    //       }
    //     }
    //   }
    // } else {
    //   var check4 = checkForIncludes(userString);
    //   if (check4[0]) {
    //     newReason = check4[1] + strThala;
    //   } else {
    //     var check5 = checkLetterAndAdd(userString);
    //     if (check5[0]) {
    //       newReason = check5[1] + strThala;
    //     }
    //   }
    // }
    // if (newReason === "") {
    //   var check6 = checkForLength(userString);
    //   if (check6[0]) {
    //     newReason = check6[1] + strThala;
    //   }
    // }
    // for (let i = 0; i < myFunc.length; i++) {
    //   const tempReturnValue = myFunc[i](userString);
    //   if (tempReturnValue) {
    //     newReason = tempReturnValue + strThala;
    //     break;
    //   }
    // }
    myFunc.forEach((functionCall) => {
      if (newReason) return; 
      const tempReturnValue = functionCall(userString);
      if (tempReturnValue) {
        newReason = tempReturnValue + strThala;
      }
    });

    setReason(newReason);
    setAudioSrc("");
    setDisable(true);
  };

  function checkAdditionOfDigits(num) {
    const numbers = num.split("");
    let addition = 0;
    addition = numbers.reduce((getSum, number) => {
      return (getSum = getSum + Number(number));
    }, 0);
    if (Number(addition) === intNum) {
      return numbers.join("+") + " = ";
    } else if (Number(num) < intNum) {
      let addNum = intNum - Number(num);
      return num + "+" + addNum + " is";
    }
    // else {
    //   return false;
    // }
  }

  function checkForIncludes(str) {
    if (str.includes(intNum) || str.toUpperCase().includes(strNum)) {
      let strMesg = str.toUpperCase().includes(strNum) ?"Bro you are ":"String includes ";
      return strMesg;
    }
    // else {
    //   return false;
    // }
  }

  function checkForModOrDivision(num) {
    const remainder = num % intNum;
    const quotient = Math.floor(num / intNum);

    if (Number(remainder) === 0) {
      return "Division operation - " + num + " divided by " + quotient + " is";
    } else if (Number(remainder) > 0) {
      return (
        "Subtraction = " +
        num +
        "-" +
        remainder +
        " then Division operation - divided by " +
        quotient +
        " is "
      );
    }
    // else {
    //   return false;
    // }
  }

  function checkForEqual(num) {
    if (Number(num) === intNum) {
      return Number(num) + " = ";
    }
    // else {
    //   return false;
    // }
  }

  function checkForLength(str) {
    if (Number(str.length) === intNum) {
      return "Length of the string is ";
    } else if (str.length < intNum) {
      let numToAdd = intNum - str.length;
      return "Length of the string is " + str.length + " +" + numToAdd + " is ";
    } else if (str.length > intNum) {
      let numToSubtract = str.length - intNum;
      return "Length of the string is " + str.length + " -" + numToSubtract + " is ";
    }
  }

  function checkLetterAndAdd(str) {
    const ele = str.split("");
    let add = 0;
    let strMessage = "";
    for (let i = 0; i < ele.length; i++) {
      if (isNaN(ele[i])) {
        add = add + Number(CharMapping[ele[i].toUpperCase()]);
        strMessage =
          i === ele.length - 1
            ? strMessage +
              (ele[i].toUpperCase() +
                "= " +
                Number(CharMapping[ele[i].toUpperCase()]) +
                "=")
            : strMessage +
              (ele[i].toUpperCase() +
                "= " +
                Number(CharMapping[ele[i].toUpperCase()]) +
                "+");
      } else {
        add = add + Number(ele[i]);
        strMessage =
          i === ele.length - 1
            ? strMessage + (ele[i].toUpperCase() + " =")
            : strMessage + (ele[i].toUpperCase() + " +");
      }
    }
    if (Number(add) === intNum) {
      return strMessage;
    } 
    // else {
    //   return false;
    // }
  }
  function checkLetterAndAdd2(str) {
    const ele = str.split("");
    let add = 0;
    let strMessage = "";
    for (let i = 0; i < ele.length; i++) {
      if (isNaN(ele[i])) {
        add = add + Number(CharMapping[ele[i].toUpperCase()]);
        strMessage =
          strMessage +
          ele[i] +
          " = " +
          Number(CharMapping[ele[i].toUpperCase()]) +
          ", ";
      } else {
        add = add + Number(ele[i]);
      }
    }
    if (Number(add) === intNum) {
      return strMessage + ele.join("+") + " = ";
    } 
    // else {
    //   return false;
    // }
  }

  const handleContinue = () => {
    if (audioSrc && audioRef.current) {
      audioRef.current.pause();
    }
    setReason("");
    setUserString("");
    setDisable(false);
  };

  return (
    <div className="customBG">
      <div className="container">
        <div className="input-group mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            placeholder={`Enter anything to know why ${intNum} - Thala for a reason`}
            aria-label={`Enter anything to know why ${intNum} - Thala for a reason`}
            aria-describedby="button-addon2"
            value={userString}
            onChange={handleString}
            maxLength={45}
            disabled={disable}
          />
          <button
            className="btn btn-primary"
            type="button"
            id="button-addon2"
            onClick={handleSubmit}
            disabled={disable}
          >
            Submit
          </button>
        </div>
        <p id="45" className="text-center fw-bolder text-primary">
          {reason}
        </p>
        {reason && (
          <div>
            <AnimatedGif
              src="https://cdn.dribbble.com/users/1534202/screenshots/9830112/thala_dribble.gif"
              alt="Thala img"
            />
            <audio
              ref={audioRef}
              src={audioSrc} // Correctly refer to the audio file in the public directory
              controls
              className="hidden"
            />
            <button
              type="button"
              className="thalabtn btn btn-info mb-2"
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
