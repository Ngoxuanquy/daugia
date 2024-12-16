'use client'

import CardUser from '@/app/components/cardUser/cardUser'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import fetchApi from '@/app/utils/api'
import { message } from 'antd'
import CardAuction from '@/app/components/cardAuction/cardAuction'

const Accounts = () => {
    const [userInfo, setUserInfo] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        birthDate: '',
        address: '',
        moneys: 0, // Thêm trường tiền
    })
    const [activeColor, setActiveColor] = useState('')

    const userId = Cookies.get('userId')

    const handleItemClick = (label: string) => {
        setActiveColor(label) // Cập nhật trạng thái activeColor
    }

    const handleUpdateUser = async () => {
        await fetch(`http://localhost:3001/v1/api/auth/update`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId,
                name: userInfo.fullName,
                birthDate: userInfo.birthDate,
                address: userInfo.address,
                phoneNumber: userInfo.phoneNumber,
            }),
        })
    }

    const onChangeInput = (e) => {
        setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    useEffect(() => {
        const fetchUserData = async () => {
            const userResponse = await fetchApi(`/auth/getUser/${userId}`, 'GET')
            // Kiểm tra phản hồi và thiết lập thông tin người dùng
            console.log(userResponse)
            if (userResponse && userResponse.metadata) {
                const { fullName, email, phoneNumber, birthDate, address, moneys } = userResponse.metadata
                setUserInfo({ fullName, email, phoneNumber, birthDate, address, moneys })
            }
        }

        fetchUserData()
    }, [])

    const [listAuction, setListAuction] = useState([]) // State to hold auction data
    const [loading, setLoading] = useState(true) // State for loading status

    // Function to fetch auction data
    const fetchAuctionData = async () => {
        try {
            const response = await fetchApi(`/room/my-room/${Cookies.get('userId')}`, 'GET') // Call your auction API endpoint
            if (response && response.metadata) {
                setListAuction(response.metadata) // Update state with auction data
            } else {
                message.error('No auction data found.') // Show error message if no data
            }
        } catch (error) {
            message.error(`Error fetching auction data: ${error || error}`) // Handle errors
        } finally {
            setLoading(false) // Stop loading
        }
    }

    // Use effect to fetch data on component mount
    useEffect(() => {
        fetchAuctionData()
    }, [])

    if (loading) return <div>Loading...</div>

    const AuctionRoom = () => {
return (
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Phòng đấu giá của tôi</h2>
                <div>
                    {listAuction.length > 0 ? (
                        listAuction.map((auction, index) => (
                            <div key={index}>
                                <CardAuction auction={auction} />
                            </div>
                        ))
                    ) : (
                        <p className="text-center col-span-full text-gray-600">Không có tài sản nào để hiển thị.</p>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="p-10 w-[80%] mx-auto bg-gray-100 rounded-lg shadow-lg">
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex">
                    <div className="w-[30%]">
                        <CardUser onItemClick={handleItemClick} activeColor={activeColor} name={userInfo.fullName} />
                    </div>
                    <div className="ml-6 flex-1 w-[70%]">
                        {activeColor === 'Phòng đấu giá của tôi' ? (
                            <AuctionRoom /> // Hiển thị giao diện phòng đấu giá
                        ) : (
                            <div>
                                <h1 className="text-3xl font-bold mb-6 text-gray-800">Thông tin tài khoản</h1>
                                <form className="mt-4">
                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Họ và tên:</label>
                                        {/* <div className="block border rounded w-full py-3 px-4 text-gray-700 leading-tight bg-gray-50 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            {userInfo.fullName}
                                        </div> */}

                                        <input
                                            type="text"
                                            className="block border rounded w-full py-3 px-4 text-gray-700 leading-tight bg-gray-50 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Họ và tên"
                                            value={userInfo.fullName}
                                            name="fullName"
                                            onChange={(e) => onChangeInput(e)}
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Địa chỉ email:
                                        </label>
<div className="block border rounded w-full py-3 px-4 text-gray-400 leading-tight bg-gray-200 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            {userInfo.email}
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Số điện thoại:
                                        </label>
                                        {/* <div className="block border rounded w-full py-3 px-4 text-gray-700 leading-tight bg-gray-50 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            {userInfo.phoneNumber}
                                        </div> */}
                                        <input
                                            type="text"
                                            className="block border rounded w-full py-3 px-4 text-gray-700 leading-tight bg-gray-50 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Số điện thoại"
                                            value={userInfo.phoneNumber}
                                            name="phoneNumber"
                                            onChange={(e) => onChangeInput(e)}
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Ngày sinh:</label>
                                        {/* <div className="block border rounded w-full py-3 px-4 text-gray-700 leading-tight bg-gray-50 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            {userInfo.birthDate.split('T')[0]}
                                        </div> */}
                                        <input
                                            type="text"
                                            className="block border rounded w-full py-3 px-4 text-gray-700 leading-tight bg-gray-50 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Ngày sinh"
                                            value={userInfo.birthDate.split('T')[0]}
                                            name="birthDate"
                                            onChange={(e) => onChangeInput(e)}
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Địa chỉ:</label>
{/* <div className="block border rounded w-full py-3 px-4 text-gray-700 leading-tight bg-gray-50 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            {userInfo.address}
                                        </div> */}
                                        <input
                                            type="text"
                                            className="block border rounded w-full py-3 px-4 text-gray-700 leading-tight bg-gray-50 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Địa chỉ"
                                            value={userInfo.address}
                                            name="address"
                                            onChange={(e) => onChangeInput(e)}
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Số tiền hiện có:
                                        </label>
                                        <div className="block border rounded w-full py-3 px-4 text-gray-700 leading-tight bg-gray-200 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            {userInfo.moneys} VNĐ
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-4">
                                        <button
                                            onClick={handleUpdateUser}
                                            type="button"
                                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            Cập nhật
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Accounts