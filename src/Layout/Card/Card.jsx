

const Card = ({title,color}) => {
    return (
        <div className="bg-white h-60 rounded-lg ">
            <div className={`${color} h-8 py-1 text-center rounded-ss-lg rounded-se-lg`}>
           {title} 
           </div>
        </div>
    );
};

export default Card;