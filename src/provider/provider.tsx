import React, { createContext, useState } from "react";

type TenantType = {
  tenant: string
  config: any
}
type TenantProviderType = {
  children: React.ReactNode
  application: string
  config: any
}

// create context
const TenantContext = createContext<TenantType>({ tenant: "", config: {}});

const TenantProvider = ( props: TenantProviderType ) => {
  const { children } = props;

  if (!props.application) {
    throw new Error("TenantProvider: application prop is required");
  }

  const [tenant, ] = useState(props.application);
  const [configValue, ] = useState(props.config);

  return (
    <TenantContext.Provider value={{tenant, config: configValue}}>
      {children}
    </TenantContext.Provider>
  );
};

export { TenantContext, TenantProvider }