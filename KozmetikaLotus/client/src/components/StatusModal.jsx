import React, { useEffect, useState } from 'react';
import OrderService from '../services/OrderService';
import MailerService from '../services/Mailer';
import Swal from "sweetalert2"


const StatusModal = ({id, status, closeStatusModal }) => {
  const [selectedStatus, setSelectedStatus] = useState(status);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try{
    await OrderService.updateOrder(id, selectedStatus).then((res) => {
      Swal.fire({
        title: "Status has been updated!",
        confirmButtonText:"ok",
      })
    })

    closeStatusModal();
  }catch (err) {
    console.error(err);
  }
};

const Status = ["Pending", "Accepted", "Shipping", "Finished"]


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-5 rounded-lg max-w-lg w-full space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Order Status</h2>
      <form onSubmit={handleSubmit} className="space-y-3">

            <div className='flex items-center'>
                <h2 className='mr-3 w-2/3'>Status: </h2>
                <select name="status" id="" value={selectedStatus} onChange={handleStatusChange} className='w-full p-3'>
              {Status.map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
            </div>

             
            <div className="flex justify-end space-x-2">

              <button type="button" onClick={closeStatusModal} className="btn btn-outline btn-accent border rounded-lg p-3 bg-[#A3A7FC] text-white hover:opacity-80">
                Cancel
              </button>

              <button type="submit" className="btn btn-primary border rounded-lg py-3 px-6 bg-green-700 text-white hover:opacity-80">
                Edit Status
              </button>
              
            </div>
              {/* More input fields and submission button */}
      </form>
    </div>
  </div>
  );
};

export default StatusModal;