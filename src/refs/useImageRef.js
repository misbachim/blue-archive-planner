import { useRef } from 'react'
import fileImageJson from '../resource/images.json'

export default function useImageRef() {
  const imageJson = useRef(fileImageJson)

  return imageJson.current
}
