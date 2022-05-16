import { useMemo, useState, useEffect } from 'react';

export default function useMediaQuery(query) {
  const mql = useMemo(() => window.matchMedia(query))

  const [match, setMatch] = useState(mql.matches)

  useEffect(() => {
    const handler = e => setMatch(e.matches)
    mql.addListener(handler)
    
    return () => {
      mql.removeListener(handler)
    }
  }, [mql])
  
  return match
}
