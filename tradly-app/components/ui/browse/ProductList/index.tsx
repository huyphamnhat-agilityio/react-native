import { StyleProp, ViewStyle } from "react-native";

// Components
import { ProductCardList } from "@/components/common";
import { MOCK_PRODUCTS } from "@/mocks/product";

export type ProductListProps = {
  style?: StyleProp<ViewStyle>;
};

const ProductList = () => {
  return <ProductCardList data={MOCK_PRODUCTS} />;
};

export default ProductList;
