import React from "react";
import Input from "../components/Input";
import Button from "../components/Button";

const Register = () => {
  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-red-600">URL SHORTENER</h1>

          <h2 className="text-2xl font-semibold mt-4">Create Account</h2>

          <p className="text-gray-500 mt-2">
            Register to start shortening your URLs
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
          />

          <Input label="Email" type="email" placeholder="Enter your email" />

          <Input
            label="Password"
            type="password"
            placeholder="Create a password"
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
          />

          <Button text="Create Account" type="submit" />

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-red-600 font-medium hover:underline"
            >
              Sign In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
