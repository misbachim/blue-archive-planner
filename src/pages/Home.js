import React from 'react'
import styled from 'styled-components';

export default function Home() {

  return (
    <>
    <Wrapper>
      <Logo src={'https://static.miraheze.org/bluearchivewiki/e/ea/Logo_bluearchive.png'} />
      <TextWrapper>
        <strong>Manage your student in Blue Archive easier!</strong>
        <br />
        Here you can add your characters, your goals (level, skill, and equipment) and the items you have, to see exactly what you need, what you can forge, and the daily tasks available. With This App you don't need to wonder "what should I do next?" never again.
      </TextWrapper>
    </Wrapper>
    <Wrapper>
      <ReleaseWrapper>
        <strong>What you can do in this application?</strong>
      </ReleaseWrapper>
      <StyledList>
        <ListItem>
          Add goals (level up characters, skills, and equipments)
        </ListItem>
        <ListItem>
          Manage Inventories
        </ListItem>
        <ListItem>
          Gear stage farm recommendation
        </ListItem>
        <ListItem>
          No signing up needed, all is saved in the browser
        </ListItem>
      </StyledList>
    </Wrapper>
    <Wrapper>
      <span>
        Credits to maker of <a href='https://seelie.inmagi.com/'>this</a> great example for me to yoink the design.
        <br />
        And also the maker of this <a href='https://docs.google.com/spreadsheets/d/1SJ27tGy9bUp8ID7_L3i-gDB5NbHBT2Bb7NdpXfNc5PI/edit'>spreadsheet.</a> I yoinked some data to ease up the working of this application.
      </span>
    </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  text-align: center;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  margin-bottom: 1rem;
  background-color: rgba(51,65,85,1);
  border-radius: 0.5rem;
  align-items: center;
  flex-direction: column;
  width: 100%;
  display: flex;
`

const Logo = styled.img`
  width: 12rem;
  margin-bottom: 1rem;
`

const TextWrapper = styled.div`
  font-size: 1.125rem;
  line-height: 1.75rem;
  letter-spacing: .025em;
  margin-top: 1rem;
`

const ReleaseWrapper = styled.div`
  display: flex;
  text-align: left;
`

const StyledList = styled.ul`
  text-align: left;
`

const ListItem = styled.li`

`