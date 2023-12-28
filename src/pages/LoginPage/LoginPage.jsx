import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { login } from "../../redux/actions/authActions";
import { ToastContainer } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    if (!email) {
      setErrorMessage("Silahkan isi email anda");
      return;
    }

    if (!password) {
      setErrorMessage("Silahkan isi password anda");
      return;
    }

    // Jika Remember Me dicentang, simpan email dan password di localStorage!!
    if (rememberMe) {
      localStorage.setItem("rememberedEmail", email);
      localStorage.setItem("rememberedPassword", password);
    } else {
      // Jika Remember Me tidak dicentang, hapus data dari localStorage
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedPassword");
    }

    dispatch(login(email, password, navigate));
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    const rememberedPassword = localStorage.getItem("rememberedPassword");

    if (rememberedEmail && rememberedPassword) {
      setEmail(rememberedEmail);
      setPassword(rememberedPassword);
      setRememberMe(true);
    }
  }, []);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen py-20 bg-[#F3F7FB]">
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          {/* Left Slide */}
          <div className="flex flex-col justify-center p-8 md:p-14">
            <span className="mb-3 text-4xl font-bold font-poppins text-center">Login</span>
            <span className="font-poppins text-gray-400 mb-8 text-center">
              Welcome back! please enter your details
            </span>
            <form onSubmit={handleLogin}>
              <div className="py-1">
                {/* <span className="mb-2 text-sm font-poppins">Email</span> */}
                <input
                  type="email"
                  id="email"
                  className="font-poppins text-xs w-full p-2 border border-gray-300 rounded-md placeholder:font-poppins placeholder:text-gray-500"
                  placeholder="Email"
                  value={email}
                  // onChange={(event) => setEmail(event.target.value)}
                  // required
                  onChange={(event) => {
                    setEmail(event.target.value);
                    // Hapus pesan kesalahan saat pengguna mulai mengetik ulang
                    setErrorMessage("");
                  }}
                  required
                />
              </div>
              <div className="py-1 relative">
                {/* <span className="mb-2 text-sm font-poppins">Password</span> */}
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="text-xs w-full p-2 border border-gray-300 rounded-md placeholder:font-poppins placeholder:text-gray-500"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    // Hapus pesan kesalahan saat pengguna mulai mengetik ulang
                    setErrorMessage("");
                  }}
                />
                <button
                  type="button"
                  aria-label="toggle password visibility"
                  onClick={togglePassword}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 px-1 py-2"
                >
                  {showPassword ? (
                    <FiEye className="border-none" />
                  ) : (
                    <FiEyeOff className="border-none" />
                  )}
                </button>
              </div>
              {errorMessage && <p className="text-red-500 text-xs mb-2">{errorMessage}</p>}
              <div className="flex justify-between w-full py-4">
                <label className="flex items-center text-xs font-poppins">
                  <input
                    type="checkbox"
                    name="remember"
                    id="ch"
                    className="mr-1 font-poppins"
                    checked={rememberMe}
                    onChange={handleRememberMe}
                  />
                  Remember me
                </label>
                <Link to={"/verify-email"} className="font-poppins text-xs">
                  Forgot Password?
                </Link>
              </div>
              <button className="w-full bg-[#003E9C] text-white p-2 rounded-lg mb-2 hover:bg-black hover:text-white hover:border hover:border-gray-300">
                Sign in
              </button>
            </form>

            <p className="text-gray-400 mb-2 text-center text-sm underline">or use another login</p>
            <button className="w-full border border-gray-300 text-md p-1 mb-2 rounded-lg hover:bg-black hover:text-white">
              <FcGoogle className="w-6 h-6 inline mr-2" />
              Sign in with Google
            </button>
            <p className="mt-2 text-gray-400 text-sm text-center">
              Dont have an account ? &nbsp;
              <Link to={"/register"} className="underline text-red-500">
                Sign up
              </Link>
            </p>
          </div>
          <div className="relative mr-12 pt-20 drop-shadow-lg hidden md:block">
            <svg width="347" height="334" viewBox="0 0 347 334" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="173.033" cy="166.521" rx="173.033" ry="166.521" fill="#F3F7FB" />
              <path d="M179.535 214.718H129.628C128.119 214.78 126.641 215.157 125.298 215.824C123.954 216.49 122.776 217.43 121.844 218.579L67.9165 270.563C66.2178 272.203 64.7556 275.068 61.8743 274.072C58.993 273.075 59.9821 269.919 59.9821 267.657C59.9821 252.107 59.9821 236.516 59.8531 220.966C59.7428 218.736 60.1334 216.509 60.9981 214.437C61.8629 212.366 63.1814 210.5 64.8631 208.967C88.7021 186.213 112.391 163.37 135.928 140.437C140.508 136.015 141.476 136.139 145.217 141.413C151.109 149.717 157.108 157.834 162.763 166.325C165.537 170.477 167.537 170.477 171.171 166.969C191.254 147.184 211.595 127.69 231.786 108.154C239.763 100.452 247.784 92.8124 255.718 85.0688C258.707 82.1831 261.287 81.8924 264.319 85.1933C279.65 102.155 287.133 121.607 284.897 144.277C282.102 172.927 266.942 193.604 241.032 207.161C232.325 211.989 222.474 214.564 212.434 214.634C201.511 214.51 190.588 214.634 179.643 214.634L179.535 214.718Z" fill="#003E9C" />
              <path d="M138.378 59.8612C158.639 59.8612 178.901 60.0891 199.14 59.8612C212.628 59.4563 226.043 61.9112 238.437 67.0523C243.083 69.0211 243.729 70.5961 240.158 74.0776C223.467 90.2698 206.755 106.407 190.021 122.488C184.342 127.98 178.492 133.306 172.943 138.943C170.06 141.865 168.254 141.015 166.21 138.218C159.758 129.306 153.111 120.519 146.852 111.525C144.4 108.044 142.744 107.733 139.518 110.883C115.327 134.37 91.0438 157.808 66.667 181.198C65.57 182.255 64.6451 183.955 62.7738 183.478C60.9026 183.001 61.3327 180.95 60.9026 179.541C59.2894 174.36 61.1822 169.179 61.1607 164.081C60.9456 132.145 61.0101 100.19 61.0101 68.2543C61.0101 60.6072 61.6769 59.9648 69.6137 59.9648C92.5135 59.8957 115.435 59.8612 138.378 59.8612Z" fill="#0065FF" />
              <path d="M84.5717 274C84.6837 274 84.7877 273.888 84.8837 273.664C84.9957 273.44 85.0517 273.072 85.0517 272.56V261.04C85.0517 260.528 84.9957 260.168 84.8837 259.96C84.7717 259.736 84.6597 259.616 84.5477 259.6H92.4197C93.7797 259.6 94.8757 259.8 95.7077 260.2C96.5557 260.584 97.1797 261.144 97.5797 261.88C97.9797 262.6 98.1797 263.464 98.1797 264.472C98.1797 265.496 97.9797 266.384 97.5797 267.136C97.1797 267.872 96.5557 268.44 95.7077 268.84C94.8757 269.224 93.7797 269.416 92.4197 269.416H88.7477V272.56C88.7477 273.072 88.8037 273.44 88.9157 273.664C89.0277 273.888 89.1397 274 89.2517 274H84.5717ZM89.7317 266.776H90.9317C91.8757 266.776 92.6037 266.696 93.1157 266.536C93.6437 266.376 94.0117 266.128 94.2197 265.792C94.4277 265.456 94.5317 265.016 94.5317 264.472C94.5317 263.944 94.4197 263.52 94.1957 263.2C93.9877 262.88 93.6357 262.656 93.1397 262.528C92.6597 262.384 92.0037 262.312 91.1717 262.312H89.7317C89.2357 262.312 88.9477 262.344 88.8677 262.408C88.7877 262.456 88.7477 262.64 88.7477 262.96V266.104C88.7477 266.424 88.7877 266.616 88.8677 266.68C88.9477 266.744 89.2357 266.776 89.7317 266.776ZM100.227 274C100.339 274 100.451 273.888 100.563 273.664C100.675 273.44 100.731 273.072 100.731 272.56V261.04C100.731 260.528 100.675 260.168 100.563 259.96C100.451 259.736 100.339 259.616 100.227 259.6H114.243V260.32L114.723 263.104C114.323 262.928 113.619 262.744 112.611 262.552C111.603 262.344 110.387 262.24 108.963 262.24H105.411C104.931 262.24 104.643 262.28 104.547 262.36C104.467 262.424 104.427 262.624 104.427 262.96V264.736C104.427 265.088 104.467 265.296 104.547 265.36C104.643 265.424 104.923 265.456 105.387 265.456H108.843C109.771 265.456 110.515 265.408 111.075 265.312C111.651 265.2 112.027 265.088 112.203 264.976C112.139 265.28 112.067 265.632 111.987 266.032C111.907 266.432 111.843 266.816 111.795 267.184C111.747 267.552 111.723 267.856 111.723 268.096H105.387C104.923 268.096 104.643 268.128 104.547 268.192C104.467 268.24 104.427 268.448 104.427 268.816V270.592C104.427 270.96 104.467 271.176 104.547 271.24C104.627 271.304 104.907 271.336 105.387 271.336H111.867C112.795 271.336 113.539 271.232 114.099 271.024C114.675 270.8 115.051 270.584 115.227 270.376L114.747 273.256V274H100.227ZM116.915 274C117.027 274 117.139 273.888 117.251 273.664C117.363 273.44 117.419 273.072 117.419 272.56V261.04C117.419 260.528 117.363 260.168 117.251 259.96C117.139 259.736 117.027 259.616 116.915 259.6H124.451C125.859 259.6 127.043 259.736 128.003 260.008C128.963 260.28 129.731 260.656 130.307 261.136C130.899 261.616 131.347 262.168 131.651 262.792C131.955 263.4 132.155 264.048 132.251 264.736C132.363 265.424 132.419 266.12 132.419 266.824C132.419 267.464 132.363 268.128 132.251 268.816C132.155 269.488 131.947 270.136 131.627 270.76C131.323 271.368 130.875 271.92 130.283 272.416C129.707 272.896 128.939 273.28 127.979 273.568C127.035 273.856 125.859 274 124.451 274H116.915ZM122.075 271.336H123.059C124.435 271.336 125.539 271.224 126.371 271C127.203 270.76 127.811 270.328 128.195 269.704C128.579 269.08 128.771 268.176 128.771 266.992V266.56C128.771 265.312 128.595 264.392 128.243 263.8C127.891 263.192 127.299 262.792 126.467 262.6C125.635 262.408 124.499 262.312 123.059 262.312H122.075C121.611 262.312 121.331 262.344 121.235 262.408C121.155 262.456 121.115 262.648 121.115 262.984V270.616C121.115 270.968 121.155 271.176 121.235 271.24C121.331 271.304 121.611 271.336 122.075 271.336ZM139.699 274.24C138.339 274.24 137.139 274.112 136.099 273.856C135.075 273.6 134.331 273.352 133.867 273.112L134.347 269.92V269.2C134.635 269.536 135.027 269.896 135.523 270.28C136.019 270.648 136.587 270.96 137.227 271.216C137.883 271.472 138.563 271.6 139.267 271.6C139.971 271.6 140.499 271.4 140.851 271C141.219 270.6 141.403 269.92 141.403 268.96V261.04C141.403 260.528 141.347 260.168 141.235 259.96C141.123 259.736 141.011 259.616 140.899 259.6H145.603C145.491 259.6 145.379 259.712 145.267 259.936C145.155 260.16 145.099 260.536 145.099 261.064V268.96C145.099 270.368 144.875 271.456 144.427 272.224C143.995 272.976 143.371 273.504 142.555 273.808C141.755 274.096 140.803 274.24 139.699 274.24ZM155.317 274.24C153.701 274.24 152.373 273.984 151.333 273.472C150.293 272.96 149.525 272.224 149.029 271.264C148.533 270.288 148.285 269.128 148.285 267.784V261.016C148.285 260.504 148.229 260.144 148.117 259.936C148.021 259.712 147.917 259.6 147.805 259.6H152.413C152.301 259.616 152.189 259.728 152.077 259.936C151.981 260.144 151.933 260.504 151.933 261.016V267.736C151.933 268.76 152.077 269.552 152.365 270.112C152.653 270.672 153.053 271.056 153.565 271.264C154.077 271.472 154.669 271.576 155.341 271.576H155.605C156.133 271.576 156.597 271.52 156.997 271.408C157.413 271.296 157.757 271.104 158.029 270.832C158.317 270.56 158.533 270.176 158.677 269.68C158.837 269.168 158.917 268.52 158.917 267.736V261.016C158.917 260.504 158.861 260.144 158.749 259.936C158.653 259.712 158.549 259.6 158.437 259.6H163.045C162.933 259.616 162.821 259.736 162.709 259.96C162.613 260.168 162.565 260.528 162.565 261.04V267.784C162.565 269.128 162.309 270.288 161.797 271.264C161.301 272.224 160.533 272.96 159.493 273.472C158.469 273.984 157.157 274.24 155.557 274.24H155.317ZM163.011 274C163.091 274 163.211 273.888 163.371 273.664C163.547 273.44 163.747 273.064 163.971 272.536C164.083 272.296 164.259 271.888 164.499 271.312C164.755 270.72 165.043 270.04 165.363 269.272C165.699 268.488 166.043 267.672 166.395 266.824C166.763 265.976 167.107 265.16 167.427 264.376C167.763 263.592 168.051 262.904 168.291 262.312C168.547 261.72 168.723 261.296 168.819 261.04C169.027 260.528 169.139 260.16 169.155 259.936C169.171 259.712 169.139 259.6 169.059 259.6H174.291C174.227 259.6 174.203 259.712 174.219 259.936C174.235 260.144 174.347 260.512 174.555 261.04C174.651 261.296 174.819 261.72 175.059 262.312C175.299 262.888 175.579 263.568 175.899 264.352C176.219 265.12 176.555 265.928 176.907 266.776C177.259 267.624 177.595 268.44 177.915 269.224C178.235 269.992 178.523 270.672 178.779 271.264C179.035 271.856 179.219 272.28 179.331 272.536C179.571 273.064 179.803 273.44 180.027 273.664C180.251 273.888 180.419 274 180.531 274H175.083C175.211 273.984 175.315 273.864 175.395 273.64C175.491 273.4 175.491 273.032 175.395 272.536C175.379 272.424 175.363 272.336 175.347 272.272C175.331 272.192 175.299 272.08 175.251 271.936C175.187 271.696 175.115 271.528 175.035 271.432C174.955 271.32 174.819 271.256 174.627 271.24C174.451 271.224 174.155 271.216 173.739 271.216H169.611C169.179 271.216 168.859 271.232 168.651 271.264C168.443 271.28 168.299 271.336 168.219 271.432C168.139 271.528 168.075 271.688 168.027 271.912C168.011 271.992 167.987 272.096 167.955 272.224C167.939 272.352 167.923 272.456 167.907 272.536C167.795 273.048 167.763 273.416 167.811 273.64C167.875 273.864 167.955 273.984 168.051 274H163.011ZM170.235 268.576H173.043C173.507 268.576 173.763 268.536 173.811 268.456C173.859 268.376 173.835 268.2 173.739 267.928C173.531 267.416 173.323 266.896 173.115 266.368C172.907 265.824 172.707 265.296 172.515 264.784C172.339 264.272 172.179 263.8 172.035 263.368C171.907 262.92 171.795 262.544 171.699 262.24H171.651C171.427 262.832 171.195 263.456 170.955 264.112C170.715 264.768 170.491 265.376 170.283 265.936C170.075 266.496 169.907 266.96 169.779 267.328C169.651 267.68 169.587 267.856 169.587 267.856C169.475 268.112 169.435 268.296 169.467 268.408C169.499 268.52 169.755 268.576 170.235 268.576ZM181.79 274C181.902 274 182.014 273.888 182.126 273.664C182.238 273.44 182.294 273.072 182.294 272.56V261.04C182.294 260.528 182.238 260.168 182.126 259.96C182.014 259.736 181.902 259.616 181.79 259.6H186.494C186.382 259.6 186.35 259.712 186.398 259.936C186.462 260.16 186.726 260.544 187.19 261.088C187.318 261.216 187.526 261.456 187.814 261.808C188.118 262.144 188.478 262.552 188.894 263.032C189.31 263.512 189.75 264.032 190.214 264.592C190.694 265.152 191.174 265.712 191.654 266.272C192.15 266.832 192.622 267.368 193.07 267.88H193.094V261.04C193.094 260.528 193.038 260.168 192.926 259.96C192.814 259.736 192.702 259.616 192.59 259.6H197.294C197.182 259.6 197.07 259.712 196.958 259.936C196.846 260.16 196.79 260.536 196.79 261.064V272.56C196.79 273.072 196.846 273.44 196.958 273.664C197.07 273.888 197.182 274 197.294 274H193.166C193.262 274 193.27 273.888 193.19 273.664C193.126 273.44 192.878 273.056 192.446 272.512C192.222 272.224 191.926 271.856 191.558 271.408C191.19 270.944 190.774 270.432 190.31 269.872C189.862 269.312 189.39 268.728 188.894 268.12C188.398 267.512 187.902 266.92 187.406 266.344C186.926 265.752 186.478 265.208 186.062 264.712H185.99V272.56C185.99 273.072 186.046 273.44 186.158 273.664C186.27 273.888 186.382 274 186.494 274H181.79ZM206.488 274.24C204.312 274.24 202.592 273.64 201.328 272.44C200.08 271.224 199.456 269.36 199.456 266.848C199.456 265.376 199.736 264.08 200.296 262.96C200.856 261.824 201.744 260.944 202.96 260.32C204.176 259.68 205.752 259.36 207.688 259.36C209.208 259.36 210.464 259.44 211.456 259.6C212.464 259.76 213.152 259.92 213.52 260.08V260.8L214 263.44C213.568 263.12 212.808 262.8 211.72 262.48C210.632 262.16 209.304 262 207.736 262C206.664 262 205.784 262.184 205.096 262.552C204.408 262.904 203.904 263.44 203.584 264.16C203.264 264.88 203.104 265.776 203.104 266.848C203.104 268 203.248 268.928 203.536 269.632C203.824 270.32 204.288 270.816 204.928 271.12C205.568 271.424 206.416 271.576 207.472 271.576C208.272 271.576 208.92 271.496 209.416 271.336C209.912 271.16 210.28 270.928 210.52 270.64C210.76 270.336 210.88 270 210.88 269.632V269.248C210.88 268.88 210.848 268.672 210.784 268.624C210.736 268.56 210.528 268.528 210.16 268.528H209.392C208.848 268.528 208.384 268.584 208 268.696C207.616 268.808 207.344 268.92 207.184 269.032L207.424 266.656V265.936H214.984C214.872 265.952 214.76 266.072 214.648 266.296C214.552 266.504 214.504 266.864 214.504 267.376V272.56C214.504 273.072 214.552 273.44 214.648 273.664C214.76 273.888 214.872 274 214.984 274H210.88V273.688L210.928 273.016L210.88 272.968C210.768 273.128 210.544 273.312 210.208 273.52C209.872 273.712 209.4 273.88 208.792 274.024C208.2 274.168 207.432 274.24 206.488 274.24ZM223.157 274C223.269 274 223.373 273.896 223.469 273.688C223.581 273.464 223.637 273.088 223.637 272.56V261.04C223.637 260.528 223.581 260.16 223.469 259.936C223.373 259.712 223.269 259.6 223.157 259.6H227.789C227.677 259.6 227.565 259.712 227.453 259.936C227.341 260.144 227.285 260.52 227.285 261.064V272.56C227.285 273.072 227.341 273.44 227.453 273.664C227.565 273.888 227.677 274 227.789 274H223.157ZM230.188 274C230.3 274 230.412 273.888 230.524 273.664C230.636 273.44 230.692 273.072 230.692 272.56V261.04C230.692 260.528 230.636 260.168 230.524 259.96C230.412 259.736 230.3 259.616 230.188 259.6H234.892C234.78 259.6 234.668 259.712 234.556 259.936C234.444 260.16 234.388 260.536 234.388 261.064V270.592C234.388 270.944 234.428 271.16 234.508 271.24C234.604 271.304 234.892 271.336 235.372 271.336H241.156C242.084 271.336 242.828 271.232 243.388 271.024C243.964 270.8 244.34 270.584 244.516 270.376L243.796 273.256V274H230.188ZM245.962 274C246.074 274 246.186 273.888 246.298 273.664C246.41 273.44 246.466 273.072 246.466 272.56V261.04C246.466 260.528 246.41 260.168 246.298 259.96C246.186 259.736 246.074 259.616 245.962 259.6H251.626C251.53 259.616 251.482 259.744 251.482 259.984C251.498 260.208 251.634 260.576 251.89 261.088C252.002 261.296 252.162 261.624 252.37 262.072C252.594 262.52 252.842 263.04 253.114 263.632C253.402 264.224 253.698 264.856 254.002 265.528C254.322 266.2 254.642 266.872 254.962 267.544C255.282 268.216 255.578 268.848 255.85 269.44H255.874C256.162 268.848 256.466 268.224 256.786 267.568C257.122 266.896 257.45 266.224 257.77 265.552C258.09 264.88 258.394 264.248 258.682 263.656C258.97 263.048 259.218 262.52 259.426 262.072C259.634 261.608 259.786 261.264 259.882 261.04C260.106 260.528 260.226 260.16 260.242 259.936C260.258 259.712 260.226 259.6 260.146 259.6H265.81C265.698 259.6 265.586 259.712 265.474 259.936C265.362 260.16 265.306 260.536 265.306 261.064V272.56C265.306 273.072 265.362 273.44 265.474 273.664C265.586 273.888 265.698 274 265.81 274H261.178C261.29 274 261.394 273.888 261.49 273.664C261.602 273.44 261.658 273.072 261.658 272.56V264.784H261.61C261.354 265.264 261.082 265.792 260.794 266.368C260.506 266.944 260.21 267.528 259.906 268.12C259.618 268.712 259.338 269.288 259.066 269.848C258.794 270.408 258.546 270.92 258.322 271.384C258.098 271.848 257.914 272.24 257.77 272.56C257.546 273.056 257.426 273.416 257.41 273.64C257.41 273.864 257.45 273.984 257.53 274H254.17C254.25 273.984 254.282 273.864 254.266 273.64C254.266 273.416 254.154 273.056 253.93 272.56C253.802 272.272 253.626 271.896 253.402 271.432C253.194 270.968 252.954 270.464 252.682 269.92C252.426 269.36 252.154 268.784 251.866 268.192C251.578 267.584 251.29 266.992 251.002 266.416C250.73 265.824 250.474 265.28 250.234 264.784H250.162V272.56C250.162 273.072 250.218 273.44 250.33 273.664C250.442 273.888 250.554 274 250.666 274H245.962ZM275.716 274.24C274.1 274.24 272.772 273.984 271.732 273.472C270.692 272.96 269.924 272.224 269.428 271.264C268.932 270.288 268.684 269.128 268.684 267.784V261.016C268.684 260.504 268.628 260.144 268.516 259.936C268.42 259.712 268.316 259.6 268.204 259.6H272.812C272.7 259.616 272.588 259.728 272.476 259.936C272.38 260.144 272.332 260.504 272.332 261.016V267.736C272.332 268.76 272.476 269.552 272.764 270.112C273.052 270.672 273.452 271.056 273.964 271.264C274.476 271.472 275.068 271.576 275.74 271.576H276.004C276.532 271.576 276.996 271.52 277.396 271.408C277.812 271.296 278.156 271.104 278.428 270.832C278.716 270.56 278.932 270.176 279.076 269.68C279.236 269.168 279.316 268.52 279.316 267.736V261.016C279.316 260.504 279.26 260.144 279.148 259.936C279.052 259.712 278.948 259.6 278.836 259.6H283.444C283.332 259.616 283.22 259.736 283.108 259.96C283.012 260.168 282.964 260.528 282.964 261.04V267.784C282.964 269.128 282.708 270.288 282.196 271.264C281.7 272.224 280.932 272.96 279.892 273.472C278.868 273.984 277.556 274.24 275.956 274.24H275.716Z" fill="#003E9C" />
            </svg>
            {/* <img
              src="../../src/assets/tampilan.jpg"
              alt=""
              className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
            /> */}
            {/* <div className="absolute hidden bottom-10 right-6 p-6 bg-blue-950 bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
              <span className="text-black text-xl">ayo beli course ini</span>
            </div> */}
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default LoginPage;
