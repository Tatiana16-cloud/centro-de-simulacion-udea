import React, { useEffect, useState } from 'react';
import Table from './Table'
import Form from './FormC'
import { helpHttp } from '../helpers/helpHttp';
import Loader from './loader';
import Message from './message';


const Crud = () => {
  const[devices,setDevices]=useState(null)
  const[dataToEdit,setDataToEdit]=useState(null)
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  let api=helpHttp();
  let url="http://localhost:3000/api/equipos"

  useEffect(() => {
    setLoading(true);
    helpHttp().get(url).then((res) => {
        if (!res.err) {
          setDevices(res);
          setError(null);
          console.log(res)
        } else {
          setDevices(null);
          setError(res);
          console.log(res)
        }
        setLoading(false);
      });
  }, [url]);

  

  const createData=(data)=>{
    //data.id=Date.now();
    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.post(url, options).then((res) => {
      //console.log(res);
      if (!res.err) {
        setDevices([...devices, res]);
      } else {
        setError(res);
      }
    });
  }

  const updateData=(data)=>{
    let endpoint = `${url}/${data.id}`;
    //console.log(endpoint);

    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.put(endpoint, options).then((res) => {
      //console.log(res);
      if (!res.err) {
        let newData = devices.map((el) => (el.id === data.id ? data : el));
        setDevices(newData);
      } else {
        setError(res);
      }
    });
  }

  const deleteData=(id)=>{
    let isDelete = window.confirm(
      `¿Estás seguro de eliminar el registro con el id '${id}' ?`
    );

    if (isDelete) {
      let endpoint = `${url}/${id}`;
      let options = {
        headers: { "content-type": "application/json" },
      };

      api.del(endpoint, options).then((res) => {
        //console.log(res);
        if (!res.err) {
          let newData = devices.filter((el) => el.id !== id);
          setDevices(newData);
        } else {
          setError(res);
        }
      });
    } else {
      return;
    }

  }

  return (
    <div>
        <h2>CRUD API</h2>
        <article className='grid-1-2'>
        <Form 
        createData={createData} 
        updateData={updateData} 
        dataToEdit={dataToEdit}
        setDataToEdit={setDataToEdit}/>

        {loading && <Loader />}
        {error && (
          <Message
            msg={`Error ${error.status}: ${error.statusText}`}
            bgColor="#dc3545"
          />
        )}
        {devices && (

        <Table 
        data={devices}  
        setDataToEdit={setDataToEdit}
        deleteData={deleteData} />

        )}

        </article>
    </div>
  )
}

export default Crud