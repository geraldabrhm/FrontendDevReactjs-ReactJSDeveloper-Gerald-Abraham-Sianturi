const ColoredCircle = ({ color = "black", size="3" }: any) => {
    return (
        <div className={`w-${size} h-${size} bg-${color} rounded-full`}/>
    );
}

export default ColoredCircle;