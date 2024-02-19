import type {GestureResponderEvent, StyleProp, ViewStyle} from 'react-native';
import type {OnyxCollection, OnyxEntry} from 'react-native-onyx';
import type {ContextMenuAnchor} from '@pages/home/report/ContextMenu/ReportActionContextMenu';
import type * as OnyxTypes from '@src/types/onyx';

type MoneyRequestPreviewOnyxProps = {
    /** All of the personal details for everyone */
    personalDetails: OnyxEntry<OnyxTypes.PersonalDetailsList>;

    /** Chat report associated with iouReport */
    chatReport: OnyxEntry<OnyxTypes.Report>;

    /** IOU report data object */
    iouReport: OnyxEntry<OnyxTypes.Report>;

    /** Session info for the currently logged in user. */
    session: OnyxEntry<OnyxTypes.Session>;

    /** The transaction attached to the action.message.iouTransactionID */
    transaction: OnyxEntry<OnyxTypes.Transaction>;

    /** The transaction violations attached to the action.message.iouTransactionID */
    transactionViolations: OnyxCollection<OnyxTypes.TransactionViolation[]>;

    /** Information about the user accepting the terms for payments */
    walletTerms: OnyxEntry<OnyxTypes.WalletTerms>;
};

type MoneyRequestPreviewProps = MoneyRequestPreviewOnyxProps & {
    /** The active IOUReport, used for Onyx subscription */
    // The iouReportID is used inside withOnyx HOC
    // eslint-disable-next-line react/no-unused-prop-types
    iouReportID: string;

    /** The associated chatReport */
    chatReportID: string;

    /** The ID of the current report */
    reportID: string;

    /** Callback for the preview pressed */
    onPreviewPressed: (event?: GestureResponderEvent | KeyboardEvent) => void;

    /** All the data of the action, used for showing context menu */
    action: OnyxTypes.ReportAction;

    /** Popover context menu anchor, used for showing context menu */
    contextMenuAnchor?: ContextMenuAnchor;

    /** Callback for updating context menu active state, used for showing context menu */
    checkIfContextMenuActive?: () => void;

    /** Extra styles to pass to View wrapper */
    containerStyles?: StyleProp<ViewStyle>;

    /** True if this is this IOU is a split instead of a 1:1 request */
    isBillSplit: boolean;

    /** True if the IOU Preview card is hovered */
    isHovered?: boolean;

    /** Whether or not an IOU report contains money requests in a different currency
     * that are either created or cancelled offline, and thus haven't been converted to the report's currency yet
     */
    shouldShowPendingConversionMessage?: boolean;

    /** Whether a message is a whisper */
    isWhisper?: boolean;

    /** Optimistic status of the report used in partial payment/approval flow when there are some money requests on hold */
    optimisticFlowStatus?: string;
};

export type {MoneyRequestPreviewProps, MoneyRequestPreviewOnyxProps};
