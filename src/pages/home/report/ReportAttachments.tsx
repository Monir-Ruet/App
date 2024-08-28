import React, {useCallback} from 'react';
import {useOnyx} from 'react-native-onyx';
import AttachmentModal from '@components/AttachmentModal';
import type {Attachment} from '@components/Attachments/types';
import ComposerFocusManager from '@libs/ComposerFocusManager';
import Navigation from '@libs/Navigation/Navigation';
import type {PlatformStackScreenProps} from '@libs/Navigation/PlatformStackNavigation/types';
import type {AuthScreensParamList} from '@libs/Navigation/types';
import ONYXKEYS from '@src/ONYXKEYS';
import ROUTES from '@src/ROUTES';
import type SCREENS from '@src/SCREENS';

type ReportAttachmentsProps = PlatformStackScreenProps<AuthScreensParamList, typeof SCREENS.ATTACHMENTS>;

function ReportAttachments({route}: ReportAttachmentsProps) {
    const reportID = route.params.reportID;
    const type = route.params.type;
    const accountID = route.params.accountID;
    const [report] = useOnyx(`${ONYXKEYS.COLLECTION.REPORT}${reportID || -1}`);
    const [isLoadingApp] = useOnyx(ONYXKEYS.IS_LOADING_APP);

    // In native the imported images sources are of type number. Ref: https://reactnative.dev/docs/image#imagesource
    const source = Number(route.params.source) || route.params.source;

    const onCarouselAttachmentChange = useCallback(
        (attachment: Attachment) => {
            const routeToNavigate = ROUTES.ATTACHMENTS.getRoute(reportID, type, String(attachment.source), Number(accountID));
            Navigation.navigate(routeToNavigate);
        },
        [reportID, accountID, type],
    );

    return (
        <AttachmentModal
            accountID={Number(accountID)}
            type={type}
            allowDownload
            defaultOpen
            report={report}
            source={source}
            onModalClose={() => {
                Navigation.dismissModal();
                // This enables Composer refocus when the attachments modal is closed by the browser navigation
                ComposerFocusManager.setReadyToFocus();
            }}
            onCarouselAttachmentChange={onCarouselAttachmentChange}
            shouldShowNotFoundPage={!isLoadingApp && !report?.reportID}
        />
    );
}

ReportAttachments.displayName = 'ReportAttachments';

export default ReportAttachments;
