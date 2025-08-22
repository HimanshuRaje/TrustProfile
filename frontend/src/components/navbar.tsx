import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">TrustProfile</h1>
        <ul className="flex space-x-6 text-gray-700 font-medium">
          <li><Link to="#news" className="hover:text-indigo-600">News</Link></li>
          <li><Link to="#blog" className="hover:text-indigo-600">Blog</Link></li>
          <li><Link to="#about" className="hover:text-indigo-600">About Us</Link></li>
          <li><Link to="#campaigns" className="hover:text-indigo-600">Campaigns</Link></li>
          <li><Link to="#contact" className="hover:text-indigo-600">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
}
