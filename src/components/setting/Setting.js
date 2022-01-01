import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSetting } from '../../state/modules/setting/actions';
import { Card, Select, Heading, DataTable, Page, TextField, Button, TextStyle, Modal, Toast, TextContainer, Collapsible, Link } from '@shopify/polaris';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronDown, faClone } from '@fortawesome/free-solid-svg-icons'
// import { useDispatch, useSelector } from 'react-redux';
import config from '../../config/config';



function Setting() {
    debugger
    const dispatch = useDispatch();
    const settingState = useSelector((state) => state.setting);
    const setting = settingState.Setting;

    useEffect(() => {
        dispatch(setSetting({
            ...setting,
            Active: true,
            IsMonthly: null,
            ListCreateSectionInTheme: null,
            PageCreatedDate: null,
            PageTitle: null,
            PageUrl: null,
            PlanNumber: 2,
            TimeZone: null,
        }))
    }, []);
    const [selectedTimeZone, setSelectedTimeZone] = useState('');
    const handleSetSelectedTimeZone = useCallback((value) => setSelectedTimeZone(value), []);
    const options = [
        { label: 'Select your timezone', value: '' },
        { label: 'Yesterday', value: 'yesterday' },
        { label: 'Last 7 days', value: 'lastWeek' },
    ];

    const [selectedSection, setSelectedSection] = useState('');
    const handleSetSelectedSection = useCallback((value) => setSelectedSection(value), []);
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
    const removeTheme = (index) => {
        const exsit = listTheme.indexOf(index);
        if (index > -1) {
            listTheme.splice(index, 1);
        }
    }
    const [valuePageTitle, setValuePageTitle] = useState('');

    const handlePageTitle = useCallback((newValue) => setValuePageTitle(newValue), []);

    const rows = [];
    var listTheme = JSON.parse(setting.ListCreateSectionInTheme);
    listTheme.forEach((item, index) => {
        var newItem = [item.Theme, item.CreatedAt, <><div className='remove-code'>
            <Link onClick={() => { removeTheme(index) }}> Remove Code</Link>
        </div></>];
        rows.push(newItem);
    });
    return (
        <>
            <div className='setting'>
                <Card>
                    <Card.Section>
                        <div className='colLeft'>
                            <p className='ptb8'>
                                The app is <TextStyle variation="strong">{setting.Active ? 'Disabled' : 'Enabled'}</TextStyle>
                            </p>
                        </div>
                        <div className='colRight'>
                            {
                                setting.Active ? <Button onClick={() => {
                                    dispatch(setSetting({
                                        ...setting,
                                        Active: false
                                    }))
                                }}>Disable App</Button> : <Button primary onClick={() => {
                                    dispatch(setSetting({
                                        ...setting,
                                        Active: 1
                                    }))
                                }}>Enable App</Button>
                            }


                        </div>
                        <div className='orichi-cb'>
                        </div>
                        <div className='w66pt mt-20'>
                            <Select
                                label="Timezone"
                                options={options}
                                onChange={(e) => {
                                    dispatch(setSetting({
                                        ...setting,
                                        TimeZone: e
                                    }))
                                }}
                                value={setting.TimeZone}
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
                                />
                            </div>
                            <div className='colLeft ml-5'>
                                <Button primary onClick={() => {
                                    addToListTheme()
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
                            <div className='w66pt'>
                                <TextField
                                    label="Page Title"
                                    value={setting.PageTitle}
                                    onChange={(e) => {
                                        dispatch(setSetting({
                                            ...setting,
                                            PageTitle: e
                                        }))
                                    }}
                                    autoComplete="off"
                                    placeholder='Page Title'
                                />
                                <div className='mt-20'></div>
                                <Button primary onClick={()=>{
                                     dispatch(setSetting({
                                        ...setting,
                                        PageCreatedDate: Date.now()
                                    }))
                                }} >Create</Button>
                            </div>
                            <div className='mb-20'>
                            </div>
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
                                                            dispatch(setSetting({
                                                                ...setting,
                                                                PageUrl: e
                                                            }))
                                                        }}
                                                        autoComplete="off"
                                                    />
                                                </div>
                                                <div className='dib ml-10 copy-board'>
                                                    <Link onClick={() => { navigator.clipboard.writeText(setting.PageUrl) }}><FontAwesomeIcon icon={faClone} /></Link>
                                                </div>
                                            </div>
                                            <p>
                                                Created at: {setting.PageCreatedDate}
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
                    </Collapsible>
                </Card>
            </div>

        </>

    )
}

export default Setting
