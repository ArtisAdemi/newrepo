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
            <p className='text-[#292929] text-md'>Mireserdhe në Kozmetika Lotus! Ne jemi një biznes kozmetike i themeluar që nga viti 2015, me një pasion për kujdesin E lëkurës. Ne ofrojmë produkte të cilësisë së lartë.</p>
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
          <h2 className='text-2xl font-bold mb-2 text-[#292929]'>Shkëlqimi Natyral për Fytyrën Tënde</h2>
          <p className='text-md text-[#292929]'>Lotus është një produkt kozmetik i shkëlqyer i krijuar për të sjellë një bukuri natyrale dhe të freskët për fytyrën tënde. Përbërësit e zgjedhur me kujdes dhe formula e veçantë e këtij produkti bëjnë të mundur që të përjetosh një ndjenjë të pashembullt të freskisë dhe të relaksimit.</p>
        </div>
        <div className='mb-4 md:w-[70%]'>
          <h2 className='font-bold text-xl mb-2 text-[#292929]'>Rikujdesi Natyral për Flokët: Sekreti për Shkëlqim dhe Forcë</h2>
          <p className='text-md text-[#292929]'>Shëndeti dhe bukuria e flokëve janë prioriteti kryesor për të gjithë. Produktet e kujdesit për flokët janë përgjegjëse për të ofruar një bashkërendim të përshtatshëm të përbërësve dhe formulave të specializuara për të forcuar, për të sjellë shkëlqim dhe elasticitet, duke mbrojtur strukturën e tyre.</p>
        </div>
        <div className='mb-4 md:w-[70%]'>
          <h2 className='font-bold text-xl mb-2 text-[#292929]'>Freskia dhe Kujdesi për Trupin: Eksperiencë e Natyrshme për Bukurinë dhe Shëndetin</h2>
          <p className='text-md text-[#292929]'>Kujdesi për trupin është një pjesë e rëndësishme e rutinës së kujdesit personal, duke siguruar një ndjenjë të përgjithshme të freskisë, paqeje dhe kujdesi për lëkurën dhe trupin tënd. Produktet për kujdesin e trupit përdorin formulat më të mira, të pasura me përbërës natyralë për të mbajtur lëkurën e trupit tërheqëse dhe të shëndetshme.</p>
        </div>
        <div className='md:w-[70%]'>
          <h2 className='font-bold text-xl mb-2 text-[#292929]'>Bukuria e Natyrës për Lëkurën: Kujdesi Natyral për Freskinë dhe Mbrojtjen</h2>
          <p className='text-md text-[#292929] mb-4'>Gjatë kujdesit për lëkurën, ne ecim në rrugën drejt një lëkure të shëndetshme dhe të bukur. Produktet e kujdesit për lëkurën janë krijuar me kujdes për të siguruar një kombinim të përshtatshëm të përbërësve natyralë dhe teknologjisë inovative, me qëllim për të përmirësuar strukturën dhe pamjen e lëkurës.</p>
        </div>
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