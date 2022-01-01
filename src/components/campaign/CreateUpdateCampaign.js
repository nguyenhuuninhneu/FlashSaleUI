import { Provider, ResourcePicker } from '@shopify/app-bridge-react';
import { Button, ButtonGroup, Card, ContextualSaveBar, Heading, IndexTable, TextField, Toast, useIndexResourceState } from '@shopify/polaris';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCreateUpdateCampaign } from '../../state/modules/campaign/actions';
import config from '../../config/config';
import { saveCampaign } from '../../state/modules/campaign/operations';
import moreAppConfig from '../../config/moreAppConfig';

const CreateUpdateCampaign = () => {
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
            TextSearchProduct: null
        }))
    }, []);

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
                }
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
            onAction: () => console.log('Todo: implement bulk edit'),
        },
        {
            content: 'Edit Discount',
            onAction: () => console.log('Todo: implement bulk edit'),
        },
        {
            content: 'Delete',
            onAction: () => console.log('Todo: implement bulk edit'),
        },
    ];

    const rowMarkup = campaignDetails
        .map(
            ({ id, ProductTitle, ProductPrice, Percentage, PriceDiscount, Inventory }, index) => (
                <IndexTable.Row
                    id={id}
                    key={id}
                    selected={selectedResources.includes(id)}
                    position={index}
                >
                    <IndexTable.Cell>{ProductTitle}</IndexTable.Cell>
                    <IndexTable.Cell>{ProductPrice}</IndexTable.Cell>
                    <IndexTable.Cell>
                        <TextField
                            value={Percentage}
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
                                }))
                            }}
                            type="text"
                        />
                    </IndexTable.Cell>
                    <IndexTable.Cell>{PriceDiscount}</IndexTable.Cell>
                    <IndexTable.Cell>
                        <TextField
                            value={Inventory}
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
                                }))
                            }}
                            type="text"
                        />
                    </IndexTable.Cell>
                </IndexTable.Row>
            ),
        );
    debugger;
    return (

        <div className="campaign-form">
            {campaignState.IsOpenSaveToolbar ? <ContextualSaveBar
                message="Unsaved changes"
                saveAction={{
                    content: "Save",
                    onAction: () => { dispatch(saveCampaign()) },
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
        </div>
    )
}

export default CreateUpdateCampaign;