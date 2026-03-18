'use client'
import { XIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "react-hot-toast"

const AddressModal = ({ setShowAddressModal, onSave }) => {

    const [address, setAddress] = useState({
        name: '',
        email: '',
        street: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
        phone: ''
    })

    const handleAddressChange = (e) => {
        setAddress({
            ...address,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (onSave) {
            await onSave(address);
        }
        setShowAddressModal(false);
    }

    return (
        <form onSubmit={e => toast.promise(handleSubmit(e), { loading: 'Adding Address...' })} className="fixed inset-0 z-50 bg-white/60 backdrop-blur h-screen flex items-center justify-center">
            <div className="flex flex-col gap-5 text-slate-700 w-full max-w-sm mx-6">
                <h2 className="text-3xl ">Add New <span className="font-semibold">Address</span></h2>
                <input name="name" type="text" onChange={handleAddressChange} value={address.name} className="p-2 px-4 outline-none border border-slate-200 rounded w-full" placeholder="Enter your name" required />
                <input name="email" type="email" onChange={handleAddressChange} value={address.email} className="p-2 px-4 outline-none border border-slate-200 rounded w-full" placeholder="Email address" required />
                <input name="street" type="text" onChange={handleAddressChange} value={address.street} className="p-2 px-4 outline-none border border-slate-200 rounded w-full" placeholder="Street" required />
                <div className="flex gap-4">
                    <input name="city" type="text" onChange={handleAddressChange} value={address.city} className="p-2 px-4 outline-none border border-slate-200 rounded w-full" placeholder="City" required />
                    <input name="state" type="text" onChange={handleAddressChange} value={address.state} className="p-2 px-4 outline-none border border-slate-200 rounded w-full" placeholder="State" required />
                </div>
                <div className="flex gap-4">
                    <input name="pincode" type="text" onChange={handleAddressChange} value={address.pincode} className="p-2 px-4 outline-none border border-slate-200 rounded w-full" placeholder="ZIP/PIN code" required />
                    <input name="country" type="text" onChange={handleAddressChange} value={address.country} className="p-2 px-4 outline-none border border-slate-200 rounded w-full" placeholder="Country" required />
                </div>
                <input name="phone" type="text" onChange={handleAddressChange} value={address.phone} className="p-2 px-4 outline-none border border-slate-200 rounded w-full" placeholder="Phone" required />
                <button className="bg-slate-800 text-white text-sm font-medium py-2.5 rounded-md hover:bg-slate-900 active:scale-95 transition-all">SAVE ADDRESS</button>
            </div>
            <XIcon size={30} className="absolute top-5 right-5 text-slate-500 hover:text-slate-700 cursor-pointer" onClick={() => setShowAddressModal(false)} />
        </form>
    )
}

export default AddressModal