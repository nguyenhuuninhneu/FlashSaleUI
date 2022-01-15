import React, { useState, useCallback } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderSlick from "react-slick";
import config from '../../config/config';
import utils from '../../config/utils';

function Slider(props) {
    const settings = {
        dots: false,
        infinite: false,
        lazyLoad: 'ondemand',
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4
    };

    const LoadProduct = props.ListProduct.map((product) => {
        var percentSold = product.Inventory == 0 ? 0 : (product.SoldQuantity / product.Inventory) * 100;
        return (
            <>
                <div className="orichi-product-item-slider" key={product.Id}>
                    <div className="wImage">
                        <a href={props.CurrentWebProduct + product.ProductHandle} title={product.ProductTitle} target={'_balnk'} className="image cover">
                            <img src={product.ProductImage} />
                        </a>
                    </div>
                    <div className="orichi-price-wrapper">
                        <div className="orichi-price" style={{ color: props.ProductColor }}>{utils.ShopifyMoney(product.ProductPrice,props.Currency)}
                            <div className="orichi-discount-price" style={{ color: props.ProductColor, border: '1px solid ' + props.ProductColor }}>-{product.Percentage}%</div>
                        </div>
                    </div>
                    {
                        props.ProductShowProgressBarStatus === true ? <div className="orichi-progress-bar">
                            <div className="orichi-flash-sale-progress-bar">
                                <div
                                    className="orichi-flash-sale-progress-bar__complement-wrapper" style={{ background: props.ProductColor, width: percentSold + '%' }}>
                                </div>
                                <div className="orichi-flash-sale-progress-bar__text">
                                    {
                                        percentSold === 0 ? props.TextJustSale : percentSold < 90 ? props.TextSold + ' ' + product.SoldQuantity : props.TextAlmostSoldOut
                                    }
                                </div>
                                {
                                    percentSold >= 80 ? <> <div className="orichi-flash-sale-progress-bar__fire">
                                        <img src={config.rootLink + props.ProductIcon} />
                                    </div></> : ''
                                }

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
