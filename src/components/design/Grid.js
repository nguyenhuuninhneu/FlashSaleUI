import { Button } from '@shopify/polaris';
import React, { useState, useCallback, useEffect } from 'react';
import '../../assets/css/dot.css'

function Grid(props) {
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
    const [isLoading, setLoading] = useState(false);
    const handleSetLoading = useCallback(
        (newValue) => setLoading(newValue),
        [],
    );
    const [isHideButtonViewMore, setHideButtonViewMore] = useState(false);
    const handleSetHideButtonViewMore = useCallback(
        (newValue) => setHideButtonViewMore(newValue),
        [],
    );
    const [limitItem, setLimitItem] = useState(4);
    const handleSetLimitItem = useCallback(
        (newValue) => { setLimitItem(newValue) },
        [],
    );
    const viewMore = () => {
        if (listProduct.length === limitItem) {
            setHideButtonViewMore(true);
            handleSetLoading(false);
        } else {
            handleSetLoading(true);
            setLimitItem(limitItem => limitItem + 4);
            handleSetLoading(false);
        }


    }
    const LoadProduct = listProduct.slice(0, limitItem).map((product) => {
        return (
            <>
                <div className="orichi-product-item" key={product.Id}>
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
        <div className="orichi-product-group">
            <div className="orichi-product-list grid-view">
                {LoadProduct}
                <div className="orichi-cb"></div>
            </div>
            {isLoading ? <>

                <div className='orichi-spin-loading'>
                    <div className="stage">
                        <div className="dot-spin"></div>
                    </div>
                </div>
            </> : !isHideButtonViewMore ? <>
                <div className="orichi-view-more"><Button onClick={() => { viewMore() }}>View more</Button></div>
            </> : ''}


        </div>
    )
}

export default Grid
