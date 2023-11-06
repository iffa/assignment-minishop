import { ReactNode, createContext, useContext, useState } from "react";

type AuthContextType = {
  customerId: string;
  setCustomerId: (customerId: string) => void;
};

const AuthContext = createContext<AuthContextType>({
  customerId: "customer-1",
  setCustomerId: () => null,
});

/**
 * Provides auth context to the application.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [customerId, setCustomerId] = useState("customer-1");

  return (
    <AuthContext.Provider value={{ customerId, setCustomerId }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }

  return context;
};
