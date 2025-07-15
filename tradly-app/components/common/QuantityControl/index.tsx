import { memo, useCallback } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

// Components
import Button from "../Button";
import Input from "../Input";

// Icons
import { MinusIcon, PlusIcon } from "@/components/icons";

// Themes
import { borderRadius, colors } from "@/themes";

// Utils
import { parseToInt } from "@/utils";
export type QuantityControlProps = ViewProps & {
  quantity?: number;
  max?: number;
  min?: number;
  setQuantity: (quantity: number) => void;
  isDisabled?: boolean;
};
const QuantityControl = memo(
  ({
    quantity = 1,
    max = 999,
    min = 1,
    setQuantity,
    style,
    isDisabled = false,
    ...props
  }: QuantityControlProps) => {
    const isMaximum = quantity >= max;
    const isMinimum = quantity <= min;

    const handleChangeQuantity = useCallback(
      (amount: number) => () => {
        setQuantity(quantity + amount);
      },
      [quantity, setQuantity],
    );

    const handleOnChange = useCallback(
      (value: string) => {
        setQuantity(parseToInt(value, min, max));
      },
      [max, min, setQuantity],
    );

    return (
      <View style={[styles.container, style]} {...props}>
        <Button
          testID="increase-quantity"
          IconLeft={<PlusIcon opacity={isMaximum ? 0.5 : 1} />}
          variant="transparent"
          onPress={handleChangeQuantity(1)}
          disabled={isMaximum || isDisabled}
          style={styles.button}
        />
        <Input
          testID="quantity-input"
          inputWidth={30}
          inputHeight={20}
          inputMode="numeric"
          font="Montserrat_500Medium"
          inputVariant="quaternary"
          textAlign="center"
          isDisabled={isDisabled}
          onChangeText={handleOnChange}
          value={quantity.toString()}
        />
        <Button
          testID="decrease-quantity"
          IconLeft={<MinusIcon opacity={isMinimum ? 0.5 : 1} />}
          variant="transparent"
          onPress={handleChangeQuantity(-1)}
          disabled={quantity <= min || isDisabled}
          style={styles.button}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: "auto",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  button: {
    width: 24,
    height: 24,
    padding: 0,
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: borderRadius["1.5"],
  },
});

QuantityControl.displayName = "QuantityControl";

export default QuantityControl;
