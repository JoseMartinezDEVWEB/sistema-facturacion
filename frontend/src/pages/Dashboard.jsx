import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown, Bell, User, Layout, Award, Square, Grid, FileText, Form, Menu as MenuIcon, LogOut } from 'lucide-react';
import axios from 'axios';

// Mock data - replace with your API endpoints
const salesData = [
  { month: 'Jan', '2020': 20, '2022': 10 },
  { month: 'Feb', '2020': 40, '2022': 20 },
  { month: 'Mar', '2020': 50, '2022': 40 },
  { month: 'Apr', '2020': 30, '2022': 60 },
  { month: 'May', '2020': 40, '2022': 20 },
  { month: 'Jun', '2020': 50, '2022': 40 },
  { month: 'Jul', '2020': 30, '2022': 60 },
  { month: 'Aug', '2020': 30, '2022': 60 },
  { month: 'Sep', '2020': 40, '2022': 20 },
];

const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated API call
    const fetchFeeds = async () => {
      try {
        // Replace with your API endpoint
        // const response = await axios.get('/api/feeds');
        // setFeeds(response.data);
        setFeeds([
          { id: 1, message: 'Cras justo odio', time: '6 minute ago', type: 'info' },
          { id: 2, message: 'New user registered.', time: '6 minute ago', type: 'success' },
          { id: 3, message: 'Server #1 overloaded.', time: '6 minute ago', type: 'error' },
        ]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching feeds:', error);
        setLoading(false);
      }
    };

    fetchFeeds();
  }, []);

  const handleLogout = async () => {
    try {
      // Replace with your logout endpoint
      // await axios.post('/api/logout');
      // Redirect to login page or handle logout
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-blue-700 rounded-lg"
          >
            <MenuIcon size={24} />
          </button>
          <h1 className="text-xl font-bold">MATERIALPRO</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-blue-700 rounded-lg">
            <Bell size={24} />
          </button>
          <button className="p-2 hover:bg-blue-700 rounded-lg">
            <User size={24} />
          </button>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="w-64 bg-white shadow-lg h-[calc(100vh-64px)]"
            >
              <div className="p-4">
                <div className="flex items-center space-x-2 mb-8">
                  <img
                    src="/api/placeholder/40/40"
                    alt="User"
                    className="rounded-full"
                  />
                  <div>
                    <h2 className="font-semibold">Steave Rojer</h2>
                    <p className="text-sm text-gray-500">Admin</p>
                  </div>
                </div>

                <nav className="space-y-2">
                  {[
                    { icon: Layout, label: 'Dashboard', active: true },
                    { icon: Bell, label: 'Alert' },
                    { icon: Award, label: 'Badges' },
                    { icon: Square, label: 'Buttons' },
                    { icon: FileText, label: 'Cards' },
                    { icon: Grid, label: 'Grid' },
                    { icon: FileText, label: 'Table' },
                    { icon: Form, label: 'Forms' },
                  ].map((item) => (
                    <motion.button
                      key={item.label}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center space-x-2 w-full p-3 rounded-lg ${
                        item.active
                          ? 'bg-cyan-500 text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <item.icon size={20} />
                      <span>{item.label}</span>
                    </motion.button>
                  ))}
                </nav>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <motion.main
          layout
          className="flex-1 p-6"
        >
          {/* Sales Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-sm mb-6"
          >
            <h2 className="text-xl font-semibold mb-2">Sales Summary</h2>
            <p className="text-gray-500 mb-4">Yearly Sales Report</p>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="2020" fill="#2196f3" />
                  <Bar dataKey="2022" fill="#1e88e5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Feeds */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-2">Feeds</h2>
            <p className="text-gray-500 mb-4">Widget you can use</p>
            
            {loading ? (
              <div className="text-center py-4">Loading...</div>
            ) : (
              <div className="space-y-4">
                {feeds.map((feed) => (
                  <motion.div
                    key={feed.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          feed.type === 'info'
                            ? 'bg-blue-100 text-blue-600'
                            : feed.type === 'success'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-red-100 text-red-600'
                        }`}
                      >
                        <Bell size={16} />
                      </div>
                      <span>{feed.message}</span>
                    </div>
                    <span className="text-sm text-gray-500">{feed.time}</span>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.main>
      </div>
    </div>
  );
};

export default Dashboard;