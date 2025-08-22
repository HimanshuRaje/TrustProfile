import axios from "axios";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

async function handleGetResult() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("❌ No token found. Please log in first.");
      return;
    }

    const res = await axios.get("http://localhost:5000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const checkRole = res.data.role;

    if (checkRole === "admin") {
      alert("✅ You are admin! Dashboard access granted.");
      navigate("/admin");
    }else{
        alert("⚠️ You are not an admin. For Result, Please visit our office inside the medical library.");
    }
  } catch (err: any) {
    alert("⚠️ You are not an admin. For Result, Please visit our office inside the medical library.");
    }
}
 
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      {/* Hero / Welcome Section */}
      <section className="text-center py-20 bg-indigo-50">
        <h2 className="text-4xl font-bold text-indigo-600 mb-4">Welcome to Your Dashboard</h2>
        <p className="text-gray-700 mb-6">Stay updated with news, blogs, campaigns and more.</p>
        <button
          onClick={() => navigate("/take-test")}
          className="px-6 py-3 mr-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition"
        >
          Take Test
        </button>
        <button
          onClick={handleGetResult}
          className="px-6 py-3 ml-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition"
        >
          See Result
        </button>
      </section>

      {/* News Section */}
      <section id="news" className="max-w-7xl mx-auto py-16 px-6">
        <h3 className="text-3xl font-bold text-gray-800 mb-8">News</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h4 className="font-semibold text-lg">News Title 1</h4>
            <p className="text-gray-600 mt-2">Brief description of the news article goes here.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h4 className="font-semibold text-lg">News Title 2</h4>
            <p className="text-gray-600 mt-2">Brief description of the news article goes here.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h4 className="font-semibold text-lg">News Title 3</h4>
            <p className="text-gray-600 mt-2">Brief description of the news article goes here.</p>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="max-w-7xl mx-auto py-16 px-6 bg-indigo-50">
        <h3 className="text-3xl font-bold text-gray-800 mb-8">Blog</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h4 className="font-semibold text-lg">Blog Title 1</h4>
            <p className="text-gray-600 mt-2">Short excerpt from the blog content.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h4 className="font-semibold text-lg">Blog Title 2</h4>
            <p className="text-gray-600 mt-2">Short excerpt from the blog content.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h4 className="font-semibold text-lg">Blog Title 3</h4>
            <p className="text-gray-600 mt-2">Short excerpt from the blog content.</p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="max-w-7xl mx-auto py-16 px-6">
        <h3 className="text-3xl font-bold text-gray-800 mb-4">About Us</h3>
        <p className="text-gray-700">Information about the organization, mission, vision and values.</p>
      </section>

      {/* Campaigns Section */}
      <section id="campaigns" className="max-w-7xl mx-auto py-16 px-6 bg-indigo-50">
        <h3 className="text-3xl font-bold text-gray-800 mb-8">Campaigns</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h4 className="font-semibold text-lg">Campaign 1</h4>
            <p className="text-gray-600 mt-2">Details about this campaign.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h4 className="font-semibold text-lg">Campaign 2</h4>
            <p className="text-gray-600 mt-2">Details about this campaign.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h4 className="font-semibold text-lg">Campaign 3</h4>
            <p className="text-gray-600 mt-2">Details about this campaign.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-7xl mx-auto py-16 px-6">
        <h3 className="text-3xl font-bold text-gray-800 mb-4">Contact</h3>
        <p className="text-gray-700">Contact form or email info can go here.</p>
      </section>
    </div>
  );
}
