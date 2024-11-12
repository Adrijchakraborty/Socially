import supabase from "../config/supabase.js";

export const imageUpload = async (req, res, next) => {
    const file = req.file;

    // Check if file is provided
    if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = `uploads/${Date.now()}_${file.originalname}`;

    try {
        // Upload file to Supabase Storage
        const { data, error } = await supabase.storage
            .from("socially")
            .upload(filePath, file.buffer, {
                contentType: file.mimetype,
                cacheControl: "3600",
                upsert: false,
            });

        if (error) {
            throw error;
        }

        res.status(200).json({
            message: "File uploaded successfully",
            filePath: data,
        });
    } catch (error) {
        next(error);
    }
};
