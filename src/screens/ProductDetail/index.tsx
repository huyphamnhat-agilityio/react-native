import {useCallback} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Button, QuantityControl, Text} from 'src/components/common';
import {BackArrowIcon} from 'src/components/icons';
import {useProductDetail} from 'src/hooks/product';
import {AppStackScreenProps} from 'src/interfaces';
import {borderRadius, colors} from 'src/themes';

const ProductDetailScreen = ({
  route: {
    params: {id},
  },
  navigation: {goBack},
}: AppStackScreenProps<'ProductDetail'>) => {
  const {data} = useProductDetail(id);

  const handleBack = useCallback(() => goBack(), [goBack]);

  return (
    <View style={styles.container}>
      <Button
        rounded="sm"
        bgVariant="white"
        IconLeft={<BackArrowIcon />}
        style={styles.button}
        onPress={handleBack}
      />
      <Image
        source={{
          uri: data?.variants[0].image,
        }}
        style={styles.image}
        resizeMode="stretch"
      />
      <View style={styles.content}>
        <Text
          numberOfLines={1}
          font="GelasioMedium"
          size="lg"
          textVariant="secondary">
          {data?.name}
        </Text>
        <View style={styles.wrapper}>
          <Text
            style={styles.price}
            font="NunitoSansBold"
            size="xxl"
            textVariant="secondary">
            $ {data?.price}
          </Text>

          <QuantityControl />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: colors.white,
  },
  button: {
    position: 'absolute',
    top: 53,
    left: 32,
    zIndex: 99,
    padding: 10,
    shadowColor: colors.shadow.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    boxShadow: '',
    shadowOpacity: 0.2,
    shadowRadius: 40,
    elevation: 40,
  },
  image: {
    alignSelf: 'flex-end',
    width: '86%',
    height: '56%',
    borderBottomLeftRadius: borderRadius.xxl,
  },
  content: {
    flex: 1,
    marginTop: 25,
    gap: 10,
    paddingHorizontal: 25,
    paddingBottom: 30,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'green',
  },
  price: {
    width: '68%',
    backgroundColor: 'tomato',
  },
});

export default ProductDetailScreen;
