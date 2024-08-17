import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "sonner";
import {
  EMPTY_FAILURE_MESSAGE,
  EMPTY_SUCCESS_MESSAGE,
} from "../../Redux/constants/admin";
import { addStaffMembersAction } from "../../Redux/actions/admin";

function AddStaff() {
  const [userData, setUserData] = useState({
    name: "",
    empId: "",
    email: "",
    department: "",
  });
  const isLoading = useSelector((state) => state.AdminGS.isLoading);
  const failure = useSelector((state) => state.AdminGS.failure);
  const success = useSelector((state) => state.AdminGS.success);

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch({ type: EMPTY_SUCCESS_MESSAGE });
    }
  }, [success]);

  useEffect(() => {
    if (failure) {
      toast.error(failure);
      dispatch({ type: EMPTY_FAILURE_MESSAGE });
    }
  }, [failure]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(addStaffMembersAction(userData));
  }

  return (
    <>
      <Toaster richColors position="top-right"></Toaster>
      <div className="flex justify-center items-center w-100 h-screen">
        <div className="w-1/3 bg-white flex flex-col items-center py-6">
          <h2 className="text-4xl font-bold text-emerald-600 ">
            Add Staff Members
          </h2>
          <form
            className="flex flex-col gap-4 w-full px-12 mt-12"
            onSubmit={handleFormSubmit}
          >
            <input
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              placeholder="Enter employee name"
              className="text-lg border px-4 py-2"
            />
            <input
              type="email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              placeholder="Enter employee email"
              className="text-lg border px-4 py-2"
            />
            <input
              type="text"
              placeholder="Enter employee ID"
              value={userData.empId}
              onChange={(e) =>
                setUserData({ ...userData, empId: e.target.value })
              }
              className="text-lg border px-4 py-2"
            />
            <select
              value={userData.department}
              onChange={(e) =>
                setUserData({ ...userData, department: e.target.value })
              }
              className="text-lg border px-4 py-2"
            >
              <option value="">Select Department</option>
              <option value="Web Development">Web Development</option>
              <option value="Cyber Security">Cyber Security</option>
              <option value="Artificial Intelligence/Machine Learning">
                Artificial Intelligence/Machine Learning
              </option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Management">Management</option>
            </select>
            <button className="text-lg text-white bg-emerald-600 py-2 font-bold hover:bg-emerald-400">
              {isLoading ? "Loading...." : "Add Member"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddStaff;
