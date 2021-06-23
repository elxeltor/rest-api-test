import { app } from "./app";
import logger from "./utils/logger";

const port = process.env.API_PORT || 5000;
app.listen(port, () => {
  logger.info(`Server started on port ${port}`);
})