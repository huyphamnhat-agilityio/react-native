import { memo, useCallback, useMemo } from "react";
import { Controller, RegisterOptions, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

// Types
import { UserCard } from "@/interfaces";

// Components
import { Button, Input } from "@/components/common";

// Utils
import { clearErrorOnChange, generateRandomID, isEnableSubmit } from "@/utils";

// Constants
import {
  fadeInUp400,
  fadeInDown400,
  FORM_VALIDATION_MESSAGES,
  REGEX,
} from "@/constants";

// Themes
import { colors } from "@/themes";
import PreviewCard from "../PreviewCard";
import Animated from "react-native-reanimated";

const REQUIRED_FIELDS: (keyof UserCard)[] = [
  "cardNumber",
  "cvc",
  "expiresDates",
  "holderName",
];

export const CARD_FORM_VALIDATION: Record<
  string,
  Omit<
    RegisterOptions<UserCard>,
    "disabled" | "setValueAs" | "valueAsNumber" | "valueAsDate"
  >
> = {
  HOLDER_NAME: {
    required: FORM_VALIDATION_MESSAGES.REQUIRED("Holder Name"),
    pattern: {
      value: REGEX.NAME,
      message: FORM_VALIDATION_MESSAGES.INVALID("Holder Name"),
    },
  },
  CARD_NUMBER: {
    required: FORM_VALIDATION_MESSAGES.REQUIRED("Card Number"),
    minLength: {
      value: 16,
      message: FORM_VALIDATION_MESSAGES.MIN_LENGTH("Card Number", 16),
    },
  },
  EXPIRES_DATES: {
    required: FORM_VALIDATION_MESSAGES.REQUIRED("Expires Dates"),
    pattern: {
      value: REGEX.EXPIRES_DATES,
      message: FORM_VALIDATION_MESSAGES.INVALID("Expires Dates"),
    },
  },
  CVC: {
    required: FORM_VALIDATION_MESSAGES.IS_REQUIRED,
    minLength: {
      value: 3,
      message: FORM_VALIDATION_MESSAGES.IS_REQUIRED,
    },
  },
};

export type CardFormProps = {
  onSubmit: (data: UserCard) => Promise<void>;
};
const CardForm = memo(({ onSubmit }: CardFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, dirtyFields },
    clearErrors,
    watch,
  } = useForm<UserCard>({
    defaultValues: {
      id: generateRandomID(),
      cardNumber: "",
      cvc: "",
      expiresDates: "",
      holderName: "",
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const cardData = watch();

  const dirtyFieldList = Object.keys(dirtyFields);

  const isDisabled = useMemo(() => {
    return !isEnableSubmit({
      requiredFields: REQUIRED_FIELDS,
      dirtyFields: dirtyFieldList,
      errors,
      requirePartial: true,
    });
  }, [dirtyFieldList, errors]);

  const handleInputChange = useCallback(
    (name: keyof UserCard, onChange: (value: string) => void) => {
      return (value: string) => {
        onChange(value);

        clearErrorOnChange(name, errors, clearErrors);
      };
    },
    [clearErrors, errors],
  );
  return (
    <>
      <Animated.View entering={fadeInUp400}>
        <PreviewCard data={cardData} />
      </Animated.View>

      <View style={styles.inner}>
        <View style={styles.formWrapper}>
          <Animated.View entering={fadeInDown400}>
            <Controller
              control={control}
              name="cardNumber"
              render={({
                field: { onChange, ...rest },
                fieldState: { error },
              }) => (
                <Input
                  label="Card Number"
                  labelVariant="secondary"
                  labelSize={3.5}
                  labelFont="Montserrat_400Regular"
                  labelDistance={8}
                  inputSize={4}
                  maxLength={16}
                  inputVariant="quaternary"
                  inputMode="numeric"
                  style={styles.textInput}
                  isDisabled={isSubmitting}
                  isError={!!error?.message}
                  errorMessage={error?.message}
                  onChangeText={handleInputChange("cardNumber", onChange)}
                  {...rest}
                />
              )}
              rules={CARD_FORM_VALIDATION.CARD_NUMBER}
            />
          </Animated.View>

          <Animated.View entering={fadeInDown400}>
            <Controller
              control={control}
              name="holderName"
              render={({
                field: { onChange, ...rest },
                fieldState: { error },
              }) => (
                <Input
                  label="Name"
                  labelVariant="secondary"
                  labelSize={3.5}
                  labelFont="Montserrat_400Regular"
                  labelDistance={8}
                  inputSize={4}
                  maxLength={50}
                  inputVariant="quaternary"
                  style={styles.textInput}
                  isDisabled={isSubmitting}
                  isError={!!error?.message}
                  errorMessage={error?.message}
                  onChangeText={handleInputChange("holderName", onChange)}
                  {...rest}
                />
              )}
              rules={CARD_FORM_VALIDATION.HOLDER_NAME}
            />
          </Animated.View>

          <View style={styles.inputWrapper}>
            <Animated.View entering={fadeInDown400} style={styles.dateInput}>
              <Controller
                control={control}
                name="expiresDates"
                render={({
                  field: { onChange, ...rest },
                  fieldState: { error },
                }) => (
                  <Input
                    label="Expires Dates"
                    labelVariant="secondary"
                    labelSize={3.5}
                    labelFont="Montserrat_400Regular"
                    labelDistance={8}
                    inputSize={4}
                    maxLength={5}
                    inputVariant="quaternary"
                    style={styles.textInput}
                    isDisabled={isSubmitting}
                    isError={!!error?.message}
                    errorMessage={error?.message}
                    errorStyle={{
                      flex: 1,
                      flexWrap: "wrap",
                    }}
                    onChangeText={handleInputChange("expiresDates", onChange)}
                    {...rest}
                  />
                )}
                rules={CARD_FORM_VALIDATION.EXPIRES_DATES}
              />
            </Animated.View>

            <Animated.View entering={fadeInDown400} style={styles.cvcInput}>
              <Controller
                control={control}
                name="cvc"
                render={({
                  field: { onChange, ...rest },
                  fieldState: { error },
                }) => (
                  <Input
                    label="CVC"
                    labelVariant="secondary"
                    labelSize={3.5}
                    labelFont="Montserrat_400Regular"
                    labelDistance={8}
                    inputSize={4}
                    maxLength={3}
                    inputVariant="quaternary"
                    inputMode="numeric"
                    style={styles.textInput}
                    isDisabled={isSubmitting}
                    isError={!!error?.message}
                    errorMessage={error?.message}
                    onChangeText={handleInputChange("cvc", onChange)}
                    onSubmitEditing={handleSubmit(onSubmit)}
                    {...rest}
                  />
                )}
                rules={CARD_FORM_VALIDATION.CVC}
              />
            </Animated.View>
          </View>
        </View>
        <Animated.View entering={fadeInDown400} style={styles.buttonWrapper}>
          <Button
            title="Add Credit Card"
            titleFont="Montserrat_600SemiBold"
            rounded="full"
            titleSize={4.5}
            style={styles.button}
            disabled={isDisabled || isSubmitting}
            onPress={handleSubmit(onSubmit)}
          />
        </Animated.View>
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  inner: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: "8%",
    gap: 24,
  },
  formWrapper: {
    paddingTop: 24,
    paddingHorizontal: 32,
    gap: 24,
  },
  textInput: {
    borderBottomColor: colors.gray_50,
    borderBottomWidth: 0.5,
  },
  inputWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  buttonWrapper: {
    paddingHorizontal: 32,
    marginTop: "auto",
  },

  button: {
    width: "100%",
    paddingVertical: 16,
  },
  dateInput: {
    width: "60%",
  },
  cvcInput: {
    width: "30%",
  },
});

CardForm.displayName = "CardForm";
export default CardForm;
