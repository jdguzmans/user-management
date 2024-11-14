import React from 'react'
import { Box, Button, Typography } from '@mui/material'

import { IUser } from 'src/entities/user/types'

interface IProps {
  users: IUser[]
  fetchUsers: () => Promise<void>
  openAddUserModal: () => void
}
export default function OperationsPanel (props: IProps) {
  return (
    <Box sx={{
      display: `flex`,
      justifyContent: `space-between`
    }}>
      <Typography>
        Total count: {props.users.length}
      </Typography>
      <Box sx={{ display: `flex`, justifyContent: `flex-end`, gap: `20px` }}>
        <Button variant='outlined' onClick={props.fetchUsers}>
          Refresh
        </Button>
        <Button variant='contained' onClick={props.openAddUserModal}>
          Add
        </Button>
      </Box>

    </Box>
  )
}
