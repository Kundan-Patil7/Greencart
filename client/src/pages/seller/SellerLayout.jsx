import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { navbar } from "../../assets/navbar/navbar";
import toast from "react-hot-toast";

const SellerLayout = () => {
  const { axios,navigate } = useAppContext();

  const sidebarLinks = [
    { name: "Add product", path: "/seller", icon: assets.add_icon },
    { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
    { name: "Order", path: "/seller/order", icon: assets.cart_icon },
  ];

  const logOut = async () => {
    try {
      const {data} = await axios.get('/api/seller/logout')
    if(data.success){
      toast.success(data.message);
      navigate("/");
    }else{
      toast.error(data.message)
    }
    
    } catch (error) {
      toast.error(error.message)
    }

  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
        <Link to="/">
          <img src={navbar.logo} alt="logo" className="h-10" />
        </Link>
        <div className="flex items-center gap-5 text-gray-500">
          <p>Hi! Admin</p>
          <button
            onClick={logOut}
            className="border rounded-full text-sm px-4 py-1 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="md:w-64 w-16 border-r border-gray-300 bg-white">
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/seller"}
              className={({ isActive }) =>
                `flex items-center py-3 px-4 gap-3 ${
                  isActive
                    ? "border-r-4 md:border-r-[6px] bg-primary/10 border-primary text-primary"
                    : "hover:bg-gray-100 text-gray-700"
                }`
              }
            >
              <img src={item.icon} alt={item.name} className="w-6 h-6" />
              <span className="md:block hidden">{item.name}</span>
            </NavLink>
          ))}
        </div>

        {/* Outlet (Dynamic Content) */}
        <div className="flex-1 p-4 md:p-8 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SellerLayout;