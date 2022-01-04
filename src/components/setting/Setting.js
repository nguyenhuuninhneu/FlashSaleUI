import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSetting, setListSectionTheme } from '../../state/modules/setting/actions';
import { Card, Select, Heading, DataTable, Page, TextField, Button, TextStyle, Modal, Toast, TextContainer, Collapsible, Link, ContextualSaveBar } from '@shopify/polaris';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronDown, faClone } from '@fortawesome/free-solid-svg-icons'
import { saveSetting } from '../../state/modules/setting/operations';
import { getThemes } from '../../state/modules/setting/operations';
import { createSection } from '../../state/modules/setting/operations';
import { removeSection } from '../../state/modules/setting/operations';
import { createFlashSalePage } from '../../state/modules/setting/operations';
import moreAppConfig from '../../config/moreAppConfig';
import timezonesconfig from '../../config/timezone';



function Setting() {
    debugger
    const dispatch = useDispatch();
    const settingState = useSelector((state) => state.setting.SettingInfo);
    const setting = settingState.setting;
    function convertDate(date) {
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
    if (setting != null && setting.PageCreatedDate !== null && setting.PageCreatedDateStr !== null) {
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
            ListThemes: null,
            IsShowLoadingCreateSection: false,
            IsShowLoadingCreateFSPage: false,
            setting: {
                ...setting,
                PageCreatedDateStr: '',
            }
        }))
    }, []);
    const [timezones, setSelectedTimeZones] = useState(timezonesconfig);
    debugger;
    let tz1 = timezonesconfig.find(p => p.value == 'Default timezone');
    let tz = setting.TimeZone !== null && setting.TimeZone !== undefined && setting.TimeZone !== '' && setting.TimeZoneStr !== null && setting.TimeZoneStr !== undefined && setting.TimeZoneStr !== '' ? timezonesconfig.find(p => p.time == setting.TimeZone && p.value == setting.TimeZoneStr) : tz1;
    const [selectedTimeZone, setSelectedTimeZone] = useState(setting.TimeZone === null ? 'Default timezone' : tz.value);
    const handleSetSelectedTimeZone = useCallback((value) => {
        setSelectedTimeZone(value)
        dispatch(setSetting({
            ...settingState,
            IsOpenSaveToolbar: true
        }))
    }, []);

    const [selectedSection, setSelectedSection] = useState('');
    const handleSetSelectedSection = useCallback((value) => {
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

    }, []);
    const optionsSection = [
        { label: 'Select your section', value: '' },
        { label: 'Debut 1', value: 'debut1' },
        { label: 'Debut 2', value: 'debut2' },
        { label: 'Debut 3', value: 'debut3' }
    ];
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
    //add theme
    const [rows, setRowForTableTheme] = useState([]);
    // if (setting.ListCreateSectionInTheme !== null && setting.ListCreateSectionInTheme != undefined) {
    //     var parseListSection = JSON.parse(setting.ListCreateSectionInTheme);
    //     var arrSection = [];
    //     if (parseListSection != null) {
    //         parseListSection.forEach((item, index) => {
    //             var newItem = [item[0], convertDate(item[1]), item[1], <><div className='remove-code'>
    //                 <Link onClick={() => { removeTheme(item) }}> Remove Code</Link>
    //             </div></>];
    //             arrSection.push(newItem);
    //         })
    //     }
    //     setRowForTableTheme(oldArray => [...oldArray, arrSection]);
    // }
    const AddTheme = (newItem) => {
        if (newItem !== null && newItem !== undefined && newItem[0] !== '') {
            const existRow = ChekExistTheme(newItem[0]);
            if (!existRow) {
                dispatch(setSetting({
                    ...settingState,
                    // IsOpenSaveToolbar: true
                }))
                setRowForTableTheme(oldArray => [...oldArray, newItem]);
            } else {
                dispatch(setSetting({
                    ...settingState,
                    TitleValidationTheme: moreAppConfig.SettingValidationExistTheme
                }))
            }
        } else {
            dispatch(setSetting({
                ...settingState,
                TitleValidationTheme: moreAppConfig.SettingValidationSelectTheme
            }))
        }

    }
    const ChekExistTheme = (name) => {
        var exist = false;
        if (rows.length > 0) {
            for (let index = 0; index < rows.length; index++) {
                const element = rows[index];
                if (element[0] === name) {
                    exist = true;
                    break;
                }
            }
        }
        return exist;
    }
    const removeTheme = (item) => {
        const newRows = rows.filter((theme) => theme !== item);
        setRowForTableTheme(newRows);
        dispatch(setSetting({
            ...settingState,
            IsOpenSaveToolbar: true
        }))
    }

    return (
        <>
            {settingState.IsOpenSaveToolbar ? <ContextualSaveBar
                message="Unsaved changes"
                saveAction={{
                    content: "Save",
                    onAction: () => {
                        if (setting.PageCreatedDate != null) {
                            if (setting.PageCreatedDate !== null && setting.PageCreatedDate.toString().includes('/Date')) {
                                var numberDate = Number(setting.PageCreatedDate.toString().replace('/Date(', '').replace(')/', ''));
                                setting.PageCreatedDate = new Date(numberDate);
                            } else {
                                setting.PageCreatedDate = new Date(setting.PageCreatedDate);
                            }
                        }

                        let tz = timezones.find(p => p.value === selectedTimeZone);
                        dispatch(setSetting({
                            ...settingState,
                            setting: {
                                ...setting,
                                TimeZone: tz == undefined ? null : tz.time,
                                TimeZoneStr: tz == undefined ? null : tz.value,
                            }
                        }))
                        //Theme
                        debugger;
                        // if (rows.length > 0) {
                        //     var listSection = [];
                        //     rows.forEach((item, index) => {
                        //         var newItem = [item[0], item[2]];
                        //         listSection.push(newItem);
                        //     });
                        //     dispatch(setSetting({
                        //         ...settingState,
                        //         setting: {
                        //             ...setting,
                        //             ListCreateSectionInTheme: listSection.toString()
                        //         }
                        //     }))
                        // }

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
            <div className='setting'>
                <Card>
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
                                onChange={handleSetSelectedTimeZone}
                                value={selectedTimeZone}
                            />
                        </div>

                    </Card.Section>
                </Card>
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
                                    onChange={handleSetSelectedSection}
                                    value={selectedSection}
                                    error={settingState.TitleValidationTheme}
                                />
                            </div>
                            <div className='colLeft ml-5'>
                                <Button primary onClick={() => {
                                    var newItem = [selectedSection, convertDate(Date.now()), Date.now(), <><div className='remove-code'>
                                        <Link onClick={() => { removeTheme(newItem) }}> Remove Code</Link>
                                    </div></>];
                                    dispatch(createFlashSalePage());
                                    // AddTheme(newItem);
                                }}>Create</Button>

                            </div>
                            <div className='cb'>
                            </div>
                            <div className='list-section mt-40'>
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
                                                rows={rows}
                                            />
                                        </Card>
                                    </Page>
                                </>

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
                                setting.PageCreatedDate === null || setting.PageCreatedDate === undefined ?
                                    <>
                                        <div className='w66pt'>
                                            <TextField
                                                label="Page Title"
                                                value={setting.PageTitle}
                                                onChange={(e) => {
                                                    dispatch(setSetting({
                                                        ...settingState,
                                                        setting: {
                                                            ...setting,
                                                            PageTitle: e
                                                        },
                                                    }))
                                                }}
                                                autoComplete="off"
                                                placeholder='Page Title'
                                            />
                                            <div className='mt-20'></div>
                                            <Button primary onClick={() => {
                                                dispatch(setSetting({
                                                    ...settingState,
                                                    setting: {
                                                        ...setting,
                                                        PageCreatedDate: Date.now(),
                                                        PageCreatedDateStr: convertDate(Date.now())
                                                    },
                                                    IsOpenSaveToolbar: true
                                                }))
                                            }} >Create</Button>
                                        </div>
                                        <div className='mb-20'>
                                        </div>
                                    </> : ''
                            }


                            {
                                setting.PageCreatedDate !== null && setting.PageCreatedDate !== undefined ?
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
                                                                    IsOpenSaveToolbar: true
                                                                }))
                                                            } else {
                                                                dispatch(setSetting({
                                                                    ...settingState,
                                                                    TitleValidationPageTitle: moreAppConfig.SettingValidationPageTitle
                                                                }))
                                                            }

                                                        }}
                                                        error={settingState.TitleValidationPageTitle}
                                                        autoComplete="off"
                                                    />
                                                </div>
                                                <div className='dib ml-10 copy-board'>
                                                    <Link onClick={() => {
                                                        navigator.clipboard.writeText(setting.PageUrl);
                                                        <Toast content={'copied clipboard'} duration={4000} onDismiss={null} />
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
                            {/* <div className='created-page-title'>
                                <Heading>Flash Sale Page Title</Heading>

                            </div> */}
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
                                <div class="wImage">
                                    <a href="#" title="" class="image cover">
                                        <iframe src="https://www.youtube.com/embed/ReMT7eCJvCc" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen width='100%' height='100%'></iframe>
                                    </a>
                                </div>
                            </div>
                        </div>


                    </Collapsible>
                </Card>
            </div>
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
