class CallError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(message)
    this.statusCode = statusCode
  }
}

export { CallError }
