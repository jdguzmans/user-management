import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Button, TextField } from '@mui/material'
import { USER_GENDER } from '@ticktuk-test/utils'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'

enum STEP {
  FIRT_NAME = `FIRST_NAME`,
  LAST_NAME = `LAST_NAME`,
  EMAIL = `EMAIL`,
  GENDER = `GENDER`,
  DESCRIPTION = `DESCRIPTION`
}

interface IAddedUser {
  firstname: string
  lastname: string
  email: string
  gender: USER_GENDER
  description: string
}

interface IProps {
  isOpen: boolean
  setIsOpen: (o: boolean) => void
  addUser: (u: IAddedUser) => Promise<void>
  isLoading: boolean
}
const style = {
  position: `absolute`,
  top: `50%`,
  left: `50%`,
  transform: `translate(-50%, -50%)`,
  width: 400,
  bgcolor: `background.paper`,
  border: `2px solid #000`,
  boxShadow: 24,
  p: 4
}
export default function AddUserModal (props: IProps) {
  const [step, setStep] = useState<STEP>(STEP.FIRT_NAME)

  const [firstname, setFirstname] = useState(``)
  const [lastname, setLastname] = useState(``)
  const [email, setEmail] = useState(``)
  const [gender, setGender] = useState<USER_GENDER | ``>(``)
  const [description, setDescription] = useState(``)

  function onClose () {
    props.setIsOpen(false)

    setStep(STEP.FIRT_NAME)

    setFirstname(``)
    setLastname(``)
    setEmail(``)
    setGender(``)
    setDescription(``)
  }

  async function onContinue () {
    if (props.isLoading) return

    if (step === STEP.FIRT_NAME) {
      setStep(STEP.LAST_NAME)
      return
    }
    if (step === STEP.LAST_NAME) {
      setStep(STEP.EMAIL)
      return
    }
    if (step === STEP.EMAIL) {
      setStep(STEP.GENDER)
      return
    }
    if (step === STEP.GENDER) {
      setStep(STEP.DESCRIPTION)
      return
    }
    if (step === STEP.DESCRIPTION) {
      if (gender === ``) throw new Error(`Gender should not be emtpy`)
      await props.addUser({ firstname, lastname, email, gender, description })

      setStep(STEP.FIRT_NAME)

      setFirstname(``)
      setLastname(``)
      setEmail(``)
      setGender(``)
      setDescription(``)

      props.setIsOpen(false)
      return
    }
    throw new Error(`Continue action not defined for step ${step}`)
  }

  function onBack () {
    if (props.isLoading) return

    if (step === STEP.LAST_NAME) {
      setStep(STEP.FIRT_NAME)
      return
    }
    if (step === STEP.EMAIL) {
      setStep(STEP.LAST_NAME)
      return
    }
    if (step === STEP.GENDER) {
      setStep(STEP.EMAIL)
      return
    }
    if (step === STEP.DESCRIPTION) {
      setStep(STEP.GENDER)
      return
    }
    throw new Error(`Back action not defined for step ${step}`)
  }

  function renderTitle () {
    if (step === STEP.FIRT_NAME) return `Type first name`
    if (step === STEP.LAST_NAME) return `Type last name`
    if (step === STEP.EMAIL) return `Type email`
    if (step === STEP.GENDER) return `Select gender`
    if (step === STEP.DESCRIPTION) return `Type description`
    throw new Error(`Title not defined for step ${step}`)
  }

  function renderContent () {
    if (step === STEP.FIRT_NAME) {
      return (
        <TextField
          value={firstname}
          onChange={v => setFirstname(v.target.value)}
        />
      )
    }
    if (step === STEP.LAST_NAME) {
      return (
        <TextField
          value={lastname}
          onChange={v => setLastname(v.target.value)}
        />
      )
    }
    if (step === STEP.EMAIL) {
      return (
        <TextField
          type='email'
          value={email}
          onChange={v => setEmail(v.target.value)}
        />
      )
    }
    if (step === STEP.GENDER) {
      return (
        <Select
          value={gender}
          onChange={v => setGender(v.target.value as USER_GENDER)}
        >
          {Object.values(USER_GENDER).map(p => {
            return (
              <MenuItem key={p} value={p}>{p}</MenuItem>
            )
          })}
        </Select>
      )
    }
    if (step === STEP.DESCRIPTION) {
      return (
        <TextField
          multiline
          minRows={4}
          value={description}
          onChange={v => v.target.value.length <= 200 && setDescription(v.target.value)}
        />
      )
    }
    throw new Error(`Content not defined for step ${step}`)
  }

  function isContinueButtonDisabled () {
    if (props.isLoading) return true

    if (step === STEP.FIRT_NAME) return firstname.length === 0
    if (step === STEP.LAST_NAME) return lastname.length === 0
    if (step === STEP.EMAIL) return email.length === 0
    if (step === STEP.GENDER) return gender === ``
    if (step === STEP.DESCRIPTION) return description.length === 0
    throw new Error(`Continue button disabled not defined for step ${step}`)
  }

  return (
    <Modal
      open={props.isOpen}
      onClose={onClose}
    >
      <Box sx={style} >
        <Typography variant="h6" component="h2">
          Add user
        </Typography>
        <Typography sx={{ mt: 2 }}>
          {renderTitle()}
        </Typography>
        <FormControl fullWidth sx={{ marginTop: `10px` }}>
          {renderContent()}
        </FormControl>
        <Box sx={{
          display: `flex`,
          marginBotom: `20px`,
          marginTop: `10px`,
          justifyContent: `space-between`
        }} >
          {step === STEP.FIRT_NAME
            ? <div></div>
            : (
              <Button onClick={onBack} disabled={props.isLoading}>
                Back
              </Button>
              )}
          <Button onClick={onContinue} disabled={isContinueButtonDisabled()} variant='contained'>
            {step !== STEP.DESCRIPTION ? `Next` : `Submit`}
          </Button>
        </Box>
      </Box>
    </Modal>

  )
}
