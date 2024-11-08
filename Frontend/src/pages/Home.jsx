import React from 'react'
import { useSelector } from 'react-redux'
import PrivateHome from './home/PrivateHome';
import PublicHome from './home/PublicHome';

const Home = () => {
  const { userInformation } = useSelector((state) => state.user);
  // console.log(userInformation)
  return userInformation ? <PrivateHome/> : <PublicHome/>;
}

export default Home