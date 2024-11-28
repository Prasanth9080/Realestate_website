import React, { useEffect, useState } from 'react';
import './Invest.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

const Invest = () => {
    return (
        <div className='invest-container'>
            <div className='container my-5'>
                <h3 className='invest-heading1'>TradeX Buy & Sell</h3>
                <div className='invest-heading2'>
                    <p>Invest in Real Estate</p>
                    <p>1 SQFT at a Time!</p>
                </div>
            </div>

            <div className='container'>
                    <div className='row'>
                        <div className='col-lg-3 col-md-4 col-sm-12 paragraph'>
                            <img src='/assets/images/3095520-removebg-preview.png' className='img-fluid' height="100" width="200"/>
                            <p>Punch an order to Buy/Sell ALT.SQT(Real Estate Backend Investment Tokens) of your choice</p>
                        </div>
                        <div className='col-lg-3 col-md-4 col-sm-12 paragraph'>
                            <img src='/assets/images/3133158.png' className='img-fluid' height="100" width="200"/>
                            <p>Choose a Market Price or Limit Price for yours Orders. Market price is an algorithm determined price whili limit price is one of your choice.</p>
                        </div>
                        <div className='col-lg-3 col-md-4 col-sm-12 paragraph'>
                            <img src='/assets/images/lovepik-circular-download-icon-png-image_401093816_wh1200-removebg-preview.png' className='img-fluid' height="100" width="200"/>
                            <p>wait for the platform's automatic settlement system to match your order with another user</p>
                        </div>
                        <div className='col-lg-3 col-md-4 col-sm-12 paragraph'>
                            <img src='/assets/images/rupee-icon-indian-currency-symbol-illustration-coin-symbol-free-vector-removebg-preview.png' className='img-fluid' height="100" width="200"/>
                            <p>Your wallet will be created with money or ALT.SQT, as applicable</p>
                        </div>
                    </div>
                </div>

                <div className="container my-5">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-auto">
                            <h1>TradeX Buy</h1>
                        </div>
                        <div className="col-auto">
                            <p>FUNDS IN YOUR VIRTUAL BANK WALLET | $0</p>
                        </div>
                    </div>

                    <div id="cardCarousel" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            {/* Group Cards to Show Multiple Per Slide */}
                            <div className="carousel-item active">
                                <div className="row">
                                    <div className="col-lg-4 col-md-6 col-sm-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title">Hyderabad prime land investment opportunity</h5>
                                                <p className="card-text">This is card 1 content.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title">Goa holiday home investment opportunity</h5>
                                                <p className="card-text">This is card 2 content.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title">Bangalore rental housing investment opportunity</h5>
                                                <p className="card-text">This is card 3 content.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="row">
                                    <div className="col-lg-4 col-md-6 col-sm-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title">Bangalore prime land investment opportunity</h5>
                                                <p className="card-text">This is card 4 content.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title">Mumbai suburban housing investment opportunity</h5>
                                                <p className="card-text">This is card 5 content.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title">Kerala holiday homes investment opportunity</h5>
                                                <p className="card-text">This is card 6 content.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="row">
                                    <div className="col-lg-4 col-md-6 col-sm-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title">Hyderabad prime land investment opportunity</h5>
                                                <p className="card-text">This is card 7 content.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Carousel Controls */}
                        <button className="carousel-control-prev" type="button" data-bs-target="#cardCarousel" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#cardCarousel" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
        </div>
    )
}

export default Invest;

