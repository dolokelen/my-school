import { UseMutationResult } from "@tanstack/react-query";

interface Err {
  message: string;
}
export const http_400_BAD_REQUEST_CUSTOM_MESSAGE = <TData, TError extends Err, TD>(
  mutation: UseMutationResult<TData, TError, TD>
) => {
  const message = "Request failed with status code 400";
  const customErrMessage = "This record already exists. Please provide valid data.";
  const disPlayedMessage =
    mutation.error?.message === message
      ? customErrMessage
      : mutation.error?.message;

  return disPlayedMessage;
};

