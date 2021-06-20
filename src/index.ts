import { app } from "./app";

const port = process.env.API_PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})