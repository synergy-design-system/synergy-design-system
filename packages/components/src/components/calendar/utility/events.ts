/**
 * Suppresses nested focus events within the calendar component.
 * @param event The focus event to stop from propagating.
 */
export const stopNestedFocusEvent = (event: Event) => {
  event.stopPropagation();
};
