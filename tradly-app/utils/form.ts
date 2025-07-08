import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormClearErrors,
} from "react-hook-form";

/**
 * Clear error message when the users typing
 */
export const clearErrorOnChange = <T extends FieldValues>(
  fieldName: Path<T>,
  errors: FieldErrors<T>,
  clearErrorFunc: UseFormClearErrors<T>,
): void => {
  errors[fieldName]?.message && clearErrorFunc(fieldName);
};

/**
 * Enable submission when all required fields are filled and there are no errors
 */
export const isEnableSubmit = ({
  requiredFields,
  dirtyFields,
  errors,
  requirePartial = false,
}: {
  requiredFields: string[];
  dirtyFields: string[];
  errors: Record<string, unknown>;
  requirePartial?: boolean;
}): boolean => {
  const isMatchAllRequiredFields = requirePartial
    ? requiredFields.some((field) => dirtyFields.includes(field))
    : requiredFields.every((field) => dirtyFields.includes(field));
  return isMatchAllRequiredFields && errors && !Object.keys(errors).length;
};
