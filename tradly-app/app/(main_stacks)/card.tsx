import { useRouter } from "expo-router";
import { useCallback } from "react";
import { StyleSheet, ToastAndroid } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useShallow } from "zustand/shallow";

// Components
import { CardForm } from "@/components/ui/card";

// Constants
import { SUCCESS_MESSAGE } from "@/constants";

// Hooks
import { useUpdateUser } from "@/hooks";

// Types
import { UserCard } from "@/interfaces";

// Store
import { useUserStore } from "@/store";

// Themes
import { background } from "@/themes";

const Card = () => {
  const { back } = useRouter();

  const { userId, currentCards, setUserCards } = useUserStore(
    useShallow((state) => ({
      userId: state.user?.id ?? "",
      currentCards: state.user?.cards ?? [],
      setUserCards: state.setUserCards,
    })),
  );

  const { mutateAsync: updateUser } = useUpdateUser();

  const handleAddCard = useCallback(
    async (data: UserCard) => {
      await updateUser(
        { id: userId, cards: [...currentCards, data] },
        {
          onSuccess: () => {
            setUserCards(data);
            ToastAndroid.showWithGravity(
              SUCCESS_MESSAGE.ADD_CARD,
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );
            back();
          },
          onError: (error) => {
            ToastAndroid.showWithGravity(
              error.message,
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );
          },
        },
      );
    },
    [back, currentCards, setUserCards, updateUser, userId],
  );
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <CardForm onSubmit={handleAddCard} />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: background.white,
  },
});
export default Card;
