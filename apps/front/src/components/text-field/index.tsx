import React from 'react'
import { TextField } from '@mui/material'

interface IProps {
  error?: string,
  type?: `email` | `text`
  isDisabled: boolean
  value: string
  onChange: (v: string) => void
  onEnter?: () => void
  onShiftEnter?: () => void
  multiline?: boolean
  minRows?: number
  maxRows?: number
}
export default function TkTextField (props: IProps) {
  return (
    <TextField
      error={props.error !== undefined && props.error !== ``}
      fullWidth
      type={props.type !== undefined ? props.type : `text`}
      disabled={props.isDisabled}
      value={props.value}
      onChange={(e) => {
        props.onChange(e.target.value)
      }}
      onKeyDown={(e) => {
        if (props.onEnter !== undefined) {
          if (e.key !== `Enter`) return
          e.preventDefault()
          props.onEnter()
        }
        if (props.onShiftEnter !== undefined) {
          if (e.key !== `Enter`) return
          if (e.shiftKey) {
            e.preventDefault()
            props.onShiftEnter()
          }
        }
      }}
      multiline={props.multiline !== undefined ? props.multiline : false}
      minRows={props.minRows !== undefined ? props.minRows : 1}
      maxRows={props.maxRows !== undefined ? props.maxRows : 1}
    />
  )
}
