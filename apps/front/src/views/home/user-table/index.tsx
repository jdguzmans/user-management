import React from 'react'
import { IUser } from 'src/entities/user/types'
import Tooltip from '@mui/material/Tooltip'
import { Box, Button, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

interface IProps {
  users: IUser[]
  selectedPage: number
  isLoading: boolean
  deleteUser: (id: string) => Promise<void>
  setSelectedPage: (p: number) => void
}
export default function UserTable (props: IProps) {
  const usersToDisplay = props.users.slice((props.selectedPage - 1) * 3, props.selectedPage * 3)

  function onNextPageClick () {
    props.setSelectedPage(props.selectedPage + 1)
  }

  function onPrevPageClick () {
    props.setSelectedPage(props.selectedPage - 1)
  }

  return (
    <>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
          {usersToDisplay.map((user: IUser) => {
            return (
              <tr key={user._id}>
                <td style={{ textAlign: `center` }}>{`${user.firstname} ${user.lastname}`}</td>
                <td style={{ textAlign: `center` }}>{user.email}</td>
                <td style={{ textAlign: `center` }}>{user.gender}</td>
                <td style={{ textAlign: `center` }}>
                  <Tooltip title={user.description}>
                    <Typography>Description</Typography>
                  </Tooltip>
                </td>
                <td style={{ textAlign: `center` }}>
                  <Button
                    onClick={() => props.deleteUser(user._id)}
                    variant="outlined"
                    disabled={props.isLoading}
                  >DELETE
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Box sx={{ display: `flex`, justifyContent: `center`, alignItems: `center`, gap: `10px` }} >
        <IconButton onClick={onPrevPageClick} disabled={props.selectedPage === 1}>
          <ArrowBackIosIcon />
        </IconButton>
        {props.selectedPage} / {Math.ceil(props.users.length / 3)}
        <IconButton onClick={onNextPageClick} disabled={props.selectedPage * 3 >= props.users.length}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </>
  )
}
