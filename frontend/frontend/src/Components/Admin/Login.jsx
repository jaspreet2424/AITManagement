import React, { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { loginAdminAction } from "../../Redux/actions/Admin";
import { EMPTY_FAILURE_MESSAGE, EMPTY_SUCCESS_MESSAGE} from "../../Redux/constants/admin";

function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const isLoading = useSelector((state) => state.AdminGS.isLoading);
  const failure = useSelector((state) => state.AdminGS.failure);
  const success = useSelector((state) => state.AdminGS.success);

  const dispatch = useDispatch();

  useEffect(() => {
    if(failure){
      toast.error(failure);
      dispatch({type : EMPTY_FAILURE_MESSAGE});
    }
  },[failure]);
  
  useEffect(() => {
    if(success){
      toast.success(success);
      dispatch({type : EMPTY_SUCCESS_MESSAGE});
    }
  },[success]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAdminAction(userData));
  };

  return (
    <>
      <Toaster richColors position="top-right" />
      <div className="flex justify-center items-center w-100 h-screen">
        <div className="w-1/3 bg-white flex flex-col items-center py-6">
          <h2 className="text-4xl font-bold text-emerald-600 ">
            Admin Login Panel
          </h2>
          <form
            className="flex flex-col gap-4 w-full px-12 mt-12"
            onSubmit={handleFormSubmit}
          >
            <input
              type="text"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              placeholder="Enter email"
              className="text-lg border px-4 py-2"
            />
            <input
              type="password"
              placeholder="Enter password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              className="text-lg border px-4 py-2"
            />
            <button className="text-lg text-white bg-emerald-600 py-2 font-bold hover:bg-emerald-400">
              {isLoading ? "Loading...." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
