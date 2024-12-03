import classNames from "classnames";
import Calc from "@/components/Calc"
import History from "@/components/History"
import React, {useState} from "react";
import Image from "next/image"
import bg from "../../public/tile_background.png";
import {motion, AnimatePresence} from "framer-motion";

/**
 * The home page of the application, which renders a calculator and a history panel.
 *
 * The calculator is rendered as a `Calc` component, which takes in the calculator data,
 * a function to set the calculator data, whether to show the history, and a function to
 * set whether to show the history.
 *
 * The history panel is conditionally rendered based on the value of `history`. If
 * `history` is `true`, the history panel is rendered as a `History` component, which
 * takes in the calculator data and a function to set the calculator data. The history
 * panel is animated in and out using Framer Motion.
 *
 * @returns The JSX element for the home page.
 */

export default function Home() {
    // Calc Data
    const [calcs, setCalcs] = useState<Calc[]>([])
    // Show History
    const [history, setHistory] = useState<boolean>(false)

    return (
        <div className={classNames("flex flex-row justify-center items-center min-h-screen bg-pattern")}>
            <Image src={bg} alt={"Background"} fill style={{objectFit: "cover"}} quality={100}
                   className={"blur-[1px]"}/>
            <div className={"flex flex-col md:flex-row gap-4 justify-center items-center md:items-start z-10"}>
                <Calc calcs={calcs} setCalcs={setCalcs} history={history} setHistory={setHistory}/>
                {/*Show History if history is true*/}
                <AnimatePresence>
                    {
                        history && (
                            <motion.div
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -20}}
                                transition={{duration: 0.5}}
                            >
                                <History calcs={calcs} setCalcs={setCalcs}/>
                            </motion.div>
                        )
                    }
                </AnimatePresence>
            </div>
        </div>
    );
}
