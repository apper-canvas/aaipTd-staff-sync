import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Plus, Users, Clock, FileText, BarChart3 } from "lucide-react";
import MainFeature from "../components/MainFeature";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const tabs = [
    { id: "all", label: "All Employees" },
    { id: "active", label: "Active" },
    { id: "onboarding", label: "Onboarding" },
    { id: "offboarding", label: "Offboarding" }
  ];
  
  const stats = [
    { 
      id: 1, 
      title: "Total Employees", 
      value: 124, 
      change: "+5%", 
      icon: <Users className="text-blue-500" />,
      color: "bg-blue-50 dark:bg-blue-900/30"
    },
    { 
      id: 2, 
      title: "Attendance Rate", 
      value: "96%", 
      change: "+2%", 
      icon: <Clock className="text-green-500" />,
      color: "bg-green-50 dark:bg-green-900/30"
    },
    { 
      id: 3, 
      title: "Open Requests", 
      value: 8, 
      change: "-3", 
      icon: <FileText className="text-purple-500" />,
      color: "bg-purple-50 dark:bg-purple-900/30"
    },
    { 
      id: 4, 
      title: "Performance", 
      value: "87%", 
      change: "+4%", 
      icon: <BarChart3 className="text-amber-500" />,
      color: "bg-amber-50 dark:bg-amber-900/30"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Employee Dashboard</h1>
          <p className="text-surface-500 dark:text-surface-400">
            Manage your workforce and track key metrics
          </p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <button className="btn btn-primary flex items-center space-x-2">
            <Plus size={18} />
            <span>Add Employee</span>
          </button>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: stat.id * 0.1 }}
            className="card hover:shadow-soft group"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-surface-500 dark:text-surface-400 text-sm font-medium mb-1">
                  {stat.title}
                </p>
                <div className="flex items-baseline">
                  <h3 className="text-2xl font-bold mr-2">{stat.value}</h3>
                  <span className="text-xs font-medium text-green-600 dark:text-green-400">
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${stat.color} group-hover:scale-110 transition-transform duration-200`}>
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Main Feature */}
      <MainFeature />
      
      {/* Employee List Section */}
      <div className="mt-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-xl font-bold mb-4 md:mb-0">Employee Directory</h2>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search employees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" />
            </div>
            
            <button className="btn btn-outline flex items-center justify-center space-x-2">
              <Filter size={18} />
              <span>Filter</span>
            </button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-surface-200 dark:border-surface-700 mb-6">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-primary text-primary dark:border-primary-light dark:text-primary-light"
                    : "border-transparent text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Employee Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-100 dark:bg-surface-800">
                <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-200 dark:divide-surface-700">
              {[
                {
                  id: 1,
                  name: "Alex Johnson",
                  email: "alex.j@staffsync.com",
                  department: "Engineering",
                  position: "Senior Developer",
                  status: "Active"
                },
                {
                  id: 2,
                  name: "Sarah Williams",
                  email: "sarah.w@staffsync.com",
                  department: "Marketing",
                  position: "Marketing Manager",
                  status: "Active"
                },
                {
                  id: 3,
                  name: "Michael Chen",
                  email: "michael.c@staffsync.com",
                  department: "Design",
                  position: "UI/UX Designer",
                  status: "Onboarding"
                },
                {
                  id: 4,
                  name: "Emily Rodriguez",
                  email: "emily.r@staffsync.com",
                  department: "HR",
                  position: "HR Specialist",
                  status: "Active"
                },
                {
                  id: 5,
                  name: "David Kim",
                  email: "david.k@staffsync.com",
                  department: "Finance",
                  position: "Financial Analyst",
                  status: "Offboarding"
                }
              ].map((employee) => (
                <tr 
                  key={employee.id}
                  className="hover:bg-surface-50 dark:hover:bg-surface-800/60 transition-colors"
                >
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-light to-accent flex items-center justify-center text-white font-medium">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium">{employee.name}</div>
                        <div className="text-sm text-surface-500 dark:text-surface-400">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm">{employee.department}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm">{employee.position}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`badge ${
                      employee.status === 'Active' ? 'badge-green' :
                      employee.status === 'Onboarding' ? 'badge-blue' :
                      'badge-yellow'
                    }`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" className="text-primary hover:text-primary-dark dark:hover:text-primary-light">
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;