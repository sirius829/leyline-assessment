import axios from 'axios';
import { STATUS } from '../constants';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export default function PartyB() {
    const queryClient = useQueryClient();
    const api_url = process.env.REACT_APP_API_URL || '';
    const { data: amount } = useQuery(['amount'], () =>
        axios.get(`${api_url}/api/v1/amount`).then(res => res.data.amount)
    );
    const mutation = useMutation(
        (status: string) => axios.post(`${api_url}/api/v1/respond`, { status }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('amount');
            },
        }
    );
    //   const [amount, setAmount] = useState(0);

    //   useEffect(() => {
    //     // Fetch current amount submitted by Party A
    //     axios.get('/api/amount')
    //       .then(res => setAmount(res.data.amount))
    //       .catch(err => console.error(err));
    //   }, []);

    //   const handleResponse = (status: number) => {
    //     axios.post('/api/respond', { status })
    //       .catch(err => console.error(err));
    //   };

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
            <button
                className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none`}
                onClick={() => mutation.mutate(STATUS.AGREED)}
            >
                Agree
            </button>
            <button
                className={`text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none`}
                onClick={() => mutation.mutate(STATUS.DISPUTED)}
            >
                Dispute
            </button>
        </div>
    );
}

