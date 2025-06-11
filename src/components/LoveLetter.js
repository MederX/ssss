import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Draggable from 'react-draggable';

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
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${props => props.isOpen ? 'rotateX(180deg) translateY(-20px)' : 'rotateX(0)'};
`;

const EnvelopeFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.2));
    z-index: 1;
  }
`;

const HeartIcon = styled.div`
  width: 60px;
  height: 60px;
  background: #fff;
  position: relative;
  transform: rotate(45deg);
  transition: transform 0.3s ease;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);

  &:before,
  &:after {
    content: '';
    width: 60px;
    height: 60px;
    background: #fff;
    border-radius: 50%;
    position: absolute;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  }

  &:before {
    left: -30px;
  }

  &:after {
    top: -30px;
  }
`;

const LetterWrapper = styled.div`
  position: absolute;
  width: 280px;
  height: 400px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotateX(180deg);
  backface-visibility: hidden;
  opacity: ${props => props.isOpen ? '1' : '0'};
  transition: opacity 0.3s ease;
  cursor: move;
  z-index: ${props => props.isOpen ? '2' : '0'};
`;

const Letter = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #fff5f5, #fff);
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 30px;
    background: linear-gradient(to bottom, rgba(255, 107, 107, 0.1), transparent);
  }
`;

const LetterContent = styled.div`
  font-family: 'Dancing Script', cursive;
  color: #333;
  font-size: 1.2rem;
  line-height: 1.6;
  text-align: center;
  position: relative;
  z-index: 1;
  padding-right: 10px;
  max-height: 180px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  margin-bottom: 16px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(255, 107, 107, 0.1);
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 107, 107, 0.3);
    border-radius: 3px;
  }
  p {
    margin: 0.5em 0;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
  }
  p:first-child {
    font-size: 1.4em;
    color: #ff6b6b;
    margin-bottom: 1em;
  }
  p:last-child {
    font-size: 1.6em;
    margin-top: 1em;
  }
`;

const FloatingHeart = styled.div`
  position: absolute;
  font-size: 20px;
  color: #ff6b6b;
  animation: float ${props => props.duration}s linear infinite;
  opacity: ${props => props.isOpen ? '1' : '0'};
  left: ${props => props.left}%;
  animation-delay: ${props => props.delay}s;
  transform: scale(${props => props.scale});

  @keyframes float {
    0% {
      transform: translateY(0) rotate(0deg) scale(${props => props.scale});
      opacity: 1;
    }
    100% {
      transform: translateY(-100vh) rotate(360deg) scale(${props => props.scale});
      opacity: 0;
    }
  }
`;

const ImageContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const ImageFrame = styled.div`
  width: 200px;
  height: 200px;
  margin: 0 auto;
  border: 2px solid #ff6b6b;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const LoveLetter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hearts, setHearts] = useState([]);

  // The provided image as a static import
  const staticImage = require('../assets/static-photo.jpg');

  useEffect(() => {
    if (isOpen) {
      const newHearts = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2,
        scale: 0.5 + Math.random() * 0.5
      }));
      setHearts(newHearts);
    } else {
      setHearts([]);
    }
  }, [isOpen]);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <EnvelopeContainer 
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {hearts.map(heart => (
        <FloatingHeart
          key={heart.id}
          left={heart.left}
          duration={heart.duration}
          delay={heart.delay}
          scale={heart.scale}
          isOpen={isOpen}
        >
          ❤️
        </FloatingHeart>
      ))}
      <Envelope isOpen={isOpen}>
        <EnvelopeFront>
          <HeartIcon style={{ transform: `rotate(45deg) ${isHovered ? 'scale(1.1)' : 'scale(1)'}` }} />
        </EnvelopeFront>
        <LetterWrapper isOpen={isOpen}>
          <Draggable
            handle=".letter-content"
            bounds="parent"
            defaultPosition={{ x: 0, y: 0 }}
          >
            <Letter>
              <LetterContent className="letter-content">
                <p>Жааааныыыым,</p>
                <p>
                  Я начал влюбляться в тебя постепенно. Понял что окончательно влюбился в тебя когда начинал искать тебя везде.
                  Твоя улыбка, твой голос, глаза, волосы, руки, ноги, просто заставляли и заставляют меня умиляться каждый раз жаным.
                </p>
                <p>
                  Я люблю тебя больше чем могу выразить словами лапуська.
                </p>
                <p>
                  Твоя душа добрая и ПИКМИ характер досум притянули меня хахахах,
                  такая хорошая, такая красивая, такая жаным мне с тобой так хорошо просто,
                  спасибо за то что ты есть иххихи.
                </p>
                <p>
                  Досуууууууумъхххх бозььь,
                </p>
                <p>Вечно твой пикми досун,</p>
                <p>❤️</p>
              </LetterContent>
              <ImageContainer>
                <ImageFrame>
                  <img src={staticImage} alt="Love memory" />
                </ImageFrame>
              </ImageContainer>
            </Letter>
          </Draggable>
        </LetterWrapper>
      </Envelope>
    </EnvelopeContainer>
  );
};

export default LoveLetter; 