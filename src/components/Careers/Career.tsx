// import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import './Career.css'

const Career = () => {

    return (
        <>
            <div className="nav_container  help_main_page" >
                <div className=' border-bottom width-100'>
                    <h2 className='font_40x padding-t-2x padding-b-1x margin-b-0 top_heading'>Careers</h2>
                </div>

                <div className='border-bottom padding-b-3x'>
                    <h4 className='font_25x padding-t-3x padding-b-1x margin-b-0'> DATA AND ANALYTICS</h4>

                    <div className='d-flex flex-justify-between align-items-center padding-t-3x row'>
                        <div className='col-md-8'>
                            <h6 className='font_25x margin-b-0'> Compliance Data Scientist/Analyst</h6>
                            <span className='font_15x'>U.S. REMOTEDATA & ANALYTICS</span>
                        </div>
                        <div className='col-md-4 '>
                            <Link className='btn btn-danger width_50 apply_button' to="/indexx-exchange/coming-soon?page=Careers">APPLY</Link>
                        </div>
                    </div>

                    <div className='d-flex flex-justify-between align-items-center padding-t-3x row'>
                        <div className='col-md-8'>
                            <h6 className='font_25x margin-b-0'> Data Analyst (Finance)</h6>
                            <span className='font_15x'>U.S. REMOTEDATA & ANALYTICS</span>
                        </div>
                        <div className='col-md-4 '>
                            <Link className='btn btn-danger width_50 apply_button' to="/indexx-exchange/coming-soon?page=Careers">APPLY</Link>

                        </div>
                    </div>


                    <div className='d-flex flex-justify-between align-items-center padding-t-3x row'>
                        <div className='col-md-8'>
                            <h6 className='font_25x margin-b-0'> Data Scientist - Customer Support</h6>
                            <span className='font_15x'>U.S. REMOTEDATA & ANALYTICS</span>
                        </div>
                        <div className='col-md-4 '>
                            <Link className='btn btn-danger width_50 apply_button' to="/indexx-exchange/coming-soon?page=Careers">APPLY</Link>

                        </div>
                    </div>

                    <div className='d-flex flex-justify-between align-items-center padding-t-3x row'>
                        <div className='col-md-8'>
                            <h6 className='font_25x margin-b-0'> Data Scientist (Visualization)</h6>
                            <span className='font_15x'>U.S. REMOTEDATA & ANALYTICS</span>
                        </div>
                        <div className='col-md-4 '>
                            <Link className='btn btn-danger width_50 apply_button' to="/indexx-exchange/coming-soon?page=Careers">APPLY</Link>

                        </div>
                    </div>

                    <div className='d-flex flex-justify-between align-items-center padding-t-3x row margin-b-3x'>
                        <div className='col-md-8'>
                            <h6 className='font_25x margin-b-0'> Director Performace Marketing</h6>
                            <span className='font_15x'>U.S. REMOTEDATA & ANALYTICS</span>
                        </div>
                        <div className='col-md-4 '>
                            <Link className='btn btn-danger width_50 apply_button' to="/indexx-exchange/coming-soon?page=Careers">APPLY</Link>
                        </div>
                    </div>


                </div>

                <div className='padding-t-2x text-center'>
                    <span className='font_20x  '>For inquiries, please reach us out at <a href='mailto:hr@indexx.ai' className='text_link ps-1'> hr@indexx.ai</a></span>
                </div>





            </div>

            <div className='padding-t-3x margin-t-3x margin-t_300x'>
                <Footer />
            </div>
        </>
    )
}

export default Career