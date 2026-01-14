import React from 'react'
import { NavBar } from '../components/NavBar'
import { Home } from './Home'
import { useState } from 'react'

export const Layout = () => {
    const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
    <NavBar setSearchQuery={setSearchQuery}/>
    <Home searchQuery={searchQuery}/>
    </>
  )
}
