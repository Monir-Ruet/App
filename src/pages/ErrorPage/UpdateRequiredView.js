import React from 'react';
import {View} from 'react-native';
import Button from '@components/Button';
import Header from '@components/Header';
import Lottie from '@components/Lottie';
import LottieAnimations from '@components/LottieAnimations';
import Text from '@components/Text';
import useThemeStyles from '@hooks/useThemeStyles';
import useWindowDimensions from '@hooks/useWindowDimensions';
import useLocalize from '@hooks/useLocalize';
import * as AppUpdate from '@libs/actions/AppUpdate';

function UpdateRequiredView() {
    const styles = useThemeStyles();
    const {translate} = useLocalize()
    const {isSmallScreenWidth} = useWindowDimensions();
    return (
        <View style={[styles.appBG, styles.h100]}>
            <View style={[styles.pt10, styles.ph5]}>
                <Header title={translate('updateRequiredView.updateRequired')} />
            </View>
            <View style={[styles.flex1, styles.h100, styles.updateRequiredView]}>
                <Lottie
                    source={LottieAnimations.Upgrade}
                    // For small screens it looks better to have the arms from the animation come in from the edges of the screen.
                    style={isSmallScreenWidth ? styles.w100 : styles.updateAnimation}
                    webStyle={isSmallScreenWidth ? styles.w100 : styles.updateAnimation}
                    autoPlay
                    loop
                />
                <View style={[styles.ph5, styles.alignItemsCenter, styles.mt5]}>
                    <View style={styles.updateRequiredViewTextContainer}>
                        <View style={[styles.mb3]}>
                            <Text style={[styles.newKansasLarge, styles.textAlignCenter]}>{translate('updateRequiredView.pleaseInstall')}</Text>
                        </View>
                        <View style={styles.mb5}>
                            <Text style={[styles.textAlignCenter, styles.textSupporting]}>{translate('updateRequiredView.toGetLatestChanges')}</Text>
                        </View>
                    </View>
                </View>
                <Button
                    success
                    large
                    onPress={() => AppUpdate.updateApp()}
                    text={translate('common.update')}
                    style={styles.updateRequiredViewTextContainer}
                />
            </View>
        </View>
    );
}

UpdateRequiredView.displayName = 'UpdateRequiredView';
export default UpdateRequiredView;
