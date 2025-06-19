const { cloudinary } = require("../cloudinary");

module.exports.uploadByLink = async (req, res) => {
  const { link } = req.body;
  if (!link) {
    return res.status(400).json({ error: "No link provided" });
  }
  try {
    const response = await cloudinary.uploader.upload(link, {
      folder: "StayEasy",
    });
    res.json(response.url);
  } catch (error) {
    console.log("error occured in link upload,", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
};

module.exports.uploadFromDevice = async (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path } = req.files[i];
    const response = await cloudinary.uploader.upload(path, {
      folder: "StayEasy",
    });
    const { url } = response;
    uploadedFiles.push(url);
  }
  res.json(uploadedFiles);
};

