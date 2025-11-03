import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function EditarProducto() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [producto, setProducto] = useState<any>(null);
    const [guardando, setGuardando] = useState(false);

    useEffect(() => {
        fetch(`http://192.168.0.151/ProyectoFinal/backend/producto.php?id=${id}`)
            .then((res) => res.json())
            .then((data) => setProducto(data))
            .catch((err) => console.error("❌ Error al cargar producto:", err));
    }, [id]);

    const seleccionarImagen = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.8,
            base64: true, // ✅ necesario para el modo base64
        });

        if (!result.canceled) {
            const asset = result.assets[0];
            const uri = asset.uri;
            const isWeb = uri.startsWith("data:image"); // base64 en web

            try {
                let res;

                if (isWeb || asset.base64) {
                    // ✅ Expo Web / base64
                    const imagenBase64 = asset.base64
                        ? `data:image/jpeg;base64,${asset.base64}`
                        : uri;

                    res = await fetch(
                        "http://192.168.0.151/ProyectoFinal/backend/subir_imagen.php",
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ imagen: imagenBase64 }),
                        }
                    );
                } else {
                    // ✅ Android / iOS
                    const nombreArchivo = uri.split("/").pop() || "imagen.jpg";
                    const tipo = nombreArchivo.endsWith(".png") ? "image/png" : "image/jpeg";

                    const formData = new FormData();
                    formData.append("imagen", {
                        uri,
                        name: nombreArchivo,
                        type: tipo,
                    } as any);

                    res = await fetch(
                        "http://192.168.0.151/ProyectoFinal/backend/subir_imagen.php",
                        {
                            method: "POST",
                            body: formData,
                        }
                    );
                }

                const text = await res.text();
                console.log("🔹 Respuesta del backend:", text);

                const data = JSON.parse(text);
                if (data.status === 200) {
                    setProducto({ ...producto, imagen: data.url });
                    Alert.alert("Éxito", "Imagen actualizada correctamente");
                } else {
                    Alert.alert("Error", data.message || "No se pudo subir la imagen");
                }
            } catch (error) {
                console.error("❌ Error al subir imagen:", error);
                Alert.alert("Error", "No se pudo subir la imagen");
            }
        }
    };

    const handleGuardar = async () => {
        if (!producto) return;

        setGuardando(true);
        try {
            const res = await fetch(
                "http://192.168.0.151/ProyectoFinal/backend/editar_producto.php",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        ...producto,
                        id_producto: id,
                        id_categoria: producto.id_categoria || 1,
                        stock: producto.stock || 0,
                    }),
                }
            );

            const text = await res.text();
            console.log("🔹 Respuesta backend:", text);

            const data = JSON.parse(text);
            if (data.status === 200) {
                Alert.alert("Éxito", "Producto actualizado correctamente");
                router.replace("../screens/StoreScreen");
            } else {
                Alert.alert("Error", data.message || "No se pudo actualizar");
            }
        } catch (err) {
            console.error("❌ Error al guardar:", err);
        } finally {
            setGuardando(false);
        }
    };

    if (!producto) {
        return <Text style={{ padding: 20 }}>Cargando producto...</Text>;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Editar Producto</Text>

            <TextInput
                placeholder="Nombre"
                value={producto.nombre}
                onChangeText={(text) => setProducto({ ...producto, nombre: text })}
                style={styles.input}
            />
            <TextInput
                placeholder="Precio"
                value={String(producto.precio)}
                onChangeText={(text) => setProducto({ ...producto, precio: text })}
                keyboardType="numeric"
                style={styles.input}
            />
            <TextInput
                placeholder="Descripción"
                value={producto.descripcion}
                onChangeText={(text) => setProducto({ ...producto, descripcion: text })}
                multiline
                style={[styles.input, { height: 100 }]}
            />

            <View style={styles.imageSection}>
                <Image
                    source={{
                        uri: producto.imagen || "https://placehold.co/300x300?text=Sin+imagen",
                    }}
                    style={styles.previewImage}
                />

                <TouchableOpacity
                    style={styles.imageOverlayButton}
                    onPress={seleccionarImagen}
                >
                    <Text style={styles.imageOverlayText}>📷 Cambiar imagen</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleGuardar}>
                <Text style={styles.buttonText}>
                    {guardando ? "Guardando..." : "Guardar cambios"}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, flexGrow: 1, backgroundColor: "#fff" },
    title: { fontSize: 24, fontWeight: "bold", color: "#c47719", marginBottom: 20 },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    previewImage: { width: "100%", height: 200, borderRadius: 10 },
    button: {
        backgroundColor: "#c47719",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
    imageSection: { marginBottom: 20, position: "relative" },
    imageOverlayButton: {
        position: "absolute",
        bottom: 10,
        right: 10,
        backgroundColor: "#00000099",
        padding: 8,
        borderRadius: 6,
    },
    imageOverlayText: { color: "#fff", fontWeight: "bold" },
});
