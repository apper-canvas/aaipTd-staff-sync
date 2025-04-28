import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, ChevronDown, ChevronUp, Plus } from "lucide-react";

const MainFeature = () => {
  const [activeTab, setActiveTab] = useState("attendance");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: "",
    date: new Date().toISOString().split("T")[0],
    clockInTime: "",
    clockOutTime: "",
    notes: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [attendanceRecords, setAttendanceRecords] = useState([
    {
      id: 1,
      employeeName: "Alex Johnson",
      employeeId: "EMP001",
      date: "2023-06-15",
      clockInTime: "09:00",
      clockOutTime: "17:30",
      status: "present"
    },
    {
      id: 2,
      employeeName: "Sarah Williams",
      employeeId: "EMP002",
      date: "2023-06-15",
      clockInTime: "08:45",
      clockOutTime: "17:15",
      status: "present"
    },
    {
      id: 3,
      employeeName: "Michael Chen",
      employeeId: "EMP003",
      date: "2023-06-15",
      clockInTime: "09:20",
      clockOutTime: "17:45",
      status: "late"
    },
    {
      id: 4,
      employeeName: "Emily Rodriguez",
      employeeId: "EMP004",
      date: "2023-06-15",
      clockInTime: "",
      clockOutTime: "",
      status: "absent"
    }
  ]);
  
  const [expandedRecord, setExpandedRecord] = useState(null);
  
  const tabs = [
    { id: "attendance", label: "Attendance Tracker", icon: <Calendar size={18} /> },
    { id: "timesheet", label: "Timesheet", icon: <Clock size={18} /> }
  ];
  
  const employees = [
    { id: "EMP001", name: "Alex Johnson" },
    { id: "EMP002", name: "Sarah Williams" },
    { id: "EMP003", name: "Michael Chen" },
    { id: "EMP004", name: "Emily Rodriguez" },
    { id: "EMP005", name: "David Kim" }
  ];
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ""
      });
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.employeeId) {
      errors.employeeId = "Employee is required";
    }
    
    if (!formData.date) {
      errors.date = "Date is required";
    }
    
    return errors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Find employee name from ID
    const employee = employees.find(emp => emp.id === formData.employeeId);
    
    // Determine status based on clock in time
    let status = "present";
    if (!formData.clockInTime) {
      status = "absent";
    } else if (formData.clockInTime > "09:00") {
      status = "late";
    }
    
    const newRecord = {
      id: attendanceRecords.length + 1,
      employeeName: employee.name,
      employeeId: formData.employeeId,
      date: formData.date,
      clockInTime: formData.clockInTime,
      clockOutTime: formData.clockOutTime,
      status: status,
      notes: formData.notes
    };
    
    setAttendanceRecords([...attendanceRecords, newRecord]);
    
    // Reset form
    setFormData({
      employeeId: "",
      date: new Date().toISOString().split("T")[0],
      clockInTime: "",
      clockOutTime: "",
      notes: ""
    });
    
    setShowForm(false);
  };
  
  const toggleRecordDetails = (id) => {
    if (expandedRecord === id) {
      setExpandedRecord(null);
    } else {
      setExpandedRecord(id);
    }
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case "present":
        return <CheckCircle size={16} className="text-green-500" />;
      case "absent":
        return <XCircle size={16} className="text-red-500" />;
      case "late":
        return <AlertCircle size={16} className="text-amber-500" />;
      default:
        return null;
    }
  };
  
  const getStatusClass = (status) => {
    switch (status) {
      case "present":
        return "badge-green";
      case "absent":
        return "badge-red";
      case "late":
        return "badge-yellow";
      default:
        return "";
    }
  };

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-bold mb-2 sm:mb-0">Daily Attendance</h2>
          
          <div className="flex space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary text-white"
                    : "bg-surface-100 text-surface-600 hover:bg-surface-200 dark:bg-surface-700 dark:text-surface-300 dark:hover:bg-surface-600"
                }`}
              >
                {tab.icon}
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          {activeTab === "attendance" && (
            <motion.div
              key="attendance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-surface-500 dark:text-surface-400">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="btn btn-primary flex items-center space-x-2"
                >
                  <Plus size={16} />
                  <span>Record Attendance</span>
                </button>
              </div>
              
              <AnimatePresence>
                {showForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-6 overflow-hidden"
                  >
                    <div className="p-4 border border-surface-200 dark:border-surface-700 rounded-lg bg-surface-50 dark:bg-surface-800">
                      <h3 className="text-lg font-medium mb-4">Record New Attendance</h3>
                      
                      <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Employee
                            </label>
                            <select
                              name="employeeId"
                              value={formData.employeeId}
                              onChange={handleInputChange}
                              className={`input-field ${formErrors.employeeId ? "border-red-500 dark:border-red-500" : ""}`}
                            >
                              <option value="">Select Employee</option>
                              {employees.map((employee) => (
                                <option key={employee.id} value={employee.id}>
                                  {employee.name}
                                </option>
                              ))}
                            </select>
                            {formErrors.employeeId && (
                              <p className="text-red-500 text-xs mt-1">{formErrors.employeeId}</p>
                            )}
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Date
                            </label>
                            <input
                              type="date"
                              name="date"
                              value={formData.date}
                              onChange={handleInputChange}
                              className={`input-field ${formErrors.date ? "border-red-500 dark:border-red-500" : ""}`}
                            />
                            {formErrors.date && (
                              <p className="text-red-500 text-xs mt-1">{formErrors.date}</p>
                            )}
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Clock In Time
                            </label>
                            <input
                              type="time"
                              name="clockInTime"
                              value={formData.clockInTime}
                              onChange={handleInputChange}
                              className="input-field"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1">
                              Clock Out Time
                            </label>
                            <input
                              type="time"
                              name="clockOutTime"
                              value={formData.clockOutTime}
                              onChange={handleInputChange}
                              className="input-field"
                            />
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-sm font-medium mb-1">
                            Notes
                          </label>
                          <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            rows="3"
                            className="input-field"
                            placeholder="Add any additional notes..."
                          ></textarea>
                        </div>
                        
                        <div className="flex justify-end space-x-3">
                          <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="btn btn-outline"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="btn btn-primary"
                          >
                            Save Record
                          </button>
                        </div>
                      </form>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-surface-100 dark:bg-surface-800">
                      <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                        Employee
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                        Clock In
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                        Clock Out
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-200 dark:divide-surface-700">
                    {attendanceRecords.map((record) => (
                      <React.Fragment key={record.id}>
                        <tr className="hover:bg-surface-50 dark:hover:bg-surface-800/60 transition-colors">
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-light to-accent flex items-center justify-center text-white font-medium text-sm">
                                {record.employeeName.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium">{record.employeeName}</div>
                                <div className="text-xs text-surface-500 dark:text-surface-400">{record.employeeId}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm">
                              {new Date(record.date).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm">
                              {record.clockInTime || "—"}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm">
                              {record.clockOutTime || "—"}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className={`badge flex items-center space-x-1 ${getStatusClass(record.status)}`}>
                              {getStatusIcon(record.status)}
                              <span className="capitalize">{record.status}</span>
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-right">
                            <button
                              onClick={() => toggleRecordDetails(record.id)}
                              className="text-surface-500 hover:text-primary dark:text-surface-400 dark:hover:text-primary-light"
                            >
                              {expandedRecord === record.id ? (
                                <ChevronUp size={18} />
                              ) : (
                                <ChevronDown size={18} />
                              )}
                            </button>
                          </td>
                        </tr>
                        
                        <AnimatePresence>
                          {expandedRecord === record.id && (
                            <motion.tr
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <td colSpan="6" className="px-4 py-4 bg-surface-50 dark:bg-surface-800/40">
                                <div className="text-sm">
                                  <div className="font-medium mb-2">Additional Details</div>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                      <div className="text-surface-500 dark:text-surface-400 text-xs mb-1">
                                        Work Duration
                                      </div>
                                      <div>
                                        {record.clockInTime && record.clockOutTime ? (
                                          calculateDuration(record.clockInTime, record.clockOutTime)
                                        ) : (
                                          "Not available"
                                        )}
                                      </div>
                                    </div>
                                    
                                    <div>
                                      <div className="text-surface-500 dark:text-surface-400 text-xs mb-1">
                                        Department
                                      </div>
                                      <div>
                                        {record.employeeName === "Alex Johnson" ? "Engineering" :
                                         record.employeeName === "Sarah Williams" ? "Marketing" :
                                         record.employeeName === "Michael Chen" ? "Design" :
                                         record.employeeName === "Emily Rodriguez" ? "HR" :
                                         "Finance"}
                                      </div>
                                    </div>
                                    
                                    <div>
                                      <div className="text-surface-500 dark:text-surface-400 text-xs mb-1">
                                        Notes
                                      </div>
                                      <div>
                                        {record.notes || "No notes available"}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </motion.tr>
                          )}
                        </AnimatePresence>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
          
          {activeTab === "timesheet" && (
            <motion.div
              key="timesheet"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center py-12"
            >
              <div className="text-center">
                <div className="mb-4">
                  <Clock size={48} className="mx-auto text-surface-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">Timesheet Feature</h3>
                <p className="text-surface-500 dark:text-surface-400 max-w-md mx-auto">
                  The timesheet feature is coming soon. You'll be able to view and manage detailed time records for all employees.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Helper function to calculate duration between two time strings
const calculateDuration = (startTime, endTime) => {
  const [startHours, startMinutes] = startTime.split(':').map(Number);
  const [endHours, endMinutes] = endTime.split(':').map(Number);
  
  let durationMinutes = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);
  
  if (durationMinutes < 0) {
    durationMinutes += 24 * 60; // Add a day if end time is on the next day
  }
  
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  
  return `${hours}h ${minutes}m`;
};

export default MainFeature;