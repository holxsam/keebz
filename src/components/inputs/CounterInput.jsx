import styled from "@emotion/styled";
import { useCallback, useEffect, useRef, useState } from "react";

const Container = styled.div`
  height: 2rem;
  /* width: 7rem; */
  /* border: 1px solid red; */

  display: flex;
`;

const Input = styled.input`
  height: 100%;
  width: 4rem;
  color: black;
  padding: 0 0.5rem 0 0.5rem;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Button = styled.button`
  height: 100%;
  min-width: 2rem;
  background-color: #222;
  color: black;
`;

const Label = styled.label`
  /* font-family: monospace; */
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.75rem;
`;

const roundTo2 = (value) => Number(value).toFixed(2);

const CounterInput = ({ value, onChange, step = 1, label, id, ...props }) => {
  const [inputValue, setInputValue] = useState(roundTo2(value));
  const [incrementing, setIncrementing] = useState(false);
  const [decrementing, setDecrementing] = useState(false);

  const op = (scalar = 1) => {
    const convertedValue = parseFloat(roundTo2(inputValue));
    const newValue = roundTo2(convertedValue + step * scalar);
    setInputValue(newValue);
    onChange(parseFloat(newValue));
  };

  const increment = useCallback(() => op(1), [op]);
  const decrement = () => op(-1);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputChange = () => {
    const formattedValue = roundTo2(inputValue);
    setInputValue(formattedValue);
    onChange(parseFloat(formattedValue));
  };

  const submit = (e) => {
    if (e.key === "Enter") handleInputChange();
  };

  useEffect(() => {
    const fn = incrementing ? increment : decrementing ? decrement : null;
    const timer = fn && setInterval(fn, 150);

    return () => {
      clearInterval(timer);
    };
  }, [incrementing, decrementing, increment, decrement, value]);

  return (
    <Container>
      {label && <Label htmlFor={id}>{label}</Label>}
      {/* {JSON.stringify({ incrementing, decrementing })} */}
      <Input
        type="number"
        id={id}
        value={inputValue}
        onChange={handleChange}
        onBlur={handleInputChange}
        onKeyPress={submit}
      />
      <Button
        onClick={decrement}
        onMouseDown={() => setDecrementing(true)}
        onMouseUp={() => setDecrementing(false)}
        onMouseLeave={() => setDecrementing(false)}
      >
        -
      </Button>
      <Button
        onClick={increment}
        onMouseDown={() => setIncrementing(true)}
        onMouseUp={() => setIncrementing(false)}
        onMouseLeave={() => setIncrementing(false)}
      >
        +
      </Button>
    </Container>
  );
};

export default CounterInput;
