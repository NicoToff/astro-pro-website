import { ActionEnum, initialSearchState } from "./constants";
import { isSearchStateArrayField } from "./types";

import type { SearchState, SearchStateKey, SearchStateObjectField } from "./types";

export type Action =
  | {
      type: typeof ActionEnum.UPDATE;
      fieldName: SearchStateKey;
      value: string;
    }
  | {
      type: typeof ActionEnum.UPDATE_OBJECT_FIELD;
      fieldName: SearchStateObjectField;
      subFieldName: string;
      value: boolean;
    }
  | {
      type: typeof ActionEnum.REMOVE;
      fieldName: SearchStateKey;
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
    case ActionEnum.UPDATE:
      if (isSearchStateArrayField(action.fieldName)) {
        const currentValue = [...state[action.fieldName]];
        if (!currentValue.includes(action.value)) {
          return { ...state, [action.fieldName]: [...currentValue, action.value] };
        }
      }
      return { ...state, [action.fieldName]: action.value };
    case ActionEnum.UPDATE_OBJECT_FIELD: {
      const currentValue = { ...state[action.fieldName] };
      return {
        ...state,
        [action.fieldName]: { ...currentValue, [action.subFieldName]: action.value },
      };
    }
    case ActionEnum.REMOVE: {
      return { ...state, [action.fieldName]: "" };
    }
    case ActionEnum.FULL_RESET:
      return structuredClone(initialSearchState);
    default:
      return state;
  }
}
