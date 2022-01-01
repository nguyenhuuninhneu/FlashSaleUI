import React, { useState, useCallback } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderSlick from "react-slick";

function Slider(props) {
    var listProduct = [
        {
            Id: 1,
            Image: "/build/static/media/NoCampaign.3fb2811c.png"
        },
        {
            Id: 2,
            Image: "/build/static/media/NoCampaign.3fb2811c.png"
        },
        {
            Id: 3,
            Image: "/build/static/media/NoCampaign.3fb2811c.png"
        },
        {
            Id: 4,
            Image: "/build/static/media/NoCampaign.3fb2811c.png"
        },
        {
            Id: 5,
            Image: "/build/static/media/NoCampaign.3fb2811c.png"
        },
        {
            Id: 6,
            Image: "/build/static/media/NoCampaign.3fb2811c.png"
        },
        {
            Id: 7,
            Image: "/build/static/media/NoCampaign.3fb2811c.png"
        },
        {
            Id: 8,
            Image: "/build/static/media/NoCampaign.3fb2811c.png"
        },
        {
            Id: 9,
            Image: "/build/static/media/NoCampaign.3fb2811c.png"
        },
        {
            Id: 10,
            Image: "/build/static/media/NoCampaign.3fb2811c.png"
        },
        {
            Id: 11,
            Image: "/build/static/media/NoCampaign.3fb2811c.png"
        },
        {
            Id: 12,
            Image: "/build/static/media/NoCampaign.3fb2811c.png"
        },
        {
            Id: 13,
            Image: "/build/static/media/NoCampaign.3fb2811c.png"
        },
        {
            Id: 14,
            Image: "/build/static/media/NoCampaign.3fb2811c.png"
        },
        {
            Id: 15,
            Image: "/build/static/media/NoCampaign.3fb2811c.png"
        },
        {
            Id: 16,
            Image: "/build/static/media/NoCampaign.3fb2811c.png"
        },
        {
            Id: 17,
            Image: "/build/static/media/NoCampaign.3fb2811c.png"
        },
        {
            Id: 18,
            Image: "/build/static/media/NoCampaign.3fb2811c.png"
        },
        {
            Id: 19,
            Image: "/build/static/media/NoCampaign.3fb2811c.png"
        },
        {
            Id: 20,
            Image: "/build/static/media/NoCampaign.3fb2811c.png"
        }
    ]
    const settings = {
        dots: false,
        infinite: false,
        lazyLoad: 'ondemand',
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4
    };
    
    const LoadProduct = listProduct.map((product) => {
        return (
            <>
                <div className="orichi-product-item-slider" key={product.Id}>
                    <div className="wImage">
                        <a href="#" title="" className="image cover">
                            <img src={product.Image} />
                        </a>
                    </div>
                    <div className="orichi-price-wrapper">
                        <div className="orichi-price">$150.000
                            <div className="orichi-discount-price">-10%</div>
                        </div>
                    </div>
                    {
                        props.ProductShowProgressBarStatus === true ? <div className="orichi-progress-bar">
                        <div className="orichi-flash-sale-progress-bar">
                            <div
                                className="orichi-flash-sale-progress-bar__complement-wrapper">
                            </div>
                            <div className="orichi-flash-sale-progress-bar__text">Sold 159</div>

                            <div className="orichi-flash-sale-progress-bar__fire">
                                <img src={props.ProductIcon} />
                            </div>
                        </div>
                    </div> : ''
                    }
                    
                </div>
            </>
        );
    });
    return (
        <div className='orichi-slider'>
            <div className="orichi-product-list orichi-slider-view">
                <>
                    <SliderSlick {...settings} >
                        {LoadProduct}
                    </SliderSlick>
                </>

            </div>
        </div >


    )
}

export default Slider
