import { useEffect, useState } from "react"

function useLocalStorage<T>(key: string, initValue: T | (() => T)) {
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key)
        if (jsonValue) return JSON.parse(jsonValue)

        if (typeof initValue === "function") {
            return (initValue as () => T)()
        } else {
            return initValue
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue] as [typeof value, typeof setValue]
}

export default useLocalStorage
