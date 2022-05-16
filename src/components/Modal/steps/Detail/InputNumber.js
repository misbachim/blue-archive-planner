import { useState } from 'react'
import styled from 'styled-components';

export function InputNumber({ min = 1, max, state, setState }) {

  if (min >= 0 && state <= min) {
    setState(min);
  }

  const decreaseQty = () => {
    if (state <= min) {
      setState(min);
    } else {
      setState(state - 1);
    }
  };

  const increaseQty = () => {
    if (state >= max) {
      setState(max);
    } else {
      setState(state + 1);
    }
  };

  const onChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > max) {
      setState(max);
    }
    if (value >= 0 && value <= max) {
      setState(value);
    }
  };
  return (
    <>
    <InputWrapper>
      <Input type='text' onChange={onChange} value={state} />
      <ButtonWrapper>
        <Button style={{borderBottomRightRadius: 0}}
          onClick={decreaseQty}>-</Button>
        <Button style={{borderBottomLeftRadius: 0}}
          onClick={increaseQty}>+</Button>
      </ButtonWrapper>
    </InputWrapper>
    </>
  );
};


const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const ButtonWrapper = styled.div`
  display: flex;
`

const Input = styled.input`
  background-color: rgba(100,116,139,1);
  border-radius: 4px 4px 0 0;
  border-color: transparent;
  text-align: center;
  width: 50px;
  height: 40px;
`

const Button = styled.button`
  flex: 1;
  background-color: rgba(71,85,105,1);
  border-radius: 0 0 4px 4px;
  border-color: transparent;
  cursor: pointer;
`
