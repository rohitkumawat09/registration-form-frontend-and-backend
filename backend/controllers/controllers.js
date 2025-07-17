import DetailModel from "../models/user.js";

export async function addData(req, res ,next ) {
    console.log("first");
  try {
    console.log(req.body);

    const dataToAdd = new DetailModel(req.body);
    await dataToAdd.save();
    res.status(200).json({ message: "Data Added", dataToAdd });
    
  } catch (error) {
    console.log(error);
    res.status(500).send("There is an error", error.message);
  }
}
