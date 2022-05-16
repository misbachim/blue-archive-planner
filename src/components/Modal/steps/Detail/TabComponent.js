import { useState } from 'react'
import styledComponents from 'styled-components';
import styled from 'styled-components';
import TabGear from './TabGear';
import TabLevel from './TabLevel';
import TabSkill from './TabSkill';

export default function TabComponent({ selectedCharacter }) {
  const [active, setActive] = useState(1);
   
   return (
     <>
       <Tabs>
         <TabItemComponent
            key={'LEVEL'}
            image={'https://static.wikia.nocookie.net/blue-archive/images/6/68/Exp_Report_0.png'}
            title={'LEVEL'}
            onItemClicked={() => {
              setActive(1)
            }}
            isActive={active === 1}
          />
          <TabItemComponent
             key={'SKILL'}
             image={'https://static.wikia.nocookie.net/blue-archive/images/d/d3/Selection_EX-Skill_Disc_0.png'}
             title={'SKILL'}
             onItemClicked={() => setActive(2)}
             isActive={active === 2}
           />
           <TabItemComponent
              key={'GEAR'}
              image={'https://static.wikia.nocookie.net/blue-archive/images/b/b9/Exp_Orb_0.png'}
              title={'GEAR'}
              onItemClicked={() => setActive(3)}
              isActive={active === 3}
            />
       </Tabs>
        {active === 1 ? <TabLevel selectedCharacter={selectedCharacter} /> : ''
        }
        {active === 2 ? <TabSkill selectedCharacter={selectedCharacter} /> : ''
        }
        {active === 3 ? <TabGear selectedCharacter={selectedCharacter} /> : ''
        }
      </>
   )
 }
 
const TabItemComponent = ({
  image = '',
  title = '',
  onItemClicked = () => console.error('You passed no action to the component'),
  isActive = false,
}) => {
  return (
    <TabItem active={isActive} onClick={onItemClicked}>
      <StyledImage src={image} />
      <TabItemTitle>{title}</TabItemTitle>
    </TabItem>
  )
};


const Tabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  font-size: .875rem;
  line-height: 1.25rem;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.25rem;
`

const TabItem = styled.div`
  &:hover {
    background-color: hsla(0,0%,100%,0.03);
  }
  
  cursor: pointer;
  opacity: .5;
  font-weight: 600;
  border-radius: 0.25rem;
  display: flex;
  justify-content: center; 
  align-items: center;
  width: 10em;
  height: 2rem;
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  background-color: transparent;

  ${({ active }) => active && `
    &:hover {
      background-color: rgba(15,23,42,1);
    }
    background-color: rgba(15,23,42,1);
  `}
`

const TabItemTitle = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  margin: 10px 0;
`

const StyledImage = styled.img`
  max-width:70%;
  max-height:70%;
  filter: grayscale(100%);
`