import express from "express";
import { PaymentController } from "./controllers/payment.controller";

const app = express();
const paymentController = new PaymentController();

app.use(express.json());

app.post("/payments", (req, res) => paymentController.create(req, res));
app.get("/payments", (req, res) => paymentController.list(req, res));

export { app };
