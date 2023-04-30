import allowedOrigins from "./allowedOrigins";

type originCallback = (err: Error | null, allow?: boolean) => void;

export const corsOptions = {
  origin: function (origin: string | undefined, callback: originCallback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
