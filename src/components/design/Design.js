import axios from 'axios';
import React, { useState, useCallback, useEffect } from 'react';
import { Card, Stack, RadioButton, TextField, ButtonGroup, Button, TextStyle, Modal, Toast, TextContainer } from '@shopify/polaris';
import { useDispatch, useSelector } from 'react-redux';
import { setDesign } from '../../state/modules/design/actions';
import config from '../../config/config';
import Grid from './Grid';
import Slider from './Slider';
import Uploady, { useUploady, useItemFinishListener, useBatchFinalizeListener, useItemStartListener } from "@rpldy/uploady";

import UploadyCustom from '../plugins/UploadyCustom';



const listProduct = [
    {
        Id: 1,
        Image: "/assets/images/finish.png"
    },
    {
        Id: 2,
        Image: "/assets/images/finish.png"
    },
    {
        Id: 3,
        Image: "/assets/images/finish.png"
    },
    {
        Id: 4,
        Image: "/assets/images/finish.png"
    },
    {
        Id: 5,
        Image: "/assets/images/finish.png"
    }
]

const Design = () => {
    debugger;
    const dispatch = useDispatch();
    const designState = useSelector((state) => state.design);
    const design = designState.Design;
    const [countDownTimer, setCountDown] = useState({});
    const handleSetCountDown = useCallback(
        (newValue) => setCountDown(newValue),
        [],
    );
    useEffect(() => {
        dispatch(setDesign({
            ...design,
            LayoutType: 0,
            ProductColor: "#EE4D2D",
            ProductIcon: config.rootLink +"/Content/ProductIcon.png",
            ProductImage: config.rootLink +"/Content/ProductImage.png",
            ProductNumberInRow: 4,
            ProductShowProgressBarStatus: true,
            TextAlmostSoldOut: "Almost sold out",
            TextJustSale: "Just Sale",
            TextSold: "Sold",
            TimerCountDownBackground: "#EE4D2D",
            TimerCountDownColor: "#EE4D2D",
            TimerCountDownStatus: true
        }))
    }, []);

    const handleSetUrlLogo = useCallback(
        (newValue) => {
            dispatch(setDesign({
                ...design,
                ProductImage : newValue
            }))
        },
        [],
    );
    const handleSetUrlIcon = useCallback(
        (newValue) => {
            dispatch(setDesign({
                ...design,
                ProductIcon : newValue
            }))
        },
        [],
    );
    function orichiFormatTime(number) {
        if (number < 10) return "0" + number;
        return number;
    }
    // const CountDown = () => {
    //     const second = 1000,
    //         minute = second * 60,
    //         hour = minute * 60,
    //         day = hour * 24;
    //     var endDate = "12/31/2021 23:00:00";
    //     const dateCountDown = new Date(endDate).getTime(),
    //         x = setInterval(function () {
    //             const now = new Date().getTime();
    //             var distance = dateCountDown - now;
    //             handleSetCountDown({
    //                 hours: orichiFormatTime(Math.abs(Math.floor((distance % (day)) / (hour)))),
    //                 minutes: orichiFormatTime(Math.abs(Math.floor((distance % (hour)) / (minute)))),
    //                 seconds: orichiFormatTime(Math.abs(Math.floor((distance % (minute)) / second)))
    //             })
    //             if (distance < 0) {
    //                 setShowCountDown(false);
    //                 clearInterval(x);
    //             }
    //         }, 0)
    // }
    // CountDown();
    return (
        <>
            <div className={'design'}>
                <div className={'layout-type'}>
                    {design.LayoutType === 0 ? <>
                        <ButtonGroup segmented>
                            <Button primary onClick={() => {
                                dispatch(setDesign({
                                    ...design,
                                    LayoutType: 0
                                }))
                            }} >Slide Layout</Button>
                            <Button onClick={() => {
                                dispatch(setDesign({
                                    ...design,
                                    LayoutType: 1
                                }))
                            }}>Grid Layout</Button>
                        </ButtonGroup>
                    </> : <>
                        <ButtonGroup segmented>
                            <Button onClick={() => {
                                dispatch(setDesign({
                                    ...design,
                                    LayoutType: 0
                                }))
                            }} >Slide Layout</Button>
                            <Button primary onClick={() => {
                                dispatch(setDesign({
                                    ...design,
                                    LayoutType: 1
                                }))
                            }}>Grid Layout</Button>
                        </ButtonGroup>
                    </>}


                </div>
                <div className={'show-product'}>
                    <div className='btn-preview'>
                        {/* <Button>Preview</Button> */}
                        <div className='title-preview'>
                            Preview
                        </div>
                    </div>
                    <div className='logo-section'>
                        <Card>
                            <Card.Section>
                                <div className={'logo'}>
                                    <img src={design.ProductImage} />

                                    {/* <div className={'wImage'}>
                                        <a href="#" title="" className={'image cover'}>
                                        </a>
                                    </div> */}
                                </div>
                                {design.TimerCountDownStatus ? <>
                                    <div className={'orichi-countdown'}>
                                        <ul>
                                            <li><span style={{ background: design.TimerCountDownBackground, color: design.TimerCountDownColor }}>12</span></li>
                                            <li><span style={{ background: design.TimerCountDownBackground, color: design.TimerCountDownColor }}>12</span></li>
                                            <li><span style={{ background: design.TimerCountDownBackground, color: design.TimerCountDownColor }}>12</span></li>
                                        </ul>
                                    </div>
                                </> : ''}

                                <div className='cb'>
                                </div>
                            </Card.Section>
                        </Card>
                    </div>
                    <div className={'list-view'}>
                        <Card>
                            <Card.Section>
                                {design.LayoutType === 0 ? <Slider ProductIcon={design.ProductIcon} ProductShowProgressBarStatus={design.ProductShowProgressBarStatus}></Slider> : <Grid ProductIcon={design.ProductIcon} ProductShowProgressBarStatus={design.ProductShowProgressBarStatus}></Grid>}
                            </Card.Section>
                        </Card>
                    </div>
                </div>
                <div className={'section section-timer-countdown'}>
                    <div className={'colLeft w32pt'}>
                        <div className={'common-title'}>
                            Timer CountDown
                        </div>
                    </div>
                    <div className={'colRight w66pt'}>
                        <Card>
                            <Card.Section>
                                {
                                    design.TimerCountDownStatus ? <>
                                        <ButtonGroup segmented>
                                            <Button onClick={() => {
                                                dispatch(setDesign({
                                                    ...design,
                                                    TimerCountDownStatus: false
                                                }))
                                            }} >Disable</Button>
                                            <Button primary onClick={() => {
                                                dispatch(setDesign({
                                                    ...design,
                                                    TimerCountDownStatus: true
                                                }))
                                            }}>Enable</Button>
                                        </ButtonGroup>
                                    </> : <>
                                        <ButtonGroup segmented>
                                            <Button primary onClick={() => {
                                                dispatch(setDesign({
                                                    ...design,
                                                    TimerCountDownStatus: false
                                                }))
                                            }} >Disable</Button>
                                            <Button onClick={() => {
                                                dispatch(setDesign({
                                                    ...design,
                                                    TimerCountDownStatus: true
                                                }))
                                            }}>Enable</Button>
                                        </ButtonGroup>
                                    </>
                                }
                            </Card.Section>
                            <Card.Section>
                                <div className='common-label colLeft w32pt'>
                                    <TextStyle>Timer Color</TextStyle>
                                </div>
                                <div className='colLeft w66pt'>
                                    <input type="color" value={design.TimerCountDownColor} onChange={e => {
                                        dispatch(setDesign({
                                            ...design,
                                            TimerCountDownColor: e.target.value
                                        }))
                                    }} />
                                </div>
                                <div className='cb'>
                                </div>
                            </Card.Section>
                            <Card.Section>
                                <div className='common-label colLeft w32pt'>
                                    <TextStyle>Timer Background</TextStyle>
                                </div>
                                <div className='colLeft w66pt'>
                                    <input type="color" value={design.TimerCountDownBackground} onChange={e => {
                                        dispatch(setDesign({
                                            ...design,
                                            TimerCountDownBackground: e.target.value
                                        }))
                                    }} />
                                </div>
                                <div className='cb'>
                                </div>
                            </Card.Section>
                        </Card>

                    </div>
                    <div className={'cb'}></div>
                </div>
                <div className={'section section-product-setting'}>
                    <div className={'colLeft w32pt'}>
                        <div className={'common-title'}>
                            Setting Product
                        </div>
                    </div>
                    <div className={'colRight w66pt'}>
                        <Card>
                            <Card.Section>
                                <div className='common-label colLeft w32pt'>
                                    <TextStyle>Show process bar</TextStyle>
                                </div>
                                <div className='colLeft w66pt'>
                                    <Stack horizontal>
                                        <RadioButton
                                            label="Enable"
                                            id="1"
                                            name="showprocessbar"
                                            checked={design.ProductShowProgressBarStatus === true}
                                            onChange={() => {
                                                dispatch(setDesign({
                                                    ...design,
                                                    ProductShowProgressBarStatus: true
                                                }))
                                            }}
                                        />
                                        <RadioButton
                                            label="Disabled"
                                            id="0"
                                            name="showprocessbar"
                                            checked={design.ProductShowProgressBarStatus === false}
                                            onChange={() => {
                                                dispatch(setDesign({
                                                    ...design,
                                                    ProductShowProgressBarStatus: false
                                                }))
                                            }}
                                        />
                                    </Stack>
                                </div>
                                <div className='cb'>
                                </div>
                            </Card.Section>
                            <Card.Section>
                                <div className='common-label colLeft w32pt'>
                                    <TextStyle>Color</TextStyle>
                                </div>
                                <div className='colLeft w66pt'>
                                    <input type="color" value={design.ProductColor} onChange={e => {
                                        dispatch(setDesign({
                                            ...design,
                                            ProductColor: e.target.value
                                        }))
                                    }} />
                                </div>
                                <div className='cb'>
                                </div>
                            </Card.Section>
                            <Card.Section>
                                <div className='flashsale-image'>
                                    <div className='common-label colLeft w32pt'>
                                        <TextStyle>FlashSale Image</TextStyle>
                                    </div>
                                    <div className='colLeft w66pt right'>
                                        <div className={'logo'}>
                                            <img src={design.ProductImage} />

                                        </div>
                                        <Uploady
                                            multiple
                                            autoUpload={true}
                                            method="POST"
                                            destination={{ url: config.rootLink + '/FrontEnd/FileUpload', headers: { "x-custom": "123" } }}>
                                            <UploadyCustom handleSetUrlLogo={handleSetUrlLogo} type='image'></UploadyCustom>
                                    </Uploady>
                                </div>
                                <div className='cb'>
                                </div>
                            </div>
                        </Card.Section>
                        <Card.Section>
                            <div className='flashsale-image'>
                                <div className='common-label colLeft w32pt'>
                                    <TextStyle>FlashSale Icon</TextStyle>
                                </div>
                                <div className='colLeft w66pt right'>
                                    <div className={'icon'}>
                                        <img src={design.ProductIcon} />

                                    </div>
                                    <Uploady
                                        multiple
                                        autoUpload={true}
                                        method="POST"
                                        destination={{ url: config.rootLink + '/FrontEnd/FileUpload', headers: { "x-custom": "123" } }}>
                                        <UploadyCustom handleSetUrlIcon={handleSetUrlIcon} type='icon'></UploadyCustom>
                                    </Uploady>
                                </div>
                                <div className='cb'>
                                </div>

                            </div>
                            <div className='subTitle'>
                                Show for the products that sold 80% in inventory.
                            </div>
                        </Card.Section>
                        {
                            design.LayoutType === 1 ? <Card.Section>
                                <TextField
                                    label="Number of the product in a row"
                                    value={design.ProductNumberInRow}
                                    onChange={(e) => {
                                        dispatch(setDesign({
                                            ...design,
                                            ProductNumberInRow: e
                                        }))

                                    }}
                                    autoComplete="off"
                                    min="1" max="10"
                                />
                            </Card.Section> : null
                        }

                    </Card>
                </div>
                <div className={'cb'}></div>
            </div>
            <div className={'section section-text-setting'}>
                <div className={'colLeft w32pt'}>
                    <div className={'common-title'}>
                        Text Setting
                    </div>
                </div>
                <div className={'colRight w66pt'}>
                    <Card>
                        <Card.Section>
                            <TextField
                                label="“Sold” label"
                                value={design.TextSold}
                                onChange={(e)=>{
                                    dispatch(setDesign({
                                        ...design,
                                        TextSold: e
                                    }))
                                }}
                                autoComplete="off"
                            />
                        </Card.Section>
                        <Card.Section>
                            <TextField
                                label="“Almost sold out” label"
                                value={design.TextAlmostSoldOut}
                                onChange={(e)=>{
                                    dispatch(setDesign({
                                        ...design,
                                        TextAlmostSoldOut: e
                                    }))
                                }}
                                helpText=" Show for the products that sold 90% in inventory.
                                "
                                autoComplete="off"
                            />
                        </Card.Section>
                        <Card.Section>
                            <TextField
                                label="“Just Sale” label"
                                value={design.TextJustSale}
                                onChange={(e)=>{
                                    dispatch(setDesign({
                                        ...design,
                                        TextJustSale: e
                                    }))
                                }}
                                autoComplete="off"
                            />
                        </Card.Section>
                    </Card>
                </div>
                <div className={'cb'}></div>
            </div>
        </div >
        </>

    )
}

export default Design
