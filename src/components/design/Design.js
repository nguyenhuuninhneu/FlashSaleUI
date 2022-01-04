import axios from 'axios';
import React, { useState, useCallback, useEffect } from 'react';
import { Card, Stack, RadioButton, TextField, ButtonGroup, Button, TextStyle, Modal, Toast, TextContainer, ContextualSaveBar } from '@shopify/polaris';
import { useDispatch, useSelector } from 'react-redux';
import { setDesign } from '../../state/modules/design/actions';
import { saveDesign } from '../../state/modules/design/operations';
import config from '../../config/config';
import Grid from './Grid';
import Slider from './Slider';
import Uploady, { useUploady, useItemFinishListener, useBatchFinalizeListener, useItemStartListener } from "@rpldy/uploady";

import UploadyCustom from '../plugins/UploadyCustom';
import moreAppConfig from '../../config/moreAppConfig';


const Design = () => {
    debugger;
    const dispatch = useDispatch();
    const designState = useSelector((state) => state.design.DesignInfo);
    const design = designState.design;
    useEffect(() => {
        dispatch(setDesign({
            ...designState,
            IsOpenSaveToolbar: false,
            IsSaveLoading: false,
            IsOpenSaveResult: false,
            MessageSaveResult: null,
            TitleValidation: null,
            TitleValidationNUmber: null,
        }))
    }, []);

    const handleSetUrlLogo = useCallback(
        (newValue) => {
            dispatch(setDesign({
                ...designState,
                design: {
                    ...design,
                    ProductImage: newValue
                },
                IsOpenSaveToolbar: true
            }))
        },
        [],
    );
    const handleSetUrlIcon = useCallback(
        (newValue) => {
            dispatch(setDesign({
                ...designState,
                design: {
                    ...design,
                    ProductIcon: newValue
                },
                IsOpenSaveToolbar: true
            }))
        },
        [],
    );
    function orichiFormatTime(number) {
        if (number < 10) return "0" + number;
        return number;
    }
    const validNumber = (input) => {
        var isNumber = true;
        if (!/[0-9]/.test(input)) {
            isNumber = false;
        }
        return isNumber;
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
            {designState.IsOpenSaveToolbar ? <ContextualSaveBar
                message="Unsaved changes"
                saveAction={{
                    content: "Save",
                    onAction: () => { dispatch(saveDesign()) },
                    loading: designState.IsSaveLoading,
                }}
                discardAction={{
                    content: "Discard",
                    onAction: () => dispatch(setDesign({
                        ...designState,
                        IsOpenSaveToolbar: false
                    })),
                }}
            /> : <></>}
            <div className={'design'}>
                <div className={'layout-type'}>
                    {design.LayoutType === 0 ? <>
                        <ButtonGroup segmented>
                            <Button primary onClick={() => {
                                dispatch(setDesign({
                                    ...designState,
                                    design: {
                                        ...design,
                                        LayoutType: 0
                                    },
                                    IsOpenSaveToolbar: true
                                }))
                            }} >Slide Layout</Button>
                            <Button onClick={() => {
                                dispatch(setDesign({
                                    ...designState,
                                    design: {
                                        ...design,
                                        LayoutType: 1
                                    },
                                    IsOpenSaveToolbar: true
                                }))
                            }}>Grid Layout</Button>
                        </ButtonGroup>
                    </> : <>
                        <ButtonGroup segmented>
                            <Button onClick={() => {
                                dispatch(setDesign({
                                    ...designState,
                                    design: {
                                        ...design,
                                        LayoutType: 0
                                    },
                                    IsOpenSaveToolbar: true
                                }))
                            }} >Slide Layout</Button>
                            <Button primary onClick={() => {
                                dispatch(setDesign({
                                    ...designState,
                                    design: {
                                        ...design,
                                        LayoutType: 1
                                    },
                                    IsOpenSaveToolbar: true
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
                                    <div className={'wImage'}>
                                        <a href="#" title="" className={'image cover'}>
                                            <img src={config.rootLink + design.ProductImage} />
                                        </a>
                                    </div>
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
                                {design.LayoutType === 0 ?
                                    <Slider ProductColor={design.ProductColor} ProductIcon={design.ProductIcon} ProductShowProgressBarStatus={design.ProductShowProgressBarStatus} TextSold={design.TextSold}
                                        TextAlmostSoldOut={design.TextAlmostSoldOut}
                                        TextJustSale={design.TextJustSale}></Slider> :
                                    <Grid ProductNumberInRow={design.ProductNumberInRow} ProductColor={design.ProductColor} ProductIcon={design.ProductIcon} ProductShowProgressBarStatus={design.ProductShowProgressBarStatus} TextSold={design.TextSold}
                                        TextAlmostSoldOut={design.TextAlmostSoldOut}
                                        TextJustSale={design.TextJustSale}></Grid>}
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
                                                    ...designState,
                                                    design: {
                                                        ...design,
                                                        TimerCountDownStatus: false
                                                    },
                                                    IsOpenSaveToolbar: true
                                                }))
                                            }} >Disable</Button>
                                            <Button primary onClick={() => {
                                                dispatch(setDesign({
                                                    ...designState,
                                                    design: {
                                                        ...design,
                                                        TimerCountDownStatus: true
                                                    },
                                                    IsOpenSaveToolbar: true
                                                }))
                                            }}>Enable</Button>
                                        </ButtonGroup>
                                    </> : <>
                                        <ButtonGroup segmented>
                                            <Button primary onClick={() => {
                                                dispatch(setDesign({
                                                    ...designState,
                                                    design: {
                                                        ...design,
                                                        TimerCountDownStatus: false
                                                    },
                                                    IsOpenSaveToolbar: true
                                                }))
                                            }} >Disable</Button>
                                            <Button onClick={() => {
                                                dispatch(setDesign({
                                                    ...designState,
                                                    design: {
                                                        ...design,
                                                        TimerCountDownStatus: true
                                                    },
                                                    IsOpenSaveToolbar: true
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
                                            ...designState,
                                            design: {
                                                ...design,
                                                TimerCountDownColor: e.target.value
                                            },
                                            IsOpenSaveToolbar: true
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
                                            ...designState,
                                            design: {
                                                ...design,
                                                TimerCountDownBackground: e.target.value
                                            },
                                            IsOpenSaveToolbar: true
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
                                                    ...designState,
                                                    design: {
                                                        ...design,
                                                        ProductShowProgressBarStatus: true
                                                    },
                                                    IsOpenSaveToolbar: true
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
                                                    ...designState,
                                                    design: {
                                                        ...design,
                                                        ProductShowProgressBarStatus: false
                                                    },
                                                    IsOpenSaveToolbar: true
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
                                            ...designState,
                                            design: {
                                                ...design,
                                                ProductColor: e.target.value
                                            },
                                            IsOpenSaveToolbar: true
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
                                            <div className={'wImage'}>
                                                <a href="#" title="" className={'image cover'}>
                                                    <img src={config.rootLink + design.ProductImage} />
                                                </a>
                                            </div>

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
                                            <div className={'wImage'}>
                                                <a href="#" title="" className={'image cover'}>
                                                    <img src={config.rootLink + design.ProductIcon} />
                                                </a>
                                            </div>

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
                                        type='number'
                                        min={1}
                                        max={100}
                                        error={design.TitleValidationNUmber}
                                        value={design.ProductNumberInRow.toString()}
                                        onChange={(e) => {
                                            if (e != '') {
                                                var isNumber = validNumber(e);
                                                if (isNumber) {
                                                    dispatch(setDesign({
                                                        ...designState,
                                                        design: {
                                                            ...design,
                                                            ProductNumberInRow: e,
                                                            TitleValidationNUmber: ''
                                                        },
                                                        IsOpenSaveToolbar: true
                                                    }))
                                                } else {
                                                    dispatch(setDesign({
                                                        ...designState,
                                                        design: {
                                                            ...design,
                                                            TitleValidationNUmber: moreAppConfig.DesignValidationProductNumberARow
                                                        }
                                                    }))
                                                }
                                            }

                                            // dispatch(setDesign({
                                            //     ...designState,
                                            //     design: {
                                            //         ...design,
                                            //         ProductNumberInRow: e
                                            //     },
                                            //     IsOpenSaveToolbar: true
                                            // }))
                                        }}
                                        autoComplete="off"
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
                                    onChange={(e) => {
                                        dispatch(setDesign({
                                            ...designState,
                                            design: {
                                                ...design,
                                                TextSold: e
                                            },
                                            IsOpenSaveToolbar: true
                                        }))
                                    }}
                                    autoComplete="off"
                                />
                            </Card.Section>
                            <Card.Section>
                                <TextField
                                    label="“Almost sold out” label"
                                    value={design.TextAlmostSoldOut}
                                    onChange={(e) => {
                                        dispatch(setDesign({
                                            ...designState,
                                            design: {
                                                ...design,
                                                TextAlmostSoldOut: e
                                            },
                                            IsOpenSaveToolbar: true
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
                                    onChange={(e) => {
                                        dispatch(setDesign({
                                            ...designState,
                                            design: {
                                                ...design,
                                                TextJustSale: e
                                            },
                                            IsOpenSaveToolbar: true
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
            {designState.IsOpenSaveResult ? <Toast content={designState.MessageSaveResult} duration={4000} onDismiss={() => {
                dispatch(setDesign({
                    ...designState,
                    IsOpenSaveResult: null
                }))
            }} /> : null}
        </>

    )
}

export default Design
