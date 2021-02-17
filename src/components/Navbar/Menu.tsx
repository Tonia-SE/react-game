import React, { useState } from "react";
import { useEffect, RefObject, useRef } from "react";
import styled from "styled-components";


//import { colors } from "../../global";

import Hamburger from "./Hamburger";

const StyledMenu = styled.nav<{ open: boolean }>`
  top: 143px;
  left: 65vw;
  height: 64vh;
  width: 15vw;
  position: fixed;
  background-color: #343a40;
  z-index: 1;
  padding: 10rem 0;
  flex-direction: column;
  display: ${({ open }) => (open ? "flex" : "none")};
  transition: transform 0.5s ease-in-out;
  transform: ${({ open }) =>
    (open ? "translateX(0)" :"translateX(-100%)")};
`;
const StyledLink = styled.a`
  padding: 0 2rem;
  font-size: 2rem;
  color: '#696b8b';
  text-decoration: none;

  :hover {
    color: '#696b4b';
    cursor: pointer;
  }
`;

const useOnClickOutside = (
  ref: RefObject<HTMLDivElement>,
  closeMenu: () => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (ref.current && event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }
      closeMenu();
    };
    
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, closeMenu]);
}; 

const Menu:React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const node = useRef<HTMLDivElement>(null);
  const close = () => setOpen(false);

  useOnClickOutside(node, () => setOpen(false));
  return (
    <div>
      <StyledMenu open={open}>
        <StyledLink onClick={() => close()}><img className="menu-img" src="./assets/images/instructions2.ico" alt="instructions"/></StyledLink>
        <StyledLink onClick={() => close()}><img className="menu-img" src="./assets/images/settings2.ico" alt="settings"/></StyledLink>
        <StyledLink onClick={() => close()}><img className="menu-img" src="./assets/images/winners2.ico" alt="winners"/></StyledLink>
      </StyledMenu>
      <Hamburger open={open} setOpen={setOpen} />
    </div>
  );
};

export default Menu