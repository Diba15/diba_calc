"use client"
import classNames from "classnames";
import React from "react";

interface CalcButtonModule {
    id: string,
    backgroundColor: string,
    hoverBg: string,
    color: string,
    text: string,
    handleClick: React.MouseEventHandler<HTMLButtonElement>
}

const CalcButton = ({id, backgroundColor, hoverBg, color, text, handleClick}: CalcButtonModule) => {

    return (
        <button onClick={handleClick} id={id} className={classNames("rounded-full h-[65px] w-[65px]", backgroundColor, color, hoverBg)}>{text}</button>
    )
}

export default CalcButton;