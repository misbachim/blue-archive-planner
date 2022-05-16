import React from "react";
import styled from "styled-components";
import schooldata from '../../resource/schooldata.json'
import useFetch from './../../hooks/useFetch';

export function CharacterCard({
    character,
    name,
    image,
    school,
    onCharacterClick,
}) {
    
    function getBackgroundImage() {
      return schooldata.find((sd) => sd.name===school).image
    } 

  return (
    <>
    <Button onClick={onCharacterClick}>
    <Card>
      <ImageWrapper style={{
          backgroundImage: `url(${getBackgroundImage()})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
      }} >
          <Image src={image} />
      </ImageWrapper>
      <TextWrapper>
      {name}
      </TextWrapper>
    </Card>
    </Button>
    </>
  );
}

const Button = styled.button`
  width: 100px;
  height: 100px;
  margin: 2px;
  background: transparent;
  border: transparent;
  cursor: pointer;
`;

const Card = styled.div`
  border-radius: 0.75rem;
`;

const ImageWrapper = styled.div`
  border-radius: 0.75rem;
  overflow: hidden
`;

const Image = styled.img`
  backdrop-filter: blur(2px)
`;

const TextWrapper = styled.div`
  border-radius: 0.75rem;
`;