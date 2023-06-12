import React from 'react'
import { Button } from 'reactstrap'
import Bills from './Bills'
export default function Next(props) {
  return (
    <>
      <Button onClick={props.next}>Next</Button>
    </>
  )
}
