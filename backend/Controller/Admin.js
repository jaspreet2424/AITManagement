const adminModel = require("../Modals/Admin");
const staffModel = require("../Modals/Staff");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const configJs = require("config-js");
const NODE_ENV = new configJs("./ait.config.js").get("ENV_VARIABLES");
const admin_key = NODE_ENV.AIT_SECRET_KEY;
const COMPANY_MAIL = NODE_ENV.COMPANY_MAIL;
const COMPANY_MAIL_PASS = NODE_ENV.COMPANY_MAIL_PASS;
const SECRET_TOKEN = NODE_ENV.SECRET_TOKEN;

const isCorrectEmail = (email) => {
  const regrex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]/;
  return regrex.test(email);
};

const generatePassword = () => {
  let pass = "";
  const alphabets =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%&*";

  for (let i = 1; i <= 8; i++) {
    let rand = Math.floor(Math.random() * alphabets.length);
    pass = pass + alphabets.charAt(rand);
  }

  return pass;
};

const transportor = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: COMPANY_MAIL,
    pass: COMPANY_MAIL_PASS,
  },
});

const registerAdmin = async (req, res) => {
  try {
    const { email, password, key } = req.body;

    if (!email || !password || !key) {
      return res.status(422).json({
        success: false,
        message: "Missing input fields",
      });
    }

    if (!isCorrectEmail(email)) {
      return res.status(422).json({
        success: false,
        message: "Incorrect email format!",
      });
    }

    if (key !== admin_key.toString()) {
      return res.status(422).json({
        success: false,
        message: "Invalid Key",
      });
    }

    const hashPassword = await bcrypt.hash(password, saltRounds);

    const newAdmin = await adminModel.create({
      email,
      password: hashPassword,
    });

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      Data: newAdmin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went Wrong , try to contact with ANSH Infotech.",
      error: error.message,
    });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({
        success: false,
        message: "Missing input fields",
      });
    }

    const isAdmin = await adminModel.findOne({ email });

    if (!isAdmin) {
      return res.status(400).json({
        success: false,
        message: "No Admin Found , incorrect email",
      });
    }

    const isMatched = await bcrypt.compare(password, isAdmin.password);

    if (!isMatched) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Password",
      });
    }

    const token = await jwt.sign({ adminId: isAdmin._id }, SECRET_TOKEN);

    isAdmin.token = token;

    await isAdmin.save();

    res.cookie("adminToken", token, {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Login Successfully",
      Data: isAdmin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went Wrong , try to contact with ANSH Infotech.",
      error: error.message,
    });
  }
};

const adminAuthentication = async (req, res) => {
  try {
    const adminToken = req.cookies.adminToken;

    if (!adminToken) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized access. Please Login first",
      });
    }

    jwt.verify(adminToken, SECRET_TOKEN, async (err, decoded) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Unauthorized access.",
        });
      } else {
        const savedAdmin = await adminModel.findById(decoded.adminId);
        res.status(200).json({
          success: true,
          Data: savedAdmin,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went Wrong , try to contact with ANSH Infotech.",
      error: error.message,
    });
  }
};

const logoutAdmin = async (req, res) => {
  try {
    const adminToken = req.cookies.adminToken;

    if (!adminToken) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized access. Please Login first",
      });
    }

    jwt.verify(adminToken, SECRET_TOKEN, async (err, decoded) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Unauthorized access.",
        });
      } else {
        const savedAdmin = await adminModel.findById(decoded.adminId);
        savedAdmin.token = null;
        await savedAdmin.save();
        res.clearCookie("adminToken");

        res.status(200).json({
          success: true,
          message: "Logout Successfully",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went Wrong , try to contact with ANSH Infotech.",
      error: error.message,
    });
  }
};

const addStaffMembers = async (req, res) => {
  try {
    const { name, empId, email, department } = req.body;

    if (!name || !empId || !email || !department) {
      return res.status(422).json({
        success: false,
        message: "Missing input fields",
      });
    }

    const isExisted = await staffModel.findOne({ empId });

    if (isExisted) {
      return res.status(400).json({
        success: false,
        message: "Employee already added",
      });
    }

    const password = generatePassword();
    const hashPassword = await bcrypt.hash(password , saltRounds);

    const newEntry = await staffModel.create({
      name,
      email,
      password : hashPassword,
      empId,
      department,
    });

    const notification = {
      from: COMPANY_MAIL,
      to: email,
      subject: "Password Credentials from Ansh Infotech",
      text: `Your account has been successfully created for employee ID : ${empId}. This is your password {Password : ${password}} , please don't share it with others`,
    };

    await transportor.sendMail(notification);

    res.status(201).json({
      success: true,
      message: "Entry Added Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went Wrong , try to contact with ANSH Infotech.",
      error: error.message,
    });
  }
};

const getAllStaffMembers = async (req, res) => {
  try {
    const data = await staffModel.find();

    if (!data || data.length <= 0) {
      return res.status(400).json({
        success: false,
        message: "No data to fetch",
      });
    }

    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      Data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went Wrong , try to contact with ANSH Infotech.",
      error: error.message,
    });
  }
};

const deleteStaffMember = async (req, res) => {
  try {
    const { epId } = req.params;

    const deletedUser = await staffModel.findByIdAndDelete(epId);

    if (!deletedUser) {
      return res.status(400).json({
        success: false,
        message: "Failed to deleted User",
      });
    }

    res.status(200).json({
      success: true,
      message: "Data deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went Wrong , try to contact with ANSH Infotech.",
      error: error.message,
    });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  adminAuthentication,
  logoutAdmin,
  addStaffMembers,
  getAllStaffMembers,
  deleteStaffMember,
};
