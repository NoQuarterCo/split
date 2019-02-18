import { useMutation, useApolloClient } from "react-apollo-hooks"

import { Login, UpdateUser, Register, InviteUser } from "../types"

import {
  LOGIN,
  ME,
  UPDATE_USER,
  REGISTER,
  LOGOUT,
  INVITE_USER,
} from "./queries"

export function useLoginMutation() {
  return useMutation<Login.Mutation, Login.Variables>(LOGIN, {
    refetchQueries: [{ query: ME }],
    awaitRefetchQueries: true,
    update: (_, res) => {
      if (res.data) {
        localStorage.setItem("token", res.data.login.token)
      }
    },
  })
}

export function useUpdateUserMutation() {
  return useMutation<UpdateUser.Mutation, UpdateUser.Variables>(UPDATE_USER)
}

export function useRegisterMutation() {
  return useMutation<Register.Mutation, Register.Variables>(REGISTER, {
    refetchQueries: [{ query: ME }],
    awaitRefetchQueries: true,
    update: (_, res) => {
      if (res.data) {
        localStorage.setItem("token", res.data.register.token)
      }
    },
  })
}

export function useInviteUserMutation() {
  return useMutation<InviteUser.Mutation, InviteUser.Variables>(INVITE_USER)
}

export function useLogoutMutation() {
  const client = useApolloClient()
  const logout = useMutation(LOGOUT)

  const handleLogout = async () => {
    localStorage.removeItem("token")
    await logout({
      update: cache => cache.writeQuery({ query: ME, data: { me: null } }),
    })
    await client.resetStore()
  }

  return handleLogout
}
