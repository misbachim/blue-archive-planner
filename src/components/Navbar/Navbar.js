import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { SidebarData } from './SidebarData'
import './Navbar.css'
import { IconContext } from 'react-icons'
import styled from 'styled-components';

export function Navbar() {
  const [indexActive, setIndexActive] = useState(-1)

  const isListActive = (index) => {
    return index===indexActive
  }

  return (
    <>
    <IconContext.Provider value={{color: '#fff'}}>
      <NavBar >
        <NavList>
          {/* <li className='navbar-toggle'>
            <Link to="#" className='menu-bars'>
              <FaIcons.FaBars />
            </Link>
          </li> */}
          <NavHome key={'home'} onClick={() => setIndexActive(-1)}>
            <Link to={'/'}>
              <HomeImage src={'https://static.miraheze.org/bluearchivewiki/e/ea/Logo_bluearchive.png'}/>
            </Link>
          </NavHome>
          
          {SidebarData.map((item, index) => {
            return (
              <NavItem key={index} active={isListActive(index)} onClick={() => setIndexActive(index)}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </NavItem>
            )
          })}
        </NavList>
      </NavBar>
    </IconContext.Provider>
    </>
  )
}

const HomeImage = styled.img`

`

const NavBar = styled.nav`
  background: linear-gradient(180deg, rgba(51,65,85,1) 0%, rgba(15,23,42,1) 100%);
  width: 18rem;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  top: 0;
  font-weight: 600;
  padding: 2rem;
`

const NavList = styled.ul`
  width: 100%;
`

const NavHome = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
`

const NavItem = styled.li`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 60px;
  width: 100%;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;

  a {
    text-decoration: none;
    color: #f5f5f5;
    font-size: 18px;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 16px;
    border-radius: 4px;
    width: 100%;
  }
  
  a:hover {
    background-color: rgb(46,73,138);
  }
  
  ${({ active }) => active && `
    background-color: rgb(46,73,138, 0.3);
    border-radius: 4px;
  `}

`




