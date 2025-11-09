import { useEffect } from "react";
import axios from "axios";
import { getAccessToken, getRefreshToken, setTokens, clearTokens, isAuthenticated } from "./auth.js";

const backendApi = import.meta.env.VITE_API + "/api";

export default function useAutoRefresh() {
  useEffect(() => {
    const refreshAccessToken = async () =>{
      const access = getAccessToken();
      const refresh = getRefreshToken();

      if(access && isAuthenticated()) return;

      if(!refresh) {
        clearTokens();
        return;
      }

      try {
        const resp = await axios.post(`${backendApi}/token/refresh/`, { refresh });
        const newAccess = resp.data.access;
        const newRefresh = resp.data.refresh || refresh;
        setTokens({ access: newAccess, refresh: newRefresh });
        console.log("token refreshed automatically");
      } catch(err) {
        console.warn("auto-refresh failed:", err);
        clearTokens();
      }
    };
    refreshAccessToken();
    const interval = setInterval(refreshAccessToken, 2 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);
}
