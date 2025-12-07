import { createApp } from "./app";
import Config from "./constants/config";
import { initDb } from "./db";

initDb()
  .then(() => createApp())
  .then((app) => {
    console.info(`Server is running on http://localhost:${Config.PORT}`);
    app.listen(Config.PORT);
  })
  .catch((e) => {
    console.error("DB error occurred:", e);
    process.exit(1);
  });
