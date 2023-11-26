import { UseMutationResult } from "@tanstack/react-query";

interface Err {
  message: string;
}
export const http_400_BAD_REQUEST_CUSTOM_MESSAGE = <
  TData,
  TError extends Err,
  TD
>(
  mutation: UseMutationResult<TData, TError, TD>
) => {
  const message = "Request failed with status code 400";
  const customErrMessage =
    "This record might exist or the provided data is not valid.";
  const disPlayedMessage =
    mutation.error?.message === message
      ? customErrMessage
      : mutation.error?.message;

  return disPlayedMessage;
};

export const deletionErrorMessage = (objectName?: string) => {
  return `${objectName} cannot be deleted because it might be associated with other records, consider deleting those records first!`;
};
