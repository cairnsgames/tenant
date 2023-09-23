import React, { createContext, useState, useEffect } from "react";

type KeyValue = {
  key: string;
  value: string;
};
type TenantType = {
  tenant: string
  config: {
    env: KeyValue[]
  }
}
type TenantProviderType = {
  children: React.ReactNode
  application: string
  config: string
}

// create context
const TenantContext = createContext<TenantType>({ tenant: "", config: {env: []} });

const TenantProvider = ( props: TenantProviderType ) => {
  const { children, config: configFile } = props;

  if (!props.application) {
    throw new Error("TenantProvider: application prop is required");
  }

  useEffect(() => {
    if (!configFile) {
      console.warn("No config file provided");
    }
  }, [configFile]);

  const [tenant, ] = useState(props.application);
  const [config, setConfig] = useState<KeyValue[]>([]);
  const hostname = window.location.hostname;

  const loadConfig = () => {
    // add code here to load config from env (or process.enf if we get webpack working)
    setConfig([])
  }

  if (!config) {
    // debugger;
    loadConfig();
  }

  useEffect(() => {
    loadConfig();
  }, [hostname, props]);  

  return (
    <TenantContext.Provider value={{tenant, config}}>
      {children}
    </TenantContext.Provider>
  );
};

export { TenantContext, TenantProvider };