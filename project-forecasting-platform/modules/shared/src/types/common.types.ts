/**
 * Shared, cross-module primitive types. Kept intentionally tiny -
 * business types (User, Profile) live inside their own module and are
 * NOT re-exported here, so importing a module's internal type from
 * another module is always a rules violation, never an accident of a
 * missing shared export.
 */
export type ISODateString = string;

export interface ApiError {
  error: string;
}
