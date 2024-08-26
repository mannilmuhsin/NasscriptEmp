const Employee = require('../models/Employee');
const upload = require('../utils/fileUpload');

// Create Employee
exports.createEmployee = [
  upload.fields([
    { name: 'profilePhoto', maxCount: 1 },
    { name: 'passportPhoto', maxCount: 1 },
    { name: 'idPhoto', maxCount: 1 },
    { name: 'medicalPhoto', maxCount: 1 },
    { name: 'gatePassPhoto', maxCount: 1 }
  ]),
  async (req, res) => {
    // console.log('creatting');
    try {
      const employeeData = req.body;

      // console.log(req.body);
      
      // Assign file paths if files are uploaded
      if (req.files) {
        if (req.files.profilePhoto) employeeData.profilePhoto = req.files.profilePhoto[0].path;
        if (req.files.passportPhoto) employeeData.passportPhoto = req.files.passportPhoto[0].path;
        if (req.files.idPhoto) employeeData.idPhoto = req.files.idPhoto[0].path;
        if (req.files.medicalPhoto) employeeData.medicalPhoto = req.files.medicalPhoto[0].path;
        if (req.files.gatePassPhoto) employeeData.gatePassPhoto = req.files.gatePassPhoto[0].path;
      }

      const employee = new Employee(employeeData);
      console.log(employee);
      await employee.save();
      res.status(201).json(employee);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
];

  exports.getAllEmployees = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skipIndex = (page - 1) * limit;
    
    try {
      const total = await Employee.countDocuments();
      const employees = await Employee.find()
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skipIndex)
        .exec();
      
      res.json({
        employees,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalEmployees: total
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Update Employee
exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log(req.body);
    
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.getEmployees = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    // console.log(employee);
    
    res.json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add more controller functions as needed