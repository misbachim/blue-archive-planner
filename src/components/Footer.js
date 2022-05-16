import React from 'react'
import styled from 'styled-components';

export default function Footer() {
  return (
    <Container>
      <Wrapper>
        <TextWrapper>
          Blue Archive™ is a registered trademark of NEXON Games Co., Ltd. This site is not affiliated with or endorsed by NEXON. Images and data © NEXON Games Co., Ltd.
        </TextWrapper>
        <TextWrapper>
          © 2021 Blue Archive Planner. All rights reserved.
        </TextWrapper>
      </Wrapper>
    </Container>
  )
}

const Container = styled.div`
  flex-shrink: 0;
`

const Wrapper = styled.div`
  color: rgba(226,232,240,1);
  text-align: center;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: rgba(51,65,85,1);
  width: 100%;
`

const TextWrapper = styled.div`
  font-size: .875rem;
  line-height: 1.25rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`