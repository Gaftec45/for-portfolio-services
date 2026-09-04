const express = require("express");
const router = express.Router();

const Review = require("../models/Review");


// Display published reviews
router.get("/", async (req, res) => {
    try {
        const reviews = await Review.find({
            status: "approved",
        })
            .sort({ createdAt: -1 })
            .lean();

        const publishedReviewsCount = reviews.length;

        const averageRating = publishedReviewsCount
            ? (
                  reviews.reduce(
                      (total, review) => total + review.rating,
                      0
                  ) / publishedReviewsCount
              ).toFixed(1)
            : null;

        res.render("pages/reviews", {
            title: "Client Reviews | Marjheerdy Shopify Growth Partner",
            reviews,
            publishedReviewsCount,
            averageRating,
        });
    } catch (error) {
        console.error("Error loading reviews page:", error);

        res.status(500).send("Unable to load reviews.");
    }
});


router.post("/", async (req, res) => {
    try {
        const {
            reviewer_name,
            store_name,
            store_url,
            service,
            rating,
            body,
        } = req.body || {};        

        if (!reviewer_name || !rating || !body) {
            return res.status(400).json({
                success: false,
                message: "Please complete all required fields.",
            });
        }

        const numericRating = Number(rating);

        if (
            !Number.isInteger(numericRating) ||
            numericRating < 1 ||
            numericRating > 5
        ) {
            return res.status(400).json({
                success: false,
                message: "Please select a valid rating.",
            });
        }

        const review = await Review.create({
            reviewerName: reviewer_name,
            storeName: store_name,
            storeUrl: store_url,
            service,
            rating: numericRating,
            body,
            status: "approved",
        });

        return res.status(201).json({
            success: true,
            message:
                "Thank you! Your review has been submitted for approval.",
            reviewId: review._id,
        });

    } catch (error) {
        console.error("Review submission error:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong while submitting your review.",
        });
    }
});


module.exports = router;