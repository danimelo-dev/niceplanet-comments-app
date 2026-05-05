import { Request, Response, NextFunction } from "express";

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const startTime = Date.now();

  const correlationId =
    req.headers["x-correlation-id"]?.toString() ||
    crypto.randomUUID();

  res.setHeader("x-correlation-id", correlationId);

  res.on("finish", () => {
    const durationMs = Date.now() - startTime;

    console.log(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        correlationId,
        method: req.method,
        path: req.originalUrl,
        statusCode: res.statusCode,
        durationMs,
        userAgent: req.headers["user-agent"],
      })
    );
  });

  next();
}