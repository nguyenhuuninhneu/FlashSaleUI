
import React, {useCallback} from 'react';
import config from '../../config/config';
import { useUploady, useItemFinishListener, useBatchFinalizeListener, useItemStartListener } from "@rpldy/uploady";

const UploadyCustom = (props) => {
    const uploady = useUploady();
    useBatchFinalizeListener((batch) => {
        console.log(`batch ${batch.id} finished uploading with status: ${batch.state}`);
    });
    useItemStartListener((item) => {
        console.log(`item ${item.id} started uploading`);
    });
    useItemFinishListener((item) => {
        console.log(`item ${item.id} finished uploading, response was: `, item.uploadResponse, item.uploadStatus);
        if (item.uploadResponse.data.IsSuccess) {
            if (props.type === 'image') {
                props.handleSetUrlLogo(config.rootLink + item.uploadResponse.data.source);
            } else if (props.type === 'icon') {
                props.handleSetUrlIcon(config.rootLink + item.uploadResponse.data.source);
            }
        }
    });
    const showFileUpload = useCallback(() => {
        uploady.showFileUpload();
    });

    return (
        <div class="input-file-container">
            <label tabindex="0" class="input-file-trigger" onClick={showFileUpload}>...</label>
        </div>
    )
}

export default UploadyCustom;