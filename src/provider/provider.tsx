import React, { createContext, useState, useEffect } from "react";

type configValuesType = {
  env: {[key: string]: any[]}
}
type TenantType = {
  tenant: string
  config: configValuesType
}
type TenantProviderType = {
  children: React.ReactNode
  application: string
  config: string
}

// create context
const TenantContext = createContext<TenantType>({ tenant: "", config: {env: {}} });

const TenantProvider = ( props: TenantProviderType ) => {
  const { children, config } = props;

  if (!props.application) {
    throw new Error("TenantProvider: application prop is required");
  }

  useEffect(() => {
    if (!config) {
      console.warn("No config file provided");
    }
  }, [config]);

  const [tenant, ] = useState(props.application);
  const [configValues, setConfigValues] = useState<configValuesType>({env: {}});
  const hostname = window.location.hostname;

  const loadConfig = () => {
    // add code here to load config from env (or process.enf if we get webpack working)
    setConfigValues({ env : {}})
  }

  if (!config) {
    // debugger;
    loadConfig();
  }

  useEffect(() => {
    loadConfig();
  }, [hostname, props]);  

  return (
    <TenantContext.Provider value={{tenant, config: configValues}}>
      {children}
    </TenantContext.Provider>
  );
};

export { TenantContext, TenantProvider };