import classNames from "classnames";
import CalcButton from "@/components/CalcButton";
import React from "react";

export default function Home() {
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
            resultInput.innerText = eval(inputArray.join(""));
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

    return (
        <div className={classNames("flex flex-row justify-center items-center min-h-screen")}>
            <div
                className={classNames("flex flex-col gap-3 bg-white pb-8 mb-4 min-h-fit max-w-96 rounded-xl")}>
                <div className={classNames("flex flex-col items-end bg-black rounded-t-md")}>
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
        </div>
    );
}
