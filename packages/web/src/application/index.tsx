import React, { memo, Suspense } from "react"
import { Router } from "@reach/router"
import LogRocket from "logrocket"
import { useQuery } from "react-apollo-hooks"
import ErrorBoundary from "react-error-boundary"

import { AppContext } from "./context"
import { Me } from "../lib/graphql/types"
import { ME } from "../lib/graphql/user/queries"

import Loading from "../components/Loading"
import CheckAuth from "../components/CheckAuth"

import Balance from "../pages/Balance"
import NotFound from "../pages/NotFound"
import NewCost from "../pages/NewCost"
import EditCost from "../pages/EditCost"
import Costs from "../pages/Costs"
import Settings from "../pages/Settings"
import ErrorFallback from "../components/ErrorFallback"
import { production } from "../lib/config"

function Application() {
  const { data, loading } = useQuery<Me.Query>(ME, { suspend: false })

  const errorHandler = (e: Error, componentStack: string) => {
    console.log(e)
  }

  const user = (data && data.me) || null
  if (user && production) {
    LogRocket.identify(user.id, {
      name: user.firstName + " " + user.lastName,
      email: user.email,
    })
  }

  return (
    <AppContext.Provider value={{ user }}>
      <ErrorBoundary onError={errorHandler} FallbackComponent={ErrorFallback}>
        <Loading loading={loading}>
          <Suspense fallback={null}>
            <CheckAuth>
              <Router>
                <Balance path="/" />
                <NewCost path="/new-cost" />
                <EditCost path="/costs/:id" />
                <Costs path="/costs" />
                <Settings path="/profile" />
                <NotFound default={true} />
              </Router>
            </CheckAuth>
          </Suspense>
        </Loading>
      </ErrorBoundary>
    </AppContext.Provider>
  )
}

export default memo(Application)
