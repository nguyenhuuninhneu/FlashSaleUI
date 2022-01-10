import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSetting } from '../../state/modules/setting/actions';
import { Card, Select, Heading, DataTable, Page, TextField, Button, TextStyle, Modal, Toast, TextContainer, Collapsible, Link, ContextualSaveBar } from '@shopify/polaris';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronDown, faClone } from '@fortawesome/free-solid-svg-icons'
import { saveSetting, createSection, removeSection, createFlashSalePage } from '../../state/modules/setting/operations';
import moreAppConfig from '../../config/moreAppConfig';
import timezonesconfig from '../../config/timezone';
import Loading from '../plugins/Loading';
import LoadingSmall from '../plugins/LoadingSmall';

function Setting() {
    const dispatch = useDispatch();
    const settingState = useSelector((state) => state.setting.SettingInfo);
    const setting = settingState.setting;
    function convertDate(date) {
        debugger;
        var getDate = new Date();
        if (date !== null && date.toString().includes('/Date')) {
            var numberDate = Number(date.toString().replace('/Date(', '').replace(')/', ''));
            getDate = new Date(numberDate);
        } else {
            getDate = new Date(date);
        }

        var day = 1;
        var month = 1;
        day = getDate.getDate();
        month = getDate.getMonth() + 1;
        var hours = getDate.getHours();
        if (hours < 10) {
            hours = '0' + hours;
        }
        var minutes = getDate.getMinutes();
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        var strDate = month + '/' + day + '/' + getDate.getFullYear() + ', ' + hours + ':' + minutes;
        return strDate;
    }
    if (setting != null && setting.PageCreatedDate !== null && setting.PageCreatedDateStr !== null&& setting.PageCreatedDateStr != undefined&& setting.PageCreatedDateStr != "") {
        debugger;
        setting.PageCreatedDateStr = convertDate(setting.PageCreatedDate);
    }
    useEffect(() => {
        dispatch(setSetting({
            ...settingState,
            IsOpenSaveToolbar: false,
            IsSaveLoading: false,
            IsOpenSaveResult: false,
            MessageSaveResult: null,
            TitleValidationTheme: null,
            TitleValidationPageTitle: null,
            IsShowLoadingEnableApp: false,
            IsShowLoadingCreateSection: false,
            IsShowLoadingCreateFSPage: false,
            setting: {
                ...setting,
                PageCreatedDateStr: '',
            }
        }));
    }, []);

    const [timezones, setSelectedTimeZones] = useState(timezonesconfig);
    let tz1 = timezonesconfig.find(p => p.value == 'Default timezone');
    let tz = setting != null && setting.TimeZone !== null && setting.TimeZone !== undefined && setting.TimeZone !== '' && setting.TimeZoneStr !== null && setting.TimeZoneStr !== undefined && setting.TimeZoneStr !== '' ? timezonesconfig.find(p => p.time == setting.TimeZone && p.value == setting.TimeZoneStr) : tz1;
    const [selectedTimeZone, setSelectedTimeZone] = useState(setting!= null && setting.TimeZone === null ? 'Default timezone' : tz.value);

    const [selectedSection, setSelectedSection] = useState('');
    
    const [openOne, setOpenOne] = useState(true);
    const [openTwo, setOpenTWo] = useState(false);
    const [openThree, setOpenThree] = useState(false);
    const handleToggleOne = useCallback(() => {
        setOpenOne((openOne) => !openOne);
    }, []);
    const handleToggleTwo = useCallback(() => {
        setOpenTWo((openTwo) => !openTwo);
    }, []);
    const handleToggleThree = useCallback(() => {
        setOpenThree((openThree) => !openThree);
    }, []);

    const AddTheme = (id) => {
        debugger;
        if (id !== null && id !== undefined && id !== '') {
            dispatch(setSetting({
                ...settingState,
                IsShowLoadingCreateSection: true
            }))
            const theme = settingState.ListThemes.filter(theme => theme.Id.toString() == id);
            dispatch(createSection(id, theme[0].Name, new Date()));
        } else {
            dispatch(setSetting({
                ...settingState,
                TitleValidationTheme: moreAppConfig.SettingValidationSelectTheme
            }))
        }

    }
    const removeTheme = (id) => {
        dispatch(setSetting({
            ...settingState,
            IsShowLoadingCreateSection: true
        }))
        dispatch(removeSection(id));
    }
    debugger;
    var optionsSection = [];
    optionsSection.push({label: 'Select section', value: ''})
    settingState.ListThemes.forEach((theme,index)=>{
        optionsSection.push({label: theme.Name, value: theme.Id.toString()})
    })
    return (
        <>
            {settingState.IsOpenSaveToolbar ? <ContextualSaveBar
                message="Unsaved changes"
                saveAction={{
                    content: "Save",
                    onAction: () => {
                        let tz = timezones.find(p => p.value === selectedTimeZone);
                        dispatch(setSetting({
                            ...settingState,
                            setting: {
                                ...setting,
                                TimeZone: tz == undefined ? null : tz.time,
                                TimeZoneStr: tz == undefined ? null : tz.value,
                            }
                        }))
                        dispatch(saveSetting())
                    },
                    loading: settingState.IsSaveLoading,
                }}
                discardAction={{
                    content: "Discard",
                    onAction: () => dispatch(setSetting({
                        ...settingState,
                        IsOpenSaveToolbar: false
                    })),
                }}
            /> : <></>}

            {
                !settingState.IsShowLoadingSettingComponent ?
                    <>
                        <div className='setting'>
                            {
                                !settingState.IsShowLoadingEnableApp ? <Card>
                                    <Card.Section>
                                        <div className='colLeft'>
                                            <p className='ptb8'>
                                                The app is <TextStyle variation="strong">{setting.Active ? 'Enabled' : 'Disabled'}</TextStyle>
                                            </p>
                                        </div>
                                        <div className='colRight'>
                                            {
                                                setting.Active ? <Button onClick={() => {
                                                    dispatch(setSetting({
                                                        ...settingState,
                                                        setting: {
                                                            ...setting,
                                                            Active: false
                                                        },
                                                        IsOpenSaveToolbar: true
                                                    }))
                                                }}>Disable App</Button> : <Button primary onClick={() => {
                                                    dispatch(setSetting({
                                                        ...settingState,
                                                        setting: {
                                                            ...setting,
                                                            Active: true
                                                        },
                                                        IsOpenSaveToolbar: true
                                                    }))
                                                }}>Enable App</Button>
                                            }


                                        </div>
                                        <div className='orichi-cb'>
                                        </div>
                                        <div className='w66pt mt-20'>
                                            <Select
                                                label="Timezone"
                                                options={timezones}
                                                onChange={(e) => {
                                                    debugger;
                                                    setSelectedTimeZone(e)
                                                    dispatch(setSetting({
                                                        ...settingState,
                                                        IsOpenSaveToolbar: true
                                                    }))
                                                }}
                                                value={selectedTimeZone}
                                            />
                                        </div>

                                    </Card.Section>
                                </Card> : <LoadingSmall />
                            }

                            <div className='mt-10 mb-20'>
                                <Heading>How to add the FlashSale to your store?</Heading>

                            </div>
                            <Card sectioned>
                                <>
                                    <div className='use-section' onClick={handleToggleOne} ariaExpanded={openOne}
                                        ariaControls="basic-collapsible-1">
                                        <div className='title colLeft'>
                                            I. Use the section
                                        </div>
                                        <div className='colRight'>
                                            <FontAwesomeIcon icon={openOne ? faChevronDown : faChevronRight} />
                                        </div>
                                        <div className='orichi-cb'>
                                        </div>
                                    </div>
                                </>
                                <Collapsible
                                    open={openOne}
                                    id="basic-collapsible-1"
                                    transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
                                    expandOnPrint
                                >
                                    <div className='bound-section'>
                                        <p className='mb-20'>
                                            1. Create the section on your theme
                                        </p>
                                        <div className='colLeft w66pt'>
                                            <Select
                                                options={optionsSection}
                                                onChange={(value) => {
                                                    debugger;
                                                    setSelectedSection(value);
                                                    if (value !== null && value !== undefined && value !== '') {
                                                        dispatch(setSetting({
                                                            ...settingState,
                                                            TitleValidationTheme: ''
                                                        }))
                                                    } else {
                                                        dispatch(setSetting({
                                                            ...settingState,
                                                            TitleValidationTheme: moreAppConfig.SettingValidationSelectTheme
                                                        }))
                                                    }
                                                }}
                                                value={selectedSection}
                                                error={settingState.TitleValidationTheme}
                                            />
                                        </div>
                                        <div className='colLeft ml-5'>
                                            <Button primary onClick={() => {
                                                AddTheme(selectedSection);
                                            }}>Create</Button>

                                        </div>
                                        <div className='cb'>
                                        </div>
                                        <div className='list-section mt-40'>
                                            {
                                                !settingState.IsShowLoadingCreateSection ?
                                                    <>
                                                        <Page>
                                                            <Card>
                                                                <DataTable
                                                                    columnContentTypes={[
                                                                        'text',
                                                                        'datetime',
                                                                        ''
                                                                    ]}
                                                                    headings={[
                                                                        'Theme',
                                                                        'Created At',
                                                                        ''
                                                                    ]}
                                                                    rows={settingState.setting.ListSections.map((element, index) => {
                                                                        return [element.Name, element.CreatedAtStr, <><div className='remove-code'>
                                                                            <Link onClick={() => { removeTheme(element.Id) }}> Remove Code</Link>
                                                                        </div></>];
                                                                    })}
                                                                />
                                                            </Card>
                                                        </Page>
                                                    </>
                                                    : <LoadingSmall />
                                            }


                                        </div>
                                    </div>
                                </Collapsible>
                            </Card>
                            <div className='mb-20'>
                            </div>
                            <Card sectioned>
                                <>
                                    <div className='use-section' onClick={handleToggleTwo} ariaExpanded={openTwo}
                                        ariaControls="basic-collapsible-2">
                                        <div className='title colLeft'>
                                            II. Use the page

                                        </div>
                                        <div className='colRight'>
                                            <FontAwesomeIcon icon={openTwo ? faChevronDown : faChevronRight} />
                                        </div>
                                        <div className='cb'>
                                        </div>
                                    </div>
                                </>
                                <Collapsible
                                    open={openTwo}
                                    id="basic-collapsible-2"
                                    transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
                                    expandOnPrint
                                >
                                    <div className='bound-section page-title'>
                                        {
                                            !settingState.IsShowLoadingCreateFSPage && setting.PageCreatedDate === null || setting.PageCreatedDate === undefined ?
                                                <>
                                                    <div className='w66pt'>
                                                        <TextField
                                                            label="Page Title"
                                                            value={setting.PageTitle}
                                                            error={settingState.TitleValidationPageTitle}
                                                            onChange={(e) => {
                                                                if (e !== '' && e !== null) {
                                                                    dispatch(setSetting({
                                                                        ...settingState,
                                                                        TitleValidationPageTitle: '',
                                                                        setting: {
                                                                            ...setting,
                                                                            PageTitle: e
                                                                        },
                                                                    }))

                                                                } else {
                                                                    dispatch(setSetting({
                                                                        ...settingState,
                                                                        TitleValidationPageTitle: moreAppConfig.SettingValidationPageTitle,
                                                                        setting: {
                                                                            ...setting,
                                                                            PageTitle: e
                                                                        },
                                                                    }))
                                                                }

                                                            }}
                                                            autoComplete="off"
                                                            placeholder='Page Title'
                                                        />
                                                        <div className='mt-20'></div>
                                                        <Button primary onClick={() => {
                                                            if (setting.PageTitle !== '' && setting.PageTitle !== null && setting.PageTitle !== undefined) {
                                                                dispatch(setSetting({
                                                                    ...settingState,
                                                                    IsShowLoadingCreateFSPage: true
                                                                }))
                                                                dispatch(createFlashSalePage(new Date()));
                                                            } else {
                                                                dispatch(setSetting({
                                                                    ...settingState,
                                                                    TitleValidationPageTitle: moreAppConfig.SettingValidationPageTitle
                                                                }))
                                                            }

                                                        }} >Create</Button>
                                                    </div>
                                                    <div className='mb-20'>
                                                    </div>
                                                </> : ''
                                        }


                                        {
                                            !settingState.IsShowLoadingCreateFSPage && setting.PageCreatedDate !== null && setting.PageCreatedDate !== undefined ?
                                                <>
                                                    <TextContainer>
                                                        <Heading>{setting.PageTitle}</Heading>
                                                        <div>
                                                            <span>URL:</span>
                                                            <div className='w50pt dib ml-10 url-blue'>
                                                                <TextField
                                                                    value={setting.PageUrl}
                                                                    onChange={(e) => {
                                                                        if (e !== '') {
                                                                            dispatch(setSetting({
                                                                                ...settingState,
                                                                                setting: {
                                                                                    ...setting,
                                                                                    PageUrl: e
                                                                                },
                                                                            }))
                                                                        }
                                                                    }}
                                                                    autoComplete="off"
                                                                />
                                                            </div>
                                                            <div className='dib ml-10 copy-board'>
                                                                <Link onClick={() => {

                                                                    navigator.clipboard.writeText(setting.PageUrl);
                                                                    dispatch(setSetting({
                                                                        ...settingState,
                                                                        IsOpenSaveResult: true,
                                                                        MessageSaveResult: 'Page URL is copied to clipboard.'
                                                                    }))

                                                                }}><FontAwesomeIcon icon={faClone} /></Link>
                                                            </div>
                                                        </div>
                                                        <p>
                                                            Created at: {setting.PageCreatedDateStr}
                                                            {/* Created at: {setting.PageCreatedDate} */}
                                                        </p>

                                                    </TextContainer>
                                                </> : ''
                                        }
                                        {settingState.IsShowLoadingCreateFSPage ? <LoadingSmall></LoadingSmall> : ''}
                                    </div>
                                </Collapsible>
                            </Card>
                            <div className='mb-20'>
                            </div>
                            <Card sectioned>
                                <>
                                    <div className='use-section' onClick={handleToggleThree} ariaExpanded={openThree}
                                        ariaControls="basic-collapsible-3">
                                        <div className='title colLeft'>
                                            III. Add to the theme

                                        </div>
                                        <div className='colRight'>
                                            <FontAwesomeIcon icon={openThree ? faChevronDown : faChevronRight} />

                                        </div>
                                        <div className='orichi-cb'>
                                        </div>
                                    </div>
                                </>
                                <Collapsible
                                    open={openThree}
                                    id="basic-collapsible-3"
                                    transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
                                    expandOnPrint
                                >
                                    <div className='bound-section'>
                                        <div className='video-frame'>
                                            <div className="wImage">
                                                <a href="#" title="" className="image cover">
                                                    <iframe src="https://www.youtube.com/embed/ReMT7eCJvCc" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen width='100%' height='100%'></iframe>
                                                </a>
                                            </div>
                                        </div>
                                    </div>


                                </Collapsible>
                            </Card>

                        </div>
                    </>
                    : <Loading />
            }

            {
                settingState.IsOpenSaveResult ? <Toast content={settingState.MessageSaveResult} duration={4000} onDismiss={() => {
                    dispatch(setSetting({
                        ...settingState,
                        IsOpenSaveResult: null
                    }))
                }} /> : null
            }


        </>

    )
}

export default Setting
