import empty from '../../assets/emptyicon.png'

const Home = () => {
    return (
        <div className='flex px-16 py-4 justify-between '>
        <div className="text-xl font-semibold">
        Task Board
        </div>
        <div>
        <img className='w-10 h-10 bg-white rounded-full' src={empty} alt="" />
        </div>
     </div>
    );
};

export default Home;