import './Square.css'
function Square(props, winnerClass, value, onClick) {
    return (
        <button className={`${props.winnerClass} square`} onClick={props.onClick}>
            {props.value}
        </button>
    );
}
 export default Square