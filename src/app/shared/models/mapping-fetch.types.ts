import { DropdownItem } from './dropdowns.types';

export type MappingResponse = {
  topics: DropdownItem[];
  subjects: Subject[];
  sentiments: DropdownItem[];
  provinces: DropdownItem[];
  states: DropdownItem[];
};

export type Subject = {
  id: number;
  text: string;
  topicId: number;
};
