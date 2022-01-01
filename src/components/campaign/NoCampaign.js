import { Button, Card } from '@shopify/polaris';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NoCampaignImage from '../../assets/images/NoCampaign.png';
import { clickBtnNoCampaign, setIsNoCampaign } from '../../state/modules/app/actions';
import { createCampaign } from '../../state/modules/campaign/operations';


const NoCampaign = () => {
    const dispatch = useDispatch();
    const campaignState = useSelector((state) => state.campaign);

    return (
        <Card>
            <Card.Section>
                <div className={'no-campaign'}>
                    <img src={NoCampaignImage} />
                <Button primary onClick={() => {dispatch(clickBtnNoCampaign()); dispatch(createCampaign())}}>Create a new deal to get started</Button>
                </div>
            </Card.Section>

        </Card>
    )
}

export default NoCampaign;