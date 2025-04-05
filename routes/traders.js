import express from "express";
const router = express.Router();
import { Trader } from "../models/trader.js";

/**
 * @route   GET /api/admin
 * @desc    Get all traders (admin only)
 */
router.get("/", async (req, res) => {
	try {
		const traders = await Trader.find();

		res.status(200).json(traders);
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
});

/**
 * @route   GET /api/admin/:id
 * @desc    Get trader by ID (admin only)
 */
router.get("/:id", async (req, res) => {
	try {
		const trader = await Trader.findById(req.params.id);

		if (!trader) {
			return res.status(404).json({
				message: "Trader not found",
			});
		}

		res.status(200).json(trader);
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
});

/**
 * @route   POST /api/admin
 * @desc    Create a new trader (admin only)
 */
router.post("/create", async (req, res) => {
	try {
		const newTrader = await Trader.create(req.body);

		res.status(201).json({ message: "Trader Created Successfully", newTrader });
	} catch (error) {
		if (error.name === "ValidationError") {
			const messages = Object.values(error.errors).map((val) => val.message);

			return res.status(400).json({
				message: messages.join(", "),
			});
		}

		res.status(500).json({
			message: error.message,
		});
	}
});

/**
 * @route   put /api/admin/:id
 * @desc    Update a trader (admin only)
 */
router.put("/:id", async (req, res) => {
	try {
		const trader = await Trader.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!trader) {
			return res.status(404).json({
				message: "Trader not found",
			});
		}

		res.status(200).json({ message: "Trader Updated Successfully", trader });
	} catch (error) {
		if (error.name === "ValidationError") {
			const messages = Object.values(error.errors).map((val) => val.message);

			return res.status(400).json({
				message: messages.join(", "),
			});
		}

		res.status(500).json({
			message: error.message,
		});
	}
});

/**
 * @route   DELETE /api/admin/:id
 * @desc    Delete a trader (admin only)
 */
router.delete("/:id", async (req, res) => {
	try {
		const trader = await Trader.findByIdAndDelete(req.params.id);

		if (!trader) {
			return res.status(404).json({
				message: "Trader not found",
			});
		}

		res.status(204).json({ message: "Trader Deleted Successfully" });
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
});

export default router;
