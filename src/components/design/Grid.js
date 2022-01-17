import { Button } from '@shopify/polaris';
import React, { useState, useCallback, useEffect } from 'react';
import '../../assets/css/dot.css'
import config from '../../config/config';
import utils from '../../config/utils';
function Grid(props) {
    const [limitItem, setLimitItem] = useState(parseInt(props.ProductNumberInRow));
    useEffect(() => { 
        setLimitItem(parseInt(props.ProductNumberInRow)); 
        setTotalPage(Math.ceil(props.ListProduct.length / parseInt(props.ProductNumberInRow)));
        if (props.IsReloadGridData) {
            setCurrentPage(currentPage => 1);
            setHideButtonViewMore(false);
            props.hanldeCallBackSetLoadGrid(false);
        }
    }, [parseInt(props.ProductNumberInRow)])
    const [isLoading, setLoading] = useState(false);
    const [LoadProduct, setLoadProduct] = useState(props.ListProduct);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(Math.ceil(props.ListProduct.length / parseInt(props.ProductNumberInRow)));
    const [isHideButtonViewMore, setHideButtonViewMore] = useState(totalPage === 1 ? true: false);
    
    const viewMore = () => {
        setHideButtonViewMore(false);
        setLoading(true);
        setCurrentPage(currentPage => currentPage + 1);
        setLimitItem(limitItem => limitItem + parseInt(props.ProductNumberInRow));
        setLoading(false);
        if (currentPage === totalPage - 1) {
            setHideButtonViewMore(true);
            setLoading(false);
        }

    }

    return (
        <div className="orichi-product-group">
            <div className="orichi-product-list grid-view">
                {LoadProduct.length > 0 ?
                    LoadProduct.slice(0, limitItem).map((product) => {
                        var percentSold = product.Inventory == 0 ? 0 : (product.SoldQuantity / product.Inventory) * 100;
                        return (
                            <>
                                <div className="orichi-product-item" key={product.Id} style={{ width: `calc((100% - (12px*${props.ProductNumberInRow})) / ${props.ProductNumberInRow})` }}>
                                    <div className="wImage">
                                        <a href={props.CurrentWebProduct + product.ProductHandle} title={product.ProductTitle} target={'_balnk'} className="image cover">
                                            <img src={product.ProductImage} />
                                        </a>
                                    </div>
                                    <div className="orichi-price-wrapper">
                                        <div className="orichi-price" style={{ color: props.ProductColor }}>{utils.ShopifyMoney(product.ProductPrice * 100,props.Currency)}
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
