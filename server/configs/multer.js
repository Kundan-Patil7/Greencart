// import multer from "multer";

// export const upload = multer({storage:multer.diskStorage({})})
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Ensure the folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // Unique file names
    },
});

const upload = multer({ storage });
export default upload;


// import fs from "fs/promises";

// const imageUrls = await Promise.all(
//   images.map(async (item) => {
//     const result = await imagekit.upload({
//       file: item.path,
//       fileName: item.originalname,
//     });
//     // Delete local file after upload
//     await fs.unlink(item.path);
//     return result.url;
//   })
// );
