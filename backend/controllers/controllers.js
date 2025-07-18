import Form from "../models/user.js";

const createForm = async (req, res) => {
  console.log("first");
  try {
    const {
      name,
      email,
      phone,
      dob,
      gender,
      parentName,
      parentPhone,
      localAddress,
      permanentAddress,
      occupation,
      qualification,
      year,
      college,
      designation,
      company,
      course,
      source,
      friendName,
      agreed,
    } = req.body;

    const aadhaarFront = req.files?.aadhaarFront?.[0]?.filename || null;
    const aadhaarBack = req.files?.aadhaarBack?.[0]?.filename || null;

    const newForm = new Form({
      name,
      email,
      phone,
      dob,
      gender,
      parentName,
      parentPhone,
      localAddress,
      permanentAddress,
      occupation,
      qualification,
      year,
      college,
      designation,
      company,
      course,
      source,
      friendName,
      agreed,
      aadhaarFront: aadhaarFront,
      aadhaarBack: aadhaarBack,
    });
    console.log("newform", newForm);

    const savedForm = await newForm.save();
    console.log(savedForm);

    res
      .status(201)
      .json({ message: "Form submitted successfully", data: savedForm });
  } catch (error) {
    console.error("❌ Form submission error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export default createForm;
