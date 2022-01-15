import { Card, Heading, Badge, ButtonGroup, Button, Modal, Toast, TextContainer } from '@shopify/polaris';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setListCampaign } from '../../state/modules/campaign/actions';
import { setIsCreatingCampaign } from '../../state/modules/app/actions';
import NoCampaign from './NoCampaign';
import config from '../../config/config';
import { editCampaign } from '../../state/modules/campaign/operations';

const ListCampaign = (props) => {
    const [IsOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [Campaign, setCampaign] = useState(null); 
    const [Alert, setAlert] = useState(null);
    const dispatch = useDispatch();
    const campaignState = useSelector((state) => state.campaign.ListCampaign);
    const appState = useSelector((state) => state.app);
    const onClickDeleteCampaign = (campaign) =>{
        setCampaign(campaign);
        setIsOpenDeleteModal(true);
    }

    const handleDeleteCampaign = () =>{
        if (campaignState.campaigns != null && campaignState.campaigns.length > 0 && Campaign != null && Campaign.ID > 0) {
            axios.post(config.rootLink + '/FrontEnd/DeleteCampaign', { id: Campaign.ID, shop: config.shop })
                .then(function (response) {
                    if (response.data.IsSuccess) {
                        dispatch(setListCampaign({
                            ...campaignState,
                            campaigns: []
                        }));
                        props.handleResetTab();
                        setAlert(<Toast content={'The campaign: ' + Campaign.Title + ' deleted successfully'} duration={1000} />);
                    }
                    else {
                        setAlert(null);
                    }
                    setIsOpenDeleteModal(false);

                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
        }
    }
    return (
        (campaignState.campaigns == null || campaignState.campaigns.length == 0) ? <NoCampaign></NoCampaign> :
            <div className="campaign-list">
                {
                    campaignState.campaigns.map(p => {
                        return <>
                            <Card>
                                <Card.Section>
                                    <div className="campaign-item">
                                        <div className="campaign-item-content">
                                            <Heading>#{p.ID} | {p.Title}</Heading>
                                            <p>{p.StartTimeStr} - {p.EndTimeStr}</p>
                                            <p>Total products: <b>{p.TotalProduct}</b> products</p>
                                            {p.Status ? <Badge status="success">Active</Badge> : <Badge status="critical">Deactive</Badge>}
                                        </div>
                                        <div className="campaign-item-control">
                                            <ButtonGroup segmented>
                                                <Button onClick={() => {dispatch(editCampaign(p)); dispatch(setIsCreatingCampaign(true))}} >Edit</Button>
                                                <Button destructive onClick={() => {onClickDeleteCampaign(p)}}>Delete</Button>
                                            </ButtonGroup>
                                        </div>

                                    </div>

                                </Card.Section>
                            </Card>
                        </>

                    })
                }
                 <Modal
                    open={IsOpenDeleteModal}
                    onClose={() => { setIsOpenDeleteModal(false) }}
                    title="Delete Campaign"
                    primaryAction={{
                        content: 'Ok',
                        onAction: handleDeleteCampaign,
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
                            <p>
                                Do you want to delete "{Campaign == null ? '' : Campaign.Title}" pixel?
                            </p>
                        </TextContainer>
                    </Modal.Section>
                </Modal>
                {Alert}
            </div>
            
    )
}

export default ListCampaign;