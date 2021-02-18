import React from "react";
import styled from "styled-components";
 
//import { colors } from "../../global";
 
const StyledHamburger = styled.button<{ open: boolean }>`
  position: relative;

  width: 2rem;
  height: 1.5rem;
  padding: 0;
  background: transparent;
  
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border: none;
  cursor: pointer;
  outline: none;
  z-index: 1;
  div {
    position: relative;
    width: 1.5rem;
    height: 0.12rem;
    border-radius: 10px;
    background-color: rgb(355, 355, 355);
      transition: all 0.3s linear;
    transform-origin: 1px;
  
    :first-child {
      transform: ${({ open }) =>
        (open ? "rotate(45deg)" : "rotate(0)")};
    }
    :nth-child(2) {
      opacity: ${({ open }) => (open ? "0" : "1")};
      transform: ${({ open }) => 
        (open ? "translateX(20px)":"translateX(0)")};
    }
    :nth-child(3) {
      transform: ${({ open }) =>
        (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
  @media (max-width: 600px) {
    left: ${({ open }) => (open ? "initial" : "3vw")};
    right: ${({ open }) => (open ? "2vw" : "initial")};
  }
`;
 
type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
};
 
const Hamburger = (props: Props) => (
  <StyledHamburger
    open={props.open}
    onClick={() => props.setOpen(!props.open)}
  >
    <div />
    <div />
    <div />
  </StyledHamburger>
);

export default Hamburger

// const StyledHamburger = styled.button<{ open: boolean }>`
//   //...
//   left: ${({ open }) => (open ? "29vw" : "3vw")};
//   div {
//     //...
//     transition: all 0.3s linear;
//     transform-origin: 1px;
  
//     :first-child {
//       transform: ${({ open }) =>
//         (open ? "rotate(45deg)" : "rotate(0)")};
//     }
//     :nth-child(2) {
//       opacity: ${({ open }) => (open ? "0" : "1")};
//       transform: ${({ open }) => 
//         (open ? "translateX(20px)":"translateX(0)")};
//     }
//     :nth-child(3) {
//       transform: ${({ open }) =>
//         (open ? "rotate(-45deg)" : "rotate(0)")};
//     }
//   }