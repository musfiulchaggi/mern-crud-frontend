import { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import { AiOutlineEdit} from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineAddBox , MdOutlineDelete } from 'react-icons/md'


const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
        .get('http://localhost:3000/api/products')
        .then((res) => {
            setProducts(res.data);
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
        });
    }, []);

    return (
        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8 font-semibold'>Products List</h1>
                <Link to='/products/create' >
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>

            {loading ? (
                <Spinner />
            ) : (
                <table className='w-full border-separate border-spacing-2'>
                    <thead>
                        <tr>
                            <th className='border border-slate-600 rounded-md'>No</th>
                            <th className='border border-slate-600 rounded-md'>Name</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>Quantity</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>Price</th>
                            <th className='border border-slate-600 rounded-md'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product , index) => (
                            <tr key={product._id} className='h-8'>
                                <td className='border border-slate-700 rounded-md text-center'>{index + 1}</td>
                                <td className='border border-slate-700 rounded-md text-center'>{product.name}</td>
                                <td className='border border-slate-700 rounded-md text-center'>{product.quantity}</td>
                                <td className='border border-slate-700 rounded-md text-center'>{product.price}</td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    <div className='flex justify-center gap-x-4'>
                                
                                        <Link to={`/products/details/${product._id}`}>
                                            <BsInfoCircle className='text-green-800 text-2xl mx-2' />
                                        </Link>
                                        <Link to={`/products/edit/${product._id}`}>
                                            <AiOutlineEdit className='text-yellow-800 text-2xl mx-2' />
                                        </Link>
                                        <Link to={`/products/delete/${product._id}`}>
                                            <MdOutlineDelete className='text-red-800 text-2xl mx-2' />
                                        </Link>
                                
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Home