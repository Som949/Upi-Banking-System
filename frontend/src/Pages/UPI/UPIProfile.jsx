import React from "react";

function Profile() {
  return (
    <div className="min-h-screen bg-[#0e131e] text-[#dee2f2] flex justify-center items-start py-10 px-4">
      
      <div className="w-full max-w-4xl space-y-6">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-[#b8c4ff]">Your Profile</h1>
          <p className="text-gray-400 text-sm">
            Account security and identity details
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-[#1b1f2b] p-6 rounded-xl flex flex-col md:flex-row gap-6 items-center">
          
          {/* Avatar */}
          <div className="w-28 h-28 rounded-xl overflow-hidden border border-gray-600">
            <img
              src="https://via.placeholder.com/150"
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1 space-y-4 text-center md:text-left">
            
            <div>
              <p className="text-xs text-gray-400">Full Name</p>
              <h2 className="text-xl font-semibold text-[#b8c4ff]">
                Aarav Mehta
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div>
                <p className="text-xs text-gray-400">UPI ID</p>
                <p className="text-sm">9876543210@bankupi</p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Phone</p>
                <p className="text-sm">+91 98765 43210</p>
              </div>

            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Account */}
          <div className="bg-[#171b27] p-4 rounded-lg">
            <p className="text-xs text-gray-400">Account Number</p>
            <p className="text-lg font-semibold tracking-widest">
              XXXXXX4179
            </p>
          </div>

          {/* KYC */}
          <div className="bg-[#171b27] p-4 rounded-lg">
            <p className="text-xs text-gray-400">KYC Status</p>
            <p className="text-lg font-semibold text-green-400">
              Verified
            </p>
          </div>

          {/* Security */}
          <div className="bg-[#171b27] p-4 rounded-lg">
            <p className="text-xs text-gray-400">Security</p>
            <p className="text-lg font-semibold text-[#b8c4ff]">
              Excellent
            </p>
          </div>

        </div>

        {/* Extra Info */}
        <div className="bg-[#1b1f2b] p-6 rounded-xl text-center">
          <h3 className="text-xl font-bold mb-2 text-[#b8c4ff]">
            Premium User
          </h3>
          <p className="text-gray-400 text-sm">
            Your account is protected with advanced security and priority services.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Profile;