import React, { createContext, useState, useContext, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { useRouter, useSegments } from "expo-router";
import api from "../services/api";

// Create the context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const router = useRouter();
  const segments = useSegments();

  // Check if user is authenticated on mount for demo purposes
  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Get token from secure storage
        const token = await SecureStore.getItemAsync("auth_token");

        if (token) {
          // For demo, instead of fetching from API, create a mock user
          const mockUser = {
            id: "123456",
            name: "John Doe",
            email: "student@university.edu",
            role: "student",
          };

          setUser(mockUser);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        // Clear token on error
        await SecureStore.deleteItemAsync("auth_token");
        await SecureStore.deleteItemAsync("refresh_token");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  //   // Check if user is authenticated on mount
  //   useEffect(() => {
  //     const checkAuth = async () => {
  //       try {
  //         // Get token from secure storage
  //         const token = await SecureStore.getItemAsync("auth_token");

  //         if (token) {
  //           // Fetch user info with the token
  //           const response = await api.get("/auth/me");

  //           if (response.data && response.data.user) {
  //             setUser(response.data.user);
  //           } else {
  //             // Something went wrong, clear the token
  //             await SecureStore.deleteItemAsync("auth_token");
  //             await SecureStore.deleteItemAsync("refresh_token");
  //             setUser(null);
  //           }
  //         } else {
  //           setUser(null);
  //         }
  //       } catch (error) {
  //         console.error("Auth check failed:", error);
  //         // Clear token on error
  //         await SecureStore.deleteItemAsync("auth_token");
  //         await SecureStore.deleteItemAsync("refresh_token");
  //         setUser(null);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };

  //     checkAuth();
  //   }, []);

  // Protect routes based on auth states for demo purposes
  useEffect(() => {
    if (!isLoading) {
      const inAuthGroup = segments[0] === "(auth)";

      if (!user && !inAuthGroup) {
        // If not logged in and not on an auth screen, redirect to login
        router.replace("/login");
      } else if (user && inAuthGroup) {
        // If logged in and on an auth screen, redirect to app
        router.replace("/(app)/");
      }
    }
  }, [user, segments, isLoading, router]);

  // Protect routes based on auth status
  //   useEffect(() => {
  //     if (!isLoading) {
  //       const inAuthGroup = segments[0] === "(auth)";

  //       if (!user && !inAuthGroup) {
  //         // If not logged in and not on an auth screen, redirect to login
  //         router.replace("/login");
  //       } else if (user && inAuthGroup) {
  //         // If logged in and on an auth screen, redirect to app
  //         router.replace("/");
  //       }
  //     }
  //   }, [user, segments, isLoading, router]);

  // Login function for demo purposes
  // Login function
  const login = async (email, password) => {
    setIsLoading(true);
    setAuthError(null);

    try {
      // For demo purposes, we'll bypass the API call and accept any credentials
      // In a real app, this would validate against a backend
      console.log("Login attempt with:", email, password);

      // Simple validation
      if (!email.includes("@") || password.length < 4) {
        throw new Error("Invalid credentials");
      }

      // Mock successful login
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay

      // Mock user data
      const mockUser = {
        id: "123456",
        name: "John Doe",
        email: email,
        role: "student",
      };

      // Set user in state
      setUser(mockUser);

      // Store a dummy token
      await SecureStore.setItemAsync("auth_token", "mock_token_123456");

      // Navigate to app home
      router.replace("/(app)/");
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      setAuthError(error.message || "Login failed. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Login function
  //   const login = async (email, password) => {
  //     setIsLoading(true);
  //     setAuthError(null);

  //     try {
  //       const response = await api.post("/auth/login", { email, password });

  //       if (response.data && response.data.token) {
  //         // Store tokens securely
  //         await SecureStore.setItemAsync("auth_token", response.data.token);

  //         if (response.data.refresh_token) {
  //           await SecureStore.setItemAsync(
  //             "refresh_token",
  //             response.data.refresh_token
  //           );
  //         }

  //         // Fetch user info
  //         const userResponse = await api.get("/auth/me");
  //         setUser(userResponse.data.user);

  //         // Navigate to app home
  //         router.replace("/");
  //         return true;
  //       } else {
  //         throw new Error("Invalid login response");
  //       }
  //     } catch (error) {
  //       console.error("Login failed:", error);
  //       setAuthError(
  //         error.response?.data?.message || "Login failed. Please try again."
  //       );
  //       return false;
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  // Logout function
  const logout = async () => {
    setIsLoading(true);

    try {
      // Call logout endpoint if available
      try {
        await api.post("/auth/logout");
      } catch (logoutError) {
        // Continue even if logout API fails
        console.warn("Logout API call failed:", logoutError);
      }

      // Clear tokens
      await SecureStore.deleteItemAsync("auth_token");
      await SecureStore.deleteItemAsync("refresh_token");

      // Clear user state
      setUser(null);

      // Navigate to login
      router.replace("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Password recovery function
  const recoverPassword = async (email) => {
    setIsLoading(true);
    setAuthError(null);

    try {
      await api.post("/auth/recover-password", { email });
      return true;
    } catch (error) {
      console.error("Password recovery failed:", error);
      setAuthError(
        error.response?.data?.message ||
          "Password recovery failed. Please try again."
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        authError,
        login,
        logout,
        recoverPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
