import React, { useState, useEffect } from 'react'

const useDelay = (ms: number) => {
    const [delayComplete, setDelayComplete] = useState(false)
    useEffect(() => {
        const timer = setTimeout(() => {
            setDelayComplete(true)
        }, ms)
        return () => {
            clearTimeout(timer)
        }
    }, [ms])
    return delayComplete
}

interface WithDelayOptions {
    delay: number
}

const withDelay = ({ delay }: WithDelayOptions) => <T extends {}>(Comp: React.ComponentType<T>) => {
    const Delay = (props: T) => {
        const delayComplete = useDelay(delay)
        return delayComplete ? <Comp {...props} /> : null
    }
    return Delay
}

export default withDelay
