import React, { Fragment, useState } from 'react';
import Message from './Message';
import axios from 'axios';
import https from 'https';


  const SearchForm = () => {
    const [search, setSearch] = useState('');
    const [message, setMessage] = useState('');

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const obj = {
        search,
        document: 744958
      };
      const res = await axios.post(process.env.REACT_APP_API_URL+'/search', obj)
      setMessage(res.data.msg);
    } catch (err) {
    if (err.response.status === 500) {
      setMessage(err.response.data.msg);
    } else {
      setMessage(err.response.data.msg);
    }
  }
}
  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
      <input className="form-control space-input" type="text" placeholder="Bomba de agua, radiador.." id='search' onChange={handleSearch}
/>
        <input
          type='submit'
          value='Buscar'
          className='btn btn btn-danger btn-block mt-4'
        />
      </form>
    </Fragment>
  );
};


export default SearchForm;
