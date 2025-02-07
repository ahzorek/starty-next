"use client"

import { Button } from "@radix-ui/themes"

export const ValueLoggerButton = ({ value }: any) => {
  return (
    <div className="my-4">

      <Button variant="outline" size="4" color="crimson" onClick={() => console.log(value)}>
        Log Value
      </Button>
    </div>
  )
}