import React, { useEffect, useState } from 'react';
import ClientDetails from './ClientDetails';
import ClientsService from '../services/ClientService';

const Clients = () => {
    const [clientDetails, setClientDetails] = useState(false);
    const [clients, setClients] = useState([])
    const [selectedUser, setSelectedUetuser] = useState({})
    const [displayedClients, setDisplayedClients] = useState(10);
    const [totalPages, setTotalPages] = useState(1)

    const handleClientDetails = (user) => {
        setSelectedUetuser(user)
        setClientDetails(true);
      }

      const loadMoreClients = () => {
        setDisplayedClients(prevCount => prevCount + 10); // Load 10 more orders
    };

    const getClients = async () => {
        try{
            await ClientsService.getClients(displayedClients).then((res) => {
                if (res.clients.length > 0) {
                    setClients(res.clients);
                    setTotalPages(res.totalPages);
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getClients();
    }, [displayedClients])

  return (
    <div>
       <div className='orders-container flex justify-center w-full my-16'>
                    {
                        !clientDetails &&
                    <div className='orders-content w-[80%] flex flex-col'>
                        <div className='flex items-center p-2 w-full justify-between md:justify-normal border border-b-[#BDBDBD] border-l-0 border-r-0 border-t-0'>
                            <h2 className='text-xl md:text-2xl text-[#212121] font-semibold'>Clients</h2>
                        </div>
                        <div className='hidden md:flex justify-between items-center p-2 pr-10 w-full border border-b-[#E0E0E0] border-l-0 border-r-0 border-t-0'>
                            <h2 className='text-[#333333] md:text-lg font-semibold w-[16.6%]'>ID #</h2>
                            <h2 className='text-[#333333] md:text-lg font-semibold w-[16.6%]'>Full Name</h2>
                            <h2 className='text-[#333333] md:text-lg font-semibold w-[16.6%]'>Email</h2>
                            <h2 className='text-[#333333] md:text-lg font-semibold w-[16.6%]'>Phone Number</h2>
                            <h2 className='text-[#333333] md:text-lg font-semibold w-[16.6%]'>Action</h2>
                        </div>

                        {clients.length > 0 && clients.slice().reverse().map((client, index) => {
                            const user = client.User
                            let fullName = `${user.firstName} ${user.lastName}`
                            return (
                            <div key={index} className='flex justify-between items-center p-2 md:pr-10 w-full border border-b-[#E0E0E0] border-l-0 border-r-0 border-t-0'>
                            <h2 className='text-[#333333] md:text-lg w-[10%] md:w-[16.6%]'>{client.User.id}</h2>                           
                            <h2 className='text-[#333333] md:text-lg w-[16.6%]'>{fullName}</h2>
                            <h2 className='hidden md:block text-[#333333] md:text-lg w-[16.6%]'>{user.email}</h2>
                            <h2 className='hidden md:block text-[#333333] text-end md:text-start md:text-lg w-[16.6%]'>{user.phoneNumber}</h2>
                            <h2 onClick={() => handleClientDetails(user)} className='text-[#828282] text-end md:text-start md:text-lg w-[16.6%] cursor-pointer'>View Client</h2>
                        </div>
                        )})}
                         {totalPages > 1 && (
                             <button className='underline' onClick={loadMoreClients}>Load More Clients</button>
                         )}
                    </div>        
                }</div>
                    
                {clientDetails && <ClientDetails user={selectedUser} closeClientDetails={() => setClientDetails(false)} />}
    </div>
  );
}

export default Clients;