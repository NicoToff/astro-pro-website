import { ActionEnum, initialSearchState } from "./constants";

import type { SearchState, SearchStateObjectField, SearchStateStringField } from "./types";

export type Action =
  | {
      type: typeof ActionEnum.UPDATE_STRING_FIELD;
      fieldName: SearchStateStringField;
      value: string;
    }
  | {
      type: typeof ActionEnum.UPDATE_OBJECT_FIELD;
      fieldName: SearchStateObjectField;
      subFieldName: string;
      value: boolean;
    }
  | {
      type: typeof ActionEnum.CLEAR_STRING_FIELD;
      fieldName: SearchStateStringField;
    }
  | {
      type: typeof ActionEnum.CLEAR_OBJECT_FIELD;
      fieldName: SearchStateObjectField;
    }
  | {
      type: typeof ActionEnum.INIT;
      initValue: SearchState;
    }
  | {
      type: typeof ActionEnum.FULL_RESET;
    };

export function searchReducer(state: SearchState, action: Action) {
  switch (action.type) {
    case ActionEnum.INIT:
      return action.initValue;
    case ActionEnum.UPDATE_STRING_FIELD:
      return { ...state, [action.fieldName]: action.value };
    case ActionEnum.UPDATE_OBJECT_FIELD: {
      const currentValue = { ...state[action.fieldName] };
      return {
        ...state,
        [action.fieldName]: { ...currentValue, [action.subFieldName]: action.value },
      };
    }
    case ActionEnum.CLEAR_STRING_FIELD: {
      return { ...state, [action.fieldName]: "" };
    }
    case ActionEnum.CLEAR_OBJECT_FIELD: {
      const keys = Object.keys(state[action.fieldName]);
      return {
        ...state,
        [action.fieldName]: Object.fromEntries(keys.map((k) => [k, false])),
      };
    }
    case ActionEnum.FULL_RESET:
      return structuredClone(initialSearchState);
    default:
      return state;
  }
}
