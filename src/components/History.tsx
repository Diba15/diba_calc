import type {Calc} from "@prisma/client";
import React, {useEffect} from "react";
import classNames from "classnames";

type Props = {
    calcs: Calc[];
    setCalcs: React.Dispatch<React.SetStateAction<Calc[]>>;
}


/**
 * The `History` component is responsible for rendering a list of all saved calculations.
 * It fetches the calculations from the server when it mounts and displays them in a
 * table. Each calculation is a row in the table and has three columns: the expression,
 * the result, and a delete button. When the delete button is clicked, it sends a DELETE
 * request to the server to delete the calculation. After the request is sent, it
 * filters out the deleted calculation from the list of calculations.
 *
 * @param {{calcs: Calc[], setCalcs: React.Dispatch<React.SetStateAction<Calc[]>>}} props
 * The component accepts two props: `calcs` which is an array of all saved calculations,
 * and `setCalcs` which is a function that updates the `calcs` state.
 *
 * @returns {JSX.Element}
 * The component returns a JSX element that renders the list of calculations.
 */
const History = ({calcs, setCalcs}: Props) => {

    useEffect(() => {
        const fetchCalcs = async () => {
            try {
                const calc = await fetch("/api/getCalcs");
                console.log(calc)
                const data = await calc.json();
                setCalcs(data);
            } catch (e: unknown) {
                if (e instanceof Error) {
                    console.log(e.message);
                }
            }
        }

        fetchCalcs().then(r => r)
    }, [setCalcs]);

    const deleteCalc = async (id: number) => {
        try {
            fetch(`/api/deleteCalcs`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({id}),
            })
                .then(r => r.json())
                .then(() => {
                    console.log("Data Deleted");
                    setCalcs(calcs.filter((calc) => calc?.id !== id));
                })
        } catch (e: unknown) {
            if (e instanceof Error) {
                console.log(e.message);
            }
        }
    }

    return (
        <div className={classNames("min-w-[400px] min-h-fit bg-gray-700 rounded-xl mx-5")}>
            <h1 className={"text-2xl font-bold text-white bg-orange-600 p-4 rounded-t-xl transition-all duration-300"}>History</h1>
            <div className={"flex flex-col gap-2 mt-4 min-h-fit min-w-full p-4"}>
                {
                    calcs.map((calc) => (
                        <>
                            <div key={calc?.id} className={"flex flex-row justify-between"}>
                                <h5 className={""}><code>{calc.expr}</code></h5>
                                <h5><code>{calc.result}</code></h5>
                                <h5>
                                    <button onClick={() => deleteCalc(calc?.id)}>Delete</button>
                                </h5>
                            </div>
                            <hr/>
                        </>
                    ))
                }
            </div>
        </div>
    )
}

export default History;