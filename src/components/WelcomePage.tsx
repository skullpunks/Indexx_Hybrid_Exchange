// import { Button } from 'antd'
import React from 'react'
import { Button } from 'react-bootstrap'
// import Footer from './Footer/Footer'

const WelcomePage = () => {
    return (
        <>
            <div className='scan-container container '>

                <div className='row mt-5 pt-5'>
                    <div className='col-md-3'>
                        <h3>indexx Blue</h3>
                        <h3>Decentralized</h3>
                        <Button className='btn btn-small'> Learn more</Button>
                    </div>
                    <div className='col-md-3'></div>
                    <div className='col-md-3'>
                        <h3>
                            indexx Orange</h3>
                        <h3>Centralized</h3>
                        <Button className='btn btn-small btn-danger'> Learn more</Button>
                        {/* <img src={require(`../assets/arts/allCoins.png`).default} alt="IN500" width="38" height="38" /> */}
                    </div>
                </div>
            </div>
            {/* <Footer helpIcon={false} />  */}
            </>
    )
}

export default WelcomePage