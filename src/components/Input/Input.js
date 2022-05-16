import React from 'react'
import styled from 'styled-components';

// size: 'medium' || 'small'
// isGreyed: true || false
// border: ['all', 'tl', 'tr', 'bl', 'br']
export function Input({ 
  size='sm', 
  isGreyed=false, 
  border=['all'], 
  isPadding=false, 
  type,
  onChange,
  value
}) {
  let width = '4rem';
  let borderRadius = null;
  let borderTopRight = null;
  let borderBottomLeft = null;
  let borderTopLeft = null;
  let borderBottomRight = null;

  let padding = null;
  border.forEach(e => {
    if (e === 'all') {
      borderRadius = '4px 4px 4px 4px'
      return;
    }
    if (e === 'tr') {
      borderTopRight = '4px';
    }
    if (e === 'bl') {
      borderBottomLeft = '4px';
    }
    if (e === 'tl') {
      borderTopLeft = '4px';
    }
    if (e === 'br') {
      borderBottomRight = '4px';
    }
  });
  if (size === 'md') width = '6rem'
  if (isPadding) padding = '0.5rem 0.75rem 0.5rem 0.75rem';
  return (
    <>
      <StyledInput
        borderRadius={borderRadius}
        borderTopRight={borderTopRight}
        borderBottomLeft={borderBottomLeft}
        borderTopLeft={borderTopLeft}
        borderBottomRight={borderBottomRight}
        width={width}
        padding={padding}
        type={type}
        onChange={onChange}
        value={value === 0 ? '' : value}
      />
    </>
  )
}

const StyledInput = styled.input`
  font-size: .875rem;
  line-height: 1.25rem;
  margin-left: auto;
  width: ${props => props.width};
  text-align: center;
  border-color: transparent;
  background-color: rgba(100,116,139,1);
  border-radius: ${props => props.borderRadius};
  border-top-left-radius: ${props => 
      (props.borderTopLeft)};
  border-top-right-radius: ${props => 
      (props.borderTopRight)};
  border-bottom-left-radius: ${props => 
      (props.borderBottomLeft)};
  border-bottom-right-radius: ${props => 
      (props.borderBottomRight)};
  padding: ${props => 
      (props.padding)};
`