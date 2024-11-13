import React, { useState, useEffect } from 'react'

import { Box, Button } from '@mui/material'

import { IUser } from 'src/entities/user/types'

import * as userService from '../../entities/user/service'
import { USER_GENDER } from '@ticktuk-test/utils'

import AddUserModal from './add-user-modal'
import UserTable from './user-table'

import _ from 'lodash'

export default function Home () {
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState<IUser[]>([])
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)
  const [selectedPage, setSelectedPage] = useState<number>(1)

  useEffect(function () {
    fetchUsers()
  }, [])

  async function fetchUsers () {
    setIsLoading(true)
    const fetchedData = await userService.getUsers()
    const sortedUsers = _.sortBy(fetchedData, `lastname`)
    setUsers(sortedUsers)
    setIsLoading(false)
  }

  async function deleteUser (id: string) {
    setIsLoading(true)
    const fetchedData = await userService.deleteUser(id)
    const sortedUsers = _.sortBy(fetchedData, `lastname`)
    setUsers(sortedUsers)
    setIsLoading(false)
  }

  interface IAddUserInput {
    firstname: string
    lastname: string
    gender: USER_GENDER
    email: string
    description: string
  }
  async function addUser ({ firstname, lastname, gender, email, description }: IAddUserInput) {
    setIsLoading(true)
    const fetchedData = await userService.addUser({ firstname, lastname, gender, email, description })
    const sortedUsers = _.sortBy(fetchedData, `lastname`)
    setUsers(sortedUsers)
    setIsLoading(false)
  }

  function openAddUserModal () {
    setIsAddUserModalOpen(true)
  }

  return (
    <Box
      sx={{
        padding: `20px`,
        display: `flex`,
        flexDirection: `column`,
        alignItems: `center`,
        justifyContent: `space-between`,
        gap: `20px`
      }}>
      <Box sx={{ maxWidth: `1000px`, width: `100%`, padding: `50px 0 50px 0` }}>
        <Box
          sx={{
            padding: `20px`,
            backgroundColor: `#EAF0F3`,
            display: `flex`,
            flexDirection: `column`,
            alignItems: `stretch`,
            gap: `20px`,
            borderRadius: `10px`
          }}>
          <Box sx={{ display: `flex`, justifyContent: `flex-end`, gap: `20px` }}>
            <Button variant='outlined' onClick={fetchUsers}>
              Refresh
            </Button>
            <Button variant='contained' onClick={openAddUserModal}>
              Add
            </Button>
          </Box>
          <UserTable
            users={users}
            selectedPage={selectedPage}
            isLoading={isLoading}
            deleteUser={deleteUser}
            setSelectedPage={setSelectedPage}
          />
        </Box>
      </Box>
      <AddUserModal
        isOpen={isAddUserModalOpen}
        setIsOpen={setIsAddUserModalOpen}
        addUser={addUser}
        isLoading={isLoading}
      />
    </Box>
  )
}
