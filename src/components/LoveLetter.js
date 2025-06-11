import React, { useState } from 'react';
import styled from '@emotion/styled';

const EnvelopeContainer = styled.div`
  position: relative;
  width: 300px;
  height: 200px;
  cursor: pointer;
  perspective: 1000px;
`;

const Envelope = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${props => props.isOpen ? 'rotateX(180deg)' : 'rotateX(0)'};
`;

const EnvelopeFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: #ff6b6b;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeartIcon = styled.div`
  width: 60px;
  height: 60px;
  background: #fff;
  position: relative;
  transform: rotate(45deg);
  transition: transform 0.3s ease;

  &:before,
  &:after {
    content: '';
    width: 60px;
    height: 60px;
    background: #fff;
    border-radius: 50%;
    position: absolute;
  }

  &:before {
    left: -30px;
  }

  &:after {
    top: -30px;
  }

  ${EnvelopeContainer}:hover & {
    transform: rotate(45deg) scale(1.1);
  }
`;

const Letter = styled.div`
  position: absolute;
  width: 90%;
  height: 90%;
  background: #fff;
  top: 5%;
  left: 5%;
  padding: 20px;
  box-sizing: border-box;
  backface-visibility: hidden;
  transform: rotateX(180deg);
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  opacity: ${props => props.isOpen ? '1' : '0'};
  transition: opacity 0.3s ease;
`;

const LetterContent = styled.div`
  font-family: 'Dancing Script', cursive;
  color: #333;
  font-size: 1.2rem;
  line-height: 1.6;
  text-align: center;
`;

const LoveLetter = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <EnvelopeContainer onClick={handleClick}>
      <Envelope isOpen={isOpen}>
        <EnvelopeFront>
          <HeartIcon />
        </EnvelopeFront>
        <Letter isOpen={isOpen}>
          <LetterContent>
            <p>My Dearest,</p>
            <p>
              Every moment with you feels like a beautiful dream come true.
              Your smile brightens my darkest days, and your love gives me strength.
            </p>
            <p>
              You are the missing piece that makes my life complete.
              I cherish every moment we share together.
            </p>
            <p>Forever Yours,</p>
            <p>❤️</p>
          </LetterContent>
        </Letter>
      </Envelope>
    </EnvelopeContainer>
  );
};

export default LoveLetter; 