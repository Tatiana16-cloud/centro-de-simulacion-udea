import React, { useEffect, useState } from 'react';
import Table from '../Table/table.component';
import Form from '../Form/form.component';
import Loader from '../LoaderV2/loader.component';
import FloatingWindow from '../FloatingWindow/floatingWindow.component';
import SupportService from '../../Services/support.service';
import MessageComponent from '../Message/message.component';
import Toolbar from '../Toolbar/toolbar.component';
import Button from '../Button/button.component'
import SearchBox from '../SearchBox/searchbox.component'
import Dropdown from '../Dropdown/dropdown.component'
import {filterByWord} from '../../Utils/SearchingUtils'
import Pagination from '../Pagination/pagination.component';
import {ACTIONS} from '../../Commons/actions.commons'
import SupportArraySorter from './supportArraySorter.utils';
import {formatDate} from '../../Utils/dateUtils'
import { storeSupports, storeEditableSupport, storeViewableSupport } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

import './SupportsBody.css'

const SupportsBody = ({onActionEvent}) => {
  const[supports,setSupports]=useState(null)
  const[filteredSupports,setFilteredSupports]=useState(null)
  const[paginatedSupports,setPaginatedSupports]=useState(null)
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchText, setSearchText] = useState(null);
  const [sortCriterion, setSortCriterion] = useState('default')

  const dispatch = useDispatch();
  const supportService = new SupportService()
  const storedSupports = useSelector(state=>state.supports)


  useEffect(() => {
    setLoading(true);
    getAllSupports()
    
    setTimeout(()=> {
      setLoading(false);
    }, 500)
  }, []);

  const getAllSupports = async()=>{
    const {response, error} = storedSupports? {response: storedSupports} : await supportService.getAllData()
    if (error) {
      setSupports(null);
      setPaginatedSupports(null)
      setFilteredSupports(null)
      setError(error);
      dispatch(storeSupports({ supports: null }))
    }else{
      setSupports(response);
      setPaginatedSupports(paginateSupports(response, currentPage, pageSize))
      setFilteredSupports(response)
      setError(null);
      dispatch(storeSupports({ supports: response }))
    }
  }

  const searchEvent = (text)=>{
    const minLengthToSearch = 3;
    const hasSearching = text?.length >= minLengthToSearch;

    if(!hasSearching){
      setSearchText(null)
      setPaginatedSupports(getArraySupports(supports, currentPage, pageSize, null, sortCriterion))
    }else{
      setCurrentPage(1);
      setSearchText(text);
      setPaginatedSupports(getArraySupports(supports, 1, pageSize, text, sortCriterion))
    }
  }

  const handlePaginationChange = ({
    currentPage,
    pageSize
  }) => {
    setCurrentPage(currentPage);
    setPageSize(pageSize);
    setPaginatedSupports(getArraySupports(supports, currentPage, pageSize, searchText, sortCriterion))
  };

  const paginateSupports = (supports, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;  
    const filteredArray = supports.slice(startIndex, endIndex);
    return filteredArray;
  }

  const SORT_BY = {
    SORT_BY_DATE_ASC: 'sortByDateAsc',
    SORT_BY_DEVICE_ID_ASC: 'sortByDeviceIdAsc',
    SORT_BY_TYPE_ASC: 'sortByTypeAsc',
    SORT_BY_DATE_DESC: 'sortByDateDesc',
    SORT_BY_DEVICE_ID_DESC: 'sortByDeviceIdDesc',
    SORT_BY_TYPE_DESC: 'sortByTypeDesc',
    DEFAULT: 'default'
  }

  const sortMethods = Object.keys(SORT_BY).reduce((methodsObject, key)=>{
    methodsObject[SORT_BY[key]] = SupportArraySorter[SORT_BY[key]]
    return methodsObject
  },{})
  
  const onSelectedSortCriterion = (criterion) => {
    setSortCriterion(criterion? criterion : 'default')
    setPaginatedSupports(getArraySupports(supports, currentPage, pageSize, searchText, criterion? criterion : 'default'))
  }

  const getArraySupports = (supports, currentPage, pageSize, searchText, criterion) =>{
    let supportsToPaginate = searchSupports(supports, searchText);
    supportsToPaginate = sortMethods[criterion](supportsToPaginate)
    return paginateSupports(supportsToPaginate, currentPage, pageSize)
  }

  const searchSupports = (supports, searchText) => {
    const searchResults = filterByWord(supports, searchText);
    setFilteredSupports(searchResults)
    return searchResults;
  }


  return (
    <div className='body'>
        <article className='grid-1-2'>
          {error && (
            <MessageComponent
              msg={`Error ${error.message}: ${error.body}`}
              bgColor="#dc3545"
            />
          )}
          {paginatedSupports && (
          <Toolbar>
            <SearchBox onSearch={searchEvent}/>
            <Dropdown 
              label={'Ordenar por:'} 
              options={[
                { label: '', value: null},
                { label: 'Fecha ↑', value: SORT_BY.SORT_BY_DATE_ASC},
                { label: 'Fecha ↓', value: SORT_BY.SORT_BY_DATE_DESC},
                { label: 'Código Equipo ↑', value: SORT_BY.SORT_BY_DEVICE_ID_ASC},
                { label: 'Código Equipo ↓', value: SORT_BY.SORT_BY_DEVICE_ID_DESC},
                { label: 'Tipo ↑', value: SORT_BY.SORT_BY_TYPE_ASC},
                { label: 'Tipo ↓', value: SORT_BY.SORT_BY_TYPE_DESC}
              ]}
              onSelectedOption={onSelectedSortCriterion}  
            />
          </Toolbar>
          )}
          {loading && <Loader />}
          {paginatedSupports && !loading && (
            <Table 
              data={paginatedSupports.map((support)=> ({
                id: support.id,
                deviceID: support.device_id,
                responsable: support.responsable,
                date: formatDate(support.date),
                description: support.description,
                status: support.status,
                type: support.type
              }))}  
              headers={[
                'ID',
                'ID Equípo',
                'Responsable',
                'Fecha',
                'Descripción',
                'Estado',
                'Tipo'
              ]}
            />
          )}
          {paginatedSupports && !loading && (
            <Pagination
              totalItems={filteredSupports.length}
              currentPage={currentPage}
              onPaginationChange={handlePaginationChange}
            />
          )}
        </article>
    </div>
  )
}

export default SupportsBody