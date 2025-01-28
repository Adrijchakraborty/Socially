import React, { useEffect, useState } from 'react'
import Loader from '../../utils/Loader';
import EndPage from '../EndPage';
import axios from 'axios';
const LazyCardItems = React.lazy(()=> import("./MainContent/CardItems"))
const LazyForYouCards = React.lazy(()=> import("./MainContent/ForYouCards"))

const MainContent = ({value}) => {
  const [friendList, setFriendList] = useState([])
  const {selected} = value;

  const fetchFriendList = () => {
    axios.get('/api/friendlist/get-friendlist')
      .then((response) => {
        // console.log(response.data);
        setFriendList(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }


  useEffect(() => {
    fetchFriendList();
  }, []);
  return (
    <div className='min-h-screen'>
      {selected == 0 && <React.Suspense fallback={<Loader/>}> <LazyCardItems value={{friendList,setFriendList}}/> </React.Suspense>}
      {selected == 1 && <React.Suspense fallback={<Loader/>}> <LazyForYouCards value={{friendList,setFriendList}}/> </React.Suspense>}
      <EndPage/>
    </div>
  )
}

export default MainContent