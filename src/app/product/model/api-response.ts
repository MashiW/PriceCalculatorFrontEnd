export class ApiResponse<T> {
  public status: string;
  public message: string;
  public payload: T;
}
