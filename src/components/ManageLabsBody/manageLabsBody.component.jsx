import React, { useEffect, useState } from 'react';
import Table from '../Table/table.component';
import './manageLabsBody.css'

const ManageLabsBody = ({someProp}) => {
  const dataExampleArray = [
    {
      someProperty1: 'someProperty1A',
      someProperty2: 'someProperty2A',
      someProperty3: 'someProperty3A',
      someProperty4: 'someProperty4A',
      someProperty5: 'someProperty5A',
      someProperty6: 'someProperty6A',
    }
  ]

  return (
    <div className='body'>
        <Table 
              data={dataExampleArray.map((element)=> ({
                someProperty1: element.someProperty1,
                someProperty2: element.someProperty2,
                someProperty3: element.someProperty3,
                someProperty4: element.someProperty4,
                someProperty5: element.someProperty5,
                someProperty6: element.someProperty6
              }))}  
              headers={[
                'Title 1',
                'Title 2',
                'Title 3',
                'Title 4',
                'Title 5',
                'Title 6'
              ]}
            />
    </div>
  )
}

export default ManageLabsBody