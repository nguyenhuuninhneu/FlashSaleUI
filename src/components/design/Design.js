import axios from 'axios';
import React, { useState, useCallback, useEffect } from 'react';
import { Card, Stack, RadioButton, TextField, ButtonGroup, Button, TextStyle, Modal, Toast, TextContainer, ContextualSaveBar } from '@shopify/polaris';
import { useDispatch, useSelector } from 'react-redux';
import { setDesign } from '../../state/modules/design/actions';
import { saveDesign, fetchDesign } from '../../state/modules/design/operations';
import config from '../../config/config';
import Grid from './Grid';
import Slider from './Slider';
import Uploady from "@rpldy/uploady";
import UploadyCustom from '../plugins/UploadyCustom';
import moreAppConfig from '../../config/moreAppConfig';
import Countdown from "react-countdown-now";


const Design = () => {
    const dispatch = useDispatch();
    const appState = useSelector((state) => state);
    const designState = useSelector((state) => state.design.DesignInfo);
    const design = designState.design;
    const ListProduct = appState != null && appState.campaign != null && appState.campaign.ListCampaign != null && appState.campaign.ListCampaign.campaigns.length > 0 ? appState.campaign.ListCampaign.campaigns[0].ListDetails : [];
    const Currency = appState != null && appState.app != null && appState.app.Shop != null ? appState.app.Shop.Currency : '';
    const Domain = appState != null && appState.app != null && appState.app.Shop != null ? appState.app.Shop.Domain : '';
    useEffect(() => {
        dispatch(setDesign({
            ...designState,
            IsOpenSaveToolbar: false,
            IsSaveLoading: false,
            IsOpenSaveResult: false,
            IsReloadGridData: false,
            MessageSaveResult: null,
            TitleValidation: null,
            TitleValidationNumber: null,
        }))
    }, []);
    const endCampaign = appState.campaign != null && appState.campaign != undefined && appState.campaign.ListCampaign.campaigns[0] != null && appState.campaign.ListCampaign.campaigns[0] != undefined ? appState.campaign.ListCampaign.campaigns[0].EndTimeEdit : new Date();
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
    const hanldeCallBackSetLoadGrid = (value) => {
        setDesign({
            ...designState,
            IsReloadGridData: false
        })
    }

    return (
        <>
            {designState.IsOpenSaveToolbar ? <ContextualSaveBar
                message="Unsaved changes"
                saveAction={{
                    content: "Save",
                    onAction: () => {
                        //valid number row;
                        var isSubmit = false;
                        if (design.ProductNumberInRow.toString() !== '' && design.ProductNumberInRow > 0) {
                            isSubmit = true;
                        }

                        if (isSubmit) {
                            dispatch(saveDesign())
                        }

                    },
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
            <>
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
                                                <Countdown
                                                    date={endCampaign}
                                                    intervalDelay={0}
                                                    precision={3}
                                                    renderer={props => <div><li><span style={{ background: design.TimerCountDownBackground, color: design.TimerCountDownColor }}>{props.hours > 10 ? props.hours : '0'+ props.hours}</span></li>
                                                        <li><span style={{ background: design.TimerCountDownBackground, color: design.TimerCountDownColor }}>{props.minutes > 10 ? props.minutes : '0'+ props.minutes}</span></li>
                                                        <li><span style={{ background: design.TimerCountDownBackground, color: design.TimerCountDownColor }}>{props.seconds > 10 ? props.seconds : '0'+ props.seconds}</span></li></div>}
                                                />

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
                                        <Slider ListProduct={ListProduct} Currency={Currency} CurrentWebProduct={window.location.protocol + '//' + Domain + '/products/'} ProductColor={design.ProductColor} ProductIcon={design.ProductIcon} ProductShowProgressBarStatus={design.ProductShowProgressBarStatus} TextSold={design.TextSold}
                                            TextAlmostSoldOut={design.TextAlmostSoldOut}
                                            TextJustSale={design.TextJustSale}></Slider> :
                                        <Grid ListProduct={ListProduct} Currency={Currency} CurrentWebProduct={window.location.protocol + '//' + Domain + '/products/'} ProductNumberInRow={design.ProductNumberInRow} ProductColor={design.ProductColor} ProductIcon={design.ProductIcon} ProductShowProgressBarStatus={design.ProductShowProgressBarStatus} TextSold={design.TextSold}
                                            TextAlmostSoldOut={design.TextAlmostSoldOut}
                                            TextJustSale={design.TextJustSale} IsReloadGridData={designState.IsReloadGridData} hanldeCallBackSetLoadGrid={hanldeCallBackSetLoadGrid}></Grid>}
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
                                            error={design.TitleValidationNumber}
                                            value={design.ProductNumberInRow.toString()}
                                            onChange={(e) => {
                                                dispatch(setDesign({
                                                    ...designState,
                                                    design: {
                                                        ...design,
                                                        ProductNumberInRow: e.toString(),
                                                        TitleValidationNumber: (e.toString() === '' ? moreAppConfig.DesignValidationProductNumberARowNotNull : e <= 0 ? moreAppConfig.DesignValidationProductNumberARowGreater : '')
                                                    },
                                                    IsReloadGridData: true,
                                                    IsOpenSaveToolbar: true
                                                }))

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
                                        label="???Sold??? label"
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
                                        label="???Almost sold out??? label"
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
                                        label="???Just Sale??? label"
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
            </>

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
