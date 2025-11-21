import React, { use } from 'react'
import { AuthContext } from '../../conext/AuthContext'

const AccInfo = () => {
    const {user} = use(AuthContext)
    return (

        <div className="card bg-base-100 shadow-2xl rounded-2xl overflow-hidden border border-base-300 mt-8">
            <div className="bg-gradient-to-r from-secondary to-accent h-2"></div>
            <div className="card-body p-8">
                <h2 className="card-title text-2xl mb-4">Account Information</h2>
                <div className="space-y-4">
                    <div className="p-4 bg-base-200 rounded-xl border border-base-300">
                        <p className="text-sm opacity-70 mb-1">Account Created</p>
                        <p className="font-medium">{user?.metadata?.creationTime}</p>
                    </div>
                    <div className="p-4 bg-base-200 rounded-xl border border-base-300">
                        <p className="text-sm opacity-70 mb-1">Last Sign In</p>
                        <p className="font-medium">{user?.metadata?.lastSignInTime}</p>
                    </div>
                    <div className="p-4 bg-base-200 rounded-xl border border-base-300">
                        <p className="text-sm opacity-70 mb-1">User ID</p>
                        <p className="font-medium font-mono text-sm">{user?.uid}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccInfo