import React from 'react'
import LeftBar from '../components/Home/LeftBar'


function Container({child}) {
  return (
    <div className='content' style={{
      marginBottom : "20px"
    }}>
        <div className='row flex flex-wrap content-row'>
            <LeftBar/>
            {child}
        </div>
    </div>
  )
}

export default Container