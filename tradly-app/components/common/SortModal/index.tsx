import { memo, useCallback } from "react";
import { useShallow } from "zustand/shallow";
import { FlatList } from "react-native";

// Components
import Modal, { ModalProps } from "../Modal";

// Mocks

// Store
import { useFilterStore } from "@/store";
import { SORTS } from "@/constants";
import SortSelectItem from "../SortSelectItem";

export type SortModalProps = { onClose?: () => void } & ModalProps;

const SortModal = memo(({ onClose, ...rest }: SortModalProps) => {
  const { currentSortField, setSortField, currentOrder, setOrder } =
    useFilterStore(
      useShallow((state) => ({
        currentSortField: state.sortField,
        setSortField: state.setSortField,
        currentOrder: state.order,
        setOrder: state.setOrder,
      })),
    );

  const handleSelectSort = useCallback(
    (sort: string, order: string) => {
      setSortField(sort);
      setOrder(order);
    },
    [setSortField, setOrder],
  );

  const handlerRenderItem = useCallback(
    ({ item }: { item: { title: string; label: string; value: string } }) => (
      <SortSelectItem
        title={item.title}
        value={item.value}
        label={item.label}
        selected={
          currentSortField === item.label && currentOrder === item.value
        }
        onSelect={handleSelectSort}
        onClose={onClose}
      />
    ),
    [currentSortField, currentOrder, handleSelectSort, onClose],
  );

  return (
    <Modal {...rest}>
      <FlatList
        data={SORTS.PRICE}
        renderItem={handlerRenderItem}
        contentContainerStyle={{
          gap: 8,
        }}
        getItemLayout={(_, index) => ({
          length: 40,
          offset: 40 * index,
          index,
        })}
      />
    </Modal>
  );
});

SortModal.displayName = "SortModal";
export default SortModal;
