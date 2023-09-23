import React from 'react'
import sidebar_creator from '../Assets/sidebar_createtor.png';
import '../Style/SidebarBackground.css'

export default function SidebarBackground() {
  return (
    <div className='containerSidebar'>
        <img src={sidebar_creator} />
    </div>
  )
}
