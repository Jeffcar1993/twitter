import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import app, { db } from "../../Firebase/config";
import { doc, getDoc } from "firebase/firestore";

const auth = getAuth(app);

// Define la estructura de los datos adicionales del usuario
interface UserData {
  nombre?: string;
  apellido?: string;
  email?: string;
  telefono?: string;
  username?: string;
  imagen?: string;
  descripcion?: string;
  ubicacion?: string;
  // Agrega más propiedades según tu modelo de datos
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  userData: UserData | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  userData: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const docRef = doc(db, "usuarios", currentUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data() as UserData);
          } else {
            console.log("No se encontraron datos adicionales para este usuario.");
          }
        } catch (error) {
          console.error("Error al obtener los datos del usuario:", error);
        }
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
