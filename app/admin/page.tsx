"use client"

import { FC } from 'react'
import dynamic from 'next/dynamic'

const App = dynamic(() => import("./app"), {ssr: false});
const AdminPage: FC = () => {
    return (
        <div>
            <App />
        </div>
    )
}

export default AdminPage
