import React from "react"
import { Redirect, Switch, SwitchProps } from "react-router-dom"
import { useSdk } from "../services/wallet"

export interface RedirectLocation {
  readonly redirectPathname: string
  readonly redirectState: any
}

interface ProtectedSwitchProps extends SwitchProps {
  readonly children?: React.ReactNode
}

export function ProtectedSwitch({
  location,
  children,
}: ProtectedSwitchProps): JSX.Element {
  const { initialized } = useSdk()

  return initialized ? (
    <Switch location={location}>{children}</Switch>
  ) : (
    <Redirect
      to={{
        pathname: "/",
        state: location
          ? {
              redirectPathname: location.pathname,
              redirectState: location.state,
            }
          : undefined,
      }}
    />
  )
}
