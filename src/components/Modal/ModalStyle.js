import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

export const Background = styled.div`
top: 0;
left: 0;
bottom: 0;
right: 0;
background-color: rgba(0, 0, 0, 0.2);
position: fixed;
display: flex;
justify-content: center;
align-items: center;
z-index: 900;
`;

export const ModalWrapper = styled.div`
top: 10px;
width: 600px;
/* min-height: 800px; */
box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
background-color: hsl(217,32%,17%);;
color: #fff;
display: flex;
flex-direction: column;
z-index: 900;
border-radius: 10px;
max-height: calc(100vh - 20px);
overflow-y: auto;
overflow-x: hidden;
`;

export const ModalContent = styled.div`
width: 600px;
/* height: 700px; */
display: flex;
flex-direction: column;
justify-content: center;
line-height: 1.8;
color: #fff;
p {
  margin-bottom: 1rem;
}
button {
  padding: 10px 24px;
  background: #141414;
  color: #fff;
  border: none;
}
`;

export const Filter = styled.div`
justify-content: center;
`
export const FilterWrapper = styled.div`
display: flex;
flex-wrap: wrap;
`
export const FilterCard = styled.div`
height: 20px;
width: 20px;
`

export const CharacterWrapper = styled.div`
width: 600px;
display: flex;
flex-wrap: wrap;
overflow-y: auto;
justify-content: center;
`

export const CloseModalButton = styled(MdClose)`
cursor: pointer;
position: absolute;
top: 10px;
right: 10px;
width: 25px;
height: 25px;
padding: 0;
z-index: 10;
`;
