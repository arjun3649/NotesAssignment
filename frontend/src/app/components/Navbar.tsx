"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Menu, X, User, LogOut } from "lucide-react";
import Portal from "./Portal";
import Signup from "./Signup";
import SignIn from "./Signin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, signup } from "../../../api/user";
import { useRouter } from "next/navigation";
import useAuthStore from "../../store/authStore";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { isAuthenticated, logout } = useAuthStore();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(isAuthenticated);
  }, [isAuthenticated]);

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setShowSignIn(false);
      router.refresh();
    },
    onError: (error) => {
      console.error("Login error:", error);
      throw error;
    },
  });

  const signupMutation = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      setShowSignUp(false);
      setShowSignIn(true);
    },
    onError: (error) => {
      console.error("Signup error:", error);
      throw error;
    },
  });

  const handleSignInSubmit = async (email:{email:string}, password:{password:string}) => {
    await loginMutation.mutateAsync({ user_email: email, password: password });
  };

  const handleSignUpSubmit = async (
    username:{usernamme:string},
    email:{email:string},
    password:{password:string}
  ) => {
    await signupMutation.mutateAsync({
      user_name: username,
      user_email: email,
      password: password,
    });
  };

  const handleLogout = () => {
    logout();
    queryClient.clear();
    router.push("/");
  };

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl group-hover:from-blue-700 group-hover:to-indigo-700 transition-all duration-200">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Notes App
                </h1>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-4">
              {isAuth ? (
                <>
                  <div className="relative">
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    </button>

                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-10">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign out</span>
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setShowSignIn(true)}
                    className="text-gray-700 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setShowSignUp(true)}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4 animate-fade-in">
              {isAuth ? (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign out</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setShowSignIn(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      setShowSignUp(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="block px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg mx-4 text-center font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {isUserMenuOpen && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsUserMenuOpen(false)}
          />
        )}
      </nav>

      <Portal show={showSignUp} onClose={() => setShowSignUp(false)}>
        <Signup
          onSignIn={() => {
            setShowSignUp(false);
            setShowSignIn(true);
          }}
          onSubmit={handleSignUpSubmit}
        />
      </Portal>

      <Portal show={showSignIn} onClose={() => setShowSignIn(false)}>
        <SignIn
          onSignUp={() => {
            setShowSignIn(false);
            setShowSignUp(true);
          }}
          onSubmit={handleSignInSubmit}
        />
      </Portal>
    </>
  );
}
