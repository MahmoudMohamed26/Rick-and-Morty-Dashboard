import { InfoType } from "./info";

export interface ApiResponse<T> {
  info: InfoType;
  results: T;
}
