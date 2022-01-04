import React from 'react';
import { Card, TextContainer, Layout, SkeletonBodyText, SkeletonDisplayText, SkeletonPage } from '@shopify/polaris';

export default class LoadingSmall extends React.Component {
    render() {
        return (
            <SkeletonPage>
                <Layout>
                    <Layout.Section>
                        <Card sectioned>
                            <SkeletonBodyText />
                        </Card>
                    </Layout.Section>
                </Layout>
            </SkeletonPage>
        );
    }
}
