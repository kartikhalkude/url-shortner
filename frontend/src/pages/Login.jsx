import React from "react";
import Input from "../components/Input";
import Button from "../components/Button";

const Login = () => {
  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-red-600">URL SHORTENER</h1>

          <h2 className="mt-4 text-2xl font-semibold">Welcome Back</h2>

          <p className="mt-2 text-gray-500">Sign in to continue</p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          <Input label="Email" type="email" placeholder="Enter your email" />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
          />

          <Button text="Sign In" type="submit" />

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="./register"
              className="font-medium text-red-600 hover:underline"
            >
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
