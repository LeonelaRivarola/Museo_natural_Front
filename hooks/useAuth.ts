import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export function useAuth() {
    const [user, setUser] = useState<{ nombre: string; rol: string } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const token = await AsyncStorage.getItem("token");
                const nombre = await AsyncStorage.getItem("nombre");
                const rol = await AsyncStorage.getItem("rol");

                const storedUser = await AsyncStorage.getItem("user");
                if (token && storedUser) {
                    const parsed = JSON.parse(storedUser);
                    setUser({ nombre: parsed.nombre, rol: parsed.rol });
                }
                else {
                    setUser(null);
                }
            } catch (err) {
                console.error("Error leyendo sesión:", err);
            } finally {
                setLoading(false);
            }
        };

        checkSession();
    }, []);

    const logout = async () => {
        await AsyncStorage.multiRemove(["token", "nombre", "rol"]);
        setUser(null);
    };

    return { user, loading, logout };
}
