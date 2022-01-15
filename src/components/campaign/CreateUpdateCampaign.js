import { Provider, ResourcePicker } from '@shopify/app-bridge-react';
import { Button, ButtonGroup, Card, ContextualSaveBar, Heading, IndexTable, TextField, Toast, useIndexResourceState, Modal, TextContainer } from '@shopify/polaris';
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCreateUpdateCampaign } from '../../state/modules/campaign/actions';
import config from '../../config/config';
import { saveCampaign } from '../../state/modules/campaign/operations';
import moreAppConfig from '../../config/moreAppConfig';

const CreateUpdateCampaign = (props) => {
    const dispatch = useDispatch();
    const [IsOpenProductPicker, setIsOpenProductPicker] = useState(false);
    const campaignState = useSelector((state) => state.campaign.CreateUpdateCampaign);
    const campaign = campaignState.campaign;
    const campaignDetails = campaign.ListDetails.filter(p => campaignState.TextSearchProduct == null || campaignState.TextSearchProduct == '' || p.ProductTitle.indexOf(campaignState.TextSearchProduct) >= 0)
        .map(obj => ({ ...obj, id: obj.ID }));
    const configResourcePicker = { apiKey: config.apiKey, shopOrigin: config.shop };

    useEffect(() => {
        dispatch(setCreateUpdateCampaign({
            ...campaignState,
            InventoryBulkUpdate: null,
            DiscountBulkUpdate: null,
            IsOpenSaveToolbar: false,
            IsSaveLoading: false,
            IsOpenSaveResult: false,
            MessageSaveResult: null,
            TitleValidation: null,
            StartTimeValidation: null,
            EndTimeValidation: null,
            ProductValidation: null,
            TextSearchProduct: null,
            InventoryValidation: null,
            DiscountValidation: null,

        }))
    }, []);
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
    }

    const makeMoney = (x, expect) => {
        const result = numberWithCommas(x);
        const pass = result === expect;
        console.log(`${pass ? "✓" : "ERROR ====>"} ${x} => ${result}`);
        return result;
    }
    const [updateDiscount, setUpdateDiscount] = useState("0");
    const handleChangeTextDiscount = (e) => {
        setUpdateDiscount(e);
        if (e == null || e == undefined || e == '') {
            dispatch(setCreateUpdateCampaign({
                ...campaignState,
                DiscountValidation: moreAppConfig.DiscountValidationText
            }))
        }
        else {
            dispatch(setCreateUpdateCampaign({
                ...campaignState,
                DiscountValidation: ''
            }))
        }
    };
    const [updateInventory, setUpdateInventory] = useState("0");
    const handleChangeTextInventory = (e) => {
        setUpdateInventory(e);
        if (e == null || e == undefined || e == '') {
            dispatch(setCreateUpdateCampaign({
                ...campaignState,
                InventoryValidation: moreAppConfig.InventoryValidationText
            }))
        }
        else {
            dispatch(setCreateUpdateCampaign({
                ...campaignState,
                InventoryValidation: ''
            }))
        }
    }


    const [IsOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [IsOpenUpdateDiscountModal, setIsOpenUpdateDiscountModal] = useState(false);
    const [IsOpenUpdateInventoryModal, setIsOpenUpdateInventoryModal] = useState(false);
    const onClickDeleteProduct = () => {
        setIsOpenDeleteModal(true);
    }

    const handleDeleteProduct = () => {


        var arrPro = campaign.ListDetails.filter(p => selectedResources.indexOf(p.ID) == -1);
        dispatch(setCreateUpdateCampaign(
            {
                ...campaignState,
                campaign:
                {
                    ...campaign,
                    ListDetails: arrPro
                },
                IsOpenSaveToolbar: true
            }));
        setIsOpenDeleteModal(false);
    }
    const onClickUpdateDiscount = () => {
        setUpdateDiscount('0');
        setIsOpenUpdateDiscountModal(true);
    }

    const handleUpdateDiscount = () => {
        if (updateDiscount == null || updateDiscount == undefined || updateDiscount == '') {
            dispatch(setCreateUpdateCampaign({
                ...campaignState,
                DiscountValidation: moreAppConfig.DiscountValidationText
            }))
            return false;
        }

        dispatch(setCreateUpdateCampaign({
            ...campaignState,
            campaign: {
                ...campaign,
                ListDetails: campaign.ListDetails.map((p, i) => (selectedResources.indexOf(p.ID) >= 0 ? {
                    ...p,
                    Percentage: updateDiscount
                } : p))
            },
            IsOpenSaveToolbar: true
        }))
        setIsOpenUpdateDiscountModal(false);
    }
    const onClickUpdateInventory = () => {
        setUpdateInventory('0');
        setIsOpenUpdateInventoryModal(true);
    }

    const handleUpdateInventory = () => {
        if (updateInventory == null || updateInventory == undefined || updateInventory == '') {
            dispatch(setCreateUpdateCampaign({
                ...campaignState,
                InventoryValidation: moreAppConfig.InventoryValidationText
            }))
            return false;
        }


        dispatch(setCreateUpdateCampaign({
            ...campaignState,
            campaign: {
                ...campaign,
                ListDetails: campaign.ListDetails.map((p, i) => (selectedResources.indexOf(p.ID) >= 0 ? {
                    ...p,
                    Inventory: updateInventory
                } : p))
            },
            IsOpenSaveToolbar: true

        }))
        setIsOpenUpdateInventoryModal(false);
    }
    const handleCancelProduct = () => {
        setIsOpenProductPicker(false);
    }

    const handleSelectProduct = (selectPayload) => {
        var listSelectedProduct = selectPayload.selection.map((pro) => {
            return { id: pro.id.replace('gid://shopify/Product/', '') };
        });
        var arrPro = campaign.ListDetails.filter(p => listSelectedProduct.indexOf(p.ProductID) >= 0);
        var arrAddedPro = selectPayload.selection.map((pro) => {
            return {
                ProductID: pro.id.replace('gid://shopify/Product/', ''),
                ProductTitle: pro.title,
                ProductPrice: pro.price,
                Percentage: 0,
                Inventory: 0
            };
        });
        setCreateUpdateCampaign(
            {
                ...campaignState,
                campaign:
                {
                    ...campaign,
                    selectedProductID: selectPayload.selection.map((pro) => {
                        return { id: pro.id };//.replace('gid://shopify/Product/','')
                    }),
                    selectedProductName: selectPayload.selection.map((pro) => {
                        return pro.title;
                    }),
                    ListDetails: [...arrPro, ...arrAddedPro]
                },
                IsOpenSaveToolbar: true
            });
        setIsOpenProductPicker(false);
    }

    const resourceName = {
        singular: 'campaign',
        plural: 'campaigns',
    };

    const { selectedResources, allResourcesSelected, handleSelectionChange } =
        useIndexResourceState(campaignDetails);

    const bulkUpdateInventory = [
        {
            content: 'Edit Inventory',
            onAction: () => {
                onClickUpdateInventory()

            },
        },
        {
            content: 'Edit Discount',
            onAction: () => {
                onClickUpdateDiscount()
            },
        },
        {
            content: 'Delete',
            onAction: () => {

                onClickDeleteProduct();
            },
        },
    ];

    const rowMarkup = campaignDetails
        .map(
            ({ id, ProductTitle, ProductPrice, Percentage, PriceDiscount, Inventory }, index) => (
                <IndexTable.Row
                    id={id}
                    key={id}
                    selected={selectedResources.includes(ProductPrice)}
                    position={index}
                >
                    <IndexTable.Cell>{ProductTitle}</IndexTable.Cell>
                    <IndexTable.Cell>{makeMoney(ProductPrice, '0')}</IndexTable.Cell>
                    <IndexTable.Cell>
                        <div class="max-index">
                            <TextField
                                value={Percentage.toString()}
                                onChange={(e) => {
                                    dispatch(setCreateUpdateCampaign({
                                        ...campaignState,
                                        campaign: {
                                            ...campaign,
                                            ListDetails: campaign.ListDetails.map((p, i) => (i == index ? {
                                                ...p,
                                                Percentage: e
                                            } : p))
                                        },
                                        IsOpenSaveToolbar: true
                                    }))
                                }}
                                type="text"
                            />
                        </div>

                    </IndexTable.Cell>
                    <IndexTable.Cell>{makeMoney(ProductPrice - (ProductPrice * Percentage) / 100)}</IndexTable.Cell>
                    <IndexTable.Cell>
                    <div class="max-index">
                    <TextField
                            value={Inventory.toString()}
                            onChange={(e) => {
                                dispatch(setCreateUpdateCampaign({
                                    ...campaignState,
                                    campaign: {
                                        ...campaign,
                                        ListDetails: campaign.ListDetails.map((p, i) => (i == index ? {
                                            ...p,
                                            Inventory: e
                                        } : p))
                                    },
                                    IsOpenSaveToolbar: true
                                }))
                            }}
                            type="text"
                        />
                    </div>
                        
                    </IndexTable.Cell>
                </IndexTable.Row>
            ),
        );

    return (

        <div className="campaign-form">
            {campaignState.IsOpenSaveToolbar ? <ContextualSaveBar
                message="Unsaved changes"
                saveAction={{
                    content: "Save",
                    onAction: () => {
                        //valid number row;
                        var isSubmit = true;

                        if (campaign.Title.toString() == '' || campaign.Title.toString() === null) {
                            dispatch(setCreateUpdateCampaign({
                                ...campaignState,
                                TitleValidation: moreAppConfig.TilteValidationText
                            }))
                            return false;
                        }
                        if (campaign.StartTime.toString() == '' || campaign.StartTime.toString() === null || campaign.StartTimeEdit.toString() == '' || campaign.StartTimeEdit.toString() === null) {
                            dispatch(setCreateUpdateCampaign({
                                ...campaignState,
                                StartTimeValidation: moreAppConfig.StartTimeValidationText
                            }))
                            return false;
                        }

                        if (campaign.EndTime.toString() == '' || campaign.EndTime.toString() === null || campaign.EndTimeEdit.toString() == '' || campaign.EndTimeEdit.toString() === null) {
                            dispatch(setCreateUpdateCampaign({
                                ...campaignState,
                                EndTimeValidation: moreAppConfig.EndTimeValidationText
                            }))
                            return false;
                        }
                        if ((campaign.StartTime.toString() != '' && campaign.EndTime.toString() != '')) {
                            var startTime = Date.parse(campaign.StartTime);
                            var endTime = Date.parse(campaign.EndTime);
                            if (endTime <= startTime) {
                                dispatch(setCreateUpdateCampaign({
                                    ...campaignState,
                                    EndTimeValidation: moreAppConfig.EndTimeGreateThanStartTimeValidationText
                                }))
                                return false;
                            }
                        }
                        if ((campaign.StartTimeEdit.toString() != '' && campaign.EndTimeEdit.toString() != '')) {
                            var startTime = Date.parse(campaign.StartTimeEdit);
                            var endTime = Date.parse(campaign.EndTimeEdit);
                            if (endTime <= startTime) {
                                dispatch(setCreateUpdateCampaign({
                                    ...campaignState,
                                    EndTimeValidation: moreAppConfig.EndTimeGreateThanStartTimeValidationText
                                }))
                                return false;
                            }
                        }
                        dispatch(saveCampaign())
                    },
                    loading: campaignState.IsSaveLoading,
                }}
                discardAction={{
                    content: "Discard",
                    onAction: () => dispatch(setCreateUpdateCampaign({
                        ...campaignState,
                        IsOpenSaveToolbar: false
                    })),
                }}
            /> : <></>}
            <Card>
                <Card.Section>
                    <div className="campaign-info">
                        <div className="campaign-control">
                            <div className="Polaris-Stack__Item Polaris-Stack__Item--fill"></div>
                            <ButtonGroup segmented>
                                <Button primary={!campaign.Status} onClick={() => {
                                    dispatch(setCreateUpdateCampaign({
                                        ...campaignState,
                                        campaign: {
                                            ...campaign,
                                            Status: false
                                        },
                                        IsOpenSaveToolbar: true
                                    }))
                                }}>Disable</Button>
                                <Button primary={campaign.Status} onClick={() => {
                                    dispatch(setCreateUpdateCampaign({
                                        ...campaignState,
                                        campaign: {
                                            ...campaign,
                                            Status: true
                                        },
                                        IsOpenSaveToolbar: true
                                    }))
                                }}>Enable</Button>
                            </ButtonGroup>
                        </div>
                        <div className="campaign-detail">
                            <TextField
                                value={campaign.Title}
                                onChange={(e) => {
                                    dispatch(setCreateUpdateCampaign({
                                        ...campaignState,
                                        campaign: {
                                            ...campaign,
                                            Title: e
                                        },
                                        IsOpenSaveToolbar: true,
                                        TitleValidation: e == '' ? moreAppConfig.TilteValidationText : null
                                    }))
                                }}
                                label={<>Campaign Title <span className={"risk-text"}>(*)</span></>}
                                type="text"
                                error={campaignState.TitleValidation}
                                maxLength={150}
                                showCharacterCount
                            />

                            <div className='campaign-time'>
                                <div className="Polaris-Labelled__LabelWrapper">
                                    <div className="Polaris-Label">
                                        <label id="PolarisTextField2Label" htmlFor="PolarisTextField2" className="Polaris-Label__Text">Campaign Duration <span className="risk-text">(*)</span>
                                        </label>
                                    </div>
                                </div>
                                <div className='campaign-time-input'>
                                    <TextField
                                        value={campaign.StartTimeEdit}
                                        type="datetime-local"
                                        error={campaignState.StartTimeValidation}
                                        onChange={(e) => {
                                            dispatch(setCreateUpdateCampaign({
                                                ...campaignState,
                                                campaign: {
                                                    ...campaign,
                                                    StartTimeEdit: e,
                                                    StartTime: e
                                                },
                                                IsOpenSaveToolbar: true,
                                                StartTimeValidation: e == '' ? moreAppConfig.StartTimeValidationText : null
                                            }))

                                        }}

                                    />
                                    <span>To</span>
                                    <TextField
                                        value={campaign.EndTimeEdit}
                                        type="datetime-local"
                                        error={campaignState.EndTimeValidation}
                                        onChange={(e) => {
                                            dispatch(setCreateUpdateCampaign({
                                                ...campaignState,
                                                campaign: {
                                                    ...campaign,
                                                    EndTimeEdit: e,
                                                    EndTime: e
                                                },
                                                IsOpenSaveToolbar: true,
                                                EndTimeValidation: e == '' ? moreAppConfig.EndTimeValidationText : null
                                            }))

                                        }}


                                    />
                                </div>

                            </div>

                        </div>
                    </div>
                </Card.Section>
            </Card>
            <Card title='Products for campaign'>
                <Card.Section>
                    <div className='campaign-products'>
                        {
                            (campaign.ListDetails == null || campaign.ListDetails.length == 0) ?
                                <div className='campaign-products-blank'>
                                    <Button primary>+ Add products to your campaign</Button>
                                    <Heading>Add the products that you want to show on your campaign</Heading>

                                </div> :
                                <div className='campaign-products-list'>
                                    <div className='campaign-product-list-control'>
                                        <div className='campaign-product-list-control-input'>
                                            <TextField
                                                placeholder={'Product Title'}
                                                value={campaignState.TextSearchProduct}
                                                onChange={(e) => {
                                                    dispatch(setCreateUpdateCampaign({
                                                        ...campaignState,
                                                        TextSearchProduct: e
                                                    }))
                                                }}
                                                type="text"
                                            />

                                        </div>
                                        <div className='campaign-product-list-control-button'>
                                            <Button primary>+ Add more product</Button>
                                        </div>

                                    </div>
                                    <div className='campaign-product-list-content'>
                                        <IndexTable
                                            resourceName={resourceName}
                                            itemCount={campaignDetails.length}
                                            selectedItemsCount={
                                                allResourcesSelected ? 'All' : selectedResources.length
                                            }
                                            onSelectionChange={handleSelectionChange}
                                            promotedBulkActions={bulkUpdateInventory}
                                            headings={[
                                                { title: 'Title ' },
                                                { title: 'Price' },
                                                { title: 'Discount' },
                                                { title: 'Sale Price' },
                                                { title: 'Quantity Sold' },
                                            ]}
                                        >
                                            {rowMarkup}
                                        </IndexTable>
                                    </div>
                                </div>
                        }
                        <Provider config={configResourcePicker}>
                            <ResourcePicker resourceType="Product" open={setIsOpenProductPicker}
                                onSelection={handleSelectProduct}
                                onCancel={handleCancelProduct}
                                showVariants={false}
                                initialSelectionIds={campaign.selectedProductID == undefined ? [] : campaign.selectedProductID} />
                        </Provider>
                    </div>

                </Card.Section>
            </Card>
            {campaignState.IsOpenSaveResult ? <Toast content={campaignState.MessageSaveResult} duration={4000} onDismiss={() => {
                dispatch(setCreateUpdateCampaign({
                    ...campaignState,
                    IsOpenSaveResult: null
                }))
            }} /> : null}
            <Modal
                open={IsOpenDeleteModal}
                onClose={() => { setIsOpenDeleteModal(false) }}
                title="Delete Product"
                primaryAction={{
                    content: 'Ok',
                    onAction: () => {

                        handleDeleteProduct();
                    },
                }}
                secondaryActions={[
                    {
                        content: 'Cancel',
                        onAction: () => { setIsOpenDeleteModal(false) },
                    },
                ]}
            >
                <Modal.Section>
                    <TextContainer>
                        <p className='valid'>
                            Do you want to delete these selected products?
                        </p>
                    </TextContainer>
                </Modal.Section>
            </Modal>
            <Modal
                open={IsOpenUpdateDiscountModal}
                onClose={() => { setIsOpenUpdateDiscountModal(false) }}
                title="Update discount"
                primaryAction={{
                    content: 'Save',
                    onAction: () => {

                        handleUpdateDiscount();
                    },
                }}
                secondaryActions={[
                    {
                        content: 'Cancel',
                        onAction: () => { setIsOpenUpdateDiscountModal(false) },
                    },
                ]}
            >
                <Modal.Section>
                    <TextContainer>
                        <p>
                            <TextField
                                value={updateDiscount}
                                onChange={(e) => {
                                    handleChangeTextDiscount(e);
                                    if (e == null || e == undefined || e == '') {
                                        dispatch(setCreateUpdateCampaign({
                                            ...campaignState,
                                            DiscountValidation: moreAppConfig.DiscountValidationText
                                        }))
                                        return false;
                                    }
                                }}
                                error={campaignState.DiscountValidation}
                                type="text"
                            />
                        </p>
                        <p className='valid'>This change will apply to all selected products</p>
                    </TextContainer>
                </Modal.Section>
            </Modal>
            <Modal
                open={IsOpenUpdateInventoryModal}
                onClose={() => { setIsOpenUpdateInventoryModal(false) }}
                title="Update inventory"
                primaryAction={{
                    content: 'Save',
                    onAction: () => {

                        handleUpdateInventory();
                    },
                }}
                secondaryActions={[
                    {
                        content: 'Cancel',
                        onAction: () => { setIsOpenUpdateInventoryModal(false) },
                    },
                ]}
            >
                <Modal.Section>
                    <TextContainer>
                        <p>
                            <TextField
                                value={updateInventory}
                                onChange={(e) => {

                                    handleChangeTextInventory(e);
                                }}
                                error={campaignState.InventoryValidation}
                                type="text"
                            />
                        </p>
                        <p className='valid'>This change will apply to all selected products</p>
                    </TextContainer>
                </Modal.Section>
            </Modal>
        </div>

    )
}

export default CreateUpdateCampaign;