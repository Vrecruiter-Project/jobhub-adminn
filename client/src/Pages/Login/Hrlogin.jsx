import { useState } from "react";
import { BASE_URL } from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import bg from "../../assets/signin.jpg";
import axios from 'axios';

const Hrlogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');
  const navigate = useNavigate();


  const login = (username, password) => {
    return axios.post(`${BASE_URL}/api/hr/login`, { username, password });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login(username, password);
      if (response.status === 200) {
        onLogin();
        navigate('/hrdashboard');
      }
    } catch (err) {
      setError('Invalid credentials');
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      backgroundImage: `url(${bg})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
    }} className=" rounded-lg py-2">
      <div className="container flex flex-col mx-auto bg-grey-200 rounded-lg  my-2 ">
        <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5">
          <div className="flex items-center justify-center w-full lg:p-12">
            <div className="flex items-center xl:p-10">
              <form onSubmit={handleSubmit} className="flex flex-col w-full h-full pb-6 text-center bg-white p-6  rounded-3xl">
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">Hr Sign In</h3>
                <label htmlFor="email" className="mb-2 mt-8 text-sm text-start text-grey-900">username*</label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter a username" className="bg-amber-100 flex items-center w-full px-5 py-4 mb-7 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl" />
                <label htmlFor="password" className="mb-2 text-sm text-start text-grey-900">Password*</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}

                  id="password" type="password" placeholder="Enter your password" className="bg-amber-100 flex items-center w-full px-5 py-4 mb-5 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl" />
                <button disabled={loading} className="w-full flex items-center bg-green-400  px-5 py-4 mt-5 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl text-center justify-center md:w-96 cursor-pointer "> {loading ? "Signing in..." : "Sign In"}</button>
                <Link
                  className="text-end text-1xl font-medium mt-7 text-gray-600 hover:text-green-500 "
                  to="/"
                >
                  👉 Go back
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>

  );
};

export default Hrlogin;
