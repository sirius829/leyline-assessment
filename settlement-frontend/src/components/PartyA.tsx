import { useEffect, useState } from "react";
import { STATUS } from "../constants";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axiosInstance from "../contexts/AxiosInstance";

export default function PartyA() {
    const [amount, setAmount] = useState(0);
    const [isWaiting, setWaiting] = useState(false);
    const [message, setMessage] = useState("");
    const queryClient = useQueryClient();
    const { data: response } = useQuery(['response'], () =>
        axiosInstance.get(`/settlement/response`).then(res => res.data)
    );
    useEffect(() => {
        axiosInstance.get(`/settlement/amount`)
            .then(res => {
                setAmount(res.data.amount || 0);
                if (res.data.amount)
                    setWaiting(true);
            })
            .catch(err => console.error(err));
    }, []);
    const mutation = useMutation<number, unknown, number>(
        (newAmount) => axiosInstance.post(`/settlement/submit`, { amount: newAmount }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('response');
                setMessage("Successfuly submitted");
                setWaiting(true);
            },
        }
    );
    const handleSubmit = () => {
        mutation.mutate(amount);
    };

    return (
        <div className="w-96 mx-auto border rounded-lg p-2">
            <h1 className="text-center text-lg font-bold mb-4">
                Party A
            </h1>
            {response && (response.status === STATUS.AGREED || response.status === STATUS.DISPUTED) ? (
                <div
                    className="mb-4"
                >
                    <h2>Party B's Response:</h2>
                    <span
                        className={`${response?.status === STATUS.AGREED ? 'bg-green-100 text-green-800' : response?.status === STATUS.DISPUTED ? 'bg-red-100 text-red-800' : ""}  text-xs font-medium me-2 px-2.5 py-0.5 rounded`}
                    >
                        {response?.status === STATUS.AGREED ? 'Agreed' : response?.status === STATUS.DISPUTED ? 'Disputed' : ""}
                    </span>
                </div>
            ) : ""}


            {isWaiting && !response.status && (
                <div
                    className="my-4"
                >
                    Waiting for response from Party B
                </div>
            )}
            <div className="relative mb-6">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-event-none">
                    $
                </div>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(parseInt(e.target.value))}
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 outline-none ${response?.status === STATUS.AGREED ? 'cursor-not-allowed bg-gray-300' : ''}`}
                />
            </div>
            {message && <p className="mt-2 text-center text-blue-600">{message}</p>}
            <button
                className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none`}
                disabled={response?.status === STATUS.AGREED}
                onClick={handleSubmit}
            >Submit</button>
        </div>
    );
}