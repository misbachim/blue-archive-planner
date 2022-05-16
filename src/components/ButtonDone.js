import styled from "styled-components";
import { IconContext } from 'react-icons'
import { AiFillCheckCircle } from "react-icons/ai";

export function ButtonDone({ onClick }) {
  return (
    <Button onClick={onClick}>
      <IconContext.Provider
        value={{ color: 'white' }}
      >
        <AiFillCheckCircle />
      </IconContext.Provider>
      DONE
    </Button>
  )  
}

const Button = styled.button`
  display: flex;
  align-items: center;
  border-radius: 4px;
  border: none;
  background: rgba(5,150,105,1);
  color: #fff;
  cursor: pointer;
  gap: 4px;
  padding: 4px;
  letter-spacing: .025em;
  font-weight: 600;
  font-size: .75rem;
  line-height: 1rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;
