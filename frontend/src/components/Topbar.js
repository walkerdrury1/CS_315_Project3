import react from 'react'
import './Topbar.css'

const Topbar = () => {
    const topbar_item_list = ["entrees", "sides", "checkout"]
    const displayTopbarItems = () => {
        return topbar_item_list.map((item) => {
            return <h5>{item}</h5>
        })
    }
    return(
        <div className='topbar-container'>
            <div className='topbar-logo-container'>
                <img className = "topbar-logo" src='https://logos-world.net/wp-content/uploads/2022/02/Panda-Express-Logo.png' alt = "panda logo" />
            </div>
            <div className='topbar-title-container'>
                <h4>Customer view</h4>
            </div>
            <div className='topbar-items-container'>
                {displayTopbarItems()}
            </div>
            <div className='topbar-sign-container'>
                <p className='topbar-sign'>Sign in</p>
            </div>
        </div>
    )
}

export default Topbar