export const Square = (props) => {
  return (
    <button className="square" onClick={props.onClick}>
      {/* Display X or O in the square. */}
      {props.value}
    </button>
  );
};

export const Reset = (props) => {
  return (
    <button className="reset" onClick={props.onClick}>
      Reset
    </button>
  );
};
