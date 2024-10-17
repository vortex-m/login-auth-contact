const asyncHandler = require("express-async-handler");
const Contact = require("../modals/contactModal.js");

// @desc Get contact
// @route GET /api/contacts
// @access Public
const getContact = asyncHandler(async (req, res) => {
  if (req.params.id) {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
    res.status(200).json(contact);
  } else {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  }
});

// @desc Create contact
// @route POST /api/contacts
// @access Public
const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is: ", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Please fill all the fields in the form");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
  });
  res.status(201).json(contact);
});

// @desc Update contact
// @route PUT /api/contacts/:id
// @access Public
const updateContact = asyncHandler(async (req, res) => {
  if (req.params.id) {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200).json(updatedContact);
  }
});

// @desc Delete contact
// @route DELETE /api/contacts/:id
// @access Public
const deleteContact = asyncHandler(async (req, res) => {
  // res.status(200).json({ message: `Delete contact ${req.params.id}` });
  console.log(`Delete request for contact ID: ${req.params.id}`);
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    console.log('Contact not found');
    res.status(404);
    throw new Error('Contact not found');
  }
  await contact.remove();

  console.log('Contact deleted successfully');
  res.status(200).json({ message: `Contact ${req.params.id} deleted successfully` });
});

module.exports = {
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
