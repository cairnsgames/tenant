import React, { createContext, useEffect, useState } from "react";

import 'dotenv/config';

type TenantType = {
  tenant: string
  config: any
  params: any
}
type TenantProviderType = {
  children: React.ReactNode
  application: string
  config: any
  params: any
}

// create context
const TenantContext = createContext<TenantType>({ tenant: "", config: {}, params: []});

const TenantProvider = ( props: TenantProviderType ) => {
  const { children } = props;

  if (!props.application) {
    throw new Error("TenantProvider: application prop is required");
  }

  const [tenant, ] = useState(props.application);
  const [configValue, ] = useState(props.config);
  const [params, setParams] = useState(props.params);

  useEffect(() => {
    fetch(process.env.REACT_APP_TENANT_API + "params.php", {
      headers: { "Content-Type": "application/json", "APP_ID": tenant },
    })
      .then((res) => res.json())
      .then((data) => {
        setParams(data.params);
      })
  }, [tenant]);

  return (
    <TenantContext.Provider value={{tenant, config: configValue, params}}>
      {children}
    </TenantContext.Provider>
  );
};

export { TenantContext, TenantProvider }