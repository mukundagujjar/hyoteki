"use client"
import Navbar from "@/components/Navbar";
import { useState } from 'react';

const ContactPage = () => {

    const [formData, setFormData] = useState({
        name: '',
        reason: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="h-dvh w-full flex flex-col overflow-y-auto gap-8">
            <Navbar />
            <div className="flex flex-col w-full items-center justify-center md:text-lg">
                <form onSubmit={handleSubmit} className="flex flex-col p-8 justify-center gap-6 w-full md:w-xl">
                    {/* Name Input */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="font-medium">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                        className="px-3 py-2 rounded-lg focus:outline-none bg-[#778DA9] text-[#0D1B2A] "
                        />
                    </div>

                    {/* Reason Dropdown */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="reason" className="font-medium">
                            Reason for Contact
                        </label>
                        <select
                            id="reason"
                            name="reason"
                            required
                            value={formData.reason}
                            onChange={handleChange}
                        className="px-3 py-2 rounded-lg bg-[#778DA9] text-[#0D1B2A] cursor-pointer focus:outline-none"
                        >
                            <option value="">Select a reason</option>
                            <option value="feedback">Feedback</option>
                            <option value="partnership">Partnership</option>
                            <option value="sponsorship">Sponsorship</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    {/* Message Input */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="font-medium">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            value={formData.message}
                            onChange={handleChange}
                            rows={6}
                        className="px-3 py-2 rounded-lg focus:outline-none border bg-[#778DA9] text-[#0D1B2A]"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="px-4 py-2 bg-[#415A77] cursor-pointer hover:shadow-xl rounded-lg font-medium w-full"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ContactPage;