import { useState } from "react";
import { IoIosBackspace } from "react-icons/io";
import "./style.css";

export const Calc = () => {
    const [eqn, setEqn] = useState("");     
    const digits = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];
   
    const operators = [
        {id:"plus", operand:'+'},
        {id:"minus", operand:'-'},
        {id:"multiply", operand:'*'},
        {id:"division", operand:'/'},
        {id:"decimal", operand:'.'},
        {id:"left-bracket", operand:'('},
        {id:"right-bracket", operand:')'}
    ];

    const handleInput = (value) => {
        if (eqn === "INVALID") setEqn("")
        setEqn((prev) => prev + value); 
    }

    const calcAnswer = (value) => {
        try{
            setEqn(String(eval(value)));
        } catch (err) {
            console.log("Incorrect Expression\n",err);
            setEqn("INVALID");
        }       
    }

    const backSpace = () => {
        setEqn(eqn.slice(0,eqn.length-1));
    }

    const allClear = () => {
        setEqn("");
    }

    return (
        
        <section className="Calculator">
            <h1>CALCULATOR</h1>
          <section className="Container">
            <section className="display">{eqn}</section>

            <section>
                <div>
                    <ul className="Btn-list">
                        {digits.map((curElem) => (
                            <button key={curElem} onClick={() => handleInput(curElem)}>
                                {curElem}
                            </button> 
                        ))}
                        {operators.map((curOp) => (
                            <button key={curOp.id} onClick={() => handleInput(curOp.operand)}>{curOp.operand}</button>
                        ))}
                    </ul>
                    <div className="Btn-list">
                        <button onClick={() => calcAnswer(eqn)}>=</button>
                        <button onClick={() => backSpace()}><IoIosBackspace /></button>
                        <button onClick={() => allClear()}>CLR</button>
                    </div>        
                </div>
            </section>
          </section>
          <h1>Made By Diwangshu Kakoty</h1>
        </section>
    );
}


