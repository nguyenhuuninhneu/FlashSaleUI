import { Button } from '@shopify/polaris';
import React, { useState, useCallback, useEffect } from 'react';
import '../../assets/css/dot.css'
import config from '../../config/config';
function Grid(props) {
    var listProduct = [
        {
            Id: 1,
            Image: config.rootLink + '/Content/ProductImage.png',
            Mount: 2,
            Percent: 20,
            Discount: 10,
            Price: 32.99
        },
        {
            Id: 2,
            Image: config.rootLink + '/Content/ProductImage.png',
            Mount: 129,
            Percent: 80,
            Discount: 10,
            Price: 32.99
        },
        {
            Id: 3,
            Image: config.rootLink + '/Content/ProductImage.png',
            Mount: 300,
            Percent: 90,
            Discount: 10,
            Price: 32.99
        },
        {
            Id: 4,
            Image: config.rootLink + '/Content/ProductImage.png',
            Mount: 0,
            Percent: 0,
            Discount: 10,
            Price: 32.99
        },
        {
            Id: 5,
            Image: config.rootLink + '/Content/ProductImage.png',
            Mount: 2,
            Percent: 20,
            Discount: 10,
            Price: 32.99
        },
        {
            Id: 6,
            Image: config.rootLink + '/Content/ProductImage.png',
            Mount: 129,
            Percent: 80,
            Discount: 10,
            Price: 32.99
        },
        {
            Id: 7,
            Image: config.rootLink + '/Content/ProductImage.png',
            Mount: 300,
            Percent: 90,
            Discount: 10,
            Price: 32.99
        },
        {
            Id: 8,
            Image: config.rootLink + '/Content/ProductImage.png',
            Mount: 0,
            Percent: 0,
            Discount: 10,
            Price: 32.99
        },
        {
            Id: 9,
            Image: config.rootLink + '/Content/ProductImage.png',
            Mount: 2,
            Percent: 20,
            Discount: 10,
            Price: 32.99
        },
        {
            Id: 10,
            Image: config.rootLink + '/Content/ProductImage.png',
            Mount: 129,
            Percent: 80,
            Discount: 10,
            Price: 32.99
        },
        {
            Id: 11,
            Image: config.rootLink + '/Content/ProductImage.png',
            Mount: 300,
            Percent: 90,
            Discount: 10,
            Price: 32.99
        },
        {
            Id: 12,
            Image: config.rootLink + '/Content/ProductImage.png',
            Mount: 0,
            Percent: 0,
            Discount: 10,
            Price: 32.99
        },
        {
            Id: 13,
            Image: config.rootLink + '/Content/ProductImage.png',
            Mount: 2,
            Percent: 20,
            Discount: 10,
            Price: 32.99
        },
        {
            Id: 14,
            Image: config.rootLink + '/Content/ProductImage.png',
            Mount: 129,
            Percent: 80,
            Discount: 10,
            Price: 32.99
        },
        {
            Id: 15,
            Image: config.rootLink + '/Content/ProductImage.png',
            Mount: 300,
            Percent: 90,
            Discount: 10,
            Price: 32.99
        },
        {
            Id: 16,
            Image: config.rootLink + '/Content/ProductImage.png',
            Mount: 0,
            Percent: 0,
            Discount: 10,
            Price: 32.99
        },
        {
            Id: 17,
            Image: config.rootLink + '/Content/ProductImage.png',
            Mount: 2,
            Percent: 20,
            Discount: 10,
            Price: 32.99
        },
        {
            Id: 18,
            Image: config.rootLink + '/Content/ProductImage.png',
            Mount: 129,
            Percent: 80,
            Discount: 10,
            Price: 32.99
        },
        {
            Id: 19,
            Image: config.rootLink + '/Content/ProductImage.png',
            Mount: 300,
            Percent: 90,
            Discount: 10,
            Price: 32.99
        },
        {
            Id: 20,
            Image: config.rootLink + '/Content/ProductImage.png',
            Mount: 0,
            Percent: 0,
            Discount: 10,
            Price: 32.99
        },
    ]
    const [isLoading, setLoading] = useState(false);
    const handleSetLoading = useCallback(
        (newValue) => setLoading(newValue),
        [],
    );
    const [isHideButtonViewMore, setHideButtonViewMore] = useState(false);
    const [limitItem, setLimitItem] = useState(parseInt(props.ProductNumberInRow));

    const [LoadProduct, setLoadProduct] = useState(listProduct);
    const viewMore = () => {
        if (listProduct.length === limitItem) {
            setHideButtonViewMore(true);
            setLimitItem(limitItem => limitItem + parseInt(props.ProductNumberInRow));
            setLoading(false);
        } else {
            setLoading(true);
            setLimitItem(limitItem => limitItem + parseInt(props.ProductNumberInRow));
            setLoading(false);
        }

    }

    return (
        <div className="orichi-product-group">
            <div className="orichi-product-list grid-view">
                {LoadProduct.length > 0 ?
                    LoadProduct.slice(0, limitItem).map((product) => {
                        return (
                            <>
                                <div className="orichi-product-item" key={product.Id} style={{ width: `calc((100% - (12px*${props.ProductNumberInRow})) / ${props.ProductNumberInRow})` }}>
                                    <div className="wImage">
                                        <a href="#" title="" className="image cover">
                                            <img src={product.Image} />
                                        </a>
                                    </div>
                                    <div className="orichi-price-wrapper">
                                        <div className="orichi-price" style={{ color: props.ProductColor }}>{'$' + product.Price}
                                            <div className="orichi-discount-price" style={{ color: props.ProductColor, border: '1px solid ' + props.ProductColor }}>-{product.Discount}%</div>
                                        </div>
                                    </div>
                                    {
                                        props.ProductShowProgressBarStatus === true ? <div className="orichi-progress-bar">
                                            <div className="orichi-flash-sale-progress-bar">
                                                <div
                                                    className="orichi-flash-sale-progress-bar__complement-wrapper" style={{ background: props.ProductColor, width: product.Percent + '%' }}>
                                                </div>
                                                <div className="orichi-flash-sale-progress-bar__text">
                                                    {
                                                        product.Percent === 0 ? props.TextJustSale : product.Percent < 90 ? props.TextSold + ' ' + product.Mount : props.TextAlmostSoldOut
                                                    }
                                                   
                                                </div>
                                                {
                                                    product.Percent >= 80 ? <> <div className="orichi-flash-sale-progress-bar__fire">
                                                        <img src={config.rootLink + props.ProductIcon} />
                                                    </div></> : ''
                                                }

                                            </div>
                                        </div> : ''
                                    }

                                </div>
                            </>

                        );

                    })
                    : ''}
                <div className="orichi-cb"></div>
            </div>
            {isLoading ? <>

                <div className='orichi-spin-loading'>
                    <div className="stage">
                        <div className="dot-spin"></div>
                    </div>
                </div>
            </> : ''}
            {
                !isHideButtonViewMore ? <>
                    <div className="orichi-view-more"><Button onClick={() => { viewMore() }}>View more</Button></div>
                </> : ''
            }


        </div>
    )
}

export default Grid
