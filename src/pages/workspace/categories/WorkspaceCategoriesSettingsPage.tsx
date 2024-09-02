import React, {useMemo} from 'react';
import {View} from 'react-native';
import {useOnyx} from 'react-native-onyx';
import HeaderWithBackButton from '@components/HeaderWithBackButton';
import ScreenWrapper from '@components/ScreenWrapper';
import SelectionList from '@components/SelectionList';
import CategorySelectorListItem from '@components/SelectionList/CategorySelectorListItem';
import type {ListItem} from '@components/SelectionList/types';
import Text from '@components/Text';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import * as OptionsListUtils from '@libs/OptionsListUtils';
import * as PolicyUtils from '@libs/PolicyUtils';
import AccessOrNotFoundWrapper from '@pages/workspace/AccessOrNotFoundWrapper';
import type {WithPolicyConnectionsProps} from '@pages/workspace/withPolicyConnections';
import withPolicyConnections from '@pages/workspace/withPolicyConnections';
import ToggleSettingOptionRow from '@pages/workspace/workflows/ToggleSettingsOptionRow';
import {setWorkspaceRequiresCategory} from '@userActions/Policy/Category';
import * as Policy from '@userActions/Policy/Policy';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';

type WorkspaceCategoriesSettingsPageProps = WithPolicyConnectionsProps;

function WorkspaceCategoriesSettingsPage({policy, route}: WorkspaceCategoriesSettingsPageProps) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();
    const isConnectedToAccounting = Object.keys(policy?.connections ?? {}).length > 0;
    const policyID = route.params.policyID ?? '-1';
    const [policyCategories] = useOnyx(`${ONYXKEYS.COLLECTION.POLICY_CATEGORIES}${policyID}`);
    const [currentPolicy] = useOnyx(`${ONYXKEYS.COLLECTION.POLICY}${policyID}`);
    const currentConnectionName = PolicyUtils.getCurrentConnectionName(policy);

    const toggleSubtitle = isConnectedToAccounting && currentConnectionName ? `${translate('workspace.categories.needCategoryForExportToIntegration')} ${currentConnectionName}.` : undefined;

    const updateWorkspaceRequiresCategory = (value: boolean) => {
        setWorkspaceRequiresCategory(policyID, value);
    };

    const {sections} = useMemo(() => {
        if (!(currentPolicy && currentPolicy.mccGroup)) {
            return {sections: [{data: []}]};
        }

        return {
            sections: [
                {
                    data: Object.keys(currentPolicy.mccGroup).map(
                        (mccKey) =>
                            ({
                                categoryID: currentPolicy.mccGroup?.[mccKey].category,
                                keyForList: mccKey,
                                groupID: mccKey,
                                policyID,
                                tabIndex: -1,
                            } as ListItem),
                    ),
                },
            ],
        };
    }, [currentPolicy, policyID]);

    const hasEnabledOptions = OptionsListUtils.hasEnabledOptions(policyCategories ?? {});
    return (
        <AccessOrNotFoundWrapper
            policyID={policyID}
            accessVariants={[CONST.POLICY.ACCESS_VARIANTS.ADMIN, CONST.POLICY.ACCESS_VARIANTS.PAID]}
            featureName={CONST.POLICY.MORE_FEATURES.ARE_CATEGORIES_ENABLED}
        >
            <ScreenWrapper
                includeSafeAreaPaddingBottom={false}
                style={[styles.defaultModalContainer]}
                testID={WorkspaceCategoriesSettingsPage.displayName}
            >
                <HeaderWithBackButton title={translate('common.settings')} />
                <ToggleSettingOptionRow
                    title={translate('workspace.categories.requiresCategory')}
                    subtitle={toggleSubtitle}
                    switchAccessibilityLabel={translate('workspace.categories.requiresCategory')}
                    isActive={policy?.requiresCategory ?? false}
                    onToggle={updateWorkspaceRequiresCategory}
                    pendingAction={policy?.pendingFields?.requiresCategory}
                    disabled={!policy?.areCategoriesEnabled || !hasEnabledOptions || isConnectedToAccounting}
                    wrapperStyle={[styles.pv2, styles.mh4]}
                    errors={policy?.errorFields?.requiresCategory ?? undefined}
                    onCloseError={() => Policy.clearPolicyErrorField(policy?.id ?? '-1', 'requiresCategory')}
                    shouldPlaceSubtitleBelowSwitch
                />
                <View style={[styles.containerWithSpaceBetween]}>
                    {!!currentPolicy && sections?.length > 0 && (
                        <SelectionList
                            headerContent={
                                <View style={[styles.mh4, styles.mt2]}>
                                    <Text style={[styles.headerText]}>{translate('workspace.categories.defaultSpendCategories')}</Text>
                                    <Text style={[styles.mt1, styles.lh20]}>{translate('workspace.categories.spendCategoriesDescription')}</Text>
                                </View>
                            }
                            sections={sections}
                            ListItem={CategorySelectorListItem}
                            onSelectRow={() => {}}
                        />
                    )}
                </View>
            </ScreenWrapper>
        </AccessOrNotFoundWrapper>
    );
}

WorkspaceCategoriesSettingsPage.displayName = 'WorkspaceCategoriesSettingsPage';

export default withPolicyConnections(WorkspaceCategoriesSettingsPage);
