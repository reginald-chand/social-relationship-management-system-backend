export const sessionOptions = {
  secret: process.env.EXPRESS_SESSION_SECRET || "EXPRESS_SESSION_SECRET",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true },
};
