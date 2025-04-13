import { Membership, validateMembership, validateMembershipUpdate } from "../models/Membership.js";

// Create a new membership
export const createMembership = async (req, res) => {
  const { error } = validateMembership(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const membership = new Membership(req.body);
    await membership.save();
    res.status(201).json(membership);
  } catch (err) {
    res.status(500).json({ message: "Failed to create membership", error: err.message });
  }
};

// Get all memberships
export const getAllMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find();
    res.status(200).json(memberships);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch memberships", error: err.message });
  }
};

// Get a single membership by ID
export const getMembershipById = async (req, res) => {
  try {
    const membership = await Membership.findById(req.params.id);
    if (!membership) return res.status(404).json({ message: "Membership not found" });

    res.status(200).json(membership);
  } catch (err) {
    res.status(500).json({ message: "Error fetching membership", error: err.message });
  }
};

// Update a membership
export const updateMembership = async (req, res) => {
  const { error } = validateMembershipUpdate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const membership = await Membership.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!membership) return res.status(404).json({ message: "Membership not found" });

    res.status(200).json(membership);
  } catch (err) {
    res.status(500).json({ message: "Failed to update membership", error: err.message });
  }
};

// Delete a membership
export const deleteMembership = async (req, res) => {
  const membershipId = req.params.id;

  try {
    // Check if any users are using this membership
    const usersUsingMembership = await User.find({ membershipId });

    if (usersUsingMembership.length > 0) {
      return res.status(400).json({
        message: "Cannot delete this membership. It is currently assigned to one or more users.",
      });
    }

    // Proceed with deletion
    const deleted = await Membership.findByIdAndDelete(membershipId);
    if (!deleted) {
      return res.status(404).json({ message: "Membership not found" });
    }

    res.status(200).json({ message: "Membership deleted successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete membership",
      error: err.message,
    });
  }
};
