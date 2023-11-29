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
  const http_403 = "Request failed with status code 403";
  const http_400 = "Request failed with status code 400";
  const customErrMessage =
    "This record might exist or the provided data is not valid.";
  const disPlayedMessage =
    mutation.error?.message === http_400 || mutation.error?.message === http_403
      ? customErrMessage
      : mutation.error?.message;

  return disPlayedMessage;
};

export const deletionErrorMessage = (objectName?: string) => {
  return `${objectName} cannot be deleted because it might be associated with other records, consider deleting those records first!`;
};

export const userRegistraErrMessage = () => {
  return "Ensure that the image is not larger than 300KB and the file size also. All fields must be valid as well.";
};
