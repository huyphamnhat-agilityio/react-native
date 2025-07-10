import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

// Components
import Button from "../Button";

// Icons
import { CategoryIcon, LocationIcon, SortIcon } from "@/components/icons";

export type FiltersBarProps = {
  style?: StyleProp<ViewStyle>;
};

const FiltersBar = ({ style }: FiltersBarProps) => {
  return (
    <View style={[styles.container, style]}>
      <Button
        variant="transparent"
        title="Sort by"
        titleFont="Montserrat_500Medium"
        titleSize={3.5}
        rounded={6}
        IconLeft={<SortIcon />}
        style={styles.button}
      />

      <Button
        variant="transparent"
        title="Location"
        titleFont="Montserrat_500Medium"
        titleSize={3.5}
        rounded={6}
        IconLeft={<LocationIcon />}
        style={styles.button}
      />
      <Button
        variant="transparent"
        title="Category"
        titleFont="Montserrat_500Medium"
        titleSize={3.5}
        rounded={6}
        IconLeft={<CategoryIcon />}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 6,
  },
  button: {
    flexGrow: 1,
    gap: 6,
    paddingVertical: 8,
  },
});

export default FiltersBar;
