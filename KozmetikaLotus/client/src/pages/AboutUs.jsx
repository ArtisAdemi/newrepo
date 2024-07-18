import React from 'react'
import Navbar from '../components/Navbar'
import about1 from "../images/about1.png"
import carissa from "../images/carisa.png"
import overlap from "../images/overlap2.jpg"

const AboutUs = () => {
  return (
    <div>
      <div className='flex w-full justify-center'>
          <Navbar />
      </div>
      <div className='w-full my-4 flex justify-center pt-6'>
        <div className='w-[80%] '>
          <p className='font-semibold text-3xl text-[#292929]'>Rreth nesh</p>
        </div>
      </div>

      {/* First section */}
      <div className='bg-[#F7CEE7] flex items-center flex-col'>
        <div className='w-[80%] flex flex-col justify-center'>
          <p className='text-[#292929] text-3xl font-semibold pt-10 pb-2'>Marka Jonë</p>

          <img src={about1} alt="blla" className="h-[200px] w-full object-cover md:w-full md:h-[80%]" />

          <div className='pt-6 pb-10'>
            <p className='text-[#292929] text-md'>Mireserdhe në Kozmetika Lotus! Jemi një kompani kozmetike e specializuar në ofrimin e produkteve cilësore nga Gjermania dhe Amerika. Që nga themelimi ynë në vitin 2015, ne kemi punuar me përkushtim për të sjellë tek ju vetëm produktet më të mira dhe më të sigurta në treg.</p>
          </div>
        </div>
      </div>

      <div className='pt-10 flex justify-center bg-[#FBEFF2]'>

        <div className='w-[80%] md:flex justify-center gap-20'>

          <div className='max-w-[600px] md:w-1/2'>
            <h2 className='font-sans text-2xl font-bold mb-2 text-[#292929]'>Trashegimia</h2>
            <p className='text-md text-[#292929]'>Ne jemi një E-Commerce i përkushtuar që ofron produkte cilësore për kujdesin e lëkurës, flokëve, trupit, makeup dhe shumë produkte të tjera. Qëllimi ynë është të sjellim trendet më të fundit dhe të ofrojmë dërgesa në të gjithë Europën. Klientët tanë janë shumë të kënaqur me shërbimin tonë dhe cilësinë e produkteve tona. Ne jemi këtu për t’ju ndihmuar dhe për të siguruar që ju të keni një përvojë të mrekullueshme. Faleminderit për mbështetjen tuaj!</p>
          </div>
        <div className='mt-8 md:w-1/2'>
          <img src={carissa} alt="blla" className="" />
        </div>
        </div>

      </div>

      {/* characteristics */}
      
      <div className='flex items-center flex-col pt-8  bg-[#FBEFF2]'>
        <div className='w-[80%] flex flex-col justify-center'>

        <div className='mb-4 md:w-[70%]'>
          <h2 className='text-2xl font-bold mb-2 text-[#292929]'>Origjinalitet 100%</h2>
          <p className='text-md text-[#292929]'>Çdo produkt që ne ofrojmë është i garantuar të jetë 100% origjinal. Ne jemi të përkushtuar për të siguruar që klientët tanë të kenë besimin dhe sigurinë në cilësinë e produkteve që blejnë.</p>
        </div>
        <div className='mb-4 md:w-[70%]'>
          <h2 className='font-bold text-xl mb-2 text-[#292929]'>Produkte nga Gjermania dhe Amerika</h2>
          <p className='text-md text-[#292929]'>Duke bashkëpunuar me disa prej markave më të njohura dhe të besuara në botë, ne sjellim për ju produktet më të fundit dhe më inovative të kozmetikës.</p>
        </div>
        <div className='mb-4 md:w-[70%]'>
          <h2 className='font-bold text-xl mb-2 text-[#292929]'>Eksperiencë dhe Profesionalizëm</h2>
          <p className='text-md text-[#292929]'> Me një eksperiencë prej afër 10 vitesh në treg, ekipi ynë i përkushtuar është gjithmonë në dispozicion për t'ju ndihmuar dhe për t'ju ofruar këshillat më të mira për nevojat tuaja kozmetike.</p>
        </div>
        {/* <div className='md:w-[70%]'>
          <h2 className='font-bold text-xl mb-2 text-[#292929]'>Bukuria e Natyrës për Lëkurën: Kujdesi Natyral për Freskinë dhe Mbrojtjen</h2>
          <p className='text-md text-[#292929] mb-4'>Gjatë kujdesit për lëkurën, ne ecim në rrugën drejt një lëkure të shëndetshme dhe të bukur. Produktet e kujdesit për lëkurën janë krijuar me kujdes për të siguruar një kombinim të përshtatshëm të përbërësve natyralë dhe teknologjisë inovative, me qëllim për të përmirësuar strukturën dhe pamjen e lëkurës.</p>
        </div> */}
        </div>
      </div>


      {/* overlapping images */}
      <div className='bg-[#FBEFF2]'>
        

        <div className='bg-[#C6D0BC] w-[100%] h-52 pt-12'>

        </div>

        <div className='w-full flex justify-center'> 
          <div className='w-[80%] lg:flex gap-10'>

            <div className='-mt-28'>
              <img src={overlap} alt="blla" className="w-[777px] rounded-md" />
            </div>
            <div className='mt-3 lg:w-96 lg:h-48'>
              <h2 className='font-bold text-2xl text-[#292929] mb-5'>Diversiteti, Barazia dhe Përfshirja.</h2>
              <p className='text-md text-[#292929]'>Ne besojmë se bukuria është një formë e shprehjes së vetvetes dhe duhet të jetë përfshirëse për të gjitha kulturat dhe traditat, për këtë arsye ne ofrojmë produkte të frymëzuara nga ritualet e bukurisë të shumëllojshme nga e gjithë bota."</p>
            </div>
          </div>
        </div>
        <div className='w-full align-center flex justify-center'>
            <div className='w-[80%] flex flex-col mb-7'>
              <h2 className='text-2xl text-[#292929] font-bold mb-5 mt-7'>Përgjegjësitë tona</h2>
              <p className='text-md text-[#292929]'>Ne besojmë se të gjithë meritojnë qasje në produkte kozmetike të sigurta, efektive dhe etike, pa marrë parasysh stilin e tyre të jetesës ose kufizimet dietike. Angazhimi ynë për këto vlera shtrihet përtej ofrimeve tona të produkteve dhe përfshin procese të qëndrueshme dhe miqësore me mjedisin të prodhimit, burimet etike të përbërësve, dhe kontributin në komunitetet që shërbejmë. Në Lotus, jemi krenarë që jemi udhëheqës në industrinë e bukurisë etike dhe të qëndrueshme, dhe presim me padurim të vazhdojmë të inovojmë dhe të shkelim kufijtë në angazhimin tonë për të ofruar klientëve tanë produktet dhe përvojat më të mira të mundshme.</p>
            </div>
        </div>


      </div>

    </div>
  )
}

export default AboutUs