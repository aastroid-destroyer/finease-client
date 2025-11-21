import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../conext/AuthContext';

const MyProfile = () => {
    const { user, updateProfilefunc } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        displayName: user?.displayName || '',
        photoURL: user?.photoURL || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData,[name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await updateProfilefunc(formData.displayName, formData.photoURL);
            toast.success('Profile updated successfully!');
            setIsEditing(false);
            // Force refresh to show updated data
            window.location.reload();
        } catch (error) {
            toast.error('Failed to update profile');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            displayName: user?.displayName || '',
            photoURL: user?.photoURL || ''
        });
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 py-10 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">My Profile</h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
                </div>

                <div className="card bg-base-100 shadow-2xl rounded-2xl overflow-hidden border border-base-300">
                    <div className="bg-gradient-to-r from-primary to-secondary h-2"></div>
                    <div className="card-body p-8">
                        {/* Profile Photo */}
                        <div className="flex justify-center mb-8">
                            <div className="avatar relative group">
                                <div className="w-36 rounded-full ring-4 ring-primary/20 ring-offset-base-100 ring-offset-4 overflow-hidden shadow-xl transition-all duration-300 group-hover:ring-primary/40 group-hover:scale-105">
                                    <img
                                        src={isEditing ? formData.photoURL : user?.photoURL || "https://via.placeholder.com/150"}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = "https://via.placeholder.com/150";
                                        }}
                                    />
                                </div>
                                {isEditing && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span className="text-white text-sm font-medium">Photo Preview</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {!isEditing ? (
                            <div className="space-y-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold text-base-content/80">Name</span>
                                    </label>
                                    <div className="text-lg p-4 bg-base-200 rounded-xl border border-base-300 shadow-inner">
                                        {user?.displayName || 'Not set'}
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold text-base-content/80">Email</span>
                                    </label>
                                    <div className="text-lg p-4 bg-base-200 rounded-xl border border-base-300 shadow-inner">
                                        {user?.email}
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold text-base-content/80">Photo URL</span>
                                    </label>
                                    <div className="text-sm p-4 bg-base-200 rounded-xl border border-base-300 shadow-inner break-all font-mono">
                                        {user?.photoURL || 'Not set'}
                                    </div>
                                </div>

                                <div className="form-control mt-8">
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="btn btn-primary bg-gradient-to-r from-primary to-secondary border-0 text-white font-medium py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                                    >
                                        Update Profile
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold text-base-content/80">Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="displayName"
                                        value={formData.displayName}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        className="input input-bordered w-full p-4 rounded-xl border border-base-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                                        required
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold text-base-content/80">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={user?.email}
                                        className="input input-bordered w-full p-4 rounded-xl border border-base-300 bg-base-200"
                                        disabled
                                    />
                                    <label className="label">
                                        <span className="label-text-alt text-base-content/60">Email cannot be changed</span>
                                    </label>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold text-base-content/80">Photo URL</span>
                                    </label>
                                    <input
                                        type="url"
                                        name="photoURL"
                                        value={formData.photoURL}
                                        onChange={handleChange}
                                        placeholder="Enter photo URL"
                                        className="input input-bordered w-full p-4 rounded-xl border border-base-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                                        required
                                    />
                                </div>

                                <div className="flex gap-4 mt-8">
                                    <button
                                        type="submit"
                                        className="btn btn-primary bg-gradient-to-r from-primary to-secondary border-0 text-white font-medium py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex-1"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="loading loading-spinner"></span>
                                                Saving...
                                            </>
                                        ) : (
                                            'Save Changes'
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="btn btn-ghost border border-base-300 bg-base-200 hover:bg-base-300 font-medium py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex-1"
                                        disabled={loading}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>

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
            </div>
        </div>
    );
};

export default MyProfile;