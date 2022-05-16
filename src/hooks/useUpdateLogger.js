import { useEffect, useState } from 'react'

export default function useUpdateLogger(value) {
  useEffect(() => {
    console.log(value);
  })
}
