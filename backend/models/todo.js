import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String }, // Optional description field if needed
  is_complete: { type: Boolean, default: false }, // To indicate task completion
  is_pinned: { type: Boolean, default: false }, // To indicate if a task is pinned
  created_at: { type: Date }, // Automatically sets creation timestamp
  updated_at: { type: Date }, // Automatically updates when modified
});

// Middleware to update `updated_at` on save
TodoSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

export default mongoose.model("Todo", TodoSchema);
