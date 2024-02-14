import { Dayjs } from "dayjs";

//validation of title
export function validateTitle(
  titleFieldValue: string,
  setTitleError: (tmp: boolean) => void
) {
  if (!titleFieldValue) {
    setTitleError(true);
    return false;
  } else {
    setTitleError(false);
    return true;
  }
}
//validation of description

export function validateDescription(
  descriptionFieldValue: string,
  setDescriptionError: (tmp: boolean) => void
) {
  if (!descriptionFieldValue) {
    setDescriptionError(true);
    return false;
  } else {
    setDescriptionError(false);
    return true;
  }
}
// validation of due date

export function validateDate(
  creationDate: Dayjs,
  setDateError: (tmp: boolean) => void,
  dateFieldValue: Dayjs | null
) {
  if (dateFieldValue?.isBefore(creationDate)) {
    setDateError(true);
    return false;
  } else {
    setDateError(false);
    return true;
  }
}
