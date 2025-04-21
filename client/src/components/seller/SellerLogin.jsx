import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SellerLogin = () => {
  const { setUser, isSeller, navigate,setIsSeller ,axios} = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault(); // Prevent default form submission
      const { data } = await axios.post("/api/seller/login", { email, password }); // Send login request
      if (data.success) {
        setIsSeller(true); 
        navigate("/seller"); 
      } else {
        toast.error(data.message); 
      }
    } catch (error) {
      toast.error(error.message); 
    }
  };
  

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller]);

  return (
    !isSeller && (
      <form
        onSubmit={onSubmitHandler}
        className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-600 px-4"
      >
        <div className="flex flex-col gap-6 p-8 py-12 bg-white shadow-lg rounded-2xl border border-gray-200 w-full max-w-md">
          <p className="text-3xl font-semibold text-center text-gray-800">
            <span className="text-primary">Seller</span> Login
          </p>

          <div className="w-full">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
      
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full mt-2 px-4 py-2 text-sm text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              required
            />
          </div>

          <div className="w-full">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full mt-2 px-4 py-2 text-sm text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 px-4 py-2 text-white bg-primary hover:bg-primary-dark rounded-lg shadow-lg transition-all duration-300"
          >
            Login
          </button>
        </div>
      </form>
    )
  );
};

export default SellerLogin;
