import { memo, useCallback, useEffect, useRef } from "react";
import { useShallow } from "zustand/shallow";
import { FlatList } from "react-native";

// Components
import Modal, { ModalProps } from "../Modal";
import CategorySelectItem from "../CategorySelectItem";

// Mocks
import { CATEGORIES } from "@/mocks";

// Store
import { useFilterStore } from "@/store";

export type CategorySelectionModalProps = { onClose?: () => void } & ModalProps;

const CategorySelectionModal = memo(
  ({ onClose, ...rest }: CategorySelectionModalProps) => {
    const flatListRef = useRef<FlatList>(null);

    const { currentCategory, setCategory } = useFilterStore(
      useShallow((state) => ({
        currentCategory: state.category,
        setCategory: state.setCategory,
      })),
    );

    const handlerRenderItem = useCallback(
      ({ item }: { item: { title: string } }) => (
        <CategorySelectItem
          title={item.title}
          selected={currentCategory === item.title}
          onSelect={setCategory}
          onClose={onClose}
        />
      ),
      [currentCategory, setCategory, onClose],
    );

    useEffect(() => {
      if (!rest.visible) return;

      const index = CATEGORIES.findIndex(
        (item) => item.title === currentCategory,
      );

      if (index === -1) return;

      const timeout = setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0.7,
        });
      }, 100);

      return () => clearTimeout(timeout);
    }, [currentCategory, rest.visible]);

    return (
      <Modal {...rest}>
        <FlatList
          ref={flatListRef}
          data={CATEGORIES}
          renderItem={handlerRenderItem}
          contentContainerStyle={{
            gap: 8,
          }}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50,
          }}
          getItemLayout={(_, index) => ({
            length: 40,
            offset: 40 * index,
            index,
          })}
        />
      </Modal>
    );
  },
);

CategorySelectionModal.displayName = "CategorySelectionModal";
export default CategorySelectionModal;
