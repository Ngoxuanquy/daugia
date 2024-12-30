'use client'

import CardUser from '@/app/components/cardUser/cardUser'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import fetchApi from '@/app/utils/api'
import { Button, Form, Input, message, Modal, Popconfirm } from 'antd'
import CardAuction from '@/app/components/cardAuction/cardAuction'
import { QuestionCircleOutlined } from '@ant-design/icons';
const Accounts = () => {

    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        meetingDate: '',
        message: '',
    });

    const handleFormChange = (changedFields) => {
        setFormData((prev) => ({ ...prev, ...changedFields }));
    };

  
    
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

    const handleItemClick = (label) => {
        setActiveColor(label) // Cập nhật trạng thái activeColor
    }

    const handleUpdateUser = async () => {
        await fetch(`http://165.232.160.54:3001/v1/api/auth/update`, {
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

    const onChangeInput = (e ) => {
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
    const [listRoomDone, setListRoomDone] = useState([]) // State to hold auction data

    const [loading, setLoading] = useState(true) // State for loading status

    const handleConfirm = async (roomId) => {
         await fetch(`http://165.232.160.54:3001/v1/api/room/huy-hang`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                roomId,
                userId: userId
            }),
        }).then(() => {
            fetchRoomDone()
        })
    };


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

    const fetchRoomDone = async () => {
        try {
            const response = await fetchApi(`/room/done-room/${Cookies.get('userId')}`, 'GET') // Call your auction API endpoint
            if (response && response.metadata) {
                setListRoomDone(response.metadata) // Update state with auction data
            } else {
                message.error('No auction data found.') // Show error message if no data
            }
        } catch (error) {
            message.error(`Error fetching auction data: ${error || error}`) // Handle errors
        } finally {
            setLoading(false) // Stop loading
        }
    }
    const [roomId, setRoomId] = useState([])
    const handleChapNhan = (roomId) => {
        setRoomId(roomId)
        setIsModalOpen(true);
    }

    const handleOk = async (values) => {
        await fetch(`http://165.232.160.54:3001/v1/api/room/nhan-hang`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                roomId,
                values: values
            }),
        }).then(() => {
            fetchRoomDone()
            setIsModalOpen(false);
        })
};

    const onSubmit = () => {
        form.validateFields()
            .then((values) => {
                console.log('Submitted Data:', values); // Replace this with API call
                handleOk(values); // Close the modal
            })
            .catch((info) => {
                console.error('Validation Failed:', info);
            });
    };

    // Use effect to fetch data on component mount
    useEffect(() => {
        fetchAuctionData()
        fetchRoomDone()
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

   const AuctionHistory = () => (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Lịch sử trúng đấu giá</h2>
            <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
                <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Tiêu đề</th>
                <th className="border border-gray-300 px-4 py-2">Ảnh</th>
                <th className="border border-gray-300 px-4 py-2">Giá khởi điểm</th>
                <th className="border border-gray-300 px-4 py-2">Giá hiện tại</th>
                <th className="border border-gray-300 px-4 py-2">Ngày bắt đầu</th>
                <th className="border border-gray-300 px-4 py-2">Ngày kết thúc</th>
                <th className="border border-gray-300 px-4 py-2">Trạng thái</th>
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">#</th>
                       

                </tr>
            </thead>
            <tbody>
                {listRoomDone?.map((listRoom) => (
                <tr key={listRoom._id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">{listRoom.title}</td>
                    <td className="border border-gray-300 px-4 py-2">
                    <img
                        src={listRoom.image}
                        alt={listRoom.title}
                        className="h-16 w-16 object-cover rounded"
                    />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{listRoom.startPrice.toLocaleString()}₫</td>
                    <td className="border border-gray-300 px-4 py-2">{listRoom.currentPrice.toLocaleString()}₫</td>
                    <td className="border border-gray-300 px-4 py-2">{new Date(listRoom.startDate).toLocaleDateString()}</td>
                    <td className="border border-gray-300 px-4 py-2">{new Date(listRoom.endDate).toLocaleDateString()}</td>
                    <td className="border border-gray-300 px-4 py-2">{listRoom.status}</td>
                        <td className="border border-gray-300 px-4 py-2">
                        <button onClick={() => handleChapNhan(listRoom._id)}>
                            Chấp nhận
                        </button>
                        </td>
                        <td className="border border-gray-300 px-4 py-2 ">
                        <Popconfirm
                            title="Hủy nhận phiên đấu giá"
                            description="Bạn có chắc chắn muốn hủy không?"
                            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                            onConfirm={() => handleConfirm(listRoom._id)}  // Bắt sự kiện khi xác nhận
                            onCancel={handleCancel}
                        >
                            <Button danger>Hủy</Button>
                        </Popconfirm>
                        </td>
                        
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    );
    


    return (
        <div className="p-10 w-[80%] mx-auto bg-gray-100 rounded-lg shadow-lg">
        <Modal
                title="Thông tin liên lạc"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null} // Custom footer to include form actions
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={formData}
                    onValuesChange={(changedValues) => handleFormChange(changedValues)}
                >
                    <Form.Item
                        label="Họ và tên"
                        name="name"
                        rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                    >
                        <Input placeholder="Nhập họ và tên của bạn" />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[
                            { required: true, message: 'Vui lòng nhập số điện thoại!' },
                            { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ!' },
                        ]}
                    >
                        <Input placeholder="Nhập số điện thoại" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email!' },
                            { type: 'email', message: 'Email không hợp lệ!' },
                        ]}
                    >
                        <Input placeholder="Nhập email" />
                    </Form.Item>

                    <Form.Item
                        label="Ngày hẹn gặp"
                        name="meetingDate"
                        rules={[{ required: true, message: 'Vui lòng chọn ngày hẹn!' }]}
                    >
                        <Input type="date" />
                    </Form.Item>

                    <Form.Item label="Tin nhắn (tuỳ chọn)" name="message">
                        <Input.TextArea rows={4} placeholder="Nhập lời nhắn" />
                    </Form.Item>

                    <div className="flex justify-end gap-4">
                        <Button onClick={handleCancel} className="bg-gray-300 hover:bg-gray-400">
                            Huỷ
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={onSubmit}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            Gửi thông tin
                        </Button>
                    </div>
                </Form>
            </Modal>
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex">
                    <div className="w-[30%]">
                        <CardUser onItemClick={handleItemClick} activeColor={activeColor} name={userInfo.fullName} />
                    </div>
                    <div className="ml-6 flex-1 w-[70%]">
                        {activeColor === 'Phòng đấu giá của tôi' ? (
                            <AuctionRoom /> // Hiển thị giao diện phòng đấu giá
                        ): activeColor === 'Lịch sử đấu giá' ? (
                            <AuctionHistory />
                        ) 
                            : (
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