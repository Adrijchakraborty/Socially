import React from 'react'
import Loader from '../../utils/Loader';
const LazyCardItems = React.lazy(()=> import("./MainContent/CardItems"))
const LazyForYouCards = React.lazy(()=> import("./MainContent/ForYouCards"))

const MainContent = ({value}) => {
  const {selected} = value;
  return (
    <div className='min-h-screen'>
      {selected == 0 && <React.Suspense fallback={<Loader/>}> <LazyCardItems/> </React.Suspense>}
      {selected == 1 && <React.Suspense fallback={<Loader/>}> <LazyForYouCards/> </React.Suspense>}
      
    </div>
  )
}

export default MainContent