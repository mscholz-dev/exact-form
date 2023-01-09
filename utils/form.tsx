import { ChangeEvent, Dispatch } from "react";

export const handleChange = (
  e: ChangeEvent,
  setter: Dispatch<string>,
): void =>
  setter((e.target as HTMLInputElement).value);

export const addErrorClass = (
  ref: HTMLInputElement | HTMLTextAreaElement,
): void => {
  if (!ref.parentElement) return;
  ref.parentElement.classList.add(
    "form-input-error",
  );
};
