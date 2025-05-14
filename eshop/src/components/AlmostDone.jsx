// import React, { useState } from "react";
// import { Link } from "react-router-dom";
import almostDone from "../assets/almostDone-icon.png"
import React from "react"

const AlmostDone = () => {   
    
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="w-full max-w-md p-8 bg-white rounded-lg shadow">
          <img className="w-20 h-20  justify-center m-auto my-4" src={almostDone} alt="Done" />
            <h2 className="text-2xl font-bold text-center mb-2">Almost There!</h2>
            <p className="text-center text-gray-500  text-sm mb-4">
              Check your email inbox and confirm your account         
            </p>
            <form className="space-y-6">
              
              <div className="mt-6 border-t"/>
              <p className="text-center text-xs text-gray-500">
                Didn't receive any mail?
              </p>
              <button
                type="button"
                className="w-full text-blue-600 hover:underline border rounded px-3 py-2 text-sm outline-none focus:ring-2 font-medium"
              >
                Resend Confirmation
              </button>
            </form>
          </div>
        </div>
  )
}

export default AlmostDone