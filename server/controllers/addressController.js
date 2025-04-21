import Address from "../models/Address.js";

export const addAddress = async (req, res) => {
  try {
    const { address, userId } = req.body;

    // // Validate input
    // if (!address || !userId) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Address and User ID are required.",
    //   });
    // }

    // Create the address
    await Address.create({ ...address, userId });

    res.status(201).json({
      success: true,
      message: "Address added successfully.",
    });
  } catch (error) {
    console.error("Error adding address:", error.message);

    res.status(500).json({
      success: false,
      message: "An error occurred while adding the address.",
    });
  }
};

//get Address : /api/address/get 
export const getAddress = async (req, res) => {
    try {
      const { userId } = req.body;
  
      // Validate input
    //   if (!userId) {
    //     return res.status(400).json({
    //       success: false,
    //       message: "User ID is required.",
    //     });
    //   }
  
      // Fetch addresses for the user
      const addresses = await Address.find({ userId });
  
      res.status(200).json({
        success: true,
        message: "Addresses retrieved successfully.",
        data: addresses,
      });
    } catch (error) {
      console.error("Error retrieving addresses:", error.message);
  
      res.status(500).json({
        success: false,
        message: "An error occurred while retrieving the addresses.",
      });
    }
  };
  