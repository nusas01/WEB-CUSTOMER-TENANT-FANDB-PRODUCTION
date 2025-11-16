import { useEffect } from "react";

export default function CloseEwallet() {
    useEffect(() => {
        const url = sessionStorage.getItem("ewallet_redirect");

        if (url) {
            window.open(url, "_blank"); // buka tab ewallet
        }

        sessionStorage.removeItem("ewallet_redirect");

        window.close(); // sekarang BERHASIL, karena halaman ini dibuka via JS
        window.location.href = "about:blank"; // fallback jika window.close gagal
    }, []);

    return null;
}
