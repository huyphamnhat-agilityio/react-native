import { memo } from "react";
import { FlatList, ListRenderItem } from "react-native";

// Components
import Modal, { ModalProps } from "../Modal";

// Store
export type SortModalProps<T> = {
  data: ArrayLike<T> | null | undefined;
  onClose?: () => void;
  handleRenderItem: ListRenderItem<T> | null | undefined;
} & ModalProps;

const SortModal = memo(
  ({ onClose, data, handleRenderItem, ...rest }: SortModalProps<any>) => {
    return (
      <Modal {...rest}>
        <FlatList
          data={data}
          renderItem={handleRenderItem}
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
  },
);

SortModal.displayName = "SortModal";
export default SortModal;
