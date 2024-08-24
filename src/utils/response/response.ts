export class ResponseError extends Error {
  constructor(
    public status: string,
    public code: number,
    message: string,
  ) {
    super(message);
  }
}
