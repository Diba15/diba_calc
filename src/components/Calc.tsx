"use client"
import classNames from "classnames";
import CalcButton from "@/components/CalcButton";
import React from "react";
import {evaluate} from "mathjs";
import type { Calc } from "@prisma/client";

type Props = {
    calcs: Calc[];
    setCalcs: React.Dispatch<React.SetStateAction<Calc[]>>;
    history: boolean;
    setHistory: React.Dispatch<React.SetStateAction<boolean>>
}

const Calc = ({calcs, setCalcs, history, setHistory}: Props) => {

    React.useEffect(() => {
        const buttonId = ["AC", "DEL", "%", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "="];

        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key;

            if (e.key === "Escape") {
                const button = document.getElementById("AC") as HTMLButtonElement;
                button.click();
            }

            if (e.key === "Backspace") {
                const button = document.getElementById("DEL") as HTMLButtonElement;
                button.click();
            }

            if (e.key === "Enter") {
                const button = document.getElementById("=") as HTMLButtonElement;
                button.click();
            }

            if (buttonId.includes(key)) {
                const button = document.getElementById(key) as HTMLButtonElement;
                button.click();
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    });

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const resultInput = document.getElementById("result") as HTMLInputElement;

        const operator: string[] = ["+", "-", "*", "/"];

        const inputArray = resultInput.innerText.split("");

        // take last value of inputArray
        const lastValue = inputArray[inputArray.length - 1];

        if (!operator.includes(lastValue) && e.currentTarget.innerHTML === "=") {
            const expr = inputArray.join("");
            const result = String(evaluate(expr));

            resultInput.innerText = result;

            console.log(JSON.stringify({expr, result}))

            // Save history to Database
            try {
                fetch("/api/hello", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({expr, result}),
                })
                    .then(r => r.json())
                    .then(data => {
                        console.log("Data Saved");
                        setCalcs([data, ...calcs]);
                    });
            } catch (e: unknown) {
                if (e instanceof Error) {
                    console.log(e.message);
                }
            }
        } else if (e.currentTarget.innerHTML === "AC") {
            resultInput.innerText = String(0);
        } else if (e.currentTarget.innerHTML === "DEL") {
            inputArray.pop();
            resultInput.innerText = inputArray.join("");
            if (resultInput.innerText.length == 0) {
                resultInput.innerText = String(0);
            }
        } else if (e.currentTarget.innerHTML === "%") {
            resultInput.innerText = (Number(resultInput.innerText) / 100).toString();
        } else {


            if (Number(resultInput.innerHTML) === 0) {
                if (operator.includes(e.currentTarget.innerHTML)) {

                } else {
                    inputArray.pop();
                }
            }

            if (operator.includes(lastValue) && !Number(e.currentTarget.innerHTML)) {
                inputArray.pop();
            }

            inputArray.push(e.currentTarget.innerHTML.trim());

            resultInput.innerText = inputArray.join("");
        }
    }

    const comingSoon = () => {
        alert("coming soon");
    }

    const handleHistory = () => {
        setHistory(!history);
    }

    return (
        <div
            className={classNames("flex flex-col gap-3 bg-white pb-8 mb-4 min-h-fit max-w-fit rounded-xl z-10 mx-5")}>
            <div className={classNames("flex flex-col items-end bg-gray-800 rounded-t-md")}>
                <button onClick={handleHistory} id={"btn-history"} className={"px-4 py-2 text-white bg-orange-600 hover:bg-orange-800"}>History</button>
                <h1 id="result" className="text-4xl font-bold text-end py-4 px-4">0</h1>
            </div>
            <div className="flex flex-row gap-2 px-3 min-h-fit">
                <CalcButton id="AC" text="AC" backgroundColor="bg-gray-600" color="text-white"
                            handleClick={handleClick}
                            hoverBg="hover:bg-gray-800"/>
                <CalcButton id="DEL" text="DEL" backgroundColor="bg-gray-600" color="text-white"
                            handleClick={handleClick}
                            hoverBg="hover:bg-gray-800"/>
                <CalcButton id="%" text="%" backgroundColor="bg-gray-600" color="text-white"
                            handleClick={handleClick}
                            hoverBg="hover:bg-gray-800"/>
                <CalcButton id="/" text="/" backgroundColor="bg-orange-600" color="text-white"
                            handleClick={handleClick}
                            hoverBg="hover:bg-orange-800"/>
            </div>
            <div className="flex flex-row gap-2 px-3 min-h-fit">
                <CalcButton id="7" text="7" backgroundColor="bg-gray-800" color="text-white"
                            handleClick={handleClick}
                            hoverBg="hover:bg-gray-900"/>
                <CalcButton id="8" text="8" backgroundColor="bg-gray-800" color="text-white"
                            handleClick={handleClick}
                            hoverBg="hover:bg-gray-900"/>
                <CalcButton id="9" text="9" backgroundColor="bg-gray-800" color="text-white"
                            handleClick={handleClick}
                            hoverBg="hover:bg-gray-900"/>
                <CalcButton id="*" text="*" backgroundColor="bg-orange-600" color="text-white"
                            handleClick={handleClick}
                            hoverBg="hover:bg-orange-800"/>
            </div>
            <div className="flex flex-row gap-2 px-3 min-h-fit">
                <CalcButton id="4" text="4" backgroundColor="bg-gray-800" color="text-white"
                            handleClick={handleClick}
                            hoverBg="hover:bg-gray-900"/>
                <CalcButton id="5" text="5" backgroundColor="bg-gray-800" color="text-white"
                            handleClick={handleClick}
                            hoverBg="hover:bg-gray-900"/>
                <CalcButton id="6" text="6" backgroundColor="bg-gray-800" color="text-white"
                            handleClick={handleClick}
                            hoverBg="hover:bg-gray-900"/>
                <CalcButton id="-" text="-" backgroundColor="bg-orange-600" color="text-white"
                            handleClick={handleClick}
                            hoverBg="hover:bg-orange-800"/>
            </div>
            <div className="flex flex-row gap-2 px-3 min-h-fit">
                <CalcButton id="1" text="1" backgroundColor="bg-gray-800" color="text-white"
                            handleClick={handleClick}
                            hoverBg="hover:bg-gray-900"/>
                <CalcButton id="2" text="2" backgroundColor="bg-gray-800" color="text-white"
                            handleClick={handleClick}
                            hoverBg="hover:bg-gray-900"/>
                <CalcButton id="3" text="3" backgroundColor="bg-gray-800" color="text-white"
                            handleClick={handleClick}
                            hoverBg="hover:bg-gray-900"/>
                <CalcButton id="+" text="+" backgroundColor="bg-orange-600" color="text-white"
                            handleClick={handleClick}
                            hoverBg="hover:bg-orange-800"/>
            </div>
            <div className="flex flex-row gap-2 px-3 justify-between min-h-fit min-w-full">
                <button onClick={comingSoon}
                        className="rounded-full w-[65px] h-[65px] bg-gray-800 text-white hover:bg-gray-900"> Math
                </button>
                <div className="flex flex-row gap-2">
                    <button onClick={handleClick} id="0"
                            className="rounded-full w-[65px] h-[65px] bg-gray-800 text-white hover:bg-gray-900">0
                    </button>
                    <CalcButton id="." text="." backgroundColor="bg-gray-800" color="text-white"
                                handleClick={handleClick}
                                hoverBg="hover:bg-gray-900"/>
                    <CalcButton id="=" text="=" backgroundColor="bg-orange-600" color="text-white"
                                handleClick={handleClick}
                                hoverBg="hover:bg-orange-800"/>
                </div>
            </div>
        </div>
    )
}

export default Calc;