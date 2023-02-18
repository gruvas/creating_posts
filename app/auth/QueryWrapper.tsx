'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

interface Props {
	children?: ReactNode
}

const queryCLient = new QueryClient()

const QueryWrapper = ({ children }: Props) => (
	<QueryClientProvider client={queryCLient}>
		<Toaster />
		{children}
	</QueryClientProvider>
)

export default QueryWrapper
