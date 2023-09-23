import { useContext } from "react";
import { TenantContext } from "./provider";


export const useConfig = () => {
    // get the context
    const context = useContext(TenantContext);
  
    // if `undefined`, throw an error
    if (!context) {
      throw new Error("useUserContext was used outside of its Provider");
    }
    const { config } = context || {};
    config.env = {...config};
  
    return { config, process: config };
  };

export default useConfig;  