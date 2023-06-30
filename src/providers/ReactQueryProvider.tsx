import React from 'react'
import {get, set, del} from 'idb-keyval'
import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider, PersistedClient, Persister } from '@tanstack/react-query-persist-client'

interface ReactQueryProviderProps {
    children: React.ReactNode
}

const queryClient: QueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: true,
            retry: false,
            cacheTime: 1000 * 60 * 60 * 24, // 24 hours
            staleTime: 1000 * 60 * 60 * 24, // 24 hours
        },
    },
})

function createIDBPersister(idbValidKey: IDBValidKey = 'reactQuery'): Persister {
    return {
        persistClient: async (client: PersistedClient) => {
           set(idbValidKey, client)
        },
        restoreClient: async () => {
            return await get<PersistedClient>(idbValidKey)
        },
        removeClient: async () => {
            await del(idbValidKey)
        }
    } as Persister;
}

const persister: Persister = createIDBPersister()

export default function ReactQueryProvider({ children }: ReactQueryProviderProps): JSX.Element {
  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{persister}}>
        {children}
    </PersistQueryClientProvider>
  )
}
