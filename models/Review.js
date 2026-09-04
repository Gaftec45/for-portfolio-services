const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        reviewerName: {
            type: String,
            required: true,
            trim: true,
            maxlength: 80,
        },

        storeName: {
            type: String,
            trim: true,
            maxlength: 120,
        },

        storeUrl: {
            type: String,
            trim: true,
            maxlength: 500,
        },

        service: {
            type: String,
            trim: true,
        },

        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },

        body: {
            type: String,
            required: true,
            trim: true,
            minlength: 10,
            maxlength: 2000,
        },

        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "approved",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Review", reviewSchema);