import axios from 'axios';
import { STATUS } from '../constants';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axiosInstance from '../contexts/AxiosInstance';
import { useEffect, useState } from 'react';

export default function PartyB() {
    const queryClient = useQueryClient();
    const [status, setStatus] = useState<string | null>(null);
    const { data: amount } = useQuery(['amount'], () =>
        axiosInstance.get(`/settlement/amount`).then(res => res.data.amount)
    );
    const { data: response } = useQuery(['response'], () =>
        axiosInstance.get(`/settlement/response`).then(res => res.data)
    );

    useEffect(() => {
        setStatus(response?.status);
    }, [response]);
    const mutation = useMutation(
        (status: string) => axiosInstance.post(`/settlement/respond`, { status }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('amount');
            },
        }
    );

    return (
        <div className='w-96 mx-auto border rounded-lg p-2'>
            <h1 className="text-center text-lg font-bold">
                Party B
            </h1>
            <div className='my-4'>
                <h2>Submitted Amount:
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">${amount || 0}</span>
                </h2>
            </div>
            {status !== STATUS.AGREED && <button
                className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none`}
                onClick={() => {
                    setStatus(STATUS.AGREED);
                    mutation.mutate(STATUS.AGREED);
                }}
            >
                Agree
            </button>}
            {status !== STATUS.DISPUTED && <button
                className={`text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none`}
                onClick={() => {
                    setStatus(STATUS.DISPUTED);
                    mutation.mutate(STATUS.DISPUTED)
                }}
            >
                Dispute
            </button>}
        </div>
    );
}

