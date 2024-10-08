const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: "public_51oAtMWL70Xt2KsI6zlke0Dj2Ag=",
  privateKey: "private_h97ZHeW+Gd46Tkj63ZiVgy1MLKI=",
  urlEndpoint: "https://ik.imagekit.io/jawir",
});
exports.imageUpload = async (file) => {
  const uploadedFile = await imagekit.upload({
    file: file.data,
    fileName: file.name,
  });
  return uploadedFile?.url;
};
