import classNames from "classnames";
import Calc from "@/components/Calc"
import React from "react";
import Image from "next/image"
import bg from "../../public/tile_background.png";

export default function Home() {

    return (
        <div className={classNames("flex flex-row justify-center items-center min-h-screen bg-pattern")}>
            <Image src={bg} alt={"Background"} fill style={{objectFit: "cover"}} quality={100}
                   className={"blur-[1px]"}/>
            <div className={"z-10"}>
                <Calc/>
            </div>
        </div>
    );
}
