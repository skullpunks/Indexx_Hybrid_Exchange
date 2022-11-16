import { Button } from 'antd';
import React from 'react';
import Footer from '../Footer/Footer';
import './Career.css'

const Career = () => {

  return (
    <>
    <div className="nav_container  help_main_page" >
        <div className=' border-b width-100'>
        <h2 className='font_40x padding-t-2x padding-b-1x margin-b-0'>Careers</h2>
        </div>

        <div className='border-b padding-b-3x'>
            <h4 className='font_25x padding-t-3x padding-b-1x margin-b-0'> DATA AND ANALYTICS</h4>

            <div className='d-flex flex-justify-between align-items-center padding-t-3x row'>
                <div className='col-md-8'>
                    <h6 className='font_25x margin-b-0'> Compliance Data Scientist/Analyst</h6>
                    <span className='font_15x'>U.S. REMOTEDATA & ANALYTICS</span>
                </div>
                <div className='col-md-4 '>
                    <Button type="button" className='width_50 apply_button'>APPLY</Button>
                   
                </div>
            </div>

            <div className='d-flex flex-justify-between align-items-center padding-t-3x row'>
                <div className='col-md-8'>
                    <h6 className='font_25x margin-b-0'> Data Analyst (Finance)</h6>
                    <span className='font_15x'>U.S. REMOTEDATA & ANALYTICS</span>
                </div>
                <div className='col-md-4 '>
                    <Button type="button" className='width_50 apply_button'>APPLY</Button>
                   
                </div>
            </div>


            <div className='d-flex flex-justify-between align-items-center padding-t-3x row'>
                <div className='col-md-8'>
                    <h6 className='font_25x margin-b-0'> Data Scientist - Customer Support</h6>
                    <span className='font_15x'>U.S. REMOTEDATA & ANALYTICS</span>
                </div>
                <div className='col-md-4 '>
                    <Button type="button" className='width_50 apply_button'>APPLY</Button>
                   
                </div>
            </div>

            <div className='d-flex flex-justify-between align-items-center padding-t-3x row'>
                <div className='col-md-8'>
                    <h6 className='font_25x margin-b-0'> Data Scientist (Visualization)</h6>
                    <span className='font_15x'>U.S. REMOTEDATA & ANALYTICS</span>
                </div>
                <div className='col-md-4 '>
                    <Button type="button" className='width_50 apply_button'>APPLY</Button>
                   
                </div>
            </div>

            <div className='d-flex flex-justify-between align-items-center padding-t-3x row margin-b-3x'>
                <div className='col-md-8'>
                    <h6 className='font_25x margin-b-0'> Director Performace Marketing</h6>
                    <span className='font_15x'>U.S. REMOTEDATA & ANALYTICS</span>
                </div>
                <div className='col-md-4 '>
                    <Button type="button" className='width_50 apply_button'>APPLY</Button>
                   
                </div>
            </div>


        </div>

       <div className='padding-t-2x'>
        <span className='font_20x centered '>For inquiries, please reach us out at <span className='text_link'>hr@indexx.ai</span></span>
       </div>



       
       
    </div>

<div className='padding-t-3x margin-t-3x margin-t_300x'>
<Footer />
</div>
</>
  )
}

export default Career